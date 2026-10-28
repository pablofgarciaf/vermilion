/**
 * Contador de clics a WhatsApp (/api/analytics/click).
 * Se usa un Firestore falso en memoria para comprobar que cada clic suma al total,
 * al día y al lugar, y que se guarda el registro del evento.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { store, adminState } = vi.hoisted(() => ({
  store: new Map<string, Record<string, any>>(),
  adminState: { autoId: 0 },
}));

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

import { POST } from '@/app/api/analytics/click/route';

function req(body: unknown): any {
  return new Request('http://localhost:3000/api/analytics/click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/analytics/click', () => {
  beforeEach(() => {
    store.clear();
  });

  it('suma al total, al día y al lugar, y guarda el evento', async () => {
    const day = new Date().toISOString().slice(0, 10);

    const r1 = await POST(req({ type: 'whatsapp_click', placement: 'tour_modal', page: '/es/tours/x', locale: 'es' }));
    const r2 = await POST(req({ type: 'whatsapp_click', placement: 'tour_modal', page: '/es/tours/x', locale: 'es' }));
    const r3 = await POST(req({ type: 'whatsapp_click', placement: 'floating_button', page: '/es', locale: 'es' }));

    expect([r1.status, r2.status, r3.status]).toEqual([204, 204, 204]);

    const total = store.get('web_stats/whatsapp_clicks_total');
    expect(total?.total).toBe(3);
    expect(total?.byPlacement).toEqual({ tour_modal: 2, floating_button: 1 });

    const daily = store.get(`web_stats/whatsapp_clicks_${day}`);
    expect(daily?.total).toBe(3);
    expect(daily?.date).toBe(day);

    const events = [...store.keys()].filter((k) => k.startsWith('web_events/'));
    expect(events).toHaveLength(3);
  });

  it('rechaza tipos de evento distintos de whatsapp_click', async () => {
    const r = await POST(req({ type: 'page_view' }));
    expect(r.status).toBe(400);
    expect(store.size).toBe(0);
  });

  it('normaliza un lugar inválido a "unknown"', async () => {
    await POST(req({ type: 'whatsapp_click', placement: '<script>' }));
    expect(store.get('web_stats/whatsapp_clicks_total')?.byPlacement).toEqual({ unknown: 1 });
  });
});
