'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Review } from '@/types';
import { mockReviews } from '@/data/mock';
import { Compass, ShieldCheck, Heart, Quote, ChevronLeft, ChevronRight, Star, ExternalLink, CheckCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { TRIPADVISOR_REVIEW_COUNT, TRIPADVISOR_URL } from '@/data/bookingTerms';
import { isBotOrCrawler } from '@/utils/isBot';
import { prefersReducedMotion } from '@/utils/motion';

export function TripAdvisorSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
    </svg>
  );
}

export interface TripAdvisorReviewsProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
  locale?: string;
}

export interface ReviewLabels {
  badge: string;
  defaultTitle: string;
  defaultSubtitle: string;
  verified: string;
  viewOriginal: string;
  ratingLabel: string;
  verifyProfile: (name: string) => string;
  verifyReview: (name: string) => string;
  verifiedTraveler: string;
}

export const REVIEW_LABELS_I18N: Record<string, ReviewLabels> = {
  es: {
    badge: "Ganador Travelers' Choice 2026 de TripAdvisor ↗",
    defaultTitle: "Opiniones Verificadas de Viajeros",
    defaultSubtitle: "Descubra lo que dicen nuestros viajeros sobre el servicio personalizado, guías expertos y alojamientos premium.",
    verified: "Verificada en TripAdvisor ↗",
    viewOriginal: "Ver original",
    ratingLabel: "Puntuación TripAdvisor ↗",
    verifyProfile: (name: string) => `Verificar perfil de ${name} en TripAdvisor ↗`,
    verifyReview: (name: string) => `Verificar reseña original de ${name} para Vermilion Routes en TripAdvisor ↗`,
    verifiedTraveler: "Viajero verificado en TripAdvisor",
  },
  en: {
    badge: "TripAdvisor Travelers' Choice 2026 Winner ↗",
    defaultTitle: "Verified Traveler Reviews",
    defaultSubtitle: "Discover what our travelers say about personalized service, expert naturalist guides, and premium boutique stays.",
    verified: "Verified on TripAdvisor ↗",
    viewOriginal: "View original",
    ratingLabel: "TripAdvisor Rating ↗",
    verifyProfile: (name: string) => `Verify ${name}'s profile on TripAdvisor ↗`,
    verifyReview: (name: string) => `Verify original review by ${name} for Vermilion Routes on TripAdvisor ↗`,
    verifiedTraveler: "Verified traveler on TripAdvisor",
  },
  fr: {
    badge: "Gagnant TripAdvisor Travelers' Choice 2026 ↗",
    defaultTitle: "Avis Vérifiés de Voyageurs",
    defaultSubtitle: "Découvrez ce que disent nos voyageurs sur notre service sur mesure, nos guides experts et nos hébergements haut de gamme.",
    verified: "Vérifié sur TripAdvisor ↗",
    viewOriginal: "Voir l'original",
    ratingLabel: "Note TripAdvisor ↗",
    verifyProfile: (name: string) => `Vérifier le profil de ${name} sur TripAdvisor ↗`,
    verifyReview: (name: string) => `Vérifier l'avis original de ${name} pour Vermilion Routes sur TripAdvisor ↗`,
    verifiedTraveler: "Voyageur vérifié sur TripAdvisor",
  },
  de: {
    badge: "TripAdvisor Travelers' Choice Gewinner 2026 ↗",
    defaultTitle: "Verifizierte Reisebewertungen",
    defaultSubtitle: "Erfahren Sie, was unsere Reisenden über persönlichen Service, erfahrene Guides und erstklassige Unterkünfte berichten.",
    verified: "Auf TripAdvisor verifiziert ↗",
    viewOriginal: "Original ansehen",
    ratingLabel: "TripAdvisor Bewertung ↗",
    verifyProfile: (name: string) => `Profil von ${name} auf TripAdvisor verifizieren ↗`,
    verifyReview: (name: string) => `Originalbewertung von ${name} für Vermilion Routes auf TripAdvisor verifizieren ↗`,
    verifiedTraveler: "Verifizierter Reisender auf TripAdvisor",
  },
  it: {
    badge: "Vincitore TripAdvisor Travelers' Choice 2026 ↗",
    defaultTitle: "Recensioni Verificate dei Viaggiatori",
    defaultSubtitle: "Scopri cosa dicono i nostri viaggiatori sul servizio personalizzato, le guide esperte e gli alloggi premium.",
    verified: "Verificato su TripAdvisor ↗",
    viewOriginal: "Vedi originale",
    ratingLabel: "Valutazione TripAdvisor ↗",
    verifyProfile: (name: string) => `Verifica il profilo di ${name} su TripAdvisor ↗`,
    verifyReview: (name: string) => `Verifica la recensione originale di ${name} per Vermilion Routes su TripAdvisor ↗`,
    verifiedTraveler: "Viaggiatore verificato su TripAdvisor",
  },
  pt: {
    badge: "Vencedor TripAdvisor Travelers' Choice 2026 ↗",
    defaultTitle: "Avaliações Verificadas de Viajantes",
    defaultSubtitle: "Descubra o que nossos viajantes dizem sobre atendimento personalizado, guias especializados e hospedagens de luxo.",
    verified: "Verificado no TripAdvisor ↗",
    viewOriginal: "Ver original",
    ratingLabel: "Avaliação TripAdvisor ↗",
    verifyProfile: (name: string) => `Verificar perfil de ${name} no TripAdvisor ↗`,
    verifyReview: (name: string) => `Verificar avaliação original de ${name} para Vermilion Routes no TripAdvisor ↗`,
    verifiedTraveler: "Viajante verificado no TripAdvisor",
  },
  ja: {
    badge: "トリップアドバイザー トラベラーズチョイス2026受賞 ↗",
    defaultTitle: "旅行者による認証済みレビュー",
    defaultSubtitle: "オーダーメイドのサービス、専任の自然ガイド、最高級の宿泊施設に関するお客様の生の声をご覧ください。",
    verified: "トリップアドバイザー確認済み ↗",
    viewOriginal: "原本を見る",
    ratingLabel: "トリップアドバイザー評価 ↗",
    verifyProfile: (name: string) => `TripAdvisorで${name}のプロフィールを確認 ↗`,
    verifyReview: (name: string) => `TripAdvisorで${name}によるVermilion Routesの原文レビューを確認 ↗`,
    verifiedTraveler: "TripAdvisor認証済み旅行者",
  },
  zh: {
    badge: "猫途鹰 TripAdvisor 2026 年度旅行者之选 ↗",
    defaultTitle: "旅行者真实好评",
    defaultSubtitle: "了解尊贵旅行者对我们定制私家团服务、资深自然向导与高端精品酒店的真实评价。",
    verified: "猫途鹰 TripAdvisor 真实认证 ↗",
    viewOriginal: "查看原文",
    ratingLabel: "猫途鹰 TripAdvisor 评分 ↗",
    verifyProfile: (name: string) => `在猫途鹰 TripAdvisor 上验证 ${name} 的真实档案 ↗`,
    verifyReview: (name: string) => `在猫途鹰 TripAdvisor 上验证 ${name} 对 Vermilion Routes 的原始评价 ↗`,
    verifiedTraveler: "猫途鹰 TripAdvisor 认证旅行者",
  },
};

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
  title,
  subtitle,
  locale
}: TripAdvisorReviewsProps) {
  const hookLocale = useLocale();
  const tb = useTranslations('bookingConversion');
  const currentLocale = locale || hookLocale || 'en';
  const experienceCard = EXPERIENCE_CARD_I18N[currentLocale] || EXPERIENCE_CARD_I18N.en;
  const labels = REVIEW_LABELS_I18N[currentLocale] || REVIEW_LABELS_I18N.en;
  const displayTitle = title || labels.defaultTitle;
  const displaySubtitle = subtitle || labels.defaultSubtitle;
  const total = reviews.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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
    }, 5000);

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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            <TripAdvisorSvg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{labels.badge}</span>
          </a>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
            {displayTitle}
          </h2>
          {displaySubtitle && (
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {displaySubtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0 hover:border-emerald-500/50 hover:shadow-md active:scale-95 transition-all group cursor-pointer"
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
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Cuerpo Principal: Tarjeta Verde a la Izquierda + Grid 2x2 a la Derecha */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">

        {/* Tarjeta Izquierda (Estilo Luxury Direct) */}
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
              if (offset === 1 && total < 2) return null;
              const verifyUrl = rev.reviewUrl || TRIPADVISOR_URL;

              return (
                <div
                  key={`${rev.id}-${currentIndex}-${offset}`}
                  className={`bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-5 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-300 flex-col justify-between space-y-3 relative group ${offset > 1 ? 'hidden sm:flex' : 'flex'
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
                      
                      {/* Enlace de verificación directa para el visitante */}
                      <a
                        href={verifyUrl}
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

                    <h4 className="font-serif text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug line-clamp-1">
                      "{rev.title}"
                    </h4>

                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed italic line-clamp-3">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2.5 relative z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto shrink-0">
                    {/* Autor con foto real ampliada y enlace directo a su perfil de viajero en TripAdvisor */}
                    <a
                      href={rev.profileUrl || verifyUrl}
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
                      href={verifyUrl}
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

          {/* Controles de Móvil */}
          <div className="flex sm:hidden items-center justify-between pt-3 px-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {page} / {pages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
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
