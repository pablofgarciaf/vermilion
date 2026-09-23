'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Review } from '@/types';
import { mockReviews } from '@/data/mock';
import { Compass, ShieldCheck, Heart, Quote, ChevronLeft, ChevronRight, Star, ExternalLink, Award } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { isBotOrCrawler } from '@/utils/isBot';

function TripAdvisorSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
    </svg>
  );
}

interface TripAdvisorReviewsProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
  locale?: string;
}

const TRIPADVISOR_URL = 'https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html';

const EXPERIENCE_CARD_I18N: Record<string, { badge: string; title: string; description: string; certified: string; sustainable: string }> = {
  es: { badge: 'Viajes 100% Privados y a Medida', title: 'Experiencia Inigualable, Excelencia Inquebrantable', description: 'Creamos expediciones únicas, inolvidables y totalmente personalizadas a través de los espectaculares paisajes de Ecuador y Galápagos. Como operadores locales directos, combinamos la experiencia regional con una excelencia inquebrantable.', certified: 'Operador Certificado', sustainable: 'Impacto Sostenible' },
  en: { badge: '100% Private & Bespoke Journeys', title: 'Unmatched Experiences, Unwavering Excellence', description: 'We create unique, unforgettable and fully personalized expeditions through Ecuador and Galapagos’ spectacular landscapes. As direct local operators, we combine regional expertise with unwavering excellence.', certified: 'Certified Operator', sustainable: 'Sustainable Impact' },
  fr: { badge: 'Voyages 100 % Privés et Sur Mesure', title: 'Une Expérience Inégalée, une Excellence Sans Faille', description: 'Nous créons des expéditions uniques, inoubliables et entièrement personnalisées à travers les paysages spectaculaires de l’Équateur et des Galápagos. Opérateurs locaux directs, nous allions expertise régionale et excellence.', certified: 'Opérateur Certifié', sustainable: 'Impact Durable' },
  de: { badge: '100 % Private Reisen nach Maß', title: 'Einzigartige Erlebnisse, Unerschütterliche Exzellenz', description: 'Wir gestalten einzigartige, unvergessliche und vollständig personalisierte Expeditionen durch Ecuadors und Galápagos’ spektakuläre Landschaften. Als direkte lokale Veranstalter verbinden wir regionale Expertise mit Exzellenz.', certified: 'Zertifizierter Veranstalter', sustainable: 'Nachhaltige Wirkung' },
  it: { badge: 'Viaggi 100% Privati e su Misura', title: 'Esperienze Impareggiabili, Eccellenza Incrollabile', description: 'Creiamo spedizioni uniche, indimenticabili e completamente personalizzate attraverso gli spettacolari paesaggi dell’Ecuador e delle Galápagos. Come operatori locali diretti, uniamo esperienza locale ed eccellenza.', certified: 'Operatore Certificato', sustainable: 'Impatto Sostenibile' },
  pt: { badge: 'Viagens 100% Privadas e Sob Medida', title: 'Experiência Inigualável, Excelência Inabalável', description: 'Criamos expedições únicas, inesquecíveis e totalmente personalizadas pelas paisagens espetaculares do Equador e das Galápagos. Como operadores locais diretos, unimos experiência regional e excelência.', certified: 'Operador Certificado', sustainable: 'Impacto Sustentável' },
  ja: { badge: '100%プライベート・オーダーメイド旅行', title: '比類なき体験、揺るぎない卓越性', description: 'エクアドルとガラパゴスの壮大な景観をめぐる、唯一無二で忘れられない完全オーダーメイドの遠征をご提案します。現地直営の専門家として、地域の知識と卓越したサービスをお届けします。', certified: '認定旅行会社', sustainable: '持続可能な取り組み' },
  zh: { badge: '100% 私人定制旅行', title: '非凡体验，卓越不凡', description: '我们为您打造独特、难忘且完全定制的厄瓜多尔与加拉帕戈斯探险之旅。作为当地直营运营商，我们将深厚的区域经验与始终如一的卓越服务相结合。', certified: '认证运营商', sustainable: '可持续影响' },
};

export function TripAdvisorReviews({
  reviews = mockReviews,
  title = "Opiniones Verificadas de Viajeros",
  subtitle = "Descubra lo que dicen nuestros viajeros sobre el servicio personalizado, guías expertos y alojamientos premium.",
  locale
}: TripAdvisorReviewsProps) {
  const hookLocale = useLocale();
  const currentLocale = locale || hookLocale || 'en';
  const experienceCard = EXPERIENCE_CARD_I18N[currentLocale] || EXPERIENCE_CARD_I18N.en;
  const total = reviews.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (isHovered || total <= 1 || isBotOrCrawler()) return;

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
    <section className="w-full space-y-6">
      {/* Header Superior Limpio con Título y Puntuación a la derecha */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
        <div className="space-y-2 max-w-3xl">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:scale-105 transition-transform"
          >
            <TripAdvisorSvg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>TripAdvisor Travelers' Choice 2026 Winner ↗</span>
          </a>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={TRIPADVISOR_URL}
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
                <span>TripAdvisor Rating ↗</span>
              </div>
              <div className="text-[10px] text-zinc-500">Based on 51 Excellent Reviews</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Cuerpo Principal: Tarjeta Verde a la Izquierda + Grid 2x2 a la Derecha */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">

        {/* Tarjeta Izquierda (Estilo Landing Exacto) */}
        <div className="w-full lg:w-[360px] xl:w-[380px] shrink-0 flex flex-col">
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col justify-between space-y-4 relative group flex-1 border border-emerald-700/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-600/50 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
                <Compass className="w-3.5 h-3.5" />
                <span>{experienceCard.badge}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                {experienceCard.title}
              </h3>

              <p className="text-emerald-50/90 text-xs sm:text-sm leading-relaxed">
                {experienceCard.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 relative z-10 pt-4 mt-auto border-t border-emerald-700/50">
              <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{experienceCard.certified}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                <Heart className="w-3.5 h-3.5" />
                <span>{experienceCard.sustainable}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Cuadrícula 2x2 de Opiniones con Carrusel */}
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
                  className={`bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-5 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition-all duration-300 flex-col justify-between space-y-3 relative group animate-fade-in ${offset > 0 ? 'hidden sm:flex' : 'flex'
                    }`}
                >
                  <Quote className="w-5 h-5 text-emerald-100 dark:text-emerald-950/80 absolute top-4 right-4 pointer-events-none group-hover:text-emerald-200 transition-colors" />

                  <div className="space-y-2 relative z-10 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <a
                        href={TRIPADVISOR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <TripAdvisorSvg className="w-3 h-3" />
                        <span>TripAdvisor ↗</span>
                      </a>
                    </div>

                    <h4 className="font-serif text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug line-clamp-1">
                      "{rev.title}"
                    </h4>

                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed italic line-clamp-3">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 relative z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto shrink-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/20">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-zinc-900 dark:text-white leading-tight">{rev.author}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                        {rev.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controles de Móvil */}
          <div className="flex sm:hidden items-center justify-between pt-3 px-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {currentIndex + 1} / {total}
            </span>
            <div className="flex items-center gap-1.5 py-1">
              {reviews.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 block ${dotIdx === currentIndex
                      ? 'w-4 bg-emerald-600 dark:bg-emerald-400'
                      : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
                    }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
