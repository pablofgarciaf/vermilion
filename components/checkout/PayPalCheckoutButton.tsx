'use client';

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { AlertCircle, Lock, ShieldCheck, Sparkles } from 'lucide-react';

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
  locale?: string;
  affiliateCode?: string;
  onSuccess: (bookingRef: string) => void;
  onError?: (err: any) => void;
}

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
  locale = 'en',
  affiliateCode,
  onSuccess,
  onError,
}: PayPalCheckoutButtonProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
  const isConfigured = Boolean(clientId && clientId !== 'test_client_id');

  const handleCreateOrder = async (): Promise<string> => {
    setErrorMessage(null);
    try {
      const res = await fetch('/api/checkout/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          bookingRef,
          tourId,
          tourTitle,
          clientName,
          clientEmail,
          clientPhone,
          travelDate,
          guestsCount,
          locale,
          affiliateCode,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.orderId) {
        throw new Error(data.message || data.error || 'Failed to create PayPal order');
      }

      return data.orderId;
    } catch (err: any) {
      console.error('[PayPal createOrder error]', err);
      setErrorMessage(err.message || 'Error al iniciar la orden en PayPal.');
      if (onError) onError(err);
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
          bookingRef,
          tourId,
          tourTitle,
          clientName,
          clientEmail,
          amount,
          travelDate,
          guestsCount,
          locale,
          affiliateCode,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || result.error || 'Capture failed');
      }

      onSuccess(result.bookingRef || bookingRef);
    } catch (err: any) {
      console.error('[PayPal capture error]', err);
      setErrorMessage(err.message || 'Error capturando el pago de PayPal.');
      if (onError) onError(err);
    } finally {
      setIsCapturing(false);
    }
  };

  // If PayPal client ID is not configured in .env, display clear guidance with simulation option
  if (!isConfigured) {
    return (
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-3 animate-fade-in">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-left">
            <p className="font-bold text-amber-300">PayPal Business Ecuador (Configuración Pendiente)</p>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Para activar el botón oficial de PayPal Checkout y tarjetas internacionales en vivo, agrega tu Client ID en el panel de Vercel / archivo .env:
            </p>
            <div className="bg-black/60 p-2.5 rounded-xl text-[11px] font-mono text-amber-200 border border-amber-500/20 space-y-0.5">
              <p><strong>Variable Pública:</strong> NEXT_PUBLIC_PAYPAL_CLIENT_ID</p>
              <p><strong>Variable Privada:</strong> PAYPAL_CLIENT_SECRET</p>
            </div>
            <p className="text-[10px] text-zinc-400">
              Una vez configurada, se renderizará automáticamente el botón oficial de PayPal y el botón de Tarjetas de Crédito/Débito.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuccess(bookingRef)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 cursor-pointer border-none"
        >
          <Sparkles className="w-4 h-4" />
          <span>Simular Confirmación de Pago PayPal (Modo Prueba)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {errorMessage && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isCapturing ? (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-emerald-400">
          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Confirmando pago con PayPal...</span>
        </div>
      ) : (
        <PayPalScriptProvider
          options={{
            clientId,
            currency: 'USD',
            intent: 'capture',
            components: 'buttons',
            enableFunding: 'card', // Enables international debit and credit card button
          }}
        >
          <PayPalButtons
            style={{
              layout: 'vertical',
              shape: 'rect',
              color: 'gold',
              label: 'pay',
              tagline: false,
            }}
            createOrder={handleCreateOrder}
            onApprove={handleApprove}
            onError={(err) => {
              console.error('[PayPal Buttons Error]', err);
              setErrorMessage('Error al procesar el pago con PayPal.');
              if (onError) onError(err);
            }}
          />
        </PayPalScriptProvider>
      )}

      <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Acepta cuentas PayPal y tarjetas Visa, Mastercard, American Express</span>
      </div>
    </div>
  );
}
