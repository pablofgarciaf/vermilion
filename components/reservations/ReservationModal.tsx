'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { X, Search, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservationFound: (reservation: any) => void;
  locale: string;
}

interface ReservationRecord {
  id: string;
  reservationNumber: string;
  tourId: string;
  tourTitle: string;
  travelDates?: string;
  paymentStatus: string;
  createdAt: string;
}

export function ReservationModal({
  isOpen,
  onClose,
  onReservationFound,
  locale,
}: ReservationModalProps) {
  const t = useTranslations();
  const [reservationNumber, setReservationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<ReservationRecord[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load previous reservations from localStorage
  const previousReservations = useMemo(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('vermilion_previous_reservations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (reservationNumber.trim().length > 0) {
      const filtered = previousReservations.filter((r: ReservationRecord) =>
        r.reservationNumber.toLowerCase().includes(reservationNumber.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [reservationNumber, previousReservations]);

  // Save reservation to localStorage
  const saveToLocalStorage = useCallback((reservation: ReservationRecord) => {
    try {
      const existing = previousReservations.filter(
        (r: ReservationRecord) => r.reservationNumber !== reservation.reservationNumber
      );
      const updated = [reservation, ...existing].slice(0, 10); // Keep last 10
      localStorage.setItem('vermilion_previous_reservations', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [previousReservations]);

  // Query Firestore for reservation
  const handleSearch = useCallback(async (refNumber: string) => {
    if (!refNumber.trim()) {
      setError(t('enterReservationNumber') || 'Please enter a reservation number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('refCode', '==', refNumber.trim().toUpperCase())
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError(t('reservationNotFound') || 'Reservation not found. Please check your reservation number.');
        return;
      }

      const bookingDoc = snapshot.docs[0];
      const bookingData = bookingDoc.data();

      const reservation: ReservationRecord = {
        id: bookingDoc.id,
        reservationNumber: bookingData.refCode || bookingData.bookingCode || bookingDoc.id,
        tourId: bookingData.tourId,
        tourTitle: bookingData.tourTitle || '',
        travelDates: bookingData.travelDates || '',
        paymentStatus: bookingData.paymentStatus || 'pending',
        createdAt: bookingData.createdAt || new Date().toISOString(),
      };

      saveToLocalStorage(reservation);

      setSuccess(true);
      setTimeout(() => {
        onReservationFound(reservation);
        setReservationNumber('');
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error fetching reservation:', err);
      setError(t('errorFetching') || 'Error fetching reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [t, onReservationFound, onClose, saveToLocalStorage]);

  const handleSuggestionClick = useCallback((suggestion: ReservationRecord) => {
    setReservationNumber(suggestion.reservationNumber);
    setShowSuggestions(false);
    setTimeout(() => handleSearch(suggestion.reservationNumber), 0);
  }, [handleSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {t('myReservations') || 'My Reservations'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        {success && (
          <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {t('reservationFound') || 'Reservation found!'}
            </span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">{error}</span>
            </div>
            {!reservationNumber.trim() && (
              <a
                href="https://wa.me/593983992549?text=No%20encuentro%20mi%20numero%20de%20reserva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                {t('contactWhatsApp') || 'Contact us on WhatsApp for help'}
              </a>
            )}
          </div>
        )}

        <div className="relative mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(reservationNumber);
                }
              }}
              placeholder={t('enterReservationNumber') || 'Enter reservation number'}
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
            />
          </div>

          {showSuggestions && !loading && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg z-10">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 border-b border-zinc-100 dark:border-zinc-700 last:border-b-0 transition-colors"
                >
                  <div className="text-sm font-medium text-zinc-900 dark:text-white">
                    {suggestion.reservationNumber}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {suggestion.tourTitle}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => handleSearch(reservationNumber)}
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('searching') || 'Searching...'}
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              {t('search') || 'Search'}
            </>
          )}
        </button>

        {!showSuggestions && previousReservations.length > 0 && (
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
              {t('previousReservations') || 'Recent Reservations'}
            </h3>
            <div className="space-y-2">
              {previousReservations.slice(0, 3).map((res: ReservationRecord) => (
                <button
                  key={res.id}
                  onClick={() => handleSuggestionClick(res)}
                  className="w-full text-left p-3 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                >
                  <div className="font-medium text-zinc-900 dark:text-white">{res.reservationNumber}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{res.tourTitle}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
