/**
 * 🗺️ VERMILION ROUTES — DESTINATION PHOTO ENGINE & GALLERY MAPPER
 * 
 * Maps tours, blog posts, and site locations (Quito, Galapagos, Cotopaxi, Amazon, etc.)
 * to high-definition 16:9 (landscape) and 9:16 (vertical mobile) photography.
 * 
 * Supports a hybrid architecture:
 * 1. Curated local photography (public/images/tours/16-9 and 9-16)
 * 2. High-speed Google Photos Edge CDN with on-the-fly cropping/resizing (=w1920-h1080-c, =w1080-h1920-c)
 */

export type DestinationKey =
  | 'galapagos'
  | 'quito'
  | 'cotopaxi'
  | 'amazon'
  | 'quilotoa'
  | 'otavalo'
  | 'mindo'
  | 'banos'
  | 'cuenca';

export interface DestinationGalleryItem {
  id: string;
  destination: DestinationKey;
  title: Record<string, string>;
  caption?: Record<string, string>;
  url16x9: string;
  url9x16: string;
  thumb: string;
  original: string;
  isPortrait: boolean;
  category: 'wildlife' | 'landscape' | 'culture' | 'expedition';
  source: 'google-photos' | 'local';
}

export interface DestinationMeta {
  key: DestinationKey;
  name: Record<string, string>;
  tagline: Record<string, string>;
  description: Record<string, string>;
}

