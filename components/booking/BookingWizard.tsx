'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Tour } from '@/types';
import { mockTours } from '@/data/mock';
import { calculateTourPrice, PricingDetails } from '@/lib/pricing';
import { PriceCalculator } from './PriceCalculator';
import { TravelDatePicker } from './TravelDatePicker';
import { BookingComfortTierSelector, BookingTier } from './BookingComfortTierSelector';
import { Map, CalendarDays, Users, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Lock, ArrowRight, Sparkles, Loader2, Search, X, ArrowLeftRight, Compass } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getStoredAffiliateRef } from '@/components/affiliates/AffiliateTracker';
import { getAffiliateByCode, AffiliateAccount } from '@/lib/affiliates';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';
import { generateBookingCode } from '@/lib/bookings';

const BOOKING_SUBNAV_I18N: Record<string, { defaultTitle: string; estimatedTotal: string; support: string; waPrefix: string }> = {
  es: {
    defaultTitle: 'Expedición a Medida en Ecuador & Galápagos',
    estimatedTotal: 'Total Estimado',
    support: 'Asistencia 24/7',
    waPrefix: 'Hola Vermilion Routes, necesito ayuda con mi reserva:',
  },
  en: {
    defaultTitle: 'Bespoke Expedition in Ecuador & Galapagos',
    estimatedTotal: 'Estimated Total',
    support: '24/7 Support',
    waPrefix: 'Hello Vermilion Routes, I need assistance with my booking:',
  },
  fr: {
    defaultTitle: 'Expédition Sur Mesure en Équateur & Galapagos',
    estimatedTotal: 'Total Estimé',
    support: 'Assistance 24/7',
    waPrefix: 'Bonjour Vermilion Routes, j’ai besoin d’aide pour ma réservation :',
  },
  de: {
    defaultTitle: 'Maßgeschneiderte Expedition in Ecuador & Galapagos',
    estimatedTotal: 'Geschätzter Gesamtbetrag',
    support: '24/7 Betreuung',
    waPrefix: 'Hallo Vermilion Routes, ich benötige Unterstützung bei meiner Buchung:',
  },
  it: {
    defaultTitle: 'Spedizione su Misura in Ecuador e Galapagos',
    estimatedTotal: 'Totale Stimato',
    support: 'Assistenza 24/7',
    waPrefix: 'Ciao Vermilion Routes, ho bisogno di assistenza con la mia prenotazione:',
  },
  pt: {
    defaultTitle: 'Expedição Sob Medida no Equador & Galápagos',
    estimatedTotal: 'Total Estimado',
    support: 'Assistência 24/7',
    waPrefix: 'Olá Vermilion Routes, preciso de ajuda com minha reserva:',
  },
  ja: {
    defaultTitle: 'エクアドル＆ガラパゴス特注遠征ツアー',
    estimatedTotal: '概算合計金額',
    support: '24時間サポート',
    waPrefix: 'Vermilion Routes様、予約手続きについて相談を希望します:',
  },
  zh: {
    defaultTitle: '厄瓜多尔与加拉帕戈斯专属定制探险',
    estimatedTotal: '预估费用总额',
    support: '24/7礼宾协助',
    waPrefix: '您好 Vermilion Routes，我需要关于预订的协助：',
  },
};

function BookingSubNav({ primaryTour, pricing, locale }: { primaryTour: Tour | null; pricing: any; locale: string }) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = document.getElementById('tour-subnav-portal');
    if (node) setPortalNode(node);

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!portalNode) return null;

  const st = BOOKING_SUBNAV_I18N[locale] || BOOKING_SUBNAV_I18N['en'];
  const title = primaryTour ? getLocalizedText(primaryTour.title, locale) : st.defaultTitle;
  const duration = primaryTour ? getLocalizedText(primaryTour.duration, locale) : '';

  return createPortal(
    <div
      className={`w-full bg-[#FAF8F5]/98 dark:bg-stone-950/98 backdrop-blur-2xl border-b border-zinc-200/90 dark:border-white/10 py-2.5 transition-all duration-300 shadow-xl ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none h-0 py-0 border-none overflow-hidden'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <Link
            href={`/${locale}`}
            aria-label="Vermilion Routes Home"
            className="shrink-0 group flex items-center notranslate"
          >
            <div className="relative w-[120px] h-[32px] sm:w-[145px] sm:h-[36px]">
              <Image
                src="/logo_inicio.png"
                alt="Vermilion Routes"
                width={145}
                height={36}
                className="w-auto h-full object-contain block dark:hidden"
                priority
              />
              <Image
                src="/logo_blanco.png"
                alt="Vermilion Routes"
                width={145}
                height={36}
                className="w-auto h-full object-contain hidden dark:block"
                priority
              />
            </div>
          </Link>

          <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700 hidden md:block shrink-0" />

          <div className="space-y-0.5 min-w-0">
            <div className="font-serif text-sm sm:text-base lg:text-lg font-bold text-zinc-900 dark:text-white leading-tight whitespace-normal break-words">
              {title}
            </div>
            {duration && (
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <span>{duration}</span>
                {primaryTour?.code && <span>&bull; Code: {primaryTour.code}</span>}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3.5 shrink-0 self-end sm:self-center">
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-zinc-400 block font-semibold">{st.estimatedTotal}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base sm:text-lg font-mono">
              ${pricing.total.toLocaleString('en-US')} USD
            </span>
          </div>

          <a
            href={`https://wa.me/593994048458?text=${encodeURIComponent(`${st.waPrefix} ${title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-stone-950 shadow-md transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none"
          >
            <span>{st.support}</span>
          </a>
        </div>
      </div>
    </div>,
    portalNode
  );
}

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

