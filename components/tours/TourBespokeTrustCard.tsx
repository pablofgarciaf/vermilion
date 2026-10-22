'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Compass, Sliders, MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/bookingTerms';
import { trackGenerateLead } from '@/lib/analytics/trackLead';

export interface TourBespokeTrustCardProps {
  locale: string;
  tourId: string;
  tourTitle: string;
}

const I18N = {
  badge: {
    es: 'Expedición Privada & Exclusiva',
    en: 'Private & Bespoke Journey',
    fr: 'Expédition Privée & Sur Mesure',
    de: 'Private & Maßgeschneiderte Reise',
    it: 'Spedizione Privata e su Misura',
    pt: 'Expedição Privada e Sob Medida',
    ja: '完全プライベート＆オーダーメイド',
    zh: '尊享私密 · 专属定制探险',
  },
  title: {
    es: 'Expedición 100% a tu Medida',
    en: '100% Bespoke Expedition',
    fr: 'Expédition 100% Sur Mesure',
    de: '100% Maßgeschneiderte Expedition',
    it: 'Spedizione 100% su Misura',
    pt: 'Expedição 100% Sob Medida',
    ja: '100% オーダーメイド遠征',
    zh: '100% 私人定制探险',
  },
  subtitle: {
    es: 'Adaptamos cada detalle a tus fechas, preferencias y ritmo personal.',
    en: 'Every detail can be customized to your dates, preferences, and personal travel pace.',
    fr: 'Chaque détail peut être adapté à vos dates, vos envies et votre rythme.',
    de: 'Jedes Detail wird an Ihre Reisedaten, Wünsche und Ihr Reisetempo angepasst.',
    it: 'Ogni dettaglio può essere adattato alle tue date, preferenze e ritmo.',
    pt: 'Cada detalhe pode ser adaptado às suas datas, preferências e ritmo de viagem.',
    ja: '旅行日程、ご希望、ペースに合わせて細部まで自由にカスタマイズ可能です。',
    zh: '可根据您的出行日期、个人偏好与节奏，量身定制每一处细节。',
  },
  p1Title: {
    es: 'Guía Naturalista Oficial Bilingüe',
    en: 'Official Certified Bilingual Naturalist Guide',
    fr: 'Guide Naturaliste Officiel Bilingue',
    de: 'Offizieller zweisprachiger Naturführer',
    it: 'Guida Naturalistica Ufficiale Bilingue',
    pt: 'Guia Naturalista Oficial Bilíngue',
    ja: '公認バイリンガル自然ガイド同行',
    zh: '官方持证双语自然专家向导',
  },
  p1Desc: {
    es: 'Acreditado por el Parque Nacional Galápagos y Ministerio de Turismo.',
    en: 'Accredited by Galápagos National Park & Ecuador Ministry of Tourism.',
    fr: 'Agréé par le Parc National des Galápagos et le Ministère du Tourisme.',
    de: 'Akkreditiert vom Galápagos-Nationalpark & Tourismusministerium.',
    it: 'Accreditato dal Parco Nazionale delle Galápagos e Ministero del Turismo.',
    pt: 'Acreditado pelo Parque Nacional Galápagos e Ministério do Turismo.',
    ja: 'ガラパゴス国立公園および観光省の正式認定ガイド。',
    zh: '由加拉帕戈斯国家公园及厄瓜多尔旅游部权威认证。',
  },
  p2Title: {
    es: 'Depósito 100% Protegido con Garantía Médica',
    en: '100% Protected Deposit with Medical Coverage',
    fr: 'Dépôt 100% Protégé avec Garantie Médicale',
    de: '100% geschützte Anzahlung mit medizinischer Garantie',
    it: 'Deposito Protetto al 100% con Garanzia Medica',
    pt: 'Depósito 100% Protegido com Garantia Médica',
    ja: '100%保護デポジット・医療保証付き',
    zh: '100% 定金保障与医疗安全保障',
  },
  p2Desc: {
    es: 'Reembolso íntegro o cambio de fechas sin penalidad por fuerza mayor.',
    en: 'Full refund or penalty-free date adjustments under eligible medical events.',
    fr: 'Remboursement intégral ou report de dates sans pénalité pour motif médical.',
    de: 'Volle Rückerstattung oder kostenfreie Terminänderung bei medizinischen Gründen.',
    it: 'Rimborso integrale o cambio date senza penale per cause mediche documentate.',
    pt: 'Reembolso integral ou alteração de datas sem penalidade por motivos médicos.',
    ja: '不測の医療事由による全額返金または無料の日程変更に対応。',
    zh: '符合医疗或不可抗力条件时，支持全额退款或免费改签出行日期。',
  },
  p3Title: {
    es: 'Diseño Flexible Día a Día',
    en: 'Flexible Day-by-Day Itinerary Tailoring',
    fr: 'Itinéraire Flexible Jour après Jour',
    de: 'Flexible Tagesgestaltung nach Maß',
    it: 'Itinerario Flessibile Giorno per Giorno',
    pt: 'Roteiro Flexível Dia a Dia',
    ja: '日々の旅程を柔軟にアレンジ可能',
    zh: '每日行程与活动随心灵活调整',
  },
  p3Desc: {
    es: 'Añade días de buceo, extensiones a la Amazonía o noches en Quito.',
    en: 'Add diving days, Amazon rainforest extensions, or colonial Quito nights.',
    fr: 'Ajoutez des journées plongée, une extension en Amazonie ou des nuits à Quito.',
    de: 'Fügen Sie Tauchtage, Amazonas-Verlängerungen oder Nächte in Quito hinzu.',
    it: 'Aggiungi immersioni, estensioni in Amazzonia o notti a Quito coloniale.',
    pt: 'Adicione dias de mergulho, extensões na Amazônia ou noites em Quito colonial.',
    ja: 'ダイビング、アマゾン熱帯雨林の延長、キト滞在を追加可能。',
    zh: '可增选潜水探索、亚马逊雨林延展线或基多殖民地古城深度宿留。',
  },
  ctaButton: {
    es: 'Personalizar con un Diseñador de Viajes',
    en: 'Customize with a Travel Designer',
    fr: 'Personnaliser avec un Créateur de Voyage',
    de: 'Mit einem Reise-Designer anpassen',
    it: 'Personalizza con un Travel Designer',
    pt: 'Personalizar com um Designer de Viagens',
    ja: 'トラベルデザイナーに相談する',
    zh: '联系旅行定制师专属定制',
  },
  whatsappMessage: {
    es: 'Hola Vermilion Routes, me interesa personalizar la expedición: "{tourTitle}". ¿Podrían asesorarme con un Travel Designer?',
    en: 'Hello Vermilion Routes, I would like to customize the expedition: "{tourTitle}". Could a Travel Designer assist me?',
    fr: 'Bonjour Vermilion Routes, je souhaite personnaliser l\'expédition : "{tourTitle}". Pourriez-vous me mettre en relation avec un créateur de voyage ?',
    de: 'Hallo Vermilion Routes, ich möchte die Expedition "{tourTitle}" anpassen. Kann mich ein Reise-Designer beraten?',
    it: 'Ciao Vermilion Routes, vorrei personalizzare la spedizione: "{tourTitle}". Potete mettermi in contatto con un Travel Designer?',
    pt: 'Olá Vermilion Routes, gostaria de personalizar a expedição: "{tourTitle}". Poderiam me colocar em contato com um Designer de Viagens?',
    ja: 'こんにちは、Vermilion Routes さん。「{tourTitle}」のツアーをカスタマイズしたいと考えています。トラベルデザイナーに相談できますか？',
    zh: '您好，Vermilion Routes！我想个性化定制这趟探险行程：“{tourTitle}”。可以为我安排一位旅行定制师吗？',
  },
} as const;

