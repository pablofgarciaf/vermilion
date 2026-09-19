'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { BookOpen, ArrowRight, Clock, Play, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';

const VIDEO_GUIDES = [
  {
    id: 'YF8ZJuV3NGo',
    title: {
      en: "Ecuador's Amazon Adventure: Exploring the Oriente",
      es: 'Aventura en la Amazonía Ecuatoriana: Explorando el Oriente',
      fr: "Aventure en Amazonie Équatorienne: Exploration de l'Oriente",
      de: 'Ecuadors Amazonas-Abenteuer: Erkundung des Oriente',
      it: "Avventura nell'Amazzonia Ecuadoriana: Alla Scoperta dell'Oriente",
      pt: 'Aventura na Amazônia Equatoriana: Explorando o Oriente',
      ja: 'エクアドル・アマゾン探検：オリエンテの大自然へ',
      zh: '厄瓜多尔亚马逊探险：走进东部雨林秘境'
    },
    desc: {
      en: 'Rainforest paradise rich in biodiversity and ancestral Kichwa culture.',
      es: 'Paraíso de selva virgen con alta biodiversidad y cultura ancestral.',
      fr: 'Paradis tropical riche en biodiversité et en culture ancestrale Kichwa.',
      de: 'Regenwaldparadies reich an Artenvielfalt und Kichwa-Kultur.',
      it: 'Paradiso tropicale ricco di biodiversità e cultura Kichwa.',
      pt: 'Paraíso de floresta tropical rico em biodiversidade e cultura Kichwa.',
      ja: '豊かな生物多様性と先住民族キチュワの文化が息づく熱帯雨林。',
      zh: '生物多样性极为丰富的雨林天堂与古老基丘亚原住民文化。'
    },
    thumb: 'https://img.youtube.com/vi/YF8ZJuV3NGo/maxresdefault.jpg'
  },
  {
    id: 'AYLgFKlpddM',
    title: {
      en: "Quilotoa Crater Lake: Ecuador's Hidden Gem",
      es: 'Laguna del Quilotoa: La Joya Esmeralda de los Andes',
      fr: 'Lagune de Quilotoa: Le Joyau Émeraude des Andes',
      de: 'Quilotoa-Kratersee: Ecuadors verstecktes Juwel',
      it: 'Laguna di Quilotoa: Il Gioiello di Smeraldo delle Ande',
      pt: 'Lagoa de Quilotoa: A Joia Esmeralda dos Andes',
      ja: 'キロトア火口湖：アンデスのエメラルドの宝石',
      zh: '基洛托阿火山口湖：安第斯山脉的绿宝石之钻'
    },
    desc: {
      en: 'Majestic turquoise volcanic caldera nestled at 3,500 meters altitude.',
      es: 'Impresionante caldera volcánica de aguas turquesa a 3.500m.',
      fr: 'Majestueuse caldeira volcanique turquoise perchée à 3 500 mètres.',
      de: 'Majestätische türkisfarbene Vulkancaldera auf 3.500 Metern Höhe.',
      it: 'Maestosa caldera vulcanica turchese situata a 3.500 metri di altitudine.',
      pt: 'Majestosa caldeira vulcânica turquesa a 3.500 metros de altitude.',
      ja: '標高3,500メートルに佇む神秘的なエメラルドグリーンのカルデラ湖。',
      zh: '海拔3500米之巅，宛如碧玉般令人震撼的绿松石色火山口湖。'
    },
    thumb: 'https://img.youtube.com/vi/AYLgFKlpddM/maxresdefault.jpg'
  },
  {
    id: 'jkO62poRZQo',
    title: {
      en: 'Birdwatching Paradise: Exploring Galapagos Birds',
      es: 'Paraíso de Aves: Explorando las Especies de Galápagos',
      fr: 'Paradis Ornithologique: Les Oiseaux des Galápagos',
      de: 'Vogelparadies: Erkundung der Galapagos-Vögel',
      it: 'Paradiso del Birdwatching: Gli Uccelli delle Galapagos',
      pt: 'Paraíso dos Pássaros: Explorando as Aves de Galápagos',
      ja: '野鳥観察の楽園：ガラパゴス固有の鳥類探求',
      zh: '观鸟者的天堂：探寻加拉帕戈斯珍稀海鸟'
    },
    desc: {
      en: 'Blue-footed boobies, Darwin finches, and flightless cormorants.',
      es: 'Piqueros de patas azules, pinzones de Darwin y cormoranes no voladores.',
      fr: 'Fous à pieds bleus, pinsons de Darwin et cormorans aptères.',
      de: 'Blaufußtölpel, Darwin-Finken und flugunfähige Kormorane.',
      it: 'Sule piediazzurri, fringuelli di Darwin e cormorani inabili al volo.',
      pt: 'Atobás-de-patas-azuis, tentilhões de Darwin e cormorões.',
      ja: 'アオアシカツオドリ、ダーウィンフィンチ、飛べないウの野生観察。',
      zh: '近距离观赏蓝脚鲣鸟、达尔文雀与不会飞的弱翅鸬鹚。'
    },
    thumb: 'https://img.youtube.com/vi/jkO62poRZQo/maxresdefault.jpg'
  },
  {
    id: 'u0klmckz7fg',
    title: {
      en: 'The Wonderful Ecuador & Galapagos Routes',
      es: 'El Maravilloso Ecuador y Rutas de Galápagos',
      fr: "Les Merveilleuses Routes de l'Équateur et des Galápagos",
      de: 'Die wunderbaren Routen Ecuadors & Galapagos',
      it: "Le Meravigliose Rotte dell'Ecuador e delle Galapagos",
      pt: 'As Maravilhosas Rotas do Equador e Galápagos',
      ja: 'エクアドルとガラパゴス諸島の素晴らしい探検ルート',
      zh: '探索奇迹：厄瓜多尔与加拉帕戈斯非凡之旅'
    },
    desc: {
      en: 'Boutique tailor-made expeditions designed by Vermilion Routes.',
      es: 'Expediciones privadas y a medida diseñadas por Vermilion Routes.',
      fr: 'Expéditions privées et sur mesure conçues par Vermilion Routes.',
      de: 'Maßgeschneiderte Boutique-Expeditionen von Vermilion Routes.',
      it: 'Spedizioni boutique su misura create da Vermilion Routes.',
      pt: 'Expedições boutique sob medida criadas pela Vermilion Routes.',
      ja: 'Vermilion Routesがデザインする完全プライベート＆オーダーメイド遠征。',
      zh: 'Vermilion Routes 独家倾心设计的尊享定制私享探险。'
    },
    thumb: 'https://img.youtube.com/vi/u0klmckz7fg/maxresdefault.jpg'
  }
];

