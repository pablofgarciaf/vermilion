import { MetadataRoute } from 'next';

const privateDisallow = [
  '/admin',
  '/admin/',
  '/admin/*',
  '/cpanel',
  '/cpanel/',
  '/cpanel/*',
  '/auth',
  '/auth/',
  '/auth/*',
  '/api',
  '/api/',
  '/api/*',
  '/*/admin',
  '/*/admin/*',
  '/*/cpanel',
  '/*/cpanel/*',
  '/*/auth',
  '/*/auth/*',
  '/affiliates',
  '/affiliates/',
  '/affiliates/*',
  '/*/affiliates',
  '/*/affiliates/',
  '/*/affiliates/*',
  '/*/checkout',
  '/*/checkout/*',
  '/*?*tourId=*',
  '/*?*tourid=*',
  '/*?*token=*',
  '/*?*vid=*',
  '/*?*ref=*',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'anthropic-ai',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot',
        ],
        allow: '/',
        disallow: privateDisallow,
      },
      {
        userAgent: ['HTTrack', 'Wget', 'Scrapy'],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: privateDisallow,
      },
    ],
    sitemap: 'https://www.vermilionroutes.com/sitemap.xml',
  };
}