const BOOKING_WIZARD_I18N: Record<string, Record<string, string>> = {
  headerTitle: {
    es: 'Configuración de Expedición y Reserva',
    en: 'Expedition Setup & Reservation',
    fr: 'Configuration de l’Expédition et Réservation',
    de: 'Expeditionskonfiguration & Reservierung',
    it: 'Configurazione della Spedizione e Prenotazione',
    pt: 'Configuração da Expedição e Reserva',
    ja: '遠征プランの設定とご予約',
    zh: '探险行程配置与预订',
  },
  headerSubtitle: {
    es: 'Completa los datos a continuación para asegurar tu lugar.',
    en: 'Fill in the details below to secure your bespoke expedition.',
    fr: 'Remplissez les informations ci-dessous pour sécuriser votre expédition.',
    de: 'Füllen Sie die folgenden Angaben aus, um Ihre Expedition zu sichern.',
    it: 'Compila i dettagli seguenti per assicurare la tua spedizione.',
    pt: 'Preencha os dados abaixo para garantir sua expedição.',
    ja: '以下の情報を入力して、特注ツアーの予約を確保してください。',
    zh: '请填写以下信息以锁定您的专属定制探险席位。',
  },
  step1: {
    es: '1. Tu Expedición Principal',
    en: '1. Your Primary Expedition',
    fr: '1. Votre Expédition Principale',
    de: '1. Ihre Hauptexpedition',
    it: '1. La Tua Spedizione Principale',
    pt: '1. Sua Expedição Principal',
    ja: '1. メイン遠征ツアー',
    zh: '1. 您的主探险行程',
  },
  selectedExpeditions: {
    es: 'expediciones seleccionadas',
    en: 'expeditions selected',
    fr: 'expéditions sélectionnées',
    de: 'Expeditionen ausgewählt',
    it: 'spedizioni selezionate',
    pt: 'expedições selecionadas',
    ja: '件のツアーを選択中',
    zh: '个已选探险行程',
  },
  primarySwapped: {
    es: 'Expedición principal cambiada a:',
    en: 'Primary expedition changed to:',
    fr: 'Expédition principale changée en :',
    de: 'Hauptexpedition geändert zu:',
    it: 'Spedizione principale modificata in:',
    pt: 'Expedição principal alterada para:',
    ja: 'メインツアーが変更されました:',
    zh: '主探险行程已变更为:',
  },
  primaryBadge: {
    es: 'Principal',
    en: 'Primary',
    fr: 'Principal',
    de: 'Haupttour',
    it: 'Principale',
    pt: 'Principal',
    ja: 'メイン',
    zh: '主要',
  },
  confirmedChoice: {
    es: 'Selección Confirmada',
    en: 'Confirmed Choice',
    fr: 'Sélection Confirmée',
    de: 'Bestätigte Auswahl',
    it: 'Selezione Confermata',
    pt: 'Seleção Confirmada',
    ja: '選択確認済み',
    zh: '已确认选择',
  },
  startingFrom: {
    es: 'Inversión desde',
    en: 'Starting from',
    fr: 'À partir de',
    de: 'Ab',
    it: 'A partire da',
    pt: 'A partir de',
    ja: '基本料金',
    zh: '起价',
  },
  perTraveler: {
    es: 'por viajero',
    en: 'per traveler',
    fr: 'par voyageur',
    de: 'pro Reisender',
    it: 'per viaggiatore',
    pt: 'por viajante',
    ja: 'お一人様あたり',
    zh: '每位旅客',
  },
  viewFullItinerary: {
    es: 'Ver Itinerario Completo día por día',
    en: 'View Full Day-by-Day Itinerary',
    fr: 'Voir l’itinéraire complet jour par jour',
    de: 'Vollständigen Tagesablauf ansehen',
    it: 'Vedi itinerario completo giorno per giorno',
    pt: 'Ver itinerário completo dia a dia',
    ja: '日別の詳細日程を見る',
    zh: '查看每日详细行程',
  },
  changeTour: {
    es: 'Cambiar por otro tour del catálogo',
    en: 'Change for another tour',
    fr: 'Changer pour un autre circuit',
    de: 'Gegen eine andere Tour tauschen',
    it: 'Cambia con un altro tour',
    pt: 'Trocar por outro tour',
    ja: '別のツアーに変更',
    zh: '更换其他探险行程',
  },
  exploreAllTours: {
    es: 'Explorar todos los tours ↗',
    en: 'Explore all tours ↗',
    fr: 'Explorer tous les tours ↗',
    de: 'Alle Touren ansehen ↗',
    it: 'Esplora tutti i tour ↗',
    pt: 'Explorar todos os tours ↗',
    ja: '全ツアーを見る ↗',
    zh: '浏览全部行程 ↗',
  },
  step2: {
    es: '4. ¿Cuándo viajas?',
    en: '4. When are you traveling?',
    fr: '4. Quand voyagez-vous ?',
    de: '4. Wann reisen Sie?',
    it: '4. Quando viaggi?',
    pt: '4. Quando você viaja?',
    ja: '4. 出発時期はいつですか？',
    zh: '4. 您计划何时出行？',
  },
  step3: {
    es: '3. ¿Quiénes viajan?',
    en: '3. Who is traveling?',
    fr: '3. Qui participe au voyage ?',
    de: '3. Wer reist mit?',
    it: '3. Chi viaggia?',
    pt: '3. Quem viaja?',
    ja: '3. ご参加人数',
    zh: '3. 随行人员',
  },
  adults: {
    es: 'Adultos',
    en: 'Adults',
    fr: 'Adultes',
    de: 'Erwachsene',
    it: 'Adulti',
    pt: 'Adultos',
    ja: '大人',
    zh: '成人',
  },
  adultsAge: {
    es: '12+ años (Tarifa base ocupación doble)',
    en: '12+ years (Double occupancy base rate)',
    fr: '12+ ans (Tarif base occupation double)',
    de: '12+ Jahre (Basispreis Doppelbelegung)',
    it: '12+ anni (Tariffa base occupazione doppia)',
    pt: '12+ anos (Tarifa base ocupação dupla)',
    ja: '12歳以上（2名1室基本料金）',
    zh: '12岁及以上（双人入住标准费率）',
  },
  children: {
    es: 'Niños',
    en: 'Children',
    fr: 'Enfants',
    de: 'Kinder',
    it: 'Bambini',
    pt: 'Crianças',
    ja: '子供',
    zh: '儿童',
  },
  childrenAge: {
    es: '0 a 11 años (Tarifa reducida -20%)',
    en: '0 to 11 years (Reduced rate -20%)',
    fr: '0 à 11 ans (Tarif réduit -20%)',
    de: '0 bis 11 Jahre (Ermäßigter Tarif -20%)',
    it: '0 a 11 anni (Tariffa ridotta -20%)',
    pt: '0 a 11 anos (Tarifa reduzida -20%)',
    ja: '0〜11歳（20%割引料金）',
    zh: '0至11岁（特惠8折费率）',
  },
  step4: {
    es: '5. Tus Datos de Contacto',
    en: '5. Contact Details',
    fr: '5. Vos Coordonnées',
    de: '5. Ihre Kontaktdaten',
    it: '5. I Tuoi Dati di Contatto',
    pt: '5. Seus Datos de Contato',
    ja: '5. お客様のご連絡先',
    zh: '5. 您的联系方式',
  },
  fullName: {
    es: 'Nombre Completo',
    en: 'Full Name',
    fr: 'Nom Complet',
    de: 'Vollständiger Name',
    it: 'Nome Completo',
    pt: 'Nome Completo',
    ja: '氏名',
    zh: '姓名',
  },
  fullNamePlaceholder: {
    es: 'Tu nombre completo',
    en: 'Your full name',
    fr: 'Votre nom complet',
    de: 'Ihr vollständiger Name',
    it: 'Il tuo nome completo',
    pt: 'Seu nome completo',
    ja: 'お名前をご入力ください',
    zh: '您的全名',
  },
  email: {
    es: 'Correo Electrónico',
    en: 'Email Address',
    fr: 'Adresse E-mail',
    de: 'E-Mail-Adresse',
    it: 'Indirizzo Email',
    pt: 'E-mail',
    ja: 'メールアドレス',
    zh: '电子邮箱',
  },
  specialRequests: {
    es: 'Peticiones Especiales (Opcional)',
    en: 'Special Requests (Optional)',
    fr: 'Demandes Particulières (Optionnel)',
    de: 'Besondere Wünsche (Optional)',
    it: 'Richieste Particolari (Opzionale)',
    pt: 'Pedidos Especiais (Opcional)',
    ja: 'ご要望・備考（任意）',
    zh: '特别要求（选填）',
  },
  specialRequestsPlaceholder: {
    es: 'Alergias, necesidades dietéticas, celebraciones...',
    en: 'Dietary preferences, allergies, celebrations...',
    fr: 'Allergies, régime alimentaire, célébrations...',
    de: 'Allergien, Ernährungsformen, Feierlichkeiten...',
    it: 'Allergie, esigenze dietetiche, celebrazioni...',
    pt: 'Alergias, preferências alimentares, celebrações...',
    ja: 'アレルギー、食事制限、記念日など...',
    zh: '过敏史、餐饮偏好、特殊纪念日...',
  },
  expandCatalogPrompt: {
    es: '¿Deseas explorar otros tours de nuestro catálogo privado?',
    en: 'Would you like to explore other tours from our private catalog?',
    fr: 'Souhaitez-vous explorer d’autres circuits de notre catalogue privé ?',
    de: 'Möchten Sie weitere Touren aus unserem privaten Katalog entdecken?',
    it: 'Desideri esplorare altri tour del nostro catalogo privato?',
    pt: 'Deseja explorar outros tours do nosso catálogo privado?',
    ja: '他の限定遠征ツアーもご覧になりますか？',
    zh: '想探索我们尊享私人目录中的其他探险行程吗？',
  },
  expandCatalogSub: {
    es: 'Haz clic para desplegar todas las expediciones y excursiones',
    en: 'Click to display all expeditions and day tours',
    fr: 'Cliquez pour afficher toutes les expéditions et excursions',
    de: 'Klicken Sie hier, um alle Expeditionen und Tagestouren anzuzeigen',
    it: 'Clicca per mostrare tutte le spedizioni e i tour giornalieri',
    pt: 'Clique para ver todas as expedições e passeios',
    ja: 'クリックしてすべてのツアーを表示',
    zh: '点击展开查看全部探险和一日游行程',
  },
  hideCatalog: {
    es: 'Ocultar catálogo',
    en: 'Hide catalog',
    fr: 'Masquer le catalogue',
    de: 'Katalog ausblenden',
    it: 'Nascondi catalogo',
    pt: 'Ocultar catálogo',
    ja: 'カタログを閉じる',
    zh: '收起目录',
  },
  showCatalog: {
    es: 'Ver todos los tours',
    en: 'View all tours',
    fr: 'Voir tous les tours',
    de: 'Alle Touren anzeigen',
    it: 'Mostra tutti i tour',
    pt: 'Ver todos os tours',
    ja: 'すべてのツアーを見る',
    zh: '查看全部行程',
  },
  setAsPrimary: {
    es: 'Elegir como Principal',
    en: 'Set as Primary',
    fr: 'Choisir comme Principal',
    de: 'Als Haupttour wählen',
    it: 'Scegli come Principale',
    pt: 'Escolher como Principal',
    ja: 'メインツアーに指定',
    zh: '设为主行程',
  },
  addedBadge: {
    es: 'Añadido ✓',
    en: 'Added ✓',
    fr: 'Ajouté ✓',
    de: 'Hinzugefügt ✓',
    it: 'Aggiunto ✓',
    pt: 'Adicionado ✓',
    ja: '追加済み ✓',
    zh: '已添加 ✓',
  },
  addTour: {
    es: '+ Añadir',
    en: '+ Add',
    fr: '+ Ajouter',
    de: '+ Hinzufügen',
    it: '+ Aggiungi',
    pt: '+ Adicionar',
    ja: '+ 追加',
    zh: '+ 添加',
  },
  selectTourPrompt: {
    es: 'Selecciona un tour arriba',
    en: 'Select a tour above',
    fr: 'Sélectionnez un circuit ci-dessus',
    de: 'Wählen Sie oben eine Tour aus',
    it: 'Seleziona un tour sopra',
    pt: 'Selecione um tour acima',
    ja: '上部でツアーを選択してください',
    zh: '请在上方选择行程',
  },
  chooseDatePrompt: {
    es: 'Paso 4: Elige tu fecha de viaje',
    en: 'Step 4: Choose your travel date',
    fr: 'Étape 4 : Choisissez votre date de départ',
    de: 'Schritt 4: Reisedatum auswählen',
    it: 'Passo 4: Scegli la data del viaggio',
    pt: 'Passo 4: Escolha a data da viagem',
    ja: 'ステップ4: 出発日を選択',
    zh: '第四步：选择出行日期',
  },
  fillContactPrompt: {
    es: 'Paso 5: Completa tus datos de contacto',
    en: 'Step 5: Fill in your contact details',
    fr: 'Étape 4 : Renseignez vos coordonnées',
    de: 'Schritt 4: Kontaktdaten ausfüllen',
    it: 'Passo 4: Compila i tuoi dati di contatto',
    pt: 'Passo 4: Preencha seus dados de contato',
    ja: 'ステップ4: ご連絡先を入力',
    zh: '第四步：填写联系信息',
  },
  proceedPayment: {
    es: 'Proceder al Pago',
    en: 'Proceed to Payment',
    fr: 'Procéder au Paiement',
    de: 'Zur Zahlung übergehen',
    it: 'Procedi al Pagamento',
    pt: 'Prosseguir para o Pagamento',
    ja: 'お支払いへ進む',
    zh: '前往安全支付',
  },
  modalCatalogTitle: {
    es: 'Catálogo de Expediciones y Tours',
    en: 'Expeditions & Tours Catalog',
    fr: 'Catalogue d’Expéditions et de Tours',
    de: 'Katalog der Expeditionen und Touren',
    it: 'Catalogo Spedizioni e Tour',
    pt: 'Catálogo de Expedições e Passeios',
    ja: '遠征ツアーカタログ',
    zh: '专属探险行程目录',
  },
  modalCatalogDesc: {
    es: 'Selecciona tu tour principal o añade extensiones adicionales a tu itinerario',
    en: 'Select your primary tour or add additional extensions to your itinerary',
    fr: 'Sélectionnez votre expédition principale ou ajoutez des extensions',
    de: 'Wählen Sie Ihre Haupttour oder fügen Sie Verlängerungen hinzu',
    it: 'Seleziona la tua spedizione principale o aggiungi estensioni',
    pt: 'Selecione sua expedição principal ou adicione extensões',
    ja: 'メインツアーを選択するか、旅程にエクステンションを追加してください',
    zh: '选择您的主行程或为行程添加延展探索路线',
  },
  searchPlaceholder: {
    es: 'Buscar expedición por nombre o destino (ej. Galápagos, Cotopaxi, Quito)...',
    en: 'Search tour by title or destination (e.g. Galapagos, Cotopaxi, Quito)...',
    fr: 'Rechercher par nom ou destination (ex. Galapagos, Cotopaxi, Quito)...',
    de: 'Tour nach Name oder Ziel suchen (z.B. Galapagos, Cotopaxi, Quito)...',
    it: 'Cerca tour per nome o destinazione (es. Galapagos, Cotopaxi, Quito)...',
    pt: 'Buscar tour por nome ou destino (ex. Galápagos, Cotopaxi, Quito)...',
    ja: 'ツアー名または目的地で検索（例: ガラパゴス、コトパクシ、キト）...',
    zh: '按行程名称或目的地搜索（如加拉帕戈斯、科托帕希、基多）...',
  },
  clearSearch: {
    es: 'Limpiar',
    en: 'Clear',
    fr: 'Effacer',
    de: 'Löschen',
    it: 'Cancella',
    pt: 'Limpar',
    ja: 'クリア',
    zh: '清空',
  },
  noToursFound: {
    es: 'No se encontraron tours con ese criterio.',
    en: 'No tours found matching your search.',
    fr: 'Aucun circuit trouvé pour cette recherche.',
    de: 'Keine passenden Touren gefunden.',
    it: 'Nessun tour trovato per questa ricerca.',
    pt: 'Nenhum tour encontrado com esses critérios.',
    ja: '該当するツアーが見つかりませんでした。',
    zh: '未找到符合条件的探险行程。',
  },
  currentPrimary: {
    es: 'Principal Actual',
    en: 'Current Primary',
    fr: 'Principal Actuel',
    de: 'Aktuelle Haupttour',
    it: 'Principale Attuale',
    pt: 'Principal Atual',
    ja: '現在のメインツアー',
    zh: '当前主行程',
  },
  selectedExpedition: {
    es: 'Expedición seleccionada',
    en: 'Selected expedition',
    fr: 'Expédition sélectionnée',
    de: 'Ausgewählte Expedition',
    it: 'Spedizione selezionata',
    pt: 'Expedição selecionada',
    ja: '選択中のツアー',
    zh: '已选择行程',
  },
  removeExtension: {
    es: 'Quitar extensión',
    en: 'Remove extension',
    fr: 'Retirer l’extension',
    de: 'Verlängerung entfernen',
    it: 'Rimuovi estensione',
    pt: 'Remover extensão',
    ja: 'エクステンションを削除',
    zh: '移除延伸行程',
  },
  addExtension: {
    es: '+ Añadir extensión',
    en: '+ Add extension',
    fr: '+ Ajouter l’extension',
    de: '+ Verlängerung hinzufügen',
    it: '+ Aggiungi estensione',
    pt: '+ Adicionar extensão',
    ja: '+ エクステンションを追加',
    zh: '+ 添加延伸行程',
  },
  viewAllOnWebsite: {
    es: 'Ver todos los tours en el sitio web ↗',
    en: 'View all tours on website ↗',
    fr: 'Voir tous les circuits sur le site ↗',
    de: 'Alle Touren auf der Website ansehen ↗',
    it: 'Vedi tutti i tour sul sito ↗',
    pt: 'Ver todos os tours no site ↗',
    ja: 'ウェブサイトで全ツアーを見る ↗',
    zh: '在官网查看全部行程 ↗',
  },
  closeModal: {
    es: 'Cerrar ventana',
    en: 'Close',
    fr: 'Fermer',
    de: 'Schließen',
    it: 'Chiudi',
    pt: 'Fechar',
    ja: '閉じる',
    zh: '关闭',
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

type BookingTourCategory = 'daily' | 'galapagos' | 'continental' | 'combined';

function getBookingTourCategory(tour: Tour): BookingTourCategory {
  const destination = (typeof tour.destination === 'string' ? tour.destination : (tour.destination as any)?.en || (tour.destination as any)?.es || '').toLowerCase();
  const id = (tour.id || '').toLowerCase();
  const isDaily = tour.durationDays === 1 || id.includes('quito-city') || id.includes('otavalo') || id.includes('papallacta') || id.includes('mindo') || id.includes('antisana') || id.includes('cotopaxi') || id.includes('quilotoa') || destination.includes('full') || destination.includes('daily');

  if (isDaily) return 'daily';
  if (id.includes('ecuador-galapagos') || (destination.includes('ecuador') && destination.includes('galapagos')) || destination.includes('combined')) return 'combined';
  if (destination.includes('galapagos') || id.includes('galapagos')) return 'galapagos';
  return 'continental';
}

function canAddTourToBooking(candidate: Tour, selectedTours: Tour[]): boolean {
  if (selectedTours.some((tour) => tour.id === candidate.id)) return true;
  const selectedCategories = selectedTours.map(getBookingTourCategory);
  const candidateCategory = getBookingTourCategory(candidate);

  if (selectedCategories.length === 0 || selectedCategories.every((category) => category === 'daily')) return true;
  if (selectedCategories.includes('combined') || (selectedCategories.includes('galapagos') && selectedCategories.includes('continental'))) return candidateCategory === 'daily';
  if (selectedCategories.includes('galapagos')) return candidateCategory === 'continental' || candidateCategory === 'daily';
  if (selectedCategories.includes('continental')) return candidateCategory === 'galapagos' || candidateCategory === 'daily';
  return candidateCategory === 'daily';
}

function getTourPriceForTier(tour: Tour, tier: BookingTier): number {
  if (getBookingTourCategory(tour) === 'daily') return tour.price3Star || tour.price || 0;
  const clubPrice = tour.price3Star || tour.price || 0;
  return tier === 'vip' ? tour.price4Star || Math.round(clubPrice * 1.15) : clubPrice;
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
  const requestedTier = searchParams.get('tier');

  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [selectedTier, setSelectedTier] = useState<BookingTier>(requestedTier === 'vip' ? 'vip' : 'club');
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

  useEffect(() => {
    setSelectedTier(requestedTier === 'vip' ? 'vip' : 'club');
  }, [requestedTier]);

  const [date, setDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
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
      } catch (e) { }
    }

    if (targetTourId) {
      const tour = mockTours.find(t => t.id === targetTourId);
      if (tour) {
        setSelectedTours(prev => prev.some(t => t.id === tour.id) ? prev : [tour, ...prev]);
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.removeItem('preselected_tour_id');
            localStorage.removeItem('vermilion_selected_tour');
          } catch (e) { }
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
  const candidateTours = mockTours.filter((tour) => tour.id !== primaryTour?.id && canAddTourToBooking(tour, selectedTours));
  const ci18n = BOOKING_CAROUSEL_I18N[locale] || BOOKING_CAROUSEL_I18N['es'];

  const replacePrimaryTour = (newTour: Tour) => {
    setSelectedTours(prev => {
      const remaining = prev.filter((tour) => tour.id !== newTour.id && tour.id !== primaryTour?.id && canAddTourToBooking(tour, [newTour]));
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
      if (!canAddTourToBooking(tour, prev)) return prev;
      return [...prev, tour];
    });
  };

  useEffect(() => {
    if (selectedTours.length > 0) {
      let tAB = 0, tCB = 0, tAA = 0, tCA = 0, tSub = 0, tDisc = 0, tFinal = 0;
      let anyMinTwo = false;
      selectedTours.forEach(tour => {
        const isDaily = tour.durationDays === 1 || (typeof tour.duration === 'object' && String(tour.duration?.en || '').includes('1 DAY'));
        const p = calculateTourPrice(getTourPriceForTier(tour, selectedTier), adults, children, date, isDaily);
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
  }, [selectedTours, selectedTier, adults, children, date]);

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
      tier: selectedTier,
      isDailyTour: isDaily ? 'true' : 'false',
    });
    window.location.href = `/${locale}/checkout/payment?${queryParams.toString()}`;
  };

  const isFormComplete = () => selectedTours.length > 0 && date !== '' && adults > 0 && contactInfo.name.trim() !== '' && contactInfo.email.trim() !== '';

  const w = useMemo<Record<string, string>>(() => {
    const translations: Record<string, string> = {};
    for (const [key, values] of Object.entries(BOOKING_WIZARD_I18N)) {
      translations[key] = values[locale] || values.en || values.es || '';
    }
    return translations;
  }, [locale]);

  type CTAState = { label: string; ref: React.RefObject<HTMLDivElement> | null; ready: boolean };
  const getMobileCTA = (): CTAState => {
    if (selectedTours.length === 0) return { label: w.selectTourPrompt, ref: null, ready: false };
    if (!date) return { label: w.chooseDatePrompt, ref: dateRef, ready: false };
    if (!contactInfo.name.trim() || !contactInfo.email.trim()) return { label: w.fillContactPrompt, ref: contactRef, ready: false };
    return { label: `${w.proceedPayment} - $${pricing.total.toLocaleString('en-US')} USD`, ref: null, ready: true };
  };
  const mobileCTA = getMobileCTA();
  const filteredTours = filterTours(mockTours, activeFilter).filter((tour) => selectedTours.some((selected) => selected.id === tour.id) || canAddTourToBooking(tour, selectedTours));
  const searchedTours = filteredTours.filter((t) => {
    if (!tourSearchQuery.trim()) return true;
    const q = tourSearchQuery.toLowerCase().trim();
    const title = (typeof t.title === 'string' ? t.title : (t.title?.es || t.title?.en || '')).toLowerCase();
    const dest = (typeof t.destination === 'string' ? t.destination : ((t.destination as any)?.es || (t.destination as any)?.en || '')).toLowerCase();
    return title.includes(q) || dest.includes(q);
  });

  return (
    <>
      <BookingSubNav primaryTour={selectedTours[0] || null} pricing={pricing} locale={locale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 pb-28 lg:pb-8">
        <div className="mb-5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            {w.headerTitle}
          </h2>
          <p className="text-sm text-zinc-500">
            {w.headerSubtitle}
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
                    <Map className="w-5 h-5 text-emerald-600" /> {w.step1}
                  </h3>
                  {selectedTours.length > 1 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      {selectedTours.length} {w.selectedExpeditions}
                    </span>
                  )}
                </div>

                {/* Feedback toast when tour is swapped */}
                {swappedTourNotice && (
                  <div className="mb-3 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {w.primarySwapped} <strong>{swappedTourNotice}</strong>
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
                          {w.primaryBadge}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
                            ⭐ {w.confirmedChoice}
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
                        <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">{w.startingFrom}</span>
                        <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400" suppressHydrationWarning>
                          ${getTourPriceForTier(primaryTour, selectedTier).toLocaleString('en-US')} USD
                        </span>
                        <span className="text-[10px] text-zinc-400 block">{w.perTraveler}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-2.5">
                      <a
                        href={`/${locale}/tours/${primaryTour.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>{w.viewFullItinerary}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsTourModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                          <span>{w.changeTour}</span>
                        </button>

                        <a
                          href={`/${locale}/tours`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{w.exploreAllTours}</span>
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
                            className={`w-[290px] sm:w-[320px] shrink-0 snap-start rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 shadow-sm ${isAdded
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
                                  ${getTourPriceForTier(sugTour, selectedTier).toLocaleString('en-US')} USD <span className="text-[10px] font-normal text-zinc-400">{ci18n.perTraveler}</span>
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
                                className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${isAdded
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

              {selectedTours.some((tour) => getBookingTourCategory(tour) !== 'daily') && (
                <BookingComfortTierSelector locale={locale} selectedTier={selectedTier} onSelectTier={setSelectedTier} />
              )}

              <hr className="border-zinc-100 dark:border-zinc-800" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div ref={dateRef} className="md:col-span-7">
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-emerald-600" /> {w.step2}
                  </h3>
                  <TravelDatePicker selectedDate={date} onDateSelect={(d) => setDate(d)} durationDays={selectedTours.reduce((total, tour) => total + (tour.durationDays || 1), 0)} />
                </div>
                <div ref={passengersRef} className="md:col-span-5">
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" /> {w.step3}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                          {w.adults}
                        </h4>
                        <p className="text-[10px] text-zinc-500">
                          {w.adultsAge}
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
                            {w.children}
                          </h4>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[9px] font-bold">
                            -20%
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500">
                          {w.childrenAge}
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
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {w.step4}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="booking-name" className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{w.fullName}</label>
                        <input
                          id="booking-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          autoCapitalize="words"
                          value={contactInfo.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                          placeholder={w.fullNamePlaceholder}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="booking-email" className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{w.email}</label>
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
                        <label htmlFor="booking-notes" className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{w.specialRequests}</label>
                        <textarea
                          id="booking-notes"
                          name="notes"
                          rows={2}
                          value={contactInfo.notes}
                          onChange={(e) => handleContactChange('notes', e.target.value)}
                          placeholder={w.specialRequestsPlaceholder}
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
                        {w.expandCatalogPrompt}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {w.expandCatalogSub}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {showFullCatalog ? w.hideCatalog : w.showCatalog}
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
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${activeFilter === cat.id
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
                            className={`border rounded-2xl p-3.5 transition-all flex flex-col justify-between gap-2.5 ${isSelected
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
                                    ${getTourPriceForTier(t, selectedTier).toLocaleString('en-US')} USD
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
                                {w.setAsPrimary}
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleTour(t)}
                                className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${isSelected
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-zinc-800 text-white dark:bg-white dark:text-zinc-900'
                                  }`}
                              >
                                {isSelected ? w.addedBadge : w.addTour}
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
            <PriceCalculator tours={selectedTours} pricing={pricing} date={date} contactInfo={contactInfo} step={3} onContinue={handleCheckout} canContinue={isFormComplete() && !isProcessing} affiliateRef={affiliateRef} tier={selectedTier} />
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
            <p className="text-center text-[10px] text-zinc-400 mt-1.5">{selectedTours.length} tour{selectedTours.length > 1 ? 's' : ''} {w.selectedExpeditions}</p>
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
                      {w.modalCatalogTitle}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {w.modalCatalogDesc}
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
                    placeholder={w.searchPlaceholder}
                    className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {tourSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setTourSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      {w.clearSearch}
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
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${activeFilter === cat.id
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
                    {w.noToursFound}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchedTours.map((t) => {
                      const isPrimary = primaryTour?.id === t.id;
                      const isAdded = selectedTours.some(st => st.id === t.id);

                      return (
                        <div
                          key={t.id}
                          className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${isPrimary
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
                                  ⭐ {w.currentPrimary}
                                </span>
                              )}
                              <h4 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                                {getLocalizedText(t.title, locale)}
                              </h4>
                              <div className="flex items-center gap-2 mt-1.5 text-xs">
                                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                  ${getTourPriceForTier(t, selectedTier).toLocaleString('en-US')} USD
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
                                ✓ {w.selectedExpedition}
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
                                {w.setAsPrimary}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => toggleTour(t)}
                              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${isAdded
                                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300'
                                  : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90'
                                }`}
                            >
                              {isAdded ? w.removeExtension : w.addExtension}
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
                  <span>{w.viewAllOnWebsite}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsTourModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-all cursor-pointer"
                >
                  {w.closeModal}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
