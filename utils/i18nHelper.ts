export type LocalizedString = any;

const DEFAULT_TRANSLATIONS: Record<string, Record<string, string>> = {
  "Unrivaled Expertise, Uncompromised Excellence": {
    es: "Experiencia Inigualable, Excelencia Inquebrantable",
    de: "Unerreichte Expertise, Kompromisslose Exzellenz",
    fr: "Une expertise inégalée, une excellence sans compromis",
    it: "Esperienza Ineguagliabile, Eccellenza Senza Compromessi",
    pt: "Experiência Inigualável, Excelência Inabalável",
    ja: "比類なき専門知識、妥協なき卓越性",
    zh: "无与伦比的专业经验，始终如一的卓越品质"
  },
  "OUR CREDENTIALS": {
    es: "NUESTRAS CREDENCIALES",
    de: "UNSERE REFERENZEN",
    fr: "NOS RÉFÉRENCES",
    it: "LE NOSTRE CREDENZIALI",
    pt: "NOSSAS CREDENCIAIS",
    ja: "私たちの実績と信頼",
    zh: "我们的专业资质"
  },
  "At Vermilion Routes, we don't just book tours. We curate deeply personal, once-in-a-lifetime expeditions across the spectacular landscapes of Ecuador and the Galapagos. As direct local operators, we combine local wisdom with uncompromising exclusivity.": {
    es: "En Vermilion Routes, no solo reservamos tours. Creamos expediciones únicas, inolvidables y totalmente personalizadas a través de los espectaculares paisajes de Ecuador y Galápagos. Como operadores locales directos, combinamos la experiencia regional con una excelencia inquebrantable.",
    de: "Bei Vermilion Routes buchen wir nicht einfach nur Touren. Wir kuratieren zutiefst persönliche Expeditionen durch die spektakulären Landschaften Ecuadors und der Galapagosinseln.",
    fr: "Chez Vermilion Routes, nous ne nous contentons pas de réserver des circuits. Nous concevons des expéditions profondément personnalisées à travers l'Équateur et les Galapagos.",
    it: "A Vermilion Routes non prenotiamo semplicemente tour. Curiamo spedizioni profondamente personali e indimenticabili attraverso i paesaggi spettacolari dell'Ecuador e delle Galapagos.",
    pt: "Na Vermilion Routes, não apenas reservamos passeios. Criamos expedições profundamente pessoais e inesquecíveis através das paisagens espetaculares do Equador e Galápagos.",
    ja: "Vermilion Routesでは、単にツアーを手配するだけではありません。エクアドルとガラパゴスの壮大な自然を舞台に、一生の思い出に残る完全オーダーメイドの旅を創造します。",
    zh: "在 Vermilion Routes，我们不仅是预订行程。我们在厄瓜多尔与加拉帕戈斯群岛的壮丽风光中，为您量身定制独一无二、终生难忘的探险之旅。"
  },
  "Whether you are navigating the volcanic channels of the Galapagos on a private yacht charter, staying in remote, eco-friendly Amazon rainforest canopy suites, or walking the cobblestone paths of Quito historic center, we handle every detail with absolute precision.": {
    es: "Ya sea navegando por los canales volcánicos de Galápagos en un chárter privado, alojándose en suites ecológicas en la selva amazónica, o caminando por las calles adoquinadas del centro histórico de Quito, gestionamos cada detalle con absoluta precisión.",
    de: "Ob Sie die Vulkankanäle der Galapagosinseln auf einer privaten Yacht befahren oder durch Quitos Altstadt spazieren – wir kümmern uns um jedes Detail mit absoluter Präzision.",
    fr: "Que vous naviguiez dans les canaux volcaniques des Galapagos sur un yacht privé ou que vous parcouriez les ruelles pavées de Quito, nous gérons chaque détail avec une précision absolue.",
    it: "Sia che navighiate tra i canali vulcanici delle Galapagos su uno yacht privato o passeggiate per Quito, gestiamo ogni dettaglio con assoluta precisione.",
    pt: "Seja navegando pelos canais vulcânicos de Galápagos em um iate fretado privado ou passeando por Quito, cuidamos de cada detalhe com precisão absoluta.",
    ja: "プライベートヨットでのガラパゴス諸島クルーズ、アマゾン熱帯雨林のエコロッジ滞在、キト歴史地区の散策まで、すべての詳細を完璧にプランニングします。",
    zh: "无论是乘坐私人游艇畅游加拉帕戈斯火山水域，入住亚马逊生态奢华树冠套房，还是漫步基多历史古城，我们都以极致的精准照料每一个细节。"
  },
  "Bespoke & Tailor-Made": {
    es: "A Medida y Personalizado",
    de: "Maßgeschneidert & Individuell",
    fr: "Sur mesure et personnalisé",
    it: "Su Misura e Personalizzato",
    pt: "Sob Medida e Personalizado",
    ja: "100% オーダーメイド",
    zh: "100% 量身定制"
  },
  "Field Travel Expertise": {
    es: "Años de Experiencia en Campo",
    de: "Langjährige Felderfahrung",
    fr: "Années d'expérience sur le terrain",
    it: "Anni di Esperienza sul Campo",
    pt: "Anos de Experiência em Campo",
    ja: "長年の専門知識",
    zh: "15+ 年专业路线经验"
  },
  "Guest Satisfaction": {
    es: "Satisfacción de Huéspedes",
    de: "Gästezufriedenheit",
    fr: "Satisfaction des clients",
    it: "Soddisfazione degli Ospiti",
    pt: "Satisfação dos Hóspedes",
    ja: "五つ星の満足度",
    zh: "99% 客户满意度"
  },
  "5-Star Satisfaction": {
    es: "Satisfacción 5 Estrellas",
    de: "5-Sterne-Zufriedenheit",
    fr: "Satisfaction 5 Étoiles",
    it: "Soddisfazione a 5 Stelle",
    pt: "Satisfação 5 Estrelas",
    ja: "五つ星の満足度",
    zh: "99% 五星满意度"
  },
  "On-Trip Concierge Care": {
    es: "Atención de Concierge 24/7",
    de: "24/7 Concierge-Betreuung",
    fr: "Conciergerie dédiée 24h/24",
    it: "Assistenza Concierge 24/7",
    pt: "Atendimento Concierge 24/7",
    ja: "24/7 コンシェルジュケア",
    zh: "24/7 专属礼宾关怀"
  },
  "Bespoke Journeys Care": {
    es: "Atención Concierge 24/7",
    de: "24/7 Concierge-Betreuung",
    fr: "Conciergerie dédiée 24h/24",
    it: "Assistenza Concierge 24/7",
    pt: "Atendimento Concierge 24/7",
    ja: "24/7 コンシェルジュケア",
    zh: "24/7 专属礼宾关怀"
  },
  "Tailor-Made Curated Expeditions": {
    es: "Expediciones Curadas a Medida",
    de: "Maßgeschneiderte Expeditionen",
    fr: "Expéditions personnalisées",
    it: "Spedizioni Curate su Misura",
    pt: "Expedições Curadas sob Medida",
    ja: "厳選されたオーダーメイド探検",
    zh: "精心策划的定制探险"
  },
  "Crafted for Extraordinary Travel": {
    es: "Diseñadas para Viajes Extraordinarios",
    de: "Geschaffen für außergewöhnliche Reisen",
    fr: "Conçues pour des voyages extraordinaires",
    it: "Create per Viaggi Straordinari",
    pt: "Criadas para Viagens Extraordinárias",
    ja: "特別な旅のために創造",
    zh: "为非凡旅程量身打造"
  },
  "Cruise the enchanted Galapagos Islands, trek the volcanic spine of the high Andes, explore the deep Amazon rainforest, and experience the magical equator line.": {
    es: "Navega por las encantadas Islas Galápagos, recorre la espina dorsal de los altos Andes, explora la profunda selva amazónica y vive la mágica línea ecuatorial.",
    de: "Kreuzen Sie durch die Galapagosinseln, wandern Sie durch die Anden und erkunden Sie den tiefen Amazonas-Regenwald.",
    fr: "Naviguez dans les îles enchantées des Galapagos, parcourez les Andes et explorez la forêt amazonienne.",
    it: "Navigate tra le isole incantate delle Galapagos, percorrete le Ande ed esplorate la foresta amazzonica.",
    pt: "Navegue pelas ilhas encantadas de Galápagos, percorra os Andes e explore a profunda floresta amazônica.",
    ja: "魅惑のガラパゴス諸島クルーズ、アンデス山脈の火山トレッキング、深いアマゾン熱帯雨林探検、そして赤道直下の神秘を体験。",
    zh: "巡航加拉帕戈斯群岛的魔幻海域，徒步安第斯火山山脉，探索亚马逊深处雨林，亲身体验神奇的赤道奇观。"
  },
  "Galapagos": {
    es: "Galápagos",
    de: "Galapagos",
    fr: "Galapagos",
    it: "Galapagos",
    pt: "Galápagos",
    ja: "ガラパゴス",
    zh: "加拉帕戈斯"
  },
  "Inland Ecuador": {
    es: "Ecuador Continental",
    de: "Ecuador Festland",
    fr: "Équateur Continental",
    it: "Ecuador Continentale",
    pt: "Equador Continental",
    ja: "エクアドル本土",
    zh: "厄瓜多尔大陆"
  },
  "Mainland Ecuador": {
    es: "Ecuador Continental",
    de: "Ecuador Festland",
    fr: "Équateur Continental",
    it: "Ecuador Continentale",
    pt: "Equador Continental",
    ja: "エクアドル本土",
    zh: "厄瓜多尔大陆"
  },
  "Amazon": {
    es: "Amazonía",
    de: "Amazonas",
    fr: "Amazonie",
    it: "Amazzonia",
    pt: "Amazônia",
    ja: "アマゾン",
    zh: "亚马逊"
  },
  "Andes": {
    es: "Andes",
    de: "Anden",
    fr: "Andes",
    it: "Ande",
    pt: "Andes",
    ja: "アンデス",
    zh: "安第斯"
  },
  "Best Seller": {
    es: "Más Vendido",
    de: "Bestseller",
    fr: "Meilleure Vente",
    it: "Più Venduto",
    pt: "Mais Vendido",
    ja: "ベストセラー",
    zh: "畅销推荐"
  },
  "Certified Private Guide": {
    es: "Guía Privado Certificado",
    de: "Zertifizierter Privater Reiseleiter",
    fr: "Guide Privé Certifié",
    it: "Guida Privata Certificata",
    pt: "Guia Privado Certificado",
    ja: "認定プライベートガイド",
    zh: "认证专属向导"
  },
  "Travelers' Choice 2026 Winner": {
    es: "Ganador Travelers' Choice 2026",
    de: "Travelers' Choice Gewinner 2026",
    fr: "Gagnant Travelers' Choice 2026",
    it: "Vincitore Travelers' Choice 2026",
    pt: "Vencedor Travelers' Choice 2026",
    ja: "トラベラーズチョイス 2026 受賞",
    zh: "2026 旅行者之选得主"
  },
  "View All Tours": {
    es: "Ver Todos los Tours",
    de: "Alle Touren Anzeigen",
    fr: "Voir Tous les Circuits",
    it: "Visualizza Tutti i Tour",
    pt: "Ver Todos os Tours",
    ja: "すべてのツアーを見る",
    zh: "查看所有行程"
  },
  "Ver Todos los Tours": {
    en: "View All Tours",
    de: "Alle Touren Anzeigen",
    fr: "Voir Tous les Circuits",
    it: "Visualizza Tutti i Tour",
    pt: "Ver Todos os Tours",
    ja: "すべてのツアーを見る",
    zh: "查看所有行程"
  }
};

export function getLocalizedText(text: LocalizedString | undefined | null, locale: string): string {
  if (!text) return '';
  
  if (typeof text === 'string') {
    if (locale !== 'en' && DEFAULT_TRANSLATIONS[text]?.[locale]) {
      return DEFAULT_TRANSLATIONS[text][locale];
    }
    return text;
  }
  
  // Try to find the exact locale (e.g. 'es')
  if (text[locale]) return text[locale];
  
  // Fallbacks
  if (text['en']) {
    const enVal = text['en'];
    if (typeof enVal === 'string' && locale !== 'en' && DEFAULT_TRANSLATIONS[enVal]?.[locale]) {
      return DEFAULT_TRANSLATIONS[enVal][locale];
    }
    return enVal;
  }
  
  // First available key if no English
  const keys = Object.keys(text);
  if (keys.length > 0) return text[keys[0]];
  
  return '';
}
