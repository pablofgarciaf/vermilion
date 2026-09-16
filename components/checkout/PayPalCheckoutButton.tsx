'use client';

import { useEffect, useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AlertCircle, CreditCard, Lock, ShieldCheck, WalletCards } from 'lucide-react';

interface PayPalCheckoutButtonProps {
  amount: number; bookingRef: string; tourId?: string; tourTitle?: string; clientName: string; clientEmail: string; clientPhone?: string; travelDate?: string; guestsCount?: string; passengersCount?: number; locale?: string; affiliateCode?: string; onSuccess: (bookingRef: string) => void; onError?: (err: unknown) => void;
}

const TEXT: Record<string, Record<string, string>> = {
  en: { loading: 'Loading secure PayPal checkout…', confirming: 'Confirming secure payment…', error: 'PayPal could not process this payment.', ssl: '256-Bit SSL Encrypted', trust: 'Processed by PayPal. Your financial details remain encrypted.' },
  es: { loading: 'Cargando el checkout seguro de PayPal…', confirming: 'Confirmando el pago seguro…', error: 'PayPal no pudo procesar este pago.', ssl: 'Cifrado SSL de 256 bits', trust: 'Procesado por PayPal. Tus datos financieros permanecen cifrados.' },
  fr: { loading: 'Chargement du paiement PayPal sécurisé…', confirming: 'Confirmation du paiement sécurisé…', error: 'PayPal n’a pas pu traiter ce paiement.', ssl: 'Chiffrement SSL 256 bits', trust: 'Traité par PayPal. Vos données financières restent chiffrées.' },
  de: { loading: 'Sicherer PayPal-Checkout wird geladen…', confirming: 'Sichere Zahlung wird bestätigt…', error: 'PayPal konnte diese Zahlung nicht verarbeiten.', ssl: '256-Bit-SSL-Verschlüsselung', trust: 'Abwicklung durch PayPal. Ihre Zahlungsdaten bleiben verschlüsselt.' },
  it: { loading: 'Caricamento del checkout PayPal sicuro…', confirming: 'Conferma del pagamento sicuro…', error: 'PayPal non ha potuto elaborare il pagamento.', ssl: 'Crittografia SSL a 256 bit', trust: 'Elaborato da PayPal. I dati finanziari restano crittografati.' },
  pt: { loading: 'Carregando o checkout seguro do PayPal…', confirming: 'Confirmando pagamento seguro…', error: 'O PayPal não conseguiu processar este pagamento.', ssl: 'Criptografia SSL de 256 bits', trust: 'Processado pelo PayPal. Seus dados financeiros permanecem criptografados.' },
  ja: { loading: '安全なPayPal決済を読み込んでいます…', confirming: '安全な決済を確認しています…', error: 'PayPalでこの支払いを処理できませんでした。', ssl: '256ビットSSL暗号化', trust: 'PayPalが処理します。決済情報は暗号化されたままです。' },
  zh: { loading: '正在加载安全的 PayPal 结账…', confirming: '正在确认安全付款…', error: 'PayPal 无法处理这笔付款。', ssl: '256位SSL加密', trust: '由 PayPal 处理，您的财务信息始终加密。' },
};

const PAYMENT_METHOD_TEXT: Record<string, Record<string, string>> = {
  en: { heading: 'Choose how you would like to pay', paypalTitle: 'Pay with your PayPal account', paypalDescription: 'Sign in securely to your PayPal account.', cardTitle: 'Pay with credit or debit card', cardDescription: 'Visa, Mastercard, American Express and other cards accepted by PayPal.', availability: 'Subject to PayPal availability.' },
  es: { heading: 'Elige cómo deseas pagar', paypalTitle: 'Paga con tu cuenta PayPal', paypalDescription: 'Inicia sesión de forma segura en tu cuenta PayPal.', cardTitle: 'Paga con tarjeta de crédito o débito', cardDescription: 'Visa, Mastercard, American Express y otras tarjetas aceptadas por PayPal.', availability: 'Sujeto a disponibilidad de PayPal.' },
  fr: { heading: 'Choisissez votre moyen de paiement', paypalTitle: 'Payer avec votre compte PayPal', paypalDescription: 'Connectez-vous de manière sécurisée à votre compte PayPal.', cardTitle: 'Payer par carte de crédit ou de débit', cardDescription: 'Visa, Mastercard, American Express et autres cartes acceptées par PayPal.', availability: 'Selon la disponibilité de PayPal.' },
  de: { heading: 'Wählen Sie Ihre Zahlungsart', paypalTitle: 'Mit Ihrem PayPal-Konto bezahlen', paypalDescription: 'Melden Sie sich sicher bei Ihrem PayPal-Konto an.', cardTitle: 'Mit Kredit- oder Debitkarte bezahlen', cardDescription: 'Visa, Mastercard, American Express und weitere von PayPal akzeptierte Karten.', availability: 'Je nach Verfügbarkeit bei PayPal.' },
  it: { heading: 'Scegli come desideri pagare', paypalTitle: 'Paga con il tuo conto PayPal', paypalDescription: 'Accedi in modo sicuro al tuo conto PayPal.', cardTitle: 'Paga con carta di credito o debito', cardDescription: 'Visa, Mastercard, American Express e altre carte accettate da PayPal.', availability: 'In base alla disponibilità PayPal.' },
  pt: { heading: 'Escolha como deseja pagar', paypalTitle: 'Pague com sua conta PayPal', paypalDescription: 'Entre com segurança na sua conta PayPal.', cardTitle: 'Pague com cartão de crédito ou débito', cardDescription: 'Visa, Mastercard, American Express e outros cartões aceitos pelo PayPal.', availability: 'Sujeito à disponibilidade do PayPal.' },
  ja: { heading: 'お支払い方法をお選びください', paypalTitle: 'PayPalアカウントで支払う', paypalDescription: 'PayPalアカウントに安全にログインします。', cardTitle: 'クレジットカード／デビットカードで支払う', cardDescription: 'Visa、Mastercard、American ExpressなどPayPal対応カード。', availability: 'PayPalの利用可否により異なります。' },
  zh: { heading: '请选择支付方式', paypalTitle: '使用 PayPal 账户付款', paypalDescription: '安全登录您的 PayPal 账户完成付款。', cardTitle: '使用信用卡或借记卡付款', cardDescription: '支持 Visa、Mastercard、American Express 及其他 PayPal 接受的卡片。', availability: '以 PayPal 的实际可用性为准。' },
};

