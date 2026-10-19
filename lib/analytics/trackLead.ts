/**
 * Evento de conversión `generate_lead` (GA4) y `Lead` (Meta Pixel).
 *
 * Respeta el ConsentManager (components/privacy/ConsentManager.tsx): solo se envía
 * si el visitante ACEPTÓ las cookies opcionales. El banner promete que, si las rechaza,
 * "no activamos analítica, anuncios ni Meta Pixel", así que no mandamos ni pings sin cookies.
 */

export type LeadMethod = 'contact_form' | 'lead_magnet' | 'ai_concierge' | 'whatsapp';

export interface LeadEventParams {
  method: LeadMethod;
  /** Dónde ocurrió (ej. 'home_contact', 'floating_button', 'tour_modal'). */
  placement?: string;
  /** Tour o destino de interés, si se conoce. */
  item?: string;
}

/** Misma clave que usa ConsentManager para guardar la elección. */
const CONSENT_STORAGE_KEY = 'vr_privacy_consent_v1';

function hasAnalyticsConsent(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export function trackGenerateLead({ method, placement, item }: LeadEventParams): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  try {
    window.gtag?.('event', 'generate_lead', {
      method,
      lead_source: placement || method,
      ...(item ? { item_name: item } : {}),
      page_location: window.location.href,
    });
    window.fbq?.('track', 'Lead', { content_name: item || method, content_category: method });
  } catch {
    // La analítica nunca debe romper un envío de formulario ni un clic.
  }
}
