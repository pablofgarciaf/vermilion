'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';
import { calculateTourPrice, PricingDetails } from '@/lib/pricing';
import { PriceCalculator } from './PriceCalculator';
import { TravelDatePicker } from './TravelDatePicker';
import { Map, CalendarDays, Users, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Lock, ArrowRight, Sparkles, Loader2, Search, X, ArrowLeftRight, Compass } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getStoredAffiliateRef } from '@/components/affiliates/AffiliateTracker';
import { getAffiliateByCode, AffiliateAccount } from '@/lib/affiliates';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';
import { generateBookingCode } from '@/lib/bookings';

const BOOKING_CAROUSEL_I18N: Record<string, {
  sectionTitle: string;
  sectionDesc: string;
  setPrimary: string;
  addExtension: string;
  added: string;
  from: string;
  perTraveler: string;
  viewAll: string;
  viewDetails: string;
}> = {
  es: {
    sectionTitle: 'Explora y Añade Otras Expediciones Recomendadas',
    sectionDesc: 'Desliza para descubrir más rutas a medida para combinar o sustituir en tu viaje',
    setPrimary: 'Elegir como Principal',
    addExtension: '+ Añadir Extensión',
    added: '✓ Añadido',
    from: 'Desde',
    perTraveler: 'por persona',
    viewAll: 'Explorar todos los tours del catálogo ↗',
    viewDetails: 'Ver itinerario',
  },
  en: {
    sectionTitle: 'Explore & Add Other Recommended Expeditions',
    sectionDesc: 'Swipe to discover more bespoke routes to combine or substitute in your journey',
    setPrimary: 'Set as Primary',
    addExtension: '+ Add Extension',
    added: '✓ Added',
    from: 'From',
    perTraveler: 'per traveler',
    viewAll: 'Explore full tour catalog ↗',
    viewDetails: 'View itinerary',
  },
  fr: {
    sectionTitle: 'Explorez et Ajoutez d’Autres Expéditions Recommandées',
    sectionDesc: 'Faites défiler pour découvrir d’autres circuits sur mesure à combiner ou remplacer',
    setPrimary: 'Choisir comme Principal',
    addExtension: '+ Ajouter en Extension',
    added: '✓ Ajouté',
    from: 'À partir de',
    perTraveler: 'par voyageur',
    viewAll: 'Explorer tout le catalogue de tours ↗',
    viewDetails: 'Voir l’itinéraire',
  },
  de: {
    sectionTitle: 'Erkunden und Weitere Empfohlene Expeditionen Hinzufügen',
    sectionDesc: 'Wischen Sie, um weitere maßgeschneiderte Routen zum Kombinieren zu entdecken',
    setPrimary: 'Als Haupttour wählen',
    addExtension: '+ Als Verlängerung hinzufügen',
    added: '✓ Hinzugefügt',
    from: 'Ab',
    perTraveler: 'pro Reisender',
    viewAll: 'Gesamten Reisekatalog ansehen ↗',
    viewDetails: 'Reiseroute ansehen',
  },
  it: {
    sectionTitle: 'Esplora e Aggiungi Altre Spedizioni Consigliate',
    sectionDesc: 'Scorri per scoprire altri itinerari su misura da combinare o sostituire',
    setPrimary: 'Scegli come Principale',
    addExtension: '+ Aggiungi Estensione',
    added: '✓ Aggiunto',
    from: 'Da',
    perTraveler: 'a viaggiatore',
    viewAll: 'Esplora tutto il catalogo tour ↗',
    viewDetails: 'Vedi itinerario',
  },
  pt: {
    sectionTitle: 'Explore e Adicione Outras Expedições Recomendadas',
    sectionDesc: 'Deslize para descobrir mais roteiros sob medida para combinar ou substituir',
    setPrimary: 'Escolher como Principal',
    addExtension: '+ Adicionar Extensão',
    added: '✓ Adicionado',
    from: 'A partir de',
    perTraveler: 'por viajante',
    viewAll: 'Explorar catálogo completo de tours ↗',
    viewDetails: 'Ver itinerário',
  },
  ja: {
    sectionTitle: '他のおすすめ遠征ツアーを探して追加する',
    sectionDesc: 'スワイプして、旅に組み合わせる・変更できる多彩なルートをご覧ください',
    setPrimary: 'メインツアーに指定',
    addExtension: '+ エクステンションを追加',
    added: '✓ 追加済み',
    from: '料金',
    perTraveler: 'お一人様あたり',
    viewAll: '全ツアーカタログを見る ↗',
    viewDetails: '日程を見る',
  },
  zh: {
    sectionTitle: '探索并添加其他精选推荐探险行程',
    sectionDesc: '左右滑动以发现更多可自由组合或替换的专属定制路线',
    setPrimary: '设为主探险行程',
    addExtension: '+ 添加为延伸行程',
    added: '✓ 已添加',
    from: '起价',
    perTraveler: '每位旅客',
    viewAll: '浏览全部探险行程目录 ↗',
    viewDetails: '查看行程',
  },
};

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
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourSearchQuery, setTourSearchQuery] = useState('');
  const [swappedTourNotice, setSwappedTourNotice] = useState<string | null>(null);

  const dateRef = useRef<HTMLDivElement>(null);
  const passengersRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const carouselScrollRef = useRef<HTMLDivElement>(null);

  const scrollRecommendations = (dir: 'left' | 'right') => {
    if (carouselScrollRef.current) {
      const scrollAmount = dir === 'left' ? -340 : 340;
      carouselScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
    let targetTourId = addTourId;
    if (!targetTourId && typeof window !== 'undefined') {
      try {
        targetTourId = sessionStorage.getItem('preselected_tour_id') || localStorage.getItem('vermilion_selected_tour');
      } catch (e) {}
    }

    if (targetTourId) {
      const tour = mockTours.find(t => t.id === targetTourId);
      if (tour) {
        setSelectedTours(prev => prev.some(t => t.id === tour.id) ? prev : [tour, ...prev]);
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.removeItem('preselected_tour_id');
            localStorage.removeItem('vermilion_selected_tour');
          } catch (e) {}
        }
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
  const candidateTours = mockTours.filter(t => t.id !== primaryTour?.id);
  const ci18n = BOOKING_CAROUSEL_I18N[locale] || BOOKING_CAROUSEL_I18N['es'];

  const replacePrimaryTour = (newTour: Tour) => {
    setSelectedTours(prev => {
      const remaining = prev.filter(t => t.id !== newTour.id && t.id !== primaryTour?.id);
      return [newTour, ...remaining];
    });
    const tourTitleStr = getLocalizedText(newTour.title, locale);
    setSwappedTourNotice(tourTitleStr);
    setTimeout(() => setSwappedTourNotice(null), 4000);
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
      let anyMinTwo = false;
      selectedTours.forEach(tour => {
        const isDaily = tour.durationDays === 1 || (typeof tour.duration === 'object' && String(tour.duration?.en || '').includes('1 DAY'));
        const p = calculateTourPrice(tour.price, adults, children, date, isDaily);
        if (p.minTwoPersonApplied) anyMinTwo = true;
        tAB += p.basePricePerAdult; tCB += p.basePricePerChild;
        tAA += p.adultsTotal; tCA += p.childrenTotal;
        tSub += p.subtotal; tDisc += p.groupDiscountAmount; tFinal += p.total;
      });
      setPricing({
        basePricePerAdult: tAB, basePricePerChild: tCB,
        adultsCount: adults, childrenCount: children,
        adultsTotal: tAA, childrenTotal: tCA, subtotal: tSub,
        isDailyTour: selectedTours.some(t => t.durationDays === 1),
        minTwoPersonApplied: anyMinTwo,
        groupDiscountPercentage: adults + children >= 6 ? 0.05 : (adults + children >= 4 ? 0.02 : 0),
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

    const totalTravelers = adults + children;
    const isDaily = selectedTours.some(t => t.durationDays === 1 || (typeof t.duration === 'object' && String(t.duration?.en || '').includes('1 DAY')));

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
      date: date,
      adults: String(adults),
      children: String(children),
      travelers: String(totalTravelers),
      isDailyTour: isDaily ? 'true' : 'false',
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
  const searchedTours = filteredTours.filter((t) => {
    if (!tourSearchQuery.trim()) return true;
    const q = tourSearchQuery.toLowerCase().trim();
    const title = (typeof t.title === 'string' ? t.title : (t.title?.es || t.title?.en || '')).toLowerCase();
    const dest = (typeof t.destination === 'string' ? t.destination : ((t.destination as any)?.es || (t.destination as any)?.en || '')).toLowerCase();
    return title.includes(q) || dest.includes(q);
  });

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
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Map className="w-5 h-5 text-emerald-600" /> 1. {isEs ? 'Tu Expedición Principal' : 'Your Primary Expedition'}
                </h3>
                {selectedTours.length > 1 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    {selectedTours.length} {isEs ? 'expediciones seleccionadas' : 'expeditions selected'}
                  </span>
                )}
              </div>

              {/* Feedback toast when tour is swapped */}
              {swappedTourNotice && (
                <div className="mb-3 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isEs ? 'Expedición principal cambiada a:' : 'Primary expedition changed to:'} <strong>{swappedTourNotice}</strong>
                  </span>
                </div>
              )}

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

                  <div className="pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-2.5">
                    <a
                      href={`/${locale}/tours/${primaryTour.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>{isEs ? 'Ver Itinerario Completo día por día' : 'View Full Day-by-Day Itinerary'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsTourModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        <span>{isEs ? 'Cambiar por otro tour del catálogo' : 'Change for another tour'}</span>
                      </button>

                      <a
                        href={`/${locale}/tours`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{isEs ? 'Explorar todos los tours ↗' : 'Explore all tours ↗'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* CARRUSEL MULTILINGÜE DE TODAS LAS EXPEDICIONES RECOMENDADAS */}
              {candidateTours.length > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                          {ci18n.sectionTitle}
                        </h4>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          {ci18n.sectionDesc}
                        </p>
                      </div>
                    </div>
                    
                    {/* Botones de navegación del carrusel */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => scrollRecommendations('left')}
                        aria-label="Previous tour"
                        className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollRecommendations('right')}
                        aria-label="Next tour"
                        className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Contenedor del Carrusel Deslizable */}
                  <div
                    ref={carouselScrollRef}
                    className="flex gap-3.5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-0.5"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {candidateTours.map((sugTour) => {
                      const isAdded = selectedTours.some(st => st.id === sugTour.id);
                      const tourTitle = getLocalizedText(sugTour.title, locale);
                      const tourDesc = getLocalizedText(sugTour.description, locale);
                      const tourDuration = getLocalizedText(sugTour.duration, locale);
                      const badgeText = sugTour.id.includes('galapagos')
                        ? '🐢 Galápagos'
                        : sugTour.id.includes('volcano') || sugTour.id.includes('andes')
                        ? '🏔️ Andes'
                        : sugTour.id.includes('amazon')
                        ? '🌿 Amazonía'
                        : '✨ Combinado';

                      return (
                        <div
                          key={sugTour.id}
                          className={`w-[290px] sm:w-[320px] shrink-0 snap-start rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 shadow-sm ${
                            isAdded
                              ? 'border-emerald-500 bg-emerald-50/85 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-emerald-400/80 hover:shadow-md'
                          }`}
                        >
                          <div className="space-y-2.5">
                            {/* Header tarjeta */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] tracking-tight">
                                {badgeText}
                              </span>
                              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                {tourDuration}
                              </span>
                            </div>

                            {/* Foto y Título */}
                            <div className="flex items-start gap-3">
                              <img
                                src={sugTour.imageUrl}
                                alt={tourTitle}
                                width={68}
                                height={68}
                                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-xs"
                              />
                              <div className="min-w-0 flex-1">
                                <h5 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white line-clamp-1 leading-snug">
                                  {tourTitle}
                                </h5>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                                  {tourDesc}
                                </p>
                              </div>
                            </div>

                            {/* Precio */}
                            <div className="pt-1 flex items-baseline justify-between">
                              <span className="text-[11px] text-zinc-400">
                                {ci18n.from}:
                              </span>
                              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                                ${sugTour.price.toLocaleString('en-US')} USD <span className="text-[10px] font-normal text-zinc-400">{ci18n.perTraveler}</span>
                              </span>
                            </div>
                          </div>

                          {/* Acciones */}
                          <div className="pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => replacePrimaryTour(sugTour)}
                              className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                              {ci18n.setPrimary}
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleTour(sugTour)}
                              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                                isAdded
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{ci18n.added}</span>
                                </>
                              ) : (
                                <span>{ci18n.addExtension}</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Botón para explorar todos los tours */}
                  <div className="pt-2 flex justify-center">
                    <a
                      href={`/${locale}/tours`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-zinc-700 dark:text-zinc-200 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs font-bold transition-all border border-zinc-200 dark:border-zinc-700 hover:border-emerald-300"
                    >
                      <Compass className="w-4 h-4 text-emerald-600" />
                      <span>{ci18n.viewAll}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div ref={dateRef} className="md:col-span-7">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-emerald-600" /> {isEs ? '2. ¿Cuándo viajas?' : '2. When are you traveling?'}
                </h3>
                <TravelDatePicker selectedDate={date} onDateSelect={(d) => setDate(d)} durationDays={selectedTours.reduce((max, t) => Math.max(max, t.durationDays || 1), 1)} />
              </div>
              <div ref={passengersRef} className="md:col-span-5">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" /> {isEs ? '3. ¿Quiénes viajan?' : '3. Who is traveling?'}
                </h3>
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
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {isEs ? '4. Tus Datos de Contacto' : '4. Contact Details'}
                  </h3>
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

      {/* ── MODAL INTERACTIVO: CATÁLOGO COMPLETO DE EXPEDICIONES ── */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                    {isEs ? 'Catálogo de Expediciones y Tours' : 'Expeditions & Tours Catalog'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {isEs ? 'Selecciona tu tour principal o añade extensiones adicionales a tu itinerario' : 'Select your primary tour or add additional extensions to your itinerary'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTourModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toolbar & Search */}
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tourSearchQuery}
                  onChange={(e) => setTourSearchQuery(e.target.value)}
                  placeholder={isEs ? 'Buscar tour por nombre o destino (ej. Galápagos, Cotopaxi, Quito)...' : 'Search tour by title or destination...'}
                  className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {tourSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setTourSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    {isEs ? 'Limpiar' : 'Clear'}
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                      activeFilter === cat.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tours Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {searchedTours.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs">
                  {isEs ? 'No se encontraron tours con ese criterio.' : 'No tours found matching your search.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchedTours.map((t) => {
                    const isPrimary = primaryTour?.id === t.id;
                    const isAdded = selectedTours.some(st => st.id === t.id);

                    return (
                      <div
                        key={t.id}
                        className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                          isPrimary
                            ? 'border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-md ring-1 ring-emerald-500'
                            : isAdded
                            ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/20'
                            : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={t.imageUrl}
                            alt={getLocalizedText(t.title, locale)}
                            width={72}
                            height={72}
                            className="w-18 h-18 rounded-xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-700"
                          />
                          <div className="flex-1 min-w-0">
                            {isPrimary && (
                              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[9px] uppercase tracking-wider mb-1">
                                ⭐ {isEs ? 'Principal Actual' : 'Current Primary'}
                              </span>
                            )}
                            <h4 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                              {getLocalizedText(t.title, locale)}
                            </h4>
                            <div className="flex items-center gap-2 mt-1.5 text-xs">
                              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                ${t.price.toLocaleString('en-US')} USD
                              </span>
                              <span className="text-zinc-400">&bull;</span>
                              <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                                {getLocalizedText(t.duration, locale)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                          {isPrimary ? (
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              ✓ {isEs ? 'Expedición seleccionada' : 'Selected expedition'}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                replacePrimaryTour(t);
                                setIsTourModalOpen(false);
                              }}
                              className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                            >
                              {isEs ? 'Elegir como Principal' : 'Set as Primary'}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleTour(t)}
                            className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                              isAdded
                                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300'
                                : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90'
                            }`}
                          >
                            {isAdded ? (isEs ? 'Quitar extensión' : 'Remove extension') : (isEs ? '+ Añadir extensión' : '+ Add extension')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 flex items-center justify-between">
              <a
                href={`/${locale}/tours`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isEs ? 'Ver todos los tours en el sitio web ↗' : 'View all tours on website ↗'}</span>
              </a>

              <button
                type="button"
                onClick={() => setIsTourModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-all cursor-pointer"
              >
                {isEs ? 'Cerrar ventana' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
