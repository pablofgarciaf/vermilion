import { MetadataRoute } from 'next';

const privateDisallow = [
  '/admin', '/admin/', '/admin/*',
  '/cpanel', '/cpanel/', '/cpanel/*',
  '/auth', '/auth/', '/auth/*',
  '/api', '/api/', '/api/*',
  '/*/admin', '/*/admin/*',
  '/*/cpanel', '/*/cpanel/*',
  '/*/auth', '/*/auth/*',
  '/affiliates', '/affiliates/', '/affiliates/*',
  '/*/affiliates', '/*/affiliates/', '/*/affiliates/*',
  '/*/checkout', '/*/checkout/*',
  '/*?*tourId=*', '/*?*tourid=*', '/*?*token=*', '/*?*vid=*', '/*?*ref=*',
];

// Buscadores, asistentes de IA (rastreo y citacion) y bots de vista previa social.
const SEARCH_AND_AI_BOTS = [
  // Buscadores
  'Googlebot', 'Googlebot-Image', 'Bingbot', 'msnbot', 'Applebot', 'DuckDuckBot', 'YandexBot',
  'Baiduspider', 'Slurp', 'BraveBot', 'Bravebot', 'Qwantbot', 'Qwantify', 'Ecosia', 'SeznamBot', 'Yeti',
  // IA: OpenAI, Anthropic, Google, Apple
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'anthropic-ai',
  'Google-Extended', 'Applebot-Extended',
  // IA: Perplexity, DeepSeek, xAI, Kimi, Mistral, Cohere, You, Meta, Amazon, Phind, Diffbot
  'PerplexityBot', 'Perplexity-User', 'DeepSeekBot', 'GrokBot', 'xAI-Bot', 'KimiBot', 'MoonshotBot',
  'MistralAI-User', 'cohere-ai', 'YouBot', 'Meta-ExternalAgent', 'meta-externalagent', 'FacebookBot',
  'Amazonbot', 'Bytespider', 'CCBot', 'PhindBot', 'DuckAssistBot', 'Diffbot',
  // Vista previa al compartir enlaces
  'FacebookExternalHit', 'facebookexternalhit', 'Facebot', 'facebookcatalog', 'Twitterbot',
  'LinkedInBot', 'WhatsApp', 'Pinterestbot', 'Slackbot', 'Slackbot-LinkExpanding',
];

// Herramientas de clonacion masiva del sitio.
const CLONER_BOTS = [
  'HTTrack', 'WebCopier', 'WebReaper', 'WebZIP', 'SiteSnagger', 'Teleport', 'TeleportPro',
  'Offline Explorer', 'SiteSucker', 'Wget', 'Scrapy', 'MJ12bot', 'Cyotek WebCopy',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: SEARCH_AND_AI_BOTS, allow: '/', disallow: privateDisallow },
      { userAgent: CLONER_BOTS, disallow: '/' },
      { userAgent: '*', allow: '/', disallow: privateDisallow },
    ],
    sitemap: 'https://www.vermilionroutes.com/sitemap.xml',
  };
}
