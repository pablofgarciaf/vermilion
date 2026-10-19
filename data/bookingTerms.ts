/**
 * Condiciones comerciales de reserva: FUENTE ÚNICA para la ficha de tour,
 * la página de reserva y el checkout. Deben coincidir con la política publicada
 * en app/[locale]/cancellation/page.tsx (secciones 1, 3 y 4).
 */

/** Depósito mínimo para confirmar una reserva (30% del total). */
export const DEPOSIT_RATE = 0.3;
/** El saldo se paga como tarde estos días antes de la salida. */
export const BALANCE_DUE_DAYS = 30;
/** Hasta estos días antes de la salida, reembolso completo menos la tasa de gestión. */
export const FULL_REFUND_DAYS = 60;
/** Tasa de gestión por persona en cancelaciones con más de 60 días de antelación (USD). */
export const CANCELLATION_FEE_PER_PERSON = 50;

/** Tasas de Galápagos que NO incluye el precio (USD por persona, visitantes extranjeros). */
export const GALAPAGOS_PARK_FEE = 200;
export const GALAPAGOS_TCT_FEE = 20;

/** WhatsApp de atención al cliente (+593 96 003 9156), mismo número que components/ui/WhatsAppButton.tsx. */
export const WHATSAPP_NUMBER = '593960039156';

/** Registro oficial en el Ministerio de Turismo del Ecuador. */
export const MINTUR_REGISTRY = '1793215456001';

/** Valoración pública en TripAdvisor (fuente única de la puntuación y el número de reseñas). */
export const TRIPADVISOR_RATING = '5.0';
export const TRIPADVISOR_REVIEW_COUNT = 51;
export const TRIPADVISOR_URL =
  'https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html';

/** Depósito mínimo con la misma fórmula que el checkout (2 decimales). */
export function depositAmount(total: number): number {
  return Number((total * DEPOSIT_RATE).toFixed(2));
}

/**
 * ¿Se puede reservar solo con el depósito? Si la salida es dentro del plazo del saldo,
 * el saldo ya vence: se paga el total. Sin fecha elegida se muestra la opción de depósito.
 */
export function canPayDeposit(travelDate?: string | null, now: Date = new Date()): boolean {
  if (!travelDate) return true;
  const departure = new Date(travelDate);
  if (Number.isNaN(departure.getTime())) return true;
  const days = (departure.getTime() - now.getTime()) / 86_400_000;
  return days > BALANCE_DUE_DAYS;
}

/** Formato de importe en USD sin decimales cuando son enteros (1,790 / 537.50). */
export function formatUsd(value: number): string {
  return Number.isInteger(value)
    ? value.toLocaleString('en-US')
    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** ¿El tour pasa por Galápagos (y por tanto paga parque + TCT)? Se deduce de sus exclusiones reales. */
export function hasGalapagosFees(exclusions?: Array<string | Record<string, string>>): boolean {
  if (!exclusions) return false;
  return exclusions.some((item) => {
    const text = typeof item === 'string' ? item : item?.en || item?.es || '';
    return /galápagos national park|galapagos national park|\bTCT\b/i.test(text);
  });
}

/** Valida un teléfono/WhatsApp con las mismas reglas que lib/validation.ts (7-15 dígitos). */
export function isPlausiblePhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return true; // es opcional
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return false;
  return /^[+\d\s()\-]{7,25}$/.test(trimmed);
}
