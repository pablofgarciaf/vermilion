'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CalendarClock, Info } from 'lucide-react';
import {
  GALAPAGOS_PARK_FEE,
  GALAPAGOS_TCT_FEE,
  depositAmount,
  formatUsd,
} from '@/data/bookingTerms';

interface TourPriceSummaryProps {
  /** Precio más bajo por persona (tier Club). */
  priceFrom: number;
  /** Mostrar el depósito del 30% (en excursiones de un día también aplica). */
  showDeposit?: boolean;
  /** El tour pasa por Galápagos: avisar de parque + TCT junto al precio. */
  galapagosFees?: boolean;
}

/**
 * Precio "desde X por persona", el depósito del 30% y lo que NO incluye,
 * todo visible antes de elegir tier para que nada sorprenda en el checkout.
 */
export function TourPriceSummary({ priceFrom, showDeposit = true, galapagosFees = false }: TourPriceSummaryProps) {
  const t = useTranslations('bookingConversion');

  return (
    <div className="space-y-2">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
          {t('fromPrice', { price: formatUsd(priceFrom) })}
        </span>
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t('perPerson')}</span>
      </p>

      {showDeposit && (
        <p className="flex items-start gap-2 text-sm text-emerald-800 dark:text-emerald-300">
          <CalendarClock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-bold">{t('depositToday', { amount: formatUsd(depositAmount(priceFrom)) })}</strong>
            {' · '}
            {t('balanceRule')}
          </span>
        </p>
      )}

      {galapagosFees && (
        <p className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>
            {t('notIncludedGalapagos', { park: GALAPAGOS_PARK_FEE, tct: GALAPAGOS_TCT_FEE })}{' '}
            <a href="#tour-exclusions" className="font-semibold underline underline-offset-2 hover:text-emerald-700">
              {t('notIncludedLink')}
            </a>
          </span>
        </p>
      )}
    </div>
  );
}
