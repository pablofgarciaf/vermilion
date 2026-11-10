import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SCAN_LIMIT = 1000;
const ROWS_LIMIT = 500;

/**
 * Visitantes que llegaron a WhatsApp desde TikTok o Facebook y aceptaron cookies de seguimiento.
 * Solo super y admin. Los clics sin consentimiento no tienen registro individual, así que no aparecen.
 */
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req, ['super', 'admin']);
  if ('response' in admin) return admin.response;

  try {
    const snap = await getAdminDb()
      .collection('web_events')
      .orderBy('createdAt', 'desc')
      .limit(SCAN_LIMIT)
      .get();

    const visitors = snap.docs
      .map((d) => d.data() as Record<string, unknown>)
      .filter((e) => e.placement === 'social_redirect' && typeof e.visitorId === 'string')
      .slice(0, ROWS_LIMIT)
      .map((e) => ({
        createdAt: typeof e.createdAt === 'string' ? e.createdAt : null,
        channel: typeof e.channel === 'string' ? e.channel : '',
        video: typeof e.video === 'string' ? e.video : '',
        campaign: typeof e.campaign === 'string' ? e.campaign : '',
        page: typeof e.page === 'string' ? e.page : '',
        locale: typeof e.locale === 'string' ? e.locale : '',
        country: typeof e.country === 'string' ? e.country : '',
        visitorId: e.visitorId as string,
      }));

    return NextResponse.json({ success: true, visitors, scanned: snap.size });
  } catch (error: any) {
    console.error('[admin/visitors] error leyendo visitantes:', error?.name, error?.message);
    return NextResponse.json({ success: false, error: 'No se pudieron cargar los visitantes' }, { status: 500 });
  }
}
