'use client';

import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AlertCircle, Lock, ShieldCheck } from 'lucide-react';

interface PayPalCheckoutButtonProps {
  amount: number;
  bookingRef: string;
  tourId?: string;
  tourTitle?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  travelDate?: string;
  guestsCount?: string;
  passengersCount?: number;
  locale?: string;
  currency?: string;
  affiliateCode?: string;
  sriData?: {
    ruc: string;
    razonSocial: string;
    direccionFiscal: string;
  };
  onSuccess: (bookingRef: string) => void;
  onError?: (err: any) => void;
}

const PAYPAL_I18N: Record<string, {
  sslEncrypted: string;
  confirming: string;
  payWithPayPal: string;
  errorProcessing: string;
  errorInitiating: string;
  defaultTravelerName: string;
  trustCopy: string;
  protectionBadge: string;
  paypalHeading: string;
  cardHeading: string;
  error: string;
}> = {
  es: {
    sslEncrypted: 'Cifrado SSL 256-Bit',
    confirming: 'Confirmando pago seguro con PayPal...',
    payWithPayPal: 'Pagar con PayPal / Tarjeta Internacional',
    errorProcessing: 'Error al procesar el pago con PayPal.',
    errorInitiating: 'Error al iniciar la orden en PayPal.',
    defaultTravelerName: 'Viajero Distinguido',
    protectionBadge: '🛡️ Garantía Oficial PayPal Buyer Protection (180 Días): Reserva 100% protegida contra fraude, estafas o incumplimiento.',
    trustCopy: '🔒 Procesado vía PayPal Holdings, Inc. • Cifrado bancario 256-bit. Acepta Visa, Mastercard, American Express, Discover, Diners Club, JCB y UnionPay.',
    cardHeading: 'Pagar con Tarjeta Internacional (Visa, Mastercard, Amex, Discover, Diners, JCB, UnionPay):',
    paypalHeading: 'Pagar con tu saldo o cuenta de PayPal:',
    error: 'Ocurrió un error en el pago.',
  },
  en: {
    sslEncrypted: '256-Bit SSL Encrypted',
    confirming: 'Confirming secure payment with PayPal...',
    payWithPayPal: 'Pay with PayPal / International Card',
    errorProcessing: 'Error processing payment with PayPal.',
    errorInitiating: 'Error initiating PayPal order.',
    defaultTravelerName: 'Valued Traveler',
    protectionBadge: '🛡️ Official PayPal Buyer Protection (180 Days): 100% fraud-proof, dispute-backed & anti-scam guaranteed.',
    trustCopy: '🔒 Processed via PayPal Holdings, Inc. • 256-bit bank encryption. Accepts Visa, Mastercard, American Express, Discover, Diners Club, JCB & UnionPay.',
    cardHeading: 'Pay with International Debit or Credit Card (Visa, Mastercard, Amex, Discover, Diners, JCB, UnionPay):',
    paypalHeading: 'Pay with your PayPal account or balance:',
    error: 'An error occurred during payment.',
  },
  fr: {
    sslEncrypted: 'Chiffrement SSL 256 bits',
    confirming: 'Confirmation du paiement sécurisé PayPal...',
    payWithPayPal: 'Payer avec PayPal / Carte Internationale',
    errorProcessing: 'Erreur lors du traitement du paiement PayPal.',
    errorInitiating: 'Erreur lors de l\'initialisation PayPal.',
    defaultTravelerName: 'Voyageur Distingué',
    protectionBadge: '🛡️ Protection des Achats PayPal (180 Jours) : Réservation 100% couverte contre la fraude et les litiges.',
    trustCopy: '🔒 Traité via PayPal Holdings, Inc. • Chiffrement 256 bits. Accepte Visa, Mastercard, Amex, Discover, Diners, JCB et UnionPay.',
    cardHeading: 'Payer par Carte Bancaire (Visa, Mastercard, Amex, Discover, Diners, JCB, UnionPay) :',
    paypalHeading: 'Payer avec votre compte PayPal :',
    error: 'Une erreur est survenue lors du paiement.',
  },
  de: {
    sslEncrypted: '256-Bit-SSL-Verschlüsselung',
    confirming: 'Sichere PayPal-Zahlung wird bestätigt...',
    payWithPayPal: 'Mit PayPal / Internationaler Karte zahlen',
    errorProcessing: 'Fehler bei der PayPal-Verarbeitung.',
    errorInitiating: 'Fehler beim Starten der PayPal-Bestellung.',
    defaultTravelerName: 'Geschätzter Reisender',
    protectionBadge: '🛡️ Offizieller PayPal-Käuferschutz (180 Tage): 100% abgesichert gegen Betrug und Ausfall.',
    trustCopy: '🔒 Über PayPal Holdings, Inc. verarbeitet • 256-Bit-Verschlüsselung. Akzeptiert Visa, Mastercard, Amex, Discover, Diners, JCB & UnionPay.',
    cardHeading: 'Mit Debit- oder Kreditkarte zahlen (Visa, Mastercard, Amex, Discover, Diners, JCB, UnionPay):',
    paypalHeading: 'Mit PayPal-Guthaben oder -Konto zahlen:',
    error: 'Bei der Zahlung ist ein Fehler aufgetreten.',
  },
  it: {
    sslEncrypted: 'Crittografia SSL a 256 bit',
    confirming: 'Conferma del pagamento sicuro con PayPal...',
    payWithPayPal: 'Paga con PayPal / Carta Internazionale',
    errorProcessing: 'Errore durante l\'elaborazione del pagamento PayPal.',
    errorInitiating: 'Errore durante l\'avvio dell\'ordine PayPal.',
    defaultTravelerName: 'Viaggiatore Pregiato',
    protectionBadge: '🛡️ Protezione Acquisti PayPal Ufficiale (180 Giorni): Prenotazione protetta al 100% contro le frodi.',
    trustCopy: '🔒 Elaborato tramite PayPal Holdings, Inc. • Crittografia a 256 bit. Accetta Visa, Mastercard, Amex, Discover, Diners, JCB e UnionPay.',
    cardHeading: 'Paga con Carta Internazionale (Visa, Mastercard, Amex, Discover, Diners, JCB, UnionPay):',
    paypalHeading: 'Paga con il tuo conto PayPal:',
    error: 'Si è verificato un errore durante il pagamento.',
  },
  pt: {
    sslEncrypted: 'Criptografia SSL de 256 bits',
    confirming: 'Confirmando pagamento seguro com PayPal...',
    payWithPayPal: 'Pagar com PayPal / Cartão Internacional',
    errorProcessing: 'Erro ao processar pagamento com PayPal.',
    errorInitiating: 'Erro ao iniciar pedido no PayPal.',
    defaultTravelerName: 'Viajante Ilustre',
    protectionBadge: '🛡️ Proteção ao Comprador PayPal (180 Dias): Reserva 100% protegida contra fraudes e golpes.',
    trustCopy: '🔒 Processado via PayPal Holdings, Inc. • Criptografia de 256 bits. Aceita Visa, Mastercard, Amex, Discover, Diners, JCB e UnionPay.',
    cardHeading: 'Pagar com Cartão Internacional (Visa, Mastercard, Amex, Discover, Diners, JCB, UnionPay):',
    paypalHeading: 'Pagar com sua conta PayPal:',
    error: 'Ocorreu um erro durante o pagamento.',
  },
  ja: {
    sslEncrypted: '256ビットSSL暗号化',
    confirming: 'PayPal安全決済を確認中...',
    payWithPayPal: 'PayPal / 国際クレジットカードで支払う',
    errorProcessing: 'PayPal決済処理中にエラーが発生しました。',
    errorInitiating: 'PayPal注文の開始中にエラーが発生しました。',
    defaultTravelerName: '大切なお客様',
    protectionBadge: '🛡️ PayPal公式買い手保護制度（180日間）：詐欺やトラブルから100%保護された安心の公式決済。',
    trustCopy: '🔒 PayPal Holdings, Inc.公式処理 • 256ビット暗号化。Visa、Mastercard、American Express、Discover、Diners Club、JCB、銀聯(UnionPay)に対応。',
    cardHeading: '国際クレジットカードまたはデビットカードで支払う（Visa、Mastercard、Amex、JCB、銀聯 等）：',
    paypalHeading: 'PayPal残高またはアカウントで支払う：',
    error: 'お支払い中にエラーが発生しました。',
  },
  zh: {
    sslEncrypted: '256位SSL银行级加密',
    confirming: '正在确认 PayPal 官方安全支付...',
    payWithPayPal: '使用 PayPal / 国际双币卡安全支付',
    errorProcessing: '处理 PayPal 支付时出错。',
    errorInitiating: '发起 PayPal 订单时出错。',
    defaultTravelerName: '尊贵旅客',
    protectionBadge: '🛡️ PayPal 官方买家保障计划（180天全程无忧保障）：100%防欺诈与未履约纠纷退款机制保障出行。',
    trustCopy: '🔒 由 PayPal Holdings, Inc. 官方加密处理 • 256位银行级加密，全面支持 Visa、Mastercard、American Express (运通)、Discover、Diners Club、JCB 以及 银联 (UnionPay)。',
    cardHeading: '使用国际信用卡或借记卡支付（支持 Visa、Mastercard、Amex、JCB、银联 等）：',
    paypalHeading: '使用 PayPal 账户或余额支付：',
    error: '支付过程中发生错误。',
  },
};

