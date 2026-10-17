'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';
import { DESTINATIONS } from '@/data/destinationsData';
import WaterRippleImage from '@/components/ui/WaterRippleImage';

interface HeroThumbnailsProps {
  slidesData: SlideData[];
  locale: string;
  isMobile?: boolean;
}

// Evento y bandera con los que se piden las fotos grandes de los slides 1..n.
// El hook de GSAP ya llama a window.__loadAllHeroThumbnails() antes de cada
// cambio manual de slide; aqui se define y ademas se dispara tras el `load`.
const LOAD_EVENT = 'hero-load-slide-images';

function requestSlideImages() {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.__heroSlideImagesRequested) return;
  w.__heroSlideImagesRequested = true;
  window.dispatchEvent(new Event(LOAD_EVENT));
}

/**
 * Fotos a pantalla completa de un slide que no es el primero. No existen en el
 * HTML inicial: se montan cuando se piden (tras el `load` o al tocar el
 * carrusel), asi no compiten con la foto del slide 0. Solo cambia el contenido
 * de la tarjeta; el contenedor `.card-N` que anima GSAP no se toca.
 */
function DeferredSlideImages({ slide, alt }: { slide: SlideData; alt: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ((window as any).__heroSlideImagesRequested) {
      setShow(true);
      return;
    }
    const onRequest = () => setShow(true);
    window.addEventListener(LOAD_EVENT, onRequest);
    return () => window.removeEventListener(LOAD_EVENT, onRequest);
  }, []);

  if (!show) return null;

  const desktopSrc = slide.desktopImage || slide.image;

  return (
    <>
      {slide.mobileImage && (
        <Image
          src={slide.mobileImage}
          alt={alt}
          fill
          loading="lazy"
          unoptimized
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
      )}
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        loading="lazy"
        unoptimized
        className={`object-cover object-top ${slide.mobileImage ? 'hidden md:block' : 'block'}`}
        sizes="100vw"
      />
      {slide.waterEffect && (
        <WaterRippleImage
          src={desktopSrc}
          mobileSrc={slide.mobileImage}
          className="absolute inset-0"
        />
      )}
    </>
  );
}

export function HeroThumbnails({ slidesData, locale }: HeroThumbnailsProps) {
  useEffect(() => {
    const w = window as any;
    w.__loadAllHeroThumbnails = requestSlideImages;

    // Sin interaccion: se piden cuando la pagina termino de cargar y el
    // navegador queda libre (el primer cambio automatico llega a los ~8 s).
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = w.requestIdleCallback(requestSlideImages, { timeout: 2500 });
      } else {
        timer = setTimeout(requestSlideImages, 1200);
      }
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
      if (w.__loadAllHeroThumbnails === requestSlideImages) delete w.__loadAllHeroThumbnails;
    };
  }, []);

  return (
    <>
      {slidesData.map((slide, idx) => {
        const alt = getLocalizedText(slide.place, locale) || 'Vermilion Routes';
        const desktopSrc = slide.desktopImage || slide.image || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp';

        return (
          <div key={`card-wrap-${idx}`}>
            <div
              className={`card card-${idx} absolute top-0 left-0 shadow-2xl overflow-hidden ${idx === 0
                ? 'w-full h-full inset-0 z-10 opacity-100'
                : 'w-[144px] h-[208px] opacity-0 bg-zinc-800'
                }`}
            >
              {idx === 0 ? (
                /* Slide 0: una sola foto segun el ancho, pintada desde el HTML con prioridad alta.
                   La mutacion de GSAP (restoreSlideZero) cambia el srcset del <source> y el src del <img>. */
                <picture>
                  {slide.mobileImage && (
                    <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={desktopSrc}
                    alt={alt}
                    width={1920}
                    height={1080}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
                  />
                </picture>
              ) : (
                <>
                  {/* Miniatura de escritorio: foto vertical ligera (75-120 KB) con la proporcion de la tarjeta. */}
                  {slide.mobileImage && (
                    <Image
                      src={slide.mobileImage}
                      alt=""
                      aria-hidden="true"
                      fill
                      loading="lazy"
                      unoptimized
                      className="object-cover hidden md:block"
                      sizes="144px"
                    />
                  )}
                  <DeferredSlideImages slide={slide} alt={alt} />
                </>
              )}

              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300" />

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
