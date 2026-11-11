/**
 * /go/[channel]: redirección de TikTok y Facebook a WhatsApp.
 * Comprueba la lista blanca de canales y parámetros, el número de destino, y que sin consentimiento
 * no se guarda ningún registro ni identificador (solo contadores anónimos).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { store, pending, adminState } = vi.hoisted(() => ({
  store: new Map<string, Record<string, any>>(),
  pending: [] as Array<() => unknown>,
  adminState: { autoId: 0 },
}));

vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return {
    ...actual,
    // `after` solo existe dentro de una petición de Next: aquí se guarda el trabajo para ejecutarlo.
    after: (fn: () => unknown) => {
      pending.push(fn);
    },
  };
});

vi.mock('@/lib/firebaseAdmin', () => {
  const makeDb = () => ({
    collection: (name: string) => ({
      doc: (id?: string) => ({ path: `${name}/${id ?? `auto-${++adminState.autoId}`}` }),
    }),
    runTransaction: async (fn: (t: any) => Promise<void>) =>
      fn({
        get: async (ref: { path: string }) => ({ data: () => store.get(ref.path) }),
        set: (ref: { path: string }, data: Record<string, any>) => store.set(ref.path, data),
      }),
  });
  return { getAdminDb: () => makeDb() };
});

import { NextRequest } from 'next/server';
import { GET } from '@/app/go/[channel]/route';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function call(channel: string, query = '', headers: Record<string, string> = {}, cookie?: string) {
  const h: Record<string, string> = { ...headers };
  if (cookie) h.cookie = cookie;
  const req = new NextRequest(`http://localhost:3005/go/${channel}${query}`, { headers: h });
  return GET(req, { params: Promise.resolve({ channel }) });
}

async function flush() {
  const jobs = pending.splice(0);
  await Promise.all(jobs.map((job) => job()));
}

function events() {
  return [...store.entries()].filter(([k]) => k.startsWith('web_events/')).map(([, v]) => v);
}

describe('GET /go/[channel]', () => {
  beforeEach(() => {
    store.clear();
    pending.length = 0;
  });

  it('solo admite TikTok y Facebook', async () => {
    const res = await call('instagram', '?video=x');
    expect(res.status).toBe(404);
    expect(store.size).toBe(0);
  });

  it('TikTok: 302 a la página de tours en el idioma del video, con utm en minúsculas', async () => {
    const res = await call('tiktok', '?video=ABC123&campaign=Black%20Friday&lang=en');
    expect(res.status).toBe(302);
    const location = new URL(res.headers.get('location') || '');
    expect(location.origin + location.pathname).toBe('http://localhost:3005/en/tours');
    expect(location.searchParams.get('utm_source')).toBe('tiktok');
    expect(location.searchParams.get('utm_medium')).toBe('social');
    expect(location.searchParams.get('utm_campaign')).toBe('black-friday');
    expect(location.searchParams.get('utm_content')).toBe('abc123');
    expect(res.headers.get('set-cookie')).toBeNull();
  });

  it('TikTok en español: lleva a /es/tours', async () => {
    const res = await call('tiktok', '?video=abc123&lang=es');
    const location = new URL(res.headers.get('location') || '');
    expect(location.pathname).toBe('/es/tours');
  });

  it('Facebook sin consentimiento: 302 a WhatsApp con el número, sin cookies ni registro', async () => {
    const res = await call('facebook', '?video=abc123&campaign=black-friday&lang=es');
    expect(res.status).toBe(302);
    const location = new URL(res.headers.get('location') || '');
    expect(location.origin + location.pathname).toBe('https://wa.me/593983992549');
    expect(location.searchParams.get('text')).toContain('Vermilion Routes');
    expect(res.headers.get('set-cookie')).toBeNull();

    await flush();
    expect(events()).toHaveLength(0);
    const total = store.get('web_stats/whatsapp_clicks_total');
    expect(total?.total).toBe(1);
    expect(total?.byPlacement).toEqual({ social_redirect: 1 });
  });

  it('con consentimiento aceptado: guarda canal, video, campaña, país y un UUID en cookie HttpOnly', async () => {
    const res = await call(
      'facebook',
      '?video=abc123&campaign=Galapagos%20Mayo&lang=en',
      { 'x-vercel-ip-country': 'DE' },
      'vr_consent=accepted',
    );
    expect(res.status).toBe(302);

    const setCookie = res.headers.get('set-cookie') || '';
    expect(setCookie).toMatch(/vr_vid=[0-9a-f-]{36}/i);
    expect(setCookie.toLowerCase()).toContain('httponly');
    expect(setCookie.toLowerCase()).toContain('samesite=lax');

    await flush();
    const [event] = events();
    expect(event).toMatchObject({
      type: 'whatsapp_click',
      placement: 'social_redirect',
      channel: 'facebook',
      video: 'abc123',
      campaign: 'Galapagos Mayo',
      page: '/go/facebook',
      locale: 'en',
      country: 'DE',
    });
    expect(event.visitorId).toMatch(UUID_RE);
    // Ningún dato personal: ni IP, ni teléfono, ni email.
    expect(Object.keys(event).sort()).toEqual(
      ['campaign', 'channel', 'country', 'createdAt', 'locale', 'page', 'placement', 'type', 'video', 'visitorId'].sort(),
    );
  });

  it('reutiliza el UUID existente si es válido', async () => {
    const existing = '123e4567-e89b-42d3-a456-426614174000';
    const res = await call('tiktok', '?lang=it', {}, `vr_consent=accepted; vr_vid=${existing}`);
    expect(res.headers.get('set-cookie')).toContain(`vr_vid=${existing}`);
    await flush();
    expect(events()[0].visitorId).toBe(existing);
  });

  it('ignora parámetros que no cumplen la lista blanca', async () => {
    await call('tiktok', '?video=<script>&campaign=' + 'x'.repeat(61) + '&lang=xx&utm_source=evil', {}, 'vr_consent=accepted');
    await flush();
    const [event] = events();
    expect(event.video).toBeNull();
    expect(event.campaign).toBeNull();
    expect(event.locale).toBe('en');
  });

  it('Global Privacy Control se trata como rechazo aunque haya una cookie de aceptación', async () => {
    const res = await call('tiktok', '?lang=fr', { 'sec-gpc': '1' }, 'vr_consent=accepted; vr_vid=123e4567-e89b-42d3-a456-426614174000');
    expect(res.headers.get('set-cookie') || '').not.toMatch(/vr_vid=[0-9a-f-]{36}/i);
    // La cookie anterior se borra (Max-Age=0).
    expect(res.headers.get('set-cookie') || '').toMatch(/vr_vid=;.*max-age=0/i);
    await flush();
    expect(events()).toHaveLength(0);
  });

  it('con elección rechazada borra el identificador anterior y no guarda registro', async () => {
    const res = await call('tiktok', '?lang=de', {}, 'vr_consent=rejected; vr_vid=123e4567-e89b-42d3-a456-426614174000');
    expect(res.headers.get('set-cookie') || '').toMatch(/vr_vid=;.*max-age=0/i);
    await flush();
    expect(events()).toHaveLength(0);
    expect(store.get('web_stats/whatsapp_clicks_total')?.total).toBe(1);
  });

  it('elige el idioma del mensaje desde Accept-Language cuando no hay lang válido', async () => {
    const res = await call('facebook', '', { 'accept-language': 'ja-JP,ja;q=0.9,en;q=0.8' });
    const text = new URL(res.headers.get('location') || '').searchParams.get('text') || '';
    expect(text).toContain('Vermilion Routes');
    expect(text).toContain('こんにちは');
  });
});
