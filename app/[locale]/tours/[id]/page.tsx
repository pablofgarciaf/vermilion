import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getToursFromFirestore, getTourByIdFromFirestore } from '@/lib/tours';
import { TourGallery } from '@/components/tours/TourGallery';
import { TourItinerary } from '@/components/tours/TourItinerary';
import { TourSubNav } from '@/components/tours/TourSubNav';
import { ReservationBannerWrapper } from '@/components/reservations/ReservationBannerWrapper';
import dynamic from 'next/dynamic';
const TripAdvisorReviews = dynamic(
  () => import('@/components/home/TripAdvisorReviews').then(mod => mod.TripAdvisorReviews),
  { loading: () => <div className="h-[400px] bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-2xl" /> }
);

import { Button } from '@/components/ui/Button';
import { ExpeditionFacts } from '@/components/tours/ExpeditionFacts';
import { DownloadPDFButton } from '@/components/tours/DownloadPDFButton';
import {
  MapPin,
  Clock,
  Star,
  ArrowLeft,
  Check,
  X,
  Compass,
  ShieldCheck,
  Sparkles,
  Hotel,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface TourDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

import { mockTours } from '@/data/mock';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getSeoAlternates } from '@/utils/seoHelper';

export const dynamicParams = true;
export const revalidate = 60;

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const tour of mockTours) {
      params.push({ locale, id: tour.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tour = await getTourByIdFromFirestore(resolvedParams.id);

  if (!tour) {
    return {
      title: 'Tour Package Not Found | Vermilion Routes',
    };
  }

  const rawTitle = getLocalizedText(tour.title, resolvedParams.locale) || 'Bespoke Tour';
  let title = `${rawTitle} | Vermilion Routes`;
  if (title.length < 50) {
    title = `${rawTitle} Bespoke Tour | Vermilion Routes`;
  }
  if (title.length > 60) {
    const maxLen = 60 - 19;
    const lastSpace = rawTitle.lastIndexOf(' ', maxLen);
    const safeTitle = lastSpace > 20 ? rawTitle.slice(0, lastSpace).trim() : rawTitle.slice(0, maxLen).trim();
    title = `${safeTitle} | Vermilion Routes`;
  }

  const rawDesc = getLocalizedText(tour.description || tour.shortDescription, resolvedParams.locale) || '';
  let description = rawDesc.replace(/\s+/g, ' ').trim();
  if (description.length > 155) {
    const lastSpace = description.lastIndexOf(' ', 150);
    description = lastSpace > 100 ? description.slice(0, lastSpace).trim() + '.' : description.slice(0, 150).trim() + '.';
  }

  const dest = getLocalizedText(tour.destination, resolvedParams.locale);
  const alternates = getSeoAlternates(`/tours/${tour.id}`, resolvedParams.locale);
  const rawImg = tour.mainImage || tour.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp';
  const fullImgUrl = rawImg.startsWith('http') ? rawImg : `https://www.vermilionroutes.com${rawImg}`;
  const fbLocale = {
    es: 'es_LA',
    en: 'en_US',
    fr: 'fr_FR',
    de: 'de_DE',
    it: 'it_IT',
    pt: 'pt_BR',
    ja: 'ja_JP',
    zh: 'zh_CN',
  }[resolvedParams.locale] || 'en_US';

  return {
    title,
    description,
    openGraph: {
      title: `${rawTitle} - ${dest}`,
      description,
      url: alternates.canonical,
      siteName: 'Vermilion Routes',
      locale: fbLocale,
      type: 'website',
      images: [
        {
          url: fullImgUrl,
          secureUrl: fullImgUrl,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: rawTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vermilionroutes',
      creator: '@vermilionroutes',
      title: `${rawTitle} - ${dest}`,
      description,
      images: [fullImgUrl],
    },
    alternates,
  };
}

const HIGHLIGHTS_PREFIX: Record<string, string> = {
  es: 'Puntos Clave:',
  en: 'Highlights:',
  fr: 'Points Forts:',
  de: 'Höhepunkte:',
  it: 'Punti Chiave:',
  pt: 'Destaques:',
  ja: 'ハイライト:',
  zh: '行程亮点:',
};

const DAILY_TOUR_CTA: Record<string, string> = {
  es: 'Reservar tour', en: 'Book tour', fr: 'Réserver le circuit', de: 'Tour buchen',
  it: 'Prenota il tour', pt: 'Reservar tour', ja: 'ツアーを予約', zh: '预订行程',
};

const EXPRESS_DEPARTURE_PILL: Record<string, string> = {
  es: 'Salidas en 24h Disponibles',
  en: '24h Express Departures Available',
  fr: 'Départs en 24h Disponibles',
  de: '24h-Express-Abreisen Verfügbar',
  it: 'Partenze in 24h Disponibili',
  pt: 'Saídas em 24h Disponíveis',
  ja: '24時間以内の即時出発対応',
  zh: '支持24小时极速出发',
};

const TIER_COMPARISON: Record<string, { clubFeatures: string; vipFeatures: string }> = {
  es: {
    clubFeatures: 'Hoteles 3★ seleccionados, desayuno continental, traslados con A/C, guía naturalista oficial.',
    vipFeatures: 'Hoteles 4★ de lujo, desayuno buffet, lanchas rápidas VIP, copa de bienvenida y concierge 24/7.',
  },
  en: {
    clubFeatures: 'Selected 3★ boutique hotels, continental breakfast, A/C transfers, official naturalist guide.',
    vipFeatures: 'Top 4★ luxury hotels, buffet breakfast, VIP speedboats, champagne welcome & 24/7 concierge.',
  },
  fr: {
    clubFeatures: 'Hôtels 3★ sélectionnés, petit-déjeuner continental, transferts climatisés, guide naturaliste.',
    vipFeatures: 'Hôtels 4★ de luxe, petit-déjeuner buffet, bateaux VIP, champagne de bienvenue et conciergerie 24/7.',
  },
  de: {
    clubFeatures: 'Ausgewählte 3★-Hotels, kontinentales Frühstück, klimatisierte Transfers, zertifizierter Guide.',
    vipFeatures: 'Erstklassige 4★-Luxushotels, Frühstücksbuffet, VIP-Schnellboote, Begrüßungsgetränk & 24/7 Concierge.',
  },
  it: {
    clubFeatures: 'Hotel 3★ selezionati, colazione continentale, trasferimenti climatizzati, guida naturalistica.',
    vipFeatures: 'Hotel 4★ di lusso, colazione a buffet, motoscafi VIP veloci, brindisi di benvenuto e concierge 24/7.',
  },
  pt: {
    clubFeatures: 'Hotéis 3★ selecionados, café da manhã continental, traslados com ar condicionado, guia naturalista.',
    vipFeatures: 'Hotéis 4★ de luxo, buffet de café da manhã, lanchas VIP rápidas, brinde de boas-vindas e concierge 24/7.',
  },
  ja: {
    clubFeatures: '厳選3星ブティックホテル、コンチネンタル朝食、冷房完備専用送迎、公認ナチュラリストガイド。',
    vipFeatures: '最高級4星ラグジュアリーホテル、ビュッフェ朝食、高速VIPボート、ウェルカムドリンク＆24時間コンシェルジュ。',
  },
  zh: {
    clubFeatures: '精选3星精品酒店、欧式早餐、全空调专属接送、官方认证自然学向导。',
    vipFeatures: '顶级4星奢华酒店、全丰盛自助早餐、高速VIP巡航快艇、迎宾香槟及24/7全天候礼宾支持。',
  },
};

const SELECT_TIER_LABEL: Record<string, string> = {
  es: 'Seleccione su Categoría:',
  en: 'Select Your Tier:',
  fr: 'Sélectionnez votre Catégorie :',
  de: 'Wählen Sie Ihre Kategorie:',
  it: 'Seleziona la tua Categoria:',
  pt: 'Selecione sua Categoria:',
  ja: 'クラスを選択してください:',
  zh: '请选择您的专属等级：',
};

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Defensive 301 redirects for legacy tours
  if (resolvedParams.id === 'galapagos-4days') {
    redirect(`/${locale}/tours/galapagos-6days`);
  }
  if (resolvedParams.id === 'galapagos-5days') {
    redirect(`/${locale}/tours/galapagos-7days`);
  }
  if (resolvedParams.id === 'ecuador-fantastic') {
    redirect(`/${locale}/tours/ecuador-fantastic-8days`);
  }

  const rawTour = mockTours.find((t) => t.id === resolvedParams.id);
  const tour = await getTourByIdFromFirestore(resolvedParams.id, rawTour);

  if (!tour) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center space-y-6 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">
          Tour Package Not Found
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          The requested travel itinerary could not be found. We invite you to explore our curated selection of exclusive journeys through Ecuador and Galapagos.
        </p>
        <Link href={`/${resolvedParams.locale}`}>
          <Button variant="primary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>
        </Link>
      </div>
    );
  }

  const title = getLocalizedText(tour.title, locale);
  const shortTourName = title.split(' - ')[0].split(':')[0].trim();
  const dest = getLocalizedText(tour.destination, locale);
  const duration = getLocalizedText(tour.duration, locale);
  const category = getLocalizedText(tour.category, locale);

  const galleryImages = tour.gallery && tour.gallery.length > 0
    ? tour.gallery
    : [tour.imageUrl];

  const priceClub = tour.price3Star || tour.price || 1050;
  const priceVip = tour.price4Star || Math.round(priceClub * 1.15);
  const isDailyTour = tour.durationDays === 1;

  const tourJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristTrip', 'Product'],
    name: title,
    description: getLocalizedText(tour.description || tour.shortDescription, locale),
    image: [tour.mainImage || tour.imageUrl, ...galleryImages],
    touristType: ['Nature Traveler', 'Eco-Tourist', 'Family Adventure'],
    itinerary: tour.itinerary?.map((day) => ({
      '@type': 'City',
      name: getLocalizedText(day.title, locale),
      description: getLocalizedText(day.description, locale),
    })),
    offers: {
      '@type': 'Offer',
      price: Number((tour.priceFromUSD || tour.price || 1000).toString().replace(/[^0-9.]/g, '')),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://www.vermilionroutes.com/${locale}/tours/${tour.id}`,
      validFrom: '2026-01-01',
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Vermilion Routes',
      url: 'https://www.vermilionroutes.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewsCount || 24,
    },
  };

  return (
    <>
      <TourSubNav title={title} duration={duration} tour={tour} locale={locale} />
      <ReservationBannerWrapper tourId={tour.id} locale={locale} />

      {/* Padding superior ampliado para evitar solapamiento con el navbar */}
      <div className="relative bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-32 sm:pt-40">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
        />

        {/* ── HERO INTEGRADO DE DOS PARTES ── */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* Columna Izquierda del Hero: Título, Metadatos, Resumen y Botones de Tarifas */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight pt-2">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-4 h-4" />
                  <span>{duration}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{tour.rating}</span>
                  {tour.reviewsCount && (
                    <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                      ({tour.reviewsCount} {getLocalizedText('verified reviews', locale)})
                    </span>
                  )}
                </span>
                <span>&bull;</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full text-xs">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 animate-pulse" />
                  <span>{EXPRESS_DEPARTURE_PILL[locale] || EXPRESS_DEPARTURE_PILL.en}</span>
                </span>
              </div>

              {isDailyTour && (
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">USD</span>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    ${priceClub.toLocaleString('en-US')}
                  </span>
                </div>
              )}

              {/* Resumen integrado en el Hero */}
              {tour.description && (
                <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed pt-1">
                  {getLocalizedText(tour.description, locale)}
                </p>
              )}

              {/* Los tours diarios tienen una tarifa única; las expediciones conservan sus categorías. */}
              <div className="pt-2 space-y-3">

                {isDailyTour ? (
                  <Link
                    href={`/${locale}/booking?addTour=${tour.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-400/70 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] px-4 py-2.5 text-xs font-bold text-zinc-950 shadow-sm shadow-amber-500/20 transition-all hover:brightness-105 group"
                  >
                    {DAILY_TOUR_CTA[locale] || DAILY_TOUR_CTA.en}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ) : <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Botón Club (Verde Metálico Elegante) */}
                    <div className="space-y-1.5">
                      <Link
                        href={`/${locale}/booking?addTour=${tour.id}&tier=club`}
                        className="relative flex min-h-[72px] items-center rounded-xl border-2 border-emerald-600/70 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 px-3 py-2.5 shadow-md shadow-emerald-900/30 transition-all hover:brightness-110 group"
                      >
                        <div className="flex flex-1 flex-col items-center justify-center gap-0.5 pr-6 text-center">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                            <Hotel className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Vermilion Club (3★)</span>
                          </div>
                          <p className="text-xs font-extrabold text-emerald-200">
                            ${priceClub.toLocaleString('en-US')} USD
                          </p>
                        </div>
                        <ArrowRight className="absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 text-emerald-300 transition-all group-hover:translate-x-0.5" />
                      </Link>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug px-1">
                        {(TIER_COMPARISON[locale] || TIER_COMPARISON.en).clubFeatures}
                      </p>
                    </div>

                    {/* Botón VIP (Dorado Metálico Estilo Referencia) */}
                    <div className="space-y-1.5">
                      <Link
                        href={`/${locale}/booking?addTour=${tour.id}&tier=vip`}
                        className="relative flex min-h-[72px] items-center rounded-xl border border-amber-400/65 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] px-3 py-2.5 shadow-md shadow-amber-500/20 transition-all hover:brightness-105 group"
                      >
                        <div className="flex flex-1 flex-col items-center justify-center gap-0.5 pr-6 text-center">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-950">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-950 fill-zinc-950" />
                            <span>Vermilion VIP (4★)</span>
                          </div>
                          <p className="text-xs font-extrabold text-zinc-950">
                            ${priceVip.toLocaleString('en-US')} USD
                          </p>
                        </div>
                        <ArrowRight className="absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 text-zinc-950 transition-all group-hover:translate-x-0.5" />
                      </Link>
                      <p className="text-[11px] text-amber-700/90 dark:text-amber-300/90 leading-snug px-1">
                        {(TIER_COMPARISON[locale] || TIER_COMPARISON.en).vipFeatures}
                      </p>
                    </div>
                  </div>
                </>}

                {/* Botón de Descarga de Itinerario en PDF espacioso y elegante */}
                <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-start">
                  <DownloadPDFButton tour={tour} variant="outline" size="sm" className="w-full sm:w-auto" />
                </div>
              </div>
            </div>

            {/* Columna Derecha del Hero: La Galería Interactiva */}
            <div className="lg:col-span-6">
              <TourGallery images={galleryImages} title={title} tourId={tour.id} destination={tour.destination} emphasizeFirst={/galapagos/i.test(dest || '')} />
            </div>

          </div>
        </div>

        {/* ── RESTO DEL CONTENIDO A ANCHO COMPLETO (MAX-W-7XL) ── */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 space-y-12">

          {/* Ficha Técnica (Izquierda) y Puntos Clave (Derecha) en 2 Columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <ExpeditionFacts
                tourId={tour.id}
                destination={tour.destination}
                duration={tour.duration}
              />
            </div>

            {tour.highlights && tour.highlights.length > 0 && (
              <div className="lg:col-span-6 bg-emerald-950/5 dark:bg-emerald-950/20 p-6 sm:p-8 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/40 space-y-4 h-full flex flex-col justify-between">
                <h2 className="font-serif font-bold text-xl text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>{(HIGHLIGHTS_PREFIX[locale] || 'Highlights:') + ' ' + shortTourName}</span>
                </h2>
                <ul className="grid grid-cols-1 gap-3 text-sm text-emerald-900 dark:text-emerald-200">
                  {tour.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                        ✓
                      </div>
                      <span className="font-medium">{getLocalizedText(item, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Itinerary interactivo */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <TourItinerary itinerary={tour.itinerary} tourTitle={shortTourName} />
          )}

          {/* Inclusions & Exclusions en 3 Columnas (2 para lo que sí, 1 para lo que no) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-emerald-900 dark:text-emerald-400 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>{getLocalizedText('What is Included?', locale)}</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{getLocalizedText(inc, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="lg:col-span-1 bg-white dark:bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                  <X className="w-5 h-5 text-rose-500" />
                  <span>{getLocalizedText('What is NOT Included?', locale)}</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{getLocalizedText(exc, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Verified Guest Reviews */}
          <div className="pt-10 border-T border-zinc-200/80 dark:border-zinc-800">
            <TripAdvisorReviews
              title={`${getLocalizedText('Verified Guest Reviews for', locale)} ${title}`}
              subtitle={getLocalizedText('Discover what recent travelers say about our personalized service, expert guides, and premium stays.', locale)}
            />
          </div>

        </div>
      </div>
    </>
  );
}
