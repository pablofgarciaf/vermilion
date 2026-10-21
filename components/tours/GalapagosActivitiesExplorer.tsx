'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Calendar,
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
  ChevronRight,
  Clock,
  Waves,
  Mountain,
  Camera,
  BookOpen
} from 'lucide-react';
import {
  GALAPAGOS_ACTIVITIES,
  BASE_TOURS_GALAPAGOS,
  GALAPAGOS_ISLANDS,
  GALAPAGOS_CATEGORIES,
  GALAPAGOS_SEASONS_INFO,
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
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  // ── Localized UI Dictionary ───────────────────────────────────────────────
  const UI = useMemo(() => {
    const dict: Record<string, Record<string, string>> = {
      es: {
        headingTag: 'Catálogo Oficial de Experiencias',
        headingTitle: 'Actividades en Galápagos',
        headingHighlight: 'a tu Medida',
        headingDesc: 'Explora todas las actividades que se pueden realizar en el archipiélago. Selecciona tu temporada de viaje, isla y tour base para personalizar tu itinerario.',
        baseTourTitle: 'Nivel 1: Selecciona tu Tour Base de Vermilion',
        baseTourDesc: 'Al seleccionar un tour, las actividades ya incluidas se filtrarán automáticamente para mostrarte las opciones adicionales disponibles para personalizar tu viaje.',
        hideIncludedLabel: 'Ocultar actividades ya incluidas en mi tour base (Mostrar solo adicionales disponibles)',
        showAllLabel: 'Ver todas (incluidas y adicionales)',
        seasonTitle: 'Nivel 2: Temporada & Mes de Viaje',
        seasonAll: 'Todo el Año',
        seasonWarm: 'Temporada Cálida (Dic - May)',
        seasonCool: 'Temporada Garúa / Fresca (Jun - Nov)',
        islandTitle: 'Nivel 3: Selecciona por Isla',
        categoryTitle: 'Categoría de Actividad',
        searchPlaceholder: 'Buscar actividad, fauna o isla (ej. martillo, albatros, túneles)...',
        includedBadge: '✓ Incluido en tu Tour Base',
        availableBadge: '✨ Adicional Cotizable',
        addActivity: 'Añadir a mi selección',
        removeActivity: 'Quitar de selección',
        activityDetails: 'Ver Detalles y Fauna',
        selectedCount: 'actividades adicionales seleccionadas',
        requestQuote: 'Solicitar Asesoría & Cotización',
        clearSelection: 'Limpiar selección',
        contactAdvisorTitle: '¿Dudas con la logística o la mejor época?',
        contactAdvisorText: 'Cualquier duda, consulta directamente con nuestros diseñadores de expedición en Ecuador (100% bilingües inglés-español) o con nuestros representantes en EE.UU.',
        chatWhatsapp: 'Consultar por WhatsApp',
        callAdvisor: 'Llamar a un Especialista',
        includedSummary: 'Experiencias ya incluidas en tu tour seleccionado',
        additionalSummary: 'Actividades adicionales disponibles para personalizar tu viaje',
        noResults: 'No se encontraron actividades con los filtros seleccionados.',
        resetFilters: 'Restablecer filtros',
        modalClose: 'Cerrar',
        keyWildlifeTitle: 'Fauna y Vida Silvestre Destacada',
        highlightsTitle: 'Puntos Culminantes de la Experiencia',
        seasonNotesTitle: 'Notas Biológicas y de Temporada',
        durationLabel: 'Duración Estimada',
        difficultyLabel: 'Nivel de Dificultad',
        pricingNoteLabel: 'Tarifa y Logística',
        navigableLabel: 'Excursión Navegable en Yate',
        quoteModalTitle: 'Cotiza tu Expedición a Galápagos',
        quoteModalDesc: 'Envía tu selección directamente a nuestros diseñadores de expedición en Ecuador y EE.UU. para recibir un presupuesto personalizado.',
        yourTourBase: 'Tour Base Seleccionado:',
        yourAddons: 'Actividades Adicionales Elegidas:',
        fullName: 'Nombre Completo',
        email: 'Correo Electrónico',
        phone: 'Teléfono / WhatsApp',
        preferredDates: 'Mes o Fecha Estimada de Viaje',
        notes: 'Comentarios o Requerimientos Especiales',
        submitQuote: 'Enviar Solicitud a Concierge',
        quoteSuccess: '¡Solicitud enviada con éxito! Nos comunicaremos en breve.',
      },
      en: {
        headingTag: 'Official Archipelago Experience Index',
        headingTitle: 'Galapagos Activities',
        headingHighlight: 'Tailor-Made',
        headingDesc: 'Explore every single experience across the archipelago. Filter by travel season, island, and base tour to reveal customized add-ons.',
        baseTourTitle: 'Level 1: Select Your Vermilion Base Tour',
        baseTourDesc: 'When you select a base tour, included activities automatically filter out, revealing only available optional add-ons to customize your journey.',
        hideIncludedLabel: 'Hide activities already included in my base tour (Show available add-ons only)',
        showAllLabel: 'Show all activities (included & add-ons)',
        seasonTitle: 'Level 2: Travel Season & Month',
        seasonAll: 'All Year Round',
        seasonWarm: 'Warm & Tropical Season (Dec - May)',
        seasonCool: 'Cool & Garúa Season (Jun - Nov)',
        islandTitle: 'Level 3: Filter by Island',
        categoryTitle: 'Activity Category',
        searchPlaceholder: 'Search activity, wildlife or island (e.g. hammerhead, albatross, tunnels)...',
        includedBadge: '✓ Included in Base Tour',
        availableBadge: '✨ Customizable Add-On',
        addActivity: 'Add to My Wishlist',
        removeActivity: 'Remove from Wishlist',
        activityDetails: 'View Details & Wildlife',
        selectedCount: 'custom add-ons selected',
        requestQuote: 'Request Bespoke Quotation',
        clearSelection: 'Clear selection',
        contactAdvisorTitle: 'Questions regarding wildlife timing or inter-island logistics?',
        contactAdvisorText: 'For any questions, consult directly with our expedition designers in Ecuador (100% bilingual English-Spanish) or with our representatives in the USA.',
        chatWhatsapp: 'Chat on WhatsApp',
        callAdvisor: 'Call a Specialist',
        includedSummary: 'Experiences already guaranteed in your base tour',
        additionalSummary: 'Additional experiences available to tailor your itinerary',
        noResults: 'No activities match the current filters.',
        resetFilters: 'Reset all filters',
        modalClose: 'Close',
        keyWildlifeTitle: 'Featured Wildlife & Endemics',
        highlightsTitle: 'Experience Highlights',
        seasonNotesTitle: 'Biological & Seasonal Insights',
        durationLabel: 'Estimated Duration',
        difficultyLabel: 'Physical Difficulty',
        pricingNoteLabel: 'Pricing & Logistics',
        navigableLabel: 'Navigable Day Yacht Hop',
        quoteModalTitle: 'Request Your Galapagos Custom Proposal',
        quoteModalDesc: 'Send your tailored activity selection directly to our expedition designers in Ecuador & USA for a seasonal proposal.',
        yourTourBase: 'Selected Base Tour:',
        yourAddons: 'Chosen Additional Activities:',
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone / WhatsApp',
        preferredDates: 'Estimated Travel Month or Dates',
        notes: 'Special Requests or Preferences',
        submitQuote: 'Send Request to Concierge',
        quoteSuccess: 'Inquiry sent successfully! Our team will contact you shortly.',
      },
      fr: {
        headingTag: 'Index Officiel des Expériences',
        headingTitle: 'Activités aux Galápagos',
        headingHighlight: 'sur Mesure',
        headingDesc: 'Découvrez toutes les activités réalisables dans l\'archipel. Filtrez par saison, île et circuit de base pour personnaliser votre expédition.',
        baseTourTitle: 'Niveau 1 : Sélectionnez votre Circuit Base Vermilion',
        baseTourDesc: 'Les activités déjà incluses dans votre circuit de base sont filtrées pour afficher uniquement les expériences additionnelles disponibles.',
        hideIncludedLabel: 'Masquer les activités déjà incluses (Afficher uniquement les options additionnelles)',
        showAllLabel: 'Tout afficher (incluses et additionnelles)',
        seasonTitle: 'Niveau 2 : Saison & Mois de Voyage',
        seasonAll: 'Toute l\'année',
        seasonWarm: 'Saison Chaude (Déc - Mai)',
        seasonCool: 'Saison Fraîche (Juin - Nov)',
        islandTitle: 'Niveau 3 : Filtrer par Île',
        categoryTitle: 'Catégorie d\'Activité',
        searchPlaceholder: 'Rechercher activité, faune ou île (ex. requin marteau, albatros)...',
        includedBadge: '✓ Inclus dans le Circuit Base',
        availableBadge: '✨ Option Additionnelle',
        addActivity: 'Ajouter à ma sélection',
        removeActivity: 'Retirer de la sélection',
        activityDetails: 'Détails & Faune',
        selectedCount: 'activités additionnelles sélectionnées',
        requestQuote: 'Demander un Devis sur Mesure',
        clearSelection: 'Effacer la sélection',
        contactAdvisorTitle: 'Des questions sur la faune ou la logistique entre les îles ?',
        contactAdvisorText: 'Pour toute question, consultez directement nos créateurs d\'expéditions en Équateur (100% bilingues anglais-espagnol) ou nos représentants aux États-Unis.',
        chatWhatsapp: 'Discuter sur WhatsApp',
        callAdvisor: 'Appeler un Spécialiste',
        includedSummary: 'Expériences déjà incluses dans votre circuit sélectionné',
        additionalSummary: 'Activités optionnelles disponibles pour enrichir votre séjour',
        noResults: 'Aucune activité ne correspond à vos filtres.',
        resetFilters: 'Réinitialiser les filtres',
        modalClose: 'Fermer',
        keyWildlifeTitle: 'Faune & Espèces Endémiques',
        highlightsTitle: 'Points Forts de l\'Expérience',
        seasonNotesTitle: 'Notes Biologiques & Saisonnières',
        durationLabel: 'Durée Estimée',
        difficultyLabel: 'Niveau de Difficulté',
        pricingNoteLabel: 'Tarification & Logistique',
        navigableLabel: 'Navigation d\'un Jour en Yacht',
        quoteModalTitle: 'Demandez votre Devis Personnalisé',
        quoteModalDesc: 'Transmettez votre sélection à nos concepteurs d\'itinéraires.',
        yourTourBase: 'Circuit de Base Choisi :',
        yourAddons: 'Activités Additionnelles Sélectionnées :',
        fullName: 'Nom Complet',
        email: 'Adresse E-mail',
        phone: 'Téléphone / WhatsApp',
        preferredDates: 'Dates Prévues de Voyage',
        notes: 'Remarques ou Préférences',
        submitQuote: 'Envoyer la Demande',
        quoteSuccess: 'Demande transmise avec succès !',
      },
      de: {
        headingTag: 'Offizieller Erlebnis-Katalog',
        headingTitle: 'Galapagos Aktivitäten',
        headingHighlight: 'nach Maß',
        headingDesc: 'Entdecken Sie alle Aktivitäten auf dem Archipel. Wählen Sie Reisezeit, Insel und Basistour für eine maßgeschneiderte Planung.',
        baseTourTitle: 'Stufe 1: Wählen Sie Ihre Vermilion Basistour',
        baseTourDesc: 'Integrierte Aktivitäten werden automatisch gefiltert, sodass Sie nur verfügbare Zusatzoptionen sehen.',
        hideIncludedLabel: 'Bereits enthaltene Aktivitäten ausblenden (Nur Zusatzoptionen anzeigen)',
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
        addActivity: 'Zur Auswahl hinzufügen',
        removeActivity: 'Aus Auswahl entfernen',
        activityDetails: 'Details & Tierwelt',
        selectedCount: 'Zusatzaktivitäten ausgewählt',
        requestQuote: 'Individuelles Angebot anfordern',
        clearSelection: 'Auswahl löschen',
        contactAdvisorTitle: 'Fragen zu Tierbegegnungen oder Insel-Logistik?',
        contactAdvisorText: 'Bei Fragen wenden Sie sich direkt an unsere Expeditionsplaner in Ecuador (100% zweisprachig Englisch-Spanisch) oder unsere US-Vertreter.',
        chatWhatsapp: 'WhatsApp Chat',
        callAdvisor: 'Spezialisten anrufen',
        includedSummary: 'Bereits in Ihrer Basistour garantierte Erlebnisse',
        additionalSummary: 'Verfügbare Zusatzaktivitäten zur Reiseerweiterung',
        noResults: 'Keine Aktivitäten für diese Filter gefunden.',
        resetFilters: 'Filter zurücksetzen',
        modalClose: 'Schließen',
        keyWildlifeTitle: 'Hervorgehobene Tierwelt',
        highlightsTitle: 'Höhepunkte des Erlebnisses',
        seasonNotesTitle: 'Biologische & saisonale Hinweise',
        durationLabel: 'Geschätzte Dauer',
        difficultyLabel: 'Schwierigkeitsgrad',
        pricingNoteLabel: 'Preis- & Logistikhinweise',
        navigableLabel: 'Tagesausflug mit Yacht',
        quoteModalTitle: 'Persönliches Reiseangebot anfordern',
        quoteModalDesc: 'Senden Sie Ihre Wunschaktivitäten an unser Expertenteam.',
        yourTourBase: 'Gewählte Basistour:',
        yourAddons: 'Ausgewählte Zusatzaktivitäten:',
        fullName: 'Vollständiger Name',
        email: 'E-Mail-Adresse',
        phone: 'Telefon / WhatsApp',
        preferredDates: 'Geplanter Reisemonat',
        notes: 'Besondere Wünsche',
        submitQuote: 'Anfrage absenden',
        quoteSuccess: 'Anfrage erfolgreich versendet!',
      },
      it: {
        headingTag: 'Indice Ufficiale delle Esperienze',
        headingTitle: 'Attività alle Galapagos',
        headingHighlight: 'su Misura',
        headingDesc: 'Esplora tutte le esperienze disponibili nell\'arcipelago. Seleziona stagione, isola e tour base per personalizzare il viaggio.',
        baseTourTitle: 'Livello 1: Seleziona il tuo Tour Base Vermilion',
        baseTourDesc: 'Le attività già incluse nel tour base verranno filtrate automaticamente per mostrarti le opzioni addizionali disponibili.',
        hideIncludedLabel: 'Nascondi attività già incluse (Mostra solo opzioni addizionali)',
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
        addActivity: 'Aggiungi alla selezione',
        removeActivity: 'Rimuovi dalla selezione',
        activityDetails: 'Dettagli & Fauna',
        selectedCount: 'attività addizionali selezionate',
        requestQuote: 'Richiedi Preventivo su Misura',
        clearSelection: 'Svuota selezione',
        contactAdvisorTitle: 'Dubbi sulla fauna o la logistica tra le isole?',
        contactAdvisorText: 'Per qualsiasi dubbio, consulta direttamente i nostri esperti in Ecuador (100% bilingui inglese-spagnolo) o i nostri rappresentanti negli Stati Uniti.',
        chatWhatsapp: 'Scrivi su WhatsApp',
        callAdvisor: 'Chiama uno Specialista',
        includedSummary: 'Esperienze già garantite nel tuo tour base',
        additionalSummary: 'Attività addizionali per personalizzare l\'itinerario',
        noResults: 'Nessuna attività trovata per questi filtri.',
        resetFilters: 'Ripristina filtri',
        modalClose: 'Chiudi',
        keyWildlifeTitle: 'Fauna in Evidenza',
        highlightsTitle: 'Punti di Forza',
        seasonNotesTitle: 'Note Biologiche e Stagionali',
        durationLabel: 'Durata Stimata',
        difficultyLabel: 'Difficoltà',
        pricingNoteLabel: 'Tariffa & Logistica',
        navigableLabel: 'Navigazione in Yacht',
        quoteModalTitle: 'Richiedi il tuo Preventivo Personalizzato',
        quoteModalDesc: 'Invia le tue attività selezionate ai nostri designer di viaggio.',
        yourTourBase: 'Tour Base Selezionato:',
        yourAddons: 'Attività Addizionali Scelte:',
        fullName: 'Nome Completo',
        email: 'Email',
        phone: 'Telefono / WhatsApp',
        preferredDates: 'Mese Previsto di Viaggio',
        notes: 'Note o Richieste Speciali',
        submitQuote: 'Invia Richiesta',
        quoteSuccess: 'Richiesta inviata con successo!',
      },
      pt: {
        headingTag: 'Índice Oficial de Experiências',
        headingTitle: 'Atividades em Galápagos',
        headingHighlight: 'sob Medida',
        headingDesc: 'Explore todas as experiências disponíveis no arquipélago. Filtre por época, ilha e tour base para montar sua expedição.',
        baseTourTitle: 'Nível 1: Selecione seu Tour Base Vermilion',
        baseTourDesc: 'As atividades já incluídas no seu tour base serão filtradas automaticamente para exibir apenas as opções adicionais disponíveis.',
        hideIncludedLabel: 'Ocultar atividades já incluídas (Mostrar apenas opções adicionais)',
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
        addActivity: 'Adicionar à seleção',
        removeActivity: 'Remover da seleção',
        activityDetails: 'Detalhes & Fauna',
        selectedCount: 'atividades adicionais selecionadas',
        requestQuote: 'Solicitar Orçamento sob Medida',
        clearSelection: 'Limpar seleção',
        contactAdvisorTitle: 'Dúvidas sobre fauna ou logística entre ilhas?',
        contactAdvisorText: 'Qualquer dúvida, consulte diretamente nossos designers de expedição no Equador (100% bilíngues inglês-espanhol) ou nossos representantes nos EUA.',
        chatWhatsapp: 'Conversar no WhatsApp',
        callAdvisor: 'Ligar para um Especialista',
        includedSummary: 'Experiências já garantidas no seu tour base',
        additionalSummary: 'Atividades adicionais para personalizar seu roteiro',
        noResults: 'Nenhuma atividade encontrada com estes filtros.',
        resetFilters: 'Redefinir filtros',
        modalClose: 'Fechar',
        keyWildlifeTitle: 'Fauna e Vida Silvestre em Destaque',
        highlightsTitle: 'Destaques da Experiência',
        seasonNotesTitle: 'Notas Biológicas e Sazonais',
        durationLabel: 'Duração Estimada',
        difficultyLabel: 'Nível de Dificuldade',
        pricingNoteLabel: 'Tarifa & Logística',
        navigableLabel: 'Navegação Diária em Iate',
        quoteModalTitle: 'Solicite sua Proposta sob Medida',
        quoteModalDesc: 'Envie suas atividades selecionadas aos nossos consultores.',
        yourTourBase: 'Tour Base Selecionado:',
        yourAddons: 'Atividades Adicionais Escolhidas:',
        fullName: 'Nome Completo',
        email: 'E-mail',
        phone: 'Telefone / WhatsApp',
        preferredDates: 'Mês Previsto da Viagem',
        notes: 'Comentários ou Preferências',
        submitQuote: 'Enviar Solicitação',
        quoteSuccess: 'Solicitação enviada com sucesso!',
      },
      ja: {
        headingTag: 'ガラパゴス公式アクティビティ・インデックス',
        headingTitle: 'ガラパゴス諸島での体験',
        headingHighlight: '完全オーダーメイド',
        headingDesc: '諸島全域のすべてのアクティビティを網羅。旅行シーズン、訪問島、ベースツアーを選択して理想の旅を組み立ててください。',
        baseTourTitle: 'ステップ 1: ベースツアーを選択',
        baseTourDesc: 'ベースツアーを選択すると、すでに含まれている体験が自動識別され、追加可能なオプショナルアクティビティのみを表示できます。',
        hideIncludedLabel: 'ツアーに含まれる体験を非表示にする（追加可能オプションのみ表示）',
        showAllLabel: 'すべての体験を表示（含まれる体験＋追加オプション）',
        seasonTitle: 'ステップ 2: 旅行シーズン＆希望月',
        seasonAll: '通年',
        seasonWarm: '温暖・熱帯シーズン（12月〜5月）',
        seasonCool: 'ガルア乾季・涼感シーズン（6月〜11月）',
        islandTitle: 'ステップ 3: 島を選択',
        categoryTitle: 'アクティビティ種別',
        searchPlaceholder: 'アクティビティ名、動物、島名で検索（例：シュモクザメ、アホウドリ）...',
        includedBadge: '✓ ベースツアーに含まれています',
        availableBadge: '✨ 追加カスタマイズ可能',
        addActivity: '希望リストに追加',
        removeActivity: '希望リストから削除',
        activityDetails: '詳細と観察できる生物',
        selectedCount: '件の追加アクティビティを選択中',
        requestQuote: 'オーダーメイド見積もりを依頼',
        clearSelection: '選択をクリア',
        contactAdvisorTitle: '最適な訪問時期や諸島間の移動についてご質問ですか？',
        contactAdvisorText: 'ご不明な点は、エクアドル現地の専任遠征デザイナー（英語・スペイン語完全対応）または米国オフィス担当者へ直接ご相談ください。',
        chatWhatsapp: 'WhatsAppで相談する',
        callAdvisor: '専門スタッフに電話する',
        includedSummary: '選択中のベースツアーにすでに含まれている体験',
        additionalSummary: '旅をカスタマイズできる追加可能なオプショナル体験',
        noResults: '該当するアクティビティが見つかりませんでした。',
        resetFilters: 'すべてのフィルターをリセット',
        modalClose: '閉じる',
        keyWildlifeTitle: '注目の固有種・海洋生物',
        highlightsTitle: '体験のハイライト',
        seasonNotesTitle: '生物学的観察メモ＆季節の傾向',
        durationLabel: '所要時間目安',
        difficultyLabel: '難易度・体力レベル',
        pricingNoteLabel: '料金＆運航手配',
        navigableLabel: '専用ヨット日帰りクルーズ',
        quoteModalTitle: 'ガラパゴス特注遠征のお見積もり依頼',
        quoteModalDesc: '選定したアクティビティを現地コンシェルジュデスクへ直接送信します。',
        yourTourBase: '選択中のベースツアー:',
        yourAddons: '希望する追加アクティビティ:',
        fullName: 'お名前',
        email: 'メールアドレス',
        phone: 'お電話番号 / WhatsApp',
        preferredDates: 'ご旅行希望時期（月・日程）',
        notes: 'ご要望・ご質問',
        submitQuote: 'コンシェルジュへ送信する',
        quoteSuccess: '送信が完了しました。担当者より迅速にご案内いたします。',
      },
      zh: {
        headingTag: '加拉帕戈斯群岛官方体验全集',
        headingTitle: '加拉帕戈斯精彩活动',
        headingHighlight: '专属定制',
        headingDesc: '全方位探索群岛所有代表性活动。通过筛选旅行季节、探访岛屿与基础行程，精准挑选心仪的增选附加项目。',
        baseTourTitle: '第一步：选择您的 Vermilion 基础行程',
        baseTourDesc: '选择基础行程后，行程内已包含的项目将自动标记或隐藏，仅向您展示可额外增选定制的附加精彩体验。',
        hideIncludedLabel: '隐藏基础行程已含活动（仅显示可选附加项目）',
        showAllLabel: '显示全部活动（已含项目与附加项目）',
        seasonTitle: '第二步：出行季节与月份',
        seasonAll: '全年皆宜',
        seasonWarm: '温暖湿润季（12月 – 5月）',
        seasonCool: '凉爽干燥季（6月 – 11月）',
        islandTitle: '第三步：按岛屿筛选',
        categoryTitle: '体验类别',
        searchPlaceholder: '搜索活动、野生动物或岛屿（如：双髻鲨、信天翁、熔岩隧道）...',
        includedBadge: '✓ 基础行程已包含',
        availableBadge: '✨ 可增选定制项目',
        addActivity: '加入我的定制清单',
        removeActivity: '从清单中移除',
        activityDetails: '查看详情与野生动植物',
        selectedCount: '项已选附加活动',
        requestQuote: '获取专属定制报价',
        clearSelection: '清空已选',
        contactAdvisorTitle: '对野生动物最佳观测期或跳岛物流有任何疑问？',
        contactAdvisorText: '任何疑问，欢迎直接咨询我们常驻厄瓜多尔的资深探险行程设计师（100%精通英西双语），或联系我们的美国官方代表处。',
        chatWhatsapp: 'WhatsApp 在线咨询',
        callAdvisor: '致电资深专家',
        includedSummary: '您所选基础行程已确认为您安排的精彩体验',
        additionalSummary: '可用于丰富自由活动日或升级的附加可选项目',
        noResults: '未找到符合当前筛选条件的活动。',
        resetFilters: '重置所有筛选',
        modalClose: '关闭',
        keyWildlifeTitle: '核心野生与特有动植物',
        highlightsTitle: '行程核心亮点',
        seasonNotesTitle: '生态与最佳月份解读',
        durationLabel: '预计所需时长',
        difficultyLabel: '体力体能要求',
        pricingNoteLabel: '费用说明与游艇物流',
        navigableLabel: '出海游艇巡航项目',
        quoteModalTitle: '获取您的加拉帕戈斯专属定制提案',
        quoteModalDesc: '将您的定制意向清单直接发送给厄瓜多尔与美国官方行程管家。',
        yourTourBase: '所选基础行程：',
        yourAddons: '已勾选附加体验：',
        fullName: '您的全名',
        email: '电子邮箱',
        phone: '电话 / 微信 / WhatsApp',
        preferredDates: '意向出行月份或大致日期',
        notes: '特殊要求或个性化偏好',
        submitQuote: '提交定制需求至旅行管家',
        quoteSuccess: '需求提交成功！我们的专属管家将尽快为您量身报价。',
      }
    };
    return dict[locale] || dict.en;
  }, [locale]);

  // ── Selected Base Tour Object ──────────────────────────────────────────────
  const selectedBaseTour = useMemo(() => {
    return BASE_TOURS_GALAPAGOS.find((t) => t.id === selectedBaseTourId) || BASE_TOURS_GALAPAGOS[0];
  }, [selectedBaseTourId]);

  // ── Filtered Activities Logic (LÓGICA CLAVE EXIGIDA POR PABLO) ──────────────
  const filteredActivities = useMemo(() => {
    return GALAPAGOS_ACTIVITIES.filter((activity) => {
      // 1. Base Tour logic:
      const isIncludedInBase = selectedBaseTour.includedActivityIds.includes(activity.id);
      if (selectedBaseTour.id !== 'none' && hideIncludedActivities && isIncludedInBase) {
        return false;
      }

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

  // ── Wishlist Helpers ──────────────────────────────────────────────────────
  const toggleActivitySelection = (id: string) => {
    setSelectedActivityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedActivitiesList = useMemo(() => {
    return GALAPAGOS_ACTIVITIES.filter((a) => selectedActivityIds.includes(a.id));
  }, [selectedActivityIds]);

  // ── WhatsApp Message Builder ──────────────────────────────────────────────
  const whatsappUrl = useMemo(() => {
    const baseTourName = selectedBaseTour.id !== 'none'
      ? (selectedBaseTour.name[locale] || selectedBaseTour.name.es)
      : 'Itinerario 100% Personalizado';

    const addonsText = selectedActivitiesList.length > 0
      ? selectedActivitiesList.map((a) => `- ${a.name[locale] || a.name.es} (${a.islandName[locale] || a.islandName.es})`).join('%0A')
      : 'Consultar actividades recomendadas según temporada.';

    const message = `¡Hola Vermilion Routes! Me interesa planificar una expedición a Galápagos.%0A%0A*Tour Base:* ${baseTourName}%0A*Actividades Adicionales Seleccionadas:*%0A${addonsText}%0A%0A¿Podrían brindarme asesoría con disponibilidad y cotización estacional?`;

    return `https://wa.me/593994048458?text=${message}`;
  }, [selectedBaseTour, selectedActivitiesList, locale]);

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
              {UI.headingTitle} <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">{UI.headingHighlight}</span>
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              {UI.headingDesc}
            </p>
          </div>
        </div>
      )}

      {/* ── BILINGUAL CONCIERGE CALLOUT (EXIGIDO POR PABLO) ─────────────────── */}
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

      {/* ── NIVEL 1: SELECCIÓN DE TOUR BASE (LÓGICA CLAVE DE PABLO) ─────────── */}
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>{UI.baseTourTitle}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl">
              {UI.baseTourDesc}
            </p>
          </div>

          {/* Toggle Switch */}
          {selectedBaseTour.id !== 'none' && (
            <button
              onClick={() => setHideIncludedActivities(!hideIncludedActivities)}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all text-left"
            >
              <div
                className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                  hideIncludedActivities ? 'bg-emerald-600' : 'bg-zinc-400 dark:bg-zinc-600'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    hideIncludedActivities ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
              <span>{hideIncludedActivities ? UI.hideIncludedLabel : UI.showAllLabel}</span>
            </button>
          )}
        </div>

        {/* Base Tours Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BASE_TOURS_GALAPAGOS.map((tour) => {
            const isSelected = selectedBaseTourId === tour.id;
            const tourName = tour.name[locale] || tour.name.en || tour.name.es;
            const tourBadge = tour.badge[locale] || tour.badge.en || tour.badge.es;
            const tourDesc = tour.description[locale] || tour.description.en || tour.description.es;

            return (
              <button
                key={tour.id}
                onClick={() => setSelectedBaseTourId(tour.id)}
                className={`p-5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between space-y-3 relative group ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/50 hover:border-emerald-500/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300'
                    }`}>
                      {tourBadge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {tourName}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {tourDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200/50 dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>
                    {tour.includedActivityIds.length > 0
                      ? `${tour.includedActivityIds.length} actividades base`
                      : '0 actividades base'}
                  </span>
                  <span className="text-zinc-500">{tour.duration[locale] || tour.duration.en}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Banner when base tour selected */}
        {selectedBaseTour.id !== 'none' && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-zinc-800 dark:text-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>{selectedBaseTour.name[locale] || selectedBaseTour.name.es}</strong>: Ya tienes{' '}
                <strong>{selectedBaseTour.includedActivityIds.length}</strong> experiencias garantizadas.
                {hideIncludedActivities
                  ? ' Mostrando solo las opciones adicionales para enriquecer tus días libres.'
                  : ' Las actividades incluidas se muestran marcadas en verde.'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
              {filteredActivities.length} adicionales disponibles
            </span>
          </div>
        )}
      </div>

      {/* ── NIVEL 2: SELECCIÓN DE TEMPORADA & MES ────────────────────────────── */}
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>{UI.seasonTitle}</span>
          </div>

          {(selectedSeason !== 'all' || selectedMonth !== 'all') && (
            <button
              onClick={() => {
                setSelectedSeason('all');
                setSelectedMonth('all');
              }}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              {UI.resetFilters}
            </button>
          )}
        </div>

        {/* Season Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedSeason('all');
              setSelectedMonth('all');
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              selectedSeason === 'all' && selectedMonth === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            {UI.seasonAll}
          </button>
          <button
            onClick={() => {
              setSelectedSeason('warm');
              setSelectedMonth('all');
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              selectedSeason === 'warm'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            ☀️ {UI.seasonWarm}
          </button>
          <button
            onClick={() => {
              setSelectedSeason('cool');
              setSelectedMonth('all');
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              selectedSeason === 'cool'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            🌊 {UI.seasonCool}
          </button>
        </div>

        {/* 12 Months Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
            Filtrar por Mes Específico de Viaje:
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
            {MONTH_NAMES.map((m) => {
              const isMonthSelected = selectedMonth === m.month;
              const monthLabel = m.name[locale] || m.name.en || m.name.es;

              return (
                <button
                  key={m.month}
                  onClick={() => setSelectedMonth(isMonthSelected ? 'all' : m.month)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                    isMonthSelected
                      ? 'bg-emerald-600 text-white font-bold shadow-md ring-2 ring-emerald-400/50'
                      : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                  }`}
                >
                  {monthLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Season Condition Callout */}
        {selectedSeason !== 'all' && (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-white/5 space-y-2 text-xs">
            <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Waves className="w-4 h-4 text-emerald-500" />
              <span>
                {selectedSeason === 'warm'
                  ? (GALAPAGOS_SEASONS_INFO.warm.name[locale] || GALAPAGOS_SEASONS_INFO.warm.name.es)
                  : (GALAPAGOS_SEASONS_INFO.cool.name[locale] || GALAPAGOS_SEASONS_INFO.cool.name.es)}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              {selectedSeason === 'warm'
                ? (GALAPAGOS_SEASONS_INFO.warm.conditions[locale] || GALAPAGOS_SEASONS_INFO.warm.conditions.es)
                : (GALAPAGOS_SEASONS_INFO.cool.conditions[locale] || GALAPAGOS_SEASONS_INFO.cool.conditions.es)}
            </p>
            <p className="text-emerald-700 dark:text-emerald-400 font-medium">
              <strong>Fauna Destacada: </strong>
              {selectedSeason === 'warm'
                ? (GALAPAGOS_SEASONS_INFO.warm.wildlifeHighlights[locale] || GALAPAGOS_SEASONS_INFO.warm.wildlifeHighlights.es)
                : (GALAPAGOS_SEASONS_INFO.cool.wildlifeHighlights[locale] || GALAPAGOS_SEASONS_INFO.cool.wildlifeHighlights.es)}
            </p>
          </div>
        )}
      </div>

      {/* ── NIVEL 3: SELECCIÓN POR ISLA & CATEGORÍA & BÚSQUEDA ───────────────── */}
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>{UI.islandTitle}</span>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={UI.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-2xl text-xs bg-zinc-100 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Islands Chips */}
        <div className="flex flex-wrap gap-2">
          {GALAPAGOS_ISLANDS.map((island) => {
            const isIslandSelected = selectedIsland === island.id;
            const islandName = island.name[locale] || island.name.en || island.name.es;

            return (
              <button
                key={island.id}
                onClick={() => setSelectedIsland(island.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  isIslandSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10'
                }`}
              >
                <span>{island.icon}</span>
                <span>{islandName}</span>
                {island.id !== 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isIslandSelected ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-white/10 text-zinc-500'
                  }`}>
                    {island.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Categories Chips */}
        <div className="pt-2 border-t border-zinc-100 dark:border-white/5 space-y-2">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
            {UI.categoryTitle}:
          </span>
          <div className="flex flex-wrap gap-2">
            {GALAPAGOS_CATEGORIES.map((cat) => {
              const isCatSelected = selectedCategory === cat.id;
              const catName = cat.name[locale] || cat.name.en || cat.name.es;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isCatSelected
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{catName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── LISTA DE ACTIVIDADES (GRID LUXURY) ───────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl sm:text-2xl font-light text-zinc-900 dark:text-white">
              Actividades Disponibles
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              {filteredActivities.length}
            </span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => {
              const isIncludedInBase = selectedBaseTour.includedActivityIds.includes(activity.id);
              const isSelectedInWishlist = selectedActivityIds.includes(activity.id);
              const name = activity.name[locale] || activity.name.en || activity.name.es;
              const shortDesc = activity.shortDescription[locale] || activity.shortDescription.en || activity.shortDescription.es;
              const islandName = activity.islandName[locale] || activity.islandName.en || activity.islandName.es;
              const categoryName = activity.categoryName[locale] || activity.categoryName.en || activity.categoryName.es;
              const difficultyName = activity.difficultyName[locale] || activity.difficultyName.en || activity.difficultyName.es;
              const duration = activity.duration[locale] || activity.duration.en || activity.duration.es;

              return (
                <div
                  key={activity.id}
                  className={`rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                    isIncludedInBase
                      ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30'
                      : isSelectedInWishlist
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 shadow-lg ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={activity.imageUrl || '/images/tours/16-9/galapagos-lobo-marino-16-9.webp'}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{islandName}</span>
                      </span>

                      {isIncludedInBase ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-md">
                          {UI.includedBadge}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                          {UI.availableBadge}
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay info on image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        {categoryName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        {duration}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {name}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                        {shortDesc}
                      </p>
                    </div>

                    {/* Key Wildlife Tags */}
                    <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-white/5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                        Fauna Principal:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {activity.keyWildlife.slice(0, 2).map((w, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 font-medium"
                          >
                            🐾 {w[locale] || w.en || w.es}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalActivity(activity)}
                        className="p-2.5 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition-all shrink-0"
                        title={UI.activityDetails}
                        aria-label={UI.activityDetails}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {isIncludedInBase ? (
                        <div className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs text-center border border-emerald-500/30">
                          {UI.includedBadge}
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleActivitySelection(activity.id)}
                          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                            isSelectedInWishlist
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-zinc-900 dark:bg-white/10 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white'
                          }`}
                        >
                          {isSelectedInWishlist ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{UI.removeActivity}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{UI.addActivity}</span>
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
        )}
      </div>

      {/* ── STICKY WISHLIST DRAWER (CUANDO HAY ACTIVIDADES SELECCIONADAS) ─────── */}
      {selectedActivityIds.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-4xl mx-auto z-40 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="bg-zinc-950/90 dark:bg-zinc-900/95 backdrop-blur-xl border border-emerald-500/40 text-white p-4 sm:p-5 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
                {selectedActivityIds.length}
              </div>
              <div className="space-y-0.5">
                <p className="font-serif text-base font-bold text-white">
                  {selectedActivityIds.length} {UI.selectedCount}
                </p>
                <p className="text-xs text-zinc-400">
                  Base: {selectedBaseTour.name[locale] || selectedBaseTour.name.es}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/40 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{UI.requestQuote}</span>
              </a>
              <button
                onClick={() => setSelectedActivityIds([])}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all"
                title={UI.clearSelection}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DE DETALLE DE ACTIVIDAD ────────────────────────────────────── */}
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
                src={activeModalActivity.imageUrl || '/images/tours/16-9/galapagos-lobo-marino-16-9.webp'}
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
            <div className="p-6 sm:p-8 space-y-6 text-zinc-800 dark:text-zinc-200">
              <div className="space-y-2">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {activeModalActivity.description[locale] || activeModalActivity.description.en}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-white/10">
                <h5 className="font-serif text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>{UI.highlightsTitle}</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {activeModalActivity.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{h[locale] || h.en || h.es}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Wildlife */}
              <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-white/10">
                <h5 className="font-serif text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>🐾</span>
                  <span>{UI.keyWildlifeTitle}</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeModalActivity.keyWildlife.map((w, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-medium"
                    >
                      {w[locale] || w.en || w.es}
                    </span>
                  ))}
                </div>
              </div>

              {/* Seasonal & Biological notes */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block">
                  {UI.seasonNotesTitle}:
                </span>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {activeModalActivity.seasonalityNotes[locale] || activeModalActivity.seasonalityNotes.en}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/5">
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">{UI.durationLabel}</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {activeModalActivity.duration[locale] || activeModalActivity.duration.en}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/5">
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">{UI.difficultyLabel}</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {activeModalActivity.difficultyName[locale] || activeModalActivity.difficultyName.en}
                  </span>
                </div>
              </div>

              {/* Pricing Note */}
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                * {activeModalActivity.pricingNote[locale] || activeModalActivity.pricingNote.en}
              </div>

              {/* Modal Action */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/10 flex gap-3">
                <button
                  onClick={() => {
                    toggleActivitySelection(activeModalActivity.id);
                    setActiveModalActivity(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  {selectedActivityIds.includes(activeModalActivity.id)
                    ? UI.removeActivity
                    : UI.addActivity}
                </button>
                <button
                  onClick={() => setActiveModalActivity(null)}
                  className="py-3 px-6 rounded-2xl bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 text-zinc-800 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  {UI.modalClose}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
