import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Mountain, Award, CalendarDays, Leaf, Info, ArrowRight, Sparkles } from 'lucide-react';

import { DESTINATIONS, DESTINATION_UI, INSIDER_TIPS, Destination } from '@/data/destinationsData';
import { mockTours } from '@/data/mock';
import { TourCarousel } from '@/components/home/TourCarousel';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getSeoAlternates, BASE_CANONICAL_URL, SUPPORTED_SEO_LOCALES } from '@/utils/seoHelper';

export const dynamicParams = false;

export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.flatMap((locale) =>
    DESTINATIONS.map((d) => ({ locale, slug: d.slug }))
  );
}

function findDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

/**
 * Tours que visitan este lugar, ordenados por lo protagonista que es el destino
 * dentro del viaje. Un tour que lo lleva en el titulo pesa mas que uno que solo
 * lo menciona de paso en un dia del itinerario. Se muestran los seis mejores.
 */
function toursForDestination(dest: Destination) {
  const claves = dest.tourKeywords.map((k) => k.toLowerCase());

  const puntuados = mockTours
    .map((tour) => {
      const titulo = [
        getLocalizedText(tour.title, 'es'),
        getLocalizedText(tour.title, 'en'),
        tour.id,
      ]
        .join(' ')
        .toLowerCase();
      const destino = (typeof tour.destination === 'string' ? tour.destination : '').toLowerCase();
      const itinerario = (tour.itinerary || [])
        .flatMap((d) => [
          getLocalizedText(d.title, 'es'),
          getLocalizedText(d.title, 'en'),
          getLocalizedText(d.description, 'es'),
        ])
        .concat((tour.highlights || []).map((h) => getLocalizedText(h, 'es')))
        .join(' ')
        .toLowerCase();

      let score = 0;
      for (const k of claves) {
        if (titulo.includes(k)) score += 10;
        else if (destino.includes(k)) score += 4;
        else if (itinerario.includes(k)) score += 1;
      }
      return { tour, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.tour.durationDays ?? 0) - (b.tour.durationDays ?? 0));

  return puntuados.slice(0, 6).map((x) => x.tour);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dest = findDestination(slug);
  if (!dest) return {};

  const name = getLocalizedText(dest.name, locale);
  const tagline = getLocalizedText(dest.tagline, locale);
  const title = `${name} | Vermilion Routes`;
  const description = tagline.length > 155 ? `${tagline.slice(0, 152)}...` : tagline;

  return {
    title,
    description,
    alternates: getSeoAlternates(`/destinos/${slug}`, locale),
    openGraph: {
      title,
      description,
      images: [{ url: `${BASE_CANONICAL_URL}${dest.image}`, width: 1200, height: 630, alt: name }],
      type: 'article',
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dest = findDestination(slug);
  if (!dest) notFound();

  const t = (field: Record<string, string> | undefined) => getLocalizedText(field as any, locale);
  const ui = (key: keyof typeof DESTINATION_UI) => getLocalizedText(DESTINATION_UI[key] as any, locale);

  const name = t(dest.name as any);
  const tours = toursForDestination(dest);
  const insider = INSIDER_TIPS[dest.slug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description: t(dest.intro as any),
    image: `${BASE_CANONICAL_URL}${dest.image}`,
    url: `${BASE_CANONICAL_URL}/${locale}/destinos/${dest.slug}`,
    address: { '@type': 'PostalAddress', addressCountry: 'EC' },
    ...(tours.length > 0 && {
      hasPart: tours.slice(0, 6).map((tour) => ({
        '@type': 'TouristTrip',
        name: getLocalizedText(tour.title, locale),
        url: `${BASE_CANONICAL_URL}/${locale}/tours/${tour.id}`,
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* PORTADA */}
      <section className="relative h-[70vh] min-h-[460px] w-full">
        <Image
          src={dest.image}
          alt={name}
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="object-cover hidden md:block"
        />
        <Image
          src={dest.mobileImage || dest.image}
          alt={name}
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

        <div className="absolute inset-x-0 bottom-0 max-w-5xl mx-auto px-6 pb-12">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 hover:text-emerald-200 transition-colors mb-4"
          >
            <MapPin className="w-3.5 h-3.5" />
            {ui('allDestinations')}
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            {name}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-100 max-w-3xl">{t(dest.tagline as any)}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-14">
        {/* INTRODUCCION */}
        <section>
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t(dest.intro as any)}
          </p>
        </section>

        {/* QUE VAS A VER */}
        <section>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
            {ui('highlights')}
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {dest.highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
              >
                <Mountain className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-3" />
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  {t(h.title as any)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(h.text as any)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAUNA Y FLORA */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-6">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-zinc-900 dark:text-white mb-3">
            <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {ui('wildlife')}
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{t(dest.wildlife as any)}</p>
        </section>

        {/* CONSEJO DE PRIMERA MANO */}
        {insider && (
          <section className="rounded-2xl border border-amber-300/70 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-950/25 p-6">
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">
              <Sparkles className="w-5 h-5" />
              {locale === 'es' ? 'Nuestra experiencia allí' : 'From our own visits'}
            </h2>
            <p className="text-amber-950/90 dark:text-amber-100/90 leading-relaxed">
              {getLocalizedText(insider, locale)}
            </p>
          </section>
        )}

        {/* LO QUE DEBES SABER */}
        <section className="rounded-2xl border-l-4 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/25 p-6">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-3">
            <Info className="w-5 h-5" />
            {ui('tip')}
          </h2>
          <p className="text-emerald-950/90 dark:text-emerald-100/90 leading-relaxed">
            {t(dest.tip as any)}
          </p>
        </section>

        {/* EXPEDICIONES QUE LLEVAN AQUI */}
        <section>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
            {ui('toursTitle')}
          </h2>

          {tours.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center">
              <p className="text-zinc-600 dark:text-zinc-400 mb-5">{ui('toursEmpty')}</p>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
              >
                {ui('planTrip')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="-mx-6">
              <TourCarousel tours={tours} showFilters={false} />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
