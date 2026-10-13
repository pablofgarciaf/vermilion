import { NextRequest, NextResponse } from 'next/server';
import { STATE_COOKIE, TIKTOK_SCOPES, exchangeCode, fetchUserInfo, getTikTokConfig, saveConnection, verifyState } from '@/lib/tiktok';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Redirect URI registrada en TikTok Login Kit. TikTok vuelve aquí con `code` y `state`;
 * se valida la firma del state y la cookie del navegador antes de canjear el código.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const cfg = getTikTokConfig();
  const stateParam = url.searchParams.get('state') || '';
  const state = cfg ? verifyState(stateParam, cfg.clientSecret) : null;
  const locale = state?.l || 'en';

  const back = (result: 'connected' | 'error', reason?: string) => {
    const target = new URL(`/${locale}/admin/tiktok`, url.origin);
    target.searchParams.set('tiktok', result);
    if (reason) target.searchParams.set('reason', reason);
    const res = NextResponse.redirect(target, 303);
    res.cookies.set(STATE_COOKIE, '', { path: '/api/tiktok', maxAge: 0 });
    return res;
  };

  if (!cfg) return back('error', 'not_configured');
  if (url.searchParams.get('error')) return back('error', url.searchParams.get('error') || 'denied');
  if (!state || state.n !== req.cookies.get(STATE_COOKIE)?.value) return back('error', 'invalid_state');

  const code = url.searchParams.get('code');
  if (!code) return back('error', 'missing_code');

  try {
    const tokens = await exchangeCode(code);
    const granted = tokens.scope.split(',').map((s) => s.trim());
    if (!TIKTOK_SCOPES.every((s) => granted.includes(s))) return back('error', 'missing_scope');
    const profile = await fetchUserInfo(tokens.access_token);
    await saveConnection(tokens, profile, state.u);
    return back('connected');
  } catch (err) {
    console.error('[TikTok callback]', err);
    return back('error', err instanceof Error ? err.message.slice(0, 40) : 'exchange_failed');
  }
}
