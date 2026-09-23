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

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

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
    offers: {
      '@type': 'Offer',
      price: Number((tour.priceFromUSD || tour.price || 1000).toString().replace(/[^0-9.]/g, '')),
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <TourSubNav title={title} duration={duration} tour={tour} locale={locale} />
      <ReservationBannerWrapper tourId={tour.id} locale={locale} />

      {/* Padding superior MUCHO más amplio (pt-32 / pt-40) para separar del Navbar */}
      <div className="relative bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-32 sm:pt-40 lg:pt-36">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
        />

        {/* CONTENEDOR SUPERIOR (HERO) */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">

            {/* COLUMNA IZQUIERDA (FLEX COLUMN CON H-FULL) */}
            <div className="lg:col-span-6 flex flex-col h-full">

              {/* Contenido Superior (Título más grande y Descripción) */}
              <div className="space-y-6">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
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
                        ({tour.reviewsCount} {getLocalizedText('opiniones verificadas', locale)})
                      </span>
                    )}
                  </span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full text-[11px]">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 animate-pulse" />
                    <span>{EXPRESS_DEPARTURE_PILL[locale] || EXPRESS_DEPARTURE_PILL.en}</span>
                  </span>
                </div>

                {isDailyTour && (
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">USD</span>
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-600 dark:text-amber-400">
                      ${priceClub.toLocaleString('en-US')}
                    </span>
                  </div>
                )}

                {tour.description && (
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {getLocalizedText(tour.description, locale)}
                  </p>
                )}
              </div>

              {/* Contenedor de Botones (Empujado al final con mt-auto, ahora estilizados y limpios) */}
              <div className="mt-auto pt-10 lg:pt-14 pb-2">
                {isDailyTour ? (
                  <Link
                    href={`/${locale}/booking?addTour=${tour.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-400/70 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] px-5 py-3 text-sm font-bold text-zinc-950 shadow-sm shadow-amber-500/20 transition-all hover:brightness-105 group"
                  >
                    {DAILY_TOUR_CTA[locale] || DAILY_TOUR_CTA.en}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Botón Club Estilizado */}
                    <Link
                      href={`/${locale}/booking?addTour=${tour.id}&tier=club`}
                      className="relative flex items-center justify-between rounded-xl border-2 border-emerald-600/70 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 p-4 shadow-sm transition-all hover:brightness-110 hover:shadow-emerald-900/40 group"
                    >
                      <div className="flex flex-col text-left gap-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-100/90">
                          <Hotel className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Vermilion Club (3★)</span>
                        </div>
                        <p className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                          ${priceClub.toLocaleString('en-US')} <span className="text-[10px] font-normal text-emerald-200">USD</span>
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-emerald-300 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* Botón VIP Estilizado */}
                    <Link
                      href={`/${locale}/booking?addTour=${tour.id}&tier=vip`}
                      className="relative flex items-center justify-between rounded-xl border border-amber-400/65 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] p-4 shadow-sm transition-all hover:brightness-105 hover:shadow-amber-500/30 group"
                    >
                      <div className="flex flex-col text-left gap-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800/90">
                          <Sparkles className="w-3.5 h-3.5 text-zinc-900 fill-zinc-900" />
                          <span>Vermilion VIP (4★)</span>
                        </div>
                        <p className="text-base sm:text-lg font-extrabold text-zinc-950 tracking-tight">
                          ${priceVip.toLocaleString('en-US')} <span className="text-[10px] font-bold text-zinc-800">USD</span>
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-zinc-950 transition-transform group-hover:translate-x-1" />
                    </Link>

                  </div>
                )}
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="lg:col-span-6 flex flex-col h-full">
              <TourGallery
                images={galleryImages}
                title={title}
                tourId={tour.id}
                destination={tour.destination}
                emphasizeFirst={/galapagos/i.test(dest || '')}
              >
                <DownloadPDFButton
                  tour={tour}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                />
              </TourGallery>
            </div>

          </div>
        </div>

        {/* ── RESTO DEL CONTENIDO A ANCHO COMPLETO (MAX-W-7XL) ── */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <ExpeditionFacts tourId={tour.id} destination={tour.destination} duration={tour.duration} />
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
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</div>
                      <span className="font-medium">{getLocalizedText(item, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {tour.itinerary && tour.itinerary.length > 0 && (
            <TourItinerary itinerary={tour.itinerary} tourTitle={shortTourName} />
          )}

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

          <div className="pt-10 border-t border-zinc-200/80 dark:border-zinc-800">
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