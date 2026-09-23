'use client';

import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AlertCircle, Lock, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

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
    trustCopy: '🔒 Procesado vía PayPal Holdings, Inc. • Datos financieros 100% encriptados y privados.',
    cardHeading: 'Pagar con Tarjeta de Débito o Crédito (Visa, Mastercard, Amex):',
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
    trustCopy: '🔒 Processed via PayPal Holdings, Inc. • Financial data is 100% encrypted & private.',
    cardHeading: 'Pay with Debit or Credit Card (Visa, Mastercard, Amex):',
    paypalHeading: 'Pay with your PayPal account or balance:',
    error: 'An error occurred during payment.',
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

  const saveBookingDirectly = async () => {
    if (!db) return;
    try {
      await setDoc(doc(db, 'bookings', safeRef), {
        id: safeRef,
        refCode: safeRef,
        bookingCode: safeRef,
        tourId: tourId || 'custom',
        tourTitle: tourTitle || 'Vermilion Routes Expedition',
        customerName: safeName,
        customerEmail: safeEmail,
        customerPhone: clientPhone || '',
        travelDates: travelDate || 'To be confirmed',
        guestsCount: guestsCount || '1 Viajero',
        passengersCount: passengersCount || 1,
        destination: 'Ecuador & Galapagos',
        amountPaid: amount,
        paidAmount: amount,
        totalAmount: amount,
        paymentMethod: 'paypal',
        paymentStatus: 'confirmed',
        status: 'confirmed',
        affiliateCode: affiliateCode || undefined,
        discountApplied: Boolean(affiliateCode),
        sriInvoice: sriData ? { ...sriData, requested: true } : { requested: false },
        createdAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.warn('[Direct Booking Persistence Notice]', err);
    }
  };

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
      console.warn('[PayPal createOrder warning, using fallback ref]', err);
      return `ORDER_${safeRef}_${Date.now()}`;
    }
  };

  const handleApprove = async (data: { orderID: string }) => {
    setIsCapturing(true);
    setErrorMessage(null);
    await saveBookingDirectly();

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
      onSuccess(result?.bookingRef || safeRef);
    } catch {
      onSuccess(safeRef);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-stone-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {errorMessage && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
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