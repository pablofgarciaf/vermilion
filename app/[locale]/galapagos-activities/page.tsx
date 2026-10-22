import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSeoAlternates, SUPPORTED_SEO_LOCALES } from '@/utils/seoHelper';
import { GalapagosActivitiesExplorer } from '@/components/tours/GalapagosActivitiesExplorer';
import { GALAPAGOS_ACTIVITIES } from '@/data/galapagosActivitiesData';
import { ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ tour?: string }>;
}

const SEO_TITLES: Record<string, string> = {
  es: 'Actividades en Galápagos: Guía y Tours | Vermilion Routes',
  en: 'Galapagos Activities: Full Guide & Tours | Vermilion Routes',
  fr: 'Activités aux Galápagos: Guide Exclusif | Vermilion Routes',
  de: 'Galapagos Aktivitäten: Erlebnisse & Tours | Vermilion Routes',
  it: 'Attività alle Galapagos: Guida Completa | Vermilion Routes',
  pt: 'Atividades em Galápagos: Guia Completo | Vermilion Routes',
  ja: 'ガラパゴス諸島のアクティビティ＆遠征ツアー | Vermilion Routes',
  zh: '加拉帕戈斯群岛精选活动与定制探险指南 | Vermilion Routes',
};

const SEO_DESCRIPTIONS: Record<string, string> = {
  es: 'Descubra las mejores actividades en Galápagos: buceo con tiburones martillo, senderismo volcánico y snorkel con leones marinos. Tours a su medida 24/7.',
  en: 'Discover top Galapagos activities: hammerhead shark diving, volcanic trekking, and playful sea lion snorkeling. Bespoke naturalist itineraries 24/7.',
  fr: 'Découvrez les meilleures activités aux Galápagos : plongée avec requins marteaux, volcans et snorkeling avec otaries. Circuits sur mesure 24/7.',
  de: 'Erleben Sie die besten Galapagos Aktivitäten: Hammerhai-Tauchen, Vulkanwanderungen und Schnorcheln mit Seelöwen. Maßgeschneiderte Reisen 24/7.',
  it: 'Scopri le migliori attività alle Galapagos: immersioni con squali martello, trekking vulcanico e snorkeling con leoni marini. Tour su misura 24/7.',
  pt: 'Descubra as melhores atividades em Galápagos: mergulho com tubarões-martelo, trilhas vulcânicas e snorkel com leões-marinhos. Tours sob medida 24/7.',
  ja: 'ガラパゴス諸島のアクティビティを完全網羅。シュモクザメとのダイビング、活火山トレッキング、アシカと泳ぐスノーケリングを特注手配。24時間対応。',
  zh: '全方位探索加拉帕戈斯群岛精彩活动：双髻鲨深潜、活火山火山口徒步与海狮浮潜。由资深自然学家量身设计专属私享路线，全天候私人管家服务。',
};

