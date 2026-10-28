import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PLACEMENT_RE = /^[a-z0-9_:-]{1,80}$/i;
const PATH_MAX = 300;

type Counter = { total: number; byPlacement: Record<string, number> };

function bump(counter: Partial<Counter> | undefined, placement: string): Counter {
  const current: Counter = {
    total: Number(counter?.total) || 0,
    byPlacement: { ...(counter?.byPlacement || {}) },
  };
  current.total += 1;
  current.byPlacement[placement] = (Number(current.byPlacement[placement]) || 0) + 1;
  return current;
}

/**
 * Registra un clic en un enlace de WhatsApp para el CRM, en una sola transacción:
 *  - `web_events`: registro de cada clic (fecha, lugar, página, idioma).
 *  - `web_stats/whatsapp_clicks_total`: contador total y por lugar, exacto.
 *  - `web_stats/whatsapp_clicks_YYYY-MM-DD`: contador del día y por lugar.
 * No guarda cookies, IP ni datos personales.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (body?.type !== 'whatsapp_click') {
    return new NextResponse(null, { status: 400 });
  }

  const placement =
    typeof body.placement === 'string' && PLACEMENT_RE.test(body.placement) ? body.placement : 'unknown';
  const page = typeof body.page === 'string' ? body.page.slice(0, PATH_MAX) : '';
  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 8) : '';

  const now = new Date();
  const createdAt = now.toISOString();
  const day = createdAt.slice(0, 10);

  try {
    const adminDb = getAdminDb();
    const totalRef = adminDb.collection('web_stats').doc('whatsapp_clicks_total');
    const dayRef = adminDb.collection('web_stats').doc(`whatsapp_clicks_${day}`);
    const eventRef = adminDb.collection('web_events').doc();

    await adminDb.runTransaction(async (t) => {
      const [totalSnap, daySnap] = await Promise.all([t.get(totalRef), t.get(dayRef)]);
      t.set(totalRef, bump(totalSnap.data() as Partial<Counter>, placement));
      t.set(dayRef, { date: day, ...bump(daySnap.data() as Partial<Counter>, placement) });
      t.set(eventRef, { type: 'whatsapp_click', placement, page, locale, createdAt });
    });
  } catch (err: any) {
    console.error('[WhatsAppClick] no se pudo guardar el clic:', err?.name, err?.message);
    return new NextResponse(null, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
