'use client';
import { openPlanTrip } from '@/data/planTrip';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Compass,
  MapPin,
  Filter,
  CheckCircle2,
  Plus,
  Check,
  Info,
  Sparkles,
  Phone,
  MessageCircle,
  ShieldCheck,
  Eye,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star
} from 'lucide-react';
import {
  GALAPAGOS_ACTIVITIES,
  BASE_TOURS_GALAPAGOS,
  GALAPAGOS_ISLANDS,
  GALAPAGOS_CATEGORIES,
  ICONIC_GALAPAGOS_ACTIVITY_IDS,
  MONTH_NAMES,
  GalapagosActivity,
  GalapagosIslandId,
  GalapagosCategoryId
} from '@/data/galapagosActivitiesData';

interface GalapagosActivitiesExplorerProps {
  locale: string;
  initialBaseTourId?: string;
  showHeroBanner?: boolean;
}

const SELECT_CLS =
  'min-w-0 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500';

const EXTRA_UI: Record<string, Record<string, string>> = {
  es: { title: 'Arma tu viaje a Galápagos', desc: 'Elige un tour base y mira qué actividades ya incluye y cuáles puedes sumar. Filtra por época, isla o tipo de actividad.', tour: 'Tour base', season: 'Época del año', island: 'Isla', category: 'Tipo de actividad', search: 'Buscar', incTitle: 'Incluidas en tu tour', incDesc: 'Estas actividades ya forman parte del tour que elegiste.', extTitle: 'Actividades que puedes añadir', extDesc: 'No están en el tour: añade las que quieras y te las cotizamos.' },
  en: { title: 'Build your Galápagos trip', desc: 'Pick a base tour to see which activities it already includes and which ones you can add. Filter by season, island or activity type.', tour: 'Base tour', season: 'Time of year', island: 'Island', category: 'Activity type', search: 'Search', incTitle: 'Included in your tour', incDesc: 'These activities are already part of the tour you chose.', extTitle: 'Activities you can add', extDesc: 'Not in the tour: add the ones you like and we will quote them.' },
  fr: { title: 'Composez votre voyage aux Galápagos', desc: "Choisissez un circuit de base pour voir les activités incluses et celles à ajouter. Filtrez par saison, île ou type d'activité.", tour: 'Circuit de base', season: 'Période', island: 'Île', category: "Type d'activité", search: 'Rechercher', incTitle: 'Incluses dans votre circuit', incDesc: 'Ces activités font déjà partie du circuit choisi.', extTitle: 'Activités à ajouter', extDesc: 'Hors circuit : ajoutez celles que vous aimez et nous vous les chiffrons.' },
  de: { title: 'Planen Sie Ihre Galápagos-Reise', desc: 'Wählen Sie eine Basis-Tour und sehen Sie, was enthalten ist und was Sie hinzufügen können. Filtern nach Jahreszeit, Insel oder Aktivität.', tour: 'Basis-Tour', season: 'Jahreszeit', island: 'Insel', category: 'Aktivitätsart', search: 'Suchen', incTitle: 'In Ihrer Tour enthalten', incDesc: 'Diese Aktivitäten sind bereits Teil Ihrer Tour.', extTitle: 'Aktivitäten zum Hinzufügen', extDesc: 'Nicht in der Tour: fügen Sie hinzu, was Ihnen gefällt – wir kalkulieren es.' },
  it: { title: 'Costruisci il tuo viaggio alle Galápagos', desc: "Scegli un tour base per vedere le attività incluse e quelle da aggiungere. Filtra per stagione, isola o tipo di attività.", tour: 'Tour base', season: 'Periodo', island: 'Isola', category: 'Tipo di attività', search: 'Cerca', incTitle: 'Incluse nel tuo tour', incDesc: 'Queste attività fanno già parte del tour scelto.', extTitle: 'Attività che puoi aggiungere', extDesc: 'Non sono nel tour: aggiungi quelle che ti piacciono e te le quotiamo.' },
  pt: { title: 'Monte sua viagem a Galápagos', desc: 'Escolha um tour base e veja o que já está incluído e o que você pode adicionar. Filtre por época, ilha ou tipo de atividade.', tour: 'Tour base', season: 'Época do ano', island: 'Ilha', category: 'Tipo de atividade', search: 'Buscar', incTitle: 'Incluídas no seu tour', incDesc: 'Estas atividades já fazem parte do tour escolhido.', extTitle: 'Atividades que você pode adicionar', extDesc: 'Fora do tour: adicione as que quiser e nós cotamos.' },
  ja: { title: 'ガラパゴス旅行をつくる', desc: 'ベースツアーを選ぶと、含まれる体験と追加できる体験がわかります。時期・島・種類で絞り込めます。', tour: 'ベースツアー', season: '時期', island: '島', category: '体験の種類', search: '検索', incTitle: 'ツアーに含まれる体験', incDesc: '選んだツアーにすでに含まれています。', extTitle: '追加できる体験', extDesc: 'ツアー外です。ご希望のものを追加すればお見積りします。' },
  zh: { title: '定制您的加拉帕戈斯之旅', desc: '选择基础行程，即可看到已包含和可添加的活动。可按季节、岛屿或活动类型筛选。', tour: '基础行程', season: '季节', island: '岛屿', category: '活动类型', search: '搜索', incTitle: '行程已包含', incDesc: '这些活动已包含在您选择的行程中。', extTitle: '可添加的活动', extDesc: '不在行程内：添加您喜欢的，我们为您报价。' },
};

