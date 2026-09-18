'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { createBookingInFirestore } from '@/lib/bookings';
import { TravelDatePicker } from '@/components/booking/TravelDatePicker';
import { filterPhoneInput, isValidEmail, isValidPhone, sanitizeText } from '@/lib/validation';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { useLuxury } from '@/components/providers/LuxuryThemeProvider';
import { getStoredAffiliateRef } from '@/components/affiliates/AffiliateTracker';
import {
  Star,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  User,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';

interface BookingSidebarProps {
  tour: Tour;
}

const ADD_EXPEDITION_I18N: Record<string, string> = {
  es: 'Añadir a mi Expedición',
  en: 'Add to Expedition',
  fr: 'Ajouter à mon expédition',
  de: 'Zur Expedition hinzufügen',
  it: 'Aggiungi alla mia spedizione',
  pt: 'Adicionar à minha expedição',
  ja: '遠征プランに追加する',
  zh: '添加到我的探险计划',
};

const BOOKING_SIDEBAR_I18N: Record<string, {
  startingPrice: string;
  perPerson: string;
  durationLabel: string;
  instantWhatsApp: string;
  flexibleBooking: string;
  guaranteedResponse: string;
  conciergeSupport: string;
  specialistBadge: string;
  operatorSubtitle: string;
  specialistDesc: string;
  callDirect: string;
  tripAdvisorReviews: string;
  from: string;
  checkAvailability: string;
  waMessage: (title: string, duration: string) => string;
}> = {
  es: {
    startingPrice: 'Tarifa Inicial',
    perPerson: 'USD / por persona',
    durationLabel: 'Duración:',
    instantWhatsApp: 'Consulta Inmediata por WhatsApp',
    flexibleBooking: '100% Reserva flexible y sin cargos ocultos',
    guaranteedResponse: 'Respuesta de especialista en menos de 2 horas',
    conciergeSupport: 'Asistencia Concierge 24/7 durante toda la ruta',
    specialistBadge: 'Especialista Directo en Destino',
    operatorSubtitle: 'Operador Local Directo Quito y Galápagos',
    specialistDesc: '¿Deseas modificaciones a medida, fechas flexibles o upgrades exclusivos? Diseña tu viaje directamente con nuestro equipo.',
    callDirect: 'Llamar Directo',
    tripAdvisorReviews: 'Opiniones 100% verificadas de 5 estrellas de viajeros de todo el mundo.',
    from: 'Desde',
    checkAvailability: 'Consultar Disponibilidad',
    waMessage: (title, duration) => `¡Hola Vermilion Routes! Me interesa la expedición "${title}" (${duration}). ¿Podrían enviarme cotización a medida y fechas disponibles?`,
  },
  en: {
    startingPrice: 'Starting Price',
    perPerson: 'USD / per person',
    durationLabel: 'Duration:',
    instantWhatsApp: 'Instant WhatsApp Inquiry',
    flexibleBooking: '100% Flexible booking & no hidden fees',
    guaranteedResponse: 'Guaranteed specialist response under 2 hours',
    conciergeSupport: '24/7 Concierge support throughout your trip',
    specialistBadge: 'Direct Destination Specialist',
    operatorSubtitle: 'Quito & Galápagos Direct Operator',
    specialistDesc: 'Need custom modifications, date flexibility, or exclusive upgrades? Speak directly with our destination designer.',
    callDirect: 'Call Direct',
    tripAdvisorReviews: '100% verified 5-star reviews from international travelers.',
    from: 'From',
    checkAvailability: 'Check Availability',
    waMessage: (title, duration) => `Hello Vermilion Routes! I am interested in the tour "${title}" (${duration}). Could you please send me a custom quote and departure availability?`,
  },
  fr: {
    startingPrice: 'Tarif de Départ',
    perPerson: 'USD / par personne',
    durationLabel: 'Durée :',
    instantWhatsApp: 'Demande Rapide par WhatsApp',
    flexibleBooking: 'Réservation 100% flexible et sans frais cachés',
    guaranteedResponse: 'Réponse d\'un spécialiste sous 2 heures',
    conciergeSupport: 'Service de conciergerie 24/7 pendant tout le voyage',
    specialistBadge: 'Spécialiste Direct de la Destination',
    operatorSubtitle: 'Opérateur Local Direct Quito & Galápagos',
    specialistDesc: 'Besoin d\'un itinéraire sur mesure, de dates flexibles ou de surclassements ? Échangez directement avec notre concepteur de voyage.',
    callDirect: 'Appel Direct',
    tripAdvisorReviews: 'Avis 5 étoiles 100% vérifiés de voyageurs du monde entier.',
    from: 'À partir de',
    checkAvailability: 'Vérifier la Disponibilité',
    waMessage: (title, duration) => `Bonjour Vermilion Routes ! Je suis intéressé(e) par l'expédition "${title}" (${duration}). Pourriez-vous me transmettre un devis sur mesure et les disponibilités ?`,
  },
  de: {
    startingPrice: 'Ab-Preis',
    perPerson: 'USD / pro Person',
    durationLabel: 'Dauer:',
    instantWhatsApp: 'Sofort-Anfrage per WhatsApp',
    flexibleBooking: '100% flexible Buchung ohne versteckte Kosten',
    guaranteedResponse: 'Garantiert Antwort eines Spezialisten unter 2 Stunden',
    conciergeSupport: '24/7 Concierge-Betreuung während Ihrer gesamten Reise',
    specialistBadge: 'Direkter Zielgebiet-Spezialist',
    operatorSubtitle: 'Direktveranstalter Quito & Galápagos',
    specialistDesc: 'Wünschen Sie individuelle Anpassungen, flexible Reisedaten oder Upgrades? Sprechen Sie direkt mit unserem Reise-Designer.',
    callDirect: 'Direkt anrufen',
    tripAdvisorReviews: '100% verifizierte 5-Sterne-Bewertungen internationaler Reisender.',
    from: 'Ab',
    checkAvailability: 'Verfügbarkeit prüfen',
    waMessage: (title, duration) => `Hallo Vermilion Routes! Ich interessiere mich für die Tour "${title}" (${duration}). Könnten Sie mir bitte ein individuelles Angebot und verfügbare Termine zusenden?`,
  },
  it: {
    startingPrice: 'Prezzo di Partenza',
    perPerson: 'USD / per persona',
    durationLabel: 'Durata:',
    instantWhatsApp: 'Richiesta Immediata su WhatsApp',
    flexibleBooking: 'Prenotazione 100% flessibile e senza costi nascosti',
    guaranteedResponse: 'Risposta garantita da uno specialista entro 2 ore',
    conciergeSupport: 'Assistenza Concierge 24/7 durante l\'intero viaggio',
    specialistBadge: 'Specialista Diretto della Destinazione',
    operatorSubtitle: 'Operatore Diretto Quito & Galápagos',
    specialistDesc: 'Desideri modifiche su misura, date flessibili o upgrade esclusivi? Parla direttamente con il nostro travel designer.',
    callDirect: 'Chiama Direttamente',
    tripAdvisorReviews: 'Recensioni a 5 stelle verificate al 100% da viaggiatori internazionali.',
    from: 'Da',
    checkAvailability: 'Verifica Disponibilità',
    waMessage: (title, duration) => `Ciao Vermilion Routes! Sono interessato/a alla spedizione "${title}" (${duration}). Potreste inviarmi un preventivo personalizzato e le date disponibili?`,
  },
  pt: {
    startingPrice: 'Tarifa Inicial',
    perPerson: 'USD / por pessoa',
    durationLabel: 'Duração:',
    instantWhatsApp: 'Consulta Imediata por WhatsApp',
    flexibleBooking: 'Reserva 100% flexível e sem custos ocultos',
    guaranteedResponse: 'Resposta garantida de especialista em menos de 2 horas',
    conciergeSupport: 'Suporte Concierge 24/7 durante toda a expedição',
    specialistBadge: 'Especialista Direto no Destino',
    operatorSubtitle: 'Operador Local Direto Quito & Galápagos',
    specialistDesc: 'Deseja alterações sob medida, datas flexíveis ou upgrades exclusivos? Converse diretamente com nosso designer de viagens.',
    callDirect: 'Ligar Diretamente',
    tripAdvisorReviews: 'Avaliações 5 estrelas 100% verificadas de viajantes do mundo todo.',
    from: 'A partir de',
    checkAvailability: 'Consultar Disponibilidade',
    waMessage: (title, duration) => `Olá Vermilion Routes! Tenho interesse na expedição "${title}" (${duration}). Poderiam me enviar um orçamento sob medida e disponibilidade de saídas?`,
  },
  ja: {
    startingPrice: '開始料金',
    perPerson: 'USD / お一人様あたり',
    durationLabel: '所要日数:',
    instantWhatsApp: 'WhatsAppで今すぐ相談',
    flexibleBooking: '柔軟な予約規約・隠れた追加料金なし',
    guaranteedResponse: '2時間以内の専任担当者からの回答を保証',
    conciergeSupport: '旅行中も安心の24時間コンシェルジュ対応',
    specialistBadge: '現地直営トラベルスペシャリスト',
    operatorSubtitle: 'キト＆ガラパゴス諸島 正規直営催行会社',
    specialistDesc: '特注の旅程変更、日程の調整、上級アップグレードをご希望ですか？当社のトラベルデザイナーに直接ご相談ください。',
    callDirect: '直接電話する',
    tripAdvisorReviews: '世界中の旅行者から寄せられた100%認証済みの5つ星評価。',
    from: 'から',
    checkAvailability: '空き状況を確認する',
    waMessage: (title, duration) => `Vermilion Routes様、ツアー「${title}」（${duration}）について相談を希望します。特注お見積りと最新の空き状況をお知らせいただけますか？`,
  },
  zh: {
    startingPrice: '起价',
    perPerson: 'USD / 每位旅客',
    durationLabel: '行程时长:',
    instantWhatsApp: 'WhatsApp即时咨询',
    flexibleBooking: '100%灵活预订条款 • 绝无隐形附加费用',
    guaranteedResponse: '专属旅行顾问2小时内极速答复保证',
    conciergeSupport: '探险全程享24/7尊享礼宾级全天候支持',
    specialistBadge: '目的地直属定制专家',
    operatorSubtitle: '基多与加拉帕戈斯群岛 一级地接直营机构',
    specialistDesc: '需要量身定制行程、调整出发日期或升级奢华巡航？欢迎直接与我们的高级旅行规划师沟通。',
    callDirect: '拨打电话',
    tripAdvisorReviews: '来自全球国际旅行者的100%真实5星好评认证。',
    from: '起价',
    checkAvailability: '查询团期与席位',
    waMessage: (title, duration) => `您好 Vermilion Routes！我对专属行程“${title}”（${duration}）非常感兴趣。能否为我提供量身定制方案及可预订团期？`,
  },
};

export function BookingSidebar({ tour }: BookingSidebarProps) {
  const locale = useLocale();
  const t = useTranslations('tours');
  const sb = BOOKING_SIDEBAR_I18N[locale] || BOOKING_SIDEBAR_I18N['en'];
  const tourTitle = getLocalizedText(tour.title, locale);
  const tourDuration = getLocalizedText(tour.duration, locale);
  const tourDestination = getLocalizedText(tour.destination, locale);

  const [hotelClass, setHotelClass] = useState<'premium' | 'luxury'>('premium');
  const { setLuxuryMode } = useLuxury();

  const handleClassChange = (type: 'premium' | 'luxury') => {
    setHotelClass(type);
    setLuxuryMode(type === 'luxury');
  };

  const displayPrice = hotelClass === 'luxury' && tour.price4Star ? tour.price4Star : (tour.price3Star || tour.price || 1050);

  const tourTitleStr = tourTitle;
  const tourDurationStr = tourDuration;
  const whatsappMessage = encodeURIComponent(
    sb.waMessage(tourTitleStr, tourDurationStr)
  );

  return (
    <>
      <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Top Price Header */}
        <div className="space-y-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
              {sb.startingPrice}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{tour.rating}</span>
              {tour.reviewsCount && <span className="text-zinc-500">({tour.reviewsCount})</span>}
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 transition-all duration-300" suppressHydrationWarning>
              ${displayPrice.toLocaleString('en-US')}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">{sb.perPerson}</span>
          </div>

          {/* Hotel Class Toggle */}
          <div className="bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-xl flex items-center relative overflow-hidden mt-1.5 z-10">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-300 ease-out z-0 ${hotelClass === 'premium' ? 'left-1' : 'left-[calc(50%+4px)] bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20 border-amber-200/60 dark:border-amber-700/50 shadow-amber-900/5'
                }`}
            />
            <button
              type="button"
              onClick={() => handleClassChange('premium')}
              className={`relative z-10 w-1/2 py-2 text-xs font-extrabold transition-colors uppercase tracking-wider cursor-pointer ${hotelClass === 'premium' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
            >
              Vermilion Club
            </button>
            <button
              type="button"
              onClick={() => handleClassChange('luxury')}
              className={`relative z-10 w-1/2 py-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${hotelClass === 'luxury'
                  ? 'font-serif text-[13px] tracking-wider drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-300 dark:to-amber-100 font-extrabold uppercase'
                  : 'text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-amber-700 dark:hover:text-amber-300'
                }`}
            >
              <Sparkles className={`w-3.5 h-3.5 shrink-0 ${hotelClass === 'luxury' ? 'text-amber-500 dark:text-amber-300' : 'hidden'}`} />
              Vermilion VIP
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold pt-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{sb.durationLabel} {tourDuration}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              try {
                sessionStorage.setItem('preselected_tour_id', tour.id);
                localStorage.setItem('vermilion_selected_tour', tour.id);
              } catch { }
              window.location.href = `/${locale}/booking?addTour=${tour.id}`;
            }}
            className="w-full gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] text-stone-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4" />
            <span>{ADD_EXPEDITION_I18N[locale] || ADD_EXPEDITION_I18N['en']}</span>
          </button>

          {/* Quick WhatsApp Inquiry */}
          <a
            href={`https://wa.me/593960039156?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors text-xs font-bold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{sb.instantWhatsApp}</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{sb.flexibleBooking}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{sb.guaranteedResponse}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{sb.conciergeSupport}</span>
          </div>
        </div>

        {/* ── 1. Senior Travel Designer Concierge Card ── */}
        <div className="pt-5 border-t border-zinc-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white font-serif font-bold text-base flex items-center justify-center shadow-md shadow-emerald-950/20 shrink-0">
              VR
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400 block">
                {sb.specialistBadge}
              </span>
              <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Byron Ortiz &amp; Expedition Team
              </h4>
              <p className="text-[11px] text-zinc-500">{sb.operatorSubtitle}</p>
            </div>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {sb.specialistDesc}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`https://wa.me/593960039156?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:+593960039156"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-bold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-600" />
              <span>{sb.callDirect}</span>
            </a>
          </div>
        </div>

        {/* ── 2. Official TripAdvisor Trust Box ── */}
        <a
          href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 hover:border-emerald-400 text-zinc-900 transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-emerald-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              ))}
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              5.0 EXCELLENT
            </span>
          </div>
          <p className="text-xs font-bold text-zinc-900 mt-2">
            TripAdvisor Travelers' Choice 2026 Winner
          </p>
          <p className="text-[11px] text-zinc-600 mt-0.5">
            {sb.tripAdvisorReviews}
          </p>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar (Visible only on small screens when sidebar is out of view) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-xl border-t border-zinc-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-zinc-500">{sb.from}</span>
          <span className="font-serif font-bold text-xl text-zinc-900">${displayPrice.toLocaleString('en-US')}</span>
        </div>
        <a
          href="#booking-form"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-transform active:scale-95"
        >
          {sb.checkAvailability}
        </a>
      </div>
    </>
  );
}
