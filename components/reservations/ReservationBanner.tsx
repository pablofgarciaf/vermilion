'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X, Calendar, AlertCircle } from 'lucide-react';

interface ReservationBannerProps {
  reservation: {
    id: string;
    reservationNumber: string;
    tourId: string;
    tourTitle: string;
    travelDates?: string;
    paymentStatus: string;
    createdAt: string;
  };
  onClose: () => void;
  onDateChange: (newDate: string) => void;
  locale: string;
}

export function ReservationBanner({
  reservation,
  onClose,
  onDateChange,
  locale,
}: ReservationBannerProps) {
  const t = useTranslations();
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [travelDate, setTravelDate] = useState(reservation.travelDates || '');
  const [error, setError] = useState('');

  // Can modify if: no date set yet, OR date is 1+ month in the future
  const canModifyDate = useCallback(() => {
    if (!reservation.travelDates) return true;

    const selectedDate = new Date(reservation.travelDates);
    const monthFromNow = new Date();
    monthFromNow.setMonth(monthFromNow.getMonth() + 1);

    return selectedDate >= monthFromNow;
  }, [reservation.travelDates]);

  const handleDateChange = useCallback(() => {
    if (!travelDate) {
      setError(t('selectTravelDate') || 'Please select a travel date');
      return;
    }

    onDateChange(travelDate);
    setIsEditingDate(false);
    setError('');
  }, [travelDate, onDateChange, t]);

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString + 'T00:00:00').toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, [locale]);

  return (
    <div className="sticky top-[146px] sm:top-[165px] md:top-[160px] z-40 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-b border-emerald-200 dark:border-emerald-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-3 py-1 bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-bold rounded-full">
                {t('myReservation') || 'Your Reservation'}
              </div>
              <span className="text-sm font-mono text-emerald-700 dark:text-emerald-300">
                #{reservation.reservationNumber}
              </span>
            </div>

            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-3">
              {reservation.tourTitle}
            </h3>

            {/* Date Section */}
            {isEditingDate ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block mb-1">
                    {t('travelDate') || 'Travel Date'}
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full max-w-xs px-3 py-2 bg-white dark:bg-zinc-800 border border-emerald-300 dark:border-emerald-700 rounded-lg text-sm"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleDateChange}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    {t('saveDates') || 'Save Date'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingDate(false);
                      setError('');
                    }}
                    className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    {t('cancel') || 'Cancel'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                {reservation.travelDates ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(reservation.travelDates)}</span>
                    </div>

                    {canModifyDate() && (
                      <button
                        onClick={() => setIsEditingDate(true)}
                        className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {t('modify') || 'Modify Date'}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">
                    <span className="font-semibold">{t('noDatesSelected') || 'No date selected yet'}</span>
                    <button
                      onClick={() => setIsEditingDate(true)}
                      className="ml-2 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {t('selectDates') || 'Select Date'}
                    </button>
                  </div>
                )}

                {!canModifyDate() && reservation.travelDates && (
                  <span className="text-xs text-amber-700 dark:text-amber-400">
                    {t('cannotModifyDates') || 'Date cannot be modified (less than 1 month away)'}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-2 p-2 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