export function GalapagosActivitiesExplorer({
  locale,
  initialBaseTourId = 'none',
  showHeroBanner = true,
}: GalapagosActivitiesExplorerProps) {
  // ── States ────────────────────────────────────────────────────────────────
  const [selectedBaseTourId, setSelectedBaseTourId] = useState<string>(initialBaseTourId);
  const [hideIncludedActivities, setHideIncludedActivities] = useState<boolean>(true);
  const [selectedSeason, setSelectedSeason] = useState<'all' | 'warm' | 'cool'>('all');
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [selectedIsland, setSelectedIsland] = useState<GalapagosIslandId>('all');
  const [selectedCategory, setSelectedCategory] = useState<GalapagosCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [activeModalActivity, setActiveModalActivity] = useState<GalapagosActivity | null>(null);

  // ── Carousel Controls ─────────────────────────────────────────────────────
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollState();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  // Carrusel automático e infinito: avanza solo y al llegar al final vuelve al inicio.
  const [carouselPaused, setCarouselPaused] = useState(false);
  useEffect(() => {
    if (carouselPaused) return;
    const id = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) el.scrollTo({ left: 0, behavior: 'smooth' });
      else el.scrollBy({ left: step, behavior: 'smooth' });
    }, 3500);
    return () => clearInterval(id);
  }, [carouselPaused]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth >= 1024 ? clientWidth * 0.75 : clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // ── Localized UI Dictionary (8 IDIOMAS OBLIGATORIOS) ──────────────────────
  const UI = useMemo(() => {
    const dict: Record<string, Record<string, string>> = {
      es: {
        headingTag: 'Catálogo Oficial de Experiencias',
        headingTitle: 'Actividades en Galápagos',
        headingHighlight: 'a tu Medida',
        headingDesc: 'Explora las actividades más deslumbrantes del archipiélago. Selecciona tus favoritas, añade experiencias a tu itinerario y cotiza tu viaje soñado con nuestros diseñadores bilingües.',
        iconicTag: 'Experiencias Icónicas Imperdibles',
        iconicTitle: 'Lo Más Hermoso de Galápagos',
        iconicDesc: 'Nadar con tortugas marinas, explorar canales de tiburones tintoreras o caminar sobre calderas volcánicas activas. Elige tus favoritas para añadirlas a tu itinerario.',
        baseTourTitle: 'Nivel 1: Selecciona tu Tour Base de Vermilion',
        baseTourDesc: 'Al seleccionar un tour, las actividades ya incluidas se filtrarán automáticamente para mostrarte las opciones adicionales disponibles para personalizar tu viaje.',
        hideIncludedLabel: 'Ocultar actividades ya incluidas en mi tour base',
        showAllLabel: 'Ver todas (incluidas y adicionales)',
        seasonTitle: 'Nivel 2: Temporada & Mes de Viaje',
        seasonAll: 'Todo el Año',
        seasonWarm: 'Temporada Cálida (Dic - May)',
        seasonCool: 'Temporada Garúa / Fresca (Jun - Nov)',
        islandTitle: 'Nivel 3: Selecciona por Isla',
        categoryTitle: 'Categoría de Actividad',
        searchPlaceholder: 'Buscar actividad, fauna o isla (ej. martillo, tortuga, albatros)...',
        includedBadge: '✓ Incluido en tu Tour Base',
        availableBadge: '✨ Adicional Cotizable',
        addToItinerary: '+ Añadir a mi itinerario',
        addCompact: '+ Añadir',
        removeActivity: '✓ Seleccionada',
        activityDetails: 'Ver Detalles y Fauna',
        selectedCount: 'actividades seleccionadas',
        quoteExpeditionCTA: 'Cotizar Expedición con Diseñador de Viajes',
        clearSelection: 'Limpiar selección',
        contactAdvisorTitle: '¿Dudas con la logística o la mejor época?',
        contactAdvisorText: 'Cualquier duda, consulta directamente con nuestros diseñadores de expedición en Ecuador (100% bilingües inglés-español) o con nuestros representantes en EE.UU.',
        chatWhatsapp: 'Consultar por WhatsApp',
        callAdvisor: 'Llamar a un Especialista',
        catalogTag: 'Catálogo Completo',
        catalogTitle: 'Todas las Actividades por Isla & Temporada',
        catalogDesc: 'Explora el catálogo completo de experiencias y añade las actividades adicionales que más te apasionen.',
        noResults: 'No se encontraron actividades con los filtros seleccionados.',
        resetFilters: 'Restablecer filtros',
        modalClose: 'Cerrar',
        keyWildlifeTitle: 'Fauna y Vida Silvestre Destacada',
        highlightsTitle: 'Puntos Culminantes de la Experiencia',
        seasonNotesTitle: 'Notas Biológicas y de Temporada',
        durationLabel: 'Duración Estimada',
        difficultyLabel: 'Nivel de Dificultad',
        pricingNoteLabel: 'Logística y Guianza',
        navigableLabel: 'Excursión Navegable en Yate',
        includedState: '✓ Incluido en tu tour',
        selectedState: '✓ Seleccionada',
      },
      en: {
        headingTag: 'Official Archipelago Experience Index',
        headingTitle: 'Galapagos Activities',
        headingHighlight: 'Tailor-Made',
        headingDesc: 'Explore the most breathtaking experiences across the archipelago. Pick your favorites, add activities to your tailored itinerary, and plan your dream journey with our bilingual designers.',
        iconicTag: 'Signature Must-Do Encounters',
        iconicTitle: 'The Very Best of Galapagos',
        iconicDesc: 'Swim alongside sea turtles, snorkel through reef shark lava channels, or hike active volcanic calderas. Pick your favorites to add directly to your itinerary.',
        baseTourTitle: 'Level 1: Select Your Vermilion Base Tour',
        baseTourDesc: 'When you select a base tour, included activities automatically filter out, revealing only available optional add-ons to customize your journey.',
        hideIncludedLabel: 'Hide activities already included in base tour',
        showAllLabel: 'Show all activities (included & add-ons)',
        seasonTitle: 'Level 2: Travel Season & Month',
        seasonAll: 'All Year Round',
        seasonWarm: 'Warm & Tropical Season (Dec - May)',
        seasonCool: 'Cool & Garúa Season (Jun - Nov)',
        islandTitle: 'Level 3: Filter by Island',
        categoryTitle: 'Activity Category',
        searchPlaceholder: 'Search activity, wildlife or island (e.g. shark, turtle, albatross)...',
        includedBadge: '✓ Included in Base Tour',
        availableBadge: '✨ Customizable Add-On',
        addToItinerary: '+ Add to My Itinerary',
        addCompact: '+ Add',
        removeActivity: '✓ Selected',
        activityDetails: 'View Details & Wildlife',
        selectedCount: 'activities selected',
        quoteExpeditionCTA: 'Quote Expedition with Travel Designer',
        clearSelection: 'Clear selection',
        contactAdvisorTitle: 'Questions regarding wildlife timing or inter-island logistics?',
        contactAdvisorText: 'For any questions, consult directly with our expedition designers in Ecuador (100% bilingual English-Spanish) or with our representatives in the USA.',
        chatWhatsapp: 'Chat on WhatsApp',
        callAdvisor: 'Call a Specialist',
        catalogTag: 'Complete Catalog',
        catalogTitle: 'All Activities by Island & Season',
        catalogDesc: 'Browse the entire spectrum of experiences and select your favorite bespoke add-ons.',
        noResults: 'No activities match the current filters.',
        resetFilters: 'Reset all filters',
        modalClose: 'Close',
        keyWildlifeTitle: 'Featured Wildlife & Endemics',
        highlightsTitle: 'Experience Highlights',
        seasonNotesTitle: 'Biological & Seasonal Insights',
        durationLabel: 'Estimated Duration',
        difficultyLabel: 'Physical Difficulty',
        pricingNoteLabel: 'Logistics & Guiding',
        navigableLabel: 'Navigable Day Yacht Hop',
        includedState: '✓ Included in your tour',
        selectedState: '✓ Selected',
      },
      fr: {
        headingTag: 'Index Officiel des Expériences',
        headingTitle: 'Activités aux Galápagos',
        headingHighlight: 'sur Mesure',
        headingDesc: 'Découvrez les expériences les plus spectaculaires de l\'archipel. Choisissez vos préférées, ajoutez-les à votre itinéraire et concevez votre voyage sur mesure avec nos designers bilingues.',
        iconicTag: 'Expériences Incontournables',
        iconicTitle: 'Le Plus Beau des Galápagos',
        iconicDesc: 'Nager avec les tortues marines, explorer les canaux de requins ou gravir les volcans actifs. Choisissez vos préférées pour votre itinéraire.',
        baseTourTitle: 'Niveau 1 : Sélectionnez votre Circuit Base Vermilion',
        baseTourDesc: 'Les activités déjà incluses sont filtrées automatiquement pour afficher uniquement les expériences additionnelles disponibles.',
        hideIncludedLabel: 'Masquer les activités déjà incluses',
        showAllLabel: 'Tout afficher (incluses et additionnelles)',
        seasonTitle: 'Niveau 2 : Saison & Mois de Voyage',
        seasonAll: 'Toute l\'année',
        seasonWarm: 'Saison Chaude (Déc - Mai)',
        seasonCool: 'Saison Fraîche (Juin - Nov)',
        islandTitle: 'Niveau 3 : Filtrer par Île',
        categoryTitle: 'Catégorie d\'Activité',
        searchPlaceholder: 'Rechercher activité, faune ou île...',
        includedBadge: '✓ Inclus dans le Circuit Base',
        availableBadge: '✨ Option Additionnelle',
        addToItinerary: '+ Ajouter à l\'itinéraire',
        addCompact: '+ Ajouter',
        removeActivity: '✓ Sélectionnée',
        activityDetails: 'Détails & Faune',
        selectedCount: 'activités sélectionnées',
        quoteExpeditionCTA: 'Demander un Devis avec un Designer de Voyage',
        clearSelection: 'Effacer la sélection',
        contactAdvisorTitle: 'Des questions sur la faune ou la logistique entre les îles ?',
        contactAdvisorText: 'Pour toute question, consultez directement nos concepteurs d\'expédition en Équateur (100% bilingues anglais-espagnol) ou nos représentants aux États-Unis.',
        chatWhatsapp: 'Discuter sur WhatsApp',
        callAdvisor: 'Appeler un Spécialiste',
        catalogTag: 'Catalogue Complet',
        catalogTitle: 'Toutes les Activités par Île & Saison',
        catalogDesc: 'Parcourez l\'ensemble des expériences disponibles et sélectionnez les activités additionnelles souhaitées.',
        noResults: 'Aucune activité ne correspond à vos filtres.',
        resetFilters: 'Réinitialiser les filtres',
        modalClose: 'Fermer',
        keyWildlifeTitle: 'Faune & Espèces Endémiques',
        highlightsTitle: 'Points Forts de l\'Expérience',
        seasonNotesTitle: 'Notes Biologiques & Saisonnières',
        durationLabel: 'Durée Estimée',
        difficultyLabel: 'Niveau de Difficulté',
        pricingNoteLabel: 'Logistique & Guidage',
        navigableLabel: 'Navigation d\'un Jour en Yacht',
        includedState: '✓ Inclus dans votre tour',
        selectedState: '✓ Sélectionnée',
      },
      de: {
        headingTag: 'Offizieller Erlebnis-Katalog',
        headingTitle: 'Galapagos Aktivitäten',
        headingHighlight: 'nach Maß',
        headingDesc: 'Entdecken Sie die faszinierendsten Erlebnisse des Archipels. Wählen Sie Ihre Favoriten, fügen Sie Aktivitäten zu Ihrer Reiseroute hinzu und planen Sie mit unseren zweisprachigen Designern.',
        iconicTag: 'Unvergessliche Highlights',
        iconicTitle: 'Das Schönste auf Galapagos',
        iconicDesc: 'Mit Meeresschildkröten schwimmen, Riffhai-Kanäle erkunden oder auf Vulkanen wandern. Fügen Sie Ihre Favoriten direkt zur Reiseroute hinzu.',
        baseTourTitle: 'Stufe 1: Wählen Sie Ihre Vermilion Basistour',
        baseTourDesc: 'Integrierte Aktivitäten werden automatisch gefiltert, sodass Sie nur verfügbare Zusatzoptionen sehen.',
        hideIncludedLabel: 'Bereits enthaltene Aktivitäten ausblenden',
        showAllLabel: 'Alle anzeigen (inklusive & zusätzlich)',
        seasonTitle: 'Stufe 2: Saison & Reisemonat',
        seasonAll: 'Ganzjährig',
        seasonWarm: 'Warme Saison (Dez - Mai)',
        seasonCool: 'Kühle Garúa-Saison (Jun - Nov)',
        islandTitle: 'Stufe 3: Nach Insel filtern',
        categoryTitle: 'Aktivitätskategorie',
        searchPlaceholder: 'Aktivität, Tierwelt oder Insel suchen...',
        includedBadge: '✓ In Basistour enthalten',
        availableBadge: '✨ Individuelle Zusatzoption',
        addToItinerary: '+ Zur Reiseroute hinzufügen',
        addCompact: '+ Hinzufügen',
        removeActivity: '✓ Ausgewählt',
        activityDetails: 'Details & Tierwelt',
        selectedCount: 'Aktivitäten ausgewählt',
        quoteExpeditionCTA: 'Expedition mit Reise-Designer anfragen',
        clearSelection: 'Auswahl löschen',
        contactAdvisorTitle: 'Fragen zu Tierbegegnungen oder Insel-Logistik?',
        contactAdvisorText: 'Bei Fragen wenden Sie sich direkt an unsere Expeditionsdesigner in Ecuador (100% zweisprachig Englisch-Spanisch) oder unsere US-Vertreter.',
        chatWhatsapp: 'WhatsApp Chat',
        callAdvisor: 'Spezialisten anrufen',
        catalogTag: 'Vollständiger Katalog',
        catalogTitle: 'Alle Aktivitäten nach Insel & Saison',
        catalogDesc: 'Durchsuchen Sie alle Erlebnisse und wählen Sie Ihre bevorzugten individuellen Zusätze.',
        noResults: 'Keine Aktivitäten für diese Filter gefunden.',
        resetFilters: 'Filter zurücksetzen',
        modalClose: 'Schließen',
        keyWildlifeTitle: 'Hervorgehobene Tierwelt',
        highlightsTitle: 'Höhepunkte des Erlebnisses',
        seasonNotesTitle: 'Biologische & saisonale Hinweise',
        durationLabel: 'Geschätzte Dauer',
        difficultyLabel: 'Schwierigkeitsgrad',
        pricingNoteLabel: 'Logistik & Führung',
        navigableLabel: 'Tagesausflug mit Yacht',
        includedState: '✓ In Ihrer Tour enthalten',
        selectedState: '✓ Ausgewählt',
      },
      it: {
        headingTag: 'Indice Ufficiale delle Esperienze',
        headingTitle: 'Attività alle Galapagos',
        headingHighlight: 'su Misura',
        headingDesc: 'Esplora le meraviglie più spettacolari dell\'arcipelago. Seleziona le tue esperienze preferite e personalizza il viaggio con i nostri designer bilingui.',
        iconicTag: 'Esperienze Iconiche Imperdibili',
        iconicTitle: 'Il Meglio delle Galapagos',
        iconicDesc: 'Nuotare con tartarughe marine, esplorare canali di squali o fare trekking su crateri vulcanici attivi. Scegli le tue preferite.',
        baseTourTitle: 'Livello 1: Seleziona il tuo Tour Base Vermilion',
        baseTourDesc: 'Le attività già incluse vengono filtrate per mostrarti solo le opzioni addizionali disponibili.',
        hideIncludedLabel: 'Nascondi attività già incluse',
        showAllLabel: 'Mostra tutto (incluse e addizionali)',
        seasonTitle: 'Livello 2: Stagione & Mese di Viaggio',
        seasonAll: 'Tutto l\'Anno',
        seasonWarm: 'Stagione Calda (Dic - Mag)',
        seasonCool: 'Stagione Fresca (Giu - Nov)',
        islandTitle: 'Livello 3: Seleziona per Isola',
        categoryTitle: 'Categoria Attività',
        searchPlaceholder: 'Cerca attività, fauna o isola...',
        includedBadge: '✓ Incluso nel Tour Base',
        availableBadge: '✨ Addizionale su Misura',
        addToItinerary: '+ Aggiungi all\'itinerario',
        addCompact: '+ Aggiungi',
        removeActivity: '✓ Selezionata',
        activityDetails: 'Dettagli & Fauna',
        selectedCount: 'attività selezionate',
        quoteExpeditionCTA: 'Richiedi Preventivo con Travel Designer',
        clearSelection: 'Svuota selezione',
        contactAdvisorTitle: 'Dubbi sulla fauna o la logistica tra le isole?',
        contactAdvisorText: 'Per qualsiasi dubbio, consulta direttamente i nostri expedition designer in Ecuador (100% bilingui inglese-spagnolo) o i nostri rappresentanti negli Stati Uniti.',
        chatWhatsapp: 'Scrivi su WhatsApp',
        callAdvisor: 'Chiama uno Specialista',
        catalogTag: 'Catalogo Completo',
        catalogTitle: 'Tutte le Attività per Isola & Stagione',
        catalogDesc: 'Esplora l\'intera gamma di esperienze e aggiungi le attività addizionali desiderate.',
        noResults: 'Nessuna attività trovata per questi filtri.',
        resetFilters: 'Ripristina filtri',
        modalClose: 'Chiudi',
        keyWildlifeTitle: 'Fauna in Evidenza',
        highlightsTitle: 'Punti di Forza',
        seasonNotesTitle: 'Note Biologiche e Stagionali',
        durationLabel: 'Durata Stimata',
        difficultyLabel: 'Difficoltà',
        pricingNoteLabel: 'Logistica & Guida',
        navigableLabel: 'Navigazione in Yacht',
        includedState: '✓ Incluso nel tuo tour',
        selectedState: '✓ Selezionata',
      },
      pt: {
        headingTag: 'Índice Oficial de Experiências',
        headingTitle: 'Atividades em Galápagos',
        headingHighlight: 'sob Medida',
        headingDesc: 'Explore as experiências mais deslumbrantes do arquipélago. Selecione suas favoritas, adicione atividades ao seu itinerário e planeje com nossos designers bilíngues.',
        iconicTag: 'Experiências Icônicas Imperdíveis',
        iconicTitle: 'O Mais Lindo de Galápagos',
        iconicDesc: 'Nadar com tartarugas marinhas, explorar canais de tubarões ou subir caldeiras vulcânicas ativas. Escolha suas favoritas.',
        baseTourTitle: 'Nível 1: Selecione seu Tour Base Vermilion',
        baseTourDesc: 'As atividades já incluídas no seu tour base serão filtradas automaticamente para exibir as opções adicionais.',
        hideIncludedLabel: 'Ocultar atividades já incluídas',
        showAllLabel: 'Mostrar tudo (incluídas e adicionais)',
        seasonTitle: 'Nível 2: Temporada & Mês de Viagem',
        seasonAll: 'O Ano Todo',
        seasonWarm: 'Temporada Quente (Dez - Mai)',
        seasonCool: 'Temporada Fresca (Jun - Nov)',
        islandTitle: 'Nível 3: Selecione por Ilha',
        categoryTitle: 'Categoria de Atividade',
        searchPlaceholder: 'Buscar atividade, vida silvestre ou ilha...',
        includedBadge: '✓ Incluído no Tour Base',
        availableBadge: '✨ Adicional sob Medida',
        addToItinerary: '+ Adicionar ao itinerário',
        addCompact: '+ Adicionar',
        removeActivity: '✓ Selecionada',
        activityDetails: 'Detalhes & Fauna',
        selectedCount: 'atividades selecionadas',
        quoteExpeditionCTA: 'Cotar Expedição com Designer de Viagem',
        clearSelection: 'Limpar seleção',
        contactAdvisorTitle: 'Dúvidas sobre fauna ou logística entre ilhas?',
        contactAdvisorText: 'Qualquer dúvida, consulte diretamente nossos designers de expedição no Equador (100% bilíngues inglês-espanhol) ou nossos representantes nos EUA.',
        chatWhatsapp: 'Conversar no WhatsApp',
        callAdvisor: 'Ligar para um Especialista',
        catalogTag: 'Catálogo Completo',
        catalogTitle: 'Todas as Atividades por Ilha & Temporada',
        catalogDesc: 'Explore o catálogo completo e adicione as experiências que você mais deseja viver.',
        noResults: 'Nenhuma atividade encontrada com estes filtros.',
        resetFilters: 'Redefinir filtros',
        modalClose: 'Fechar',
        keyWildlifeTitle: 'Fauna e Vida Silvestre em Destaque',
        highlightsTitle: 'Destaques da Experiência',
        seasonNotesTitle: 'Notas Biológicas e Sazonais',
        durationLabel: 'Duração Estimada',
        difficultyLabel: 'Nível de Dificuldade',
        pricingNoteLabel: 'Logística & Guiamento',
        navigableLabel: 'Navegação Diária em Iate',
        includedState: '✓ Incluído no seu tour',
        selectedState: '✓ Selecionada',
      },
      ja: {
        headingTag: 'ガラパゴス公式アクティビティ・インデックス',
        headingTitle: 'ガラパゴス諸島での体験',
        headingHighlight: '完全オーダーメイド',
        headingDesc: '諸島全域の感動的なアクティビティを網羅。希望の体験を選んで旅程に追加し、バイリンガル遠征デザイナーと理想の旅を組み立ててください。',
        iconicTag: 'ガラパゴス諸島 究極のハイライト',
        iconicTitle: '憧れのガラパゴス体験コレクション',
        iconicDesc: 'ウミガメと泳ぎ、ネムリブカの海中回廊を抜け、巨大火山カルデラを歩く。お気に入りの体験を選んで旅程に追加してください。',
        baseTourTitle: 'ステップ 1: ベースツアーを選択',
        baseTourDesc: 'ベースツアーを選択すると、すでに含まれている体験が自動識別され、追加可能なオプションのみを表示できます。',
        hideIncludedLabel: 'ツアーに含まれる体験を非表示にする',
        showAllLabel: 'すべての体験を表示（含まれる体験＋追加オプション）',
        seasonTitle: 'ステップ 2: 旅行シーズン＆希望月',
        seasonAll: '通年',
        seasonWarm: '温暖・熱帯シーズン（12月〜5月）',
        seasonCool: 'ガルア乾季・涼感シーズン（6月〜11月）',
        islandTitle: 'ステップ 3: 島を選択',
        categoryTitle: 'アクティビティ種別',
        searchPlaceholder: 'アクティビティ名、動物、島名で検索...',
        includedBadge: '✓ ベースツアーに含まれています',
        availableBadge: '✨ 追加カスタマイズ可能',
        addToItinerary: '+ 旅程に追加',
        addCompact: '+ 追加',
        removeActivity: '✓ 選択済み',
        activityDetails: '詳細と観察できる生物',
        selectedCount: '件のアクティビティを選択中',
        quoteExpeditionCTA: '専任デザイナーに見積もりを依頼',
        clearSelection: '選択をクリア',
        contactAdvisorTitle: '最適な訪問時期や諸島間の移動についてご質問ですか？',
        contactAdvisorText: 'ご不明な点は、エクアドル現地の専任遠征デザイナー（英語・スペイン語完全対応）または米国代表担当者へ直接ご相談ください。',
        chatWhatsapp: 'WhatsAppで相談する',
        callAdvisor: '専門スタッフに電話する',
        catalogTag: '全アクティビティ一覧',
        catalogTitle: '島別・追加オプショナル体験カタログ',
        catalogDesc: '諸島全域の体験を閲覧し、自由日程に追加したいお気に入りのアクティビティをお選びください。',
        noResults: '該当するアクティビティが見つかりませんでした。',
        resetFilters: 'すべてのフィルターをリセット',
        modalClose: '閉じる',
        keyWildlifeTitle: '注目の固有種・海洋生物',
        highlightsTitle: '体験のハイライト',
        seasonNotesTitle: '生物学的観察メモ＆季節の傾向',
        durationLabel: '所要時間目安',
        difficultyLabel: '難易度・体力レベル',
        pricingNoteLabel: '運航手配＆ガイド案内',
        navigableLabel: '専用ヨット日帰りクルーズ',
        includedState: '✓ ツアーに含まれています',
        selectedState: '✓ 選択済み',
      },
      zh: {
        headingTag: '加拉帕戈斯群岛官方体验全集',
        headingTitle: '加拉帕戈斯精彩活动',
        headingHighlight: '专属定制',
        headingDesc: '全方位探索群岛最震撼的代表性活动。挑选您心仪的体验，自由加入行程，与我们的资深双语定制师共同开启梦幻之旅。',
        iconicTag: '群岛标志性极致体验',
        iconicTitle: '加拉帕戈斯极致梦幻体验',
        iconicDesc: '与野生海龟同游、漫步黑鳍鲨熔岩峡谷、攀登壮阔活火山。点击即可一键加入您的定制行程。',
        baseTourTitle: '第一步：选择您的 Vermilion 基础行程',
        baseTourDesc: '选择基础行程后，行程内已包含的项目将自动标记或隐藏，仅向您展示可额外增选定制的附加精彩体验。',
        hideIncludedLabel: '隐藏基础行程已含活动',
        showAllLabel: '显示全部活动（已含项目与附加项目）',
        seasonTitle: '第二步：出行季节与月份',
        seasonAll: '全年皆宜',
        seasonWarm: '温暖湿润季（12月 – 5月）',
        seasonCool: '凉爽干燥季（6月 – 11月）',
        islandTitle: '第三步：按岛屿筛选',
        categoryTitle: '体验类别',
        searchPlaceholder: '搜索活动、野生动物或岛屿（如：鲨鱼、海龟、信天翁）...',
        includedBadge: '✓ 基础行程已包含',
        availableBadge: '✨ 可增选定制项目',
        addToItinerary: '+ 加入我的行程',
        addCompact: '+ 增选',
        removeActivity: '✓ 已选定',
        activityDetails: '查看详情与野生动植物',
        selectedCount: '项已选活动',
        quoteExpeditionCTA: '联系行程设计师获取专属报价',
        clearSelection: '清空已选',
        contactAdvisorTitle: '对野生动物最佳观测期或跳岛物流有任何疑问？',
        contactAdvisorText: '任何疑问，欢迎直接咨询我们常驻厄瓜多尔的资深探险行程设计师（100%精通英西双语），或联系我们的美国官方代表处。',
        chatWhatsapp: 'WhatsApp 在线咨询',
        callAdvisor: '致电资深专家',
        catalogTag: '完整活动目录',
        catalogTitle: '按岛屿与季节探索全部活动',
        catalogDesc: '浏览全部群岛活动，为您自由探索日选择心仪的增选精彩项目。',
        noResults: '未找到符合当前筛选条件的活动。',
        resetFilters: '重置所有筛选',
        modalClose: '关闭',
        keyWildlifeTitle: '核心野生与特有动植物',
        highlightsTitle: '行程核心亮点',
        seasonNotesTitle: '生态与最佳月份解读',
        durationLabel: '预计所需时长',
        difficultyLabel: '体力体能要求',
        pricingNoteLabel: '物流安排与专业导游',
        navigableLabel: '出海游艇巡航项目',
        includedState: '✓ 基础行程已包含',
        selectedState: '✓ 已选定',
      }
    };
    return dict[locale] || dict.en;
  }, [locale]);

  const TX = EXTRA_UI[locale] || EXTRA_UI.en;

  // ── Selected Base Tour Object ──────────────────────────────────────────────
  const selectedBaseTour = useMemo(() => {
    return BASE_TOURS_GALAPAGOS.find((t) => t.id === selectedBaseTourId) || BASE_TOURS_GALAPAGOS[0];
  }, [selectedBaseTourId]);

  // ── Iconic Must-Do Activities (8 CARDS PARA EL TOP CAROUSEL) ──────────────
  const iconicActivities = useMemo(() => {
    return ICONIC_GALAPAGOS_ACTIVITY_IDS.map((id) =>
      GALAPAGOS_ACTIVITIES.find((a) => a.id === id)
    ).filter((a): a is GalapagosActivity => Boolean(a));
  }, []);

  // ── Filtered Catalog Activities (SECCIÓN INFERIOR COMPACTA) ────────────────
  const filteredActivities = useMemo(() => {
    return GALAPAGOS_ACTIVITIES.filter((activity) => {
      // 1. Base Tour logic:
      const isIncludedInBase = selectedBaseTour.includedActivityIds.includes(activity.id);
      void isIncludedInBase; // las incluidas se muestran en su propia sección, no se ocultan

      // 2. Season logic:
      if (selectedSeason !== 'all') {
        if (!activity.seasons.includes(selectedSeason) && !activity.seasons.includes('all-year')) {
          return false;
        }
      }

      // 3. Month logic:
      if (selectedMonth !== 'all') {
        if (!activity.bestMonths.includes(selectedMonth as number)) {
          return false;
        }
      }

      // 4. Island logic:
      if (selectedIsland !== 'all') {
        if (activity.island !== selectedIsland) {
          return false;
        }
      }

      // 5. Category logic:
      if (selectedCategory !== 'all') {
        if (activity.category !== selectedCategory) {
          return false;
        }
      }

      // 6. Search query logic:
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameVal = (activity.name[locale] || activity.name.en || '').toLowerCase();
        const descVal = (activity.description[locale] || activity.description.en || '').toLowerCase();
        const islandVal = (activity.islandName[locale] || activity.islandName.en || '').toLowerCase();
        const wildlifeStr = activity.keyWildlife.map((w) => (w[locale] || w.en || '').toLowerCase()).join(' ');

        if (!nameVal.includes(q) && !descVal.includes(q) && !islandVal.includes(q) && !wildlifeStr.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedBaseTour,
    hideIncludedActivities,
    selectedSeason,
    selectedMonth,
    selectedIsland,
    selectedCategory,
    searchQuery,
    locale
  ]);

  // ── Wishlist Selection Helpers ─────────────────────────────────────────────
  const toggleActivitySelection = (id: string) => {
    setSelectedActivityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedActivitiesList = useMemo(() => {
    return GALAPAGOS_ACTIVITIES.filter((a) => selectedActivityIds.includes(a.id));
  }, [selectedActivityIds]);

  // ── Resumen para el equipo: qué tour + qué actividades, y sugerencia comercial ──
  const leadSummary = useMemo(() => {
    const hasBase = selectedBaseTour.id !== 'none';
    const baseName = hasBase ? (selectedBaseTour.name.es || selectedBaseTour.name.en) : 'Diseño libre (sin tour base)';
    const included = selectedActivitiesList.filter((a) => selectedBaseTour.includedActivityIds.includes(a.id));
    const extras = selectedActivitiesList.filter((a) => !selectedBaseTour.includedActivityIds.includes(a.id));
    const nm = (a: GalapagosActivity) => a.name.es || a.name.en;
    const lines = [`Tour base: ${baseName}`];
    if (extras.length) lines.push(`Actividades extra: ${extras.map(nm).join(', ')}`);
    if (included.length) lines.push(`Ya incluidas en el tour: ${included.map(nm).join(', ')}`);
    let tip = '';
    if (hasBase && extras.length === 0) tip = 'Quiere el tour tal cual: cerrar rápido ofreciendo 1 actividad extra de regalo.';
    else if (hasBase && extras.length <= 2) tip = `Quiere el tour + ${extras.length} extra(s): ofrecer las extras gratis para cerrar la venta.`;
    else if (hasBase) tip = `Quiere el tour + ${extras.length} extras: ofrecer 10-15 % de descuento en las extras.`;
    else tip = 'Sin tour base: proponer el tour que cubra más de estas actividades y cotizar el resto como extras.';
    lines.push(`Sugerencia para cerrar: ${tip}`);
    return lines.join(' | ');
  }, [selectedBaseTour, selectedActivitiesList]);

  const requestProposal = () => {
    openPlanTrip({
      destination: 'galapagos',
      tourId: selectedBaseTour.id !== 'none' ? selectedBaseTour.id : undefined,
      tourTitle: `Galápagos a medida: ${selectedBaseTour.id !== 'none' ? (selectedBaseTour.name.es || selectedBaseTour.name.en) : 'diseño libre'}`,
      notes: leadSummary,
    });
  };

  // ── WhatsApp Message Builder ──────────────────────────────────────────────
  const whatsappUrl = useMemo(() => {
    const baseTourName = selectedBaseTour.id !== 'none'
      ? (selectedBaseTour.name[locale] || selectedBaseTour.name.es)
      : 'Itinerario 100% Personalizado';

    const addonsText = selectedActivitiesList.length > 0
      ? selectedActivitiesList.map((a) => `- ${a.name[locale] || a.name.es} (${a.islandName[locale] || a.islandName.es})`).join('%0A')
      : 'Consultar actividades recomendadas según temporada.';

    const message = `¡Hola Vermilion Routes! Me interesa planificar una expedición a Galápagos.%0A%0A*Tour Base:* ${baseTourName}%0A*Actividades Seleccionadas:*%0A${addonsText}%0A%0A¿Podrían brindarme asesoría con disponibilidad y cotización estacional?`;

    return `https://wa.me/593994048458?text=${message}`;
  }, [selectedBaseTour, selectedActivitiesList, locale]);

  const includedList = filteredActivities.filter((a) => selectedBaseTour.includedActivityIds.includes(a.id));
  const extraList = filteredActivities.filter((a) => !selectedBaseTour.includedActivityIds.includes(a.id));

  const renderCompactCard = (activity: GalapagosActivity) => {
              const isIncludedInBase = selectedBaseTour.includedActivityIds.includes(activity.id);
              const isSelected = selectedActivityIds.includes(activity.id);
              const name = activity.name[locale] || activity.name.en || activity.name.es;
              const shortDesc = activity.shortDescription[locale] || activity.shortDescription.en || activity.shortDescription.es;
              const islandName = activity.islandName[locale] || activity.islandName.en || activity.islandName.es;
              const categoryName = activity.categoryName[locale] || activity.categoryName.en || activity.categoryName.es;
              const duration = activity.duration[locale] || activity.duration.en || activity.duration.es;

              return (
                <div
                  key={`compact-${activity.id}`}
                  className={`rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col sm:flex-row group ${
                    isIncludedInBase
                      ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30'
                      : isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 shadow-sm hover:shadow'
                  }`}
                >
                  {/* Left Compact Thumbnail */}
                  <div
                    onClick={() => setActiveModalActivity(activity)}
                    className="relative w-full sm:w-40 md:w-44 h-40 sm:h-auto min-h-[140px] shrink-0 cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={activity.imageUrl}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, 180px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                      {islandName}
                    </span>
                  </div>

                  {/* Right Content Panel */}
                  <div className="p-4 flex flex-col justify-between flex-1 min-w-0 space-y-2.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 truncate">
                          {categoryName}
                        </span>
                        <span className="text-[11px] text-zinc-500 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{duration}</span>
                        </span>
                      </div>

                      <h4
                        onClick={() => setActiveModalActivity(activity)}
                        className="font-serif text-sm sm:text-base font-bold text-zinc-900 dark:text-white cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-1"
                      >
                        {name}
                      </h4>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {shortDesc}
                      </p>

                      {activity.keyWildlife && activity.keyWildlife.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {activity.keyWildlife.slice(0, 2).map((w, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 font-medium"
                            >
                              🐾 {w[locale] || w.es || w.en}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Row */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalActivity(activity)}
                        className="text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{UI.activityDetails}</span>
                      </button>

                      {isIncludedInBase ? (
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1 border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" />
                          <span>{UI.includedState}</span>
                        </span>
                      ) : isSelected ? (
                        <button
                          onClick={() => toggleActivitySelection(activity.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{UI.selectedState}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleActivitySelection(activity.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-emerald-600 dark:bg-white/10 dark:hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{UI.addCompact}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
  };

  return (
    <div className="w-full space-y-12">
      {/* ── HEADER BANNER ──────────────────────────────────────────────────── */}
      {showHeroBanner && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-zinc-900 to-teal-950 border border-emerald-500/20 shadow-2xl p-8 sm:p-12 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{UI.headingTag}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-tight">
              {UI.headingTitle}{' '}
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
                {UI.headingHighlight}
              </span>
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              {UI.headingDesc}
            </p>
          </div>
        </div>
      )}

      {/* ── BILINGUAL REASSURANCE BANNER (PABLO REASSURANCE MESSAGE) ─────────── */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 dark:from-amber-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 border border-amber-500/30 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
              {UI.contactAdvisorTitle}
            </h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              {UI.contactAdvisorText}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full md:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{UI.chatWhatsapp}</span>
          </a>
          <a
            href="tel:+593983992549"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900/80 dark:bg-white/10 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 dark:border-white/20 active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>{UI.callAdvisor}</span>
          </a>
        </div>
      </div>

      {/* ── 1. SECCIÓN SUPERIOR: CARRUSEL RESPONSIVO DE 4 TARJETAS A LA VEZ ──── */}
      {/* "al inicio lo mas hermoso tipo nada con tortuga, nada con tiburones, unas 6 8 tarjetas en carrusel mostrando 4 para que la gente las escoja" */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>{UI.iconicTag}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-zinc-900 dark:text-white tracking-tight">
              {UI.iconicTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {UI.iconicDesc}
            </p>
          </div>

          {/* Carousel Arrows Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Siguiente"
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container: 4 cards visible at a time on desktop (lg), snap scroll */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
          onTouchStart={() => setCarouselPaused(true)}
          onTouchEnd={() => setTimeout(() => setCarouselPaused(false), 4000)}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {iconicActivities.map((activity) => {
            const isIncludedInBase = selectedBaseTour.includedActivityIds.includes(activity.id);
            const isSelected = selectedActivityIds.includes(activity.id);
            const name = activity.name[locale] || activity.name.en || activity.name.es;
            const islandName = activity.islandName[locale] || activity.islandName.en || activity.islandName.es;
            const categoryName = activity.categoryName[locale] || activity.categoryName.en || activity.categoryName.es;
            const duration = activity.duration[locale] || activity.duration.en || activity.duration.es;

            return (
              <div
                key={`iconic-${activity.id}`}
                className={`relative group shrink-0 snap-start rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between border select-none ${
                  // Responsive sizing: 1.15 cards on mobile, 2.2 cards on tablet, 4 cards on desktop:
                  'w-[82vw] sm:w-[46vw] md:w-[32vw] lg:w-[calc((100%-3*1rem)/4)] h-[440px]'
                } ${
                  isIncludedInBase
                    ? 'border-emerald-500/40 bg-emerald-950/30'
                    : isSelected
                    ? 'border-emerald-500 shadow-2xl ring-2 ring-emerald-500/30 bg-emerald-950/20'
                    : 'border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 shadow-lg'
                }`}
              >
                {/* Background Image with Zoom */}
                <div
                  onClick={() => setActiveModalActivity(activity)}
                  className="absolute inset-0 cursor-pointer overflow-hidden"
                >
                  <Image
                    src={activity.imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/45 to-transparent top-[45%]" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 p-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 flex items-center gap-1.5 shadow">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{islandName}</span>
                  </span>

                  {isIncludedInBase ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow">
                      {UI.includedState}
                    </span>
                  ) : isSelected ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{UI.selectedState}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      {categoryName}
                    </span>
                  )}
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 p-5 space-y-3 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-8">
                  <div
                    onClick={() => setActiveModalActivity(activity)}
                    className="cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>{duration}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                      {name}
                    </h4>

                    {activity.keyWildlife && activity.keyWildlife.length > 0 && (
                      <p className="text-[11px] text-zinc-300 truncate font-normal">
                        🐾 {activity.keyWildlife.map((w) => w[locale] || w.es || w.en).slice(0, 2).join(' • ')}
                      </p>
                    )}
                  </div>

                  {/* Selection Button */}
                  <div className="pt-2">
                    {isIncludedInBase ? (
                      <div className="w-full py-2.5 px-3 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs text-center">
                        {UI.includedState}
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleActivitySelection(activity.id)}
                        className={`w-full py-2.5 px-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-emerald-900/40 ring-2 ring-emerald-400/50'
                            : 'bg-white/20 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 hover:border-emerald-500'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{UI.removeActivity}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>{UI.addToItinerary}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. FILTROS RÁPIDOS: TEMPORADA, MES, ISLA, CATEGORÍA & BÚSQUEDA ──── */}
      <div className="space-y-1">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">{TX.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl">{TX.desc}</p>
      </div>
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/10 rounded-2xl p-3 sm:p-4 shadow-md">
        {/* Todos los filtros en una sola fila con listas desplegables */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <label className="flex flex-col gap-1 min-w-0 lg:flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{TX.tour}</span>
          <select
            aria-label="Tour base"
            value={selectedBaseTourId}
            onChange={(e) => setSelectedBaseTourId(e.target.value)}
            className={SELECT_CLS + " w-full"}
          >
            {BASE_TOURS_GALAPAGOS.map((tour) => (
              <option key={tour.id} value={tour.id}>{tour.name[locale] || tour.name.en || tour.name.es}</option>
            ))}
          </select>
          </label>
          <label className="flex flex-col gap-1 min-w-0 lg:flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{TX.season}</span>
          <select
            aria-label={UI.seasonTitle}
            value={selectedMonth !== 'all' ? `m${selectedMonth}` : selectedSeason}
            onChange={(e) => {
              const v = e.target.value;
              if (v.startsWith('m')) { setSelectedSeason('all'); setSelectedMonth(Number(v.slice(1))); }
              else { setSelectedSeason(v as 'all' | 'warm' | 'cool'); setSelectedMonth('all'); }
            }}
            className={SELECT_CLS + " w-full"}
          >
            <option value="all">{UI.seasonAll}</option>
            <option value="warm">☀️ {UI.seasonWarm}</option>
            <option value="cool">🌊 {UI.seasonCool}</option>
            {MONTH_NAMES.map((m) => (
              <option key={m.month} value={`m${m.month}`}>{m.name[locale] || m.name.en || m.name.es}</option>
            ))}
          </select>
          </label>
          <label className="flex flex-col gap-1 min-w-0 lg:flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{TX.island}</span>
          <select
            aria-label={UI.islandTitle}
            value={selectedIsland}
            onChange={(e) => setSelectedIsland(e.target.value as GalapagosIslandId)}
            className={SELECT_CLS + " w-full"}
          >
            {GALAPAGOS_ISLANDS.map((island) => (
              <option key={island.id} value={island.id}>{island.icon} {island.name[locale] || island.name.en || island.name.es}</option>
            ))}
          </select>
          </label>
          <label className="flex flex-col gap-1 min-w-0 lg:flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{TX.category}</span>
          <select
            aria-label={UI.categoryTitle}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as GalapagosCategoryId)}
            className={SELECT_CLS + " w-full"}
          >
            {GALAPAGOS_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name[locale] || cat.name.en || cat.name.es}</option>
            ))}
          </select>
          </label>
          <label className="flex flex-col gap-1 min-w-0 lg:flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{TX.search}</span>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={UI.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-sm bg-zinc-100 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} aria-label="Clear" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          </label>
          {(selectedSeason !== 'all' || selectedMonth !== 'all' || selectedIsland !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => { setSelectedSeason('all'); setSelectedMonth('all'); setSelectedIsland('all'); setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs text-rose-600 hover:underline font-semibold shrink-0 px-1"
            >
              {UI.resetFilters}
            </button>
          )}
        </div>
      </div>

      {/* ── 4. SECCIÓN INFERIOR: TARJETAS COMPACTAS ("PEQUEÑITAS ESTILO BOOK") ── */}
      {/* "debajo las demás opciones pero pequeñitas, en la segunda imagen esta la tarjeta del book, algo asi pero super cool, super lindo sin el precio que se puedan escojar algunas actividades" */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-light text-zinc-900 dark:text-white">
                {UI.catalogTitle}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                {filteredActivities.length}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {UI.catalogDesc}
            </p>
          </div>

          {selectedActivityIds.length > 0 && (
            <button
              onClick={() => setSelectedActivityIds([])}
              className="text-xs text-rose-500 hover:underline font-semibold"
            >
              {UI.clearSelection} ({selectedActivityIds.length})
            </button>
          )}
        </div>

        {filteredActivities.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 space-y-4">
            <Info className="w-8 h-8 text-zinc-400 mx-auto" />
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              {UI.noResults}
            </p>
            <button
              onClick={() => {
                setSelectedSeason('all');
                setSelectedMonth('all');
                setSelectedIsland('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all"
            >
              {UI.resetFilters}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {selectedBaseTour.id !== 'none' && includedList.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  ✓ {TX.incTitle} ({includedList.length})
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{TX.incDesc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{includedList.map(renderCompactCard)}</div>
              </div>
            )}
            {extraList.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
                  {selectedBaseTour.id !== 'none' ? TX.extTitle : UI.catalogTitle} ({extraList.length})
                </h4>
                {selectedBaseTour.id !== 'none' && <p className="text-xs text-zinc-600 dark:text-zinc-400">{TX.extDesc}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{extraList.map(renderCompactCard)}</div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── 5. BARRA / DRAWER FLOTANTE DE SELECCIÓN ─────────────────────────── */}
      {selectedActivityIds.length > 0 && (
        <div className="fixed bottom-[88px] md:bottom-5 left-4 right-4 max-w-4xl mx-auto z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-zinc-950/95 backdrop-blur-xl border border-emerald-500/40 text-white p-4 sm:p-5 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40 shrink-0">
                {selectedActivityIds.length}
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="font-serif text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>
                    {selectedActivityIds.length} {UI.selectedCount}
                  </span>
                  {selectedBaseTour.id !== 'none' && (
                    <span className="hidden sm:inline text-xs font-normal text-zinc-400 truncate">
                      ({selectedBaseTour.name[locale] || selectedBaseTour.name.es})
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-zinc-400 truncate max-w-md">
                  {selectedActivitiesList.map((a) => a.name[locale] || a.name.es).join(' • ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={requestProposal}
                className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{UI.quoteExpeditionCTA}</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/40 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
              </a>
              <button
                onClick={() => setSelectedActivityIds([])}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all shrink-0"
                title={UI.clearSelection}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. MODAL DE DETALLE DE ACTIVIDAD ─────────────────────────────────── */}
      {activeModalActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setActiveModalActivity(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 w-full">
              <Image
                src={activeModalActivity.imageUrl}
                alt={activeModalActivity.name[locale] || activeModalActivity.name.en}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  {activeModalActivity.islandName[locale] || activeModalActivity.islandName.en}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-2 leading-tight">
                  {activeModalActivity.name[locale] || activeModalActivity.name.en}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-zinc-800 dark:text-zinc-200">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {activeModalActivity.description[locale] || activeModalActivity.description.en}
              </p>

              {/* Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-zinc-100 dark:border-white/10 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] font-bold uppercase">
                    {UI.durationLabel}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {activeModalActivity.duration[locale] || activeModalActivity.duration.en}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] font-bold uppercase">
                    {UI.difficultyLabel}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {activeModalActivity.difficultyName[locale] || activeModalActivity.difficultyName.en}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] font-bold uppercase">
                    Isla
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {activeModalActivity.islandName[locale] || activeModalActivity.islandName.en}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] font-bold uppercase">
                    Categoría
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {activeModalActivity.categoryName[locale] || activeModalActivity.categoryName.en}
                  </span>
                </div>
              </div>

              {/* Key Wildlife */}
              {activeModalActivity.keyWildlife && activeModalActivity.keyWildlife.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    {UI.keyWildlifeTitle}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeModalActivity.keyWildlife.map((wildlife, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-medium text-xs border border-emerald-500/20"
                      >
                        🐾 {wildlife[locale] || wildlife.en || wildlife.es}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {activeModalActivity.highlights && activeModalActivity.highlights.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    {UI.highlightsTitle}
                  </h5>
                  <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                    {activeModalActivity.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight[locale] || highlight.en || highlight.es}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Biological / Season Notes */}
              {activeModalActivity.seasonalityNotes && (
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 space-y-1 text-xs">
                  <span className="font-bold text-zinc-900 dark:text-white block">
                    {UI.seasonNotesTitle}:
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {activeModalActivity.seasonalityNotes[locale] || activeModalActivity.seasonalityNotes.en}
                  </p>
                </div>
              )}

              {/* Modal Action CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalActivity(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-zinc-300 dark:border-white/10 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-white/5 transition-all text-center"
                >
                  {UI.modalClose}
                </button>

                {selectedBaseTour.includedActivityIds.includes(activeModalActivity.id) ? (
                  <span className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs text-center border border-emerald-500/30">
                    {UI.includedState}
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      toggleActivitySelection(activeModalActivity.id);
                    }}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      selectedActivityIds.includes(activeModalActivity.id)
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-emerald-600 dark:hover:bg-emerald-500'
                    }`}
                  >
                    {selectedActivityIds.includes(activeModalActivity.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{UI.removeActivity}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>{UI.addToItinerary}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
