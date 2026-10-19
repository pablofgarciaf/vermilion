import { after, NextRequest, NextResponse } from 'next/server';

import {
  createProductionDeps,
  extractEvents,
  getWhatsAppConfig,
  LIMITS,
  processEvents,
  safeEqual,
  verifyMetaSignature,
} from '@/lib/whatsapp';

/**
 * Webhook de WhatsApp Cloud API (Meta).
 *
 * GET  -> verificación de la suscripción (hub.verify_token, en tiempo constante).
 * POST -> 1) verifica X-Hub-Signature-256 sobre el cuerpo crudo ANTES de parsear nada,
 *         2) responde 200 enseguida,
 *         3) procesa con after(): dedupe por message.id, baja, frecuencia, paso a humano,
 *            IA (si WHATSAPP_AI_ENABLED=true) y lead en Firestore. Ver lib/whatsapp/.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// after() vive dentro de este tiempo máximo (IA ~12 s + envío + Firestore).
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const { verifyToken } = getWhatsAppConfig();
  const params = request.nextUrl.searchParams;
  const mode = params.get('hub.mode');
  const token = params.get('hub.verify_token') || '';
  const challenge = params.get('hub.challenge') || '';

  if (verifyToken && mode === 'subscribe' && safeEqual(token, verifyToken) && /^[\w-]{1,128}$/.test(challenge)) {
    return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: NextRequest) {
  const config = getWhatsAppConfig();

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > LIMITS.maxBodyBytes) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }
  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > LIMITS.maxBodyBytes) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  if (!config.appSecret) {
    console.error('[WhatsApp] Falta WHATSAPP_APP_SECRET: se rechazan todos los eventos.');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }
  if (!verifyMetaSignature(rawBody, request.headers.get('x-hub-signature-256'), config.appSecret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const events = extractEvents(payload);
  if (events.messages.length > 0 || events.echoes.length > 0) {
    const task = async () => {
      try {
        await processEvents(events, createProductionDeps(config));
      } catch (err) {
        const e = err as { name?: string; message?: string };
        console.error('[WhatsApp] Error en el procesamiento diferido', { name: e?.name, message: e?.message });
      }
    };
    try {
      after(task);
    } catch {
      // Fuera del contexto de una petición (p. ej. tests): se lanza en segundo plano.
      void task();
    }
  }

  // Meta solo necesita un 200 rápido; los estados (sent/delivered/read) se ignoran.
  return NextResponse.json({ received: true }, { status: 200 });
}
