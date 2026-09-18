'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  Compass,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  QrCode,
  Sparkles,
  Clock,
  Loader2,
  Copy,
  Check,
  MessageCircle
} from 'lucide-react';

interface TravelVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
  clientInfo: {
    name: string;
    email: string;
    phone?: string;
    date: string;
    adults: number;
    children: number;
    refCode: string;
    hotelTier?: string;
    amountPaid?: number;
    isConfirmed?: boolean;
  };
  locale: string;
}

export function TravelVoucherModal({
  isOpen,
  onClose,
  tour,
  clientInfo,
  locale
}: TravelVoucherModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen || !tour) return null;

  const handleDownloadPdf = async () => {
    if (!tour || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const { generateTravelVoucherPDF } = await import('@/lib/voucherPdfGenerator');
      const travelersCountStr = clientInfo.adults
        ? `${clientInfo.adults} ${clientInfo.adults === 1 ? 'Adulto' : 'Adultos'}${clientInfo.children ? `, ${clientInfo.children} Niños` : ''}`
        : '1 Viajero';

      await generateTravelVoucherPDF({
        bookingRef: clientInfo.refCode,
        customerName: clientInfo.name,
        customerEmail: clientInfo.email,
        customerPhone: clientInfo.phone,
        tourTitle: getLocalizedText(tour.title, locale),
        destination: typeof tour.destination === 'string' ? tour.destination : 'Ecuador & Galápagos',
        travelDate: clientInfo.date,
        travelersCount: travelersCountStr,
        totalAmount: clientInfo.amountPaid || 0,
        paymentMethod: clientInfo.isConfirmed ? 'PayPal / Tarjeta' : 'Transferencia Bancaria Internacional',
        paymentStatus: clientInfo.isConfirmed ? 'confirmed' : 'pending_payment',
        locale,
      });
    } catch (err) {
      console.error('Error generating PDF voucher:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const copyBookingCode = () => {
    if (!clientInfo.refCode) return;
    navigator.clipboard.writeText(clientInfo.refCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const tourTitle = getLocalizedText(tour.title, locale);
  const duration = getLocalizedText(tour.duration, locale);
  const isEs = locale === 'es';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-emerald-900/60 rounded-3xl shadow-2xl overflow-hidden my-6 sm:my-8 text-white">
        
        {/* Top Actions Bar (Sticky & always visible) */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {isEs ? 'Comprobante Oficial de Expedición & Itinerario' : 'Official Expedition Voucher & Itinerary'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95 disabled:opacity-60"
            >
              {isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isEs ? 'Descargar Voucher Oficial (PDF)' : 'Download Official Voucher (PDF)'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
              aria-label={isEs ? 'Cerrar' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Body */}
        <div
          id="vermilion-travel-voucher"
          ref={printAreaRef}
          className="p-6 sm:p-8 space-y-6 bg-zinc-950 text-zinc-100 print:p-0 print:bg-white print:text-zinc-900 print:space-y-4"
        >
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-900/50 pb-5 print:border-zinc-300 voucher-break-avoid">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-emerald-500 print:text-emerald-700" />
                <span className="font-serif font-black tracking-widest uppercase text-base text-white print:text-black">
                  VERMILION ROUTES
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 print:text-zinc-600 mt-0.5 font-medium">
                Agencia de Viajes Vermilion Cia. Ltda. • RUC: 1711992808001
              </p>
              <p className="text-[9px] text-zinc-500 print:text-zinc-500 max-w-md leading-tight mt-0.5">
                Sede Ecuador: Monteserrín, De los Lirios N45-206 y Julio Arellano, 3er Piso, Quito (CP 170503) • Sede España (Coral Tour): Calle Seco 3, 28007 Madrid, España
              </p>
            </div>

            <div className="text-left sm:text-right bg-emerald-950/60 print:bg-emerald-50 p-3 rounded-2xl border border-emerald-800/60 print:border-emerald-300">
              <span className="text-[9px] uppercase font-bold text-emerald-400 print:text-emerald-800 block">
                {isEs ? 'Código de Reserva' : 'Booking Reference Code'}
              </span>
              <div className="flex items-center gap-2 justify-start sm:justify-end">
                <span className="font-mono text-base font-bold text-white print:text-zinc-900 tracking-wider">
                  {clientInfo.refCode || `R-${new Date().getFullYear()}-1.1-80`}
                </span>
                <button
                  type="button"
                  onClick={copyBookingCode}
                  className="p-1 rounded-md bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 print:hidden transition-all cursor-pointer"
                  title={isEs ? 'Copiar código de reserva' : 'Copy booking code'}
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className={`flex items-center gap-1 text-[10px] mt-0.5 justify-start sm:justify-end ${
                clientInfo.isConfirmed === false 
                  ? 'text-amber-300 print:text-amber-800 font-semibold' 
                  : 'text-emerald-300 print:text-emerald-800 font-semibold'
              }`}>
                {clientInfo.isConfirmed === false ? (
                  <>
                    <Clock className="w-3 h-3 text-amber-400 print:text-amber-700" />
                    <span>{isEs ? 'Reserva en Espera de Pago' : 'Pending Payment Transfer'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 print:text-emerald-700" />
                    <span>{isEs ? 'Confirmado & Garantizado' : 'Confirmed & Guaranteed'}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Passenger & Trip Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-zinc-900/80 print:bg-zinc-50 p-3.5 rounded-2xl border border-zinc-800 print:border-zinc-200 text-xs voucher-break-avoid">
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">
                {isEs ? 'Pasajero Principal' : 'Lead Guest'}
              </p>
              <p className="font-bold text-white print:text-black truncate">{clientInfo.name || (isEs ? 'Viajero Distinguido' : 'Valued Guest')}</p>
              <p className="text-[10px] text-zinc-400 print:text-zinc-600 truncate">{clientInfo.email || 'info@vermilionroutes.com'}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">
                {isEs ? 'Fechas de Viaje' : 'Travel Dates'}
              </p>
              <p className="font-bold text-white print:text-black">{clientInfo.date || (isEs ? 'Por confirmar' : 'To be confirmed')}</p>
              <p className="text-[10px] text-zinc-400 print:text-zinc-600">{duration}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">
                {isEs ? 'Viajeros & Categoría' : 'Travelers & Tier'}
              </p>
              <p className="font-bold text-white print:text-black">{clientInfo.adults} {isEs ? 'Adultos' : 'Adults'} {clientInfo.children > 0 ? `• ${clientInfo.children} N` : ''}</p>
              <p className="text-[10px] text-zinc-400 print:text-zinc-600 truncate">{clientInfo.hotelTier || 'Vermilion VIP'}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">
                {isEs ? 'Monto Registrado' : 'Amount'}
              </p>
              <p className="font-mono text-sm font-extrabold text-emerald-400 print:text-emerald-700">
                ${(clientInfo.amountPaid || 1050).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </p>
              <p className="text-[10px] text-zinc-400 print:text-zinc-600">{clientInfo.isConfirmed === false ? (isEs ? 'Pendiente Transferencia' : 'Wire Pending') : (isEs ? '100% Garantizado' : 'Guaranteed')}</p>
            </div>
          </div>

          {/* Tour Title & Highlights */}
          <div className="space-y-1 voucher-break-avoid">
            <h2 className="text-base sm:text-lg font-bold font-serif text-white print:text-zinc-900 leading-snug">
              {tourTitle}
            </h2>
            <p className="text-[11px] text-zinc-300 print:text-zinc-700 leading-relaxed">
              {getLocalizedText(tour.description || tour.shortDescription, locale)}
            </p>
          </div>

          {/* Day-by-Day Itinerary Summary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="space-y-2 pt-1">
              <h3 className="text-[11px] uppercase font-bold text-emerald-400 print:text-emerald-800 tracking-wider">
                {isEs ? 'Cronograma Completo de la Expedición' : 'Complete Expedition Schedule'}
              </h3>
              <div className="space-y-2 text-xs">
                {tour.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="p-2.5 bg-zinc-900/50 print:bg-zinc-50 border border-zinc-800/80 print:border-zinc-200 rounded-xl space-y-1 voucher-break-avoid"
                  >
                    <div className="flex justify-between items-center font-bold text-white print:text-black text-[11px]">
                      <span>{isEs ? `Día ${day.day}:` : `Day ${day.day}:`} {getLocalizedText(day.title, locale)}</span>
                      {day.meals && <span className="text-[10px] font-semibold text-emerald-400 print:text-emerald-700">{getLocalizedText(day.meals, locale)}</span>}
                    </div>
                    <p className="text-zinc-300 print:text-zinc-700 text-[10px] leading-relaxed line-clamp-3">
                      {getLocalizedText(day.description, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Guarantees */}
          <div className="p-3 bg-emerald-950/40 print:bg-emerald-50 border border-emerald-900/50 print:border-emerald-200 rounded-2xl text-xs space-y-1.5 voucher-break-avoid">
            <p className="font-bold text-[11px] text-emerald-300 print:text-emerald-900">
              {isEs ? 'Incluido con tu Expedición Vermilion Routes:' : 'Included with your Vermilion Routes Expedition:'}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-zinc-300 print:text-zinc-700 text-[10px] list-disc list-inside">
              <li>{isEs ? 'Guías Naturalistas bilingües certificados de Galápagos y Parque Nacional' : 'Certified Bilingual Galapagos & National Park Naturalist Guides'}</li>
              <li>{isEs ? 'Todos los traslados VIP terrestres y marítimos privados' : 'All VIP private ground and maritime transfers'}</li>
              <li>{isEs ? 'Alojamientos boutique de naturaleza y confort según especificación' : 'Boutique comfort & nature accommodations as specified'}</li>
              <li>{isEs ? 'Excursiones, equipo de snorkel de alta gama y permisos privados' : 'Excursions, snorkeling gear & private permits'}</li>
              <li>{isEs ? 'Asistencia y Concierge dedicado 24/7 en ruta' : '24/7 Dedicated Concierge Support en route'}</li>
            </ul>
          </div>

          {/* Footer & Emergency Concierge Hotline */}
          <div className="pt-3 border-t border-zinc-800 print:border-zinc-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-zinc-400 print:text-zinc-600 voucher-break-avoid">
            <div>
              <p className="font-semibold text-white print:text-black text-[11px]">
                {isEs ? 'Asistencia y Concierge 24/7 WhatsApp:' : '24/7 Concierge & WhatsApp Emergency Assistance:'}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <a
                  href={`https://wa.me/593960039156?text=${encodeURIComponent(
                    isEs
                      ? `Hola Vermilion Routes, les contacto con respecto a mi reserva ${clientInfo.refCode || 'R-2026-1.1-80'} para ${tourTitle}.`
                      : `Hello Vermilion Routes, I am contacting you regarding my booking ${clientInfo.refCode || 'R-2026-1.1-80'} for ${tourTitle}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-all print:hidden shadow-sm active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>{isEs ? 'WhatsApp Concierge' : 'WhatsApp Concierge'}</span>
                </a>
                <span className="text-emerald-400 print:text-emerald-700 font-mono text-[10px]">+593-96-003-9156 &bull; <span>info</span>&#64;<span>vermilionroutes.com</span></span>
              </div>
            </div>

            <div className="text-left sm:text-right text-[9px] text-zinc-500">
              <p>© {new Date().getFullYear()} Agencia de Viajes Vermilion Cia. Ltda.</p>
              <p>{isEs ? 'Emitido bajo Términos y Condiciones oficiales.' : 'Issued under official Terms & Conditions.'}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

