import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BLOG_POSTS, BlogPost } from '@/data/blogData';
import { mockTours } from '@/data/mock';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getSeoAlternates } from '@/utils/seoHelper';
import { LeadMagnetBanner } from '@/components/home/LeadMagnetBanner';
import { BlogTourBookingShowcase } from '@/components/blog/BlogTourBookingShowcase';
import { BlogAuthorBio } from '@/components/blog/BlogAuthorBio';
import { BlogGalleryButton } from '@/components/blog/BlogGalleryButton';
import { DestinationKey } from '@/lib/destinationGallery';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  MessageCircle,
  HelpCircle,
  Tag
} from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article Not Found | Vermilion Routes' };
  }

  const rawTitle = getLocalizedText(post.title, locale);
  const cleanTitle = rawTitle.replace(/&/g, 'and').replace(/\s+/g, ' ').trim();
  let title = `${cleanTitle} | Vermilion Routes`;
  if (title.length < 50) {
    title = `${cleanTitle} - Travel Guide | Vermilion Routes`;
  }
  if (title.length > 60) {
    const available = 60 - ' | Vermilion Routes'.length; // 41
    const truncated = cleanTitle.slice(0, available);
    const lastSpace = truncated.lastIndexOf(' ');
    let safeWord = (lastSpace > 15 ? truncated.slice(0, lastSpace) : truncated).trim();
    safeWord = safeWord.replace(/\s+(and|or|y|de|the|in|a|en|el|la|los|las|del|por|para|of)$/i, '').trim();
    title = `${safeWord} | Vermilion Routes`;
    if (title.length < 50) {
      title = `${safeWord} - Guide | Vermilion Routes`;
    }
  }

  const rawDesc = getLocalizedText(post.excerpt, locale);
  let description = rawDesc.replace(/\s+/g, ' ').trim();
  if (description.length > 155) {
    description = description.slice(0, 152).trim() + '...';
  } else if (locale === 'ja' || locale === 'zh') {
    if (description.length < 70) {
      const cta = locale === 'ja'
        ? ' Vermilion Routesの専任トラベルコンシェルジュが24時間サポート。'
        : ' Vermilion Routes专属私人旅行顾问为您提供24/7全天候保障。';
      description = (description + cta).slice(0, 95);
    }
  } else if (description.length < 120) {
    const ctas: Record<string, string> = {
      es: ' Descubra la asesoría de viajes a medida 24/7 con Vermilion Routes.',
      en: ' Discover bespoke nature travel planning 24/7 with Vermilion Routes.',
      fr: ' Découvrez nos voyages sur mesure 24/7 avec Vermilion Routes.',
      de: ' Entdecken Sie maßgeschneiderte Reisen 24/7 mit Vermilion Routes.',
      it: ' Scopri i viaggi su misura 24/7 con Vermilion Routes.',
      pt: ' Descubra viagens sob medida 24/7 com a Vermilion Routes.',
    };
    description = (description + (ctas[locale] || ctas['en'])).slice(0, 155);
  }

  const alternates = getSeoAlternates(`/blog/${slug}`, locale);
  const fullImageUrl = post.imageUrl.startsWith('http')
    ? post.imageUrl
    : `https://www.vermilionroutes.com${post.imageUrl}`;
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
    openGraph: {
      title: `${rawTitle} | Vermilion Routes`,
      description,
      url: alternates.canonical,
      siteName: 'Vermilion Routes',
      locale: fbLocale,
      images: [
        {
          url: fullImageUrl,
          secureUrl: fullImageUrl,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: rawTitle,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vermilionroutes',
      creator: '@vermilionroutes',
      title: `${rawTitle} | Vermilion Routes`,
      description,
      images: [fullImageUrl],
    },
    alternates,
  };
}

