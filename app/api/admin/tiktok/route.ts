import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { deleteConnection, getConnection, getTikTokConfig, revokeToken } from '@/lib/tiktok';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Estado de la integración para el panel. Nunca devuelve tokens. */
export async function GET(req: NextRequest) {
  try {
    const admin = await requireAdmin(req, ['super', 'admin']);
    if ('response' in admin) return admin.response;

    const configured = Boolean(getTikTokConfig());
    try {
      const conn = configured ? await getConnection() : null;
      return NextResponse.json({
        configured,
        connected: Boolean(conn),
        profile: conn
          ? {
              displayName: conn.displayName,
              avatarUrl: conn.avatarUrl,
              scope: conn.scope,
              connectedAt: conn.connectedAt,
              reconnectRequired: conn.refreshExpiresAt <= Date.now(),
            }
          : null,
      });
    } catch (err) {
      console.warn('[TikTok status]', err);
      return NextResponse.json({ configured, connected: false, profile: null, error: 'status_failed' }, { status: 200 });
    }
  } catch (err) {
    console.error('[TikTok status unhandled]', err);
    return NextResponse.json({ configured: Boolean(getTikTokConfig()), connected: false, profile: null }, { status: 200 });
  }
}

/** Desconecta la cuenta: revoca el token en TikTok y borra la conexión guardada. */
export async function DELETE(req: NextRequest) {
  try {
    const admin = await requireAdmin(req, ['super', 'admin']);
    if ('response' in admin) return admin.response;

    const conn = await getConnection();
    if (conn) await revokeToken(conn.accessToken);
    await deleteConnection();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[TikTok disconnect]', err);
    return NextResponse.json({ success: false, error: 'disconnect_failed' }, { status: 500 });
  }
}
