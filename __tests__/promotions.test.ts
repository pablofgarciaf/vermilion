import { describe, it, expect } from 'vitest';
import { calculateTourPrice } from '@/lib/pricing';
import { getActivePromotion, getPromotionForTour, isDayTrip, isPromoEligible, promoPrice } from '@/lib/promotions';
import { PROMOTIONS } from '@/data/promotions';
import { mockTours } from '@/data/mock';

const at = (iso: string) => new Date(iso);
const halloween = PROMOTIONS.find((p) => p.id === 'halloween-2026')!;
const blackFriday = PROMOTIONS.find((p) => p.id === 'black-friday-2026')!;

describe('Promociones por festivos', () => {
  it('respeta los máximos aprobados por el dueño (5 % Halloween, 10 % Black Friday)', () => {
    expect(halloween.discountRate).toBe(0.05);
    expect(blackFriday.discountRate).toBe(0.10);
    for (const p of PROMOTIONS) expect(p.discountRate).toBeLessThanOrEqual(0.10);
  });

  it('Halloween está activa el 31-oct a las 23:59 de Ecuador y caduca sola a medianoche', () => {
    expect(getActivePromotion(at('2026-10-31T23:59:00-05:00'))?.id).toBe('halloween-2026');
    expect(getActivePromotion(at('2026-11-01T00:00:00-05:00'))).toBeNull();
    expect(getActivePromotion(at('2026-10-18T23:59:00-05:00'))).toBeNull();
  });

  it('Black Friday va del 27 al 30 de noviembre', () => {
    expect(getActivePromotion(at('2026-11-27T08:00:00-05:00'))?.id).toBe('black-friday-2026');
    expect(getActivePromotion(at('2026-11-30T23:00:00-05:00'))?.id).toBe('black-friday-2026');
    expect(getActivePromotion(at('2026-12-01T00:00:00-05:00'))).toBeNull();
  });

  it('las excursiones de un día quedan fuera', () => {
    const day = mockTours.find((t) => t.id === 'quito-city-middle-of-the-world')!;
    const multi = mockTours.find((t) => (t.durationDays || 0) > 1)!;
    expect(isDayTrip(day)).toBe(true);
    expect(isDayTrip(multi)).toBe(false);
    const now = at('2026-10-25T12:00:00-05:00');
    expect(getPromotionForTour(day, now)).toBeNull();
    expect(getPromotionForTour(multi, now)?.id).toBe('halloween-2026');
  });

  it('solo aplica a Galápagos y combinados, no a Ecuador continental (ajuste del 20-oct)', () => {
    const now = at('2026-10-25T12:00:00-05:00');
    const byId = (id: string) => mockTours.find((t) => t.id === id)!;
    expect(getPromotionForTour(byId('galapagos-6days'), now)?.id).toBe('halloween-2026');
    expect(getPromotionForTour(byId('ecuador-galapagos-11days'), now)?.id).toBe('halloween-2026');
    expect(getPromotionForTour(byId('ecuador-galapagos-12days'), now)?.id).toBe('halloween-2026');
    for (const id of ['volcanoes-rivers-8days', 'andes-amazon-7days', 'snow-volcanoes-6days', 'ecuador-fantastic-8days']) {
      expect(isPromoEligible(byId(id))).toBe(false);
    }
  });

  it('un viaje de 11 días no es una excursión de un día', () => {
    expect(isDayTrip({ duration: { en: '11 DAYS / 10 NIGHTS' } })).toBe(false);
    expect(isDayTrip({ duration: { en: '1 DAY (FULL DAY)' } })).toBe(true);
    expect(isDayTrip({ durationDays: 11, duration: { en: '11 DAYS / 10 NIGHTS' } })).toBe(false);
  });

  it('aplica el descuento real sobre el precio actual, sin precio "antes"', () => {
    const p = calculateTourPrice(1000, 2, 0, null, false, halloween);
    expect(p.subtotal).toBe(2000);
    expect(p.promoDiscountAmount).toBe(100);
    expect(p.total).toBe(1900);
    expect(p.promoId).toBe('halloween-2026');
    expect(promoPrice(1790, halloween)).toBe(1700);
  });

  it('no se acumula con el descuento de grupo: gana el mayor', () => {
    // 4 personas = 5 % de grupo, igual que Halloween: se queda el de grupo, sin sumar.
    const g4 = calculateTourPrice(1000, 4, 0, null, false, halloween);
    expect(g4.groupDiscountAmount).toBe(200);
    expect(g4.promoDiscountAmount).toBe(0);
    expect(g4.total).toBe(3800);
    // 4 personas en Black Friday: 10 % de promo en lugar del 5 % de grupo.
    const bf4 = calculateTourPrice(1000, 4, 0, null, false, blackFriday);
    expect(bf4.groupDiscountAmount).toBe(0);
    expect(bf4.promoDiscountAmount).toBe(400);
    expect(bf4.total).toBe(3600);
  });

  it('no toca las excursiones de un día aunque se pase la promo', () => {
    const p = calculateTourPrice(89, 2, 0, null, true, halloween);
    expect(p.promoDiscountAmount).toBe(0);
    expect(p.total).toBe(178);
  });
});
