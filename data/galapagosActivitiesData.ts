
export type GalapagosIslandId =
  | 'all'
  | 'santa-cruz'
  | 'isabela'
  | 'san-cristobal'
  | 'espanola'
  | 'bartolome'
  | 'seymour-norte'
  | 'santa-fe'
  | 'plaza-sur'
  | 'floreana'
  | 'genovesa'
  | 'fernandina'
  | 'santiago'
  | 'pinzon';

export type GalapagosCategoryId =
  | 'all'
  | 'marine-wildlife'
  | 'volcanic-hiking'
  | 'snorkel-diving'
  | 'history-conservation'
  | 'photography';

export type GalapagosSeasonId = 'all-year' | 'warm' | 'cool';

export interface GalapagosActivity {
  isIconic?: boolean;
  id: string;
  name: Record<string, string>;
  shortDescription: Record<string, string>;
  description: Record<string, string>;
  island: Exclude<GalapagosIslandId, 'all'>;
  islandName: Record<string, string>;
  category: Exclude<GalapagosCategoryId, 'all'>;
  categoryName: Record<string, string>;
  seasons: GalapagosSeasonId[];
  bestMonths: number[]; // 1 to 12
  seasonalityNotes: Record<string, string>;
  includedInTourIds: string[];
  difficulty: 'easy' | 'moderate' | 'demanding';
  difficultyName: Record<string, string>;
  duration: Record<string, string>;
  imageUrl: string;
  keyWildlife: Record<string, string>[];
  highlights: Record<string, string>[];
  isNavigableDayTour: boolean;
  requiresDivingLicense?: boolean;
  pricingNote: Record<string, string>;
}

export interface BaseTourOption {
  id: string;
  code?: string;
  name: Record<string, string>;
  duration: Record<string, string>;
  durationDays: number;
  badge: Record<string, string>;
  description: Record<string, string>;
  includedActivityIds: string[];
}

export const BASE_TOURS_GALAPAGOS: BaseTourOption[] = [
  {
    id: 'none',
    name: {
      es: 'Ninguno (Explorar todas las actividades del archipiélago)',
      en: 'None (Explore all archipelago activities from scratch)',
      fr: 'Aucun (Explorer toutes les activités de l\'archipel)',
      de: 'Keine (Alle Aktivitäten des Archipels von Grund auf erkunden)',
      it: 'Nessuno (Esplora tutte le attività dell\'arcipelago)',
      pt: 'Nenhum (Explorar todas as atividades do arquipélago)',
      ja: '指定なし（ガラパゴス諸島の全アクティビティを閲覧）',
      zh: '暂不选择（查看加拉帕戈斯群岛所有活动）'
    },
    duration: {
      es: 'A medida',
      en: 'Custom',
      fr: 'Sur mesure',
      de: 'Individuell',
      it: 'Su misura',
      pt: 'Sob medida',
      ja: 'カスタム',
      zh: '量身定制'
    },
    durationDays: 0,
    badge: {
      es: 'Diseño Libre',
      en: 'Open Discovery',
      fr: 'Découverte Libre',
      de: 'Freie Gestaltung',
      it: 'Design Libero',
      pt: 'Design Livre',
      ja: '自由設計',
      zh: '自由探索'
    },
    description: {
      es: 'Visualiza la totalidad de experiencias disponibles en todas las islas de Galápagos.',
      en: 'Browse the entire spectrum of experiences available across all Galapagos islands.',
      fr: 'Parcourez l\'ensemble des expériences disponibles sur toutes les îles des Galápagos.',
      de: 'Durchsuchen Sie das gesamte Spektrum an Erlebnissen auf allen Galapagos-Inseln.',
      it: 'Visualizza l\'intera gamma di esperienze disponibili in tutte le isole Galapagos.',
      pt: 'Visualize todas as experiências disponíveis em todas as ilhas de Galápagos.',
      ja: 'ガラパゴス諸島の全島で体験可能なすべてのアクティビティを一覧表示します。',
      zh: '浏览加拉帕戈斯群岛所有岛屿可体验的全部精彩活动。'
    },
    includedActivityIds: []
  },
  {
    id: 'galapagos-6days',
    code: '1.1',
    name: {
      es: 'Encuentro Galápagos: 6 Días De Magia',
      en: 'Galapagos Encounter: 6-Day Expedition',
      fr: 'Rencontre aux Galápagos: 6 Jours Merveilleux',
      de: 'Galapagos Entdeckung: 6 Tage Magie',
      it: 'Incontro alle Galapagos: 6 Giorni di Magia',
      pt: 'Encontro em Galápagos: 6 Dias de Magia',
      ja: 'ガラパゴス諸島 6日間の驚異（キト送迎付き）',
      zh: '加拉帕戈斯邂逅之旅：6日经典探险'
    },
    duration: {
      es: '6 Días / 5 Noches',
      en: '6 Days / 5 Nights',
      fr: '6 Jours / 5 Nuits',
      de: '6 Tage / 5 Nächte',
      it: '6 Giorni / 5 Notti',
      pt: '6 Dias / 5 Noites',
      ja: '6日間 / 5泊',
      zh: '6天 / 5晚'
    },
    durationDays: 6,
    badge: {
      es: 'Tour Base 6 Días',
      en: '6-Day Base Tour',
      fr: 'Circuit Base 6 Jours',
      de: '6-Tage Basistour',
      it: 'Tour Base 6 Giorni',
      pt: 'Tour Base 6 Dias',
      ja: '6日間ベースツアー',
      zh: '6日基础行程'
    },
    description: {
      es: 'Base en Santa Cruz con excursión full-day en lancha rápida a Isabela, tortugas gigantes y Las Grietas.',
      en: 'Based on Santa Cruz with full-day speedboat excursion to Isabela, wild giant tortoises and Las Grietas.',
      fr: 'Séjour à Santa Cruz avec excursion journée en vedette vers Isabela, tortues géantes et Las Grietas.',
      de: 'Standort Santa Cruz mit Ganztagesausflug per Schnellboot nach Isabela, Riesenschildkröten und Las Grietas.',
      it: 'Base a Santa Cruz con escursione di un giorno a Isabela, tartarughe giganti e Las Grietas.',
      pt: 'Base em Santa Cruz com excursão de dia inteiro a Isabela, tartarugas gigantes e Las Grietas.',
      ja: 'サンタクルス島を拠点に、イサベラ島への終日スピードボートツアー、野生ゾウガメ、ラス・グリエタスを満喫。',
      zh: '以圣克鲁斯岛为基地，包含前往伊莎贝拉岛的快艇全日游、探访高地野生巨龟与拉斯格里塔斯火山峡谷。'
    },
    includedActivityIds: [
      'sc-tortoises-highlands',
      'sc-los-gemelos',
      'sc-las-grietas',
      'sc-charles-darwin-station',
      'is-tintoreras-islet',
      'is-flamingos-arnaldo-tupiza'
    ]
  },
  {
    id: 'galapagos-7days',
    code: '1.2',
    name: {
      es: 'Expedición Galápagos: 7 Días De Aventura',
      en: 'Galapagos Explorer: 7-Day Island Expedition',
      fr: 'Expédition Galápagos: 7 Jours d\'Aventure',
      de: 'Galapagos Entdecker: 7 Tage Inselabenteuer',
      it: 'Spedizione Galapagos: 7 Giorni di Avventura',
      pt: 'Expedição Galápagos: 7 Dias de Aventura',
      ja: 'ガラパゴス探検：7日間のアイランドアドベンチャー',
      zh: '加拉帕戈斯探索者：7日海岛深度探险'
    },
    duration: {
      es: '7 Días / 6 Noches',
      en: '7 Days / 6 Nights',
      fr: '7 Jours / 6 Nuits',
      de: '7 Tage / 6 Nächte',
      it: '7 Giorni / 6 Notti',
      pt: '7 Dias / 6 Noites',
      ja: '7日間 / 6泊',
      zh: '7天 / 6晚'
    },
    durationDays: 7,
    badge: {
      es: 'Tour Base 7 Días',
      en: '7-Day Base Tour',
      fr: 'Circuit Base 7 Jours',
      de: '7-Tage Basistour',
      it: 'Tour Base 7 Giorni',
      pt: 'Tour Base 7 Dias',
      ja: '7日間ベースツアー',
      zh: '7日基础行程'
    },
    description: {
      es: 'Incluye noche en Isla Isabela, tierras altas de Santa Cruz, Las Grietas y navegación en yate a Santa Fe o Pinzón.',
      en: 'Includes overnight on Isabela Island, Santa Cruz highlands, Las Grietas, and full-day navigable yacht tour to Santa Fe or Pinzon.',
      fr: 'Comprend une nuit sur Isabela, hauts plateaux de Santa Cruz, Las Grietas et croisière yacht vers Santa Fe ou Pinzon.',
      de: 'Inklusive Übernachtung auf Isabela, Santa Cruz Hochland, Las Grietas und Yachtausflug nach Santa Fe oder Pinzon.',
      it: 'Include pernottamento a Isabela, alture di Santa Cruz, Las Grietas e navigazione in yacht a Santa Fe o Pinzon.',
      pt: 'Inclui pernoite na Ilha Isabela, terras altas de Santa Cruz, Las Grietas e navegação em iate para Santa Fe ou Pinzón.',
      ja: 'イサベラ島での宿泊、サンタクルス島高地、ラス・グリエタス、サンタフェ島またはピンソン島への終日ヨットを含む充実プラン。',
      zh: '包含伊莎贝拉岛过夜住宿、圣克鲁斯高地巨龟保护区、拉斯格里塔斯峡谷，以及前往圣菲岛或平松岛的出海游艇巡航。'
    },
    includedActivityIds: [
      'sc-tortoises-highlands',
      'sc-los-gemelos',
      'sc-las-grietas',
      'sc-charles-darwin-station',
      'is-tintoreras-islet',
      'is-flamingos-arnaldo-tupiza',
      'sf-land-iguanas-snorkel'
    ]
  },
  {
    id: 'galapagos-8days',
    code: '1.3',
    name: {
      es: 'Gran Odisea Galápagos: 8 Días y 3 Islas',
      en: 'Galapagos Grand Odyssey: 8-Day 3-Island Expedition',
      fr: 'Grande Odyssée aux Galápagos: 8 Jours et 3 Îles',
      de: 'Galapagos Grand Odyssee: 8 Tage & 3 Inseln',
      it: 'Grande Odissea alle Galapagos: 8 Giorni e 3 Isole',
      pt: 'Grande Odisseia em Galápagos: 8 Dias e 3 Ilhas',
      ja: 'ガラパゴス諸島 壮大なオデッセイ：8日間 3島巡礼',
      zh: '加拉帕戈斯盛大史诗：8日三岛大跨越'
    },
    duration: {
      es: '8 Días / 7 Noches',
      en: '8 Days / 7 Nights',
      fr: '8 Jours / 7 Nuits',
      de: '8 Tage / 7 Nächte',
      it: '8 Giorni / 7 Notti',
      pt: '8 Dias / 7 Noites',
      ja: '8日間 / 7泊',
      zh: '8天 / 7晚'
    },
    durationDays: 8,
    badge: {
      es: 'Tour Base 8 Días',
      en: '8-Day Base Tour',
      fr: 'Circuit Base 8 Jours',
      de: '8-Tage Basistour',
      it: 'Tour Base 8 Giorni',
      pt: 'Tour Base 8 Dias',
      ja: '8日間ベースツアー',
      zh: '8日基础行程'
    },
    description: {
      es: 'La ruta más completa: Santa Cruz, Isabela y San Cristóbal con Tijeretas, La Lobería y navegación en yate.',
      en: 'The most comprehensive expedition: Santa Cruz, Isabela, and San Cristobal with Tijeretas, La Loberia and yacht cruise.',
      fr: 'L\'expédition la plus complète : Santa Cruz, Isabela et San Cristóbal avec Tijeretas, La Lobería et croisière yacht.',
      de: 'Die umfassendste Route: Santa Cruz, Isabela und San Cristóbal mit Tijeretas, La Lobería und Yacht-Exkursion.',
      it: 'L\'itinerario più completo: Santa Cruz, Isabela e San Cristóbal con Tijeretas, La Lobería e navigazione in yacht.',
      pt: 'O roteiro mais completo: Santa Cruz, Isabela e San Cristóbal com Tijeretas, La Lobería e navegação em iate.',
      ja: '主要3島（サンタクルス、イサベラ、サンクリストバル）を完全網羅。ティヘレタス、ラ・ロベリア、ヨットクルーズを含む最高峰ルート。',
      zh: '覆盖圣克鲁斯、伊莎贝拉和圣克里斯托巴尔三大岛屿的终极史诗路线，包含军舰鸟丘、海狮海滩与出海巡游。'
    },
    includedActivityIds: [
      'sc-tortoises-highlands',
      'sc-los-gemelos',
      'sc-las-grietas',
      'sc-charles-darwin-station',
      'is-tintoreras-islet',
      'is-flamingos-arnaldo-tupiza',
      'sf-land-iguanas-snorkel',
      'sc-interpretation-center',
      'sc-cerro-tijeretas',
      'sc-la-loberia'
    ]
  },
  {
    id: 'ecuador-galapagos-11days',
    name: {
      es: 'Ecuador & Galápagos Destacados: 11 Días',
      en: 'Ecuador & Galapagos Signature Highlights: 11 Days',
      fr: 'Équateur et Galápagos Incontournables: 11 Jours',
      de: 'Ecuador & Galapagos Highlights: 11 Tage',
      it: 'Ecuador e Galapagos Punti Salienti: 11 Giorni',
      pt: 'Equador e Galápagos Destaques: 11 Dias',
      ja: 'エクアドル＆ガラパゴス ハイライト：11日間',
      zh: '厄瓜多尔与加拉帕戈斯群岛精选：11日全景'
    },
    duration: {
      es: '11 Días / 10 Noches',
      en: '11 Days / 10 Nights',
      fr: '11 Jours / 10 Nuits',
      de: '11 Tage / 10 Nächte',
      it: '11 Giorni / 10 Notti',
      pt: '11 Dias / 10 Noites',
      ja: '11日間 / 10泊',
      zh: '11天 / 10晚'
    },
    durationDays: 11,
    badge: {
      es: 'Combinado 11 Días',
      en: '11-Day Combined',
      fr: 'Combiné 11 Jours',
      de: '11-Tage Kombi',
      it: 'Combinato 11 Giorni',
      pt: 'Combinado 11 Dias',
      ja: '11日間コンビネーション',
      zh: '11日联游行程'
    },
    description: {
      es: 'Andes coloniales, Cotopaxi y Quilotoa combinados con la magia de Santa Cruz e Isabela.',
      en: 'Colonial Andes, Cotopaxi and Quilotoa combined with Santa Cruz and Isabela.',
      fr: 'Andes coloniales, Cotopaxi et Quilotoa combinés avec Santa Cruz et Isabela.',
      de: 'Koloniale Anden, Cotopaxi und Quilotoa kombiniert mit Santa Cruz und Isabela.',
      it: 'Ande coloniali, Cotopaxi e Quilotoa combinati con Santa Cruz e Isabela.',
      pt: 'Andes coloniais, Cotopaxi e Quilotoa combinados com Santa Cruz e Isabela.',
      ja: 'キト旧市街、コトパクシ火山、キロトア火口湖とサンタクルス島・イサベラ島を一度に楽しむ贅沢ルート。',
      zh: '安第斯山脉、科托帕希火山与基洛托阿湖，完美结合圣克鲁斯岛与伊莎贝拉岛海岛探险。'
    },
    includedActivityIds: [
      'sc-tortoises-highlands',
      'sc-los-gemelos',
      'sc-las-grietas',
      'sc-charles-darwin-station',
      'is-tintoreras-islet',
      'is-flamingos-arnaldo-tupiza'
    ]
  }
];

export const GALAPAGOS_ISLANDS: {
  id: GalapagosIslandId;
  name: Record<string, string>;
  subtitle: Record<string, string>;
  icon: string;
  count: number;
}[] = [
  {
    id: 'all',
    name: {
      es: 'Todas las Islas',
      en: 'All Islands',
      fr: 'Toutes les Îles',
      de: 'Alle Inseln',
      it: 'Tutte le Isole',
      pt: 'Todas as Ilhas',
      ja: 'すべての島',
      zh: '所有岛屿'
    },
    subtitle: {
      es: 'Archipiélago completo',
      en: 'Complete archipelago',
      fr: 'Archipel complet',
      de: 'Gesamter Archipel',
      it: 'Arcipelago completo',
      pt: 'Arquipélago completo',
      ja: '諸島全域',
      zh: '全群岛'
    },
    icon: '🏝️',
    count: 32
  },
  {
    id: 'santa-cruz',
    name: {
      es: 'Santa Cruz',
      en: 'Santa Cruz',
      fr: 'Santa Cruz',
      de: 'Santa Cruz',
      it: 'Santa Cruz',
      pt: 'Santa Cruz',
      ja: 'サンタクルス島',
      zh: '圣克鲁斯岛'
    },
    subtitle: {
      es: 'Puerto Ayora & Tierras Altas',
      en: 'Puerto Ayora & Highlands',
      fr: 'Puerto Ayora & Hauts Plateaux',
      de: 'Puerto Ayora & Hochland',
      it: 'Puerto Ayora & Alture',
      pt: 'Puerto Ayora & Terras Altas',
      ja: 'プエルト・アヨラと緑豊かな高地',
      zh: '阿约拉港与高地巨龟'
    },
    icon: '🐢',
    count: 8
  },
  {
    id: 'isabela',
    name: {
      es: 'Isabela',
      en: 'Isabela Island',
      fr: 'Île Isabela',
      de: 'Insel Isabela',
      it: 'Isola Isabela',
      pt: 'Ilha Isabela',
      ja: 'イサベラ島',
      zh: '伊莎贝拉岛'
    },
    subtitle: {
      es: 'Volcanes activos & Túneles de lava',
      en: 'Active volcanoes & Lava tunnels',
      fr: 'Volcans actifs & Tunnels de lave',
      de: 'Aktive Vulkane & Lavatunnel',
      it: 'Vulcani attivi & Tunnel di lava',
      pt: 'Vulcões ativos & Túneis de lava',
      ja: '活火山と溶岩トンネルの秘境',
      zh: '活火山与熔岩隧道'
    },
    icon: '🌋',
    count: 7
  },
  {
    id: 'san-cristobal',
    name: {
      es: 'San Cristóbal',
      en: 'San Cristobal',
      fr: 'San Cristóbal',
      de: 'San Cristóbal',
      it: 'San Cristóbal',
      pt: 'San Cristóbal',
      ja: 'サンクリストバル島',
      zh: '圣克里斯托巴尔岛'
    },
    subtitle: {
      es: 'Capital del león marino & León Dormido',
      en: 'Sea lion capital & Kicker Rock',
      fr: 'Capitale des otaries & Kicker Rock',
      de: 'Seelöwen-Hauptstadt & Kicker Rock',
      it: 'Capitale dei leoni marini & Kicker Rock',
      pt: 'Capital dos leões-marinhos & Kicker Rock',
      ja: 'アシカの楽園＆キッカーロック',
      zh: '海狮之都与踢脚石'
    },
    icon: '🦭',
    count: 6
  },
  {
    id: 'espanola',
    name: {
      es: 'Española',
      en: 'Espanola Island',
      fr: 'Île Española',
      de: 'Insel Española',
      it: 'Isola Española',
      pt: 'Ilha Española',
      ja: 'エスパニョラ島',
      zh: '西班牙岛 (埃斯帕尼奥拉)'
    },
    subtitle: {
      es: 'Santuario de albatros & Bahía Gardner',
      en: 'Albatross sanctuary & Gardner Bay',
      fr: 'Sanctuaire d\'albatros & Baie Gardner',
      de: 'Albatros-Schutzgebiet & Gardner Bay',
      it: 'Santuario degli albatros & Gardner Bay',
      pt: 'Santuário de albatrozes & Baía Gardner',
      ja: 'アホウドリの聖域＆ガードナー湾',
      zh: '信天翁圣域与加德纳湾'
    },
    icon: '🦅',
    count: 2
  },
  {
    id: 'bartolome',
    name: {
      es: 'Bartolomé',
      en: 'Bartolome Island',
      fr: 'Île Bartolomé',
      de: 'Insel Bartolomé',
      it: 'Isola Bartolomé',
      pt: 'Ilha Bartolomé',
      ja: 'バルトロメ島',
      zh: '巴托洛梅岛'
    },
    subtitle: {
      es: 'Roca Pináculo & Pingüinos',
      en: 'Pinnacle Rock & Penguins',
      fr: 'Rocher Pinacle & Manchots',
      de: 'Pinnacle Rock & Pinguine',
      it: 'Pinnacle Rock & Pinguini',
      pt: 'Rocha Pináculo & Pinguins',
      ja: 'ピナクルロックとペンギン',
      zh: '顶峰石与加拉帕戈斯企鹅'
    },
    icon: '🐧',
    count: 1
  },
  {
    id: 'seymour-norte',
    name: {
      es: 'Seymour Norte',
      en: 'North Seymour',
      fr: 'Seymour Nord',
      de: 'Nord-Seymour',
      it: 'Seymour Nord',
      pt: 'Seymour Norte',
      ja: 'ノース・セイモア島',
      zh: '北塞穆尔岛'
    },
    subtitle: {
      es: 'Piqueros patas azules & Fragatas',
      en: 'Blue-footed boobies & Frigatebirds',
      fr: 'Fous à pieds bleus & Frégates',
      de: 'Blaufußtölpel & Fregattvögel',
      it: 'Sule dai piedi azzurri & Fregate',
      pt: 'Atobás-de-pés-azuis & Fragatas',
      ja: 'アオアシカツオドリとグンカンドリ',
      zh: '蓝脚鲣鸟与军舰鸟王国'
    },
    icon: '🐦',
    count: 1
  },
  {
    id: 'santa-fe',
    name: {
      es: 'Santa Fe',
      en: 'Santa Fe Island',
      fr: 'Île Santa Fe',
      de: 'Insel Santa Fe',
      it: 'Isola Santa Fe',
      pt: 'Ilha Santa Fe',
      ja: 'サンタフェ島',
      zh: '圣菲岛'
    },
    subtitle: {
      es: 'Iguanas terrestres endémicas & Bahía turquesa',
      en: 'Endemic land iguanas & Turquoise bay',
      fr: 'Iguanes terrestres endémiques & Baie turquoise',
      de: 'Endemische Landleguane & Türkisblaue Bucht',
      it: 'Iguane terrestri endemiche & Baia turchese',
      pt: 'Iguanas terrestres endêmicas & Baía turquesa',
      ja: '固有リクイグアナとエメラルドの入江',
      zh: '特有陆鬣蜥与绿松石海湾'
    },
    icon: '🦎',
    count: 1
  },
  {
    id: 'plaza-sur',
    name: {
      es: 'Plaza Sur',
      en: 'South Plaza',
      fr: 'Plaza Sud',
      de: 'Süd-Plaza',
      it: 'Plaza Sud',
      pt: 'Plaza Sul',
      ja: 'サウス・プラザ島',
      zh: '南普拉扎岛'
    },
    subtitle: {
      es: 'Alfombra roja de sesuvium & Acantilados',
      en: 'Red sesuvium carpet & Cliffs',
      fr: 'Tapis rouge de sesuvium & Falaises',
      de: 'Roter Sesuvium-Teppich & Klippen',
      it: 'Tappeto rosso di sesuvium & Scogliere',
      pt: 'Tapete vermelho de sesuvium & Falésias',
      ja: '赤い植物カーペットと海鳥の崖',
      zh: '红海马齿苋植被与海鸟悬崖'
    },
    icon: '🍁',
    count: 1
  },
  {
    id: 'floreana',
    name: {
      es: 'Floreana',
      en: 'Floreana Island',
      fr: 'Île Floreana',
      de: 'Insel Floreana',
      it: 'Isola Floreana',
      pt: 'Ilha Floreana',
      ja: 'フロレアナ島',
      zh: '弗洛雷安纳岛'
    },
    subtitle: {
      es: 'Corona del Diablo & Misterio de piratas',
      en: 'Devil\'s Crown & Pirate mysteries',
      fr: 'Couronne du Diable & Mystères pirates',
      de: 'Teufelskrone & Piratengeschichten',
      it: 'Corona del Diavolo & Misteri pirati',
      pt: 'Coroa do Diabo & Mistérios de piratas',
      ja: '悪魔の冠スノーケル＆海賊の伝説',
      zh: '魔鬼之冠与海盗历史'
    },
    icon: '👑',
    count: 1
  },
  {
    id: 'pinzon',
    name: {
      es: 'Pinzón',
      en: 'Pinzon Island',
      fr: 'Île Pinzón',
      de: 'Insel Pinzón',
      it: 'Isola Pinzón',
      pt: 'Ilha Pinzón',
      ja: 'ピンソン島',
      zh: '平松岛'
    },
    subtitle: {
      es: 'Snorkel prístino con tiburones y tortugas',
      en: 'Pristine snorkel with sharks & sea turtles',
      fr: 'Snorkeling cristallin avec requins & tortues',
      de: 'Kristallklares Schnorcheln mit Haien & Schildkröten',
      it: 'Snorkeling cristallino con squali e tartarughe',
      pt: 'Snorkel intocado com tubarões e tartarugas',
      ja: '透明度抜群のサメ＆ウミガメスノーケル',
      zh: '纯净水域浮潜，探秘鲨鱼与海龟'
    },
    icon: '🦈',
    count: 1
  },
  {
    id: 'genovesa',
    name: {
      es: 'Genovesa',
      en: 'Genovesa Island',
      fr: 'Île Genovesa',
      de: 'Insel Genovesa',
      it: 'Isola Genovesa',
      pt: 'Ilha Genovesa',
      ja: 'ヘノベサ島（鳥の島）',
      zh: '热诺韦萨岛 (鸟岛)'
    },
    subtitle: {
      es: 'La isla de las aves: Piqueros patas rojas',
      en: 'The bird island: Red-footed boobies',
      fr: 'L\'île aux oiseaux : Fous à pattes rouges',
      de: 'Die Vogelinsel: Rotfußtölpel',
      it: 'L\'isola degli uccelli: Sule zamperosse',
      pt: 'A ilha dos pássaros: Atobás-de-patas-vermelhas',
      ja: '100万羽の野鳥とアカアシカツオドリ',
      zh: '鸟类天堂：红脚鲣鸟聚集地'
    },
    icon: '🪶',
    count: 1
  },
  {
    id: 'fernandina',
    name: {
      es: 'Fernandina',
      en: 'Fernandina Island',
      fr: 'Île Fernandina',
      de: 'Insel Fernandina',
      it: 'Isola Fernandina',
      pt: 'Ilha Fernandina',
      ja: 'フェルナンディナ島',
      zh: '费尔南迪纳岛'
    },
    subtitle: {
      es: 'La isla más virgen: Cormoranes no voladores',
      en: 'The most pristine island: Flightless cormorants',
      fr: 'L\'île la plus vierge : Cormorans aptères',
      de: 'Die unberührteste Insel: Flugunfähige Kormorane',
      it: 'L\'isola più incontaminata: Cormorani non volatori',
      pt: 'A ilha mais intocada: Cormorões-não-voadores',
      ja: '世界で最も原生的な島：飛べないウ',
      zh: '地球最原始之岛：弱翅鸬鹚与海鬣蜥'
    },
    icon: '🦕',
    count: 1
  },
  {
    id: 'santiago',
    name: {
      es: 'Santiago',
      en: 'Santiago Island',
      fr: 'Île Santiago',
      de: 'Insel Santiago',
      it: 'Isola Santiago',
      pt: 'Ilha Santiago',
      ja: 'サンティアゴ島',
      zh: '圣地亚哥岛'
    },
    subtitle: {
      es: 'Flujos de lava Pahoehoe & Puerto Egas',
      en: 'Pahoehoe lava flows & Puerto Egas',
      fr: 'Coulées de lave Pahoehoe & Puerto Egas',
      de: 'Pahoehoe-Lavaströme & Puerto Egas',
      it: 'Colate di lava Pahoehoe & Puerto Egas',
      pt: 'Fluxos de lava Pahoehoe & Puerto Egas',
      ja: 'パホイホイ溶岩とオットセイの洞窟',
      zh: '绳状熔岩流与海狗石窟'
    },
    icon: '🪨',
    count: 1
  }
];

export const GALAPAGOS_CATEGORIES: {
  id: GalapagosCategoryId;
  name: Record<string, string>;
  icon: string;
}[] = [
  {
    id: 'all',
    name: {
      es: 'Todas las Categorías',
      en: 'All Categories',
      fr: 'Toutes Catégories',
      de: 'Alle Kategorien',
      it: 'Tutte le Categorie',
      pt: 'Todas as Categorias',
      ja: 'すべてのカテゴリー',
      zh: '所有活动类别'
    },
    icon: '✨'
  },
  {
    id: 'marine-wildlife',
    name: {
      es: 'Fauna Marina & Terrestre',
      en: 'Marine & Terrestrial Wildlife',
      fr: 'Faune Marine & Terrestre',
      de: 'Meeres- & Landfauna',
      it: 'Fauna Marina e Terrestre',
      pt: 'Fauna Marinha e Terrestre',
      ja: '海洋・陸上野生生物',
      zh: '野生动植物探秘'
    },
    icon: '🐢'
  },
  {
    id: 'volcanic-hiking',
    name: {
      es: 'Senderismo Volcánico & Geología',
      en: 'Volcanic Hiking & Geology',
      fr: 'Randonnée Volcanique & Géologie',
      de: 'Vulkanwandern & Geologie',
      it: 'Trekking Vulcanico e Geologia',
      pt: 'Trilhas Vulcânicas e Geologia',
      ja: '火山トレッキング＆地質探訪',
      zh: '火山地貌徒步探险'
    },
    icon: '🌋'
  },
  {
    id: 'snorkel-diving',
    name: {
      es: 'Snorkel & Buceo en Arrecifes',
      en: 'Snorkeling & Scuba Diving',
      fr: 'Snorkeling & Plongée sous-marine',
      de: 'Schnorcheln & Gerätetauchen',
      it: 'Snorkeling e Immersioni',
      pt: 'Snorkel e Mergulho Autônomo',
      ja: 'シュノーケリング＆スキューバダイビング',
      zh: '珊瑚礁浮潜与深潜'
    },
    icon: '🤿'
  },
  {
    id: 'history-conservation',
    name: {
      es: 'Historia, Darwin & Conservación',
      en: 'History, Darwin & Conservation',
      fr: 'Histoire, Darwin & Conservation',
      de: 'Geschichte, Darwin & Artenschutz',
      it: 'Storia, Darwin e Conservazione',
      pt: 'História, Darwin e Conservação',
      ja: 'ダーウィン歴史探訪＆自然保護',
      zh: '达尔文历史与生态保护'
    },
    icon: '🏛️'
  },
  {
    id: 'photography',
    name: {
      es: 'Fotografía de Paisajes & Naturaleza',
      en: 'Landscape & Nature Photography',
      fr: 'Photographie de Paysages & Nature',
      de: 'Landschafts- & Naturfotografie',
      it: 'Fotografia di Paesaggio e Natura',
      pt: 'Fotografia de Natureza e Paisagens',
      ja: 'ネイチャー＆絶景フォトグラフィー',
      zh: '自然人文与风光摄影'
    },
    icon: '📸'
  }
];

export const GALAPAGOS_SEASONS_INFO = {
  warm: {
    id: 'warm',
    months: [12, 1, 2, 3, 4, 5],
    name: {
      es: 'Temporada Cálida y Húmeda (Diciembre – Mayo)',
      en: 'Warm & Tropical Season (December – May)',
      fr: 'Saison Chaude et Humide (Décembre – Mai)',
      de: 'Warme & Tropische Saison (Dezember – Mai)',
      it: 'Stagione Calda e Umida (Dicembre – Maggio)',
      pt: 'Temporada Quente e Úmida (Dezembro – Maio)',
      ja: '温暖・熱帯シーズン（12月〜5月）',
      zh: '温暖湿润季（12月 – 5月）'
    },
    conditions: {
      es: 'Agua cálida (24-28°C), mar en calma y visibilidad cristalina. Lluvias tropicales breves y sol intenso.',
      en: 'Warm waters (24-28°C / 75-82°F), tranquil seas and crystalline visibility. Short tropical showers with brilliant sun.',
      fr: 'Eaux chaudes (24-28°C), mer calme et visibilité sous-marine cristalline. Soleil éclatant et averses courtes.',
      de: 'Warmes Wasser (24-28°C), ruhiges Meer und kristallklare Sicht. Kurze Tropenschauer und strahlende Sonne.',
      it: 'Acqua calda (24-28°C), mare calmo e visibilità cristallina. Brevi rovesci tropicali e sole splendente.',
      pt: 'Águas quentes (24-28°C), mar calmo e visibilidade cristalina. Breves chuvas tropicais e sol radiante.',
      ja: '水温24〜28℃、波が穏やかで最高の水中透明度。快晴と爽快なスコールが交互に訪れます。',
      zh: '海水温暖（24-28°C），风平浪静，能见度极高。午后偶有短暂阵雨，阳光充足灿烂。'
    },
    wildlifeHighlights: {
      es: 'Anidación masiva de tortugas marinas, iguanas marinas en brillantes colores nupciales y cortejo de piqueros.',
      en: 'Peak green sea turtle nesting, marine iguanas donning vivid breeding colors, and booby courtship dances.',
      fr: 'Ponte des tortues marines vertes, iguanes marins aux couleurs nuptiales éclatantes et parades de fous.',
      de: 'Nisten von Meeresschildkröten, Meerechsen in prächtigen Balzfarben und Tölpel-Balztänze.',
      it: 'Nidificazione delle tartarughe marine, iguane marine con vivaci livree nuziali e corteggiamento delle sule.',
      pt: 'Nidificação de tartarugas marinhas, iguanas marinhas em cores nupciais vivas e dança dos atobás.',
      ja: 'アオウミガメの産卵期、鮮やかな婚姻色に染まるウミイグアナ、カツオドリの求愛ダンス。',
      zh: '绿海龟繁殖产卵高峰期，海鬣蜥披上绚烂交配色彩，鲣鸟跳起标志性求爱舞。'
    }
  },
  cool: {
    id: 'cool',
    months: [6, 7, 8, 9, 10, 11],
    name: {
      es: 'Temporada Fresca y Seca / Garúa (Junio – Noviembre)',
      en: 'Cool & Nutritious Garúa Season (June – November)',
      fr: 'Saison Fraîche et Sèche / Garúa (Juin – Novembre)',
      de: 'Kühle & Trockene Garúa-Saison (Juni – November)',
      it: 'Stagione Fresca e Secca / Garúa (Giugno – Novembre)',
      pt: 'Temporada Fresca e Seca / Garúa (Junho – Novembro)',
      ja: '涼感・豊饒のガルア乾季（6月〜11月）',
      zh: '凉爽干燥季 / 加鲁亚雾季（6月 – 11月）'
    },
    conditions: {
      es: 'Corriente de Humboldt rica en plancton. Agua fresca (19-23°C), brisa marina y ligera garúa matinal en tierras altas.',
      en: 'Nutrient-rich Humboldt Current. Cooler waters (19-23°C / 66-73°F), invigorating ocean breezes and morning mist in highlands.',
      fr: 'Courant de Humboldt riche en nutriments. Eaux plus fraîches (19-23°C), brise marine vivifiante et brume garúa.',
      de: 'Nährstoffreicher Humboldt-Strom. Kühleres Wasser (19-23°C), frische Meeresbrisen und morgendlicher Garúa-Nebel.',
      it: 'Corrente di Humboldt ricca di nutrienti. Acque fresche (19-23°C), brezze marine e leggera nebbia garúa mattutina.',
      pt: 'Corrente de Humboldt rica em nutrientes. Águas frescas (19-23°C), brisas revigorantes e neblina garúa.',
      ja: '栄養豊富なフンボルト海流が流入。水温19〜23℃、高地に幻想的なガルア霧が発生し海中生態系が最も活性化。',
      zh: '秘鲁寒流带来丰富营养物。海水较凉（19-23°C），海风习习，高地晨间有轻柔雾气，海洋生物活性极高。'
    },
    wildlifeHighlights: {
      es: 'Época dorada de cetáceos y tiburón ballena, albatros anidando en Española, pingüinos y lobos marinos hiperactivos.',
      en: 'Prime season for humpback whales and whale sharks, waved albatross nesting on Espanola, hyperactive penguins and sea lions.',
      fr: 'Saison d\'or des baleines à bosse et requins-baleines, albatros aux Galápagos, manchots et otaries très actifs.',
      de: 'Hochsaison für Buckelwale und Walhaie, Albatrosse nisten auf Española, extrem aktive Pinguine und Seelöwen.',
      it: 'Periodo ideale per balene e squali balena, albatros a Española, pinguini e leoni marini iperattivi.',
      pt: 'Época de baleias jubarte e tubarões-baleia, albatrozes em Española, pinguins e leões-marinhos ativos.',
      ja: 'ザトウクジラやジンベエザメの遭遇期、エスパニョラ島のアホウドリ営巣、ペンギンやアシカの活発な狩り。',
      zh: '座头鲸与鲸鲨的黄金邂逅期，西班牙岛加拉帕戈斯信天翁筑巢繁殖，企鹅与海狮异常活跃捕食。'
    }
  }
};

