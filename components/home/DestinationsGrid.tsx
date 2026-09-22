'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Compass, ArrowRight, Menu } from 'lucide-react';
import { mockDestinations } from '@/data/mock';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { getLocalizedText } from '@/utils/i18nHelper';
import { isBotOrCrawler } from '@/utils/isBot';

// Curated high-resolution image pools per destination category (Vertical 9:16 aspect ratio)
const DESTINATION_IMAGE_POOLS: Record<string, string[]> = {
  ecuador: [
    '/images/tours/9-16/cajas-national-park-9-16.webp',
    '/images/tours/9-16/pailon-diablo-9-16.webp',
    '/images/tours/9-16/chimborazo-9-16.webp',
    '/images/tours/9-16/amazon-waterfall-9-16.webp',
    '/images/tours/9-16/cuenca-colonial-9-16.webp',
  ],
  galapagos: [
    '/images/tours/9-16/galapagos-tortuga-gigante-9-16.webp',
    '/images/tours/9-16/galapagos-snorkeling-9-16.webp',
    '/images/tours/9-16/galapagos-loberia-9-16.webp',
    '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.webp',
    '/images/tours/9-16/galapagos-las-grietas-9-16.webp',
  ],
  combined: [
    '/images/tours/9-16/cotopaxi-9-16.webp',
    '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.webp',
    '/images/tours/9-16/galapagos-snorkeling-9-16.webp',
    '/images/tours/9-16/chimborazo-9-16.webp',
    '/images/tours/9-16/galapagos-tortuga-gigante-9-16.webp',
  ],
  'full-day': [
    '/images/tours/9-16/quito-centro-historico.webp',
    '/images/tours/9-16/quilotoa-9-16.webp',
    '/images/tours/9-16/otavalo-market-9-16.webp',
    '/images/tours/9-16/mindo-9-16.webp',
    '/images/tours/9-16/cotopaxi-9-16.webp',
  ],
};

const DESTINATION_PRICES: Record<string, number> = {
  ecuador: 950,
  galapagos: 1050,
  combined: 2290,
  'full-day': 85,
};

const FROM_LABELS: Record<string, string> = {
  es: 'Desde',
  en: 'From',
  fr: 'À partir de',
  de: 'Ab',
  it: 'Da',
  pt: 'A partir de',
  ja: '料金',
  zh: '起价',
};

const JOURNEYS_LABELS: Record<string, string> = {
  en: 'Tours',
  es: 'Rutas',
  fr: 'Circuits',
  de: 'Touren',
  it: 'Tour',
  pt: 'Roteiros',
  ja: 'ツアー',
  zh: '条路线',
};

