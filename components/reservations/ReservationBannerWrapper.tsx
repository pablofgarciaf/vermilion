'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReservationBanner } from './ReservationBanner';

interface StoredReservation {
  id: string;
  reservationNumber: string;
  tourId: string;
  tourTitle: string;
  travelDates?: string;
  paymentStatus: string;
}

interface Props {
  tourId: string;
  locale: string;
}

const STORAGE_KEY = 'vermilion_previous_reservations';

export function ReservationBannerWrapper({ tourId, locale }: Props) {
  const searchParams = useSearchParams();
  const reservationRef = searchParams.get('reservation');
  const [reservation, setReservation] = useState<StoredReservation | null>(null);

  useEffect(() => {
    if (!reservationRef || typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const reservations: StoredReservation[] = JSON.parse(stored);
      const found = reservations.find(
        (r) => r.reservationNumber === reservationRef && r.tourId === tourId
      );
      if (found) setReservation(found);
    } catch (err) {
      console.error('Error loading stored reservation:', err);
    }
  }, [reservationRef, tourId]);

  if (!reservation) return null;

  return (
    <ReservationBanner
      reservation={reservation}
      onClose={() => setReservation(null)}
      locale={locale}
    />
  );
}