const SECTION_TRANSLATIONS: Record<string, Record<string, string>> = {
  badge: {
    es: "Revista de Viajes Vermilion & Notas de Campo",
    en: "Vermilion Travel Magazine & Field Notes",
    fr: "Magazine de Voyage Vermilion & Carnets de Route",
    de: "Vermilion Reisemagazin & Feldnotizen",
    it: "Vermilion Travel Magazine & Note di Viaggio",
    pt: "Revista de Viagens Vermilion & Notas de Campo",
    ja: "Vermilion トラベルマガジン＆現地ノート",
    zh: "Vermilion 探险旅行杂志与前线笔记"
  },
  title: {
    es: "Guías, Cultura y Experiencias de Viaje",
    en: "Travel Guides, Wildlife & Cultural Stories",
    fr: "Guides de Voyage, Faune Sauvage & Récits Culturels",
    de: "Reiseführer, Tierwelt & Kulturelle Geschichten",
    it: "Guide di Viaggio, Fauna Selvatica & Racconti Culturali",
    pt: "Guias de Viagem, Vida Selvagem & Histórias Culturais",
    ja: "旅行ガイド、野生動物と文化のストーリー",
    zh: "旅行探险指南、野生动物与文化故事"
  },
  subtitle: {
    es: "«Operador turístico directo en Ecuador, diseñamos viajes extraordinarios con la mejor calidad de servicio para vivir experiencias inolvidables».",
    en: "«Direct tour operator based in Ecuador, we design extraordinary trips with the best quality of service to live unforgettable experiences».",
    fr: "«Tour-opérateur direct en Équateur, nous concevons des voyages extraordinaires avec un service d'excellence pour des expériences inoubliables».",
    de: "«Direkter Reiseveranstalter in Ecuador: Wir gestalten außergewöhnliche Reisen mit bestem Service für unvergessliche Erlebnisse».",
    it: "«Tour operator diretto in Ecuador, progettiamo viaggi straordinari con la massima qualità di servizio per esperienze indimenticabili».",
    pt: "«Operador turístico direto no Equador, desenhamos viagens extraordinárias com a melhor qualidade de serviço para experiências inesquecíveis».",
    ja: "«エクアドル現地直営オペレーターとして、最高品質のサービスで心に残る特別なオーダーメイドの旅をデザインします»。",
    zh: "«厄瓜多尔本土专业直营旅行社，以卓越的服务品质匠心打造非凡难忘的旅行体验»。"
  },
  exploreAll: {
    es: "Ver Todos los Artículos",
    en: "Explore All Articles",
    fr: "Explorer Tous les Articles",
    de: "Alle Artikel Entdecken",
    it: "Esplora Tutti gli Articoli",
    pt: "Explorar Todos os Artigos",
    ja: "すべての記事を見る",
    zh: "探索所有专题文章"
  },
  readGuide: {
    es: "Leer artículo",
    en: "Read full guide",
    fr: "Lire le guide complet",
    de: "Vollständigen Leitfaden lesen",
    it: "Leggi la guida completa",
    pt: "Ler guia completo",
    ja: "記事全文を読む",
    zh: "阅读完整指南"
  },
  videoBadge: {
    es: "Videos de Expedición",
    en: "Expedition Videos",
    fr: "Vidéos d'Expédition",
    de: "Expeditions-Videos",
    it: "Video delle Spedizioni",
    pt: "Vídeos de Expedição",
    ja: "遠征ハイライト動画",
    zh: "高清实景探险视频"
  },
  videoHeading: {
    es: "Galápagos & Ecuador en Alta Definición",
    en: "Galapagos & Ecuador in Cinematic HD",
    fr: "Galápagos & Équateur en Haute Définition",
    de: "Galapagos & Ecuador in Kino-HD",
    it: "Galapagos ed Ecuador in Alta Definizione",
    pt: "Galápagos & Equador em Alta Definição",
    ja: "ガラパゴス＆エクアドル 映画級ハイビジョン映像",
    zh: "加拉帕戈斯与厄瓜多尔超清电影级全景"
  },
  watchAll: {
    es: "Ver galería completa",
    en: "Watch all videos",
    fr: "Voir toutes les vidéos",
    de: "Alle Videos ansehen",
    it: "Guarda tutti i video",
    pt: "Assistir a todos os vídeos",
    ja: "すべての動画を見る",
    zh: "观看全部实景影片"
  }
};

