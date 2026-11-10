import { NextRequest, NextResponse } from 'next/server';
import { isSupportedLocale } from '@/lib/consent/constants';
import { resolveConsentRegion } from '@/lib/consent/regions';

export const dynamic = 'force-dynamic';

/**
 * Región de consentimiento del visitante para el banner de cookies (no guarda nada).
 * Devuelve solo la región y si hay Global Privacy Control; nunca el país.
 */
export function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('locale') || '';
  const locale = isSupportedLocale(raw) ? raw : 'en';
  return NextResponse.json(
    {
      region: resolveConsentRegion(req.headers.get('x-vercel-ip-country'), locale),
      gpc: req.headers.get('sec-gpc') === '1',
    },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
