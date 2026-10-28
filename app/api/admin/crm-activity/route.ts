import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Actividad del sitio para el CRM: clics a WhatsApp (últimos 7 días) y conversaciones
 * del chat web con la IA. Solo para administradores verificados.
 */
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ('response' in admin) return admin.response;

  try {
    const adminDb = getAdminDb();
    // Contadores exactos mantenidos por /api/analytics/click (no dependen de cuántos eventos se lean).
    const todayKey = new Date().toISOString().slice(0, 10);
    const sevenDaysAgoKey = new Date(Date.now() - 6 * DAY_MS).toISOString().slice(0, 10); // hoy + 6 días previos
    const [totalSnap, dailySnap, eventsSnap] = await Promise.all([
      adminDb.collection('web_stats').doc('whatsapp_clicks_total').get(),
      adminDb.collection('web_stats').where('date', '>=', sevenDaysAgoKey).get(),
      adminDb.collection('web_events').orderBy('createdAt', 'desc').limit(30).get(),
    ]);

    const totalData = (totalSnap.data() || {}) as { total?: number; byPlacement?: Record<string, number> };
    let clicksToday = 0;
    let clicksLast7Days = 0;
    for (const d of dailySnap.docs) {
      const day = d.data() as { date?: string; total?: number };
      const n = Number(day.total) || 0;
      clicksLast7Days += n;
      if (day.date === todayKey) clicksToday = n;
    }

    const clicks = eventsSnap.docs
      .map((d) => d.data() as { type?: string; placement?: string; page?: string; locale?: string; createdAt?: string })
      .filter((e) => e.type === 'whatsapp_click');

    const sessionsSnap = await adminDb.collection('chat_sessions').orderBy('lastUpdated', 'desc').limit(30).get();
    const chatSessions = sessionsSnap.docs.map((d) => {
      const data = d.data() as {
        sessionId?: string;
        locale?: string;
        lastUpdated?: string;
        messageCount?: number;
        messages?: Array<{ role?: string; content?: string }>;
      };
      const userMessages = (data.messages || []).filter((m) => m.role === 'user');
      const lastUser = userMessages[userMessages.length - 1]?.content || '';
      return {
        id: d.id,
        locale: data.locale || '',
        lastUpdated: data.lastUpdated || null,
        messageCount: data.messageCount ?? (data.messages?.length || 0),
        lastUserMessage: lastUser.slice(0, 160),
      };
    });

    // Hilos de WhatsApp atendidos por la IA (colección whatsapp_conversations, ordenada por número de ms).
    const waSnap = await adminDb.collection('whatsapp_conversations').orderBy('updatedAt', 'desc').limit(30).get();
    const whatsappThreads = waSnap.docs.map((d) => {
      const data = d.data() as {
        phone?: string;
        name?: string;
        state?: string;
        locale?: string;
        lastCustomerMessage?: string;
        history?: unknown[];
        leadId?: string;
        updatedAt?: number;
      };
      const phone = String(data.phone || d.id);
      return {
        id: d.id,
        phoneMasked: phone.length > 4 ? `•••${phone.slice(-4)}` : phone,
        name: data.name || '',
        state: data.state || '',
        locale: data.locale || '',
        messageCount: Array.isArray(data.history) ? data.history.length : 0,
        lastCustomerMessage: (data.lastCustomerMessage || '').slice(0, 160),
        leadId: data.leadId || null,
        updatedAt: typeof data.updatedAt === 'number' ? new Date(data.updatedAt).toISOString() : null,
      };
    });

    return NextResponse.json({
      success: true,
      whatsappThreads,
      whatsappClicks: {
        total: Number(totalData.total) || 0,
        today: clicksToday,
        last7Days: clicksLast7Days,
        byPlacement: Object.entries(totalData.byPlacement || {})
          .map(([placement, count]) => ({ placement, count: Number(count) || 0 }))
          .sort((a, b) => b.count - a.count),
        recent: clicks.slice(0, 30).map((c) => ({
          placement: c.placement || 'unknown',
          page: c.page || '',
          locale: c.locale || '',
          createdAt: c.createdAt || null,
        })),
      },
      chatSessions,
    });
  } catch (error: any) {
    console.error('[crm-activity] error leyendo actividad:', error?.name, error?.message);
    return NextResponse.json({ success: false, error: 'No se pudo cargar la actividad' }, { status: 500 });
  }
}
