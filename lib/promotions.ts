import { PROMOTIONS, Promotion } from '@/data/promotions';

type TourLike = {
  durationDays?: number;
  duration?: unknown;
  destination?: string;
};

/**
 * ¿Es una excursión de un día? Manda `durationDays`; si falta, se mira el texto
 * de duración exigiendo que el "1" no vaya precedido de otro dígito
 * ("11 DAYS" contiene "1 DAY" y antes se tomaba por excursión).
 */
export function isDayTrip(tour: TourLike): boolean {
  if (typeof tour.durationDays === 'number') return tour.durationDays === 1;
  const d = tour.duration as { en?: string } | string | undefined;
  const en = typeof d === 'string' ? d : d?.en;
  return /(^|[^0-9])1\s*DAY/.test(String(en || '').toUpperCase());
}

/**
 * Alcance aprobado por el dueño (20-oct-2026): solo viajes de varios días que
 * pasan por Galápagos (Galápagos y combinados Ecuador + Galápagos). Ecuador
 * continental y excursiones de un día quedan fuera.
 */
export function isPromoEligible(tour: TourLike): boolean {
  if (isDayTrip(tour)) return false;
  return /gal[aá]pagos/i.test(String(tour.destination || ''));
}

export function isPromotionLive(promo: Promotion, now: Date = new Date()): boolean {
  const t = now.getTime();
  return t >= Date.parse(promo.startsAt) && t < Date.parse(promo.endsAt);
}

/** La promo vigente ahora mismo, o null. Si se solaparan, gana la que acaba antes. */
export function getActivePromotion(now: Date = new Date()): Promotion | null {
  const live = PROMOTIONS.filter((p) => isPromotionLive(p, now));
  live.sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
  return live[0] || null;
}

export function getPromotionById(id: string | null | undefined): Promotion | null {
  if (!id) return null;
  return PROMOTIONS.find((p) => p.id === id.toLowerCase()) || null;
}

/** Promo aplicable a este tour ahora, o null. */
export function getPromotionForTour(tour: TourLike, now: Date = new Date()): Promotion | null {
  if (!isPromoEligible(tour)) return null;
  return getActivePromotion(now);
}

/** Precio con la promo aplicada, redondeado a dólares enteros hacia abajo. */
export function promoPrice(price: number, promo: Promotion): number {
  return Math.floor(price * (1 - promo.discountRate));
}

/** Fecha de fin legible en el idioma del visitante (zona Ecuador). */
export function formatPromoLastDay(promo: Promotion, locale: string): string {
  const map: Record<string, string> = {
    es: 'es-ES', en: 'en-US', fr: 'fr-FR', de: 'de-DE',
    it: 'it-IT', pt: 'pt-PT', ja: 'ja-JP', zh: 'zh-CN',
  };
  const d = new Date(`${promo.lastDay}T12:00:00-05:00`);
  return d.toLocaleDateString(map[locale] || 'en-US', {
    day: 'numeric', month: 'long', timeZone: 'America/Guayaquil',
  });
}