export function PayPalCheckoutButton({
  amount,
  bookingRef,
  tourId,
  tourTitle,
  clientName,
  clientEmail,
  clientPhone,
  travelDate,
  guestsCount,
  passengersCount = 1,
  locale = 'es',
  currency = 'USD',
  affiliateCode,
  sriData,
  onSuccess,
  onError,
}: PayPalCheckoutButtonProps) {

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const t = PAYPAL_I18N[locale] || PAYPAL_I18N['es'];

  const safeEmail = (clientEmail && clientEmail.includes('@')) ? clientEmail.trim().toLowerCase() : 'guest@vermilionroutes.com';
  const safeName = (clientName || clientEmail?.split('@')[0] || t.defaultTravelerName).trim();
  const safeRef = (bookingRef && bookingRef.trim().length >= 3)
    ? bookingRef.trim()
    : `R-2026-1.1-${Date.now().toString().slice(-4)}`;

  const handleCreateOrder = async () => {
    try {
      const res = await fetch('/api/checkout/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          bookingRef: safeRef,
          tourId,
          tourTitle,
          clientName: safeName,
          clientEmail: safeEmail,
          clientPhone,
          travelDate,
          guestsCount,
          locale,
          currency,
          affiliateCode,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.orderId) {
        throw new Error(data.message || data.error || 'Failed to create PayPal order');
      }
      return data.orderId;
    } catch (err: any) {
      setErrorMessage(err?.message || t.errorInitiating);
      throw err;
    }
  };

  const handleApprove = async (data: { orderID: string }) => {
    setIsCapturing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/checkout/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: data.orderID,
          bookingRef: safeRef,
          tourId,
          tourTitle,
          clientName: safeName,
          clientEmail: safeEmail,
          amount,
          travelDate,
          guestsCount,
          passengersCount,
          locale,
          affiliateCode,
          sriInvoice: sriData ? { ...sriData, requested: true } : { requested: false },
        }),
      });

      const result = await res.json();
      if (!res.ok || !result?.success) {
        throw new Error(result?.message || result?.error || t.errorProcessing);
      }
      onSuccess(result?.bookingRef || safeRef);
    } catch (err: any) {
      setErrorMessage(err?.message || t.errorProcessing);
      if (onError) onError(err);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-stone-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {errorMessage && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-700 dark:text-rose-400 space-y-2">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
          <p className="text-[11px] text-stone-600 dark:text-zinc-300 leading-relaxed">
            {locale === 'es'
              ? '💡 Muchos bancos internacionales requieren confirmación previa para compras de viajes. Puedes pagar por transferencia bancaria directa o solicitar un enlace de pago alternativo a tu Concierge 24/7:'
              : '💡 International banks frequently require authorization for high-value travel bookings. You can complete your reservation via direct bank wire or request an alternate payment link from your 24/7 Concierge:'}
          </p>
          <a
            href={`https://wa.me/593960039156?text=${encodeURIComponent(
              locale === 'es'
                ? `Hola Vermilion Routes, tuve un problema al procesar mi pago para ${tourTitle || 'mi expedición'} (Ref: ${safeRef}). ¿Me pueden asistir con un método alternativo o transferencia?`
                : `Hello Vermilion Routes, I encountered an issue processing payment for ${tourTitle || 'my expedition'} (Ref: ${safeRef}). Could you please assist me with an alternate method or wire transfer?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all"
          >
            <span>{locale === 'es' ? 'Asistencia Inmediata por WhatsApp 24/7' : 'Instant 24/7 WhatsApp Assistance'}</span>
          </a>
        </div>
      )}

      <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-100 dark:border-white/5">
        <span className="font-semibold text-stone-700 dark:text-zinc-300 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          {t.sslEncrypted}
        </span>
        <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
          USD ${(amount || 0).toLocaleString('en-US')}
        </span>
      </div>

      {/* Distintivo de Confianza Máxima: Seguro Antiestafas y Protección al Comprador PayPal */}
      <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2 shadow-xs">
        <span className="shrink-0 text-sm">🛡️</span>
        <div className="space-y-0.5">
          <p className="font-bold text-[11px] leading-tight text-emerald-950 dark:text-emerald-100">
            {t.protectionBadge}
          </p>
        </div>
      </div>

      {isCapturing ? (
        <div className="py-8 flex flex-col items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400">
          <div className="w-8 h-8 border-2 border-emerald-600 dark:border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">{t.confirming}</span>
        </div>
      ) : (
        <div className="min-h-[140px] relative">
          <PayPalScriptProvider
            options={{
              clientId: clientId,
              currency: currency || 'USD',
              intent: 'capture',
              components: 'buttons',
              enableFunding: 'card',
            }}
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-stone-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>{t.cardHeading}</span>
                </p>
                <PayPalButtons
                  fundingSource="card"
                  style={{ layout: 'vertical', shape: 'rect', color: 'black', height: 44, label: 'pay', tagline: false }}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                  onError={(err) => {
                    console.warn('[PayPal Card Buttons Error]', err);
                    if (onError) onError(err);
                  }}
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-white/5">
                <p className="text-[11px] font-semibold text-stone-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>{t.paypalHeading}</span>
                </p>
                <PayPalButtons
                  fundingSource="paypal"
                  style={{ layout: 'vertical', shape: 'rect', color: 'gold', height: 44, label: 'pay', tagline: false }}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                  onError={(err) => {
                    console.warn('[PayPal Buttons Error]', err);
                    if (onError) onError(err);
                  }}
                />
              </div>
            </div>
          </PayPalScriptProvider>
        </div>
      )}

      <p className="text-[10px] text-center text-stone-400 dark:text-zinc-500 pt-1">
        {t.trustCopy}
      </p>
    </div>
  );
}
