import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { isWebInquiry } from '@/lib/crm/webInquiry';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DAY_MS = 86_400_000;
const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;
type Device = typeof DEVICE_TYPES[number];

function isoDate(value: unknown): string | null {
  if (typeof value === 'string') return Number.isNaN(Date.parse(value)) ? null : value;
  if (value && typeof (value as { toDate?: unknown }).toDate === 'function') return (value as { toDate: () => Date }).toDate().toISOString();
  return null;
}

function inRange(value: unknown, from: Date): boolean {
  const date = isoDate(value);
  return Boolean(date && new Date(date) >= from);
}

function emptyDevices(): Record<Device, number> {
  return { mobile: 0, tablet: 0, desktop: 0 };
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request, ['super', 'admin']);
  if ('response' in admin) return admin.response;

  const parsedDays = Number(new URL(request.url).searchParams.get('days'));
  const days = [7, 28, 90].includes(parsedDays) ? parsedDays : 28;
  const from = new Date(Date.now() - (days - 1) * DAY_MS);
  from.setHours(0, 0, 0, 0);
  const fromKey = from.toISOString().slice(0, 10);

  try {
    const db = getAdminDb();
    const [leads, bookings, stats] = await Promise.all([
      db.collection('leads').get(),
      db.collection('bookings').get(),
      db.collection('web_stats').where('date', '>=', fromKey).get(),
    ]);

    let createdLeads = leads.docs.filter((doc) => inRange(doc.data().createdAt, from)).length;
    let quotations = leads.docs.filter((doc) => ['itinerary_sent', 'negotiation', 'won'].includes(String(doc.data().status))).length;
    let bookingsCreated = 0;
    let paidBookings = 0;
    let confirmedRevenue = 0;

    for (const document of bookings.docs) {
      const data = document.data() as Record<string, unknown>;
      if (isWebInquiry(data)) {
        if (inRange(data.createdAt, from)) createdLeads += 1;
        if (['itinerary_sent', 'negotiation', 'won'].includes(String(data.leadStatus))) quotations += 1;
        continue;
      }
      if (!inRange(data.createdAt, from)) continue;
      bookingsCreated += 1;
      const verified = ['paid', 'confirmed', 'payment_verified'].includes(String(data.paymentStatus))
        || ['deposit_confirmed', 'fully_paid', 'in_operation', 'completed'].includes(String(data.status));
      const paid = Number(data.paidAmount) || Number(data.amountPaid) || 0;
      if (verified && paid > 0) {
        paidBookings += 1;
        confirmedRevenue += paid;
      }
    }

    const devices = emptyDevices();
    let whatsappClicks = 0;
    for (const document of stats.docs) {
      const data = document.data() as { byDevice?: Partial<Record<Device, number>>; total?: number };
      if (document.id.startsWith('device_sessions_')) {
        for (const device of DEVICE_TYPES) devices[device] += Number(data.byDevice?.[device]) || 0;
      }
      if (document.id.startsWith('whatsapp_clicks_')) whatsappClicks += Number(data.total) || 0;
    }

    const trackedSessions = Object.values(devices).reduce((sum, value) => sum + value, 0);
    return NextResponse.json({
      success: true,
      period: { days, from: fromKey, to: new Date().toISOString().slice(0, 10) },
      devices: { sessions: trackedSessions, byDevice: devices, source: 'first_party_consented' },
      funnel: { createdLeads, quotations, bookingsCreated, paidBookings, confirmedRevenue, whatsappClicks },
      availability: { ga4: false, note: 'GA4 todavía no está conectado por API al panel; las sesiones por dispositivo son propias y empiezan a medirse desde esta actualización.' },
    });
  } catch (error: any) {
    console.error('[commercial-performance] aggregation failed:', error?.name, error?.message);
    return NextResponse.json({ success: false, error: 'No se pudo cargar el rendimiento comercial.' }, { status: 500 });
  }
}