export const MONTH_NAMES: { month: number; name: Record<string, string> }[] = [
  { month: 1, name: { es: 'Enero', en: 'January', fr: 'Janvier', de: 'Januar', it: 'Gennaio', pt: 'Janeiro', ja: '1月', zh: '1月' } },
  { month: 2, name: { es: 'Febrero', en: 'February', fr: 'Février', de: 'Februar', it: 'Febbraio', pt: 'Fevereiro', ja: '2月', zh: '2月' } },
  { month: 3, name: { es: 'Marzo', en: 'March', fr: 'Mars', de: 'März', it: 'Marzo', pt: 'Março', ja: '3月', zh: '3月' } },
  { month: 4, name: { es: 'Abril', en: 'April', fr: 'Avril', de: 'April', it: 'Aprile', pt: 'Abril', ja: '4月', zh: '4月' } },
  { month: 5, name: { es: 'Mayo', en: 'May', fr: 'Mai', de: 'Mai', it: 'Maggio', pt: 'Maio', ja: '5月', zh: '5月' } },
  { month: 6, name: { es: 'Junio', en: 'June', fr: 'Juin', de: 'Juni', it: 'Giugno', pt: 'Junho', ja: '6月', zh: '6月' } },
  { month: 7, name: { es: 'Julio', en: 'July', fr: 'Juillet', de: 'Juli', it: 'Luglio', pt: 'Julho', ja: '7月', zh: '7月' } },
  { month: 8, name: { es: 'Agosto', en: 'August', fr: 'Août', de: 'August', it: 'Agosto', pt: 'Agosto', ja: '8月', zh: '8月' } },
  { month: 9, name: { es: 'Septiembre', en: 'September', fr: 'Septembre', de: 'September', it: 'Settembre', pt: 'Setembro', ja: '9月', zh: '9月' } },
  { month: 10, name: { es: 'Octubre', en: 'October', fr: 'Octobre', de: 'Oktober', it: 'Ottobre', pt: 'Outubro', ja: '10月', zh: '10月' } },
  { month: 11, name: { es: 'Noviembre', en: 'November', fr: 'Novembre', de: 'November', it: 'Novembre', pt: 'Novembro', ja: '11月', zh: '11月' } },
  { month: 12, name: { es: 'Diciembre', en: 'December', fr: 'Décembre', de: 'Dezember', it: 'Dicembre', pt: 'Dezembro', ja: '12月', zh: '12月' } }
];

export const ICONIC_GALAPAGOS_ACTIVITY_IDS: string[] = [
  "pz-deep-snorkel",
  "is-tintoreras-islet",
  "sc-tortoises-highlands",
  "sc-las-grietas",
  "is-sierra-negra-volcano",
  "sc-la-loberia",
  "sn-frigatebirds-boobies",
  "sc-kicker-rock-leon-dormido"
];

