/**
 * Enlaces de TikTok y Facebook que pasan por /go/[channel] antes de abrir WhatsApp.
 * Solo se aceptan canales y parámetros de esta lista blanca; el resto se ignora.
 */
import { isSupportedLocale, type SupportedLocale } from '@/lib/consent/constants';

export const SOCIAL_CHANNELS = ['tiktok', 'facebook'] as const;
export type SocialChannel = (typeof SOCIAL_CHANNELS)[number];

/** Número para los enlaces de TikTok y Facebook. La web sigue usando su número habitual. */
export const SOCIAL_WHATSAPP_NUMBER = '593983992549';

const VIDEO_RE = /^[a-zA-Z0-9-]{1,40}$/;
const CAMPAIGN_RE = /^[\p{L}\p{N}_ .-]{1,60}$/u;

export function isSocialChannel(value: string): value is SocialChannel {
  return (SOCIAL_CHANNELS as readonly string[]).includes(value);
}

export interface SocialParams {
  video: string | null;
  campaign: string | null;
  lang: SupportedLocale | null;
}

export function parseSocialParams(params: URLSearchParams): SocialParams {
  const video = params.get('video') ?? '';
  const campaign = (params.get('campaign') ?? '').trim();
  const lang = params.get('lang') ?? '';
  return {
    video: VIDEO_RE.test(video) ? video : null,
    campaign: CAMPAIGN_RE.test(campaign) ? campaign : null,
    lang: isSupportedLocale(lang) ? lang : null,
  };
}

/** Idioma de respaldo desde Accept-Language (es-EC → es). Por defecto inglés, como el resto del sitio. */
export function localeFromAcceptLanguage(header: string | null): SupportedLocale {
  for (const part of (header || '').split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase();
    if (isSupportedLocale(tag)) return tag;
    const base = tag.split('-')[0];
    if (isSupportedLocale(base)) return base;
  }
  return 'en';
}

const PREFILL_LOADERS: Record<SupportedLocale, () => Promise<{ default: unknown }>> = {
  en: () => import('@/messages/en.json'),
  es: () => import('@/messages/es.json'),
  fr: () => import('@/messages/fr.json'),
  de: () => import('@/messages/de.json'),
  zh: () => import('@/messages/zh.json'),
  it: () => import('@/messages/it.json'),
  pt: () => import('@/messages/pt.json'),
  ja: () => import('@/messages/ja.json'),
};

const PREFILL_FALLBACK = 'Hi Vermilion Routes!';

/** Mensaje prellenado en el idioma del visitante (messages/*.json, clave socialRedirect.whatsappPrefill). */
export async function getWhatsAppPrefill(locale: SupportedLocale): Promise<string> {
  try {
    const mod = await PREFILL_LOADERS[locale]();
    const text = (mod.default as { socialRedirect?: { whatsappPrefill?: unknown } }).socialRedirect?.whatsappPrefill;
    return typeof text === 'string' && text ? text : PREFILL_FALLBACK;
  } catch {
    return PREFILL_FALLBACK;
  }
}

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${SOCIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Página de tours en el idioma del video (TikTok). Los parámetros utm van en minúsculas
 * para que el seguimiento del CRM distinga el origen sin mezclar mayúsculas.
 */
export function buildTourPageUrl(
  origin: string,
  locale: SupportedLocale,
  params: { video: string | null; campaign: string | null },
): string {
  const url = new URL(`/${locale}/tours`, origin);
  url.searchParams.set('utm_source', 'tiktok');
  url.searchParams.set('utm_medium', 'social');
  if (params.campaign) url.searchParams.set('utm_campaign', params.campaign.toLowerCase().replace(/\s+/g, '-'));
  if (params.video) url.searchParams.set('utm_content', params.video.toLowerCase());
  return url.toString();
}
