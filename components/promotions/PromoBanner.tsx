'use client';

import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { Promotion } from '@/data/promotions';
import { formatPromoLastDay } from '@/lib/promotions';
import { DEPOSIT_RATE, TRIPADVISOR_RATING, WHATSAPP_NUMBER } from '@/data/bookingTerms';

interface PromoBannerProps {
  promo: Promotion | null;
  /** Se pliega al hacer scroll. */
  collapsed?: boolean;
}

const PHONE_DISPLAY = '+593 96 003 9156';
const PHONE_TEL = '+593960039156';

type Item = { key: string; node: React.ReactNode; href?: string; external?: boolean; strong?: boolean; led?: boolean };

/**
 * Barra superior única de la web (sustituye a la antigua franja verde de contacto).
 * - Izquierda, fija: el teléfono / WhatsApp de la empresa.
 * - Resto: marquesina con mensajes verdaderos (promo vigente con fecha de fin,
 *   Tripadvisor, depósito del 30 %, tours privados, WhatsApp).
 * Vive dentro del contenedor fijo del Navbar (no es un overlay propio). Se pausa
 * con hover/foco y queda quieta con prefers-reduced-motion. La pista se duplica
 * para el bucle continuo; la copia es aria-hidden y sus enlaces no reciben foco.
 */
export function PromoBanner({ promo, collapsed = false }: PromoBannerProps) {
  const locale = useLocale();
  const t = useTranslations('promotions');

  const items: Item[] = [];
  if (promo) {
    const name = t(`items.${promo.messageKey}.name`);
    const pct = Math.round(promo.discountRate * 100);
    items.push({
      key: 'offer',
      href: `/${locale}/tours`,
      strong: true,
      led: promo.marqueeStyle === 'led',
      node: (
        <>
          {t('banner', { name, pct, date: formatPromoLastDay(promo, locale) })}{' '}
          <span className="underline decoration-[#E7C46A]/60 underline-offset-4">{t('bannerCta')}</span>
        </>
      ),
    });
  }
  items.push(
    { key: 'tripadvisor', node: t('marquee.tripadvisor', { rating: TRIPADVISOR_RATING }) },
    { key: 'deposit', node: t('marquee.deposit', { pct: Math.round(DEPOSIT_RATE * 100) }) },
    { key: 'private', node: t('marquee.private') },
    { key: 'whatsapp', href: `https://wa.me/${WHATSAPP_NUMBER}`, external: true, node: t('marquee.whatsapp') },
  );

  const linkCls = 'rounded-sm hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#E7C46A]';

  const renderTrack = (copy: boolean) => (
    <ul className="vr-marquee-track flex shrink-0 items-center" aria-hidden={copy || undefined}>
      {items.map((it) => (
        <li
          key={it.key}
          className={`flex shrink-0 items-center whitespace-nowrap ${it.led ? 'vr-led font-bold' : it.strong ? 'font-semibold text-[#E7C46A]' : ''}`}
        >
          {it.href ? (
            it.external ? (
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy ? -1 : undefined}
                data-lead-placement="promo_marquee"
                className={linkCls}
              >
                {it.node}
              </a>
            ) : (
              <Link href={it.href} tabIndex={copy ? -1 : undefined} className={linkCls}>
                {it.node}
              </Link>
            )
          ) : (
            <span>{it.node}</span>
          )}
          <span aria-hidden="true" className="mx-6 h-1 w-1 rotate-45 bg-[#E7C46A]/50" />
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      aria-label={t('marquee.label')}
      data-promo={promo?.id}
      className={`vr-marquee flex items-stretch overflow-hidden bg-[#0B1A17] text-[#EFE6CF] transition-all duration-500 ${
        collapsed ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100 border-b border-[#E7C46A]/20'
      }`}
    >
      <a
        href={`tel:${PHONE_TEL}`}
        className="relative z-10 flex shrink-0 items-center gap-2 border-r border-[#E7C46A]/20 bg-[#0B1A17] pl-4 pr-3 text-[12px] font-semibold tracking-wide text-white hover:text-[#E7C46A] sm:pl-6 sm:pr-5 sm:text-[13px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#E7C46A]"
      >
        <Phone className="h-3.5 w-3.5 text-[#E7C46A]" aria-hidden="true" />
        <span className="tabular-nums">{PHONE_DISPLAY}</span>
      </a>
      <div className="vr-marquee-viewport flex min-w-0 flex-1 py-2.5 text-[12px] font-medium tracking-wide sm:text-[13px]">
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </aside>
  );
}
