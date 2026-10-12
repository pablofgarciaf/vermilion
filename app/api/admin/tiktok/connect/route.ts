import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { locales } from '@/i18n/request';
import { STATE_COOKIE, STATE_TTL_MS, buildAuthorizeUrl, getTikTokConfig, newNonce, signState } from '@/lib/tiktok';

export const dynamic = 'force-dynamic';

/** Devuelve la URL de autorización de TikTok y fija la cookie que ata el flujo a este navegador. */
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req, ['super', 'admin']);
  if ('response' in admin) return admin.response;

  const cfg = getTikTokConfig();
  if (!cfg) return NextResponse.json({ success: false, error: 'not_configured' }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const locale = locales.includes(body?.locale) ? body.locale : 'en';
  const nonce = newNonce();
  const state = signState({ n: nonce, l: locale, u: admin.user.email, e: Date.now() + STATE_TTL_MS }, cfg.clientSecret);

  const res = NextResponse.json({ success: true, url: buildAuthorizeUrl(cfg.clientKey, cfg.redirectUri, state) });
  res.cookies.set(STATE_COOKIE, nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/tiktok',
    maxAge: STATE_TTL_MS / 1000,
  });
  return res;
}
