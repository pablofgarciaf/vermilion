import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { getAdminDb } from '@/lib/firebaseAdmin';

/**
 * TikTok Login Kit + Content Posting API (modo «Upload»: el video llega como borrador
 * a la bandeja de TikTok y la persona lo publica desde la app). SOLO SERVIDOR.
 *
 * Variables de entorno (Vercel): TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET y, opcional,
 * TIKTOK_REDIRECT_URI (por defecto https://www.vermilionroutes.com/api/tiktok/callback).
 * Los tokens se guardan en Firestore `integrations/tiktok`, que las reglas no exponen al cliente.
 */

export const TIKTOK_SCOPES = ['user.info.basic', 'video.upload'] as const;
const AUTHORIZE_URL = 'https://www.tiktok.com/v2/auth/authorize/';
const API = 'https://open.tiktokapis.com';
const DEFAULT_REDIRECT = 'https://www.vermilionroutes.com/api/tiktok/callback';

export const STATE_COOKIE = 'tt_oauth_nonce';
export const STATE_TTL_MS = 10 * 60 * 1000;
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'] as const;
/** Por debajo del límite de 4,5 MB que Vercel acepta en el cuerpo de una petición. */
export const RELAY_MAX_BYTES = 4_400_000;

const MB = 1024 * 1024;
const MAX_VIDEO_BYTES = 4 * 1024 * MB;

export function getTikTokConfig() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY?.trim();
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET?.trim();
  if (!clientKey || !clientSecret) return null;
  return { clientKey, clientSecret, redirectUri: process.env.TIKTOK_REDIRECT_URI?.trim() || DEFAULT_REDIRECT };
}

// ------------------------------------------------------------------ estado OAuth (anti-CSRF)

export interface OAuthState {
  n: string; // nonce, también guardado en una cookie httpOnly del navegador que inició el flujo
  l: string; // locale para volver al panel
  u: string; // email del administrador que conectó
  e: number; // expiración (ms)
}

const b64url = (buf: Buffer | string) => Buffer.from(buf).toString('base64url');

export function newNonce() {
  return randomBytes(16).toString('base64url');
}

export function signState(state: OAuthState, secret: string) {
  const payload = b64url(JSON.stringify(state));
  const sig = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyState(token: string, secret: string, now = Date.now()): OAuthState | null {
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = createHmac('sha256', secret).update(payload).digest();
  const given = Buffer.from(sig, 'base64url');
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const state = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as OAuthState;
    if (typeof state.e !== 'number' || state.e < now) return null;
    return state;
  } catch {
    return null;
  }
}

