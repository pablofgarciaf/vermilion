import { MetadataRoute } from 'next';
import { mockTours } from '@/data/mock';
import { BLOG_POSTS } from '@/data/blogData';

const BASE_URL = 'https://www.vermilionroutes.com';
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'];

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
        lastModified: new Date(),
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
        lastModified: new Date(),
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

  return sitemapEntries;
}
