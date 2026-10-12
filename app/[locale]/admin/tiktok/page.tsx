'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, LogOut, UploadCloud } from 'lucide-react';
import { auth } from '@/lib/firebase';

/**
 * Panel de TikTok: conectar la cuenta (Login Kit, permiso user.info.basic) y enviar videos
 * a los borradores de TikTok (Content Posting API, permiso video.upload).
 * La protección de acceso la hace app/[locale]/admin/layout.tsx; la API exige rol super/admin.
 */

interface TikTokStatus {
  configured: boolean;
  connected: boolean;
  profile: null | {
    displayName: string;
    avatarUrl: string;
    scope: string;
    connectedAt: number;
    reconnectRequired: boolean;
  };
}

type Phase =
  | { kind: 'idle' }
  | { kind: 'init' }
  | { kind: 'upload'; percent: number }
  | { kind: 'processing' }
  | { kind: 'done' }
  | { kind: 'error'; message: string };

const ALLOWED_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'];
const RELAY_MAX_BYTES = 4_400_000; // igual que lib/tiktok.ts (límite de cuerpo de Vercel)
const POLL_MS = 3000;
const POLL_TRIES = 40;

async function authHeaders(extra: Record<string, string> = {}) {
  const token = await auth?.currentUser?.getIdToken();
  return { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extra };
}