export function buildAuthorizeUrl(clientKey: string, redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_key: clientKey,
    scope: TIKTOK_SCOPES.join(','),
    response_type: 'code',
    redirect_uri: redirectUri,
    state,
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

// ------------------------------------------------------------------ subida por partes

/**
 * Reglas de TikTok: un video de hasta 64 MB puede subirse en una sola parte; si es más grande,
 * partes de 5–64 MB donde la última absorbe el resto. Usamos partes de 10 MB.
 */
export function planChunks(size: number) {
  if (!Number.isInteger(size) || size <= 0 || size > MAX_VIDEO_BYTES) {
    throw new Error('invalid_video_size');
  }
  if (size <= 64 * MB) return { chunkSize: size, totalChunks: 1 };
  const chunkSize = 10 * MB;
  return { chunkSize, totalChunks: Math.floor(size / chunkSize) };
}

/** Rango de bytes [start, end] (inclusivo) de la parte `index`; la última llega hasta el final. */
export function chunkRange(index: number, size: number, chunkSize: number, totalChunks: number) {
  const start = index * chunkSize;
  const end = index === totalChunks - 1 ? size - 1 : start + chunkSize - 1;
  return { start, end };
}

// ------------------------------------------------------------------ API de TikTok

interface TokenResponse {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_token: string;
  refresh_expires_in: number;
  scope: string;
}

async function tokenRequest(body: Record<string, string>): Promise<TokenResponse> {
  const res = await fetch(`${API}/v2/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
    body: new URLSearchParams(body),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`token_${data.error || res.status}`);
  }
  return data as TokenResponse;
}

export function exchangeCode(code: string) {
  const cfg = getTikTokConfig();
  if (!cfg) throw new Error('not_configured');
  return tokenRequest({
    client_key: cfg.clientKey,
    client_secret: cfg.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: cfg.redirectUri,
  });
}

async function apiCall<T>(path: string, accessToken: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json; charset=UTF-8', ...(init.headers || {}) },
    cache: 'no-store',
  });
  const body = await res.json().catch(() => ({}));
  const code = body?.error?.code;
  if (!res.ok || (code && code !== 'ok')) {
    throw new Error(code || `http_${res.status}`);
  }
  return body.data as T;
}

export async function fetchUserInfo(accessToken: string) {
  const data = await apiCall<{ user: { open_id: string; display_name?: string; avatar_url?: string } }>(
    '/v2/user/info/?fields=open_id,display_name,avatar_url',
    accessToken
  );
  return data.user;
}

export function initInboxUpload(accessToken: string, size: number) {
  const { chunkSize, totalChunks } = planChunks(size);
  return apiCall<{ publish_id: string; upload_url: string }>('/v2/post/publish/inbox/video/init/', accessToken, {
    method: 'POST',
    body: JSON.stringify({
      source_info: { source: 'FILE_UPLOAD', video_size: size, chunk_size: chunkSize, total_chunk_count: totalChunks },
    }),
  }).then((d) => ({ publishId: d.publish_id, uploadUrl: d.upload_url, chunkSize, totalChunks }));
}

export function fetchPublishStatus(accessToken: string, publishId: string) {
  return apiCall<{ status: string; fail_reason?: string }>('/v2/post/publish/status/fetch/', accessToken, {
    method: 'POST',
    body: JSON.stringify({ publish_id: publishId }),
  });
}

/** Sube una parte al upload_url de TikTok (usado como respaldo cuando el navegador no puede). */
export async function putChunk(uploadUrl: string, bytes: ArrayBuffer, start: number, end: number, total: number, type: string) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': type,
      'Content-Range': `bytes ${start}-${end}/${total}`,
    },
    body: bytes,
  });
  if (!res.ok) throw new Error(`upload_${res.status}`);
}

export async function revokeToken(accessToken: string) {
  const cfg = getTikTokConfig();
  if (!cfg) return;
  await fetch(`${API}/v2/oauth/revoke/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_key: cfg.clientKey, client_secret: cfg.clientSecret, token: accessToken }),
  }).catch(() => undefined);
}

// ------------------------------------------------------------------ conexión guardada

export interface TikTokConnection {
  openId: string;
  displayName: string;
  avatarUrl: string;
  scope: string;
  accessToken: string;
  accessExpiresAt: number;
  refreshToken: string;
  refreshExpiresAt: number;
  connectedBy: string;
  connectedAt: number;
}

const connectionDoc = () => getAdminDb().collection('integrations').doc('tiktok');
export const uploadsCollection = () => getAdminDb().collection('tiktok_uploads');

export async function getConnection(): Promise<TikTokConnection | null> {
  const snap = await connectionDoc().get();
  return snap.exists ? (snap.data() as TikTokConnection) : null;
}

export async function saveConnection(tokens: TokenResponse, profile: { display_name?: string; avatar_url?: string }, connectedBy: string) {
  const now = Date.now();
  const conn: TikTokConnection = {
    openId: tokens.open_id,
    displayName: profile.display_name || '',
    avatarUrl: profile.avatar_url || '',
    scope: tokens.scope,
    accessToken: tokens.access_token,
    accessExpiresAt: now + tokens.expires_in * 1000,
    refreshToken: tokens.refresh_token,
    refreshExpiresAt: now + tokens.refresh_expires_in * 1000,
    connectedBy,
    connectedAt: now,
  };
  await connectionDoc().set(conn);
  return conn;
}

export async function deleteConnection() {
  await connectionDoc().delete();
}

/** Token de acceso vigente; si vence en menos de 5 minutos lo renueva con el refresh token. */
export async function getValidAccessToken(): Promise<string> {
  const conn = await getConnection();
  if (!conn) throw new Error('not_connected');
  if (conn.accessExpiresAt - Date.now() > 5 * 60 * 1000) return conn.accessToken;
  if (conn.refreshExpiresAt <= Date.now()) throw new Error('reconnect_required');

  const cfg = getTikTokConfig();
  if (!cfg) throw new Error('not_configured');
  const t = await tokenRequest({
    client_key: cfg.clientKey,
    client_secret: cfg.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: conn.refreshToken,
  });
  const now = Date.now();
  await connectionDoc().update({
    accessToken: t.access_token,
    accessExpiresAt: now + t.expires_in * 1000,
    refreshToken: t.refresh_token,
    refreshExpiresAt: now + t.refresh_expires_in * 1000,
    scope: t.scope,
  });
  return t.access_token;
}
