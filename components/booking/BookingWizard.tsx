'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';
import { calculateTourPrice, PricingDetails } from '@/lib/pricing';
import { PriceCalculator } from './PriceCalculator';
import { TravelDatePicker } from './TravelDatePicker';
import { Map, CalendarDays, Users, CheckCircle2, ChevronDown, ExternalLink, Lock, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getStoredAffiliateRef } from '@/components/affiliates/AffiliateTracker';
import { getAffiliateByCode, AffiliateAccount } from '@/lib/affiliates';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';
import { generateBookingCode } from '@/lib/bookings';

const CATEGORIES = [
  { id: 'all', label: 'Todas las Expediciones' },
  { id: 'Ecuador', label: '🏔️ Ecuador Continental' },
  { id: 'Galapagos', label: '🐢 Islas Galápagos' },
  { id: 'Combined', label: '✨ Viajes Combinados' },
  { id: 'FullDay', label: '☀️ Excursiones Full Day' },
];

function filterTours(tours: Tour[], activeFilter: string): Tour[] {
  if (activeFilter === 'all') return tours;
  return tours.filter((tour) => {
    const dest = (typeof tour.destination === 'string' ? tour.destination : (tour.destination as any)?.en || (tour.destination as any)?.es || '').toLowerCase();
    const id = (tour.id || '').toLowerCase();
    const durationDays = tour.durationDays ?? 0;
    const isDaily = durationDays === 1 || id.includes('quito-city') || id.includes('otavalo') || id.includes('papallacta') || id.includes('mindo') || id.includes('antisana') || id.includes('cotopaxi') || id.includes('quilotoa') || dest.includes('full') || dest.includes('daily');
    if (activeFilter === 'FullDay') return isDaily;
    if (activeFilter === 'Ecuador') return !isDaily && (dest.includes('ecuador') || id.includes('volcanoes') || id.includes('andes') || id.includes('snow') || id.includes('fantastic')) && !dest.includes('galapagos') && !id.includes('galapagos');
    if (activeFilter === 'Galapagos') return !isDaily && (dest.includes('galapagos') || id.includes('galapagos')) && !id.includes('ecuador-galapagos');
    if (activeFilter === 'Combined') return !isDaily && (id.includes('ecuador-galapagos') || (dest.includes('galapagos') && dest.includes('ecuador')) || dest.includes('combined'));
    return false;
  });
}

function getComplementarySuggestions(primaryTour: Tour, allTours: Tour[]): { tour: Tour; badge: string; reason: string }[] {
  if (!primaryTour) return [];
  const pid = (primaryTour.id || '').toLowerCase();
  
  if (pid.includes('galapagos')) {
    // Si viene por Galápagos (ej. 5 o 4 días) -> Complementario 1: Ecuador Continental (Andes/Volcanes) + Complementario 2: Grand Tour Completo 12 Días
    const continental = allTours.find(t => t.id === 'volcanoes-rivers-8days') || allTours.find(t => t.id === 'andes-amazon-7days') || allTours[3];
    const grandTour = allTours.find(t => t.id === 'ecuador-galapagos-12days') || allTours.find(t => t.id === 'ecuador-galapagos-11days') || allTours[7];

    return [
      {
        tour: continental,
        badge: '🏔️ Extensión Recomendada (Andes)',
        reason: 'Combina las Islas Encantadas con la Avenida de los Volcanes y la Amazonía sin duplicar vuelos',
      },
      {
        tour: grandTour,
        badge: '👑 Upgrade VIP Todo Incluido (12 Días)',
        reason: 'La gran expedición insignia definitiva que une lo mejor de los Andes y Galápagos',
      },
    ].filter(item => item.tour && item.tour.id !== primaryTour.id);
  } else if (pid.includes('ecuador-galapagos') || pid.includes('12days') || pid.includes('11days')) {
    // Si ya tiene el Gran Tour Combinado -> Sugerir experiencia boutique de Galápagos y Ruta de Nieve
    const galapagosSpec = allTours.find(t => t.id === 'galapagos-5days') || allTours[1];
    const andesSpec = allTours.find(t => t.id === 'snow-volcanoes-6days') || allTours[5];
    return [
      {
        tour: galapagosSpec,
        badge: '🐢 Enfoque Galápagos Exclusivo (5 Días)',
        reason: 'Dedicado exclusivamente a la fauna endémica marina y navegación entre islotes',
      },
      {
        tour: andesSpec,
        badge: '🌋 Enfoque Andes & Volcanes (6 Días)',
        reason: 'Expedición de alta montaña por volcanes activos y haciendas coloniales',
      },
    ].filter(item => item.tour && item.tour.id !== primaryTour.id);
  } else {
    // Tour continental -> Complementario 1: Galápagos 5 días + Complementario 2: Grand Tour 12 Días
    const galapagos = allTours.find(t => t.id === 'galapagos-5days') || allTours.find(t => t.id === 'galapagos-4days') || allTours[1];
    const grandTour = allTours.find(t => t.id === 'ecuador-galapagos-12days') || allTours[7];
    return [
      {
        tour: galapagos,
        badge: '🐢 Extensión Galápagos Imprescindible',
        reason: 'Suma las Islas Galápagos a tu recorrido andino para vivir el viaje completo',
      },
      {
        tour: grandTour,
        badge: '👑 Upgrade VIP Todo Incluido (12 Días)',
        reason: 'Expedición combinada con toda la logística y conexiones aéreas resueltas',
      },
    ].filter(item => item.tour && item.tour.id !== primaryTour.id);
  }
}

