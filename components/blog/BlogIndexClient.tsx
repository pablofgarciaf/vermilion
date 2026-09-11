'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  Send,
} from 'lucide-react';

interface BlogIndexClientProps {
  hideHeader?: boolean;
}

export function BlogIndexClient({ hideHeader = false }: BlogIndexClientProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const affiliateId = searchParams.get('ref');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

  const i18nBlog: Record<string, {
    categories: Record<string, string>;
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    readArticle: string;
    read: string;
    clubBadge: string;
    clubTitle: string;
    clubDesc: string;
    emailPlaceholder: string;
    subscribeBtn: string;
    sendingBtn: string;
    successMsg: string;
    errorConn: string;
  }> = {
    es: {
      categories: {
        'All': 'Todos los Artículos',
        'Galapagos Expeditions': '🐢 Expediciones Galápagos',
        'Andean Adventures': '🏔️ Aventuras Andinas',
        'Amazon Rainforest': '🌿 Selva Amazónica',
        'Cultural Heritage': '🏛️ Patrimonio Cultural',
        'Heritage & Nature': '✨ Patrimonio y Naturaleza',
        'Biodiversity & Culture': '🦜 Biodiversidad y Cultura',
      },
      badge: 'Guías y Artículos de Viaje Vermilion',
      title: 'Expediciones, Naturaleza y Cultura',
      subtitle: 'Artículos editoriales, guías de expedición, calendarios de fauna y consejos de expertos para explorar Ecuador y las Islas Galápagos.',
      searchPlaceholder: 'Buscar guías y destinos...',
      readArticle: 'Leer Artículo',
      read: 'Leer',
      clubBadge: 'Club Exclusivo de Viajes Vermilion',
      clubTitle: 'Recibe Beneficios de Temporada y 10% OFF',
      clubDesc: 'Únete a más de 2.500 viajeros que reciben alertas de migración de fauna, ofertas de cruceros de lujo e itinerarios privados personalizados.',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      subscribeBtn: 'Suscribirme',
      sendingBtn: 'Enviando...',
      successMsg: '¡Gracias! Revisa tu bandeja de entrada para confirmar tu suscripción.',
      errorConn: 'Error de conexión. Inténtalo de nuevo.'
    },
    en: {
      categories: {
        'All': 'All Articles',
        'Galapagos Expeditions': '🐢 Galapagos Expeditions',
        'Andean Adventures': '🏔️ Andean Adventures',
        'Amazon Rainforest': '🌿 Amazon Rainforest',
        'Cultural Heritage': '🏛️ Cultural Heritage',
        'Heritage & Nature': '✨ Heritage & Nature',
        'Biodiversity & Culture': '🦜 Biodiversity & Culture',
      },
      badge: 'Vermilion Travel Insights & Guides',
      title: 'Journeys, Nature & Expert Guides',
      subtitle: 'Curated articles, expedition guides, wildlife calendars, and insider tips to explore Ecuador and the Galapagos Islands.',
      searchPlaceholder: 'Search guides and destinations...',
      readArticle: 'Read Article',
      read: 'Read',
      clubBadge: 'Exclusive Galapagos & Ecuador Travel Club',
      clubTitle: 'Get Seasonal Expedition Perks & 10% OFF',
      clubDesc: 'Join over 2,500 travelers receiving curated luxury cruise offers, wildlife migration alerts, and private itinerary inspirations.',
      emailPlaceholder: 'Enter your email address',
      subscribeBtn: 'Subscribe',
      sendingBtn: 'Sending...',
      successMsg: 'Thank you! Please check your inbox to confirm your subscription.',
      errorConn: 'Connection error. Please try again.'
    },
    fr: {
      categories: {
        'All': 'Tous les Articles',
        'Galapagos Expeditions': '🐢 Expéditions Galápagos',
        'Andean Adventures': '🏔️ Aventures Andines',
        'Amazon Rainforest': '🌿 Forêt Amazonienne',
        'Cultural Heritage': '🏛️ Patrimoine Culturel',
        'Heritage & Nature': '✨ Patrimoine et Nature',
        'Biodiversity & Culture': '🦜 Biodiversité et Culture',
      },
      badge: 'Guides et Conseils de Voyage Vermilion',
      title: 'Expéditions, Nature et Culture',
      subtitle: 'Guides éditoriaux, calendriers fauniques et conseils d’experts pour explorer l’Équateur et les îles Galápagos.',
      searchPlaceholder: 'Rechercher des guides et destinations...',
      readArticle: 'Lire l’Article',
      read: 'Lire',
      clubBadge: 'Club Exclusif de Voyage Vermilion',
      clubTitle: 'Bénéficiez d’Avantages de Saison et 10% de Réduction',
      clubDesc: 'Rejoignez plus de 2 500 voyageurs recevant des alertes fauniques, offres de croisières et inspirations d’itinéraires privés.',
      emailPlaceholder: 'Entrez votre adresse email',
      subscribeBtn: 'S’abonner',
      sendingBtn: 'Envoi en cours...',
      successMsg: 'Merci ! Veuillez vérifier votre boîte de réception pour confirmer votre abonnement.',
      errorConn: 'Erreur de connexion. Veuillez réessayer.'
    },
    de: {
      categories: {
        'All': 'Alle Artikel',
        'Galapagos Expeditions': '🐢 Galápagos-Expeditionen',
        'Andean Adventures': '🏔️ Anden-Abenteuer',
        'Amazon Rainforest': '🌿 Amazonas-Regenwald',
        'Cultural Heritage': '🏛️ Kulturelles Erbe',
        'Heritage & Nature': '✨ Natur und Kulturerbe',
        'Biodiversity & Culture': '🦜 Biodiversität und Kultur',
      },
      badge: 'Vermilion Reiseleitfäden & Einblicke',
      title: 'Expeditionen, Natur & Expertenwissen',
      subtitle: 'Redaktionelle Reiseführer, Tierbeobachtungskalender und Insidertipps für Ecuador und die Galápagos-Inseln.',
      searchPlaceholder: 'Reiseführer und Reiseziele suchen...',
      readArticle: 'Artikel Lesen',
      read: 'Lesen',
      clubBadge: 'Exklusiver Vermilion Reiseclub',
      clubTitle: 'Saisonale Vorteile & 10% Rabatt Sichern',
      clubDesc: 'Schließen Sie sich über 2.500 Reisenden an, die exklusive Kreuzfahrtangebote und private Reiseinspirationen erhalten.',
      emailPlaceholder: 'E-Mail-Adresse eingeben',
      subscribeBtn: 'Abonnieren',
      sendingBtn: 'Wird gesendet...',
      successMsg: 'Vielen Dank! Bitte prüfen Sie Ihr Postfach, um Ihre Anmeldung zu bestätigen.',
      errorConn: 'Verbindungsfehler. Bitte erneut versuchen.'
    },
    it: {
      categories: {
        'All': 'Tutti gli Articoli',
        'Galapagos Expeditions': '🐢 Spedizioni Galápagos',
        'Andean Adventures': '🏔️ Avventure Andine',
        'Amazon Rainforest': '🌿 Foresta Amazzonica',
        'Cultural Heritage': '🏛️ Patrimonio Culturale',
        'Heritage & Nature': '✨ Patrimonio e Natura',
        'Biodiversity & Culture': '🦜 Biodiversità e Cultura',
      },
      badge: 'Guide di Viaggio ed Approfondimenti Vermilion',
      title: 'Spedizioni, Natura e Cultura',
      subtitle: 'Articoli editoriali, guide alle spedizioni, calendari della fauna selvatica e consigli per esplorare Ecuador e Galápagos.',
      searchPlaceholder: 'Cerca guide e destinazioni...',
      readArticle: 'Leggi Articolo',
      read: 'Leggi',
      clubBadge: 'Club Esclusivo di Viaggio Vermilion',
      clubTitle: 'Ricevi Vantaggi di Stagione e 10% di Sconto',
      clubDesc: 'Unisciti a oltre 2.500 viaggiatori che ricevono offerte speciali, calendari faunistici e itinerari privati personalizzati.',
      emailPlaceholder: 'Inserisci il tuo indirizzo email',
      subscribeBtn: 'Iscriviti',
      sendingBtn: 'Invio in corso...',
      successMsg: 'Grazie! Controlla la tua casella di posta per confermare l’iscrizione.',
      errorConn: 'Errore di connessione. Riprova più tardi.'
    },
    pt: {
      categories: {
        'All': 'Todos os Artigos',
        'Galapagos Expeditions': '🐢 Expedições Galápagos',
        'Andean Adventures': '🏔️ Aventuras Andinas',
        'Amazon Rainforest': '🌿 Floresta Amazônica',
        'Cultural Heritage': '🏛️ Patrimônio Cultural',
        'Heritage & Nature': '✨ Patrimônio e Natureza',
        'Biodiversity & Culture': '🦜 Biodiversidade e Cultura',
      },
      badge: 'Guias e Artigos de Viagem Vermilion',
      title: 'Expedições, Natureza e Cultura',
      subtitle: 'Artigos editoriais, guias de expedição, calendários de fauna e dicas de especialistas para explorar o Equador e as Ilhas Galápagos.',
      searchPlaceholder: 'Buscar guias e destinos...',
      readArticle: 'Ler Artigo',
      read: 'Ler',
      clubBadge: 'Clube Exclusivo de Viagens Vermilion',
      clubTitle: 'Receba Benefícios de Temporada e 10% OFF',
      clubDesc: 'Junte-se a mais de 2.500 viajantes que recebem ofertas de cruzeiros de luxo, alertas de fauna e roteiros privativos personalizados.',
      emailPlaceholder: 'Digite seu e-mail',
      subscribeBtn: 'Inscrever-se',
      sendingBtn: 'Enviando...',
      successMsg: 'Obrigado! Verifique sua caixa de entrada para confirmar sua inscrição.',
      errorConn: 'Erro de conexão. Tente novamente.'
    },
    ja: {
      categories: {
        'All': 'すべての記事',
        'Galapagos Expeditions': '🐢 ガラパゴス遠征',
        'Andean Adventures': '🏔️ アンデス冒険の旅',
        'Amazon Rainforest': '🌿 アマゾン熱帯雨林',
        'Cultural Heritage': '🏛️ 文化遺産と歴史',
        'Heritage & Nature': '✨ 世界遺産と大自然',
        'Biodiversity & Culture': '🦜 生物多様性と文化',
      },
      badge: 'Vermilion 旅のインサイト＆ガイド',
      title: '大自然、探検、そしてアンデス文化',
      subtitle: 'エクアドル本土とガラパゴス諸島を巡るための、編集部特選ガイド、野生動物カレンダー、専門家のアドバイス。',
      searchPlaceholder: 'ガイドや目的地を検索...',
      readArticle: '記事を読む',
      read: '読む',
      clubBadge: 'Vermilion メンバーズ・トラベルクラブ',
      clubTitle: '季節限定の特典＆10%OFFクーポンをお届け',
      clubDesc: '2,500名以上の旅行者が購読中。野生動物の移動シーズン情報や豪華クルーズの特別オファーをお届けします。',
      emailPlaceholder: 'メールアドレスを入力',
      subscribeBtn: '無料登録する',
      sendingBtn: '送信中...',
      successMsg: 'ご登録ありがとうございます！確認メールを受信トレイでお確かめください。',
      errorConn: '接続エラーが発生しました。もう一度お試しください。'
    },
    zh: {
      categories: {
        'All': '所有文章',
        'Galapagos Expeditions': '🐢 加拉帕戈斯群岛探险',
        'Andean Adventures': '🏔️ 安第斯山脉冒险',
        'Amazon Rainforest': '🌿 亚马逊原始雨林',
        'Cultural Heritage': '🏛️ 世界文化遗产',
        'Heritage & Nature': '✨ 遗产与自然风光',
        'Biodiversity & Culture': '🦜 生物多样性与传统',
      },
      badge: 'Vermilion 独家旅行指南与深度解析',
      title: '自然探索、秘境探险与南美文化',
      subtitle: '专为探索厄瓜多尔与加拉帕戈斯群岛打造的专业旅行指南、野生动物日历及资深向导建议。',
      searchPlaceholder: '搜索旅行指南与目的地...',
      readArticle: '阅读全文',
      read: '阅读',
      clubBadge: 'Vermilion 尊贵旅行家俱乐部',
      clubTitle: '获取当季探险专属特权及 9 折礼遇',
      clubDesc: '加入超过 2,500 位高端旅行者社群，尊享野生动物迁徙快讯、顶级游轮特惠及私人订制灵感。',
      emailPlaceholder: '请输入您的电子邮箱',
      subscribeBtn: '立即订阅',
      sendingBtn: '正在提交...',
      successMsg: '感谢订阅！请查看您的收件箱以确认订阅信息。',
      errorConn: '网络连接错误，请稍后重试。'
    }
  };

  const t = i18nBlog[locale] || i18nBlog['en'];

  const categories = [
    { id: 'All', label: t.categories['All'] || 'All Articles' },
    { id: 'Galapagos Expeditions', label: t.categories['Galapagos Expeditions'] || '🐢 Galapagos Expeditions' },
    { id: 'Andean Adventures', label: t.categories['Andean Adventures'] || '🏔️ Andean Adventures' },
    { id: 'Amazon Rainforest', label: t.categories['Amazon Rainforest'] || '🌿 Amazon Rainforest' },
    { id: 'Cultural Heritage', label: t.categories['Cultural Heritage'] || '🏛️ Cultural Heritage' },
    { id: 'Heritage & Nature', label: t.categories['Heritage & Nature'] || '✨ Heritage & Nature' },
    { id: 'Biodiversity & Culture', label: t.categories['Biodiversity & Culture'] || '🦜 Biodiversity & Culture' },
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const postCategory = typeof post.category === 'object' ? post.category.en : post.category;
    const postTitle = (typeof post.title === 'object' ? post.title[locale as keyof typeof post.title] || post.title.en : post.title).toLowerCase();
    const postExcerpt = (typeof post.excerpt === 'object' ? post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en : post.excerpt).toLowerCase();

    const matchesCategory = selectedCategory === 'All' || postCategory === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      postTitle.includes(searchQuery.toLowerCase()) ||
      postExcerpt.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const gridPosts = filteredPosts
    .filter((post) => post.id !== featuredPost.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const content = (
    <div className="space-y-8">
      {!hideHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-zinc-900 dark:text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      )}

      {/* Featured Hero Article */}
      {featuredPost && (
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 dark:border-emerald-900/40 bg-white dark:bg-zinc-900/90 shadow-lg group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            <div className="lg:col-span-7 relative h-56 sm:h-64 lg:h-[320px] overflow-hidden">
                <Image
                  src={featuredPost.imageUrl}
                  alt={getLocalizedText(featuredPost.title, locale)}
                  fill
                  quality={95}
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
              </div>
              <div className="lg:col-span-5 p-5 sm:p-6 lg:p-8 space-y-3">
                <div className="flex items-center gap-3 text-[10px] sm:text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider">
                    {getLocalizedText(featuredPost.category, locale)}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                  <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                    {getLocalizedText(featuredPost.title, locale)}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                  {getLocalizedText(featuredPost.subtitle || featuredPost.excerpt, locale)}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-600/40">
                      <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{featuredPost.author.name}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{featuredPost.publishedAt}</p>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/blog/${featuredPost.slug}`}
                    aria-label={`${t.readArticle}: ${getLocalizedText(featuredPost.title, locale)}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <span>{t.readArticle}</span>
                    <span className="sr-only">: {getLocalizedText(featuredPost.title, locale)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-emerald-500 dark:hover:border-emerald-600 rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={getLocalizedText(post.title, locale)}
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300 shadow-sm">
                  {getLocalizedText(post.category, locale)}
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {post.publishedAt}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-lg text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {getLocalizedText(post.title, locale)}
                    </Link>
                  </h2>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                    {getLocalizedText(post.excerpt, locale)}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-emerald-600/30">
                      <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium text-[11px]">{post.author.name}</span>
                  </div>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    aria-label={`${t.read}: ${getLocalizedText(post.title, locale)}`}
                    className="text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 font-semibold flex items-center gap-1 hover:underline active:scale-95 transition-all"
                  >
                    <span>{t.read}</span>
                    <span className="sr-only">: {getLocalizedText(post.title, locale)}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter & Club CTA Box */}
        <div className="bg-gradient-to-r from-emerald-900 via-zinc-900 to-zinc-950 border border-emerald-700/60 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              {t.clubBadge}
            </span>
            <p className="text-2xl sm:text-4xl font-bold font-serif text-white">
              {t.clubTitle}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t.clubDesc}
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email) return;
              setLoading(true);
              setStatusMessage({ type: '', text: '' });
              try {
                const res = await fetch('/api/leads/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, affiliateId }),
                });

                const data = await res.json();

                if (res.ok) {
                  setStatusMessage({
                    type: 'success',
                    text: t.successMsg,
                  });
                  setEmail('');
                } else {
                  setStatusMessage({ type: 'error', text: data.error || 'Error' });
                }
              } catch {
                setStatusMessage({ type: 'error', text: t.errorConn });
              } finally {
                setLoading(false);
              }
            }}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 w-full flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
              />
              {statusMessage.text && (
                <span className={`text-[10px] sm:text-xs font-semibold px-2 ${statusMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {statusMessage.text}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto h-fit px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <span>{loading ? t.sendingBtn : t.subscribeBtn}</span>
              {!loading && <Send className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>
      </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px] pt-[146px] pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {content}
      </div>
    </div>
  );
}
