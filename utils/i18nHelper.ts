export type LocalizedString = any;

const DEFAULT_TRANSLATIONS: Record<string, Record<string, string>> = {
  "Accommodation at the hotel of your choice in Santa Cruz": {
      "es": "Alojamiento en el hotel de su elección en Santa Cruz",
      "fr": "Hébergement à l'hôtel de votre choix à Santa Cruz",
      "de": "Unterkunft im Hotel Ihrer Wahl auf Santa Cruz",
      "it": "Sistemazione presso l'hotel di vostra scelta a Santa Cruz",
      "pt": "Hospedagem no hotel de sua escolha em Santa Cruz",
      "ja": "サンタクルス島の厳選ホテルでの宿泊",
      "zh": "圣克鲁斯岛自选精品酒店住宿"
  },
  "Buffet breakfast at 4-star hotels / Continental breakfast at 3-star hotels": {
      "es": "Desayuno buffet en hoteles 4 estrellas / Desayuno continental en hoteles 3 estrellas",
      "fr": "Petit-déjeuner buffet en hôtel 4 étoiles / continental en hôtel 3 étoiles",
      "de": "Frühstücksbuffet in 4-Sterne-Hotels / Kontinentales Frühstück in 3-Sterne-Hotels",
      "it": "Colazione a buffet in hotel 4 stelle / Continentale in hotel 3 stelle",
      "pt": "Café da manhã buffet em hotéis 4 estrelas / Continental em hotéis 3 estrelas",
      "ja": "4つ星ホテルのビュッフェ朝食 / 3つ星ホテルのコンチネンタル朝食",
      "zh": "4星级酒店自助早餐 / 3星级酒店欧式早餐"
  },
  "Lunches with a set menu": {
      "es": "Almuerzos con menú establecido",
      "fr": "Déjeuners avec menu préétabli",
      "de": "Mittagessen mit festem Menü",
      "it": "Pranzi con menu fisso",
      "pt": "Almoços com menu definido",
      "ja": "セットメニューの昼食",
      "zh": "指定套餐午餐"
  },
  "Plane Ticket (Quito/Guayaquil – Baltra – Quito/Guayaquil)": {
      "es": "Boleto aéreo (Quito/Guayaquil – Baltra – Quito/Guayaquil)",
      "fr": "Billet d'avion (Quito/Guayaquil – Baltra – Quito/Guayaquil)",
      "de": "Flugticket (Quito/Guayaquil – Baltra – Quito/Guayaquil)",
      "it": "Biglietto aereo (Quito/Guayaquil – Baltra – Quito/Guayaquil)",
      "pt": "Passagem aérea (Quito/Guayaquil – Baltra – Quito/Guayaquil)",
      "ja": "航空券（キト/グアヤキル – バルトラ – キト/グアヤキル）",
      "zh": "往返机票（基多/瓜亚基尔 – 巴尔特拉 – 基多/瓜亚基尔）"
  },
  "Visits to the islands according to the itinerary": {
      "es": "Visitas a las islas según el itinerario",
      "fr": "Visites des îles selon l'itinéraire",
      "de": "Inselbesuche gemäß Reiseroute",
      "it": "Visite alle isole secondo l'itinerario",
      "pt": "Visitas às ilhas de acordo com o itinerário",
      "ja": "旅程に応じた各島の観光・遠足",
      "zh": "按照行程安排游览各岛屿"
  },
  "Airport reception and departure assistance at Galápagos Airport": {
      "es": "Recepción en el aeropuerto y asistencia de salida en Galápagos",
      "fr": "Accueil à l'aéroport et assistance au départ aux Galápagos",
      "de": "Empfang am Flughafen und Abreisebetreuung auf Galápagos",
      "it": "Accoglienza all'aeroporto e assistenza alla partenza alle Galápagos",
      "pt": "Recepção no aeroporto e assistência de embarque em Galápagos",
      "ja": "ガラパゴス空港での到着出迎えおよび出発サポート",
      "zh": "加拉帕戈斯机场专属接机与送机协助"
  },
  "Land and sea transportation": {
      "es": "Transporte terrestre y marítimo",
      "fr": "Transport terrestre et maritime",
      "de": "Land- und Seetransport",
      "it": "Trasporto terrestre e marittimo",
      "pt": "Transporte terrestre e marítimo",
      "ja": "陸上および海上移動交通",
      "zh": "全程陆路与海上交通"
  },
  "Level III Naturalist Guides (Spanish / English)": {
      "es": "Guías naturalistas certificados Nivel III (Español / Inglés)",
      "fr": "Guides naturalistes de niveau III (Espagnol / Anglais)",
      "de": "Naturführer der Stufe III (Spanisch / Englisch)",
      "it": "Guide naturalistiche di Livello III (Spagnolo / Inglese)",
      "pt": "Guias naturalistas Nível III (Espanhol / Inglês)",
      "ja": "レベルIII認定ナチュラリストガイド（英語・スペイン語）",
      "zh": "三级专业自然向导（英语/西班牙语）"
  },
  "Snorkeling equipment for boat excursions (mask and snorkel)": {
      "es": "Equipo de snorkel para excursiones en barco (máscara y tubo)",
      "fr": "Équipement de snorkeling pour les excursions en bateau (masque et tuba)",
      "de": "Schnorchelausrüstung für Bootstouren (Maske und Schnorchel)",
      "it": "Attrezzatura da snorkeling per escursioni in barca (maschera e boccaglio)",
      "pt": "Equipamento de snorkel para excursões de barco (máscara e snorkel)",
      "ja": "ボートツアー用シュノーケリング装備（マスク＆スノーケル）",
      "zh": "游船出海浮潜装备（面镜和呼吸管）"
  },
  "Safety lockers available at hotel reception": {
      "es": "Cajas de seguridad disponibles en la recepción del hotel",
      "fr": "Coffres-forts disponibles à la réception de l'hôtel",
      "de": "Sicherheitsschließfächer an der Hotelrezeption verfügbar",
      "it": "Cassette di sicurezza disponibili alla reception dell'hotel",
      "pt": "Cofres de segurança disponíveis na recepção do hotel",
      "ja": "ホテルフロントのセーフティボックス利用可能",
      "zh": "酒店前台提供安全保险箱"
  },
  "Lobito Airport Shuttle Bus: Airport – Itabaca Channel – Airport": {
      "es": "Autobús Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto",
      "fr": "Navette Lobito : Aéroport – Canal d'Itabaca – Aéroport",
      "de": "Lobito Flughafen-Shuttlebus: Flughafen – Itabaca-Kanal – Flughafen",
      "it": "Bus navetta Lobito: Aeroporto – Canale di Itabaca – Aeroporto",
      "pt": "Ônibus shuttle Lobito: Aeroporto – Canal de Itabaca – Aeroporto",
      "ja": "ロビト空港シャトルバス：空港 – イタバカ運河 – 空港",
      "zh": "Lobito机场穿梭巴士：机场 – 伊塔巴卡运河 – 机场"
  },
  "Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors": {
      "es": "Tasa de muelle en Isabela: USD 5.00 nacionales; USD 10.00 extranjeros",
      "fr": "Taxe de quai à Isabela : 5,00 USD nationaux ; 10,00 USD étrangers",
      "de": "Isabela-Dockgebühr: USD 5,00 für Ecuadorianer; USD 10,00 für Ausländer",
      "it": "Tassa portuale di Isabela: 5,00 USD ecuadoriani; 10,00 USD stranieri",
      "pt": "Taxa de cais em Isabela: USD 5,00 nacionais; USD 10,00 estrangeiros",
      "ja": "イサベラ島入港税：エクアドル国籍 USD 5.00 / 外国人旅行者 USD 10.00",
      "zh": "伊莎贝拉岛码头税：厄瓜多尔公民 5 美元；外国游客 10 美元"
  },
  "Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors": {
      "es": "Entrada al Parque Nacional Galápagos: USD 6.00 nacionales; USD 200.00 extranjeros",
      "fr": "Entrée au Parc National des Galápagos : 6,00 USD nationaux ; 200,00 USD étrangers",
      "de": "Eintrittsgebühr für den Galapagos-Nationalpark: USD 6,00 für Ecuadorianer; USD 200,00 für Ausländer",
      "it": "Ingresso al Parco Nazionale delle Galapagos: 6,00 USD ecuadoriani; 200,00 USD stranieri",
      "pt": "Entrada no Parque Nacional Galápagos: USD 6,00 nacionais; USD 200,00 estrangeiros",
      "ja": "ガラパゴス国立公園入場料：エクアドル国籍 USD 6.00 / 外国人旅行者 USD 200.00",
      "zh": "加拉帕戈斯国家公园门票：厄瓜多尔公民 6 美元；外国游客 200 美元"
  },
  "Dinners": {
      "es": "Cenas",
      "fr": "Dîners",
      "de": "Abendessen",
      "it": "Cene",
      "pt": "Jantares",
      "ja": "夕食",
      "zh": "晚餐"
  },
  "Transit Control Card (TCT): USD 20.00": {
      "es": "Tarjeta de Control de Tránsito (TCT): USD 20.00",
      "fr": "Carte de Contrôle de Transit (TCT) : 20,00 USD",
      "de": "Transit-Kontrollkarte (TCT): USD 20,00",
      "it": "Carta di Controllo del Transito (TCT): 20,00 USD",
      "pt": "Cartão de Controle de Trânsito (TCT): USD 20,00",
      "ja": "ツーリスト・コントロール・カード（TCT）：USD 20.00",
      "zh": "交通管制过境卡 (TCT)：20 美元"
  },
  "Services not specified in the program": {
      "es": "Servicios no especificados en el programa",
      "fr": "Services non spécifiés dans le programme",
      "de": "Im Programm nicht aufgeführte Leistungen",
      "it": "Servizi non specificati nel programma",
      "pt": "Serviços não especificados no programa",
      "ja": "プログラムに記載のないサービス",
      "zh": "行程中未注明的额外服务"
  },
  "AI Travel Intelligence Insights": {
      "es": "Análisis Inteligente de Viajeros (IA)",
      "en": "AI Travel Intelligence Insights",
      "fr": "Analyse Intelligente des Avis (IA)",
      "de": "KI-Reise-Erkenntnisse",
      "it": "Analisi Intelligente dei Viaggiatori (IA)",
      "pt": "Análise Inteligente de Viajantes (IA)",
      "ja": "AI旅行インサイト分析",
      "zh": "AI 旅客智能体验洞察"
  },
  "“Guests consistently highlight private guide knowledge, seamless internal transfers, and exquisite boutique stays as standout qualities.”": {
      "es": "“Los huéspedes destacan de manera constante el conocimiento de los guías privados, la fluidez en los traslados y el encanto de los hoteles boutique.”",
      "en": "“Guests consistently highlight private guide knowledge, seamless internal transfers, and exquisite boutique stays as standout qualities.”",
      "fr": "“Les voyageurs soulignent régulièrement l'expertise des guides privés, les transferts parfaits et le charme des séjours boutique.”",
      "de": "“Gäste heben stets das Fachwissen der privaten Reiseleiter, reibungslose Transfers und exquisite Boutique-Aufenthalte hervor.”",
      "it": "“I viaggiatori evidenziano costantemente la competenza delle guide private, i trasferimenti impeccabili e il fascino degli hotel boutique.”",
      "pt": "“Os hóspedes destacam constantemente o conhecimento dos guias privados, traslados perfeitos e estadias boutique encantadoras.”",
      "ja": "“旅行者は専任プライベートガイドの深い知見、スムーズな送迎、そして洗練されたブティックホテルの快適さを絶賛しています。”",
      "zh": "“宾客一致盛赞私人向导的渊博知识、无缝衔接的行程接送以及精致高雅的精品酒店住宿。”"
  },
  "100% Satisfaction Record": {
      "es": "100% Satisfacción Garantizada",
      "en": "100% Satisfaction Record",
      "fr": "100% de Satisfaction Enregistrée",
      "de": "100% Zufriedenheitsrate",
      "it": "100% Record di Soddisfazione",
      "pt": "100% de Satisfação Registrada",
      "ja": "満足度 100% の実績",
      "zh": "100% 卓越好评率"
  },
  "Ver todas las opiniones en TripAdvisor": {
      "es": "Ver todas las opiniones en TripAdvisor",
      "en": "Read all reviews on TripAdvisor",
      "fr": "Lire tous les avis sur TripAdvisor",
      "de": "Alle Bewertungen auf TripAdvisor lesen",
      "it": "Leggi tutte le recensioni su TripAdvisor",
      "pt": "Ver todas as avaliações no TripAdvisor",
      "ja": "TripAdvisorで全ての口コミを見る",
      "zh": "在 TripAdvisor 上查看全部真实评价"
  },
  "TripAdvisor Verified Rating (5.0 / 5.0)": {
      "es": "Calificación Verificada en TripAdvisor (5.0 / 5.0)",
      "en": "TripAdvisor Verified Rating (5.0 / 5.0)",
      "fr": "Note Vérifiée TripAdvisor (5.0 / 5.0)",
      "de": "Verifizierte TripAdvisor-Bewertung (5.0 / 5.0)",
      "it": "Valutazione Verificata su TripAdvisor (5.0 / 5.0)",
      "pt": "Avaliação Verificada no TripAdvisor (5.0 / 5.0)",
      "ja": "TripAdvisor認証評価 (5.0 / 5.0)",
      "zh": "TripAdvisor 认证评分 (5.0 / 5.0)"
  },
  "51 Reviews • #85 of 678 in Quito": {
      "es": "51 Opiniones • #85 de 678 en Quito",
      "en": "51 Reviews • #85 of 678 in Quito",
      "fr": "51 Avis • #85 sur 678 à Quito",
      "de": "51 Bewertungen • #85 von 678 in Quito",
      "it": "51 Recensioni • #85 di 678 a Quito",
      "pt": "51 Avaliações • #85 de 678 em Quito",
      "ja": "51件の口コミ • キトの観光ツアー678件中85位",
      "zh": "51 条真实点评 • 基多 678 家旅行社中排名第 85"
  },

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
,
  "Certified Naturalist Guide": {
    es: "Guía Naturalista Certificado",
    en: "Certified Naturalist Guide",
    de: "Zertifizierter Naturführer",
    fr: "Guide Naturaliste Certifié",
    it: "Guida Naturalistica Certificata",
    pt: "Guia Naturalista Certificado",
    ja: "認定ナチュラリストガイド",
    zh: "官方认证自然向导"
  },
  "verified reviews": {
    es: "opiniones verificadas",
    en: "verified reviews",
    de: "verifizierte Bewertungen",
    fr: "avis vérifiés",
    it: "recensioni verificate",
    pt: "avaliações verificadas",
    ja: "件の認定レビュー",
    zh: "条真实评价"
  },
  "From": {
    es: "Desde",
    en: "From",
    de: "Ab",
    fr: "À partir de",
    it: "Da",
    pt: "A partir de",
    ja: "料金",
    zh: "起价"
  },
  "Starting From": {
    es: "Desde",
    en: "Starting From",
    de: "Ab",
    fr: "À partir de",
    it: "Da",
    pt: "A partir de",
    ja: "料金",
    zh: "起价"
  },
  "What is Included?": {
    es: "¿Qué está Incluido?",
    en: "What is Included?",
    de: "Was ist enthalten?",
    fr: "Ce qui est inclus",
    it: "Cosa è incluso?",
    pt: "O que está incluído?",
    ja: "ツアーに含まれるもの",
    zh: "费用包含"
  },
  "What is NOT Included?": {
    es: "¿Qué NO está Incluido?",
    en: "What is NOT Included?",
    de: "Was ist nicht enthalten?",
    fr: "Ce qui n'est pas inclus",
    it: "Cosa non è incluso?",
    pt: "O que não está incluído?",
    ja: "ツアーに含まれないもの",
    zh: "费用不含"
  },
  "Plan Your Bespoke Expedition": {
    es: "Planifique su Expedición a Medida",
    en: "Plan Your Bespoke Expedition",
    de: "Planen Sie Ihre maßgeschneiderte Expedition",
    fr: "Planifiez votre expédition sur mesure",
    it: "Pianifica la Tua Spedizione su Misura",
    pt: "Planeje sua Expedição sob Medida",
    ja: "オーダーメイド遠征を計画する",
    zh: "定制您的专属探险之旅"
  },
  "Custom-craft your journey with flexible departures, boutique stays, and certified naturalist guides.": {
    es: "Diseñe su viaje a medida con fechas flexibles, alojamientos boutique y guías naturalistas certificados.",
    en: "Custom-craft your journey with flexible departures, boutique stays, and certified naturalist guides.",
    de: "Gestalten Sie Ihre Reise individuell mit flexiblen Abreisen, Boutique-Unterkünften und zertifizierten Naturführern.",
    fr: "Concevez votre voyage sur mesure avec départs flexibles, hébergements boutique et guides certifiés.",
    it: "Crea il tuo viaggio su misura con partenze flessibili, soggiorni boutique e guide certificate.",
    pt: "Crie sua viagem sob medida com partidas flexíveis, estadias boutique e guias certificados.",
    ja: "日程自由・厳選ブティックホテル・認定ナチュラリストガイド同行のオーダーメイドツアー。",
    zh: "灵活出发日期、专属精品酒店与官方认证自然向导，量身定制非凡之旅。"
  },
  "Talk with Specialist": {
    es: "Hablar con Especialista",
    en: "Talk with Specialist",
    de: "Mit Spezialisten sprechen",
    fr: "Parler à un spécialiste",
    it: "Parla con lo Specialista",
    pt: "Falar com Especialista",
    ja: "専任スペシャリストに相談",
    zh: "联系专属管家"
  },
  "Add to Expedition": {
    es: "Añadir a mi Expedición",
    en: "Add to Expedition",
    de: "Zur Expedition hinzufügen",
    fr: "Ajouter à mon expédition",
    it: "Aggiungi alla spedizione",
    pt: "Adicionar à expedição",
    ja: "遠征プランに追加",
    zh: "添加至我的定制行程"
  },
  "Download Full Itinerary": {
    es: "Descargar Itinerario Completo",
    en: "Download Full Itinerary",
    de: "Vollständige Reiseroute herunterladen",
    fr: "Télécharger l'itinéraire complet",
    it: "Scarica l'itinerario completo",
    pt: "Baixar itinerário completo",
    ja: "完全な日程表をダウンロード",
    zh: "下载完整行程"
  },
  "Verified Guest Reviews for": {
    es: "Opiniones Verificadas de Viajeros para",
    en: "Verified Guest Reviews for",
    de: "Verifizierte Gästebewertungen für",
    fr: "Avis Vérifiés des Voyageurs pour",
    it: "Recensioni Verificate degli Ospiti per",
    pt: "Avaliações Verificadas de Hóspedes para",
    ja: "認定ゲストレビュー:",
    zh: "真实旅客评价:"
  },
  "Discover what recent travelers say about our personalized service, expert guides, and premium stays.": {
    es: "Descubra lo que dicen nuestros viajeros sobre el servicio personalizado, guías expertos y alojamientos premium.",
    en: "Discover what recent travelers say about our personalized service, expert guides, and premium stays.",
    fr: "Découvrez ce que disent nos voyageurs sur notre service personnalisé, nos guides experts et nos hébergements premium.",
    de: "Erfahren Sie, was unsere Gäste über unseren persönlichen Service, Expertenführer und Premium-Unterkünfte sagen.",
    it: "Scoprite cosa dicono i nostri viaggiatori sul servicio personalizzato, le guide esperte e i soggiorni premium.",
    pt: "Descubra o que nossos viajantes dizem sobre o serviço personalizado, guias especializados e hospedagens premium.",
    ja: "パーソナライズされたサービス、エキスパートガイド、プレミアム滞在について旅行者が語る声をご覧ください。",
    zh: "了解旅行者对我们个性化服务、专业向导和高端住宿的真实评价。"
  },
  "Day 1 – Arrival In Baltra | Twin Craters | Primicias Ranch": {
    es: "Día 1 – Llegada A Baltra | Cráteres Gemelos | Rancho Primicias",
    en: "Day 1 – Arrival In Baltra | Twin Craters | Primicias Ranch",
    fr: "Jour 1 – Arrivée à Baltra | Cratères Jumeaux | Rancho Primicias",
    de: "Tag 1 – Ankunft in Baltra | Zwillingskrater | Rancho Primicias",
    it: "Giorno 1 – Arrivo a Baltra | Crateri Gemelli | Rancho Primicias",
    pt: "Dia 1 – Chegada a Baltra | Crateras Gêmeas | Rancho Primicias",
    ja: "第1日 – バルトラ島到着 | ツインクレーター | プリミシアスランチ",
    zh: "第1天 – 抵达巴尔特拉 | 双子坑 | 普里米西亚巨龟庄园"
  },
  "Day 1: Arrival In Baltra – Twin Craters – Primicias Ranch": {
    es: "Día 1: Llegada A Baltra – Cráteres Gemelos – Rancho Primicias",
    en: "Day 1: Arrival In Baltra – Twin Craters – Primicias Ranch",
    fr: "Jour 1 : Arrivée à Baltra – Cratères Jumeaux – Rancho Primicias",
    de: "Tag 1: Ankunft in Baltra – Zwillingskrater – Rancho Primicias",
    it: "Giorno 1: Arrivo a Baltra – Crateri Gemelli – Rancho Primicias",
    pt: "Dia 1: Chegada a Baltra – Crateras Gêmeas – Rancho Primicias",
    ja: "第1日: バルトラ島到着 – ツインクレーター – プリミシアスランチ",
    zh: "第1天：抵达巴尔特拉 – 双子坑 – 普里米西亚巨龟庄园"
  },
  "Day 2 – Full-Day Excursion To Isabela Island | Tortoise Breeding Center | Flamingo Lagoon | Tintoreras": {
    es: "Día 2 – Excursión Full-Day A Isla Isabela | Centro De Crianza | Laguna De Flamingos | Tintoreras",
    en: "Day 2 – Full-Day Excursion To Isabela Island | Tortoise Breeding Center | Flamingo Lagoon | Tintoreras",
    fr: "Jour 2 – Excursion Journée Complète à l'Île Isabela | Centre d'Élevage | Lagune des Flamants | Tintoreras",
    de: "Tag 2 – Ganztagesausflug zur Insel Isabela | Schildkrötenzuchtzentrum | Flamingo-Lagune | Tintoreras",
    it: "Giorno 2 – Escursione Giornata Intera a Isola Isabela | Centro di Riproduzione | Laguna dei Fenicotteri | Tintoreras",
    pt: "Dia 2 – Excursão Dia Inteiro à Ilha Isabela | Centro de Reprodução | Lagoa de Flamingos | Tintoreras",
    ja: "第2日 – イサベラ島終日エクスカーション | ゾウガメ繁殖センター | フラミンゴラグーン | ティントレラス",
    zh: "第2天 – 伊莎贝拉岛全日游览 | 巨龟繁殖中心 | 火烈鸟泻湖 | 蒂恩托雷拉斯石礁"
  },
  "Day 2 – Transfer Santa Cruz To Isabela Island | Flamingo Lagoon | Tintoreras": {
    es: "Día 2 – Traslado Santa Cruz a Isabela | Laguna de Flamingos | Tintoreras",
    en: "Day 2 – Transfer Santa Cruz To Isabela Island | Flamingo Lagoon | Tintoreras",
    fr: "Jour 2 – Santa Cruz vers l'Île Isabela | Lagune des Flamants | Tintoreras",
    de: "Tag 2 – Santa Cruz nach Insel Isabela | Flamingo-Lagune | Tintoreras",
    it: "Giorno 2 – Da Santa Cruz a Isola Isabela | Laguna dei Fenicotteri | Tintoreras",
    pt: "Dia 2 – Santa Cruz para Ilha Isabela | Lagoa de Flamingos | Tintoreras",
    ja: "第2日 – サンタクルスからイサベラ島へ移動 | フラミンゴラグーン | ティントレラス",
    zh: "第2天 – 圣克鲁斯前往伊莎贝拉岛 | 火烈鸟泻湖 | 蒂恩托雷拉斯石礁"
  },
  "Day 2 – Santa Cruz To Isla Isabela | Giant Tortoise Breeding Center | Tintoreras": {
    es: "Día 2 – Santa Cruz a Isla Isabela | Centro de Crianza | Tintoreras",
    en: "Day 2 – Santa Cruz To Isla Isabela | Giant Tortoise Breeding Center | Tintoreras",
    fr: "Jour 2 – Santa Cruz vers l'Île Isabela | Centre d'Élevage | Tintoreras",
    de: "Tag 2 – Santa Cruz nach Insel Isabela | Zuchtzentrum | Tintoreras",
    it: "Giorno 2 – Da Santa Cruz a Isola Isabela | Centro di Riproduzione | Tintoreras",
    pt: "Dia 2 – Santa Cruz para Ilha Isabela | Centro de Criação | Tintoreras",
    ja: "第2日 – サンタクルスからイサベラ島へ | ゾウガメ繁殖センター | ティントレラス",
    zh: "第2天 – 圣克鲁斯前往伊莎贝拉岛 | 巨龟繁育中心 | 蒂恩托雷拉斯石礁"
  },
  "Day 3 – La Lobería | Punta Estrada | Las Grietas": {
    es: "Día 3 – La Lobería | Punta Estrada | Las Grietas",
    en: "Day 3 – La Lobería | Punta Estrada | Las Grietas",
    fr: "Jour 3 – La Lobería | Punta Estrada | Las Grietas",
    de: "Tag 3 – La Lobería | Punta Estrada | Las Grietas",
    it: "Giorno 3 – La Lobería | Punta Estrada | Las Grietas",
    pt: "Dia 3 – La Lobería | Punta Estrada | Las Grietas",
    ja: "第3日 – ラ・ロベリア | プンタ・エストラダ | ラス・グリエタス",
    zh: "第3天 – 海狮滩 (La Lobería) | 埃斯特拉达角 | 拉斯格里塔斯火山裂缝"
  },
  "Day 3 – Isabela To Santa Cruz | La Lobería | Las Grietas": {
    es: "Día 3 – Isabela a Santa Cruz | La Lobería | Las Grietas",
    en: "Day 3 – Isabela To Santa Cruz | La Lobería | Las Grietas",
    fr: "Jour 3 – Isabela vers Santa Cruz | La Lobería | Las Grietas",
    de: "Tag 3 – Isabela nach Santa Cruz | La Lobería | Las Grietas",
    it: "Giorno 3 – Da Isabela a Santa Cruz | La Lobería | Las Grietas",
    pt: "Dia 3 – Isabela para Santa Cruz | La Lobería | Las Grietas",
    ja: "第3日 – イサベラからサンタクルスへ | ラ・ロベリア | ラス・グリエタス",
    zh: "第3天 – 伊莎贝拉返回圣克鲁斯 | 海狮栖息地 | 拉斯格里塔斯火山峡谷"
  },
  "Day 4 – Transfer To Baltra Airport | Departure": {
    es: "Día 4 – Traslado Al Aeropuerto De Baltra | Salida",
    en: "Day 4 – Transfer To Baltra Airport | Departure",
    fr: "Jour 4 – Transfert à l'Aéroport de Baltra | Départ",
    de: "Tag 4 – Transfer zum Flughafen Baltra | Abreise",
    it: "Giorno 4 – Trasferimento all'Aeroporto di Baltra | Partenza",
    pt: "Dia 4 – Transfer para o Aeroporto de Baltra | Partida",
    ja: "第4日 – バルトラ空港へ送迎 | ご出発",
    zh: "第4天 – 送往巴尔特拉机场 | 航班离境"
  },
  "Day 4 – Full-Day Yacht Cruise To Santa Fe Island Or Pinzón Island": {
    es: "Día 4 – Navegación Full-Day en Yate a Isla Santa Fe o Isla Pinzón",
    en: "Day 4 – Full-Day Yacht Cruise To Santa Fe Island Or Pinzón Island",
    fr: "Jour 4 – Croisière Journée Complète en Yacht vers l'Île Santa Fe ou Pinzón",
    de: "Tag 4 – Ganztägige Yacht-Kreuzfahrt zur Insel Santa Fe oder Pinzón",
    it: "Giorno 4 – Crociera in Yacht Giornata Intera verso Isola Santa Fe o Pinzón",
    pt: "Dia 4 – Cruzeiro de Dia Inteiro em Iate para Ilha Santa Fe ou Pinzón",
    ja: "第4日 – ヨット終日クルーズ：サンタフェ島またはピンソン島",
    zh: "第4天 – 游艇全日巡航出海：圣菲岛或平松岛"
  },
  "Day 4 – Full-Day Yacht Cruise to Santa Fe or Pinzón Island": {
    es: "Día 4 – Navegación Full-Day en Yate a Santa Fe o Pinzón",
    en: "Day 4 – Full-Day Yacht Cruise to Santa Fe or Pinzón Island",
    fr: "Jour 4 – Croisière Journée Complète en Yacht vers Santa Fe ou Pinzón",
    de: "Tag 4 – Ganztägige Yacht-Kreuzfahrt nach Santa Fe oder Pinzón",
    it: "Giorno 4 – Crociera in Yacht Giornata Intera a Santa Fe o Pinzón",
    pt: "Dia 4 – Cruzeiro de Dia Inteiro em Iate para Santa Fe ou Pinzón",
    ja: "第4日 – ヨット終日クルーズ：サンタフェまたはピンソン島",
    zh: "第4天 – 游艇全日巡航出海：圣菲岛或平松岛"
  },
  "Day 5 – Transfer To Baltra Airport | Departure": {
    es: "Día 5 – Traslado al Aeropuerto de Baltra | Vuelo de salida",
    en: "Day 5 – Transfer To Baltra Airport | Departure",
    fr: "Jour 5 – Transfert à l'Aéroport de Baltra | Départ",
    de: "Tag 5 – Transfer zum Flughafen Baltra | Abreise",
    it: "Giorno 5 – Trasferimento all'Aeroporto di Baltra | Partenza",
    pt: "Dia 5 – Transfer para o Aeroporto de Baltra | Partida",
    ja: "第5日 – バルトラ空港へ送迎 | ご出発",
    zh: "第5天 – 送往巴尔特拉机场 | 航班离境"
  },
  "Day 5 – Santa Cruz To San Cristóbal Island | Interpretation Center | Tijeretas Hill | La Lobería": {
    es: "Día 5 – Santa Cruz a San Cristóbal | Centro de Interpretación | Cerro Tijeretas | La Lobería",
    en: "Day 5 – Santa Cruz To San Cristóbal Island | Interpretation Center | Tijeretas Hill | La Lobería",
    fr: "Jour 5 – Santa Cruz vers l'Île San Cristóbal | Centre d'Interprétation | Colline Tijeretas | La Lobería",
    de: "Tag 5 – Santa Cruz nach Insel San Cristóbal | Interpretationszentrum | Tijeretas-Hügel | La Lobería",
    it: "Giorno 5 – Da Santa Cruz a San Cristóbal | Centro di Interpretazione | Collina Tijeretas | La Lobería",
    pt: "Dia 5 – Santa Cruz para Ilha San Cristóbal | Centro de Interpretação | Colina Tijeretas | La Lobería",
    ja: "第5日 – サンタクルスからサンクリストバル島へ | ビジターセンター | ティヘレタスの丘 | ラ・ロベリア",
    zh: "第5天 – 圣克鲁斯前往圣克里斯托巴尔岛 | 解读中心 | 军舰鸟山 | 海狮滩"
  },
  "Day 6 – San Cristóbal Island | Airport Transfer | Departure": {
    es: "Día 6 – San Cristóbal | Traslado al Aeropuerto | Vuelo de salida",
    en: "Day 6 – San Cristóbal Island | Airport Transfer | Departure",
    fr: "Jour 6 – Île San Cristóbal | Transfert Aéroport | Départ",
    de: "Tag 6 – Insel San Cristóbal | Flughafentransfer | Abreise",
    it: "Giorno 6 – Isola di San Cristóbal | Trasferimento Aeroporto | Partenza",
    pt: "Dia 6 – Ilha San Cristóbal | Transfer Aeroporto | Partida",
    ja: "第6日 – サンクリストバル島 | 空港送迎 | ご出発",
    zh: "第6天 – 圣克里斯托巴尔岛 | 机场送机 | 航班离境"
  },
  "According to selected hotel plan": {
    es: "Según plan hotelero seleccionado",
    en: "According to selected hotel plan",
    fr: "Selon formule hôtelière sélectionnée",
    de: "Gemäß gewähltem Hotelplan",
    it: "Secondo il piano alberghiero prescelto",
    pt: "De acordo com o plano hoteleiro selecionado",
    ja: "選択されたホテルプランに準ずる",
    zh: "根据所选酒店方案提供"
  },
  "Not included / according to hotel plan": {
    es: "No incluido / según plan hotelero",
    en: "Not included / according to hotel plan",
    fr: "Non inclus / selon formule hôtelière",
    de: "Nicht inbegriffen / gemäß Hotelplan",
    it: "Non incluso / secondo piano alberghiero",
    pt: "Não incluído / de acordo com o plano do hotel",
    ja: "含まれません / ホテルプランに準ずる",
    zh: "不包含 / 根据酒店方案"
  },
  "Breakfast and lunch": {
    es: "Desayuno y almuerzo",
    en: "Breakfast and lunch",
    fr: "Petit-déjeuner et déjeuner",
    de: "Frühstück und Mittagessen",
    it: "Colazione e pranzo",
    pt: "Café da manhã e almoço",
    ja: "朝食・昼食付き",
    zh: "包含早餐与午餐"
  },
  "Breakfast": {
    es: "Desayuno",
    en: "Breakfast",
    fr: "Petit-déjeuner",
    de: "Frühstück",
    it: "Colazione",
    pt: "Café da manhã",
    ja: "朝食付き",
    zh: "包含早餐"
  },
  "Santa Cruz Island – Puerto Ayora": {
    es: "Isla Santa Cruz – Puerto Ayora",
    en: "Santa Cruz Island – Puerto Ayora",
    fr: "Île Santa Cruz – Puerto Ayora",
    de: "Insel Santa Cruz – Puerto Ayora",
    it: "Isola di Santa Cruz – Puerto Ayora",
    pt: "Ilha Santa Cruz – Puerto Ayora",
    ja: "サンタクルス島 – プエルトアヨラ",
    zh: "圣克鲁斯岛 – 阿约拉港"
  },
  "Isabela Island – Puerto Villamil": {
    es: "Isla Isabela – Puerto Villamil",
    en: "Isabela Island – Puerto Villamil",
    fr: "Île Isabela – Puerto Villamil",
    de: "Insel Isabela – Puerto Villamil",
    it: "Isola Isabela – Puerto Villamil",
    pt: "Ilha Isabela – Puerto Villamil",
    ja: "イサベラ島 – プエルト・ビジャミル",
    zh: "伊莎贝拉岛 – 维利亚米尔港"
  },
  "San Cristóbal Island – Puerto Baquerizo Moreno": {
    es: "Isla San Cristóbal – Puerto Baquerizo Moreno",
    en: "San Cristóbal Island – Puerto Baquerizo Moreno",
    fr: "Île San Cristóbal – Puerto Baquerizo Moreno",
    de: "Insel San Cristóbal – Puerto Baquerizo Moreno",
    it: "Isola di San Cristóbal – Puerto Baquerizo Moreno",
    pt: "Ilha San Cristóbal – Puerto Baquerizo Moreno",
    ja: "サンクリストバル島 – プエルト・バケリ索モレノ",
    zh: "圣克里斯托巴尔岛 – 巴克里索莫雷诺港"
  },
  "Private land transportation & airport shuttle": {
    es: "Transporte privado terrestre y shuttle de aeropuerto",
    en: "Private land transportation & airport shuttle",
    fr: "Transport terrestre privé et navette aéroport",
    de: "Privater Landtransport & Flughafentransfer",
    it: "Trasporto terrestre privato e navetta aeroportuale",
    pt: "Transporte terrestre privado e traslado do aeroporto",
    ja: "専用陸上送迎＆空港シャトル",
    zh: "陆路专车与机场接送接驳"
  },
  "Shared speedboat and private land transportation": {
    es: "Lancha rápida compartida y transporte terrestre privado",
    en: "Shared speedboat and private land transportation",
    fr: "Bateau rapide partagé et transport terrestre privé",
    de: "Geteiltes Schnellboot und privater Landtransport",
    it: "Motoscafo condiviso e trasporto terrestre privato",
    pt: "Lancha rápida compartilhada e transporte terrestre privado",
    ja: "混乗スピードボート＆専用陸上送迎",
    zh: "公共快艇与陆路专车接送"
  },
  "Private land transportation and airport shuttle": {
    es: "Transporte terrestre privado y shuttle de aeropuerto",
    en: "Private land transportation and airport shuttle",
    fr: "Transport terrestre privé et navette aéroport",
    de: "Privater Landtransport & Flughafentransfer",
    it: "Trasporto terrestre privato e navetta aeroportuale",
    pt: "Transporte terrestre privado e traslado do aeroporto",
    ja: "専用陸上送迎＆空港シャトル",
    zh: "专车陆路接送与机场接驳"
  },
  "Full-day guided excursion and snorkeling": {
    es: "Excursión guiada full-day y snorkeling",
    en: "Full-day guided excursion and snorkeling",
    fr: "Excursion guidée d'une journée et snorkeling",
    de: "Ganztägige geführte Tour & Schnorcheln",
    it: "Escursione guidata di un giorno intero e snorkeling",
    pt: "Excursão guiada de dia inteiro e snorkeling",
    ja: "終日専属ガイドツアー＆シュノーケリング",
    zh: "全天向导陪同游览与浮潜体验"
  },
  "Guided excursion and snorkeling": {
    es: "Excursión guiada y snorkeling",
    en: "Guided excursion and snorkeling",
    fr: "Excursion guidée et snorkeling",
    de: "Geführte Tour & Schnorcheln",
    it: "Escursione guidata e snorkeling",
    pt: "Excursão guiada e snorkeling",
    ja: "ガイド付きツアー＆シュノーケリング",
    zh: "向导陪同游览与浮潜体验"
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
