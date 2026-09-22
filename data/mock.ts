import { Tour, Destination, Review } from '@/types';
import { dailyTours } from './dailyToursData';

const multiDayTours: Tour[] = [
  // Tour: galapagos-6days
  {
    id: 'galapagos-6days',
    code: '1.1',
    title: {
      en: 'Galapagos Encounter: 6-Day Expedition (With Quito Transfers)',
      es: 'Encuentro Galápagos: 6 Días De Magia (Con Transfers UIO)',
      fr: 'Rencontre aux Galápagos: 6 Jours Merveilleux (Transferts UIO Inclus)',
      de: 'Galapagos Entdeckung: 6 Tage Magie (Inkl. Quito-Transfers)',
      it: 'Incontro alle Galapagos: 6 Giorni di Magia (Con Trasferimenti UIO)',
      pt: 'Encontro em Galápagos: 6 Dias de Magia (Com Transfers UIO)',
      ja: 'ガラパゴス諸島 6日間の驚異（キト送迎付き）',
      zh: '加拉帕戈斯群岛6日奇妙之旅（含基多接送机）'
    },
    destination: 'Galapagos',
    duration: {
      en: '6 DAYS / 5 NIGHTS',
      es: '6 DÍAS / 5 NOCHES',
      fr: '6 JOURS / 5 NUITS',
      de: '6 TAGE / 5 NÄCHTE',
      it: '6 GIORNI / 5 NOTTI',
      pt: '6 DIAS / 5 NOITES',
      ja: '6日間 / 5泊',
      zh: '6天 / 5晚'
    },
    durationDays: 6,
    price: 1790,
    price3Star: 1790,
    price4Star: 2199,
    imageUrl: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
    mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.webp',
    desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
    gallery: [
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
      '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
      '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
      '/images/tours/16-9/galapagos-tintoreras16-9.webp',
      '/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
      '/images/tours/16-9/galapagos-puerto-ayora-16-9.webp',
      '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.1.webp',
      '/images/tours/16-9/galapagos-baltra-island-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 32,
    isPopular: true,
    category: {
      en: 'Island Hopping Expedition & Quito Transfers',
      es: 'Expedición Island Hopping y Transfers en Quito',
      fr: 'Expédition d\'île en île et transferts à Quito',
      de: 'Insel-Hopping-Expedition & Quito-Transfers',
      it: 'Spedizione Island Hopping e Trasferimenti a Quito',
      pt: 'Expedição Entre Ilhas e Transfers em Quito',
      ja: 'アイランドホッピング探検＆キト送迎',
      zh: '跳岛精华探险与基多专属接送'
    },
    description: {
      en: 'Comprehensive 6-day Galápagos journey featuring private airport transfers in Quito, Santa Cruz highlands, giant tortoises at Primicias Ranch, full-day Isabela Island speedboat excursion with Tintoreras snorkeling and flamingo lagoon, and coastal exploration at La Lobería, Punta Estrada and Las Grietas.',
      es: 'Experiencia integral de 6 días con traslados privados en Quito, tierras altas de Santa Cruz, tortugas gigantes en Rancho Primicias, excursión de día completo en lancha rápida a Isla Isabela con snorkel en Tintoreras y laguna de flamingos, y relax en Las Grietas y La Lobería.',
      fr: 'Circuit complet de 6 jours comprenant transferts privés à Quito, hauts plateaux de Santa Cruz, tortues géantes au Rancho Primicias, excursion d\'une journée à l\'île Isabela avec snorkeling à Tintoreras et flamants roses, et Las Grietas.',
      de: 'Umfassende 6-tägige Galapagos-Reise mit privaten Quito-Flughafentransfers, Santa Cruz Hochland, Riesenschildkröten auf der Primicias Ranch, Ganztagesausflug nach Isabela mit Tintoreras-Schnorcheln und Flamingos sowie Las Grietas.',
      it: 'Viaggio completo di 6 giorni alle Galapagos con trasferimenti privati a Quito, alture di Santa Cruz, tartarughe giganti al Rancho Primicias, escursione di una giornata a Isabela con snorkeling a Tintoreras e fenicotteri, e Las Grietas.',
      pt: 'Viagem completa de 6 dias em Galápagos com transfers privados em Quito, terras altas de Santa Cruz, tartarugas gigantes no Rancho Primicias, excursão de dia inteiro a Isabela com snorkel em Tintoreras e flamingos, e Las Grietas.',
      ja: 'キト空港専用送迎、サンタクルス島高地の双子坑、プリミシアス牧場の野生ゾウガメ、イサベラ島への終日スピードボートツアー（ティントレラスのシュノーケリング＆フラミンゴ）、ラス・グリエタス火山峡谷を巡る充実の6日間。',
      zh: '包含基多私人机场往返接送的加拉帕戈斯6日精选行程：游览圣克鲁斯高地双子坑与普里米西亚野生巨龟保护区，乘快艇全日探秘伊莎贝拉岛并在蒂恩托雷拉斯浮潜观赏海龟、海狮与企鹅，探索拉洛贝里亚与拉斯格里塔斯火山峡谷。'
    },
    highlights: [
      {
        en: 'Private Quito Airport Transfers (Arrival & Departure)',
        es: 'Traslados Privados Aeropuerto Quito (Llegada y Salida)',
        fr: 'Transferts Privés Aéroport de Quito (Arrivée et Départ)',
        de: 'Private Quito-Flughafentransfers (Ankunft & Abreise)',
        it: 'Trasferimenti Privati Aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados Privados Aeroporto de Quito (Chegada e Partida)',
        ja: 'キト空港専用往復送迎（到着＆出発）',
        zh: '基多国际机场私人专车接送（抵达与离境）'
      },
      {
        en: 'Twin Craters & Primicias Giant Tortoise Ranch',
        es: 'Cráteres Gemelos y Rancho de Tortugas Primicias',
        fr: 'Cratères Jumeaux et Réserve de Tortues Primicias',
        de: 'Zwillingskrater & Riesenschildkröten-Farm Primicias',
        it: 'Crateri Gemelli e Riserva Tartarughe Primicias',
        pt: 'Crateras Gêmeas e Rancho de Tartarugas Primicias',
        ja: '双子坑（ロス・ヘメロス）＆プリミシアス巨亀保護区',
        zh: '双子坑与普里米西亚巨龟生态保护区'
      },
      {
        en: 'Full-Day Isabela Excursion & Tintoreras Snorkeling',
        es: 'Excursión Full-Day Isabela y Snorkel en Tintoreras',
        fr: 'Excursion Journée Isabela & Snorkeling aux Tintoreras',
        de: 'Ganztagesausflug Isabela & Schnorcheln bei Tintoreras',
        it: 'Escursione Giornata Intera a Isabela e Snorkeling a Tintoreras',
        pt: 'Excursão Dia Inteiro Isabela e Snorkel em Tintoreras',
        ja: 'イサベラ島終日ツアー＆ティントレラスでのシュノーケリング',
        zh: '伊莎贝拉岛全日探险与蒂恩托雷拉斯浮潜'
      },
      {
        en: 'Flamingo Lagoon & Giant Tortoise Breeding Center',
        es: 'Laguna de Flamingos y Centro de Crianza de Tortugas',
        fr: 'Lagune des Flamants et Centre d\'Élevage de Tortues',
        de: 'Flamingo-Lagune & Schildkrötenzuchtzentrum',
        it: 'Laguna dei Fenicotteri e Centro Riproduzione Tartarughe',
        pt: 'Lagoa de Flamingos e Centro de Reprodução de Tartarugas',
        ja: 'フラミンゴラグーン＆ゾウガメ繁殖センター',
        zh: '火烈鸟泻湖与巨龟繁育保护中心'
      },
      {
        en: 'La Lobería Sea Lion Colony & Las Grietas Volcanic Canyon',
        es: 'Colonia de Lobos Marinos en La Lobería y Cañón Las Grietas',
        fr: 'Colonie d\'Otarie à La Lobería et Canyon Volcanique Las Grietas',
        de: 'Seelöwenkolonie La Lobería & Vulkanschlucht Las Grietas',
        it: 'Colonia di Leoni Marini a La Lobería e Canyon Las Grietas',
        pt: 'Colônia de Leões-Marinhos em La Lobería e Cânion Las Grietas',
        ja: 'ラ・ロベリアのアシカコロニー＆ラス・グリエタス火山渓谷',
        zh: '拉洛贝里亚海狮聚居地与拉斯格里塔斯火山峡谷'
      }
    ],
    inclusions: [
      {
        en: 'Accommodation at the hotel of your choice in Santa Cruz (3★ or 4★)',
        es: 'Alojamiento en el hotel seleccionado en Santa Cruz (3★ o 4★)',
        fr: 'Hébergement à l\'hôtel de votre choix à Santa Cruz (3★ ou 4★)',
        de: 'Unterkunft im gewählten Hotel auf Santa Cruz (3★ oder 4★)',
        it: 'Sistemazione nell\'hotel prescelto a Santa Cruz (3★ o 4★)',
        pt: 'Hospedagem no hotel de sua escolha em Santa Cruz (3★ ou 4★)',
        ja: 'サンタクルス島の厳選ホテル宿泊（3★または4★）',
        zh: '圣克鲁斯岛自选精品酒店住宿（3星级或4星级）'
      },
      {
        en: 'Private airport transfers in Quito (Arrival & Departure)',
        es: 'Traslados privados en aeropuerto de Quito (Llegada y Salida)',
        fr: 'Transferts privés aéroport de Quito (Arrivée et Départ)',
        de: 'Private Flughafentransfers in Quito (Ankunft & Abreise)',
        it: 'Trasferimenti privati aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados privados no aeroporto de Quito (Chegada e Partida)',
        ja: 'キト空港専用プライベート送迎（到着＆出発）',
        zh: '基多国际机场私人专车接送（抵达与出发）'
      },
      {
        en: 'Buffet breakfast at 4★ hotels / Continental breakfast at 3★ hotels',
        es: 'Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★',
        fr: 'Petit-déjeuner buffet en hôtel 4★ / continental en hôtel 3★',
        de: 'Frühstücksbuffet in 4★-Hotels / Kontinentales Frühstück in 3★-Hotels',
        it: 'Colazione a buffet in hotel 4★ / Continentale in hotel 3★',
        pt: 'Café da manhã buffet em hotéis 4★ / Continental em hotéis 3★',
        ja: '4★ホテルのビュッフェ朝食 / 3★ホテルのコンチネンタル朝食',
        zh: '4星级酒店自助早餐 / 3星级酒店欧陆式早餐'
      },
      {
        en: 'Set-menu lunches according to the itinerary',
        es: 'Almuerzos menú incluidos según el itinerario',
        fr: 'Déjeuners avec menu préétabli selon l\'itinéraire',
        de: 'Mittagessen mit festem Menü gemäß Reiseroute',
        it: 'Pranzi con menu fisso secondo l\'itinerario',
        pt: 'Almoços com cardápio fixo de acordo com o itinerário',
        ja: '旅程に応じたセットメニューの昼食',
        zh: '行程中规划的指定套餐午餐'
      },
      {
        en: 'Domestic Flight Ticket (Quito – Baltra – Quito)',
        es: 'Boleto aéreo doméstico (Quito – Baltra – Quito)',
        fr: 'Billet d\'avion intérieur (Quito – Baltra – Quito)',
        de: 'Inlandsflugticket (Quito – Baltra – Quito)',
        it: 'Biglietto aereo nazionale (Quito – Baltra – Quito)',
        pt: 'Passagem aérea doméstica (Quito – Baltra – Quito)',
        ja: '国内線往復航空券（キト – バルトラ – キト）',
        zh: '厄瓜多尔境内往返机票（基多 – 巴尔特拉 – 基多）'
      },
      {
        en: 'All guided visits to the islands according to the itinerary',
        es: 'Todas las visitas guiadas a las islas según el itinerario',
        fr: 'Toutes les visites guidées des îles selon l\'itinéraire',
        de: 'Alle geführten Inselbesuche gemäß Reiseroute',
        it: 'Tutte le visite guidate alle isole secondo l\'itinerario',
        pt: 'Todas as visitas guiadas às ilhas de acordo com o itinerário',
        ja: '旅程に記載されたすべてのガイド付き島内観光',
        zh: '行程规划的所有受保护海岛导览游览'
      },
      {
        en: 'Airport reception and departure assistance at Galápagos airports',
        es: 'Recepción y asistencia en aeropuertos de Galápagos',
        fr: 'Accueil et assistance aux aéroports des Galápagos',
        de: 'Flughafenempfang und Abreisebetreuung auf Galápagos',
        it: 'Accoglienza e assistenza negli aeroporti delle Galapagos',
        pt: 'Recepção e assistência nos aeroportos de Galápagos',
        ja: 'ガラパゴス諸島空港での到着出迎えおよび出発サポート',
        zh: '加拉帕戈斯各机场抵达专员接机与出发协助'
      },
      {
        en: 'Comprehensive land and maritime transportation',
        es: 'Transporte terrestre y marítimo integral',
        fr: 'Transport terrestre et maritime complet',
        de: 'Umfassender Land- und Seetransport',
        it: 'Trasporto terrestre e marittimo completo',
        pt: 'Transporte terrestre e marítimo completo',
        ja: '全行程における陸上および海上移動交通',
        zh: '全程专车陆路与快艇海上交通'
      },
      {
        en: 'Level III Certified Naturalist Guides (Spanish / English)',
        es: 'Guías naturalistas certificados Nivel III (Español / Inglés)',
        fr: 'Guides naturalistes certifiés de niveau III (Espagnol / Anglais)',
        de: 'Zertifizierte Naturführer der Stufe III (Spanisch / Englisch)',
        it: 'Guide naturalistiche certificate di Livello III (Spagnolo / Inglese)',
        pt: 'Guias naturalistas certificados Nível III (Espanhol / Inglês)',
        ja: 'レベルIII認定ナチュラリストガイド（英語・スペイン語）',
        zh: '三级国家认证资深自然向导（英语/西班牙语）'
      },
      {
        en: 'Snorkeling equipment for boat excursions (mask and snorkel)',
        es: 'Equipo de snorkel para excursiones en barco (máscara y tubo)',
        fr: 'Équipement de snorkeling pour les excursions en bateau (masque et tuba)',
        de: 'Schnorchelausrüstung für Bootstouren (Maske und Schnorchel)',
        it: 'Attrezzatura da snorkeling per escursioni in barca (maschera e boccaglio)',
        pt: 'Equipamento de snorkel para excursões de barco (máscara e snorkel)',
        ja: 'ボートツアー用シュノーケリング装備（マスク＆スノーケル）',
        zh: '游艇出海探险高品质浮潜装备（面镜和呼吸管）'
      },
      {
        en: 'Safety lockers available at hotel reception',
        es: 'Casilleros de seguridad disponibles en la recepción del hotel',
        fr: 'Coffres-forts disponibles à la réception de l\'hôtel',
        de: 'Sicherheitsschließfächer an der Hotelrezeption verfügbar',
        it: 'Cassette di sicurezza alla reception dell\'hotel',
        pt: 'Cofres de segurança na recepção do hotel',
        ja: 'ホテルフロントのセーフティボックス利用可能',
        zh: '酒店前台免费提供安全保险箱服务'
      },
      {
        en: 'Lobito Airport Shuttle Bus: Airport – Itabaca Channel – Airport',
        es: 'Autobús Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto',
        fr: 'Navette aéroport Lobito: Aéroport – Canal d\'Itabaca – Aéroport',
        de: 'Lobito Flughafen-Shuttlebus: Flughafen – Itabaca-Kanal – Flughafen',
        it: 'Bus navetta Lobito: Aeroporto – Canale di Itabaca – Aeroporto',
        pt: 'Ônibus shuttle Lobito: Aeroporto – Canal de Itabaca – Aeroporto',
        ja: 'ロビト空港シャトルバス：空港 – イタバカ運河 – 空港',
        zh: 'Lobito机场穿梭接驳巴士：机场 – 伊塔巴卡运河 – 机场'
      },
      {
        en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors',
        es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros',
        fr: 'Taxe de quai d\'Isabela: 5,00 USD nationaux / 10,00 USD étrangers',
        de: 'Isabela-Dockgebühr: USD 5,00 für Ecuadorianer / USD 10,00 für Ausländer',
        it: 'Tassa portuale di Isabela: 5,00 USD ecuadoriani / 10,00 USD stranieri',
        pt: 'Taxa de cais de Isabela: USD 5,00 nacionais / USD 10,00 estrangeiros',
        ja: 'イサベラ島入港税：エクアドル国籍 USD 5.00 / 外国人 USD 10.00',
        zh: '伊莎贝拉岛码头税：厄瓜多尔公民 5 美元 / 外国游客 10 美元'
      }
    ],
    exclusions: [
      {
        en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors',
        es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros',
        fr: 'Entrée au Parc National des Galápagos: 6,00 USD nationaux / 200,00 USD étrangers',
        de: 'Eintrittsgebühr für den Galapagos-Nationalpark: USD 6,00 für Ecuadorianer / USD 200,00 für Ausländer',
        it: 'Ingresso al Parco Nazionale delle Galapagos: 6,00 USD ecuadoriani / 200,00 USD stranieri',
        pt: 'Entrada no Parque Nacional Galápagos: USD 6,00 nacionais / USD 200,00 estrangeiros',
        ja: 'ガラパゴス国立公園入場料：エクアドル国籍 USD 6.00 / 外国人 USD 200.00',
        zh: '加拉帕戈斯国家公园入园费：厄瓜多尔公民 6 美元 / 外国游客 200 美元'
      },
      {
        en: 'Dinners (to give you freedom to enjoy local gastronomy)',
        es: 'Cenas (libertad para explorar la gastronomía local)',
        fr: 'Dîners (pour vous laisser libre de découvrir la gastronomie locale)',
        de: 'Abendessen (Freiheit zur Entdeckung der lokalen Gastronomie)',
        it: 'Cene (libertà di esplorare la gastronomia locale)',
        pt: 'Jantares (liberdade para desfrutar da gastronomia local)',
        ja: '夕食（地元のグルメを自由にお楽しみいただけます）',
        zh: '晚餐（留白时间自由品味当地特色海鲜与美馔）'
      },
      {
        en: 'Transit Control Card (TCT): USD 20.00 per person',
        es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00 por persona',
        fr: 'Carte de Contrôle de Transit (TCT): 20,00 USD par personne',
        de: 'Transit Control Card (TCT): USD 20,00 pro Person',
        it: 'Carta di Controllo del Transito (TCT): 20,00 USD a persona',
        pt: 'Cartão de Controle de Trânsito (TCT): USD 20,00 por pessoa',
        ja: 'トランジットコントロールカード（TCT）：お一人様 USD 20.00',
        zh: '加拉帕戈斯通行控制卡（TCT）：每人 20 美元'
      },
      {
        en: 'Services not specified in the program & personal expenses',
        es: 'Servicios no especificados en el programa y gastos personales',
        fr: 'Services non spécifiés dans le programme et dépenses personnelles',
        de: 'Nicht im Programm aufgeführte Leistungen & persönliche Ausgaben',
        it: 'Servizi non specificati nel programma e spese personali',
        pt: 'Serviços não especificados no programa e despesas pessoais',
        ja: 'プログラムに明記されていないサービスおよび個人的な費用',
        zh: '行程未提及的额外消费及私人支出'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito | Private Airport Transfer',
          es: 'Día 1 – Llegada A Quito | Traslado Privado De Aeropuerto',
          fr: 'Jour 1 – Arrivée à Quito | Transfert Privé Aéroport',
          de: 'Tag 1 – Ankunft in Quito | Privater Flughafentransfer',
          it: 'Giorno 1 – Arrivo a Quito | Trasferimento Privato Aeroporto',
          pt: 'Dia 1 – Chegada a Quito | Traslado Privado do Aeroporto',
          ja: '第1日 – キト到着 | 専用空港送迎',
          zh: '第1天 – 抵达基多 | 尊享私人机场接机'
        },
        description: {
          en: 'Welcome at Quito International Airport and private transfer to your hotel. Relax and prepare for your extraordinary adventure across the enchanted archipelago.',
          es: 'Recepción de bienvenida en el Aeropuerto Internacional Mariscal Sucre de Quito y traslado privado exclusivo a su hotel. Tiempo libre para descansar y aclimatarse antes de viajar a Galápagos.',
          fr: 'Accueil chaleureux à l\'aéroport international de Quito et transfert privé vers votre hôtel. Reposez-vous et préparez-vous pour une aventure exceptionnelle aux Galápagos.',
          de: 'Herzlicher Empfang am internationalen Flughafen Quito und privater Transfer zu Ihrem Hotel. Erholen Sie sich und stimmen Sie sich auf Ihr Galapagos-Abenteuer ein.',
          it: 'Benvenuto all\'Aeroporto Internazionale di Quito e trasferimento privato in hotel. Tempo a disposizione per rilassarsi prima della partenza per le Galapagos.',
          pt: 'Boas-vindas no Aeroporto Internacional de Quito e traslado privado para o hotel. Descanse e prepare-se para esta inesquecível aventura em Galápagos.',
          ja: 'キト国際空港にて専属スタッフがお出迎えし、専用車でホテルへ移動。翌日からのガラパゴス諸島探検に向けてゆったりとお過ごしください。',
          zh: '抵达基多苏克雷元帅国际机场，专属向导贴心接机并乘坐专车前往酒店办理入住。休整身心，准备开启加拉帕戈斯奇迹之旅。'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3★ or 4★)',
          es: 'Hotel en Quito (Categoría seleccionada 3★ o 4★)',
          fr: 'Hôtel à Quito (Catégorie 3★ ou 4★)',
          de: 'Hotel in Quito (Kategorie 3★ oder 4★)',
          it: 'Hotel a Quito (Categoria 3★ o 4★)',
          pt: 'Hotel em Quito (Categoria 3★ ou 4★)',
          ja: 'キト市内の厳選ホテル（3★または4★）',
          zh: '基多精选酒店（3星级或4星级）'
        },
        meals: {
          en: 'Not included / at leisure',
          es: 'No incluidas / libres',
          fr: 'Non inclus',
          de: 'Nicht inbegriffen',
          it: 'Non inclusi',
          pt: 'Não incluídas',
          ja: '食事なし',
          zh: '敬请自理'
        },
        transportation: {
          en: 'Private transportation from Quito Airport',
          es: 'Transporte privado desde Aeropuerto de Quito',
          fr: 'Transport privé depuis l\'aéroport de Quito',
          de: 'Privater Transport vom Flughafen Quito',
          it: 'Trasporto privato dall\'aeroporto di Quito',
          pt: 'Transporte privado do aeroporto de Quito',
          ja: 'キト空港からの専用送迎車',
          zh: '基多机场专属商务专车接机'
        },
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Arrival In Baltra | Twin Craters | Primicias Giant Tortoise Ranch',
          es: 'Día 2 – Llegada A Baltra | Cráteres Gemelos | Rancho De Tortugas Primicias',
          fr: 'Jour 2 – Arrivée à Baltra | Cratères Jumeaux | Rancho Primicias',
          de: 'Tag 2 – Ankunft in Baltra | Zwillingskrater | Primicias-Ranch',
          it: 'Giorno 2 – Arrivo a Baltra | Crateri Gemelli | Rancho Primicias',
          pt: 'Dia 2 – Chegada a Baltra | Crateras Gêmeas | Rancho Primicias',
          ja: '第2日 – バルトラ島到着 | 双子坑 | プリミシアス巨亀保護区',
          zh: '第2天 – 飞抵巴尔特拉岛 | 双子坑 | 普里米西亚野生巨龟保护区'
        },
        description: {
          en: 'Morning transfer from your Quito hotel to the airport for your flight to the Galápagos Islands. Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey. After crossing the Itabaca Channel to Santa Cruz Island, travel to the highlands to visit the famous Twin Craters (Los Gemelos), surrounded by lush Scalesia forest. Continue to Primicias Ranch, a private ecological reserve where giant tortoises roam freely in their natural habitat and explore natural volcanic lava tunnels. Transfer to Puerto Ayora for check-in and leisure.',
          es: 'Traslado privado desde su hotel en Quito hacia el aeropuerto para abordar el vuelo a Galápagos. A su llegada al Aeropuerto Seymour en Isla Baltra, recepción por nuestro representante. Tras cruzar el Canal de Itabaca hacia Isla Santa Cruz, ascendemos a las tierras altas para visitar los famosos Cráteres Gemelos (Los Gemelos), impresionantes depresiones volcánicas en medio del bosque de Scalesia. Luego visitamos el Rancho Primicias, reserva privada donde las tortugas gigantes de Galápagos viven en libertad y caminamos por túneles de lava. Traslado a Puerto Ayora y tarde libre.',
          fr: 'Transfert matinal de votre hôtel de Quito à l\'aéroport pour votre vol vers les Galápagos. Accueil à l\'aéroport Seymour de Baltra par notre représentant. Traversée du canal d\'Itabaca vers l\'île Santa Cruz et montée dans les hautes terres pour découvrir les impressionnants Cratères Jumeaux (Los Gemelos) au cœur de la forêt de Scalesia. Poursuite vers le Rancho Primicias pour observer les tortues géantes en liberté et traverser des tunnels de lave volcanique. Transfert à Puerto Ayora et fin de journée libre.',
          de: 'Morgendlicher Transfer vom Hotel in Quito zum Flughafen für den Flug nach Galapagos. Nach der Ankunft am Flughafen Seymour auf der Insel Baltra Begrüßung durch unseren Reiseleiter. Überquerung des Itabaca-Kanals nach Santa Cruz und Fahrt ins Hochland zu den berühmten Zwillingskratern (Los Gemelos) im Scalesia-Wald. Weiter zur Primicias Ranch, um Riesenschildkröten in freier Wildbahn zu beobachten und Lavatunnel zu erkunden. Transfer nach Puerto Ayora und Freizeit.',
          it: 'Trasferimento mattutino dall\'hotel di Quito all\'aeroporto per il volo verso le Galapagos. Arrivo all\'aeroporto Seymour di Baltra e accoglienza da parte del nostro rappresentante. Attraversamento del Canale di Itabaca verso Santa Cruz e visita agli spettacolari Crateri Gemelli (Los Gemelos) nella foresta di Scalesia. Proseguimento verso il Rancho Primicias per ammirare le tartarughe giganti nel loro habitat ed esplorare tunnel di lava. Trasferimento a Puerto Ayora.',
          pt: 'Traslado matutino do hotel em Quito ao aeroporto para embarque rumo a Galápagos. Recepção no Aeroporto Seymour na Ilha Baltra por nosso representante. Travessia do Canal de Itabaca até Santa Cruz e subida às terras altas para visitar as imponentes Crateras Gêmeas (Los Gemelos) no bosque de Scalesia. Visita ao Rancho Primicias para observar tartarugas gigantes em liberdade e túneis de lava. Traslado a Puerto Ayora.',
          ja: 'ホテルからキト空港へ専用送迎し、ガラパゴス諸島バルトラ空港へフライト。到着後、専属ガイドがお出迎え。イタバカ運河を渡りサンタクルス島高地へ。緑豊かなスカレシアの森に囲まれた双子坑（ロス・ヘメロス）を見学後、プリミシアス牧場で野生の巨大ガラパゴスゾウガメを観察し溶岩トンネルを探検。プエルトアヨラのホテルへ。',
          zh: '晨间从基多酒店专车送往机场飞往加拉帕戈斯群岛。抵达巴尔特拉岛西摩机场后由中文/英文向导迎接。渡过伊塔巴卡海峡抵达圣克鲁斯岛高地，探索壮观的火山双子坑（Los Gemelos）与特有鳞片树林。随后探访普里米西亚私人生态保护区，近距离观察自由漫步的加拉帕戈斯野生象龟并穿越火山熔岩隧道。前往阿约拉港办理入住。'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'According to selected hotel plan',
          es: 'Según plan hotelero seleccionado',
          fr: 'Selon la formule hôtelière choisie',
          de: 'Gemäß gewähltem Hotelplan',
          it: 'Secondo il piano alberghiero scelto',
          pt: 'De acordo com o plano do hotel escolhido',
          ja: 'ホテルプランに準ずる',
          zh: '按所选酒店方案包含'
        },
        transportation: {
          en: 'Private airport transfer in Quito, flight, ferry & private island transport',
          es: 'Transfer privado en Quito, vuelo, ferry y transporte privado en isla',
          fr: 'Transfert privé à Quito, vol, ferry et transport terrestre privé',
          de: 'Privater Transfer in Quito, Flug, Fähre & privater Inseltransport',
          it: 'Trasferimento privato a Quito, volo, traghetto e trasporto privato',
          pt: 'Transfer privado em Quito, voo, balsa e transporte terrestre na ilha',
          ja: 'キト空港送迎、フライト、フェリー＆島内専用車',
          zh: '基多专车送机、国内航班、渡轮及岛上专车'
        },
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Full-Day Excursion To Isabela Island | Breeding Center | Flamingo Lagoon | Tintoreras',
          es: 'Día 3 – Excursión Full-Day A Isla Isabela | Centro De Crianza | Laguna De Flamingos | Tintoreras',
          fr: 'Jour 3 – Excursion Journée à l\'Île Isabela | Centre d\'Élevage | Flamants Roses | Tintoreras',
          de: 'Tag 3 – Ganztagesausflug Insel Isabela | Zuchtzentrum | Flamingo-Lagune | Tintoreras',
          it: 'Giorno 3 – Escursione a Isabela | Centro Riproduzione | Fenicotteri | Tintoreras',
          pt: 'Dia 3 – Excursão Dia Inteiro a Isabela | Centro de Reprodução | Flamingos | Tintoreras',
          ja: '第3日 – イサベラ島終日ツアー | ゾウガメ繁殖センター | フラミンゴラグーン | ティントレラス',
          zh: '第3天 – 伊莎贝拉岛全日探险 | 巨龟繁育中心 | 火烈鸟泻湖 | 蒂恩托雷拉斯石礁浮潜'
        },
        description: {
          en: 'After breakfast, transfer to the pier to board a speedboat to Isabela Island (approx 2 to 2.5 hours). Upon arrival in Puerto Villamil, visit the Giant Tortoise Breeding Center to learn about island conservation. Next, stroll around the Flamingo Lagoon to observe wild flamingos in their natural wetland habitat. Continue with a boat excursion to Tintoreras Islet, a pristine volcanic islet with turquoise waters ideal for snorkeling alongside sea lions, sea turtles, rays, reef sharks, Galápagos penguins, and marine iguanas. Return by speedboat to Santa Cruz Island in the late afternoon.',
          es: 'Desayuno y traslado al muelle para abordar la lancha rápida hacia Isla Isabela (2 a 2.5 horas de navegación). En Puerto Villamil, visitamos el Centro de Crianza de Tortugas Gigantes para conocer los programas de preservación. Luego recorremos la Laguna de Flamingos para admirar estas aves en su hábitat de humedales. Por la tarde, navegación al Islote Tintoreras, formación volcánica de aguas cristalinas ideal para snorkeling con lobos marinos, tortugas marinas, rayas, tiburones tintorera, pingüinos de Galápagos e iguanas marinas. Retorno en lancha rápida a Santa Cruz.',
          fr: 'Après le petit-déjeuner, départ en bateau rapide vers l\'île Isabela (2 à 2h30 de traversée). À Puerto Villamil, visite du centre d\'élevage des tortues géantes puis promenade près de la lagune des flamants roses. L\'après-midi, excursion en bateau vers l\'îlot Tintoreras, paradis de lave volcanique offrant un snorkeling exceptionnel au milieu des otaries, tortues de mer, raies, manchots des Galápagos et requins à pointes blanches. Retour en bateau rapide à Santa Cruz.',
          de: 'Nach dem Frühstück Schnellbootfahrt zur Insel Isabela (ca. 2–2,5 Stunden). In Puerto Villamil Besuch des Riesenschildkröten-Zuchtzentrums und der Flamingo-Lagune. Nachmittags Bootstour zum Tintoreras-Inselchen: Schnorcheln im kristallklaren Wasser mit Seelöwen, Meeresschildkröten, Rochen, Weißspitzen-Riffhaien, Galapagos-Pinguinen und Meerechsen. Rückfahrt per Schnellboot nach Santa Cruz.',
          it: 'Dopo colazione, motoscafo verso l\'isola Isabela (circa 2-2,5 ore). A Puerto Villamil, visita al Centro di Riproduzione delle Tartarughe e alla Laguna dei Fenicotteri. Nel pomeriggio, escursione in barca all\'isolotto Tintoreras, ideale per lo snorkeling con leoni marini, tartarughe marine, razze, pinguini delle Galapagos e squali pinna bianca. Rientro a Santa Cruz in motoscafo.',
          pt: 'Após o café da manhã, lancha rápida até a Ilha Isabela (2 a 2,5 horas). Em Puerto Villamil, visita ao Centro de Reprodução de Tartarugas Gigantes e à Lagoa de Flamingos. À tarde, navegação ao Ilhote Tintoreras para snorkel incrível com leões-marinhos, tartarugas marinhas, arraias, pinguins e tubarões-tintureira. Retorno em lancha rápida a Santa Cruz.',
          ja: '朝食後、スピードボートで最大の島イサベラ島へ（約2〜2.5時間）。プエルト・ビジャミル到着後、ゾウガメ繁殖センターとフラミンゴラグーンを見学。午後はティントレラス小島へボートクルーズ。アシカ、ウミガメ、エイ、ガラパゴスペンギン、ネムリブカが生息する透明な水路でシュノーケリング。夕方サンタクルス島へ帰還。',
          zh: '早餐后乘快艇横渡至加拉帕戈斯最大岛屿伊莎贝拉岛（航程约2至2.5小时）。抵达维利亚米尔港后探访巨龟繁殖中心了解保护成效，漫步火烈鸟泻湖湿地。午后乘船前往蒂恩托雷拉斯石礁（Tintoreras），在清澈的火山海湾中浮潜，与海狮、海龟、蝠鲼、加拉帕戈斯企鹅及白顶礁鲨近距离畅游。傍晚乘快艇返回圣克鲁斯岛。'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-déjeuner et déjeuner',
          de: 'Frühstück und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'Café da manhã e almoço',
          ja: '朝食・昼食付き',
          zh: '包含早餐与午餐'
        },
        transportation: {
          en: 'Inter-island speedboat and local land transfers',
          es: 'Lancha rápida interislas y traslados locales',
          fr: 'Bateau rapide inter-îles et transferts locaux',
          de: 'Schnellboot zwischen den Inseln & lokale Transfers',
          it: 'Motoscafo interisola e trasferimenti locali',
          pt: 'Lancha rápida interilhas e traslados locais',
          ja: '島間スピードボート＆現地送迎',
          zh: '城际快艇与岛上观光专车'
        },
        activity: {
          en: 'Full-day guided island excursion and marine snorkeling',
          es: 'Excursión guiada de día completo y snorkel marino',
          fr: 'Excursion guidée journée complète et snorkeling marin',
          de: 'Ganztägige geführte Tour & Meeresschnorcheln',
          it: 'Escursione guidata di un\'intera giornata e snorkeling',
          pt: 'Excursão guiada de dia inteiro e snorkel marítimo',
          ja: '終日ガイド付き島ツアー＆海洋シュノーケリング',
          zh: '全天自然向导陪同探险与海洋浮潜'
        },
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – La Lobería | Punta Estrada | Las Grietas Volcanic Canyon',
          es: 'Día 4 – La Lobería | Punta Estrada | Cañón Volcánico Las Grietas',
          fr: 'Jour 4 – La Lobería | Punta Estrada | Canyon Volcanique Las Grietas',
          de: 'Tag 4 – La Lobería | Punta Estrada | Vulkanschlucht Las Grietas',
          it: 'Giorno 4 – La Lobería | Punta Estrada | Canyon Vulcanico Las Grietas',
          pt: 'Dia 4 – La Lobería | Punta Estrada | Cânion Vulcânico Las Grietas',
          ja: '第4日 – ラ・ロベリア | プンタ・エストラーダ | ラス・グリエタス火山峡谷',
          zh: '第4天 – 拉洛贝里亚海狮滩 | 埃斯特拉达角 | 拉斯格里塔斯火山峡谷'
        },
        description: {
          en: 'After breakfast, begin the day with a visit to La Lobería, a scenic coastal area known for its playful sea lion colony. Continue to Punta Estrada to observe coastal marine wildlife and unique lava formations. Proceed to Las Grietas, a stunning geological crevice filled with transparent brackish turquoise water flanked by towering volcanic cliffs—a world-class spot for refreshing swimming and snorkeling. Afternoon at leisure in Puerto Ayora to explore art galleries and local artisan markets.',
          es: 'Tras el desayuno, visita a La Lobería, hermosa bahía costera famosa por su activa colonia de lobos marinos. Continuamos hacia Punta Estrada con sus paisajes volcánicos y aves marinas. Luego exploramos Las Grietas, una grieta volcánica natural de aguas turquesas cristalinas encajonada entre paredes de lava, ideal para nadar y hacer snorkel entre peces loro y peces cirujano. Resto de la tarde libre en Puerto Ayora para relajarse o visitar galerías locales.',
          fr: 'Visite côtière de La Lobería pour observer la joyeuse colonie d\'otaries des Galápagos. Découverte de Punta Estrada et de ses paysages de lave. Puis exploration de Las Grietas, spectaculaire faille géologique aux eaux turquoise limpides protégée par de hauts murs de basalte, parfaite pour la baignade et le snorkeling. Après-midi libre à Puerto Ayora.',
          de: 'Besuch der Bucht La Lobería mit ihrer verspielten Seelöwenkolonie und von Punta Estrada. Weiter nach Las Grietas, einer spektakulären vulkanischen Felsspalte mit kristallklarem, türkisfarbenem Wasser – ein grandioser Ort zum Schwimmen und Schnorcheln. Freier Nachmittag im lebendigen Küstenort Puerto Ayora.',
          it: 'Escursione a La Lobería per osservare i leoni marini e proseguimento per Punta Estrada. Visita a Las Grietas, una spettacolare crepa vulcanica dalle acque turchesi e trasparenti ideale per nuotare e fare snorkeling. Pomeriggio libero a Puerto Ayora.',
          pt: 'Visita à baía de La Lobería para observar os leões-marinhos e caminhada até Punta Estrada. Em seguida, descubra Las Grietas, um cânion vulcânico magnífico com águas cristalinas perfeito para banho e snorkel. Tarde livre em Puerto Ayora.',
          ja: 'アシカが集まる美しい海岸ラ・ロベリアとプンタ・エストラーダを散策。続いて高さのある溶岩の絶壁に囲まれたエメラルドグリーンの天然クレバス「ラス・グリエタス」へ。透明度抜群の汽水でスイミングとシュノーケリングを満喫。午後はプエルトアヨラで自由時間。',
          zh: '晨间游览拉洛贝里亚海岸，观赏海滩上憨态可掬的加拉帕戈斯海狮群与海鬣蜥。随后前往埃斯特拉达角，深入壮丽的拉斯格里塔斯（Las Grietas）火山玄武岩裂谷，在峭壁掩映的翡翠色纯净水域中游泳和浮潜。下午在阿约拉港自由漫步，体验当地手工艺品与咖啡文化。'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Water taxi and scenic coastal trail walk',
          es: 'Taxi acuático y caminata escénica por sendero costero',
          fr: 'Bateau-taxi et sentier côtier panoramique',
          de: 'Wassertaxi & malerische Küstenwanderung',
          it: 'Taxi acqueo e passeggiata costiera panoramica',
          pt: 'Táxi aquático e caminhada por trilha costeira',
          ja: '水上タクシー＆沿岸トレッキング',
          zh: '水上出租船与海岸步行徒步'
        },
        activity: {
          en: 'Coastal wildlife watching, Las Grietas swimming & snorkeling',
          es: 'Observación de fauna costera, natación y snorkel en Las Grietas',
          fr: 'Observation de la faune côtière, baignade et snorkeling à Las Grietas',
          de: 'Küstenfauna-Beobachtung, Schwimmen & Schnorcheln in Las Grietas',
          it: 'Avvistamento fauna costiera, nuoto e snorkeling a Las Grietas',
          pt: 'Observação de vida silvestre costeira, nado e snorkel em Las Grietas',
          ja: '沿岸野生生物観察、ラス・グリエタスでのスイミング＆シュノーケリング',
          zh: '沿海野生动物巡礼、拉斯格里塔斯峡谷游泳与浮潜'
        },
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Transfer To Baltra Airport | Flight To Quito | Private Hotel Transfer',
          es: 'Día 5 – Traslado Al Aeropuerto De Baltra | Vuelo A Quito | Transfer Privado Al Hotel',
          fr: 'Jour 5 – Transfert à l\'Aéroport de Baltra | Vol vers Quito | Transfert Privé Hôtel',
          de: 'Tag 5 – Transfer zum Flughafen Baltra | Flug nach Quito | Privater Hoteltransfer',
          it: 'Giorno 5 – Trasferimento all\'Aeroporto di Baltra | Volo per Quito | Transfer Privato in Hotel',
          pt: 'Dia 5 – Traslado ao Aeroporto de Baltra | Voo para Quito | Transfer Privado ao Hotel',
          ja: '第5日 – バルトラ空港へ送迎 | キト行きフライト | ホテル専用送迎',
          zh: '第5天 – 前往巴尔特拉机场 | 飞往基多 | 专车接机入住酒店'
        },
        description: {
          en: 'After breakfast, check out from your hotel in Puerto Ayora and transfer across Santa Cruz Island and the Itabaca Channel to Baltra Seymour Airport for your return flight to the mainland. Upon landing in Quito, our representative will provide private transfer to your hotel. Enjoy your evening relaxing in the historic Andean capital.',
          es: 'Desayuno, check-out del hotel en Puerto Ayora y traslado terrestre cruzando Santa Cruz y el Canal de Itabaca hacia el Aeropuerto Seymour de Baltra para abordar el vuelo de retorno a Quito. A su llegada al continente, recepción y traslado privado exclusivo a su hotel en Quito. Noche libre para disfrutar de la capital andina.',
          fr: 'Petit-déjeuner, check-out de votre hôtel et transfert à travers Santa Cruz et le canal d\'Itabaca vers l\'aéroport Seymour de Baltra pour votre vol retour vers Quito. À votre arrivée sur le continent, accueil et transfert privé à votre hôtel.',
          de: 'Nach dem Frühstück Fahrt über Santa Cruz und den Itabaca-Kanal zum Flughafen Baltra für den Rückflug nach Quito. Nach der Landung privater Transfer zu Ihrem Hotel in Quito. Entspannter Abend in der Andenmetropole.',
          it: 'Dopo colazione, check-out e trasferimento attraverso Santa Cruz e il canale di Itabaca verso l\'aeroporto di Baltra per il volo di rientro a Quito. Accoglienza e trasferimento privato in hotel.',
          pt: 'Café da manhã, check-out e traslado por Santa Cruz e Canal de Itabaca até o Aeroporto de Baltra para voo de retorno a Quito. Chegada e traslado privado exclusivo ao hotel em Quito.',
          ja: '朝食後チェックアウトし、イタバカ運河を経由してバルトラ島空港へ移動。キト行きの国内線フライトに搭乗。キト到着後、専用車でホテルへお送りいたします。歴史あるアンデスの首都でゆったりとお過ごしください。',
          zh: '早餐后办理退房，穿过圣克鲁斯岛与伊塔巴卡海峡前往巴尔特拉西摩机场，搭乘航班返回厄瓜多尔大陆。抵达基多后专车接机送抵酒店。夜晚可漫步老城或在酒店休憩。'
        },
        image: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3★ or 4★)',
          es: 'Hotel en Quito (Categoría seleccionada 3★ o 4★)',
          fr: 'Hôtel à Quito (Catégorie 3★ ou 4★)',
          de: 'Hotel in Quito (Kategorie 3★ oder 4★)',
          it: 'Hotel a Quito (Categoria 3★ o 4★)',
          pt: 'Hotel em Quito (Categoria 3★ ou 4★)',
          ja: 'キト市内の厳選ホテル（3★または4★）',
          zh: '基多精选酒店（3星级或4星级）'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Island ground transfer, Baltra airport shuttle, domestic flight & private Quito transfer',
          es: 'Transporte en isla, bus Lobito, vuelo doméstico y traslado privado en Quito',
          fr: 'Transport terrestre sur l\'île, navette aéroport, vol intérieur et transfert privé à Quito',
          de: 'Insel-Transfer, Shuttlebus, Inlandsflug & privater Transfer in Quito',
          it: 'Trasferimento sull\'isola, navetta, volo nazionale e transfer privato a Quito',
          pt: 'Transporte na ilha, ônibus shuttle, voo doméstico e traslado privado em Quito',
          ja: '島内陸上送迎、空港シャトル、国内線フライト＆キト市内専用送迎',
          zh: '岛上陆路接驳、机场专线巴士、国内航班及基多市内专车'
        },
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Private Quito Airport Transfer | Onward Connections',
          es: 'Día 6 – Traslado Privado Al Aeropuerto De Quito | Vuelo Internacional',
          fr: 'Jour 6 – Transfert Privé vers l\'Aéroport de Quito | Connexions Internationales',
          de: 'Tag 6 – Privater Transfer zum Flughafen Quito | Weiterflug',
          it: 'Giorno 6 – Trasferimento Privato all\'Aeroporto di Quito | Volo di Rientro',
          pt: 'Dia 6 – Traslado Privado ao Aeroporto de Quito | Conexões Internacionais',
          ja: '第6日 – キト空港専用送迎 | 帰国の途へ',
          zh: '第6天 – 基多机场私人专车送机 | 踏上归途'
        },
        description: {
          en: 'At the scheduled time, private transfer from your hotel to Quito International Airport for your onward international flight connections. End of our services, taking home unforgettable memories of the enchanted Galápagos Islands.',
          es: 'A la hora acordada, traslado privado exclusivo desde su hotel hacia el Aeropuerto Internacional Mariscal Sucre de Quito para tomar su vuelo de conexión internacional. Fin de nuestros servicios con recuerdos inolvidables de las Islas Encantadas.',
          fr: 'Transfert privé de votre hôtel vers l\'aéroport international de Quito pour votre vol de correspondance internationale. Fin de nos prestations avec des souvenirs mémorables des îles Galápagos.',
          de: 'Rechtzeitiger privater Transfer vom Hotel zum internationalen Flughafen Quito für Ihren internationalen Weiterflug. Ende unserer Leistungen mit unvergesslichen Erinnerungen an die verzauberten Galapagos-Inseln.',
          it: 'All\'orario concordato, trasferimento privato dall\'hotel all\'Aeroporto Internazionale di Quito per il volo internazionale di ritorno. Fine dei nostri servizi.',
          pt: 'No horário programado, traslado privado do hotel ao Aeroporto Internacional de Quito para conexão com seu voo internacional. Fim de nossos serviços com lembranças inesquecíveis.',
          ja: 'フライト時間に合わせてホテルからキト国際空港へ専用車で送迎いたします。魔法のようなガラパゴス諸島の思い出とともに帰国の途へ。サービス終了となります。',
          zh: '根据国际航班起飞时间，专车送往基多国际机场办理登机手续，踏上温馨归途。加拉帕戈斯群岛的奇妙探险圆满结束。'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Private transportation to Quito International Airport',
          es: 'Transporte privado al Aeropuerto Internacional de Quito',
          fr: 'Transport privé vers l\'aéroport international de Quito',
          de: 'Privater Transport zum Flughafen Quito',
          it: 'Trasporto privato per l\'aeroporto di Quito',
          pt: 'Transporte privado para o Aeroporto de Quito',
          ja: 'キト国際空港への専用送迎車',
          zh: '基多国际机场私人专车送机'
        },
      }
    ]
  },

  // Tour: galapagos-7days
  {
    id: 'galapagos-7days',
    code: '1.2',
    title: {
      en: 'Galapagos Explorer: 7-Day Island Expedition (With Quito Transfers)',
      es: 'Expedición Galápagos: 7 Días De Aventura (Con Transfers UIO)',
      fr: 'Expédition Galápagos: 7 Jours d\'Aventure (Transferts UIO Inclus)',
      de: 'Galapagos Entdecker: 7 Tage Inselabenteuer (Inkl. Quito-Transfers)',
      it: 'Spedizione Galapagos: 7 Giorni di Avventura (Con Trasferimenti UIO)',
      pt: 'Expedição Galápagos: 7 Dias de Aventura (Com Transfers UIO)',
      ja: 'ガラパゴス探検：7日間のアイランドアドベンチャー（キト送迎付き）',
      zh: '加拉帕戈斯探索者：7日海岛深度探险（含基多接送机）'
    },
    destination: 'Galapagos',
    duration: {
      en: '7 DAYS / 6 NIGHTS',
      es: '7 DÍAS / 6 NOCHES',
      fr: '7 JOURS / 6 NUITS',
      de: '7 TAGE / 6 NÄCHTE',
      it: '7 GIORNI / 6 NOTTI',
      pt: '7 DIAS / 6 NOITES',
      ja: '7日間 / 6泊',
      zh: '7天 / 6晚'
    },
    durationDays: 7,
    price: 2050,
    price3Star: 2050,
    price4Star: 2399,
    imageUrl: '/images/tours/16-9/santa-fe-island-16-9.webp',
    mobileImage: '/images/tours/9-16/santa-fe-island-9-16.webp',
    desktopImage: '/images/tours/16-9/santa-fe-island-16-9.webp',
    gallery: [
      '/images/tours/16-9/santa-fe-island-16-9.webp',
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
      '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
      '/images/tours/16-9/galapagos-tintoreras16-9.webp',
      '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
      '/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
      '/images/tours/16-9/galapagos-snorkeling-16-9.webp',
      '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.1.webp'
    ],
    rating: 5,
    reviewsCount: 38,
    isPopular: true,
    category: {
      en: 'Multi-Island Hopping & Yacht Cruise',
      es: 'Gran Salto de Islas y Navegación en Yate',
      fr: 'Grand saut d\'îles et croisière en yacht',
      de: 'Großes Inselhüpfen & Yacht-Kreuzfahrt',
      it: 'Grande Salto tra Isole e Navigazione in Yacht',
      pt: 'Grande Salto entre Ilhas e Navegação em Iate',
      ja: 'マルチアイランド＆ヨットクルーズ',
      zh: '多岛跳岛探险与游艇巡航'
    },
    description: {
      en: 'Unforgettable 7-day journey connecting Quito private transfers, Santa Cruz highlands & giant tortoises, an overnight stay on Isabela Island with Tintoreras & flamingo lagoon, Las Grietas canyon, and a full-day navigable yacht excursion to Santa Fe or Pinzón Island.',
      es: 'Inolvidable viaje de 7 días que conecta traslados privados en Quito, tierras altas de Santa Cruz, noche en Isla Isabela con Tintoreras y laguna de flamingos, cañón de Las Grietas y navegación de día completo en yate a Santa Fe o Pinzón.',
      fr: 'Voyage inoubliable de 7 jours reliant les transferts privés à Quito, les hauts plateaux de Santa Cruz, une nuit sur l\'île Isabela avec Tintoreras et flamants roses, Las Grietas et une excursion navigable d\'une journée en yacht vers Santa Fe ou Pinzón.',
      de: 'Unvergessliche 7-tägige Reise mit privaten Quito-Transfers, Santa Cruz Hochland, Übernachtung auf der Insel Isabela mit Tintoreras & Flamingo-Lagune, Las Grietas und ganztägigem Yachtausflug zur Insel Santa Fe oder Pinzón.',
      it: 'Indimenticabile viaggio di 7 giorni con trasferimenti privati a Quito, alture di Santa Cruz, pernottamento a Isabela con Tintoreras e fenicotteri, canyon di Las Grietas ed escursione in yacht a Santa Fe o Pinzón.',
      pt: 'Inesquecível viagem de 7 dias combinando traslados privados em Quito, terras altas de Santa Cruz, pernoite na Ilha Isabela com Tintoreras e flamingos, cânion de Las Grietas e navegação de dia inteiro a Santa Fe ou Pinzón.',
      ja: 'キト専用送迎、サンタクルス島の巨亀と双子坑、イサベラ島での宿泊とティントレラスのシュノーケリング、ラス・グリエタス、そしてサンタフェ島またはピンソン島への終日ヨットクルーズを含む贅沢な7日間。',
      zh: '7日经典海岛探险，包含基多私人机场接送、圣克鲁斯高地巨龟保护区、伊莎贝拉岛过夜体验（蒂恩托雷拉斯群礁浮潜与火烈鸟泻湖）、拉斯格里塔斯火山峡谷，以及前往圣菲岛或平松岛的全天出海游艇巡航。'
    },
    highlights: [
      {
        en: 'Private Quito Airport Transfers (Arrival & Departure)',
        es: 'Traslados Privados Aeropuerto Quito (Llegada y Salida)',
        fr: 'Transferts Privés Aéroport de Quito (Arrivée et Départ)',
        de: 'Private Quito-Flughafentransfers (Ankunft & Abreise)',
        it: 'Trasferimenti Privati Aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados Privados Aeroporto de Quito (Chegada e Partida)',
        ja: 'キト空港専用往復送迎（到着＆出発）',
        zh: '基多国际机场私人专车接送（抵达与离境）'
      },
      {
        en: 'Twin Craters & Primicias Giant Tortoise Reserve',
        es: 'Cráteres Gemelos y Reserva de Tortugas Primicias',
        fr: 'Cratères Jumeaux et Réserve de Tortues Primicias',
        de: 'Zwillingskrater & Riesenschildkröten-Reservat Primicias',
        it: 'Crateri Gemelli e Riserva Tartarughe Primicias',
        pt: 'Crateras Gêmeas e Reserva de Tartarugas Primicias',
        ja: '双子坑＆プリミシアス巨亀保護区',
        zh: '双子坑与普里米西亚巨龟生态保护区'
      },
      {
        en: 'Overnight in Isabela Island & Flamingo Lagoon',
        es: 'Noche en Isla Isabela y Laguna de Flamingos',
        fr: 'Nuit sur l\'île Isabela & Lagune des Flamants',
        de: 'Übernachtung auf der Insel Isabela & Flamingo-Lagune',
        it: 'Pernottamento a Isabela e Laguna dei Fenicotteri',
        pt: 'Pernoite na Ilha Isabela e Lagoa de Flamingos',
        ja: 'イサベラ島での宿泊＆フラミンゴラグーン',
        zh: '伊莎贝拉岛深度过夜体验与火烈鸟泻湖'
      },
      {
        en: 'Tintoreras Islet Snorkeling & Marine Iguana Colonies',
        es: 'Snorkel en Tintoreras y Colonias de Iguanas Marinas',
        fr: 'Snorkeling aux Tintoreras & Iguanes Marins',
        de: 'Schnorcheln bei Tintoreras & Meerechsenkolonien',
        it: 'Snorkeling a Tintoreras e Colonie di Iguane Marine',
        pt: 'Snorkel em Tintoreras e Colônias de Iguanas Marinhas',
        ja: 'ティントレラスでのシュノーケリング＆ウミイグアナの群れ',
        zh: '蒂恩托雷拉斯石礁浮潜与海鬣蜥群落巡礼'
      },
      {
        en: 'Full-Day Navigable Yacht Cruise to Santa Fe or Pinzón Island',
        es: 'Navegación Full-Day en Yate a Isla Santa Fe o Pinzón',
        fr: 'Croisière Navigable d\'une Journée à Santa Fe ou Pinzón',
        de: 'Ganztägige Yacht-Kreuzfahrt zur Insel Santa Fe oder Pinzón',
        it: 'Crociera in Yacht di un\'intera Giornata a Santa Fe o Pinzón',
        pt: 'Cruzeiro de Dia Inteiro em Iate para Santa Fe ou Pinzón',
        ja: 'サンタフェ島またはピンソン島への終日ヨットクルーズ',
        zh: '圣菲岛或平松岛全天出海游艇航行与浮潜'
      }
    ],
    inclusions: [
      {
        en: 'Accommodation at the hotel of your choice in Santa Cruz (3★ or 4★)',
        es: 'Alojamiento en el hotel seleccionado en Santa Cruz (3★ o 4★)',
        fr: 'Hébergement à l\'hôtel de votre choix à Santa Cruz (3★ ou 4★)',
        de: 'Unterkunft im gewählten Hotel auf Santa Cruz (3★ oder 4★)',
        it: 'Sistemazione nell\'hotel prescelto a Santa Cruz (3★ o 4★)',
        pt: 'Hospedagem no hotel de sua escolha em Santa Cruz (3★ ou 4★)',
        ja: 'サンタクルス島の厳選ホテル宿泊（3★または4★）',
        zh: '圣克鲁斯岛自选精品酒店住宿（3星级或4星级）'
      },
      {
        en: 'Accommodation at Hostal Tintorera in Isabela Island',
        es: 'Alojamiento en Hostal Tintorera en Isla Isabela',
        fr: 'Hébergement à l\'Hostal Tintorera sur l\'île Isabela',
        de: 'Unterkunft im Hostal Tintorera auf der Insel Isabela',
        it: 'Sistemazione presso Hostal Tintorera sull\'isola Isabela',
        pt: 'Hospedagem no Hostal Tintorera na Ilha Isabela',
        ja: 'イサベラ島のオスタル・ティントレラ宿泊',
        zh: '伊莎贝拉岛廷托雷拉客栈住宿'
      },
      {
        en: 'Private airport transfers in Quito (Arrival & Departure)',
        es: 'Traslados privados en aeropuerto de Quito (Llegada y Salida)',
        fr: 'Transferts privés aéroport de Quito (Arrivée et Départ)',
        de: 'Private Flughafentransfers in Quito (Ankunft & Abreise)',
        it: 'Trasferimenti privati aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados privados no aeroporto de Quito (Chegada e Partida)',
        ja: 'キト空港専用プライベート送迎（到着＆出発）',
        zh: '基多国际机场私人专车接送（抵达与出发）'
      },
      {
        en: 'Buffet breakfast at 4★ hotels / Continental breakfast at 3★ hotels',
        es: 'Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★',
        fr: 'Petit-déjeuner buffet en hôtel 4★ / continental en hôtel 3★',
        de: 'Frühstücksbuffet in 4★-Hotels / Kontinentales Frühstück in 3★-Hotels',
        it: 'Colazione a buffet in hotel 4★ / Continentale in hotel 3★',
        pt: 'Café da manhã buffet em hotéis 4★ / Continental em hotéis 3★',
        ja: '4★ホテルのビュッフェ朝食 / 3★ホテルのコンチネンタル朝食',
        zh: '4星级酒店自助早餐 / 3星级酒店欧陆式早餐'
      },
      {
        en: 'Set-menu lunches according to the itinerary',
        es: 'Almuerzos menú incluidos según el itinerario',
        fr: 'Déjeuners avec menu préétabli selon l\'itinéraire',
        de: 'Mittagessen mit festem Menü gemäß Reiseroute',
        it: 'Pranzi con menu fisso secondo l\'itinerario',
        pt: 'Almoços com cardápio fixo de acordo com o itinerário',
        ja: '旅程に応じたセットメニューの昼食',
        zh: '行程中规划的指定套餐午餐'
      },
      {
        en: 'Domestic Flight Ticket (Quito – Baltra – Quito)',
        es: 'Boleto aéreo doméstico (Quito – Baltra – Quito)',
        fr: 'Billet d\'avion intérieur (Quito – Baltra – Quito)',
        de: 'Inlandsflugticket (Quito – Baltra – Quito)',
        it: 'Biglietto aereo nazionale (Quito – Baltra – Quito)',
        pt: 'Passagem aérea doméstica (Quito – Baltra – Quito)',
        ja: '国内線往復航空券（キト – バルトラ – キト）',
        zh: '厄瓜多尔境内往返机票（基多 – 巴尔特拉 – 基多）'
      },
      {
        en: 'All guided visits to the islands according to the itinerary',
        es: 'Todas las visitas guiadas a las islas según el itinerario',
        fr: 'Toutes les visites guidées des îles selon l\'itinéraire',
        de: 'Alle geführten Inselbesuche gemäß Reiseroute',
        it: 'Tutte le visite guidate alle isole secondo l\'itinerario',
        pt: 'Todas as visitas guiadas às ilhas de acordo com o itinerário',
        ja: '旅程に記載されたすべてのガイド付き島内観光',
        zh: '行程规划的所有受保护海岛导览游览'
      },
      {
        en: 'Airport reception and departure assistance at Galápagos airports',
        es: 'Recepción y asistencia en aeropuertos de Galápagos',
        fr: 'Accueil et assistance aux aéroports des Galápagos',
        de: 'Flughafenempfang und Abreisebetreuung auf Galápagos',
        it: 'Accoglienza e assistenza negli aeroporti delle Galapagos',
        pt: 'Recepção e assistência nos aeroportos de Galápagos',
        ja: 'ガラパゴス諸島空港での到着出迎えおよび出発サポート',
        zh: '加拉帕戈斯各机场抵达专员接机与出发协助'
      },
      {
        en: 'Comprehensive land and maritime transportation',
        es: 'Transporte terrestre y marítimo integral',
        fr: 'Transport terrestre et maritime complet',
        de: 'Umfassender Land- und Seetransport',
        it: 'Trasporto terrestre e marittimo completo',
        pt: 'Transporte terrestre e marítimo completo',
        ja: '全行程における陸上および海上移動交通',
        zh: '全程专车陆路与快艇海上交通'
      },
      {
        en: 'Level III Certified Naturalist Guides (Spanish / English)',
        es: 'Guías naturalistas certificados Nivel III (Español / Inglés)',
        fr: 'Guides naturalistes certifiés de niveau III (Espagnol / Anglais)',
        de: 'Zertifizierte Naturführer der Stufe III (Spanisch / Englisch)',
        it: 'Guide naturalistiche certificate di Livello III (Spagnolo / Inglese)',
        pt: 'Guias naturalistas certificados Nível III (Espanhol / Inglês)',
        ja: 'レベルIII認定ナチュラリストガイド（英語・スペイン語）',
        zh: '三级国家认证资深自然向导（英语/西班牙语）'
      },
      {
        en: 'Snorkeling equipment for boat excursions (mask and snorkel)',
        es: 'Equipo de snorkel para excursiones en barco (máscara y tubo)',
        fr: 'Équipement de snorkeling pour les excursions en bateau (masque et tuba)',
        de: 'Schnorchelausrüstung für Bootstouren (Maske und Schnorchel)',
        it: 'Attrezzatura da snorkeling per escursioni in barca (maschera e boccaglio)',
        pt: 'Equipamento de snorkel para excursões de barco (máscara e snorkel)',
        ja: 'ボートツアー用シュノーケリング装備（マスク＆スノーケル）',
        zh: '游艇出海探险高品质浮潜装备（面镜和呼吸管）'
      },
      {
        en: 'Safety lockers available at hotel reception',
        es: 'Casilleros de seguridad disponibles en la recepción del hotel',
        fr: 'Coffres-forts disponibles à la réception de l\'hôtel',
        de: 'Sicherheitsschließfächer an der Hotelrezeption verfügbar',
        it: 'Cassette di sicurezza alla reception dell\'hotel',
        pt: 'Cofres de segurança na recepção do hotel',
        ja: 'ホテルフロントのセーフティボックス利用可能',
        zh: '酒店前台免费提供安全保险箱服务'
      },
      {
        en: 'Lobito Airport Shuttle Bus: Airport – Itabaca Channel – Airport',
        es: 'Autobús Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto',
        fr: 'Navette aéroport Lobito: Aéroport – Canal d\'Itabaca – Aéroport',
        de: 'Lobito Flughafen-Shuttlebus: Flughafen – Itabaca-Kanal – Flughafen',
        it: 'Bus navetta Lobito: Aeroporto – Canale di Itabaca – Aeroporto',
        pt: 'Ônibus shuttle Lobito: Aeroporto – Canal de Itabaca – Aeroporto',
        ja: 'ロビト空港シャトルバス：空港 – イタバカ運河 – 空港',
        zh: 'Lobito机场穿梭接驳巴士：机场 – 伊塔巴卡运河 – 机场'
      },
      {
        en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors',
        es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros',
        fr: 'Taxe de quai d\'Isabela: 5,00 USD nationaux / 10,00 USD étrangers',
        de: 'Isabela-Dockgebühr: USD 5,00 für Ecuadorianer / USD 10,00 für Ausländer',
        it: 'Tassa portuale di Isabela: 5,00 USD ecuadoriani / 10,00 USD stranieri',
        pt: 'Taxa de cais de Isabela: USD 5,00 nacionais / USD 10,00 estrangeiros',
        ja: 'イサベラ島入港税：エクアドル国籍 USD 5.00 / 外国人 USD 10.00',
        zh: '伊莎贝拉岛码头税：厄瓜多尔公民 5 美元 / 外国游客 10 美元'
      }
    ],
    exclusions: [
      {
        en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors',
        es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros',
        fr: 'Entrée au Parc National des Galápagos: 6,00 USD nationaux / 200,00 USD étrangers',
        de: 'Eintrittsgebühr für den Galapagos-Nationalpark: USD 6,00 für Ecuadorianer / USD 200,00 für Ausländer',
        it: 'Ingresso al Parco Nazionale delle Galapagos: 6,00 USD ecuadoriani / 200,00 USD stranieri',
        pt: 'Entrada no Parque Nacional Galápagos: USD 6,00 nacionais / USD 200,00 estrangeiros',
        ja: 'ガラパゴス国立公園入場料：エクアドル国籍 USD 6.00 / 外国人 USD 200.00',
        zh: '加拉帕戈斯国家公园入园费：厄瓜多尔公民 6 美元 / 外国游客 200 美元'
      },
      {
        en: 'Dinners (to give you freedom to enjoy local gastronomy)',
        es: 'Cenas (libertad para explorar la gastronomía local)',
        fr: 'Dîners (pour vous laisser libre de découvrir la gastronomie locale)',
        de: 'Abendessen (Freiheit zur Entdeckung der lokalen Gastronomie)',
        it: 'Cene (libertà di esplorare la gastronomia locale)',
        pt: 'Jantares (liberdade para desfrutar da gastronomia local)',
        ja: '夕食（地元のグルメを自由にお楽しみいただけます）',
        zh: '晚餐（留白时间自由品味当地特色海鲜与美馔）'
      },
      {
        en: 'Transit Control Card (TCT): USD 20.00 per person',
        es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00 por persona',
        fr: 'Carte de Contrôle de Transit (TCT): 20,00 USD par personne',
        de: 'Transit Control Card (TCT): USD 20,00 pro Person',
        it: 'Carta di Controllo del Transito (TCT): 20,00 USD a persona',
        pt: 'Cartão de Controle de Trânsito (TCT): USD 20,00 por pessoa',
        ja: 'トランジットコントロールカード（TCT）：お一人様 USD 20.00',
        zh: '加拉帕戈斯通行控制卡（TCT）：每人 20 美元'
      },
      {
        en: 'Services not specified in the program & personal expenses',
        es: 'Servicios no especificados en el programa y gastos personales',
        fr: 'Services non spécifiés dans le programme et dépenses personnelles',
        de: 'Nicht im Programm aufgeführte Leistungen & persönliche Ausgaben',
        it: 'Servizi non specificati nel programma e spese personali',
        pt: 'Serviços não especificados no programa e despesas pessoais',
        ja: 'プログラムに明記されていないサービスおよび個人的な費用',
        zh: '行程未提及的额外消费及私人支出'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito | Private Airport Transfer',
          es: 'Día 1 – Llegada A Quito | Traslado Privado De Aeropuerto',
          fr: 'Jour 1 – Arrivée à Quito | Transfert Privé Aéroport',
          de: 'Tag 1 – Ankunft in Quito | Privater Flughafentransfer',
          it: 'Giorno 1 – Arrivo a Quito | Trasferimento Privato Aeroporto',
          pt: 'Dia 1 – Chegada a Quito | Traslado Privado do Aeroporto',
          ja: '第1日 – キト到着 | 専用空港送迎',
          zh: '第1天 – 抵达基多 | 尊享私人机场接机'
        },
        description: {
          en: 'Welcome at Quito International Airport and private transfer to your hotel. Rest and prepare for your upcoming journey into the Galápagos archipelago.',
          es: 'Recepción en el Aeropuerto Internacional de Quito y traslado privado a su hotel. Tiempo libre para descansar y aclimatarse antes de su expedición.',
          fr: 'Accueil à l\'aéroport international de Quito et transfert privé vers votre hôtel. Temps libre pour vous reposer avant le grand départ pour les Galápagos.',
          de: 'Empfang am internationalen Flughafen Quito und privater Transfer zu Ihrem Hotel. Erholen Sie sich vor Ihrem Abflug auf die Galapagos-Inseln.',
          it: 'Accoglienza all\'Aeroporto Internazionale di Quito e trasferimento privato in hotel. Tempo a disposizione per il relax.',
          pt: 'Recepção no Aeroporto Internacional de Quito e traslado privado para o hotel. Tempo livre para descansar.',
          ja: 'キト国際空港にてお出迎え後、専用車でホテルへ移動。翌日からのガラパゴス諸島探検に向けてごゆっくりお休みください。',
          zh: '基多国际机场专员接机，乘坐专车抵达酒店办理入住。休整身心，准备迎接壮丽的海岛探险。'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3★ or 4★)',
          es: 'Hotel en Quito (Categoría seleccionada 3★ o 4★)',
          fr: 'Hôtel à Quito (Catégorie 3★ ou 4★)',
          de: 'Hotel in Quito (Kategorie 3★ oder 4★)',
          it: 'Hotel a Quito (Categoria 3★ o 4★)',
          pt: 'Hotel em Quito (Categoria 3★ ou 4★)',
          ja: 'キト市内の厳選ホテル（3★または4★）',
          zh: '基多精选酒店（3星级或4星级）'
        },
        meals: {
          en: 'Not included / at leisure',
          es: 'No incluidas / libres',
          fr: 'Non inclus',
          de: 'Nicht inbegriffen',
          it: 'Non inclusi',
          pt: 'Não incluídas',
          ja: '食事なし',
          zh: '敬请自理'
        },
        transportation: {
          en: 'Private transportation from Quito Airport',
          es: 'Transporte privado desde Aeropuerto de Quito',
          fr: 'Transport privé depuis l\'aéroport de Quito',
          de: 'Privater Transport vom Flughafen Quito',
          it: 'Trasporto privato dall\'aeroporto di Quito',
          pt: 'Transporte privado do aeroporto de Quito',
          ja: 'キト空港からの専用送迎車',
          zh: '基多机场专属商务专车接机'
        },
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Arrival In Baltra | Twin Craters | Primicias Ranch',
          es: 'Día 2 – Llegada A Baltra | Cráteres Gemelos | Rancho Primicias',
          fr: 'Jour 2 – Arrivée à Baltra | Cratères Jumeaux | Rancho Primicias',
          de: 'Tag 2 – Ankunft in Baltra | Zwillingskrater | Rancho Primicias',
          it: 'Giorno 2 – Arrivo a Baltra | Crateri Gemelli | Rancho Primicias',
          pt: 'Dia 2 – Chegada a Baltra | Crateras Gêmeas | Rancho Primicias',
          ja: '第2日 – バルトラ島到着 | 双子坑 | プリミシアス牧場',
          zh: '第2天 – 抵达巴尔特拉 | 双子坑 | 普里米西亚巨龟保护区'
        },
        description: {
          en: 'Private transfer from your Quito hotel to the airport for your flight to Seymour Airport on Baltra Island. Upon arrival, welcome by our representative. Cross the Itabaca Channel to Santa Cruz Island and ascend into the highlands to visit the majestic Twin Craters (Los Gemelos) within the Scalesia forest. Continue to Primicias Ranch to witness giant tortoises roaming freely in their natural habitat and walk through volcanic lava tunnels. Transfer to your Puerto Ayora hotel and enjoy the evening at leisure.',
          es: 'Traslado desde el hotel en Quito al aeropuerto y vuelo a Baltra. Recepción en el Aeropuerto Seymour y cruce del Canal de Itabaca hacia Santa Cruz. En las tierras altas visitamos los Cráteres Gemelos y el Rancho Primicias para observar tortugas gigantes en libertad y cruzar túneles de lava. Check-in en Puerto Ayora y tiempo libre.',
          fr: 'Transfert à l\'aéroport de Quito et vol vers Baltra. Accueil à l\'aéroport Seymour et traversée vers Santa Cruz. Dans les hauts plateaux, visite des Cratères Jumeaux et du Rancho Primicias pour observer les tortues géantes et explorer les tunnels de lave. Installation à l\'hôtel à Puerto Ayora.',
          de: 'Transfer zum Flughafen Quito und Flug nach Baltra. Begrüßung am Flughafen Seymour und Überfahrt nach Santa Cruz. Im Hochland Besuch der Zwillingskrater und der Primicias Ranch mit freilebenden Riesenschildkröten und Lavatunneln. Hotelbezug in Puerto Ayora.',
          it: 'Trasferimento all\'aeroporto di Quito e volo per Baltra. Arrivo e attraversamento per Santa Cruz. Visita ai Crateri Gemelli e al Rancho Primicias per ammirare le tartarughe giganti e i tunnel di lava. Check-in a Puerto Ayora.',
          pt: 'Traslado ao aeroporto de Quito e voo para Baltra. Chegada e travessia para Santa Cruz. Visita às Crateras Gêmeas e ao Rancho Primicias para ver tartarugas gigantes e túneis de lava. Check-in em Puerto Ayora.',
          ja: 'キト空港へ送迎しバルトラへフライト。イタバカ運河を渡りサンタクルス高地へ。双子坑とプリミシアス牧場で巨大ゾウガメと溶岩トンネルを見学。プエルトアヨラで宿泊。',
          zh: '送机飞往巴尔特拉，渡过海峡登上圣克鲁斯岛。游览火山双子坑并探访普里米西亚保护区观察自由漫步的象龟，徒步熔岩隧道。入住阿约拉港酒店。'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'According to selected hotel plan',
          es: 'Según plan hotelero seleccionado',
          fr: 'Selon plan hôtelier',
          de: 'Gemäß Hotelplan',
          it: 'Secondo piano alberghiero',
          pt: 'De acordo com o plano do hotel',
          ja: 'ホテルプランに準ずる',
          zh: '按所选酒店方案包含'
        },
        transportation: {
          en: 'Private airport transfer in Quito, flight, ferry & private island transport',
          es: 'Transfer privado en Quito, vuelo, ferry y transporte privado en isla',
          fr: 'Transfert privé à Quito, vol, ferry et transport terrestre privé',
          de: 'Privater Transfer in Quito, Flug, Fähre & privater Inseltransport',
          it: 'Trasferimento privato a Quito, volo, traghetto e trasporto privato',
          pt: 'Transfer privado em Quito, voo, balsa e transporte terrestre na ilha',
          ja: 'キト空港送迎、フライト、フェリー＆島内専用車',
          zh: '基多专车送机、国内航班、渡轮及岛上专车'
        },
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Santa Cruz To Isabela | Flamingo Lagoon | Tortoise Breeding Center | Tintoreras',
          es: 'Día 3 – Santa Cruz A Isabela | Laguna De Flamingos | Centro De Crianza | Tintoreras',
          fr: 'Jour 3 – De Santa Cruz à Isabela | Flamants Roses | Centre d\'Élevage | Tintoreras',
          de: 'Tag 3 – Von Santa Cruz nach Isabela | Flamingo-Lagune | Zuchtzentrum | Tintoreras',
          it: 'Giorno 3 – Da Santa Cruz a Isabela | Fenicotteri | Centro Riproduzione | Tintoreras',
          pt: 'Dia 3 – Santa Cruz a Isabela | Lagoa de Flamingos | Centro de Reprodução | Tintoreras',
          ja: '第3日 – サンタクルスからイサベラ島へ | フラミンゴラグーン | 繁殖センター | ティントレラス',
          zh: '第3天 – 圣克鲁斯至伊莎贝拉岛 | 火烈鸟泻湖 | 巨龟繁育中心 | 蒂恩托雷拉斯'
        },
        description: {
          en: 'After breakfast, speedboat transfer from Santa Cruz to Isabela Island (approx 2 to 2.5 hours). Upon arrival in Puerto Villamil, visit the Flamingo Lagoon wetland and the Giant Tortoise Breeding Center. In the afternoon, boat trip to Tintoreras Islet for incredible snorkeling with sea lions, marine iguanas, rays, sea turtles, and penguins. Overnight in Puerto Villamil.',
          es: 'Lancha rápida a Isla Isabela (2 a 2.5 h). En Puerto Villamil visitamos la Laguna de Flamingos y el Centro de Crianza de Tortugas Gigantes. Por la tarde, navegación al Islote Tintoreras para snorkel con lobos marinos, tortugas marinas, rayas, pingüinos e iguanas marinas. Pernocte en Isabela.',
          fr: 'Bateau rapide vers l\'île Isabela. À Puerto Villamil, visite de la lagune des flamants roses et du centre d\'élevage des tortues. L\'après-midi, navigation vers l\'îlot Tintoreras pour un snorkeling exceptionnel avec otaries, tortues et raies. Nuit à Isabela.',
          de: 'Schnellbootfahrt nach Isabela. Besuch der Flamingo-Lagune und des Schildkrötenzuchtzentrums. Nachmittags Bootstour zu den Tintoreras-Inseln zum Schnorcheln mit Seelöwen, Meeresschildkröten und Pinguinen. Übernachtung auf Isabela.',
          it: 'Motoscafo verso Isabela. Visita alla Laguna dei Fenicotteri e al Centro Riproduzione Tartarughe. Nel pomeriggio escursione a Tintoreras per snorkeling con leoni marini, tartarughe e mante. Pernottamento a Isabela.',
          pt: 'Lancha rápida para a Ilha Isabela. Visita à Lagoa de Flamingos e ao Centro de Reprodução de Tartarugas. À tarde, excursão a Tintoreras para snorkel com leões-marinhos, tartarugas e arraias. Pernoite em Isabela.',
          ja: 'スピードボートでイサベラ島へ。フラミンゴラグーンとゾウガメ繁殖センターを訪問。午後はティントレラスへボートで渡りアシカやウミガメとシュノーケリング。イサベラ島泊。',
          zh: '乘快艇赴伊莎贝拉岛。探访火烈鸟泻湖与巨龟繁殖中心。午后乘船至蒂恩托雷拉斯石礁浮潜，与海狮、海龟、蝠鲼及企鹅同游。入住伊莎贝拉岛客栈。'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: {
          en: 'Isabela Island – Puerto Villamil (Hostal Tintorera)',
          es: 'Isla Isabela – Puerto Villamil (Hostal Tintorera)',
          fr: 'Île Isabela – Puerto Villamil (Hostal Tintorera)',
          de: 'Insel Isabela – Puerto Villamil (Hostal Tintorera)',
          it: 'Isola Isabela – Puerto Villamil (Hostal Tintorera)',
          pt: 'Ilha Isabela – Puerto Villamil (Hostal Tintorera)',
          ja: 'イサベラ島 – プエルト・ビジャミル（オスタル・ティントレラ）',
          zh: '伊莎贝拉岛 – 维利亚米尔港（廷托雷拉客栈）'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Inter-island speedboat and local land transport',
          es: 'Lancha rápida interislas y transporte terrestre local',
          fr: 'Bateau rapide inter-îles et transport local',
          de: 'Schnellboot & lokaler Landtransport',
          it: 'Motoscafo interisola e trasporto locale',
          pt: 'Lancha rápida interilhas e transporte local',
          ja: '島間スピードボート＆現地移動',
          zh: '城际快艇与岛上观光交通'
        },
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Isabela To Santa Cruz | La Lobería | Las Grietas',
          es: 'Día 4 – Isabela A Santa Cruz | La Lobería | Las Grietas',
          fr: 'Jour 4 – D\'Isabela à Santa Cruz | La Lobería | Las Grietas',
          de: 'Tag 4 – Von Isabela nach Santa Cruz | La Lobería | Las Grietas',
          it: 'Giorno 4 – Da Isabela a Santa Cruz | La Lobería | Las Grietas',
          pt: 'Dia 4 – Isabela a Santa Cruz | La Lobería | Las Grietas',
          ja: '第4日 – イサベラ島からサンタクルスへ | ラ・ロベリア | ラス・グリエタス',
          zh: '第4天 – 伊莎贝拉岛返回圣克鲁斯 | 拉洛贝里亚 | 拉斯格里塔斯'
        },
        description: {
          en: 'Morning boat transfer back to Santa Cruz Island. Visit La Lobería coastal sanctuary to observe playful sea lions. Continue to Las Grietas volcanic canyon for swimming and snorkeling in transparent turquoise water. Afternoon at leisure in Puerto Ayora.',
          es: 'Lancha rápida de retorno a Santa Cruz. Visita a La Lobería para observar lobos marinos y caminata a Las Grietas para nadar y hacer snorkel en el cañón volcánico. Tarde libre en Puerto Ayora.',
          fr: 'Retour en bateau à Santa Cruz. Visite de La Lobería et baignade/snorkeling dans le spectaculaire canyon volcanique de Las Grietas. Après-midi libre à Puerto Ayora.',
          de: 'Rückfahrt per Boot nach Santa Cruz. Besuch von La Lobería und Schwimmen/Schnorcheln in der Vulkanschlucht Las Grietas. Freier Nachmittag in Puerto Ayora.',
          it: 'Rientro in barca a Santa Cruz. Visita a La Lobería e nuoto/snorkeling nello spettacolare canyon di Las Grietas. Pomeriggio libero a Puerto Ayora.',
          pt: 'Retorno em lancha a Santa Cruz. Visita a La Lobería e banho/snorkel no cânion vulcânico de Las Grietas. Tarde livre em Puerto Ayora.',
          ja: 'ボートでサンタクルス島へ帰還。ラ・ロベリアのアシカを観察し、ラス・グリエタスでスイミング＆シュノーケリング。プエルトアヨラで自由行動。',
          zh: '快艇返回圣克鲁斯岛。游览拉洛贝里亚海狮滩，深入拉斯格里塔斯火山峡谷纯净水域游泳浮潜。下午自由活动。'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Inter-island speedboat and local walking trails',
          es: 'Lancha rápida interislas y senderos locales',
          fr: 'Bateau rapide et sentiers côtiers',
          de: 'Schnellboot & Wanderpfade',
          it: 'Motoscafo e percorsi a piedi',
          pt: 'Lancha rápida e trilhas locais',
          ja: '島間スピードボート＆徒歩トレイル',
          zh: '城际快艇与步行步道'
        },
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Full-Day Navigable Yacht Excursion To Santa Fe Or Pinzón Island',
          es: 'Día 5 – Excursión Full-Day En Yate A Isla Santa Fe O Isla Pinzón',
          fr: 'Jour 5 – Excursion Journée en Yacht à l\'Île Santa Fe ou Pinzón',
          de: 'Tag 5 – Ganztägiger Yachtausflug zur Insel Santa Fe oder Pinzón',
          it: 'Giorno 5 – Escursione Giornata Intera in Yacht a Santa Fe o Pinzón',
          pt: 'Dia 5 – Excursão Dia Inteiro em Iate para Santa Fe ou Pinzón',
          ja: '第5日 – サンタフェ島またはピンソン島への終日ヨットクルーズ',
          zh: '第5天 – 圣菲岛或平松岛全天出海游艇航海与浮潜'
        },
        description: {
          en: 'Full-day boat excursion to Santa Fe Island or Pinzón Island (depending on availability and conditions). Enjoy turquoise bays, endemic land iguanas at Santa Fe, or deep-water snorkeling at Pinzón with sea turtles, sharks, rays, and sea lions. Fresh lunch served on board.',
          es: 'Navegación de día completo en yate hacia Isla Santa Fe o Isla Pinzón. En Santa Fe disfrutará de bahías turquesas, iguanas terrestres y rica vida marina. En Pinzón, aguas profundas con tortugas marinas, tiburones y mantarrayas. Almuerzo a bordo incluido.',
          fr: 'Excursion en yacht d\'une journée à l\'île Santa Fe ou Pinzón. Baies turquoise, iguanes terrestres à Santa Fe, ou snorkeling profond à Pinzón avec tortues, requins et raies. Déjeuner à bord inclus.',
          de: 'Ganztägige Yachtfahrt zur Insel Santa Fe oder Pinzón. Türkisblaue Buchten, endemische Landleguane auf Santa Fe oder Hochsee-Schnorcheln bei Pinzón mit Haien, Schildkröten und Rochen. Mittagessen an Bord.',
          it: 'Navigazione di una giornata in yacht a Santa Fe o Pinzón. Acque turchesi, iguane terrestri o snorkeling profondo con squali, tartarughe e mante. Pranzo a bordo incluso.',
          pt: 'Navegação de dia inteiro em iate para Santa Fe ou Pinzón. Baias turquesas, iguanas terrestres ou snorkel profundo com tubarões, tartarugas e arraias. Almoço a bordo incluído.',
          ja: 'サンタフェ島またはピンソン島への終日ヨットクルーズ。エメラルドの海でのシュノーケリングでウミガメ、サメ、エイ、アシカと遭遇。船上でのランチ付き。',
          zh: '全天乘游艇出海探访圣菲岛或平松岛。在绿松石般的清澈海湾探寻特有陆鬣蜥，或在深水区浮潜邂逅海龟、白顶礁鲨、蝠鲼与海狮。含游艇甲板午餐。'
        },
        image: '/images/tours/16-9/santa-fe-island-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-déjeuner et déjeuner',
          de: 'Frühstück und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'Café da manhã e almoço',
          ja: '朝食・昼食付き',
          zh: '包含早餐与午餐'
        },
        transportation: {
          en: 'Navigable tourist yacht and island ground transfers',
          es: 'Yate turístico navegable y transporte terrestre',
          fr: 'Yacht touristique navigable et transferts terrestres',
          de: 'Touristisches Yachtschiff & Landtransport',
          it: 'Yacht turistico e trasporto a terra',
          pt: 'Iate turístico navegável e transporte terrestre',
          ja: '観光ヨットクルーズ船＆陸上送迎',
          zh: '出海观光游艇与陆地接送'
        },
        activity: {
          en: 'Open-water yacht navigation, deep-water snorkeling & hiking',
          es: 'Navegación en yate, snorkel en aguas abiertas y caminata',
          fr: 'Navigation en yacht, snorkeling en eau profonde et randonnée',
          de: 'Yachtfahrt, Tiefwasserschnorcheln & Wanderung',
          it: 'Navigazione in yacht, snorkeling e trekking',
          pt: 'Navegação em iate, snorkel em mar aberto e caminhada',
          ja: 'ヨットクルーズ、外洋シュノーケリング＆ハイキング',
          zh: '游艇航行、外海深度浮潜与生态徒步'
        },
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Transfer To Baltra Airport | Flight To Quito | Private Hotel Transfer',
          es: 'Día 6 – Traslado Al Aeropuerto De Baltra | Vuelo A Quito | Transfer Privado Al Hotel',
          fr: 'Jour 6 – Transfert à l\'Aéroport de Baltra | Vol vers Quito | Transfert Privé Hôtel',
          de: 'Tag 6 – Transfer zum Flughafen Baltra | Flug nach Quito | Privater Hoteltransfer',
          it: 'Giorno 6 – Trasferimento all\'Aeroporto di Baltra | Volo per Quito | Transfer Privato in Hotel',
          pt: 'Dia 6 – Traslado ao Aeroporto de Baltra | Voo para Quito | Transfer Privado ao Hotel',
          ja: '第6日 – バルトラ空港へ送迎 | キト行きフライト | ホテル専用送迎',
          zh: '第6天 – 前往巴尔特拉机场 | 飞往基多 | 专车接机入住酒店'
        },
        description: {
          en: 'After breakfast, check out and transfer to Baltra Airport for your flight back to mainland Ecuador. Private transfer from Quito Airport to your hotel. Evening at leisure.',
          es: 'Desayuno, check-out y traslado al Aeropuerto Seymour de Baltra para tomar el vuelo a Quito. Recepción y traslado privado a su hotel en Quito. Tarde y noche libre.',
          fr: 'Petit-déjeuner et transfert à l\'aéroport de Baltra pour le vol retour vers Quito. Accueil et transfert privé à l\'hôtel.',
          de: 'Nach dem Frühstück Fahrt zum Flughafen Baltra und Flug nach Quito. Privater Transfer zum Hotel.',
          it: 'Colazione e trasferimento all\'aeroporto di Baltra per il volo verso Quito. Trasferimento privato in hotel.',
          pt: 'Café da manhã e traslado ao Aeroporto de Baltra para voo rumo a Quito. Traslado privado para o hotel.',
          ja: '朝食後バルトラ空港へ移動しキト行きフライトに搭乗。キト到着後専用車でホテルへ。',
          zh: '早餐后送机至巴尔特拉机场飞往基多，抵达后专车接机送往酒店休息。'
        },
        image: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3★ or 4★)',
          es: 'Hotel en Quito (Categoría seleccionada 3★ o 4★)',
          fr: 'Hôtel à Quito (Catégorie 3★ ou 4★)',
          de: 'Hotel in Quito (Kategorie 3★ oder 4★)',
          it: 'Hotel a Quito (Categoria 3★ o 4★)',
          pt: 'Hotel em Quito (Categoria 3★ ou 4★)',
          ja: 'キト市内の厳選ホテル（3★または4★）',
          zh: '基多精选酒店（3星级或4星级）'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Island ground transfer, Baltra shuttle, domestic flight & private Quito transfer',
          es: 'Transporte en isla, bus Lobito, vuelo doméstico y traslado privado en Quito',
          fr: 'Transport terrestre sur l\'île, navette aéroport, vol intérieur et transfert privé à Quito',
          de: 'Insel-Transfer, Shuttlebus, Inlandsflug & privater Transfer in Quito',
          it: 'Trasferimento sull\'isola, navetta, volo nazionale e transfer privato a Quito',
          pt: 'Transporte na ilha, ônibus shuttle, voo doméstico e traslado privado em Quito',
          ja: '島内陸上送迎、空港シャトル、国内線フライト＆キト市内専用送迎',
          zh: '岛上陆路接驳、机场专线巴士、国内航班及基多市内专车'
        },
      },
      {
        day: 7,
        title: {
          en: 'Day 7 – Private Quito Airport Transfer | Onward Connections',
          es: 'Día 7 – Traslado Privado Al Aeropuerto De Quito | Vuelo Internacional',
          fr: 'Jour 7 – Transfert Privé vers l\'Aéroport de Quito | Connexions Internationales',
          de: 'Tag 7 – Privater Transfer zum Flughafen Quito | Weiterflug',
          it: 'Giorno 7 – Trasferimento Privato all\'Aeroporto di Quito | Volo di Rientro',
          pt: 'Dia 7 – Traslado Privado ao Aeroporto de Quito | Conexões Internacionais',
          ja: '第7日 – キト空港専用送迎 | 帰国の途へ',
          zh: '第7天 – 基多机场私人专车送机 | 踏上归途'
        },
        description: {
          en: 'Private transfer from your hotel to Quito International Airport for your international departure flight. End of our services.',
          es: 'Traslado privado exclusivo desde su hotel hacia el Aeropuerto Internacional de Quito para su vuelo internacional. Fin de servicios.',
          fr: 'Transfert privé de votre hôtel vers l\'aéroport de Quito pour votre vol de retour international. Fin de nos services.',
          de: 'Privater Transfer vom Hotel zum Flughafen Quito für Ihren internationalen Rückflug. Ende unserer Leistungen.',
          it: 'Trasferimento privato dall\'hotel all\'Aeroporto di Quito per il volo internazionale. Fine dei nostri servizi.',
          pt: 'Traslado privado do hotel ao Aeroporto de Quito para embarque internacional. Fim dos serviços.',
          ja: 'フライト時刻に合わせてホテルからキト国際空港へ専用送迎。サービス終了となります。',
          zh: '根据国际航班起飞时间专车送抵基多国际机场，结束难忘的加拉帕戈斯探索之旅。'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Private transportation to Quito International Airport',
          es: 'Transporte privado al Aeropuerto Internacional de Quito',
          fr: 'Transport privé vers l\'aéroport de Quito',
          de: 'Privater Transport zum Flughafen Quito',
          it: 'Trasporto privato per l\'aeroporto di Quito',
          pt: 'Transporte privado para o Aeroporto de Quito',
          ja: 'キト国際空港への専用送迎車',
          zh: '基多国际机场私人专车送机'
        },
      }
    ]
  },

  // Tour: galapagos-8days
  {
    id: 'galapagos-8days',
    code: '1.3',
    title: {
      en: 'Galapagos Grand Odyssey: 8-Day 3-Island Expedition (With Quito Transfers)',
      es: 'Gran Odisea Galápagos: 8 Días y 3 Islas (Con Transfers UIO)',
      fr: 'Grande Odyssée aux Galápagos: 8 Jours et 3 Îles (Transferts UIO Inclus)',
      de: 'Galapagos Grand Odyssee: 8 Tage & 3 Inseln (Inkl. Quito-Transfers)',
      it: 'Grande Odissea alle Galapagos: 8 Giorni e 3 Isole (Con Trasferimenti UIO)',
      pt: 'Grande Odisseia em Galápagos: 8 Dias e 3 Ilhas (Com Transfers UIO)',
      ja: 'ガラパゴス諸島 壮大なオデッセイ：8日間 3島巡礼（キト送迎付き）',
      zh: '加拉帕戈斯盛大史诗：8日三岛大跨越（含基多接送机）'
    },
    destination: 'Galapagos',
    duration: {
      en: '8 DAYS / 7 NIGHTS',
      es: '8 DÍAS / 7 NOCHES',
      fr: '8 JOURS / 7 NUITS',
      de: '8 TAGE / 7 NÄCHTE',
      it: '8 GIORNI / 7 NOTTI',
      pt: '8 DIAS / 7 NOITES',
      ja: '8日間 / 7泊',
      zh: '8天 / 7晚'
    },
    durationDays: 8,
    price: 2200,
    price3Star: 2200,
    price4Star: 2600,
    imageUrl: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
    mobileImage: '/images/tours/9-16/tijeretas-hill-9-16.webp',
    desktopImage: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
    gallery: [
      '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
      '/images/tours/16-9/isabela-island-16-9.webp',
      '/images/tours/16-9/galapagos-tintoreras16-9.webp',
      '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
      '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.1.webp',
      '/images/tours/16-9/santa-fe-island-16-9.webp',
      '/images/tours/16-9/galapagos-lobo-marino-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 42,
    isPopular: true,
    category: {
      en: 'Triple Island Discovery & Yacht Cruise',
      es: 'Descubrimiento Triple Isla y Navegación en Yate',
      fr: 'Découverte de trois îles et navigation en yacht',
      de: 'Drei-Inseln-Entdeckung & Yacht-Kreuzfahrt',
      it: 'Scoperta di Tre Isole e Crociera in Yacht',
      pt: 'Descoberta de Três Ilhas e Cruzeiro em Iate',
      ja: '3島巡礼＆専用ヨットクルーズ',
      zh: '三岛深度探索与尊享游艇巡航'
    },
    description: {
      en: 'The ultimate 8-day expedition across 3 major islands (Santa Cruz, Isabela, and San Cristóbal) combined with private Quito airport transfers. Discover giant tortoises, Tintoreras Islet, Las Grietas, full-day yacht snorkeling at Santa Fe or Pinzón, and San Cristóbal’s Interpretation Center, Tijeretas Hill and La Lobería.',
      es: 'La expedición definitiva de 8 días a través de 3 islas principales (Santa Cruz, Isabela y San Cristóbal) con traslados privados en Quito. Tortugas gigantes, Islote Tintoreras, Las Grietas, navegación en yate a Santa Fe o Pinzón, Centro de Interpretación, Cerro Tijeretas y La Lobería.',
      fr: 'L\'expédition ultime de 8 jours à travers 3 îles majeures (Santa Cruz, Isabela et San Cristóbal) avec transferts privés à Quito. Tortues géantes, îlot Tintoreras, Las Grietas, yacht vers Santa Fe ou Pinzón, Centre d\'interprétation, Cerro Tijeretas et La Lobería.',
      de: 'Die ultimative 8-tägige Expedition über 3 Hauptinseln (Santa Cruz, Isabela und San Cristóbal) mit privaten Quito-Transfers. Riesenschildkröten, Tintoreras, Las Grietas, Yachtkreuzfahrt nach Santa Fe oder Pinzón, Interpretationszentrum und Tijeretas-Hügel.',
      it: 'L\'espedizione definitiva di 8 giorni attraverso 3 isole principali (Santa Cruz, Isabela e San Cristóbal) con trasferimenti privati a Quito. Tartarughe giganti, isolotto Tintoreras, Las Grietas, yacht a Santa Fe o Pinzón, Centro di Interpretazione e Cerro Tijeretas.',
      pt: 'A expedição definitiva de 8 dias através de 3 ilhas principais (Santa Cruz, Isabela e San Cristóbal) com traslados privados em Quito. Tartarugas gigantes, Ilhote Tintoreras, Las Grietas, iate para Santa Fe ou Pinzón, Centro de Interpretação e Cerro Tijeretas.',
      ja: 'キトの専用送迎に加え、サンタクルス、イサベラ、サンクリストバルの主要3島を網羅する究極の8日間。野生ゾウガメ、ティントレラスの溶岩水路、ラス・グリエタス、サンタフェまたはピンソン島への終日ヨット、サンクリストバル島の解説センター、ティヘレタスの丘、ラ・ロベリアを探訪。',
      zh: '跨越三座主要岛屿（圣克鲁斯岛、伊莎贝拉岛和圣克里斯托巴尔岛）的8日终极探险，配备基多私人机场接送：探秘高地野生巨龟、蒂恩托雷拉斯石礁浮潜、拉斯格里塔斯峡谷、圣菲/平松全天出海游艇巡航，以及圣克里斯托巴尔岛解读中心、军舰鸟丘与拉洛贝里亚海狮沙滩。'
    },
    highlights: [
      {
        en: 'Private Quito Airport Transfers (Arrival & Departure)',
        es: 'Traslados Privados Aeropuerto Quito (Llegada y Salida)',
        fr: 'Transferts Privés Aéroport de Quito (Arrivée et Départ)',
        de: 'Private Quito-Flughafentransfers (Ankunft & Abreise)',
        it: 'Trasferimenti Privati Aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados Privados Aeroporto de Quito (Chegada e Partida)',
        ja: 'キト空港専用往復送迎（到着＆出発）',
        zh: '基多国际机场私人专车接送（抵达与离境）'
      },
      {
        en: 'Twin Craters & Primicias Giant Tortoise Reserve',
        es: 'Cráteres Gemelos y Rancho Primicias en Santa Cruz',
        fr: 'Cratères Jumeaux et Réserve de Tortues Primicias',
        de: 'Zwillingskrater & Primicias-Riesenschildkröten-Farm',
        it: 'Crateri Gemelli e Riserva Tartarughe Primicias',
        pt: 'Crateras Gêmeas e Rancho de Tartarugas Primicias',
        ja: '双子坑＆サンタクルス島プリミシアス巨亀保護区',
        zh: '双子坑与圣克鲁斯普里米西亚巨龟生态保护区'
      },
      {
        en: 'Isabela Island Overnight, Flamingo Lagoon & Tintoreras',
        es: 'Noche en Isla Isabela, Laguna de Flamingos y Tintoreras',
        fr: 'Nuit sur l\'île Isabela, Flamants Roses & Tintoreras',
        de: 'Übernachtung auf Isabela, Flamingo-Lagune & Tintoreras',
        it: 'Pernottamento a Isabela, Fenicotteri e Tintoreras',
        pt: 'Pernoite na Ilha Isabela, Lagoa de Flamingos e Tintoreras',
        ja: 'イサベラ島宿泊、フラミンゴラグーン＆ティントレラス',
        zh: '伊莎贝拉岛过夜、火烈鸟泻湖与蒂恩托雷拉斯浮潜'
      },
      {
        en: 'Full-Day Navigable Yacht Cruise to Santa Fe or Pinzón Island',
        es: 'Navegación Full-Day en Yate a Isla Santa Fe o Pinzón',
        fr: 'Croisière d\'une Journée en Yacht à Santa Fe ou Pinzón',
        de: 'Ganztägige Yacht-Kreuzfahrt nach Santa Fe oder Pinzón',
        it: 'Crociera in Yacht di un\'intera Giornata a Santa Fe o Pinzón',
        pt: 'Cruzeiro de Dia Inteiro em Iate para Santa Fe ou Pinzón',
        ja: 'サンタフェ島またはピンソン島への終日ヨットクルーズ',
        zh: '圣菲岛或平松岛全天出海游艇航行与浮潜'
      },
      {
        en: 'San Cristóbal Island: Interpretation Center, Tijeretas Hill & La Lobería',
        es: 'Isla San Cristóbal: Centro de Interpretación, Cerro Tijeretas y La Lobería',
        fr: 'Île San Cristóbal: Centre d\'Interprétation, Tijeretas et La Lobería',
        de: 'Insel San Cristóbal: Interpretationszentrum, Tijeretas & La Lobería',
        it: 'Isola San Cristóbal: Centro Interpretazione, Tijeretas e La Lobería',
        pt: 'Ilha San Cristóbal: Centro de Interpretação, Cerro Tijeretas e La Lobería',
        ja: 'サンクリストバル島：解説センター、ティヘレタスの丘＆ラ・ロベリア',
        zh: '圣克里斯托巴尔岛：自然人类解读中心、军舰鸟丘与拉洛贝里亚海滩'
      }
    ],
    inclusions: [
      {
        en: 'Accommodation at the hotel of your choice in Santa Cruz (3★ or 4★)',
        es: 'Alojamiento en el hotel seleccionado en Santa Cruz (3★ o 4★)',
        fr: 'Hébergement à l\'hôtel de votre choix à Santa Cruz (3★ ou 4★)',
        de: 'Unterkunft im gewählten Hotel auf Santa Cruz (3★ oder 4★)',
        it: 'Sistemazione nell\'hotel prescelto a Santa Cruz (3★ o 4★)',
        pt: 'Hospedagem no hotel de sua escolha em Santa Cruz (3★ ou 4★)',
        ja: 'サンタクルス島の厳選ホテル宿泊（3★または4★）',
        zh: '圣克鲁斯岛自选精品酒店住宿（3星级或4星级）'
      },
      {
        en: 'Accommodation at Hostal Tintorera in Isabela Island',
        es: 'Alojamiento en Hostal Tintorera en Isla Isabela',
        fr: 'Hébergement à l\'Hostal Tintorera sur l\'île Isabela',
        de: 'Unterkunft im Hostal Tintorera auf der Insel Isabela',
        it: 'Sistemazione presso Hostal Tintorera sull\'isola Isabela',
        pt: 'Hospedagem no Hostal Tintorera na Ilha Isabela',
        ja: 'イサベラ島のオスタル・ティントレラ宿泊',
        zh: '伊莎贝拉岛廷托雷拉客栈住宿'
      },
      {
        en: 'Accommodation at Hotel Algarrobos in San Cristóbal Island',
        es: 'Alojamiento en Hotel Algarrobos en Isla San Cristóbal',
        fr: 'Hébergement à l\'Hôtel Algarrobos sur l\'île San Cristóbal',
        de: 'Unterkunft im Hotel Algarrobos auf der Insel San Cristóbal',
        it: 'Sistemazione presso Hotel Algarrobos sull\'isola San Cristóbal',
        pt: 'Hospedagem no Hotel Algarrobos na Ilha San Cristóbal',
        ja: 'サンクリストバル島のホテル・アルガロボス宿泊',
        zh: '圣克里斯托巴尔岛阿尔加罗博斯酒店住宿'
      },
      {
        en: 'Private airport transfers in Quito (Arrival & Departure)',
        es: 'Traslados privados en aeropuerto de Quito (Llegada y Salida)',
        fr: 'Transferts privés aéroport de Quito (Arrivée et Départ)',
        de: 'Private Flughafentransfers in Quito (Ankunft & Abreise)',
        it: 'Trasferimenti privati aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados privados no aeroporto de Quito (Chegada e Partida)',
        ja: 'キト空港専用プライベート送迎（到着＆出発）',
        zh: '基多国际机场私人专车接送（抵达与出发）'
      },
      {
        en: 'Buffet breakfast at 4★ hotels / Continental breakfast at 3★ hotels',
        es: 'Desayuno buffet en hoteles 4★ / Desayuno continental en hoteles 3★',
        fr: 'Petit-déjeuner buffet en hôtel 4★ / continental en hôtel 3★',
        de: 'Frühstücksbuffet in 4★-Hotels / Kontinentales Frühstück in 3★-Hotels',
        it: 'Colazione a buffet in hotel 4★ / Continentale in hotel 3★',
        pt: 'Café da manhã buffet em hotéis 4★ / Continental em hotéis 3★',
        ja: '4★ホテルのビュッフェ朝食 / 3★ホテルのコンチネンタル朝食',
        zh: '4星级酒店自助早餐 / 3星级酒店欧陆式早餐'
      },
      {
        en: 'Set-menu lunches according to the itinerary',
        es: 'Almuerzos menú incluidos según el itinerario',
        fr: 'Déjeuners avec menu préétabli selon l\'itinéraire',
        de: 'Mittagessen mit festem Menü gemäß Reiseroute',
        it: 'Pranzi con menu fisso secondo l\'itinerario',
        pt: 'Almoços com cardápio fixo de acordo com o itinerário',
        ja: '旅程に応じたセットメニューの昼食',
        zh: '行程中规划的指定套餐午餐'
      },
      {
        en: 'Domestic Flight Ticket (Quito – Baltra / San Cristóbal – Quito)',
        es: 'Boleto aéreo doméstico (Quito – Baltra / San Cristóbal – Quito)',
        fr: 'Billet d\'avion intérieur (Quito – Baltra / San Cristóbal – Quito)',
        de: 'Inlandsflugticket (Quito – Baltra / San Cristóbal – Quito)',
        it: 'Biglietto aereo nazionale (Quito – Baltra / San Cristóbal – Quito)',
        pt: 'Passagem aérea doméstica (Quito – Baltra / San Cristóbal – Quito)',
        ja: '国内線オープンジョー航空券（キト – バルトラ / サンクリストバル – キト）',
        zh: '厄瓜多尔境内缺口往返机票（基多 – 巴尔特拉 / 圣克里斯托巴尔 – 基多）'
      },
      {
        en: 'All guided visits to the islands according to the itinerary',
        es: 'Todas las visitas guiadas a las islas según el itinerario',
        fr: 'Toutes les visites guidées des îles selon l\'itinéraire',
        de: 'Alle geführten Inselbesuche gemäß Reiseroute',
        it: 'Tutte le visite guidate alle isole secondo l\'itinerario',
        pt: 'Todas as visitas guiadas às ilhas de acordo com o itinerário',
        ja: '旅程に記載されたすべてのガイド付き島内観光',
        zh: '行程规划的所有受保护海岛导览游览'
      },
      {
        en: 'Airport reception and departure assistance at Galápagos airports',
        es: 'Recepción y asistencia en aeropuertos de Galápagos',
        fr: 'Accueil et assistance aux aéroports des Galápagos',
        de: 'Flughafenempfang und Abreisebetreuung auf Galápagos',
        it: 'Accoglienza e assistenza negli aeroporti delle Galapagos',
        pt: 'Recepção e assistência nos aeroportos de Galápagos',
        ja: 'ガラパゴス諸島空港での到着出迎えおよび出発サポート',
        zh: '加拉帕戈斯各机场抵达专员接机与出发协助'
      },
      {
        en: 'Comprehensive land and maritime transportation',
        es: 'Transporte terrestre y marítimo integral',
        fr: 'Transport terrestre et maritime complet',
        de: 'Umfassender Land- und Seetransport',
        it: 'Trasporto terrestre e marittimo completo',
        pt: 'Transporte terrestre e marítimo completo',
        ja: '全行程における陸上および海上移動交通',
        zh: '全程专车陆路与快艇海上交通'
      },
      {
        en: 'Level III Certified Naturalist Guides (Spanish / English)',
        es: 'Guías naturalistas certificados Nivel III (Español / Inglés)',
        fr: 'Guides naturalistes certifiés de niveau III (Espagnol / Anglais)',
        de: 'Zertifizierte Naturführer der Stufe III (Spanisch / Englisch)',
        it: 'Guide naturalistiche certificate di Livello III (Spagnolo / Inglese)',
        pt: 'Guias naturalistas certificados Nível III (Espanhol / Inglês)',
        ja: 'レベルIII認定ナチュラリストガイド（英語・スペイン語）',
        zh: '三级国家认证资深自然向导（英语/西班牙语）'
      },
      {
        en: 'Snorkeling equipment for boat excursions (mask and snorkel)',
        es: 'Equipo de snorkel para excursiones en barco (máscara y tubo)',
        fr: 'Équipement de snorkeling pour les excursions en bateau (masque et tuba)',
        de: 'Schnorchelausrüstung für Bootstouren (Maske und Schnorchel)',
        it: 'Attrezzatura da snorkeling per escursioni in barca (maschera e boccaglio)',
        pt: 'Equipamento de snorkel para excursões de barco (máscara e snorkel)',
        ja: 'ボートツアー用シュノーケリング装備（マスク＆スノーケル）',
        zh: '游艇出海探险高品质浮潜装备（面镜和呼吸管）'
      },
      {
        en: 'Safety lockers available at hotel reception',
        es: 'Casilleros de seguridad disponibles en la recepción del hotel',
        fr: 'Coffres-forts disponibles à la réception de l\'hôtel',
        de: 'Sicherheitsschließfächer an der Hotelrezeption verfügbar',
        it: 'Cassette di sicurezza alla reception dell\'hotel',
        pt: 'Cofres de segurança na recepção do hotel',
        ja: 'ホテルフロントのセーフティボックス利用可能',
        zh: '酒店前台免费提供安全保险箱服务'
      },
      {
        en: 'Lobito Airport Shuttle Bus: Airport – Itabaca Channel – Airport',
        es: 'Autobús Lobito: Aeropuerto – Canal de Itabaca – Aeropuerto',
        fr: 'Navette aéroport Lobito: Aéroport – Canal d\'Itabaca – Aéroport',
        de: 'Lobito Flughafen-Shuttlebus: Flughafen – Itabaca-Kanal – Flughafen',
        it: 'Bus navetta Lobito: Aeroporto – Canale di Itabaca – Aeroporto',
        pt: 'Ônibus shuttle Lobito: Aeroporto – Canal de Itabaca – Aeroporto',
        ja: 'ロビト空港シャトルバス：空港 – イタバカ運河 – 空港',
        zh: 'Lobito机场穿梭接驳巴士：机场 – 伊塔巴卡运河 – 机场'
      },
      {
        en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors',
        es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros',
        fr: 'Taxe de quai d\'Isabela: 5,00 USD nationaux / 10,00 USD étrangers',
        de: 'Isabela-Dockgebühr: USD 5,00 für Ecuadorianer / USD 10,00 für Ausländer',
        it: 'Tassa portuale di Isabela: 5,00 USD ecuadoriani / 10,00 USD stranieri',
        pt: 'Taxa de cais de Isabela: USD 5,00 nacionais / USD 10,00 estrangeiros',
        ja: 'イサベラ島入港税：エクアドル国籍 USD 5.00 / 外国人 USD 10.00',
        zh: '伊莎贝拉岛码头税：厄瓜多尔公民 5 美元 / 外国游客 10 美元'
      }
    ],
    exclusions: [
      {
        en: 'Galápagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors',
        es: 'Entrada al Parque Nacional Galápagos: USD 6.00 nacionales / USD 200.00 extranjeros',
        fr: 'Entrée au Parc National des Galápagos: 6,00 USD nationaux / 200,00 USD étrangers',
        de: 'Eintrittsgebühr für den Galapagos-Nationalpark: USD 6,00 für Ecuadorianer / USD 200,00 für Ausländer',
        it: 'Ingresso al Parco Nazionale delle Galapagos: 6,00 USD ecuadoriani / 200,00 USD stranieri',
        pt: 'Entrada no Parque Nacional Galápagos: USD 6,00 nacionais / USD 200,00 estrangeiros',
        ja: 'ガラパゴス国立公園入場料：エクアドル国籍 USD 6.00 / 外国人 USD 200.00',
        zh: '加拉帕戈斯国家公园入园费：厄瓜多尔公民 6 美元 / 外国游客 200 美元'
      },
      {
        en: 'Dinners (to give you freedom to enjoy local gastronomy)',
        es: 'Cenas (libertad para explorar la gastronomía local)',
        fr: 'Dîners (pour vous laisser libre de découvrir la gastronomie locale)',
        de: 'Abendessen (Freiheit zur Entdeckung der lokalen Gastronomie)',
        it: 'Cene (libertà di esplorare la gastronomia locale)',
        pt: 'Jantares (liberdade para desfrutar da gastronomia local)',
        ja: '夕食（地元のグルメを自由にお楽しみいただけます）',
        zh: '晚餐（留白时间自由品味当地特色海鲜与美馔）'
      },
      {
        en: 'Transit Control Card (TCT): USD 20.00 per person',
        es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00 por persona',
        fr: 'Carte de Contrôle de Transit (TCT): 20,00 USD par personne',
        de: 'Transit Control Card (TCT): USD 20,00 pro Person',
        it: 'Carta di Controllo del Transito (TCT): 20,00 USD a persona',
        pt: 'Cartão de Controle de Trânsito (TCT): USD 20,00 por pessoa',
        ja: 'トランジットコントロールカード（TCT）：お一人様 USD 20.00',
        zh: '加拉帕戈斯通行控制卡（TCT）：每人 20 美元'
      },
      {
        en: 'Services not specified in the program & personal expenses',
        es: 'Servicios no especificados en el programa y gastos personales',
        fr: 'Services non spécifiés dans le programme et dépenses personnelles',
        de: 'Nicht im Programm aufgeführte Leistungen & persönliche Ausgaben',
        it: 'Servizi non specificati nel programma e spese personali',
        pt: 'Serviços não especificados no programa e despesas pessoais',
        ja: 'プログラムに明記されていないサービスおよび個人的な費用',
        zh: '行程未提及的额外消费及私人支出'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito | Private Airport Transfer',
          es: 'Día 1 – Llegada A Quito | Traslado Privado De Aeropuerto',
          fr: 'Jour 1 – Arrivée à Quito | Transfert Privé Aéroport',
          de: 'Tag 1 – Ankunft in Quito | Privater Flughafentransfer',
          it: 'Giorno 1 – Arrivo a Quito | Trasferimento Privato Aeroporto',
          pt: 'Dia 1 – Chegada a Quito | Traslado Privado do Aeroporto',
          ja: '第1日 – キト到着 | 専用空港送迎',
          zh: '第1天 – 抵达基多 | 尊享私人机场接机'
        },
        description: {
          en: 'Welcome at Quito International Airport and private transfer to your hotel. Rest and prepare for your Grand Odyssey through 3 islands of the Galápagos.',
          es: 'Recepción en el Aeropuerto Internacional de Quito y traslado privado a su hotel. Tiempo de descanso para prepararse para la Gran Odisea por 3 islas de Galápagos.',
          fr: 'Accueil à l\'aéroport international de Quito et transfert privé vers votre hôtel. Reposez-vous avant votre Grande Odyssée à travers les 3 îles.',
          de: 'Empfang am Flughafen Quito und privater Hoteltransfer. Entspannung vor der Großen Odyssee über 3 Inseln.',
          it: 'Accoglienza all\'Aeroporto di Quito e trasferimento privato in hotel. Riposo prima della Grande Odissea.',
          pt: 'Recepção no Aeroporto de Quito e traslado privado ao hotel. Descanso antes da Grande Odisseia.',
          ja: 'キト国際空港にてお出迎えし専用車でホテルへ。3島を巡る壮大なオデッセイに向けてご準備ください。',
          zh: '基多国际机场专员接机，专车送抵酒店。休整蓄力，迎接横跨加拉帕戈斯三大名岛的盛大史诗之旅。'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3★ or 4★)',
          es: 'Hotel en Quito (Categoría seleccionada 3★ o 4★)',
          fr: 'Hôtel à Quito (Catégorie 3★ ou 4★)',
          de: 'Hotel in Quito (Kategorie 3★ oder 4★)',
          it: 'Hotel a Quito (Categoria 3★ o 4★)',
          pt: 'Hotel em Quito (Categoria 3★ ou 4★)',
          ja: 'キト市内の厳選ホテル（3★または4★）',
          zh: '基多精选酒店（3星级或4星级）'
        },
        meals: {
          en: 'Not included / at leisure',
          es: 'No incluidas / libres',
          fr: 'Non inclus',
          de: 'Nicht inbegriffen',
          it: 'Non inclusi',
          pt: 'Não incluídas',
          ja: '食事なし',
          zh: '敬请自理'
        },
        transportation: {
          en: 'Private transportation from Quito Airport',
          es: 'Transporte privado desde Aeropuerto de Quito',
          fr: 'Transport privé depuis l\'aéroport de Quito',
          de: 'Privater Transport vom Flughafen Quito',
          it: 'Trasporto privato dall\'aeroporto di Quito',
          pt: 'Transporte privado do aeroporto de Quito',
          ja: 'キト空港からの専用送迎車',
          zh: '基多机场专属商务专车接机'
        },
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Arrival In Baltra | Twin Craters | Primicias Ranch',
          es: 'Día 2 – Llegada A Baltra | Cráteres Gemelos | Rancho Primicias',
          fr: 'Jour 2 – Arrivée à Baltra | Cratères Jumeaux | Rancho Primicias',
          de: 'Tag 2 – Ankunft in Baltra | Zwillingskrater | Rancho Primicias',
          it: 'Giorno 2 – Arrivo a Baltra | Crateri Gemelli | Rancho Primicias',
          pt: 'Dia 2 – Chegada a Baltra | Crateras Gêmeas | Rancho Primicias',
          ja: '第2日 – バルトラ島到着 | 双子坑 | プリミシアス牧場',
          zh: '第2天 – 抵达巴尔特拉 | 双子坑 | 普里米西亚巨龟保护区'
        },
        description: {
          en: 'Transfer to Quito airport for your flight to Baltra Island. Upon arrival at Seymour Airport, welcome by our representative. Travel across Santa Cruz highlands to visit the Twin Craters (Los Gemelos) within Scalesia forests. Continue to Primicias Ranch to observe iconic giant tortoises roaming freely and walk through natural volcanic lava tunnels. Transfer to Puerto Ayora for hotel check-in and evening at leisure.',
          es: 'Traslado al aeropuerto de Quito y vuelo a Baltra. Recepción y cruce del Canal de Itabaca hacia Santa Cruz. En las tierras altas visitamos los Cráteres Gemelos en el bosque de Scalesia y el Rancho Primicias para observar tortugas gigantes en libertad y cruzar túneles de lava. Check-in en Puerto Ayora y tiempo libre.',
          fr: 'Transfert à l\'aéroport de Quito et vol vers Baltra. Traversée vers Santa Cruz, visite des Cratères Jumeaux et du Rancho Primicias avec tortues géantes et tunnels de lave. Nuit à Santa Cruz.',
          de: 'Flug nach Baltra. Fahrt über Santa Cruz ins Hochland zu den Zwillingskratern und der Primicias Ranch mit freilebenden Riesenschildkröten und Lavatunneln. Übernachtung auf Santa Cruz.',
          it: 'Volo per Baltra. Attraversamento per Santa Cruz e visita ai Crateri Gemelli e al Rancho Primicias con tartarughe giganti e tunnel di lava. Pernottamento a Santa Cruz.',
          pt: 'Voo para Baltra. Travessia para Santa Cruz e visita às Crateras Gêmeas e ao Rancho Primicias com tartarugas gigantes e túneis de lava. Pernoite em Santa Cruz.',
          ja: 'キトからバルトラへフライト。サンタクルス高地の双子坑とプリミシアス牧場の野生ゾウガメ、溶岩トンネルを見学。サンタクルス島泊。',
          zh: '飞抵巴尔特拉岛西摩机场。登上圣克鲁斯高地探索火山双子坑，深入普里米西亚生态保护区寻访野生象龟并穿越熔岩隧道。入住阿约拉港酒店。'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'According to selected hotel plan',
          es: 'Según plan hotelero seleccionado',
          fr: 'Selon formule hôtelière',
          de: 'Gemäß Hotelplan',
          it: 'Secondo piano alberghiero',
          pt: 'De acordo com o plano do hotel',
          ja: 'ホテルプランに準ずる',
          zh: '按所选酒店方案包含'
        },
        transportation: {
          en: 'Private airport transfer in Quito, flight, ferry & private island transport',
          es: 'Transfer privado en Quito, vuelo, ferry y transporte privado en isla',
          fr: 'Transfert privé à Quito, vol, ferry et transport terrestre privé',
          de: 'Privater Transfer in Quito, Flug, Fähre & privater Inseltransport',
          it: 'Trasferimento privato a Quito, volo, traghetto e trasporto privato',
          pt: 'Transfer privado em Quito, voo, balsa e transporte terrestre na ilha',
          ja: 'キト空港送迎、フライト、フェリー＆島内専用車',
          zh: '基多专车送机、国内航班、渡轮及岛上专车'
        },
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Santa Cruz To Isabela | Flamingo Lagoon | Breeding Center | Tintoreras Islet',
          es: 'Día 3 – Santa Cruz A Isla Isabela | Laguna De Flamingos | Centro De Crianza | Islote Tintoreras',
          fr: 'Jour 3 – De Santa Cruz à Isabela | Flamants Roses | Centre d\'Élevage | Îlot Tintoreras',
          de: 'Tag 3 – Von Santa Cruz nach Isabela | Flamingo-Lagune | Zuchtzentrum | Tintoreras-Inselchen',
          it: 'Giorno 3 – Da Santa Cruz a Isabela | Fenicotteri | Centro Riproduzione | Isolotto Tintoreras',
          pt: 'Dia 3 – Santa Cruz a Isabela | Lagoa de Flamingos | Centro de Reprodução | Ilhote Tintoreras',
          ja: '第3日 – サンタクルスからイサベラ島へ | フラミンゴラグーン | 繁殖センター | ティントレラス小島',
          zh: '第3天 – 圣克鲁斯至伊莎贝拉岛 | 火烈鸟泻湖 | 巨龟繁育中心 | 蒂恩托雷拉斯石礁'
        },
        description: {
          en: 'Speedboat ride to Isabela Island, the largest in the archipelago. Explore Puerto Villamil, visit the Flamingo Lagoon, and tour the Giant Tortoise Breeding Center. In the afternoon, boat excursion to Tintoreras Islet to snorkel with sea turtles, sea lions, tropical fish, rays, reef sharks, and marine iguanas. Overnight in Isabela Island at Hostal Tintorera.',
          es: 'Lancha rápida hacia Isla Isabela. En Puerto Villamil visitamos la laguna de flamingos y el Centro de Crianza de Tortugas Gigantes. Por la tarde, navegación al Islote Tintoreras para snorkel con leones marinos, tortugas, peces tropicales, iguanas marinas y pingüinos de Galápagos. Noche en Isabela (Hostal Tintorera).',
          fr: 'Traversée en bateau rapide vers l\'île Isabela. Visite de la lagune des flamants roses et du centre d\'élevage. Excursion en bateau aux Tintoreras pour nager avec les otaries, tortues et requins de récif. Nuit à l\'Hostal Tintorera.',
          de: 'Schnellboot zur Insel Isabela. Flamingo-Lagune und Zuchtzentrum. Nachmittags Bootsexkursion zu den Tintoreras zum Schnorcheln mit Seelöwen, Meeresschildkröten und Pinguinen. Übernachtung im Hostal Tintorera.',
          it: 'Motoscafo verso Isabela. Laguna dei Fenicotteri e Centro Riproduzione Tartarughe. Nel pomeriggio escursione a Tintoreras con snorkeling tra leoni marini e squali. Pernottamento all\'Hostal Tintorera.',
          pt: 'Lancha rápida para Isabela. Visita à Lagoa de Flamingos e Centro de Reprodução. À tarde, snorkel em Tintoreras com leões-marinhos, tartarugas e arraias. Pernoite no Hostal Tintorera.',
          ja: 'スピードボートでイサベラ島へ。フラミンゴラグーンとゾウガメ繁殖センターを見学。午後はティントレラスへ渡りアシカやウミガメ、ペンギンとシュノーケリング。オスタル・ティントレラ泊。',
          zh: '乘快艇赴伊莎贝拉岛。探访火烈鸟泻湖与巨龟繁殖中心。午后乘船至蒂恩托雷拉斯石礁浮潜，与海狮、海龟、蝠鲼及企鹅同游。入住廷托雷拉客栈。'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: {
          en: 'Isabela Island (Hostal Tintorera)',
          es: 'Isla Isabela (Hostal Tintorera)',
          fr: 'Île Isabela (Hostal Tintorera)',
          de: 'Insel Isabela (Hostal Tintorera)',
          it: 'Isola Isabela (Hostal Tintorera)',
          pt: 'Ilha Isabela (Hostal Tintorera)',
          ja: 'イサベラ島（オスタル・ティントレラ）',
          zh: '伊莎贝拉岛（廷托雷拉客栈）'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-déjeuner et déjeuner',
          de: 'Frühstück und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'Café da manhã e almoço',
          ja: '朝食・昼食付き',
          zh: '包含早餐与午餐'
        },
        transportation: {
          en: 'Inter-island speedboat and local land transport',
          es: 'Lancha rápida interislas y transporte terrestre local',
          fr: 'Bateau rapide inter-îles et transport local',
          de: 'Schnellboot & lokaler Transport',
          it: 'Motoscafo interisola e trasporto locale',
          pt: 'Lancha rápida interilhas e transporte local',
          ja: '島間スピードボート＆現地送迎',
          zh: '城际快艇与岛上观光专车'
        },
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Isabela To Santa Cruz | La Lobería | Las Grietas',
          es: 'Día 4 – Isabela A Santa Cruz | La Lobería | Las Grietas',
          fr: 'Jour 4 – D\'Isabela à Santa Cruz | La Lobería | Las Grietas',
          de: 'Tag 4 – Von Isabela nach Santa Cruz | La Lobería | Las Grietas',
          it: 'Giorno 4 – Da Isabela a Santa Cruz | La Lobería | Las Grietas',
          pt: 'Dia 4 – Isabela a Santa Cruz | La Lobería | Las Grietas',
          ja: '第4日 – イサベラ島からサンタクルスへ | ラ・ロベリア | ラス・グリエタス',
          zh: '第4天 – 伊莎贝拉岛返回圣克鲁斯 | 拉洛贝里亚 | 拉斯格里塔斯'
        },
        description: {
          en: 'Morning boat transfer back to Santa Cruz Island. Visit coastal La Lobería to observe colonies of sea lions. Continue to Las Grietas, a narrow volcanic chasm filled with crystal-clear turquoise brackish water—ideal for swimming and snorkeling. Afternoon at leisure in Puerto Ayora.',
          es: 'Lancha de regreso a Santa Cruz. Visita costera a La Lobería para observar lobos marinos. Luego caminata a Las Grietas, espectacular cañón volcánico de aguas cristalinas para natación y snorkel. Tarde libre en Puerto Ayora.',
          fr: 'Retour en bateau à Santa Cruz. Visite de La Lobería pour observer les otaries. Baignade et snorkeling à Las Grietas dans une eau limpide turquoise. Après-midi libre.',
          de: 'Bootstransfer nach Santa Cruz. Besuch von La Lobería und Las Grietas zum Schwimmen und Schnorcheln im kristallklaren Wasser. Nachmittag zur freien Verfügung.',
          it: 'Rientro in barca a Santa Cruz. Visita a La Lobería e nuoto/snorkeling a Las Grietas. Pomeriggio libero a Puerto Ayora.',
          pt: 'Lancha de retorno a Santa Cruz. Visita a La Lobería e snorkel nas águas límpidas de Las Grietas. Tarde livre em Puerto Ayora.',
          ja: 'ボートでサンタクルス島へ戻り、ラ・ロベリアのアシカを観察。ラス・グリエタスの透明な水路でシュノーケリング。プエルトアヨラで自由時間。',
          zh: '乘船返回圣克鲁斯岛。游览拉洛贝里亚海狮群栖息地，在拉斯格里塔斯火山峡谷翡翠色清澈水域中畅泳浮潜。下午在阿约拉港自由活动。'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Inter-island speedboat and local walking trails',
          es: 'Lancha rápida interislas y senderos locales',
          fr: 'Bateau rapide et sentiers côtiers',
          de: 'Schnellboot & Wanderpfade',
          it: 'Motoscafo e percorsi a piedi',
          pt: 'Lancha rápida e trilhas locais',
          ja: '島間スピードボート＆徒歩トレイル',
          zh: '城际快艇与步行步道'
        },
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Full-Day Navigable Yacht Excursion To Santa Fe Or Pinzón Island',
          es: 'Día 5 – Excursión Full-Day En Yate A Isla Santa Fe O Islote Pinzón',
          fr: 'Jour 5 – Excursion Journée en Yacht à l\'Île Santa Fe ou Pinzón',
          de: 'Tag 5 – Ganztägiger Yachtausflug zur Insel Santa Fe oder Pinzón',
          it: 'Giorno 5 – Escursione Giornata Intera in Yacht a Santa Fe o Pinzón',
          pt: 'Dia 5 – Excursão Dia Inteiro em Iate para Santa Fe ou Pinzón',
          ja: '第5日 – サンタフェ島またはピンソン島への終日ヨットクルーズ',
          zh: '第5天 – 圣菲岛或平松岛全天出海游艇航海与浮潜'
        },
        description: {
          en: 'Full-day navigable yacht excursion to Santa Fe Island (turquoise waters, white beaches, endemic land iguanas) or Pinzón Islet (deep-water snorkeling alongside sea turtles, sea lions, rays, sharks, and schools of tropical fish). Lunch served on board.',
          es: 'Navegación de día completo en yate hacia Isla Santa Fe o Islote Pinzón con sesiones de snorkel de alta biodiversidad marina (tortugas, leones marinos, rayas y peces de colores). Almuerzo a bordo incluido.',
          fr: 'Croisière d\'une journée en yacht vers Santa Fe ou l\'îlot Pinzón avec snorkeling exceptionnel au milieu des tortues, raies, requins et bancs de poissons tropicaux. Déjeuner à bord.',
          de: 'Ganztagesausflug per Yacht nach Santa Fe oder Pinzón mit erstklassigem Schnorcheln (Schildkröten, Seelöwen, Haie und Rochen). Mittagessen an Bord.',
          it: 'Escursione giornaliera in yacht a Santa Fe o Pinzón con snorkeling d\'eccezione (tartarughe, leoni marini, mante e pesci tropicali). Pranzo a bordo.',
          pt: 'Navegação de dia inteiro em iate para Santa Fe ou Pinzón com snorkel de alta biodiversidade (tartarugas, leões-marinhos, arraias e tubarões). Almoço a bordo.',
          ja: 'サンタフェ島またはピンソン島への終日ヨットクルーズ。ウミガメ、アシカ、サメ、エイが生息する豊かな海でシュノーケリング。船上ランチ付き。',
          zh: '全天乘游艇出海探访圣菲岛或平松岛。在碧波荡漾的水域中深潜浮潜，与海龟、海狮、蝠鲼和白顶礁鲨同游。包含甲板精致午餐。'
        },
        image: '/images/tours/16-9/santa-fe-island-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island – Puerto Ayora',
          es: 'Isla Santa Cruz – Puerto Ayora',
          fr: 'Île Santa Cruz – Puerto Ayora',
          de: 'Insel Santa Cruz – Puerto Ayora',
          it: 'Isola di Santa Cruz – Puerto Ayora',
          pt: 'Ilha Santa Cruz – Puerto Ayora',
          ja: 'サンタクルス島 – プエルトアヨラ',
          zh: '圣克鲁斯岛 – 阿约拉港'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-déjeuner et déjeuner',
          de: 'Frühstück und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'Café da manhã e almoço',
          ja: '朝食・昼食付き',
          zh: '包含早餐与午餐'
        },
        transportation: {
          en: 'Navigable tourist yacht and island ground transfers',
          es: 'Yate turístico navegable y transporte terrestre',
          fr: 'Yacht touristique navigable et transferts terrestres',
          de: 'Yachtschiff & Landtransport',
          it: 'Yacht turistico e trasporto a terra',
          pt: 'Iate turístico navegável e transporte terrestre',
          ja: '観光ヨットクルーズ船＆陸上送迎',
          zh: '出海观光游艇与陆地接送'
        },
        activity: {
          en: 'Open-water yacht navigation, deep-water snorkeling & hiking',
          es: 'Navegación en yate, snorkel en aguas abiertas y caminata',
          fr: 'Navigation en yacht, snorkeling en eau profonde et randonnée',
          de: 'Yachtfahrt, Tiefwasserschnorcheln & Wanderung',
          it: 'Navigazione in yacht, snorkeling e trekking',
          pt: 'Navegação em iate, snorkel em mar aberto e caminhada',
          ja: 'ヨットクルーズ、外洋シュノーケリング＆ハイキング',
          zh: '游艇航行、外海深度浮潜与生态徒步'
        },
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Santa Cruz To San Cristóbal | Interpretation Center | Tijeretas Hill | La Lobería',
          es: 'Día 6 – Santa Cruz A San Cristóbal | Centro De Interpretación | Cerro Tijeretas | La Lobería',
          fr: 'Jour 6 – De Santa Cruz à San Cristóbal | Centre d\'Interprétation | Tijeretas | La Lobería',
          de: 'Tag 6 – Von Santa Cruz nach San Cristóbal | Interpretationszentrum | Tijeretas | La Lobería',
          it: 'Giorno 6 – Da Santa Cruz a San Cristóbal | Centro Interpretazione | Tijeretas | La Lobería',
          pt: 'Dia 6 – Santa Cruz a San Cristóbal | Centro de Interpretação | Tijeretas | La Lobería',
          ja: '第6日 – サンタクルスからサンクリストバル島へ | 解説センター | ティヘレタス | ラ・ロベリア',
          zh: '第6天 – 圣克鲁斯至圣克里斯托巴尔岛 | 解读中心 | 军舰鸟丘 | 拉洛贝里亚海滩'
        },
        description: {
          en: 'Speedboat journey from Santa Cruz to San Cristóbal Island. Upon arrival in Puerto Baquerizo Moreno, visit the San Cristóbal Interpretation Center to explore the islands\' natural origins and human history. Hike up scenic Tijeretas Hill for panoramic coastal ocean views and frigatebird nesting sites. Conclude with a visit to La Lobería beach to observe sea lions and marine iguanas. Overnight in San Cristóbal Island at Hotel Algarrobos.',
          es: 'Lancha rápida a Isla San Cristóbal. En Puerto Baquerizo Moreno, visita al Centro de Interpretación para conocer el origen volcánico y la historia humana del archipiélago. Caminata al mirador de Cerro Tijeretas con avistamiento de fragatas y relax en la playa La Lobería rodeada de lobos marinos e iguanas. Noche en San Cristóbal (Hotel Algarrobos).',
          fr: 'Traversée en bateau rapide vers San Cristóbal. Visite du Centre d\'Interprétation de Puerto Baquerizo Moreno. Randonnée au belvédère de Cerro Tijeretas pour admirer les frégates et panorama sur l\'océan. Détente sur la plage de La Lobería au milieu des otaries. Nuit à l\'Hôtel Algarrobos.',
          de: 'Schnellbootfahrt nach San Cristóbal. Besuch des Interpretationszentrums in Puerto Baquerizo Moreno. Wanderung zum Aussichtspunkt Cerro Tijeretas zur Beobachtung von Fregattvögeln und Entspannung am Strand La Lobería bei den Seelöwen. Übernachtung im Hotel Algarrobos.',
          it: 'Motoscafo verso San Cristóbal. Visita al Centro di Interpretazione, passeggiata panoramica al Cerro Tijeretas con fregate e relax sulla spiaggia di La Lobería con i leoni marini. Pernottamento all\'Hotel Algarrobos.',
          pt: 'Lancha rápida para San Cristóbal. Visita ao Centro de Interpretação em Puerto Baquerizo Moreno. Caminhada até o mirante do Cerro Tijeretas para ver fragatas e relaxe na praia de La Lobería com leões-marinhos. Pernoite no Hotel Algarrobos.',
          ja: 'スピードボートでサンクリストバル島へ。解説センターを見学後、グンカンドリが舞うティヘレタスの丘展望台へハイキング。ラ・ロベリア海岸でアシカやウミイグアナを観察。ホテル・アルガロボス泊。',
          zh: '乘快艇抵达圣克里斯托巴尔岛。参观解读中心了解加拉帕戈斯的地质与人文历史。徒步登上军舰鸟丘（Cerro Tijeretas）俯瞰壮丽海岸全景与翱翔的军舰鸟，漫步拉洛贝里亚海滩观赏海狮与海鬣蜥。入住阿尔加罗博斯酒店。'
        },
        image: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
        accommodation: {
          en: 'San Cristóbal Island (Hotel Algarrobos)',
          es: 'Isla San Cristóbal (Hotel Algarrobos)',
          fr: 'Île San Cristóbal (Hôtel Algarrobos)',
          de: 'Insel San Cristóbal (Hotel Algarrobos)',
          it: 'Isola San Cristóbal (Hotel Algarrobos)',
          pt: 'Ilha San Cristóbal (Hotel Algarrobos)',
          ja: 'サンクリストバル島（ホテル・アルガロボス）',
          zh: '圣克里斯托巴尔岛（阿尔加罗博斯酒店）'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Inter-island speedboat and local ground transport',
          es: 'Lancha rápida interislas y transporte terrestre local',
          fr: 'Bateau rapide inter-îles et transport local',
          de: 'Schnellboot & lokaler Transport',
          it: 'Motoscafo interisola e trasporto locale',
          pt: 'Lancha rápida interilhas e transporte local',
          ja: '島間スピードボート＆現地移動',
          zh: '城际快艇与岛上观光专车'
        },
      },
      {
        day: 7,
        title: {
          en: 'Day 7 – San Cristóbal Airport Transfer | Flight To Quito | Private Hotel Transfer',
          es: 'Día 7 – Traslado Aeropuerto San Cristóbal | Vuelo A Quito | Transfer Privado Al Hotel',
          fr: 'Jour 7 – Transfert Aéroport San Cristóbal | Vol vers Quito | Transfert Privé Hôtel',
          de: 'Tag 7 – Transfer Flughafen San Cristóbal | Flug nach Quito | Privater Hoteltransfer',
          it: 'Giorno 7 – Trasferimento Aeroporto San Cristóbal | Volo per Quito | Transfer Privato in Hotel',
          pt: 'Dia 7 – Traslado Aeroporto San Cristóbal | Voo para Quito | Transfer Privado ao Hotel',
          ja: '第7日 – サンクリストバル空港へ送迎 | キト行きフライト | ホテル専用送迎',
          zh: '第7天 – 圣克里斯托巴尔机场送机 | 飞往基多 | 专车接机入住酒店'
        },
        description: {
          en: 'After breakfast, free morning depending on your flight schedule. Transfer to San Cristóbal Airport for your departure flight to Quito. Upon arrival in Quito, private transfer to your hotel. Evening at leisure.',
          es: 'Desayuno y tiempo libre según horario de vuelo. Traslado al Aeropuerto de San Cristóbal para tomar el vuelo de retorno a Quito. Llegada y traslado privado exclusivo a su hotel en Quito.',
          fr: 'Petit-déjeuner et temps libre. Transfert à l\'aéroport de San Cristóbal pour votre vol retour vers Quito. Accueil et transfert privé vers votre hôtel.',
          de: 'Frühstück und Freizeit je nach Flugplan. Transfer zum Flughafen San Cristóbal für den Flug nach Quito. Privater Transfer zu Ihrem Hotel in Quito.',
          it: 'Colazione e tempo libero. Trasferimento all\'aeroporto di San Cristóbal per il volo verso Quito. Accoglienza e trasferimento privato in hotel.',
          pt: 'Café da manhã e tempo livre. Traslado ao Aeroporto de San Cristóbal para voo de retorno a Quito. Traslado privado para o hotel.',
          ja: '朝食後、フライト時間に合わせて自由行動。サンクリストバル空港へ送迎しキト行きフライトに搭乗。キト到着後専用車でホテルへ。',
          zh: '早餐后根据航班时间自由活动。送往圣克里斯托巴尔机场飞往基多，抵达后专车接机送往酒店休息。'
        },
        image: '/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3★ or 4★)',
          es: 'Hotel en Quito (Categoría seleccionada 3★ o 4★)',
          fr: 'Hôtel à Quito (Catégorie 3★ ou 4★)',
          de: 'Hotel in Quito (Kategorie 3★ oder 4★)',
          it: 'Hotel a Quito (Categoria 3★ o 4★)',
          pt: 'Hotel em Quito (Categoria 3★ ou 4★)',
          ja: 'キト市内の厳選ホテル（3★または4★）',
          zh: '基多精选酒店（3星级或4星级）'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'San Cristóbal airport transfer, domestic flight & private Quito transfer',
          es: 'Traslado al aeropuerto de San Cristóbal, vuelo y traslado privado en Quito',
          fr: 'Transfert aéroport San Cristóbal, vol intérieur et transfert privé à Quito',
          de: 'Flughafentransfer San Cristóbal, Flug & privater Transfer in Quito',
          it: 'Trasferimento aeroporto San Cristóbal, volo e transfer privato a Quito',
          pt: 'Traslado ao aeroporto de San Cristóbal, voo e traslado privado em Quito',
          ja: 'サンクリストバル空港送迎、国内線フライト＆キト市内専用送迎',
          zh: '圣克里斯托巴尔机场送机、国内航班及基多专车接机'
        },
      },
      {
        day: 8,
        title: {
          en: 'Day 8 – Private Quito Airport Transfer | International Departure',
          es: 'Día 8 – Traslado Privado Al Aeropuerto De Quito | Vuelo Internacional',
          fr: 'Jour 8 – Transfert Privé vers l\'Aéroport de Quito | Vol International',
          de: 'Tag 8 – Privater Transfer zum Flughafen Quito | Internationaler Rückflug',
          it: 'Giorno 8 – Trasferimento Privato all\'Aeroporto di Quito | Partenza Internazionale',
          pt: 'Dia 8 – Traslado Privado ao Aeroporto de Quito | Embarque Internacional',
          ja: '第8日 – キト空港専用送迎 | 帰国の途へ',
          zh: '第8天 – 基多机场私人专车送机 | 踏上归途'
        },
        description: {
          en: 'Private transfer to Quito International Airport for your onward international flight connections. End of our services.',
          es: 'Traslado privado exclusivo desde su hotel hacia el Aeropuerto Internacional de Quito para su vuelo internacional. Fin de servicios.',
          fr: 'Transfert privé vers l\'aéroport international de Quito pour votre vol retour. Fin de nos services.',
          de: 'Privater Transfer zum internationalen Flughafen Quito für Ihren internationalen Weiterflug. Ende unserer Leistungen.',
          it: 'Trasferimento privato all\'Aeroporto di Quito per il volo internazionale. Fine dei nostri servizi.',
          pt: 'Traslado privado ao Aeroporto de Quito para conexão internacional. Fim de nossos serviços.',
          ja: 'キト国際空港へ専用車で送迎。サービス終了となります。素晴らしいガラパゴスの思い出とともにお気をつけてお帰りください。',
          zh: '根据国际航班起飞时间专车送往基多国际机场，结束丰富充实的三岛大跨越加拉帕戈斯探险。'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-déjeuner',
          de: 'Frühstück',
          it: 'Colazione',
          pt: 'Café da manhã',
          ja: '朝食付き',
          zh: '包含早餐'
        },
        transportation: {
          en: 'Private transportation to Quito International Airport',
          es: 'Transporte privado al Aeropuerto Internacional de Quito',
          fr: 'Transport privé vers l\'aéroport de Quito',
          de: 'Privater Transport zum Flughafen Quito',
          it: 'Trasporto privato per l\'aeroporto di Quito',
          pt: 'Transporte privado para o Aeroporto de Quito',
          ja: 'キト国際空港への専用送迎車',
          zh: '基多国际机场私人专车送机'
        },
      }
    ]
  },

  // Tour 5: Volcanoes & Rivers (8 Days)
  {
    id: 'volcanoes-rivers-8days',
    code: '2.1',
    title: {
      en: 'Andes To Amazon: Volcanoes & Rivers',
      es: 'Volcanes, Ríos Y Selva: La Ruta De La Aventura',
      fr: 'Des Andes à l\'Amazonie: Volcans et Rivières',
      de: 'Von den Anden zum Amazonas: Vulkane & Flüsse',
      it: 'Dalle Ande all\'Amazzonia: Vulcani e Fiumi',
      pt: 'Dos Andes à Amazônia: Vulcões e Rios',
      ja: 'アンデスからアマゾンへ: 火山と川の旅',
      zh: '从安第斯到亚马逊：火山与河流'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '8 DAYS / 7 NIGHTS',
      es: '8 DÍAS / 7 NOCHES',
      fr: '8 JOURS / 7 NUITS',
      de: '8 TAGE / 7 NÄCHTE',
      it: '8 GIORNI / 7 NOTTI',
      pt: '8 DIAS / 7 NOITES',
      ja: '8日間 / 7泊',
      zh: '8天 / 7晚'
    },
    durationDays: 8,
    price: 1550,
    price3Star: 1550,
    price4Star: 1990,
    imageUrl: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
    mobileImage: '/images/tours/9-16/pailon-diablo-9-16.webp',
    desktopImage: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
    gallery: [
      '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
      '/images/tours/16-9/chimborazo-volcano-16-9.webp',
      '/images/tours/16-9/laguna-quilotoa-16-9.webp',
      '/images/tours/16-9/pailon-del-diablo-16-9.webp',
      '/images/tours/16-9/amazon-river-16-9.webp',
      '/images/tours/16-9/puyo-yanacocha-16-9.webp',
      '/images/tours/16-9/quito-colonial-16-9.webp',
      '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 31,
    isPopular: true,
    category: {
      en: 'Andes & Amazon Overland',
      es: 'Andes y Amazonía Overland',
      fr: 'Aventure Andes & Amazonie',
      de: 'Anden- & Amazonas-Reise',
      it: 'Overland Ande e Amazzonia',
      pt: 'Expedição Andes e Amazônia',
      ja: 'アンデス＆アマゾン周遊',
      zh: '安第斯与亚马逊经典穿越'
    },
    description: {
      en: '8-day overland journey connecting Quito Historic Center, Equator Line, Papallacta thermal springs, Tena Amazon lodge with motorized canoe, Yanacocha rescue biopark, Baños waterfalls & Pailón del Diablo (Devil\'s Cauldron), and Quilotoa Crater Lake.',
      es: 'Travesía de 8 días que conecta el Quito colonial, aguas termales de Papallacta, selva amazónica de Tena, cascadas de Baños y el cráter Quilotoa.',
      zh: '8日私人全景之旅，涵盖基多历史中心、赤道纪念碑、帕帕亚克塔温泉、特纳亚马逊雨林精品木屋、动力木舟、普约亚纳科查生物公园、巴尼奥斯恶魔之咽瀑布与基洛托阿火山湖。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Equator Line', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta Thermal Hot Springs & Antisana Views', es: 'Termas de Papallacta y Vistas del Antisana', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge, Canoe & Caiman Lagoon', es: 'Lodge en Tena, Canoa y Laguna de Caimanes', zh: '特纳雨林木屋、木舟与鳄鱼湖' },
      { en: 'Yanacocha Biopark & Pailón del Diablo (Devil\'s Cauldron) Waterfall', es: 'Bioparque Yanacocha y Pailón del Diablo (Devil\'s Cauldron)', zh: '亚纳科查生物公园与恶魔之咽瀑布' },
      { en: 'Quilotoa Emerald Crater Lake & Tigua Art', es: 'Laguna de Quilotoa y Arte de Tigua', zh: '基洛托阿翡翠火山湖与蒂瓜艺术' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado (vehículos 4x4 o buses turísticos)' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: 'Accommodation at 3* or 4* hotels according to selection', es: 'Alojamiento en hoteles 3★ o 4★ según plan' },
      { en: 'Daily breakfast, plus lunches and dinners in Amazon as specified', es: 'Desayunos diarios, y comidas en Amazonía según itinerario' },
      { en: 'Entrances: La Compañía, Intiñan, Papallacta, Yanacocha, Pailón del Diablo (Devil\'s Cauldron), Ilinizas (Quilotoa)', es: 'Entradas: La Compañía, Intiñan, Papallacta, Yanacocha, Pailón del Diablo (Devil\'s Cauldron), Quilotoa' }
    ],
    exclusions: [
      { en: 'Personal expenses and optional activities in Baños', es: 'Gastos personales y actividades opcionales en Baños' },
      { en: 'Meals not specified in the itinerary', es: 'Comidas no especificadas' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito',
          es: 'Día 1 – Llegada A Quito'
        },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.',
          es: 'Recepción en el Aeropuerto Internacional Mariscal Sucre de Quito y traslado privado al hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Quito City Tour & Equator Line',
          es: 'Día 2 – City Tour En Quito Y Línea Ecuatorial'
        },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nToday, we explore both the modern and historic areas of Quito. The historic center is renowned for its impressive churches, colonial architecture, and beautiful plazas.\n\nWe will visit the Cathedral, the Archbishop’s Palace, and the Presidential Palace, all located around the main square, known as Plaza Grande. We will also visit La Compañía de Jesús, one of Quito’s most spectacular churches, famous for its interior richly decorated with gold leaf, as well as San Francisco Square and Church.\n\nAfterward, we continue to the Middle of the World (Mitad del Mundo), where we visit the Intiñan Museum, famous for its demonstrations and experiments related to the Equator. Here, you can experience the unique sensation of standing in the Northern and Southern Hemispheres at the same time.',
          es: 'Visita guiada al centro histórico de Quito: Plaza Grande, Catedral, Palacio Arzobispal, Palacio Presidencial, Iglesia de La Compañía de Jesús cubierta de pan de oro y Plaza San Francisco.\n\nContinuamos a la Mitad del Mundo y Museo Intiñan con experimentos sobre la línea ecuatorial.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '5-hour guided tour', es: 'Tour guiado de 5 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Quito – Papallacta – Amazon Rainforest',
          es: 'Día 3 – Quito – Papallacta – Selva Amazónica'
        },
        description: {
          en: 'We travel approximately two hours east of Quito along a historic route used by Spanish explorers in the 16th century in their search for gold and cinnamon. This expedition eventually led to the discovery of the Amazon River.\n\nAlong the way, we pass by the historic Guápulo Church and cross the Andes at approximately 4,100 meters (13,451 ft) above sea level. The route passes between two ecological reserves before descending toward the transition zone between the Andes and the Ecuadorian Amazon.\n\nWe stop at the famous Papallacta Hot Springs, where you can enjoy several activities: relax in thermal pools with different temperatures while enjoying spectacular views of Antisana Volcano (5,704 m / 18,714 ft), enjoy some relaxing time at the spa, or explore the walking trails around the area.\n\nWe then continue our descent toward the Amazon Rainforest.',
          es: 'Viaje al este cruzando la cordillera a 4,100 m de altitud con vistas de páramo y paso por Guápulo. Parada en las Termas de Papallacta para disfrutar de las piscinas termales medicinales y senderos ecológicos. Descenso hacia la selva amazónica de Tena.'
        },
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour; descent from 4,000m to 500m; 1-hour hike', es: 'Tour de 6 horas, descenso de 4,000m a 500m y caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Tena & Amazon Rainforest',
          es: 'Día 4 – Tena Y Selva Amazónica'
        },
        description: {
          en: 'In the morning, we board a motorized canoe and travel downstream to visit an Amazon Rainforest wildlife rescue center, where we will learn about local wildlife and conservation efforts.\n\nWe then have the opportunity to explore primary rainforest on foot, accompanied by a knowledgeable local guide. During the hike, we will discover the incredible biodiversity of the Amazon and learn about the rainforest ecosystem.\n\nWe will also visit a local Kichwa family and learn about their traditions, culture, and way of life.\n\nFinally, we visit a caiman lagoon, where we can observe these fascinating Amazonian reptiles in their natural environment.\n\nWe then return to the lodge.',
          es: 'Paseo en canoa motorizada por el río hacia un centro de rescate de fauna amazónica. Caminata guiada por la selva primaria con guía nativo, visita a una familia Kichwa y observación de caimanes en la laguna.'
        },
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour + 1-hour motorized canoe ride', es: 'Tour de 6h + paseo en canoa motorizada de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast, lunch, and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Tena – Puyo – Baños',
          es: 'Día 5 – Tena – Puyo – Baños'
        },
        description: {
          en: 'In the morning, we travel south toward the city of Puyo. Along the way, we visit Yanacocha Biopark, where we will learn about Amazonian wildlife species that have been rescued from illegal wildlife trafficking.\n\nWe then continue toward Baños along the spectacular Route of the Waterfalls, one of Ecuador’s most scenic routes.\n\nWe will have the opportunity to hike to Pailón del Diablo (Devil\'s Cauldron), one of the most impressive waterfalls in Ecuador, surrounded by lush vegetation and dramatic mountain scenery.\n\nWe continue to Baños for our overnight stay.',
          es: 'Viaje hacia Puyo y visita al Bioparque Yanacocha de rescate de fauna silvestre. Continuación por el cañón del río Pastaza y la Ruta de las Cascadas hacia Baños, con caminata a la gran cascada Pailón del Diablo (Devil\'s Cauldron).'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '6-hour guided tour', es: 'Tour guiado de 6 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Baños – Free Day',
          es: 'Día 6 – Baños – Día Libre'
        },
        description: {
          en: 'Enjoy a free day in Baños, a charming tourist town located at the foothills of the active Tungurahua Volcano.\n\nYou can enjoy a variety of optional activities at your own expense, including: cycling, white-water rafting, waterfall hikes, cable-car rides (tarabita), and horseback riding.',
          es: 'Día libre en Baños de Agua Santa para disfrutar de actividades de aventura opcionales: ciclismo de montaña, rafting, tarabitas sobre cañones, termas o cabalgatas.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 – Baños – Quilotoa – Quito',
          es: 'Día 7 – Baños – Quilotoa – Quito'
        },
        description: {
          en: 'In the morning, we begin our journey toward Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, famous for its breathtaking scenery and turquoise waters.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater.\n\nWe may also make a stop in the traditional village of Tigua, famous for its colorful Andean paintings, as well as local guinea pig farms.\n\nWe then continue to Quito.',
          es: 'Viaje hacia la Laguna del Cráter de Quilotoa con caminata al interior de la caldera volcánica. Parada en el pueblo de pintores de Tigua y continuación hacia Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,483 ft)', es: 'Tour de 6h + caminata de 2h (3,500 m)' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 – Transfer To The Airport',
          es: 'Día 8 – Traslado Al Aeropuerto'
        },
        description: {
          en: 'Private transfer to the airport for your onward flight connections to the Galápagos Islands or Mainland Ecuador.\n\nEnd of the tour.',
          es: 'Traslado privado al Aeropuerto Internacional de Quito para su vuelo internacional o conexión a Galápagos o Ecuador Continental. Fin de los servicios.'
        },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      }
    ]
  },

  // Tour 6: Andes & Amazon Rainforest (7 Days)
  {
    id: 'andes-amazon-7days',
    code: '2.2',
    title: {
      en: 'Mystic Andes & Amazon Rainforest',
      es: 'El Latido De Los Andes Y La Amazonía',
      fr: 'Andes Mystiques et Forêt Amazonienne',
      de: 'Mystische Anden & Amazonas Regenwald',
      it: 'Ande Mistiche e Foresta Amazzonica',
      pt: 'Andes Místicos e Floresta Amazônica',
      ja: '神秘的なアンデスとアマゾン熱帯雨林',
      zh: '神秘安第斯与亚马逊热带雨林'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '7 DAYS / 6 NIGHTS',
      es: '7 DÍAS / 6 NOCHES',
      fr: '7 JOURS / 6 NUITS',
      de: '7 TAGE / 6 NÄCHTE',
      it: '7 GIORNI / 6 NOTTI',
      pt: '7 DIAS / 6 NOITES',
      ja: '7日間 / 6泊',
      zh: '7天 / 6晚'
    },
    durationDays: 7,
    price: 1190,
    price3Star: 1190,
    price4Star: 1750,
    imageUrl: '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
    mobileImage: '/images/tours/9-16/amazon-waterfull-9-16.webp',
    desktopImage: '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
    gallery: [
      '/images/tours/16-9/amazon-river-16-9.webp',
      '/images/tours/16-9/pailon-del-diablo-16-9.webp',
      '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
      '/images/tours/16-9/laguna-quilotoa-16-9.webp',
      '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
      '/images/tours/16-9/puyo-yanacocha-16-9.webp',
      '/images/tours/16-9/chimborazo-volcano-16-9.webp',
      '/images/tours/16-9/quito-colonial-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 26,
    category: {
      en: 'Andes & Amazon Expedition',
      es: 'Expedición Andes y Amazonía',
      fr: 'Expédition Andes & Amazonie',
      de: 'Anden- & Amazonas-Expedition',
      it: 'Spedizione Ande e Amazzonia',
      pt: 'Expedição Andes e Amazônia',
      ja: 'アンデス＆アマゾン探検',
      zh: '雨林木屋沉浸探险'
    },
    description: {
      en: '7-day immersive journey uniting Quito colonial heritage, Equator line, Papallacta thermal springs, Tena jungle lodge, motorized canoe expeditions, Kichwa cultural encounter, and Paikawe Amazon reserve giant fish lagoon.',
      es: 'Inmersión de 7 días entre el patrimonio histórico de Quito, relajación en Papallacta, expedición en la selva de Tena y fauna de la Reserva Paikawe.',
      zh: '7日沉浸式探险，结合基多殖民文化遗产、赤道线、帕帕亚克塔温泉、特纳雨林木屋、动力木舟、奇瓦文化体验、派卡韦亚马逊保护区巨型鱼类观赏。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Mitad del Mundo', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta Thermal Hot Springs in the Andes', es: 'Termas de Papallacta en los Andes', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge & Motorized River Canoe', es: 'Lodge en Tena y Canoa Motorizada en el Río', zh: '特纳雨林木屋与动力木舟' },
      { en: 'Amazon Wildlife Rescue Center & Kichwa Culture', es: 'Centro de Rescate y Cultura Kichwa', zh: '野生动物保护中心与奇瓦文化' },
      { en: 'Misahuallí & Paikawe Giant Fish Reserve Lagoon', es: 'Misahuallí y Laguna de Peces Gigantes de Paikawe', zh: '米萨瓦利与派卡韦巨鱼保护区' }
    ],
    inclusions: [
      { en: 'Airport reception and private transfers', es: 'Recepción en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: 'Accommodation (6 nights in 3* or 4* hotels / Amazon lodge)', es: 'Alojamiento (6 noches en hoteles 3★ o 4★ / Lodge amazónico)' },
      { en: 'Meals: Daily breakfast, plus lunch and dinner at Amazon lodge', es: 'Comidas: Desayunos diarios, almuerzo y cena en lodge' },
      { en: 'Entrances: La Compañía, Intiñan, Papallacta, Rescue Center, Paikawe', es: 'Entradas: La Compañía, Intiñan, Papallacta, Centro de Rescate, Paikawe' }
    ],
    exclusions: [
      { en: 'Personal expenses and services not specified in the program', es: 'Gastos personales y servicios no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito',
          es: 'Día 1 – Llegada A Quito'
        },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.',
          es: 'Recepción en el Aeropuerto Internacional de Quito y traslado privado al hotel.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Quito City Tour & Equator Line',
          es: 'Día 2 – City Tour En Quito Y Línea Ecuatorial'
        },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nToday, we explore both the modern and historic areas of Quito. The historic center is renowned for its impressive churches, colonial architecture, and beautiful plazas.\n\nWe will visit the Cathedral, the Archbishop’s Palace, and the Presidential Palace, all located around the main square, known as Plaza Grande. We will also visit La Compañía de Jesús, one of Quito’s most spectacular churches, famous for its richly decorated interior covered in gold leaf, as well as San Francisco Square and Church.\n\nWe then continue to the Middle of the World (Mitad del Mundo), where we visit the Intiñan Museum, famous for its demonstrations and experiments related to the Equator. Here, you can experience the unique sensation of standing in the Northern and Southern Hemispheres at the same time.',
          es: 'Recorrido por las joyas coloniales de Quito: Catedral, Palacio de Carondelet, Iglesia de la Compañía de Jesús y Plaza San Francisco.\n\nVisita al Museo Intiñan en la Mitad del Mundo para experimentar los fenómenos físicos de la línea ecuatorial.'
        },
        image: '/images/tours/16-9/mitad-del-mundo-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '5-hour guided tour', es: 'Tour guiado de 5 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Quito – Papallacta – Amazon Rainforest',
          es: 'Día 3 – Quito – Papallacta – Selva Amazónica'
        },
        description: {
          en: 'We travel approximately two hours east of Quito along a historic route used by Spanish explorers in the 16th century in their search for gold and cinnamon. This expedition eventually led to the discovery of the Amazon River.\n\nAlong the way, we pass by the historic Guápulo Church and cross the Andes at approximately 4,100 meters (13,451 ft) above sea level. The route passes between two ecological reserves before descending toward the transition zone between the Andes and the Ecuadorian Amazon.\n\nWe stop at the famous Papallacta Hot Springs, where you can choose from several activities: relax in thermal pools with different temperatures while enjoying spectacular views of Antisana Volcano (5,704 m / 18,714 ft), enjoy some relaxing time at the spa, or explore the walking trails around the area.\n\nWe then continue our descent toward the Amazon Rainforest.',
          es: 'Cruce de los Andes a 4,100 m y relax en las Termas de Papallacta con vista al Antisana. Descenso a la Amazonía hasta llegar a nuestro lodge en Tena.'
        },
        image: '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour; descent from 4,000m to 500m; 1-hour hike', es: 'Tour de 6 horas y caminata de 1 hora' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Tena & Amazon Rainforest',
          es: 'Día 4 – Tena Y Selva Amazónica'
        },
        description: {
          en: 'In the morning, we board a motorized canoe and travel downstream to visit an Amazon Rainforest wildlife rescue center, where we will learn about local wildlife and conservation efforts.\n\nWe then have the opportunity to explore primary rainforest on foot, accompanied by a knowledgeable local guide. During the hike, we will discover the incredible biodiversity of the Amazon and learn about the rainforest ecosystem.\n\nWe will also visit a local Kichwa family and learn about their traditions, culture, and daily way of life.\n\nFinally, we visit a caiman lagoon, where we can observe these fascinating Amazonian reptiles in their natural environment.\n\nReturn to the lodge and overnight stay.',
          es: 'Canoa por el río amazónico, visita al centro de rescate de fauna, caminata por la selva primaria, encuentro cultural con una familia Kichwa y laguna de caimanes.'
        },
        image: '/images/tours/16-9/amazon-river-16-9.webp',
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour + 1-hour motorized canoe ride', es: 'Tour de 6h + canoa de 1h' },
        transportation: { en: 'Private transportation and motorized canoe', es: 'Transporte privado y canoa motorizada' },
        meals: { en: 'Breakfast, lunch, and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Misahuallí – Paikawe Reserve – Quito',
          es: 'Día 5 – Misahuallí – Reserva Paikawe – Quito'
        },
        description: {
          en: 'In the morning, we visit Paikawe Reserve, where we have the opportunity to hike through primary rainforest and explore the lagoon by boat.\n\nDuring the visit, we can observe the impressive giant fish of the Amazon and discover the extraordinary biodiversity of this tropical environment.\n\nAfter the visit, we begin our return journey to Quito.',
          es: 'Visita a la Reserva Paikawe con caminata en selva y navegación en canoa para observar los peces gigantes del Amazonas (Paiche/Arapaima). Retorno a Quito.'
        },
        image: '/images/tours/16-9/puyo-yanacocha-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 1-hour rainforest hike (500m alt.)', es: 'Tour de 6 horas y caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Free Day In Quito',
          es: 'Día 6 – Día Libre En Quito'
        },
        description: {
          en: 'Enjoy a free day to relax, explore Quito independently, or discover more of the city’s cultural and historical attractions.',
          es: 'Día libre en Quito para recorrer sus museos, gastronomía o descansar.'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 – Transfer To The Airport',
          es: 'Día 7 – Traslado Al Aeropuerto'
        },
        description: {
          en: 'Private transfer to the airport for your onward flight connections to the Galápagos Islands.\n\nEnd of the tour.',
          es: 'Traslado privado al aeropuerto para su vuelo de conexión o retorno internacional.'
        },
        image: '/images/tours/16-9/imbabura-16-9.webp',
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      }
    ]
  },

  // Tour 7: Snow-Capped Volcanoes & Waterfalls (6 Days)
  {
    id: 'snow-volcanoes-6days',
    code: '2.3',
    title: {
      en: 'Avenue Of The Volcanoes Expedition',
      es: 'Nieve, Volcanes Y Manantiales: Expedición Andina',
      fr: 'Expédition sur l\'Avenue des Volcans',
      de: 'Expedition auf der Straße der Vulkane',
      it: 'Spedizione lungo il Viale dei Vulcani',
      pt: 'Expedição pela Avenida dos Vulcões',
      ja: '火山通りの探検',
      zh: '火山大道探险之旅'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '6 DAYS / 5 NIGHTS',
      es: '6 DÍAS / 5 NOCHES',
      fr: '6 JOURS / 5 NUITS',
      de: '6 TAGE / 5 NÄCHTE',
      it: '6 GIORNI / 5 NOTTI',
      pt: '6 DIAS / 5 NOITES',
      ja: '6日間 / 5泊',
      zh: '6天 / 5晚'
    },
    durationDays: 6,
    price: 950,
    price3Star: 950,
    price4Star: 1390,
    imageUrl: '/images/tours/16-9/chimborazo-volcano-16-9.webp',
    mobileImage: '/images/tours/9-16/chimborazo-9-16.webp',
    desktopImage: '/images/tours/16-9/chimborazo-volcano-16-9.webp',
    gallery: [
      '/images/tours/16-9/chimborazo-volcano-16-9.webp',
      '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
      '/images/tours/16-9/laguna-quilotoa-16-9.webp',
      '/images/tours/16-9/cuenca-colonial-16-9.webp',
      '/images/tours/16-9/quito-colonial-16-9.webp',
      '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
      '/images/tours/16-9/otavalo-market-16-9.webp',
      '/images/tours/16-9/taita-imbabura-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 19,
    category: {
      en: 'Andean Highlights & Waterfalls',
      es: 'Aventura Andina y Cascadas',
      fr: 'Points forts des Andes et cascades',
      de: 'Anden-Highlights & Wasserfälle',
      it: 'Meraviglie Andine e Cascate',
      pt: 'Destaques Andinos e Cachoeiras',
      ja: 'アンデス絶景と滝巡り',
      zh: '安第斯山脉与瀑布速览'
    },
    description: {
      en: '6-day overland journey traversing the Avenue of the Volcanoes, adventure town of Baños, Pailón del Diablo (Devil\'s Cauldron) waterfall, Pastaza canyon, Puyo rainforest biopark, and Quilotoa turquoise crater lake.',
      es: 'Recorrido de 6 días por la Avenida de los Volcanes, Baños de Agua Santa, la cascada Pailón del Diablo, bioparque en Puyo y el cráter Quilotoa.',
      zh: '6日陆地景观之旅，沿着火山大道前进，游览冒险小镇巴尼奥斯、恶魔之咽瀑布、帕斯塔萨峡谷、普约雨林公园与基洛托阿翡翠火山湖。'
    },
    highlights: [
      { en: 'Avenue of the Volcanoes & Baños de Agua Santa', es: 'Avenida de los Volcanes y Baños de Agua Santa', zh: '火山大道与巴尼奥斯小镇' },
      { en: 'Pailón del Diablo (Devil\'s Cauldron) Mega Waterfall Hike', es: 'Caminata a la Cascada Pailón del Diablo (Devil\'s Cauldron)', zh: '恶魔之咽瀑布徒步' },
      { en: 'Puyo Amazon Rainforest & Yanacocha Biopark', es: 'Selva de Puyo y Bioparque Yanacocha', zh: '普约雨林与亚纳科查生物公园' },
      { en: 'Hola Vida Waterfall & Kichwa Community', es: 'Cascada Hola Vida y comunidad Kichwa', zh: '奥拉维达瀑布与奇瓦文化' },
      { en: 'Quilotoa Emerald Crater Lake & Tigua Art', es: 'Laguna de Quilotoa y Pinturas de Tigua', zh: '基洛托阿翡翠火山湖' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: 'Accommodation (5 nights in 3* or 4* hotels)', es: 'Alojamiento (5 noches en hoteles 3★ o 4★)' },
      { en: 'Daily breakfast and specified lunch in Puyo', es: 'Desayunos diarios y almuerzo incluido en Puyo' },
      { en: 'Entrances: Pailón del Diablo (Devil\'s Cauldron), Yanacocha, Hola Vida, Quilotoa', es: 'Entradas: Pailón del Diablo (Devil\'s Cauldron), Yanacocha, Hola Vida, Quilotoa' }
    ],
    exclusions: [
      { en: 'Personal expenses and optional activities in Baños', es: 'Gastos personales y actividades opcionales en Baños' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito',
          es: 'Día 1 – Llegada A Quito'
        },
        description: {
          en: 'Airport assistance and private transfer to your hotel.\n\nDeparture: The tour can begin on any day of the week.',
          es: 'Asistencia en aeropuerto y traslado privado al hotel en Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Quito – Baños',
          es: 'Día 2 – Quito – Baños'
        },
        description: {
          en: 'Today, we travel south along the Pan-American Highway and through Ecuador’s famous “Avenue of the Volcanoes,” home to approximately 62 volcanoes.\n\nWe continue toward Baños, a charming tourist town located at the foothills of the active Tungurahua Volcano. Surrounded by spectacular landscapes between the Amazon Rainforest and the Andes Mountains, Baños offers a wide variety of optional activities, including cycling, rafting, horseback riding, cable-car rides, hiking, and visits to beautiful waterfalls.\n\nWe will visit the spectacular Pailón del Diablo (Devil\'s Cauldron) Waterfall, one of the region’s most impressive natural attractions.',
          es: 'Viaje hacia el sur por la Avenida de los Volcanes hacia Baños de Agua Santa, al pie del volcán Tungurahua. Visita y caminata a la majestuosa cascada Pailón del Diablo (Devil\'s Cauldron).'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Baños – Amazon Rainforest – Puyo',
          es: 'Día 3 – Baños – Selva Amazónica – Puyo'
        },
        description: {
          en: 'In the morning, we head into the Amazon Rainforest, traveling through the spectacular Pastaza River Canyon toward the city of Puyo.\n\nOur first stop is Yanacocha Biopark, where you will have the opportunity to observe and learn about local animal species that have been rescued from illegal wildlife trafficking.\n\nWe then continue with a hike through the Amazon Rainforest to Hola Vida Waterfall, surrounded by lush vegetation and tropical scenery.\n\nFinally, we visit a local Indigenous family, where we will have the opportunity to learn about their traditions, culture, and way of life.\n\nAfter the visit, we return to Baños.',
          es: 'Viaje por el Cañón del Pastaza hacia Puyo. Visita al Bioparque Yanacocha de rescate de fauna, caminata por la selva a la Cascada Hola Vida y visita a una familia indígena Kichwa.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '6-hour guided tour + 2-hour rainforest hike', es: 'Tour de 6h + caminata en selva de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Baños – Quilotoa – Quito',
          es: 'Día 4 – Baños – Quilotoa – Quito'
        },
        description: {
          en: 'In the morning, we begin our journey back to Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, one of Ecuador’s most iconic natural attractions, famous for its striking turquoise waters and breathtaking Andean scenery.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater. Along the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings and Andean artistic traditions, as well as local guinea pig farms.\n\nWe then continue to Quito.',
          es: 'Viaje al cráter volcánico de Quilotoa con caminata hacia la laguna turquesa. Parada en los talleres de pintura de Tigua y retorno a Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,483 ft)', es: 'Tour de 6h + caminata de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Free Day In Quito',
          es: 'Día 5 – Día Libre En Quito'
        },
        description: {
          en: 'Enjoy a free day to explore Quito at your own pace, relax, or discover more of the city’s attractions and cultural highlights.',
          es: 'Día libre en Quito para recorrer a su propio ritmo.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Transfer To The Airport',
          es: 'Día 6 – Traslado Al Aeropuerto'
        },
        description: {
          en: 'Private transfer to the airport for your onward flight connections, including connections to the Galápagos Islands.\n\nEnd of the tour.',
          es: 'Traslado privado al aeropuerto para su vuelo de conexión o salida.'
        },
        transportation: { en: 'Private transportation' }
      }
    ]
  },

  // Tour 8: Ecuador Fantastic (8 Days)
  {
    id: 'ecuador-fantastic-8days',
    code: '2.4',
    title: {
      en: 'Fantastic Ecuador: The Complete Circuit',
      es: 'Ecuador Fantástico: La Gran Ruta De Los Andes',
      fr: 'Équateur Fantastique: Le Circuit Complet',
      de: 'Fantastisches Ecuador: Die komplette Route',
      it: 'Ecuador Fantastico: Il Circuito Completo',
      pt: 'Equador Fantástico: O Circuito Completo',
      ja: '素晴らしいエクアドル：完全な周遊',
      zh: '奇妙厄瓜多尔：全景环线游'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '8 DAYS / 7 NIGHTS',
      es: '8 DÍAS / 7 NOCHES',
      fr: '8 JOURS / 7 NUITS',
      de: '8 TAGE / 7 NÄCHTE',
      it: '8 GIORNI / 7 NOTTI',
      pt: '8 DIAS / 7 NOITES',
      ja: '8日間 / 7泊',
      zh: '8天 / 7晚'
    },
    durationDays: 8,
    price: 1490,
    price3Star: 1490,
    price4Star: 2090,
    imageUrl: '/images/tours/16-9/quito-colonial-16-9.webp',
    mobileImage: '/images/tours/9-16/quito-centro-historico.webp',
    desktopImage: '/images/tours/16-9/quito-colonial-16-9.webp',
    gallery: [
      '/images/tours/16-9/cuenca-colonial-16-9.webp',
      '/images/tours/16-9/guayaquil-16-9.webp',
      '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
      '/images/tours/16-9/laguna-quilotoa-16-9.webp',
      '/images/tours/16-9/chimborazo-volcano-16-9.webp',
      '/images/tours/16-9/otavalo-market-16-9.webp',
      '/images/tours/16-9/otavalo-market-16-9.webp',
      '/images/tours/16-9/quito-colonial-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 45,
    isPopular: true,
    category: {
      en: 'Grand Mainland Expedition',
      es: 'Gran Expedición Continental',
      fr: "Grande expédition équatorienne",
      de: 'Große Festland-Expedition',
      it: 'Grande Spedizione Continentale',
      pt: 'Grande Expedição Continental',
      ja: 'エクアドル縦断グランドツアー',
      zh: '厄瓜多尔陆地旗舰纵贯线'
    },
    description: {
      en: 'Discover the Best of Ecuador in 8 Days: Quito Historic Center, Otavalo market, Cuicocha lake, Mitad del Mundo, Baños waterfalls & Pailón del Diablo (Devil\'s Cauldron), Chimborazo Volcano (6,310m), Ingapirca Inca ruins, Colonial Cuenca, Cajas National Park lakes, and finishing in coastal Guayaquil.',
      es: 'El gran circuito ecuatoriano de 8 días: Quito colonial, mercado de Otavalo, cascadas de Baños, Chimborazo, Ingapirca, Cuenca colonial y Guayaquil.',
      zh: '8日厄瓜多尔陆地旗舰探险，连接基多、奥塔瓦洛印第安集市、库伊科查湖、巴尼奥斯恶魔之咽、钦博拉索火山（6310米）、因加皮尔卡印加遗址、昆卡世界遗产城、卡哈斯国家公园与瓜亚基尔港。'
    },
    highlights: [
      { en: 'Otavalo Artisan Market & Cuicocha Crater Lake', es: 'Mercado de Otavalo y Laguna de Cuicocha', zh: '奥塔瓦洛集市与库伊科查火山湖' },
      { en: 'Quito UNESCO Historic Center & Equator Monument', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Baños de Agua Santa & Pailón del Diablo (Devil\'s Cauldron) Waterfall', es: 'Baños y Cascada Pailón del Diablo (Devil\'s Cauldron)', zh: '巴尼奥斯与恶魔之咽瀑布' },
      { en: 'Chimborazo National Reserve (6,310m)', es: 'Reserva Nacional Chimborazo (6,310 m)', zh: '钦博拉索火山保护区（6310米）' },
      { en: 'Ingapirca Inca Archaeological Complex & Cuenca City', es: 'Complejo Arqueológico Ingapirca y Ciudad de Cuenca', zh: '因加皮尔卡印加遗址与昆卡古城' },
      { en: 'Cajas National Park Lakes & Guayaquil Port', es: 'Parque Nacional Cajas y Puerto de Guayaquil', zh: '卡哈斯国家公园与瓜亚基尔港' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout the itinerary', es: 'Transporte privado durante todo el itinerario' },
      { en: 'Professional English-speaking guide', es: 'Guía profesional bilingüe' },
      { en: '7 nights of accommodation (3* or 4* hotels)', es: '7 noches de alojamiento (hoteles 3★ o 4★)' },
      { en: 'Daily breakfast', es: 'Desayunos diarios' },
      { en: 'Entrance fees: Cuicocha, La Compañía, Intiñan, Pailón del Diablo (Devil\'s Cauldron), Chimborazo, Ingapirca, Cajas', es: 'Entradas: Cuicocha, La Compañía, Intiñan, Pailón del Diablo (Devil\'s Cauldron), Chimborazo, Ingapirca, Cajas' }
    ],
    exclusions: [
      { en: 'Meals not specified', es: 'Comidas no especificadas' },
      { en: 'Personal expenses and optional activities', es: 'Gastos personales y actividades opcionales' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito',
          es: 'Día 1 – Llegada A Quito'
        },
        description: {
          en: 'Airport assistance and private transfer to your hotel.\n\nImportant: Ecuador uses the US dollar (USD) as its official currency. We recommend carrying small-denomination bills, as larger notes may not always be accepted.',
          es: 'Recepción en el Aeropuerto de Quito y traslado privado a su hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Otavalo Artisan Market & Cuicocha Crater Lake',
          es: 'Día 2 – Plaza de Ponchos (Mercado Artesanal) De Otavalo Y Laguna De Cuicocha'
        },
        description: {
          en: 'Travel north from Quito for approximately two hours through beautiful Andean landscapes and scenic viewpoints until reaching Otavalo, home to one of the most famous Artisan Markets in South America, renowned for its traditional handicrafts, textiles and local products.\n\nIn the afternoon, continue to Cotacachi, a town famous for its high-quality leather goods and traditional craftsmanship.\n\nWe will then visit Cuicocha Crater Lake, one of Ecuador’s most spectacular volcanic lakes, located inside a breathtaking Andean landscape.\n\nReturn to Quito in the afternoon.\n\nMarket information: The largest and most vibrant Otavalo market takes place on Saturdays, although a smaller market operates daily.',
          es: 'Viaje hacia Otavalo y su mundialmente famoso mercado artesanal en la Plaza de los Ponchos. Parada en Cotacachi para artesanías de cuero y visita a la impresionante Laguna volcánica de Cuicocha. Retorno a Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Quito Historic Center & Mitad Del Mundo',
          es: 'Día 3 – Centro Histórico De Quito Y Mitad Del Mundo'
        },
        description: {
          en: 'Discover Quito, declared a UNESCO World Heritage Site and considered one of the most beautiful historic cities in the Americas.\n\nExplore both the modern and colonial areas of the city, including its magnificent churches, plazas and historic buildings: Quito Cathedral, Archbishop’s Palace, Presidential Palace, Plaza Grande, La Compañía de Jesús Church (famous for its richly decorated golden interior), and San Francisco Plaza and Church.\n\nWe will then travel to Mitad del Mundo (Middle of the World), where you can experience standing on the Equator between the Northern and Southern Hemispheres. Visit the Intiñan Museum, known for its interactive demonstrations and fascinating exhibits related to Ecuadorian culture and the Equator.',
          es: 'Recorrido por el Centro Histórico de Quito (Patrimonio UNESCO): Catedral, Palacio Presidencial, Plaza Grande, La Compañía de Jesús y San Francisco. Traslado a la Mitad del Mundo y Museo Intiñan.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour', es: 'Tour guiado de 6 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Quito – Baños: The Avenue Of Volcanoes',
          es: 'Día 4 – Quito – Baños: La Avenida De Los Volcanes'
        },
        description: {
          en: 'Travel south from Quito along the famous Avenue of the Volcanoes, a spectacular Andean route surrounded by Ecuador’s impressive volcanic landscapes.\n\nContinue to Baños de Agua Santa, a picturesque adventure town located at the foot of the active Tungurahua Volcano. Baños offers a wide range of optional activities, including cycling, rafting, hiking to waterfalls, cable-car rides, and horseback riding.\n\nLocated between the Andes and the Amazon basin, Baños is surrounded by lush vegetation, dramatic mountains and spectacular waterfalls. Visit the famous Pailón del Diablo (Devil\'s Cauldron) Waterfall before settling into your hotel.',
          es: 'Viaje por la Avenida de los Volcanes hacia Baños de Agua Santa, al pie del volcán Tungurahua. Visita a la imponente cascada Pailón del Diablo (Devil\'s Cauldron) y noche en Baños.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Chimborazo National Reserve, Ingapirca & Cuenca',
          es: 'Día 5 – Reserva Chimborazo, Ingapirca Y Cuenca'
        },
        description: {
          en: 'Start early with a visit to the Chimborazo Reserve, home to Chimborazo Volcano, Ecuador’s highest mountain at approximately 6,310 meters (20,700 ft) above sea level.\n\nEnjoy the opportunity to observe the unique flora and fauna of the high Andean páramo and hike toward the mountain refuge at approximately 5,000 meters (16,400 ft), weather and conditions permitting.\n\nContinue toward Cuenca, with a fascinating stop at Ingapirca, Ecuador’s most important Inca archaeological complex.',
          es: 'Ascenso a la Reserva Chimborazo (6,310 m), la montaña más alta del Ecuador y el punto más cercano al Sol. Caminata hacia el refugio a 5,000 m. Continuación a Ingapirca, el complejo arqueológico inca más importante del país, y llegada a Cuenca.'
        },
        accommodation: { en: 'Cuenca', es: 'Cuenca' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Cuenca City Tour',
          es: 'Día 6 – City Tour En Cuenca'
        },
        description: {
          en: 'Discover Cuenca, another UNESCO World Heritage Site and one of Ecuador’s most beautiful cities, famous for its charming streets, historic buildings, plazas and churches.\n\nVisit: Cuenca Cathedral, Plaza de las Flores, a traditional toquilla straw hat workshop (Panama hats), El Barranco along the Tomebamba River, and modern Cuenca. Finish the tour at El Turi Viewpoint, offering panoramic views over the city.\n\nThe remainder of the afternoon is free for you to explore Cuenca at your own pace.',
          es: 'City tour en Cuenca (Patrimonio UNESCO): Catedral Nueva, Plaza de las Flores, fábrica de sombreros de paja toquilla, El Barranco del Río Tomebamba y Mirador de Turi. Tarde libre.'
        },
        accommodation: { en: 'Cuenca', es: 'Cuenca' },
        activity: { en: '3-hour guided tour', es: 'Tour guiado de 3 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 – Cuenca – Cajas National Park – Guayaquil',
          es: 'Día 7 – Cuenca – Parque Nacional Cajas – Guayaquil'
        },
        description: {
          en: 'Depart Cuenca and travel west through the spectacular Cajas National Park, famous for its rugged Andean landscapes and approximately 200 natural lakes and lagoons.\n\nDepending on weather and trail conditions, enjoy a hike around Laguna Toreadora, while observing the distinctive flora and fauna of Ecuador’s high-altitude páramo ecosystem.\n\nFrom the high Andes, the road then descends dramatically toward sea level, arriving in Guayaquil, Ecuador’s largest port city and economic capital.',
          es: 'Cruce del Parque Nacional Cajas con más de 200 lagunas glaciares. Caminata alrededor de la Laguna Toreadora y descenso panorámico desde los Andes hasta la ciudad costera de Guayaquil.'
        },
        accommodation: { en: 'Guayaquil', es: 'Guayaquil' },
        activity: { en: '6-hour guided tour, including 2h hike (up to 3,500m)', es: 'Tour guiado de 6h con caminata de 2h' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'Vehículo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 – Departure From Guayaquil',
          es: 'Día 8 – Salida Desde Guayaquil'
        },
        description: {
          en: 'Private transfer to José Joaquín de Olmedo International Airport in Guayaquil for your onward flight or connection to the Galápagos Islands.\n\nEnd of the Ecuador Fantastic journey.',
          es: 'Traslado privado al Aeropuerto Internacional José Joaquín de Olmedo en Guayaquil para su vuelo internacional o conexión a Galápagos. Fin del viaje.'
        },
        transportation: { en: 'Private airport transfer', es: 'Traslado privado al aeropuerto' }
      }
    ]
  },

  // Tour 9: Ecuador & Galapagos 12 Days
  {
    id: 'ecuador-galapagos-12days',
    code: '3.1',
    title: {
      en: 'The Ultimate Ecuador & Galapagos Odyssey',
      es: 'De Los Andes Al Encanto De Galápagos',
      fr: 'L\'Odyssée Ultime: Équateur et Galápagos',
      de: 'Die ultimative Ecuador & Galapagos Odyssee',
      it: 'L\'Odissea Definitiva: Ecuador e Galapagos',
      pt: 'A Odisséia Definitiva: Equador e Galápagos',
      ja: '究極のエクアドル＆ガラパゴスの旅',
      zh: '厄瓜多尔与加拉帕戈斯终极奥德赛'
    },
    destination: 'Ecuador & Galapagos',
    duration: {
      en: '12 DAYS / 11 NIGHTS',
      es: '12 DÍAS / 11 NOCHES',
      fr: '12 JOURS / 11 NUITS',
      de: '12 TAGE / 11 NÄCHTE',
      it: '12 GIORNI / 11 NOTTI',
      pt: '12 DIAS / 11 NOITES',
      ja: '12日間 / 11泊',
      zh: '12天 / 11晚'
    },
    durationDays: 12,
    price: 2590,
    price3Star: 2590,
    price4Star: 2750,
    imageUrl: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.webp',
    mobileImage: '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.webp',
    desktopImage: '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.webp',
    gallery: [
      '/images/tours/16-9/galapagos-snorkeling-16-9.webp',
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
      '/images/tours/16-9/isabela-island-16-9.webp',
      '/images/tours/16-9/galapagos-tintoreras16-9.webp',
      '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
      '/images/tours/16-9/laguna-quilotoa-16-9.webp',
      '/images/tours/16-9/amazon-river-16-9.webp',
      '/images/tours/16-9/quito-colonial-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 52,
    isPopular: true,
    category: {
      en: 'Ultimate Mainland & Galapagos',
      es: 'Expedición Suprema Continente y Galápagos',
      fr: "Ultime combiné Équateur et Galapagos",
      de: 'Ultimative Ecuador & Galapagos Expedition',
      it: 'Spedizione Suprema Continente e Galapagos',
      pt: 'Expedição Suprema Equador e Galápagos',
      ja: 'エクアドル＆ガラパゴス至高の旅',
      zh: '大陆雨林与海岛巅峰12日游'
    },
    description: {
      en: '12-day flagship expedition: Quito colonial city & Equator, Papallacta thermal springs, Tena Amazon lodge with motorized canoe & caiman lagoon, Paikawe giant fish reserve, Santa Cruz highlands & giant tortoises, Isabela Island flamingo lagoon & Tintoreras snorkeling, Las Grietas, and full-day yacht cruise to Santa Fe or Pinzón Island.',
      es: 'Expedición insignia de 12 días: combina Quito colonial y Amazonía de Tena con 6 días de exploración insular, fauna y playas en Galápagos.',
      zh: '12日顶级奢华联合探险，涵盖基多历史名城、赤道线、帕帕亚克塔温泉、特纳亚马逊木屋、派卡韦保护区巨鱼、加拉帕戈斯圣克鲁斯、伊莎贝拉岛、蒂恩托雷拉斯石礁、拉斯格里塔斯及圣菲岛/平松岛全天游艇巡航。'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Equator Line', es: 'Centro Histórico de Quito y Mitad del Mundo', zh: '基多历史中心与赤道纪念碑' },
      { en: 'Papallacta Thermal Hot Springs & Antisana Views', es: 'Termas de Papallacta y Vistas del Antisana', zh: '帕帕亚克塔高山温泉' },
      { en: 'Tena Amazon Lodge, Canoe & Caiman Lagoon', es: 'Lodge en Tena, Canoa y Laguna de Caimanes', zh: '特纳亚马逊雨林木屋与木舟' },
      { en: 'Paikawe Amazon Reserve & Giant Fish Lagoon', es: 'Reserva Paikawe y Peces Gigantes del Amazonas', zh: '派卡韦保护区与巨型鱼类泻湖' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟保护区' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna de Flamingos y Tintoreras', zh: '伊莎贝拉岛与蒂恩托雷拉斯石礁' },
      { en: 'Full-Day Yacht Cruise to Santa Fe or Pinzón Island', es: 'Navegación en Yate a Isla Santa Fe o Pinzón', zh: '圣菲岛或平松岛全天游艇巡航' }
    ],
    inclusions: [
      { en: 'Airport assistance and all private transfers', es: 'Asistencia en aeropuertos y traslados privados' },
      { en: 'Private transportation on mainland and Galápagos transfers', es: 'Transporte privado en continente y traslados en Galápagos' },
      { en: 'Plane Ticket (Quito – Baltra – Quito)', es: 'Boleto aéreo Quito – Baltra – Quito' },
      { en: 'Professional English-speaking guides and Level III Naturalists', es: 'Guías profesionales y Naturalistas Nivel III' },
      { en: '11 nights accommodation (hotels 3* or 4* / Amazon lodge / Galápagos hotels)', es: '11 noches de alojamiento (hoteles 3★ o 4★ / Lodge amazónico / Hoteles Galápagos)' },
      { en: 'Daily breakfast, lunches and dinners as specified', es: 'Desayunos diarios, almuerzos y cenas según itinerario' },
      { en: 'Snorkeling equipment for organized boat excursions', es: 'Equipo de snorkel para excursiones en barco' },
      { en: 'All entrance fees: La Compañía, Intiñan, Papallacta, Paikawe, Galápagos sites', es: 'Todas las entradas según programa' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 200.00 foreign / USD 6.00 national', es: 'Entrada al Parque Nacional Galápagos: USD 200.00 extranjeros / USD 6.00 nacionales' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Dinners in Galápagos', es: 'Cenas en Galápagos' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito | Airport Assistance & Hotel Transfer',
          es: 'Día 1 – Llegada A Quito | Asistencia En Aeropuerto Y Traslado'
        },
        description: {
          en: 'Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.',
          es: 'Llegada al Aeropuerto de Quito, bienvenida por nuestro representante y traslado privado al hotel. Tiempo libre para descansar y aclimatarse.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transfer', es: 'Traslado privado' },
        meals: { en: 'Not included', es: 'No incluidas' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Quito City Tour & Mitad Del Mundo',
          es: 'Día 2 – City Tour En Quito Y Mitad Del Mundo'
        },
        description: {
          en: 'After breakfast, we will explore Quito, the capital of Ecuador and one of the country\'s most important cultural destinations. The city was declared a UNESCO World Heritage Site in 1978 and is renowned for its beautifully preserved historic center, colonial architecture and spectacular Andean setting.\n\nOur city tour will include both the modern and historic areas of Quito. In the historic center, we will visit some of the city\'s most important landmarks, including Plaza Grande, where we will see the Metropolitan Cathedral, the Archbishop\'s Palace and the Presidential Palace.\n\nWe will continue to the impressive Church of La Compañía de Jesús, famous for its richly decorated interior covered with gold leaf. We will also visit San Francisco Square and Church, one of the most iconic architectural complexes in Quito.\n\nAfter exploring the historic center, we will continue towards the Equator Monument and Mitad del Mundo. Here, we will visit the Intiñan Museum, where you can learn about indigenous cultures and participate in a variety of fascinating experiments related to the Equator.\n\nYou will have the opportunity to experience the unique sensation of standing at the Equator, where the Northern and Southern Hemispheres meet.',
          es: 'City tour completo por Quito colonial: Plaza Grande, Catedral, Palacio de Carondelet, Iglesia de la Compañía de Jesús y San Francisco. Traslado a la Mitad del Mundo y Museo Intiñan.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '5-hour guided tour', es: 'Tour guiado de 5 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Quito – Papallacta – Tena | Andean Highlands & Thermal Springs',
          es: 'Día 3 – Quito – Papallacta – Tena | Termas Y Páramo Andino'
        },
        description: {
          en: 'After breakfast, we will travel east from Quito towards Papallacta, following a historic route once used by Spanish explorers in the 16th century in their search for gold and cinnamon, eventually leading towards the discovery and exploration of the Amazon region.\n\nAlong the way, we will pass by Guápulo Church and continue through the spectacular Andean mountains, reaching elevations of approximately 4,100 meters / 13,450 feet above sea level.\n\nThe route passes through protected natural areas and offers impressive views of the Andean landscape before descending gradually towards the transition zone between the Andes and the Amazon Basin.\n\nWe will stop at the famous Papallacta Hot Springs, where you can enjoy the thermal pools at different temperatures while admiring the surrounding mountain scenery and, weather permitting, views of Antisana Volcano (5,704 meters / 18,714 feet).\n\nYou may also choose to relax at the spa, enjoy a massage or hydrotherapy treatment, or take a short walk along the surrounding trails.\n\nAfter the visit, we will continue our descent towards the Amazon region and the town of Tena.',
          es: 'Viaje hacia la Amazonía cruzando los Andes a 4,100 m. Parada en las Termas de Papallacta para disfrutar de sus aguas termales frente al Antisana. Descenso al lodge en Tena.'
        },
        accommodation: { en: 'Tena – Lodge', es: 'Tena – Lodge' },
        activity: { en: '6-hour guided tour + 1h nature walk', es: 'Tour guiado de 6h + caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Tena | Amazon Rainforest Experience | Wildlife Rescue Center | Kichwa Community',
          es: 'Día 4 – Tena | Experiencia En Selva Amazónica | Centro De Rescate | Comunidad Kichwa'
        },
        description: {
          en: 'After breakfast, we will begin our Amazon adventure with a motorized canoe ride along the river, traveling downstream through the lush rainforest.\n\nOur first visit will be to a wildlife rescue and rehabilitation center, where you will learn about native Amazonian species and conservation efforts to protect animals affected by illegal wildlife trafficking and other threats.\n\nWe will then continue into the primary rainforest, where, accompanied by a local native guide, we will take a hike through the jungle. The walk offers an opportunity to discover the incredible biodiversity of the Amazon and learn about the traditional uses of plants and the relationship between local communities and the forest.\n\nWe will also visit a local Kichwa family, where you will have the opportunity to learn about their traditions, customs and culture and gain a deeper understanding of their connection with the Amazon environment.\n\nOur final visit will be to a caiman lagoon, where we will learn about these fascinating reptiles and the aquatic ecosystems of the rainforest.\n\nAfter the excursion, we will return to the lodge.',
          es: 'Canoa motorizada por el río, visita a centro de rescate de animales silvestres, caminata botánica en selva primaria con guía nativo, encuentro cultural con familia Kichwa y laguna de caimanes.'
        },
        accommodation: { en: 'Tena – Lodge', es: 'Tena – Lodge' },
        activity: { en: '6-hour guided tour + 1h motorized canoe ride', es: 'Tour de 6h + canoa motorizada de 1h' },
        transportation: { en: 'Private transportation and motorized canoe', es: 'Transporte privado y canoa motorizada' },
        meals: { en: 'Breakfast, lunch and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Tena – Misahuallí | Paikawe Reserve | Amazon Lagoon | Quito',
          es: 'Día 5 – Tena – Misahuallí | Reserva Paikawe | Laguna Amazónica | Quito'
        },
        description: {
          en: 'After breakfast, we will visit Paikawe Reserve, a beautiful Amazonian natural area where you will have the opportunity to experience the rainforest from both land and water.\n\nWe will take a walk through primary rainforest, accompanied by a local guide, and learn about the biodiversity and natural environment of the region.\n\nWe will then navigate the lagoon by canoe, where you may have the opportunity to observe some of the giant fish species found in the Amazon, depending on natural conditions and wildlife activity.\n\nAfter the visit, we will begin our return journey to Quito.',
          es: 'Caminata en la selva de la Reserva Paikawe y canoa por la laguna para observar los peces gigantes del Amazonas. Retorno a Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 1h rainforest hike', es: 'Tour de 6h + caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Quito | Free Day',
          es: 'Día 6 – Quito | Día Libre'
        },
        description: {
          en: 'Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city independently, visit additional museums and cultural attractions, enjoy local cuisine, or simply relax at the hotel.\n\nThis free day also provides an opportunity to rest before continuing your journey to the Galápagos Islands the following day.\n\nOptional excursions and activities can be arranged upon request.',
          es: 'Día libre en Quito para recorrer la ciudad a su ritmo y descansar antes del viaje a Galápagos.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 – Quito – Baltra | Twin Craters | Primicias Ranch | Puerto Ayora',
          es: 'Día 7 – Quito – Baltra | Cráteres Gemelos | Rancho Primicias | Puerto Ayora'
        },
        description: {
          en: 'After breakfast, transfer to Mariscal Sucre International Airport for your flight to the Galápagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your Galápagos adventure.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will continue towards the highlands to visit the famous Twin Craters (Los Gemelos), two impressive volcanic formations surrounded by the lush vegetation of the Santa Cruz highlands.\n\nHere, you will learn about the geological origins of the island and discover the unique Scalesia forest, one of the characteristic ecosystems of the Santa Cruz highlands.\n\nWe will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment. This is an excellent opportunity to photograph these iconic animals and learn about their importance to the Galápagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'Vuelo a Galápagos (Baltra), bienvenida y cruce del Canal de Itabaca hacia Santa Cruz. Visita a los Cráteres Gemelos en el bosque de Scalesia y Rancho Primicias con tortugas gigantes en libertad. Check-in en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado terrestre y shuttle de aeropuerto' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 – Santa Cruz To Isabela | Flamingo Lagoon | Tortoise Breeding Center | Tintoreras',
          es: 'Día 8 – Santa Cruz A Isabela | Laguna De Flamingos | Centro De Crianza | Tintoreras'
        },
        description: {
          en: 'After breakfast, we will transfer to the pier to board a speedboat to Isabela Island. The crossing takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will begin our exploration of Isabela.\n\nOur first stop will be the Flamingo Lagoon, one of the island\'s most important wetland areas. Here, you may observe Galápagos flamingos feeding and resting in the shallow waters, together with other species of coastal and migratory birds.\n\nWe will then visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nIn the afternoon, we will take a boat excursion to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. The area is famous for its crystal-clear waters and rich marine life.\n\nDuring the snorkeling activity, you may have the opportunity to encounter sea lions, sea turtles, rays, colorful tropical fish and Galápagos penguins, depending on sea conditions and wildlife activity.\n\nAfter the excursion, return to Puerto Villamil and enjoy the evening at leisure.',
          es: 'Lancha rápida a Isla Isabela. Visita a la Laguna de Flamingos y al Centro de Crianza de Tortugas Gigantes. Por la tarde, excursión náutica a Tintoreras para snorkel con lobos marinos, tortugas, pingüinos y rayas. Noche en Isabela.'
        },
        accommodation: { en: 'Isabela Island – Puerto Villamil', es: 'Isla Isabela – Puerto Villamil' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Full-day guided excursion and snorkeling', es: 'Excursión guiada full-day y snorkeling' },
        transportation: { en: 'Shared speedboat and local land transportation', es: 'Lancha rápida compartida y transporte terrestre' }
      },
      {
        day: 9,
        title: {
          en: 'Day 9 – Isabela To Santa Cruz | La Lobería | Las Grietas',
          es: 'Día 9 – Isabela A Santa Cruz | La Lobería | Las Grietas'
        },
        description: {
          en: 'After breakfast, we will return to the pier for the speedboat transfer back to Santa Cruz Island.\n\nUpon arrival in Puerto Ayora, we will continue with a visit to La Lobería, a small coastal area known for its population of Galápagos sea lions. This is an excellent place to observe these playful animals both on the beach and in the water.\n\nWe will then visit Las Grietas, a spectacular natural formation created by volcanic activity. This narrow canyon is filled with clear, turquoise water and is one of the most popular swimming and snorkeling sites near Puerto Ayora.\n\nDuring the snorkeling activity, you will have the opportunity to explore the underwater environment and observe colorful tropical fish and other marine species.\n\nAfter the excursion, return to Puerto Ayora and check in at your hotel. The remainder of the afternoon and evening will be free to relax or explore the town independently.',
          es: 'Lancha de regreso a Santa Cruz. Visita a La Lobería para observar lobos marinos e iguanas, seguida de caminata y natación en las aguas cristalinas de Las Grietas. Tarde libre en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Guided excursion and snorkeling', es: 'Excursión guiada y snorkeling' },
        transportation: { en: 'Speedboat and private/local land transportation', es: 'Lancha rápida y transporte terrestre' }
      },
      {
        day: 10,
        title: {
          en: 'Day 10 – Full-Day Excursion To Santa Fe Or Pinzón Island',
          es: 'Día 10 – Excursión Full-Day A Isla Santa Fe O Isla Pinzón'
        },
        description: {
          en: 'Today, enjoy a full-day boat excursion to one of the Galápagos\' outstanding snorkeling destinations: Santa Fe Island or Pinzón Island, depending on availability, sea conditions and the selected tour.\n\nSanta Fe Island is known for its beautiful turquoise waters, white sandy beaches and endemic wildlife. During the excursion, you may encounter sea lions, sea turtles, rays, marine iguanas and a variety of tropical fish. The island is also home to the endemic Santa Fe land iguana.\n\nAlternatively, the excursion may take you to Pinzón Island, a spectacular location surrounded by clear waters and abundant marine life. The snorkeling sites around Pinzón are particularly well known for encounters with sea turtles, sea lions, rays, colorful fish and, with some luck, Galápagos penguins.\n\nThe day will include navigation, snorkeling and opportunities to observe wildlife both above and below the water. Lunch will generally be provided during the excursion, depending on the selected tour.\n\nReturn to Puerto Ayora in the afternoon and enjoy your final evening in the Galápagos.',
          es: 'Navegación de día completo en yate hacia Santa Fe o Pinzón con sesiones de snorkel de alta biodiversidad. Almuerzo a bordo incluido. Retorno por la tarde a Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        activity: { en: 'Full-day boat excursion and snorkeling', es: 'Excursión en barco full-day y snorkel' }
      },
      {
        day: 11,
        title: {
          en: 'Day 11 – Santa Cruz – Baltra Airport | Departure',
          es: 'Día 11 – Santa Cruz – Aeropuerto De Baltra | Salida'
        },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport (Baltra).\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Ecuador and Galápagos Islands experience.',
          es: 'Traslado al Aeropuerto de Baltra y vuelo de retorno a Quito. Recepción y traslado al hotel en Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado y shuttle de aeropuerto' }
      },
      {
        day: 12,
        title: {
          en: 'Day 12 – Quito | International Departure',
          es: 'Día 12 – Quito | Salida Internacional'
        },
        description: {
          en: 'After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and Galápagos Islands experience.',
          es: 'Desayuno y traslado privado al Aeropuerto Mariscal Sucre de Quito para abordar su vuelo internacional de retorno. Fin de los servicios.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private airport transfer', es: 'Traslado privado al aeropuerto' }
      }
    ]
  },

  // Tour 10: Ecuador & Galapagos 11 Days
  {
    id: 'ecuador-galapagos-11days',
    code: '3.2',
    title: {
      en: 'Master Journey: Mainland Ecuador To Galapagos',
      es: 'Ecuador Y Galápagos En Breve: Magia Y Aventura',
      fr: 'Voyage Maître: De l\'Équateur Continental aux Galápagos',
      de: 'Meisterreise: Vom Festland Ecuadors nach Galapagos',
      it: 'Viaggio Maestro: Dall\'Ecuador Continentale alle Galapagos',
      pt: 'Jornada Mestra: Do Equador Continental a Galápagos',
      ja: 'エクアドル本土からガラパゴスへのマスタージャーニー',
      zh: '大师之旅：从厄瓜多尔大陆到加拉帕戈斯'
    },
    destination: 'Ecuador & Galapagos',
    duration: {
      en: '11 DAYS / 10 NIGHTS',
      es: '11 DÍAS / 10 NOCHES',
      fr: '11 JOURS / 10 NUITS',
      de: '11 TAGE / 10 NÄCHTE',
      it: '11 GIORNI / 10 NOTTI',
      pt: '11 DIAS / 10 NOITES',
      ja: '11日間 / 10泊',
      zh: '11天 / 10晚'
    },
    durationDays: 11,
    price: 2290,
    price3Star: 2290,
    price4Star: 2450,
    imageUrl: '/images/tours/16-9/galapagos-snorkeling-16-9.webp',
    mobileImage: '/images/tours/9-16/galapagos-snorkeling-9-16.webp',
    desktopImage: '/images/tours/16-9/galapagos-snorkeling-16-9.webp',
    gallery: [
      '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.webp',
      '/images/tours/16-9/galapagos-tortuga-bay-16-9.webp',
      '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
      '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
      '/images/tours/16-9/chimborazo-volcano-16-9.webp',
      '/images/tours/16-9/laguna-quilotoa-16-9.webp',
      '/images/tours/16-9/otavalo-market-16-9.webp',
      '/images/tours/16-9/quito-colonial-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 32,
    isPopular: true,
    category: {
      en: 'Classic Mainland & Galapagos',
      es: 'Clásico Continente y Galápagos',
      fr: 'Classique Équateur et Galapagos',
      de: 'Klassisches Ecuador & Galapagos',
      it: 'Classico Ecuador e Galapagos',
      pt: 'Clássico Equador e Galápagos',
      ja: 'エクアドル＆ガラパゴス周遊',
      zh: '海陆经典联合全景游'
    },
    description: {
      en: '11-day master journey connecting mainland Ecuador (Quito, Avenue of Volcanoes, Baños Pailón del Diablo (Devil\'s Cauldron), Puyo Amazon Rainforest, Quilotoa Crater Lake) with Galápagos Islands (Santa Cruz highlands, giant tortoises, Isabela full-day with Tintoreras & flamingos, La Lobería and Las Grietas canyon).',
      es: 'Travesía de 11 días conectando los Andes, Baños, la Amazonía y Quilotoa con las maravillas volcánicas, tortugas gigantes y playas de Galápagos.',
      zh: '11日经典联合行程，将厄瓜多尔大陆（基多、巴尼奥斯恶魔之咽、普约亚马逊、基洛托阿）与加拉帕戈斯群岛（圣克鲁斯、伊莎贝拉、蒂恩托雷拉斯、拉斯格里塔斯）完美融合。'
    },
    highlights: [
      { en: 'Avenue of the Volcanoes & Baños Pailón del Diablo (Devil\'s Cauldron)', es: 'Avenida de los Volcanes y Baños Pailón del Diablo (Devil\'s Cauldron)', zh: '火山大道与巴尼奥斯恶魔之咽' },
      { en: 'Puyo Amazon Rainforest & Kichwa Community', es: 'Selva Amazónica de Puyo y Comunidad Kichwa', zh: '普约亚马逊雨林与奇瓦社区' },
      { en: 'Quilotoa Emerald Volcanic Crater Lake', es: 'Laguna del Cráter de Quilotoa', zh: '基洛托阿翡翠火山湖' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: '圣克鲁斯高地与巨龟保护区' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna de Flamingos y Tintoreras', zh: '伊莎贝拉岛、火烈鸟与蒂恩托雷拉斯' },
      { en: 'Las Grietas Crystal-Clear Volcanic Chasm', es: 'Cañón Volcánico de Las Grietas', zh: '拉斯格里塔斯火山峡谷潜水' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout mainland Ecuador', es: 'Transporte privado en Ecuador continental' },
      { en: 'Plane Ticket (Quito – Baltra – Quito)', es: 'Boleto aéreo Quito – Baltra – Quito' },
      { en: 'Professional English-speaking guides and Level III Naturalists', es: 'Guías profesionales bilingües y Naturalistas Nivel III' },
      { en: '10 nights accommodation (3* or 4* hotels in mainland & Galápagos)', es: '10 noches de alojamiento (hoteles 3★ o 4★ en continente y Galápagos)' },
      { en: 'Daily breakfast, plus specified lunches in Puyo and Isabela', es: 'Desayunos diarios, y almuerzos incluidos en Puyo e Isabela' },
      { en: 'Entrances: Pailón del Diablo (Devil\'s Cauldron), Yanacocha, Hola Vida, Quilotoa, Galápagos sites', es: 'Todas las entradas según itinerario' }
    ],
    exclusions: [
      { en: 'Galápagos National Park entrance fee: USD 200.00 foreign / USD 6.00 national', es: 'Entrada al Parque Nacional Galápagos: USD 200.00 extranjeros / USD 6.00 nacionales' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de Tránsito (TCT): USD 20.00' },
      { en: 'Dinners in Galápagos and mainland (unless specified)', es: 'Cenas' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 – Arrival In Quito | Airport Assistance & Hotel Transfer',
          es: 'Día 1 – Llegada A Quito | Asistencia En Aeropuerto Y Traslado'
        },
        description: {
          en: 'Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThis program can begin on any day of the week, depending on your travel arrangements.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.',
          es: 'Llegada al Aeropuerto Mariscal Sucre de Quito, recepción y traslado privado al hotel. Tiempo libre para descansar y aclimatarse.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado (vehículos 4x4 o buses turísticos)' },
        meals: { en: 'Not included', es: 'No incluidas' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 – Quito – Baños | Avenue Of The Volcanoes | Pailón Del Diablo Waterfall',
          es: 'Día 2 – Quito – Baños | Avenida De Los Volcanes | Cascada Pailón Del Diablo'
        },
        description: {
          en: 'After breakfast, we will travel south along the Pan-American Highway, following the famous Avenue of the Volcanoes, one of the most spectacular landscapes in the Ecuadorian Andes.\n\nThe route takes us through a region surrounded by numerous volcanic peaks before continuing towards Baños de Agua Santa, a charming tourist town located at the foothills of the active Tungurahua Volcano.\n\nBaños is surrounded by dramatic mountain scenery, waterfalls and lush vegetation, offering a wide variety of adventure activities such as cycling, rafting, hiking, tarabita cable-car rides and horseback riding.\n\nDuring today\'s excursion, we will visit the spectacular Pailón del Diablo (Devil\'s Cauldron) Waterfall, one of Ecuador\'s most impressive waterfalls. We will follow the trails through the lush vegetation and enjoy different viewpoints of the waterfall.\n\nBaños is located in a unique geographical setting between the Andes and the Amazon region, creating an extraordinary combination of ecosystems and landscapes.\n\nAfter the visit, we will continue to the hotel in Baños.',
          es: 'Viaje hacia el sur por la Panamericana a través de la Avenida de los Volcanes hacia Baños de Agua Santa, al pie del volcán Tungurahua. Excursión y caminata a la cascada Pailón del Diablo (Devil\'s Cauldron). Noche en Baños.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 – Baños – Amazon Rainforest | Puyo | Yanacocha Biopark | Hola Vida Waterfall | Kichwa Community',
          es: 'Día 3 – Baños – Selva Amazónica | Puyo | Bioparque Yanacocha | Cascada Hola Vida | Comunidad Kichwa'
        },
        description: {
          en: 'After breakfast, we will head east towards the Amazon Rainforest, traveling through the spectacular Pastaza River Canyon on our way to the city of Puyo, one of the gateways to Ecuador\'s Amazon region.\n\nOur first stop will be Yanacocha Biopark, where you will learn about and observe native animal species that have been rescued from illegal wildlife trafficking. The biopark is dedicated to wildlife conservation and environmental education.\n\nWe will then continue into the Amazon Rainforest for a guided hike through the lush vegetation to Hola Vida Waterfall. The approximately two-hour hike offers an opportunity to experience the extraordinary biodiversity of the rainforest and enjoy its natural surroundings.\n\nLater, we will visit a local Kichwa family, where you will have the opportunity to learn about their traditions, customs and way of life. This cultural encounter provides an authentic insight into the relationship between the local community and the Amazon Rainforest.\n\nWe will then begin our return journey to Baños.',
          es: 'Viaje por el cañón del Pastaza hacia la selva de Puyo. Visita al Bioparque Yanacocha, caminata de 2h a la cascada Hola Vida y encuentro cultural con una familia Kichwa. Retorno a Baños.'
        },
        accommodation: { en: 'Baños', es: 'Baños' },
        activity: { en: '6-hour guided tour + 2-hour rainforest hike', es: 'Tour de 6h + caminata en selva de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 – Baños – Quilotoa – Quito | Quilotoa Crater Lake | Tigua',
          es: 'Día 4 – Baños – Quilotoa – Quito | Laguna De Quilotoa | Tigua'
        },
        description: {
          en: 'After breakfast, we will begin our journey towards Quito, traveling through some of the most spectacular landscapes of the Ecuadorian Andes.\n\nOur main stop will be Quilotoa Crater Lake, one of Ecuador\'s most iconic natural attractions. The lake lies inside the crater of an ancient volcano and is famous for its striking turquoise-green waters surrounded by dramatic Andean landscapes.\n\nDuring the visit, you will have the opportunity to enjoy a two-hour hike towards the bottom of the crater. The descent provides spectacular views of the lake and surrounding mountains. Please note that the return hike is more demanding due to the steep terrain and altitude.\n\nAlong the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings depicting Andean culture and everyday life. Depending on local availability, we may also visit a traditional guinea pig farm and learn about this important element of Andean rural life.\n\nWe will then continue to Quito.',
          es: 'Viaje al Cráter Volcánico de Quilotoa con caminata de 2h hacia la laguna verde esmeralda. Parada en el pueblo de pintores de Tigua y continuación hacia Quito.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,500 ft)', es: 'Tour de 6h + caminata de 2h (3,500 m)' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 – Quito | Free Day',
          es: 'Día 5 – Quito | Día Libre'
        },
        description: {
          en: 'Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city\'s historic center, visit museums and cultural attractions, discover local cuisine, or simply relax at the hotel.\n\nOptional excursions and activities can be arranged upon request.\n\nThis free day also provides an opportunity to rest before continuing your journey to the Galápagos Islands the following day.',
          es: 'Día libre en Quito para explorar sus tesoros históricos, gastronomía o descansar antes del vuelo a Galápagos.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Not included unless specified', es: 'No incluido' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 – Quito – Baltra | Twin Craters | Primicias Ranch | Puerto Ayora',
          es: 'Día 6 – Quito – Baltra | Cráteres Gemelos | Rancho Primicias | Puerto Ayora'
        },
        description: {
          en: 'After breakfast, transfer to Mariscal Sucre International Airport for your flight to the Galápagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your Galápagos adventure.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will travel to the highlands to visit the famous Twin Craters (Los Gemelos). These impressive volcanic formations are surrounded by lush Scalesia forest and offer an excellent introduction to the unique geological landscape of Santa Cruz Island.\n\nWe will then continue to Primicias Ranch, a private reserve where giant Galápagos tortoises can be observed roaming freely in their natural environment. During the visit, you will learn about these iconic animals and their importance to the Galápagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'Vuelo a Baltra, bienvenida y cruce a Santa Cruz. Visita a los Cráteres Gemelos en el bosque de Scalesia y Rancho Primicias con tortugas gigantes en libertad. Check-in en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado terrestre y shuttle de aeropuerto' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 – Full-Day Excursion To Isabela Island | Tortoise Breeding Center | Flamingo Lagoon | Tintoreras',
          es: 'Día 7 – Excursión Full-Day A Isla Isabela | Centro De Crianza | Laguna De Flamingos | Tintoreras'
        },
        description: {
          en: 'After breakfast, transfer to the pier to board a speedboat to Isabela Island. The navigation takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nWe will then visit the Flamingo Lagoon, one of the island\'s most important wetlands. Depending on natural conditions, you may observe Galápagos flamingos and other bird species in their natural habitat.\n\nThe excursion will continue with a boat trip to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. Its clear waters and rich marine environment make it an excellent snorkeling destination.\n\nDuring the snorkeling activity, you may have the opportunity to observe sea lions, sea turtles, rays, penguins and colorful tropical fish, depending on wildlife activity and sea conditions.\n\nAfter the excursion, we will return by speedboat to Santa Cruz Island and Puerto Ayora.',
          es: 'Lancha rápida a Isabela. Visita al Centro de Crianza y Laguna de Flamingos. Excursión náutica al Islote Tintoreras con snorkeling (lobos marinos, tortugas, pingüinos, rayas y peces). Retorno a Santa Cruz.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        activity: { en: 'Full-day guided excursion and snorkeling', es: 'Excursión guiada full-day y snorkeling' },
        transportation: { en: 'Shared speedboat and private land transportation', es: 'Lancha rápida y transporte privado' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 – La Lobería | Punta Estrada | Las Grietas',
          es: 'Día 8 – La Lobería | Punta Estrada | Las Grietas'
        },
        description: {
          en: 'After breakfast, we will begin the day\'s activities with a visit to La Lobería, a coastal area famous for its resident population of Galápagos sea lions. Here, you will have the opportunity to observe these playful animals in their natural environment.\n\nWe will then continue to Punta Estrada, a beautiful coastal area surrounded by rocky formations and clear waters. The area offers excellent opportunities for nature observation and marine activities.\n\nThe excursion will continue to Las Grietas, a spectacular natural formation consisting of a narrow volcanic canyon filled with crystal-clear turquoise water. This is one of the most popular snorkeling and swimming sites near Puerto Ayora.\n\nDuring the snorkeling activity, you can explore the underwater environment and observe a variety of colorful fish and marine life.\n\nAfter the visit, return to Puerto Ayora and enjoy the remainder of the day at leisure.',
          es: 'Visita a La Lobería con lobos marinos, Punta Estrada y natación/snorkel en el cañón volcánico de Las Grietas. Tarde libre en Puerto Ayora.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Guided excursion and snorkeling', es: 'Excursión guiada y snorkel' }
      },
      {
        day: 9,
        title: {
          en: 'Day 9 – Santa Cruz | Free Day',
          es: 'Día 9 – Santa Cruz | Día Libre'
        },
        description: {
          en: 'After breakfast, enjoy a free day in Santa Cruz Island.\n\nThis day can be used to relax at the hotel, explore Puerto Ayora independently, visit local shops and restaurants, or simply enjoy the island at your own pace.\n\nOptional excursions and activities can be arranged upon request, depending on availability and local conditions.',
          es: 'Día libre en Santa Cruz para disfrutar de Puerto Ayora, Playa Tortuga Bay o tours opcionales.'
        },
        accommodation: { en: 'Santa Cruz Island – Puerto Ayora', es: 'Isla Santa Cruz – Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 10,
        title: {
          en: 'Day 10 – Baltra Airport | Departure',
          es: 'Día 10 – Traslado Al Aeropuerto De Baltra | Vuelo A Quito'
        },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport.\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Ecuador and Galápagos Islands experience.',
          es: 'Traslado al Aeropuerto Seymour de Baltra y vuelo de retorno a Quito. Recepción y traslado al hotel.'
        },
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado y shuttle de aeropuerto' }
      },
      {
        day: 11,
        title: {
          en: 'Day 11 – Quito | International Departure',
          es: 'Día 11 – Quito | Salida Internacional'
        },
        description: {
          en: 'After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and Galápagos Islands experience.',
          es: 'Desayuno y traslado privado al Aeropuerto Mariscal Sucre de Quito para abordar su vuelo internacional de retorno. Fin de los servicios.'
        },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private airport transfer', es: 'Traslado privado al aeropuerto' }
      }
    ]
  }
];

export const mockTours: Tour[] = [...multiDayTours, ...dailyTours];

export const mockDestinations: Destination[] = [
  {
    id: 'ecuador',
    name: { en: 'Mainland Ecuador', es: 'Ecuador Continental', fr: 'Équateur Continental', de: 'Festland Ecuador', it: 'Ecuador Continentale', pt: 'Equador Continental', ja: 'エクアドル本土', zh: '厄瓜多尔大陆' },
    subtitle: {
      en: 'Andes, Volcanoes & Amazon Rainforest',
      es: 'Andes, Volcanes Y Selva Amazónica', fr: 'Andes, volcans et jungle amazonienne', de: 'Anden, Vulkane & Amazonas-Regenwald', it: 'Ande, Vulcani e Foresta Amazzonica', pt: 'Andes, Vulcões e Floresta Amazônica', ja: 'アンデス、火山、アマゾン熱帯雨林', zh: '安第斯高原、壮丽火山与亚马逊雨林'
    },
    description: {
      en: 'Explore the Avenue of the Volcanoes, historic Quito, Baños waterfalls, Amazon jungle lodges and ancient Inca heritage.',
      es: 'Atraviesa la Avenida de los Volcanes, explora lodges en la selva profunda y maravíllate con la arquitectura colonial.',
      zh: '探索火山大道、基多古城、巴尼奥斯瀑布、亚马逊丛林木屋与印加遗址。'
    },
    imageUrl: '/images/tours/16-9/cuenca-colonial-16-9.webp',
    toursCount: 5,
    slug: 'ecuador'
  },
  {
    id: 'galapagos',
    name: { en: 'Galápagos Islands', es: 'Islas Galápagos', fr: 'Îles Galápagos', de: 'Galapagos-Inseln', it: 'Isole Galapagos', pt: 'Ilhas Galápagos', ja: 'ガラパゴス諸島', zh: '加拉帕戈斯群岛' },
    subtitle: {
      en: 'The Enchanted Archipelago & Cruises',
      es: 'El Archipiélago Encantado', fr: 'L\'archipel enchanté et croisières', de: 'Das verzauberte Archipel & Kreuzfahrten', it: 'L\'Arcipelago Incantato e Crociere', pt: 'O Arquipélago Encantado e Cruzeiros', ja: '魅惑の諸島とネイチャークルーズ', zh: '魔幻群岛与尊享生态巡游'
    },
    description: {
      en: 'Cruises and island-hopping tours to witness wildlife and pristine waters found nowhere else on Earth.',
      es: 'Cruceros privados curados y excursiones de isla en isla para presenciar vida silvestre que no se encuentra en ningún otro lugar.',
      zh: '邂逅地球上独一无二的野生动物，与海狮、海鬣蜥、巨龟和企鹅一同浮潜。'
    },
    imageUrl: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
    toursCount: 3,
    slug: 'galapagos'
  },
  {
    id: 'combined',
    name: { en: 'Grand Combined Expeditions', es: 'Grandes Expediciones Combinadas', fr: 'Grandes Expéditions Combinées', de: 'Große Kombinations-Expeditionen', it: 'Grandi Spedizioni Combinate', pt: 'Grandes Expedições Combinadas', ja: 'グランド・コンビネーション探検', zh: '全景尊享组合探险' },
    subtitle: {
      en: 'Mainland Ecuador + Galápagos Islands',
      es: 'Ecuador Continental + Islas Galápagos', fr: 'Équateur Continental + Îles Galápagos', de: 'Festland Ecuador + Galapagos-Inseln', it: 'Ecuador Continentale + Isole Galapagos', pt: 'Equador Continental + Ilhas Galápagos', ja: 'エクアドル本土 ＋ ガラパゴス諸島', zh: '厄瓜多尔大陆 ＋ 加拉帕戈斯群岛'
    },
    description: {
      en: 'The ultimate master journeys linking volcanic Andean trails, Amazon wonders and the pristine Galápagos islands.',
      es: 'Grandes travesías integrales que unen lo mejor de los Andes, la Amazonía y los cruceros en las Islas Galápagos en un solo viaje.',
      zh: '精选全景路线，将安第斯山脉、亚马逊雨林与加拉帕戈斯群岛的奇迹完美融为一体。'
    },
    imageUrl: '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
    toursCount: 2,
    slug: 'combined'
  },
  {
    id: 'full-day',
    name: { en: 'Day Excursions', es: 'Excursiones Full Day', fr: 'Excursions Full Day', de: 'Full-Day Tagesausflüge', it: 'Escursioni Full Day', pt: 'Passeios Full Day', ja: '日帰りツアー (Full Day)', zh: '单日全景游 (Full Day)' },
    subtitle: {
      en: '1-Day Tours In Mainland Ecuador',
      es: 'Tours De 1 Día En Ecuador Continental', fr: 'Tours d\'une journée en Équateur Continental', de: '1-Tages-Touren in Festland-Ecuador', it: 'Tour di 1 Giorno in Ecuador Continentale', pt: 'Tours de 1 Dia no Equador Continental', ja: 'エクアドル本土 1日ツアー', zh: '厄瓜多尔大陆 1日精选游'
    },
    description: {
      en: 'Immersive 1-day adventures: volcanic craters, Andean waterfalls, cloud forests, thermal springs and indigenous artisan markets.',
      es: 'Aventuras inmersivas de 1 día a cráteres volcánicos, cascadas andinas, bosque nuboso, termas y mercados indígenas en Ecuador Continental.',
      zh: '厄瓜多尔大陆全日游精选：赤道线、奥塔瓦洛集市、帕帕亚克塔温泉、明多云雾森林、科托帕希与基洛托阿。'
    },
    imageUrl: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
    toursCount: 7,
    slug: 'full-day'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Dylan A',
    location: 'United States',
    rating: 5,
    date: '2026-04-10',
    tourTitle: 'The Avenue of the Volcanoes & Galapagos',
    title: 'A Trip Of A Lifetime',
    comment: 'Truly a magical trip that I will never forget. From hiking in The Avenue of the Volcanos to snorkeling with sea lions and turtles in the Galapagos you truly will never have a dull moment on this trip. Our tour guide Jhayro was truly the best guide. Went above and beyond to make sure everyone was taken care of and provided many additional activities for us on the tour.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-2',
    author: 'Guadalupe L',
    location: 'United States',
    rating: 5,
    date: '2026-04-08',
    tourTitle: 'Ecuador & Galapagos Master Tour',
    title: 'Book It!',
    comment: 'This tour was amazing. Very detailed, organized and so fun. I can’t recommend it enough. Jhayro was an incredible and knowledgeable guide.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-3',
    author: 'Alana F',
    location: 'United States',
    rating: 5,
    date: '2026-04-08',
    tourTitle: 'Ecuador and the Galapagos',
    title: 'The Best Trip!',
    comment: 'This was the best trip! Our tour guide, Vermilion Jhayro was extremely knowledgeable and showed us the best of Ecuador. His kind, caring, and friendly personality made the trip unforgettable. I highly recommend taking this trip with him as your guide!',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-4',
    author: 'Nicole H',
    location: 'United States',
    rating: 5,
    date: '2026-04-04',
    tourTitle: '11-Day Ecuador Flagship Expedition',
    title: 'Hola Vida!',
    comment: 'My time with Jhayro was truly excellent, I couldn’t have asked for a better tour director for our 11 days in Ecuador. From start to finish, he went above and beyond to make the experience unforgettable. Visiting an Kichwa Community in the Amazon, sharing an authentic meal, exploring an animal refuge, and hiking to a beautiful waterfall were experiences I never would have been able to organize on my own.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-5',
    author: 'Katie V',
    location: 'United States',
    rating: 5,
    date: '2026-04-04',
    tourTitle: 'Ecuador & Galapagos with Jhayro',
    title: 'Unforgettable Memories!',
    comment: 'Jhayro was an incredible guide who made our time in Ecuador and the Galapagos so enjoyable and stress free! Not only was he very knowledgeable about the history of Ecuador, he made sure to plan excursions for us to experience the culture with Kichwa communities and traditional food.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-6',
    author: 'Mackenzie L',
    location: 'United States',
    rating: 5,
    date: '2026-04-03',
    tourTitle: 'Ecuador Cultural & Natural Wonders',
    title: 'An Unforgettable Experience In Ecuador',
    comment: 'We had an amazing time in Ecuador thanks to Jhayro! He was incredibly informative and so passionate about his country and everything it has to offer. You could really feel how much he cares about sharing Ecuador’s beauty and culture. Always punctual, organized, and attentive.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-7',
    author: 'Sarah F',
    location: 'United States',
    rating: 5,
    date: '2026-04-03',
    tourTitle: 'Bespoke Galapagos Expedition',
    title: 'Incredible Trip!',
    comment: 'This trip was amazing!! Jhayro was an excellent tour guide and made sure we got to see as much as possible. He planned extra stops for us and made special accommodations for people when needed. Would highly recommend booking a tour with him!',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-8',
    author: 'Taylor K',
    location: 'United States',
    rating: 5,
    date: '2026-04-03',
    tourTitle: 'Andes, Amazon & Galapagos',
    title: 'Most Knowledgeable Guide And Most Fun Itinerary',
    comment: 'We were always moving and going onto the next activity. It was so fun, there were so many surprises and cool things outside of the itinerary that we got to do and see. Our guide was not just organized, but he took care of every thing we needed, all while being so funny and fun to be around.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-9',
    author: 'Navera H',
    location: 'United States',
    rating: 5,
    date: '2026-04-01',
    tourTitle: 'Ecuador Tailor-Made Private Tour',
    title: 'Best Tour Guide Ever!',
    comment: 'We had the absolute best experience with our tour guide in Ecuador! From start to finish, he went above and beyond to make sure everything was smooth, enjoyable, and unforgettable. His knowledge of the history, culture, and local spots was incredible. He brought places to life with stories and insights you wouldn’t get anywhere else.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-10',
    author: 'Julio M',
    location: 'United States',
    rating: 5,
    date: '2026-04-01',
    tourTitle: 'Ecuador tour (Andes, Baños, and Galapagos)',
    title: 'Attentive, Professional And Fluent English',
    comment: 'Jhayro was very attentive. Very fluent English made everything so much easier and comfortable throughout the journey. Highly recommended tour company in Ecuador!',
    verifiedTripAdvisor: true
  }
];

