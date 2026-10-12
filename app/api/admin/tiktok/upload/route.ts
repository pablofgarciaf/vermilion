import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { ALLOWED_VIDEO_TYPES, fetchPublishStatus, getValidAccessToken, initInboxUpload, uploadsCollection } from '@/lib/tiktok';

export const dynamic = 'force-dynamic';

/** Inicia una subida a la bandeja de borradores de TikTok y devuelve la URL de subida. */
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req, ['super', 'admin']);
  if ('response' in admin) return admin.response;

  const body = await req.json().catch(() => ({}));
  const size = Number(body?.size);
  const type = String(body?.type || '');
  const fileName = String(body?.fileName || 'video').slice(0, 120);
  if (!ALLOWED_VIDEO_TYPES.includes(type as (typeof ALLOWED_VIDEO_TYPES)[number])) {
    return NextResponse.json({ success: false, error: 'invalid_type' }, { status: 400 });
  }

  try {
    const token = await getValidAccessToken();
    const upload = await initInboxUpload(token, size);
    await uploadsCollection().doc(upload.publishId).set({
      uploadUrl: upload.uploadUrl,
      size,
      type,
      fileName,
      createdBy: admin.user.email,
      createdAt: Date.now(),
      status: 'initialized',
    });
    return NextResponse.json({ success: true, ...upload });
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'init_failed';
    console.error('[TikTok upload init]', reason);
    return NextResponse.json({ success: false, error: reason }, { status: 502 });
  }
}

/** Estado de una subida: PROCESSING_UPLOAD, SEND_TO_USER_INBOX, FAILED, etc. */
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req, ['super', 'admin']);
  if ('response' in admin) return admin.response;

  const publishId = req.nextUrl.searchParams.get('publishId') || '';
  if (!publishId) return NextResponse.json({ success: false, error: 'missing_publish_id' }, { status: 400 });

  try {
    const token = await getValidAccessToken();
    const status = await fetchPublishStatus(token, publishId);
    await uploadsCollection().doc(publishId).set({ status: status.status, failReason: status.fail_reason || null }, { merge: true });
    return NextResponse.json({ success: true, status: status.status, failReason: status.fail_reason || null });
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'status_failed';
    return NextResponse.json({ success: false, error: reason }, { status: 502 });
  }
}
