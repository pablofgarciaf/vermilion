import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToursFromFirestore, getTourByIdFromFirestore } from '@/lib/tours';
import { TourGallery } from '@/components/tours/TourGallery';
import { TourItinerary } from '@/components/tours/TourItinerary';
import { BookingSidebar } from '@/components/tours/BookingSidebar';
import { TourSubNav } from '@/components/tours/TourSubNav';
import { LuxuryThemeProvider } from '@/components/providers/LuxuryThemeProvider';
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
  HelpCircle,
  MessageCircle
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

// Allow dynamic params so new tours can be loaded, and revalidate every 60 seconds
// to fetch fresh prices from Firestore.
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
  } else if (resolvedParams.locale === 'ja' || resolvedParams.locale === 'zh') {
    if (description.length < 70) {
      const cta = resolvedParams.locale === 'ja'
        ? ' 専任ナチュラリストガイドと24時間VIPコンシェルジュがご案内。'
        : ' 配备官方认证私人自然向导与24/7全天候VIP专属管家服务。';
      description = (description + cta).slice(0, 95);
    }
  } else if (description.length < 120) {
    const ctas: Record<string, string> = {
      es: ' Reserve su expedición a medida con guías expertos y atención personalizada 24/7.',
      en: ' Book your bespoke nature journey with expert naturalist guides and 24/7 support.',
      fr: ' Réservez votre expédition sur mesure avec guides experts et conciergerie 24/7.',
      de: ' Buchen Sie Ihre Reise mit erstklassigen Natur-Guides und 24/7-Betreuung.',
      it: ' Prenota la tua spedizione su misura con guide naturalistiche e supporto 24/7.',
      pt: ' Reserve sua expedição sob medida com guias especialistas e suporte 24/7.',
    };
    description = (description + (ctas[resolvedParams.locale] || ctas['en'])).slice(0, 154);
  }

  const dest = getLocalizedText(tour.destination, resolvedParams.locale);
  const alternates = getSeoAlternates(`/tours/${tour.id}`, resolvedParams.locale);
  const rawImg = tour.mainImage || tour.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg';
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

const OVERVIEW_PREFIX: Record<string, string> = {
  es: 'Resumen:',
  en: 'Overview:',
  fr: 'Aperçu:',
  de: 'Überblick:',
  it: 'Panoramica:',
  pt: 'Visão Geral:',
  ja: '概要:',
  zh: '行程概览:',
};

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

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
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

  // Gallery array preparation
  const galleryImages = tour.gallery && tour.gallery.length > 0
    ? tour.gallery
    : [tour.imageUrl];

  // Schema.org TouristTrip & Product JSON-LD
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
    <LuxuryThemeProvider>
      <TourSubNav title={title} duration={duration} tour={tour} locale={locale} />
      <div className="pt-36 sm:pt-40 pb-16 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Main Content Col */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Semantic H1 for SEO & SSR */}
          <div className="space-y-3 pb-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{duration}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{tour.rating}</span>
                {tour.reviewsCount && (
                  <span className="text-zinc-500 font-normal">
                    ({tour.reviewsCount} {locale === 'es' ? 'opiniones verificadas' : 'verified reviews'})
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Photo Gallery */}
          <TourGallery images={galleryImages} title={title} tourId={tour.id} destination={tour.destination} />

          {/* Tour Overview with Category Badges */}
          {tour.description && (
            <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
              {/* Badges moved elegantly to overview */}
              <div className="flex flex-wrap items-center gap-2 pb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{dest}</span>
                </span>

                {category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {category}
                  </span>
                )}

                {tour.isPopular && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>{getLocalizedText('Best Seller', locale)}</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{getLocalizedText('Certified Private Guide', locale)}</span>
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">
                {(OVERVIEW_PREFIX[locale] || 'Overview:') + ' ' + shortTourName}
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-emerald-800 dark:first-letter:text-emerald-400 first-letter:leading-none">
                {getLocalizedText(tour.description, locale)}
              </p>
            </div>
          )}

          {/* Expedition Technical Sheet ("At a Glance") */}
          <ExpeditionFacts 
            tourId={tour.id} 
            destination={tour.destination} 
            duration={tour.duration} 
          />

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="bg-emerald-950/5 dark:bg-emerald-950/20 p-6 sm:p-8 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/40 space-y-4">
              <h2 className="font-serif font-bold text-xl text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{(HIGHLIGHTS_PREFIX[locale] || 'Highlights:') + ' ' + shortTourName}</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-900 dark:text-emerald-200">
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

          {/* Day by Day Itinerary Accordion */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <TourItinerary itinerary={tour.itinerary} tourTitle={shortTourName} />
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="bg-white dark:bg-zinc-900/90 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-emerald-900 dark:text-emerald-400 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>{locale === 'es' ? '¿Qué está Incluido?' : 'What is Included?'}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{getLocalizedText(inc, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="bg-white dark:bg-zinc-900/90 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                  <X className="w-5 h-5 text-rose-500" />
                  <span>{locale === 'es' ? '¿Qué NO está Incluido?' : 'What is NOT Included?'}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
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
        </div>

        {/* Right Sticky Sidebar Col */}
        <div className="lg:col-span-4 lg:sticky lg:top-[188px] lg:self-start space-y-6 z-10 relative">
          <BookingSidebar tour={tour} />
        </div>
      </div>

      {/* Verified Guest Reviews */}
      <div className="pt-10 border-t border-zinc-200/80 dark:border-zinc-800">
        <TripAdvisorReviews
          title={`Verified Guest Reviews for ${title}`}
          subtitle="Discover what recent travelers say about our personalized service, expert guides, and luxury stays."
        />
      </div>
      </div>
      </div>
    </LuxuryThemeProvider>
  );
}


