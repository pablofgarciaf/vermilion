import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockTours } from '@/data/mock';
import { dailyTours } from '@/data/dailyToursData';
import { ToursBackgroundSlider } from '@/components/tours/ToursBackgroundSlider';
import { StatsSection } from '@/components/home/StatsSection';
import { TourCarousel } from '@/components/home/TourCarousel';
import { getLocalizedText } from '@/utils/i18nHelper';
import {
  Compass,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { BookingActionLink } from '@/components/tours/BookingActionLink';

import type { Metadata } from 'next';
import { getSeoAlternates, SUPPORTED_SEO_LOCALES } from '@/utils/seoHelper';

export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Vermilion Routes | Catálogo de Expediciones a Medida',
    en: 'Vermilion Routes | Bespoke Nature Expeditions Catalog',
    fr: 'Vermilion Routes | Circuits sur Mesure en Équateur 24/7',
    de: 'Vermilion Routes | Naturreisen nach Ecuador & Galápagos',
    it: 'Vermilion Routes | Viaggi su Misura in Ecuador e Andes',
    pt: 'Vermilion Routes | Expedições sob Medida no Equador 24/7',
    ja: 'Vermilion Routes | ガラパゴス＆エクアドル自然遠征ツアー',
    zh: 'Vermilion Routes | 厄瓜多尔与加拉帕戈斯群岛自然探险',
  };
  const descriptions: Record<string, string> = {
    es: 'Explore nuestro catálogo exclusivo de viajes a medida a Galápagos, la Amazonía y los Andes. Itinerarios privados con confort y atención 24/7.',
    en: 'Explore our curated catalog of nature expeditions to Galapagos, the Amazon and Andes. Bespoke private itineraries with dedicated 24/7 concierge.',
    fr: 'Découvrez notre catalogue d’expéditions sur mesure aux Galápagos, en Amazonie et dans les Andes. Itinéraires privés avec conciergerie 24/7.',
    de: 'Entdecken Sie unseren Katalog für Naturexpeditionen nach Galápagos, ins Amazonasgebiet und in die Anden. 24/7 Concierge-Service und Komfort.',
    it: 'Esplora il catalogo di viaggi su misura alle Galápagos, in Amazzonia e nelle Ande. Itinerari privati personalizzati con concierge dedicato 24/7.',
    pt: 'Explore nosso catálogo exclusivo de expedições para Galápagos, Amazônia e Andes. Roteiros privativos sob medida com conforto e concierge 24/7.',
    ja: 'ガラパゴス諸島、アマゾン熱帯雨林、アンデス山脈を巡る厳選自然遠征ツアー。専任コンシェルジュデスクが24時間年中無休でご案内いたします。',
    zh: '探索我们精选的厄瓜多尔、加拉帕戈斯、亚马逊与安第斯山脉自然探险行程。量身定制私人路线，配备专属24/7全天候私人旅行管家。',
  };

  const title = titles[locale] || titles['en'];
  const description = descriptions[locale] || descriptions['en'];
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
    alternates: getSeoAlternates('/tours', locale),
    openGraph: {
      title,
      description,
      url: `https://www.vermilionroutes.com/${locale}/tours`,
      siteName: 'Vermilion Routes',
      locale: fbLocale,
      type: 'website',
      images: [
        {
          url: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
          secureUrl: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: 'Vermilion Routes Curated Nature Expeditions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vermilionroutes',
      creator: '@vermilionroutes',
      title,
      description,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp'],
    },
  };
}

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const toursI18n: Record<string, {
    schemaName: string;
    schemaDesc: string;
    heroBadge: string;
    heroTitleP1: string;
    heroTitleP2: string;
    heroDesc: string;
    anchorGala: string;
    anchorCont: string;
    anchorComb: string;
    anchorDaily: string;
    s1Badge: string;
    s1Title: string;
    s1Desc: string;
    s2Badge: string;
    s2Title: string;
    s2Desc: string;
    s3Badge: string;
    s3Title: string;
    s3Desc: string;
    s4Badge: string;
    s4Title: string;
    s4Desc: string;
    viewItinerary: string;
    viewFullItinerary: string;
    details: string;
    book: string;
    bookExpedition: string;
    combinedTag: string;
    from: string;
  }> = {
    es: {
      schemaName: 'Catálogo de Expediciones a Medida',
      schemaDesc: 'Catálogo de tours y expediciones boutique en Galápagos y Ecuador continental.',
      heroBadge: 'Catálogo de Expediciones Exclusivas',
      heroTitleP1: 'Colección de ',
      heroTitleP2: 'Viajes Boutique',
      heroDesc: 'Itinerarios de autor diseñados a medida por guías naturalistas en Ecuador y Galápagos. Descubre tu próxima aventura inolvidable.',
      anchorGala: '🐢 Islas Galápagos (3)',
      anchorCont: '🏔️ Ecuador Continental (4)',
      anchorComb: '✨ Viajes Combinados (2)',
      anchorDaily: '☀️ Excursiones Full Day',
      s1Badge: 'Archipiélago Encantado',
      s1Title: 'Expediciones en Galápagos',
      s1Desc: 'Hoteles boutique frente al mar, navegación entre islas deshabitadas y encuentros con fauna única en el planeta.',
      s2Badge: 'Andes & Amazonía',
      s2Title: 'Ecuador Continental',
      s2Desc: 'Avenida de los Volcanes, lagunas de cráter, haciendas coloniales y la exuberante selva del Amazonas.',
      s3Badge: 'La Experiencia Definitiva',
      s3Title: 'Viajes Combinados',
      s3Desc: 'Lo mejor de dos mundos en un solo viaje: la majestuosidad de los Andes y la magia de las Islas Galápagos.',
      s4Badge: 'Salidas Diarias',
      s4Title: 'Excursiones Full Day',
      s4Desc: 'Escapadas de un día desde Quito a los destinos más icónicos del Ecuador.',
      viewItinerary: 'Ver Itinerario',
      viewFullItinerary: 'Ver Itinerario Completo',
      details: 'Detalles',
      book: 'Reservar',
      bookExpedition: 'Reservar Expedición',
      combinedTag: 'Andes + Galápagos VIP',
      from: 'Desde',
    },
    en: {
      schemaName: 'Curated Nature Expeditions Catalog',
      schemaDesc: 'Portfolio of bespoke nature and comfort tours across Galapagos and mainland Ecuador.',
      heroBadge: 'Exclusive Expedition Catalog',
      heroTitleP1: 'Bespoke ',
      heroTitleP2: 'Expeditions',
      heroDesc: 'Bespoke naturalist-crafted journeys across Ecuador and the Galápagos Archipelago. Discover your next unforgettable journey.',
      anchorGala: '🐢 Galapagos Islands (3)',
      anchorCont: '🏔️ Mainland Ecuador (4)',
      anchorComb: '✨ Combined Journeys (2)',
      anchorDaily: '☀️ Full-Day Tours',
      s1Badge: 'Enchanted Archipelago',
      s1Title: 'Galapagos Expeditions',
      s1Desc: 'Boutique oceanfront stays, uninhabited island yacht hops, and intimate wildlife encounters.',
      s2Badge: 'Andes & Amazon',
      s2Title: 'Mainland Ecuador',
      s2Desc: 'Avenue of Volcanoes, crater lakes, colonial haciendas, and dense Amazon rainforest.',
      s3Badge: 'The Ultimate Experience',
      s3Title: 'Combined Journeys',
      s3Desc: 'The best of both worlds in a single seamless itinerary: the Andean highlands and the Galápagos Islands.',
      s4Badge: 'Daily Departures',
      s4Title: 'Full-Day Excursions',
      s4Desc: 'One-day getaways departing from Quito to Ecuador\'s most iconic landscapes.',
      viewItinerary: 'View Itinerary',
      viewFullItinerary: 'Full Itinerary',
      details: 'Details',
      book: 'Book Now',
      bookExpedition: 'Book Expedition',
      combinedTag: 'Andes + Galapagos VIP',
      from: 'From',
    },
    fr: {
      schemaName: 'Catalogue d’Expéditions d’Exception',
      schemaDesc: 'Collection de circuits privés et d’expéditions de luxe aux Galápagos et en Équateur continental.',
      heroBadge: 'Catalogue d’Expéditions Exclusives',
      heroTitleP1: 'Collection de ',
      heroTitleP2: 'Voyages d’Exception',
      heroDesc: 'Itinéraires exclusifs conçus sur mesure par nos guides naturalistes en Équateur et aux îles Galápagos.',
      anchorGala: '🐢 Îles Galápagos (3)',
      anchorCont: '🏔️ Équateur Continental (4)',
      anchorComb: '✨ Voyages Combinés (2)',
      anchorDaily: '☀️ Excursions d’une Journée',
      s1Badge: 'Archipel Enchanté',
      s1Title: 'Expéditions aux Galápagos',
      s1Desc: 'Hôtels de charme en front de mer, navigation vers des îles inhabitées et faune endémique fascinante.',
      s2Badge: 'Andes & Amazonie',
      s2Title: 'Équateur Continental',
      s2Desc: 'Allée des Volcans, lacs de cratère, haciendas historiques et forêt amazonienne sauvage.',
      s3Badge: 'L’Expérience Ultime',
      s3Title: 'Voyages Combinés',
      s3Desc: 'Le meilleur des deux mondes en un voyage fluide : la splendeur des Andes et la magie des îles Galápagos.',
      s4Badge: 'Départs Quotidiens',
      s4Title: 'Excursions d’une Journée',
      s4Desc: 'Escapades immersives d’un jour au départ de Quito vers les plus beaux sites d’Équateur.',
      viewItinerary: 'Voir l’itinéraire',
      viewFullItinerary: 'Itinéraire complet',
      details: 'Détails',
      book: 'Réserver',
      bookExpedition: 'Réserver l’expédition',
      combinedTag: 'Andes + Galápagos VIP',
      from: 'À partir de',
    },
    de: {
      schemaName: 'Katalog für Luxusexpeditionen',
      schemaDesc: 'Ausgewählte Boutique-Reisen und Luxusexpeditionen auf Galápagos und im Festland-Ecuador.',
      heroBadge: 'Exklusiver Expeditionskatalog',
      heroTitleP1: 'Kollektion ',
      heroTitleP2: 'Maßgeschneiderter Reisen',
      heroDesc: 'Von Naturführern individuell gestaltete Reiserouten in Ecuador und auf den Galápagos-Inseln.',
      anchorGala: '🐢 Galápagos-Inseln (3)',
      anchorCont: '🏔️ Festland-Ecuador (4)',
      anchorComb: '✨ Kombinationsreisen (2)',
      anchorDaily: '☀️ Tagestouren',
      s1Badge: 'Verzauberter Archipel',
      s1Title: 'Galápagos-Expeditionen',
      s1Desc: 'Boutique-Hotels am Meer, Yachtausflüge zu unbewohnten Inseln und hautnahe Tierbegegnungen.',
      s2Badge: 'Anden & Amazonas',
      s2Title: 'Festland-Ecuador',
      s2Desc: 'Straße der Vulkane, Kraterseen, Kolonial-Haciendas und der dichte Amazonas-Regenwald.',
      s3Badge: 'Das Ultimative Erlebnis',
      s3Title: 'Kombinationsreisen',
      s3Desc: 'Das Beste aus zwei Welten in einer Reise: Das majestätische Andenhochland und die Magie von Galápagos.',
      s4Badge: 'Tägliche Abfahrten',
      s4Title: 'Ganztagesausflüge',
      s4Desc: 'Eintägige Ausflüge ab Quito zu Ecuadors spektakulärsten Natur- und Kulturzielen.',
      viewItinerary: 'Reiseroute ansehen',
      viewFullItinerary: 'Gesamte Reiseroute',
      details: 'Details',
      book: 'Buchen',
      bookExpedition: 'Expedition buchen',
      combinedTag: 'Anden + Galápagos VIP',
      from: 'Ab',
    },
    it: {
      schemaName: 'Catalogo di Spedizioni di Lusso',
      schemaDesc: 'Collezione di tour privati ed esclusive spedizioni alle Galápagos e in Ecuador continentale.',
      heroBadge: 'Catalogo Spedizioni Esclusive',
      heroTitleP1: 'Collezione di ',
      heroTitleP2: 'Viaggi Boutique',
      heroDesc: 'Itinerari d’autore disegnati su misura da guide naturaliste in Ecuador e nelle Isole Galápagos.',
      anchorGala: '🐢 Isole Galápagos (3)',
      anchorCont: '🏔️ Ecuador Continentale (4)',
      anchorComb: '✨ Viaggi Combinati (2)',
      anchorDaily: '☀️ Escursioni Giornaliere',
      s1Badge: 'Arcipelago Incantato',
      s1Title: 'Spedizioni alle Galápagos',
      s1Desc: 'Hotel boutique sul mare, navigazione verso isole disabitate e incontri ravvicinati con specie uniche.',
      s2Badge: 'Ande & Amazzonia',
      s2Title: 'Ecuador Continentale',
      s2Desc: 'Viale dei Vulcani, lagune nei crateri, antiche haciendas coloniali e la foresta amazzonica.',
      s3Badge: 'L’Esperienza Definitiva',
      s3Title: 'Viaggi Combinati',
      s3Desc: 'Il meglio di due mondi in un unico viaggio: la maestosità delle Ande e l’incanto delle Galápagos.',
      s4Badge: 'Partenze Giornaliere',
      s4Title: 'Escursioni di una Giornata',
      s4Desc: 'Gite di un giorno con partenza da Quito verso i paesaggi più suggestivi dell’Ecuador.',
      viewItinerary: 'Vedi itinerario',
      viewFullItinerary: 'Itinerario completo',
      details: 'Dettagli',
      book: 'Prenota',
      bookExpedition: 'Prenota Spedizione',
      combinedTag: 'Ande + Galápagos VIP',
      from: 'Da',
    },
    pt: {
      schemaName: 'Catálogo de Expedições de Luxo',
      schemaDesc: 'Catálogo de roteiros exclusivos e expedições boutique em Galápagos e no Equador continental.',
      heroBadge: 'Catálogo de Expedições Exclusivas',
      heroTitleP1: 'Coleção de ',
      heroTitleP2: 'Viagens Boutique',
      heroDesc: 'Roteiros autorais desenhados sob medida por guias naturalistas no Equador e em Galápagos.',
      anchorGala: '🐢 Ilhas Galápagos (3)',
      anchorCont: '🏔️ Equador Continental (4)',
      anchorComb: '✨ Viagens Combinadas (2)',
      anchorDaily: '☀️ Excursões de Um Dia',
      s1Badge: 'Arquipélago Encantado',
      s1Title: 'Expedições em Galápagos',
      s1Desc: 'Hotéis boutique à beira-mar, navegação entre ilhas desertas e encontros com fauna única no mundo.',
      s2Badge: 'Andes & Amazônia',
      s2Title: 'Equador Continental',
      s2Desc: 'Avenida dos Vulcões, lagoas de cratera, fazendas coloniais históricas e a densa selva amazônica.',
      s3Badge: 'A Experiência Definitiva',
      s3Title: 'Viagens Combinadas',
      s3Desc: 'O melhor de dois mundos em uma só viagem: a grandiosidade dos Andes e a magia de Galápagos.',
      s4Badge: 'Saídas Diárias',
      s4Title: 'Excursões de Dia Inteiro',
      s4Desc: 'Escapadas de um dia saindo de Quito para os destinos mais emblemáticos do Equador.',
      viewItinerary: 'Ver Itinerário',
      viewFullItinerary: 'Ver Itinerário Completo',
      details: 'Detalhes',
      book: 'Reservar',
      bookExpedition: 'Reservar Expedição',
      combinedTag: 'Andes + Galápagos VIP',
      from: 'A partir de',
    },
    ja: {
      schemaName: 'ラグジュアリー遠征ツアーカタログ',
      schemaDesc: 'ガラパゴス諸島およびエクアドル本土を巡るプライベート遠征ツアーの特別コレクション。',
      heroBadge: 'エクスクルーシブ遠征カタログ',
      heroTitleP1: '極上の ',
      heroTitleP2: 'ブティック旅行コレクション',
      heroDesc: '専任ナチュラリストガイドが監修したオーダーメイドの旅。一生心に残る冒険の旅へ。',
      anchorGala: '🐢 ガラパゴス諸島 (3)',
      anchorCont: '🏔️ エクアドル本土 (4)',
      anchorComb: '✨ コンビネーションツアー (2)',
      anchorDaily: '☀️ 日帰りエクスカーション',
      s1Badge: '魅惑の諸島',
      s1Title: 'ガラパゴス遠征ツアー',
      s1Desc: 'オーシャンフロントの厳選ホテル、無人島を巡る専用クルーズ、ここでしか出会えない固有種との遭遇。',
      s2Badge: 'アンデス山脈＆アマゾン',
      s2Title: 'エクアドル本土ツアー',
      s2Desc: '火山の道、エメラルドに輝くカルデラ湖、歴史あるコロニアル・ハシエンダ、生命溢れるアマゾン熱帯雨林。',
      s3Badge: '究極の旅体験',
      s3Title: 'コンビネーションツアー',
      s3Desc: 'アンデス高地の壮大な自然とガラパゴスの奇跡、ふたつの世界を一度に堪能する最高の旅。',
      s4Badge: '毎日出発',
      s4Title: '日帰りエクスカーション',
      s4Desc: 'キト発、エクアドルの息を呑む絶景と文化を凝縮して楽しむワンデイトリップ。',
      viewItinerary: '日程を見る',
      viewFullItinerary: '詳細日程を見る',
      details: '詳細',
      book: '予約する',
      bookExpedition: '遠征ツアーを予約',
      combinedTag: 'アンデス + ガラパゴス VIP',
      from: '料金',
    },
    zh: {
      schemaName: '顶级奢华探险行程目录',
      schemaDesc: '加拉帕戈斯群岛与厄瓜多尔本土专属精品旅行与私人探险行程目录。',
      heroBadge: '独家探险行程精选',
      heroTitleP1: '尊享典藏 ',
      heroTitleP2: '精品探险之旅',
      heroDesc: '由资深自然学家量身设计的专属旅行路线，带您领略厄瓜多尔与加拉帕戈斯的无尽魅力。',
      anchorGala: '🐢 加拉帕戈斯群岛 (3)',
      anchorCont: '🏔️ 厄瓜多尔本土 (4)',
      anchorComb: '✨ 经典联游路线 (2)',
      anchorDaily: '☀️ 一日游精品短途',
      s1Badge: '奇迹之岛',
      s1Title: '加拉帕戈斯探险之旅',
      s1Desc: '奢华海滨精品酒店、无人荒岛游艇巡航，与全球独一无二的野生生灵亲密接触。',
      s2Badge: '安第斯与亚马逊',
      s2Title: '厄瓜多尔本土巡礼',
      s2Desc: '火山大道、壮丽火山口湖、殖民风情百年庄园以及生机勃勃的亚马逊热带雨林。',
      s3Badge: '终极南美体验',
      s3Title: '双重风光联游之旅',
      s3Desc: '兼得安第斯高地之壮丽与加拉帕戈斯群岛之魔幻，一趟旅程尽览南美两大奇迹。',
      s4Badge: '每日发团',
      s4Title: '一日游精选行程',
      s4Desc: '从基多出发，探访厄瓜多尔最具代表性的自然与文化圣地。',
      viewItinerary: '查看行程',
      viewFullItinerary: '查看完整行程',
      details: '详情',
      book: '立即预订',
      bookExpedition: '预订探险之旅',
      combinedTag: '安第斯 + 加拉帕戈斯 VIP',
      from: '起价',
    }
  };

  const t = toursI18n[locale] || toursI18n['en'];

  const toursSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.schemaName,
    description: t.schemaDesc,
    url: `https://www.vermilionroutes.com/${locale}/tours`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: mockTours.map((tour, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'TouristTrip',
          name: getLocalizedText(tour.title, locale),
          url: `https://www.vermilionroutes.com/${locale}/tours/${tour.id}`,
          image: tour.mainImage || tour.imageUrl,
          offers: {
            '@type': 'Offer',
            price: Number((tour.price3Star || tour.price || 1000).toString().replace(/[^0-9.]/g, '')),
            priceCurrency: 'USD',
          },
        },
      })),
    },
  };

  // ── Categorización de Tours ────────────────────────────────────────────────
  // 1. Galápagos (3 tours)
  const galapagosTours = mockTours.filter((t) => {
    const dest = (typeof t.destination === 'string' ? t.destination : (t.destination as any)?.en || '').toLowerCase();
    const id = t.id.toLowerCase();
    return (dest.includes('galapagos') || id.includes('galapagos')) && !id.includes('combined') && !id.includes('ecuador-galapagos') && (t.durationDays ?? 4) > 1;
  }).slice(0, 3);

  // 2. Continental (4 tours)
  const continentalTours = mockTours.filter((t) => {
    const dest = (typeof t.destination === 'string' ? t.destination : (t.destination as any)?.en || '').toLowerCase();
    const id = t.id.toLowerCase();
    return (dest.includes('ecuador') || dest.includes('mainland') || id.includes('andes') || id.includes('volcanoes') || id.includes('amazon')) &&
      !dest.includes('galapagos') && !id.includes('galapagos') && (t.durationDays ?? 4) > 1;
  }).slice(0, 4);

  // 3. Combinados (2 tours)
  const combinedTours = mockTours.filter((t) => {
    const id = t.id.toLowerCase();
    const dest = (typeof t.destination === 'string' ? t.destination : (t.destination as any)?.en || '').toLowerCase();
    return id.includes('combined') || id.includes('ecuador-galapagos') || (dest.includes('galapagos') && dest.includes('ecuador'));
  }).slice(0, 2);

  // Si no hay combinados explícitos, tomamos los tours más largos que toquen ambos destinos
  const finalCombined = combinedTours.length >= 2 ? combinedTours : mockTours.filter(t => (t.durationDays ?? 0) >= 8).slice(0, 2);

  // Fallbacks si falta alguno en la lista
  const finalGalapagos = galapagosTours.length > 0 ? galapagosTours : mockTours.slice(0, 3);
  const finalContinental = continentalTours.length > 0 ? continentalTours : mockTours.slice(2, 6);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px] font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toursSchema) }}
      />

      {/* ── HERO REVISTA (EDITORIAL LUXURY) ────────────────────────────────── */}
      <section className="relative pt-[146px] sm:pt-40 pb-32 border-b border-zinc-200 dark:border-white/10">
        <ToursBackgroundSlider />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-xl">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl font-light text-white tracking-tight leading-tight drop-shadow-xl">
              {t.heroTitleP1}<span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">{t.heroTitleP2}</span>
            </h1>

            <p className="text-lg text-zinc-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
              {t.heroDesc}
            </p>

            {/* Quick anchors - MOVED DOWN */}
            <div className="flex flex-wrap justify-center gap-3 pt-8">
              <a href="#galapagos" aria-label={t.s1Title} className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                {t.anchorGala}
              </a>
              <a href="#continental" aria-label={t.s2Title} className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                {t.anchorCont}
              </a>
              <a href="#combinados" aria-label={t.s3Title} className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                {t.anchorComb}
              </a>
              <a href="#diarios" aria-label={t.s4Title} className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                {t.anchorDaily}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section exactly like landing page (overlaps the hero via -mt-12) */}
      <StatsSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl space-y-28">

        {/* ── SECCIÓN 1: ISLAS GALÁPAGOS (3 TOURS) ─────────────────────────── */}
        <section id="galapagos" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <span>🐢</span> {t.s1Badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white">
                {t.s1Title}
              </h2>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1 max-w-xl">
              {t.s1Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {finalGalapagos.map((tour) => {
              const title = getLocalizedText(tour.title, locale);
              const duration = getLocalizedText(tour.duration, locale);
              const desc = getLocalizedText(tour.description, locale);
              const price = tour.price3Star || tour.price || 1050;

              return (
                <div
                  key={tour.id}
                  className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col group"
                >
                  <Link href={`/${locale}/tours/${tour.id}`} className="relative h-64 w-full overflow-hidden block">
                    <Image quality={90}
                      src={tour.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp'}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-white/10">
                        {duration}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-emerald-400" />
                        <span>{tour.rating || 5}.0</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-emerald-300 block">{t.from}</span>
                        <p className="font-serif text-2xl font-bold text-white">
                          ${price.toLocaleString()} <span className="text-xs font-normal text-zinc-300">USD</span>
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 line-clamp-3 mt-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between gap-3">
                      <Link
                        href={`/${locale}/tours/${tour.id}`}
                        aria-label={`${t.viewItinerary} - ${title}`}
                        className="flex-1 py-3 px-4 rounded-2xl border-2 border-emerald-500/30 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md text-center flex items-center justify-center group"
                      >
                        <span className="group-hover:scale-105 transition-transform">{t.viewItinerary}</span>
                      </Link>
                      <BookingActionLink
                        href={`/${locale}/booking`}
                        tourId={tour.id}
                        ariaLabel={`${t.book} - ${title}`}
                        className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/30 text-center flex items-center justify-center hover:scale-[1.02] active:scale-95"
                      >
                        {t.book}
                      </BookingActionLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECCIÓN 2: ECUADOR CONTINENTAL (4 TOURS) ────────────────────── */}
        <section id="continental" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <span>🏔️</span> {t.s2Badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white">
                {t.s2Title}
              </h2>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1 max-w-xl">
              {t.s2Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalContinental.map((tour) => {
              const title = getLocalizedText(tour.title, locale);
              const duration = getLocalizedText(tour.duration, locale);
              const price = tour.price3Star || tour.price || 1200;

              return (
                <div
                  key={tour.id}
                  className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col group shadow-lg"
                >
                  <Link href={`/${locale}/tours/${tour.id}`} className="relative h-56 w-full overflow-hidden block">
                    <Image quality={90}
                      src={tour.imageUrl || '/images/tours/16-9/cotopaxi-volcano-16-9.webp'}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-white/10">
                        {duration}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <div className="mt-2">
                        <span className="text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-400 block">{t.from}</span>
                        <p className="font-serif text-xl font-bold text-emerald-700 dark:text-emerald-400">
                          ${price.toLocaleString()} <span className="text-xs font-normal text-zinc-600 dark:text-zinc-300">USD</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <Link
                        href={`/${locale}/tours/${tour.id}`}
                        aria-label={`${t.details} - ${title}`}
                        className="flex-1 py-2.5 px-3 rounded-xl border-2 border-emerald-500/30 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md text-center flex items-center justify-center group"
                      >
                        <span className="group-hover:scale-105 transition-transform">{t.details}</span>
                      </Link>
                      <BookingActionLink
                        href={`/${locale}/booking`}
                        tourId={tour.id}
                        ariaLabel={`${t.book} - ${title}`}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/30 text-center flex items-center justify-center hover:scale-[1.02] active:scale-95"
                      >
                        {t.book}
                      </BookingActionLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECCIÓN 3: VIAJES COMBINADOS (2 GRANDES TOURS) ───────────────── */}
        <section id="combinados" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <span>✨</span> {t.s3Badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white">
                {t.s3Title}
              </h2>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1 max-w-xl">
              {t.s3Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {finalCombined.map((tour) => {
              const title = getLocalizedText(tour.title, locale);
              const duration = getLocalizedText(tour.duration, locale);
              const desc = getLocalizedText(tour.description, locale);
              const price = tour.price3Star || tour.price || 2890;

              return (
                <div
                  key={tour.id}
                  className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all duration-300 flex flex-col group shadow-xl"
                >
                  <Link href={`/${locale}/tours/${tour.id}`} className="relative h-72 w-full overflow-hidden block">
                    <Image quality={90}
                      src={tour.imageUrl || '/images/tours/16-9/galapagos-snorkeling-16-9.jpg'}
                      alt={title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                        {duration}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                      <span className="text-xs text-blue-300 font-semibold bg-black/60 px-3 py-1 rounded-full">
                        {t.combinedTag}
                      </span>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-blue-300 block">{t.from}</span>
                        <p className="font-serif text-3xl font-bold text-white">
                          ${price.toLocaleString()} <span className="text-sm font-normal text-zinc-300">USD</span>
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="p-8 flex flex-col flex-1 justify-between space-y-6">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-3 leading-relaxed line-clamp-3">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between gap-4">
                      <Link
                        href={`/${locale}/tours/${tour.id}`}
                        aria-label={`${t.viewFullItinerary} - ${title}`}
                        className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-emerald-500/30 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md text-center flex items-center justify-center group"
                      >
                        <span className="group-hover:scale-105 transition-transform">{t.viewFullItinerary}</span>
                      </Link>
                      <BookingActionLink
                        href={`/${locale}/booking`}
                        tourId={tour.id}
                        ariaLabel={`${t.bookExpedition} - ${title}`}
                        className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/30 text-center flex items-center justify-center hover:scale-[1.02] active:scale-95"
                      >
                        {t.bookExpedition}
                      </BookingActionLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECCIÓN 4: EXCURSIONES FULL DAY / DIARIAS (3D CAROUSEL) ──────── */}
        <section id="diarios" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
              <span>☀️</span> {t.s4Badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-zinc-900 dark:text-white">
              {t.s4Title}
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {t.s4Desc}
            </p>
          </div>

          {/* Carrusel 3D interactivo */}
          <div className="pt-6">
            <TourCarousel tours={dailyTours} />
          </div>
        </section>

      </div>
    </div>
  );
}