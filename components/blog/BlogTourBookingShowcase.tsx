'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Star,
  Send,
  ArrowRight,
  MessageCircle,
  Award
} from 'lucide-react';

interface BlogTourBookingShowcaseProps {
  primaryTour?: Tour | null;
  complementaryTours?: Tour[];
  articleTitle: string;
  destinationName: string;
  locale: string;
}

const I18N_DICT: Record<string, {
  curatedBadge: string;
  titleFormat: (dest: string) => string;
  subtitle: string;
  guideBadge: string;
  viewTour: string;
  bookNow: string;
  quoteBadge: string;
  customTitleFormat: (dest: string) => string;
  customDesc: string;
  whatsAppBtn: string;
  placeholderName: string;
  placeholderContact: string;
  requestBtn: string;
  sending: string;
  successMsg: string;
}> = {
  es: {
    curatedBadge: 'Expediciones Privadas Relacionadas',
    titleFormat: (dest) => `Vive la Experiencia: Expediciones en ${dest}`,
    subtitle: 'Transforma la lectura en realidad. Reserva itinerarios diseñados a medida con guías naturalistas certificados y atención concierge 24/7.',
    guideBadge: 'Guía Naturalista Privado Certificado',
    viewTour: 'Ver Itinerario',
    bookNow: 'Reservar',
    quoteBadge: 'Cotización Inmediata sin Compromiso',
    customTitleFormat: (dest) => `¿Prefieres un viaje 100% personalizado a ${dest}?`,
    customDesc: 'Indícanos tus preferencias y nuestro equipo de concierges te enviará una propuesta exclusiva en menos de 24 horas.',
    whatsAppBtn: 'WhatsApp Directo 24/7',
    placeholderName: 'Tu nombre y apellido',
    placeholderContact: 'Correo o WhatsApp (+código)',
    requestBtn: 'Solicitar Propuesta',
    sending: 'Enviando...',
    successMsg: '¡Gracias por contactarnos! Tu solicitud de cotización ha sido registrada. Un especialista te contactará muy pronto.'
  },
  en: {
    curatedBadge: 'Curated Private Expeditions',
    titleFormat: (dest) => `Experience It Live: Private Expeditions in ${dest}`,
    subtitle: 'Turn inspiration into reality. Reserve tailor-made itineraries with private naturalist guides and dedicated 24/7 VIP concierge.',
    guideBadge: 'Private Certified Naturalist Guide',
    viewTour: 'View Tour',
    bookNow: 'Book Now',
    quoteBadge: 'Instant Tailor-Made Quotation',
    customTitleFormat: (dest) => `Looking for a 100% custom itinerary in ${dest}?`,
    customDesc: 'Tell us your dates and travel style. Our specialist designers will craft your private proposal within 24 hours.',
    whatsAppBtn: 'Direct WhatsApp 24/7',
    placeholderName: 'Your full name',
    placeholderContact: 'Email or WhatsApp (+country code)',
    requestBtn: 'Request Proposal',
    sending: 'Sending...',
    successMsg: 'Thank you! Your inquiry has been received. Our luxury travel designer will contact you shortly.'
  },
  fr: {
    curatedBadge: 'Expéditions Privées Sélectionnées',
    titleFormat: (dest) => `Vivez l'Expérience : Circuits à ${dest}`,
    subtitle: 'Transformez l’inspiration en réalité. Réservez des itinéraires sur mesure avec guides naturalistes certifiés et conciergerie VIP 24/7.',
    guideBadge: 'Guide Naturaliste Privé Certifié',
    viewTour: 'Voir Circuit',
    bookNow: 'Réserver',
    quoteBadge: 'Devis Immédiat Sans Engagement',
    customTitleFormat: (dest) => `Vous préférez un voyage 100% sur mesure à ${dest} ?`,
    customDesc: 'Indiquez-nous vos souhaits et nos concepteurs élaboreront votre proposition exclusive en moins de 24h.',
    whatsAppBtn: 'WhatsApp Direct 24/7',
    placeholderName: 'Votre nom et prénom',
    placeholderContact: 'Email ou WhatsApp (+indicatif)',
    requestBtn: 'Demander une Proposition',
    sending: 'Envoi...',
    successMsg: 'Merci ! Votre demande a bien été reçue. Notre spécialiste vous contactera très prochainement.'
  },
  de: {
    curatedBadge: 'Kuratierte Private Expeditionen',
    titleFormat: (dest) => `Erleben Sie es hautnah: Expeditionen in ${dest}`,
    subtitle: 'Verwandeln Sie Inspiration in Realität. Buchen Sie maßgeschneiderte Reiserouten mit zertifizierten Naturführern und 24/7 VIP-Concierge.',
    guideBadge: 'Zertifizierter Privater Naturführer',
    viewTour: 'Tour Ansehen',
    bookNow: 'Jetzt Buchen',
    quoteBadge: 'Sofortiges Unverbindliches Angebot',
    customTitleFormat: (dest) => `Bevorzugen Sie eine 100% maßgeschneiderte Reise nach ${dest}?`,
    customDesc: 'Teilen Sie uns Ihre Wünsche mit. Unsere Reisedesigner erstellen Ihr exklusives Angebot innerhalb von 24 Stunden.',
    whatsAppBtn: 'Direktes WhatsApp 24/7',
    placeholderName: 'Ihr vollständiger Name',
    placeholderContact: 'E-Mail oder WhatsApp (+Ländercode)',
    requestBtn: 'Angebot Anfordern',
    sending: 'Wird gesendet...',
    successMsg: 'Vielen Dank! Ihre Anfrage ist eingegangen. Unser Reisespezialist wird sich in Kürze bei Ihnen melden.'
  },
  it: {
    curatedBadge: 'Spedizioni Private Selezionate',
    titleFormat: (dest) => `Vivi l'Esperienza: Spedizioni a ${dest}`,
    subtitle: 'Trasforma l’ispirazione in realtà. Prenota itinerari su misura con guide naturalistiche certificate e concierge VIP 24/7.',
    guideBadge: 'Guida Naturalistica Privata Certificata',
    viewTour: 'Vedi Tour',
    bookNow: 'Prenota',
    quoteBadge: 'Preventivo Immediato Senza Impegno',
    customTitleFormat: (dest) => `Preferisci un viaggio personalizzato al 100% a ${dest}?`,
    customDesc: 'Indicaci le tue preferenze e il nostro team ti invierà una proposta esclusiva in meno di 24 ore.',
    whatsAppBtn: 'WhatsApp Diretto 24/7',
    placeholderName: 'Il tuo nome e cognome',
    placeholderContact: 'Email o WhatsApp (+prefisso)',
    requestBtn: 'Richiedi Proposta',
    sending: 'Invio...',
    successMsg: 'Grazie! La tua richiesta è stata ricevuta. Un nostro consulente ti contatterà al più presto.'
  },
  pt: {
    curatedBadge: 'Expedições Privadas Selecionadas',
    titleFormat: (dest) => `Viva a Experiência: Expedições em ${dest}`,
    subtitle: 'Transforme a inspiração em realidade. Reserve itinerários sob medida com guias naturalistas certificados e concierge VIP 24/7.',
    guideBadge: 'Guia Naturalista Privado Certificado',
    viewTour: 'Ver Roteiro',
    bookNow: 'Reservar',
    quoteBadge: 'Cotação Imediata sem Compromisso',
    customTitleFormat: (dest) => `Prefere uma viagem 100% personalizada para ${dest}?`,
    customDesc: 'Diga-nos suas preferências e nossa equipe enviará uma proposta exclusiva em menos de 24 horas.',
    whatsAppBtn: 'WhatsApp Direto 24/7',
    placeholderName: 'Seu nome e sobrenome',
    placeholderContact: 'E-mail ou WhatsApp (+código)',
    requestBtn: 'Solicitar Proposta',
    sending: 'Enviando...',
    successMsg: 'Obrigado! Sua solicitação foi recebida. Um especialista entrará em contato em breve.'
  },
  ja: {
    curatedBadge: '厳選プライベート遠征ツアー',
    titleFormat: (dest) => `現地で体感する：${dest} プライベートツアー`,
    subtitle: '読書体験を現実の旅へ。公認ナチュラリストガイドと24時間365日の専属コンシェルジュによるオーダーメイド旅程をご予約ください。',
    guideBadge: '公認プライベートナチュラリストガイド',
    viewTour: '旅程を見る',
    bookNow: '予約する',
    quoteBadge: '無料お見積もり・オーダーメイド',
    customTitleFormat: (dest) => `${dest} への完全オーダーメイド旅行をご希望ですか？`,
    customDesc: 'ご希望の日程やスタイルをお知らせください。専属トラベルデザイナーが24時間以内に特別なプランをご提案いたします。',
    whatsAppBtn: 'WhatsApp 直通 24/7',
    placeholderName: 'お名前（フルネーム）',
    placeholderContact: 'メールまたはWhatsApp (+国番号)',
    requestBtn: '提案をリクエスト',
    sending: '送信中...',
    successMsg: 'お問い合わせありがとうございます！旅行デザイナーより速やかにご連絡いたします。'
  },
  zh: {
    curatedBadge: '精选私人定制探索行程',
    titleFormat: (dest) => `亲身体验：${dest} 私人定制旅程`,
    subtitle: '将灵感化为现实。预订由认证自然学家向导全程陪同、配有24/7专属VIP礼宾的定制行程。',
    guideBadge: '官方认证私人自然学向导',
    viewTour: '查看行程',
    bookNow: '立即预订',
    quoteBadge: '免承诺即时定制报价',
    customTitleFormat: (dest) => `期待${dest}百分之百专属私人定制旅程？`,
    customDesc: '告知您的出行偏好，我们的专属行程设计师将在24小时内为您呈现专属奢华旅行方案。',
    whatsAppBtn: 'WhatsApp 24/7 直通',
    placeholderName: '您的姓名',
    placeholderContact: '邮箱或 WhatsApp (+国家代码)',
    requestBtn: '获取专属方案',
    sending: '正在发送...',
    successMsg: '非常感谢！我们已收到您的定制申请，高端旅行规划师将尽快与您取得联系。'
  }
};

