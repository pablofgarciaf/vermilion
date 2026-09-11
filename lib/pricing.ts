export interface PricingDetails {
  basePricePerAdult: number;
  basePricePerChild: number;
  adultsCount: number;
  childrenCount: number;
  isDailyTour?: boolean;
  minTwoPersonApplied?: boolean;
  
  // Totals before discount
  adultsTotal: number;
  childrenTotal: number;
  subtotal: number;

  // Discounts
  groupDiscountPercentage: number;
  groupDiscountAmount: number;
  
  // Final
  total: number;
}

export function calculateTourPrice(
  basePrice: number,
  adults: number,
  children: number,
  date: string | null,
  isDailyTour: boolean = false
): PricingDetails {
  // A child is generally cheaper (20% off base price)
  const basePricePerChild = basePrice * 0.8;

  let adultsTotal = adults * basePrice;
  let childrenTotal = children * basePricePerChild;
  let minTwoPersonApplied = false;

  // Business Rule: For daily tours (1 day), minimum operating cost is 2 persons.
  // If 1 person travels, they are charged basePrice * 2 (operational minimum for private guide & transport).
  // If 2 people travel, basePrice * 2.
  // If >2 people travel, standard per-passenger pricing applies.
  const totalPeople = adults + children;
  if (isDailyTour && totalPeople === 1) {
    minTwoPersonApplied = true;
    adultsTotal = basePrice * 2;
    childrenTotal = 0;
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

  const groupDiscountAmount = subtotal * groupDiscountPercentage;
  const total = subtotal - groupDiscountAmount;

  return {
    basePricePerAdult: basePrice,
    basePricePerChild,
    adultsCount: adults,
    childrenCount: children,
    isDailyTour,
    minTwoPersonApplied,
    adultsTotal,
    childrenTotal,
    subtotal,
    groupDiscountPercentage,
    groupDiscountAmount,
    total
  };
}
