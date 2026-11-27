import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mountain, TreePine, Waves } from 'lucide-react';

import { DESTINATIONS } from '@/data/destinationsData';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getSeoAlternates, buildOpenGraph, fitMetaDescription, withBrandTail, SUPPORTED_SEO_LOCALES, BASE_CANONICAL_URL } from '@/utils/seoHelper';
import DestinationsHeroSection from '@/components/destinations/DestinationsHeroSection';

export const dynamicParams = false;

export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.map((locale) => ({ locale }));
}

const HEADINGS: Record<string, { title: string; subtitle: string }> = {
  es: {
    title: 'Ecuador y Galápagos: cuatro mundos por descubrir',
    subtitle: 'Explora Galápagos, los Andes, la Amazonía y la costa del Pacífico con rutas privadas diseñadas a tu ritmo.',
  },
  en: {
    title: 'Ecuador and Galapagos: four worlds to discover',
    subtitle: 'Explore the Galapagos, Andes, Amazon and Pacific coast through private routes designed around your pace.',
  },
  fr: {
    title: 'Équateur et Galápagos : quatre mondes à découvrir',
    subtitle: 'Explorez les Galápagos, les Andes, l’Amazonie et la côte Pacifique avec des itinéraires privés à votre rythme.',
  },
  de: {
    title: 'Ecuador und Galápagos: vier Welten entdecken',
    subtitle: 'Entdecken Sie Galápagos, Anden, Amazonas und Pazifikküste auf privaten Routen in Ihrem eigenen Tempo.',
  },
  it: {
    title: 'Ecuador e Galápagos: quattro mondi da scoprire',
    subtitle: 'Esplora Galápagos, Ande, Amazzonia e costa del Pacifico con itinerari privati al tuo ritmo.',
  },
  pt: {
    title: 'Equador e Galápagos: quatro mundos para descobrir',
    subtitle: 'Explore Galápagos, Andes, Amazônia e costa do Pacífico em rotas privadas no seu ritmo.',
  },
  ja: {
    title: 'エクアドルとガラパゴス、四つの世界を発見',
    subtitle: 'ガラパゴス、アンデス、アマゾン、太平洋岸を自分のペースで巡るプライベートルート。',
  },
  zh: {
    title: '厄瓜多尔与加拉帕戈斯：探索四个世界',
    subtitle: '以适合自己的节奏，探索加拉帕戈斯、安第斯、亚马逊与太平洋海岸的私人路线。',
  },
};

const EYEBROWS: Record<string, string> = {
  es: 'Elige tu próxima ruta',
  en: 'Choose your next route',
  fr: 'Choisissez votre prochaine route',
  de: 'Wählen Sie Ihre nächste Route',
  it: 'Scegli il tuo prossimo itinerario',
  pt: 'Escolha sua próxima rota',
  ja: '次の旅先を選ぶ',
  zh: '选择你的下一条路线',
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
      eyebrow={EYEBROWS[locale] || EYEBROWS.en}
    />
  );
}
