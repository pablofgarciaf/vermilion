import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CalendarDays, Check, Clock, Gauge, MapPin, Star, Waves } from 'lucide-react';
import { mockTours } from '@/data/mock';
import { GALAPAGOS_SEASONS_INFO } from '@/data/galapagosActivitiesData';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getSeoAlternates, SUPPORTED_SEO_LOCALES } from '@/utils/seoHelper';
import { GalapagosHubCtas } from '@/components/galapagos/GalapagosHubCtas';
import { GalapagosActivitiesExplorer } from '@/components/tours/GalapagosActivitiesExplorer';
import { PromoPriceTag } from '@/components/promotions/PromoPriceTag';
import { isPromoEligible } from '@/lib/promotions';
import type { Tour } from '@/types';

const BASE = 'https://www.vermilionroutes.com';
const HERO_IMAGE = '/images/tours/16-9/galapagos-lobo-marino-16-9.webp';
/** Las tres expediciones de solo Galápagos y los dos combinados con Ecuador continental. */
const GALAPAGOS_TOUR_IDS = ['galapagos-6days', 'galapagos-7days', 'galapagos-8days'];
const COMBO_TOUR_IDS = ['ecuador-galapagos-11days', 'ecuador-galapagos-12days'];

export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'galapagosHub' });
  const title = t('metaTitle');
  const description = t('metaDescription');
  return {
    title: { absolute: title },
    description,
    alternates: getSeoAlternates('/galapagos', locale),
    openGraph: {
      title,
      description,
      url: `${BASE}/${locale}/galapagos`,
      siteName: 'Vermilion Routes',
      type: 'website',
      images: [{ url: `${BASE}${HERO_IMAGE}`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE}${HERO_IMAGE}`] },
  };
}

const priceOf = (tour: Tour) => tour.price3Star || tour.price;

function TourFeature({ tour, locale, t, tPlan, reverse }: {
  tour: Tour; locale: string; t: (k: string) => string; tPlan: (k: string) => string; reverse: boolean;
}) {
  const title = getLocalizedText(tour.title, locale);
  const highlights = (tour.highlights || []).slice(0, 5).map((h) => getLocalizedText(h, locale));
  const image = tour.desktopImage || tour.imageUrl;
  return (
    <article className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800 p-4 sm:p-6 shadow-xl">
      <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${reverse ? 'lg:order-2' : ''}`}>
        <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          <Clock className="w-3.5 h-3.5" /> {getLocalizedText(tour.duration, locale)}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {tour.rating?.toFixed(1)} · Tripadvisor
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">{title}</h3>
        {highlights.length > 0 && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">{t('includes')}</p>
            <ul className="space-y-1.5">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" /> <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap items-end gap-x-6 gap-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{t('from')}</p>
            <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
              ${priceOf(tour).toLocaleString('en-US')} <span className="text-sm font-sans font-normal text-zinc-500">USD {t('perPerson')}</span>
            </p>
            <PromoPriceTag price={priceOf(tour)} eligible={isPromoEligible(tour)} tone="light" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <GalapagosHubCtas
            planLabel={t('planThis')}
            callLabel={t('ctaCall')}
            variant="card"
            placement="galapagos_hub_tour"
            detail={{ tourId: tour.id, tourTitle: title, destination: tour.id.startsWith('ecuador') ? 'combo' : 'galapagos' }}
          />
        </div>
        <Link href={`/${locale}/tours/${tour.id}`} className="inline-block text-sm font-bold text-emerald-700 dark:text-emerald-400 underline underline-offset-4">
          {t('viewTour')} →
        </Link>
      </div>
    </article>
  );
}

export default async function GalapagosHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'galapagosHub' });
  const tPlan = await getTranslations({ locale, namespace: 'planTrip' });
  const byId = (id: string) => mockTours.find((x) => x.id === id);
  const galTours = GALAPAGOS_TOUR_IDS.map(byId).filter(Boolean) as Tour[];
  const combos = COMBO_TOUR_IDS.map(byId).filter(Boolean) as Tour[];
  const minPrice = Math.min(...galTours.map(priceOf));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristDestination',
        '@id': `${BASE}/${locale}/galapagos#destination`,
        name: 'Galápagos Islands',
        description: t('metaDescription'),
        url: `${BASE}/${locale}/galapagos`,
        image: `${BASE}${HERO_IMAGE}`,
        geo: { '@type': 'GeoCoordinates', latitude: -0.9538, longitude: -90.9656 },
        containedInPlace: { '@type': 'Country', name: 'Ecuador' },
      },
      {
        '@type': 'ItemList',
        name: t('toursTitle'),
        itemListElement: [...galTours, ...combos].map((tour, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${BASE}/${locale}/tours/${tour.id}`,
          name: getLocalizedText(tour.title, locale),
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [1, 2, 3].map((n) => ({
          '@type': 'Question',
          name: t(`q${n}`),
          acceptedAnswer: { '@type': 'Answer', text: t(`a${n}`) },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Vermilion Routes', item: `${BASE}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t('navLabel'), item: `${BASE}/${locale}/galapagos` },
        ],
      },
    ],
  };

  const facts = [
    { icon: CalendarDays, label: t('factBestTime'), value: t('factBestTimeValue') },
    { icon: Clock, label: t('factLength'), value: t('factLengthValue') },
    { icon: Gauge, label: t('factLevel'), value: t('factLevelValue') },
    { icon: Star, label: t('factFrom'), value: `$${minPrice.toLocaleString('en-US')} USD` },
    { icon: Waves, label: t('factHighlight'), value: t('factHighlightValue') },
  ];
  const seasons = [GALAPAGOS_SEASONS_INFO.warm, GALAPAGOS_SEASONS_INFO.cool];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero propio de Galápagos */}
      <section className="relative min-h-[88svh] flex items-end overflow-hidden">
        <Image src={HERO_IMAGE} alt="Galápagos sea lion facing Kicker Rock (León Dormido)" fill priority sizes="100vw" className="object-cover object-[70%_center]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-40 space-y-5 text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C46A] backdrop-blur">
            <MapPin className="w-4 h-4" /> {t('eyebrow')}
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-[1.05] max-w-3xl [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">{t('h1')}</h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">{t('subtitle')}</p>
          <GalapagosHubCtas planLabel={tPlan('cta')} callLabel={t('ctaCall')} placement="galapagos_hub_hero" />
          <p className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-white/85">
            <span>★ {tPlan('trust1')}</span><span>⏱ {tPlan('trust2')}</span><span>✓ {tPlan('trust3')}</span>
          </p>
        </div>
      </section>

      {/* Respuesta directa (GEO) */}
      <aside aria-label="Quick Summary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-emerald-600/20 shadow-xl p-5 sm:p-7 space-y-5">
          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
            <strong className="text-emerald-700 dark:text-emerald-400">{t('answerLabel')}: </strong>{t('answerText')}
          </p>
          <dl className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 p-3">
                <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      {/* Las tres expediciones */}
      <section aria-labelledby="gal-tours" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <header className="max-w-3xl space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">{t('toursEyebrow')}</p>
          <h2 id="gal-tours" className="font-serif text-3xl sm:text-5xl font-bold">{t('toursTitle')}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{t('toursSubtitle')}</p>
        </header>
        <div className="space-y-8">
          {galTours.map((tour, i) => (
            <TourFeature key={tour.id} tour={tour} locale={locale} t={t} tPlan={tPlan} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Combinados con Ecuador continental */}
      {combos.length > 0 && (
        <section aria-labelledby="gal-combos" className="bg-[#0B1A17] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <header className="max-w-3xl space-y-2">
              <h2 id="gal-combos" className="font-serif text-3xl sm:text-4xl font-bold">{t('combosTitle')}</h2>
              <p className="text-emerald-100/80">{t('combosSubtitle')}</p>
            </header>
            <div className="grid md:grid-cols-2 gap-6">
              {combos.map((tour) => {
                const title = getLocalizedText(tour.title, locale);
                return (
                  <article key={tour.id} className="group overflow-hidden rounded-3xl bg-white/5 border border-white/10">
                    <div className="relative aspect-[16/10]">
                      <Image src={tour.desktopImage || tour.imageUrl} alt={title} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5 space-y-3">
                      <p className="text-xs font-bold text-[#E7C46A]">{getLocalizedText(tour.duration, locale)}</p>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold">{title}</h3>
                      <p className="text-sm text-white/80">
                        {t('from')} <span className="font-serif text-2xl font-bold text-white">${priceOf(tour).toLocaleString('en-US')}</span> USD {t('perPerson')}
                      </p>
                      <PromoPriceTag price={priceOf(tour)} eligible={isPromoEligible(tour)} />
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <GalapagosHubCtas planLabel={t('planThis')} callLabel={t('ctaCall')} placement="galapagos_hub_combo" detail={{ tourId: tour.id, tourTitle: title, destination: 'combo' }} />
                      </div>
                      <Link href={`/${locale}/tours/${tour.id}`} className="inline-block text-sm font-bold text-emerald-300 underline underline-offset-4">{t('viewTour')} →</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Actividades por isla */}
      <section aria-labelledby="gal-activities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <header className="max-w-3xl space-y-2">
          <h2 id="gal-activities" className="font-serif text-3xl sm:text-4xl font-bold">{t('activitiesTitle')}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{t('activitiesSubtitle')}</p>
        </header>
        <GalapagosActivitiesExplorer locale={locale} initialBaseTourId="none" showHeroBanner={false} />
      </section>

      {/* Cuándo ir */}
      <section aria-labelledby="gal-seasons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        <h2 id="gal-seasons" className="font-serif text-3xl sm:text-4xl font-bold">{t('seasonsTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {seasons.map((s) => (
            <article key={s.id} className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-2">
              <h3 className="font-serif text-xl font-bold">{getLocalizedText(s.name, locale)}</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{getLocalizedText(s.conditions, locale)}</p>
              <p className="text-sm text-emerald-800 dark:text-emerald-300">{getLocalizedText(s.wildlifeHighlights, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section aria-labelledby="gal-faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
        <h2 id="gal-faq" className="font-serif text-3xl sm:text-4xl font-bold">{t('faqTitle')}</h2>
        {[1, 2, 3].map((n) => (
          <details key={n} className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5" open={n === 1}>
            <summary className="cursor-pointer font-semibold text-zinc-900 dark:text-white">{t(`q${n}`)}</summary>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{t(`a${n}`)}</p>
          </details>
        ))}
      </section>

      {/* Cierre */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">{t('finalTitle')}</h2>
            <p className="text-emerald-50/90">{t('finalSubtitle')}</p>
          </div>
          <GalapagosHubCtas planLabel={tPlan('cta')} callLabel={t('ctaCall')} placement="galapagos_hub_final" />
        </div>
      </section>
    </div>
  );
}
