'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Loader2, AlertCircle } from 'lucide-react';

interface StoredReservation {
  id: string;
  reservationNumber: string;
  tourId: string;
  tourTitle: string;
  travelDates?: string;
  paymentStatus: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReservationFound: (reservation: StoredReservation) => void;
  /** 'popup' (default): floating card anchored below the trigger, for desktop.
   *  'inline': expands within the normal document flow, for mobile menus. */
  variant?: 'popup' | 'inline';
}

const STORAGE_KEY = 'vermilion_previous_reservations';

export function ReservationDropdown({ isOpen, onClose, onReservationFound, variant = 'popup' }: Props) {
  const t = useTranslations();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setError('');
    }
  }, [isOpen]);

  const saveToLocalStorage = useCallback((reservation: StoredReservation) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const existing: StoredReservation[] = stored ? JSON.parse(stored) : [];
      const filtered = existing.filter((r) => r.reservationNumber !== reservation.reservationNumber);
      const updated = [reservation, ...filtered].slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError(t('enterReservationNumber') || 'Ingresa tu número de reserva');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/reservations/lookup?ref=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('reservationNotFound') || 'Reserva no encontrada.');
        return;
      }

      saveToLocalStorage(data);
      onReservationFound(data);
      setCode('');
      onClose();
    } catch (err) {
      console.error('Error fetching reservation:', err);
      setError(t('errorFetching') || 'Error al buscar tu reserva.');
    } finally {
      setLoading(false);
    }
  }, [code, t, onReservationFound, onClose, saveToLocalStorage]);

  if (!isOpen) return null;

  const wrapperClass = variant === 'inline'
    ? 'w-full animate-in fade-in slide-in-from-top-1 duration-200'
    : 'absolute top-full right-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200';

  const cardClass = variant === 'inline'
    ? 'bg-zinc-50 dark:bg-zinc-800/60 rounded-xl p-4 border border-zinc-200/80 dark:border-white/10'
    : 'bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-zinc-200/80 dark:border-white/10 ring-1 ring-black/5';

  return (
    <div className={wrapperClass}>
      <div className={cardClass}>
        {variant === 'popup' && (
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
            {t('myReservations') || 'Mis Reservas'}
          </h3>
        )}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            placeholder={t('enterReservationNumber') || 'Número de reserva'}
            className="flex-1 min-w-0 px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="shrink-0 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-400 text-white rounded-xl transition-colors flex items-center justify-center"
            aria-label={t('search') || 'Buscar'}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <div className="mt-3 flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>
              {error}{' '}
              <a
                href="https://wa.me/593983992549?text=No%20encuentro%20mi%20numero%20de%20reserva"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-emerald-600 dark:text-emerald-400"
              >
                {t('contactWhatsApp') || 'Contáctanos por WhatsApp'}
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