export const GALAPAGOS_ACTIVITIES: GalapagosActivity[] = [
  {
    "id": "sc-tortoises-highlands",
    "isIconic": true,
    "name": {
      "es": "Encuentro con Tortugas Gigantes en Estado Silvestre (Rancho Primicias / El Chato)",
      "en": "Wild Giant Tortoise Sanctuary (Primicias / El Chato Ranch)",
      "fr": "Sanctuaire de Tortues Géantes Sauvages (Rancho Primicias / El Chato)",
      "de": "Wildlebende Riesenschildkröten (Rancho Primicias / El Chato)",
      "it": "Santuario delle Tartarughe Giganti Selvatiche (Rancho Primicias / El Chato)",
      "pt": "Santuário de Tartarugas Gigantes Selvagens (Rancho Primicias / El Chato)",
      "ja": "野生ゾウガメの聖域探訪（プリミシアス／エル・チャト牧場）",
      "zh": "高地野生巨龟生态保护区（普里米西亚 / 埃尔查托庄园）"
    },
    "shortDescription": {
      "es": "Camina a pocos metros de las legendarias tortugas gigantes de Galápagos en su hábitat natural entre praderas y bosques de niebla.",
      "en": "Walk alongside iconic Galapagos giant tortoises in their natural highland sanctuary amidst lush meadows and cloud forests.",
      "fr": "Marchez aux côtés des légendaires tortues géantes des Galápagos dans leur sanctuaire naturel de brume et de prairies.",
      "de": "Spazieren Sie neben den legendären Galapagos-Riesenschildkröten in ihrem natürlichen Lebensraum im Hochland.",
      "it": "Cammina accanto alle leggendarie tartarughe giganti delle Galapagos nel loro santuario naturale sulle alture.",
      "pt": "Caminhe ao lado das lendárias tartarugas gigantes de Galápagos em seu santuário natural nas terras altas.",
      "ja": "サンタクルス島高地の緑豊かな草原で、悠久の時を生きる野生の巨大ゾウガメを間近で観察。",
      "zh": "在圣克鲁斯高地郁郁葱葱的草甸与云雾林中，近距离步入标志性野生加拉帕戈斯巨龟的自然家园。"
    },
    "description": {
      "es": "Ascenso a las tierras altas de Santa Cruz para adentrarse en una reserva privada donde cientos de tortugas gigantes de Galápagos (Chelonoidis porteri) se alimentan y descansan en lagunas naturales de lodo. Incluye exploración guiada de imponentes tubos de lava volcánica subterráneos.",
      "en": "Ascend to the Santa Cruz highlands to enter a private ecological reserve where hundreds of Galapagos giant tortoises (Chelonoidis porteri) roam freely, grazing in meadows and wallowing in natural mud ponds. Includes walking through massive underground volcanic lava tunnels.",
      "fr": "Montée vers les hauts plateaux de Santa Cruz pour explorer une réserve naturelle privée où des centaines de tortues géantes vivent en liberté. Visite également de gigantesques tunnels de lave volcanique sous terre.",
      "de": "Aufstieg ins Hochland von Santa Cruz zu einem privaten Schutzgebiet, wo Hunderte von Riesenschildkröten frei weiden. Beinhaltet auch die Erkundung riesiger unterirdischer Lavatunnel.",
      "it": "Salita alle alture di Santa Cruz per entrare in una riserva privata dove centinaia di tartarughe giganti vivono libere. Include l'esplorazione di enormi tunnel di lava sotterranei.",
      "pt": "Subida às terras altas de Santa Cruz em uma reserva ecológica privada onde centenas de tartarugas gigantes circulam livres. Inclui travessia por imponentes túneis de lava subterrâneos.",
      "ja": "標高の高いサンタクルス島内陸部へ向かい、数百頭の野生ゾウガメが暮らす私設保護区を探訪。自然の泥池で水浴びする姿や、巨大な地下溶岩トンネルのウォーキングも楽しめます。",
      "zh": "驱车前往圣克鲁斯高地私人生态保护区，见证数百只加拉帕戈斯巨龟在草甸觅食、泥塘浸浴的壮丽画面。行程还包含穿越巨大的地下火山熔岩隧道。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year",
      "cool"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Visible todo el año. Entre junio y diciembre las tortugas migran masivamente a las partes altas en busca de vegetación fresca.",
      "en": "Observable year-round. Between June and December tortoises migrate in huge numbers to the highland slopes for lush forage.",
      "fr": "Visible toute l'année. Entre juin et décembre, les tortues migrent vers les hauteurs à la recherche de végétation fraîche.",
      "de": "Ganzjährig sichtbar. Zwischen Juni und Dezember wandern die Schildkröten massenhaft ins Hochland für frisches Futter.",
      "it": "Visibile tutto l'anno. Da giugno a dicembre le tartarughe migrano verso le alture ricche di vegetazione.",
      "pt": "Visível o ano todo. Entre junho e dezembro as tartarugas migram para as terras altas em busca de vegetação fresca.",
      "ja": "年間を通じて観察可能。特に6月から12月は新鮮な草を求めて高地へ大移動するため、最も多くの個体に出会えます。",
      "zh": "全年皆可观赏。每年6月至12月期间，巨龟会成群结队迁徙至高地山坡觅食丰美的水草。"
    },
    "includedInTourIds": [
      "galapagos-6days",
      "galapagos-7days",
      "galapagos-8days",
      "ecuador-galapagos-11days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Caminata ligera)",
      "en": "Easy (Gentle walk)",
      "fr": "Facile (Marche légère)",
      "de": "Leicht (Sanfte Wanderung)",
      "it": "Facile (Camminata leggera)",
      "pt": "Fácil (Caminhada leve)",
      "ja": "初級（軽快な散策）",
      "zh": "轻松（平缓漫步）"
    },
    "duration": {
      "es": "Medio Día (3-4 horas)",
      "en": "Half Day (3-4 hours)",
      "fr": "Demi-journée (3-4h)",
      "de": "Halber Tag (3-4 Std.)",
      "it": "Mezza Giornata (3-4 ore)",
      "pt": "Meio Dia (3-4 horas)",
      "ja": "半日（約3〜4時間）",
      "zh": "半天（约3-4小时）"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-giant-tortoise-grazing-santa-cruz.webp",
    "keyWildlife": [
      {
        "es": "Tortuga Gigante de Galápagos (Chelonoidis porteri)",
        "en": "Galapagos Giant Tortoise",
        "fr": "Tortue géante des Galápagos",
        "de": "Galapagos-Riesenschildkröte",
        "it": "Tartaruga gigante delle Galapagos",
        "pt": "Tartaruga-gigante-de-galápagos",
        "ja": "ガラパゴスゾウガメ",
        "zh": "加拉帕戈斯象龟"
      },
      {
        "es": "Pinzón de Darwin",
        "en": "Darwin's Finch",
        "fr": "Pinson de Darwin",
        "de": "Darwinfink",
        "it": "Fringuello di Darwin",
        "pt": "Tentilhão de Darwin",
        "ja": "ダーウィンフィンチ",
        "zh": "达尔文雀"
      },
      {
        "es": "Pájaro Brujo (Mosquero de Galápagos)",
        "en": "Vermilion Flycatcher",
        "fr": "Moucherolle vermillon",
        "de": "Rubintyrann",
        "it": "Pigliamosche vermiglio",
        "pt": "Papa-moscas-rubro",
        "ja": "ムクドリヒタキ",
        "zh": "朱红霸鹟"
      }
    ],
    "highlights": [
      {
        "es": "Contacto cercano y respetuoso con tortugas de más de 200 kg",
        "en": "Close encounters with iconic tortoises exceeding 450 lbs",
        "fr": "Rencontre avec des tortues de plus de 200 kg",
        "de": "Begegnung mit über 200 kg schweren Schildkröten",
        "it": "Incontro ravvicinato con tartarughe di oltre 200 kg",
        "pt": "Encontro próximo com tartarugas de mais de 200 kg",
        "ja": "体重200kgを超える巨亀との出会い",
        "zh": "近距离仰望重达200公斤以上的百年巨龟"
      },
      {
        "es": "Travesía por túneles de lava volcánica natural",
        "en": "Walkthrough inside illuminated ancient volcanic lava tubes",
        "fr": "Traversée de tunnels de lave volcanique",
        "de": "Gang durch natürliche Lavatunnel",
        "it": "Attraversamento di tunnel di lava naturale",
        "pt": "Travessia por túneis de lava vulcânica natural",
        "ja": "天然の巨大火山溶岩洞窟ウォーク",
        "zh": "穿越壮观的天然地下火山熔岩管道"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en todos los tours base de Vermilion. Opcional en traslados privados.",
      "en": "Included in all Vermilion base tours. Optional add-on on private transfers.",
      "fr": "Inclus dans tous les circuits de base Vermilion.",
      "de": "In allen Basistouren von Vermilion enthalten.",
      "it": "Incluso in tutti i tour base di Vermilion.",
      "pt": "Incluído em todos os tours base de Vermilion.",
      "ja": "Vermilion Routesのすべてのガラパゴスツアーに標準搭載。",
      "zh": "已包含在 Vermilion 所有的加拉帕戈斯基础行程中。"
    }
  },
  {
    "id": "sc-los-gemelos",
    "name": {
      "es": "Cráteres Gemelos y Bosque de Scalesia",
      "en": "Twin Craters & Endemic Scalesia Cloud Forest",
      "fr": "Cratères Jumeaux et Forêt de Scalesia",
      "de": "Zwillingskrater & Scalesia-Nebelwald",
      "it": "Crateri Gemelli e Foresta di Scalesia",
      "pt": "Crateras Gêmeas e Floresta de Scalesia",
      "ja": "双子坑（ロス・ヘメロス）＆固有スカレシア雲霧林",
      "zh": "双子坑与特有云雾鳞片树林"
    },
    "shortDescription": {
      "es": "Dos inmensas calderas de colapso volcánico rodeadas de un bosque nuboso de Scalesia repleto de aves endémicas.",
      "en": "Two colossal volcanic sinkholes enclosed by a surreal cloud forest of Scalesia trees alive with endemic land birds.",
      "fr": "Deux immenses cratères d'effondrement volcanique entourés d'une forêt de Scalesia peuplée d'oiseaux rares.",
      "de": "Zwei monumentale Einsturzkrater, umgeben von einem Nebelwald endemischer Scalesia-Bäume voller Vogelarten.",
      "it": "Due enormi caldere vulcaniche circondate da una foresta di Scalesia ricca di uccelli endemici.",
      "pt": "Duas imensas caldeiras vulcânicas cercadas por uma floresta de Scalesia repleta de aves endêmicas.",
      "ja": "火山性陥没によって生まれた2つの巨大クレーターと、苔むした固有種スカレシアの幻想的な森を散策。",
      "zh": "两处由地下熔岩腔塌陷形成的巨型火山口凹陷，环绕着栖息众多特有鸟类的热带云雾树林。"
    },
    "description": {
      "es": "Ubicados en la parte más alta de la carretera de Santa Cruz, Los Gemelos no son cráteres volcánicos reales de erupción, sino cámaras magmáticas vaciadas que colapsaron. El microclima húmedo sostiene un bosque endémico de Scalesia pedunculata cubierto de bromelias, orquídeas y musgos, hábitat ideal del pinzón carpintero y el papamoscas bermellón.",
      "en": "Perched at the highest ridge of Santa Cruz, Los Gemelos are dramatic collapse craters formed when empty subterranean magma chambers caved in. The humid microclimate nourishes an ancient forest of Scalesia pedunculata draped with mosses, home to the elusive Woodpecker Finch and Vermilion Flycatcher.",
      "fr": "Situés sur les crêtes de Santa Cruz, Los Gemelos sont d'impressionnants cratères d'effondrement abritant une forêt de Scalesia avec une riche avifaune.",
      "de": "Auf dem höchsten Punkt von Santa Cruz gelegen, sind Los Gemelos atemberaubende Einsturzkrater, umgeben von einem üppigen Scalesia-Wald.",
      "it": "Situati sul crinale più alto di Santa Cruz, Los Gemelos sono spettacolari crateri da sprofondamento circondati da foreste umide.",
      "pt": "Localizados no ponto mais alto de Santa Cruz, Los Gemelos são impressionantes crateras de colapso vulcânico rodeadas por floresta de Scalesia.",
      "ja": "サンタクルス島の最高峰尾根に位置し、地下マグマ溜まりの陥没により形成された壮大な双子クレーター。固有のキツツキフィンチのさえずりが響きます。",
      "zh": "双子坑位于圣克鲁斯岛最高山脊处，由地下岩浆房排空坍塌形成。湿润微气候孕育了稀有的鳞片树林，是啄木雀等达尔文雀的理想栖息地。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "volcanic-hiking",
    "categoryName": {
      "es": "Senderismo Volcánico & Geología",
      "en": "Volcanic Hiking & Geology",
      "fr": "Randonnée Volcanique & Géologie",
      "de": "Vulkanwandern & Geologie",
      "it": "Trekking Vulcanico e Geologia",
      "pt": "Trilhas Vulcânicas e Geologia",
      "ja": "火山トレッキング＆地質探訪",
      "zh": "火山地貌徒步探险"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Impresionante en cualquier mes; de junio a noviembre suele haber niebla misteriosa (garúa) que dota al bosque de una atmósfera mística.",
      "en": "Remarkable year-round; the June-November garua mist lends the moss-draped forest an ethereal, prehistoric aura.",
      "fr": "Remarquable toute l'année, particulièrement mystique avec la brume garúa de juin à novembre.",
      "de": "Ganzjährig faszinierend; zwischen Juni und November verleiht der Garúa-Nebel dem Wald eine mystische Stimmung.",
      "it": "Spettacolare tutto l'anno; tra giugno e novembre la nebbia garúa crea un'atmosfera mistica.",
      "pt": "Espetacular o ano todo; de junho a novembro a neblina garúa cria um clima místico.",
      "ja": "通年見学可能。6月〜11月のガルア霧に包まれる時期は、まるで太古の地球に迷い込んだかのような神秘的な絶景に。",
      "zh": "全年可游览。6月至11月的雾季赋予高地树林神秘悠远的史前仙境氛围。"
    },
    "includedInTourIds": [
      "galapagos-6days",
      "galapagos-7days",
      "galapagos-8days",
      "ecuador-galapagos-11days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Caminata ligera)",
      "en": "Easy (Gentle walk)",
      "fr": "Facile",
      "de": "Leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（軽快な散策）",
      "zh": "轻松（平缓漫步）"
    },
    "duration": {
      "es": "1.5 horas",
      "en": "1.5 hours",
      "fr": "1h30",
      "de": "1,5 Std.",
      "it": "1.5 ore",
      "pt": "1,5 horas",
      "ja": "約1.5時間",
      "zh": "约1.5小时"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-panoramic-view-los-gemelos-craters.webp",
    "keyWildlife": [
      {
        "es": "Pinzón Carpintero (Camarhynchus pallidus)",
        "en": "Woodpecker Finch",
        "fr": "Pinson pique-bois",
        "de": "Spechtfink",
        "it": "Fringuello carpentiere",
        "pt": "Tentilhão-pica-pau",
        "ja": "キツツキフィンチ",
        "zh": "啄木雀"
      },
      {
        "es": "Scalesia pedunculata (Árbol endémico)",
        "en": "Scalesia Tree",
        "fr": "Arbre Scalesia",
        "de": "Scalesia-Baum",
        "it": "Albero di Scalesia",
        "pt": "Árvore de Scalesia",
        "ja": "スカレシア（固有キク科高木）",
        "zh": "鳞片树（加拉帕戈斯特有）"
      }
    ],
    "highlights": [
      {
        "es": "Vistas vertiginosas al fondo de las calderas de colapso",
        "en": "Breathtaking viewpoints looking down into steep volcanic chasms",
        "fr": "Points de vue vertigineux sur les caldeiras",
        "de": "Schwindelerregende Blicke in die Vulkanschluchten",
        "it": "Viste mozzafiato sul fondo dei crateri",
        "pt": "Vistas vertiginosas para o fundo das crateras",
        "ja": "深さ数十メートルの火口底を見下ろす絶景展望台",
        "zh": "俯瞰数十米深陷落火山口的壮观观景台"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en todos los tours base de Vermilion.",
      "en": "Included in all Vermilion base tours.",
      "fr": "Inclus dans tous les circuits de base.",
      "de": "In allen Basistouren enthalten.",
      "it": "Incluso in tutti i tour base.",
      "pt": "Incluído em todos os tours base.",
      "ja": "全ツアーに標準搭載。",
      "zh": "已包含在所有基础行程中。"
    }
  },
  {
    "id": "sc-las-grietas",
    "isIconic": true,
    "name": {
      "es": "Snorkel en el Cañón Volcánico de Las Grietas",
      "en": "Las Grietas Volcanic Canyon Snorkeling",
      "fr": "Snorkeling dans le Canyon Volcanique de Las Grietas",
      "de": "Schnorcheln in der Vulkanschlucht Las Grietas",
      "it": "Snorkeling nel Canyon Vulcanico di Las Grietas",
      "pt": "Snorkel no Cânion Vulcânico de Las Grietas",
      "ja": "ラス・グリエタス火山峡谷スノーケリング",
      "zh": "拉斯格里塔斯火山峡谷晶莹浮潜"
    },
    "shortDescription": {
      "es": "Nada y haz snorkel en una fisura de lava natural con aguas salobres color esmeralda ultra cristalinas entre imponentes paredes de basalto.",
      "en": "Swim and snorkel inside a dramatic geological fissure flanked by towering basalt walls with crystal-clear emerald brackish waters.",
      "fr": "Nagez et faites du snorkeling dans une fissure volcanique d'eaux émeraude entre de hautes parois de basalte.",
      "de": "Schwimmen und schnorcheln Sie in einer dramatischen Basaltschlucht mit kristallklarem smaragdgrünem Wasser.",
      "it": "Nuota e fai snorkeling in una spettacolare fessura basaltica con acque smeraldine trasparenti.",
      "pt": "Nade e faça snorkel em uma fenda vulcânica de águas esmeraldas límpidas entre paredes de basalto.",
      "ja": "そびえ立つ黒曜玄武岩の岩壁に挟まれた、エメラルドグリーンに輝く天然の汽水プールで透明度抜群のスノーケリング。",
      "zh": "在被高耸玄武岩绝壁环抱的天然火山熔岩裂隙中畅游，体验极高能见度的翡翠色晶莹水域。"
    },
    "description": {
      "es": "Caminata escénica desde el muelle de Puerto Ayora cruzando salinas históricas y bosques de cactus gigantes Opuntia hasta alcanzar Las Grietas: una profunda fractura tectónica donde el agua dulce subterránea se mezcla con el océano Pacífico. Su visibilidad subacuática supera los 20 metros, permitiendo avistar grandes peces loro y peces damisela.",
      "en": "Scenic walk from Puerto Ayora past historic salt mines and towering Opuntia cactus forests to reach Las Grietas: a sheer tectonic fracture where subterranean freshwater meets filtered seawater. Underwater visibility exceeds 65 feet, revealing large parrotfish and damselfish swimming through vertical rock crevices.",
      "fr": "Randonnée depuis Puerto Ayora le long des salines et des cactus Opuntia jusqu'à Las Grietas, une faille tectonique remarquable aux eaux ultra-claires.",
      "de": "Wanderung ab Puerto Ayora vorbei an Salzpfannen und Riesenkakteen zu Las Grietas: einer tektonischen Spalte mit mehr als 20 m Sicht unter Wasser.",
      "it": "Camminata panoramica da Puerto Ayora attraverso saline e cactus fino a Las Grietas, fessura tettonica con visibilità subacquea straordinaria.",
      "pt": "Caminhada panorâmica de Puerto Ayora passando por salinas e cactos gigantes até Las Grietas, com visibilidade subaquática superior a 20 metros.",
      "ja": "プエルト・アヨラからウチワサボテンの森と歴史ある塩田を通り、雄大な玄武岩の裂け目「ラス・グリエタス」へ。透き通る水中に生息するブダイやスズメダイを観察。",
      "zh": "从阿约拉港码头步行穿过巨型仙人掌森林和古老盐田，抵达裂谷般的“拉斯格里塔斯”。水下能见度达20米以上，大型鹦嘴鱼游弋于嶙峋岩壁之间。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year",
      "warm"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De diciembre a mayo las aguas son más cálidas (24-26°C); de junio a noviembre se recomienda traje de neopreno para mayor confort.",
      "en": "From December to May waters are blissfully warm (75-79°F); from June to November a light wetsuit ensures peak comfort.",
      "fr": "De décembre à mai les eaux sont plus chaudes ; combinaison conseillée de juin à novembre.",
      "de": "Dezember bis Mai bietet wärmeres Wasser (24-26°C); Juni bis November wird ein Neoprenanzug empfohlen.",
      "it": "Da dicembre a maggio le acque sono più calde; consigliata la muta da giugno a novembre.",
      "pt": "De dezembro a maio as águas são mais quentes; de junho a novembro recomenda-se roupa de neoprene.",
      "ja": "12月〜5月は水温24〜26℃と温かく快適。6月〜11月はウェットスーツの着用がおすすめです。",
      "zh": "12月至次年5月水温适宜温暖（24-26°C）；6月至11月期间建议穿戴湿式潜水服以保持体感舒适。"
    },
    "includedInTourIds": [
      "galapagos-6days",
      "galapagos-7days",
      "galapagos-8days",
      "ecuador-galapagos-11days"
    ],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Caminata sobre rocas + nado)",
      "en": "Moderate (Rock trail + swimming)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（岩場歩行＋遊泳）",
      "zh": "中等（岩石路段步道与游泳）"
    },
    "duration": {
      "es": "Medio Día (3 horas)",
      "en": "Half Day (3 hours)",
      "fr": "Demi-journée (3h)",
      "de": "Halber Tag (3 Std.)",
      "it": "Mezza Giornata (3 ore)",
      "pt": "Meio Dia (3 horas)",
      "ja": "約3時間",
      "zh": "约3小时"
    },
    "imageUrl": "/images/tours/16-9/galapagos-las-grietas-16-9.webp",
    "keyWildlife": [
      {
        "es": "Pez Loro Azul (Scarus ghobban)",
        "en": "Blue Parrotfish",
        "fr": "Poisson-perroquet bleu",
        "de": "Blauer Papageifisch",
        "it": "Pesce pappagallo blu",
        "pt": "Peixe-papagaio-azul",
        "ja": "アオブダイ",
        "zh": "蓝鹦嘴鱼"
      },
      {
        "es": "Cactus Opuntia Gigante",
        "en": "Giant Opuntia Cactus",
        "fr": "Cactus Opuntia géant",
        "de": "Riesen-Opuntienkaktus",
        "it": "Cactus Opuntia gigante",
        "pt": "Cacto Opuntia gigante",
        "ja": "ウチワサボテン（樹高数メートル）",
        "zh": "巨型仙人掌树"
      }
    ],
    "highlights": [
      {
        "es": "Nado refrescante en aguas translúcidas protegidas de corrientes oceánicas",
        "en": "Pristine swim sheltered completely from heavy open ocean swells",
        "fr": "Baignade rafraîchissante dans des eaux calmes protégées",
        "de": "Schwimmen in geschütztem, glasklarem Wasser",
        "it": "Nuoto rigenerante in acque limpide e calme",
        "pt": "Banho revigorante em águas calmas e translúcidas",
        "ja": "波のない静穏なエメラルドグリーンの水面でリフレッシュ",
        "zh": "在不受外海风浪侵扰的平静通透水面中惬意畅游"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en tours base de 6, 7 y 8 días.",
      "en": "Included in 6, 7 and 8-day base tours.",
      "fr": "Inclus dans les circuits de 6, 7 et 8 jours.",
      "de": "In 6-, 7- und 8-Tage Touren enthalten.",
      "it": "Incluso nei tour di 6, 7 e 8 giorni.",
      "pt": "Incluído nos tours de 6, 7 e 8 dias.",
      "ja": "6日、7日、8日間のベースツアーに標準搭載。",
      "zh": "已包含在6日、7日及8日基础探险行程中。"
    }
  },
  {
    "id": "sc-charles-darwin-station",
    "name": {
      "es": "Estación Científica Charles Darwin y Centro Fausto Llerena",
      "en": "Charles Darwin Research Station & Fausto Llerena Breeding Center",
      "fr": "Station de Recherche Charles Darwin & Centre Fausto Llerena",
      "de": "Charles Darwin Forschungsstation & Zuchtzentrum Fausto Llerena",
      "it": "Stazione Scientifica Charles Darwin e Centro Fausto Llerena",
      "pt": "Estação Científica Charles Darwin e Centro Fausto Llerena",
      "ja": "チャールズ・ダーウィン研究所＆ファウスト・ジェレナ繁殖センター",
      "zh": "查尔斯·达尔文科学研究所与法斯托·列雷纳繁育中心"
    },
    "shortDescription": {
      "es": "Descubre los programas de conservación que salvaron a las tortugas gigantes de la extinción y conoce la historia del Solitario George.",
      "en": "Learn how international science and park rangers rescued giant tortoises from extinction and visit the legacy of Lonesome George.",
      "fr": "Découvrez comment la science et les gardes ont sauvé les tortues géantes et visitez le mémorial de George le Solitaire.",
      "de": "Erfahren Sie, wie Ranger und Wissenschaftler die Riesenschildkröten retteten, und besuchen Sie Lonesome George.",
      "it": "Scopri i programmi scientifici che hanno salvato le tartarughe giganti e la storia del Solitario George.",
      "pt": "Conheça os programas de conservação que salvaram as tartarugas gigantes e a história do Solitário George.",
      "ja": "絶滅の危機を乗り越えたゾウガメの保全繁殖現場を見学。伝説の「孤独なジョージ」の記念館を訪ねます。",
      "zh": "深入了解拯救加拉帕戈斯巨龟脱离灭绝险境的国际科研育繁成果，瞻仰传奇“孤独乔治”生前展厅。"
    },
    "description": {
      "es": "Visita guiada por el epicentro de la investigación científica del archipiélago en Puerto Ayora. Conoce las incubadoras solares donde eclosionan las crías de tortuga de diversas islas, los corrales de gigantes adultos y la sala climatizada que preserva el cuerpo del Solitario George, el último espécimen de la Isla Pinta.",
      "en": "Guided walk through the scientific heartbeat of Galapagos in Puerto Ayora. Observe solar incubators hatching baby tortoises from different islands, adult breeding corrals, and the state-of-the-art climate-controlled memorial preserving Lonesome George, the last giant tortoise of Pinta Island.",
      "fr": "Visite guidée du centre scientifique à Puerto Ayora avec écloseries de bébés tortues et hommage à George le Solitaire.",
      "de": "Führung durch das wissenschaftliche Zentrum in Puerto Ayora mit Brutstationen für Jungschildkröten und Lonesome George.",
      "it": "Visita guidata del centro scientifico a Puerto Ayora con incubatrici di baby tartarughe e memoriale del Solitario George.",
      "pt": "Visita guiada pelo centro de pesquisas em Puerto Ayora com incubadoras de filhotes e memorial do Solitário George.",
      "ja": "プエルト・アヨラにあるガラパゴス保全研究の中枢を訪問。各島の孵化器で育つ愛らしい子亀や、ピンタ島最後の生き残り「孤独なジョージ」の剥製展示を見学。",
      "zh": "由专业向导带领参访阿约拉港科研核心区。观察来自各岛孵化器中的幼龟培育箱、成年巨龟围栏，以及完整保存的“孤独乔治”恒温纪念馆。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "history-conservation",
    "categoryName": {
      "es": "Historia, Darwin & Conservación",
      "en": "History, Darwin & Conservation",
      "fr": "Histoire, Darwin & Conservation",
      "de": "Geschichte, Darwin & Artenschutz",
      "it": "Storia, Darwin e Conservazione",
      "pt": "História, Darwin e Conservação",
      "ja": "ダーウィン歴史探訪＆自然保護",
      "zh": "达尔文历史与生态保护"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Abierto los 365 días del año con condiciones controladas y senderos pavimentados accesibles.",
      "en": "Open 365 days a year with accessible paved interpretive trails and shade canopies.",
      "fr": "Ouvert 365 jours par an avec sentiers aménagés faciles.",
      "de": "Ganzjährig geöffnet mit barrierefreien Lehrpfaden.",
      "it": "Aperto 365 giorni l'anno con sentieri facili e accessibili.",
      "pt": "Aberto 365 dias por ano com passarelas acessíveis.",
      "ja": "年中無休。平坦に整備された木道や解説パネルがあり、快適に見学できます。",
      "zh": "全年365天开放，设有平缓无障碍步道与多语言科学解说指示。"
    },
    "includedInTourIds": [
      "galapagos-6days",
      "galapagos-7days",
      "galapagos-8days",
      "ecuador-galapagos-11days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Apto para todas las edades)",
      "en": "Easy (All ages welcome)",
      "fr": "Facile (Tous âges)",
      "de": "Sehr leicht (Für alle Altersgruppen)",
      "it": "Facile (Per tutti)",
      "pt": "Fácil (Para todas as idades)",
      "ja": "初級（お子様からシニアまで安心）",
      "zh": "轻松（全年龄段适宜）"
    },
    "duration": {
      "es": "2 horas",
      "en": "2 hours",
      "fr": "2 heures",
      "de": "2 Std.",
      "it": "2 ore",
      "pt": "2 horas",
      "ja": "約2時間",
      "zh": "约2小时"
    },
    "imageUrl": "/images/tours/16-9/galapagos-tortuga-gigante-rostro-16-9.webp",
    "keyWildlife": [
      {
        "es": "Crías de Tortuga Gigante en Incubadora",
        "en": "Hatchling Giant Tortoises",
        "fr": "Bébés tortues géantes",
        "de": "Schildkröten-Schlüpflinge",
        "it": "Piccole tartarughe giganti",
        "pt": "Filhotes de tartaruga gigante",
        "ja": "孵化したばかりのゾウガメの赤ちゃん",
        "zh": "刚刚破壳出生的巨龟幼苗"
      },
      {
        "es": "Iguana Terrestre de Galápagos (Conolophus subcristatus)",
        "en": "Galapagos Land Iguana",
        "fr": "Iguane terrestre des Galápagos",
        "de": "Drüsenkopf-Landleguan",
        "it": "Iguana terrestre delle Galapagos",
        "pt": "Iguana-terrestre-de-galápagos",
        "ja": "ガラパゴスリクイグアナ",
        "zh": "加拉帕戈斯陆鬣蜥"
      }
    ],
    "highlights": [
      {
        "es": "Visita a la cámara memorial del Solitario George",
        "en": "Honoring Lonesome George in his dedicated bioclimatic hall",
        "fr": "Visite de la salle de George le Solitaire",
        "de": "Besuch im Memorialsaal von Lonesome George",
        "it": "Visita alla sala memoriale del Solitario George",
        "pt": "Visita ao memorial do Solitário George",
        "ja": "伝説の「孤独なジョージ」記念ホール見学",
        "zh": "瞻仰举世闻名的“孤独乔治”生态展室"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en todos los tours base de Vermilion.",
      "en": "Included in all base tours.",
      "fr": "Inclus dans tous les circuits de base.",
      "de": "In allen Basistouren enthalten.",
      "it": "Incluso in tutti i tour.",
      "pt": "Incluído em todos os tours.",
      "ja": "全ツアーに標準搭載。",
      "zh": "已包含在所有基础行程中。"
    }
  },
  {
    "id": "sc-tortuga-bay-kayak",
    "name": {
      "es": "Kayak en Bahía Tortuga (Playa Mansa) y Santuario de Iguanas",
      "en": "Tortuga Bay Kayaking & Marine Iguana Sanctuary",
      "fr": "Kayak à Tortuga Bay et Sanctuaire d'Iguanes Marins",
      "de": "Tortuga Bay Seekajak & Meerechsen-Schutzgebiet",
      "it": "Kayak a Tortuga Bay e Santuario delle Iguane Marine",
      "pt": "Caiaque em Tortuga Bay e Santuário de Iguanas Marinhas",
      "ja": "トルトゥーガ・ベイのカヤック探検＆ウミイグアナの聖域",
      "zh": "托尔图加湾轻艇皮筏与海鬣蜥保护区"
    },
    "shortDescription": {
      "es": "Rema en aguas calmas rodeado de manglares, tiburones punta blanca y cientos de iguanas marinas tomando el sol en arena blanca.",
      "en": "Paddle tranquil lagoon waters framed by mangroves, baby reef sharks, and hundreds of marine iguanas basking on white coral powder sand.",
      "fr": "Naviguez en kayak dans une lagune d'eaux calmes parmi les mangroves, requins et iguanes marins.",
      "de": "Paddeln Sie durch ruhige Lagunen voller Mangroven, Riffhaie und hunderter sonnenbadender Meerechsen.",
      "it": "Pagaia in acque calme tra mangrovie, piccoli squali e centinaia di iguane marine rilassate sulla sabbia.",
      "pt": "Remada de caiaque em lagoas calmas cercadas por manguezais, tubarões e centenas de iguanas marinhas.",
      "ja": "眩しい白砂のビーチを抜け、マングローブの静穏な入江でシーカヤック。日向ぼっこするウミイグアナの群れを間近に観察。",
      "zh": "穿越一望无际的细白珊瑚沙滩，在平静如镜的红树林泻湖中划行皮划艇，与晒太阳的海鬣蜥和温顺礁鲨相遇。"
    },
    "description": {
      "es": "Una caminata empedrada de 2.5 km a través del bosque de cactus opuntia conduce a Tortuga Bay, catalogada entre las 10 playas más hermosas del planeta. Tras admirar las olas de Playa Brava y sus colonias de iguanas marinas, llegamos a Playa Mansa: una ensenada natural de aguas turquesas donde alquilamos kayaks para remar junto a tortugas marinas, mantarrayas y pelícanos pardos.",
      "en": "A scenic 1.5-mile trail through opuntia and candelabra cactus leads to Tortuga Bay, rated among the world’s top 10 most breathtaking beaches. After seeing massive marine iguana colonies along Playa Brava, reach Playa Mansa: an idyllic sheltered cove ideal for ocean kayaking beside green sea turtles, stingrays, and diving brown pelicans.",
      "fr": "Sentier pavé vers l'une des plus belles plages du monde, avec kayak paisible à Playa Mansa au milieu des raies et tortues.",
      "de": "Traumpfad zu einem der 10 schönsten Strände der Welt mit Kajakfahrten in der ruhigen Playa Mansa Bucht.",
      "it": "Cammino panoramico fino a Tortuga Bay, una delle spiagge più belle al mondo, per un'esperienza in kayak indimenticabile.",
      "pt": "Caminhada cênica até Tortuga Bay, com caiaque nas águas calmas da Playa Mansa ao lado de tartarugas e raias.",
      "ja": "世界のベストビーチ10選にも数えられるトルトゥーガ・ベイ。マングローブの入江でカヤックを漕ぎながら、アオウミガメやエイと出会う至福の時間。",
      "zh": "穿行于仙人掌林荫步道，前往被评为全球最美十大海滩之一的托尔图加湾。在无波澜的普拉亚曼萨泻湖中轻舟划行，与海龟及刺鳐伴游。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year",
      "warm"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De enero a abril es la época de eclosión y anidación de tortugas marinas negras en las dunas de vegetación costera.",
      "en": "From January to April, black sea turtles nest along the dunes, with tiny hatchlings emerging under starry skies.",
      "fr": "Période de ponte et d'éclosion des tortues marines de janvier à avril.",
      "de": "Januar bis April ist die Nist- und Schlupfzeit der Meeresschildkröten in den Küstendünen.",
      "it": "Da gennaio ad aprile è la stagione di nidificazione delle tartarughe marine nelle dune.",
      "pt": "De janeiro a abril é época de desova e eclosão de tartarugas marinhas nas dunas.",
      "ja": "1月〜4月はウミガメの産卵・孵化シーズン。夕暮れどきには砂浜で感動的な生命の営みが見られます。",
      "zh": "1月至4月是黑海龟在海岸沙丘筑巢产卵与幼龟破壳重返大海的黄金季节。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Caminata 45 min + Kayak)",
      "en": "Moderate (45 min walk + Kayak)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（徒歩45分＋カヤック）",
      "zh": "中等（徒步45分钟 + 皮划艇）"
    },
    "duration": {
      "es": "Medio Día o Día Completo (4-6 horas)",
      "en": "Half Day or Full Day (4-6 hours)",
      "fr": "4 à 6 heures",
      "de": "4 bis 6 Stunden",
      "it": "4-6 ore",
      "pt": "4 a 6 horas",
      "ja": "約4〜6時間",
      "zh": "约4-6小时"
    },
    "imageUrl": "/images/tours/16-9/galapagos-tortuga-bay-16-9.webp",
    "keyWildlife": [
      {
        "es": "Iguana Marina de Galápagos (Amblyrhynchus cristatus)",
        "en": "Galapagos Marine Iguana",
        "fr": "Iguane marin des Galápagos",
        "de": "Meerechse",
        "it": "Iguana marina delle Galapagos",
        "pt": "Iguana-marinha-de-galápagos",
        "ja": "ウミイグアナ",
        "zh": "加拉帕戈斯海鬣蜥"
      },
      {
        "es": "Tiburón Tintorera de Arrecife",
        "en": "White-tip Reef Shark",
        "fr": "Requin à pointes blanches",
        "de": "Weißspitzen-Riffhai",
        "it": "Squalo pinna bianca",
        "pt": "Tubarão-de-pontas-brancas",
        "ja": "ネムリブカ（ホワイトチップシャーク）",
        "zh": "白顶礁鲨"
      },
      {
        "es": "Pelícano Pardo de Galápagos",
        "en": "Brown Pelican",
        "fr": "Pélican brun",
        "de": "Braunpelikan",
        "it": "Pellicano bruno",
        "pt": "Pelicano-pardo",
        "ja": "カッショクペリカン",
        "zh": "褐鹈鹕"
      }
    ],
    "highlights": [
      {
        "es": "Remar en kayak transparente o doble sobre aguas turquesas transparentes",
        "en": "Paddling tandem kayaks over turquoise shallows teeming with marine life",
        "fr": "Kayak au-dessus des eaux turquoise transparentes",
        "de": "Kajakfahren in türkisfarbenem Wasser mit reicher Tierwelt",
        "it": "Kayak su fondali turchesi ricchi di vita marina",
        "pt": "Passeio de caiaque em águas azul-turquesa cristalinas",
        "ja": "透明なターコイズブルーの浅瀬を進む爽快なカヤック",
        "zh": "在清澈碧绿的海湾中划双人皮筏，俯瞰水下畅游的海洋生灵"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable. Excelente opción para días libres o tardes de descanso activo.",
      "en": "Customizable Add-On. Excellent option for leisure mornings or active recovery days.",
      "fr": "Activité optionnelle sur mesure. Parfaite pour une journée libre.",
      "de": "Individuelle Zusatzaktivität. Ideal für freie Vor- oder Nachmittage.",
      "it": "Attività addizionale su misura. Perfetta per i pomeriggi liberi.",
      "pt": "Atividade adicional cotável. Excelente para manhãs livres.",
      "ja": "追加カスタマイズ可能。自由行動日やリフレッシュに最適な人気アクティビティ。",
      "zh": "可选定制附加活动。非常适于自由活动日或下午的充实放松之选。"
    }
  },
  {
    "id": "sc-gordon-rocks-diving",
    "name": {
      "es": "Inmersión de Buceo Profundo en Gordon Rocks (El Lavadero de Martillos)",
      "en": "Gordon Rocks World-Class Scuba Diving (Hammerhead Apex)",
      "fr": "Plongée sous-marine à Gordon Rocks (Requins Marteaux)",
      "de": "Gordon Rocks Weltklasse-Tauchen (Hammerhai-Hauptstadt)",
      "it": "Immersione a Gordon Rocks (Capitale degli Squali Martello)",
      "pt": "Mergulho Profundo em Gordon Rocks (Tubarões-Martelo)",
      "ja": "ゴードンロックス 世界屈指のスキューバダイビング（シュモクザメの聖地）",
      "zh": "戈登岩世界级深潜（锤头鲨洗涤圣地）"
    },
    "shortDescription": {
      "es": "Sumérgete en el cráter sumergido más famoso de Galápagos para presenciar cardúmenes masivos de tiburones martillo y rayas águila.",
      "en": "Descend into the most iconic submerged volcanic cone in Galapagos to witness massive schools of scalloped hammerhead sharks.",
      "fr": "Plongez dans le mythique cratère sous-marin pour observer d'immenses bancs de requins marteaux et raies léopards.",
      "de": "Tauchen Sie in den berühmten versunkenen Vulkankrater, um riesige Schwärme von Bogenstirn-Hammerhaien zu erleben.",
      "it": "Immergiti nel cratere sommerso più celebre delle Galapagos tra branchi di squali martello e razze.",
      "pt": "Mergulhe no famoso vulcão submerso para ver cardumes imensos de tubarões-martelo e raias.",
      "ja": "外海に浮かぶ伝説のカルデラ岩礁へ。数十頭のシュモクザメ（ハンマーヘッド）の大群が渦巻く圧巻の海中世界。",
      "zh": "潜入加拉帕戈斯最富盛名的沉没火山口，亲眼见证成群结队如黑云压境般的双髻鲨群与雪花鸭嘴燕鳐。"
    },
    "description": {
      "es": "Gordon Rocks es un cono volcánico erosionado al este de Santa Cruz. Conocido como \"El Lavadero\", sus fuertes corrientes oceánicas atraen cardúmenes de más de 50 tiburones martillo (Sphyrna lewini), tiburones de Galápagos, mantas gigantes, tortugas carey y bancos de barracudas. Requiere certificación PADI Advanced Open Water y mínimo 25 inmersiones registradas.",
      "en": "Gordon Rocks is an eroded volcanic crater just northeast of Santa Cruz. Nicknamed \"The Washing Machine\" due to powerful current confluences, it attracts resident schools of 50+ scalloped hammerhead sharks, Galapagos sharks, spotted eagle rays, and pelagic barracudas. Requires PADI Advanced Open Water with 25+ logged ocean dives.",
      "fr": "Cratère volcanique sous-marin réputé mondialement pour ses bancs de requins marteaux. Niveau avancé requis.",
      "de": "Erodierter Vulkankrater, weltberühmt für Hammerhaischwärme. Fortgeschrittene Tauchzertifizierung erforderlich.",
      "it": "Famoso cono vulcanico eroso, meta top per sub esperti con squali martello. Richiesto brevetto avanzato.",
      "pt": "Cone vulcânico submerso famoso no mundo todo por cardumes de tubarões-martelo. Exige certificação avançada.",
      "ja": "サンタクルス島東にそびえる海中クレーター。強い海流に乗ってクリーニングステーションに集まる50頭超のハンマーヘッドシャークの群泳は息を呑む迫力。要アドバンス資格。",
      "zh": "位于圣克鲁斯东北海域的侵蚀火山口，绰号“洗衣机海流”。强大洋流汇聚吸引超50只双髻鲨群、加拉帕戈斯鲨及巨型蝠鲼。要求具有 PADI 进阶潜水员认证及25次以上潜水记录。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year",
      "cool"
    ],
    "bestMonths": [
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De junio a noviembre las corrientes traen las mayores concentraciones de pelágicos y tiburones martillo. Agua fresca (20-22°C).",
      "en": "From June to November, upwelling brings the heaviest concentrations of pelagic sharks and rays. Water temps around 68-72°F.",
      "fr": "De juin à novembre, les courants attirent la plus forte concentration de pélagiques.",
      "de": "Juni bis November bringt dank kalter Strömungen die höchste Dichte an Hammerhaien.",
      "it": "Da giugno a novembre le correnti fredde portano la massima concentrazione di squali martello.",
      "pt": "De junho a novembro as correntes trazem as maiores concentrações de tubarões-martelo.",
      "ja": "6月〜11月は栄養豊富な寒流によりハンマーヘッドシャークの遭遇率が最高潮に達します（水温20〜22℃）。",
      "zh": "6月至11月期间上升流带来极丰富的远洋物种，双髻鲨群规模最为庞大，水温约20-22°C。"
    },
    "includedInTourIds": [],
    "difficulty": "demanding",
    "difficultyName": {
      "es": "Exigente (Buceo avanzado con corriente)",
      "en": "Demanding (Advanced drift dive)",
      "fr": "Exigeant (Plongée dérivante)",
      "de": "Anspruchsvoll (Strömungstauchen)",
      "it": "Impegnativo (Immersione avanzata)",
      "pt": "Exigente (Mergulho avançado)",
      "ja": "上級（強いドリフトダイビング経験必須）",
      "zh": "高阶（强海流放流潜水）"
    },
    "duration": {
      "es": "Día Completo (2 inmersiones + navegación)",
      "en": "Full Day (2 boat dives + navigation)",
      "fr": "Journée complète (2 plongées)",
      "de": "Ganztags (2 Bootstauchgänge)",
      "it": "Giornata intera (2 immersioni)",
      "pt": "Dia inteiro (2 mergulhos)",
      "ja": "終日（ボートダイブ2本＋航海）",
      "zh": "全天（2次出海船潜 + 航海巡游）"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-panoramic-view-galapagos-bay-turquoise-water.webp",
    "keyWildlife": [
      {
        "es": "Tiburón Martillo Común (Sphyrna lewini)",
        "en": "Scalloped Hammerhead Shark",
        "fr": "Requin-marteau halicorne",
        "de": "Bogenstirn-Hammerhai",
        "it": "Squalo martello smerlato",
        "pt": "Tubarão-martelo-entalhado",
        "ja": "アカシュモクザメ",
        "zh": "路氏双髻鲨"
      },
      {
        "es": "Raya Águila Manchada (Aetobatus narinari)",
        "en": "Spotted Eagle Ray",
        "fr": "Raie léopard",
        "de": "Gefleckter Adlerrochen",
        "it": "Razza aquila maculata",
        "pt": "Raia-pintada",
        "ja": "マダラトビエイ",
        "zh": "雪花鸭嘴燕鳐"
      },
      {
        "es": "Tiburón de Galápagos (Carcharhinus galapagensis)",
        "en": "Galapagos Shark",
        "fr": "Requin des Galápagos",
        "de": "Galapagoshai",
        "it": "Squalo delle Galapagos",
        "pt": "Tubarão-de-galápagos",
        "ja": "ガラパゴスザメ",
        "zh": "加拉帕戈斯真鲨"
      }
    ],
    "highlights": [
      {
        "es": "Encuentros cara a cara con decenas de tiburones martillo",
        "en": "Face-to-face encounters with dozens of majestic hammerheads",
        "fr": "Rencontre avec des dizaines de requins marteaux",
        "de": "Begegnungen mit Dutzenden von Hammerhaien",
        "it": "Incontri ravvicinati con decine di squali martello",
        "pt": "Encontro com dezenas de tubarões-martelo",
        "ja": "視界を埋め尽くすハンマーヘッドシャークの壮大な群れ",
        "zh": "与数百只双髻鲨同游于深蓝大洋之中的终生难忘体验"
      }
    ],
    "isNavigableDayTour": true,
    "requiresDivingLicense": true,
    "pricingNote": {
      "es": "Actividad Adicional Especializada. Incluye 2 inmersiones, yate de buceo certificado, equipo completo y divemaster bilingüe.",
      "en": "Specialized Add-On. Includes 2 tank dives, certified dive vessel, full gear, and certified bilingual divemaster.",
      "fr": "Activité spécialisée sur devis. Inclut 2 plongées et équipement.",
      "de": "Spezialisierte Zusatzaktivität. Beinhaltet 2 Tauchgänge, Schiff und Guide.",
      "it": "Attività subacquea specialistica su richiesta.",
      "pt": "Atividade especializada sob consulta. Inclui 2 mergulhos e equipamentos.",
      "ja": "要事前申請・完全予約制。2タンクダイブ、ダイビング専用船、器材一式、専属ガイド込み。",
      "zh": "专业深潜定制活动。费用包含2次气瓶船潜、专业潜水艇、全套装备及持证双语向导。"
    }
  },
  {
    "id": "sc-caleta-tortuga-negra",
    "name": {
      "es": "Safari en Panga por los Manglares de Caleta Tortuga Negra",
      "en": "Black Turtle Cove Mangrove Zodiac Safari",
      "fr": "Safari en Zodiac dans les Mangroves de Caleta Tortuga Negra",
      "de": "Zodiac-Safari durch die Mangroven der Caleta Tortuga Negra",
      "it": "Safari in Zodiac tra le Mangrovie di Caleta Tortuga Negra",
      "pt": "Safari de Bote pelos Manguezais de Caleta Tortuga Negra",
      "ja": "黒亀入江（カレタ・トルトゥーガ・ネグラ）ゾディアック静音サファリ",
      "zh": "黑龟湾红树林橡皮艇静音生态巡游"
    },
    "shortDescription": {
      "es": "Navega en bote con motor apagado por un laberinto de manglares donde se reproducen tortugas marinas verdes, rayas doradas y tiburones.",
      "en": "Glide silently with silenced engines through a pristine mangrove sanctuary where green sea turtles, golden cownose rays and reef sharks mate.",
      "fr": "Glissez silencieusement en zodiac dans un labyrinthe de mangroves sanctuaires de tortues et raies.",
      "de": "Gleiten Sie lautlos durch ein unberührtes Mangroven-Heiligtum voller Meeresschildkröten und Rochen.",
      "it": "Scivola dolcemente in gommone tra mangrovie incontaminate, tartarughe marine e razze dorate.",
      "pt": "Navegação silenciosa de bote por manguezais preservados onde tartarugas e raias se reproduzem.",
      "ja": "エンジンを止めた静音ボートで迷路のようなマングローブを進み、アオウミガメの交尾や黄金のエイの群れを静かに観察。",
      "zh": "关闭引擎静静滑行于原始红树林迷宫中，探访绿海龟繁殖筑巢圣地、金牛鼻鲐与幼年白顶礁鲨。"
    },
    "description": {
      "es": "Ubicada en la costa norte de Santa Cruz, esta ensenada sin desembarco terrestre está rigurosamente protegida por el Parque Nacional. Se navega a remo o con motor fuera de borda al mínimo por túneles de mangle rojo, blanco y negro. Es el vivero natural más importante del archipiélago para tiburones martillo juveniles, tortugas marinas en cortejo y bandadas de garzas de lava.",
      "en": "Situated on the north shore of Santa Cruz, this tranquil inlet is strictly protected with no terrestrial landings allowed. Guided zodiacs explore quietly under red and black mangrove canopies. It serves as a vital nursery for juvenile hammerhead sharks, mating green turtles, and golden cow-nose rays.",
      "fr": "Enclave préservée sur la côte nord de Santa Cruz, sanctuaire de reproduction des tortues marines et jeunes requins.",
      "de": "Geschützte Bucht an der Nordküste von Santa Cruz, Kinderstube für junge Hammerhaie und Rochen.",
      "it": "Baia protetta a nord di Santa Cruz, vero vivaio naturale per piccoli squali e tartarughe.",
      "pt": "Enseada protegida ao norte de Santa Cruz, berçário natural para tartarugas marinhas e raias.",
      "ja": "サンタクルス島北岸の自然保護区。上陸が禁じられた静寂の入江で、ウミガメの求愛や小さなサメたちが穏やかに泳ぐ姿を観察。",
      "zh": "位于圣克鲁斯岛北岸严加保护的静谧海湾，严禁踏足陆地。乘静音艇穿梭红树林，见证幼年双髻鲨、金鳐与求偶海龟的天然育幼乐园。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year",
      "warm"
    ],
    "bestMonths": [
      12,
      1,
      2,
      3,
      4
    ],
    "seasonalityNotes": {
      "es": "De diciembre a marzo es la temporada cumbre de apareamiento de tortugas marinas verdes en las aguas calmas de la caleta.",
      "en": "December through March marks peak mating season for green sea turtles floating coupled on the still waters.",
      "fr": "Période de reproduction intense des tortues marines de décembre à mars.",
      "de": "Dezember bis März ist die Paarungszeit der Grünen Meeresschildkröten.",
      "it": "Da dicembre a marzo è l'apice dell'accoppiamento delle tartarughe marine.",
      "pt": "De dezembro a março é pico de acasalamento das tartarugas marinhas.",
      "ja": "12月〜3月はアオウミガメの交尾期。穏やかな水面に浮かぶつがいの姿が頻繁に観察されます。",
      "zh": "12月至次年3月是绿海龟在平静海面交配的高峰期，场面令人震撼。"
    },
    "includedInTourIds": [],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Sin desembarco, navegación en bote)",
      "en": "Easy (Zodiac boat cruise)",
      "fr": "Facile (En bateau)",
      "de": "Sehr leicht (Bootsfahrt)",
      "it": "Facile (In gommone)",
      "pt": "Fácil (Passeio de barco)",
      "ja": "初級（上陸なし、ボート乗船のみ）",
      "zh": "轻松（无需登岛，平稳快艇巡游）"
    },
    "duration": {
      "es": "2.5 horas",
      "en": "2.5 hours",
      "fr": "2h30",
      "de": "2,5 Std.",
      "it": "2.5 ore",
      "pt": "2,5 horas",
      "ja": "約2.5時間",
      "zh": "约2.5小时"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-brown-pelican-flight-mangroves.webp",
    "keyWildlife": [
      {
        "es": "Tortuga Marina Verde del Pacífico (Chelonia mydas)",
        "en": "Pacific Green Sea Turtle",
        "fr": "Tortue verte du Pacifique",
        "de": "Pazifische Grüne Meeresschildkröte",
        "it": "Tartaruga verde del Pacifico",
        "pt": "Tartaruga-verde-do-pacífico",
        "ja": "タイマイ・アオウミガメ",
        "zh": "太平洋绿海龟"
      },
      {
        "es": "Raya Dorada (Rhinoptera steindachneri)",
        "en": "Golden Cownose Ray",
        "fr": "Raie dorée",
        "de": "Goldene Kuhnasenrochen",
        "it": "Razza dorata",
        "pt": "Raia-dourada",
        "ja": "ゴールデンレイ（ウシバナトビエイ）",
        "zh": "金牛鼻鲐"
      },
      {
        "es": "Tiburón de Punta Negra",
        "en": "Blacktip Reef Shark",
        "fr": "Requin à pointes noires",
        "de": "Schwarzspitzen-Riffhai",
        "it": "Squalo pinna nera",
        "pt": "Tubarão-de-pontas-negras",
        "ja": "ツマグロ（ブラックチップシャーク）",
        "zh": "黑顶礁鲨"
      }
    ],
    "highlights": [
      {
        "es": "Observar decenas de tortugas y rayas a centímetros de la panga",
        "en": "Observing sea turtles and ray squadrons gliding inches beneath the zodiac",
        "fr": "Observer tortues et raies à quelques centimètres du bateau",
        "de": "Schildkröten und Rochen zum Greifen nah am Zodiac",
        "it": "Tartarughe e razze che nuotano a pochi centimetri dal gommone",
        "pt": "Observar tartarugas e raias a centímetros do barco",
        "ja": "ボートのすぐ足元を優雅に泳ぐウミガメやエイの大群",
        "zh": "在距离橡皮艇仅数十厘米的清澈水下静看成群海龟与金鳐"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable en crucero o navegación privada.",
      "en": "Customizable Add-On via private yacht charter.",
      "fr": "Activité sur mesure en croisière.",
      "de": "Zusatzaktivität auf Privatcharter.",
      "it": "Attività opzionale su yacht privato.",
      "pt": "Atividade adicional sob medida.",
      "ja": "プライベートチャーター等で追加可能な特別ツアー。",
      "zh": "可通过私人游艇巡游定制添加的专属生态体验。"
    }
  },
  {
    "id": "is-tintoreras-islet",
    "isIconic": true,
    "name": {
      "es": "Islote Tintoreras: Snorkel con Pingüinos y Canales de Tiburones",
      "en": "Tintoreras Islet: Shark Crevices & Galapagos Penguin Snorkel",
      "fr": "Îlot Tintoreras: Canaux de Requins et Manchots des Galápagos",
      "de": "Tintoreras-Inselchen: Haikanäle & Pinguin-Schnorcheln",
      "it": "Isolotto Tintoreras: Canali di Squali e Pinguini delle Galapagos",
      "pt": "Ilhote Tintoreras: Canais de Tubarões e Pinguins de Galápagos",
      "ja": "ティントレラス小島：ネムリブカの溶岩水路＆ガラパゴスペンギンとスノーケリング",
      "zh": "蒂恩托雷拉斯小岛：熔岩鲨鱼水道与企鹅浮潜"
    },
    "shortDescription": {
      "es": "Camina sobre lava volcánica negra donde duermen decenas de tiburones tintorera y nada con pingüinos de Galápagos y leones marinos.",
      "en": "Trek across rugged basalt flows where dozens of white-tip reef sharks rest in crystalline fissures, then snorkel beside playful penguins.",
      "fr": "Marchez sur la lave noire où se reposent des dizaines de requins et nagez avec des manchots.",
      "de": "Wandern Sie über schwarze Lava, wo Riffhaie ruhen, und schnorcheln Sie mit Pinguinen.",
      "it": "Cammina sulla lava dove riposano decine di squali pinna bianca e nuota con pinguini e leoni marini.",
      "pt": "Caminhe sobre lava vulcânica onde tubarões descansam e nade com pinguins de Galápagos.",
      "ja": "冷え固まった漆黒の溶岩の上を歩き、水路で休むホワイトチップシャークを観察。海では愛らしいガラパゴスペンギンとスノーケリング。",
      "zh": "漫步于黑色玄武熔岩之上，俯瞰沉睡在裂缝水洼中的白顶礁鲨，随后跳入翡翠碧波与加拉帕戈斯企鹅及海狮同游。"
    },
    "description": {
      "es": "A solo 10 minutos en lancha de Puerto Villamil, Tintoreras es un archipiélago de lava fragmentada. Un sendero interpretativo conduce a una grieta de agua marina de aguas calmas donde docenas de tiburones punta blanca (Triaenodon obesus) reposan de día. Tras la caminata, la sesión de snorkel en la bahía ofrece encuentros cercanos con pingüinos de Galápagos, tortugas marinas e iguanas nadando bajo el agua.",
      "en": "Just 10 minutes from Puerto Villamil dock, Tintoreras is a jagged volcanic islet. A trail leads to a calm turquoise fissure where dozens of white-tip reef sharks sleep during the day. Afterward, snorkel in the sheltered cove among Galapagos penguins, marine turtles, and swimming marine iguanas.",
      "fr": "À 10 minutes de Puerto Villamil, sentier volcanique avec faille aux requins et snorkeling inoubliable avec manchots.",
      "de": "Nur 10 Minuten vor Puerto Villamil: Beobachten Sie schlafende Riffhaie in Felsspalten und schnorcheln Sie mit Pinguinen.",
      "it": "A pochi minuti da Puerto Villamil: squali pinna bianca nei canali e snorkeling con pinguini e tartarughe.",
      "pt": "A 10 minutos de Puerto Villamil, trilha vulcânica com tubarões e snorkel inesquecível com pinguins.",
      "ja": "プエルト・ビジャミル港からわずか10分。昼間休息するサメたちの水路を見学し、その後は世界で唯一赤道直下に生息するガラパゴスペンギンと夢のスノーケリング。",
      "zh": "距离维利亚米尔港仅10分钟船程。沿着步道观察在天然熔岩水渠中日间小憩的数十只礁鲨，随后在风平浪静的浅滩浮潜，邂逅呆萌的加拉帕戈斯企鹅。"
    },
    "island": "isabela",
    "islandName": {
      "es": "Isabela",
      "en": "Isabela Island",
      "fr": "Île Isabela",
      "de": "Insel Isabela",
      "it": "Isola Isabela",
      "pt": "Ilha Isabela",
      "ja": "イサベラ島",
      "zh": "伊莎贝拉岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Los pingüinos de Galápagos están presentes todo el año, con mayor actividad alimenticia en la temporada fría (junio-noviembre).",
      "en": "Galapagos penguins reside year-round, with peak foraging activity during the cool Humboldt current season (June-November).",
      "fr": "Les manchots sont présents toute l'année, particulièrement actifs de juin à novembre.",
      "de": "Pinguine sind ganzjährig anzutreffen, besonders aktiv in den kühleren Monaten (Juni-November).",
      "it": "I pinguini sono presenti tutto l'anno, con massima attività da giugno a novembre.",
      "pt": "Pinguins presentes o ano todo, mais ativos entre junho e novembro.",
      "ja": "ペンギンは通年生息。寒流の入る6月〜11月はプランクトンが豊富なため、最も活発に泳ぎ回ります。",
      "zh": "加拉帕戈斯企鹅全年栖息于此，在6月至11月的秘鲁寒流期间捕食活动最为频繁活跃。"
    },
    "includedInTourIds": [
      "galapagos-6days",
      "galapagos-7days",
      "galapagos-8days",
      "ecuador-galapagos-11days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Caminata en pasarela + Snorkel suave)",
      "en": "Easy (Boardwalk trail + Gentle snorkel)",
      "fr": "Facile",
      "de": "Leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（木道歩行＋穏やかなスノーケル）",
      "zh": "轻松（平缓栈道与浅滩浮潜）"
    },
    "duration": {
      "es": "Medio Día (3 horas)",
      "en": "Half Day (3 hours)",
      "fr": "Demi-journée (3h)",
      "de": "Halber Tag (3 Std.)",
      "it": "Mezza Giornata (3 ore)",
      "pt": "Meio Dia (3 horas)",
      "ja": "約3時間",
      "zh": "约3小时"
    },
    "imageUrl": "/images/tours/16-9/galapagos-tintoreras16-9.webp",
    "keyWildlife": [
      {
        "es": "Pingüino de Galápagos (Spheniscus mendiculus)",
        "en": "Galapagos Penguin",
        "fr": "Manchot des Galápagos",
        "de": "Galapagos-Pinguin",
        "it": "Pinguino delle Galapagos",
        "pt": "Pinguim-de-galápagos",
        "ja": "ガラパゴスペンギン",
        "zh": "加拉帕戈斯企鹅"
      },
      {
        "es": "Tiburón Tintorera de Arrecife",
        "en": "White-tip Reef Shark",
        "fr": "Requin à pointes blanches",
        "de": "Weißspitzen-Riffhai",
        "it": "Squalo pinna bianca",
        "pt": "Tubarão-de-pontas-brancas",
        "ja": "ネムリブカ",
        "zh": "白顶礁鲨"
      },
      {
        "es": "Lobo Marino de Galápagos (Zalophus wollebaeki)",
        "en": "Galapagos Sea Lion",
        "fr": "Otarie des Galápagos",
        "de": "Galapagos-Seelöwe",
        "it": "Leone marino delle Galapagos",
        "pt": "Leão-marinho-de-galápagos",
        "ja": "ガラパゴスアシカ",
        "zh": "加拉帕戈斯海狮"
      }
    ],
    "highlights": [
      {
        "es": "Ver tiburones descansando a menos de dos metros en la grieta de lava",
        "en": "Gazing at resting reef sharks just feet below you in the crystal fissure",
        "fr": "Observer les requins à moins de 2 mètres",
        "de": "Haie aus nächster Nähe in der Spalte beobachten",
        "it": "Guardare gli squali a pochi metri di distanza nel canale",
        "pt": "Ver tubarões descansando a menos de dois metros",
        "ja": "足元わずか2メートルの透明な水路で休むサメを激写",
        "zh": "在俯瞰仅数步之遥的清澈裂缝中静观白顶礁鲨群"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en todos los tours base de Vermilion a Isabela.",
      "en": "Included in all Vermilion Isabela tours.",
      "fr": "Inclus dans tous les circuits Isabela.",
      "de": "In allen Isabela-Touren enthalten.",
      "it": "Incluso in tutti i tour di Isabela.",
      "pt": "Incluído em todos os tours em Isabela.",
      "ja": "イサベラ島を含む全ツアーに標準搭載。",
      "zh": "已包含在所有造访伊莎贝拉岛的基础行程中。"
    }
  },
  {
    "id": "is-flamingos-arnaldo-tupiza",
    "name": {
      "es": "Laguna de Flamingos y Centro de Crianza Arnaldo Tupiza",
      "en": "Flamingo Lagoon Boardwalk & Arnaldo Tupiza Giant Tortoise Center",
      "fr": "Lagune des Flamants et Centre Arnaldo Tupiza",
      "de": "Flamingo-Lagune & Schildkrötenzentrum Arnaldo Tupiza",
      "it": "Laguna dei Fenicotteri e Centro Arnaldo Tupiza",
      "pt": "Lagoa de Flamingos e Centro Arnaldo Tupiza",
      "ja": "フラミンゴの湿地帯ラグーン＆アルナルド・トゥピサ巨亀繁殖センター",
      "zh": "火烈鸟盐湖湿地木栈道与阿纳尔多·图皮萨巨龟繁育中心"
    },
    "shortDescription": {
      "es": "Pasea por pasarelas elevadas sobre lagunas costeras para fotografiar flamingos rosados y visita el centro que protege las tortugas de Isabela.",
      "en": "Stroll elevated boardwalks over brackish lagoons observing American flamingos before visiting the breeding center for Isabela giant tortoises.",
      "fr": "Promenade sur passerelles au-dessus des lagunes à flamants roses puis visite du centre d'élevage de tortues d'Isabela.",
      "de": "Spaziergang über Holzstege vorbei an Flamingos und Besuch der Riesenschildkröten-Zuchtstation von Isabela.",
      "it": "Passeggiata sulle passerelle tra fenicotteri rosa e visita al centro di riproduzione delle tartarughe di Isabela.",
      "pt": "Caminhada sobre passarelas observando flamingos e visita ao centro de reprodução de tartarugas de Isabela.",
      "ja": "マングローブの湿地に架かる木道を歩き、鮮やかなピンクのフラミンゴを撮影。イサベラ島の巨亀保全センターへ。",
      "zh": "漫步于架设在泻湖之上的木栈道，定格粉红火烈鸟的优雅身姿，随后探访保护伊莎贝拉南部火山群巨龟的繁育中心。"
    },
    "description": {
      "es": "El sendero de humedales de Puerto Villamil discurre por pasarelas de madera sobre pozas de agua salobre donde se alimentan colonias de flamingos americanos (Phoenicopterus ruber), patillos y teros reales. Al final del sendero se ubica el Centro de Crianza Arnaldo Tupiza, dedicado a reproducir y repoblar las cinco subespecies endémicas de tortugas gigantes de los volcanes Sierra Negra y Cerro Azul.",
      "en": "The Puerto Villamil wetland trail features wooden boardwalks winding over tranquil salt lagoons where vibrant American flamingos sift the water for tiny brine shrimp. The path leads to the Arnaldo Tupiza Breeding Center, responsible for restoring tortoise populations across the massive Sierra Negra and Cerro Azul volcanic slopes.",
      "fr": "Parcours en bois au milieu des mangroves et lagunes à flamants, menant au centre de conservation des tortues.",
      "de": "Holzstegpfad durch Feuchtgebiete mit Flamingos zum Zuchtzentrum für Riesenschildkröten.",
      "it": "Percorso tra lagune con fenicotteri rosa fino al centro di tutela delle tartarughe giganti.",
      "pt": "Passarela de madeira sobre lagoas com flamingos até o centro de conservação de tartarugas.",
      "ja": "塩生湿地に伸びる木道を歩き、甲殻類をついばむアメリカフラミンゴを間近に観察。イサベラ島固有のゾウガメを守る繁殖施設を視察。",
      "zh": "穿行于沿海湿地木栈道，近距离拍摄觅食盐水虾的加勒比火烈鸟。终点连通阿纳尔多·图皮萨繁育中心，肩负塞拉内格拉与塞罗阿祖尔火山巨龟种群复育重任。"
    },
    "island": "isabela",
    "islandName": {
      "es": "Isabela",
      "en": "Isabela Island",
      "fr": "Île Isabela",
      "de": "Insel Isabela",
      "it": "Isola Isabela",
      "pt": "Ilha Isabela",
      "ja": "イサベラ島",
      "zh": "伊莎贝拉岛"
    },
    "category": "history-conservation",
    "categoryName": {
      "es": "Historia, Darwin & Conservación",
      "en": "History, Darwin & Conservation",
      "fr": "Histoire, Darwin & Conservation",
      "de": "Geschichte, Darwin & Artenschutz",
      "it": "Storia, Darwin e Conservazione",
      "pt": "História, Darwin e Conservação",
      "ja": "ダーウィン歴史探訪＆自然保護",
      "zh": "达尔文历史与生态保护"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Flamingos y crías de tortugas visibles todo el año. En época de lluvias los niveles de agua aumentan y el color rosa de las aves se intensifica.",
      "en": "Flamingos and baby tortoises observable all year. The warm rainy months bring higher feeding pond levels and vivid plumages.",
      "fr": "Présents toute l'année, plumage particulièrement éclatant pendant la saison chaude.",
      "de": "Ganzjährig sichtbar; besonders prächtiges Gefieder während der wärmeren Monate.",
      "it": "Fenicotteri visibili tutto l'anno con piumaggio vivace nei mesi caldi.",
      "pt": "Flamingos visíveis o ano todo, com plumagem exuberante na época quente.",
      "ja": "通年観察可能。温暖な雨季にはプランクトンが増加し、フラミンゴの羽色がひときわ鮮やかな深紅色に輝きます。",
      "zh": "全年可赏。在暖湿季节因水生微藻丰富，火烈鸟羽翼色彩格外鲜亮艳丽。"
    },
    "includedInTourIds": [
      "galapagos-6days",
      "galapagos-7days",
      "galapagos-8days",
      "ecuador-galapagos-11days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Pasarelas de madera planas)",
      "en": "Easy (Flat wooden boardwalks)",
      "fr": "Facile (Passerelles)",
      "de": "Sehr leicht (Flache Holzstege)",
      "it": "Facile (Passerelle piane)",
      "pt": "Fácil (Passarelas planas)",
      "ja": "初級（平坦な木道散策）",
      "zh": "轻松（平坦木质步道）"
    },
    "duration": {
      "es": "2 horas",
      "en": "2 hours",
      "fr": "2h",
      "de": "2 Std.",
      "it": "2 ore",
      "pt": "2 horas",
      "ja": "約2時間",
      "zh": "约2小时"
    },
    "imageUrl": "/images/tours/16-9/galapagos-flamenco-isabela-16-9.webp",
    "keyWildlife": [
      {
        "es": "Flamingo Americano (Phoenicopterus ruber)",
        "en": "American Flamingo",
        "fr": "Flamant d'Amérique",
        "de": "Kubaflamingo",
        "it": "Fenicottero dei Caraibi",
        "pt": "Flamingo-americano",
        "ja": "ベニイロフラミンゴ",
        "zh": "美洲红鹳（火烈鸟）"
      },
      {
        "es": "Tortuga Gigante de Volcán Sierra Negra (Chelonoidis guentheri)",
        "en": "Sierra Negra Giant Tortoise",
        "fr": "Tortue géante de Sierra Negra",
        "de": "Sierra Negra Riesenschildkröte",
        "it": "Tartaruga gigante di Sierra Negra",
        "pt": "Tartaruga-gigante-de-sierra-negra",
        "ja": "シエラ・ネグラゾウガメ",
        "zh": "塞拉内格拉火山巨龟"
      }
    ],
    "highlights": [
      {
        "es": "Reflejos cristalinos de flamingos alimentándose a pocos pasos",
        "en": "Mirror-like reflections of feeding flamingos against volcanic dunes",
        "fr": "Reflets des flamants roses dans l'eau calme",
        "de": "Spiegelglatte Lagunen mit rosafarbenen Flamingos",
        "it": "Riflessi dei fenicotteri rosa nelle acque calme",
        "pt": "Reflexos dos flamingos nas águas calmas da lagoa",
        "ja": "水面に映るピンク色のフラミンゴのシンメトリーな絶景",
        "zh": "如明镜般的湖面定格火烈鸟涉水觅食的优雅倒影"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en todos los tours base de Vermilion a Isabela.",
      "en": "Included in all base tours visiting Isabela.",
      "fr": "Inclus dans tous les circuits avec Isabela.",
      "de": "In allen Isabela-Touren enthalten.",
      "it": "Incluso in tutti i tour.",
      "pt": "Incluído nos tours com Isabela.",
      "ja": "イサベラ島ツアーに標準搭載。",
      "zh": "已包含在所有伊莎贝拉岛行程中。"
    }
  },
  {
    "id": "is-los-tuneles-cabo-rosa",
    "name": {
      "es": "Los Túneles de Cabo Rosa: Arcos de Lava, Caballitos de Mar y Mantas",
      "en": "Los Tuneles (Cabo Rosa): Lava Bridges, Seahorses & Manta Rays",
      "fr": "Les Tunnels de Cabo Rosa: Arches de Lave, Hippocampes et Raies Mantas",
      "de": "Los Túneles (Cabo Rosa): Lavabrücken, Seepferdchen & Mantarochen",
      "it": "I Tunnel di Cabo Rosa: Archi di Lava, Cavallucci Marini e Mante",
      "pt": "Los Túneles (Cabo Rosa): Arcos de Lava, Cavalos-Marinhos e Raias",
      "ja": "ロス・トゥネレス（カボ・ロサ）：天然溶岩アーチ＆タツノオトシゴとマンタのスノーケル",
      "zh": "洛斯图内莱斯（罗莎角）：天然火山熔岩拱桥、海马与巨型蝠鲼浮潜"
    },
    "shortDescription": {
      "es": "El sitio de snorkel costero más asombroso de Galápagos: laberinto de arcos de lava negra sobre agua turquesa cristalina con tiburones y caballitos de mar.",
      "en": "The most extraordinary snorkeling wonderland in Galapagos: an intricate labyrinth of natural basalt lava arches sheltering seahorses, reef sharks, and giant manta rays.",
      "fr": "Le site de snorkeling le plus spectaculaire des Galápagos : arches de lave volcanique sur une eau turquoise cristalline.",
      "de": "Der spektakulärste Schnorchelspot der Galápagos: Labyrinth aus Lavabögen, Seepferdchen und Riffhaien.",
      "it": "Il sito di snorkeling più spettacolare delle Galapagos: labirinto di archi di lava con cavallucci marini e mante.",
      "pt": "O local de snorkel mais espetacular de Galápagos: labirinto de arcos de lava com cavalos-marinhos e tubarões.",
      "ja": "ガラパゴス諸島で最高峰と讃えられるスノーケリングの秘境。海上に連なる天然の溶岩橋の下で、タツノオトシゴやウミガメ、マンタと泳ぐ奇跡の体験。",
      "zh": "公认加拉帕戈斯群岛最震撼的浮潜仙境：玄武岩天然拱桥横跨碧蓝水面，水下密布海马、礁鲨、海龟与巨型蝠鲼。"
    },
    "description": {
      "es": "Navegación de 45 minutos al suroeste de Puerto Villamil hasta Cabo Rosa. La lava volcánica al enfriarse en contacto con el mar formó una serie de puentes y arcos naturales donde anidan piqueros de patas azules y descansan pingüinos. Bajo el agua, las lagunas calmadas resguardan peces aguja, tortugas verdes gigantes, caballitos de mar del Pacífico (Hippocampus ingens) y pacíficos tiburones durmientes.",
      "en": "A 45-minute coastal boat navigation southwest of Puerto Villamil leads to Cabo Rosa. Ancient lava flows cooled directly into the Pacific Ocean, creating stunning natural stone arches and bridges where blue-footed boobies nest. Underwater, labyrinthine calm coves harbor Pacific seahorses, green sea turtles, and resting white-tip sharks.",
      "fr": "Navigation vers Cabo Rosa avec spectaculaires arches de lave, oiseaux nicheurs et snorkeling riche en tortues et hippocampes.",
      "de": "45-minütige Bootsfahrt zu spektakulären Lavabrücken, Nistplätzen von Blaufußtölpeln und unvergleichlicher Unterwasserwelt.",
      "it": "Navigazione verso Cabo Rosa con archi di lava naturali, sule zampeazzurre e acque ricche di tartarughe e cavallucci marini.",
      "pt": "Navegação até Cabo Rosa com arcos de lava naturais onde nidificam atobás e vivem cavalos-marinhos e tartarugas.",
      "ja": "プエルト・ビジャミルからボートで約45分。溶岩が海水で急冷されて生まれた壮大な石橋の上ではアオアシカツオドリが巣作り。波静かな水路にはタツノオトシゴが隠れています。",
      "zh": "从维利亚米尔港乘快艇西南航行45分钟抵达罗莎角。熔岩接触海水凝固形成了巧夺天工的海上石桥与拱门，蓝脚鲣鸟在桥上筑巢，水下则是太平洋海马与巨龟的天堂。"
    },
    "island": "isabela",
    "islandName": {
      "es": "Isabela",
      "en": "Isabela Island",
      "fr": "Île Isabela",
      "de": "Insel Isabela",
      "it": "Isola Isabela",
      "pt": "Ilha Isabela",
      "ja": "イサベラ島",
      "zh": "伊莎贝拉岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year",
      "warm"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De diciembre a mayo las aguas son más calmas y cristalinas, con visibilidad marina que supera los 15 metros.",
      "en": "December through May brings the calmest, warmest waters (75-80°F) with visibility frequently exceeding 50 feet.",
      "fr": "De décembre à mai les eaux sont calmes et très claires avec une visibilité supérieure à 15 mètres.",
      "de": "Dezember bis Mai bietet ruhigste Bedingungen und beste Sichtweiten unter Wasser.",
      "it": "Da dicembre a maggio il mare è calmo con visibilità che supera i 15 metri.",
      "pt": "De dezembro a maio o mar é calmo com visibilidade superior a 15 metros.",
      "ja": "12月〜5月は波が最も穏やかで水温も高く、15メートル以上の圧巻の透明度を誇ります。",
      "zh": "12月至次年5月海水平静温暖（24-27°C），水下能见度常年突破15米以上。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Navegación en lancha + caminata en lava + snorkel)",
      "en": "Moderate (Boat ride + lava walk + snorkeling)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（ボート移動＋溶岩歩行＋スノーケル）",
      "zh": "中等（快艇往返 + 熔岩桥徒步 + 浮潜）"
    },
    "duration": {
      "es": "Medio Día Largo (5-6 horas)",
      "en": "Extended Half Day (5-6 hours)",
      "fr": "5 à 6 heures",
      "de": "5 bis 6 Stunden",
      "it": "5-6 ore",
      "pt": "5 a 6 horas",
      "ja": "約5〜6時間",
      "zh": "约5-6小时"
    },
    "imageUrl": "/images/tours/16-9/galapagos-isabela-island-16-9.1.webp",
    "keyWildlife": [
      {
        "es": "Caballito de Mar del Pacífico (Hippocampus ingens)",
        "en": "Pacific Seahorse",
        "fr": "Hippocampe du Pacifique",
        "de": "Pazifisches Seepferdchen",
        "it": "Cavalluccio marino del Pacifico",
        "pt": "Cavalo-marinho-do-pacífico",
        "ja": "パシフィックシーホース（タツノオトシゴ）",
        "zh": "太平洋海马"
      },
      {
        "es": "Manta Gigante del Pacífico (Mobula birostris)",
        "en": "Giant Oceanic Manta Ray",
        "fr": "Raie manta océanique",
        "de": "Riesenmanta",
        "it": "Manta gigante oceanica",
        "pt": "Raia-manta-gigante",
        "ja": "オニイトマキエイ（巨大マンタ）",
        "zh": "大西洋前口蝠鲼（巨型蝠鲼）"
      },
      {
        "es": "Piquero de Patas Azules (Sula nebouxii)",
        "en": "Blue-footed Booby",
        "fr": "Fou à pieds bleus",
        "de": "Blaufußtölpel",
        "it": "Sula dai piedi azzurri",
        "pt": "Atobá-de-pés-azuis",
        "ja": "アオアシカツオドリ",
        "zh": "蓝脚鲣鸟"
      }
    ],
    "highlights": [
      {
        "es": "Caminar sobre puentes naturales de lava suspendidos sobre el mar",
        "en": "Walking across natural geological stone bridges arches over turquoise pools",
        "fr": "Marcher sur des ponts de lave au-dessus de l'eau",
        "de": "Wanderung über natürliche Lavabrücken über dem Meer",
        "it": "Camminare su ponti naturali di lava sospesi sul mare",
        "pt": "Caminhar sobre pontes naturais de lava suspensas no mar",
        "ja": "エメラルドグリーンの海に架かる奇跡の天然溶岩橋ウォーク",
        "zh": "漫步于凌空悬立在碧绿海面之上的天然熔岩石拱奇观"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Estrella. Altamente solicitada; cupos limitados por el Parque Nacional. Se cotiza como suplemento.",
      "en": "Premier Signature Add-On. High demand with strict National Park daily caps. Quoted as custom upgrade.",
      "fr": "Activité phare sur mesure, places limitées par le Parc.",
      "de": "Highlight-Zusatzaktivität. Begrenzte Kapazitäten des Nationalparks.",
      "it": "Esperienza esclusiva ad alta richiesta, posti limitati dal Parco.",
      "pt": "Atividade estrela adicional. Vagas limitadas pelo Parque Nacional.",
      "ja": "【大人気・一番人気の追加ツアー】国立公園により1日の催行人数が厳格に制限されているため事前予約必須。",
      "zh": "【最受追捧的明星附加活动】国家公园严格限制每日登岛名额，极度抢手，可根据出行排期定制升级。"
    }
  },
  {
    "id": "is-sierra-negra-volcano",
    "isIconic": true,
    "name": {
      "es": "Trekking a la Caldera del Volcán Sierra Negra y Fumarolas de Volcán Chico",
      "en": "Sierra Negra Caldera & Volcán Chico Fumaroles Trekking",
      "fr": "Trekking Caldeira Volcan Sierra Negra & Fumerolles de Volcán Chico",
      "de": "Sierra Negra Vulkankrater & Volcán Chico Fumarolen Trekking",
      "it": "Trekking alla Caldera del Vulcano Sierra Negra e Volcán Chico",
      "pt": "Trekking na Caldeira do Vulcão Sierra Negra e Volcán Chico",
      "ja": "シエラ・ネグラ巨大火口＆ボルカン・チコ噴気孔トレッキング",
      "zh": "塞拉内格拉巨型火山口与奇科火山喷气孔地质徒步"
    },
    "shortDescription": {
      "es": "Camina por el borde de la segunda caldera volcánica activa más grande del planeta (10 km de diámetro) y paisajes lunares de lava viva.",
      "en": "Trek along the rim of Earth’s second largest active volcanic caldera (6 miles across) and otherworldly lava moonscapes.",
      "fr": "Randonnée au bord de la 2e plus grande caldeira active au monde (10 km de diamètre) et paysages lunaires.",
      "de": "Wanderung am Kraterrand der zweitgrößten aktiven Caldera der Welt (10 km Durchmesser) durch Mondlandschaften.",
      "it": "Trekking sull'orlo della seconda caldera attiva più grande al mondo con paesaggi lunari mozzafiato.",
      "pt": "Trilha pela borda da segunda maior caldeira vulcânica ativa do mundo e paisagens lunares.",
      "ja": "直径約10km、世界第2位の大きさを誇る巨大活火山カルデラの縁を歩き、今なお噴気が立ち込める月面のような溶岩地帯を踏破。",
      "zh": "徒步丈量地球第二大活火山口边缘（直径达10公里），穿行于热气蒸腾的奇科火山月球熔岩地貌。"
    },
    "description": {
      "es": "Ascenso en vehículo 4x4 hasta las tierras altas de Isabela para iniciar una caminata de 16 km (ida y vuelta). Primero se bordea el impresionante cráter de Sierra Negra, cubierto de coladas de lava recientes. Luego se continúa hacia Volcán Chico, un paisaje surrealista de fumarolas sulfurosas activas, tubos de lava colapsados y vistas panorámicas de los volcanes Alcedo, Darwin y Wolf.",
      "en": "Drive 4x4 into the misty Isabela highlands to begin a rewarding 10-mile (round-trip) hike. Walk the rim of Sierra Negra's colossal crater, then venture into Volcán Chico: a surreal Martian expanse of active sulfur vents, yellow minerals, collapsed lava tubes, and breathtaking panoramas toward northern volcanoes.",
      "fr": "Ascension en 4x4 puis randonnée de 16 km vers la caldeira géante et les fumerolles actives de Volcán Chico.",
      "de": "Fahrt ins Hochland und 16 km Wanderung entlang des gigantischen Kraters und zu den Fumarolen von Volcán Chico.",
      "it": "Escursione di 16 km verso la caldera di Sierra Negra e i paesaggi sulfurei attivi di Volcán Chico.",
      "pt": "Subida em 4x4 e trilha de 16 km ao redor da imensa caldeira e fumarolas ativas do Volcán Chico.",
      "ja": "イサベラ島内陸部を4WDで登り、往復約16kmの絶景トレッキングへ。巨大クレーターを見下ろし、黄色い硫黄の結晶と蒸気が噴き出すボルカン・チコから北部の火山群を一望。",
      "zh": "乘坐四驱车抵达高地起点，展开往返约16公里的壮美徒步。先是俯瞰塞拉内格拉庞大火山口，随后深入奇科火山硫磺喷气孔、黄色结晶与熔岩管，尽览北部群峰全景。"
    },
    "island": "isabela",
    "islandName": {
      "es": "Isabela",
      "en": "Isabela Island",
      "fr": "Île Isabela",
      "de": "Insel Isabela",
      "it": "Isola Isabela",
      "pt": "Ilha Isabela",
      "ja": "イサベラ島",
      "zh": "伊莎贝拉岛"
    },
    "category": "volcanic-hiking",
    "categoryName": {
      "es": "Senderismo Volcánico & Geología",
      "en": "Volcanic Hiking & Geology",
      "fr": "Randonnée Volcanique & Géologie",
      "de": "Vulkanwandern & Geologie",
      "it": "Trekking Vulcanico e Geologia",
      "pt": "Trilhas Vulcânicas e Geologia",
      "ja": "火山トレッキング＆地質探訪",
      "zh": "火山地貌徒步探险"
    },
    "seasons": [
      "all-year",
      "warm"
    ],
    "bestMonths": [
      12,
      1,
      2,
      3,
      4,
      5
    ],
    "seasonalityNotes": {
      "es": "De diciembre a mayo los cielos suelen estar despejados y soleados en la caldera, ofreciendo visibilidad fotográfica inigualable.",
      "en": "December to May typically offers crisp, clear skies above the caldera for jaw-dropping photography.",
      "fr": "De décembre à mai le ciel est généralement dégagé pour une visibilité photographique maximale.",
      "de": "Dezember bis Mai bietet oft klaren blauen Himmel mit unvergleichlicher Weitsicht.",
      "it": "Da dicembre a maggio il cielo è limpido per foto straordinarie.",
      "pt": "De dezembro a maio o céu costuma estar limpo proporcionando fotos incríveis.",
      "ja": "12月〜5月はクレーター上空が快晴に恵まれやすく、どこまでも続く溶岩平原の圧倒的なパノラマを望めます。",
      "zh": "12月至次年5月火山口上空常晴朗少云，群峰连绵的壮丽全景一览无遗，是风光摄影的绝佳时期。"
    },
    "includedInTourIds": [],
    "difficulty": "demanding",
    "difficultyName": {
      "es": "Exigente (Caminata de 16 km sobre roca y grava)",
      "en": "Demanding (10-mile trek over lava and gravel)",
      "fr": "Exigeant (16 km de marche)",
      "de": "Anspruchsvoll (16 km Wanderung)",
      "it": "Impegnativo (16 km su terreno vulcanico)",
      "pt": "Exigente (Trilha de 16 km)",
      "ja": "上級（溶岩・砂利道 約16kmのロングトレイル）",
      "zh": "高阶（16公里碎石与火山岩长途徒步）"
    },
    "duration": {
      "es": "Día Completo (6-7 horas)",
      "en": "Full Day (6-7 hours)",
      "fr": "Journée complète (6-7h)",
      "de": "Ganztags (6-7 Std.)",
      "it": "Giornata intera (6-7 ore)",
      "pt": "Dia inteiro (6-7 horas)",
      "ja": "終日（約6〜7時間）",
      "zh": "全天（约6-7小时）"
    },
    "imageUrl": "/images/tours/16-9/galapagos-isabela-island-16-9.2.webp",
    "keyWildlife": [
      {
        "es": "Gavilán de Galápagos (Buteo galapagoensis)",
        "en": "Galapagos Hawk",
        "fr": "Buse des Galápagos",
        "de": "Galapagosbussard",
        "it": "Poiana delle Galapagos",
        "pt": "Gavião-de-galápagos",
        "ja": "ガラパゴスノスリ",
        "zh": "加拉帕戈斯鵟（鹰）"
      },
      {
        "es": "Iguana Terrestre de Isabela",
        "en": "Isabela Land Iguana",
        "fr": "Iguane terrestre d'Isabela",
        "de": "Isabela Landleguan",
        "it": "Iguana terrestre di Isabela",
        "pt": "Iguana-terrestre-de-isabela",
        "ja": "イサベラリクイグアナ",
        "zh": "伊莎贝拉陆鬣蜥"
      },
      {
        "es": "Lechuza Campestre de Galápagos",
        "en": "Galapagos Short-eared Owl",
        "fr": "Hibou des marais des Galápagos",
        "de": "Galapagos-Sumpfohreule",
        "it": "Gufo di palude delle Galapagos",
        "pt": "Coruja-dos-campos-de-galápagos",
        "ja": "コミミズク（ガラパゴス固有亜種）",
        "zh": "短耳鸮加拉帕戈斯亚种"
      }
    ],
    "highlights": [
      {
        "es": "Admirar una de las calderas volcánicas activas más gigantescas del mundo",
        "en": "Standing on the edge of Earth's second largest active volcanic crater",
        "fr": "Admirer l'une des plus vastes caldeiras actives au monde",
        "de": "Blick in einen der größten aktiven Krater der Erde",
        "it": "Vista spettacolare sulla caldera attiva tra le più grandi del mondo",
        "pt": "Contemplar uma das maiores caldeiras vulcânicas do planeta",
        "ja": "地球上で最も雄大な活火山カルデラの縁に立つ圧倒的感動",
        "zh": "亲临伫立于地球上规模最宏大的活火山口边缘"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable. Recomendada para viajeros activos amantes del senderismo y la geología.",
      "en": "Customizable Add-On. Recommended for active hikers and geology enthusiasts.",
      "fr": "Activité optionnelle sur mesure pour amateurs de randonnée.",
      "de": "Zusatzaktivität auf Anfrage für begeisterte Wanderer.",
      "it": "Attività su misura consigliata agli amanti del trekking.",
      "pt": "Atividade adicional para quem gosta de caminhadas.",
      "ja": "追加カスタマイズ可能。本格的なトレッキングや火山地質学を愛する旅行者に大推薦。",
      "zh": "可选定制附加活动。强烈推荐给热爱高难度徒步与火山地质摄影的户外探险爱好者。"
    }
  },
  {
    "id": "is-concha-de-perla",
    "name": {
      "es": "Snorkel Libre con Lobos Marinos y Rayas en Concha de Perla",
      "en": "Concha de Perla Tidal Pool Snorkeling with Sea Lions & Rays",
      "fr": "Snorkeling libre à Concha de Perla avec Otaries et Raies",
      "de": "Freies Schnorcheln in Concha de Perla mit Seelöwen & Rochen",
      "it": "Snorkeling libero a Concha de Perla con Leoni Marini e Razze",
      "pt": "Snorkel livre em Concha de Perla com Leões-Marinhos e Raias",
      "ja": "コンチャ・デ・ペルラ天然潮だまりスノーケル（アシカ＆エイとの遭遇）",
      "zh": "孔查德佩尔拉天然珍珠潮汐泻湖浮潜"
    },
    "shortDescription": {
      "es": "Bahía natural de aguas calmas a pasos del muelle de Puerto Villamil, ideal para nadar libremente junto a lobos marinos juguetones y tortugas.",
      "en": "A calm, sheltered natural saltwater lagoon beside Puerto Villamil pier, ideal for independent snorkeling with curious sea lions and green turtles.",
      "fr": "Lagune naturelle calme à deux pas du port, parfaite pour nager avec les otaries et tortues.",
      "de": "Ruhige Gezeitenlagune nahe dem Hafen von Puerto Villamil, perfekt zum Schnorcheln mit Seelöwen.",
      "it": "Laguna naturale calma vicino al molo, ideale per nuotare con leoni marini curiosi e tartarughe.",
      "pt": "Lagoa natural calma ao lado do píer, ideal para nadar livremente com leões-marinhos e tartarugas.",
      "ja": "港のすぐ隣に位置する静穏な天然ラグーン。人懐っこいアシカの赤ちゃんやウミガメがすぐそばまで泳ぎ寄ってきます。",
      "zh": "毗邻维利亚米尔港码头的避风天然潮汐泻湖，是与充满好奇心的海狮幼崽、海龟自主浮潜的绝佳休闲秘境。"
    },
    "description": {
      "es": "Se accede por una pasarela de madera que cruza los manglares donde duermen leones marinos e iguanas. Concha de Perla es una piscina marina protegida por una barrera rocosa natural. Al subir la marea, entran nutrientes y fauna pelágica: peces loro, rayas águila, tortugas marinas y lobos marinos que juegan con las aletas de los bañistas.",
      "en": "Accessed via a scenic wooden boardwalk through coastal mangroves where sea lions snooze on the planks. Concha de Perla is a crystalline natural sea pool enclosed by a rocky volcanic reef. Incoming tides usher in parrotfish, spotted eagle rays, green turtles, and acrobatic sea lion pups.",
      "fr": "Piscine naturelle protégée d'accès facile à travers les mangroves avec faune marine abondante.",
      "de": "Natürlicher Meerespool, erreichbar über Holzstege, mit reicher tropischer Unterwasserwelt.",
      "it": "Piscina marina naturale protetta, ideale per osservare pesci tropicali e leoni marini.",
      "pt": "Piscina natural de águas claras com rica vida marinha e leões-marinhos brincalhões.",
      "ja": "マングローブの木道を歩いてアクセス。岩礁に守られた波のない透明な潮だまりで、愛らしいアシカが目の前で宙返りを見せてくれます。",
      "zh": "穿行于木制栈道抵达，经常能见到在栈板上打盹的海狮与海鬣蜥。避风天然泳池水质极清，随涨潮游入的鹦嘴鱼、鳐鱼和幼海狮嬉戏身旁。"
    },
    "island": "isabela",
    "islandName": {
      "es": "Isabela",
      "en": "Isabela Island",
      "fr": "Île Isabela",
      "de": "Insel Isabela",
      "it": "Isola Isabela",
      "pt": "Ilha Isabela",
      "ja": "イサベラ島",
      "zh": "伊莎贝拉岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Accesible todo el año; se recomienda entrar en marea alta cuando la claridad del agua y el flujo de fauna marina es óptimo.",
      "en": "Accessible 365 days; best entered during high tide when incoming waters bring peak water clarity and active marine life.",
      "fr": "Accessible toute l'année, idéal à marée haute pour une meilleure visibilité.",
      "de": "Ganzjährig zugänglich; am besten bei Flut für optimale Sicht und maximale Tierbegegnungen.",
      "it": "Accessibile tutto l'anno, preferibile con l'alta marea per la massima trasparenza.",
      "pt": "Acessível o ano todo; melhor na maré alta quando a água fica mais límpida.",
      "ja": "通年利用可能。満潮時の潮位が高い時間帯に訪れると、透明度が高く多くの海洋生物が集まります。",
      "zh": "全年免费开放。建议选择高潮水位期间前往，海水最为透亮，海洋生物聚集最多。"
    },
    "includedInTourIds": [],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Acceso directo por escalera de madera)",
      "en": "Easy (Wooden stairs into calm water)",
      "fr": "Facile",
      "de": "Leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（階段からエントリー可能）",
      "zh": "轻松（木梯平缓入水）"
    },
    "duration": {
      "es": "Flexible (1.5 - 2 horas)",
      "en": "Flexible (1.5 - 2 hours)",
      "fr": "1h30 à 2h",
      "de": "1,5 bis 2 Std.",
      "it": "1.5 - 2 ore",
      "pt": "1,5 a 2 horas",
      "ja": "自由（約1.5〜2時間）",
      "zh": "自由灵活（约1.5-2小时）"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-coastal-landscape-turquoise-bay.webp",
    "keyWildlife": [
      {
        "es": "Lobo Marino de Galápagos (Zalophus wollebaeki)",
        "en": "Galapagos Sea Lion",
        "fr": "Otarie des Galápagos",
        "de": "Galapagos-Seelöwe",
        "it": "Leone marino delle Galapagos",
        "pt": "Leão-marinho-de-galápagos",
        "ja": "ガラパゴスアシカ",
        "zh": "加拉帕戈斯海狮"
      },
      {
        "es": "Tortuga Marina Verde",
        "en": "Green Sea Turtle",
        "fr": "Tortue verte",
        "de": "Grüne Meeresschildkröte",
        "it": "Tartaruga verde",
        "pt": "Tartaruga-verde",
        "ja": "アオウミガメ",
        "zh": "绿海龟"
      }
    ],
    "highlights": [
      {
        "es": "Snorkel espontáneo y relajado a tu propio ritmo",
        "en": "Spontaneous and relaxed snorkeling at your leisure",
        "fr": "Snorkeling en toute liberté",
        "de": "Entspanntes Schnorcheln im eigenen Tempo",
        "it": "Snorkeling rilassato e spontaneo",
        "pt": "Snorkel espontâneo no seu próprio ritmo",
        "ja": "時間を気にせず自分のペースで楽しめる極上のスノーケリング",
        "zh": "零距离随心自主浮潜，惬意享受悠闲午后时光"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Actividad Adicional Opcional. No requiere lancha ni permisos de navegación. Recomendado para tardes libres en Isabela.",
      "en": "Optional Leisure Add-On. No boat permit required; perfect for relaxing afternoons in Isabela.",
      "fr": "Activité libre sans bateau, idéale pour un après-midi.",
      "de": "Kostenlose Zusatzaktivität ohne Bootspflicht.",
      "it": "Attività libera ideale per i pomeriggi a Isabela.",
      "pt": "Atividade livre perfeita para tardes livres.",
      "ja": "自由時間にお気軽に楽しめるおすすめスポット。ボート手配不要。",
      "zh": "轻松自选自由行活动。无需预约出海船只，极力推荐在伊莎贝拉过夜期间的下午探访。"
    }
  },
  {
    "id": "sc-interpretation-center",
    "name": {
      "es": "Centro de Interpretación Gianni Arismendy (Historia Natural y Humana)",
      "en": "Gianni Arismendy Interpretation Center (Natural & Human History)",
      "fr": "Centre d'Interprétation Gianni Arismendy (Histoire Naturelle & Humaine)",
      "de": "Interpretationszentrum Gianni Arismendy (Natur & Geschichte)",
      "it": "Centro di Interpretazione Gianni Arismendy (Storia Naturale e Umana)",
      "pt": "Centro de Interpretação Gianni Arismendy (História Natural e Humana)",
      "ja": "ジャンニ・アリスメンディ解説センター（自然科学・歴史探訪）",
      "zh": "詹尼·阿里斯门迪解说中心（自然与人文历史）"
    },
    "shortDescription": {
      "es": "Exhibiciones de vanguardia que narran el origen geológico, la evolución biológica y las historias de piratas y colonos en San Cristóbal.",
      "en": "State-of-the-art interactive museum covering the archipelago's volcanic genesis, Darwinian evolution, and colorful pirate settlement history.",
      "fr": "Musée moderne retraçant l'origine géologique, l'évolution et les histoires de pirates de San Cristóbal.",
      "de": "Modernes Museum über die Entstehung, Evolution und Besiedlung der Galapagosinseln.",
      "it": "Museo interattivo che racconta l'origine vulcanica, l'evoluzione e la storia dei pirati alle Galapagos.",
      "pt": "Museu moderno narrando a origem geológica, evolução e histórias de piratas em San Cristóbal.",
      "ja": "火山の誕生からダーウィンの進化論、海賊や入植者の数奇な歴史までをわかりやすく紐解くサンクリストバル島の総合博物館。",
      "zh": "生动展示加拉帕戈斯火山诞生、达尔文进化论以及海盗与殖民者传奇历史的现代化综合解说中心。"
    },
    "description": {
      "es": "Ubicado en las afueras de Puerto Baquerizo Moreno, este moderno complejo educativo ofrece salas interactivas dedicadas al origen volcánico del archipiélago, el impacto de las corrientes marinas, las especies endémicas y la compleja historia humana desde los piratas balleneros hasta los esfuerzos modernos de conservación.",
      "en": "Perched along the coastal bluffs of Puerto Baquerizo Moreno, this thoughtfully designed center features exhibits on volcanic plate tectonics, ocean currents, endemic flora and fauna, and the intriguing human saga of whalers, convicts, and conservationists.",
      "fr": "Complexe éducatif moderne surplombant la côte, présentant la géologie, la faune et l'histoire humaine des îles.",
      "de": "Pädagogisches Zentrum nahe Puerto Baquerizo Moreno über Geologie, Meeresströmungen und Inselgeschichte.",
      "it": "Centro culturale e scientifico dedicato alle origini vulcaniche e alla storia delle Galapagos.",
      "pt": "Espaço educativo com ricas exposições sobre geologia, correntes marítimas e conservação.",
      "ja": "プエルト・バケリソ・モレノの海岸線に位置。地殻変動の模型や海流のメカニズム、入植の歴史をじっくり学べます。",
      "zh": "坐落于巴克里索莫雷诺港海湾旁，通过多媒体展厅生动重现地壳板块运动、秘鲁洋流交汇与群岛百年人文沧桑。"
    },
    "island": "san-cristobal",
    "islandName": {
      "es": "San Cristóbal",
      "en": "San Cristobal",
      "fr": "San Cristóbal",
      "de": "San Cristóbal",
      "it": "San Cristóbal",
      "pt": "San Cristóbal",
      "ja": "サンクリストバル島",
      "zh": "圣克里斯托巴尔岛"
    },
    "category": "history-conservation",
    "categoryName": {
      "es": "Historia, Darwin & Conservación",
      "en": "History, Darwin & Conservation",
      "fr": "Histoire, Darwin & Conservation",
      "de": "Geschichte, Darwin & Artenschutz",
      "it": "Storia, Darwin e Conservazione",
      "pt": "História, Darwin e Conservação",
      "ja": "ダーウィン歴史探訪＆自然保護",
      "zh": "达尔文历史与生态保护"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Abierto todo el año con salas techadas y senderos costeros arbolados.",
      "en": "Open year-round with air-conditioned pavilions and shaded walking trails.",
      "fr": "Ouvert toute l'année, agréable par tous les temps.",
      "de": "Ganzjährig geöffnet mit klimatisierten Ausstellungsräumen.",
      "it": "Aperto tutto l'anno con sale coperte e sentieri ombreggiati.",
      "pt": "Aberto o ano todo com salas climatizadas e trilhas arborizadas.",
      "ja": "通年見学可能。冷房の効いた快適な展示室と木陰の遊歩道が整備されています。",
      "zh": "全年开放，设有恒温展览馆与绿树成荫的海滨漫步道。"
    },
    "includedInTourIds": [
      "galapagos-8days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Caminos adoquinados y salas)",
      "en": "Easy (Paved walking trails)",
      "fr": "Facile",
      "de": "Leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（舗装された遊歩道）",
      "zh": "轻松（平整铺设步道）"
    },
    "duration": {
      "es": "1.5 - 2 horas",
      "en": "1.5 - 2 hours",
      "fr": "1h30 à 2h",
      "de": "1,5 bis 2 Std.",
      "it": "1.5 - 2 ore",
      "pt": "1,5 a 2 horas",
      "ja": "約1.5〜2時間",
      "zh": "约1.5-2小时"
    },
    "imageUrl": "/images/destinations/galapagos/SAN-CRISTOBAL-GALAPAGOS-2.jpg",
    "keyWildlife": [
      {
        "es": "Lagartija de Lava de San Cristóbal (Microlophus bivittatus)",
        "en": "San Cristobal Lava Lizard",
        "fr": "Lézard de lave de San Cristóbal",
        "de": "San Cristóbal Lava-Echse",
        "it": "Lucertola di lava di San Cristóbal",
        "pt": "Lagartixa-de-lava-de-san-cristóbal",
        "ja": "サンクリストバルヨウガントカゲ",
        "zh": "圣克里斯托巴尔熔岩蜥"
      },
      {
        "es": "Cucuve de San Cristóbal (Mimus melanotis)",
        "en": "San Cristobal Mockingbird",
        "fr": "Moqueur de San Cristóbal",
        "de": "San Cristóbal Spottdrossel",
        "it": "Mimo di San Cristóbal",
        "pt": "Mímico-de-san-cristóbal",
        "ja": "サンクリストバルマネシツグミ",
        "zh": "圣克里斯托巴尔嘲鸫"
      }
    ],
    "highlights": [
      {
        "es": "Comprender a fondo la fragilidad y maravilla ecológica de Galápagos",
        "en": "Gaining deep understanding of Galapagos’ fragile ecological marvels",
        "fr": "Comprendre l'histoire et la fragilité de l'archipel",
        "de": "Tiefes Verständnis für die ökologische Einzigartigkeit",
        "it": "Capire l'equilibrio ecologico e storico delle isole",
        "pt": "Compreender a riqueza e fragilidade ecológica das ilhas",
        "ja": "群島の誕生と進化の秘密を深く学べる知的好奇心を満たす空間",
        "zh": "深度解读加拉帕戈斯脆弱而神奇的自然平衡与进化历程"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en el tour base de 8 Días (Gran Odisea).",
      "en": "Included in the 8-Day Grand Odyssey base tour.",
      "fr": "Inclus dans le circuit de 8 jours.",
      "de": "In der 8-Tage-Odyssee enthalten.",
      "it": "Incluso nel tour di 8 giorni.",
      "pt": "Incluído no tour de 8 dias.",
      "ja": "8日間グランド・オデッセイツアーに標準搭載。",
      "zh": "已包含在8日三岛大跨越基础行程中。"
    }
  },
  {
    "id": "sc-cerro-tijeretas",
    "name": {
      "es": "Mirador de Cerro Tijeretas y Snorkel en Bahía Tijeretas",
      "en": "Cerro Tijeretas Frigatebird Lookout & Bay Snorkel",
      "fr": "Belvédère Cerro Tijeretas & Snorkeling en Baie",
      "de": "Cerro Tijeretas Fregattvogel-Aussichtspunkt & Bucht-Schnorcheln",
      "it": "Belvedere Cerro Tijeretas e Snorkeling nella Baia",
      "pt": "Mirante Cerro Tijeretas e Snorkel na Baía",
      "ja": "ティヘレタスの丘（グンカンドリの展望台）＆透明入江でのスノーケリング",
      "zh": "军舰鸟丘全景观景台与梯赫雷塔斯湾清澈浮潜"
    },
    "shortDescription": {
      "es": "Sube al mirador donde anidan las dos especies de fragatas y desciende a hacer snorkel en una caleta cristalina con lobos marinos.",
      "en": "Hike to the scenic ridge where both Great and Magnificent Frigatebirds nest simultaneously, then descend to snorkel in a crystal-clear bay with sea lions.",
      "fr": "Montez au belvédère des frégates puis faites du snorkeling dans une crique aux eaux transparentes.",
      "de": "Wanderung zum Nistplatz beider Fregattvogel-Arten mit anschließendem Schnorcheln in einer kristallklaren Bucht.",
      "it": "Salita al belvedere delle fregate e discesa per uno snorkeling meraviglioso con i leoni marini.",
      "pt": "Trilha até o mirante com ninhais de fragatas e descida para snorkel com leões-marinhos.",
      "ja": "2種類のグンカンドリが営巣する絶景の丘を歩き、エメラルドに澄み渡る入江でアシカたちとスノーケリング。",
      "zh": "登临两种军舰鸟同栖筑巢的壮丽山脊观景台，随后下潜至晶莹剔透的入海峡湾与海狮同游。"
    },
    "description": {
      "es": "Este cerro lleva el nombre local de las fragatas (\"tijeretas\") por la forma de tijera de su cola. Es uno de los pocos lugares del mundo donde la fragata real (Fregata magnificens) y la fragata común (Fregata minor) anidan en los mismos árboles. Desde el mirador de madera la panorámica del océano y León Dormido es sublime; abajo, una plataforma permite ingresar al agua para nadar con lobos marinos y rayas.",
      "en": "Named after the frigatebirds whose scissor-like tails give them the local moniker \"tijeretas\". It is one of the rare global locations where Great and Magnificent frigatebirds nest in shared canopies. The summit overlook reveals staggering vistas of Kicker Rock, while a stairs-equipped cove below offers pristine snorkeling alongside playful sea lions.",
      "fr": "Colline nommée d'après la queue en ciseaux des frégates, avec vue sublime sur Kicker Rock et snorkeling.",
      "de": "Benannt nach den Fregattvögeln, bietet der Hügel spektakuläre Ausblicke auf Kicker Rock und erstklassiges Schnorcheln.",
      "it": "Collina famosa per i nidi di fregate, vista magnifica su Kicker Rock e snorkeling con leoni marini.",
      "pt": "Colina famosa pelas fragatas, com vista deslumbrante de Kicker Rock e mergulho com leões-marinhos.",
      "ja": "ハサミのような尾羽を持つグンカンドリ（ティヘレタス）から名付けられた丘。頂上からは遠くキッカーロックを望み、入江では人懐っこいアシカと泳げます。",
      "zh": "因军舰鸟标志性的剪刀状尾羽而得名。全球极少数两类军舰鸟同株共巢的宝地。山顶俯瞰踢脚石海景，峡湾下设专用下水阶梯与海狮亲密浮潜。"
    },
    "island": "san-cristobal",
    "islandName": {
      "es": "San Cristóbal",
      "en": "San Cristobal",
      "fr": "San Cristóbal",
      "de": "San Cristóbal",
      "it": "San Cristóbal",
      "pt": "San Cristóbal",
      "ja": "サンクリストバル島",
      "zh": "圣克里斯托巴尔岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Las fragatas anidan todo el año; los machos inflan sus buches rojos en exhibición de cortejo entre marzo y octubre.",
      "en": "Frigatebirds reside year-round; males inflate massive scarlet throat pouches during courtship display peaks from March to October.",
      "fr": "Nidification toute l'année, mâles avec sac gulaire rouge gonflé de mars à octobre.",
      "de": "Ganzjährig nistend; Männchen blähen ihre roten Kehlsäcke besonders zwischen März und Oktober auf.",
      "it": "Nidificazione tutto l'anno con sacchi golari rossi gonfiati soprattutto tra marzo e ottobre.",
      "pt": "Nidificação o ano todo com papos vermelhos inflados entre março e outubro.",
      "ja": "グンカンドリは通年営巣。3月〜10月はオスの求愛期で、真っ赤な喉袋を大きく風船のように膨らませる圧巻の姿に出会えます。",
      "zh": "军舰鸟全年在此筑巢繁衍；每年3月至10月雄鸟会将鲜红喉囊充气如球，向空中盘旋求偶。"
    },
    "includedInTourIds": [
      "galapagos-8days"
    ],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Caminata en gradas + Snorkel)",
      "en": "Moderate (Stair steps hike + Snorkeling)",
      "fr": "Modéré (Escaliers et nage)",
      "de": "Moderat (Treppenstufen & Schnorcheln)",
      "it": "Moderato (Scale e nuoto)",
      "pt": "Moderado (Escadarias e nado)",
      "ja": "中級（階段の上り下り＋スノーケル）",
      "zh": "中等（石阶徒步与浮潜）"
    },
    "duration": {
      "es": "Medio Día (3 horas)",
      "en": "Half Day (3 hours)",
      "fr": "Demi-journée (3h)",
      "de": "Halber Tag (3 Std.)",
      "it": "Mezza Giornata (3 ore)",
      "pt": "Meio Dia (3 horas)",
      "ja": "約3時間",
      "zh": "约3小时"
    },
    "imageUrl": "/images/tours/9-16/tijeretas-hill-9-16.webp",
    "keyWildlife": [
      {
        "es": "Fragata Real (Fregata magnificens)",
        "en": "Magnificent Frigatebird",
        "fr": "Frégate superbe",
        "de": "Prachtfregattvogel",
        "it": "Fregata magnifica",
        "pt": "Fragata-magnífica",
        "ja": "アメリカグンカンドリ",
        "zh": "丽色军舰鸟"
      },
      {
        "es": "Fragata Común (Fregata minor)",
        "en": "Great Frigatebird",
        "fr": "Frégate du Pacifique",
        "de": "Bindenfregattvogel",
        "it": "Fregata maggiore",
        "pt": "Fragata-grande",
        "ja": "オオグンカンドリ",
        "zh": "大军舰鸟"
      },
      {
        "es": "Lobo Marino de Galápagos",
        "en": "Galapagos Sea Lion",
        "fr": "Otarie des Galápagos",
        "de": "Galapagos-Seelöwe",
        "it": "Leone marino delle Galapagos",
        "pt": "Leão-marinho-de-galápagos",
        "ja": "ガラパゴスアシカ",
        "zh": "加拉帕戈斯海狮"
      }
    ],
    "highlights": [
      {
        "es": "Ver a machos de fragata con el buche rojo inflado a pocos metros del sendero",
        "en": "Observing courting male frigatebirds displaying glowing scarlet throat sacs",
        "fr": "Observer les frégates au buche rouge gonflé",
        "de": "Fregattvogelmännchen mit leuchtend roten Kehlsäcken",
        "it": "Maschi di fregata con sacco rosso gonfiato a pochi metri",
        "pt": "Machos de fragata com papo vermelho inflado bem perto",
        "ja": "目の前の木の枝で真っ赤な喉袋を膨らませるオスのグンカンドリ",
        "zh": "步道旁近距离拍摄雄性军舰鸟鼓起宛如红色爱心气球的求偶求爱奇景"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en el tour base de 8 Días (Gran Odisea).",
      "en": "Included in 8-Day Grand Odyssey.",
      "fr": "Inclus dans le tour 8 jours.",
      "de": "In der 8-Tage-Tour enthalten.",
      "it": "Incluso nel tour 8 giorni.",
      "pt": "Incluído no tour de 8 dias.",
      "ja": "8日間ツアーに標準搭載。",
      "zh": "已包含在8日基础探险行程中。"
    }
  },
  {
    "id": "sc-la-loberia",
    "isIconic": true,
    "name": {
      "es": "Santuario de Lobos Marinos en Playa La Lobería y Acantilados",
      "en": "La Lobería Beach & Sea Lion Colony Coastal Sanctuary",
      "fr": "Plage La Lobería et Sanctuaire d'Otaries de San Cristóbal",
      "de": "Strand La Lobería & Seelöwen-Schutzgebiet",
      "it": "Spiaggia La Lobería e Colonia di Leoni Marini",
      "pt": "Praia La Lobería e Santuário de Leões-Marinhos",
      "ja": "ラ・ロベリア ビーチ＆アシカの大コロニーと海鳥の断崖",
      "zh": "拉洛贝里亚海滩海狮栖息地与海鸟悬崖"
    },
    "shortDescription": {
      "es": "Playa de arena blanca en forma de media luna habitada por una masiva colonia de lobos marinos e iguanas marinas gigantes.",
      "en": "Crescent-shaped coral sand beach hosting a massive nursery colony of Galapagos sea lions and colossal marine iguanas.",
      "fr": "Plage en croissant de lune abritant une grande colonie d'otaries et de grandes iguanes marines.",
      "de": "Halbmondförmiger Korallenstrand mit einer großen Seelöwenkolonie und Meerechsen.",
      "it": "Spiaggia a mezzaluna con una numerosa colonia di leoni marini e grandi iguane.",
      "pt": "Praia em forma de meia-lua habitada por uma grande colônia de leões-marinhos e iguanas.",
      "ja": "白砂の三日月ビーチにアシカの母子が群れ集う楽園。沖合のサンゴ礁ではウミガメやエイとスノーケリング。",
      "zh": "新月形的纯净珊瑚沙滩，栖息着规模庞大的加拉帕戈斯海狮母子育幼群与巨型海鬣蜥。"
    },
    "description": {
      "es": "Ubicada a 10 minutos de Puerto Baquerizo Moreno, La Lobería es el hogar de una de las mayores concentraciones de lobos marinos del archipiélago. Las crías juegan en las pozas de marea mientras los grandes machos patrullan la orilla. El sendero continúa hacia los acantilados donde planean gaviotas de cola bifurcada y piqueros nazca.",
      "en": "Located minutes from Puerto Baquerizo Moreno, La Lobería is home to one of Galapagos' most energetic sea lion colonies. Pups romp playfully in protected shallows while dominant beachmasters patrol the surf. A rocky path continues to scenic ocean cliffs frequented by swallow-tailed gulls and Nazca boobies.",
      "fr": "L'un des plus grands rassemblements d'otaries avec sentier vers les falaises aux oiseaux marins.",
      "de": "Große Seelöwen-Kinderstube mit Wanderweg zu steilen Klippen voller Seevögel.",
      "it": "Una delle maggiori colonie di leoni marini con sentiero panoramico sulle scogliere.",
      "pt": "Uma das maiores concentrações de leões-marinhos com trilha até falésias com aves marinhas.",
      "ja": "プエルト・バケリソ・モレノ近郊。愛くるしいアシカの赤ちゃんが浅瀬で戯れ、奥の断崖ではアカメカモメやアオアシカツオドリが雄大に舞い上がります。",
      "zh": "距离巴克里索莫雷诺港仅数分钟车程，是群岛海狮密度最高的海湾之一。幼崽在浅滩嬉闹，步道延伸至栖息燕尾鸥与纳斯卡鲣鸟的悬崖峭壁。"
    },
    "island": "san-cristobal",
    "islandName": {
      "es": "San Cristóbal",
      "en": "San Cristobal",
      "fr": "San Cristóbal",
      "de": "San Cristóbal",
      "it": "San Cristóbal",
      "pt": "San Cristóbal",
      "ja": "サンクリストバル島",
      "zh": "圣克里斯托巴尔岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marina & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De agosto a diciembre nacen las crías de lobo marino, llenando la playa de cachorros curiosos que buscan interactuar en el agua.",
      "en": "From August to December, newborn sea lion pups populate the nursery shallows, eager to splash beside snorkelers.",
      "fr": "Naissances des bébés otaries d'août à décembre, très joueurs dans l'eau.",
      "de": "August bis Dezember ist Geburtszeit der Seelöwenbabys mit extrem verspieltem Nachwuchs.",
      "it": "Da agosto a dicembre nascono i cuccioli di leone marino molto giocherelloni.",
      "pt": "De agosto a dezembro nascem os filhotes de leão-marinho super brincalhões.",
      "ja": "8月〜12月はアシカの出産・育児シーズン。好奇心いっぱいの子どもアシカたちが水中でスノーケラーに近寄ってきます。",
      "zh": "每年8月至12月是海狮幼崽出生高峰期，沙滩与浅海遍布活泼亲人、与潜水员好奇互动的萌趣海狮宝宝。"
    },
    "includedInTourIds": [
      "galapagos-8days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Caminata de arena y rocas)",
      "en": "Easy (Sand & coastal path)",
      "fr": "Facile",
      "de": "Leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（砂浜と海岸沿いの平坦路）",
      "zh": "轻松（沙滩与平坦海滨小径）"
    },
    "duration": {
      "es": "Medio Día (2.5 - 3 horas)",
      "en": "Half Day (2.5 - 3 hours)",
      "fr": "2h30 à 3h",
      "de": "2,5 bis 3 Std.",
      "it": "2.5 - 3 ore",
      "pt": "2,5 a 3 horas",
      "ja": "約2.5〜3時間",
      "zh": "约2.5-3小时"
    },
    "imageUrl": "/images/tours/9-16/galapagos-loberia-9-16.webp",
    "keyWildlife": [
      {
        "es": "Lobo Marino de Galápagos (Zalophus wollebaeki)",
        "en": "Galapagos Sea Lion",
        "fr": "Otarie des Galápagos",
        "de": "Galapagos-Seelöwe",
        "it": "Leone marino delle Galapagos",
        "pt": "Leão-marinho-de-galápagos",
        "ja": "ガラパゴスアシカ",
        "zh": "加拉帕戈斯海狮"
      },
      {
        "es": "Gaviota de Cola Bifurcada (Creagrus furcatus)",
        "en": "Swallow-tailed Gull",
        "fr": "Mouette à queue fourchue",
        "de": "Gabelschwanzmöwe",
        "it": "Gabbiano coda di rondine",
        "pt": "Gaivota-de-rabo-de-andorinha",
        "ja": "アカメカモメ",
        "zh": "燕尾鸥"
      },
      {
        "es": "Iguana Marina de San Cristóbal",
        "en": "San Cristobal Marine Iguana",
        "fr": "Iguane marin de San Cristóbal",
        "de": "San Cristóbal Meerechse",
        "it": "Iguana marina di San Cristóbal",
        "pt": "Iguana-marinha-de-san-cristóbal",
        "ja": "サンクリストバルウミイグアナ",
        "zh": "圣克里斯托巴尔海鬣蜥"
      }
    ],
    "highlights": [
      {
        "es": "Nadar junto a cachorros de lobo marino en aguas cristalinas poco profundas",
        "en": "Snorkeling alongside inquisitive sea lion pups in shallow emerald waters",
        "fr": "Nager avec des bébés otaries curieux",
        "de": "Schwimmen mit neugierigen Seelöwenbabys",
        "it": "Nuotare con cuccioli di leone marino in acque poco profonde",
        "pt": "Nadar com filhotes de leão-marinho na beira da praia",
        "ja": "浅瀬でくるくる旋回しながら遊ぶ愛らしい子アシカとのスイム",
        "zh": "在浅水翡翠海湾与天真无邪的幼海狮并肩畅游"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Incluido en el tour base de 8 Días (Gran Odisea).",
      "en": "Included in the 8-Day Grand Odyssey base tour.",
      "fr": "Inclus dans le circuit 8 jours.",
      "de": "In der 8-Tage-Tour enthalten.",
      "it": "Incluso nel tour 8 giorni.",
      "pt": "Incluído no tour de 8 dias.",
      "ja": "8日間ツアーに標準搭載。",
      "zh": "已包含在8日基础探险行程中。"
    }
  },
  {
    "id": "sc-kicker-rock-leon-dormido",
    "isIconic": true,
    "name": {
      "es": "Circunnavegación y Snorkel en León Dormido (Kicker Rock) con Tiburones Galápagos",
      "en": "Kicker Rock (León Dormido) Shark Snorkel & Circumnavigation",
      "fr": "Circumnavigation et Snorkeling à Kicker Rock (León Dormido)",
      "de": "Kicker Rock (León Dormido) Haie-Schnorcheln & Bootsumrundung",
      "it": "Circumnavigazione e Snorkeling a Kicker Rock (León Dormido)",
      "pt": "Circunavegação e Snorkel em León Dormido (Kicker Rock)",
      "ja": "キッカーロック（眠れる獅子）周遊クルーズ＆ガラパゴスザメ・スノーケリング",
      "zh": "踢脚石（睡狮岩）深蓝环岛巡航与加拉帕戈斯鲨深水浮潜"
    },
    "shortDescription": {
      "es": "El monolito volcánico más icónico de San Cristóbal: haz snorkel en un canal de 140 metros de profundidad entre tiburones martillo y rayas águila.",
      "en": "San Cristobal’s legendary volcanic obelisk rising 500 feet from the ocean: snorkel through a vertical cleft alongside Galapagos sharks, hammerheads, and eagle rays.",
      "fr": "Monolithe volcanique mythique : nagez dans un chenal de 140 m entre requins des Galápagos, requins marteaux et raies.",
      "de": "Der legendäre Felsmonolith: Schnorcheln Sie durch die dramatische Meeresschlucht mit Galapagoshaien und Rochen.",
      "it": "Monolito vulcanico iconico: snorkeling tra pareti verticali e squali delle Galapagos, martello e razze.",
      "pt": "Monólito vulcânico lendário: nade pelo canal entre paredões rochosos com tubarões e raias.",
      "ja": "海面から約140m直立する巨大な岩礁の割れ目をスノーケリング。ガラパゴスザメやシュモクザメ、マダラトビエイが足元を泳ぎ去る大迫力。",
      "zh": "高耸出海面近150米的传奇垂直熔岩巨碑：穿梭于绝壁劈开的深邃海峡，与加拉帕戈斯真鲨、双髻鲨和鹰鳐并肩漫游。"
    },
    "description": {
      "es": "Navegación de día completo desde Puerto Baquerizo Moreno hacia este imponente cono de toba volcánica partido en dos mitades. El barco circunnavega la formación para avistar piqueros de patas azules y fragatas anidando en las cornisas. Luego nos lanzamos al canal central donde la visibilidad oceánica es infinita: tiburones de Galápagos, tortugas marinas carey y gigantescos cardúmenes de peces cirujano.",
      "en": "Full-day navigable expedition from Puerto Baquerizo Moreno to this soaring volcanic tuff cone split in two. The boat circles the cliffs teeming with nesting Nazca boobies and frigatebirds. Jump into the dramatic central channel for world-renowned deep snorkeling among Galapagos sharks, turtles, and spotted eagle ray squadrons.",
      "fr": "Excursion en bateau vers l'imposant cône de tuf volcanique, avec snorkeling dans le chenal central profond.",
      "de": "Ganztägiger Bootsausflug zum zweigeteilten Vulkankegel mit Weltklasse-Schnorcheln im tiefen Meereskanal.",
      "it": "Escursione in barca al celebre cono vulcanico con snorkeling d'eccellenza nel canale centrale.",
      "pt": "Expedição de dia inteiro até o obelisco vulcânico com mergulho espetacular no canal central.",
      "ja": "バケリソ・モレノ港から終日出航。真っ二つに割れた巨大な凝灰岩の断崖を周遊後、深海峡のドロップオフへエントリー。透明度抜群の群青の海で大型海洋生物を狙います。",
      "zh": "从巴克里索莫雷诺港乘坐出海游艇全天巡航。环绕栖息着无数纳斯卡鲣鸟的陡峭海崖后跳入深海通道，见证远洋鲨鱼与巨型鱼群在蔚蓝深渊中穿梭。"
    },
    "island": "san-cristobal",
    "islandName": {
      "es": "San Cristóbal",
      "en": "San Cristobal",
      "fr": "San Cristóbal",
      "de": "San Cristóbal",
      "it": "San Cristóbal",
      "pt": "San Cristóbal",
      "ja": "サンクリストバル島",
      "zh": "圣克里斯托巴尔岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year",
      "cool"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De junio a noviembre las corrientes traen la mayor abundancia de tiburones martillo y rayas águila. Agua fresca (20-22°C, se incluye neopreno).",
      "en": "June through November brings optimal pelagic abundance with frequent hammerhead pods. Wetsuits provided for cooler waters (68-72°F).",
      "fr": "De juin à novembre, les courants attirent un maximum de requins marteaux et raies léopards.",
      "de": "Juni bis November bietet die höchste Wahrscheinlichkeit für Hammerhaie und Adlerrochen.",
      "it": "Da giugno a novembre la corrente ricca di nutrienti attira squali martello e razze.",
      "pt": "De junho a novembro as correntes trazem maior abundância de tubarões e raias.",
      "ja": "6月〜11月はプランクトン豊富な海流により、シュモクザメや大型トビエイとの遭遇率が急上昇します（ウェットスーツ貸出）。",
      "zh": "6月至11月期间洋流营养充沛，双髻鲨与鹰鳐群最为多见，提供全套保暖潜水服。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Snorkel en aguas abiertas profundas)",
      "en": "Moderate (Open-ocean deep snorkeling)",
      "fr": "Modéré (Nage en pleine mer)",
      "de": "Moderat (Freiwasser-Schnorcheln)",
      "it": "Moderato (Nuoto in mare aperto)",
      "pt": "Moderedo (Snorkel em mar aberto)",
      "ja": "中級（外洋・深海でのスノーケリング）",
      "zh": "中等（外海深水区开放水域浮潜）"
    },
    "duration": {
      "es": "Día Completo (7 horas con playa virgen)",
      "en": "Full Day (7 hours incl. pristine beach)",
      "fr": "Journée complète (7h avec plage)",
      "de": "Ganztags (7 Std. inkl. Strand)",
      "it": "Giornata intera (7 ore con spiaggia)",
      "pt": "Dia inteiro (7 horas com praia)",
      "ja": "終日（約7時間、無人ビーチ上陸付き）",
      "zh": "全天（约7小时，含私密荒岛沙滩登陆）"
    },
    "imageUrl": "/images/tours/16-9/galapagos-snorkeling-16-9.webp",
    "keyWildlife": [
      {
        "es": "Tiburón de Galápagos (Carcharhinus galapagensis)",
        "en": "Galapagos Shark",
        "fr": "Requin des Galápagos",
        "de": "Galapagoshai",
        "it": "Squalo delle Galapagos",
        "pt": "Tubarão-de-galápagos",
        "ja": "ガラパゴスザメ",
        "zh": "加拉帕戈斯真鲨"
      },
      {
        "es": "Tiburón Martillo (Sphyrna lewini)",
        "en": "Scalloped Hammerhead Shark",
        "fr": "Requin-marteau halicorne",
        "de": "Hammerhai",
        "it": "Squalo martello",
        "pt": "Tubarão-martelo",
        "ja": "アカシュモクザメ",
        "zh": "双髻鲨"
      },
      {
        "es": "Piquero de Nazca (Sula granti)",
        "en": "Nazca Booby",
        "fr": "Fou de Nazca",
        "de": "Nazcatölpel",
        "it": "Sula di Nazca",
        "pt": "Atobá-de-nazca",
        "ja": "ナスカカツオドリ",
        "zh": "纳斯卡鲣鸟"
      }
    ],
    "highlights": [
      {
        "es": "Nadar entre las dos inmensas paredes verticales de roca que caen al abismo",
        "en": "Snorkeling between two sheer basalt monolith walls descending into the blue abyss",
        "fr": "Nager entre deux parois rocheuses monumentales",
        "de": "Schnorcheln zwischen zwei gigantischen Felswänden",
        "it": "Nuotare tra due imponenti pareti di roccia a strapiombo",
        "pt": "Nadar entre dois imensos paredões de pedra vulcânica",
        "ja": "深海へと落ち込む巨大な2枚の絶壁の間を泳ぐ大冒険",
        "zh": "穿行于两座直插深海万丈深渊的庞大玄武岩绝壁石缝之间"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Estrella en San Cristóbal. Se cotiza como excursión navegable de día completo con almuerzo a bordo.",
      "en": "Signature Premier Add-On in San Cristobal. Quoted as full-day navigable yacht tour with chef-prepared lunch.",
      "fr": "Activité phare sur San Cristóbal avec déjeuner à bord.",
      "de": "Absolutes Highlight auf San Cristóbal mit Yachtfahrt und Verpflegung.",
      "it": "Attività opzionale top a San Cristóbal con pranzo a bordo.",
      "pt": "Atividade estrela adicional em San Cristóbal com almoço a bordo.",
      "ja": "【サンクリストバル島・一番人気】終日ヨットクルーズ、船上ランチ、無人ビーチ上陸を含む最高峰追加ツアー。",
      "zh": "【圣克里斯托巴尔岛头牌出海项目】全天出海游艇航行，含船长现做午餐及避世无人白沙滩登陆。"
    }
  },
  {
    "id": "sc-punta-pitt",
    "name": {
      "es": "Expedición a Punta Pitt: El Único Lugar con las 3 Especies de Piqueros",
      "en": "Punta Pitt Expedition: The Only Site with All 3 Booby Species",
      "fr": "Expédition à Punta Pitt: L'Unique Site avec les 3 Espèces de Fous",
      "de": "Punta Pitt Expedition: Der einzige Ort mit allen 3 Tölpelarten",
      "it": "Spedizione a Punta Pitt: L'Unico Sito con le 3 Specie di Sule",
      "pt": "Expedição a Punta Pitt: O Único Local com as 3 Espécies de Atobás",
      "ja": "プンタ・ピット探検：世界で唯一3種のカツオドリが共生する奇跡の岬",
      "zh": "皮特角探险：全球唯一汇聚三大鲣鸟物种的自然奇迹"
    },
    "shortDescription": {
      "es": "Trekking sobre conos de toba volcánica dorada en el extremo oriental de Galápagos, donde anidan juntos piqueros patas azules, patas rojas y de nazca.",
      "en": "Trek across dramatic golden tuff cliffs at the easternmost point of Galapagos, the only nesting ground shared by blue-footed, red-footed, and Nazca boobies.",
      "fr": "Randonnée sur des falaises dorées où nichent côte à côte les 3 espèces de fous.",
      "de": "Wanderung über goldene Tuffsteinfelsen, wo Blaufuß-, Rotfuß- und Nazcatölpel gemeinsam brüten.",
      "it": "Trekking su falesie dorate dove nidificano insieme le 3 specie di sule.",
      "pt": "Trilha sobre falésias douradas onde nidificam juntas as 3 espécies de atobás.",
      "ja": "ガラパゴス諸島最東端。オリーブグリーンの鉱物砂浜から登り、アオアシ、アカアシ、ナスカカツオドリの3種が同時に営巣する奇跡の丘へ。",
      "zh": "徒步于加拉帕戈斯群岛最东端的金色火山凝灰岩绝壁，见证蓝脚、红脚与纳斯卡三大鲣鸟家族同处一地的罕见奇观。"
    },
    "description": {
      "es": "Ubicada en el extremo noreste de San Cristóbal, Punta Pitt requiere desembarco en una playa de arena dorada con minerales de olivina donde descansan leones marinos. El ascenso de 2 km por conos volcánicos esculpidos por el viento ofrece vistas lunares de 360 grados. Es el único punto de todo el archipiélago donde coexisten las tres especies de piqueros: el de patas azules en el suelo, el de patas rojas en los arbustos y el de nazca en los acantilados marinos.",
      "en": "Situated on the northeast tip of San Cristobal, Punta Pitt begins with a wet landing on an olivine golden beach strewn with playful sea lions. A 1.5-mile trail climbs through eroded cinder cones with Martian vistas. It is the solitary location in Galapagos where blue-footed, red-footed, and Nazca boobies nest alongside one another.",
      "fr": "Débarquement sur une plage dorée et randonnée panoramique dans le royaume des trois fous.",
      "de": "Traumhafter Ausflug zum nordöstlichsten Punkt mit einmaliger Dreifach-Tölpel-Kolonie.",
      "it": "Sbarco su spiaggia dorata e trekking alla scoperta delle tre specie di sule.",
      "pt": "Desembarque em praia dourada e trilha panorâmica com as três espécies de atobás.",
      "ja": "サンクリストバル北東端の秘境。オリーブ色の結晶砂浜をスタートし、風食された火山丘を登坂。地上で求愛するアオアシ、木の上に巣を作るアカアシ、絶壁を守るナスカカツオドリを一度に観察。",
      "zh": "位于圣克里斯托巴尔岛东北极角。湿地登陆闪烁橄榄石光泽的金色沙滩，攀登2公里风蚀火山锥步道。地面筑巢的蓝脚鲣鸟、灌木安家的红脚鲣鸟与海边绝壁称霸的纳斯卡鲣鸟同框竞秀。"
    },
    "island": "san-cristobal",
    "islandName": {
      "es": "San Cristóbal",
      "en": "San Cristobal",
      "fr": "San Cristóbal",
      "de": "San Cristóbal",
      "it": "San Cristóbal",
      "pt": "San Cristóbal",
      "ja": "サンクリストバル島",
      "zh": "圣克里斯托巴尔岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "seasonalityNotes": {
      "es": "De mayo a octubre es el pico de actividad nupcial y anidación de las tres especies de piqueros.",
      "en": "May to October represents peak courtship, mating dances, and chick rearing across all three booby species.",
      "fr": "Mai à octobre est la période idéale pour observer parades et couvées des 3 fous.",
      "de": "Mai bis Oktober ist die aktivste Balz- und Brutzeit aller drei Tölpelarten.",
      "it": "Da maggio a ottobre è l'apice del corteggiamento per tutte e tre le specie.",
      "pt": "De maio a outubro é o auge do acasalamento e ninhadas das três espécies de atobás.",
      "ja": "5月〜10月は3種のカツオドリの求愛ダンスやヒナの給餌が最も活発に見られるベストシーズン。",
      "zh": "每年5月至10月是三大鲣鸟求偶狂欢、跳求爱舞与哺育幼鸟的最活跃黄金时期。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Ascenso sobre roca volcánica suelta)",
      "en": "Moderate (Climb over loose tuff rock)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（凝灰岩の岩山ハイク）",
      "zh": "中等（风蚀凝灰岩山地攀爬）"
    },
    "duration": {
      "es": "Día Completo (8 horas navegable)",
      "en": "Full Day (8 hours navigable yacht)",
      "fr": "Journée complète (8h)",
      "de": "Ganztags (8 Std. Yachtfahrt)",
      "it": "Giornata intera (8 ore)",
      "pt": "Dia inteiro (8 horas em iate)",
      "ja": "終日（約8時間、ヨットクルーズ）",
      "zh": "全天（约8小时游艇出海巡游）"
    },
    "imageUrl": "/images/tours/16-9/galapagos-piquero-patas-azules-16-9.1.webp",
    "keyWildlife": [
      {
        "es": "Piquero de Patas Rojas (Sula sula)",
        "en": "Red-footed Booby",
        "fr": "Fou à pattes rouges",
        "de": "Rotfußtölpel",
        "it": "Sula dai piedi rossi",
        "pt": "Atobá-de-patas-vermelhas",
        "ja": "アカアシカツオドリ",
        "zh": "红脚鲣鸟"
      },
      {
        "es": "Piquero de Patas Azules (Sula nebouxii)",
        "en": "Blue-footed Booby",
        "fr": "Fou à pieds bleus",
        "de": "Blaufußtölpel",
        "it": "Sula dai piedi azzurri",
        "pt": "Atobá-de-pés-azuis",
        "ja": "アオアシカツオドリ",
        "zh": "蓝脚鲣鸟"
      },
      {
        "es": "Piquero de Nazca (Sula granti)",
        "en": "Nazca Booby",
        "fr": "Fou de Nazca",
        "de": "Nazcatölpel",
        "it": "Sula di Nazca",
        "pt": "Atobá-de-nazca",
        "ja": "ナスカカツオドリ",
        "zh": "纳斯卡鲣鸟"
      }
    ],
    "highlights": [
      {
        "es": "El único sitio del mundo donde puedes fotografiar las tres especies de piqueros en un solo paseo",
        "en": "Photographing all three distinct booby species in one single trail",
        "fr": "Photographier les 3 espèces de fous en une seule balade",
        "de": "Alle drei Tölpelarten auf einer einzigen Wanderung fotografieren",
        "it": "Fotografare tutte e tre le specie di sule in un'unica escursione",
        "pt": "Fotografar as três espécies de atobás em uma única caminhada",
        "ja": "1度の散策でアオアシ・アカアシ・ナスカカツオドリの3種をコンプリート撮影",
        "zh": "在全球绝无仅有的一条步道上，一次性集齐三大世界顶级鲣鸟特写摄影"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable en yate navegable de expedición.",
      "en": "Customizable Navigable Yacht Add-On.",
      "fr": "Activité optionnelle sur yacht.",
      "de": "Zusatztour per Expeditionsschiff.",
      "it": "Attività addizionale su yacht.",
      "pt": "Atividade opcional em iate.",
      "ja": "専用ヨット手配による特別追加ツアー。",
      "zh": "专属探险游艇全天自选定制附加活动。"
    }
  },
  {
    "id": "es-punta-suarez-albatross",
    "name": {
      "es": "Santuario de Albatros Ondulados y Espiráculo Marino en Punta Suárez",
      "en": "Punta Suárez Waved Albatross Sanctuary & Marine Blowhole",
      "fr": "Sanctuaire d'Albatros des Galápagos & Évent Marin à Punta Suárez",
      "de": "Punta Suárez Galapagos-Albatros-Schutzgebiet & Meeres-Blasloch",
      "it": "Santuario degli Albatros Ondulati e Soffione Marino a Punta Suárez",
      "pt": "Santuário de Albatrozes e Espiráculo Marinho em Punta Suárez",
      "ja": "プンタ・スアレス（エスパニョラ島）ガラパゴスアホウドリの聖域＆大潮吹き岩",
      "zh": "西班牙岛苏亚雷斯角：加拉帕戈斯信天翁繁育圣地与惊涛海蚀潮水喷洞"
    },
    "shortDescription": {
      "es": "La isla más antigua del archipiélago: presencia el cortejo y despegue de la colonia entera de albatros de Galápagos y el géiser marino de 25 metros.",
      "en": "The oldest island in Galapagos: witness the courtship clacking and dramatic cliff takeoffs of the entire world population of Waved Albatrosses, plus an explosive 75-foot sea blowhole.",
      "fr": "L'île la plus ancienne : assistez aux parades des albatros et au geyser marin expulsant l'eau à 25 m.",
      "de": "Die älteste Insel der Galapagos: Erleben Sie die Balztänze der Albatrosse und das 25 m hohe Meeres-Blasloch.",
      "it": "L'isola più antica delle Galapagos: colonia mondiale di albatros ondulati e soffione marino spettacolare.",
      "pt": "A ilha mais antiga: presencie o acasalamento dos albatrozes e o gêiser marinho de 25 metros.",
      "ja": "諸島最古の歴史を誇るエスパニョラ島。世界中のガラパゴスアホウドリが子育てに集まる断崖と、波の圧力で25mも吹き上がる大迫力の潮吹き岩。",
      "zh": "加拉帕戈斯群岛最古老的活化石之岛：亲睹全球所有加拉帕戈斯信天翁击喙求偶与悬崖起飞，以及喷射达25米高的海蚀气孔喷泉。"
    },
    "description": {
      "es": "Punta Suárez, en Isla Española (4 millones de años de antigüedad), es uno de los santuarios de vida salvaje más emblemáticos del planeta. Prácticamente toda la población mundial del Albatros de Galápagos (Phoebastria irrorata) anida exclusivamente aquí entre abril y diciembre. Los visitantes caminan entre colonias de piqueros de nazca, iguanas marinas multicolores navideñas (rojas y turquesas) y contemplan el famoso \"Soplador\", donde la fuerza del Pacífico expulsa chorros de agua de hasta 25 metros.",
      "en": "Punta Suárez on Española Island (the oldest at 4 million years) is arguably the pinnacle wildlife trail on Earth. Nearly the entire world population of the Waved Albatross nests solely here from April through December. The rocky loop weaves past nesting Nazca boobies, endemic \"Christmas\" marine iguanas clad in vibrant red and turquoise, and a titanic marine blowhole shooting spray 75 feet high.",
      "fr": "Sentier d'exception sur l'île la plus ancienne avec la totalité des albatros mondiaux et l'évent marin.",
      "de": "Weltweit einzigartiger Wanderweg mit der gesamten Weltpopulation des Galapagos-Albatros.",
      "it": "Uno dei sentieri faunistici più straordinari al mondo con l'intera popolazione di albatros.",
      "pt": "Um dos santuários de vida selvagem mais emblemáticos do planeta com albatrozes e iguanas natalinas.",
      "ja": "約400万年の地質史を持つエスパニョラ島。世界に生息するガラパゴスアホウドリのほぼ全個体がここに集結。翼長2.4mの巨鳥が海風に乗って崖から飛び立つ瞬間は圧巻。赤と緑のクリスマスカラーに輝くウミイグアナも必見。",
      "zh": "拥有400万年古老地质历史的西班牙岛。每年4月至12月，几乎全球全部加拉帕戈斯信天翁都会聚集在此筑巢育幼。伴随红绿相间的“圣诞海鬣蜥”与高达25米的惊涛喷洞，构成生灵史诗画卷。"
    },
    "island": "espanola",
    "islandName": {
      "es": "Española",
      "en": "Espanola Island",
      "fr": "Île Española",
      "de": "Insel Española",
      "it": "Isola Española",
      "pt": "Ilha Española",
      "ja": "エスパニョラ島",
      "zh": "西班牙岛 (埃斯帕尼奥拉)"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "cool"
    ],
    "bestMonths": [
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "¡Temporada estricta! Los albatros llegan en abril, cortejan entre abril y junio, empollan sus huevos de junio a agosto y los polluelos despegan en diciembre. De enero a marzo están en mar abierto en Perú y Chile.",
      "en": "Strict biological season! Albatrosses arrive in April, perform ritual courtship dances through June, incubate eggs June-August, and chicks fledge in December. From January to March they roam open seas off Peru.",
      "fr": "Saison stricte : présents d'avril à décembre uniquement.",
      "de": "Strenge biologische Saison! Albatrosse sind nur von April bis Dezember auf der Insel.",
      "it": "Stagionalità rigorosa: presenti unicamente da aprile a dicembre.",
      "pt": "Temporada estrita! Presentes exclusivamente de abril a dezembro.",
      "ja": "【厳格な季節限定】アホウドリは4月に飛来し、4〜6月に求愛ダンス、6〜8月に産卵、12月にヒナが巣立ちます。1月〜3月は南米沖の外海へ旅立つため島を留守にします。",
      "zh": "【极其严格的季节性】信天翁每年4月飞抵求偶，6-8月孵卵，雏鸟12月振翅离岛；1月至3月群鸟远赴秘鲁与智利外海漫游。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Caminata de 3 km sobre piedras volcánicas)",
      "en": "Moderate (2-mile rocky basalt hike)",
      "fr": "Modéré (Terrain accidenté)",
      "de": "Moderat (Felsiger Rundweg)",
      "it": "Moderato (Terreno roccioso)",
      "pt": "Moderado (Caminhada em pedras)",
      "ja": "中級（ゴツゴツした溶岩岩礁路 約3km）",
      "zh": "中等（约3公里崎岖火山岩石环形徒步）"
    },
    "duration": {
      "es": "Día Completo (Navegación en yate desde San Cristóbal)",
      "en": "Full Day (Navigable yacht excursion from San Cristobal)",
      "fr": "Journée complète (Yacht depuis San Cristóbal)",
      "de": "Ganztags (Yacht ab San Cristóbal)",
      "it": "Giornata intera (Yacht da San Cristóbal)",
      "pt": "Dia inteiro (Iate a partir de San Cristóbal)",
      "ja": "終日（サンクリストバル発着ヨットツアー）",
      "zh": "全天（圣克里斯托巴尔岛往返探险游艇）"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-brown-pelican-soaring-over-turquoise-water.webp",
    "keyWildlife": [
      {
        "es": "Albatros Ondulado de Galápagos (Phoebastria irrorata)",
        "en": "Waved Albatross",
        "fr": "Albatros des Galápagos",
        "de": "Galapagos-Albatros",
        "it": "Albatros delle Galapagos",
        "pt": "Albatroz-de-galápagos",
        "ja": "ガラパゴスアホウドリ（翼開長2.4m）",
        "zh": "加拉帕戈斯信天翁（翼展2.4米）"
      },
      {
        "es": "Iguana Marina \"Navideña\" de Española",
        "en": "Española \"Christmas\" Marine Iguana",
        "fr": "Iguane marin de Noël d'Española",
        "de": "Weihnachts-Meerechse",
        "it": "Iguana marina natalizia",
        "pt": "Iguana-marinha-natalina",
        "ja": "クリスマスカラーウミイグアナ（赤と青緑の婚姻色）",
        "zh": "西班牙岛“圣诞”海鬣蜥（红绿斑斓）"
      },
      {
        "es": "Piquero de Nazca (Sula granti)",
        "en": "Nazca Booby",
        "fr": "Fou de Nazca",
        "de": "Nazcatölpel",
        "it": "Sula di Nazca",
        "pt": "Atobá-de-nazca",
        "ja": "ナスカカツオドリ",
        "zh": "纳斯卡鲣鸟"
      }
    ],
    "highlights": [
      {
        "es": "Ver el hipnótico baile nupcial de los albatros con choques rítmicos de pico",
        "en": "Witnessing the complex ritual mating dance of albatrosses clicking yellow bills",
        "fr": "Assister à la danse nuptiale des albatros",
        "de": "Den faszinierenden Balztanz der Albatrosse miterleben",
        "it": "Ammirare la danza nuziale degli albatros a pochi passi",
        "pt": "Assistir à dança nupcial dos albatrozes com estalar de bicos",
        "ja": "黄色い巨大なくちばしをリズミカルに打ち鳴らすアホウドリの求愛ダンス",
        "zh": "亲眼目睹巨型信天翁双双起舞、有节奏击碰黄色大喙的震撼求偶仪式"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Estrella Exclusiva. Requiere navegación desde San Cristóbal. Se cotiza como suplemento VIP.",
      "en": "Exclusive Premier Add-On. Navigable from San Cristobal. Quoted as luxury expedition upgrade.",
      "fr": "Activité VIP exclusive sur devis au départ de San Cristóbal.",
      "de": "Exklusive Highlight-Tour ab San Cristóbal auf Anfrage.",
      "it": "Esperienza VIP esclusiva con navigazione da San Cristóbal.",
      "pt": "Atividade VIP exclusiva com saída de San Cristóbal.",
      "ja": "【一生に一度の絶景】サンクリストバル島発着の特別ヨットツアーとして追加手配可能。",
      "zh": "【终生必访的殿堂级野生生灵巡礼】从圣克里斯托巴尔岛出海，极受高阶旅行家青睐的VIP尊享附加行程。"
    }
  },
  {
    "id": "ba-pinnacle-rock",
    "name": {
      "es": "Ascenso a la Cima de Roca Pináculo y Snorkel con Pingüinos de Galápagos",
      "en": "Pinnacle Rock Summit Panorama & Galapagos Penguin Snorkel",
      "fr": "Sommet du Rocher Pinacle & Snorkeling avec les Manchots",
      "de": "Pinnacle Rock Gipfelpanorama & Pinguin-Schnorcheln",
      "it": "Scalata di Roccia Pinnacolo e Snorkeling con i Pinguini",
      "pt": "Subida ao Rocha Pináculo e Snorkel com Pinguins de Galápagos",
      "ja": "バルトロメ島 ピナクルロック山頂パノラマ＆ガラパゴスペンギンと泳ぐスノーケリング",
      "zh": "巴托洛梅岛顶峰石全景登顶与加拉帕戈斯企鹅伴游浮潜"
    },
    "shortDescription": {
      "es": "La postal fotográfica más célebre de Galápagos: sube 375 escalones de madera hasta un mirador volcánico lunar y nada con pingüinos en la playa.",
      "en": "The definitive postcard vista of the Galapagos Archipelago: climb 375 boardwalk steps to a surreal lunar crater overlook, then swim with penguins along golden beaches.",
      "fr": "La vue carte postale la plus célèbre des Galápagos : ascension de 375 marches et nage avec les manchots.",
      "de": "Das weltberühmte Postkartenmotiv: 375 Holzstufen zu einem spektakulären Vulkanblick und Schnorcheln mit Pinguinen.",
      "it": "La cartolina più iconica delle Galapagos: 375 gradini fino al panorama lunare e nuoto con i pinguini.",
      "pt": "A vista cartão-postal mais famosa: 375 degraus até um mirante lunar e nado com pinguins.",
      "ja": "ガラパゴスを象徴する最も有名な絶景。375段の木製階段を登り月面のような火山パノラマを堪能した後は、ピナクルロックの麓でペンギンと戯れるスノーケリング。",
      "zh": "加拉帕戈斯群岛最具代表性的传世明信片机位：登临375级木质步梯台阶揽胜月球般的火山奇观，随后在金色沙滩与企鹅欢快浮潜。"
    },
    "description": {
      "es": "Isla Bartolomé es un volcán extinto rodeado de conos de ceniza de colores ocre, rojo y negro. Una pasarela de madera de 375 escalones protege el suelo volcánico y lleva hasta la cima a 114 metros de altura, ofreciendo la vista clásica de Roca Pináculo, la Bahía Sullivan y la vecina Isla Santiago. Al pie de la roca, el snorkel en aguas tranquilas garantiza nadar junto a pequeños pingüinos de Galápagos cazando peces a gran velocidad.",
      "en": "Bartolome Island is an extinct volcano surrounded by colorful cinder cones in hues of ochre, copper, and jet black. A gentle 375-step wooden staircase ascends 370 feet to the summit, unveiling the celebrated panoramic vista of Pinnacle Rock and Sullivan Bay. Below, tranquil turquoise waters host swimming Galapagos penguins, green sea turtles, and white-tip reef sharks.",
      "fr": "Île volcanique avec vue mythique sur le rocher Pinacle et snorkeling inoubliable avec manchots.",
      "de": "Erklimmen Sie den Krater für den ikonischsten Blick der Inseln und schnorcheln Sie mit Pinguinen.",
      "it": "Isola vulcanica con il panorama più famoso dell'arcipelago e snorkeling con i pinguini.",
      "pt": "Vulcão extinto com a vista mais clássica de Galápagos e mergulho com pinguins.",
      "ja": "赤や褐色の噴石丘が織りなすバルトロメ島。木製階段を登りきると、映画の舞台にもなったピナクルロックとサリバン湾の神々しい大展望。ビーチではペンギンがロケットのように海中を泳ぐ姿を観察。",
      "zh": "巴托洛梅岛是一座被红褐色凝灰岩火山锥环绕的死火山。拾级登上375级栈道阶梯抵达114米顶峰，饱览顶峰石与苏利文湾的壮丽风光。山脚下风平浪静的浅湾则是与加拉帕戈斯企鹅急速泳姿共舞的胜地。"
    },
    "island": "bartolome",
    "islandName": {
      "es": "Bartolomé",
      "en": "Bartolome Island",
      "fr": "Île Bartolomé",
      "de": "Insel Bartolomé",
      "it": "Isola Bartolomé",
      "pt": "Ilha Bartolomé",
      "ja": "バルトロメ島",
      "zh": "巴托洛梅岛"
    },
    "category": "photography",
    "categoryName": {
      "es": "Fotografía de Paisajes & Naturaleza",
      "en": "Landscape & Nature Photography",
      "fr": "Photographie de Paysages & Nature",
      "de": "Landschafts- & Naturfotografie",
      "it": "Fotografia di Paesaggio e Natura",
      "pt": "Fotografia de Natureza e Paisagens",
      "ja": "ネイチャー＆絶景フォトグラフィー",
      "zh": "自然人文与风光摄影"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Impecable visibilidad todo el año. En temporada cálida (diciembre a mayo) el mar está como un espejo; en temporada fría los pingüinos son aún más activos.",
      "en": "Stunning all year. December to May delivers mirror-like turquoise seas; cool months bring hyperactive penguin feeding displays.",
      "fr": "Magnifique toute l'année, eau limpide et manchots très actifs.",
      "de": "Ganzjährig ein Highlight. Beste Fernsicht und aktive Pinguine.",
      "it": "Splendido tutto l'anno con mare calmo e pinguini attivi.",
      "pt": "Espetacular o ano todo com excelente visibilidade e pinguins brincalhões.",
      "ja": "年間を通じて最高の絶景。12月〜5月は鏡のように波が静まり、6月〜11月は活発に小魚を追うペンギンに出会えます。",
      "zh": "全年如画。12月至5月水面如镜碧波荡漾；凉爽季节企鹅更为活跃敏捷。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (375 escalones de madera)",
      "en": "Moderate (375 wooden stair steps)",
      "fr": "Modéré (375 marches)",
      "de": "Moderat (375 Holzstufen)",
      "it": "Moderato (375 scalini)",
      "pt": "Moderado (375 degraus)",
      "ja": "中級（375段の木製階段）",
      "zh": "中等（375级木质景观步梯）"
    },
    "duration": {
      "es": "Día Completo (Yate navegable desde Santa Cruz)",
      "en": "Full Day (Navigable yacht from Santa Cruz)",
      "fr": "Journée complète (Yacht depuis Santa Cruz)",
      "de": "Ganztags (Yacht ab Santa Cruz)",
      "it": "Giornata intera (Yacht da Santa Cruz)",
      "pt": "Dia inteiro (Iate de Santa Cruz)",
      "ja": "終日（サンタクルス島発着ヨットクルーズ）",
      "zh": "全天（圣克鲁斯岛出发豪华探险游艇巡航）"
    },
    "imageUrl": "/images/tours/9-16/galapagos-isabela-islote-turquesa-9-16.webp",
    "keyWildlife": [
      {
        "es": "Pingüino de Galápagos (Spheniscus mendiculus)",
        "en": "Galapagos Penguin",
        "fr": "Manchot des Galápagos",
        "de": "Galapagos-Pinguin",
        "it": "Pinguino delle Galapagos",
        "pt": "Pinguim-de-galápagos",
        "ja": "ガラパゴスペンギン",
        "zh": "加拉帕戈斯企鹅"
      },
      {
        "es": "Tiburón de Punta Blanca de Arrecife",
        "en": "White-tip Reef Shark",
        "fr": "Requin à pointes blanches",
        "de": "Weißspitzen-Riffhai",
        "it": "Squalo pinna bianca",
        "pt": "Tubarão-de-pontas-brancas",
        "ja": "ネムリブカ",
        "zh": "白顶礁鲨"
      },
      {
        "es": "Pez Ángel Real (Holacanthus passer)",
        "en": "King Angelfish",
        "fr": "Poisson-ange royal",
        "de": "Königs-Engelfisch",
        "it": "Pesce angelo reale",
        "pt": "Peixe-anjo-real",
        "ja": "キングエンゼルフィッシュ",
        "zh": "王刺盖鱼（国王神仙鱼）"
      }
    ],
    "highlights": [
      {
        "es": "Capturar la foto panorámica más icónica de todas las Islas Galápagos",
        "en": "Capturing the ultimate postcard panoramic photo of the entire archipelago",
        "fr": "Prendre la photo la plus célèbre de toutes les Galápagos",
        "de": "Das berühmteste Fotomotiv der gesamten Galapagosinseln einfangen",
        "it": "Scattare la foto cartolina più famosa di tutto l'arcipelago",
        "pt": "Tirar a foto panorâmica mais emblemática de Galápagos",
        "ja": "ガラパゴス諸島で最も象徴的とされる伝説のパノラマ写真を撮影",
        "zh": "登临顶峰拍摄代表加拉帕戈斯群岛标志性最高荣耀的明信片传世大片"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Estrella. Tour navegable en yate con cupos muy limitados; se cotiza con antelación.",
      "en": "Top Signature Add-On. Navigable yacht tour with limited daily permits; early quotation recommended.",
      "fr": "Excursion yacht très demandée, places limitées.",
      "de": "Sehr begehrter Yachtausflug mit begrenzten Plätzen.",
      "it": "Escursione in yacht ad altissima richiesta, posti limitati.",
      "pt": "Passeio em iate muito procurado com vagas restritas.",
      "ja": "【世界的人気の絶景ツアー】国立公園の厳格な日別枠があるため、早期の追加手配を推奨いたします。",
      "zh": "【群岛出镜率最高的顶级必去路线】游艇名额极度稀缺，需提前由旅行管家确认排期并报价升级。"
    }
  },
  {
    "id": "sn-frigatebirds-boobies",
    "isIconic": true,
    "name": {
      "es": "Senderismo entre Colonias de Fragatas con Buche Rojo y Danza de Piqueros Patas Azules",
      "en": "North Seymour Frigatebird Colonies & Blue-Footed Booby Mating Dance",
      "fr": "Colonies de Frégates au Sac Rouge & Danse des Fous à Pieds Bleus à Seymour Nord",
      "de": "Nord-Seymour Fregattvogel-Kolonien & Blaufußtölpel-Balztanz",
      "it": "Seymour Nord: Colonie di Fregate con Sacco Rosso e Danza delle Sule",
      "pt": "Seymour Norte: Colônias de Fragatas e Dança dos Atobás-de-Pés-Azuis",
      "ja": "ノース・セイモア島 雄大な赤喉のグンカンドリコロニー＆アオアシカツオドリの求愛ダンス",
      "zh": "北塞穆尔岛：红喉军舰鸟庞大聚居群与蓝脚鲣鸟求偶狂欢之舞"
    },
    "shortDescription": {
      "es": "Camina a centímetros de las mayores colonias de cortejo de aves del archipiélago: machos inflando gigantescos buches rojos y piqueros danzando.",
      "en": "Walk inches away from the world's most vibrant bird courtship colonies: male frigatebirds inflating enormous crimson throat pouches and blue-footed boobies performing high-stepping courtship dances.",
      "fr": "Marchez au milieu des plus grandes colonies d'oiseaux : frégates au sac rouge et danse des fous.",
      "de": "Erleben Sie spektakuläre Balztänze der Blaufußtölpel und leuchtend rote Fregattvögel aus nächster Nähe.",
      "it": "Cammina a pochi centimetri dalle colonie di corteggiamento delle fregate e delle sule.",
      "pt": "Caminhe perto de colônias de aves com fragatas de papo vermelho e atobás dançando.",
      "ja": "世界最高の野鳥観察の島。オスのグンカンドリが喉袋を真っ赤に膨らませ、アオアシカツオドリが足を交互に高く上げて求愛ダンスを踊る決定的瞬間を間近で体感。",
      "zh": "漫步于全球最震撼的鸟类繁殖王国：近在咫尺记录雄军舰鸟鼓胀深红喉囊，以及蓝脚鲣鸟高抬蔚蓝大脚跳起滑稽优雅求偶舞步。"
    },
    "description": {
      "es": "Seymour Norte es una plataforma de lava levantada del fondo marino al norte de Baltra. Es el principal sitio de reproducción de aves marinas en Galápagos. El sendero circular de 2 km serpentea entre arbustos de Palo Santo donde cientos de Fragatas Reales macho exhiben sus bolsas gulares rojas como globos escarlatas. Al mismo tiempo, en el suelo rocoso, los piqueros de patas azules realizan su célebre cortejo levantando sus patas celestes.",
      "en": "North Seymour is a flat, uplifted submarine lava plateau just north of Baltra Island. It represents the premier seabird breeding metropolis in the Galapagos. A 1.2-mile circular trail winds through fragrant Palo Santo trees where hundreds of male Magnificent Frigatebirds inflate giant crimson gular sacs like brilliant balloons, while blue-footed boobies execute their signature foot-raising courtship ritual.",
      "fr": "Plateforme volcanique soulevée abritant la plus dense colonie de reproduction d'oiseaux marins.",
      "de": "Flaches Vulkanplateau mit der spektakulärsten Vogelbrutkolonie des gesamten Archipels.",
      "it": "Altopiano lavico sollevato con la più grande colonia riproduttiva di uccelli marini.",
      "pt": "Platô vulcânico elevado abrigando a maior colônia de reprodução de aves marinhas.",
      "ja": "バルトラ島北側に隆起した平坦な溶岩島。パロサントの白い木々の間を縫うように歩くと、頭上には風船のように膨らんだ真っ赤な喉袋を持つオスのグンカンドリ、足元にはコミカルなダンスを披露するアオアシカツオドリが密集。",
      "zh": "由海底地壳隆起形成的平坦熔岩岛屿。沿着2公里环岛小径穿行于圣树林间，数百只雄性军舰鸟在枝头鼓胀如气球般的猩红喉囊，地面蓝脚鲣鸟则伴随尖细鸣叫高举蓝色双蹼起舞。"
    },
    "island": "seymour-norte",
    "islandName": {
      "es": "Seymour Norte",
      "en": "North Seymour",
      "fr": "Seymour Nord",
      "de": "Nord-Seymour",
      "it": "Seymour Nord",
      "pt": "Seymour Norte",
      "ja": "ノース・セイモア島",
      "zh": "北塞穆尔岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Actividad reproductiva todo el año. Entre mayo y noviembre las danzas de apareamiento y exhibiciones son incesantes.",
      "en": "Courtship displays occur year-round. Between May and November mating rituals and chick hatching peak in frenzied activity.",
      "fr": "Parades actives toute l'année, particulièrement intenses de mai à novembre.",
      "de": "Ganzjähriges Schauspiel; intensivste Balzaktivität zwischen Mai und November.",
      "it": "Spettacolo presente tutto l'anno, con apice di corteggiamento tra maggio e novembre.",
      "pt": "Espetáculo o ano todo com auge das danças entre maio e novembro.",
      "ja": "年間を通して活発な繁殖行動を観察可能。特に5月〜11月は求愛ダンスとヒナの誕生が重なる最高のフォトシーズン。",
      "zh": "全年皆可观赏繁殖大戏。5月至11月期间求偶狂欢与毛茸茸雏鸟破壳最为密集。"
    },
    "includedInTourIds": [],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Caminata plana sobre suelo pedregoso)",
      "en": "Easy (Flat rocky loop)",
      "fr": "Facile (Sentier plat)",
      "de": "Leicht (Flacher Rundweg)",
      "it": "Facile (Percorso pianeggiante)",
      "pt": "Fácil (Trilha plana)",
      "ja": "初級（平坦な岩場周遊路）",
      "zh": "轻松（平坦开阔环形步道）"
    },
    "duration": {
      "es": "Día Completo (Yate navegable desde Santa Cruz)",
      "en": "Full Day (Navigable yacht from Santa Cruz)",
      "fr": "Journée complète (Yacht depuis Santa Cruz)",
      "de": "Ganztags (Yacht ab Santa Cruz)",
      "it": "Giornata intera (Yacht da Santa Cruz)",
      "pt": "Dia inteiro (Iate a partir de Santa Cruz)",
      "ja": "終日（サンタクルス島発着ヨットクルーズ）",
      "zh": "全天（圣克鲁斯岛出发探险游艇巡航）"
    },
    "imageUrl": "/images/tours/16-9/galapagos-piquero-patas-azules-16-9.webp",
    "keyWildlife": [
      {
        "es": "Fragata Real (Fregata magnificens)",
        "en": "Magnificent Frigatebird",
        "fr": "Frégate superbe",
        "de": "Prachtfregattvogel",
        "it": "Fregata magnifica",
        "pt": "Fragata-magnífica",
        "ja": "アメリカグンカンドリ",
        "zh": "丽色军舰鸟"
      },
      {
        "es": "Piquero de Patas Azules (Sula nebouxii)",
        "en": "Blue-footed Booby",
        "fr": "Fou à pieds bleus",
        "de": "Blaufußtölpel",
        "it": "Sula dai piedi azzurri",
        "pt": "Atobá-de-pés-azuis",
        "ja": "アオアシカツオドリ",
        "zh": "蓝脚鲣鸟"
      },
      {
        "es": "Iguana Terrestre de Galápagos (Conolophus subcristatus)",
        "en": "Galapagos Land Iguana",
        "fr": "Iguane terrestre des Galápagos",
        "de": "Galapagos-Landleguan",
        "it": "Iguana terrestre delle Galapagos",
        "pt": "Iguana-terrestre-de-galápagos",
        "ja": "ガラパゴスリクイグアナ",
        "zh": "加拉帕戈斯陆鬣蜥"
      }
    ],
    "highlights": [
      {
        "es": "Ver docenas de buches rojos inflados y danzas de patas azules simultáneamente",
        "en": "Simultaneously witnessing dozens of inflated scarlet sacs and synchronized blue-footed dances",
        "fr": "Voir sacs rouges gonflés et danses des fous en simultané",
        "de": "Gleichzeitig aufgeblähte rote Kehlsäcke und Tölpeltänze erleben",
        "it": "Assistere insieme ai sacchi rossi e alle danze dei piedi azzurri",
        "pt": "Ver papos vermelhos inflados e dança dos pés azuis ao mesmo tempo",
        "ja": "真っ赤に膨らんだ喉袋とブルーの足のステップを同時に目撃する奇跡の瞬間",
        "zh": "同时定格数十只充盈鲜红喉囊与欢快踏踏踩步的蓝脚鲣鸟同台争艳"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Estrella. Uno de los tours navegables más codiciados de Galápagos.",
      "en": "Top Premier Navigable Add-On. One of the most coveted day yacht trips in the archipelago.",
      "fr": "Excursion yacht phare très demandée au départ de Santa Cruz.",
      "de": "Einer der begehrtesten Yachtausflüge der Galapagosinseln.",
      "it": "Una delle escursioni giornaliere in yacht più richieste.",
      "pt": "Um dos passeios de iate mais cobiçados de Galápagos.",
      "ja": "【憧れの野鳥アイランド】ガラパゴスで最も人気が高いデイクルーズ。早期予約を強く推奨。",
      "zh": "【加拉帕戈斯群岛出海热度前三甲】极度抢手的全天出海游艇项目，建议尽早向行程管家预留席位。"
    }
  },
  {
    "id": "sf-land-iguanas-snorkel",
    "name": {
      "es": "Observación de Iguana Terrestre Endémica de Santa Fe y Snorkel en Bahía Turquesa",
      "en": "Endemic Santa Fe Land Iguana Trail & Turquoise Bay Snorkel",
      "fr": "Iguane Terrestre Endémique de Santa Fe & Snorkeling en Baie Turquoise",
      "de": "Endemische Santa Fe Landleguane & Türkisbucht-Schnorcheln",
      "it": "Iguana Terrestre Endemica di Santa Fe e Snorkeling nella Baia Turchese",
      "pt": "Iguana Terrestre Endêmica de Santa Fe e Snorkel na Baía Turquesa",
      "ja": "サンタフェ島 固有種サンタフェリクイグアナ観察＆エメラルドの入江でのスノーケリング",
      "zh": "圣菲岛特有苍白陆鬣蜥步道与绿松石海湾清澈浮潜"
    },
    "shortDescription": {
      "es": "Descubre la iguana terrestre única de Santa Fe entre un bosque de cactus gigantes y nada en una piscina natural turquesa con leones marinos.",
      "en": "Encounter the world’s only population of pale Barrington land iguanas amidst ancient giant prickly-pear cacti, followed by crystalline bay snorkeling with playful sea lion pups.",
      "fr": "Observez l'iguane terrestre exclusif de Santa Fe parmi les cactus géants et nagez dans une eau turquoise.",
      "de": "Begegnen Sie dem einzigartigen Santa Fe Landleguan und schnorcheln Sie in einer geschützten Traumbucht.",
      "it": "Incontra l'iguana esclusiva di Santa Fe tra cactus monumentali e nuota in una baia turchese.",
      "pt": "Encontre a iguana exclusiva de Santa Fe entre cactos gigantes e nade em águas azul-turquesa.",
      "ja": "世界でこの島にしか生息しない淡い体色のサンタフェリクイグアナと巨木のようなウチワサボテン。波静かなエメラルドグリーンの入り江でアシカと遊ぶ極上ツアー。",
      "zh": "探寻全世界仅栖息于此的圣菲特有苍白陆鬣蜥与参天仙人掌树林，随后跃入如蓝宝石般透彻的避风海湾与海狮浮潜。"
    },
    "description": {
      "es": "Navegación de 50 minutos al sureste de Santa Cruz. Santa Fe alberga una especie única de iguana terrestre (Conolophus pallidus) de color crema pálido que se alimenta de las flores de los cactus Opuntia echios barringtonensis, que aquí alcanzan más de 10 metros de altura. La bahía de fondeo es una ensenada protegida de agua color aguamarina donde decenas de lobos marinos nadan alrededor de la embarcación.",
      "en": "A 50-minute cruise southeast from Santa Cruz brings you to Barrington (Santa Fe) Island. Santa Fe protects a distinct, endemic pale-yellow land iguana (Conolophus pallidus) dwelling beneath towering Opuntia cactus trees that exceed 30 feet in height. The anchorage is a sheltered aquamarine lagoon where dozens of sea lions playfully orbit your boat.",
      "fr": "Île préservée abritant une espèce unique d'iguane et une baie turquoise parfaite pour le snorkeling.",
      "de": "Traumhafte Insel mit endemischen Riesenkakteen, seltenen Leguanen und Seelöwenbucht.",
      "it": "Isola selvaggia con specie uniche al mondo e una baia spettacolare per lo snorkeling.",
      "pt": "Ilha preservada com iguanas exclusivas e baía paradisíaca para mergulho com leões-marinhos.",
      "ja": "サンタクルス島から約50分。樹高10メートルにも及ぶ巨樹のようなウチワサボテンの森を抜け、固有のサンタフェリクイグアナを探索。入江では透明な水中で好奇心旺盛なアシカがダイブ。",
      "zh": "从圣克鲁斯岛航行50分钟即达。这里拥有高逾10米的巨型柱状仙人掌森林，生活着全世界独一无二的淡黄色圣菲陆鬣蜥。停泊海湾水色如极光翡翠，常有成群海狮欢快追逐船舷。"
    },
    "island": "santa-fe",
    "islandName": {
      "es": "Santa Fe",
      "en": "Santa Fe Island",
      "fr": "Île Santa Fe",
      "de": "Insel Santa Fe",
      "it": "Isola Santa Fe",
      "pt": "Ilha Santa Fe",
      "ja": "サンタフェ島",
      "zh": "圣菲岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Bahía abrigada y tranquila todo el año; excelente visibilidad marina y fauna activa en cualquier estación.",
      "en": "Sheltered calm waters year-round; crystal visibility and active sea lion colonies in all seasons.",
      "fr": "Baie abritée et mer calme toute l'année.",
      "de": "Geschützte, ruhige Bucht mit ganzjährig fantastischer Sicht.",
      "it": "Baia protetta con mare calmo tutto l'anno.",
      "pt": "Baía protegida e calma durante todo o ano.",
      "ja": "湾内は一年中波が穏やか。初心者でも安心してアシカやエイとのスノーケリングを満喫できます。",
      "zh": "避风海湾终年风平浪静，水下透亮，四季皆是与海狮和热带鱼群浮潜的天堂。"
    },
    "includedInTourIds": [
      "galapagos-7days",
      "galapagos-8days"
    ],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Caminata ligera y nado tranquilo)",
      "en": "Easy (Gentle hike & calm bay swim)",
      "fr": "Facile",
      "de": "Leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（軽快な散策＋穏やかな水域での遊泳）",
      "zh": "轻松（平缓步道与避风海湾浮潜）"
    },
    "duration": {
      "es": "Día Completo (Yate navegable desde Santa Cruz)",
      "en": "Full Day (Navigable yacht from Santa Cruz)",
      "fr": "Journée complète (Yacht)",
      "de": "Ganztags (Yacht)",
      "it": "Giornata intera (Yacht)",
      "pt": "Dia inteiro (Iate)",
      "ja": "終日（サンタクルス発ヨットツアー）",
      "zh": "全天（圣克鲁斯出发探险游艇巡航）"
    },
    "imageUrl": "/images/tours/16-9/santa-fe-island-16-9.webp",
    "keyWildlife": [
      {
        "es": "Iguana Terrestre de Santa Fe (Conolophus pallidus)",
        "en": "Santa Fe Land Iguana",
        "fr": "Iguane terrestre de Santa Fe",
        "de": "Santa Fe Landleguan",
        "it": "Iguana terrestre di Santa Fe",
        "pt": "Iguana-terrestre-de-santa-fe",
        "ja": "サンタフェリクイグアナ（固有種）",
        "zh": "圣菲特有苍白陆鬣蜥"
      },
      {
        "es": "Cactus Opuntia Gigante de Barrington (Opuntia echios barringtonensis)",
        "en": "Barrington Giant Cactus",
        "fr": "Cactus géant de Barrington",
        "de": "Barrington-Riesenkaktus",
        "it": "Cactus gigante di Barrington",
        "pt": "Cacto gigante de Barrington",
        "ja": "バーリントンオプンティア（10mを超える巨樹）",
        "zh": "巴灵顿巨型仙人掌大树"
      },
      {
        "es": "Raya Águila Manchada",
        "en": "Spotted Eagle Ray",
        "fr": "Raie léopard",
        "de": "Gefleckter Adlerrochen",
        "it": "Razza maculata",
        "pt": "Raia-pintada",
        "ja": "マダラトビエイ",
        "zh": "花点鹰鳐"
      }
    ],
    "highlights": [
      {
        "es": "Ver las iguanas terrestres más pálidas y grandes del mundo bajo cactus de 10 metros",
        "en": "Observing massive pale Barrington iguanas resting beneath 30-foot tall cactus trees",
        "fr": "Observer les iguanes de Santa Fe sous les cactus géants",
        "de": "Beobachtung der riesigen hellen Leguane unter 10 m hohen Kakteen",
        "it": "Ammirare le caratteristiche iguane color crema sotto alberi di cactus",
        "pt": "Ver iguanas cor de creme sob cactos gigantescos",
        "ja": "10mのサボテンの巨木の根元で日光浴するクリーム色の固有リクイグアナ",
        "zh": "仰望10米高参天仙人掌树荫下悠闲小憩的罕见米黄色圣菲特有陆鬣蜥"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Incluido como navegación de día completo en los tours base de 7 y 8 Días de Vermilion.",
      "en": "Included as full-day navigable yacht excursion in Vermilion 7 and 8-Day base tours.",
      "fr": "Inclus dans les circuits de base 7 et 8 jours.",
      "de": "In den 7- und 8-Tage Basistouren enthalten.",
      "it": "Incluso nei tour base di 7 e 8 giorni.",
      "pt": "Incluído nos tours base de 7 e 8 dias.",
      "ja": "7日間および8日間のベースツアーに標準搭載（ピンソン島との選択制）。",
      "zh": "已作为全天出海游艇巡航包含在7日和8日基础行程中（可与平松岛二选一）。"
    }
  },
  {
    "id": "pz-deep-snorkel",
    "isIconic": true,
    "name": {
      "es": "Snorkel en Aguas Cristalinas de Isla Pinzón (Tortugas Verdes y Tiburones de Arrecife)",
      "en": "Pinzón Island Deep Snorkel (Sea Turtles & Reef Sharks Sanctuary)",
      "fr": "Snorkeling dans les Eaux Cristallines de l'Île Pinzón",
      "de": "Insel Pinzón Kristallklares Schnorcheln (Schildkröten & Haie)",
      "it": "Snorkeling nelle Acque Cristalline dell'Isola Pinzón",
      "pt": "Snorkel em Águas Cristalinas na Ilha Pinzón",
      "ja": "ピンソン島 驚異の透明度を誇る深海スノーケリング（ウミガメ＆ネムリブカ）",
      "zh": "平松岛纯净深海浮潜：海龟与礁鲨水下圣境"
    },
    "shortDescription": {
      "es": "Famosa por tener las aguas más transparentes de Galápagos: nada rodeado de decenas de tortugas marinas verdes, rayas y tiburones de arrecife.",
      "en": "Renowned for having the highest water clarity in the entire archipelago: swim surrounded by dozens of green sea turtles, stingrays, and reef sharks.",
      "fr": "Réputée pour les eaux les plus limpides de l'archipel, avec dizaines de tortues et requins.",
      "de": "Berühmt für die höchste Wassersichtweite der Galapagos: Schnorcheln mit Schildkröten und Haien.",
      "it": "Famosa per le acque più limpide delle Galapagos tra decine di tartarughe e squali.",
      "pt": "Famosa pelas águas mais transparentes com dezenas de tartarugas marinhas e tubarões.",
      "ja": "諸島随一の海中透明度を誇る隠れた名所。潜れば数十頭のアオウミガメとネムリブカが悠然と泳ぐ神秘の海。",
      "zh": "以全群岛能见度最高的水域著称：在通透无暇的碧波中，与数十只绿海龟、刺鳐和礁鲨自在同游。"
    },
    "description": {
      "es": "Ubicada entre Santa Cruz e Isabela, Isla Pinzón no permite desembarco en tierra para proteger a su fauna endémica, por lo que toda la experiencia se vive desde el yate y en el agua. La ensenada de Bahía Pingüino ofrece fondos arenosos y arrecifes de roca volcánica donde conviven decenas de tortugas marinas, tiburones punta blanca, mantarrayas y juguetones lobos marinos.",
      "en": "Situated between Santa Cruz and Isabela, Pinzón prohibits land landings to preserve fragile endemic species, making this an exclusive ocean-based snorkeling expedition. Penguin Bay boasts white sand floors and volcanic reefs teeming with dozens of green sea turtles, white-tip reef sharks, ray squadrons, and sea lions.",
      "fr": "Expédition 100% aquatique dans des eaux d'une clarté absolue avec une faune marine foisonnante.",
      "de": "Ausschließlich wasserbasierte Expedition mit unvergleichlicher Sicht und riesigen Schildkrötenpopulationen.",
      "it": "Esperienza marina esclusiva con visibilità senza pari tra tartarughe e squali di barriera.",
      "pt": "Expedição 100% marítima nas águas mais límpidas do arquipélago.",
      "ja": "上陸が禁止された手つかずの島。透明度が25mを超える日もあるペンギン湾で、群れを成すウミガメやエイと時間を忘れて泳ぐダイナミックな海洋体験。",
      "zh": "为保护原生生态严禁登岛，全天活动完全依托探险游艇展开。企鹅湾水下白沙与珊瑚交错，数十只绿海龟悬浮游弋，是深潜与浮潜爱好者的天堂。"
    },
    "island": "pinzon",
    "islandName": {
      "es": "Pinzón",
      "en": "Pinzon Island",
      "fr": "Île Pinzón",
      "de": "Insel Pinzón",
      "it": "Isola Pinzón",
      "pt": "Ilha Pinzón",
      "ja": "ピンソン島",
      "zh": "平松岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Visibilidad marina extraordinaria durante todo el año, superando habitualmente los 20 metros.",
      "en": "Extraordinary marine visibility year-round, regularly exceeding 65 feet.",
      "fr": "Visibilité exceptionnelle toute l'année, souvent supérieure à 20 mètres.",
      "de": "Ganzjährig außergewöhnliche Sichtweiten von oft über 20 Metern.",
      "it": "Visibilità marina straordinaria tutto l'anno, spesso oltre 20 metri.",
      "pt": "Visibilidade extraordinária durante todo o ano, superando 20 metros.",
      "ja": "通年20メートルを超える圧倒的な海中視界を誇る奇跡の海。",
      "zh": "全年水下能见度卓越，通常稳定保持在20米以上的超高通透水准。"
    },
    "includedInTourIds": [
      "galapagos-7days",
      "galapagos-8days"
    ],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Snorkel desde embarcación en aguas abiertas)",
      "en": "Moderate (Boat snorkeling in open bay)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（ボートからのエントリー）",
      "zh": "中等（游艇船尾入水外海浮潜）"
    },
    "duration": {
      "es": "Día Completo (Yate navegable desde Santa Cruz)",
      "en": "Full Day (Navigable yacht from Santa Cruz)",
      "fr": "Journée complète (Yacht)",
      "de": "Ganztags (Yacht)",
      "it": "Giornata intera (Yacht)",
      "pt": "Dia inteiro (Iate)",
      "ja": "終日（サンタクルス発ヨットツアー）",
      "zh": "全天（圣克鲁斯出发探险游艇巡航）"
    },
    "imageUrl": "/images/tours/9-16/tortuga-marina-galapagos-slider-4k.webp",
    "keyWildlife": [
      {
        "es": "Tortuga Marina Verde del Pacífico",
        "en": "Pacific Green Sea Turtle",
        "fr": "Tortue verte du Pacifique",
        "de": "Grüne Meeresschildkröte",
        "it": "Tartaruga verde",
        "pt": "Tartaruga-verde",
        "ja": "アオウミガメ",
        "zh": "太平洋绿海龟"
      },
      {
        "es": "Tiburón Tintorera de Arrecife",
        "en": "White-tip Reef Shark",
        "fr": "Requin à pointes blanches",
        "de": "Weißspitzen-Riffhai",
        "it": "Squalo pinna bianca",
        "pt": "Tubarão-de-pontas-brancas",
        "ja": "ネムリブカ",
        "zh": "白顶礁鲨"
      },
      {
        "es": "Raya Jaspeada",
        "en": "Marbled Stingray",
        "fr": "Raie marbrée",
        "de": "Marmor-Stechrochen",
        "it": "Razza marmorizzata",
        "pt": "Raia-marmorizada",
        "ja": "マーブルスティングレイ",
        "zh": "大理石纹黄貂鱼"
      }
    ],
    "highlights": [
      {
        "es": "Nadar con visibilidad de acuario rodeado de más de 20 tortugas marinas",
        "en": "Swimming in aquarium-grade visibility surrounded by 20+ grazing sea turtles",
        "fr": "Nager au milieu de plus de 20 tortues marines",
        "de": "Schwimmen mit über 20 Meeresschildkröten in Aquarium-Qualität",
        "it": "Nuotare con oltre 20 tartarughe in acque da acquario",
        "pt": "Nadar com mais de 20 tartarugas marinhas em visibilidade cristalina",
        "ja": "天然の水族館のような透明度の中で20頭以上のウミガメに囲まれる感動",
        "zh": "在宛如顶级天然水族馆的水质中，被20多只悠闲绿海龟全方位环绕"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Incluido como opción alternativa en los tours base de 7 y 8 Días de Vermilion.",
      "en": "Included as alternative option in Vermilion 7 and 8-Day base tours.",
      "fr": "Option alternative incluse dans les circuits 7 et 8 jours.",
      "de": "Als Alternative in den 7- und 8-Tage Touren enthalten.",
      "it": "Incluso come alternativa nei tour di 7 e 8 giorni.",
      "pt": "Incluído como alternativa nos tours de 7 e 8 dias.",
      "ja": "7日間および8日間のベースツアーに選択肢として搭載。",
      "zh": "已作为可选出海方案包含在7日和8日基础行程中（与圣菲岛二选一）。"
    }
  },
  {
    "id": "ps-sesuvium-iguanas",
    "name": {
      "es": "Caminata por el Manto Rojo de Sesuvium, Acantilados de Aves e Iguanas Híbridas",
      "en": "South Plaza Red Sesuvium Carpet, Bird Cliffs & Hybrid Iguanas",
      "fr": "Tapis Rouge de Sesuvium, Falaises aux Oiseaux & Iguanes Hybrides à Plaza Sud",
      "de": "Süd-Plaza Roter Sesuvium-Teppich, Steilklippen & Hybrid-Leguane",
      "it": "Plaza Sud: Tappeto Rosso di Sesuvium, Falesie e Iguane Ibride",
      "pt": "Plaza Sul: Tapete Vermelho de Sesuvium, Falésias e Iguanas Híbridas",
      "ja": "サウス・プラザ島 赤いセズビウムの絨毯＆海鳥の絶壁と奇跡のハイブリッドイグアナ",
      "zh": "南普拉扎岛：红海马齿苋天然织锦、海鸟千仞绝壁与特有杂交鬣蜥"
    },
    "shortDescription": {
      "es": "Una de las islas con mayor impacto visual: alfombra vegetal roja brillante, colonias de iguanas amarillas bajo cactus gigantes y acantilados con aves marinas.",
      "en": "One of the most photogenic islands in the world: a vivid crimson carpet of succulent Sesuvium, golden land iguanas beneath giant cactus trees, and vertical bird cliffs.",
      "fr": "L'une des îles les plus photogéniques : tapis végétal rouge vif, iguanes jaunes et falaises peuplées d'oiseaux.",
      "de": "Eine der fotogensten Inseln der Welt: leuchtend roter Pflanzenteppich, goldene Leguane und Klippen.",
      "it": "Isola incredibilmente fotogenica: tappeto rosso brillante, iguane dorate e scogliere con uccelli marini.",
      "pt": "Uma das ilhas mais fotogênicas com tapete vegetal vermelho, iguanas amarelas e falésias imponentes.",
      "ja": "息を呑む色彩美を誇る島。真っ赤に染まる多肉植物の絨毯、黄色いリクイグアナ、そして海鳥が乱舞する大断崖の壮大なコントラスト。",
      "zh": "全群岛最具色彩视觉冲击力的摄影圣地：铺满地面的鲜红肉质海马齿苋、参天仙人掌下的金黄陆鬣蜥与海鸟翻飞的万仞峭壁。"
    },
    "description": {
      "es": "Isla Plaza Sur es una pequeña franja de lava basáltica levantada frente a Santa Cruz. Su paisaje parece pintado al óleo: el suelo se cubre de Sesuvium edmonstonei que cambia de verde a un rojo escarlata brillante en la temporada seca. Alberga una densa población de iguanas terrestres amarillas que esperan bajo los cactus a que caigan sus frutos, así como raras iguanas híbridas (cruce de terrestre y marina). Los acantilados marinos acogen aves tropicales de pico rojo y gaviotas de cola bifurcada.",
      "en": "South Plaza is a narrow uplifted fault block east of Santa Cruz. Its landscape resembles an oil painting: dense carpets of succulent Sesuvium transition from emerald to incandescent scarlet in the dry season. It shelters a large colony of golden land iguanas beneath towering prickly-pear cacti, plus rare hybrid iguanas (land x marine cross). Vertical southern cliffs host red-billed tropicbirds and swallow-tailed gulls.",
      "fr": "Île aux contrastes saisissants avec flore rouge vif, iguanes terrestres et falaises maritimes.",
      "de": "Farbgewaltige Insel mit rotem Sesuvium, gelben Leguanen und Brutklippen für Tropikvögel.",
      "it": "Isola dai contrasti cromatici unici con iguane dorate e uccelli tropicali.",
      "pt": "Ilha de contrastes deslumbrantes com flora avermelhada e iguanas amarelas.",
      "ja": "サンタクルス東岸の隆起島。乾季には多肉植物セズビウムが鮮やかな深紅色に染まり、黄色いリクイグアナと見事な色彩の対比を描きます。南側の切り立った崖には美しいアカハシネッタイチョウが飛来。",
      "zh": "由海底地壳倾斜断块抬升而成的精致岛屿。旱季时地面海马齿苋由绿转为猩红色，金色陆鬣蜥在巨型仙人掌下静候成熟果实掉落。南部百米海蚀崖则是红嘴热带鸟筑巢翱翔的天然舞台。"
    },
    "island": "plaza-sur",
    "islandName": {
      "es": "Plaza Sur",
      "en": "South Plaza",
      "fr": "Plaza Sud",
      "de": "Süd-Plaza",
      "it": "Plaza Sud",
      "pt": "Plaza Sul",
      "ja": "サウス・プラザ島",
      "zh": "南普拉扎岛"
    },
    "category": "photography",
    "categoryName": {
      "es": "Fotografía de Paisajes & Naturaleza",
      "en": "Landscape & Nature Photography",
      "fr": "Photographie de Paysages & Nature",
      "de": "Landschafts- & Naturfotografie",
      "it": "Fotografia di Paesaggio e Natura",
      "pt": "Fotografia de Natureza e Paisagens",
      "ja": "ネイチャー＆絶景フォトグラフィー",
      "zh": "自然人文与风光摄影"
    },
    "seasons": [
      "all-year",
      "cool"
    ],
    "bestMonths": [
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De junio a diciembre el manto de Sesuvium adquiere su coloración roja más intensa, creando el contraste fotográfico perfecto.",
      "en": "June through December sees the Sesuvium carpet turn its deepest fiery scarlet, creating phenomenal photographic contrast.",
      "fr": "De juin à décembre, le tapis végétal est d'un rouge éclatant incomparable.",
      "de": "Juni bis Dezember leuchtet der Pflanzenteppich im intensivsten Rot.",
      "it": "Da giugno a dicembre il manto vegetale raggiunge il rosso più intenso.",
      "pt": "De junho a dezembro a vegetação atinge o vermelho mais vibrante.",
      "ja": "6月〜12月はセズビウムの葉が最も燃えるような深紅に染まり、息を呑む絶景写真が撮影できます。",
      "zh": "每年6月至12月的干燥雾季期间，海马齿苋展现最浓烈醉人的火红色彩，摄影效果无与伦比。"
    },
    "includedInTourIds": [],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Sendero plano de 1.5 km)",
      "en": "Easy (1-mile flat walking trail)",
      "fr": "Facile",
      "de": "Sehr leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（約1.5kmの平坦な遊歩道）",
      "zh": "轻松（约1.5公里平缓观景步道）"
    },
    "duration": {
      "es": "Día Completo (Yate navegable desde Santa Cruz)",
      "en": "Full Day (Navigable yacht from Santa Cruz)",
      "fr": "Journée complète (Yacht)",
      "de": "Ganztags (Yacht)",
      "it": "Giornata intera (Yacht)",
      "pt": "Dia inteiro (Iate)",
      "ja": "終日（サンタクルス発ヨットツアー）",
      "zh": "全天（圣克鲁斯出发探险游艇巡航）"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-land-iguana-portrait.webp",
    "keyWildlife": [
      {
        "es": "Iguana Terrestre Amarilla de Plaza Sur",
        "en": "South Plaza Land Iguana",
        "fr": "Iguane terrestre de Plaza Sud",
        "de": "Plaza-Landleguan",
        "it": "Iguana terrestre di Plaza Sud",
        "pt": "Iguana-terrestre-de-plaza-sul",
        "ja": "サウス・プラザリクイグアナ",
        "zh": "普拉扎金色陆鬣蜥"
      },
      {
        "es": "Rabijunco Piquirrojo (Phaethon aethereus)",
        "en": "Red-billed Tropicbird",
        "fr": "Phaéton à bec rouge",
        "de": "Rotschnabel-Tropikvogel",
        "it": "Fetonte beccorosso",
        "pt": "Fáeton-de-bico-vermelho",
        "ja": "アカハシネッタイチョウ",
        "zh": "红嘴热带鸟"
      },
      {
        "es": "Iguana Híbrida (Cruce único)",
        "en": "Rare Hybrid Iguana",
        "fr": "Iguane hybride rare",
        "de": "Seltene Hybrid-Echse",
        "it": "Iguana ibrida rara",
        "pt": "Iguana híbrida rara",
        "ja": "ハイブリッドイグアナ（世界唯一の交雑種）",
        "zh": "世界绝无仅有的杂交鬣蜥"
      }
    ],
    "highlights": [
      {
        "es": "Contraste surrealista entre la alfombra roja, cactus gigantes y el mar turquesa",
        "en": "Surreal visual harmony of scarlet flora, yellow iguanas, and deep azure sea",
        "fr": "Contraste saisissant entre tapis rouge, cactus et mer turquoise",
        "de": "Surreale Farbharmonie aus rotem Teppich, Kakteen und blauem Meer",
        "it": "Armonia visiva unica tra vegetazione rossa, cactus e mare blu",
        "pt": "Harmonia visual entre vegetação vermelha, cactos e mar azul",
        "ja": "燃えるような赤い大地、サボテンの緑、青い海の圧倒的カラーグラデーション",
        "zh": "猩红多肉地毯、苍翠巨型仙人掌与深蓝大海交织而成的超现实油画画境"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable en yate navegable de día completo.",
      "en": "Customizable Full-Day Navigable Yacht Add-On.",
      "fr": "Excursion yacht sur mesure.",
      "de": "Ganztägiger Yachtausflug auf Anfrage.",
      "it": "Escursione in yacht su richiesta.",
      "pt": "Passeio em iate sob consulta.",
      "ja": "終日ヨットクルーズによる追加カスタマイズツアー。",
      "zh": "全天出海游艇自选定制附加活动。"
    }
  },
  {
    "id": "fl-devils-crown-post-office",
    "name": {
      "es": "Snorkel en la Corona del Diablo y Tradición de Correo en Post Office Bay",
      "en": "Devil's Crown Submerged Crater Snorkel & Post Office Bay Mail Tradition",
      "fr": "Snorkeling à la Couronne du Diable & Tradition Postale de Post Office Bay",
      "de": "Teufelskrone Schnorcheln & Post Office Bay Seefahrer-Tradition",
      "it": "Snorkeling alla Corona del Diavolo e Tradizione Postale a Post Office Bay",
      "pt": "Snorkel na Coroa do Diabo e Tradição Postal em Post Office Bay",
      "ja": "フロレアナ島 悪魔の冠（クラウン）海中クレータースノーケル＆伝統のポストオフィス・ベイ郵便樽",
      "zh": "弗洛雷安纳岛魔鬼之冠沉没火山口浮潜与百年邮政桶传奇"
    },
    "shortDescription": {
      "es": "Snorkel de corriente en el cono volcánico sumergido más biodiverso de Galápagos y participa en el sistema de correo pirata del siglo XVIII que aún funciona.",
      "en": "Drift snorkel inside a submerged volcanic cone pulsing with marine life, then participate in an authentic 18th-century whalers’ wooden barrel mail system still in active use.",
      "fr": "Snorkeling dans un cratère sous-marin foisonnant de vie et boîte aux lettres historique des baleiniers.",
      "de": "Strömungsschnorcheln in einem versunkenen Krater und historische Postfass-Tradition aus dem 18. Jahrhundert.",
      "it": "Snorkeling mozzafiato in un cratere sommerso e storica tradizione postale del barile dei balenieri.",
      "pt": "Snorkel incrível em cratera submersa e tradicional barril postal dos baleeiros do século XVIII.",
      "ja": "海上に王冠のように頭を覗かせる火山噴火口で極上ドリフトスノーケル。捕鯨船員が18世紀に設置した手渡し郵便樽の伝統を体験。",
      "zh": "在被誉为“魔鬼之冠”的环形沉没火山口体验波澜壮阔的放流浮潜，亲身参与自18世纪捕鲸时代流传至今的手递无邮票木桶投信传奇。"
    },
    "description": {
      "es": "Frente a la costa norte de Floreana se alza Corona del Diablo, un cráter volcánico casi totalmente sumergido cuyas rocas sobresalen como puntas de corona. Considerado por biólogos como uno de los sitios de snorkel más ricos del planeta, el flujo de corrientes marinas alimenta corales, tiburones martillo, tortugas marinas y bancos de peces cirujano. La excursión incluye visitar Post Office Bay, donde los viajeros depositan postales sin sello en un barril de madera histórico para que otros viajeros las lleven a mano a sus destinos.",
      "en": "Off the north shore of Floreana lies Devil’s Crown, a nearly submerged volcanic cinder cone with jagged rock spires protruding like a crown. Revered as one of the world’s top snorkeling spots, strong tidal currents nourish a magnificent coral garden where hammerheads, reef sharks, and sea turtles glide. The journey includes visiting legendary Post Office Bay, where you can leave unstamped postcards in an 18th-century whalers’ wooden barrel and pick up mail to hand-deliver back home.",
      "fr": "Snorkeling d'exception dans un cratère circulaire sous-marin et rituel postal historique à Floreana.",
      "de": "Weltklasse-Schnorcheln im versunkenen Vulkankegel und Besuch des berühmten historischen Postfasses.",
      "it": "Snorkeling straordinario in un cratere vulcanico e visita allo storico barile postale a Floreana.",
      "pt": "Mergulho espetacular em cratera vulcânica submersa e visita ao histórico barril de correios.",
      "ja": "フロレアナ島沖合の「悪魔の冠」。水没した火口の内部は色鮮やかなサンゴと海洋生物の宝庫。ポストオフィス・ベイでは、切手を使わず旅行者がバトンを繋ぐ世界最古の手渡し郵便システムを体験。",
      "zh": "位于弗洛雷安纳北海的“魔鬼之冠”是一座近乎完全淹没的火山口尖礁。潮汐洋流滋养了绚烂珊瑚园，鲨鱼、海龟与数万热带鱼同游。随后造访邮政湾，将手写明信片投入18世纪捕鲸水手设立的古老木桶，由下一位旅人亲手传递回国。"
    },
    "island": "floreana",
    "islandName": {
      "es": "Floreana",
      "en": "Floreana Island",
      "fr": "Île Floreana",
      "de": "Insel Floreana",
      "it": "Isola Floreana",
      "pt": "Ilha Floreana",
      "ja": "フロレアナ島",
      "zh": "弗洛雷安纳岛"
    },
    "category": "snorkel-diving",
    "categoryName": {
      "es": "Snorkel & Buceo en Arrecifes",
      "en": "Snorkeling & Scuba Diving",
      "fr": "Snorkeling & Plongée sous-marine",
      "de": "Schnorcheln & Gerätetauchen",
      "it": "Snorkeling e Immersioni",
      "pt": "Snorkel e Mergulho Autônomo",
      "ja": "シュノーケリング＆スキューバダイビング",
      "zh": "珊瑚礁浮潜与深潜"
    },
    "seasons": [
      "all-year",
      "warm"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Temporada cálida (diciembre a mayo) ofrece aguas más cálidas y tranquilas; temporada fresca atrae mayor variedad de pelágicos.",
      "en": "Warm season (December to May) offers gentler currents; cool months draw heavier pelagic shark activity.",
      "fr": "De décembre à mai la mer est plus calme, plus de requins de juin à novembre.",
      "de": "Dezember bis Mai bietet ruhigeres Wasser; kühlere Monate bringen mehr Haie.",
      "it": "Da dicembre a maggio acque più calme; nei mesi freddi più squali.",
      "pt": "De dezembro a maio o mar é mais calmo; meses frios trazem mais tubarões.",
      "ja": "12月〜5月は波が穏やかで泳ぎやすく、6月〜11月は大型のサメやエイが外海から頻繁に回遊してきます。",
      "zh": "12月至5月海水平静温暖；凉爽季节则吸引更多远洋大鲨鱼与蝠鲼聚集。"
    },
    "includedInTourIds": [],
    "difficulty": "demanding",
    "difficultyName": {
      "es": "Exigente (Snorkel con corriente media a fuerte)",
      "en": "Demanding (Drift snorkel with moderate-strong currents)",
      "fr": "Exigeant (Courants)",
      "de": "Anspruchsvoll (Strömungsschnorcheln)",
      "it": "Impegnativo (Correnti marine)",
      "pt": "Exigente (Correntes marítimas)",
      "ja": "上級（海流のあるポイントでのドリフトスノーケル）",
      "zh": "高阶（具备中强海流的放流浮潜）"
    },
    "duration": {
      "es": "Día Completo (Yate navegable desde Santa Cruz)",
      "en": "Full Day (Navigable yacht from Santa Cruz)",
      "fr": "Journée complète (Yacht depuis Santa Cruz)",
      "de": "Ganztags (Yacht ab Santa Cruz)",
      "it": "Giornata intera (Yacht da Santa Cruz)",
      "pt": "Dia inteiro (Iate de Santa Cruz)",
      "ja": "終日（サンタクルス発ヨットツアー）",
      "zh": "全天（圣克鲁斯出发探险游艇巡航）"
    },
    "imageUrl": "/images/tours/16-9/galapagos-focas-16-9.webp",
    "keyWildlife": [
      {
        "es": "Tiburón Martillo (Sphyrna lewini)",
        "en": "Scalloped Hammerhead Shark",
        "fr": "Requin-marteau",
        "de": "Hammerhai",
        "it": "Squalo martello",
        "pt": "Tubarão-martelo",
        "ja": "シュモクザメ",
        "zh": "双髻鲨"
      },
      {
        "es": "Pez Cirujano de Galápagos (Prionurus laticlavius)",
        "en": "Razor Surgeonfish",
        "fr": "Chirurgien des Galápagos",
        "de": "Galapagos-Doktorfisch",
        "it": "Pesce chirurgo delle Galapagos",
        "pt": "Peixe-cirurgião-de-galápagos",
        "ja": "ニジハギ・クロハギ群",
        "zh": "加拉帕戈斯刺尾鱼群"
      },
      {
        "es": "Flamingo Americano en Punta Cormorant",
        "en": "American Flamingo at Punta Cormorant",
        "fr": "Flamant rose à Punta Cormorant",
        "de": "Flamingo an der Punta Cormorant",
        "it": "Fenicottero a Punta Cormorant",
        "pt": "Flamingo em Punta Cormorant",
        "ja": "ベニイロフラミンゴ",
        "zh": "美洲红鹳"
      }
    ],
    "highlights": [
      {
        "es": "Hacer snorkel en uno de los conos de lava submarinos con mayor vida de la Tierra",
        "en": "Drifting along one of the planet’s richest marine volcanic calderas",
        "fr": "Nager dans l'un des cratères sous-marins les plus riches du monde",
        "de": "Schnorcheln in einer der artenreichsten Meerescalderas der Welt",
        "it": "Snorkeling in uno dei crateri marini più ricchi al mondo",
        "pt": "Mergulho em uma das caldeiras marinhas mais ricas da Terra",
        "ja": "地球上で最も生物密度が高い海中クレーターでの圧倒的ドリフトスノーケル",
        "zh": "在地球上海洋生物丰度最高的沉没火山口裂隙中放流穿梭"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Estrella. Tour navegable exclusivo con historia de piratas y snorkel de élite.",
      "en": "Signature Premier Add-On. Elite navigable yacht excursion combining pirate lore and world-class drift snorkeling.",
      "fr": "Activité phare d'une journée en yacht.",
      "de": "Hochkarätige Zusatzaktivität mit Yachtfahrt.",
      "it": "Attività opzionale esclusiva con storia pirata e snorkeling.",
      "pt": "Atividade de destaque em iate com história de piratas.",
      "ja": "【知る人ぞ知る最高峰】歴史とアドベンチャーが融合した特別追加ツアー。",
      "zh": "【融合传奇历史与顶级浮潜的至尊行程】全天豪华游艇巡游，需提前预定升级。"
    }
  },
  {
    "id": "sc-lava-tunnels",
    "name": {
      "es": "Espeleología en Tubos de Lava Volcánica Subterráneos",
      "en": "Subterranean Volcanic Lava Tubes Exploration",
      "fr": "Spéléologie dans les Tunnels de Lave Volcanique",
      "de": "Höhlenforschung in unterirdischen Lavatunneln",
      "it": "Speleologia nei Tunnel di Lava Vulcanica Sotterranei",
      "pt": "Espeleologia em Túneis de Lava Vulcânica Subterrâneos",
      "ja": "地下火山溶岩トンネル洞窟探検",
      "zh": "地下火山熔岩洞穴探险"
    },
    "shortDescription": {
      "es": "Camina por gigantescas galerías subterráneas esculpidas hace miles de años por ríos incandescentes de magma volcánico.",
      "en": "Venture through colossal subterranean chambers hollowed out millennia ago by rushing incandescent rivers of basaltic magma.",
      "fr": "Explorez de gigantesques galeries souterraines créées par des fleuves de magma en fusion.",
      "de": "Wandern Sie durch gigantische unterirdische Galerien, geformt von glühendem Magma.",
      "it": "Cammina attraverso imponenti gallerie sotterranee scavate da antichi fiumi di magma.",
      "pt": "Caminhe por imensas galerías subterrâneas esculpidas por rios de magma vulcânico.",
      "ja": "数千年前に灼熱のマグマ流が大地をくり抜いて生まれた、神秘の地下巨大溶岩トンネルを歩く冒険。",
      "zh": "深入数千年前由炽热玄武熔岩奔流自然镂空而成的地下巨型天然洞穴与拱形长廊。"
    },
    "description": {
      "es": "Ubicados en las tierras altas de Santa Cruz, estos tubos de lava se formaron cuando la corteza exterior de un río de magma se solidificó en contacto con el aire mientras el núcleo líquido continuaba fluyendo. Los visitantes pueden recorrer cientos de metros por túneles iluminados de hasta 8 metros de altura admirando estalactitas de lava y formaciones geológicas únicas.",
      "en": "Nestled in the Santa Cruz highlands, these remarkable lava tubes formed when the outer crust of a molten magma river solidified while liquid rock drained out beneath. Travelers walk hundreds of yards through naturally vaulted subterranean passages up to 25 feet high with rare lava stalactites.",
      "fr": "Tunnels de lave spectaculaires créés par le refroidissement de coulées de magma dans les hauts plateaux.",
      "de": "Faszinierende Lavahöhlen im Hochland von Santa Cruz mit bis zu 8 m hohen Gewölben.",
      "it": "Tunnel di lava sotterranei alti fino a 8 metri con formazioni geologiche affascinanti.",
      "pt": "Túneis de lava com galerias de até 8 metros de altura nas terras altas de Santa Cruz.",
      "ja": "マグマの外側が冷え固まり内部だけが流れ出して空洞になった天然の溶岩洞。高さ8メートルに及ぶ幻想的な地下空間を歩きます。",
      "zh": "位于圣克鲁斯高地的天然熔岩管道，外壳冷却凝固而内部炽热岩浆流空所形成。游人可漫步于高达8米的天然拱顶穹顶长廊。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "volcanic-hiking",
    "categoryName": {
      "es": "Senderismo Volcánico & Geología",
      "en": "Volcanic Hiking & Geology",
      "fr": "Randonnée Volcanique & Géologie",
      "de": "Vulkanwandern & Geologie",
      "it": "Trekking Vulcanico e Geologia",
      "pt": "Trilhas Vulcânicas e Geologia",
      "ja": "火山トレッキング＆地質探訪",
      "zh": "火山地貌徒步探险"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Temperatura subterránea constante y agradable los 365 días del año.",
      "en": "Subterranean cave temperature remains comfortable year-round regardless of outside weather.",
      "fr": "Température constante agréable sous terre toute l'année.",
      "de": "Ganzjährig angenehme Höhlentemperaturen.",
      "it": "Temperatura costante tutto l'anno.",
      "pt": "Temperatura constante o ano todo.",
      "ja": "年間を通じて地下洞窟内は一定の心地よい気温に保たれています。",
      "zh": "洞穴地下恒温舒适，全年风雨无阻皆可探秘。"
    },
    "includedInTourIds": [],
    "difficulty": "easy",
    "difficultyName": {
      "es": "Fácil (Sendero iluminado subterráneo)",
      "en": "Easy (Illuminated cave path)",
      "fr": "Facile",
      "de": "Leicht",
      "it": "Facile",
      "pt": "Fácil",
      "ja": "初級（照明付き歩道）",
      "zh": "轻松（设有地灯照明的平整步道）"
    },
    "duration": {
      "es": "1.5 horas",
      "en": "1.5 hours",
      "fr": "1h30",
      "de": "1,5 Std.",
      "it": "1.5 ore",
      "pt": "1,5 horas",
      "ja": "約1.5時間",
      "zh": "约1.5小时"
    },
    "imageUrl": "/images/destinations/galapagos/galapagos-giant-tortoise-highlands-reserve.webp",
    "keyWildlife": [
      {
        "es": "Lechuza de Galápagos (Tyto alba punctatissima)",
        "en": "Galapagos Barn Owl",
        "fr": "Chouette effraie des Galápagos",
        "de": "Galapagos-Schleiereule",
        "it": "Barbagianni delle Galapagos",
        "pt": "Coruja-das-torres-de-galápagos",
        "ja": "メンフクロウ（ガラパゴス固有亜種）",
        "zh": "仓鸮加拉帕戈斯亚种"
      }
    ],
    "highlights": [
      {
        "es": "Caminar por el interior de una corriente de lava extinta iluminada",
        "en": "Walking inside an illuminated prehistoric molten magma conduit",
        "fr": "Marcher à l'intérieur d'un fleuve de lave fossilisé",
        "de": "Spaziergang durch eine fossile Magma-Ader",
        "it": "Camminare all'interno di un antico condotto di magma",
        "pt": "Caminhar no interior de um antigo fluxo de lava",
        "ja": "太古のマグマが流れた跡を歩く神秘的な地底体験",
        "zh": "步入远古时期炽热岩浆奔流奔涌过的天然地下通道"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable en combinación con Rancho Primicias.",
      "en": "Customizable Add-On often paired with Primicias Ranch.",
      "fr": "Activité optionnelle.",
      "de": "Zusatzoption im Hochland.",
      "it": "Opzionale.",
      "pt": "Atividade opcional.",
      "ja": "プリミシアス牧場見学時に合わせて追加可能。",
      "zh": "可与高地巨龟庄园联动定制的可选探险项目。"
    }
  },
  {
    "id": "sc-cerro-dragon",
    "name": {
      "es": "Senderismo en Cerro Dragón y Laguna de Flamingos",
      "en": "Cerro Dragón (Dragon Hill) Land Iguana Trail & Flamingo Lagoon",
      "fr": "Randonnée à Cerro Dragón & Lagune aux Flamants",
      "de": "Cerro Dragón (Drachenhügel) Leguanpfad & Flamingo-Lagune",
      "it": "Trekking a Cerro Dragón e Laguna dei Fenicotteri",
      "pt": "Trilha em Cerro Dragón e Lagoa de Flamingos",
      "ja": "セロ・ドラゴン（竜の丘）大型リクイグアナ生息地＆フラミンゴ湖",
      "zh": "龙丘（塞罗德拉贡）金黄陆鬣蜥追踪与火烈鸟盐湖徒步"
    },
    "shortDescription": {
      "es": "Recorre el hábitat rocoso donde viven las iguanas terrestres más robustas de Santa Cruz y observa flamingos alimentándose en lagunas hipersalinas.",
      "en": "Trek through the rocky thorn forest haven of Santa Cruz’s most impressive yellow land iguanas and spot vibrant pink flamingos in hyper-saline ponds.",
      "fr": "Sentier volcanique vers la terre des iguanes terrestres géants et lagune de flamants roses.",
      "de": "Wanderung zum Lebensraum prächtiger gelber Landleguane und rosafarbener Flamingos.",
      "it": "Sentiero tra cactus verso la roccaforte delle grandi iguane terrestri e fenicotteri.",
      "pt": "Trilha vulcânica com grandes iguanas terrestres e lagoas de flamingos.",
      "ja": "ゴツゴツした溶岩の丘で大型のガラパゴスリクイグアナを観察。高塩分ラグーンでは優美なフラミンゴを撮影。",
      "zh": "穿越多刺仙人掌林岩石小径，追踪圣克鲁斯体型最壮硕的金色陆鬣蜥，在天然高盐度湖泊边捕捉粉红火烈鸟身姿。"
    },
    "description": {
      "es": "Situado en la costa noroeste de Santa Cruz, Cerro Dragón debe su nombre a ser el último reducto de iguanas terrestres de la isla, rescatadas y repobladas por el Parque Nacional. El sendero bordea una serie de lagunas costeras de agua salobre donde habitan flamingos y patillos de mejillas blancas, para luego ascender a la colina de toba con vistas al canal de Bolívar.",
      "en": "Located on the northwest shore of Santa Cruz, Dragon Hill earned its name as the historic refuge of wild land iguanas, successfully saved by National Park breeding programs. The interpretive loop passes hyper-saline coastal lagoons frequented by feeding flamingos and white-cheeked pintails before ascending the rocky hill with panoramic views.",
      "fr": "Refuge historique des iguanes terrestres de Santa Cruz avec lagunes à flamants.",
      "de": "Historisches Refugium für Galapagos-Landleguane mit Lagunen und herrlicher Aussicht.",
      "it": "Rifugio delle iguane terrestri salvate dall'estinzione con vista spettacolare.",
      "pt": "Refúgio de conservação das iguanas terrestres com vista panorâmica.",
      "ja": "かつて絶滅寸前まで追い込まれたリクイグアナが保護・繁殖された聖地。静かな塩湖のフラミンゴと丘の上の大パノラマを満喫。",
      "zh": "位于圣克鲁斯西北海岸，因作为野生陆鬣蜥繁育复兴的历史庇护所而得名。沿途环绕盐水湖火烈鸟栖息地，登顶俯瞰海峡壮美海景。"
    },
    "island": "santa-cruz",
    "islandName": {
      "es": "Santa Cruz",
      "en": "Santa Cruz",
      "fr": "Santa Cruz",
      "de": "Santa Cruz",
      "it": "Santa Cruz",
      "pt": "Santa Cruz",
      "ja": "サンタクルス島",
      "zh": "圣克鲁斯岛"
    },
    "category": "photography",
    "categoryName": {
      "es": "Fotografía de Paisajes & Naturaleza",
      "en": "Landscape & Nature Photography",
      "fr": "Photographie de Paysages & Nature",
      "de": "Landschafts- & Naturfotografie",
      "it": "Fotografia di Paesaggio e Natura",
      "pt": "Fotografia de Natureza e Paisagens",
      "ja": "ネイチャー＆絶景フォトグラフィー",
      "zh": "自然人文与风光摄影"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Iguanas y flamingos presentes todo el año; vegetación más verde y flores amarillas en temporada de lluvia (enero-mayo).",
      "en": "Iguanas and flamingos observable year-round; lush vegetation and yellow blossoms bloom January-May.",
      "fr": "Présents toute l'année, fleurs et végétation plus verte de janvier à mai.",
      "de": "Ganzjährig sichtbar; blühende Landschaft während der Regenzeit (Januar-Mai).",
      "it": "Fauna presente tutto l'anno con fioriture tra gennaio e maggio.",
      "pt": "Visível o ano todo com vegetação florida de janeiro a maio.",
      "ja": "通年観察可能。1月〜5月の雨季には黄色いサボテンの花が一斉に咲き誇り、フォトジェニックな景観に。",
      "zh": "全年可赏。1月至5月湿润季期间仙人掌与黄花盛开，与金色陆鬣蜥相映成趣。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Caminata de 2 km sobre roca volcánica)",
      "en": "Moderate (1.3-mile volcanic rock hike)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（溶岩石の散策路 約2km）",
      "zh": "中等（约2公里火山熔岩步道）"
    },
    "duration": {
      "es": "Medio Día Largo (Navegación + Caminata)",
      "en": "Extended Half Day (Boat + Trail)",
      "fr": "4 à 5 heures",
      "de": "4-5 Std.",
      "it": "4-5 ore",
      "pt": "4 a 5 horas",
      "ja": "約4〜5時間",
      "zh": "约4-5小时"
    },
    "imageUrl": "/images/tours/9-16/galapagos-flamenco-rosa-reflejo-9-16.webp",
    "keyWildlife": [
      {
        "es": "Iguana Terrestre de Galápagos (Conolophus subcristatus)",
        "en": "Galapagos Land Iguana",
        "fr": "Iguane terrestre des Galápagos",
        "de": "Galapagos-Landleguan",
        "it": "Iguana terrestre delle Galapagos",
        "pt": "Iguana-terrestre-de-galápagos",
        "ja": "ガラパゴスリクイグアナ",
        "zh": "加拉帕戈斯陆鬣蜥"
      },
      {
        "es": "Flamingo Americano",
        "en": "American Flamingo",
        "fr": "Flamant d'Amérique",
        "de": "Kubaflamingo",
        "it": "Fenicottero dei Caraibi",
        "pt": "Flamingo-americano",
        "ja": "ベニイロフラミンゴ",
        "zh": "美洲红鹳"
      }
    ],
    "highlights": [
      {
        "es": "Ver las iguanas terrestres más robustas y territoriales alimentándose de cactus",
        "en": "Observing robust territorial land iguanas devouring prickly-pear pads",
        "fr": "Observer les grands iguanes terrestres se nourrir de cactus",
        "de": "Große Landleguane beim Fressen von Kakteen beobachten",
        "it": "Grandi iguane terrestri intente a nutrirsi di cactus",
        "pt": "Grandes iguanas terrestres se alimentando de cactos",
        "ja": "サボテンの棘をものともせず食べる堂々とした大型リクイグアナの観察",
        "zh": "近距离抓拍体型健硕的金色陆鬣蜥大快朵颐咀嚼多汁仙人掌果实的珍贵画面"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable en crucero o chárter navegable.",
      "en": "Customizable Add-On via yacht charter.",
      "fr": "Activité sur mesure en yacht.",
      "de": "Zusatztour per Yacht.",
      "it": "Attività opzionale su yacht.",
      "pt": "Atividade sob medida.",
      "ja": "ヨットクルーズにて追加可能。",
      "zh": "可通过专属游艇预订添加的自选探险活动。"
    }
  },
  {
    "id": "is-muro-de-las-lagrimas",
    "name": {
      "es": "Ruta Ciclista / Senderismo al Muro de las Lágrimas y Humedales de Isabela",
      "en": "Wall of Tears & Isabela Coastal Wetlands Cycling / Hiking Trail",
      "fr": "Piste Cyclable et Randonnée au Mur des Larmes à Isabela",
      "de": "Mauer der Tränen & Feuchtgebiete Rad- und Wandertour",
      "it": "Percorso Ciclabile e Trekking al Muro delle Lacrime a Isabela",
      "pt": "Rota de Bicicleta e Caminhada ao Muro das Lágrimas em Isabela",
      "ja": "イサベラ島 涙の壁（歴史遺構）＆沿岸湿地帯サイクリング／トレッキング",
      "zh": "伊莎贝拉岛“哭泣之墙”历史遗址与滨海湿地骑行徒步之旅"
    },
    "shortDescription": {
      "es": "Recorre en bicicleta eléctrica o de montaña el sendero costero entre lagunas de manglar, miradores oceánicos y el histórico muro de basalto de la colonia penal.",
      "en": "Pedal mountain or e-bikes down a scenic coastal trail linking mangrove lagoons, ocean bluff overlooks, and the historic basalt penal colony wall.",
      "fr": "Parcours à vélo le long des lagunes et miradors jusqu'au mur historique de la colonie pénitentiaire.",
      "de": "Fahrrad- oder Wandertour vorbei an Feuchtgebieten und Stränden zur historischen Strafkolonie-Mauer.",
      "it": "Pedalata o passeggiata tra lagune costiere e scogliere fino al muro storico della colonia penale.",
      "pt": "Passeio de bicicleta por lagoas costeiras e mirantes até o histórico Muro das Lágrimas.",
      "ja": "マングローブの湿地と絶景展望台を自転車で快走。かつて過酷な刑務所があった時代の歴史的石壁「涙の壁」へ。",
      "zh": "沿滨海湿地骑行山地自行车或电单车，穿梭于红树林盐湖与悬崖观景台，探寻昔日流放犯人修筑的黑色玄武岩“哭泣之墙”。"
    },
    "description": {
      "es": "Ruta de 6 km al oeste de Puerto Villamil. El sendero serpentea por playas vírgenes, túneles de manglar y miradores como el Cerro Orchilla (con vistas a todo el sur de Isabela). El punto culminante es el Muro de las Lágrimas: una muralla de roca de lava de 100 metros de largo construida a mano entre 1946 y 1959 por los prisioneros de la colonia penal ecuatoriana como castigo físico.",
      "en": "A rewarding 4-mile trail west of Puerto Villamil. The route weaves past secluded white sand beaches, mangrove tunnels, and viewpoints like Cerro Orchilla (panoramic vistas over southern Isabela). The terminus is the Wall of Tears: a massive 300-foot-long lava block wall built by hand between 1946 and 1959 by inmates of an infamous penal colony.",
      "fr": "Sentier côtier de 6 km menant au mur de lave érigé par les bagnards dans les années 1950.",
      "de": "6 km lange Route vorbei an Stränden zum historischen Lavastein-Bauwerk der Strafkolonie.",
      "it": "Percorso di 6 km verso il monumento storico edificato dai prigionieri della colonia penale.",
      "pt": "Rota de 6 km por praias e mirantes até o muro construído pelos presos da colônia penal.",
      "ja": "プエルト・ビジャミルから西へ約6km。白砂のビーチやオルチージャの丘の絶景を巡り、1940〜50年代に囚人たちが手作業で積み上げた悲哀の歴史遺構「涙の壁」へ。",
      "zh": "从维利亚米尔港向西延伸约6公里的景观骑行线。途经隐秘白沙滩与奥奇利亚山全景视角，终点直抵1946年至1959年间流放囚徒徒手垒砌的长达百米玄武熔岩历史巨墙。"
    },
    "island": "isabela",
    "islandName": {
      "es": "Isabela",
      "en": "Isabela Island",
      "fr": "Île Isabela",
      "de": "Insel Isabela",
      "it": "Isola Isabela",
      "pt": "Ilha Isabela",
      "ja": "イサベラ島",
      "zh": "伊莎贝拉岛"
    },
    "category": "history-conservation",
    "categoryName": {
      "es": "Historia, Darwin & Conservación",
      "en": "History, Darwin & Conservation",
      "fr": "Histoire, Darwin & Conservation",
      "de": "Geschichte, Darwin & Artenschutz",
      "it": "Storia, Darwin e Conservazione",
      "pt": "História, Darwin e Conservação",
      "ja": "ダーウィン歴史探訪＆自然保護",
      "zh": "达尔文历史与生态保护"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Ruta fresca ideal por la mañana o al atardecer para evitar las horas de mayor calor.",
      "en": "Best enjoyed in early mornings or late afternoons for comfortable cycling temperatures.",
      "fr": "Idéal le matin ou en fin d'après-midi pour éviter la chaleur.",
      "de": "Frühmorgens oder am späten Nachmittag für angenehmste Temperaturen empfohlen.",
      "it": "Ideale al mattino o al tramonto per evitare il caldo.",
      "pt": "Ideal no início da manhã ou no fim da tarde.",
      "ja": "日中の暑さを避けた爽快な早朝または夕方のサイクリングが特におすすめ。",
      "zh": "极力推荐在清晨或傍晚凉爽时分出发，沿途海风吹拂体感怡人。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Paseo en bicicleta de 12 km ida y vuelta)",
      "en": "Moderate (7.5-mile round-trip bike ride)",
      "fr": "Modéré (12 km à vélo)",
      "de": "Moderat (12 km Radtour)",
      "it": "Moderato (12 km in bicicletta)",
      "pt": "Moderado (12 km de bicicleta)",
      "ja": "中級（往復約12kmのサイクリング）",
      "zh": "中等（往返约12公里自行车骑行）"
    },
    "duration": {
      "es": "Medio Día (3 horas)",
      "en": "Half Day (3 hours)",
      "fr": "Demi-journée (3h)",
      "de": "Halber Tag (3 Std.)",
      "it": "Mezza Giornata (3 ore)",
      "pt": "Meio Dia (3 horas)",
      "ja": "約3時間",
      "zh": "约3小时"
    },
    "imageUrl": "/images/tours/16-9/isabela-island-16-9.1.webp",
    "keyWildlife": [
      {
        "es": "Tortuga Gigante Silvestre de Isabela",
        "en": "Wild Isabela Giant Tortoise",
        "fr": "Tortue géante d'Isabela",
        "de": "Wilde Isabela-Riesenschildkröte",
        "it": "Tartaruga gigante selvatica di Isabela",
        "pt": "Tartaruga-gigante-de-isabela",
        "ja": "野生のイサベラゾウガメ（道端に現れます）",
        "zh": "路旁常出没的野生伊莎贝拉巨龟"
      },
      {
        "es": "Cucuve de Galápagos",
        "en": "Galapagos Mockingbird",
        "fr": "Moqueur des Galápagos",
        "de": "Galapagos-Spottdrossel",
        "it": "Mimo delle Galapagos",
        "pt": "Mímico-de-galápagos",
        "ja": "ガラパゴスマネシツグミ",
        "zh": "加拉帕戈斯嘲鸫"
      }
    ],
    "highlights": [
      {
        "es": "Encontrar tortugas gigantes silvestres cruzando la pista de arena mientras pedaleas",
        "en": "Spotting wild giant tortoises lumbering across the sandy cycling path",
        "fr": "Croiser des tortues géantes sauvages à vélo",
        "de": "Wilden Riesenschildkröten beim Radeln am Wegrand begegnen",
        "it": "Incontrare tartarughe giganti selvatiche mentre si pedala",
        "pt": "Cruzar com tartarugas gigantes na trilha de areia",
        "ja": "自転車の走行中に道端をのそのそ横切る野生の巨亀と出くわす驚き",
        "zh": "骑行途中偶遇在白沙步道旁信步穿梭的真正野生高地巨龟"
      }
    ],
    "isNavigableDayTour": false,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable con alquiler de bicicletas o guía privado.",
      "en": "Customizable Add-On with bike rental or private naturalist guide.",
      "fr": "Option avec location de vélo.",
      "de": "Zusatzaktivität mit Fahrrädern.",
      "it": "Opzionale con noleggio bici.",
      "pt": "Atividade opcional com bicicletas.",
      "ja": "自転車レンタルまたは専属ガイド付きで追加手配可能。",
      "zh": "提供高品质山地自行车租借或配备专属私人自然学向导陪同。"
    }
  },
  {
    "id": "is-urbina-bay",
    "name": {
      "es": "Desembarco en Bahía Urbina: Arrecife de Coral Elevado y Grandes Iguanas Terrestres",
      "en": "Urbina Bay Uplifted Coral Reef & Giant Land Iguana Expedition",
      "fr": "Débarquement à Bahía Urbina: Récif de Corail Élevé & Grands Iguanes",
      "de": "Urbina Bay Gehobenes Korallenriff & Riesenlandleguan Expedition",
      "it": "Sbarco a Bahía Urbina: Barriera Corallina Emersa e Grandi Iguane",
      "pt": "Desembarque em Bahía Urbina: Recife de Coral Elevado e Grandes Iguanas",
      "ja": "ウルビナ湾 突如隆起した古代サンゴ礁＆黄金の大型リクイグアナ探検",
      "zh": "乌尔比纳湾地壳抬升古珊瑚礁与巨型金色陆鬣蜥科考巡礼"
    },
    "shortDescription": {
      "es": "El fenómeno geológico más asombroso del siglo XX: camina sobre 6 km² de lecho marino levantado 5 metros en minutos por actividad volcánica en 1954.",
      "en": "The 20th century’s most jaw-dropping geological event: walk across 2 square miles of ocean floor thrust up 16 feet in minutes by volcanic tectonic uplift in 1954.",
      "fr": "Marchez sur un ancien fond marin surélevé de 5 m en quelques minutes lors d'une éruption en 1954.",
      "de": "Wandern Sie über 6 km² ehemaligen Meeresboden, der 1954 schlagartig um 5 Meter gehoben wurde.",
      "it": "Cammina su un antico fondale marino sollevato di 5 metri in pochi minuti nel 1954.",
      "pt": "Caminhe sobre o fundo do mar elevado repentinamente por atividade vulcânica em 1954.",
      "ja": "1954年、海底が数分間で約5メートルも隆起して陸地化した奇跡の地。化石化した巨大サンゴの骨格や巨大リクイグアナを探索。",
      "zh": "见证20世纪最不可思议的地质奇观：1954年强烈的火山造山运动使6平方公里海底在数分钟内瞬间抬升5米，步行于干涸古珊瑚骨骼与巨大陆鬣蜥之间。"
    },
    "description": {
      "es": "Ubicada en la base del Volcán Alcedo, en la costa occidental de Isabela. En 1954, una masiva intrusión magmática empujó el fondo marino hacia arriba en cuestión de minutos, dejando al descubierto esqueletos intactos de corales cerebro, erizos marinos y moluscos. Hoy es hogar de las iguanas terrestres más grandes y de color amarillo más brillante de Galápagos, tortugas gigantes que bajan del volcán y cormoranes no voladores.",
      "en": "Positioned at the western foot of Alcedo Volcano. In 1954, an intense subterranean magma surge lifted the seabed 16 vertical feet almost instantly, stranding intact brain coral heads, giant shells, and marine fossils high and dry. Today it shelters the largest, most brilliantly golden land iguanas in the archipelago, roaming giant tortoises, and flightless cormorants.",
      "fr": "Site géologique unique au pied du volcan Alcedo, terre d'accueil de très grands iguanes dorés.",
      "de": "Geologisches Wunder am Fuße des Alcedo-Vulkans mit riesigen Korallenskeletten und Leguanen.",
      "it": "Fenomeno geologico straordinario con antichi coralli fossili e imponenti iguane terrestri dorate.",
      "pt": "Fenômeno geológico com corais fósseis e as maiores iguanas terrestres de Galápagos.",
      "ja": "アルセド火山の麓。干上がった脳サンゴの化石が点在する大地で、体長1メートルを超える巨大な黄金色リクイグアナやアルセドゾウガメを発見する感動。",
      "zh": "坐落于阿尔塞多火山脚下的西海岸。1954年地幔岩浆爆发式侵入将完整脑珊瑚群与贝类化石瞬间托举至陆地。如今这里漫步着全群岛体型最庞大、通体金黄闪亮的陆鬣蜥与野生巨龟。"
    },
    "island": "isabela",
    "islandName": {
      "es": "Isabela",
      "en": "Isabela Island",
      "fr": "Île Isabela",
      "de": "Insel Isabela",
      "it": "Isola Isabela",
      "pt": "Ilha Isabela",
      "ja": "イサベラ島",
      "zh": "伊莎贝拉岛"
    },
    "category": "photography",
    "categoryName": {
      "es": "Fotografía de Paisajes & Naturaleza",
      "en": "Landscape & Nature Photography",
      "fr": "Photographie de Paysages & Nature",
      "de": "Landschafts- & Naturfotografie",
      "it": "Fotografia di Paesaggio e Natura",
      "pt": "Fotografia de Natureza e Paisagens",
      "ja": "ネイチャー＆絶景フォトグラフィー",
      "zh": "自然人文与风光摄影"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "De mayo a diciembre las tortugas gigantes de Alcedo descienden a Bahía Urbina para alimentarse de manzanas de manzanillo.",
      "en": "From May to December giant tortoises descend from Alcedo caldera slopes to browse low-lying poisonous apple trees.",
      "fr": "De mai à décembre les tortues d'Alcedo descendent dans la baie pour se nourrir.",
      "de": "Mai bis Dezember wandern die Alcedo-Riesenschildkröten zur Nahrungssuche in die Bucht.",
      "it": "Da maggio a dicembre le tartarughe giganti scendono nella baia per nutrirsi.",
      "pt": "De maio a dezembro as tartarugas descem do vulcão para a baía.",
      "ja": "5月〜12月はアルセド火山の野生ゾウガメがエサを求めて海岸近くまで下りてくるため遭遇率がアップ。",
      "zh": "5月至12月期间阿尔塞多火山巨龟会成群下行至海湾低处觅食野生植物果实。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Caminata de 3.2 km sobre arena y arrecife seco)",
      "en": "Moderate (2-mile loop over sand and uplifted reef)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（砂地・隆起サンゴ岩礁 約3.2km）",
      "zh": "中等（约3.2公里沙地与干涸古珊瑚岩步道）"
    },
    "duration": {
      "es": "Medio Día (Expedición en yate)",
      "en": "Half Day (Yacht expedition)",
      "fr": "Demi-journée (Yacht)",
      "de": "Halber Tag (Yacht)",
      "it": "Mezza Giornata (Yacht)",
      "pt": "Meio Dia (Iate)",
      "ja": "約4時間（ヨット停泊時）",
      "zh": "约4小时（巡航游艇停泊上岸）"
    },
    "imageUrl": "/images/tours/16-9/marine-iguana-galapagos.webp",
    "keyWildlife": [
      {
        "es": "Iguana Terrestre Gigante de Isabela",
        "en": "Giant Isabela Land Iguana",
        "fr": "Iguane terrestre géant d'Isabela",
        "de": "Riesen-Landleguan von Isabela",
        "it": "Iguana terrestre gigante di Isabela",
        "pt": "Iguana-terrestre-gigante-de-isabela",
        "ja": "イサベラゴールデンリクイグアナ",
        "zh": "伊莎贝拉巨型金色陆鬣蜥"
      },
      {
        "es": "Esqueletos Fósiles de Coral Cerebro",
        "en": "Fossilized Brain Coral Heads",
        "fr": "Coraux cerveaux fossilisés",
        "de": "Versteinerte Hirnkorallen",
        "it": "Coralli fossili a cervello",
        "pt": "Corais-cérebro fósseis",
        "ja": "地上に現れた巨大脳サンゴの骨格群",
        "zh": "隆起出地面的巨型脑珊瑚化石骨架"
      },
      {
        "es": "Cormorán No Volador (Nannopterum harrisi)",
        "en": "Flightless Cormorant",
        "fr": "Cormoran aptère",
        "de": "Galapagos-Kormoran",
        "it": "Cormorano attero",
        "pt": "Cormorão-não-voador",
        "ja": "コバネウ（飛べないウ）",
        "zh": "弱翅鸬鹚"
      }
    ],
    "highlights": [
      {
        "es": "Tocar cabezas de coral intactas a kilómetros de la orilla marina actual",
        "en": "Examining intact marine coral formations elevated hundreds of yards inland",
        "fr": "Toucher des coraux marins préservés à l'intérieur des terres",
        "de": "Echte Meereskorallen mitten auf dem Trockenen berühren",
        "it": "Toccare formazioni coralline intatte lontano dalla costa",
        "pt": "Ver corais marinhos perfeitamente preservados terra adentro",
        "ja": "現在の海岸線から遠く離れた内陸でそのまま残る海中サンゴの骨格に触れる感動",
        "zh": "在距离现今海岸线百米开外的干燥陆地上，亲手触摸保存完好的海洋天然珊瑚化石"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional Cotizable en expediciones navegables al oeste de Galápagos.",
      "en": "Customizable Add-On on western archipelago yacht itineraries.",
      "fr": "Activité sur mesure en croisière ouest.",
      "de": "Zusatzaktivität auf Westrouten.",
      "it": "Attività su misura per rotte occidentali.",
      "pt": "Atividade sob medida nas rotas ocidentais.",
      "ja": "西ガラパゴスクルーズ航路で追加可能な特別ツアー。",
      "zh": "加拉帕戈斯西侧海域探险航线可申请定制的珍贵生态科考行程。"
    }
  },
  {
    "id": "ge-prince-philips-steps",
    "name": {
      "es": "El Barranco (Prince Philip's Steps): Colonia Masiva de Piqueros Patas Rojas y Petreles",
      "en": "Prince Philip's Steps (El Barranco): Red-Footed Booby Metropolis & Storm Petrels",
      "fr": "Les Marches du Prince Philip (El Barranco) à Genovesa: Sanctuaire d'Oiseaux",
      "de": "Prince Philip's Steps (El Barranco) Rotfußtölpel & Sturmschwalben Kolonie",
      "it": "I Gradini del Principe Filippo (El Barranco): Metropoli delle Sule Zamperosse",
      "pt": "Degraus do Príncipe Philip (El Barranco): Colônia de Atobás-de-Patas-Vermelhas",
      "ja": "ヘノベサ島 エル・バランコ（フィリップ王子の階段）：20万羽のアカアシカツオドリとウミツバメの楽園",
      "zh": "热诺韦萨岛（鸟岛）菲利普亲王阶梯：20万只红脚鲣鸟与海燕超级大都会"
    },
    "shortDescription": {
      "es": "Conocida como la Isla de las Aves: sube la escalera de roca esculpida en el acantilado y entra a la colonia de piqueros de patas rojas más grande del planeta.",
      "en": "The definitive \"Bird Island\": scale a stone cliffside stairway into the largest nesting sanctuary of red-footed boobies and Galapagos storm petrels on Earth.",
      "fr": "L'île aux oiseaux par excellence : montez les marches dans la falaise et découvrez des milliers d'oiseaux marins.",
      "de": "Die legendäre Vogelinsel: Erklimmen Sie die Felsstufen zur weltgrößten Rotfußtölpel-Brutkolonie.",
      "it": "L'isola degli uccelli: sali la scalinata nella falesia per entrare nella colonia di sule più grande al mondo.",
      "pt": "A ilha dos pássaros: suba os degraus de pedra até a maior colônia de atobás-de-patas-vermelhas.",
      "ja": "「鳥の島」と称される北東の孤島。崖に刻まれた石段を登ると、視界を埋め尽くすアカアシカツオドリやウミツバメ、それを狙うコミミズクが待つ野鳥の王国。",
      "zh": "举世闻名的“鸟类之岛”：沿悬崖绝壁石阶攀登而上，步入全球规模最壮观的红脚鲣鸟群落与在熔岩缝隙穿梭的加拉帕戈斯短耳鸮狩猎场。"
    },
    "description": {
      "es": "Isla Genovesa es la caldera inundada de un volcán escudo colapsado al noreste del archipiélago. Tras desembarcar en los acantilados, se asciende por Prince Philip's Steps (25 metros de escalinata de roca). Arriba, un bosque enano de Palo Santo alberga más de 200,000 piqueros de patas rojas en dos morfologías de color (marrones y blancos). Al cruzar al campo de lava abierto, cientos de miles de petreles de tormenta vuelan rasantes mientras el búho campestre de Galápagos los caza a plena luz del día.",
      "en": "Genovesa Island is a water-filled crescent caldera in the remote northeastern corner of the archipelago. Ascend Prince Philip’s Steps cut into vertical basalt bluffs. The stunted Palo Santo plateau shelters an estimated 200,000 red-footed boobies in both brown and rare white morphs. Further inland over cracked lava beds, colossal swarms of Wedge-rumped Storm Petrels flutter while diurnal Galapagos Short-eared Owls stalk them.",
      "fr": "Caldeira volcanique inondée au nord-est abritant plus de 200 000 fous à pattes rouges et hiboux diurnes.",
      "de": "Eingestürzte Vulkankaldera mit über 200.000 Rotfußtölpeln und tagaktiven Sumpfohreulen.",
      "it": "Caldera sommersa remota che accoglie 200.000 sule zamperosse e gufi cacciatori diurni.",
      "pt": "Caldeira vulcânica remota com mais de 200.000 atobás-de-patas-vermelhas e corujas caçadoras.",
      "ja": "諸島北東部に浮かぶカルデラ島。樹上営巣するアカアシカツオドリ（白色型・褐色型）が20万羽以上。溶岩の割れ目ではコミミズクがウミツバメを待ち伏せする奇跡の食物連鎖を目撃。",
      "zh": "位于群岛极东北的沉没盾状火山海湾。攀登菲利普亲王阶梯后，眼前是栖息超20万只红脚鲣鸟的圣树灌木丛，开阔熔岩平原上更有罕见的昼行短耳鸮埋伏捕食暴风海燕的自然生死实况。"
    },
    "island": "genovesa",
    "islandName": {
      "es": "Genovesa",
      "en": "Genovesa Island",
      "fr": "Île Genovesa",
      "de": "Insel Genovesa",
      "it": "Isola Genovesa",
      "pt": "Ilha Genovesa",
      "ja": "ヘノベサ島（鳥の島）",
      "zh": "热诺韦萨岛 (鸟岛)"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Concentración masiva de aves durante todo el año; entre mayo y noviembre la actividad de cortejo y caza es incesante.",
      "en": "Breathtaking bird densities year-round; courtship dances and owl hunts peak in activity May to November.",
      "fr": "Concentration d'oiseaux exceptionnelle toute l'année.",
      "de": "Ganzjährig atemberaubende Vogeldichte; Jagdszenen der Eulen das ganze Jahr über.",
      "it": "Densità di uccelli impressionante tutto l'anno.",
      "pt": "Densidade de aves espetacular o ano todo.",
      "ja": "通年圧倒的な野鳥の密度。5月〜11月は求愛とフクロウの狩りが毎日繰り広げられます。",
      "zh": "全年生灵云集；5月至11月鸟群繁殖活跃度达到顶峰，猎鸮捕食场面惊心动魄。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Escalinata de roca y terreno agrietado)",
      "en": "Moderate (Rock steps and fissured lava)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（岩場の階段と割れ目の多い溶岩原）",
      "zh": "中等（陡峭石阶与多裂隙火山岩地）"
    },
    "duration": {
      "es": "Día Completo (Yate de expedición de largo alcance)",
      "en": "Full Day (Long-range expedition yacht)",
      "fr": "Journée complète (Yacht d'expédition)",
      "de": "Ganztags (Expeditionsyacht)",
      "it": "Giornata intera (Yacht spedizione)",
      "pt": "Dia inteiro (Iate de expedição)",
      "ja": "終日（遠洋航海型ヨットツアー）",
      "zh": "全天（远航探险游艇专属巡航）"
    },
    "imageUrl": "/images/tours/16-9/piquero-galapagos-slider-4k.webp",
    "keyWildlife": [
      {
        "es": "Piquero de Patas Rojas (Sula sula)",
        "en": "Red-footed Booby",
        "fr": "Fou à pattes rouges",
        "de": "Rotfußtölpel",
        "it": "Sula dai piedi rossi",
        "pt": "Atobá-de-patas-vermelhas",
        "ja": "アカアシカツオドリ",
        "zh": "红脚鲣鸟"
      },
      {
        "es": "Lechuza Campestre de Galápagos (Asio flammeus galapagoensis)",
        "en": "Galapagos Short-eared Owl",
        "fr": "Hibou des marais des Galápagos",
        "de": "Galapagos-Sumpfohreule",
        "it": "Gufo di palude delle Galapagos",
        "pt": "Coruja-de-galápagos",
        "ja": "コミミズク（白昼に海ツバメを狩るフクロウ）",
        "zh": "加拉帕戈斯短耳鸮"
      },
      {
        "es": "Petrel de Tormenta de Galápagos",
        "en": "Wedge-rumped Storm Petrel",
        "fr": "Océanite de Castro",
        "de": "Galapagos-Wellenläufer",
        "it": "Uccello delle tempeste",
        "pt": "Alma-de-mestre-de-galápagos",
        "ja": "コシジロウミツバメ",
        "zh": "楔尾海燕"
      }
    ],
    "highlights": [
      {
        "es": "Observar búhos cazando petreles a plena luz del día entre grietas volcánicas",
        "en": "Watching wild owls hunting petrels in broad daylight over jagged lava fields",
        "fr": "Observer des hiboux chassant en plein jour",
        "de": "Eulen bei der Jagd am helllichten Tag beobachten",
        "it": "Osservare gufi che cacciano in pieno giorno",
        "pt": "Ver corujas caçando em plena luz do dia",
        "ja": "白昼堂々、溶岩の割れ目から飛び出して海鳥を狙うフクロウの生態に肉薄",
        "zh": "在艳阳高照的正午亲眼见证野外短耳鸮在熔岩裂隙中突袭捕猎海燕的罕见生态奇观"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional VIP. Paraíso absoluto de ornitólogos y fotógrafos.",
      "en": "VIP Expedition Add-On. Ultimate mecca for birders and wildlife photographers.",
      "fr": "Activité VIP exclusive pour photographes.",
      "de": "VIP-Expedition für Vogel- und Fotofreunde.",
      "it": "Spedizione VIP per ornitologi e fotografi.",
      "pt": "Atividade VIP para observadores de aves.",
      "ja": "【世界中の野鳥家が憧れる聖地】専門探検ヨット手配による最高峰VIPオプション。",
      "zh": "【全球鸟类学专家与国家地理摄影师的朝圣殿堂】高奢探险游艇专属定制行程。"
    }
  },
  {
    "id": "fe-punta-espinosa",
    "name": {
      "es": "Punta Espinosa: La Mayor Colonia de Iguanas Marinas y Cormoranes del Planeta",
      "en": "Punta Espinosa: World's Largest Marine Iguana Metropolis & Flightless Cormorant",
      "fr": "Punta Espinosa à Fernandina: La Plus Grande Colonie d'Iguanes Marins au Monde",
      "de": "Punta Espinosa: Die weltweit größte Meerechsen-Kolonie & Flugunfähige Kormorane",
      "it": "Punta Espinosa a Fernandina: La Più Grande Colonia di Iguane Marine al Mondo",
      "pt": "Punta Espinosa: A Maior Colônia de Iguanas Marinhas do Planeta",
      "ja": "フェルナンディナ島 プンタ・エスピノサ：世界最大のウミイグアナ大集落＆飛べない鵜",
      "zh": "费尔南迪纳岛埃斯皮诺萨角：全球最大海鬣蜥族群与弱翅鸬鹚筑巢王国"
    },
    "shortDescription": {
      "es": "La isla volcánica más virgen del archipiélago: camina entre miles de iguanas marinas apiladas sobre lava negra y observa cormoranes de alas atrofiadas.",
      "en": "The most pristine and volcanically active island in the Pacific: walk among thousands of marine iguanas carpeted over jet-black lava beside flightless cormorants drying their stunted wings.",
      "fr": "L'île la plus vierge de l'archipel : marchez au milieu de milliers d'iguanes marins empilés sur la lave.",
      "de": "Die unberührteste Insel der Galapagos: Tausende Meerechsen auf schwarzer Lava und flugunfähige Kormorane.",
      "it": "L'isola più incontaminata: cammina tra migliaia di iguane marine sui campi di lava nera.",
      "pt": "A ilha mais intocada: caminhe entre milhares de iguanas marinhas sobre lava negra.",
      "ja": "外来種が一切入っていない世界で最も純粋な火山島。何万匹ものウミイグアナが重なり合って日光浴し、退化した翼を広げるコバネウを間近に目撃。",
      "zh": "全太平洋地质最活跃、从未遭外来物种入侵的纯净伊甸园：踏足无垠黑熔岩，见证数万只海鬣蜥叠罗汉般晒太阳与弱翅鸬鹚晾晒残翅。"
    },
    "description": {
      "es": "Fernandina es la isla más joven y occidental de Galápagos. Punta Espinosa es una estrecha lengua de lava donde se congrega la mayor densidad de iguanas marinas del mundo (Amblyrhynchus cristatus cristatus), que se apiñan por millares para conservar calor. En la orilla marina, los cormoranes no voladores extienden sus pequeñas alas vestigiales al sol tras bucear por pulpos, y los pingüinos nadan entre canales de manglares rojos.",
      "en": "Fernandina is the youngest, most volcanically pristine island in the Galapagos hotspot. Punta Espinosa is a narrow lava spit hosting the highest marine iguana density anywhere on Earth, with thousands piled atop each other to conserve body heat. Along the tidal surf, flightless cormorants spread their short, featherless wing stubs after deep foraging dives for octopus.",
      "fr": "Presqu'île de lave pure où s'entassent des milliers d'iguanes marins, avec cormorans aptères et pingouins.",
      "de": "Jüngste Insel der Galapagos mit der dichtesten Meerechsen-Population der Erde und Galapagos-Kormoranen.",
      "it": "Punta di lava pura che ospita la più grande concentrazione di iguane marine del mondo.",
      "pt": "Península de lava que abriga a maior densidade de iguanas marinhas do planeta.",
      "ja": "諸島最西端に位置する最も若い火山島。黒い溶岩原を埋め尽くすウミイグアナの大群は圧巻。海中深く潜ってタコを捕らえるコバネウやガラパゴスノスリが頭上を旋回。",
      "zh": "加拉帕戈斯热点上最年轻、最具原始活力的火山孤岛。黑色熔岩延伸入海，成千上万只海鬣蜥层叠依偎汲取地热。退化失去飞行能力的弱翅鸬鹚在礁石上迎风晾翅，王者加拉帕戈斯鹰雄踞熔岩高处。"
    },
    "island": "fernandina",
    "islandName": {
      "es": "Fernandina",
      "en": "Fernandina Island",
      "fr": "Île Fernandina",
      "de": "Insel Fernandina",
      "it": "Isola Fernandina",
      "pt": "Ilha Fernandina",
      "ja": "フェルナンディナ島",
      "zh": "费尔南迪纳岛"
    },
    "category": "marine-wildlife",
    "categoryName": {
      "es": "Fauna Marina & Terrestre",
      "en": "Marine & Terrestrial Wildlife",
      "fr": "Faune Marine & Terrestre",
      "de": "Meeres- & Landfauna",
      "it": "Fauna Marina e Terrestre",
      "pt": "Fauna Marinha e Terrestre",
      "ja": "海洋・陸上野生生物",
      "zh": "野生动植物探秘"
    },
    "seasons": [
      "all-year"
    ],
    "bestMonths": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "seasonalityNotes": {
      "es": "Fauna masiva todo el año; de junio a noviembre la corriente de Cromwell trae abundancia extrema de algas y pulpos para las aves buceadoras.",
      "en": "Incredible wildlife density all year; June to November upwelling fuels massive sea urchin and algae growth for foraged diving.",
      "fr": "Faune foisonnante toute l'année, courants froids très riches de juin à novembre.",
      "de": "Ganzjährig fantastisch; Juni bis November bringt durch Auftriebsströmungen Rekordmengen an Nahrung.",
      "it": "Fauna straordinaria tutto l'anno, ricchissima di cibo tra giugno e novembre.",
      "pt": "Fauna abundante o ano todo com auge de nutrientes entre junho e novembro.",
      "ja": "通年圧倒的な生物量。6月〜11月はクロムウェル海流による冷湧昇で海藻が繁茂し、イグアナやウの海中摂食が最も活発になります。",
      "zh": "全年密集；6月至11月克伦威尔潜流上升带来极盛海藻与深海无脊椎动物，潜水捕食盛况空前。"
    },
    "includedInTourIds": [],
    "difficulty": "moderate",
    "difficultyName": {
      "es": "Moderado (Caminata sobre lajas de lava pahoehoe)",
      "en": "Moderate (Pahoehoe lava walking)",
      "fr": "Modéré",
      "de": "Moderat",
      "it": "Moderato",
      "pt": "Moderado",
      "ja": "中級（凹凸のある縄状溶岩原を歩行）",
      "zh": "中等（绳状玄武熔岩平原徒步）"
    },
    "duration": {
      "es": "Medio Día (Expedición en crucero)",
      "en": "Half Day (Cruise expedition)",
      "fr": "Demi-journée (Croisière)",
      "de": "Halber Tag (Kreuzfahrt)",
      "it": "Mezza Giornata (Crociera)",
      "pt": "Meio Dia (Cruzeiro)",
      "ja": "約4時間（クルーズ航行時）",
      "zh": "约4小时（探险邮轮巡航停靠）"
    },
    "imageUrl": "/images/tours/16-9/galapagos-iguanas-roca-volcanica-16-9.webp",
    "keyWildlife": [
      {
        "es": "Iguana Marina de Galápagos (Amblyrhynchus cristatus)",
        "en": "Galapagos Marine Iguana",
        "fr": "Iguane marin des Galápagos",
        "de": "Meerechse",
        "it": "Iguana marina delle Galapagos",
        "pt": "Iguana-marinha-de-galápagos",
        "ja": "ウミイグアナ（世界最大の個体群）",
        "zh": "加拉帕戈斯海鬣蜥（全球最大密度）"
      },
      {
        "es": "Cormorán No Volador (Nannopterum harrisi)",
        "en": "Flightless Cormorant",
        "fr": "Cormoran aptère",
        "de": "Galapagos-Kormoran",
        "it": "Cormorano attero",
        "pt": "Cormorão-não-voador",
        "ja": "コバネウ（固有種）",
        "zh": "弱翅鸬鹚（加拉帕戈斯特有）"
      },
      {
        "es": "Gavilán de Galápagos (Buteo galapagoensis)",
        "en": "Galapagos Hawk",
        "fr": "Buse des Galápagos",
        "de": "Galapagosbussard",
        "it": "Poiana delle Galapagos",
        "pt": "Gavião-de-galápagos",
        "ja": "ガラパゴスノスリ",
        "zh": "加拉帕戈斯鵟"
      }
    ],
    "highlights": [
      {
        "es": "Caminar sorteando miles de iguanas marinas que cubren por completo las lajas de lava negra",
        "en": "Walking through a living carpet of thousands of marine iguanas draped over black volcanic rocks",
        "fr": "Marcher à travers un véritable tapis vivant de milliers d'iguanes",
        "de": "Wanderung durch einen lebenden Teppich aus Tausenden Meerechsen",
        "it": "Camminare tra migliaia di iguane marine distese sulla lava",
        "pt": "Caminhar entre um tapete vivo de milhares de iguanas marinhas",
        "ja": "足の踏み場もないほど折り重なる何千匹ものウミイグアナの群れの間を歩く衝撃体験",
        "zh": "穿行于数万只密密麻麻紧紧依偎在黑熔岩之上的海鬣蜥天然生物织锦之间"
      }
    ],
    "isNavigableDayTour": true,
    "pricingNote": {
      "es": "Actividad Adicional de Expedición en crucero por las islas occidentales.",
      "en": "Expedition Cruise Add-On along the western Galapagos archipelago.",
      "fr": "Activité exclusive en croisière expédition ouest.",
      "de": "Expeditionserlebnis auf westlichen Kreuzfahrtrouten.",
      "it": "Esperienza esclusiva per crociere nell'ovest.",
      "pt": "Atividade de expedição no oeste do arquipélago.",
      "ja": "西ガラパゴス探検クルーズでのみ体験可能な究極の秘境ツアー。",
      "zh": "加拉帕戈斯西部专属探险航线可申请定制的顶级秘境科考行程。"
    }
  }
];
