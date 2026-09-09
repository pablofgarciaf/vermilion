import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'Vermilion Routes | Guías de Viaje y Expediciones de Lujo'
      : 'Vermilion Routes | Luxury Travel Guides and Insights',
    description: isEs
      ? 'Guías de viaje y consejos exclusivos para explorar Galápagos, los Andes y la Amazonía ecuatoriana con la asesoría de Vermilion Routes 24/7.'
      : 'Curated luxury travel guides, wildlife insights and expedition tips for Galapagos and Ecuador. Plan your bespoke journey with local experts 24/7.',
    alternates: getSeoAlternates('/blog', locale),
    openGraph: {
      title: isEs
        ? 'Vermilion Routes | Guías de Viaje y Expediciones de Lujo'
        : 'Vermilion Routes | Luxury Travel Guides and Insights',
      description: isEs
        ? 'Guías de viaje y consejos exclusivos para explorar Galápagos, los Andes y la Amazonía ecuatoriana con la asesoría de Vermilion Routes 24/7.'
        : 'Curated luxury travel guides, wildlife insights and expedition tips for Galapagos and Ecuador. Plan your bespoke journey with local experts 24/7.',
      url: `https://www.vermilionroutes.com/${locale}/blog`,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEs ? 'Guías de Viaje y Expediciones Vermilion' : 'Vermilion Luxury Travel Guides & Insights',
    description: isEs
      ? 'Artículos editoriales, guías de expedición y consejos de expertos para viajar por Ecuador y Galápagos.'
      : 'Curated luxury travel guides, itineraries, and wildlife insights for Galapagos and Ecuador.',
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
          name: isEs ? 'Inicio' : 'Home',
          item: `https://www.vermilionroutes.com/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isEs ? 'Blog' : 'Travel Guides',
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
            <span>{isEs ? 'Guías y Artículos de Viaje Vermilion' : 'Vermilion Travel Insights & Guides'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-zinc-900 dark:text-white tracking-tight">
            {isEs ? 'Expediciones, Naturaleza y Cultura' : 'Journeys, Nature & Expert Guides'}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isEs
              ? 'Artículos editoriales, guías de expedición, calendarios de fauna y consejos de expertos para explorar Ecuador y las Islas Galápagos.'
              : 'Curated articles, expedition guides, wildlife calendars, and insider tips to explore Ecuador and the Galapagos Islands.'}
          </p>
        </div>

        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-emerald-700 font-semibold animate-pulse">{isEs ? 'Cargando guías de viaje...' : 'Loading travel guides...'}</div>}>
          <BlogIndexClient hideHeader />
        </Suspense>
      </div>
    </div>
  );
}
