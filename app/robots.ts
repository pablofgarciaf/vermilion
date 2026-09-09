import { MetadataRoute } from 'next';

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
      },
      {
        userAgent: ['HTTrack', 'Wget', 'Scrapy'],
        disallow: '/',
      },
      {
        userAgent: '*',
        disallow: [
          '/admin',
          '/admin/',
          '/cpanel',
          '/cpanel/',
          '/auth',
          '/auth/',
          '/api',
          '/api/',
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
        ],
      },
    ],
    sitemap: 'https://www.vermilionroutes.com/sitemap.xml',
  };
}