export function HomeBlogSection() {
  const locale = useLocale();
  const featuredPosts = BLOG_POSTS.slice(0, 3);
  const tSec = (key: string) => SECTION_TRANSLATIONS[key]?.[locale] || SECTION_TRANSLATIONS[key]?.['en'] || '';

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-12">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{tSec('badge')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
            {tSec('title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {tSec('subtitle')}
          </p>
        </div>

        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 self-start md:self-auto"
        >
          <span>{tSec('exploreAll')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Featured Blog Articles Cards */}
      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
        {featuredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/${locale}/blog/${post.slug}`}
            aria-label={`${tSec('readGuide')}: ${getLocalizedText(post.title, locale)}`}
            className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center"
          >
            <div className="relative h-48 sm:h-52 w-full overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={getLocalizedText(post.title, locale)}
                fill
                quality={95}
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider font-semibold text-emerald-300">
                {getLocalizedText(post.category, locale)}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.publishedAt}</span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                  {getLocalizedText(post.title, locale)}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
                  {getLocalizedText(post.excerpt, locale)}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-2 group-hover:translate-x-1 transition-transform">
                <span>{tSec('readGuide')}</span>
                <span className="sr-only">: {getLocalizedText(post.title, locale)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Video Expedition Gallery Preview */}
      <div className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{tSec('videoBadge')}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {tSec('videoHeading')}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIDEO_GUIDES.map((vid, idx) => (
            <a
              key={vid.id}
              href={`https://www.youtube.com/watch?v=${vid.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-emerald-500 transition-all flex-col shadow-lg ${idx >= 2 ? 'hidden sm:flex' : 'flex'}`}
            >
              <div className="relative h-36 w-full overflow-hidden">
                <Image quality={85}
                  src={vid.thumb}
                  alt={getLocalizedText(vid.title, locale)}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className="font-sans font-bold text-xs text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {getLocalizedText(vid.title, locale)}
                </h4>
                <p className="text-[11px] text-zinc-300 line-clamp-2">
                  {getLocalizedText(vid.desc, locale)}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="sm:hidden pt-2 flex justify-center border-t border-zinc-800">
          <a
            href="https://www.youtube.com/@VermilionSouthAmericanRoutes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-600/50 bg-emerald-950/40 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <span>{tSec('watchAll')}</span>
            <Play className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
}
