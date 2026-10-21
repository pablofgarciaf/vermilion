'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Compass, ShieldCheck, Heart, Quote, CheckCircle2, ChevronLeft, ChevronRight, Star, ExternalLink, CheckCircle } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useLocale, useTranslations } from 'next-intl';
import { mockReviews } from '@/data/mock';
import { TRIPADVISOR_REVIEW_COUNT } from '@/data/bookingTerms';
import { isBotOrCrawler } from '@/utils/isBot';
import { prefersReducedMotion } from '@/utils/motion';
import { TripAdvisorSvg, REVIEW_LABELS_I18N } from './TripAdvisorReviews';

export function CombinedExperienceSection() {
  const { settings } = useSettings();
  const t = useTranslations('experience');
  const tb = useTranslations('bookingConversion');
  const locale = useLocale();
  const labels = REVIEW_LABELS_I18N[locale] || REVIEW_LABELS_I18N.en;
  const reviews = mockReviews;
  const total = reviews.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const tripAdvisorUrl = 'https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html';

  // Se avanza de 2 en 2: en móvil se ven 2 reseñas apiladas; en escritorio, 4 (2x2).
  const STEP = 2;
  const pages = Math.max(1, Math.ceil(total / STEP));
  const page = Math.floor(currentIndex / STEP) + 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - STEP + pages * STEP) % (pages * STEP));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + STEP) % (pages * STEP));
  };

  useEffect(() => {
    if (isHovered || total <= 1 || isBotOrCrawler() || prefersReducedMotion()) return;
    
    const interval = setInterval(() => {
      if (document.body.style.overflow === 'hidden') return;
      handleNext();
    }, 4500); 
    
    return () => clearInterval(interval);
  }, [total, isHovered, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) handleNext();
    else if (distance < -40) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
    setIsHovered(false);
  };

  return (
    <section id="about" className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden scroll-mt-20">
      <span id="experience" className="sr-only -top-24 relative" aria-hidden="true" />
      {/* Subtle animated background mesh to remove flatness */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-200/50 dark:bg-emerald-900/40 blur-[100px] animate-pulse [animation-duration:8s]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-teal-200/50 dark:bg-teal-900/40 blur-[100px] animate-pulse [animation-duration:10s] [animation-delay:2s]" />
      </div>

      {/* TripAdvisor Reviews Carousel with Experience Card */}
      <div className="w-full space-y-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
          <div className="space-y-2 max-w-2xl">
            <a
              href={tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:scale-105 transition-transform"
            >
              <TripAdvisorSvg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{labels.badge}</span>
            </a>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
              {t('reviewsTitle') || 'Guest Stories & TripAdvisor Excellence'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0 hover:border-emerald-500/50 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-lg group-hover:scale-105 transition-transform">
                5.0
              </div>
              <div>
                <div className="flex gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  <TripAdvisorSvg className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{labels.ratingLabel}</span>
                </div>
                <div className="text-[10px] text-zinc-500">{tb('reviewsBasedOn', { count: TRIPADVISOR_REVIEW_COUNT })}</div>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                suppressHydrationWarning
              >
                <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                suppressHydrationWarning
              >
                <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* FIXED LEFT CARD: The Experience Text */}
          <div className="w-full lg:w-[360px] xl:w-[380px] shrink-0 flex flex-col">
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-4 relative group flex-1 border border-emerald-700/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-600/50 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('badge')}</span>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  {t('title')}
                </h3>
                
                <p className="text-emerald-50/90 text-xs sm:text-sm leading-relaxed">
                  {t('text')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 relative z-10 pt-4 mt-auto border-t border-emerald-700/50">
                <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('certified')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{t('sustainable')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: TripAdvisor Reviews (1 Card Carousel on Mobile, 2x2 Grid on Desktop) */}
          <div 
            className="flex-1 overflow-hidden flex flex-col justify-between"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 h-full">
              {[0, 1, 2, 3].map((offset) => {
                const revIndex = (currentIndex + offset) % total;
                const rev = reviews[revIndex];

                return (
                  <div
                    key={`${rev.id}-${currentIndex}-${offset}`}
                    className={`bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-5 sm:p-4.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition-all duration-300 flex-col justify-between space-y-3 relative group animate-fade-in ${
                      offset > 1 ? 'hidden sm:flex' : 'flex'
                    }`}
                  >
                    <Quote className="w-5 h-5 text-emerald-100 dark:text-emerald-950/80 absolute top-3.5 right-3.5 pointer-events-none group-hover:text-emerald-200 transition-colors" />

                    <div className="space-y-2 relative z-10 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        {/* Enlace de verificación directa para el visitante */}
                        <a
                          href={rev.reviewUrl || tripAdvisorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                          title={labels.verifyReview(rev.author)}
                          aria-label={labels.verifyReview(rev.author)}
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{labels.verified}</span>
                        </a>
                      </div>
                      
                      <h4 className="font-serif text-sm sm:text-sm font-bold text-zinc-900 dark:text-white leading-snug line-clamp-1">
                        "{rev.title}"
                      </h4>
                      
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-xs leading-relaxed italic line-clamp-4">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 relative z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto shrink-0">
                      {/* Autor con foto real ampliada y enlace directo a su perfil de viajero en TripAdvisor */}
                      <a
                        href={rev.profileUrl || rev.reviewUrl || tripAdvisorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={labels.verifyProfile(rev.author)}
                        aria-label={labels.verifyProfile(rev.author)}
                        className="group/author flex items-center gap-3 sm:gap-3.5 min-w-0"
                      >
                        <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-bold text-base flex items-center justify-center border-2 border-emerald-500/50 group-hover/author:border-emerald-500 group-hover/author:scale-105 transition-all shadow-md overflow-visible">
                          <span className="select-none" aria-hidden="true">{rev.author.charAt(0)}</span>
                          <img
                            src={rev.avatarUrl || `/images/reviews/${rev.id}.webp`}
                            alt={`Foto de perfil de ${rev.author} en TripAdvisor`}
                            width={64}
                            height={64}
                            className="absolute inset-0 w-full h-full rounded-full object-cover shadow-inner"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div
                            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 z-10 shadow-xs"
                            title={labels.verifiedTraveler}
                          >
                            <CheckCircle className="w-3.5 h-3.5 fill-current" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white leading-tight group-hover/author:text-emerald-600 dark:group-hover/author:text-emerald-400 group-hover/author:underline flex items-center gap-1.5">
                            <span className="truncate">{rev.author}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/author:opacity-100 transition-opacity shrink-0" />
                          </div>
                          {rev.location && (
                            <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium truncate mt-0.5">
                              {rev.location}
                            </div>
                          )}
                          <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                            <span>TripAdvisor {labels.verified}</span>
                          </div>
                        </div>
                      </a>

                      <a
                        href={rev.reviewUrl || tripAdvisorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={labels.verifyReview(rev.author)}
                        aria-label={labels.verifyReview(rev.author)}
                        className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline flex items-center gap-1 shrink-0 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 transition-colors"
                      >
                        <span>
                          {rev.photoCount ? `📷 ${rev.photoCount} · ` : ''}
                          {labels.viewOriginal}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Controles en móvil: 2 reseñas por vista, contador de páginas sin puntos */}
            <div className="flex sm:hidden items-center justify-between pt-3 px-1">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {page} / {pages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  suppressHydrationWarning
                >
                  <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  suppressHydrationWarning
                >
                  <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
