import { describe, it, expect } from 'vitest';
import { mockTours } from '@/data/mock';

describe('Pricing & Tour Itinerary Consistency', () => {
  it('should have all 7 official daily tours with exact required prices', () => {
    const quito = mockTours.find((t) => t.id === 'quito-city-middle-of-the-world');
    const otavalo = mockTours.find((t) => t.id === 'otavalo-indigenous-market');
    const papallacta = mockTours.find((t) => t.id === 'papallacta-hot-springs');
    const mindo = mockTours.find((t) => t.id === 'mindo-cloud-forest');
    const antisana = mockTours.find((t) => t.id === 'antisana-national-park');
    const cotopaxi = mockTours.find((t) => t.id === 'cotopaxi-national-park');
    const quilotoa = mockTours.find((t) => t.id === 'quilotoa-crater-lake');

    expect(quito).toBeDefined();
    expect(quito?.price).toBe(89);

    expect(otavalo).toBeDefined();
    expect(otavalo?.price).toBe(92);

    expect(papallacta).toBeDefined();
    expect(papallacta?.price).toBe(85);

    expect(mindo).toBeDefined();
    expect(mindo?.price).toBe(95);

    expect(antisana).toBeDefined();
    expect(antisana?.price).toBe(90);

    expect(cotopaxi).toBeDefined();
    expect(cotopaxi?.price).toBe(96);

    expect(quilotoa).toBeDefined();
    expect(quilotoa?.price).toBe(98);
  });

  it('should have exact 2026 prices and days for Galapagos tours with UIO transfers', () => {
    const tour6 = mockTours.find((t) => t.id === 'galapagos-6days');
    const tour7 = mockTours.find((t) => t.id === 'galapagos-7days');
    const tour8 = mockTours.find((t) => t.id === 'galapagos-8days');

    expect(tour6).toBeDefined();
    expect(tour6?.durationDays).toBe(6);
    expect(tour6?.price).toBe(1790);
    expect(tour6?.price3Star).toBe(1790);
    expect(tour6?.price4Star).toBe(2199);

    expect(tour7).toBeDefined();
    expect(tour7?.durationDays).toBe(7);
    expect(tour7?.price).toBe(2050);
    expect(tour7?.price3Star).toBe(2050);
    expect(tour7?.price4Star).toBe(2399);

    expect(tour8).toBeDefined();
    expect(tour8?.durationDays).toBe(8);
    expect(tour8?.price).toBe(2200);
    expect(tour8?.price3Star).toBe(2200);
    expect(tour8?.price4Star).toBe(2600);
  });

  it('should have valid 1-day duration and itineraries for all daily tours', () => {
    const dailyTourIds = [
      'quito-city-middle-of-the-world',
      'otavalo-indigenous-market',
      'papallacta-hot-springs',
      'mindo-cloud-forest',
      'antisana-national-park',
      'cotopaxi-national-park',
      'quilotoa-crater-lake'
    ];

    dailyTourIds.forEach((id) => {
      const tour = mockTours.find((t) => t.id === id);
      expect(tour).toBeDefined();
      expect(tour?.durationDays).toBe(1);
      expect(tour?.itinerary?.length).toBe(1);
      expect(tour?.itinerary?.[0].title).toBeDefined();
      expect(tour?.itinerary?.[0].description).toBeDefined();
    });
  });
});
