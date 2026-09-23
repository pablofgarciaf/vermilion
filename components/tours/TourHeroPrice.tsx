'use client';

import React from 'react';
import { useLuxury } from '@/components/providers/LuxuryThemeProvider';
import { Tour } from '@/types';

interface TourHeroPriceProps {
  tour: Tour;
}

export function TourHeroPrice({ tour }: TourHeroPriceProps) {
  const { isLuxuryMode } = useLuxury();

  const displayPrice = isLuxuryMode && tour.price4Star
    ? tour.price4Star
    : (tour.price3Star || tour.price || 1050);

  return (
    <span className="font-bold text-white text-base transition-all duration-300" suppressHydrationWarning>
      ${'$'}{displayPrice.toLocaleString('en-US')} USD
    </span>
  );
}
