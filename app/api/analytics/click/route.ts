import { NextRequest, NextResponse } from 'next/server';
import { recordWhatsAppClick } from '@/lib/analytics/whatsappClickStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PLACEMENT_RE = /^[a-z0-9_:-]{1,80}$/i;
const PATH_MAX = 300;

/**
 * Registra un clic en un enlace de WhatsApp para el CRM (contadores y registro del evento).
 * No guarda cookies, IP ni datos personales.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (body?.type !== 'whatsapp_click') {
    return new NextResponse(null, { status: 400 });
  }

  const placement =
    typeof body.placement === 'string' && PLACEMENT_RE.test(body.placement) ? body.placement : 'unknown';
  const page = typeof body.page === 'string' ? body.page.slice(0, PATH_MAX) : '';
  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 8) : '';

  try {
    await recordWhatsAppClick({ placement, page, locale, event: {} });
  } catch (err: any) {
    console.error('[WhatsAppClick] no se pudo guardar el clic:', err?.name, err?.message);
    return new NextResponse(null, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
