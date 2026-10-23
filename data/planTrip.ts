/**
 * Formulario por pasos "Planifica tu viaje" (ventana que abren la cabecera, el hero y los tours).
 *
 * CALL_BOOKING_URL: enlace público de la agenda de citas de Google Calendar
 * ("Vermilion Routes · Free trip planning call"). Mientras esté vacío, la pantalla final
 * no muestra el botón de videollamada. Solo URL pública: nada de tokens aquí.
 */
export const CALL_BOOKING_URL = 'https://calendar.app.google/eri9JoiaQs7Hmv9c9';

export const PLAN_TRIP_EVENT = 'open-plan-trip';

export interface PlanTripDetail {
  /** Tour desde el que se abre (se envía con el lead). */
  tourId?: string;
  tourTitle?: string;
  /** Resumen extra para el equipo (p. ej. actividades elegidas y sugerencia comercial). */
  notes?: string;
  /** Destino preseleccionado. */
  destination?: PlanTripDestination;
}

export type PlanTripDestination = 'galapagos' | 'andes' | 'amazon' | 'combo' | 'dayTrips';

export const PLAN_TRIP_DESTINATIONS: { id: PlanTripDestination; image: string; leadValue: string }[] = [
  { id: 'galapagos', image: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.webp', leadValue: 'Galapagos Islands' },
  { id: 'combo', image: '/images/tours/9-16/galapagos-flamenco-rosa-reflejo-9-16.webp', leadValue: 'Galapagos & Ecuador Combo' },
  { id: 'andes', image: '/images/tours/9-16/cotopaxi-9-16.webp', leadValue: 'Mainland Ecuador (Andes)' },
  { id: 'amazon', image: '/images/tours/9-16/amazon-nutria-9-16.webp', leadValue: 'Amazon Rainforest' },
  { id: 'dayTrips', image: '/images/tours/9-16/pailon-diablo-9-16.webp', leadValue: 'Full Day Excursions' },
];

export const PLAN_TRIP_DAYS = ['1-3', '4-6', '7-9', '10-14', '15+'] as const;
export const PLAN_TRIP_BUDGETS = ['<1500', '1500-3000', '3000-5000', '5000+', 'unknown'] as const;
export const PLAN_TRIP_CONTACT = ['email', 'call', 'video', 'whatsapp'] as const;

/** Abre la ventana desde cualquier botón de la web. */
export function openPlanTrip(detail: PlanTripDetail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<PlanTripDetail>(PLAN_TRIP_EVENT, { detail }));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

export function validatePlanTripContact(name: string, email: string, phone: string): 'name' | 'email' | 'phone' | null {
  if (name.trim().length < 2) return 'name';
  if (!EMAIL_RE.test(email.trim())) return 'email';
  if (phone.trim() && !PHONE_RE.test(phone.trim())) return 'phone';
  return null;
}
