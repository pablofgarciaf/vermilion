'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Gift } from 'lucide-react';
import { useActivePromotion } from '@/hooks/useActivePromotion';
import { formatPromoLastDay, promoPrice } from '@/lib/promotions';
import { formatUsd } from '@/data/bookingTerms';

interface PromoTourNoticeProps {
  /** Precio "desde" por persona que ya muestra la ficha. */
  priceFrom: number;
  /** Solo Galápagos y combinados (lib/promotions.ts → isPromoEligible). */
  eligible: boolean;
}

/** Aviso de la promo vigente junto al precio de la ficha del tour. */
export function PromoTourNotice({ priceFrom, eligible }: PromoTourNoticeProps) {
  const promo = useActivePromotion();
  const locale = useLocale();
  const t = useTranslations('promotions');
  if (!promo || !eligible) return null;

  const name = t(`items.${promo.messageKey}.name`);
  const pct = Math.round(promo.discountRate * 100);

  return (
    <div
      data-promo={promo.id}
      className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-3.5 text-sm text-zinc-900 dark:border-amber-500/40 dark:bg-amber-950/30 dark:text-amber-50"
    >
      <Gift className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden="true" />
      <div className="space-y-1">
        <p className="font-bold">
          {t('tourPrice', { price: `$${formatUsd(promoPrice(priceFrom, promo))}` })}
        </p>
        <p className="leading-snug text-zinc-700 dark:text-amber-100/90">
          {t('tourNotice', { name, pct, date: formatPromoLastDay(promo, locale) })}
        </p>
        <p className="text-xs text-zinc-500 dark:text-amber-100/70">{t('noStack')}</p>
      </div>
    </div>
  );
}
