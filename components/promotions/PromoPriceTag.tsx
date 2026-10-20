'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useActivePromotion } from '@/hooks/useActivePromotion';
import { promoPrice } from '@/lib/promotions';

interface PromoPriceTagProps {
  /** Precio "desde" que ya muestra la tarjeta. */
  price: number;
  /** Las excursiones de un día no entran en la promo. */
  isDayTrip?: boolean;
  /** Tono para fondo oscuro (foto) o claro. */
  tone?: 'dark' | 'light';
}

/** Etiqueta de la promo vigente bajo el precio de una tarjeta. Sin precio tachado. */
export function PromoPriceTag({ price, isDayTrip = false, tone = 'dark' }: PromoPriceTagProps) {
  const promo = useActivePromotion();
  const t = useTranslations('promotions');
  if (!promo || isDayTrip) return null;

  const name = t(`items.${promo.messageKey}.name`);
  const pct = Math.round(promo.discountRate * 100);
  const color = tone === 'dark'
    ? 'border-amber-300/60 bg-zinc-950/70 text-amber-200'
    : 'border-amber-400/70 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200';

  return (
    <span data-promo={promo.id} className={`mt-1 inline-flex flex-col rounded-lg border px-2 py-1 text-[11px] font-bold leading-tight ${color}`}>
      <span>{t('badge', { pct, name })}</span>
      <span className="font-semibold">{t('tourPrice', { price: `$${promoPrice(price, promo).toLocaleString('en-US')}` })}</span>
    </span>
  );
}
