import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, MapPin, Compass, MessageCircle, CheckCircle2 } from 'lucide-react';

interface BlogAuthorBioProps {
  locale?: string;
}

const AUTHOR_I18N: Record<string, {
  aboutAuthor: string;
  role: string;
  agency: string;
  bio: string;
  badgeLicense: string;
  badgeExperience: string;
  badgeTripAdvisor: string;
  chatPrompt: string;
}> = {
  es: {
    aboutAuthor: 'Sobre el Autor & Diseñador de la Expedición',
    role: 'Guía Naturalista Líder & Director de Itinerarios',
    agency: 'Vermilion Routes · Quito & Galápagos, Ecuador',
    bio: 'Nacido en los Andes y con más de 12 años liderando expediciones privadas por las Islas Galápagos, la selva amazónica y las cumbres volcánicas de Ecuador. Especialista en biología de campo, avistamiento de fauna endémica y logística de expedición personalizada con certificación oficial del Ministerio de Turismo del Ecuador.',
    badgeLicense: 'Licencia Oficial MinTur Reg. 1793215456001',
    badgeExperience: '12+ Años de Experiencia en Campo',
    badgeTripAdvisor: '5.0/5.0 en TripAdvisor · Travelers\' Choice 2026',
    chatPrompt: 'Consultar directamente con Jhayro por WhatsApp',
  },
  en: {
    aboutAuthor: 'About the Author & Expedition Designer',
    role: 'Lead Naturalist Guide & Head of Expedition Design',
    agency: 'Vermilion Routes · Quito & Galapagos, Ecuador',
    bio: 'Born in the Ecuadorian Andes with over 12 years guiding private expeditions across the Galapagos Islands, the Amazon rainforest, and high-altitude volcanic trails. Specialized in field biology, endemic wildlife interpretation, and bespoke itinerary planning, officially certified by the Ministry of Tourism of Ecuador.',
    badgeLicense: 'Official MinTur Guide Reg. 1793215456001',
    badgeExperience: '12+ Years Field & Expedition Experience',
    badgeTripAdvisor: '5.0/5.0 on TripAdvisor · Travelers\' Choice 2026',
    chatPrompt: 'Ask Jhayro Directly on WhatsApp',
  },
  fr: {
    aboutAuthor: 'À propos de l’Auteur & Concepteur d’Expédition',
    role: 'Guide Naturaliste Principal & Directeur des Itinéraires',
    agency: 'Vermilion Routes · Quito & Galápagos, Équateur',
    bio: 'Natif des Andes équatoriennes avec plus de 12 ans d’expérience dans la conduite d’expéditions privées aux Galápagos, en Amazonie et sur l’Avenue des Volcans. Spécialiste de la faune endémique et de la logistique sur mesure, certifié par le Ministère du Tourisme de l’Équateur.',
    badgeLicense: 'Guide Agréé Ministère du Tourisme Équateur',
    badgeExperience: 'Plus de 12 ans d’expérience sur le terrain',
    badgeTripAdvisor: '5.0/5.0 sur TripAdvisor · Travelers\' Choice 2026',
    chatPrompt: 'Contacter Jhayro directement sur WhatsApp',
  },
  de: {
    aboutAuthor: 'Über den Autor & Expeditionsleiter',
    role: 'Leitender Naturführer & Leiter Expeditionsdesign',
    agency: 'Vermilion Routes · Quito & Galapagos, Ecuador',
    bio: 'Geboren in den ecuadorianischen Anden mit über 12 Jahren Erfahrung in der Führung privater Expeditionen auf den Galapagosinseln, im Amazonas-Regenwald und auf vulkanischen Höhenwegen. Spezialist für endemische Tierwelt und maßgeschneiderte Reiselogistik, lizenziert vom Tourismusministerium Ecuadors.',
    badgeLicense: 'Offizielle MinTur-Lizenz Reg. 1793215456001',
    badgeExperience: '12+ Jahre Felderfahrung in Ecuador',
    badgeTripAdvisor: '5.0/5.0 auf TripAdvisor · Travelers\' Choice 2026',
    chatPrompt: 'Jhayro direkt auf WhatsApp kontaktieren',
  },
  it: {
    aboutAuthor: 'Informazioni sull\'Autore & Expedition Designer',
    role: 'Guida Naturalistica Principale & Responsabile Itinerari',
    agency: 'Vermilion Routes · Quito & Galapagos, Ecuador',
    bio: 'Nato nelle Ande ecuadoriane con oltre 12 anni di esperienza nella guida di spedizioni private alle Isole Galapagos, nella foresta amazzonica e tra le vette vulcaniche. Specialista in fauna endemica e pianificazione su misura, ufficialmente certificato dal Ministero del Turismo dell\'Ecuador.',
    badgeLicense: 'Guida Ufficiale MinTur Reg. 1793215456001',
    badgeExperience: '12+ Anni di Esperienza sul Campo',
    badgeTripAdvisor: '5.0/5.0 su TripAdvisor · Travelers\' Choice 2026',
    chatPrompt: 'Parla direttamente con Jhayro su WhatsApp',
  },
  pt: {
    aboutAuthor: 'Sobre o Autor & Designer da Expedição',
    role: 'Guia Naturalista Líder & Diretor de Expedições',
    agency: 'Vermilion Routes · Quito & Galápagos, Equador',
    bio: 'Nascido nos Andes equatorianos com mais de 12 anos liderando expedições privadas pelas Ilhas Galápagos, Amazônia e vulcões andinos. Especialista em vida selvagem endêmica e roteiros personalizados, certificado oficialmente pelo Ministério do Turismo do Equador.',
    badgeLicense: 'Guia Oficial MinTur Reg. 1793215456001',
    badgeExperience: '12+ Anos de Experiência em Campo',
    badgeTripAdvisor: '5.0/5.0 no TripAdvisor · Travelers\' Choice 2026',
    chatPrompt: 'Falar diretamente com Jhayro pelo WhatsApp',
  },
  ja: {
    aboutAuthor: '著者および遠征デザイナーについて',
    role: '主任ナチュラリストガイド兼ツアー企画ディレクター',
    agency: 'Vermilion Routes · エクアドル・キト＆ガラパゴス',
    bio: 'エクアドルのアンデス山脈出身。ガラパゴス諸島、アマゾン熱帯雨林、アンデス火山ルートにおいて12年以上のプライベート遠征ガイド実績を持つ。固有種の生態系と特注プライベートツアーの専門家であり、エクアドル観光省公認ガイド（登録番号 1793215456001）。',
    badgeLicense: 'エクアドル観光省公認ガイドライセンス',
    badgeExperience: '現地フィールドガイド歴12年以上',
    badgeTripAdvisor: 'TripAdvisor評価 5.0/5.0 · トラベラーズチョイス2026',
    chatPrompt: 'WhatsAppでJhayroに直接相談する',
  },
  zh: {
    aboutAuthor: '关于作者与探险行程设计师',
    role: '首席自然学家向导兼探险规划总监',
    agency: 'Vermilion Routes · 厄瓜多尔基多与加拉帕戈斯',
    bio: '出生于厄瓜多尔安第斯山区，拥有超过12年在加拉帕戈斯群岛、亚马逊雨林和火山高原带领私人探险团队的资深经验。专精特有野生动物生物学与定制奢享旅行规划，持有厄瓜多尔旅游部官方国家向导执照（注册号：1793215456001）。',
    badgeLicense: '厄瓜多尔旅游部官方认证向导执照',
    badgeExperience: '12年以上资深野外向导经验',
    badgeTripAdvisor: '猫途鹰 TripAdvisor 5.0满分 · 2026旅行者之选',
    chatPrompt: '通过 WhatsApp 直接咨询 Jhayro',
  },
};

