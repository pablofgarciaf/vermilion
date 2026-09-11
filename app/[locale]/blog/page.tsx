import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Vermilion Routes | Guías de Viaje y Expediciones de Lujo',
    en: 'Vermilion Routes | Luxury Travel Guides and Insights',
    fr: 'Vermilion Routes | Guides de Voyage & Expéditions Luxe',
    de: 'Vermilion Routes | Luxus-Reiseführer & Expeditionen',
    it: 'Vermilion Routes | Guide di Viaggio e Spedizioni di Lusso',
    pt: 'Vermilion Routes | Guias de Viagem e Expedições de Luxo',
    ja: 'Vermilion Routes | 豪華旅行ガイドとエクアドル遠征記',
    zh: 'Vermilion Routes | 顶级旅行指南与厄瓜多尔探险纪行',
  };
  const descriptions: Record<string, string> = {
    es: 'Guías de viaje y consejos exclusivos para explorar Galápagos, los Andes y la Amazonía ecuatoriana con la asesoría de Vermilion Routes 24/7.',
    en: 'Curated luxury travel guides, wildlife insights and expedition tips for Galapagos and Ecuador. Plan your bespoke journey with local experts 24/7.',
    fr: 'Guides de voyage d’exception et conseils d’experts pour explorer les Galápagos, les Andes et l’Amazonie équatorienne avec Vermilion 24/7.',
    de: 'Exklusive Reiseführer, Tierbeobachtungstipps und Routen für Galápagos und Ecuador. Planen Sie Ihre individuelle Luxusreise 24/7.',
    it: 'Guide di viaggio di lusso ed approfondimenti per esplorare Galápagos, le Ande e l’Amazzonia con gli esperti di Vermilion Routes 24/7.',
    pt: 'Guias de viagem exclusivos e dicas de expedição para explorar Galápagos, os Andes e a Amazônia com a assessoria da Vermilion Routes 24/7.',
    ja: 'ガラパゴス諸島、アンデス山脈、アマゾン熱帯雨林を巡る豪華旅行ガイド。現地ナチュラリストが24時間体制でオーダーメイドの旅をご案内。',
    zh: '精心打造的顶级奢华旅行指南、野生动物洞察与探险建议，带您深度探索加拉帕戈斯与厄瓜多尔。本地自然学专家24/7全天候专属定制服务。',
  };

  const title = titles[locale] || titles['en'];
  const description = descriptions[locale] || descriptions['en'];

  return {
    title,
    description,
    alternates: getSeoAlternates('/blog', locale),
    openGraph: {
      title,
      description,
      url: `https://www.vermilionroutes.com/${locale}/blog`,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const headersDict: Record<string, {
    schemaName: string;
    schemaDesc: string;
    homeBreadcrumb: string;
    blogBreadcrumb: string;
    badge: string;
    title: string;
    subtitle: string;
    loading: string;
  }> = {
    es: {
      schemaName: 'Guías de Viaje y Expediciones Vermilion',
      schemaDesc: 'Artículos editoriales, guías de expedición y consejos de expertos para viajar por Ecuador y Galápagos.',
      homeBreadcrumb: 'Inicio',
      blogBreadcrumb: 'Blog',
      badge: 'Guías y Artículos de Viaje Vermilion',
      title: 'Expediciones, Naturaleza y Cultura',
      subtitle: 'Artículos editoriales, guías de expedición, calendarios de fauna y consejos de expertos para explorar Ecuador y las Islas Galápagos.',
      loading: 'Cargando guías de viaje...'
    },
    en: {
      schemaName: 'Vermilion Luxury Travel Guides & Insights',
      schemaDesc: 'Curated luxury travel guides, itineraries, and wildlife insights for Galapagos and Ecuador.',
      homeBreadcrumb: 'Home',
      blogBreadcrumb: 'Travel Guides',
      badge: 'Vermilion Travel Insights & Guides',
      title: 'Journeys, Nature & Expert Guides',
      subtitle: 'Curated articles, expedition guides, wildlife calendars, and insider tips to explore Ecuador and the Galapagos Islands.',
      loading: 'Loading travel guides...'
    },
    fr: {
      schemaName: 'Guides de Voyage et Expéditions Vermilion',
      schemaDesc: 'Articles éditoriaux, guides d’expédition et conseils d’experts pour voyager en Équateur et aux îles Galápagos.',
      homeBreadcrumb: 'Accueil',
      blogBreadcrumb: 'Guides de Voyage',
      badge: 'Guides et Conseils de Voyage Vermilion',
      title: 'Expéditions, Nature et Culture',
      subtitle: 'Guides éditoriaux, calendriers fauniques et conseils d’experts pour explorer l’Équateur et les îles Galápagos.',
      loading: 'Chargement des guides de voyage...'
    },
    de: {
      schemaName: 'Vermilion Luxus-Reiseführer & Einblicke',
      schemaDesc: 'Redaktionelle Reiseführer, Reiserouten und Tierbeobachtungs-Tipps für Ecuador und die Galápagos-Inseln.',
      homeBreadcrumb: 'Startseite',
      blogBreadcrumb: 'Reiseführer',
      badge: 'Vermilion Reiseleitfäden & Einblicke',
      title: 'Expeditionen, Natur & Expertenwissen',
      subtitle: 'Redaktionelle Reiseführer, Tierbeobachtungskalender und Insidertipps für Ecuador und die Galápagos-Inseln.',
      loading: 'Reiseführer werden geladen...'
    },
    it: {
      schemaName: 'Guide di Viaggio ed Approfondimenti Vermilion',
      schemaDesc: 'Articoli editoriali, guide alle spedizioni e consigli per viaggiare in Ecuador e nelle Isole Galápagos.',
      homeBreadcrumb: 'Home',
      blogBreadcrumb: 'Guide di Viaggio',
      badge: 'Guide di Viaggio ed Approfondimenti Vermilion',
      title: 'Spedizioni, Natura e Cultura',
      subtitle: 'Articoli editoriali, guide alle spedizioni, calendari della fauna selvatica e consigli per esplorare Ecuador e Galápagos.',
      loading: 'Caricamento guide di viaggio...'
    },
    pt: {
      schemaName: 'Guias e Artigos de Viagem Vermilion',
      schemaDesc: 'Artigos editoriais, guias de expedição e dicas de especialistas para viajar pelo Equador e pelas Ilhas Galápagos.',
      homeBreadcrumb: 'Início',
      blogBreadcrumb: 'Guias de Viagem',
      badge: 'Guias e Artigos de Viagem Vermilion',
      title: 'Expedições, Natureza e Cultura',
      subtitle: 'Artigos editoriais, guias de expedição, calendários de fauna e dicas de especialistas para explorar o Equador e as Ilhas Galápagos.',
      loading: 'Carregando guias de viagem...'
    },
    ja: {
      schemaName: 'Vermilion 豪華旅行ガイド＆インサイト',
      schemaDesc: 'エクアドルとガラパゴス諸島を旅するための専門家による編集記事、遠征ガイド、野生動物の観察情報。',
      homeBreadcrumb: 'ホーム',
      blogBreadcrumb: '旅行ガイド',
      badge: 'Vermilion 旅のインサイト＆ガイド',
      title: '大自然、探検、そしてアンデス文化',
      subtitle: 'エクアドル本土とガラパゴス諸島を巡るための、編集部特選ガイド、野生動物カレンダー、専門家のアドバイス。',
      loading: '旅行ガイドを読み込み中...'
    },
    zh: {
      schemaName: 'Vermilion 奢华旅行指南与深度解析',
      schemaDesc: '专为探索厄瓜多尔与加拉帕戈斯群岛打造的高端旅行攻略、精选行程与野生动物见解。',
      homeBreadcrumb: '首页',
      blogBreadcrumb: '旅行指南',
      badge: 'Vermilion 独家旅行指南与深度解析',
      title: '自然探索、秘境探险与南美文化',
      subtitle: '专为探索厄瓜多尔与加拉帕戈斯群岛打造的专业旅行指南、野生动物日历及资深向导建议。',
      loading: '正在加载旅行指南...'
    }
  };

  const h = headersDict[locale] || headersDict['en'];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: h.schemaName,
    description: h.schemaDesc,
    url: `https://www.vermilionroutes.com/${locale}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: BLOG_POSTS.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'BlogPosting',
          headline: getLocalizedText(post.title, locale),
          description: getLocalizedText(post.excerpt, locale),
          url: `https://www.vermilionroutes.com/${locale}/blog/${post.slug}`,
          image: `https://www.vermilionroutes.com${post.imageUrl}`,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author.name,
          },
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: h.homeBreadcrumb,
          item: `https://www.vermilionroutes.com/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: h.blogBreadcrumb,
          item: `https://www.vermilionroutes.com/${locale}/blog`,
        },
      ],
    },
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px] pt-[146px] pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Static SSR Hero Header - Guarantees H1 is always first heading in DOM */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>{h.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-zinc-900 dark:text-white tracking-tight">
            {h.title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {h.subtitle}
          </p>
        </div>

        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-emerald-700 font-semibold animate-pulse">{h.loading}</div>}>
          <BlogIndexClient hideHeader />
        </Suspense>
      </div>
    </div>
  );
}
