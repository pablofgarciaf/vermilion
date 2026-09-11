'use client';

import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  Printer,
  Copy,
  Check,
  MessageCircle,
  Clock
} from 'lucide-react';
import { mockTours } from '@/data/mock';
import { TravelVoucherModal } from '@/components/booking/TravelVoucherModal';
import { useLocale } from 'next-intl';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === 'es';

  const sessionId = searchParams.get('session_id') || '';
  const refParam = searchParams.get('ref') || (sessionId ? `VR-${sessionId.slice(-6).toUpperCase()}` : `VR-${Date.now().toString().slice(-6)}`);
  const tourTitleParam = searchParams.get('tourTitle') || 'Vermilion Routes Expedition';
  const tourIdParam = searchParams.get('tourId') || 'custom';
  const nameParam = searchParams.get('name') || '';
  const emailParam = searchParams.get('email') || '';
  const dateParam = searchParams.get('date') || '';
  const amountParam = searchParams.get('amount') || '';
  const guestsParam = searchParams.get('guests') || '';

  const [copied, setCopied] = useState(false);
  const [voucherOpen, setVoucherOpen] = useState(false);

  const [clientDetails, setClientDetails] = useState({
    name: nameParam,
    email: emailParam,
    date: dateParam || (isEs ? 'Por confirmar' : 'To be confirmed'),
    amount: Number(amountParam) || 0,
    guests: guestsParam || (isEs ? '2 Viajeros' : '2 Travelers'),
    ref: refParam,
  });

  useEffect(() => {
    const stored = getStoredUserProfile();
    const initialName = nameParam || stored.name || '';
    const initialEmail = emailParam || stored.email || '';

    setClientDetails((prev) => ({
      ...prev,
      name: initialName || prev.name,
      email: initialEmail || prev.email,
    }));

    if (sessionId) {
      fetch('/api/checkout/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          ref: refParam,
          tourId: tourIdParam,
          tourTitle: tourTitleParam,
          clientName: initialName,
          clientEmail: initialEmail,
          amount: Number(amountParam) || undefined,
          travelDate: dateParam,
          guestsCount: guestsParam,
          locale,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.booking) {
            const b = data.booking;
            setClientDetails({
              name: b.customerName || initialName || 'Viajero Vermilion',
              email: b.customerEmail || initialEmail,
              date: b.travelDate || dateParam || (isEs ? 'Por confirmar' : 'To be confirmed'),
              amount: b.amountPaid || Number(amountParam) || 0,
              guests: b.guestsCount || guestsParam || (isEs ? '2 Viajeros' : '2 Travelers'),
              ref: b.refCode || refParam,
            });
            if (b.customerName || b.customerEmail) {
              saveStoredUserProfile({
                name: b.customerName,
                email: b.customerEmail,
                phone: b.customerPhone,
              });
            }
          }
        })
        .catch((e) => console.warn('[checkout/success] verify-session notice:', e));
    }
  }, [sessionId, refParam]);


  const matchedTour = mockTours.find((t) => t.id === tourIdParam || t.title.en === tourTitleParam) || mockTours[0];

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refParam);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    isEs
      ? `¡Hola Vermilion Routes! Acabo de confirmar mi reserva con código ${refParam}. Quisiera coordinar los detalles de mi viaje.`
      : `Hello Vermilion Routes! I have just confirmed my reservation with reference code ${refParam}. I would like to coordinate my trip details.`
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* 🌟 Luxury Confirmation Header */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-500 shadow-xl shadow-emerald-500/10 mb-2">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEs ? 'Pago Procesado con Éxito' : 'Payment Successfully Processed'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-zinc-900 dark:text-white tracking-tight leading-tight">
            {isEs ? '¡Tu Expedición está Confirmada!' : 'Your Expedition is Confirmed!'}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            {isEs
              ? 'Hemos recibido tu pago a través de Stripe de manera 100% segura. Tu plaza y logística privada en Ecuador y Galápagos han sido reservadas.'
              : 'We have received your payment via Stripe securely. Your private naturalist travel slot across Ecuador and Galápagos has been reserved.'}
          </p>
        </div>

        {/* 📋 Reservation Card */}
        <div className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-white/5 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block mb-1">
                {isEs ? 'Código de Referencia' : 'Booking Reference'}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  {refParam}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
                  title={isEs ? 'Copiar código' : 'Copy code'}
                  aria-label="Copy reference code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4" />
              <span>{isEs ? 'Garantía Vermilion 24/7' : 'Vermilion 24/7 Protected'}</span>
            </div>
          </div>

          {/* Expedition Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-white/5">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block">
                {isEs ? 'Expedición Seleccionada' : 'Selected Expedition'}
              </span>
              <p className="font-serif font-bold text-zinc-900 dark:text-white text-base">
                {matchedTour ? (typeof matchedTour.title === 'string' ? matchedTour.title : (matchedTour.title as any)[locale] || (matchedTour.title as any).en) : tourTitleParam}
              </p>
            </div>

            <div className="space-y-1 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-white/5">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block">
                {isEs ? 'Estado de la Transacción' : 'Transaction Status'}
              </span>
              <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEs ? 'Pagado y Verificado (Stripe)' : 'Paid & Verified (Stripe)'}</span>
              </p>
            </div>
          </div>

          {/* Timeline of next steps */}
          <div className="space-y-3 pt-2">
            <h2 className="font-serif font-semibold text-zinc-900 dark:text-white text-sm">
              {isEs ? 'Próximos Pasos:' : 'What Happens Next:'}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5 text-xs">
                  1
                </span>
                <p>
                  {isEs
                    ? 'Recibirás un correo electrónico de confirmación con el resumen completo de tu reserva y recibo oficial.'
                    : 'You will receive a confirmation email containing your full reservation summary and receipt.'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5 text-xs">
                  2
                </span>
                <p>
                  {isEs
                    ? 'Tu Travel Concierge asignado se comunicará en menos de 24 horas para personalizar preferencias dietéticas y transfers.'
                    : 'Your dedicated Travel Concierge will reach out within 24 hours to coordinate dietary preferences and airport transfers.'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5 text-xs">
                  3
                </span>
                <p>
                  {isEs
                    ? 'Te enviaremos el dossier oficial con el checklist de equipaje para Galápagos y los Andes.'
                    : 'You will receive the official expedition packing dossier tailored for Galápagos and Andean climates.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setVoucherOpen(true)}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl border-2 border-emerald-500/40 hover:border-emerald-500 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>{isEs ? 'Ver / Imprimir Voucher' : 'View / Print Voucher'}</span>
            </button>

            <a
              href={`https://wa.me/593998800000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isEs ? 'Contactar Concierge WhatsApp' : 'WhatsApp Travel Concierge'}</span>
            </a>
          </div>
        </div>

        {/* Back to Tours link */}
        <div className="text-center pt-2">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
          >
            <span>{isEs ? '← Volver al Catálogo de Expediciones' : '← Back to Expeditions Catalog'}</span>
          </Link>
        </div>

      </div>

      {/* Travel Voucher Modal */}
      {matchedTour && (
        <TravelVoucherModal
          isOpen={voucherOpen}
          onClose={() => setVoucherOpen(false)}
          tour={matchedTour}
          clientInfo={{
            name: clientDetails.name || (isEs ? 'Viajero Distinguido' : 'Valued Guest'),
            email: clientDetails.email || 'info@vermilionroutes.com',
            phone: '',
            date: clientDetails.date || (isEs ? 'Por confirmar' : 'To be confirmed'),
            adults: 2,
            children: 0,
            refCode: clientDetails.ref || refParam,
            amountPaid: clientDetails.amount,
            isConfirmed: true,
          }}
          locale={locale}
        />
      )}
    </div>
  );
}
