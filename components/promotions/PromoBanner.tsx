'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Promotion } from '@/data/promotions';
import { formatPromoLastDay } from '@/lib/promotions';

interface PromoBannerProps {
  promo: Promotion | null;
  /** Se pliega al hacer scroll, igual que la franja de contacto del Navbar. */
  collapsed?: boolean;
}

/**
 * Franja de la promo vigente. Vive DENTRO del contenedor fijo del Navbar (no es
 * un overlay propio con z-index): el Navbar crece unos píxeles y el espaciador
 * de ConditionalNavbar compensa, así no tapa contenido ni miniaturas.
 */
export function PromoBanner({ promo, collapsed = false }: PromoBannerProps) {
  const locale = useLocale();
  const t = useTranslations('promotions');
  if (!promo) return null;

  const name = t(`items.${promo.messageKey}.name`);
  const pct = Math.round(promo.discountRate * 100);

  return (
    <aside
      aria-label={name}
      data-promo={promo.id}
      className={`overflow-hidden bg-zinc-950 text-amber-50 transition-all duration-500 ${
        collapsed ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100 border-b border-amber-500/40'
      }`}
    >
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[12px] leading-snug sm:text-sm">
        <span aria-hidden="true">{promo.emoji} </span>
        {t('banner', { name, pct, date: formatPromoLastDay(promo, locale) })}{' '}
        <Link
          href={`/${locale}/tours`}
          className="whitespace-nowrap font-bold text-amber-300 underline underline-offset-2 hover:text-amber-200"
        >
          {t('bannerCta')}
        </Link>
      </p>
    </aside>
  );
}