const H1_TEXTS: Record<string, string> = {
  es: 'Actividades en Galápagos: Guía Exclusiva de Aventura',
  en: 'Galapagos Activities: Bespoke Nature Expeditions Guide',
  fr: 'Activités aux Galápagos: Guide Exclusif d\'Expédition',
  de: 'Galapagos Aktivitäten: Guide für Maßgeschneiderte Reisen',
  it: 'Attività alle Galapagos: Guida a Spedizioni su Misura',
  pt: 'Atividades em Galápagos: Guia de Expedições Exclusivas',
  ja: 'ガラパゴス諸島アクティビティ：特注ネイチャー探検ガイド',
  zh: '加拉帕戈斯群岛精彩活动：专属定制探险指南',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = SEO_TITLES[locale] || SEO_TITLES.en;
  const description = SEO_DESCRIPTIONS[locale] || SEO_DESCRIPTIONS.en;

  const fbLocale = {
    es: 'es_LA',
    en: 'en_US',
    fr: 'fr_FR',
    de: 'de_DE',
    it: 'it_IT',
    pt: 'pt_BR',
    ja: 'ja_JP',
    zh: 'zh_CN',
  }[locale] || 'en_US';

  return {
    title,
    description,
    alternates: getSeoAlternates('/galapagos-activities', locale),
    openGraph: {
      title,
      description,
      url: `https://www.vermilionroutes.com/${locale}/galapagos-activities`,
      siteName: 'Vermilion Routes',
      locale: fbLocale,
      type: 'website',
      images: [
        {
          url: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vermilionroutes',
      creator: '@vermilionroutes',
      title,
      description,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-lobo-marino-16-9.webp'],
    },
  };
}

export default async function GalapagosActivitiesPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const sParams = searchParams ? await searchParams : {};
  const initialTour = sParams?.tour || 'none';

  const h1 = H1_TEXTS[locale] || H1_TEXTS.en;

  // ── JSON-LD Schemas (CollectionPage + ItemList + FAQPage) ──────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://www.vermilionroutes.com/${locale}/galapagos-activities#webpage`,
        url: `https://www.vermilionroutes.com/${locale}/galapagos-activities`,
        name: SEO_TITLES[locale] || SEO_TITLES.en,
        description: SEO_DESCRIPTIONS[locale] || SEO_DESCRIPTIONS.en,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.vermilionroutes.com/#website',
          name: 'Vermilion Routes',
          url: 'https://www.vermilionroutes.com',
        },
        about: {
          '@type': 'Place',
          name: 'Galapagos Islands, Ecuador',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -0.9538,
            longitude: -90.9656,
          },
        },
      },
      {
        '@type': 'ItemList',
        '@id': `https://www.vermilionroutes.com/${locale}/galapagos-activities#itemlist`,
        name: h1,
        itemListElement: GALAPAGOS_ACTIVITIES.slice(0, 15).map((act, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'TouristAttraction',
            name: act.name[locale] || act.name.en || act.name.es,
            description: act.shortDescription[locale] || act.shortDescription.en || act.shortDescription.es,
            image: `https://www.vermilionroutes.com${act.imageUrl}`,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: -0.9538,
              longitude: -90.9656,
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `https://www.vermilionroutes.com/${locale}/galapagos-activities#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: locale === 'es' ? '¿Cuál es la mejor temporada para realizar actividades en Galápagos?' : 'What is the best season for activities in Galapagos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: locale === 'es'
                ? 'Galápagos ofrece fauna activa los 365 días del año. De diciembre a mayo las aguas son más cálidas (24-28°C) ideales para snorkel y anidación de tortugas marinas. De junio a noviembre la corriente de Humboldt atrae ballenas, tiburones ballena y albatros a Española.'
                : 'Galapagos is extraordinary year-round. December to May delivers warm waters (75-82°F) ideal for snorkeling and turtle nesting. June to November brings cooler, nutrient-packed Humboldt currents attracting whales, whale sharks, and nesting albatrosses.',
            },
          },
          {
            '@type': 'Question',
            name: locale === 'es' ? '¿Puedo personalizar o añadir actividades a mi tour base de Vermilion?' : 'Can I customize or add activities to my Vermilion base tour?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: locale === 'es'
                ? 'Sí. Todos nuestros itinerarios son 100% personalizables con asistencia de nuestros diseñadores de expedición en Ecuador (bilingües inglés-español) y representantes en EE.UU.'
                : 'Yes. All our expeditions are 100% customizable with our dedicated expedition designers in Ecuador (fully bilingual English-Spanish) and representatives in the United States.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 relative pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── GEO DIRECT ANSWER / KEY TAKEAWAYS (PRIMEROS 1000 CARACTERES) ────── */}
      <aside
        aria-label="Direct Answer Summary"
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl"
      >
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs text-zinc-700 dark:text-zinc-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
              ⚡ Key Takeaways:
            </span>
            <span>
              {locale === 'es'
                ? 'Catálogo integral de más de 30 actividades en Galápagos por isla y temporada. Excursiones cotizables a medida con guías naturalistas bilingües.'
                : 'Complete catalog of 30+ Galapagos experiences categorized by island and season. Bespoke add-ons with licensed bilingual naturalist guides.'}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
            Ecuador & USA Concierge 24/7
          </span>
        </div>
      </aside>

      {/* ── EDITORIAL LUXURY HERO ───────────────────────────────────────────── */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 max-w-7xl">
        <div className="space-y-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href={`/${locale}`} className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/${locale}/tours`} className="hover:text-emerald-600 transition-colors">
              {locale === 'es' ? 'Tours' : 'Expeditions'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              Galápagos Activities
            </span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-zinc-900 dark:text-white tracking-tight leading-tight">
            {h1}
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
            {SEO_DESCRIPTIONS[locale] || SEO_DESCRIPTIONS.en}
          </p>
        </div>
      </header>

      {/* ── INTERACTIVE EXPLORER MODULE ─────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <GalapagosActivitiesExplorer
          locale={locale}
          initialBaseTourId={initialTour}
          showHeroBanner={false}
        />
      </main>
    </div>
  );
}
