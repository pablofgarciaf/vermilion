/**
 * Medición de leads para GA4, Meta Pixel y Google Tag Manager.
 *
 * - GA4 (gtag): evento `generate_lead` con el método y el lugar del clic o del envío.
 * - Meta Pixel: evento `Lead`.
 * - GTM (capa de datos): eventos `quote_form_submitted` (formulario de cotización enviado con
 *   éxito), `vr_form_submit` (otros formularios con éxito) y `vr_whatsapp_click` (clic en WhatsApp).
 *   GTM usa `quote_form_submitted` para la conversión de Google Ads de cotizaciones.
 *
 * Todo respeta el ConsentManager (components/privacy/ConsentManager.tsx): si el visitante
 * RECHAZÓ las cookies opcionales, no se envía nada. Con el banner el consentimiento se
 * guarda en localStorage con el valor 'accepted'.
 */

export type LeadMethod = 'contact_form' | 'quote_email' | 'lead_magnet' | 'ai_concierge' | 'whatsapp';

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

function canTrack(): boolean {
  return typeof window !== 'undefined' && hasAnalyticsConsent();
}

/** Añade un evento a la capa de datos que lee GTM. */
function pushToDataLayer(payload: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Clic en un enlace de WhatsApp: GA4 `generate_lead` + Meta `Lead` + evento GTM. */
export function trackGenerateLead({ method, placement, item }: LeadEventParams): void {
  if (!canTrack()) return;

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

/**
 * Registro del clic en el CRM (servidor). Es propio del sitio: no usa cookies ni guarda datos
 * personales (solo dónde se pulsó, la página y el idioma), así que no depende del banner.
 */
function sendWhatsAppClickToCrm(placement: string): void {
  try {
    const body = JSON.stringify({
      type: 'whatsapp_click',
      placement,
      page: window.location.pathname,
      locale: document.documentElement.lang || '',
    });
    const sent =
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function' &&
      navigator.sendBeacon('/api/analytics/click', new Blob([body], { type: 'application/json' }));
    if (!sent) {
      fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Un fallo de registro nunca debe bloquear el enlace a WhatsApp.
  }
}

/** Clic en WhatsApp (enlace wa.me o window.open). Lo usa WhatsAppClickTracker y los botones con window.open. */
export function trackWhatsAppClick(placement: string): void {
  sendWhatsAppClickToCrm(placement);
  if (!canTrack()) return;

  try {
    pushToDataLayer({
      event: 'vr_whatsapp_click',
      lead_source: placement,
      page_location: window.location.href,
    });
  } catch {
    // ignorar
  }
  trackGenerateLead({ method: 'whatsapp', placement });
}

/** Empuja a la capa de datos un formulario enviado CON ÉXITO y lo registra en GA4/Meta. */
function trackSuccessfulForm(
  eventName: 'vr_form_submit' | 'quote_form_submitted',
  { method, placement, item }: LeadEventParams,
): void {
  if (!canTrack()) return;

  try {
    pushToDataLayer({
      event: eventName,
      lead_method: method,
      lead_source: placement || method,
      form_item: item,
      page_location: window.location.href,
    });
  } catch {
    // ignorar
  }
  trackGenerateLead({ method, placement, item });
}

/**
 * Formulario de cotización enviado CON ÉXITO (la respuesta del servidor fue correcta).
 * Llamarlo solo tras confirmar el envío, nunca al pulsar el botón.
 * GTM dispara la conversión de Google Ads con el evento `quote_form_submitted`.
 */
export function trackQuoteFormSubmitted(params: LeadEventParams): void {
  trackSuccessfulForm('quote_form_submitted', params);
}

/**
 * Otros formularios enviados con éxito (guía PDF, banner, modal de Galápagos...).
 * Evento `vr_form_submit`.
 */
export function trackFormSubmit(params: LeadEventParams): void {
  trackSuccessfulForm('vr_form_submit', params);
}