export function BlogAuthorBio({ locale = 'en' }: BlogAuthorBioProps) {
  const t = AUTHOR_I18N[locale] || AUTHOR_I18N['en'];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-50 via-white to-emerald-50/30 dark:from-[#0B1A12] dark:via-[#0E2016] dark:to-[#07130C] border border-stone-200/80 dark:border-emerald-800/30 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar with Verified Badge */}
        <div className="relative shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-600 dark:border-emerald-500 shadow-md">
            <Image quality={85}
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85"
              alt="Jhayro Ludeña - Lead Naturalist Guide & Founder"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div
            className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-600 text-white shadow-lg border-2 border-white dark:border-[#0B1A12]"
            title="Verified Official MinTur Naturalist Guide"
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Name, Role & Agency */}
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800/60">
              {t.aboutAuthor}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white">
            Jhayro Ludeña
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <Compass className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{t.role}</span>
          </p>

          <p className="text-xs text-stone-500 dark:text-zinc-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-zinc-500" />
            <span>{t.agency}</span>
          </p>
        </div>
      </div>

      {/* Author Bio Body */}
      <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 leading-relaxed font-light border-l-2 border-emerald-600/40 pl-4 italic">
        &ldquo;{t.bio}&rdquo;
      </p>

      {/* E-E-A-T Verified Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-stone-200 dark:border-white/5 text-[11px] text-stone-700 dark:text-zinc-300 shadow-sm font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{t.badgeLicense}</span>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-stone-200 dark:border-white/5 text-[11px] text-stone-700 dark:text-zinc-300 shadow-sm font-medium">
          <Award className="w-4 h-4 shrink-0 text-amber-500" />
          <span>{t.badgeExperience}</span>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-stone-200 dark:border-white/5 text-[11px] text-stone-700 dark:text-zinc-300 shadow-sm font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{t.badgeTripAdvisor}</span>
        </div>
      </div>

      {/* WhatsApp Concierge direct contact */}
      <div className="pt-2 flex justify-start">
        <a
          href="https://wa.me/593960039156?text=Hola%20Jhayro,%20leí%20tu%20artículo%20en%20Vermilion%20Routes%20y%20deseo%20planificar%20una%20expedición%20a%20medida."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-[1.01] active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.chatPrompt}</span>
        </a>
      </div>
    </div>
  );
}
