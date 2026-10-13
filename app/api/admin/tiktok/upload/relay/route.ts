import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { RELAY_MAX_BYTES, putChunk, uploadsCollection } from '@/lib/tiktok';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Respaldo: si el navegador no puede subir directo a TikTok, envía aquí la parte (≤ 4,4 MB)
 * y el servidor la reenvía. La URL de destino sale de Firestore, nunca del cliente.
 */
export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req, ['super', 'admin']);
  if ('response' in admin) return admin.response;

  const q = req.nextUrl.searchParams;
  const publishId = q.get('publishId') || '';
  const start = Number(q.get('start'));
  const end = Number(q.get('end'));
  if (!publishId || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start) {
    return NextResponse.json({ success: false, error: 'invalid_range' }, { status: 400 });
  }

  const snap = await uploadsCollection().doc(publishId).get();
  const upload = snap.data();
  if (!upload?.uploadUrl || end >= upload.size) {
    return NextResponse.json({ success: false, error: 'unknown_upload' }, { status: 404 });
  }

  const bytes = await req.arrayBuffer();
  if (bytes.byteLength > RELAY_MAX_BYTES || bytes.byteLength !== end - start + 1) {
    return NextResponse.json({ success: false, error: 'invalid_chunk' }, { status: 413 });
  }

  try {
    await putChunk(upload.uploadUrl, bytes, start, end, upload.size, upload.type);
    return NextResponse.json({ success: true });
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'relay_failed';
    return NextResponse.json({ success: false, error: reason }, { status: 502 });
  }
}