function parseMarkdown(text: string, locale: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-zinc-800 dark:text-zinc-200">$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, (_, label, url) => {
      const href = url.startsWith('/') && !url.startsWith(`/${locale}`) ? `/${locale}${url}` : url;
      const isExternal = url.startsWith('http');
      const rel = isExternal ? 'rel="noopener noreferrer" target="_blank"' : '';
      return `<a href="${href}" ${rel} class="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-4 decoration-emerald-500/50 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors">${label}</a>`;
    });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedTour = post.relatedTourId
    ? mockTours.find((t) => t.id === post.relatedTourId)
    : mockTours[0];

  const complementaryTours = mockTours.filter((t) => t.id !== relatedTour?.id).slice(0, 2);
  const destinationName = getLocalizedText(post.category, locale) || 'Galapagos & Ecuador';
  const articleTitle = getLocalizedText(post.title, locale);
  const contentText = locale === 'es' ? post.content.es : post.content.en;

  const blogJsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: getLocalizedText(post.title, locale),
    description: getLocalizedText(post.excerpt, locale),
    image: `https://www.vermilionroutes.com${post.imageUrl}`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: 'Lead Naturalist & Head of Expedition Design',
      worksFor: {
        '@type': 'TravelAgency',
        name: 'Vermilion Routes',
        url: 'https://www.vermilionroutes.com',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Licencia Oficial de Guía Nacional de Turismo',
        recognizedBy: {
          '@type': 'GovernmentOrganization',
          name: 'Ministerio de Turismo del Ecuador',
        },
      },
      knowsAbout: [
        'Galapagos Wildlife & Marine Reserve',
        'Andean Volcanology & High-Altitude Treks',
        'Amazon Rainforest Biodiversity & Yasuni',
        'Bespoke Expedition Planning in Ecuador',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vermilion Routes',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vermilionroutes.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: `https://www.vermilionroutes.com/${locale}/blog/${post.slug}`,
  };

  const faqJsonLd = (post.faqs && post.faqs.length > 0) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: getLocalizedText(faq.question, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getLocalizedText(faq.answer, locale),
      },
    })),
  } : null;

  const jsonLd = faqJsonLd ? [blogJsonLd, faqJsonLd] : blogJsonLd;

  const labelsDict: Record<string, {
    back: string;
    share: string;
    related: string;
    from: string;
    book: string;
    topics: string;
    guideComfort: string;
    viewItinerary: string;
    luxuryService: string;
    quickAnswerTitle: string;
    bestSeason: string;
    idealDuration: string;
    activityLevel: string;
    estimatedPrice: string;
    keyHighlight: string;
    faqsTitle: string;
  }> = {
    es: {
      back: 'Volver a todas las Guías',
      share: 'Compartir:',
      related: 'Expedición Recomendada para esta Guía',
      from: 'Desde',
      book: 'Reservar Expedición',
      topics: 'Temas Relacionados:',
      guideComfort: 'Vive esta experiencia en total confort con transporte privado personalizado, asistencia VIP en aeropuertos y conserjería 24/7.',
      viewItinerary: 'Ver Itinerario',
      luxuryService: 'Guía Naturalista Privado · Hotelería Exclusiva',
      quickAnswerTitle: 'Resumen Rápido para Viajeros (Datos Clave)',
      bestSeason: 'Mejor Época',
      idealDuration: 'Duración Sugerida',
      activityLevel: 'Nivel Físico',
      estimatedPrice: 'Tarifa Base',
      keyHighlight: 'Punto Culminante',
      faqsTitle: 'Preguntas Frecuentes de Viajeros'
    },
    en: {
      back: 'Back to All Travel Guides',
      share: 'Share:',
      related: 'Recommended Expedition for this Guide',
      from: 'From',
      book: 'Book Expedition',
      topics: 'Related Topics:',
      guideComfort: 'Experience this destination in complete comfort with customized private transport, VIP airport assistance, and 24/7 concierge.',
      viewItinerary: 'View Itinerary',
      luxuryService: 'Private Naturalist Guide · Boutique Accommodations',
      quickAnswerTitle: 'Quick Traveler Summary (Key Facts)',
      bestSeason: 'Best Time to Visit',
      idealDuration: 'Ideal Duration',
      activityLevel: 'Activity Level',
      estimatedPrice: 'Starting Price',
      keyHighlight: 'Key Highlight',
      faqsTitle: 'Frequently Asked Questions'
    },
    fr: {
      back: 'Retour à tous les guides de voyage',
      share: 'Partager :',
      related: 'Expédition recommandée pour ce guide',
      from: 'À partir de',
      book: 'Réserver l’expédition',
      topics: 'Thèmes associés :',
      guideComfort: 'Vivez cette expérience dans un confort absolu avec transport privé personnalisé, assistance VIP aéroport et conciergerie 24/7.',
      viewItinerary: 'Voir l’itinéraire',
      luxuryService: 'Guide naturaliste privé · Hôtellerie d’exception',
      quickAnswerTitle: 'Résumé Rapide pour Voyageurs (Faits Clés)',
      bestSeason: 'Meilleure Saison',
      idealDuration: 'Durée Idéale',
      activityLevel: 'Niveau d’Activité',
      estimatedPrice: 'Tarif Indicatif',
      keyHighlight: 'Point Fort',
      faqsTitle: 'Questions Fréquemment Posées'
    },
    de: {
      back: 'Zurück zu allen Reiseleitfäden',
      share: 'Teilen:',
      related: 'Empfohlene Expedition zu diesem Reiseführer',
      from: 'Ab',
      book: 'Expedition buchen',
      topics: 'Verwandte Themen:',
      guideComfort: 'Erleben Sie dieses Ziel in höchstem Komfort mit privatem Transport, VIP-Flughafenservice und 24/7-Concierge.',
      viewItinerary: 'Reiseroute ansehen',
      luxuryService: 'Privater Naturführer · Exklusive Unterkünfte',
      quickAnswerTitle: 'Schnellübersicht für Reisende (Wichtige Fakten)',
      bestSeason: 'Beste Reisezeit',
      idealDuration: 'Empfohlene Dauer',
      activityLevel: 'Aktivitätsgrad',
      estimatedPrice: 'Startpreis',
      keyHighlight: 'Besonderes Highlight',
      faqsTitle: 'Häufig Gestellte Fragen'
    },
    it: {
      back: 'Torna a tutte le guide di viaggio',
      share: 'Condividi:',
      related: 'Spedizione consigliata per questa guida',
      from: 'Da',
      book: 'Prenota Spedizione',
      topics: 'Argomenti correlati:',
      guideComfort: 'Vivi questa esperienza nel massimo comfort con trasporto privato personalizzato, assistenza aeroportuale VIP e concierge 24/7.',
      viewItinerary: 'Vedi itinerario',
      luxuryService: 'Guida naturalistica privata · Ospitalità esclusiva',
      quickAnswerTitle: 'Riepilogo Rapido per Viaggiatori (Dati Chiave)',
      bestSeason: 'Miglior Periodo',
      idealDuration: 'Durata Consigliata',
      activityLevel: 'Livello di Attività',
      estimatedPrice: 'Tariffa Base',
      keyHighlight: 'Punto Saliente',
      faqsTitle: 'Domande Frequenti dei Viaggiatori'
    },
    pt: {
      back: 'Voltar a todos os guias de viagem',
      share: 'Compartilhar:',
      related: 'Expedição recomendada para este guia',
      from: 'A partir de',
      book: 'Reservar Expedição',
      topics: 'Tópicos relacionados:',
      guideComfort: 'Viva esta experiência com total conforto: transporte privativo personalizado, assistência VIP em aeroportos e concierge 24/7.',
      viewItinerary: 'Ver Itinerário',
      luxuryService: 'Guia Naturalista Privativo · Hotelaria Exclusiva',
      quickAnswerTitle: 'Resumo Rápido para Viajantes (Fatos Principais)',
      bestSeason: 'Melhor Época',
      idealDuration: 'Duração Ideal',
      activityLevel: 'Nível de Atividade',
      estimatedPrice: 'Preço Base',
      keyHighlight: 'Ponto Alto',
      faqsTitle: 'Perguntas Frequentes de Viajantes'
    },
    ja: {
      back: 'すべての旅行ガイドに戻る',
      share: 'シェアする:',
      related: 'このガイドのおすすめ遠征ツアー',
      from: '料金',
      book: '遠征ツアーを予約',
      topics: '関連トピック:',
      guideComfort: '専用プライベート送迎、VIP空港アシスタンス、24時間年中無休のコンシェルジュで、最高峰の快適な旅をお届けします。',
      viewItinerary: '日程詳細を見る',
      luxuryService: '専任ナチュラリストガイド同行 · 厳選ラグジュアリーホテル',
      quickAnswerTitle: '旅行者のためのクイックサマリー（重要データ）',
      bestSeason: 'ベストシーズン',
      idealDuration: '推奨滞在日数',
      activityLevel: 'アクティビティ難易度',
      estimatedPrice: '参考基本料金',
      keyHighlight: '最大のハイライト',
      faqsTitle: 'よくある質問 (FAQ)'
    },
    zh: {
      back: '返回所有旅行指南',
      share: '分享：',
      related: '本指南推荐探险行程',
      from: '起价',
      book: '预订专属探险',
      topics: '相关主题：',
      guideComfort: '尊享全行程私人订制交通、VIP机场礼宾接送及24/7全天候管家服务，享受极致奢华体验。',
      viewItinerary: '查看行程详情',
      luxuryService: '专属私人自然向导 · 奢华精品酒店',
      quickAnswerTitle: '旅行者快速速览（核心要点）',
      bestSeason: '最佳出行季节',
      idealDuration: '建议行程天数',
      activityLevel: '体力难度',
      estimatedPrice: '参考起价',
      keyHighlight: '核心亮点',
      faqsTitle: '旅行者常见问题解答 (FAQ)'
    }
  };

  const t = labelsDict[locale] || labelsDict['en'];

  const backLabel = t.back;
  const shareLabel = t.share;

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider shadow-sm">
              {getLocalizedText(post.category, locale)}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {post.publishedAt}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">&bull;</span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-zinc-900 dark:text-white leading-tight tracking-tight">
            {getLocalizedText(post.title, locale)}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
            {getLocalizedText(post.subtitle, locale)}
          </p>

          {/* Author info & Social */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600 dark:border-emerald-700 shrink-0">
                <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{post.author.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{shareLabel}</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(getLocalizedText(post.title, locale))} - https://www.vermilionroutes.com/${locale}/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all font-medium shadow-sm flex items-center gap-1.5"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getLocalizedText(post.title, locale))}&url=https://www.vermilionroutes.com/${locale}/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all font-medium shadow-sm"
                title="Share on Twitter"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
          <Image
            src={post.imageUrl}
            alt={getLocalizedText(post.title, locale)}
            fill
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
            className="object-cover"
          />
        </div>

        {/* GEO & AI Direct Answer Capsule (Key Takeaways) */}
        {post.quickAnswer && (
          <aside
            aria-label={t.quickAnswerTitle}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-950/5 via-emerald-900/5 to-teal-950/5 dark:from-emerald-950/40 dark:via-zinc-900/60 dark:to-teal-950/30 border-2 border-emerald-500/30 shadow-lg space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.quickAnswerTitle}</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                Direct AI Travel Summary
              </span>
            </div>

            <p className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed font-serif">
              {getLocalizedText(post.quickAnswer.summary, locale)}
            </p>

            {/* Structured Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-900/10 dark:border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.bestSeason}</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-snug">
                  {getLocalizedText(post.quickAnswer.bestSeason, locale)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-900/10 dark:border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t.idealDuration}</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-snug">
                  {getLocalizedText(post.quickAnswer.idealDuration, locale)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-900/10 dark:border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t.activityLevel}</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-snug">
                  {getLocalizedText(post.quickAnswer.activityLevel, locale)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-900/10 dark:border-zinc-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{t.estimatedPrice}</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-bold leading-snug text-emerald-800 dark:text-emerald-300">
                  {getLocalizedText(post.quickAnswer.estimatedPrice, locale)}
                </p>
              </div>
            </div>

            {/* Key Highlight Pill */}
            <div className="flex items-start sm:items-center gap-2 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-zinc-800 dark:text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="font-semibold text-emerald-900 dark:text-emerald-300">{t.keyHighlight}: </strong>
                {getLocalizedText(post.quickAnswer.keyHighlight, locale)}
              </span>
            </div>
          </aside>
        )}

        {/* Article Body */}
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          {contentText.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            {/* Inline Markdown Image: ![caption](/path/to/image.jpg) */}
            if (trimmed.startsWith('![') && trimmed.includes('](')) {
              const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
              if (match) {
                const alt = match[1];
                const src = match[2];
                return (
                  <figure key={idx} className="my-8 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="relative h-64 sm:h-80 md:h-[400px] w-full">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        quality={95}
                        sizes="(max-width: 768px) 100vw, 850px"
                        className="object-cover"
                      />
                    </div>
                    {alt && (
                      <figcaption className="text-center text-xs text-zinc-500 dark:text-zinc-400 py-3 px-4 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-100 dark:border-zinc-800 font-medium">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }
            }

            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 dark:text-white pt-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-400 pt-4 pb-1">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              const lines = trimmed.split('\n');
              const headingText = lines[0].replace('#### ', '').trim();
              const restText = lines.slice(1).join('\n').trim();

              return (
                <div key={idx} className="space-y-3 pt-3">
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white pt-2 pb-1 border-l-4 border-emerald-600 pl-3">
                    {headingText}
                  </h4>
                  {restText && (
                    <p
                      className="text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed pl-3.5"
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(restText, locale)
                      }}
                    />
                  )}
                </div>
              );
            }
            if (trimmed.startsWith('* ')) {
              const items = trimmed.split('\n* ').map((i) => i.replace(/^\*\s*/, ''));
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside pl-2 text-zinc-700 dark:text-zinc-300">
                  {items.map((it, iIdx) => (
                    <li
                      key={iIdx}
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(it, locale)
                      }}
                    />
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              return (
                <div
                  key={idx}
                  className="space-y-2 pl-2 text-zinc-700 dark:text-zinc-300"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(trimmed.replace(/\n/g, '<br />'), locale)
                  }}
                />
              );
            }
            if (trimmed.startsWith('---')) {
              return <hr key={idx} className="border-zinc-200 dark:border-zinc-800 my-6" />;
            }
            return (
              <p
                key={idx}
                className="leading-relaxed font-normal text-zinc-600 dark:text-zinc-300"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(trimmed, locale)
                }}
              />
            );
          })}
        </div>

        {/* Article FAQ Section for GEO / AI Citation */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-sm">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 dark:text-white">
                  {t.faqsTitle}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Expert travel answers & verified destination planning insights
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-sm hover:border-emerald-500/30 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-serif flex items-start gap-2.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-sans font-extrabold text-sm">Q{fIdx + 1}.</span>
                    <span>{getLocalizedText(faq.question, locale)}</span>
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                    {getLocalizedText(faq.answer, locale)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 font-semibold">{t.topics}</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 font-medium shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Destination Photography Archive Interactive Button */}
        {(() => {
          const s = post.slug.toLowerCase();
          const destKey: DestinationKey =
            s.includes('galapagos') ? 'galapagos' :
            s.includes('quito') ? 'quito' :
            s.includes('volcano') ? 'cotopaxi' :
            s.includes('amazon') ? 'amazon' :
            s.includes('cuenca') ? 'cuenca' :
            s.includes('mindo') || s.includes('otavalo') || s.includes('poncho') ? 'otavalo' :
            'galapagos';
          return <BlogGalleryButton destination={destKey} locale={locale} />;
        })()}

        {/* Author Bio & E-E-A-T Verified Authority */}
        <BlogAuthorBio locale={locale} />

        {/* Interactive Blog Tour Booking Showcase */}
        <BlogTourBookingShowcase
          primaryTour={relatedTour}
          complementaryTours={complementaryTours}
          articleTitle={articleTitle}
          destinationName={destinationName}
          locale={locale}
        />

        {/* Lead Magnet: Free Packing Guide Download */}
        <LeadMagnetBanner />

      </div>
    </div>
  );
}
