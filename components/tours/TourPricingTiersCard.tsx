'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Sparkles, Check, ShieldCheck, Hotel, Star, Compass, Info, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

interface TourPricingTiersCardProps {
  tour: Tour;
}

const TIERS_CARD_I18N: Record<string, {
  badgeTiers: string;
  badgePrivate: string;
  comfort: string;
  premiumVip: string;
  from: string;
  perGuest: string;
  clubHotel: string;
  clubBreakfast: string;
  clubGuide: string;
  btnClub: string;
  vipHotel: string;
  vipBreakfast: string;
  vipConcierge: string;
  btnVip: string;
  noteTitle: string;
  noteDesc: string;
}> = {
  es: {
    badgeTiers: 'Tarifas y Categorías de Hospedaje',
    badgePrivate: 'Viajes 100% Privados & A Medida',
    comfort: 'Confort',
    premiumVip: 'Premium VIP',
    from: 'Desde',
    perGuest: 'persona',
    clubHotel: 'Hotelería 3★ Boutique certificada',
    clubBreakfast: 'Desayuno continental diario',
    clubGuide: 'Guía naturalista privado y logística terrestre',
    btnClub: 'Reservar Vermilion Club',
    vipHotel: 'Hotelería 4★ Boutique de confort superior',
    vipBreakfast: 'Desayunos buffet gourmet e itinerario flexible',
    vipConcierge: 'Asistencia Concierge 24/7 & Amenidades VIP',
    btnVip: 'Reservar Vermilion VIP',
    noteTitle: '💡 Nota Importante de Ocupación Doble & Viajeros Solo:',
    noteDesc: 'Las tarifas mostradas corresponden al precio por persona basado en ocupación doble (mínimo 2 viajeros por expedición privada). Para reservas de 1 solo viajero individual (solitario), se aplica un recargo del 50% sobre la tarifa base.',
  },
  en: {
    badgeTiers: 'Expedition Tiers & Pricing Options',
    badgePrivate: '100% Private & Custom Tailored',
    comfort: 'Comfort',
    premiumVip: 'Premium VIP',
    from: 'Starting From',
    perGuest: 'guest',
    clubHotel: 'Certified 3★ Boutique Hotels',
    clubBreakfast: 'Daily continental breakfast',
    clubGuide: 'Private naturalist guide & land logistics',
    btnClub: 'Book Vermilion Club',
    vipHotel: 'Superior 4★ Boutique Hotels',
    vipBreakfast: 'Gourmet buffet breakfast & flexible pace',
    vipConcierge: '24/7 Concierge Support & VIP Amenities',
    btnVip: 'Book Vermilion VIP',
    noteTitle: '💡 Important Note on Double Occupancy & Solo Travelers:',
    noteDesc: 'Prices listed are per person based on double occupancy (minimum 2 travelers per private expedition). For 1 solo traveler booking, a 50% single supplement surcharge applies.',
  },
  fr: {
    badgeTiers: 'Catégories d\'Expédition & Tarifs',
    badgePrivate: '100% Privé & Sur Mesure',
    comfort: 'Confort',
    premiumVip: 'Premium VIP',
    from: 'À partir de',
    perGuest: 'personne',
    clubHotel: 'Hôtels 3★ Boutique certifiés',
    clubBreakfast: 'Petit-déjeuner continental quotidien',
    clubGuide: 'Guide naturaliste privé & logistique terrestre',
    btnClub: 'Réserver Vermilion Club',
    vipHotel: 'Hôtels 4★ Boutique de confort supérieur',
    vipBreakfast: 'Petit-déjeuner buffet gourmet & rythme flexible',
    vipConcierge: 'Conciergerie 24/7 & commodités VIP',
    btnVip: 'Réserver Vermilion VIP',
    noteTitle: '💡 Note Importante sur l\'Occupation Double & Voyageurs Solo :',
    noteDesc: 'Les tarifs indiqués sont par personne en occupation double (minimum 2 voyageurs par expédition privée). Pour un voyageur solo, un supplément individuel de 50% s\'applique.',
  },
  de: {
    badgeTiers: 'Expeditions-Klassen & Preise',
    badgePrivate: '100% Privat & Maßgeschneidert',
    comfort: 'Komfort',
    premiumVip: 'Premium VIP',
    from: 'Ab',
    perGuest: 'Person',
    clubHotel: 'Zertifizierte 3★ Boutique-Hotels',
    clubBreakfast: 'Tägliches kontinentales Frühstück',
    clubGuide: 'Privater Naturführer & Landlogistik',
    btnClub: 'Vermilion Club buchen',
    vipHotel: 'Gehobene 4★ Boutique-Hotels',
    vipBreakfast: 'Gourmet-Frühstücksbuffet & flexibles Tempo',
    vipConcierge: '24/7 Concierge-Betreuung & VIP-Ausstattung',
    btnVip: 'Vermilion VIP buchen',
    noteTitle: '💡 Wichtiger Hinweis zu Doppelbelegung & Alleinreisenden:',
    noteDesc: 'Die angegebenen Preise verstehen sich pro Person bei Doppelbelegung (mindestens 2 Reisende pro privater Expedition). Bei einer Einzelreisenden-Buchung fällt ein Einzelzimmerzuschlag von 50% an.',
  },
  it: {
    badgeTiers: 'Tariffe e Categorie di Soggiorno',
    badgePrivate: '100% Privato & Su Misura',
    comfort: 'Comfort',
    premiumVip: 'Premium VIP',
    from: 'Da',
    perGuest: 'persona',
    clubHotel: 'Hotel Boutique 3★ certificati',
    clubBreakfast: 'Colazione continentale giornaliera',
    clubGuide: 'Guida naturalista privata & logistica terrestre',
    btnClub: 'Prenota Vermilion Club',
    vipHotel: 'Hotel Boutique 4★ di comfort superiore',
    vipBreakfast: 'Colazione a buffet gourmet & ritmo flessibile',
    vipConcierge: 'Assistenza Concierge 24/7 & Servizi VIP',
    btnVip: 'Prenota Vermilion VIP',
    noteTitle: '💡 Nota Importante su Occupazione Doppia e Viaggiatori Singoli:',
    noteDesc: 'I prezzi indicati si intendono a persona in camera doppia (minimo 2 viaggiatori per spedizione privata). Per prenotazioni di 1 solo viaggiatore, si applica un supplemento singola del 50%.',
  },
  pt: {
    badgeTiers: 'Categorias de Expedição & Tarifas',
    badgePrivate: '100% Privado & Sob Medida',
    comfort: 'Conforto',
    premiumVip: 'Premium VIP',
    from: 'A partir de',
    perGuest: 'pessoa',
    clubHotel: 'Hotéis Boutique 3★ certificados',
    clubBreakfast: 'Café da manhã continental diário',
    clubGuide: 'Guia naturalista privativo & logística terrestre',
    btnClub: 'Reservar Vermilion Club',
    vipHotel: 'Hotéis Boutique 4★ de conforto superior',
    vipBreakfast: 'Café da manhã buffet gourmet & ritmo flexível',
    vipConcierge: 'Suporte Concierge 24/7 & Amenidades VIP',
    btnVip: 'Reservar Vermilion VIP',
    noteTitle: '💡 Nota Importante sobre Ocupação Dupla & Viajantes Solo:',
    noteDesc: 'As tarifas informadas são por pessoa com base em ocupação dupla (mínimo de 2 viajantes por expedição privada). Para reservas de 1 único passageiro, aplica-se acréscimo de 50% de suplemento individual.',
  },
  ja: {
    badgeTiers: '遠征クラスと料金プラン',
    badgePrivate: '100% 完全プライベート・特注仕立て',
    comfort: 'コンフォート',
    premiumVip: 'プレミアムVIP',
    from: 'から',
    perGuest: '名様',
    clubHotel: '認定3つ星ブティックホテル',
    clubBreakfast: '毎日のコンチネンタルブレックファスト',
    clubGuide: '専属ナチュラリストガイド＆専用車送迎',
    btnClub: 'Vermilion Club を予約する',
    vipHotel: '上級4つ星ブティックホテル',
    vipBreakfast: '厳選グルメビュッフェ朝食＆柔軟なスケジュール',
    vipConcierge: '24時間コンシェルジュ対応＆VIP限定アメニティ',
    btnVip: 'Vermilion VIP を予約する',
    noteTitle: '💡 2名様一室利用および1名様参加に関する重要なお知らせ:',
    noteDesc: '表示料金は2名様1室利用時のお一人様あたりの価格です（プライベートツアーは最低2名様からの催行となります）。1名様でのご参加の場合は、基本料金に50%のシングル追加代金が適用されます。',
  },
  zh: {
    badgeTiers: '探险级别与住宿套餐',
    badgePrivate: '100% 私享定制 • 尊贵专属',
    comfort: '舒适之选',
    premiumVip: '尊贵VIP',
    from: '起价',
    perGuest: '位旅客',
    clubHotel: '甄选3★精品设计酒店',
    clubBreakfast: '每日提供精致欧式早餐',
    clubGuide: '专属私人自然向导及全程陆路接送',
    btnClub: '预订 Vermilion Club',
    vipHotel: '高奢4★精品度假酒店',
    vipBreakfast: '奢享美馔自助早餐与灵活节奏',
    vipConcierge: '24/7全天候礼宾助理与VIP定制礼遇',
    btnVip: '预订 Vermilion VIP',
    noteTitle: '💡 双人入住基础与单人出行重要说明：',
    noteDesc: '所列价格均为双人单房每人起价（专属私享团最低出行人数为2人）。单人出行预订需加收50%的单房差附加费。',
  },
};

