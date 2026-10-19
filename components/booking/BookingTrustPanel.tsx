'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck, Lock, BadgeCheck, Star, CalendarCheck } from 'lucide-react';
import {
  MINTUR_REGISTRY,
  TRIPADVISOR_RATING,
  TRIPADVISOR_REVIEW_COUNT,
  TRIPADVISOR_URL,
} from '@/data/bookingTerms';

/**
 * Señales de confianza que van pegadas al botón de pago: cancelación resumida,
 * pago seguro, registro oficial y TripAdvisor. Todo sale de data/bookingTerms.ts.
 */
export function BookingTrustPanel({ className = '' }: { className?: string }) {
  const t = useTranslations('bookingConversion');
  const locale = useLocale();

  const row = 'flex items-start gap-2.5 text-xs leading-snug text-zinc-700 dark:text-zinc-300';
  const icon = 'mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400';

  return (
    <div className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/40 p-4 space-y-2.5 ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{t('trustTitle')}</p>

      <div className={row}>
        <ShieldCheck className={icon} aria-hidden="true" />
        <span>
          {t('trustCancellation')}{' '}
          <Link href={`/${locale}/cancellation`} className="font-semibold text-emerald-700 dark:text-emerald-400 underline underline-offset-2">
            {t('trustPolicyLink')}
          </Link>
        </span>
      </div>

      <div className={row}>
        <CalendarCheck className={icon} aria-hidden="true" />
        <span>{t('trustChanges')}</span>
      </div>

      <div className={row}>
        <Lock className={icon} aria-hidden="true" />
        <span>{t('trustPayment')}</span>
      </div>

      <div className={row}>
        <BadgeCheck className={icon} aria-hidden="true" />
        <span>{t('trustRegistry', { registry: MINTUR_REGISTRY })}</span>
      </div>

      <a
        href={TRIPADVISOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${row} font-semibold hover:text-emerald-700 dark:hover:text-emerald-400`}
      >
        <Star className="mt-0.5 h-4 w-4 shrink-0 fill-emerald-500 text-emerald-500" aria-hidden="true" />
        <span>{t('trustTripadvisor', { rating: TRIPADVISOR_RATING, count: TRIPADVISOR_REVIEW_COUNT })} ↗</span>
      </a>
    </div>
  );
}