export function BookingWizard() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const searchParams = useSearchParams();
  const addTourId = searchParams.get('addTour') || searchParams.get('tourid') || searchParams.get('tourId');

  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [affiliateRef, setAffiliateRef] = useState<string | null>(null);
  const [affiliateData, setAffiliateData] = useState<AffiliateAccount | null>(null);
  const [isValidatingAffiliate, setIsValidatingAffiliate] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFullCatalog, setShowFullCatalog] = useState(false);

  const dateRef = useRef<HTMLDivElement>(null);
  const passengersRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = searchParams.get('vid') || searchParams.get('ref') || searchParams.get('affiliate') || getStoredAffiliateRef();
    if (ref) {
      const trimmedRef = ref.toLowerCase().trim();
      setIsValidatingAffiliate(true);
      getAffiliateByCode(trimmedRef).then(data => {
        setAffiliateRef(data ? trimmedRef : null);
        setAffiliateData(data || null);
        setIsValidatingAffiliate(false);
      });
    }
  }, [searchParams]);

  const [date, setDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-fill from localStorage (synchronized across all forms) or URL search parameters
  useEffect(() => {
    const stored = getStoredUserProfile();
    const urlEmail = searchParams.get('email');
    const urlName = searchParams.get('name');
    const urlPhone = searchParams.get('phone');
    if (stored.name || stored.email || stored.phone || urlEmail || urlName || urlPhone) {
      setContactInfo((prev) => ({
        ...prev,
        name: prev.name || urlName || stored.name || '',
        email: prev.email || urlEmail || stored.email || '',
        phone: prev.phone || urlPhone || stored.phone || '',
        notes: prev.notes || stored.notes || '',
      }));
    }
  }, [searchParams]);

  const handleContactChange = (field: 'name' | 'email' | 'phone' | 'notes', value: string) => {
    setContactInfo((prev) => {
      const next = { ...prev, [field]: value };
      saveStoredUserProfile(next);
      return next;
    });
  };

  const [pricing, setPricing] = useState<PricingDetails>({
    basePricePerAdult: 0, basePricePerChild: 0, adultsCount: 0, childrenCount: 0,
    adultsTotal: 0, childrenTotal: 0, subtotal: 0, groupDiscountPercentage: 0,
    groupDiscountAmount: 0, total: 0
  });

  useEffect(() => {
    if (addTourId) {
      const tour = mockTours.find(t => t.id === addTourId);
      if (tour) {
        setSelectedTours(prev => prev.some(t => t.id === tour.id) ? prev : [tour, ...prev]);
        return;
      }
    }
    if (selectedTours.length === 0 && mockTours.length > 0) {
      const defaultTour = mockTours.find(t => t.id === 'galapagos-5days') || mockTours[0];
      setSelectedTours([defaultTour]);
    }
  }, [addTourId]);

  const primaryTour: Tour = selectedTours[0] || (addTourId ? mockTours.find(t => t.id === addTourId) : null) || mockTours.find(t => t.id === 'galapagos-5days') || mockTours[0];
  const complementarySuggestions = getComplementarySuggestions(primaryTour, mockTours);

  const replacePrimaryTour = (newTour: Tour) => {
    setSelectedTours(prev => [newTour, ...prev.filter(t => t.id !== newTour.id && t.id !== primaryTour?.id)]);
  };

  const toggleTour = (tour: Tour) => {
    setSelectedTours(prev => {
      const exists = prev.some(t => t.id === tour.id);
      if (exists) {
        if (prev.length <= 1) return prev;
        return prev.filter(t => t.id !== tour.id);
      }
      return [...prev, tour];
    });
  };

  useEffect(() => {
    if (selectedTours.length > 0) {
      let tAB = 0, tCB = 0, tAA = 0, tCA = 0, tSub = 0, tDisc = 0, tFinal = 0;
      selectedTours.forEach(tour => {
        const p = calculateTourPrice(tour.price, adults, children, date);
        tAB += p.basePricePerAdult; tCB += p.basePricePerChild;
        tAA += p.adultsTotal; tCA += p.childrenTotal;
        tSub += p.subtotal; tDisc += p.groupDiscountAmount; tFinal += p.total;
      });
      setPricing({
        basePricePerAdult: tAB, basePricePerChild: tCB,
        adultsCount: adults, childrenCount: children,
        adultsTotal: tAA, childrenTotal: tCA, subtotal: tSub,
        groupDiscountPercentage: adults + children >= 6 ? 5 : (adults + children >= 4 ? 2 : 0),
        groupDiscountAmount: tDisc, total: tFinal
      });
    } else {
      setPricing({ basePricePerAdult: 0, basePricePerChild: 0, adultsCount: adults, childrenCount: children, adultsTotal: 0, childrenTotal: 0, subtotal: 0, groupDiscountPercentage: 0, groupDiscountAmount: 0, total: 0 });
    }
  }, [selectedTours, adults, children, date]);

  const handleCheckout = async () => {
    if (selectedTours.length === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!date) {
      if (dateRef.current) {
        dateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (!contactInfo.name.trim() || !contactInfo.email.trim()) {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          const inputToFocus = !contactInfo.name.trim() 
            ? document.getElementById('booking-name') 
            : document.getElementById('booking-email');
          if (inputToFocus) inputToFocus.focus();
        }, 300);
      }
      return;
    }

    setIsProcessing(true);
    saveStoredUserProfile(contactInfo);
    const tourTitleStr = selectedTours.map(t => typeof t.title === 'string' ? t.title : (t.title?.es || t.title?.en || 'Tour')).join(' + ');

    let bookingRef = '';
    try {
      bookingRef = await generateBookingCode(selectedTours[0]?.id, affiliateRef || undefined);
    } catch (e) {
      console.warn('Booking code generation fallback:', e);
      bookingRef = `R-${new Date().getFullYear()}-1.1-80`;
    }

    const queryParams = new URLSearchParams({
      tourId: selectedTours.map(t => t.id).join(','),
      tourTitle: tourTitleStr,
      email: contactInfo.email,
      name: contactInfo.name,
      amount: String(pricing.total),
      type: 'full',
      ref: bookingRef,
      affiliateCode: affiliateRef || '',
      discountApplied: affiliateRef ? 'true' : 'false',
      date: date
    });
    window.location.href = `/${locale}/checkout/payment?${queryParams.toString()}`;
  };

  const isFormComplete = () => selectedTours.length > 0 && date !== '' && adults > 0 && contactInfo.name.trim() !== '' && contactInfo.email.trim() !== '';

  type CTAState = { label: string; ref: React.RefObject<HTMLDivElement> | null; ready: boolean };
  const getMobileCTA = (): CTAState => {
    if (selectedTours.length === 0) return { label: 'Selecciona un tour arriba', ref: null, ready: false };
    if (!date) return { label: 'Paso 2: Elige tu fecha de viaje', ref: dateRef, ready: false };
    if (!contactInfo.name.trim() || !contactInfo.email.trim()) return { label: 'Paso 4: Completa tus datos de contacto', ref: contactRef, ready: false };
    return { label: `Proceder al Pago - $${pricing.total.toLocaleString('en-US')} USD`, ref: null, ready: true };
  };
  const mobileCTA = getMobileCTA();
  const filteredTours = filterTours(mockTours, activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 pb-28 lg:pb-8">
      <div className="mb-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
          {locale === 'es' ? 'Configuración de Expedición y Reserva' : 'Expedition Setup & Reservation'}
        </h2>
        <p className="text-sm text-zinc-500">
          {locale === 'es' ? 'Completa los datos a continuación para asegurar tu lugar.' : 'Fill in the details below to secure your bespoke expedition.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">

            {isValidatingAffiliate && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-500 text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Validando codigo de embajador...</span>
              </div>
            )}
            {!isValidatingAffiliate && affiliateRef && affiliateData && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">Descuento VIP del 10% Aplicado</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300/80">Embajador: <strong>{affiliateData.name} (@{affiliateRef})</strong></p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider shrink-0">10% OFF</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Map className="w-5 h-5 text-emerald-600" /> 1. {isEs ? 'Tu Expedición Principal' : 'Your Primary Expedition'}
                </h2>
                {selectedTours.length > 1 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    {selectedTours.length} {isEs ? 'expediciones seleccionadas' : 'expeditions selected'}
                  </span>
                )}
              </div>

              {/* Tarjeta Principal Seleccionada */}
              {primaryTour && (
                <div className="border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/90 to-teal-50/40 dark:from-emerald-950/40 dark:to-zinc-900/80 rounded-2xl p-4 sm:p-5 shadow-md ring-1 ring-emerald-500/30 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-full sm:w-28 h-32 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-emerald-200 dark:border-emerald-800 shadow-xs relative">
                      <img
                        src={primaryTour.imageUrl}
                        alt={getLocalizedText(primaryTour.title, locale)}
                        width={112}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[9px] uppercase tracking-wider shadow-sm">
                        {isEs ? 'Principal' : 'Primary'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
                          ⭐ {isEs ? 'Selección Confirmada' : 'Confirmed Choice'}
                        </span>
                        <span className="text-xs text-zinc-400">&bull;</span>
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                          {getLocalizedText(primaryTour.duration, locale)}
                        </span>
                      </div>
                      <h4 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-white leading-snug">
                        {getLocalizedText(primaryTour.title, locale)}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                        {getLocalizedText(primaryTour.description, locale)}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">{isEs ? 'Inversión desde' : 'Starting from'}</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400" suppressHydrationWarning>
                        ${primaryTour.price.toLocaleString('en-US')} USD
                      </span>
                      <span className="text-[10px] text-zinc-400 block">{isEs ? 'por viajero' : 'per traveler'}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={`/${locale}/tours/${primaryTour.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>{isEs ? 'Ver Itinerario Completo día por día' : 'View Full Day-by-Day Itinerary'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowFullCatalog(true)}
                      className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      {isEs ? 'Cambiar por otro tour del catálogo ↓' : 'Change for another tour ↓'}
                    </button>
                  </div>
                </div>
              )}

              {/* 2 SUGERENCIAS COMPLEMENTARIAS INTELIGENTES */}
              {complementarySuggestions.length > 0 && (
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      {isEs ? 'Complementos & Upgrades Recomendados para tu Expedición' : 'Recommended Complements & Upgrades for your Expedition'}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {complementarySuggestions.map(({ tour: sugTour, badge, reason }) => {
                      const isAdded = selectedTours.some(st => st.id === sugTour.id);
                      return (
                        <div
                          key={sugTour.id}
                          className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                            isAdded
                              ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 shadow-md ring-1 ring-emerald-500'
                              : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-amber-400/60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold text-[10px] tracking-tight">
                                {badge}
                              </span>
                              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                                +${sugTour.price.toLocaleString('en-US')} USD
                              </span>
                            </div>

                            <div className="flex items-start gap-3">
                              <img
                                src={sugTour.imageUrl}
                                alt={getLocalizedText(sugTour.title, locale)}
                                width={56}
                                height={56}
                                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-700"
                              />
                              <div className="min-w-0">
                                <h5 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white line-clamp-1 leading-snug">
                                  {getLocalizedText(sugTour.title, locale)}
                                </h5>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                                  {reason}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => replacePrimaryTour(sugTour)}
                              className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                            >
                              {isEs ? 'Cambiar a este' : 'Switch to this'}
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleTour(sugTour)}
                              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{isEs ? 'Añadido' : 'Added'}</span>
                                </>
                              ) : (
                                <span>{isEs ? '+ Añadir Extensión' : '+ Add Extension'}</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div ref={dateRef} className="md:col-span-7">
                <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-emerald-600" /> {isEs ? '2. ¿Cuándo viajas?' : '2. When are you traveling?'}
                </h2>
                <TravelDatePicker selectedDate={date} onDateSelect={(d) => setDate(d)} durationDays={selectedTours.reduce((max, t) => Math.max(max, t.durationDays || 1), 1)} />
              </div>
              <div ref={passengersRef} className="md:col-span-5">
                <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" /> {isEs ? '3. ¿Quiénes viajan?' : '3. Who is traveling?'}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                        {isEs ? 'Adultos' : 'Adults'}
                      </h4>
                      <p className="text-[10px] text-zinc-500">
                        {isEs ? '12+ años' : '12+ years'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none cursor-pointer">-</button>
                      <span className="w-5 text-center font-bold text-sm">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none cursor-pointer">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                          {isEs ? 'Niños' : 'Children'}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[9px] font-bold">
                          -20%
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        {isEs ? '0 a 11 años (Tarifa reducida)' : '0 to 11 years (Reduced rate)'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none cursor-pointer">-</button>
                      <span className="w-5 text-center font-bold text-sm">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg leading-none cursor-pointer">+</button>
                    </div>
                  </div>
                </div>
                <hr className="border-zinc-100 dark:border-zinc-800 my-5" />
                <div ref={contactRef}>
                  <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {isEs ? '4. Tus Datos de Contacto' : '4. Contact Details'}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="booking-name" className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Nombre Completo</label>
                      <input
                        id="booking-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        autoCapitalize="words"
                        value={contactInfo.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="booking-email" className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email</label>
                      <input
                        id="booking-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={contactInfo.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="booking-notes" className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Peticiones Especiales (Opcional)</label>
                      <textarea
                        id="booking-notes"
                        name="notes"
                        rows={2}
                        value={contactInfo.notes}
                        onChange={(e) => handleContactChange('notes', e.target.value)}
                        placeholder="Alergias, necesidades especiales..."
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DESPLEGABLE CON EL RESTO DE TOURS DEL CATÁLOGO (AL FONDO PARA EVITAR SOBRECARGA) */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setShowFullCatalog(!showFullCatalog)}
                className="w-full py-3.5 px-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 text-left">
                  <Map className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                      {isEs ? '¿Deseas explorar otros tours de nuestro catálogo privado?' : 'Would you like to explore other tours from our private catalog?'}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {isEs ? 'Haz clic para desplegar todas las expediciones y excursiones' : 'Click to display all expeditions and day tours'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {showFullCatalog ? (isEs ? 'Ocultar catálogo' : 'Hide catalog') : (isEs ? 'Ver todos los tours' : 'View all tours')}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${showFullCatalog ? 'rotate-180 text-emerald-600' : ''}`} />
                </div>
              </button>

              {showFullCatalog && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                  <div className="hidden md:flex flex-wrap items-center gap-2 mb-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          activeFilter === cat.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {filteredTours.map((t) => {
                      const isSelected = selectedTours.some(st => st.id === t.id);
                      return (
                        <div
                          key={t.id}
                          className={`border rounded-2xl p-3.5 transition-all flex flex-col justify-between gap-2.5 ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 shadow-md ring-1 ring-emerald-500'
                              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={t.imageUrl}
                              alt={getLocalizedText(t.title, locale)}
                              width={56}
                              height={56}
                              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-800"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-xs text-zinc-900 dark:text-white line-clamp-1">
                                {getLocalizedText(t.title, locale)}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                  ${t.price.toLocaleString('en-US')} USD
                                </span>
                                <span className="text-[10px] text-zinc-400">&bull;</span>
                                <span className="text-[10px] text-zinc-500">
                                  {getLocalizedText(t.duration, locale)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => replacePrimaryTour(t)}
                              className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                            >
                              {isEs ? 'Elegir como Principal' : 'Set as Primary'}
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleTour(t)}
                              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-zinc-800 text-white dark:bg-white dark:text-zinc-900'
                              }`}
                            >
                              {isSelected ? (isEs ? 'Añadido ✓' : 'Added ✓') : (isEs ? '+ Añadir' : '+ Add')}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-24 self-start">
          <PriceCalculator tours={selectedTours} pricing={pricing} date={date} contactInfo={contactInfo} step={3} onContinue={handleCheckout} canContinue={isFormComplete() && !isProcessing} affiliateRef={affiliateRef} />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shadow-2xl">
        {mobileCTA.ready ? (
          <button onClick={handleCheckout} disabled={isProcessing} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 group disabled:opacity-50 disabled:hover:scale-100 cursor-pointer border-none">
            <Lock className="w-4 h-4 shrink-0" />
            <span className="truncate">{mobileCTA.label}</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button onClick={() => { if (mobileCTA.ref?.current) { mobileCTA.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }} className="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold py-4 rounded-2xl text-sm transition-all border border-zinc-200 dark:border-zinc-700">
            <span>{mobileCTA.label}</span>
            {mobileCTA.ref && <ArrowRight className="w-4 h-4 text-emerald-600" />}
          </button>
        )}
        {selectedTours.length > 0 && !mobileCTA.ready && (
          <p className="text-center text-[10px] text-zinc-400 mt-1.5">{selectedTours.length} tour{selectedTours.length > 1 ? 's' : ''} seleccionado{selectedTours.length > 1 ? 's' : ''}</p>
        )}
      </div>
    </div>
  );
}