type Loc = keyof typeof I18N.badge;

export function TourBespokeTrustCard({ locale, tourId, tourTitle }: TourBespokeTrustCardProps) {
  const loc = (locale in I18N.badge ? locale : 'en') as Loc;

  const rawMsg = I18N.whatsappMessage[loc] || I18N.whatsappMessage.en;
  const msgText = rawMsg.replace('{tourTitle}', tourTitle);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msgText)}`;

  const handleClick = () => {
    trackGenerateLead({
      method: 'whatsapp',
      placement: 'bespoke_trust_card',
      item: tourId,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-900/20 bg-gradient-to-br from-emerald-950/[0.04] via-amber-500/[0.03] to-emerald-900/[0.02] dark:from-emerald-950/30 dark:via-zinc-900/60 dark:to-amber-950/20 p-6 sm:p-7 shadow-xs backdrop-blur-xs transition-all hover:border-emerald-700/30">
      {/* Glow decorativo sutil en esquina */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-400/10 dark:bg-amber-400/5 blur-2xl" />

      {/* Cabecera */}
      <div className="space-y-2 pb-5 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
          <Sparkles className="h-3 w-3 text-amber-500" />
          <span>{I18N.badge[loc] || I18N.badge.en}</span>
        </div>
        <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {I18N.title[loc] || I18N.title.en}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {I18N.subtitle[loc] || I18N.subtitle.en}
        </p>
      </div>

      {/* 3 Puntos Clave */}
      <div className="py-5 space-y-4">
        {/* Punto 1: Guía Naturalista */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Compass className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {I18N.p1Title[loc] || I18N.p1Title.en}
            </h4>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
              {I18N.p1Desc[loc] || I18N.p1Desc.en}
            </p>
          </div>
        </div>

        {/* Punto 2: Depósito Protegido */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {I18N.p2Title[loc] || I18N.p2Title.en}
            </h4>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
              {I18N.p2Desc[loc] || I18N.p2Desc.en}
            </p>
          </div>
        </div>

        {/* Punto 3: Diseño Flexible */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sliders className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {I18N.p3Title[loc] || I18N.p3Title.en}
            </h4>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
              {I18N.p3Desc[loc] || I18N.p3Desc.en}
            </p>
          </div>
        </div>
      </div>

      {/* Botón WhatsApp Concierge / Personalizar */}
      <div className="pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          data-lead-placement="bespoke_trust_card"
          className="group relative flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-600/30 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-950/20 transition-all hover:brightness-110 active:scale-98 cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 text-emerald-300" />
          <span>{I18N.ctaButton[loc] || I18N.ctaButton.en}</span>
          <ArrowRight className="h-4 w-4 text-emerald-300 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
