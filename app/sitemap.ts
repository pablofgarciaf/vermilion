import { MetadataRoute } from 'next';
import { mockTours } from '@/data/mock';
import { BLOG_POSTS } from '@/data/blogData';

const BASE_URL = 'https://www.vermilionroutes.com';
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/tours',
    '/blog',
    '/booking',
    '/couples-anniversary-galapagos',
    '/family-friendly-ecuador',
    '/wildlife-photography-expeditions',
    '/privacy-policy',
    '/terms',
  ];
  const sitemapEntries: MetadataRoute.Sitemap = [];

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
      });
    }
  }

  // 2. All Tour itineraries
  for (const tour of mockTours) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/tours/${tour.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  // 3. All Blog Articles
  for (const post of BLOG_POSTS) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return sitemapEntries;
}
