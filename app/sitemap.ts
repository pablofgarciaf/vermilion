import { MetadataRoute } from 'next';
import { mockTours } from '@/data/mock';
import { BLOG_POSTS } from '@/data/blogData';
import { DESTINATIONS } from '@/data/destinationsData';

const BASE_URL = 'https://www.vermilionroutes.com';
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'];

const LAST_CATALOG_UPDATE = new Date('2026-09-11T00:00:00.000Z');
const LAST_LEGAL_UPDATE = new Date('2026-08-15T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/tours',
    '/blog',
    '/booking',
    '/presentation',
    '/couples-anniversary-galapagos',
    '/family-friendly-ecuador',
    '/wildlife-photography-expeditions',
    '/privacy-policy',
    '/terms',
  ];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  const getLanguageAlternates = (pagePath: string) => {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) {
      languages[l] = `${BASE_URL}/${l}${pagePath}`;
    }
    languages['x-default'] = `${BASE_URL}/en${pagePath}`;
    return { languages };
  };

  // 1. Static Pages for all locales
  for (const page of staticPages) {
    for (const locale of LOCALES) {
      const isHome = page === '';
      const isCatalogOrBlog = page === '/tours' || page === '/blog';
      const isLegal = page === '/privacy-policy' || page === '/terms';

      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: isLegal ? LAST_LEGAL_UPDATE : LAST_CATALOG_UPDATE,
        changeFrequency: isHome ? 'daily' : isCatalogOrBlog ? 'daily' : isLegal ? 'monthly' : 'weekly',
        priority: isHome ? 1.0 : isCatalogOrBlog ? 0.9 : isLegal ? 0.5 : 0.8,
        alternates: getLanguageAlternates(page),
      });
    }
  }

  // 2. All Tour itineraries
  for (const tour of mockTours) {
    const tourPath = `/tours/${tour.id}`;
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${tourPath}`,
        lastModified: LAST_CATALOG_UPDATE,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: getLanguageAlternates(tourPath),
      });
    }
  }

  // 3. All Blog Articles
  for (const post of BLOG_POSTS) {
    const blogPath = `/blog/${post.slug}`;
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${blogPath}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: getLanguageAlternates(blogPath),
      });
    }
  }

  // 4. Fichas de destino. Van en el sitemap con su hreflang completo para que
  // el buscador indexe directamente la version del idioma del visitante y no
  // tenga que pasar por la redireccion de la raiz.
  for (const dest of DESTINATIONS) {
    const destPath = `/destinations/${dest.slug}`;
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${destPath}`,
        lastModified: LAST_CATALOG_UPDATE,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: getLanguageAlternates(destPath),
      });
    }
  }

  return sitemapEntries;
}