export function BlogTourBookingShowcase({
  primaryTour,
  complementaryTours = [],
  articleTitle,
  destinationName,
  locale
}: BlogTourBookingShowcaseProps) {
  const t = I18N_DICT[locale] || I18N_DICT['en'];
  const allTours = primaryTour
    ? [primaryTour, ...complementaryTours.filter((tour) => tour.id !== primaryTour.id)].slice(0, 3)
    : complementaryTours.slice(0, 3);

  // Quick Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [travelers] = useState('2 Travelers');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleQuickLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadContact) return;

    setSubmitting(true);
    try {
      const isEmail = leadContact.includes('@');
      await addDoc(collection(db, 'leads'), {
        name: leadName,
        email: isEmail ? leadContact : '',
        phone: !isEmail ? leadContact : '',
        destination: destinationName || 'Galapagos & Ecuador',
        travelers,
        source: 'blog_showcase',
        status: 'new',
        notes: `Origen: Blog Article ("${articleTitle}") - Interés en: ${primaryTour ? getLocalizedText(primaryTour.title, 'en') : destinationName}`,
        locale,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Error saving blog lead:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookingRedirect = (tourId: string) => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('preselected_tour_id', tourId);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <section className="my-12 rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-emerald-800/50 p-6 sm:p-10 shadow-2xl space-y-10 text-white">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-900/60 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.curatedBadge}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.titleFormat(destinationName)}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* TripAdvisor Social Proof Badge */}
        <div className="bg-emerald-950/60 border border-emerald-800/60 p-3.5 rounded-2xl flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-emerald-200 block mt-0.5">
              TripAdvisor 5.0 • Travelers&apos; Choice
            </span>
          </div>
        </div>
      </div>

      {/* Tour Cards Grid */}
      {allTours.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTours.map((tour) => {
            const tourTitle = getLocalizedText(tour.title, locale);
            const duration = getLocalizedText(tour.duration, locale);
            const destination = getLocalizedText(tour.destination, locale);

            return (
              <div
                key={tour.id}
                className="bg-zinc-900/90 rounded-2xl border border-zinc-800 hover:border-emerald-600/70 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={tour.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'}
                    alt={tourTitle}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      {destination}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-zinc-200 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {duration}
                    </span>
                    <span className="font-extrabold text-emerald-400 font-serif text-lg">
                      ${tour.price.toLocaleString('en-US')}{' '}
                      <span className="text-[10px] text-zinc-300 font-normal">USD</span>
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-lg text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {tourTitle}
                    </h4>
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                      {getLocalizedText(tour.shortDescription || tour.description, locale)}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.guideBadge}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link
                        href={`/${locale}/tours/${tour.id}`}
                        className="py-2.5 px-3 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-xs font-bold text-center transition-colors"
                      >
                        {t.viewTour}
                      </Link>
                      <Link
                        href={`/${locale}/tours/${tour.id}#book`}
                        onClick={() => handleBookingRedirect(tour.id)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center transition-colors shadow-md flex items-center justify-center gap-1"
                      >
                        <span>{t.bookNow}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Custom Itinerary Quotation Form */}
      <div className="bg-emerald-950/30 rounded-2xl border border-emerald-800/40 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              {t.quoteBadge}
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
              {t.customTitleFormat(destinationName)}
            </h4>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl">
              {t.customDesc}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <a
              href="https://wa.me/593994048458"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>{t.whatsAppBtn}</span>
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{t.successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleQuickLeadSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder={t.placeholderName}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-emerald-500"
            />
            <input
              type="text"
              required
              value={leadContact}
              onChange={(e) => setLeadContact(e.target.value)}
              placeholder={t.placeholderContact}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/60"
            >
              {submitting ? (
                <span>{t.sending}</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.requestBtn}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
