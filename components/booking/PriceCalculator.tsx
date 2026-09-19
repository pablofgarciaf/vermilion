'use client';

import React from 'react';
import { PricingDetails } from '@/lib/pricing';
import { Tour } from '@/types';
import { Users, Info, ArrowRight, Wallet, CalendarDays, Ticket, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

interface PriceCalculatorProps {
  tours: Tour[];
  pricing: PricingDetails;
  date: string | null;
  contactInfo?: { name: string; email: string; phone?: string; notes?: string };
  onContinue: () => void;
  canContinue: boolean;
  step: number;
  affiliateRef?: string | null;
  isProcessing?: boolean;
  tier?: 'standard' | 'firstClass' | 'vip'; // <-- ¡Agregado para arreglar el error TS2304!
}

const PRICE_CALC_I18N: Record<string, {
  emptyTitle: string;
  emptySubtitle: string;
  summaryTitle: string;
  adultsLabel: string;
  singleSupplement: string;
  childrenLabel: string;
  subtotal: string;
  groupDiscount: string;
  ambassadorDiscount: string;
  totalToPay: string;
  pendingSteps: string;
  step2Date: string;
  step4Contact: string;
  btnPay: string;
  btnComplete: string;
  noChargeNotice: string;
  btnProcessing: string; // <-- ¡Agregado para arreglar el error TS2353!
}> = {
  es: {
    emptyTitle: 'Resumen de Reserva',
    emptySubtitle: 'Selecciona una expedición para ver el desglose de tarifas.',
    summaryTitle: 'Resumen de tu Viaje',
    adultsLabel: 'Adultos',
    singleSupplement: '+ 50% Recargo Viajero Solo (Ocupación individual)',
    childrenLabel: 'Niños (Descuento -20%)',
    subtotal: 'Subtotal',
    groupDiscount: 'Descuento Grupo',
    ambassadorDiscount: 'Descuento Embajador',
    totalToPay: 'Total a Pagar',
    pendingSteps: 'Pasos pendientes para reservar:',
    step2Date: 'Paso 4: Selecciona tu fecha de viaje',
    step4Contact: 'Paso 5: Ingresa tu nombre y correo electrónico',
    btnPay: 'Proceder al Pago Seguro',
    btnComplete: 'Completar Datos Requeridos',
    noChargeNotice: 'No se realizará ningún cargo aún.',
    btnProcessing: 'Procesando tu reserva...',
  },
  en: {
    emptyTitle: 'Booking Summary',
    emptySubtitle: 'Select an expedition to view the complete price breakdown.',
    summaryTitle: 'Your Expedition Summary',
    adultsLabel: 'Adults',
    singleSupplement: '+ 50% Single Traveler Supplement (Single occupancy)',
    childrenLabel: 'Children (-20% discount)',
    subtotal: 'Subtotal',
    groupDiscount: 'Group Discount',
    ambassadorDiscount: 'Ambassador Discount',
    totalToPay: 'Total Amount',
    pendingSteps: 'Required steps before proceeding:',
    step2Date: 'Step 4: Select your departure date',
    step4Contact: 'Step 5: Enter your name and contact email',
    btnPay: 'Proceed to Secure Checkout',
    btnComplete: 'Complete Required Fields',
    noChargeNotice: 'No payment will be charged yet.',
    btnProcessing: 'Processing...',
  },
  fr: {
    emptyTitle: 'Résumé de Réservation',
    emptySubtitle: 'Sélectionnez une expédition pour afficher le détail des tarifs.',
    summaryTitle: 'Résumé de votre Voyage',
    adultsLabel: 'Adultes',
    singleSupplement: '+ 50% Supplément Voyageur Solo (Occupation individuelle)',
    childrenLabel: 'Enfants (Remise -20%)',
    subtotal: 'Sous-total',
    groupDiscount: 'Remise de Groupe',
    ambassadorDiscount: 'Remise Ambassadeur',
    totalToPay: 'Total à Régler',
    pendingSteps: 'Étapes requises avant de continuer :',
    step2Date: 'Étape 4: Sélectionnez votre date de voyage',
    step4Contact: 'Étape 5: Renseignez votre nom et votre adresse e-mail',
    btnPay: 'Procéder au Paiement Sécurisé',
    btnComplete: 'Remplir les Informations Requises',
    noChargeNotice: 'Aucun débit ne sera effectué pour l’instant.',
    btnProcessing: 'Traitement en cours...',
  },
  de: {
    emptyTitle: 'Buchungsübersicht',
    emptySubtitle: 'Wählen Sie eine Expedition aus, um die Preisübersicht anzuzeigen.',
    summaryTitle: 'Ihre Reiseübersicht',
    adultsLabel: 'Erwachsene',
    singleSupplement: '+ 50% Einzelreisenden-Zuschlag (Einzelbelegung)',
    childrenLabel: 'Kinder (-20% Rabatt)',
    subtotal: 'Zwischensumme',
    groupDiscount: 'Gruppenrabatt',
    ambassadorDiscount: 'Botschafter-Rabatt',
    totalToPay: 'Gesamtbetrag',
    pendingSteps: 'Erforderliche Schritte vor dem Fortfahren:',
    step2Date: 'Schritt 4: Reisedatum auswählen',
    step4Contact: 'Schritt 5: Name und E-Mail-Adresse eingeben',
    btnPay: 'Zur sicheren Zahlung übergehen',
    btnComplete: 'Erforderliche Daten ausfüllen',
    noChargeNotice: 'Es wird noch keine Abbuchung vorgenommen.',
    btnProcessing: 'Wird bearbeitet...',
  },
  it: {
    emptyTitle: 'Riepilogo Prenotazione',
    emptySubtitle: 'Seleziona una spedizione per visualizzare il dettaglio dei prezzi.',
    summaryTitle: 'Riepilogo del tuo Viaggio',
    adultsLabel: 'Adulti',
    singleSupplement: '+ 50% Supplemento Singola (Occupazione individuale)',
    childrenLabel: 'Bambini (Sconto -20%)',
    subtotal: 'Subtotale',
    groupDiscount: 'Sconto Gruppo',
    ambassadorDiscount: 'Sconto Ambasciatore',
    totalToPay: 'Totale da Pagare',
    pendingSteps: 'Passaggi obbligatori prima di proseguire:',
    step2Date: 'Passaggio 4: Seleziona la data del viaggio',
    step4Contact: 'Passaggio 5: Inserisci nome ed email di contatto',
    btnPay: 'Procedi al Pagamento Sicuro',
    btnComplete: 'Completa i Dati Richiesti',
    noChargeNotice: 'Nessun addebito verrà effettuato adesso.',
    btnProcessing: 'Elaborazione...',
  },
  pt: {
    emptyTitle: 'Resumo da Reserva',
    emptySubtitle: 'Selecione uma expedição para visualizar o detalhamento das tarifas.',
    summaryTitle: 'Resumo da sua Viagem',
    adultsLabel: 'Adultos',
    singleSupplement: '+ 50% Suplemento de Viajante Individual (Ocupação individual)',
    childrenLabel: 'Crianças (Desconto -20%)',
    subtotal: 'Subtotal',
    groupDiscount: 'Desconto de Grupo',
    ambassadorDiscount: 'Desconto de Embaixador',
    totalToPay: 'Total a Pagar',
    pendingSteps: 'Etapas pendentes para concluir a reserva:',
    step2Date: 'Etapa 4: Selecione a data da viagem',
    step4Contact: 'Etapa 5: Insira seu nome e e-mail de contato',
    btnPay: 'Prosseguir para o Pagamento Seguro',
    btnComplete: 'Preencher Dados Obrigatórios',
    noChargeNotice: 'Nenhum valor será cobrado agora.',
    btnProcessing: 'Processando...',
  },
  ja: {
    emptyTitle: 'ご予約概要',
    emptySubtitle: '料金の内訳を表示するには遠征ツアーを選択してください。',
    summaryTitle: 'ご旅程とお見積りサマリー',
    adultsLabel: '大人',
    singleSupplement: '+ 50% 1名様参加追加代金 (シングル利用)',
    childrenLabel: 'お子様 (20%割引)',
    subtotal: '小計',
    groupDiscount: 'グループ割引',
    ambassadorDiscount: 'アンバサダー割引',
    totalToPay: '合計お支払い金額',
    pendingSteps: 'お手続き完了までに必要な項目:',
    step2Date: 'ステップ4: ご出発日を選択してください',
    step4Contact: 'ステップ5: お名前とメールアドレスをご入力ください',
    btnPay: '安全な決済ページへ進む',
    btnComplete: '必須項目を入力してください',
    noChargeNotice: '現時点で料金が引き落とされることはありません。',
    btnProcessing: '処理中...',
  },
  zh: {
    emptyTitle: '预订费用总览',
    emptySubtitle: '请选择专属探险路线以查看完整费用明细。',
    summaryTitle: '您的专属行程明细',
    adultsLabel: '成人',
    singleSupplement: '+ 50% 单人差价附加费 (单人单房)',
    childrenLabel: '儿童 (享20%减免)',
    subtotal: '费用小计',
    groupDiscount: '团队优惠折扣',
    ambassadorDiscount: '大使专属折扣',
    totalToPay: '应付费用总额',
    pendingSteps: '确认预订前尚需完成的步骤：',
    step2Date: '第4步：请选择您的出发日期',
    step4Contact: '第5步：请输入您的姓名与电子邮箱',
    btnPay: '前往安全收银台结算',
    btnComplete: '填写必填信息',
    noChargeNotice: '当前阶段不会立即扣除任何费用。',
    btnProcessing: '处理中...',
  },
};

const DATE_LOCALES: Record<string, string> = {
  es: 'es-ES',
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-BR',
  ja: 'ja-JP',
  zh: 'zh-CN',
};

export function PriceCalculator({
  tours,
  pricing,
  date,
  contactInfo,
  onContinue,
  canContinue,
  step,
  affiliateRef,
  isProcessing = false,
  tier = 'standard' // <-- Valor por defecto agregado
}: PriceCalculatorProps) {
  const locale = useLocale();
  const t = PRICE_CALC_I18N[locale] || PRICE_CALC_I18N['en'];

  if (!tours || tours.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col justify-center items-center text-center space-y-4">
        <Wallet className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{t.emptyTitle}</h3>
          <p className="text-sm text-zinc-500 mt-2">{t.emptySubtitle}</p>
        </div>
      </div>
    );
  }

  // 10% affiliate discount calculation (exact to 2 decimals)
  const hasAffiliateDiscount = !!affiliateRef;
  const affiliateDiscountAmount = hasAffiliateDiscount ? Number((pricing.total * 0.10).toFixed(2)) : 0;
  const finalPayableTotal = Number((pricing.total - affiliateDiscountAmount).toFixed(2));

  const formatAmount = (val: number) => {
    return (val % 1 !== 0 || val < 10)
      ? val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : val.toLocaleString('en-US');
  };

  return (
    <div className="lux-panel bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-xl sticky top-28">
      <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-6">
        {t.summaryTitle}
      </h3>

      <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {tours.map(tour => {
          const isDailyTour = tour.durationDays === 1 || (typeof tour.duration === 'object' && String(tour.duration.en || '').includes('1 DAY'));
          const displayedPrice = tier === 'vip' && !isDailyTour
            ? tour.price4Star || Math.round((tour.price3Star || tour.price || 1050) * 1.2)
            : tour.price3Star || tour.price || 1050;

          return (
            <div key={tour.id} className="flex gap-4 items-start bg-zinc-50 dark:bg-zinc-800/30 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                <img src={tour.imageUrl} alt={getLocalizedText(tour.title, locale)} width={56} height={56} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white pr-2 leading-snug">{getLocalizedText(tour.title, locale)}</h4>              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center justify-between">
                  <span>{getLocalizedText(tour.duration, locale)}</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">${formatAmount(displayedPrice)}</span>
                </p>
              </div>
            </div>
          );
        })}

        {date && (
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              {new Date(date).toLocaleDateString(DATE_LOCALES[locale] || 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 mb-6" suppressHydrationWarning>
        {pricing.adultsCount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">
              {t.adultsLabel} ({pricing.adultsCount} x ${formatAmount(pricing.basePricePerAdult)})
            </span>
            <span className="font-medium text-zinc-900 dark:text-white">
              ${formatAmount(pricing.adultsTotal - (pricing.singleSupplementApplied ? (pricing.singleSupplementAmount || 0) : 0))}
            </span>
          </div>
        )}

        {pricing.singleSupplementApplied && (
          <div className="flex justify-between text-sm mt-2 pt-2 border-t border-zinc-100/50 dark:border-zinc-800/50">
            <span className="text-amber-700 dark:text-amber-400 font-semibold">{t.singleSupplement}</span>
            <span className="font-bold text-amber-700 dark:text-amber-400">
              +${formatAmount(pricing.singleSupplementAmount || 0)}
            </span>
          </div>
        )}

        {pricing.childrenCount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">{t.childrenLabel} ({pricing.childrenCount} x ${formatAmount(pricing.basePricePerChild)})</span>
            <span className="font-medium text-zinc-900 dark:text-white">${formatAmount(pricing.childrenTotal)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm pt-2">
          <span className="text-zinc-900 dark:text-white font-medium">{t.subtotal}</span>
          <span className="font-medium text-zinc-900 dark:text-white">${formatAmount(pricing.subtotal)}</span>
        </div>

        {pricing.groupDiscountAmount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg mt-2">
            <span className="flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" />
              {t.groupDiscount} ({(pricing.groupDiscountPercentage * 100).toFixed(0)}%)
            </span>
            <span>-${formatAmount(pricing.groupDiscountAmount)}</span>
          </div>
        )}

        {/* 10% Affiliate Referral Discount Display */}
        {hasAffiliateDiscount && (
          <div className="flex justify-between text-sm text-amber-700 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 p-2.5 rounded-xl mt-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t.ambassadorDiscount} (@{affiliateRef}) 10% OFF
            </span>
            <span>-${formatAmount(affiliateDiscountAmount)}</span>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-end justify-between mb-8" suppressHydrationWarning>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mb-1">{t.totalToPay}</p>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-zinc-400">USD</span>
            <span className="lux-amount text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ${formatAmount(finalPayableTotal)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={isProcessing}
        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all duration-300 border-none ${isProcessing
            ? 'bg-zinc-900 dark:bg-zinc-950 border border-emerald-500/40 text-emerald-400 cursor-wait shadow-emerald-950/40'
            : 'bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white shadow-emerald-900/30 hover:scale-[1.02] active:scale-95 group cursor-pointer'
          }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2.5 py-0.5">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin shrink-0" />
            <span className="text-emerald-400 font-bold tracking-wider animate-pulse">{t.btnProcessing}</span>
          </div>
        ) : (
          <>
            <span>{t.btnPay}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-[11px] text-zinc-400 text-center mt-4 flex items-center justify-center gap-1">
        <Info className="w-3 h-3" /> {t.noChargeNotice}
      </p>
    </div>
  );
}