export function DestinationsGrid() {
  const destinations = mockDestinations;
  const t = useTranslations('destinations');
  const locale = useLocale();
  const router = useRouter();

  const fromText = FROM_LABELS[locale] || 'From';
  const journeysText = JOURNEYS_LABELS[locale] || 'Tours';

  const [activeDestId, setActiveDestId] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Track active image index per destination card
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({
    ecuador: 0,
    galapagos: 0,
    combined: 0,
    'full-day': 0,
  });

  const stepRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const visibleMobileCardIdRef = useRef<string>('ecuador');

  // Exact px distance between the first card of copy 0 and the first card of copy 1
  // (measured from the DOM so padding/gaps/breakpoint card widths are all accounted for).
  const getCopyWidth = useCallback(() => {
    const firstId = destinations[0]?.id.toLowerCase();
    if (!firstId) return 0;
    const clone = cardRefs.current[`${firstId}-loop-0`];
    const real = cardRefs.current[firstId];
    if (!clone || !real) return 0;
    return real.getBoundingClientRect().left - clone.getBoundingClientRect().left;
  }, [destinations]);

  // Fallback scroll listener to detect visible card on mobile + seamless infinite-loop wrap
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || (typeof window !== 'undefined' && window.innerWidth >= 768)) return;

    // The mobile rail renders 3 identical copies back-to-back. Jumping by exactly
    // one copy's width is visually undetectable (the content is pixel-identical),
    // so we can silently rewrap the scroll position to fake an infinite loop.
    const copyWidth = getCopyWidth();
    if (copyWidth > 0) {
      if (el.scrollLeft < copyWidth * 0.5) {
        el.scrollLeft += copyWidth;
      } else if (el.scrollLeft > copyWidth * 1.5) {
        el.scrollLeft -= copyWidth;
      }
    }

    const cardWidth = 300;
    const cardOrder = ['ecuador', 'galapagos', 'combined', 'full-day'];
    const scrollIndex = Math.round(el.scrollLeft / cardWidth);
    const activeId = cardOrder[((scrollIndex % cardOrder.length) + cardOrder.length) % cardOrder.length];
    if (activeId) visibleMobileCardIdRef.current = activeId;
  }, [getCopyWidth]);

  // Start the mobile rail on the middle copy so swiping backward from the first
  // card also wraps seamlessly (there's a full copy of "buffer" content on each side).
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || typeof window === 'undefined' || window.innerWidth >= 768) return;
    const raf = requestAnimationFrame(() => {
      const copyWidth = getCopyWidth();
      if (copyWidth > 0) el.scrollLeft = copyWidth;
    });
    return () => cancelAnimationFrame(raf);
  }, [destinations, getCopyWidth]);

  // IntersectionObserver to accurately track the card in mobile viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const realId = (entry.target as HTMLElement).dataset.destId;
            if (realId) visibleMobileCardIdRef.current = realId;
          }
        });
      },
      { root: scrollContainerRef.current, threshold: 0.5 }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [destinations]);

  // Rotates cards: on mobile, ONLY rotates the currently visible card; on desktop, staggers through all 4
  useEffect(() => {
    if (!destinations || destinations.length === 0 || isBotOrCrawler()) return;

    const interval = setInterval(() => {
      if (document.hidden) return;

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      let targetCardId = 'ecuador';

      if (isMobile) {
        // En móvil: únicamente rota la foto de la tarjeta visible en pantalla
        targetCardId = visibleMobileCardIdRef.current || 'ecuador';
      } else {
        // En desktop: rotación escalonada continua entre las 4 tarjetas
        const cardOrder = ['ecuador', 'galapagos', 'combined', 'full-day'];
        targetCardId = cardOrder[stepRef.current % cardOrder.length];
        stepRef.current += 1;
      }

      setCardImageIndices((prev) => {
        const pool = DESTINATION_IMAGE_POOLS[targetCardId] || [];
        if (pool.length === 0) return prev;
        const nextIdx = ((prev[targetCardId] || 0) + 1) % pool.length;
        return {
          ...prev,
          [targetCardId]: nextIdx,
        };
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [destinations]);

  const handleDestinationClick = (destId: string) => {
    setActiveDestId(destId);
    const sectionMap: Record<string, string> = {
      ecuador: 'continental',
      galapagos: 'galapagos',
      combined: 'combinados',
      'full-day': 'diarios',
    };
    const targetSection = sectionMap[destId.toLowerCase()] || 'galapagos';
    router.push(`/${locale}/tours#${targetSection}`);
  };

  if (!destinations || destinations.length === 0) return null;

  // 3 identical copies back-to-back for the mobile infinite rail. Copies 0 and 2
  // are hidden on md+ (desktop grid only shows the real middle copy).
  const railItems = [0, 1, 2].flatMap((copyIdx) =>
    destinations.map((dest, destIndex) => ({ dest, destIndex, copyIdx }))
  );

  return (
    <section
      id="destinations"
      className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="tracking-wide uppercase text-[11px] font-bold">{t('badge')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs self-start sm:self-end">
          <span>{destinations.length} {locale === 'es' ? 'Destinos Exclusivos' : 'Signature Regions'}</span>
        </div>
      </div>

      {/* ── Visual Destinations 4-Grid Stage with Staggered Dynamic Images ── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
      >
        {railItems.map(({ dest, destIndex, copyIdx }) => {
          const pool = DESTINATION_IMAGE_POOLS[dest.id] || [dest.imageUrl];
          const activeIndex = cardImageIndices[dest.id] ?? 0;
          const isRealCopy = copyIdx === 1;
          const uniqueId = isRealCopy ? dest.id.toLowerCase() : `${dest.id.toLowerCase()}-loop-${copyIdx}`;

          return (
            <div
              key={`${dest.id}-${copyIdx}`}
              id={uniqueId}
              data-dest-id={dest.id}
              aria-hidden={isRealCopy ? undefined : true}
              ref={(el) => {
                if (el) cardRefs.current[uniqueId] = el;
              }}
              onClick={() => handleDestinationClick(dest.id)}
              className={`group relative h-[420px] sm:h-[440px] md:h-[460px] w-[290px] xs:w-[320px] md:w-auto shrink-0 snap-center rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/80 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 cursor-pointer hover:-translate-y-1 bg-zinc-950 ${isRealCopy ? '' : 'md:hidden'}`}
            >
              {/* Dynamic Layered Images with Seamless Crossfade & Subtle Ken Burns Zoom */}
              {pool.map((imgSrc, imgIdx) => {
                if (isBotOrCrawler() && imgIdx !== 0) return null;
                const isCurrent = imgIdx === activeIndex;
                const nextIndex = (activeIndex + 1) % pool.length;
                const isNext = imgIdx === nextIndex;
                if (!isCurrent && !isNext) return null;

                return (
                  <div
                    key={`${dest.id}-img-${imgIdx}-${imgSrc}`}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isCurrent
                        ? 'opacity-100 scale-100 z-0 pointer-events-none'
                        : 'opacity-0 scale-105 pointer-events-none -z-10'
                      }`}
                  >
                    <Image
                      src={imgSrc}
                      alt={getLocalizedText(dest.name, locale)}
                      fill
                      quality={100}
                      loading="lazy"
                      sizes="(max-width: 640px) 340px, (max-width: 1024px) 360px, 320px"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}

              {/* Luxury Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 z-[1] pointer-events-none" />

              {/* Top Badge Info */}
              <div suppressHydrationWarning className="relative z-10 flex items-center justify-between w-full">
                <div suppressHydrationWarning className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                    {dest.toursCount} {journeysText}
                  </span>
                  <span suppressHydrationWarning className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-sm">
                    {fromText} ${(DESTINATION_PRICES[dest.id] || 85).toLocaleString('en-US')} <span className="text-[9px] font-normal text-zinc-300">USD</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Subtle dots showing image rotation progress */}
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                    {pool.map((_, dotIdx) => (
                      <span
                        key={`dot-${dotIdx}`}
                        className={`w-1.5 h-1.5 rounded-full transition-transform duration-500 ${dotIdx === activeIndex
                            ? 'bg-emerald-400 scale-x-150'
                            : 'bg-white/40'
                          }`}
                      />
                    ))}
                  </div>

                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20">
                    0{destIndex + 1}
                  </span>
                </div>
              </div>

              {/* Bottom Content inside Card */}
              <div className="relative z-10 space-y-2 text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight drop-shadow-md">
                  {getLocalizedText(dest.name, locale)}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-emerald-300 line-clamp-1 drop-shadow">
                  {getLocalizedText(dest.subtitle, locale)}
                </p>

                <p className="text-xs text-zinc-200 line-clamp-5 leading-relaxed font-normal drop-shadow">
                  {getLocalizedText(dest.description, locale)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

