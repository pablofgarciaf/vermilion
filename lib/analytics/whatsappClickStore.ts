import { getAdminDb } from '@/lib/firebaseAdmin';

type Counter = { total: number; byPlacement: Record<string, number> };

export function bumpCounter(counter: Partial<Counter> | undefined, placement: string): Counter {
  const current: Counter = {
    total: Number(counter?.total) || 0,
    byPlacement: { ...(counter?.byPlacement || {}) },
  };
  current.total += 1;
  current.byPlacement[placement] = (Number(current.byPlacement[placement]) || 0) + 1;
  return current;
}

export interface WhatsAppClickInput {
  placement: string;
  page: string;
  locale: string;
  /**
   * Campos extra del registro del evento. Solo se pasa cuando hay datos que se pueden guardar
   * (datos de visitante con consentimiento). Sin `event` no se escribe ningún registro.
   */
  event?: Record<string, unknown>;
}

/**
 * Registra un clic en WhatsApp para el CRM, en una sola transacción:
 *  - `web_stats/whatsapp_clicks_total`: contador total y por lugar, exacto.
 *  - `web_stats/whatsapp_clicks_YYYY-MM-DD`: contador del día y por lugar.
 *  - `web_events`: un registro por clic, solo si se pasa `event`.
 * Los contadores no contienen datos personales ni identificadores.
 */
export async function recordWhatsAppClick({ placement, page, locale, event }: WhatsAppClickInput): Promise<void> {
  const createdAt = new Date().toISOString();
  const day = createdAt.slice(0, 10);

  const adminDb = getAdminDb();
  const totalRef = adminDb.collection('web_stats').doc('whatsapp_clicks_total');
  const dayRef = adminDb.collection('web_stats').doc(`whatsapp_clicks_${day}`);
  const eventRef = event ? adminDb.collection('web_events').doc() : null;

  await adminDb.runTransaction(async (t) => {
    const [totalSnap, daySnap] = await Promise.all([t.get(totalRef), t.get(dayRef)]);
    t.set(totalRef, bumpCounter(totalSnap.data() as Partial<Counter>, placement));
    t.set(dayRef, { date: day, ...bumpCounter(daySnap.data() as Partial<Counter>, placement) });
    if (eventRef) {
      t.set(eventRef, { ...event, type: 'whatsapp_click', placement, page, locale, createdAt });
    }
  });
}
