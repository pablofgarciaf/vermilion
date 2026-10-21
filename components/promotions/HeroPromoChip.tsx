'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useActivePromotion } from '@/hooks/useActivePromotion';
import { formatPromoLastDay } from '@/lib/promotions';

/**
 * Etiqueta con la oferta vigente (y su fecha de fin) junto a los botones del hero.
 * No usa ninguna clase que GSAP busque y no se pinta si no hay promoción activa:
 * nace vacía en el servidor y aparece en el cliente según la fecha real.
 */
export function HeroPromoChip() {
  const promo = useActivePromotion();
  const locale = useLocale();
  const t = useTranslations('promotions');
  if (!promo) return null;

  const name = t(`items.${promo.messageKey}.name`);
  const pct = Math.round(promo.discountRate * 100);

  return (
    <Link
      href={`/${locale}/tours`}
      data-promo-chip={promo.id}
      className="inline-flex max-w-[min(92vw,560px)] items-center gap-2 rounded-2xl border border-[#E7C46A]/50 bg-black/65 px-4 py-2 text-[12px] font-semibold leading-snug text-[#E7C46A] shadow-lg backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white sm:text-[13px]"
    >
      <span aria-hidden="true">{promo.emoji}</span>
      <span>{t('banner', { name, pct, date: formatPromoLastDay(promo, locale) })}</span>
      <span className="underline underline-offset-4">{t('bannerCta')}</span>
    </Link>
  );
}