export function TourPricingTiersCard({ tour }: TourPricingTiersCardProps) {
  const locale = useLocale();
  const tc = TIERS_CARD_I18N[locale] || TIERS_CARD_I18N['en'];
  const priceClub = tour.price3Star || tour.price || 1050;
  const priceVip = tour.price4Star || Math.round(priceClub * 1.15);

  const [selectedTier, setSelectedTier] = useState<'club' | 'vip'>('club');

  const handleSelectTier = (tier: 'club' | 'vip') => {
    setSelectedTier(tier);
    try {
      sessionStorage.setItem('selected_hotel_tier', tier === 'vip' ? '4star' : '3star');
      localStorage.setItem('vermilion_selected_tier', tier === 'vip' ? '4star' : '3star');
    } catch {}
  };

  const handleBookTier = (tier: 'club' | 'vip') => {
    handleSelectTier(tier);
    window.location.href = `/${locale}/booking?addTour=${tour.id}&tier=${tier === 'vip' ? 'vip' : 'club'}`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900/90 rounded-3xl p-6 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            {tc.badgeTiers}
          </span>
          <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mt-1">
            Vermilion Club vs Vermilion VIP
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 text-xs font-bold text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{tc.badgePrivate}</span>
        </div>
      </div>

      {/* Side-by-Side 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vermilion Club (Confort 3★) */}
        <div
          onClick={() => handleSelectTier('club')}
          className={`rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-5 relative overflow-hidden ${
            selectedTier === 'club'
              ? 'border-emerald-600 bg-emerald-950/5 dark:bg-emerald-950/20 shadow-lg shadow-emerald-950/10'
              : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 bg-zinc-50/50 dark:bg-zinc-950/50'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                <Hotel className="w-3.5 h-3.5" />
                <span>Vermilion Club (3★)</span>
              </span>
              <span className="text-[11px] font-semibold text-zinc-500">{tc.comfort}</span>
            </div>

            <div>
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{tc.from}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">
                  ${priceClub.toLocaleString('en-US')}
                </span>
                <span className="text-xs text-zinc-500 font-semibold">USD / {tc.perGuest}</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tc.clubHotel}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tc.clubBreakfast}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tc.clubGuide}</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBookTier('club');
            }}
            className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            <span>{tc.btnClub}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Vermilion VIP (Premium 4★) */}
        <div
          onClick={() => handleSelectTier('vip')}
          className={`rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-5 relative overflow-hidden ${
            selectedTier === 'vip'
              ? 'border-amber-500 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/30 shadow-lg shadow-amber-500/10'
              : 'border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 bg-zinc-50/50 dark:bg-zinc-950/50'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                <span>Vermilion VIP (4★)</span>
              </span>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{tc.premiumVip}</span>
            </div>

            <div>
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{tc.from}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">
                  ${priceVip.toLocaleString('en-US')}
                </span>
                <span className="text-xs text-zinc-500 font-semibold">USD / {tc.perGuest}</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{tc.vipHotel}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{tc.vipBreakfast}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{tc.vipConcierge}</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBookTier('vip');
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            <Sparkles className="w-4 h-4" />
            <span>{tc.btnVip}</span>
          </button>
        </div>
      </div>

      {/* Double Occupancy & Single Supplement Mandatory Rule Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {tc.noteTitle}
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[11px]">
            {tc.noteDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
