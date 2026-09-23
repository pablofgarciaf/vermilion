'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { X, Calendar, MessageCircle } from 'lucide-react';

interface ReservationBannerProps {
  reservation: {
    id: string;
    reservationNumber: string;
    tourId: string;
    tourTitle: string;
    travelDates?: string;
    paymentStatus: string;
  };
  onClose: () => void;
  locale: string;
}

export function ReservationBanner({ reservation, onClose, locale }: ReservationBannerProps) {
  const t = useTranslations();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString + 'T00:00:00').toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="sticky top-[146px] sm:top-[165px] md:top-[160px] z-40 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-b border-emerald-200 dark:border-emerald-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-3 py-1 bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-bold rounded-full">
                {t('myReservation') || 'Tu Reserva'}
              </div>
              <span className="text-sm font-mono text-emerald-700 dark:text-emerald-300">
                #{reservation.reservationNumber}
              </span>
            </div>

            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-2">
              {reservation.tourTitle}
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {reservation.travelDates ? (
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(reservation.travelDates)}</span>
                </div>
              ) : (
                <span className="text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
                  {t('noDatesSelected') || 'Sin fecha seleccionada aún'}
                </span>
              )}

              <a
                href="https://wa.me/593983992549?text=Quiero%20modificar%20la%20fecha%20de%20mi%20reserva"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {t('requestDateChange') || 'Solicitar cambio de fecha por WhatsApp'}
              </a>
            </div>

            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-2">
              {t('dateChangePolicy') || 'Los cambios de fecha se solicitan por WhatsApp, correo o llamada, con al menos 1 mes de anticipación.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-1 p-2 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