async function fetchStatus(): Promise<TikTokStatus> {
  const res = await fetch('/api/admin/tiktok', { headers: await authHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function TikTokAdminPage() {
  const t = useTranslations('adminTiktok');
  const locale = useLocale();

  const [status, setStatus] = useState<TikTokStatus | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' });

  const loadStatus = useCallback(async () => {
    try {
      setStatus(await fetchStatus());
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    // Resultado de la vuelta desde TikTok (?tiktok=connected|error&reason=...); se muestra junto con el estado.
    const params = new URLSearchParams(window.location.search);
    const result = params.get('tiktok');
    const returnNotice =
      result === 'connected'
        ? { ok: true, text: t('connectedOk') }
        : result === 'error'
          ? { ok: false, text: t('connectError', { reason: params.get('reason') || 'unknown' }) }
          : null;
    const showNotice = () => {
      if (!returnNotice) return;
      setNotice(returnNotice);
      window.history.replaceState(null, '', window.location.pathname);
    };

    let active = true;
    fetchStatus()
      .then((s) => {
        if (!active) return;
        setStatus(s);
        showNotice();
      })
      .catch(() => {
        if (!active) return;
        setLoadError(true);
        showNotice();
      });
    return () => {
      active = false;
    };
  }, [t]);

  const connect = async () => {
    setConnecting(true);
    try {
      const res = await fetch('/api/admin/tiktok/connect', {
        method: 'POST',
        headers: await authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ locale }),
      });
      const data = await res.json();
      if (!data.url) throw new Error(data.error || String(res.status));
      window.location.href = data.url;
    } catch (err) {
      setConnecting(false);
      setNotice({ ok: false, text: t('connectError', { reason: err instanceof Error ? err.message : 'unknown' }) });
    }
  };

  const disconnect = async () => {
    if (!window.confirm(t('disconnectConfirm'))) return;
    await fetch('/api/admin/tiktok', { method: 'DELETE', headers: await authHeaders() });
    setNotice(null);
    loadStatus();
  };

  const send = async () => {
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhase({ kind: 'error', message: t('invalidType') });
      return;
    }
    try {
      setPhase({ kind: 'init' });
      const initRes = await fetch('/api/admin/tiktok/upload', {
        method: 'POST',
        headers: await authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ size: file.size, type: file.type, fileName: file.name }),
      });
      const init = await initRes.json();
      if (!init.success) throw new Error(init.error || String(initRes.status));
      const { publishId, uploadUrl, chunkSize, totalChunks } = init as {
        publishId: string;
        uploadUrl: string;
        chunkSize: number;
        totalChunks: number;
      };

      // Cada parte va directo a TikTok; si el navegador no puede (CORS), pasa por nuestro servidor.
      let useRelay = false;
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = i === totalChunks - 1 ? file.size - 1 : start + chunkSize - 1;
        const blob = file.slice(start, end + 1);
        setPhase({ kind: 'upload', percent: Math.round((start / file.size) * 100) });

        if (!useRelay) {
          try {
            const res = await fetch(uploadUrl, {
              method: 'PUT',
              headers: { 'Content-Type': file.type, 'Content-Range': `bytes ${start}-${end}/${file.size}` },
              body: blob,
            });
            if (!res.ok) throw new Error(`upload_${res.status}`);
            continue;
          } catch (err) {
            if (!(err instanceof TypeError)) throw err; // TypeError = el navegador bloqueó la petición
            useRelay = true;
          }
        }
        if (blob.size > RELAY_MAX_BYTES) throw new Error(t('tooLargeForRelay'));
        const relay = await fetch(
          `/api/admin/tiktok/upload/relay?publishId=${encodeURIComponent(publishId)}&start=${start}&end=${end}`,
          { method: 'PUT', headers: await authHeaders({ 'Content-Type': 'application/octet-stream' }), body: blob }
        );
        const relayData = await relay.json().catch(() => ({}));
        if (!relay.ok) throw new Error(relayData.error || `relay_${relay.status}`);
      }

      setPhase({ kind: 'processing' });
      for (let i = 0; i < POLL_TRIES; i++) {
        await sleep(POLL_MS);
        const res = await fetch(`/api/admin/tiktok/upload?publishId=${encodeURIComponent(publishId)}`, {
          headers: await authHeaders(),
          cache: 'no-store',
        });
        const data = await res.json();
        if (data.status === 'SEND_TO_USER_INBOX' || data.status === 'PUBLISH_COMPLETE') {
          setPhase({ kind: 'done' });
          setFile(null);
          return;
        }
        if (data.status === 'FAILED') throw new Error(data.failReason || 'FAILED');
      }
      // TikTok sigue procesando: el borrador llegará igual a la bandeja.
      setPhase({ kind: 'done' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown';
      setPhase({ kind: 'error', message: message === t('tooLargeForRelay') ? message : t('failed', { reason: message }) });
    }
  };

  const busy = phase.kind === 'init' || phase.kind === 'upload' || phase.kind === 'processing';
  const profile = status?.profile;

  return (
    <div className="min-h-screen bg-[#07110B] text-zinc-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <Link
          href={`/${locale}/admin`}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('back')}
        </Link>

        <header className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-white">{t('title')}</h1>
          <p className="text-sm text-zinc-300">{t('subtitle')}</p>
        </header>

        {notice && (
          <p
            role="status"
            className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${notice.ok ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300'}`}
          >
            {notice.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
            <span>{notice.text}</span>
          </p>
        )}

        {!status && !loadError && (
          <p className="flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="w-4 h-4 animate-spin" /> {t('loading')}
          </p>
        )}
        {loadError && <p className="text-sm text-rose-300">{t('connectError', { reason: 'status' })}</p>}

        {status && !status.configured && (
          <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">{t('notConfigured')}</p>
        )}

        {status?.configured && (
          <section className="rounded-2xl border border-white/10 bg-[#0F1E2E] p-6 space-y-4" aria-labelledby="tiktok-account">
            {profile && !profile.reconnectRequired ? (
              <>
                <h2 id="tiktok-account" className="font-sans text-xs font-semibold uppercase tracking-widest text-zinc-300">
                  {t('connectedAs')}
                </h2>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                  {profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatarUrl}
                      alt={profile.displayName}
                      width={56}
                      height={56}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-full border border-white/10 object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-white/10" aria-hidden="true" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-semibold text-white">{profile.displayName}</p>
                    <p className="text-xs text-zinc-300">
                      {t('permissions')}: <span className="break-all font-mono">{profile.scope}</span>
                    </p>
                  </div>
                  </div>
                  <button
                    type="button"
                    onClick={disconnect}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-xl bg-white/10 px-3 py-2 text-xs text-zinc-200 sm:self-auto hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t('disconnect')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 id="tiktok-account" className="text-lg font-semibold text-white">
                  {t('connectTitle')}
                </h2>
                {profile?.reconnectRequired && <p className="text-sm text-amber-200">{t('reconnect')}</p>}
                <p className="text-sm text-zinc-300">{t('connectBody')}</p>
                <button
                  type="button"
                  onClick={connect}
                  disabled={connecting}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black hover:bg-zinc-200 disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {connecting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {connecting ? t('connecting') : t('connectButton')}
                </button>
              </>
            )}
          </section>
        )}

        {profile && !profile.reconnectRequired && (
          <section className="rounded-2xl border border-white/10 bg-[#0F1E2E] p-6 space-y-4" aria-labelledby="tiktok-upload">
            <h2 id="tiktok-upload" className="text-lg font-semibold text-white">
              {t('uploadTitle')}
            </h2>
            <p className="text-sm text-zinc-300">{t('uploadBody')}</p>

            <label className="block cursor-pointer rounded-xl border border-dashed border-white/20 p-4 text-sm text-zinc-300 hover:border-amber-400/60 transition-colors">
              <span className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-amber-400" />
                {file ? `${file.name} · ${(file.size / (1024 * 1024)).toFixed(1)} MB` : t('chooseFile')}
              </span>
              <input
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                className="sr-only"
                disabled={busy}
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setPhase({ kind: 'idle' });
                }}
              />
            </label>

            <button
              type="button"
              onClick={send}
              disabled={!file || busy}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] px-5 py-3 text-sm font-extrabold text-black disabled:opacity-50 transition-all cursor-pointer"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {t('sendButton')}
            </button>

            {phase.kind !== 'idle' && (
              <p
                role="status"
                className={`text-sm ${phase.kind === 'error' ? 'text-rose-300' : phase.kind === 'done' ? 'text-emerald-300' : 'text-zinc-300'}`}
              >
                {phase.kind === 'init' && t('stepInit')}
                {phase.kind === 'upload' && t('stepUpload', { percent: phase.percent })}
                {phase.kind === 'processing' && t('stepProcessing')}
                {phase.kind === 'done' && t('done')}
                {phase.kind === 'error' && phase.message}
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
