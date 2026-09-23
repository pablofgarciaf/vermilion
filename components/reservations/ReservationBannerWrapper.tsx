'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ReservationBanner } from './ReservationBanner';

interface StoredReservation {
  id: string;
  reservationNumber: string;
  tourId: string;
  tourTitle: string;
  travelDates?: string;
  paymentStatus: string;
  createdAt: string;
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

  const handleDateChange = useCallback(
    async (newDate: string) => {
      if (!reservation) return;

      try {
        const bookingRef = doc(db, 'bookings', reservation.id);
        await updateDoc(bookingRef, {
          travelDates: newDate,
        });

        const updated = { ...reservation, travelDates: newDate };
        setReservation(updated);

        // Sync localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const reservations: StoredReservation[] = JSON.parse(stored);
          const updatedList = reservations.map((r) =>
            r.id === reservation.id ? updated : r
          );
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        }
      } catch (err) {
        console.error('Error updating travel date:', err);
      }
    },
    [reservation]
  );

  if (!reservation) return null;

  return (
    <ReservationBanner
      reservation={reservation}
      onClose={() => setReservation(null)}
      onDateChange={handleDateChange}
      locale={locale}
    />
  );
}
