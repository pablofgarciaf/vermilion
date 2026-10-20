export interface PricingDetails {
  basePricePerAdult: number;
  basePricePerChild: number;
  adultsCount: number;
  childrenCount: number;
  isDailyTour?: boolean;
  minTwoPersonApplied?: boolean;
  singleSupplementApplied?: boolean;
  singleSupplementAmount?: number;
  
  // Totals before discount
  adultsTotal: number;
  childrenTotal: number;
  subtotal: number;

  // Discounts
  groupDiscountPercentage: number;
  groupDiscountAmount: number;

  // Promoción por festivo (data/promotions.ts). No se acumula con el de grupo:
  // se aplica solo el mayor de los dos.
  promoId?: string | null;
  promoDiscountPercentage?: number;
  promoDiscountAmount?: number;
  
  // Final
  total: number;
}

export function calculateTourPrice(
  basePrice: number,
  adults: number,
  children: number,
  date: string | null,
  isDailyTour: boolean = false,
  promo: { id: string; discountRate: number } | null = null
): PricingDetails {
  // A child is generally 20% off base price
  const basePricePerChild = basePrice * 0.8;
  const totalPeople = adults + children;

  let adultsTotal = adults * basePrice;
  let childrenTotal = children * basePricePerChild;
  let minTwoPersonApplied = false;
  let singleSupplementApplied = false;
  let singleSupplementAmount = 0;

  // Business Rule: All private tours are priced per person based on double occupancy (minimum 2 travelers).
  // If 1 solo traveler books (totalPeople === 1), a 50% single supplement surcharge applies (+50% base price).
  if (totalPeople === 1) {
    singleSupplementApplied = true;
    singleSupplementAmount = basePrice * 0.50;
    adultsTotal = basePrice + singleSupplementAmount;
    childrenTotal = 0;
    minTwoPersonApplied = true;
  }

  const subtotal = adultsTotal + childrenTotal;

  // Group Discount Logic:
  // 4 or more people -> 5% off
  // 8 or more people -> 10% off
  let groupDiscountPercentage = 0;
  if (totalPeople >= 8) {
    groupDiscountPercentage = 0.10;
  } else if (totalPeople >= 4) {
    groupDiscountPercentage = 0.05;
  }

  // Promo de festivo: solo viajes de varios días y nunca sumada al descuento de grupo.
  const promoRate = promo && !isDailyTour ? promo.discountRate : 0;
  const promoWins = promoRate > groupDiscountPercentage;
  if (promoWins) groupDiscountPercentage = 0;
  const promoDiscountPercentage = promoWins ? promoRate : 0;
  const promoDiscountAmount = Number((subtotal * promoDiscountPercentage).toFixed(2));

  const groupDiscountAmount = subtotal * groupDiscountPercentage;
  const total = Number((subtotal - groupDiscountAmount - promoDiscountAmount).toFixed(2));

  return {
    basePricePerAdult: basePrice,
    basePricePerChild,
    adultsCount: adults,
    childrenCount: children,
    isDailyTour,
    minTwoPersonApplied,
    singleSupplementApplied,
    singleSupplementAmount,
    adultsTotal,
    childrenTotal,
    subtotal,
    groupDiscountPercentage,
    groupDiscountAmount,
    promoId: promoWins && promo ? promo.id : null,
    promoDiscountPercentage,
    promoDiscountAmount,
    total
  };
}
