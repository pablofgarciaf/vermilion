import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mountain, TreePine, Waves } from 'lucide-react';

import { DESTINATIONS, DESTINATION_UI } from '@/data/destinationsData';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getSeoAlternates, buildOpenGraph, fitMetaDescription, withBrandTail, SUPPORTED_SEO_LOCALES, BASE_CANONICAL_URL } from '@/utils/seoHelper';
import DestinationsHeroSection from '@/components/destinations/DestinationsHeroSection';

export const dynamicParams = false;

export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.map((locale) => ({ locale }));
}

const HEADINGS: Record<string, { title: string; subtitle: string }> = {
  es: {
    title: 'Nuestros Destinos',
    subtitle: 'Catorce lugares donde nuestra casa tiene ruta propia. Filtra por región o busca el que ya te llama.',
  },
  en: {
    title: 'Our Destinations',
    subtitle: 'Fourteen places our house has its own route to. Filter by region or search for the one calling you.',
  },
  fr: {
    title: 'Nos Destinations',
    subtitle: 'Quatorze lieux où notre maison a sa propre route. Filtrez par région ou cherchez celui qui vous appelle.',
  },
  de: {
    title: 'Unsere Reiseziele',
    subtitle: 'Vierzehn Orte, zu denen unser Haus einen eigenen Weg hat. Filtern Sie nach Region oder suchen Sie das Ziel, das Sie ruft.',
  },
  it: {
    title: 'Le Nostre Destinazioni',
    subtitle: 'Quattordici luoghi dove la nostra casa ha una rotta propria. Filtra per regione o cerca quella che ti chiama.',
  },
  pt: {
    title: 'Nossos Destinos',
    subtitle: 'Quatorze lugares onde nossa casa tem rota própria. Filtre por região ou busque aquele que já chama você.',
  },
  ja: {
    title: '目的地一覧',
    subtitle: '当社ならではのルートを持つ14の目的地。地域で絞り込むか、心惹かれる場所を検索してください。',
  },
  zh: {
    title: '我们的目的地',
    subtitle: '十四个我们拥有专属线路的目的地。按地区筛选，或搜索您心之所向的那一站。',
  },
};

/** Frase complementaria para que la meta description alcance el rango 120-155 caracteres. */
const META_EXTRA: Record<string, string> = {
  es: 'Explora Galápagos, la Amazonía y los Andes con expediciones privadas diseñadas por expertos locales.',
  en: 'Explore the Galapagos, the Amazon and the Andes with private expeditions designed by local experts.',
  fr: 'Explorez les Galápagos, l’Amazonie et les Andes avec des expéditions privées conçues par des experts locaux.',
  de: 'Entdecken Sie Galápagos, Amazonas und Anden mit privaten Expeditionen, gestaltet von lokalen Experten.',
  it: 'Esplora le Galápagos, l’Amazzonia e le Ande con spedizioni private ideate da esperti locali.',
  pt: 'Explore Galápagos, a Amazônia e os Andes com expedições privadas criadas por especialistas locais.',
  ja: 'ガラパゴス、アマゾン、アンデスを、現地の専門家が設計するプライベート探検でご案内します。専任デザイナーが24時間体制で旅程をご提案します。',
  zh: '由本地专家设计的私人探险，带您深入加拉帕戈斯、亚马逊与安第斯山脉，专属旅行设计师提供全天候 24/7 行程规划服务。',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const h = HEADINGS[locale] || HEADINGS.en;
  const title = `${h.title} | Vermilion Routes`;
  const description = withBrandTail(
    fitMetaDescription([h.subtitle, META_EXTRA[locale] || META_EXTRA.en]),
    locale,
  );
  return {
    title,
    description,
    alternates: getSeoAlternates('/destinations', locale),
    openGraph: buildOpenGraph({ locale, path: '/destinations', title, description }),
  };
}

export default async function DestinationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const h = HEADINGS[locale] || HEADINGS.en;

  // Preparo los datos que el filtro (componente cliente) va a consumir.
  const items = DESTINATIONS.map((d) => ({
    slug: d.slug,
    region: d.region,
    name: getLocalizedText(d.name, locale),
    tagline: getLocalizedText(d.tagline, locale),
    image: d.image,
    mobileImage: d.mobileImage || d.image,
  }));

  const regionLabels: Record<string, { es: string; en: string; fr: string; de: string; it: string; pt: string; ja: string; zh: string }> = {
    all: { es: 'Todos', en: 'All', fr: 'Tous', de: 'Alle', it: 'Tutti', pt: 'Todos', ja: 'すべて', zh: '全部' },
    galapagos: { es: 'Galápagos', en: 'Galápagos', fr: 'Galápagos', de: 'Galápagos', it: 'Galápagos', pt: 'Galápagos', ja: 'ガラパゴス', zh: '加拉帕戈斯' },
    andes: { es: 'Andes', en: 'Andes', fr: 'Andes', de: 'Anden', it: 'Ande', pt: 'Andes', ja: 'アンデス', zh: '安第斯' },
    amazonia: { es: 'Amazonía', en: 'Amazon', fr: 'Amazonie', de: 'Amazonas', it: 'Amazzonia', pt: 'Amazônia', ja: 'アマゾン', zh: '亚马逊' },
  };

  const t = (key: keyof typeof regionLabels) => (regionLabels[key] as any)[locale] || (regionLabels[key] as any).en;

  const labels = {
    all: t('all'),
    galapagos: t('galapagos'),
    andes: t('andes'),
    amazonia: t('amazonia'),
    search: locale === 'es' ? 'Buscar destino…' : locale === 'en' ? 'Search destination…' : locale === 'fr' ? 'Rechercher…' : locale === 'de' ? 'Suchen…' : locale === 'it' ? 'Cerca…' : locale === 'pt' ? 'Buscar…' : locale === 'ja' ? '検索…' : '搜索…',
    empty: locale === 'es' ? 'Ningún destino coincide con tu búsqueda.' : locale === 'en' ? 'No destination matches your search.' : locale === 'fr' ? 'Aucune destination ne correspond.' : locale === 'de' ? 'Kein Reiseziel gefunden.' : locale === 'it' ? 'Nessuna destinazione trovata.' : locale === 'pt' ? 'Nenhum destino encontrado.' : locale === 'ja' ? '該当なし。' : '未找到匹配目的地。',
  };

  return (
    <DestinationsHeroSection
      items={items}
      locale={locale}
      labels={labels}
      title={h.title}
      subtitle={h.subtitle}
      eyebrow={getLocalizedText(DESTINATION_UI.allDestinations as any, locale)}
    />
  );
}
