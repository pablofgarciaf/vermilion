import { randomUUID } from 'crypto';
import { NextRequest, NextResponse, after } from 'next/server';
import { recordWhatsAppClick } from '@/lib/analytics/whatsappClickStore';
import { CONSENT_COOKIE, VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from '@/lib/consent/constants';
import { normalizeCountry } from '@/lib/consent/regions';
import { readServerConsent } from '@/lib/consent/serverConsent';
import {
  buildTourPageUrl,
  buildWhatsAppUrl,
  getWhatsAppPrefill,
  isSocialChannel,
  localeFromAcceptLanguage,
  parseSocialParams,
} from '@/lib/social/whatsappRedirect';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function logRecordError(err: unknown) {
  const e = err as { name?: string; message?: string } | undefined;
  console.error('[social-redirect] no se pudo registrar el clic:', e?.name, e?.message);
}

/**
 * Página de redirección para TikTok y Facebook: /go/tiktok?video=...&campaign=...&lang=...
 * Registra el origen y responde 302: TikTok a la página de tours (en el idioma del video) y
 * Facebook a WhatsApp.
 *
 * - Sin consentimiento (o con Global Privacy Control): solo suma el clic a los contadores
 *   anónimos, sin cookies ni registro individual. Si había un identificador anterior, se borra.
 * - Con consentimiento aceptado: guarda el registro del evento y crea el identificador anónimo
 *   (cookie HttpOnly, SameSite=Lax, 90 días).
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;
  if (!isSocialChannel(channel)) {
    return new NextResponse('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  }

  const { video, campaign, lang } = parseSocialParams(req.nextUrl.searchParams);
  const locale = lang ?? localeFromAcceptLanguage(req.headers.get('accept-language'));
  const consent = readServerConsent(req.cookies.get(CONSENT_COOKIE)?.value, req.headers.get('sec-gpc'));
  const country = normalizeCountry(req.headers.get('x-vercel-ip-country'));
  const page = `/go/${channel}`;

  const target =
    channel === 'tiktok'
      ? buildTourPageUrl(req.nextUrl.origin, locale, { video, campaign })
      : buildWhatsAppUrl(await getWhatsAppPrefill(locale));
  const res = NextResponse.redirect(target, 302);
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');

  if (consent !== 'accepted') {
    if (req.cookies.has(VISITOR_COOKIE)) {
      res.cookies.set(VISITOR_COOKIE, '', { path: '/', maxAge: 0, httpOnly: true, sameSite: 'lax' });
    }
    after(() =>
      recordWhatsAppClick({ placement: 'social_redirect', page, locale }).catch(logRecordError),
    );
    return res;
  }

  const existing = req.cookies.get(VISITOR_COOKIE)?.value ?? '';
  const visitorId = UUID_RE.test(existing) ? existing : randomUUID();
  res.cookies.set(VISITOR_COOKIE, visitorId, {
    path: '/',
    maxAge: VISITOR_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  after(() =>
    recordWhatsAppClick({
      placement: 'social_redirect',
      page,
      locale,
      event: { channel, video, campaign, country, visitorId },
    }).catch(logRecordError),
  );
  return res;
}