export function PayPalCheckoutButton({ amount, bookingRef, tourId, tourTitle, clientName, clientEmail, clientPhone, travelDate, guestsCount, passengersCount = 1, locale = 'en', affiliateCode, onSuccess, onError }: PayPalCheckoutButtonProps) {
  const [clientId, setClientId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const t = TEXT[locale] || TEXT.en;
  const methods = PAYMENT_METHOD_TEXT[locale] || PAYMENT_METHOD_TEXT.en;

  useEffect(() => {
    let active = true;
    void fetch('/api/checkout/paypal/config', { cache: 'no-store' })
      .then(async (response) => {
        const config = await response.json();
        if (!response.ok || !config.clientId) throw new Error(config.message || t.error);
        if (active) setClientId(config.clientId);
      })
      .catch((error: unknown) => {
        if (active) setMessage(error instanceof Error ? error.message : t.error);
        onError?.(error);
      });
    return () => { active = false; };
  }, [onError, t.error]);

  const createOrder = async () => {
    const response = await fetch('/api/checkout/paypal/create-order', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, bookingRef, tourId, tourTitle, clientName, clientEmail, clientPhone, travelDate, guestsCount, locale, affiliateCode }),
    });
    const result = await response.json();
    if (!response.ok || !result.orderId) throw new Error(result.message || t.error);
    return result.orderId;
  };

  const captureOrder = async (data: { orderID: string }) => {
    setCapturing(true); setMessage(null);
    try {
      const response = await fetch('/api/checkout/paypal/capture-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.orderID, bookingRef, tourId, tourTitle, clientName, clientEmail, amount, travelDate, guestsCount, passengersCount, locale, affiliateCode }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || t.error);
      onSuccess(result.bookingRef || bookingRef);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.error);
      onError?.(error);
    } finally { setCapturing(false); }
  };

  return <div className="space-y-3">
    {!clientId && !message && <p className="text-center text-xs text-zinc-500">{t.loading}</p>}
    {clientId && <PayPalScriptProvider options={{ clientId, currency: 'USD', intent: 'capture', components: 'buttons', enableFunding: 'card' }}>
      <section aria-label={methods.heading} className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3.5 sm:p-4">
        <p className="px-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-700">{methods.heading}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#0070ba]/25 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-start gap-2.5"><span className="rounded-lg bg-[#0070ba]/10 p-2 text-[#0070ba]"><WalletCards className="h-4 w-4" /></span><div><p className="text-sm font-bold text-zinc-900">{methods.paypalTitle}</p><p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{methods.paypalDescription}</p></div></div>
            <PayPalButtons fundingSource="paypal" style={{ layout: 'vertical', shape: 'rect', color: 'gold', height: 42, label: 'paypal', tagline: false }} createOrder={createOrder} onApprove={captureOrder} onError={(error) => { setMessage(t.error); onError?.(error); }} />
          </div>
          <div className="rounded-xl border border-zinc-300 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-start gap-2.5"><span className="rounded-lg bg-zinc-900 p-2 text-white"><CreditCard className="h-4 w-4" /></span><div><p className="text-sm font-bold text-zinc-900">{methods.cardTitle}</p><p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{methods.cardDescription}</p></div></div>
            <div className="mb-2 flex flex-wrap gap-1.5 text-[9px] font-extrabold tracking-wide"><span className="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-blue-800">VISA</span><span className="rounded border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-orange-800">mastercard</span><span className="rounded border border-sky-200 bg-sky-50 px-1.5 py-0.5 text-sky-800">AMEX</span></div>
            <PayPalButtons fundingSource="card" style={{ layout: 'vertical', shape: 'rect', color: 'black', height: 42, label: 'pay', tagline: false }} createOrder={createOrder} onApprove={captureOrder} onError={(error) => { setMessage(t.error); onError?.(error); }} />
          </div>
        </div>
        <p className="px-1 text-[10px] text-zinc-500">{methods.availability}</p>
      </section>
    </PayPalScriptProvider>}
    {capturing && <p className="text-center text-xs text-zinc-500">{t.confirming}</p>}
    {message && <p role="alert" className="flex gap-2 text-sm text-rose-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{message}</p>}
    <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-500"><span className="inline-flex items-center gap-1"><Lock className="h-3.5 w-3.5" />{t.ssl}</span><span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" />{t.trust}</span></div>
  </div>;
}
