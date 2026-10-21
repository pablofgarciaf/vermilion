/** Validación y carga útil del formulario corto de cotización (home). */
export interface QuickQuoteInput {
  name: string;
  email: string;
  dates: string;
}

export type QuickQuoteError = 'name' | 'email' | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateQuickQuote({ name, email }: QuickQuoteInput): QuickQuoteError {
  if (name.trim().length < 2) return 'name';
  if (!EMAIL_RE.test(email.trim())) return 'email';
  return null;
}

/** Carga para POST /api/leads (el servidor exige nombre y correo). */
export function buildQuickQuotePayload(input: QuickQuoteInput, locale: string, promoId?: string) {
  const dates = input.dates.trim();
  return {
    tourId: 'general-inquiry',
    tourTitle: 'Quick quote (home)',
    customerName: input.name.trim(),
    customerEmail: input.email.trim(),
    destination: 'Galapagos / Mainland Ecuador',
    travelDates: dates || 'Flexible',
    message: promoId ? `[Promo vigente: ${promoId}]` : '',
    locale,
  };
}