// 🏛️ DESTINATIONS METADATA (8 LANGUAGES)
export const DESTINATIONS_META: Record<DestinationKey, DestinationMeta> = {
  galapagos: {
    key: 'galapagos',
    name: {
      en: 'Galapagos Islands',
      es: 'Islas Galápagos',
      fr: 'Îles Galápagos',
      de: 'Galapagos-Inseln',
      it: 'Isole Galápagos',
      pt: 'Ilhas Galápagos',
      ja: 'ガラパゴス諸島',
      zh: '加拉帕戈斯群岛',
    },
    tagline: {
      en: 'Living Laboratory of Evolution & Marine Sanctuary',
      es: 'Laboratorio Vivo de la Evolución y Santuario Marino',
      fr: 'Laboratoire Vivant de l’Évolution et Sanctuaire Marin',
      de: 'Lebendiges Labor der Evolution & Meeresschutzgebiet',
      it: 'Laboratorio Vivente dell’Evoluzione e Santuario Marino',
      pt: 'Laboratório Vivo da Evolução e Santuário Marinho',
      ja: '進化の生きた実験室と海洋保護区',
      zh: '生命的演化实验室与世界海洋庇护所',
    },
    description: {
      en: 'UNESCO World Heritage Site with endemic giant tortoises, marine iguanas, blue-footed boobies, and pristine volcanic beaches.',
      es: 'Patrimonio Natural de la Humanidad con tortugas gigantes endémicas, iguanas marinas, piqueros de patas azules y playas vírgenes.',
      fr: 'Patrimoine mondial de l’UNESCO abritant tortues géantes, iguanes marins, fous à pieds bleus et plages volcaniques préservées.',
      de: 'UNESCO-Weltnaturerbe mit endemischen Riesenschildkröten, Meerechsen, Blaufußtölpeln und unberührten Vulkanstränden.',
      it: 'Patrimonio Mondiale UNESCO con tartarughe giganti, iguane marine, sule dalle zampe azzurre e spiagge vulcaniche incontaminate.',
      pt: 'Patrimônio Mundial da UNESCO com tartarugas gigantes endêmicas, iguanas marinhas, atobás-de-patas-azuis e praias intocadas.',
      ja: 'ユネスコ世界遺産。固有のゾウガメ、ウミイグアナ、アオアシカツオドリ、そして手つかずの火山性ビーチが息づく楽園。',
      zh: '联合国教科文组织世界遗产，栖息着独有的巨龟、海鬣蜥、蓝脚鲣鸟与壮阔的原生态火山海滩。',
    },
  },
  quito: {
    key: 'quito',
    name: {
      en: 'Quito Colonial & Middle of the World',
      es: 'Quito Colonial y Mitad del Mundo',
      fr: 'Quito Colonial et Milieu du Monde',
      de: 'Koloniales Quito & Äquatorlinie',
      it: 'Quito Coloniale e Metà del Mondo',
      pt: 'Quito Colonial e Metade do Mundo',
      ja: 'キト旧市街と赤道記念碑',
      zh: '基多殖民老城与赤道纪念中心',
    },
    tagline: {
      en: 'First UNESCO Cultural Heritage Site at 2,850m',
      es: 'Primer Patrimonio Cultural de la Humanidad a 2.850 msnm',
      fr: 'Premier Site Culturel de l’UNESCO à 2 850 m d’altitude',
      de: 'Erstes UNESCO-Weltkulturerbe auf 2.850 m Höhe',
      it: 'Primo Patrimonio Culturale dell’UNESCO a 2.850 m di altitudine',
      pt: 'Primeiro Patrimônio Cultural da Humanidade a 2.850m de altitude',
      ja: '標高2,850mに位置するユネスコ世界文化遺産第1号',
      zh: '海拔2850米的高原明珠，首批联合国教科文组织世界文化遗产',
    },
    description: {
      en: 'Magnificent golden baroque churches, cobbled squares, historic viewpoints, and the official Equator monument on latitude 0°0\'0".',
      es: 'Magníficas iglesias barrocas bañadas en pan de oro, plazas empedradas, miradores históricos y el monumento oficial en latitud 0°0\'0".',
      fr: 'Superbes églises baroques dorées, ruelles pavées, belvédères historiques et le monument officiel de la ligne équatoriale.',
      de: 'Prächtige Barockkirchen mit Blattgold, gepflasterte Plätze, historische Aussichtspunkte und das offizielle Äquatordenkmal.',
      it: 'Magnifiche chiese barocche ricoperte d’oro, piazze lastricate e il monumento ufficiale sulla latitudine 0°0\'0".',
      pt: 'Magníficas igrejas barrocas banhadas a ouro, praças históricas e o monumento oficial na latitude 0°0\'0".',
      ja: '金箔で装飾された壮麗なバロック教会、石畳の広場、そして緯度0度0分0秒の公式赤道モニュメント。',
      zh: '金碧辉煌的巴洛克金箔教堂、鹅卵石历史广场与坐落在赤道零度线上的官方纪念丰碑。',
    },
  },
  cotopaxi: {
    key: 'cotopaxi',
    name: {
      en: 'Cotopaxi Volcano & Andes Highlands',
      es: 'Volcán Cotopaxi y Páramos Andinos',
      fr: 'Volcan Cotopaxi et Hauts Plateaux Andins',
      de: 'Vulkan Cotopaxi & Andenhochland',
      it: 'Vulcano Cotopaxi e Altopiani Andini',
      pt: 'Vulcão Cotopaxi e Páramos Andinos',
      ja: 'コトパクシ火山とアンデス高地',
      zh: '科托帕希活火山与安第斯高原',
    },
    tagline: {
      en: 'One of the Highest Active Snow-Capped Volcanoes on Earth',
      es: 'Uno de los Volcanes Activos Nevados Más Altos del Mundo',
      fr: 'L’un des plus hauts volcans actifs enneigés du monde',
      de: 'Einer der höchsten aktiven schneebedeckten Vulkane der Erde',
      it: 'Uno dei vulcani attivi innevati più alti del pianeta',
      pt: 'Um dos vulcões ativos nevados mais altos do mundo',
      ja: '地球上で最も高い活火山の一つ、白銀の円錐峰',
      zh: '地球上最高的常年积雪活火山之一，巍峨纯净的安第斯雪冠',
    },
    description: {
      en: 'Perfect snow-capped cone at 5,897m, wild Andean horses, Limpiopungo lagoon, and sweeping paramo vistas.',
      es: 'Cono nevado perfecto a 5.897 msnm, caballos salvajes andinos, laguna de Limpiopungo y panorámicas de páramo infinito.',
      fr: 'Cône parfait enneigé à 5 897 m, chevaux sauvages des Andes, lagune de Limpiopungo et grands espaces.',
      de: 'Perfekter schneebedeckter Vulkankegel auf 5.897 m, wilde Andenpferde, Limpiopungo-Lagune und Weitblicke.',
      it: 'Cono innevato perfetto a 5.897 m, cavalli selvaggi andini, laguna di Limpiopungo e viste mozzafiato.',
      pt: 'Cone nevado perfeito a 5.897m de altitude, cavalos selvagens andinos e a impressionante lagoa de Limpiopungo.',
      ja: '標高5,897mの完璧な雪山円錐、野生のアンデス馬、美しいリンピオブンゴ湖。',
      zh: '海拔5897米的完美对称雪山锥体、安第斯野马群与如明镜般的林皮奥蓬戈高山潟湖。',
    },
  },
  amazon: {
    key: 'amazon',
    name: {
      en: 'Ecuadorian Amazon Rainforest',
      es: 'Amazonía Ecuatoriana (Cuyabeno & Yasuní)',
      fr: 'Forêt Amazonienne Équatorienne',
      de: 'Ecuadorianischer Amazonas-Regenwald',
      it: 'Foresta Amazzonica Ecuadoriana',
      pt: 'Floresta Amazônica Equatoriana',
      ja: 'エクアドル・アマゾン熱帯雨林',
      zh: '厄瓜多尔亚马逊热带原始雨林',
    },
    tagline: {
      en: 'The Planet’s Densest Biodiversity Biosphere',
      es: 'La Biosfera de Mayor Biodiversidad del Planeta',
      fr: 'La Réserve de Biosphère la Plus Riche de la Planète',
      de: 'Die artenreichste Biosphäre unseres Planeten',
      it: 'La Biosfera con la Più Ricca Biodiversità del Pianeta',
      pt: 'A Biosfera de Maior Biodiversidade do Planeta',
      ja: '地球上で最も生物多様性が密集する神秘の熱帯雨林',
      zh: '地球上物种密度与生物多样性最高的核心生物圈保护区',
    },
    description: {
      en: 'Canoe navigations along the Cuyabeno river, pink river dolphins, toucans, anacondas, and indigenous ancestral traditions.',
      es: 'Navegaciones en canoa por el río Cuyabeno, delfines rosados, tucanes, anacondas y sabiduría ancestral indígena.',
      fr: 'Navigations en pirogue sur la rivière Cuyabeno, dauphins roses, toucans et traditions indigènes millénaires.',
      de: 'Kanutouren auf dem Cuyabeno-Fluss, rosa Flussdelfine, Tukane, Anakondas und uraltes indigenes Wissen.',
      it: 'Navigazioni in canoa sul fiume Cuyabeno, delfini rosa, tucani e tradizioni ancestrali indigene.',
      pt: 'Navegações em canoa pelo rio Cuyabeno, botos-cor-de-rosa, tucanos e rica herança cultural indígena.',
      ja: 'クヤベノ川のカヌー下り、ピンクカワイルカ、オオハシ、そして先住民族に伝わる太古の叡智。',
      zh: '乘独木舟穿梭库亚贝诺雨林蜿蜒水道，探寻粉红淡水豚、巨嘴鸟与深厚的原住民传统智慧。',
    },
  },
  quilotoa: {
    key: 'quilotoa',
    name: {
      en: 'Quilotoa Crater Lagoon',
      es: 'Laguna del Cráter Quilotoa',
      fr: 'Lagune du Cratère du Quilotoa',
      de: 'Quilotoa Kraterlagune',
      it: 'Laguna del Cratere Quilotoa',
      pt: 'Lagoa da Cratera Quilotoa',
      ja: 'キロトア火山火口湖',
      zh: '基洛托阿火山口绿松石湖',
    },
    tagline: {
      en: 'Emerald-Green Volcanic Caldera in the High Andes',
      es: 'Caldera Volcánica Esmeralda en los Altos Andes',
      fr: 'Caldeira Volcanique Émeraude des Hautes Andes',
      de: 'Smaragdgrüne Vulkankaldera in den Hochanden',
      it: 'Caldera Vulcanica Smeraldo nelle Alte Ande',
      pt: 'Caldeira Vulcânica Esmeralda nos Altos Andes',
      ja: 'アンデス山脈の標高3,900mに輝くエメラルドグリーンの火口湖',
      zh: '矗立于高耸安第斯山脉间、波光如绿松石般的巨型火山口湖',
    },
    description: {
      en: 'Stunning 3km-wide emerald lake inside an extinct volcano crater with breathtaking rim trails.',
      es: 'Impresionante laguna color esmeralda de 3 km dentro del cráter de un volcán con senderos panorámicos.',
      fr: 'Spectaculaire lagune émeraude de 3 km au cœur d’un cratère volcanique avec sentiers de crête vertigineux.',
      de: 'Atemberaubende 3 km breite smaragdgrüne Lagune in einem Vulkankrater mit spektakulären Panoramawegen.',
      it: 'Stupenda laguna color smeraldo di 3 km situata all’interno di un cratere vulcanico con sentieri panoramici.',
      pt: 'Deslumbrante lagoa cor esmeralda com 3 km de diâmetro dentro de uma cratera vulcânica.',
      ja: '直径3kmに広がる神秘的なエメラルド色の湖面と、雄大な外輪山トレイル。',
      zh: '直径3公里的翡翠绿火山天池，四周环绕着气势磅礴的高原环形山绝壁步道。',
    },
  },
  otavalo: {
    key: 'otavalo',
    name: {
      en: 'Otavalo Indigenous Market & Imbabura',
      es: 'Mercado Indígena de Otavalo e Imbabura',
      fr: 'Marché Indigène d’Otavalo et Imbabura',
      de: 'Indigener Markt von Otavalo & Imbabura',
      it: 'Mercato Indigeno di Otavalo e Imbabura',
      pt: 'Mercado Indígena de Otavalo e Imbabura',
      ja: 'オタバロ先住民族市場とインバブラ',
      zh: '奥塔瓦洛原住民传统手工艺集市与印巴布拉',
    },
    tagline: {
      en: 'South America’s Most Renowned Textile Market',
      es: 'El Mercado Textil y Artesanal Más Famoso de Sudamérica',
      fr: 'Le Marché Artisanal le Plus Célèbre d’Amérique du Sud',
      de: 'Südamerikas berühmtester Kunsthandwerks- und Textilmarkt',
      it: 'Il Mercato Artigianale e Tessile Più Famoso del Sud America',
      pt: 'O Mercado Artesanal e Têxtil Mais Famoso da América do Sul',
      ja: '南米屈指の歴史と賑わいを誇る先住民族伝統織物市場',
      zh: '南美洲最具盛名、色彩斑斓的安第斯原住民纺织与手工艺集市',
    },
    description: {
      en: 'Centuries of weaving artistry, vibrant ponchos, alpaca blankets, Peguche waterfall, and sacred Imbabura views.',
      es: 'Siglos de maestría textil, ponchos multicolores, mantas de alpaca, la cascada sagrada de Peguche y el monte Imbabura.',
      fr: 'Des siècles de savoir-faire textile, ponchos colorés, couvertures en alpaga et la cascade sacrée de Peguche.',
      de: 'Jahrhundertealte Webkunst, farbenfrohe Ponchos, Alpakadecken, der heilige Peguche-Wasserfall und Imbabura-Blicke.',
      it: 'Secoli di maestria tessile, poncho variopinti, coperte di alpaca e la sacra cascata di Peguche.',
      pt: 'Séculos de tradição têxtil, ponchos coloridos, mantas de alpaca e a sagrada cascata de Peguche.',
      ja: '何世紀にもわたり受け継がれてきた機織りの伝統、鮮やかなポンチョ、アルパカ毛布、聖なるペグチェの滝。',
      zh: '世代传承的古老织造技艺、色彩绚烂的羊驼毛毯、佩古切神圣瀑布与印巴布拉圣山绝景。',
    },
  },
  mindo: {
    key: 'mindo',
    name: {
      en: 'Mindo Cloud Forest',
      es: 'Bosque Nublado de Mindo',
      fr: 'Forêt de Nuages de Mindo',
      de: 'Nebelwald von Mindo',
      it: 'Foresta Nebbiosa di Mindo',
      pt: 'Floresta Nublada de Mindo',
      ja: 'ミンド雲霧林',
      zh: '明多高山云雾森林',
    },
    tagline: {
      en: 'World Capital of Hummingbirds & Orchid Haven',
      es: 'Capital Mundial de los Colibríes y Refugio de Orquídeas',
      fr: 'Capitale Mondiale des Colibris et Paradis des Orchidées',
      de: 'Welthauptstadt der Kolibris & Orchideenparadies',
      it: 'Capitale Mondiale dei Colibrì e Paradiso delle Orchidee',
      pt: 'Capital Mundial dos Beija-Flores e Refúgio de Orquídeas',
      ja: 'ハチドリの世界的生息地と蘭の花々が咲き誇る霧の森',
      zh: '世界蜂鸟之都，云雾缭绕中的兰花庇护所与观鸟天堂',
    },
    description: {
      en: 'Over 500 bird species, pristine waterfalls, chocolate tastings, tarabita cable cars, and lush subtropical canopy.',
      es: 'Más de 500 especies de aves, cascadas cristalinas, catas de chocolate artesanal, tarabita panorámica y densa vegetación.',
      fr: 'Plus de 500 espèces d’oiseaux, cascades d’eau pure, dégustation de chocolat artisanal et canopée luxuriante.',
      de: 'Über 500 Vogelarten, kristallklare Wasserfälle, Verkostung handgeschöpfter Schokolade und üppige subtropische Vegetation.',
      it: 'Oltre 500 specie di uccelli, cascate incontaminate, degustazioni di cioccolato e tarabita sopra le chiome degli alberi.',
      pt: 'Mais de 500 espécies de aves, cachoeiras límpidas, degustações de chocolate artesanal e exuberante floresta subtropical.',
      ja: '500種以上の鳥類、清らかな滝群、職人手作りのチョコレート工房、空を渡るタラビタゴンドラ。',
      zh: '栖息超过500种野生鸟类、清澈流淌的高山瀑布群、手工巧克力品鉴与横跨森林树冠的缆车体验。',
    },
  },
  banos: {
    key: 'banos',
    name: {
      en: 'Baños de Agua Santa & Pailón del Diablo',
      es: 'Baños de Agua Santa y Pailón del Diablo',
      fr: 'Baños de Agua Santa et Pailón del Diablo',
      de: 'Baños de Agua Santa & Teufelskessel',
      it: 'Baños de Agua Santa e Pailón del Diablo',
      pt: 'Baños de Agua Santa e Pailón del Diablo',
      ja: 'バニョス・デ・アグア・サンタと悪魔の釜滝',
      zh: '圣水巴尼奥斯与魔鬼之锅大瀑布',
    },
    tagline: {
      en: 'Gateway to the Amazon & Cascades Route',
      es: 'Puerta de Entrada a la Amazonía y Ruta de las Cascadas',
      fr: 'Porte d’Entrée vers l’Amazonie et Route des Cascades',
      de: 'Tor zum Amazonas & Straße der Wasserfälle',
      it: 'Porta d’Accesso all’Amazzonia e Via delle Cascate',
      pt: 'Porta de Entrada da Amazônia e Rota das Cascatas',
      ja: 'アマゾンへの玄関口と壮大な名瀑ロード',
      zh: '通往亚马逊低地的雄关要隘与壮观的千瀑之路',
    },
    description: {
      en: 'Roaring waterfalls, Pailón del Diablo suspended bridges, thermal springs, and views of the active Tungurahua volcano.',
      es: 'Imponentes cascadas, puentes colgantes sobre el Pailón del Diablo, aguas termales y vistas al volcán Tungurahua.',
      fr: 'Chutes d’eau rugissantes, passerelles suspendues du Pailón del Diablo, sources thermales et vue sur le volcan Tungurahua.',
      de: 'Tosende Wasserfälle, Hängebrücken am Pailón del Diablo, heiße Thermalquellen und Tungurahua-Ausblicke.',
      it: 'Cascate ruggenti, ponti sospesi sul Pailón del Diablo, sorgenti termali e scorci sul vulcano Tungurahua.',
      pt: 'Cachoeiras estrondosas, pontes suspensas no Pailón del Diablo, termas vulcânicas e vista para o vulcão Tungurahua.',
      ja: '轟音を響かせる巨瀑「悪魔の釜」、断崖の吊り橋、天然温泉、そして活火山トゥングラワのパノラマ。',
      zh: '咆哮轰鸣的魔鬼之锅大瀑布、惊险刺激的铁索悬桥、天然火山温泉与通古拉瓦活火山的雄浑胜景。',
    },
  },
  cuenca: {
    key: 'cuenca',
    name: {
      en: 'Cuenca Colonial & Cajas National Park',
      es: 'Cuenca Colonial y Parque Nacional Cajas',
      fr: 'Cuenca Colonial et Parc National Cajas',
      de: 'Koloniales Cuenca & Cajas-Nationalpark',
      it: 'Cuenca Coloniale e Parco Nazionale Cajas',
      pt: 'Cuenca Colonial e Parque Nacional Cajas',
      ja: 'クエンカ旧市街とカハス国立公園',
      zh: '昆卡殖民古城与卡哈斯国家公园',
    },
    tagline: {
      en: 'Ecuador’s Cultural Gem & Glacial Highland Lakes',
      es: 'Joya Cultural del Ecuador y Lagunas Glaciares de Altura',
      fr: 'Joyau Culturel de l’Équateur et Lagunes Glaciaires d’Altitude',
      de: 'Kulturelles Juwel Ecuadors & Gletscherseen im Hochgebirge',
      it: 'Gemma Culturale dell’Ecuador e Lagune Glaciali d’Alta Quota',
      pt: 'Jóia Cultural do Equador e Lagoas Glaciares de Altitude',
      ja: 'エクアドルの文化的至宝と息をのむ氷河湖沼群',
      zh: '厄瓜多尔文化瑰宝之地与辽阔宁静的高山冰川湖泊群',
    },
    description: {
      en: 'Cobblestone streets, flower markets, Panama hat weaving workshops, and the pristine glacial paramo lakes of Cajas.',
      es: 'Calles empedradas, mercados de flores, talleres de sombreros de paja toquilla y lagunas glaciares de El Cajas.',
      fr: 'Rues pavées, marchés aux fleurs, ateliers de tissage de chapeaux Panama et lagunes glaciaires féeriques de Cajas.',
      de: 'Kopfsteinpflasterstraßen, Blumenmärkte, traditionelle Panamahut-Werkstätten und eiszeitliche Seen im Cajas-Park.',
      it: 'Vie acciottolate, mercati di fiori, botteghe artigiane di cappelli Panama e lagune glaciali di El Cajas.',
      pt: 'Ruas históricas de paralelepípedos, mercados de flores, oficinas de chapéus de palha toquilla e lagunas de El Cajas.',
      ja: '石畳の小径、花市場、パナマ帽（パハ・トキージャ）の伝統工房、そしてカハス国立公園の澄みきった氷河湖。',
      zh: '古雅的鹅卵石街道、繁华的花卉集市、托基亚草帽（巴拿马草帽）非遗工坊与卡哈斯高山冰川湖泊。',
    },
  },
};

