'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';
import { isBotOrCrawler } from '@/utils/isBot';
import { DESTINATIONS } from '@/data/destinationsData';

interface HeroThumbnailsProps {
  slidesData: SlideData[];
  locale: string;
  isMobile?: boolean;
}

export function HeroThumbnails({ slidesData, locale, isMobile }: HeroThumbnailsProps) {
  return (
    <>
      {slidesData.map((slide: any, idx: number) => {

        return (
          <div key={`card-wrap-${idx}`}>
            <div
              className={`card card-${idx} absolute top-0 left-0 shadow-2xl overflow-hidden ${idx === 0
                ? 'w-full h-full inset-0 z-10 opacity-100'
                : 'w-[144px] h-[208px] opacity-0'
                }`}
            >
              {slide.mobileImage && (
                <Image
                  src={slide.mobileImage}
                  alt={getLocalizedText(slide.place, locale) || 'Vermilion Routes'}
                  fill
                  priority={idx === 0}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  quality={100}
                  unoptimized
                  className="object-cover object-center md:hidden"
                  sizes="100vw"
                />
              )}

              {/* 💻 FOTO HORIZONTAL 16:9 PARA PANTALLAS GRANDES */}
              <Image
                src={slide.desktopImage || slide.image || slide.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp'}
                alt={getLocalizedText(slide.place, locale) || 'Vermilion Routes'}
                fill
                priority={idx === 0}
                fetchPriority={idx === 0 ? "high" : "auto"}
                quality={100}
                unoptimized
                className={`object-cover object-top ${slide.mobileImage ? 'hidden md:block' : 'block'}`}
                sizes="100vw"
              />

              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300" />

              {/* Etiqueta que vive DENTRO de la foto de la tarjeta pequena. La
                  version grande usa .card-content (fuera del recorte); esta se
                  esconde cuando la tarjeta es la activa para no duplicar texto. */}
              {idx !== 0 && (
                <div className="thumb-label absolute inset-x-0 bottom-0 p-2.5 pointer-events-none z-[5] transition-opacity duration-300">
                  <span className="block text-[10px] font-oswald font-semibold tracking-wider uppercase leading-tight text-white/95 drop-shadow-lg line-clamp-1">
                    {getLocalizedText(slide.place, locale)}
                  </span>
                  <p className="text-[11px] font-oswald font-bold tracking-wide uppercase text-emerald-300 drop-shadow line-clamp-2 mt-0.5 leading-tight">
                    {getLocalizedText(slide.title, locale)}
                  </p>
                </div>
              )}

              <button
                type="button"
                aria-label={`View ${getLocalizedText(slide.place, locale) || 'slide'} ${idx + 1}`}
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => {
                  // Un solo clic entra a la ficha del destino. Si el visitante
                  // clico en una tarjeta que no es la activa, primero la traemos
                  // al frente para que vea que iba a ese lugar, y luego entramos.
                  const dest = DESTINATIONS.find((d) => d.heroIndex === idx);
                  const href = dest ? `/${locale}/destinations/${dest.slug}` : `/${locale}/tours`;
                  const currentActive = (window as any).__activeSlideIdx ?? 0;
                  const isActive = idx === currentActive
                    || ((window as any).jumpToSlide === undefined && idx === 0);
                  if (!isActive && (window as any).jumpToSlide) {
                    (window as any).jumpToSlide(idx);
                    setTimeout(() => { window.location.href = href; }, 450);
                  } else {
                    window.location.href = href;
                  }
                }}
              />
            </div>

            <div className={`card-content card-content-${idx} absolute left-0 top-0 text-white w-[144px] h-[208px] pointer-events-none opacity-0`}>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="block text-xs font-oswald font-semibold tracking-wider uppercase leading-tight drop-shadow-md notranslate text-white">
                  {getLocalizedText(slide.title, locale)}
                </span>
                {slide.title2 && (
                  <p className="text-sm font-oswald font-bold tracking-wide uppercase text-emerald-300 drop-shadow notranslate mt-0.5">
                    {getLocalizedText(slide.title2, locale)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
