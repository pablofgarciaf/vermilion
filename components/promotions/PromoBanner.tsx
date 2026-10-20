'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Promotion } from '@/data/promotions';
import { formatPromoLastDay } from '@/lib/promotions';
import { DEPOSIT_RATE, TRIPADVISOR_RATING, WHATSAPP_NUMBER } from '@/data/bookingTerms';

interface PromoBannerProps {
  promo: Promotion | null;
  /** Se pliega al hacer scroll, igual que la franja de contacto del Navbar. */
  collapsed?: boolean;
}

type Item = { key: string; node: React.ReactNode; href?: string; external?: boolean };

/**
 * Marquesina dorada en lo alto de la cabecera fija. Rota mensajes verdaderos:
 * la promo vigente con su fecha de fin (solo mientras dure), la nota de
 * Tripadvisor, el depósito del 30 %, tours privados y WhatsApp.
 *
 * - Vive DENTRO del contenedor fijo del Navbar (no es un overlay propio).
 * - Se detiene al pasar el ratón o al enfocar un enlace con el teclado.
 * - Con prefers-reduced-motion no se mueve: queda una fila que se desliza a mano.
 * - La pista se duplica para el bucle continuo; la copia es aria-hidden y sus
 *   enlaces no reciben foco.
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
      node: (
        <>
          <span aria-hidden="true">{promo.emoji} </span>
          {t('banner', { name, pct, date: formatPromoLastDay(promo, locale) })}{' '}
          <span className="underline underline-offset-2">{t('bannerCta')} →</span>
        </>
      ),
    });
  }
  items.push(
    { key: 'tripadvisor', node: <>★★★★★ {t('marquee.tripadvisor', { rating: TRIPADVISOR_RATING })}</> },
    { key: 'deposit', node: t('marquee.deposit', { pct: Math.round(DEPOSIT_RATE * 100) }) },
    { key: 'private', node: t('marquee.private') },
    {
      key: 'whatsapp',
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      external: true,
      node: <>{t('marquee.whatsapp')} · +593 96 003 9156</>,
    },
  );

  const renderTrack = (copy: boolean) => (
    <ul
      className="vr-marquee-track flex shrink-0 items-center"
      aria-hidden={copy || undefined}
    >
      {items.map((it) => (
        <li key={it.key} className="flex shrink-0 items-center whitespace-nowrap">
          {it.href ? (
            it.external ? (
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy ? -1 : undefined}
                data-lead-placement="promo_marquee"
                className="rounded px-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-950"
              >
                {it.node}
              </a>
            ) : (
              <Link
                href={it.href}
                tabIndex={copy ? -1 : undefined}
                className="rounded px-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-950"
              >
                {it.node}
              </Link>
            )
          ) : (
            <span className="px-1">{it.node}</span>
          )}
          <span aria-hidden="true" className="px-5 text-zinc-950/60">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      aria-label={t('marquee.label')}
      data-promo={promo?.id}
      className={`vr-marquee group overflow-hidden bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] text-zinc-950 transition-all duration-500 ${
        collapsed ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100 border-b border-amber-700/40'
      }`}
    >
      <div className="vr-marquee-viewport flex py-2 text-[13px] font-bold leading-tight sm:text-sm">
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </aside>
  );
}