// 📦 CURATED LOCAL DESTINATION IMAGES (Always available fast)
const LOCAL_DESTINATION_PHOTOS: DestinationGalleryItem[] = [
  // Galapagos Local
  {
    id: 'local_gala_1',
    destination: 'galapagos',
    title: { en: 'Giant Tortoise in Santa Cruz Highlands', es: 'Tortuga Gigante en las Tierras Altas de Santa Cruz' },
    url16x9: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
    url9x16: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
    original: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
    isPortrait: false,
    category: 'wildlife',
    source: 'local',
  },
  {
    id: 'local_gala_2',
    destination: 'galapagos',
    title: { en: 'Blue-Footed Booby Courting Dance', es: 'Danza de Cortejo del Piquero de Patas Azules' },
    url16x9: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.webp',
    original: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.webp',
    isPortrait: false,
    category: 'wildlife',
    source: 'local',
  },
  {
    id: 'local_gala_3',
    destination: 'galapagos',
    title: { en: 'Playful Sea Lions at San Cristóbal Beach', es: 'Lobos Marinos en las Playas de San Cristóbal' },
    url16x9: '/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-loberia-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
    original: '/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
    isPortrait: false,
    category: 'wildlife',
    source: 'local',
  },
  {
    id: 'local_gala_4',
    destination: 'galapagos',
    title: { en: 'Tortuga Bay White Sand Beach', es: 'Playa de Arena Blanca en Tortuga Bay' },
    url16x9: '/images/tours/16-9/galapagos-tortuga-bay-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-tortuga-bay-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-tortuga-bay-16-9.webp',
    original: '/images/tours/16-9/galapagos-tortuga-bay-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  {
    id: 'local_gala_5',
    destination: 'galapagos',
    title: { en: 'Las Grietas Natural Emerald Lava Chasm', es: 'Cañón Natural de Lava en Las Grietas' },
    url16x9: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-las-grietas-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
    original: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
    isPortrait: false,
    category: 'expedition',
    source: 'local',
  },
  {
    id: 'local_gala_6',
    destination: 'galapagos',
    title: { en: 'Marine Iguanas Basking on Black Basalt', es: 'Iguanas Marinas sobre Basalto Volcánico' },
    url16x9: '/images/tours/16-9/galapagos-tintoreras16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-tintoreras-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-tintoreras16-9.webp',
    original: '/images/tours/16-9/galapagos-tintoreras16-9.webp',
    isPortrait: false,
    category: 'wildlife',
    source: 'local',
  },
  {
    id: 'local_gala_7',
    destination: 'galapagos',
    title: {
      en: 'Isabela Island Volcanic Coastlines',
      es: 'Costas Volcánicas de la Isla Isabela',
      fr: 'Côtes Volcaniques de l’Île Isabela',
      de: 'Vulkanische Küsten der Insel Isabela',
      it: 'Coste Vulcaniche dell’Isola Isabela',
      pt: 'Costas Vulcânicas da Ilha Isabela',
      ja: 'イサベラ島の火山海岸景観',
      zh: '伊莎贝拉岛原始火山海岸线',
    },
    url16x9: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-flamingos-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
    original: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  {
    id: 'local_gala_8',
    destination: 'galapagos',
    title: {
      en: 'Marine Snorkeling & Sea Turtles',
      es: 'Snorkel con Tortugas Marinas y Peces Tropicales',
      fr: 'Plongée avec Tortues Marines et Poissons Tropicaux',
      de: 'Schnorcheln mit Meeresschildkröten & Tropenfischen',
      it: 'Snorkeling con Tartarughe Marine e Pesci Tropicali',
      pt: 'Snorkel com Tartarugas Marinhas e Peixes Tropicais',
      ja: 'ウミガメと熱帯魚とのシュノーケリング',
      zh: '加拉帕戈斯与海龟及热带鱼浮潜体验',
    },
    url16x9: '/images/tours/16-9/galapagos-snorkeling-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-snorkeling-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-snorkeling-16-9.webp',
    original: '/images/tours/16-9/galapagos-snorkeling-16-9.webp',
    isPortrait: false,
    category: 'expedition',
    source: 'local',
  },
  {
    id: 'local_gala_9',
    destination: 'galapagos',
    title: {
      en: 'Puerto Ayora Harbor & Academy Bay',
      es: 'Puerto Ayora y Bahía Academia al Atardecer',
      fr: 'Port de Puerto Ayora et Baie d’Académie',
      de: 'Hafen von Puerto Ayora & Academy Bay',
      it: 'Porto di Puerto Ayora e Baia di Academy',
      pt: 'Porto de Puerto Ayora e Baía Academia',
      ja: 'プエルトアヨラ港とアカデミー湾の夕景',
      zh: '阿约拉港与学院湾壮丽日落风光',
    },
    url16x9: '/images/tours/16-9/galapagos-puerto-ayora-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-puerto-ayora-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-puerto-ayora-16-9.webp',
    original: '/images/tours/16-9/galapagos-puerto-ayora-16-9.webp',
    isPortrait: false,
    category: 'culture',
    source: 'local',
  },
  {
    id: 'local_gala_10',
    destination: 'galapagos',
    title: {
      en: 'Baltra Island & Itabaca Marine Canal',
      es: 'Canal de Itabaca e Isla Baltra',
      fr: 'Canal d’Itabaca et Île de Baltra',
      de: 'Itabaca-Kanal & Insel Baltra',
      it: 'Canale di Itabaca e Isola di Baltra',
      pt: 'Canal de Itabaca e Ilha Baltra',
      ja: 'イタバカ運河とバルトラ島',
      zh: '伊塔巴卡运河与巴尔特拉海峡风光',
    },
    url16x9: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
    url9x16: '/images/tours/9-16/galapagos-focas-9-16.webp',
    thumb: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
    original: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  // Quito Local
  {
    id: 'local_quito_1',
    destination: 'quito',
    title: { en: 'San Francisco Historic Plaza & Basilica', es: 'Plaza de San Francisco y Basílica Histórica' },
    url16x9: '/images/tours/16-9/quito-colonial-16-9.webp',
    url9x16: '/images/tours/9-16/quito-centro-historico.webp',
    thumb: '/images/tours/16-9/quito-colonial-16-9.webp',
    original: '/images/tours/16-9/quito-colonial-16-9.webp',
    isPortrait: false,
    category: 'culture',
    source: 'local',
  },
  {
    id: 'local_quito_2',
    destination: 'quito',
    title: { en: 'Middle of the World Equator Monument', es: 'Monumento a la Mitad del Mundo en la Línea Equinoccial' },
    url16x9: '/images/tours/16-9/mitad-del-mundo-16-9.webp',
    url9x16: '/images/tours/9-16/mitad-del-mundo-9-16.webp',
    thumb: '/images/tours/16-9/mitad-del-mundo-16-9.webp',
    original: '/images/tours/16-9/mitad-del-mundo-16-9.webp',
    isPortrait: false,
    category: 'culture',
    source: 'local',
  },
  {
    id: 'local_quito_3',
    destination: 'quito',
    title: { en: 'Baroque Architecture of San Francisco Church', es: 'Arquitectura Barroca del Convento de San Francisco' },
    url16x9: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
    url9x16: '/images/tours/9-16/quito-centro-historico.webp',
    thumb: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
    original: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
    isPortrait: false,
    category: 'culture',
    source: 'local',
  },
  // Cotopaxi Local
  {
    id: 'local_coto_1',
    destination: 'cotopaxi',
    title: { en: 'Cotopaxi Snow-Capped Volcano with Limpiopungo', es: 'Volcán Cotopaxi Nevado con Laguna de Limpiopungo' },
    url16x9: '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
    url9x16: '/images/tours/9-16/cotopaxi-9-16.webp',
    thumb: '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
    original: '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  {
    id: 'local_coto_2',
    destination: 'cotopaxi',
    title: { en: 'Andean Paramo Sunrise at Cotopaxi', es: 'Amanecer en el Páramo Andino de Cotopaxi' },
    url16x9: '/images/tours/16-9/cotopaxi-volcano-16-9.1.webp',
    url9x16: '/images/tours/9-16/cotopaxi-9-16.webp',
    thumb: '/images/tours/16-9/cotopaxi-volcano-16-9.1.webp',
    original: '/images/tours/16-9/cotopaxi-volcano-16-9.1.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  // Quilotoa Local
  {
    id: 'local_quilo_1',
    destination: 'quilotoa',
    title: { en: 'Quilotoa Emerald Crater Rim View', es: 'Vista Panorámica del Borde del Cráter Quilotoa' },
    url16x9: '/images/tours/16-9/laguna-quilotoa-16-9.webp',
    url9x16: '/images/tours/9-16/quilotoa-9-16.webp',
    thumb: '/images/tours/16-9/laguna-quilotoa-16-9.webp',
    original: '/images/tours/16-9/laguna-quilotoa-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  // Amazon Local
  {
    id: 'local_amaz_1',
    destination: 'amazon',
    title: { en: 'Canoe Expedition in Cuyabeno Reserve', es: 'Expedición en Canoa por la Reserva de Cuyabeno' },
    url16x9: '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
    url9x16: '/images/tours/9-16/amazon-waterfall-9-16.webp',
    thumb: '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
    original: '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
    isPortrait: false,
    category: 'expedition',
    source: 'local',
  },
  {
    id: 'local_amaz_2',
    destination: 'amazon',
    title: { en: 'Amazon River Canopy & Sunset', es: 'Puesta de Sol sobre el Río Amazonas' },
    url16x9: '/images/tours/16-9/amazon-river-16-9.webp',
    url9x16: '/images/tours/9-16/amazon-waterfull-9-16.webp',
    thumb: '/images/tours/16-9/amazon-river-16-9.webp',
    original: '/images/tours/16-9/amazon-river-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  // Otavalo Local
  {
    id: 'local_otav_1',
    destination: 'otavalo',
    title: { en: 'Otavalo Plaza de Ponchos Textile Art', es: 'Artesanías Textiles en la Plaza de Ponchos de Otavalo' },
    url16x9: '/images/tours/16-9/otavalo-market-16-9.webp',
    url9x16: '/images/tours/9-16/otavalo-market-9-16.webp',
    thumb: '/images/tours/16-9/otavalo-market-16-9.webp',
    original: '/images/tours/16-9/otavalo-market-16-9.webp',
    isPortrait: false,
    category: 'culture',
    source: 'local',
  },
  {
    id: 'local_otav_2',
    destination: 'otavalo',
    title: { en: 'Peguche Sacred Waterfall & Andes Trails', es: 'Cascada Sagrada de Peguche en Otavalo' },
    url16x9: '/images/tours/16-9/otavalo-peguche-16-9.webp',
    url9x16: '/images/tours/9-16/otavalo-peguche-9-16.webp',
    thumb: '/images/tours/16-9/otavalo-peguche-16-9.webp',
    original: '/images/tours/16-9/otavalo-peguche-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  // Mindo Local
  {
    id: 'local_mind_1',
    destination: 'mindo',
    title: { en: 'Mindo Cloud Forest Canopy & Waterfalls', es: 'Dosel del Bosque Nublado y Cascadas en Mindo' },
    url16x9: '/images/tours/16-9/mindo-16-9.webp',
    url9x16: '/images/tours/9-16/mindo-9-16.webp',
    thumb: '/images/tours/16-9/mindo-16-9.webp',
    original: '/images/tours/16-9/mindo-16-9.webp',
    isPortrait: false,
    category: 'landscape',
    source: 'local',
  },
  // Baños Local
  {
    id: 'local_bano_1',
    destination: 'banos',
    title: { en: 'Pailón del Diablo Waterfall Cascade', es: 'Cascada del Pailón del Diablo en Baños' },
    url16x9: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
    url9x16: '/images/tours/9-16/pailon-diablo-9-16.webp',
    thumb: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
    original: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
    isPortrait: false,
    category: 'expedition',
    source: 'local',
  },
  // Cuenca Local
  {
    id: 'local_cuen_1',
    destination: 'cuenca',
    title: { en: 'Cuenca Cathedral of the Immaculate Conception', es: 'Catedral de la Inmaculada Concepción en Cuenca' },
    url16x9: '/images/tours/16-9/cuenca-colonial-16-9.webp',
    url9x16: '/images/tours/9-16/cuenca-colonial-9-16.webp',
    thumb: '/images/tours/16-9/cuenca-colonial-16-9.webp',
    original: '/images/tours/16-9/cuenca-colonial-16-9.webp',
    isPortrait: false,
    category: 'culture',
    source: 'local',
  },
];

// All combined gallery database (strictly curated to max 10 local photos per destination)
const ALL_GALLERY_PHOTOS: DestinationGalleryItem[] = [
  ...LOCAL_DESTINATION_PHOTOS,
];

/**
 * Get photos for a specific destination (strictly capped at 10 curated photos)
 */
export function getPhotosByDestination(
  destKey: DestinationKey,
  options?: {
    orientation?: 'all' | 'landscape' | 'portrait';
    category?: 'all' | 'wildlife' | 'landscape' | 'culture' | 'expedition';
    limit?: number;
  }
): DestinationGalleryItem[] {
  let list = ALL_GALLERY_PHOTOS.filter((p) => p.destination === destKey);

  if (options?.orientation && options.orientation !== 'all') {
    if (options.orientation === 'portrait') {
      list = list.filter((p) => p.isPortrait);
    } else if (options.orientation === 'landscape') {
      list = list.filter((p) => !p.isPortrait);
    }
  }

  if (options?.category && options.category !== 'all') {
    list = list.filter((p) => p.category === options.category);
  }

  const effectiveLimit = options?.limit && options.limit > 0 ? Math.min(options.limit, 10) : 10;
  return list.slice(0, effectiveLimit);
}

/**
 * Map any tour ID or destination string to its corresponding gallery photos
 */
export function getTourDestinationPhotos(tourIdOrDestination: string): DestinationGalleryItem[] {
  const norm = (tourIdOrDestination || '').toLowerCase();

  let destination: DestinationKey = 'galapagos';

  if (norm.includes('galapagos') || norm.includes('1.1') || norm.includes('1.2') || norm.includes('1.3') || norm.includes('3.1') || norm.includes('3.2')) {
    destination = 'galapagos';
  } else if (norm.includes('quito') || norm.includes('middle') || norm.includes('mitad') || norm.includes('4.1')) {
    destination = 'quito';
  } else if (norm.includes('otavalo') || norm.includes('4.2')) {
    destination = 'otavalo';
  } else if (norm.includes('coto') || norm.includes('antisana') || norm.includes('papallacta') || norm.includes('volcano') || norm.includes('snow') || norm.includes('2.1') || norm.includes('2.3') || norm.includes('4.5') || norm.includes('4.6')) {
    destination = 'cotopaxi';
  } else if (norm.includes('quilo') || norm.includes('4.7')) {
    destination = 'quilotoa';
  } else if (norm.includes('mindo') || norm.includes('cloud') || norm.includes('4.4')) {
    destination = 'mindo';
  } else if (norm.includes('amazon') || norm.includes('cuyabeno') || norm.includes('yasuni') || norm.includes('2.2') || norm.includes('2.4')) {
    destination = 'amazon';
  } else if (norm.includes('cuenca') || norm.includes('cajas')) {
    destination = 'cuenca';
  } else if (norm.includes('baños') || norm.includes('banos') || norm.includes('pailon') || norm.includes('puyo')) {
    destination = 'banos';
  }

  return getPhotosByDestination(destination);
}

/**
 * Get destination metadata
 */
export function getDestinationMetadata(key: DestinationKey): DestinationMeta {
  return DESTINATIONS_META[key] || DESTINATIONS_META.galapagos;
}

/**
 * Total photo stats by destination
 */
export function getDestinationStats(): Record<DestinationKey, { total: number; landscape: number; portrait: number }> {
  const keys: DestinationKey[] = ['galapagos', 'quito', 'cotopaxi', 'amazon', 'quilotoa', 'otavalo', 'mindo', 'banos', 'cuenca'];
  const stats: any = {};

  for (const k of keys) {
    const photos = ALL_GALLERY_PHOTOS.filter((p) => p.destination === k);
    stats[k] = {
      total: photos.length,
      landscape: photos.filter((p) => !p.isPortrait).length,
      portrait: photos.filter((p) => p.isPortrait).length,
    };
  }

  return stats;
}
