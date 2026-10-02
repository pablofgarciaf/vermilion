import { Tour, Destination, Review } from '@/types';
import { dailyTours } from './dailyToursData';

const multiDayTours: Tour[] = [
  // Tour: galapagos-6days
  {
    id: 'galapagos-6days',
    code: '1.1',
    title: {
      en: 'Galapagos Encounter: 6-Day Expedition',
      es: 'Encuentro GalÃ¡pagos: 6 DÃ­as De Magia',
      fr: 'Rencontre aux GalÃ¡pagos: 6 Jours Merveilleux',
      de: 'Galapagos Entdeckung: 6 Tage Magie',
      it: 'Incontro alle Galapagos: 6 Giorni di Magia',
      pt: 'Encontro em GalÃ¡pagos: 6 Dias de Magia',
      ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ 6æ—¥é–“ã®é©šç•°ï¼ˆã‚­ãƒˆé€è¿Žä»˜ãï¼‰',
      zh: 'åŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›6æ—¥å¥‡å¦™ä¹‹æ—…ï¼ˆå«åŸºå¤šæŽ¥é€æœºï¼‰'
    },
    destination: 'Galapagos',
    duration: {
      en: '6 DAYS / 5 NIGHTS',
      es: '6 DÃAS / 5 NOCHES',
      fr: '6 JOURS / 5 NUITS',
      de: '6 TAGE / 5 NÃ„CHTE',
      it: '6 GIORNI / 5 NOTTI',
      pt: '6 DIAS / 5 NOITES',
      ja: '6æ—¥é–“ / 5æ³Š',
      zh: '6å¤© / 5æ™š'
    },
    durationDays: 6,
    price: 1790,
    price3Star: 1790,
    price4Star: 2199,
    imageUrl: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
    mobileImage: '/images/tours/9-16/galapagos-tortuga-gigante-9-16.webp',
    desktopImage: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
    gallery: [
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
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
      es: 'ExpediciÃ³n Island Hopping y Transfers en Quito',
      fr: 'ExpÃ©dition d\'Ã®le en Ã®le et transferts Ã  Quito',
      de: 'Insel-Hopping-Expedition & Quito-Transfers',
      it: 'Spedizione Island Hopping e Trasferimenti a Quito',
      pt: 'ExpediÃ§Ã£o Entre Ilhas e Transfers em Quito',
      ja: 'ã‚¢ã‚¤ãƒ©ãƒ³ãƒ‰ãƒ›ãƒƒãƒ”ãƒ³ã‚°æŽ¢æ¤œï¼†ã‚­ãƒˆé€è¿Ž',
      zh: 'è·³å²›ç²¾åŽæŽ¢é™©ä¸ŽåŸºå¤šä¸“å±žæŽ¥é€'
    },
    description: {
      en: 'Comprehensive 6-day GalÃ¡pagos journey featuring private airport transfers in Quito, Santa Cruz highlands, giant tortoises at Primicias Ranch, full-day Isabela Island speedboat excursion with Tintoreras snorkeling and flamingo lagoon, and coastal exploration at La LoberÃ­a, Punta Estrada and Las Grietas.',
      es: 'Experiencia integral de 6 dÃ­as con traslados privados en Quito, tierras altas de Santa Cruz, tortugas gigantes en Rancho Primicias, excursiÃ³n de dÃ­a completo en lancha rÃ¡pida a Isla Isabela con snorkel en Tintoreras y laguna de flamingos, y relax en Las Grietas y La LoberÃ­a.',
      fr: 'Circuit complet de 6 jours comprenant transferts privÃ©s Ã  Quito, hauts plateaux de Santa Cruz, tortues gÃ©antes au Rancho Primicias, excursion d\'une journÃ©e Ã  l\'Ã®le Isabela avec snorkeling Ã  Tintoreras et flamants roses, et Las Grietas.',
      de: 'Umfassende 6-tÃ¤gige Galapagos-Reise mit privaten Quito-Flughafentransfers, Santa Cruz Hochland, RiesenschildkrÃ¶ten auf der Primicias Ranch, Ganztagesausflug nach Isabela mit Tintoreras-Schnorcheln und Flamingos sowie Las Grietas.',
      it: 'Viaggio completo di 6 giorni alle Galapagos con trasferimenti privati a Quito, alture di Santa Cruz, tartarughe giganti al Rancho Primicias, escursione di una giornata a Isabela con snorkeling a Tintoreras e fenicotteri, e Las Grietas.',
      pt: 'Viagem completa de 6 dias em GalÃ¡pagos com transfers privados em Quito, terras altas de Santa Cruz, tartarugas gigantes no Rancho Primicias, excursÃ£o de dia inteiro a Isabela com snorkel em Tintoreras e flamingos, e Las Grietas.',
      ja: 'ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨é€è¿Žã€ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶é«˜åœ°ã®åŒå­å‘ã€ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹ç‰§å ´ã®é‡Žç”Ÿã‚¾ã‚¦ã‚¬ãƒ¡ã€ã‚¤ã‚µãƒ™ãƒ©å³¶ã¸ã®çµ‚æ—¥ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆãƒ„ã‚¢ãƒ¼ï¼ˆãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹ã®ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ï¼†ãƒ•ãƒ©ãƒŸãƒ³ã‚´ï¼‰ã€ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ç«å±±å³¡è°·ã‚’å·¡ã‚‹å……å®Ÿã®6æ—¥é–“ã€‚',
      zh: 'åŒ…å«åŸºå¤šç§äººæœºåœºå¾€è¿”æŽ¥é€çš„åŠ æ‹‰å¸•æˆˆæ–¯6æ—¥ç²¾é€‰è¡Œç¨‹ï¼šæ¸¸è§ˆåœ£å…‹é²æ–¯é«˜åœ°åŒå­å‘ä¸Žæ™®é‡Œç±³è¥¿äºšé‡Žç”Ÿå·¨é¾Ÿä¿æŠ¤åŒºï¼Œä¹˜å¿«è‰‡å…¨æ—¥æŽ¢ç§˜ä¼ŠèŽŽè´æ‹‰å²›å¹¶åœ¨è’‚æ©æ‰˜é›·æ‹‰æ–¯æµ®æ½œè§‚èµæµ·é¾Ÿã€æµ·ç‹®ä¸Žä¼é¹…ï¼ŒæŽ¢ç´¢æ‹‰æ´›è´é‡Œäºšä¸Žæ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ç«å±±å³¡è°·ã€‚'
    },
    highlights: [
      {
        en: 'Private Quito Airport Transfers (Arrival & Departure)',
        es: 'Traslados Privados Aeropuerto Quito (Llegada y Salida)',
        fr: 'Transferts PrivÃ©s AÃ©roport de Quito (ArrivÃ©e et DÃ©part)',
        de: 'Private Quito-Flughafentransfers (Ankunft & Abreise)',
        it: 'Trasferimenti Privati Aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados Privados Aeroporto de Quito (Chegada e Partida)',
        ja: 'ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨å¾€å¾©é€è¿Žï¼ˆåˆ°ç€ï¼†å‡ºç™ºï¼‰',
        zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦æŽ¥é€ï¼ˆæŠµè¾¾ä¸Žç¦»å¢ƒï¼‰'
      },
      {
        en: 'Twin Craters & Primicias Giant Tortoise Ranch',
        es: 'CrÃ¡teres Gemelos y Rancho de Tortugas Primicias',
        fr: 'CratÃ¨res Jumeaux et RÃ©serve de Tortues Primicias',
        de: 'Zwillingskrater & RiesenschildkrÃ¶ten-Farm Primicias',
        it: 'Crateri Gemelli e Riserva Tartarughe Primicias',
        pt: 'Crateras GÃªmeas e Rancho de Tartarugas Primicias',
        ja: 'åŒå­å‘ï¼ˆãƒ­ã‚¹ãƒ»ãƒ˜ãƒ¡ãƒ­ã‚¹ï¼‰ï¼†ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹å·¨äº€ä¿è­·åŒº',
        zh: 'åŒå­å‘ä¸Žæ™®é‡Œç±³è¥¿äºšå·¨é¾Ÿç”Ÿæ€ä¿æŠ¤åŒº'
      },
      {
        en: 'Full-Day Isabela Excursion & Tintoreras Snorkeling',
        es: 'ExcursiÃ³n Full-Day Isabela y Snorkel en Tintoreras',
        fr: 'Excursion JournÃ©e Isabela & Snorkeling aux Tintoreras',
        de: 'Ganztagesausflug Isabela & Schnorcheln bei Tintoreras',
        it: 'Escursione Giornata Intera a Isabela e Snorkeling a Tintoreras',
        pt: 'ExcursÃ£o Dia Inteiro Isabela e Snorkel em Tintoreras',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶çµ‚æ—¥ãƒ„ã‚¢ãƒ¼ï¼†ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹ã§ã®ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›å…¨æ—¥æŽ¢é™©ä¸Žè’‚æ©æ‰˜é›·æ‹‰æ–¯æµ®æ½œ'
      },
      {
        en: 'Flamingo Lagoon & Giant Tortoise Breeding Center',
        es: 'Laguna de Flamingos y Centro de Crianza de Tortugas',
        fr: 'Lagune des Flamants et Centre d\'Ã‰levage de Tortues',
        de: 'Flamingo-Lagune & SchildkrÃ¶tenzuchtzentrum',
        it: 'Laguna dei Fenicotteri e Centro Riproduzione Tartarughe',
        pt: 'Lagoa de Flamingos e Centro de ReproduÃ§Ã£o de Tartarugas',
        ja: 'ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ï¼†ã‚¾ã‚¦ã‚¬ãƒ¡ç¹æ®–ã‚»ãƒ³ã‚¿ãƒ¼',
        zh: 'ç«çƒˆé¸Ÿæ³»æ¹–ä¸Žå·¨é¾Ÿç¹è‚²ä¿æŠ¤ä¸­å¿ƒ'
      },
      {
        en: 'La LoberÃ­a Sea Lion Colony & Las Grietas Volcanic Canyon',
        es: 'Colonia de Lobos Marinos en La LoberÃ­a y CaÃ±Ã³n Las Grietas',
        fr: 'Colonie d\'Otarie Ã  La LoberÃ­a et Canyon Volcanique Las Grietas',
        de: 'SeelÃ¶wenkolonie La LoberÃ­a & Vulkanschlucht Las Grietas',
        it: 'Colonia di Leoni Marini a La LoberÃ­a e Canyon Las Grietas',
        pt: 'ColÃ´nia de LeÃµes-Marinhos em La LoberÃ­a e CÃ¢nion Las Grietas',
        ja: 'ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ã®ã‚¢ã‚·ã‚«ã‚³ãƒ­ãƒ‹ãƒ¼ï¼†ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ç«å±±æ¸“è°·',
        zh: 'æ‹‰æ´›è´é‡Œäºšæµ·ç‹®èšå±…åœ°ä¸Žæ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ç«å±±å³¡è°·'
      }
    ],
    inclusions: [
      {
        en: 'Accommodation at the hotel of your choice in Santa Cruz (3â˜… or 4â˜…)',
        es: 'Alojamiento en el hotel seleccionado en Santa Cruz (3â˜… o 4â˜…)',
        fr: 'HÃ©bergement Ã  l\'hÃ´tel de votre choix Ã  Santa Cruz (3â˜… ou 4â˜…)',
        de: 'Unterkunft im gewÃ¤hlten Hotel auf Santa Cruz (3â˜… oder 4â˜…)',
        it: 'Sistemazione nell\'hotel prescelto a Santa Cruz (3â˜… o 4â˜…)',
        pt: 'Hospedagem no hotel de sua escolha em Santa Cruz (3â˜… ou 4â˜…)',
        ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ã®åŽ³é¸ãƒ›ãƒ†ãƒ«å®¿æ³Šï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
        zh: 'åœ£å…‹é²æ–¯å²›è‡ªé€‰ç²¾å“é…’åº—ä½å®¿ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
      },
      {
        en: 'Private airport transfers in Quito (Arrival & Departure)',
        es: 'Traslados privados en aeropuerto de Quito (Llegada y Salida)',
        fr: 'Transferts privÃ©s aÃ©roport de Quito (ArrivÃ©e et DÃ©part)',
        de: 'Private Flughafentransfers in Quito (Ankunft & Abreise)',
        it: 'Trasferimenti privati aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados privados no aeroporto de Quito (Chegada e Partida)',
        ja: 'ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨ãƒ—ãƒ©ã‚¤ãƒ™ãƒ¼ãƒˆé€è¿Žï¼ˆåˆ°ç€ï¼†å‡ºç™ºï¼‰',
        zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦æŽ¥é€ï¼ˆæŠµè¾¾ä¸Žå‡ºå‘ï¼‰'
      },
      {
        en: 'Buffet breakfast at 4â˜… hotels / Continental breakfast at 3â˜… hotels',
        es: 'Desayuno buffet en hoteles 4â˜… / Desayuno continental en hoteles 3â˜…',
        fr: 'Petit-dÃ©jeuner buffet en hÃ´tel 4â˜… / continental en hÃ´tel 3â˜…',
        de: 'FrÃ¼hstÃ¼cksbuffet in 4â˜…-Hotels / Kontinentales FrÃ¼hstÃ¼ck in 3â˜…-Hotels',
        it: 'Colazione a buffet in hotel 4â˜… / Continentale in hotel 3â˜…',
        pt: 'CafÃ© da manhÃ£ buffet em hotÃ©is 4â˜… / Continental em hotÃ©is 3â˜…',
        ja: '4â˜…ãƒ›ãƒ†ãƒ«ã®ãƒ“ãƒ¥ãƒƒãƒ•ã‚§æœé£Ÿ / 3â˜…ãƒ›ãƒ†ãƒ«ã®ã‚³ãƒ³ãƒãƒãƒ³ã‚¿ãƒ«æœé£Ÿ',
        zh: '4æ˜Ÿçº§é…’åº—è‡ªåŠ©æ—©é¤ / 3æ˜Ÿçº§é…’åº—æ¬§é™†å¼æ—©é¤'
      },
      {
        en: 'Set-menu lunches according to the itinerary',
        es: 'Almuerzos menÃº incluidos segÃºn el itinerario',
        fr: 'DÃ©jeuners avec menu prÃ©Ã©tabli selon l\'itinÃ©raire',
        de: 'Mittagessen mit festem MenÃ¼ gemÃ¤ÃŸ Reiseroute',
        it: 'Pranzi con menu fisso secondo l\'itinerario',
        pt: 'AlmoÃ§os com cardÃ¡pio fixo de acordo com o itinerÃ¡rio',
        ja: 'æ—…ç¨‹ã«å¿œã˜ãŸã‚»ãƒƒãƒˆãƒ¡ãƒ‹ãƒ¥ãƒ¼ã®æ˜¼é£Ÿ',
        zh: 'è¡Œç¨‹ä¸­è§„åˆ’çš„æŒ‡å®šå¥—é¤åˆé¤'
      },
      {
        en: 'Domestic Flight Ticket (Quito â€“ Baltra â€“ Quito)',
        es: 'Boleto aÃ©reo domÃ©stico (Quito â€“ Baltra â€“ Quito)',
        fr: 'Billet d\'avion intÃ©rieur (Quito â€“ Baltra â€“ Quito)',
        de: 'Inlandsflugticket (Quito â€“ Baltra â€“ Quito)',
        it: 'Biglietto aereo nazionale (Quito â€“ Baltra â€“ Quito)',
        pt: 'Passagem aÃ©rea domÃ©stica (Quito â€“ Baltra â€“ Quito)',
        ja: 'å›½å†…ç·šå¾€å¾©èˆªç©ºåˆ¸ï¼ˆã‚­ãƒˆ â€“ ãƒãƒ«ãƒˆãƒ© â€“ ã‚­ãƒˆï¼‰',
        zh: 'åŽ„ç“œå¤šå°”å¢ƒå†…å¾€è¿”æœºç¥¨ï¼ˆåŸºå¤š â€“ å·´å°”ç‰¹æ‹‰ â€“ åŸºå¤šï¼‰'
      },
      {
        en: 'All guided visits to the islands according to the itinerary',
        es: 'Todas las visitas guiadas a las islas segÃºn el itinerario',
        fr: 'Toutes les visites guidÃ©es des Ã®les selon l\'itinÃ©raire',
        de: 'Alle gefÃ¼hrten Inselbesuche gemÃ¤ÃŸ Reiseroute',
        it: 'Tutte le visite guidate alle isole secondo l\'itinerario',
        pt: 'Todas as visitas guiadas Ã s ilhas de acordo com o itinerÃ¡rio',
        ja: 'æ—…ç¨‹ã«è¨˜è¼‰ã•ã‚ŒãŸã™ã¹ã¦ã®ã‚¬ã‚¤ãƒ‰ä»˜ãå³¶å†…è¦³å…‰',
        zh: 'è¡Œç¨‹è§„åˆ’çš„æ‰€æœ‰å—ä¿æŠ¤æµ·å²›å¯¼è§ˆæ¸¸è§ˆ'
      },
      {
        en: 'Airport reception and departure assistance at GalÃ¡pagos airports',
        es: 'RecepciÃ³n y asistencia en aeropuertos de GalÃ¡pagos',
        fr: 'Accueil et assistance aux aÃ©roports des GalÃ¡pagos',
        de: 'Flughafenempfang und Abreisebetreuung auf GalÃ¡pagos',
        it: 'Accoglienza e assistenza negli aeroporti delle Galapagos',
        pt: 'RecepÃ§Ã£o e assistÃªncia nos aeroportos de GalÃ¡pagos',
        ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ç©ºæ¸¯ã§ã®åˆ°ç€å‡ºè¿ŽãˆãŠã‚ˆã³å‡ºç™ºã‚µãƒãƒ¼ãƒˆ',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯å„æœºåœºæŠµè¾¾ä¸“å‘˜æŽ¥æœºä¸Žå‡ºå‘ååŠ©'
      },
      {
        en: 'Comprehensive land and maritime transportation',
        es: 'Transporte terrestre y marÃ­timo integral',
        fr: 'Transport terrestre et maritime complet',
        de: 'Umfassender Land- und Seetransport',
        it: 'Trasporto terrestre e marittimo completo',
        pt: 'Transporte terrestre e marÃ­timo completo',
        ja: 'å…¨è¡Œç¨‹ã«ãŠã‘ã‚‹é™¸ä¸ŠãŠã‚ˆã³æµ·ä¸Šç§»å‹•äº¤é€š',
        zh: 'å…¨ç¨‹ä¸“è½¦é™†è·¯ä¸Žå¿«è‰‡æµ·ä¸Šäº¤é€š'
      },
      {
        en: 'Level III Certified Naturalist Guides (Spanish / English)',
        es: 'GuÃ­as naturalistas certificados Nivel III (EspaÃ±ol / InglÃ©s)',
        fr: 'Guides naturalistes certifiÃ©s de niveau III (Espagnol / Anglais)',
        de: 'Zertifizierte NaturfÃ¼hrer der Stufe III (Spanisch / Englisch)',
        it: 'Guide naturalistiche certificate di Livello III (Spagnolo / Inglese)',
        pt: 'Guias naturalistas certificados NÃ­vel III (Espanhol / InglÃªs)',
        ja: 'ãƒ¬ãƒ™ãƒ«IIIèªå®šãƒŠãƒãƒ¥ãƒ©ãƒªã‚¹ãƒˆã‚¬ã‚¤ãƒ‰ï¼ˆè‹±èªžãƒ»ã‚¹ãƒšã‚¤ãƒ³èªžï¼‰',
        zh: 'ä¸‰çº§å›½å®¶è®¤è¯èµ„æ·±è‡ªç„¶å‘å¯¼ï¼ˆè‹±è¯­/è¥¿ç­ç‰™è¯­ï¼‰'
      },
      {
        en: 'Snorkeling equipment for boat excursions (mask and snorkel)',
        es: 'Equipo de snorkel para excursiones en barco (mÃ¡scara y tubo)',
        fr: 'Ã‰quipement de snorkeling pour les excursions en bateau (masque et tuba)',
        de: 'SchnorchelausrÃ¼stung fÃ¼r Bootstouren (Maske und Schnorchel)',
        it: 'Attrezzatura da snorkeling per escursioni in barca (maschera e boccaglio)',
        pt: 'Equipamento de snorkel para excursÃµes de barco (mÃ¡scara e snorkel)',
        ja: 'ãƒœãƒ¼ãƒˆãƒ„ã‚¢ãƒ¼ç”¨ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°è£…å‚™ï¼ˆãƒžã‚¹ã‚¯ï¼†ã‚¹ãƒŽãƒ¼ã‚±ãƒ«ï¼‰',
        zh: 'æ¸¸è‰‡å‡ºæµ·æŽ¢é™©é«˜å“è´¨æµ®æ½œè£…å¤‡ï¼ˆé¢é•œå’Œå‘¼å¸ç®¡ï¼‰'
      },
      {
        en: 'Safety lockers available at hotel reception',
        es: 'Casilleros de seguridad disponibles en la recepciÃ³n del hotel',
        fr: 'Coffres-forts disponibles Ã  la rÃ©ception de l\'hÃ´tel',
        de: 'SicherheitsschlieÃŸfÃ¤cher an der Hotelrezeption verfÃ¼gbar',
        it: 'Cassette di sicurezza alla reception dell\'hotel',
        pt: 'Cofres de seguranÃ§a na recepÃ§Ã£o do hotel',
        ja: 'ãƒ›ãƒ†ãƒ«ãƒ•ãƒ­ãƒ³ãƒˆã®ã‚»ãƒ¼ãƒ•ãƒ†ã‚£ãƒœãƒƒã‚¯ã‚¹åˆ©ç”¨å¯èƒ½',
        zh: 'é…’åº—å‰å°å…è´¹æä¾›å®‰å…¨ä¿é™©ç®±æœåŠ¡'
      },
      {
        en: 'Lobito Airport Shuttle Bus: Airport â€“ Itabaca Channel â€“ Airport',
        es: 'AutobÃºs Lobito: Aeropuerto â€“ Canal de Itabaca â€“ Aeropuerto',
        fr: 'Navette aÃ©roport Lobito: AÃ©roport â€“ Canal d\'Itabaca â€“ AÃ©roport',
        de: 'Lobito Flughafen-Shuttlebus: Flughafen â€“ Itabaca-Kanal â€“ Flughafen',
        it: 'Bus navetta Lobito: Aeroporto â€“ Canale di Itabaca â€“ Aeroporto',
        pt: 'Ã”nibus shuttle Lobito: Aeroporto â€“ Canal de Itabaca â€“ Aeroporto',
        ja: 'ãƒ­ãƒ“ãƒˆç©ºæ¸¯ã‚·ãƒ£ãƒˆãƒ«ãƒã‚¹ï¼šç©ºæ¸¯ â€“ ã‚¤ã‚¿ãƒã‚«é‹æ²³ â€“ ç©ºæ¸¯',
        zh: 'Lobitoæœºåœºç©¿æ¢­æŽ¥é©³å·´å£«ï¼šæœºåœº â€“ ä¼Šå¡”å·´å¡è¿æ²³ â€“ æœºåœº'
      },
      {
        en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors',
        es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros',
        fr: 'Taxe de quai d\'Isabela: 5,00 USD nationaux / 10,00 USD Ã©trangers',
        de: 'Isabela-DockgebÃ¼hr: USD 5,00 fÃ¼r Ecuadorianer / USD 10,00 fÃ¼r AuslÃ¤nder',
        it: 'Tassa portuale di Isabela: 5,00 USD ecuadoriani / 10,00 USD stranieri',
        pt: 'Taxa de cais de Isabela: USD 5,00 nacionais / USD 10,00 estrangeiros',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶å…¥æ¸¯ç¨Žï¼šã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«å›½ç± USD 5.00 / å¤–å›½äºº USD 10.00',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›ç å¤´ç¨Žï¼šåŽ„ç“œå¤šå°”å…¬æ°‘ 5 ç¾Žå…ƒ / å¤–å›½æ¸¸å®¢ 10 ç¾Žå…ƒ'
      }
    ],
    exclusions: [
      {
        en: 'GalÃ¡pagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors',
        es: 'Entrada al Parque Nacional GalÃ¡pagos: USD 6.00 nacionales / USD 200.00 extranjeros',
        fr: 'EntrÃ©e au Parc National des GalÃ¡pagos: 6,00 USD nationaux / 200,00 USD Ã©trangers',
        de: 'EintrittsgebÃ¼hr fÃ¼r den Galapagos-Nationalpark: USD 6,00 fÃ¼r Ecuadorianer / USD 200,00 fÃ¼r AuslÃ¤nder',
        it: 'Ingresso al Parco Nazionale delle Galapagos: 6,00 USD ecuadoriani / 200,00 USD stranieri',
        pt: 'Entrada no Parque Nacional GalÃ¡pagos: USD 6,00 nacionais / USD 200,00 estrangeiros',
        ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹å›½ç«‹å…¬åœ’å…¥å ´æ–™ï¼šã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«å›½ç± USD 6.00 / å¤–å›½äºº USD 200.00',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯å›½å®¶å…¬å›­å…¥å›­è´¹ï¼šåŽ„ç“œå¤šå°”å…¬æ°‘ 6 ç¾Žå…ƒ / å¤–å›½æ¸¸å®¢ 200 ç¾Žå…ƒ'
      },
      {
        en: 'Dinners (to give you freedom to enjoy local gastronomy)',
        es: 'Cenas (libertad para explorar la gastronomÃ­a local)',
        fr: 'DÃ®ners (pour vous laisser libre de dÃ©couvrir la gastronomie locale)',
        de: 'Abendessen (Freiheit zur Entdeckung der lokalen Gastronomie)',
        it: 'Cene (libertÃ  di esplorare la gastronomia locale)',
        pt: 'Jantares (liberdade para desfrutar da gastronomia local)',
        ja: 'å¤•é£Ÿï¼ˆåœ°å…ƒã®ã‚°ãƒ«ãƒ¡ã‚’è‡ªç”±ã«ãŠæ¥½ã—ã¿ã„ãŸã ã‘ã¾ã™ï¼‰',
        zh: 'æ™šé¤ï¼ˆç•™ç™½æ—¶é—´è‡ªç”±å“å‘³å½“åœ°ç‰¹è‰²æµ·é²œä¸Žç¾Žé¦”ï¼‰'
      },
      {
        en: 'Transit Control Card (TCT): USD 20.00 per person',
        es: 'Tarjeta de Control de TrÃ¡nsito (TCT): USD 20.00 por persona',
        fr: 'Carte de ContrÃ´le de Transit (TCT): 20,00 USD par personne',
        de: 'Transit Control Card (TCT): USD 20,00 pro Person',
        it: 'Carta di Controllo del Transito (TCT): 20,00 USD a persona',
        pt: 'CartÃ£o de Controle de TrÃ¢nsito (TCT): USD 20,00 por pessoa',
        ja: 'ãƒˆãƒ©ãƒ³ã‚¸ãƒƒãƒˆã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«ã‚«ãƒ¼ãƒ‰ï¼ˆTCTï¼‰ï¼šãŠä¸€äººæ§˜ USD 20.00',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯é€šè¡ŒæŽ§åˆ¶å¡ï¼ˆTCTï¼‰ï¼šæ¯äºº 20 ç¾Žå…ƒ'
      },
      {
        en: 'Services not specified in the program & personal expenses',
        es: 'Servicios no especificados en el programa y gastos personales',
        fr: 'Services non spÃ©cifiÃ©s dans le programme et dÃ©penses personnelles',
        de: 'Nicht im Programm aufgefÃ¼hrte Leistungen & persÃ¶nliche Ausgaben',
        it: 'Servizi non specificati nel programma e spese personali',
        pt: 'ServiÃ§os nÃ£o especificados no programa e despesas pessoais',
        ja: 'ãƒ—ãƒ­ã‚°ãƒ©ãƒ ã«æ˜Žè¨˜ã•ã‚Œã¦ã„ãªã„ã‚µãƒ¼ãƒ“ã‚¹ãŠã‚ˆã³å€‹äººçš„ãªè²»ç”¨',
        zh: 'è¡Œç¨‹æœªæåŠçš„é¢å¤–æ¶ˆè´¹åŠç§äººæ”¯å‡º'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito | Private Airport Transfer',
          es: 'DÃ­a 1 â€“ Llegada A Quito | Traslado Privado De Aeropuerto',
          fr: 'Jour 1 â€“ ArrivÃ©e Ã  Quito | Transfert PrivÃ© AÃ©roport',
          de: 'Tag 1 â€“ Ankunft in Quito | Privater Flughafentransfer',
          it: 'Giorno 1 â€“ Arrivo a Quito | Trasferimento Privato Aeroporto',
          pt: 'Dia 1 â€“ Chegada a Quito | Traslado Privado do Aeroporto',
          ja: 'ç¬¬1æ—¥ â€“ ã‚­ãƒˆåˆ°ç€ | å°‚ç”¨ç©ºæ¸¯é€è¿Ž',
          zh: 'ç¬¬1å¤© â€“ æŠµè¾¾åŸºå¤š | å°Šäº«ç§äººæœºåœºæŽ¥æœº'
        },
        description: {
          en: 'Welcome at Quito International Airport and private transfer to your hotel. Relax and prepare for your extraordinary adventure across the enchanted archipelago.',
          es: 'RecepciÃ³n de bienvenida en el Aeropuerto Internacional Mariscal Sucre de Quito y traslado privado exclusivo a su hotel. Tiempo libre para descansar y aclimatarse antes de viajar a GalÃ¡pagos.',
          fr: 'Accueil chaleureux Ã  l\'aÃ©roport international de Quito et transfert privÃ© vers votre hÃ´tel. Reposez-vous et prÃ©parez-vous pour une aventure exceptionnelle aux GalÃ¡pagos.',
          de: 'Herzlicher Empfang am internationalen Flughafen Quito und privater Transfer zu Ihrem Hotel. Erholen Sie sich und stimmen Sie sich auf Ihr Galapagos-Abenteuer ein.',
          it: 'Benvenuto all\'Aeroporto Internazionale di Quito e trasferimento privato in hotel. Tempo a disposizione per rilassarsi prima della partenza per le Galapagos.',
          pt: 'Boas-vindas no Aeroporto Internacional de Quito e traslado privado para o hotel. Descanse e prepare-se para esta inesquecÃ­vel aventura em GalÃ¡pagos.',
          ja: 'ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã«ã¦å°‚å±žã‚¹ã‚¿ãƒƒãƒ•ãŒãŠå‡ºè¿Žãˆã—ã€å°‚ç”¨è»Šã§ãƒ›ãƒ†ãƒ«ã¸ç§»å‹•ã€‚ç¿Œæ—¥ã‹ã‚‰ã®ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶æŽ¢æ¤œã«å‘ã‘ã¦ã‚†ã£ãŸã‚Šã¨ãŠéŽã”ã—ãã ã•ã„ã€‚',
          zh: 'æŠµè¾¾åŸºå¤šè‹å…‹é›·å…ƒå¸…å›½é™…æœºåœºï¼Œä¸“å±žå‘å¯¼è´´å¿ƒæŽ¥æœºå¹¶ä¹˜åä¸“è½¦å‰å¾€é…’åº—åŠžç†å…¥ä½ã€‚ä¼‘æ•´èº«å¿ƒï¼Œå‡†å¤‡å¼€å¯åŠ æ‹‰å¸•æˆˆæ–¯å¥‡è¿¹ä¹‹æ—…ã€‚'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3â˜… or 4â˜…)',
          es: 'Hotel en Quito (CategorÃ­a seleccionada 3â˜… o 4â˜…)',
          fr: 'HÃ´tel Ã  Quito (CatÃ©gorie 3â˜… ou 4â˜…)',
          de: 'Hotel in Quito (Kategorie 3â˜… oder 4â˜…)',
          it: 'Hotel a Quito (Categoria 3â˜… o 4â˜…)',
          pt: 'Hotel em Quito (Categoria 3â˜… ou 4â˜…)',
          ja: 'ã‚­ãƒˆå¸‚å†…ã®åŽ³é¸ãƒ›ãƒ†ãƒ«ï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
          zh: 'åŸºå¤šç²¾é€‰é…’åº—ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
        },
        meals: {
          en: 'Not included / at leisure',
          es: 'No incluidas / libres',
          fr: 'Non inclus',
          de: 'Nicht inbegriffen',
          it: 'Non inclusi',
          pt: 'NÃ£o incluÃ­das',
          ja: 'é£Ÿäº‹ãªã—',
          zh: 'æ•¬è¯·è‡ªç†'
        },
        transportation: {
          en: 'Private transportation from Quito Airport',
          es: 'Transporte privado desde Aeropuerto de Quito',
          fr: 'Transport privÃ© depuis l\'aÃ©roport de Quito',
          de: 'Privater Transport vom Flughafen Quito',
          it: 'Trasporto privato dall\'aeroporto di Quito',
          pt: 'Transporte privado do aeroporto de Quito',
          ja: 'ã‚­ãƒˆç©ºæ¸¯ã‹ã‚‰ã®å°‚ç”¨é€è¿Žè»Š',
          zh: 'åŸºå¤šæœºåœºä¸“å±žå•†åŠ¡ä¸“è½¦æŽ¥æœº'
        },
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Arrival In Baltra | Twin Craters | Primicias Giant Tortoise Ranch',
          es: 'DÃ­a 2 â€“ Llegada A Baltra | CrÃ¡teres Gemelos | Rancho De Tortugas Primicias',
          fr: 'Jour 2 â€“ ArrivÃ©e Ã  Baltra | CratÃ¨res Jumeaux | Rancho Primicias',
          de: 'Tag 2 â€“ Ankunft in Baltra | Zwillingskrater | Primicias-Ranch',
          it: 'Giorno 2 â€“ Arrivo a Baltra | Crateri Gemelli | Rancho Primicias',
          pt: 'Dia 2 â€“ Chegada a Baltra | Crateras GÃªmeas | Rancho Primicias',
          ja: 'ç¬¬2æ—¥ â€“ ãƒãƒ«ãƒˆãƒ©å³¶åˆ°ç€ | åŒå­å‘ | ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹å·¨äº€ä¿è­·åŒº',
          zh: 'ç¬¬2å¤© â€“ é£žæŠµå·´å°”ç‰¹æ‹‰å²› | åŒå­å‘ | æ™®é‡Œç±³è¥¿äºšé‡Žç”Ÿå·¨é¾Ÿä¿æŠ¤åŒº'
        },
        description: {
          en: 'Morning transfer from your Quito hotel to the airport for your flight to the GalÃ¡pagos Islands. Upon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your journey. After crossing the Itabaca Channel to Santa Cruz Island, travel to the highlands to visit the famous Twin Craters (Los Gemelos), surrounded by lush Scalesia forest. Continue to Primicias Ranch, a private ecological reserve where giant tortoises roam freely in their natural habitat and explore natural volcanic lava tunnels. Transfer to Puerto Ayora for check-in and leisure.',
          es: 'Traslado privado desde su hotel en Quito hacia el aeropuerto para abordar el vuelo a GalÃ¡pagos. A su llegada al Aeropuerto Seymour en Isla Baltra, recepciÃ³n por nuestro representante. Tras cruzar el Canal de Itabaca hacia Isla Santa Cruz, ascendemos a las tierras altas para visitar los famosos CrÃ¡teres Gemelos (Los Gemelos), impresionantes depresiones volcÃ¡nicas en medio del bosque de Scalesia. Luego visitamos el Rancho Primicias, reserva privada donde las tortugas gigantes de GalÃ¡pagos viven en libertad y caminamos por tÃºneles de lava. Traslado a Puerto Ayora y tarde libre.',
          fr: 'Transfert matinal de votre hÃ´tel de Quito Ã  l\'aÃ©roport pour votre vol vers les GalÃ¡pagos. Accueil Ã  l\'aÃ©roport Seymour de Baltra par notre reprÃ©sentant. TraversÃ©e du canal d\'Itabaca vers l\'Ã®le Santa Cruz et montÃ©e dans les hautes terres pour dÃ©couvrir les impressionnants CratÃ¨res Jumeaux (Los Gemelos) au cÅ“ur de la forÃªt de Scalesia. Poursuite vers le Rancho Primicias pour observer les tortues gÃ©antes en libertÃ© et traverser des tunnels de lave volcanique. Transfert Ã  Puerto Ayora et fin de journÃ©e libre.',
          de: 'Morgendlicher Transfer vom Hotel in Quito zum Flughafen fÃ¼r den Flug nach Galapagos. Nach der Ankunft am Flughafen Seymour auf der Insel Baltra BegrÃ¼ÃŸung durch unseren Reiseleiter. Ãœberquerung des Itabaca-Kanals nach Santa Cruz und Fahrt ins Hochland zu den berÃ¼hmten Zwillingskratern (Los Gemelos) im Scalesia-Wald. Weiter zur Primicias Ranch, um RiesenschildkrÃ¶ten in freier Wildbahn zu beobachten und Lavatunnel zu erkunden. Transfer nach Puerto Ayora und Freizeit.',
          it: 'Trasferimento mattutino dall\'hotel di Quito all\'aeroporto per il volo verso le Galapagos. Arrivo all\'aeroporto Seymour di Baltra e accoglienza da parte del nostro rappresentante. Attraversamento del Canale di Itabaca verso Santa Cruz e visita agli spettacolari Crateri Gemelli (Los Gemelos) nella foresta di Scalesia. Proseguimento verso il Rancho Primicias per ammirare le tartarughe giganti nel loro habitat ed esplorare tunnel di lava. Trasferimento a Puerto Ayora.',
          pt: 'Traslado matutino do hotel em Quito ao aeroporto para embarque rumo a GalÃ¡pagos. RecepÃ§Ã£o no Aeroporto Seymour na Ilha Baltra por nosso representante. Travessia do Canal de Itabaca atÃ© Santa Cruz e subida Ã s terras altas para visitar as imponentes Crateras GÃªmeas (Los Gemelos) no bosque de Scalesia. Visita ao Rancho Primicias para observar tartarugas gigantes em liberdade e tÃºneis de lava. Traslado a Puerto Ayora.',
          ja: 'ãƒ›ãƒ†ãƒ«ã‹ã‚‰ã‚­ãƒˆç©ºæ¸¯ã¸å°‚ç”¨é€è¿Žã—ã€ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ãƒãƒ«ãƒˆãƒ©ç©ºæ¸¯ã¸ãƒ•ãƒ©ã‚¤ãƒˆã€‚åˆ°ç€å¾Œã€å°‚å±žã‚¬ã‚¤ãƒ‰ãŒãŠå‡ºè¿Žãˆã€‚ã‚¤ã‚¿ãƒã‚«é‹æ²³ã‚’æ¸¡ã‚Šã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶é«˜åœ°ã¸ã€‚ç·‘è±Šã‹ãªã‚¹ã‚«ãƒ¬ã‚·ã‚¢ã®æ£®ã«å›²ã¾ã‚ŒãŸåŒå­å‘ï¼ˆãƒ­ã‚¹ãƒ»ãƒ˜ãƒ¡ãƒ­ã‚¹ï¼‰ã‚’è¦‹å­¦å¾Œã€ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹ç‰§å ´ã§é‡Žç”Ÿã®å·¨å¤§ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹ã‚¾ã‚¦ã‚¬ãƒ¡ã‚’è¦³å¯Ÿã—æº¶å²©ãƒˆãƒ³ãƒãƒ«ã‚’æŽ¢æ¤œã€‚ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©ã®ãƒ›ãƒ†ãƒ«ã¸ã€‚',
          zh: 'æ™¨é—´ä»ŽåŸºå¤šé…’åº—ä¸“è½¦é€å¾€æœºåœºé£žå¾€åŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›ã€‚æŠµè¾¾å·´å°”ç‰¹æ‹‰å²›è¥¿æ‘©æœºåœºåŽç”±ä¸­æ–‡/è‹±æ–‡å‘å¯¼è¿ŽæŽ¥ã€‚æ¸¡è¿‡ä¼Šå¡”å·´å¡æµ·å³¡æŠµè¾¾åœ£å…‹é²æ–¯å²›é«˜åœ°ï¼ŒæŽ¢ç´¢å£®è§‚çš„ç«å±±åŒå­å‘ï¼ˆLos Gemelosï¼‰ä¸Žç‰¹æœ‰é³žç‰‡æ ‘æž—ã€‚éšåŽæŽ¢è®¿æ™®é‡Œç±³è¥¿äºšç§äººç”Ÿæ€ä¿æŠ¤åŒºï¼Œè¿‘è·ç¦»è§‚å¯Ÿè‡ªç”±æ¼«æ­¥çš„åŠ æ‹‰å¸•æˆˆæ–¯é‡Žç”Ÿè±¡é¾Ÿå¹¶ç©¿è¶Šç«å±±ç†”å²©éš§é“ã€‚å‰å¾€é˜¿çº¦æ‹‰æ¸¯åŠžç†å…¥ä½ã€‚'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'According to selected hotel plan',
          es: 'SegÃºn plan hotelero seleccionado',
          fr: 'Selon la formule hÃ´teliÃ¨re choisie',
          de: 'GemÃ¤ÃŸ gewÃ¤hltem Hotelplan',
          it: 'Secondo il piano alberghiero scelto',
          pt: 'De acordo com o plano do hotel escolhido',
          ja: 'ãƒ›ãƒ†ãƒ«ãƒ—ãƒ©ãƒ³ã«æº–ãšã‚‹',
          zh: 'æŒ‰æ‰€é€‰é…’åº—æ–¹æ¡ˆåŒ…å«'
        },
        transportation: {
          en: 'Private airport transfer in Quito, flight, ferry & private island transport',
          es: 'Transfer privado en Quito, vuelo, ferry y transporte privado en isla',
          fr: 'Transfert privÃ© Ã  Quito, vol, ferry et transport terrestre privÃ©',
          de: 'Privater Transfer in Quito, Flug, FÃ¤hre & privater Inseltransport',
          it: 'Trasferimento privato a Quito, volo, traghetto e trasporto privato',
          pt: 'Transfer privado em Quito, voo, balsa e transporte terrestre na ilha',
          ja: 'ã‚­ãƒˆç©ºæ¸¯é€è¿Žã€ãƒ•ãƒ©ã‚¤ãƒˆã€ãƒ•ã‚§ãƒªãƒ¼ï¼†å³¶å†…å°‚ç”¨è»Š',
          zh: 'åŸºå¤šä¸“è½¦é€æœºã€å›½å†…èˆªç­ã€æ¸¡è½®åŠå²›ä¸Šä¸“è½¦'
        },
      },
      {
        day: 3,
        title: {
          en: 'Day 3 â€“ Full-Day Excursion To Isabela Island | Breeding Center | Flamingo Lagoon | Tintoreras',
          es: 'DÃ­a 3 â€“ ExcursiÃ³n Full-Day A Isla Isabela | Centro De Crianza | Laguna De Flamingos | Tintoreras',
          fr: 'Jour 3 â€“ Excursion JournÃ©e Ã  l\'ÃŽle Isabela | Centre d\'Ã‰levage | Flamants Roses | Tintoreras',
          de: 'Tag 3 â€“ Ganztagesausflug Insel Isabela | Zuchtzentrum | Flamingo-Lagune | Tintoreras',
          it: 'Giorno 3 â€“ Escursione a Isabela | Centro Riproduzione | Fenicotteri | Tintoreras',
          pt: 'Dia 3 â€“ ExcursÃ£o Dia Inteiro a Isabela | Centro de ReproduÃ§Ã£o | Flamingos | Tintoreras',
          ja: 'ç¬¬3æ—¥ â€“ ã‚¤ã‚µãƒ™ãƒ©å³¶çµ‚æ—¥ãƒ„ã‚¢ãƒ¼ | ã‚¾ã‚¦ã‚¬ãƒ¡ç¹æ®–ã‚»ãƒ³ã‚¿ãƒ¼ | ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ | ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹',
          zh: 'ç¬¬3å¤© â€“ ä¼ŠèŽŽè´æ‹‰å²›å…¨æ—¥æŽ¢é™© | å·¨é¾Ÿç¹è‚²ä¸­å¿ƒ | ç«çƒˆé¸Ÿæ³»æ¹– | è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤æµ®æ½œ'
        },
        description: {
          en: 'After breakfast, transfer to the pier to board a speedboat to Isabela Island (approx 2 to 2.5 hours). Upon arrival in Puerto Villamil, visit the Giant Tortoise Breeding Center to learn about island conservation. Next, stroll around the Flamingo Lagoon to observe wild flamingos in their natural wetland habitat. Continue with a boat excursion to Tintoreras Islet, a pristine volcanic islet with turquoise waters ideal for snorkeling alongside sea lions, sea turtles, rays, reef sharks, GalÃ¡pagos penguins, and marine iguanas. Return by speedboat to Santa Cruz Island in the late afternoon.',
          es: 'Desayuno y traslado al muelle para abordar la lancha rÃ¡pida hacia Isla Isabela (2 a 2.5 horas de navegaciÃ³n). En Puerto Villamil, visitamos el Centro de Crianza de Tortugas Gigantes para conocer los programas de preservaciÃ³n. Luego recorremos la Laguna de Flamingos para admirar estas aves en su hÃ¡bitat de humedales. Por la tarde, navegaciÃ³n al Islote Tintoreras, formaciÃ³n volcÃ¡nica de aguas cristalinas ideal para snorkeling con lobos marinos, tortugas marinas, rayas, tiburones tintorera, pingÃ¼inos de GalÃ¡pagos e iguanas marinas. Retorno en lancha rÃ¡pida a Santa Cruz.',
          fr: 'AprÃ¨s le petit-dÃ©jeuner, dÃ©part en bateau rapide vers l\'Ã®le Isabela (2 Ã  2h30 de traversÃ©e). Ã€ Puerto Villamil, visite du centre d\'Ã©levage des tortues gÃ©antes puis promenade prÃ¨s de la lagune des flamants roses. L\'aprÃ¨s-midi, excursion en bateau vers l\'Ã®lot Tintoreras, paradis de lave volcanique offrant un snorkeling exceptionnel au milieu des otaries, tortues de mer, raies, manchots des GalÃ¡pagos et requins Ã  pointes blanches. Retour en bateau rapide Ã  Santa Cruz.',
          de: 'Nach dem FrÃ¼hstÃ¼ck Schnellbootfahrt zur Insel Isabela (ca. 2â€“2,5 Stunden). In Puerto Villamil Besuch des RiesenschildkrÃ¶ten-Zuchtzentrums und der Flamingo-Lagune. Nachmittags Bootstour zum Tintoreras-Inselchen: Schnorcheln im kristallklaren Wasser mit SeelÃ¶wen, MeeresschildkrÃ¶ten, Rochen, WeiÃŸspitzen-Riffhaien, Galapagos-Pinguinen und Meerechsen. RÃ¼ckfahrt per Schnellboot nach Santa Cruz.',
          it: 'Dopo colazione, motoscafo verso l\'isola Isabela (circa 2-2,5 ore). A Puerto Villamil, visita al Centro di Riproduzione delle Tartarughe e alla Laguna dei Fenicotteri. Nel pomeriggio, escursione in barca all\'isolotto Tintoreras, ideale per lo snorkeling con leoni marini, tartarughe marine, razze, pinguini delle Galapagos e squali pinna bianca. Rientro a Santa Cruz in motoscafo.',
          pt: 'ApÃ³s o cafÃ© da manhÃ£, lancha rÃ¡pida atÃ© a Ilha Isabela (2 a 2,5 horas). Em Puerto Villamil, visita ao Centro de ReproduÃ§Ã£o de Tartarugas Gigantes e Ã  Lagoa de Flamingos. Ã€ tarde, navegaÃ§Ã£o ao Ilhote Tintoreras para snorkel incrÃ­vel com leÃµes-marinhos, tartarugas marinhas, arraias, pinguins e tubarÃµes-tintureira. Retorno em lancha rÃ¡pida a Santa Cruz.',
          ja: 'æœé£Ÿå¾Œã€ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆã§æœ€å¤§ã®å³¶ã‚¤ã‚µãƒ™ãƒ©å³¶ã¸ï¼ˆç´„2ã€œ2.5æ™‚é–“ï¼‰ã€‚ãƒ—ã‚¨ãƒ«ãƒˆãƒ»ãƒ“ã‚¸ãƒ£ãƒŸãƒ«åˆ°ç€å¾Œã€ã‚¾ã‚¦ã‚¬ãƒ¡ç¹æ®–ã‚»ãƒ³ã‚¿ãƒ¼ã¨ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ã‚’è¦‹å­¦ã€‚åˆå¾Œã¯ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹å°å³¶ã¸ãƒœãƒ¼ãƒˆã‚¯ãƒ«ãƒ¼ã‚ºã€‚ã‚¢ã‚·ã‚«ã€ã‚¦ãƒŸã‚¬ãƒ¡ã€ã‚¨ã‚¤ã€ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹ãƒšãƒ³ã‚®ãƒ³ã€ãƒãƒ ãƒªãƒ–ã‚«ãŒç”Ÿæ¯ã™ã‚‹é€æ˜Žãªæ°´è·¯ã§ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã€‚å¤•æ–¹ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ã¸å¸°é‚„ã€‚',
          zh: 'æ—©é¤åŽä¹˜å¿«è‰‡æ¨ªæ¸¡è‡³åŠ æ‹‰å¸•æˆˆæ–¯æœ€å¤§å²›å±¿ä¼ŠèŽŽè´æ‹‰å²›ï¼ˆèˆªç¨‹çº¦2è‡³2.5å°æ—¶ï¼‰ã€‚æŠµè¾¾ç»´åˆ©äºšç±³å°”æ¸¯åŽæŽ¢è®¿å·¨é¾Ÿç¹æ®–ä¸­å¿ƒäº†è§£ä¿æŠ¤æˆæ•ˆï¼Œæ¼«æ­¥ç«çƒˆé¸Ÿæ³»æ¹–æ¹¿åœ°ã€‚åˆåŽä¹˜èˆ¹å‰å¾€è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤ï¼ˆTintorerasï¼‰ï¼Œåœ¨æ¸…æ¾ˆçš„ç«å±±æµ·æ¹¾ä¸­æµ®æ½œï¼Œä¸Žæµ·ç‹®ã€æµ·é¾Ÿã€è é²¼ã€åŠ æ‹‰å¸•æˆˆæ–¯ä¼é¹…åŠç™½é¡¶ç¤é²¨è¿‘è·ç¦»ç•…æ¸¸ã€‚å‚æ™šä¹˜å¿«è‰‡è¿”å›žåœ£å…‹é²æ–¯å²›ã€‚'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-dÃ©jeuner et dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'CafÃ© da manhÃ£ e almoÃ§o',
          ja: 'æœé£Ÿãƒ»æ˜¼é£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤ä¸Žåˆé¤'
        },
        transportation: {
          en: 'Inter-island speedboat and local land transfers',
          es: 'Lancha rÃ¡pida interislas y traslados locales',
          fr: 'Bateau rapide inter-Ã®les et transferts locaux',
          de: 'Schnellboot zwischen den Inseln & lokale Transfers',
          it: 'Motoscafo interisola e trasferimenti locali',
          pt: 'Lancha rÃ¡pida interilhas e traslados locais',
          ja: 'å³¶é–“ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆï¼†ç¾åœ°é€è¿Ž',
          zh: 'åŸŽé™…å¿«è‰‡ä¸Žå²›ä¸Šè§‚å…‰ä¸“è½¦'
        },
        activity: {
          en: 'Full-day guided island excursion and marine snorkeling',
          es: 'ExcursiÃ³n guiada de dÃ­a completo y snorkel marino',
          fr: 'Excursion guidÃ©e journÃ©e complÃ¨te et snorkeling marin',
          de: 'GanztÃ¤gige gefÃ¼hrte Tour & Meeresschnorcheln',
          it: 'Escursione guidata di un\'intera giornata e snorkeling',
          pt: 'ExcursÃ£o guiada de dia inteiro e snorkel marÃ­timo',
          ja: 'çµ‚æ—¥ã‚¬ã‚¤ãƒ‰ä»˜ãå³¶ãƒ„ã‚¢ãƒ¼ï¼†æµ·æ´‹ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°',
          zh: 'å…¨å¤©è‡ªç„¶å‘å¯¼é™ªåŒæŽ¢é™©ä¸Žæµ·æ´‹æµ®æ½œ'
        },
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ La LoberÃ­a | Punta Estrada | Las Grietas Volcanic Canyon',
          es: 'DÃ­a 4 â€“ La LoberÃ­a | Punta Estrada | CaÃ±Ã³n VolcÃ¡nico Las Grietas',
          fr: 'Jour 4 â€“ La LoberÃ­a | Punta Estrada | Canyon Volcanique Las Grietas',
          de: 'Tag 4 â€“ La LoberÃ­a | Punta Estrada | Vulkanschlucht Las Grietas',
          it: 'Giorno 4 â€“ La LoberÃ­a | Punta Estrada | Canyon Vulcanico Las Grietas',
          pt: 'Dia 4 â€“ La LoberÃ­a | Punta Estrada | CÃ¢nion VulcÃ¢nico Las Grietas',
          ja: 'ç¬¬4æ—¥ â€“ ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ | ãƒ—ãƒ³ã‚¿ãƒ»ã‚¨ã‚¹ãƒˆãƒ©ãƒ¼ãƒ€ | ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ç«å±±å³¡è°·',
          zh: 'ç¬¬4å¤© â€“ æ‹‰æ´›è´é‡Œäºšæµ·ç‹®æ»© | åŸƒæ–¯ç‰¹æ‹‰è¾¾è§’ | æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ç«å±±å³¡è°·'
        },
        description: {
          en: 'After breakfast, begin the day with a visit to La LoberÃ­a, a scenic coastal area known for its playful sea lion colony. Continue to Punta Estrada to observe coastal marine wildlife and unique lava formations. Proceed to Las Grietas, a stunning geological crevice filled with transparent brackish turquoise water flanked by towering volcanic cliffsâ€”a world-class spot for refreshing swimming and snorkeling. Afternoon at leisure in Puerto Ayora to explore art galleries and local artisan markets.',
          es: 'Tras el desayuno, visita a La LoberÃ­a, hermosa bahÃ­a costera famosa por su activa colonia de lobos marinos. Continuamos hacia Punta Estrada con sus paisajes volcÃ¡nicos y aves marinas. Luego exploramos Las Grietas, una grieta volcÃ¡nica natural de aguas turquesas cristalinas encajonada entre paredes de lava, ideal para nadar y hacer snorkel entre peces loro y peces cirujano. Resto de la tarde libre en Puerto Ayora para relajarse o visitar galerÃ­as locales.',
          fr: 'Visite cÃ´tiÃ¨re de La LoberÃ­a pour observer la joyeuse colonie d\'otaries des GalÃ¡pagos. DÃ©couverte de Punta Estrada et de ses paysages de lave. Puis exploration de Las Grietas, spectaculaire faille gÃ©ologique aux eaux turquoise limpides protÃ©gÃ©e par de hauts murs de basalte, parfaite pour la baignade et le snorkeling. AprÃ¨s-midi libre Ã  Puerto Ayora.',
          de: 'Besuch der Bucht La LoberÃ­a mit ihrer verspielten SeelÃ¶wenkolonie und von Punta Estrada. Weiter nach Las Grietas, einer spektakulÃ¤ren vulkanischen Felsspalte mit kristallklarem, tÃ¼rkisfarbenem Wasser â€“ ein grandioser Ort zum Schwimmen und Schnorcheln. Freier Nachmittag im lebendigen KÃ¼stenort Puerto Ayora.',
          it: 'Escursione a La LoberÃ­a per osservare i leoni marini e proseguimento per Punta Estrada. Visita a Las Grietas, una spettacolare crepa vulcanica dalle acque turchesi e trasparenti ideale per nuotare e fare snorkeling. Pomeriggio libero a Puerto Ayora.',
          pt: 'Visita Ã  baÃ­a de La LoberÃ­a para observar os leÃµes-marinhos e caminhada atÃ© Punta Estrada. Em seguida, descubra Las Grietas, um cÃ¢nion vulcÃ¢nico magnÃ­fico com Ã¡guas cristalinas perfeito para banho e snorkel. Tarde livre em Puerto Ayora.',
          ja: 'ã‚¢ã‚·ã‚«ãŒé›†ã¾ã‚‹ç¾Žã—ã„æµ·å²¸ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ã¨ãƒ—ãƒ³ã‚¿ãƒ»ã‚¨ã‚¹ãƒˆãƒ©ãƒ¼ãƒ€ã‚’æ•£ç­–ã€‚ç¶šã„ã¦é«˜ã•ã®ã‚ã‚‹æº¶å²©ã®çµ¶å£ã«å›²ã¾ã‚ŒãŸã‚¨ãƒ¡ãƒ©ãƒ«ãƒ‰ã‚°ãƒªãƒ¼ãƒ³ã®å¤©ç„¶ã‚¯ãƒ¬ãƒã‚¹ã€Œãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ã€ã¸ã€‚é€æ˜Žåº¦æŠœç¾¤ã®æ±½æ°´ã§ã‚¹ã‚¤ãƒŸãƒ³ã‚°ã¨ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã‚’æº€å–«ã€‚åˆå¾Œã¯ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©ã§è‡ªç”±æ™‚é–“ã€‚',
          zh: 'æ™¨é—´æ¸¸è§ˆæ‹‰æ´›è´é‡Œäºšæµ·å²¸ï¼Œè§‚èµæµ·æ»©ä¸Šæ†¨æ€å¯æŽ¬çš„åŠ æ‹‰å¸•æˆˆæ–¯æµ·ç‹®ç¾¤ä¸Žæµ·é¬£èœ¥ã€‚éšåŽå‰å¾€åŸƒæ–¯ç‰¹æ‹‰è¾¾è§’ï¼Œæ·±å…¥å£®ä¸½çš„æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ï¼ˆLas Grietasï¼‰ç«å±±çŽ„æ­¦å²©è£‚è°·ï¼Œåœ¨å³­å£æŽ©æ˜ çš„ç¿¡ç¿ è‰²çº¯å‡€æ°´åŸŸä¸­æ¸¸æ³³å’Œæµ®æ½œã€‚ä¸‹åˆåœ¨é˜¿çº¦æ‹‰æ¸¯è‡ªç”±æ¼«æ­¥ï¼Œä½“éªŒå½“åœ°æ‰‹å·¥è‰ºå“ä¸Žå’–å•¡æ–‡åŒ–ã€‚'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Water taxi and scenic coastal trail walk',
          es: 'Taxi acuÃ¡tico y caminata escÃ©nica por sendero costero',
          fr: 'Bateau-taxi et sentier cÃ´tier panoramique',
          de: 'Wassertaxi & malerische KÃ¼stenwanderung',
          it: 'Taxi acqueo e passeggiata costiera panoramica',
          pt: 'TÃ¡xi aquÃ¡tico e caminhada por trilha costeira',
          ja: 'æ°´ä¸Šã‚¿ã‚¯ã‚·ãƒ¼ï¼†æ²¿å²¸ãƒˆãƒ¬ãƒƒã‚­ãƒ³ã‚°',
          zh: 'æ°´ä¸Šå‡ºç§Ÿèˆ¹ä¸Žæµ·å²¸æ­¥è¡Œå¾’æ­¥'
        },
        activity: {
          en: 'Coastal wildlife watching, Las Grietas swimming & snorkeling',
          es: 'ObservaciÃ³n de fauna costera, nataciÃ³n y snorkel en Las Grietas',
          fr: 'Observation de la faune cÃ´tiÃ¨re, baignade et snorkeling Ã  Las Grietas',
          de: 'KÃ¼stenfauna-Beobachtung, Schwimmen & Schnorcheln in Las Grietas',
          it: 'Avvistamento fauna costiera, nuoto e snorkeling a Las Grietas',
          pt: 'ObservaÃ§Ã£o de vida silvestre costeira, nado e snorkel em Las Grietas',
          ja: 'æ²¿å²¸é‡Žç”Ÿç”Ÿç‰©è¦³å¯Ÿã€ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ã§ã®ã‚¹ã‚¤ãƒŸãƒ³ã‚°ï¼†ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°',
          zh: 'æ²¿æµ·é‡Žç”ŸåŠ¨ç‰©å·¡ç¤¼ã€æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯å³¡è°·æ¸¸æ³³ä¸Žæµ®æ½œ'
        },
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Transfer To Baltra Airport | Flight To Quito | Private Hotel Transfer',
          es: 'DÃ­a 5 â€“ Traslado Al Aeropuerto De Baltra | Vuelo A Quito | Transfer Privado Al Hotel',
          fr: 'Jour 5 â€“ Transfert Ã  l\'AÃ©roport de Baltra | Vol vers Quito | Transfert PrivÃ© HÃ´tel',
          de: 'Tag 5 â€“ Transfer zum Flughafen Baltra | Flug nach Quito | Privater Hoteltransfer',
          it: 'Giorno 5 â€“ Trasferimento all\'Aeroporto di Baltra | Volo per Quito | Transfer Privato in Hotel',
          pt: 'Dia 5 â€“ Traslado ao Aeroporto de Baltra | Voo para Quito | Transfer Privado ao Hotel',
          ja: 'ç¬¬5æ—¥ â€“ ãƒãƒ«ãƒˆãƒ©ç©ºæ¸¯ã¸é€è¿Ž | ã‚­ãƒˆè¡Œããƒ•ãƒ©ã‚¤ãƒˆ | ãƒ›ãƒ†ãƒ«å°‚ç”¨é€è¿Ž',
          zh: 'ç¬¬5å¤© â€“ å‰å¾€å·´å°”ç‰¹æ‹‰æœºåœº | é£žå¾€åŸºå¤š | ä¸“è½¦æŽ¥æœºå…¥ä½é…’åº—'
        },
        description: {
          en: 'After breakfast, check out from your hotel in Puerto Ayora and transfer across Santa Cruz Island and the Itabaca Channel to Baltra Seymour Airport for your return flight to the mainland. Upon landing in Quito, our representative will provide private transfer to your hotel. Enjoy your evening relaxing in the historic Andean capital.',
          es: 'Desayuno, check-out del hotel en Puerto Ayora y traslado terrestre cruzando Santa Cruz y el Canal de Itabaca hacia el Aeropuerto Seymour de Baltra para abordar el vuelo de retorno a Quito. A su llegada al continente, recepciÃ³n y traslado privado exclusivo a su hotel en Quito. Noche libre para disfrutar de la capital andina.',
          fr: 'Petit-dÃ©jeuner, check-out de votre hÃ´tel et transfert Ã  travers Santa Cruz et le canal d\'Itabaca vers l\'aÃ©roport Seymour de Baltra pour votre vol retour vers Quito. Ã€ votre arrivÃ©e sur le continent, accueil et transfert privÃ© Ã  votre hÃ´tel.',
          de: 'Nach dem FrÃ¼hstÃ¼ck Fahrt Ã¼ber Santa Cruz und den Itabaca-Kanal zum Flughafen Baltra fÃ¼r den RÃ¼ckflug nach Quito. Nach der Landung privater Transfer zu Ihrem Hotel in Quito. Entspannter Abend in der Andenmetropole.',
          it: 'Dopo colazione, check-out e trasferimento attraverso Santa Cruz e il canale di Itabaca verso l\'aeroporto di Baltra per il volo di rientro a Quito. Accoglienza e trasferimento privato in hotel.',
          pt: 'CafÃ© da manhÃ£, check-out e traslado por Santa Cruz e Canal de Itabaca atÃ© o Aeroporto de Baltra para voo de retorno a Quito. Chegada e traslado privado exclusivo ao hotel em Quito.',
          ja: 'æœé£Ÿå¾Œãƒã‚§ãƒƒã‚¯ã‚¢ã‚¦ãƒˆã—ã€ã‚¤ã‚¿ãƒã‚«é‹æ²³ã‚’çµŒç”±ã—ã¦ãƒãƒ«ãƒˆãƒ©å³¶ç©ºæ¸¯ã¸ç§»å‹•ã€‚ã‚­ãƒˆè¡Œãã®å›½å†…ç·šãƒ•ãƒ©ã‚¤ãƒˆã«æ­ä¹—ã€‚ã‚­ãƒˆåˆ°ç€å¾Œã€å°‚ç”¨è»Šã§ãƒ›ãƒ†ãƒ«ã¸ãŠé€ã‚Šã„ãŸã—ã¾ã™ã€‚æ­´å²ã‚ã‚‹ã‚¢ãƒ³ãƒ‡ã‚¹ã®é¦–éƒ½ã§ã‚†ã£ãŸã‚Šã¨ãŠéŽã”ã—ãã ã•ã„ã€‚',
          zh: 'æ—©é¤åŽåŠžç†é€€æˆ¿ï¼Œç©¿è¿‡åœ£å…‹é²æ–¯å²›ä¸Žä¼Šå¡”å·´å¡æµ·å³¡å‰å¾€å·´å°”ç‰¹æ‹‰è¥¿æ‘©æœºåœºï¼Œæ­ä¹˜èˆªç­è¿”å›žåŽ„ç“œå¤šå°”å¤§é™†ã€‚æŠµè¾¾åŸºå¤šåŽä¸“è½¦æŽ¥æœºé€æŠµé…’åº—ã€‚å¤œæ™šå¯æ¼«æ­¥è€åŸŽæˆ–åœ¨é…’åº—ä¼‘æ†©ã€‚'
        },
        image: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3â˜… or 4â˜…)',
          es: 'Hotel en Quito (CategorÃ­a seleccionada 3â˜… o 4â˜…)',
          fr: 'HÃ´tel Ã  Quito (CatÃ©gorie 3â˜… ou 4â˜…)',
          de: 'Hotel in Quito (Kategorie 3â˜… oder 4â˜…)',
          it: 'Hotel a Quito (Categoria 3â˜… o 4â˜…)',
          pt: 'Hotel em Quito (Categoria 3â˜… ou 4â˜…)',
          ja: 'ã‚­ãƒˆå¸‚å†…ã®åŽ³é¸ãƒ›ãƒ†ãƒ«ï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
          zh: 'åŸºå¤šç²¾é€‰é…’åº—ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Island ground transfer, Baltra airport shuttle, domestic flight & private Quito transfer',
          es: 'Transporte en isla, bus Lobito, vuelo domÃ©stico y traslado privado en Quito',
          fr: 'Transport terrestre sur l\'Ã®le, navette aÃ©roport, vol intÃ©rieur et transfert privÃ© Ã  Quito',
          de: 'Insel-Transfer, Shuttlebus, Inlandsflug & privater Transfer in Quito',
          it: 'Trasferimento sull\'isola, navetta, volo nazionale e transfer privato a Quito',
          pt: 'Transporte na ilha, Ã´nibus shuttle, voo domÃ©stico e traslado privado em Quito',
          ja: 'å³¶å†…é™¸ä¸Šé€è¿Žã€ç©ºæ¸¯ã‚·ãƒ£ãƒˆãƒ«ã€å›½å†…ç·šãƒ•ãƒ©ã‚¤ãƒˆï¼†ã‚­ãƒˆå¸‚å†…å°‚ç”¨é€è¿Ž',
          zh: 'å²›ä¸Šé™†è·¯æŽ¥é©³ã€æœºåœºä¸“çº¿å·´å£«ã€å›½å†…èˆªç­åŠåŸºå¤šå¸‚å†…ä¸“è½¦'
        },
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Private Quito Airport Transfer | Onward Connections',
          es: 'DÃ­a 6 â€“ Traslado Privado Al Aeropuerto De Quito | Vuelo Internacional',
          fr: 'Jour 6 â€“ Transfert PrivÃ© vers l\'AÃ©roport de Quito | Connexions Internationales',
          de: 'Tag 6 â€“ Privater Transfer zum Flughafen Quito | Weiterflug',
          it: 'Giorno 6 â€“ Trasferimento Privato all\'Aeroporto di Quito | Volo di Rientro',
          pt: 'Dia 6 â€“ Traslado Privado ao Aeroporto de Quito | ConexÃµes Internacionais',
          ja: 'ç¬¬6æ—¥ â€“ ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨é€è¿Ž | å¸°å›½ã®é€”ã¸',
          zh: 'ç¬¬6å¤© â€“ åŸºå¤šæœºåœºç§äººä¸“è½¦é€æœº | è¸ä¸Šå½’é€”'
        },
        description: {
          en: 'At the scheduled time, private transfer from your hotel to Quito International Airport for your onward international flight connections. End of our services, taking home unforgettable memories of the enchanted GalÃ¡pagos Islands.',
          es: 'A la hora acordada, traslado privado exclusivo desde su hotel hacia el Aeropuerto Internacional Mariscal Sucre de Quito para tomar su vuelo de conexiÃ³n internacional. Fin de nuestros servicios con recuerdos inolvidables de las Islas Encantadas.',
          fr: 'Transfert privÃ© de votre hÃ´tel vers l\'aÃ©roport international de Quito pour votre vol de correspondance internationale. Fin de nos prestations avec des souvenirs mÃ©morables des Ã®les GalÃ¡pagos.',
          de: 'Rechtzeitiger privater Transfer vom Hotel zum internationalen Flughafen Quito fÃ¼r Ihren internationalen Weiterflug. Ende unserer Leistungen mit unvergesslichen Erinnerungen an die verzauberten Galapagos-Inseln.',
          it: 'All\'orario concordato, trasferimento privato dall\'hotel all\'Aeroporto Internazionale di Quito per il volo internazionale di ritorno. Fine dei nostri servizi.',
          pt: 'No horÃ¡rio programado, traslado privado do hotel ao Aeroporto Internacional de Quito para conexÃ£o com seu voo internacional. Fim de nossos serviÃ§os com lembranÃ§as inesquecÃ­veis.',
          ja: 'ãƒ•ãƒ©ã‚¤ãƒˆæ™‚é–“ã«åˆã‚ã›ã¦ãƒ›ãƒ†ãƒ«ã‹ã‚‰ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã¸å°‚ç”¨è»Šã§é€è¿Žã„ãŸã—ã¾ã™ã€‚é­”æ³•ã®ã‚ˆã†ãªã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ã®æ€ã„å‡ºã¨ã¨ã‚‚ã«å¸°å›½ã®é€”ã¸ã€‚ã‚µãƒ¼ãƒ“ã‚¹çµ‚äº†ã¨ãªã‚Šã¾ã™ã€‚',
          zh: 'æ ¹æ®å›½é™…èˆªç­èµ·é£žæ—¶é—´ï¼Œä¸“è½¦é€å¾€åŸºå¤šå›½é™…æœºåœºåŠžç†ç™»æœºæ‰‹ç»­ï¼Œè¸ä¸Šæ¸©é¦¨å½’é€”ã€‚åŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›çš„å¥‡å¦™æŽ¢é™©åœ†æ»¡ç»“æŸã€‚'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Private transportation to Quito International Airport',
          es: 'Transporte privado al Aeropuerto Internacional de Quito',
          fr: 'Transport privÃ© vers l\'aÃ©roport international de Quito',
          de: 'Privater Transport zum Flughafen Quito',
          it: 'Trasporto privato per l\'aeroporto di Quito',
          pt: 'Transporte privado para o Aeroporto de Quito',
          ja: 'ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã¸ã®å°‚ç”¨é€è¿Žè»Š',
          zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦é€æœº'
        },
      }
    ]
  },

  // Tour: galapagos-7days
  {
    id: 'galapagos-7days',
    code: '1.2',
    title: {
      en: 'Galapagos Explorer: 7-Day Island Expedition',
      es: 'ExpediciÃ³n GalÃ¡pagos: 7 DÃ­as De Aventura',
      fr: 'ExpÃ©dition GalÃ¡pagos: 7 Jours d\'Aventure',
      de: 'Galapagos Entdecker: 7 Tage Inselabenteuer',
      it: 'Spedizione Galapagos: 7 Giorni di Avventura',
      pt: 'ExpediÃ§Ã£o GalÃ¡pagos: 7 Dias de Aventura',
      ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹æŽ¢æ¤œï¼š7æ—¥é–“ã®ã‚¢ã‚¤ãƒ©ãƒ³ãƒ‰ã‚¢ãƒ‰ãƒ™ãƒ³ãƒãƒ£ãƒ¼ï¼ˆã‚­ãƒˆé€è¿Žä»˜ãï¼‰',
      zh: 'åŠ æ‹‰å¸•æˆˆæ–¯æŽ¢ç´¢è€…ï¼š7æ—¥æµ·å²›æ·±åº¦æŽ¢é™©ï¼ˆå«åŸºå¤šæŽ¥é€æœºï¼‰'
    },
    destination: 'Galapagos',
    duration: {
      en: '7 DAYS / 6 NIGHTS',
      es: '7 DÃAS / 6 NOCHES',
      fr: '7 JOURS / 6 NUITS',
      de: '7 TAGE / 6 NÃ„CHTE',
      it: '7 GIORNI / 6 NOTTI',
      pt: '7 DIAS / 6 NOITES',
      ja: '7æ—¥é–“ / 6æ³Š',
      zh: '7å¤© / 6æ™š'
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
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
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
      es: 'Gran Salto de Islas y NavegaciÃ³n en Yate',
      fr: 'Grand saut d\'Ã®les et croisiÃ¨re en yacht',
      de: 'GroÃŸes InselhÃ¼pfen & Yacht-Kreuzfahrt',
      it: 'Grande Salto tra Isole e Navigazione in Yacht',
      pt: 'Grande Salto entre Ilhas e NavegaÃ§Ã£o em Iate',
      ja: 'ãƒžãƒ«ãƒã‚¢ã‚¤ãƒ©ãƒ³ãƒ‰ï¼†ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚º',
      zh: 'å¤šå²›è·³å²›æŽ¢é™©ä¸Žæ¸¸è‰‡å·¡èˆª'
    },
    description: {
      en: 'Unforgettable 7-day journey connecting Quito private transfers, Santa Cruz highlands & giant tortoises, an overnight stay on Isabela Island with Tintoreras & flamingo lagoon, Las Grietas canyon, and a full-day navigable yacht excursion to Santa Fe or PinzÃ³n Island.',
      es: 'Inolvidable viaje de 7 dÃ­as que conecta traslados privados en Quito, tierras altas de Santa Cruz, noche en Isla Isabela con Tintoreras y laguna de flamingos, caÃ±Ã³n de Las Grietas y navegaciÃ³n de dÃ­a completo en yate a Santa Fe o PinzÃ³n.',
      fr: 'Voyage inoubliable de 7 jours reliant les transferts privÃ©s Ã  Quito, les hauts plateaux de Santa Cruz, une nuit sur l\'Ã®le Isabela avec Tintoreras et flamants roses, Las Grietas et une excursion navigable d\'une journÃ©e en yacht vers Santa Fe ou PinzÃ³n.',
      de: 'Unvergessliche 7-tÃ¤gige Reise mit privaten Quito-Transfers, Santa Cruz Hochland, Ãœbernachtung auf der Insel Isabela mit Tintoreras & Flamingo-Lagune, Las Grietas und ganztÃ¤gigem Yachtausflug zur Insel Santa Fe oder PinzÃ³n.',
      it: 'Indimenticabile viaggio di 7 giorni con trasferimenti privati a Quito, alture di Santa Cruz, pernottamento a Isabela con Tintoreras e fenicotteri, canyon di Las Grietas ed escursione in yacht a Santa Fe o PinzÃ³n.',
      pt: 'InesquecÃ­vel viagem de 7 dias combinando traslados privados em Quito, terras altas de Santa Cruz, pernoite na Ilha Isabela com Tintoreras e flamingos, cÃ¢nion de Las Grietas e navegaÃ§Ã£o de dia inteiro a Santa Fe ou PinzÃ³n.',
      ja: 'ã‚­ãƒˆå°‚ç”¨é€è¿Žã€ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ã®å·¨äº€ã¨åŒå­å‘ã€ã‚¤ã‚µãƒ™ãƒ©å³¶ã§ã®å®¿æ³Šã¨ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹ã®ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã€ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ã€ãã—ã¦ã‚µãƒ³ã‚¿ãƒ•ã‚§å³¶ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚ºã‚’å«ã‚€è´…æ²¢ãª7æ—¥é–“ã€‚',
      zh: '7æ—¥ç»å…¸æµ·å²›æŽ¢é™©ï¼ŒåŒ…å«åŸºå¤šç§äººæœºåœºæŽ¥é€ã€åœ£å…‹é²æ–¯é«˜åœ°å·¨é¾Ÿä¿æŠ¤åŒºã€ä¼ŠèŽŽè´æ‹‰å²›è¿‡å¤œä½“éªŒï¼ˆè’‚æ©æ‰˜é›·æ‹‰æ–¯ç¾¤ç¤æµ®æ½œä¸Žç«çƒˆé¸Ÿæ³»æ¹–ï¼‰ã€æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ç«å±±å³¡è°·ï¼Œä»¥åŠå‰å¾€åœ£è²å²›æˆ–å¹³æ¾å²›çš„å…¨å¤©å‡ºæµ·æ¸¸è‰‡å·¡èˆªã€‚'
    },
    highlights: [
      {
        en: 'Private Quito Airport Transfers (Arrival & Departure)',
        es: 'Traslados Privados Aeropuerto Quito (Llegada y Salida)',
        fr: 'Transferts PrivÃ©s AÃ©roport de Quito (ArrivÃ©e et DÃ©part)',
        de: 'Private Quito-Flughafentransfers (Ankunft & Abreise)',
        it: 'Trasferimenti Privati Aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados Privados Aeroporto de Quito (Chegada e Partida)',
        ja: 'ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨å¾€å¾©é€è¿Žï¼ˆåˆ°ç€ï¼†å‡ºç™ºï¼‰',
        zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦æŽ¥é€ï¼ˆæŠµè¾¾ä¸Žç¦»å¢ƒï¼‰'
      },
      {
        en: 'Twin Craters & Primicias Giant Tortoise Reserve',
        es: 'CrÃ¡teres Gemelos y Reserva de Tortugas Primicias',
        fr: 'CratÃ¨res Jumeaux et RÃ©serve de Tortues Primicias',
        de: 'Zwillingskrater & RiesenschildkrÃ¶ten-Reservat Primicias',
        it: 'Crateri Gemelli e Riserva Tartarughe Primicias',
        pt: 'Crateras GÃªmeas e Reserva de Tartarugas Primicias',
        ja: 'åŒå­å‘ï¼†ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹å·¨äº€ä¿è­·åŒº',
        zh: 'åŒå­å‘ä¸Žæ™®é‡Œç±³è¥¿äºšå·¨é¾Ÿç”Ÿæ€ä¿æŠ¤åŒº'
      },
      {
        en: 'Overnight in Isabela Island & Flamingo Lagoon',
        es: 'Noche en Isla Isabela y Laguna de Flamingos',
        fr: 'Nuit sur l\'Ã®le Isabela & Lagune des Flamants',
        de: 'Ãœbernachtung auf der Insel Isabela & Flamingo-Lagune',
        it: 'Pernottamento a Isabela e Laguna dei Fenicotteri',
        pt: 'Pernoite na Ilha Isabela e Lagoa de Flamingos',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶ã§ã®å®¿æ³Šï¼†ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›æ·±åº¦è¿‡å¤œä½“éªŒä¸Žç«çƒˆé¸Ÿæ³»æ¹–'
      },
      {
        en: 'Tintoreras Islet Snorkeling & Marine Iguana Colonies',
        es: 'Snorkel en Tintoreras y Colonias de Iguanas Marinas',
        fr: 'Snorkeling aux Tintoreras & Iguanes Marins',
        de: 'Schnorcheln bei Tintoreras & Meerechsenkolonien',
        it: 'Snorkeling a Tintoreras e Colonie di Iguane Marine',
        pt: 'Snorkel em Tintoreras e ColÃ´nias de Iguanas Marinhas',
        ja: 'ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹ã§ã®ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ï¼†ã‚¦ãƒŸã‚¤ã‚°ã‚¢ãƒŠã®ç¾¤ã‚Œ',
        zh: 'è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤æµ®æ½œä¸Žæµ·é¬£èœ¥ç¾¤è½å·¡ç¤¼'
      },
      {
        en: 'Full-Day Navigable Yacht Cruise to Santa Fe or PinzÃ³n Island',
        es: 'NavegaciÃ³n Full-Day en Yate a Isla Santa Fe o PinzÃ³n',
        fr: 'CroisiÃ¨re Navigable d\'une JournÃ©e Ã  Santa Fe ou PinzÃ³n',
        de: 'GanztÃ¤gige Yacht-Kreuzfahrt zur Insel Santa Fe oder PinzÃ³n',
        it: 'Crociera in Yacht di un\'intera Giornata a Santa Fe o PinzÃ³n',
        pt: 'Cruzeiro de Dia Inteiro em Iate para Santa Fe ou PinzÃ³n',
        ja: 'ã‚µãƒ³ã‚¿ãƒ•ã‚§å³¶ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚º',
        zh: 'åœ£è²å²›æˆ–å¹³æ¾å²›å…¨å¤©å‡ºæµ·æ¸¸è‰‡èˆªè¡Œä¸Žæµ®æ½œ'
      }
    ],
    inclusions: [
      {
        en: 'Accommodation at the hotel of your choice in Santa Cruz (3â˜… or 4â˜…)',
        es: 'Alojamiento en el hotel seleccionado en Santa Cruz (3â˜… o 4â˜…)',
        fr: 'HÃ©bergement Ã  l\'hÃ´tel de votre choix Ã  Santa Cruz (3â˜… ou 4â˜…)',
        de: 'Unterkunft im gewÃ¤hlten Hotel auf Santa Cruz (3â˜… oder 4â˜…)',
        it: 'Sistemazione nell\'hotel prescelto a Santa Cruz (3â˜… o 4â˜…)',
        pt: 'Hospedagem no hotel de sua escolha em Santa Cruz (3â˜… ou 4â˜…)',
        ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ã®åŽ³é¸ãƒ›ãƒ†ãƒ«å®¿æ³Šï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
        zh: 'åœ£å…‹é²æ–¯å²›è‡ªé€‰ç²¾å“é…’åº—ä½å®¿ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
      },
      {
        en: 'Accommodation at Hostal Tintorera in Isabela Island',
        es: 'Alojamiento en Hostal Tintorera en Isla Isabela',
        fr: 'HÃ©bergement Ã  l\'Hostal Tintorera sur l\'Ã®le Isabela',
        de: 'Unterkunft im Hostal Tintorera auf der Insel Isabela',
        it: 'Sistemazione presso Hostal Tintorera sull\'isola Isabela',
        pt: 'Hospedagem no Hostal Tintorera na Ilha Isabela',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶ã®ã‚ªã‚¹ã‚¿ãƒ«ãƒ»ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©å®¿æ³Š',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›å»·æ‰˜é›·æ‹‰å®¢æ ˆä½å®¿'
      },
      {
        en: 'Private airport transfers in Quito (Arrival & Departure)',
        es: 'Traslados privados en aeropuerto de Quito (Llegada y Salida)',
        fr: 'Transferts privÃ©s aÃ©roport de Quito (ArrivÃ©e et DÃ©part)',
        de: 'Private Flughafentransfers in Quito (Ankunft & Abreise)',
        it: 'Trasferimenti privati aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados privados no aeroporto de Quito (Chegada e Partida)',
        ja: 'ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨ãƒ—ãƒ©ã‚¤ãƒ™ãƒ¼ãƒˆé€è¿Žï¼ˆåˆ°ç€ï¼†å‡ºç™ºï¼‰',
        zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦æŽ¥é€ï¼ˆæŠµè¾¾ä¸Žå‡ºå‘ï¼‰'
      },
      {
        en: 'Buffet breakfast at 4â˜… hotels / Continental breakfast at 3â˜… hotels',
        es: 'Desayuno buffet en hoteles 4â˜… / Desayuno continental en hoteles 3â˜…',
        fr: 'Petit-dÃ©jeuner buffet en hÃ´tel 4â˜… / continental en hÃ´tel 3â˜…',
        de: 'FrÃ¼hstÃ¼cksbuffet in 4â˜…-Hotels / Kontinentales FrÃ¼hstÃ¼ck in 3â˜…-Hotels',
        it: 'Colazione a buffet in hotel 4â˜… / Continentale in hotel 3â˜…',
        pt: 'CafÃ© da manhÃ£ buffet em hotÃ©is 4â˜… / Continental em hotÃ©is 3â˜…',
        ja: '4â˜…ãƒ›ãƒ†ãƒ«ã®ãƒ“ãƒ¥ãƒƒãƒ•ã‚§æœé£Ÿ / 3â˜…ãƒ›ãƒ†ãƒ«ã®ã‚³ãƒ³ãƒãƒãƒ³ã‚¿ãƒ«æœé£Ÿ',
        zh: '4æ˜Ÿçº§é…’åº—è‡ªåŠ©æ—©é¤ / 3æ˜Ÿçº§é…’åº—æ¬§é™†å¼æ—©é¤'
      },
      {
        en: 'Set-menu lunches according to the itinerary',
        es: 'Almuerzos menÃº incluidos segÃºn el itinerario',
        fr: 'DÃ©jeuners avec menu prÃ©Ã©tabli selon l\'itinÃ©raire',
        de: 'Mittagessen mit festem MenÃ¼ gemÃ¤ÃŸ Reiseroute',
        it: 'Pranzi con menu fisso secondo l\'itinerario',
        pt: 'AlmoÃ§os com cardÃ¡pio fixo de acordo com o itinerÃ¡rio',
        ja: 'æ—…ç¨‹ã«å¿œã˜ãŸã‚»ãƒƒãƒˆãƒ¡ãƒ‹ãƒ¥ãƒ¼ã®æ˜¼é£Ÿ',
        zh: 'è¡Œç¨‹ä¸­è§„åˆ’çš„æŒ‡å®šå¥—é¤åˆé¤'
      },
      {
        en: 'Domestic Flight Ticket (Quito â€“ Baltra â€“ Quito)',
        es: 'Boleto aÃ©reo domÃ©stico (Quito â€“ Baltra â€“ Quito)',
        fr: 'Billet d\'avion intÃ©rieur (Quito â€“ Baltra â€“ Quito)',
        de: 'Inlandsflugticket (Quito â€“ Baltra â€“ Quito)',
        it: 'Biglietto aereo nazionale (Quito â€“ Baltra â€“ Quito)',
        pt: 'Passagem aÃ©rea domÃ©stica (Quito â€“ Baltra â€“ Quito)',
        ja: 'å›½å†…ç·šå¾€å¾©èˆªç©ºåˆ¸ï¼ˆã‚­ãƒˆ â€“ ãƒãƒ«ãƒˆãƒ© â€“ ã‚­ãƒˆï¼‰',
        zh: 'åŽ„ç“œå¤šå°”å¢ƒå†…å¾€è¿”æœºç¥¨ï¼ˆåŸºå¤š â€“ å·´å°”ç‰¹æ‹‰ â€“ åŸºå¤šï¼‰'
      },
      {
        en: 'All guided visits to the islands according to the itinerary',
        es: 'Todas las visitas guiadas a las islas segÃºn el itinerario',
        fr: 'Toutes les visites guidÃ©es des Ã®les selon l\'itinÃ©raire',
        de: 'Alle gefÃ¼hrten Inselbesuche gemÃ¤ÃŸ Reiseroute',
        it: 'Tutte le visite guidate alle isole secondo l\'itinerario',
        pt: 'Todas as visitas guiadas Ã s ilhas de acordo com o itinerÃ¡rio',
        ja: 'æ—…ç¨‹ã«è¨˜è¼‰ã•ã‚ŒãŸã™ã¹ã¦ã®ã‚¬ã‚¤ãƒ‰ä»˜ãå³¶å†…è¦³å…‰',
        zh: 'è¡Œç¨‹è§„åˆ’çš„æ‰€æœ‰å—ä¿æŠ¤æµ·å²›å¯¼è§ˆæ¸¸è§ˆ'
      },
      {
        en: 'Airport reception and departure assistance at GalÃ¡pagos airports',
        es: 'RecepciÃ³n y asistencia en aeropuertos de GalÃ¡pagos',
        fr: 'Accueil et assistance aux aÃ©roports des GalÃ¡pagos',
        de: 'Flughafenempfang und Abreisebetreuung auf GalÃ¡pagos',
        it: 'Accoglienza e assistenza negli aeroporti delle Galapagos',
        pt: 'RecepÃ§Ã£o e assistÃªncia nos aeroportos de GalÃ¡pagos',
        ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ç©ºæ¸¯ã§ã®åˆ°ç€å‡ºè¿ŽãˆãŠã‚ˆã³å‡ºç™ºã‚µãƒãƒ¼ãƒˆ',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯å„æœºåœºæŠµè¾¾ä¸“å‘˜æŽ¥æœºä¸Žå‡ºå‘ååŠ©'
      },
      {
        en: 'Comprehensive land and maritime transportation',
        es: 'Transporte terrestre y marÃ­timo integral',
        fr: 'Transport terrestre et maritime complet',
        de: 'Umfassender Land- und Seetransport',
        it: 'Trasporto terrestre e marittimo completo',
        pt: 'Transporte terrestre e marÃ­timo completo',
        ja: 'å…¨è¡Œç¨‹ã«ãŠã‘ã‚‹é™¸ä¸ŠãŠã‚ˆã³æµ·ä¸Šç§»å‹•äº¤é€š',
        zh: 'å…¨ç¨‹ä¸“è½¦é™†è·¯ä¸Žå¿«è‰‡æµ·ä¸Šäº¤é€š'
      },
      {
        en: 'Level III Certified Naturalist Guides (Spanish / English)',
        es: 'GuÃ­as naturalistas certificados Nivel III (EspaÃ±ol / InglÃ©s)',
        fr: 'Guides naturalistes certifiÃ©s de niveau III (Espagnol / Anglais)',
        de: 'Zertifizierte NaturfÃ¼hrer der Stufe III (Spanisch / Englisch)',
        it: 'Guide naturalistiche certificate di Livello III (Spagnolo / Inglese)',
        pt: 'Guias naturalistas certificados NÃ­vel III (Espanhol / InglÃªs)',
        ja: 'ãƒ¬ãƒ™ãƒ«IIIèªå®šãƒŠãƒãƒ¥ãƒ©ãƒªã‚¹ãƒˆã‚¬ã‚¤ãƒ‰ï¼ˆè‹±èªžãƒ»ã‚¹ãƒšã‚¤ãƒ³èªžï¼‰',
        zh: 'ä¸‰çº§å›½å®¶è®¤è¯èµ„æ·±è‡ªç„¶å‘å¯¼ï¼ˆè‹±è¯­/è¥¿ç­ç‰™è¯­ï¼‰'
      },
      {
        en: 'Snorkeling equipment for boat excursions (mask and snorkel)',
        es: 'Equipo de snorkel para excursiones en barco (mÃ¡scara y tubo)',
        fr: 'Ã‰quipement de snorkeling pour les excursions en bateau (masque et tuba)',
        de: 'SchnorchelausrÃ¼stung fÃ¼r Bootstouren (Maske und Schnorchel)',
        it: 'Attrezzatura da snorkeling per escursioni in barca (maschera e boccaglio)',
        pt: 'Equipamento de snorkel para excursÃµes de barco (mÃ¡scara e snorkel)',
        ja: 'ãƒœãƒ¼ãƒˆãƒ„ã‚¢ãƒ¼ç”¨ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°è£…å‚™ï¼ˆãƒžã‚¹ã‚¯ï¼†ã‚¹ãƒŽãƒ¼ã‚±ãƒ«ï¼‰',
        zh: 'æ¸¸è‰‡å‡ºæµ·æŽ¢é™©é«˜å“è´¨æµ®æ½œè£…å¤‡ï¼ˆé¢é•œå’Œå‘¼å¸ç®¡ï¼‰'
      },
      {
        en: 'Safety lockers available at hotel reception',
        es: 'Casilleros de seguridad disponibles en la recepciÃ³n del hotel',
        fr: 'Coffres-forts disponibles Ã  la rÃ©ception de l\'hÃ´tel',
        de: 'SicherheitsschlieÃŸfÃ¤cher an der Hotelrezeption verfÃ¼gbar',
        it: 'Cassette di sicurezza alla reception dell\'hotel',
        pt: 'Cofres de seguranÃ§a na recepÃ§Ã£o do hotel',
        ja: 'ãƒ›ãƒ†ãƒ«ãƒ•ãƒ­ãƒ³ãƒˆã®ã‚»ãƒ¼ãƒ•ãƒ†ã‚£ãƒœãƒƒã‚¯ã‚¹åˆ©ç”¨å¯èƒ½',
        zh: 'é…’åº—å‰å°å…è´¹æä¾›å®‰å…¨ä¿é™©ç®±æœåŠ¡'
      },
      {
        en: 'Lobito Airport Shuttle Bus: Airport â€“ Itabaca Channel â€“ Airport',
        es: 'AutobÃºs Lobito: Aeropuerto â€“ Canal de Itabaca â€“ Aeropuerto',
        fr: 'Navette aÃ©roport Lobito: AÃ©roport â€“ Canal d\'Itabaca â€“ AÃ©roport',
        de: 'Lobito Flughafen-Shuttlebus: Flughafen â€“ Itabaca-Kanal â€“ Flughafen',
        it: 'Bus navetta Lobito: Aeroporto â€“ Canale di Itabaca â€“ Aeroporto',
        pt: 'Ã”nibus shuttle Lobito: Aeroporto â€“ Canal de Itabaca â€“ Aeroporto',
        ja: 'ãƒ­ãƒ“ãƒˆç©ºæ¸¯ã‚·ãƒ£ãƒˆãƒ«ãƒã‚¹ï¼šç©ºæ¸¯ â€“ ã‚¤ã‚¿ãƒã‚«é‹æ²³ â€“ ç©ºæ¸¯',
        zh: 'Lobitoæœºåœºç©¿æ¢­æŽ¥é©³å·´å£«ï¼šæœºåœº â€“ ä¼Šå¡”å·´å¡è¿æ²³ â€“ æœºåœº'
      },
      {
        en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors',
        es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros',
        fr: 'Taxe de quai d\'Isabela: 5,00 USD nationaux / 10,00 USD Ã©trangers',
        de: 'Isabela-DockgebÃ¼hr: USD 5,00 fÃ¼r Ecuadorianer / USD 10,00 fÃ¼r AuslÃ¤nder',
        it: 'Tassa portuale di Isabela: 5,00 USD ecuadoriani / 10,00 USD stranieri',
        pt: 'Taxa de cais de Isabela: USD 5,00 nacionais / USD 10,00 estrangeiros',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶å…¥æ¸¯ç¨Žï¼šã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«å›½ç± USD 5.00 / å¤–å›½äºº USD 10.00',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›ç å¤´ç¨Žï¼šåŽ„ç“œå¤šå°”å…¬æ°‘ 5 ç¾Žå…ƒ / å¤–å›½æ¸¸å®¢ 10 ç¾Žå…ƒ'
      }
    ],
    exclusions: [
      {
        en: 'GalÃ¡pagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors',
        es: 'Entrada al Parque Nacional GalÃ¡pagos: USD 6.00 nacionales / USD 200.00 extranjeros',
        fr: 'EntrÃ©e au Parc National des GalÃ¡pagos: 6,00 USD nationaux / 200,00 USD Ã©trangers',
        de: 'EintrittsgebÃ¼hr fÃ¼r den Galapagos-Nationalpark: USD 6,00 fÃ¼r Ecuadorianer / USD 200,00 fÃ¼r AuslÃ¤nder',
        it: 'Ingresso al Parco Nazionale delle Galapagos: 6,00 USD ecuadoriani / 200,00 USD stranieri',
        pt: 'Entrada no Parque Nacional GalÃ¡pagos: USD 6,00 nacionais / USD 200,00 estrangeiros',
        ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹å›½ç«‹å…¬åœ’å…¥å ´æ–™ï¼šã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«å›½ç± USD 6.00 / å¤–å›½äºº USD 200.00',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯å›½å®¶å…¬å›­å…¥å›­è´¹ï¼šåŽ„ç“œå¤šå°”å…¬æ°‘ 6 ç¾Žå…ƒ / å¤–å›½æ¸¸å®¢ 200 ç¾Žå…ƒ'
      },
      {
        en: 'Dinners (to give you freedom to enjoy local gastronomy)',
        es: 'Cenas (libertad para explorar la gastronomÃ­a local)',
        fr: 'DÃ®ners (pour vous laisser libre de dÃ©couvrir la gastronomie locale)',
        de: 'Abendessen (Freiheit zur Entdeckung der lokalen Gastronomie)',
        it: 'Cene (libertÃ  di esplorare la gastronomia locale)',
        pt: 'Jantares (liberdade para desfrutar da gastronomia local)',
        ja: 'å¤•é£Ÿï¼ˆåœ°å…ƒã®ã‚°ãƒ«ãƒ¡ã‚’è‡ªç”±ã«ãŠæ¥½ã—ã¿ã„ãŸã ã‘ã¾ã™ï¼‰',
        zh: 'æ™šé¤ï¼ˆç•™ç™½æ—¶é—´è‡ªç”±å“å‘³å½“åœ°ç‰¹è‰²æµ·é²œä¸Žç¾Žé¦”ï¼‰'
      },
      {
        en: 'Transit Control Card (TCT): USD 20.00 per person',
        es: 'Tarjeta de Control de TrÃ¡nsito (TCT): USD 20.00 por persona',
        fr: 'Carte de ContrÃ´le de Transit (TCT): 20,00 USD par personne',
        de: 'Transit Control Card (TCT): USD 20,00 pro Person',
        it: 'Carta di Controllo del Transito (TCT): 20,00 USD a persona',
        pt: 'CartÃ£o de Controle de TrÃ¢nsito (TCT): USD 20,00 por pessoa',
        ja: 'ãƒˆãƒ©ãƒ³ã‚¸ãƒƒãƒˆã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«ã‚«ãƒ¼ãƒ‰ï¼ˆTCTï¼‰ï¼šãŠä¸€äººæ§˜ USD 20.00',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯é€šè¡ŒæŽ§åˆ¶å¡ï¼ˆTCTï¼‰ï¼šæ¯äºº 20 ç¾Žå…ƒ'
      },
      {
        en: 'Services not specified in the program & personal expenses',
        es: 'Servicios no especificados en el programa y gastos personales',
        fr: 'Services non spÃ©cifiÃ©s dans le programme et dÃ©penses personnelles',
        de: 'Nicht im Programm aufgefÃ¼hrte Leistungen & persÃ¶nliche Ausgaben',
        it: 'Servizi non specificati nel programma e spese personali',
        pt: 'ServiÃ§os nÃ£o especificados no programa e despesas pessoais',
        ja: 'ãƒ—ãƒ­ã‚°ãƒ©ãƒ ã«æ˜Žè¨˜ã•ã‚Œã¦ã„ãªã„ã‚µãƒ¼ãƒ“ã‚¹ãŠã‚ˆã³å€‹äººçš„ãªè²»ç”¨',
        zh: 'è¡Œç¨‹æœªæåŠçš„é¢å¤–æ¶ˆè´¹åŠç§äººæ”¯å‡º'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito | Private Airport Transfer',
          es: 'DÃ­a 1 â€“ Llegada A Quito | Traslado Privado De Aeropuerto',
          fr: 'Jour 1 â€“ ArrivÃ©e Ã  Quito | Transfert PrivÃ© AÃ©roport',
          de: 'Tag 1 â€“ Ankunft in Quito | Privater Flughafentransfer',
          it: 'Giorno 1 â€“ Arrivo a Quito | Trasferimento Privato Aeroporto',
          pt: 'Dia 1 â€“ Chegada a Quito | Traslado Privado do Aeroporto',
          ja: 'ç¬¬1æ—¥ â€“ ã‚­ãƒˆåˆ°ç€ | å°‚ç”¨ç©ºæ¸¯é€è¿Ž',
          zh: 'ç¬¬1å¤© â€“ æŠµè¾¾åŸºå¤š | å°Šäº«ç§äººæœºåœºæŽ¥æœº'
        },
        description: {
          en: 'Welcome at Quito International Airport and private transfer to your hotel. Rest and prepare for your upcoming journey into the GalÃ¡pagos archipelago.',
          es: 'RecepciÃ³n en el Aeropuerto Internacional de Quito y traslado privado a su hotel. Tiempo libre para descansar y aclimatarse antes de su expediciÃ³n.',
          fr: 'Accueil Ã  l\'aÃ©roport international de Quito et transfert privÃ© vers votre hÃ´tel. Temps libre pour vous reposer avant le grand dÃ©part pour les GalÃ¡pagos.',
          de: 'Empfang am internationalen Flughafen Quito und privater Transfer zu Ihrem Hotel. Erholen Sie sich vor Ihrem Abflug auf die Galapagos-Inseln.',
          it: 'Accoglienza all\'Aeroporto Internazionale di Quito e trasferimento privato in hotel. Tempo a disposizione per il relax.',
          pt: 'RecepÃ§Ã£o no Aeroporto Internacional de Quito e traslado privado para o hotel. Tempo livre para descansar.',
          ja: 'ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã«ã¦ãŠå‡ºè¿Žãˆå¾Œã€å°‚ç”¨è»Šã§ãƒ›ãƒ†ãƒ«ã¸ç§»å‹•ã€‚ç¿Œæ—¥ã‹ã‚‰ã®ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶æŽ¢æ¤œã«å‘ã‘ã¦ã”ã‚†ã£ãã‚ŠãŠä¼‘ã¿ãã ã•ã„ã€‚',
          zh: 'åŸºå¤šå›½é™…æœºåœºä¸“å‘˜æŽ¥æœºï¼Œä¹˜åä¸“è½¦æŠµè¾¾é…’åº—åŠžç†å…¥ä½ã€‚ä¼‘æ•´èº«å¿ƒï¼Œå‡†å¤‡è¿ŽæŽ¥å£®ä¸½çš„æµ·å²›æŽ¢é™©ã€‚'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3â˜… or 4â˜…)',
          es: 'Hotel en Quito (CategorÃ­a seleccionada 3â˜… o 4â˜…)',
          fr: 'HÃ´tel Ã  Quito (CatÃ©gorie 3â˜… ou 4â˜…)',
          de: 'Hotel in Quito (Kategorie 3â˜… oder 4â˜…)',
          it: 'Hotel a Quito (Categoria 3â˜… o 4â˜…)',
          pt: 'Hotel em Quito (Categoria 3â˜… ou 4â˜…)',
          ja: 'ã‚­ãƒˆå¸‚å†…ã®åŽ³é¸ãƒ›ãƒ†ãƒ«ï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
          zh: 'åŸºå¤šç²¾é€‰é…’åº—ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
        },
        meals: {
          en: 'Not included / at leisure',
          es: 'No incluidas / libres',
          fr: 'Non inclus',
          de: 'Nicht inbegriffen',
          it: 'Non inclusi',
          pt: 'NÃ£o incluÃ­das',
          ja: 'é£Ÿäº‹ãªã—',
          zh: 'æ•¬è¯·è‡ªç†'
        },
        transportation: {
          en: 'Private transportation from Quito Airport',
          es: 'Transporte privado desde Aeropuerto de Quito',
          fr: 'Transport privÃ© depuis l\'aÃ©roport de Quito',
          de: 'Privater Transport vom Flughafen Quito',
          it: 'Trasporto privato dall\'aeroporto di Quito',
          pt: 'Transporte privado do aeroporto de Quito',
          ja: 'ã‚­ãƒˆç©ºæ¸¯ã‹ã‚‰ã®å°‚ç”¨é€è¿Žè»Š',
          zh: 'åŸºå¤šæœºåœºä¸“å±žå•†åŠ¡ä¸“è½¦æŽ¥æœº'
        },
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Arrival In Baltra | Twin Craters | Primicias Ranch',
          es: 'DÃ­a 2 â€“ Llegada A Baltra | CrÃ¡teres Gemelos | Rancho Primicias',
          fr: 'Jour 2 â€“ ArrivÃ©e Ã  Baltra | CratÃ¨res Jumeaux | Rancho Primicias',
          de: 'Tag 2 â€“ Ankunft in Baltra | Zwillingskrater | Rancho Primicias',
          it: 'Giorno 2 â€“ Arrivo a Baltra | Crateri Gemelli | Rancho Primicias',
          pt: 'Dia 2 â€“ Chegada a Baltra | Crateras GÃªmeas | Rancho Primicias',
          ja: 'ç¬¬2æ—¥ â€“ ãƒãƒ«ãƒˆãƒ©å³¶åˆ°ç€ | åŒå­å‘ | ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹ç‰§å ´',
          zh: 'ç¬¬2å¤© â€“ æŠµè¾¾å·´å°”ç‰¹æ‹‰ | åŒå­å‘ | æ™®é‡Œç±³è¥¿äºšå·¨é¾Ÿä¿æŠ¤åŒº'
        },
        description: {
          en: 'Private transfer from your Quito hotel to the airport for your flight to Seymour Airport on Baltra Island. Upon arrival, welcome by our representative. Cross the Itabaca Channel to Santa Cruz Island and ascend into the highlands to visit the majestic Twin Craters (Los Gemelos) within the Scalesia forest. Continue to Primicias Ranch to witness giant tortoises roaming freely in their natural habitat and walk through volcanic lava tunnels. Transfer to your Puerto Ayora hotel and enjoy the evening at leisure.',
          es: 'Traslado desde el hotel en Quito al aeropuerto y vuelo a Baltra. RecepciÃ³n en el Aeropuerto Seymour y cruce del Canal de Itabaca hacia Santa Cruz. En las tierras altas visitamos los CrÃ¡teres Gemelos y el Rancho Primicias para observar tortugas gigantes en libertad y cruzar tÃºneles de lava. Check-in en Puerto Ayora y tiempo libre.',
          fr: 'Transfert Ã  l\'aÃ©roport de Quito et vol vers Baltra. Accueil Ã  l\'aÃ©roport Seymour et traversÃ©e vers Santa Cruz. Dans les hauts plateaux, visite des CratÃ¨res Jumeaux et du Rancho Primicias pour observer les tortues gÃ©antes et explorer les tunnels de lave. Installation Ã  l\'hÃ´tel Ã  Puerto Ayora.',
          de: 'Transfer zum Flughafen Quito und Flug nach Baltra. BegrÃ¼ÃŸung am Flughafen Seymour und Ãœberfahrt nach Santa Cruz. Im Hochland Besuch der Zwillingskrater und der Primicias Ranch mit freilebenden RiesenschildkrÃ¶ten und Lavatunneln. Hotelbezug in Puerto Ayora.',
          it: 'Trasferimento all\'aeroporto di Quito e volo per Baltra. Arrivo e attraversamento per Santa Cruz. Visita ai Crateri Gemelli e al Rancho Primicias per ammirare le tartarughe giganti e i tunnel di lava. Check-in a Puerto Ayora.',
          pt: 'Traslado ao aeroporto de Quito e voo para Baltra. Chegada e travessia para Santa Cruz. Visita Ã s Crateras GÃªmeas e ao Rancho Primicias para ver tartarugas gigantes e tÃºneis de lava. Check-in em Puerto Ayora.',
          ja: 'ã‚­ãƒˆç©ºæ¸¯ã¸é€è¿Žã—ãƒãƒ«ãƒˆãƒ©ã¸ãƒ•ãƒ©ã‚¤ãƒˆã€‚ã‚¤ã‚¿ãƒã‚«é‹æ²³ã‚’æ¸¡ã‚Šã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹é«˜åœ°ã¸ã€‚åŒå­å‘ã¨ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹ç‰§å ´ã§å·¨å¤§ã‚¾ã‚¦ã‚¬ãƒ¡ã¨æº¶å²©ãƒˆãƒ³ãƒãƒ«ã‚’è¦‹å­¦ã€‚ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©ã§å®¿æ³Šã€‚',
          zh: 'é€æœºé£žå¾€å·´å°”ç‰¹æ‹‰ï¼Œæ¸¡è¿‡æµ·å³¡ç™»ä¸Šåœ£å…‹é²æ–¯å²›ã€‚æ¸¸è§ˆç«å±±åŒå­å‘å¹¶æŽ¢è®¿æ™®é‡Œç±³è¥¿äºšä¿æŠ¤åŒºè§‚å¯Ÿè‡ªç”±æ¼«æ­¥çš„è±¡é¾Ÿï¼Œå¾’æ­¥ç†”å²©éš§é“ã€‚å…¥ä½é˜¿çº¦æ‹‰æ¸¯é…’åº—ã€‚'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'According to selected hotel plan',
          es: 'SegÃºn plan hotelero seleccionado',
          fr: 'Selon plan hÃ´telier',
          de: 'GemÃ¤ÃŸ Hotelplan',
          it: 'Secondo piano alberghiero',
          pt: 'De acordo com o plano do hotel',
          ja: 'ãƒ›ãƒ†ãƒ«ãƒ—ãƒ©ãƒ³ã«æº–ãšã‚‹',
          zh: 'æŒ‰æ‰€é€‰é…’åº—æ–¹æ¡ˆåŒ…å«'
        },
        transportation: {
          en: 'Private airport transfer in Quito, flight, ferry & private island transport',
          es: 'Transfer privado en Quito, vuelo, ferry y transporte privado en isla',
          fr: 'Transfert privÃ© Ã  Quito, vol, ferry et transport terrestre privÃ©',
          de: 'Privater Transfer in Quito, Flug, FÃ¤hre & privater Inseltransport',
          it: 'Trasferimento privato a Quito, volo, traghetto e trasporto privato',
          pt: 'Transfer privado em Quito, voo, balsa e transporte terrestre na ilha',
          ja: 'ã‚­ãƒˆç©ºæ¸¯é€è¿Žã€ãƒ•ãƒ©ã‚¤ãƒˆã€ãƒ•ã‚§ãƒªãƒ¼ï¼†å³¶å†…å°‚ç”¨è»Š',
          zh: 'åŸºå¤šä¸“è½¦é€æœºã€å›½å†…èˆªç­ã€æ¸¡è½®åŠå²›ä¸Šä¸“è½¦'
        },
      },
      {
        day: 3,
        title: {
          en: 'Day 3 â€“ Santa Cruz To Isabela | Flamingo Lagoon | Tortoise Breeding Center | Tintoreras',
          es: 'DÃ­a 3 â€“ Santa Cruz A Isabela | Laguna De Flamingos | Centro De Crianza | Tintoreras',
          fr: 'Jour 3 â€“ De Santa Cruz Ã  Isabela | Flamants Roses | Centre d\'Ã‰levage | Tintoreras',
          de: 'Tag 3 â€“ Von Santa Cruz nach Isabela | Flamingo-Lagune | Zuchtzentrum | Tintoreras',
          it: 'Giorno 3 â€“ Da Santa Cruz a Isabela | Fenicotteri | Centro Riproduzione | Tintoreras',
          pt: 'Dia 3 â€“ Santa Cruz a Isabela | Lagoa de Flamingos | Centro de ReproduÃ§Ã£o | Tintoreras',
          ja: 'ç¬¬3æ—¥ â€“ ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹ã‹ã‚‰ã‚¤ã‚µãƒ™ãƒ©å³¶ã¸ | ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ | ç¹æ®–ã‚»ãƒ³ã‚¿ãƒ¼ | ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹',
          zh: 'ç¬¬3å¤© â€“ åœ£å…‹é²æ–¯è‡³ä¼ŠèŽŽè´æ‹‰å²› | ç«çƒˆé¸Ÿæ³»æ¹– | å·¨é¾Ÿç¹è‚²ä¸­å¿ƒ | è’‚æ©æ‰˜é›·æ‹‰æ–¯'
        },
        description: {
          en: 'After breakfast, speedboat transfer from Santa Cruz to Isabela Island (approx 2 to 2.5 hours). Upon arrival in Puerto Villamil, visit the Flamingo Lagoon wetland and the Giant Tortoise Breeding Center. In the afternoon, boat trip to Tintoreras Islet for incredible snorkeling with sea lions, marine iguanas, rays, sea turtles, and penguins. Overnight in Puerto Villamil.',
          es: 'Lancha rÃ¡pida a Isla Isabela (2 a 2.5 h). En Puerto Villamil visitamos la Laguna de Flamingos y el Centro de Crianza de Tortugas Gigantes. Por la tarde, navegaciÃ³n al Islote Tintoreras para snorkel con lobos marinos, tortugas marinas, rayas, pingÃ¼inos e iguanas marinas. Pernocte en Isabela.',
          fr: 'Bateau rapide vers l\'Ã®le Isabela. Ã€ Puerto Villamil, visite de la lagune des flamants roses et du centre d\'Ã©levage des tortues. L\'aprÃ¨s-midi, navigation vers l\'Ã®lot Tintoreras pour un snorkeling exceptionnel avec otaries, tortues et raies. Nuit Ã  Isabela.',
          de: 'Schnellbootfahrt nach Isabela. Besuch der Flamingo-Lagune und des SchildkrÃ¶tenzuchtzentrums. Nachmittags Bootstour zu den Tintoreras-Inseln zum Schnorcheln mit SeelÃ¶wen, MeeresschildkrÃ¶ten und Pinguinen. Ãœbernachtung auf Isabela.',
          it: 'Motoscafo verso Isabela. Visita alla Laguna dei Fenicotteri e al Centro Riproduzione Tartarughe. Nel pomeriggio escursione a Tintoreras per snorkeling con leoni marini, tartarughe e mante. Pernottamento a Isabela.',
          pt: 'Lancha rÃ¡pida para a Ilha Isabela. Visita Ã  Lagoa de Flamingos e ao Centro de ReproduÃ§Ã£o de Tartarugas. Ã€ tarde, excursÃ£o a Tintoreras para snorkel com leÃµes-marinhos, tartarugas e arraias. Pernoite em Isabela.',
          ja: 'ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆã§ã‚¤ã‚µãƒ™ãƒ©å³¶ã¸ã€‚ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ã¨ã‚¾ã‚¦ã‚¬ãƒ¡ç¹æ®–ã‚»ãƒ³ã‚¿ãƒ¼ã‚’è¨ªå•ã€‚åˆå¾Œã¯ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹ã¸ãƒœãƒ¼ãƒˆã§æ¸¡ã‚Šã‚¢ã‚·ã‚«ã‚„ã‚¦ãƒŸã‚¬ãƒ¡ã¨ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã€‚ã‚¤ã‚µãƒ™ãƒ©å³¶æ³Šã€‚',
          zh: 'ä¹˜å¿«è‰‡èµ´ä¼ŠèŽŽè´æ‹‰å²›ã€‚æŽ¢è®¿ç«çƒˆé¸Ÿæ³»æ¹–ä¸Žå·¨é¾Ÿç¹æ®–ä¸­å¿ƒã€‚åˆåŽä¹˜èˆ¹è‡³è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤æµ®æ½œï¼Œä¸Žæµ·ç‹®ã€æµ·é¾Ÿã€è é²¼åŠä¼é¹…åŒæ¸¸ã€‚å…¥ä½ä¼ŠèŽŽè´æ‹‰å²›å®¢æ ˆã€‚'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: {
          en: 'Isabela Island â€“ Puerto Villamil (Hostal Tintorera)',
          es: 'Isla Isabela â€“ Puerto Villamil (Hostal Tintorera)',
          fr: 'ÃŽle Isabela â€“ Puerto Villamil (Hostal Tintorera)',
          de: 'Insel Isabela â€“ Puerto Villamil (Hostal Tintorera)',
          it: 'Isola Isabela â€“ Puerto Villamil (Hostal Tintorera)',
          pt: 'Ilha Isabela â€“ Puerto Villamil (Hostal Tintorera)',
          ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆãƒ»ãƒ“ã‚¸ãƒ£ãƒŸãƒ«ï¼ˆã‚ªã‚¹ã‚¿ãƒ«ãƒ»ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ï¼‰',
          zh: 'ä¼ŠèŽŽè´æ‹‰å²› â€“ ç»´åˆ©äºšç±³å°”æ¸¯ï¼ˆå»·æ‰˜é›·æ‹‰å®¢æ ˆï¼‰'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Inter-island speedboat and local land transport',
          es: 'Lancha rÃ¡pida interislas y transporte terrestre local',
          fr: 'Bateau rapide inter-Ã®les et transport local',
          de: 'Schnellboot & lokaler Landtransport',
          it: 'Motoscafo interisola e trasporto locale',
          pt: 'Lancha rÃ¡pida interilhas e transporte local',
          ja: 'å³¶é–“ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆï¼†ç¾åœ°ç§»å‹•',
          zh: 'åŸŽé™…å¿«è‰‡ä¸Žå²›ä¸Šè§‚å…‰äº¤é€š'
        },
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ Isabela To Santa Cruz | La LoberÃ­a | Las Grietas',
          es: 'DÃ­a 4 â€“ Isabela A Santa Cruz | La LoberÃ­a | Las Grietas',
          fr: 'Jour 4 â€“ D\'Isabela Ã  Santa Cruz | La LoberÃ­a | Las Grietas',
          de: 'Tag 4 â€“ Von Isabela nach Santa Cruz | La LoberÃ­a | Las Grietas',
          it: 'Giorno 4 â€“ Da Isabela a Santa Cruz | La LoberÃ­a | Las Grietas',
          pt: 'Dia 4 â€“ Isabela a Santa Cruz | La LoberÃ­a | Las Grietas',
          ja: 'ç¬¬4æ—¥ â€“ ã‚¤ã‚µãƒ™ãƒ©å³¶ã‹ã‚‰ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹ã¸ | ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ | ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹',
          zh: 'ç¬¬4å¤© â€“ ä¼ŠèŽŽè´æ‹‰å²›è¿”å›žåœ£å…‹é²æ–¯ | æ‹‰æ´›è´é‡Œäºš | æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯'
        },
        description: {
          en: 'Morning boat transfer back to Santa Cruz Island. Visit La LoberÃ­a coastal sanctuary to observe playful sea lions. Continue to Las Grietas volcanic canyon for swimming and snorkeling in transparent turquoise water. Afternoon at leisure in Puerto Ayora.',
          es: 'Lancha rÃ¡pida de retorno a Santa Cruz. Visita a La LoberÃ­a para observar lobos marinos y caminata a Las Grietas para nadar y hacer snorkel en el caÃ±Ã³n volcÃ¡nico. Tarde libre en Puerto Ayora.',
          fr: 'Retour en bateau Ã  Santa Cruz. Visite de La LoberÃ­a et baignade/snorkeling dans le spectaculaire canyon volcanique de Las Grietas. AprÃ¨s-midi libre Ã  Puerto Ayora.',
          de: 'RÃ¼ckfahrt per Boot nach Santa Cruz. Besuch von La LoberÃ­a und Schwimmen/Schnorcheln in der Vulkanschlucht Las Grietas. Freier Nachmittag in Puerto Ayora.',
          it: 'Rientro in barca a Santa Cruz. Visita a La LoberÃ­a e nuoto/snorkeling nello spettacolare canyon di Las Grietas. Pomeriggio libero a Puerto Ayora.',
          pt: 'Retorno em lancha a Santa Cruz. Visita a La LoberÃ­a e banho/snorkel no cÃ¢nion vulcÃ¢nico de Las Grietas. Tarde livre em Puerto Ayora.',
          ja: 'ãƒœãƒ¼ãƒˆã§ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ã¸å¸°é‚„ã€‚ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ã®ã‚¢ã‚·ã‚«ã‚’è¦³å¯Ÿã—ã€ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ã§ã‚¹ã‚¤ãƒŸãƒ³ã‚°ï¼†ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã€‚ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©ã§è‡ªç”±è¡Œå‹•ã€‚',
          zh: 'å¿«è‰‡è¿”å›žåœ£å…‹é²æ–¯å²›ã€‚æ¸¸è§ˆæ‹‰æ´›è´é‡Œäºšæµ·ç‹®æ»©ï¼Œæ·±å…¥æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ç«å±±å³¡è°·çº¯å‡€æ°´åŸŸæ¸¸æ³³æµ®æ½œã€‚ä¸‹åˆè‡ªç”±æ´»åŠ¨ã€‚'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Inter-island speedboat and local walking trails',
          es: 'Lancha rÃ¡pida interislas y senderos locales',
          fr: 'Bateau rapide et sentiers cÃ´tiers',
          de: 'Schnellboot & Wanderpfade',
          it: 'Motoscafo e percorsi a piedi',
          pt: 'Lancha rÃ¡pida e trilhas locais',
          ja: 'å³¶é–“ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆï¼†å¾’æ­©ãƒˆãƒ¬ã‚¤ãƒ«',
          zh: 'åŸŽé™…å¿«è‰‡ä¸Žæ­¥è¡Œæ­¥é“'
        },
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Full-Day Navigable Yacht Excursion To Santa Fe Or PinzÃ³n Island',
          es: 'DÃ­a 5 â€“ ExcursiÃ³n Full-Day En Yate A Isla Santa Fe O Isla PinzÃ³n',
          fr: 'Jour 5 â€“ Excursion JournÃ©e en Yacht Ã  l\'ÃŽle Santa Fe ou PinzÃ³n',
          de: 'Tag 5 â€“ GanztÃ¤giger Yachtausflug zur Insel Santa Fe oder PinzÃ³n',
          it: 'Giorno 5 â€“ Escursione Giornata Intera in Yacht a Santa Fe o PinzÃ³n',
          pt: 'Dia 5 â€“ ExcursÃ£o Dia Inteiro em Iate para Santa Fe ou PinzÃ³n',
          ja: 'ç¬¬5æ—¥ â€“ ã‚µãƒ³ã‚¿ãƒ•ã‚§å³¶ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚º',
          zh: 'ç¬¬5å¤© â€“ åœ£è²å²›æˆ–å¹³æ¾å²›å…¨å¤©å‡ºæµ·æ¸¸è‰‡èˆªæµ·ä¸Žæµ®æ½œ'
        },
        description: {
          en: 'Full-day boat excursion to Santa Fe Island or PinzÃ³n Island (depending on availability and conditions). Enjoy turquoise bays, endemic land iguanas at Santa Fe, or deep-water snorkeling at PinzÃ³n with sea turtles, sharks, rays, and sea lions. Fresh lunch served on board.',
          es: 'NavegaciÃ³n de dÃ­a completo en yate hacia Isla Santa Fe o Isla PinzÃ³n. En Santa Fe disfrutarÃ¡ de bahÃ­as turquesas, iguanas terrestres y rica vida marina. En PinzÃ³n, aguas profundas con tortugas marinas, tiburones y mantarrayas. Almuerzo a bordo incluido.',
          fr: 'Excursion en yacht d\'une journÃ©e Ã  l\'Ã®le Santa Fe ou PinzÃ³n. Baies turquoise, iguanes terrestres Ã  Santa Fe, ou snorkeling profond Ã  PinzÃ³n avec tortues, requins et raies. DÃ©jeuner Ã  bord inclus.',
          de: 'GanztÃ¤gige Yachtfahrt zur Insel Santa Fe oder PinzÃ³n. TÃ¼rkisblaue Buchten, endemische Landleguane auf Santa Fe oder Hochsee-Schnorcheln bei PinzÃ³n mit Haien, SchildkrÃ¶ten und Rochen. Mittagessen an Bord.',
          it: 'Navigazione di una giornata in yacht a Santa Fe o PinzÃ³n. Acque turchesi, iguane terrestri o snorkeling profondo con squali, tartarughe e mante. Pranzo a bordo incluso.',
          pt: 'NavegaÃ§Ã£o de dia inteiro em iate para Santa Fe ou PinzÃ³n. Baias turquesas, iguanas terrestres ou snorkel profundo com tubarÃµes, tartarugas e arraias. AlmoÃ§o a bordo incluÃ­do.',
          ja: 'ã‚µãƒ³ã‚¿ãƒ•ã‚§å³¶ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚ºã€‚ã‚¨ãƒ¡ãƒ©ãƒ«ãƒ‰ã®æµ·ã§ã®ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã§ã‚¦ãƒŸã‚¬ãƒ¡ã€ã‚µãƒ¡ã€ã‚¨ã‚¤ã€ã‚¢ã‚·ã‚«ã¨é­é‡ã€‚èˆ¹ä¸Šã§ã®ãƒ©ãƒ³ãƒä»˜ãã€‚',
          zh: 'å…¨å¤©ä¹˜æ¸¸è‰‡å‡ºæµ·æŽ¢è®¿åœ£è²å²›æˆ–å¹³æ¾å²›ã€‚åœ¨ç»¿æ¾çŸ³èˆ¬çš„æ¸…æ¾ˆæµ·æ¹¾æŽ¢å¯»ç‰¹æœ‰é™†é¬£èœ¥ï¼Œæˆ–åœ¨æ·±æ°´åŒºæµ®æ½œé‚‚é€…æµ·é¾Ÿã€ç™½é¡¶ç¤é²¨ã€è é²¼ä¸Žæµ·ç‹®ã€‚å«æ¸¸è‰‡ç”²æ¿åˆé¤ã€‚'
        },
        image: '/images/tours/16-9/santa-fe-island-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-dÃ©jeuner et dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'CafÃ© da manhÃ£ e almoÃ§o',
          ja: 'æœé£Ÿãƒ»æ˜¼é£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤ä¸Žåˆé¤'
        },
        transportation: {
          en: 'Navigable tourist yacht and island ground transfers',
          es: 'Yate turÃ­stico navegable y transporte terrestre',
          fr: 'Yacht touristique navigable et transferts terrestres',
          de: 'Touristisches Yachtschiff & Landtransport',
          it: 'Yacht turistico e trasporto a terra',
          pt: 'Iate turÃ­stico navegÃ¡vel e transporte terrestre',
          ja: 'è¦³å…‰ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚ºèˆ¹ï¼†é™¸ä¸Šé€è¿Ž',
          zh: 'å‡ºæµ·è§‚å…‰æ¸¸è‰‡ä¸Žé™†åœ°æŽ¥é€'
        },
        activity: {
          en: 'Open-water yacht navigation, deep-water snorkeling & hiking',
          es: 'NavegaciÃ³n en yate, snorkel en aguas abiertas y caminata',
          fr: 'Navigation en yacht, snorkeling en eau profonde et randonnÃ©e',
          de: 'Yachtfahrt, Tiefwasserschnorcheln & Wanderung',
          it: 'Navigazione in yacht, snorkeling e trekking',
          pt: 'NavegaÃ§Ã£o em iate, snorkel em mar aberto e caminhada',
          ja: 'ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚ºã€å¤–æ´‹ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ï¼†ãƒã‚¤ã‚­ãƒ³ã‚°',
          zh: 'æ¸¸è‰‡èˆªè¡Œã€å¤–æµ·æ·±åº¦æµ®æ½œä¸Žç”Ÿæ€å¾’æ­¥'
        },
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Transfer To Baltra Airport | Flight To Quito | Private Hotel Transfer',
          es: 'DÃ­a 6 â€“ Traslado Al Aeropuerto De Baltra | Vuelo A Quito | Transfer Privado Al Hotel',
          fr: 'Jour 6 â€“ Transfert Ã  l\'AÃ©roport de Baltra | Vol vers Quito | Transfert PrivÃ© HÃ´tel',
          de: 'Tag 6 â€“ Transfer zum Flughafen Baltra | Flug nach Quito | Privater Hoteltransfer',
          it: 'Giorno 6 â€“ Trasferimento all\'Aeroporto di Baltra | Volo per Quito | Transfer Privato in Hotel',
          pt: 'Dia 6 â€“ Traslado ao Aeroporto de Baltra | Voo para Quito | Transfer Privado ao Hotel',
          ja: 'ç¬¬6æ—¥ â€“ ãƒãƒ«ãƒˆãƒ©ç©ºæ¸¯ã¸é€è¿Ž | ã‚­ãƒˆè¡Œããƒ•ãƒ©ã‚¤ãƒˆ | ãƒ›ãƒ†ãƒ«å°‚ç”¨é€è¿Ž',
          zh: 'ç¬¬6å¤© â€“ å‰å¾€å·´å°”ç‰¹æ‹‰æœºåœº | é£žå¾€åŸºå¤š | ä¸“è½¦æŽ¥æœºå…¥ä½é…’åº—'
        },
        description: {
          en: 'After breakfast, check out and transfer to Baltra Airport for your flight back to mainland Ecuador. Private transfer from Quito Airport to your hotel. Evening at leisure.',
          es: 'Desayuno, check-out y traslado al Aeropuerto Seymour de Baltra para tomar el vuelo a Quito. RecepciÃ³n y traslado privado a su hotel en Quito. Tarde y noche libre.',
          fr: 'Petit-dÃ©jeuner et transfert Ã  l\'aÃ©roport de Baltra pour le vol retour vers Quito. Accueil et transfert privÃ© Ã  l\'hÃ´tel.',
          de: 'Nach dem FrÃ¼hstÃ¼ck Fahrt zum Flughafen Baltra und Flug nach Quito. Privater Transfer zum Hotel.',
          it: 'Colazione e trasferimento all\'aeroporto di Baltra per il volo verso Quito. Trasferimento privato in hotel.',
          pt: 'CafÃ© da manhÃ£ e traslado ao Aeroporto de Baltra para voo rumo a Quito. Traslado privado para o hotel.',
          ja: 'æœé£Ÿå¾Œãƒãƒ«ãƒˆãƒ©ç©ºæ¸¯ã¸ç§»å‹•ã—ã‚­ãƒˆè¡Œããƒ•ãƒ©ã‚¤ãƒˆã«æ­ä¹—ã€‚ã‚­ãƒˆåˆ°ç€å¾Œå°‚ç”¨è»Šã§ãƒ›ãƒ†ãƒ«ã¸ã€‚',
          zh: 'æ—©é¤åŽé€æœºè‡³å·´å°”ç‰¹æ‹‰æœºåœºé£žå¾€åŸºå¤šï¼ŒæŠµè¾¾åŽä¸“è½¦æŽ¥æœºé€å¾€é…’åº—ä¼‘æ¯ã€‚'
        },
        image: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3â˜… or 4â˜…)',
          es: 'Hotel en Quito (CategorÃ­a seleccionada 3â˜… o 4â˜…)',
          fr: 'HÃ´tel Ã  Quito (CatÃ©gorie 3â˜… ou 4â˜…)',
          de: 'Hotel in Quito (Kategorie 3â˜… oder 4â˜…)',
          it: 'Hotel a Quito (Categoria 3â˜… o 4â˜…)',
          pt: 'Hotel em Quito (Categoria 3â˜… ou 4â˜…)',
          ja: 'ã‚­ãƒˆå¸‚å†…ã®åŽ³é¸ãƒ›ãƒ†ãƒ«ï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
          zh: 'åŸºå¤šç²¾é€‰é…’åº—ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Island ground transfer, Baltra shuttle, domestic flight & private Quito transfer',
          es: 'Transporte en isla, bus Lobito, vuelo domÃ©stico y traslado privado en Quito',
          fr: 'Transport terrestre sur l\'Ã®le, navette aÃ©roport, vol intÃ©rieur et transfert privÃ© Ã  Quito',
          de: 'Insel-Transfer, Shuttlebus, Inlandsflug & privater Transfer in Quito',
          it: 'Trasferimento sull\'isola, navetta, volo nazionale e transfer privato a Quito',
          pt: 'Transporte na ilha, Ã´nibus shuttle, voo domÃ©stico e traslado privado em Quito',
          ja: 'å³¶å†…é™¸ä¸Šé€è¿Žã€ç©ºæ¸¯ã‚·ãƒ£ãƒˆãƒ«ã€å›½å†…ç·šãƒ•ãƒ©ã‚¤ãƒˆï¼†ã‚­ãƒˆå¸‚å†…å°‚ç”¨é€è¿Ž',
          zh: 'å²›ä¸Šé™†è·¯æŽ¥é©³ã€æœºåœºä¸“çº¿å·´å£«ã€å›½å†…èˆªç­åŠåŸºå¤šå¸‚å†…ä¸“è½¦'
        },
      },
      {
        day: 7,
        title: {
          en: 'Day 7 â€“ Private Quito Airport Transfer | Onward Connections',
          es: 'DÃ­a 7 â€“ Traslado Privado Al Aeropuerto De Quito | Vuelo Internacional',
          fr: 'Jour 7 â€“ Transfert PrivÃ© vers l\'AÃ©roport de Quito | Connexions Internationales',
          de: 'Tag 7 â€“ Privater Transfer zum Flughafen Quito | Weiterflug',
          it: 'Giorno 7 â€“ Trasferimento Privato all\'Aeroporto di Quito | Volo di Rientro',
          pt: 'Dia 7 â€“ Traslado Privado ao Aeroporto de Quito | ConexÃµes Internacionais',
          ja: 'ç¬¬7æ—¥ â€“ ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨é€è¿Ž | å¸°å›½ã®é€”ã¸',
          zh: 'ç¬¬7å¤© â€“ åŸºå¤šæœºåœºç§äººä¸“è½¦é€æœº | è¸ä¸Šå½’é€”'
        },
        description: {
          en: 'Private transfer from your hotel to Quito International Airport for your international departure flight. End of our services.',
          es: 'Traslado privado exclusivo desde su hotel hacia el Aeropuerto Internacional de Quito para su vuelo internacional. Fin de servicios.',
          fr: 'Transfert privÃ© de votre hÃ´tel vers l\'aÃ©roport de Quito pour votre vol de retour international. Fin de nos services.',
          de: 'Privater Transfer vom Hotel zum Flughafen Quito fÃ¼r Ihren internationalen RÃ¼ckflug. Ende unserer Leistungen.',
          it: 'Trasferimento privato dall\'hotel all\'Aeroporto di Quito per il volo internazionale. Fine dei nostri servizi.',
          pt: 'Traslado privado do hotel ao Aeroporto de Quito para embarque internacional. Fim dos serviÃ§os.',
          ja: 'ãƒ•ãƒ©ã‚¤ãƒˆæ™‚åˆ»ã«åˆã‚ã›ã¦ãƒ›ãƒ†ãƒ«ã‹ã‚‰ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã¸å°‚ç”¨é€è¿Žã€‚ã‚µãƒ¼ãƒ“ã‚¹çµ‚äº†ã¨ãªã‚Šã¾ã™ã€‚',
          zh: 'æ ¹æ®å›½é™…èˆªç­èµ·é£žæ—¶é—´ä¸“è½¦é€æŠµåŸºå¤šå›½é™…æœºåœºï¼Œç»“æŸéš¾å¿˜çš„åŠ æ‹‰å¸•æˆˆæ–¯æŽ¢ç´¢ä¹‹æ—…ã€‚'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Private transportation to Quito International Airport',
          es: 'Transporte privado al Aeropuerto Internacional de Quito',
          fr: 'Transport privÃ© vers l\'aÃ©roport de Quito',
          de: 'Privater Transport zum Flughafen Quito',
          it: 'Trasporto privato per l\'aeroporto di Quito',
          pt: 'Transporte privado para o Aeroporto de Quito',
          ja: 'ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã¸ã®å°‚ç”¨é€è¿Žè»Š',
          zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦é€æœº'
        },
      }
    ]
  },

  // Tour: galapagos-8days
  {
    id: 'galapagos-8days',
    code: '1.3',
    title: {
      en: 'Galapagos Grand Odyssey: 8-Day 3-Island Expedition',
      es: 'Gran Odisea GalÃ¡pagos: 8 DÃ­as y 3 Islas',
      fr: 'Grande OdyssÃ©e aux GalÃ¡pagos: 8 Jours et 3 ÃŽles',
      de: 'Galapagos Grand Odyssee: 8 Tage & 3 Inseln',
      it: 'Grande Odissea alle Galapagos: 8 Giorni e 3 Isole',
      pt: 'Grande Odisseia em GalÃ¡pagos: 8 Dias e 3 Ilhas',
      ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ å£®å¤§ãªã‚ªãƒ‡ãƒƒã‚»ã‚¤ï¼š8æ—¥é–“ 3å³¶å·¡ç¤¼ï¼ˆã‚­ãƒˆé€è¿Žä»˜ãï¼‰',
      zh: 'åŠ æ‹‰å¸•æˆˆæ–¯ç››å¤§å²è¯—ï¼š8æ—¥ä¸‰å²›å¤§è·¨è¶Šï¼ˆå«åŸºå¤šæŽ¥é€æœºï¼‰'
    },
    destination: 'Galapagos',
    duration: {
      en: '8 DAYS / 7 NIGHTS',
      es: '8 DÃAS / 7 NOCHES',
      fr: '8 JOURS / 7 NUITS',
      de: '8 TAGE / 7 NÃ„CHTE',
      it: '8 GIORNI / 7 NOTTI',
      pt: '8 DIAS / 7 NOITES',
      ja: '8æ—¥é–“ / 7æ³Š',
      zh: '8å¤© / 7æ™š'
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
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
      '/images/tours/16-9/galapagos-piquero-patas-azules-16-9.1.webp',
      '/images/tours/16-9/santa-fe-island-16-9.webp',
      '/images/tours/16-9/galapagos-lobo-marino-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 42,
    isPopular: true,
    category: {
      en: 'Triple Island Discovery & Yacht Cruise',
      es: 'Descubrimiento Triple Isla y NavegaciÃ³n en Yate',
      fr: 'DÃ©couverte de trois Ã®les et navigation en yacht',
      de: 'Drei-Inseln-Entdeckung & Yacht-Kreuzfahrt',
      it: 'Scoperta di Tre Isole e Crociera in Yacht',
      pt: 'Descoberta de TrÃªs Ilhas e Cruzeiro em Iate',
      ja: '3å³¶å·¡ç¤¼ï¼†å°‚ç”¨ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚º',
      zh: 'ä¸‰å²›æ·±åº¦æŽ¢ç´¢ä¸Žå°Šäº«æ¸¸è‰‡å·¡èˆª'
    },
    description: {
      en: 'The ultimate 8-day expedition across 3 major islands (Santa Cruz, Isabela, and San CristÃ³bal) combined with private Quito airport transfers. Discover giant tortoises, Tintoreras Islet, Las Grietas, full-day yacht snorkeling at Santa Fe or PinzÃ³n, and San CristÃ³balâ€™s Interpretation Center, Tijeretas Hill and La LoberÃ­a.',
      es: 'La expediciÃ³n definitiva de 8 dÃ­as a travÃ©s de 3 islas principales (Santa Cruz, Isabela y San CristÃ³bal) con traslados privados en Quito. Tortugas gigantes, Islote Tintoreras, Las Grietas, navegaciÃ³n en yate a Santa Fe o PinzÃ³n, Centro de InterpretaciÃ³n, Cerro Tijeretas y La LoberÃ­a.',
      fr: 'L\'expÃ©dition ultime de 8 jours Ã  travers 3 Ã®les majeures (Santa Cruz, Isabela et San CristÃ³bal) avec transferts privÃ©s Ã  Quito. Tortues gÃ©antes, Ã®lot Tintoreras, Las Grietas, yacht vers Santa Fe ou PinzÃ³n, Centre d\'interprÃ©tation, Cerro Tijeretas et La LoberÃ­a.',
      de: 'Die ultimative 8-tÃ¤gige Expedition Ã¼ber 3 Hauptinseln (Santa Cruz, Isabela und San CristÃ³bal) mit privaten Quito-Transfers. RiesenschildkrÃ¶ten, Tintoreras, Las Grietas, Yachtkreuzfahrt nach Santa Fe oder PinzÃ³n, Interpretationszentrum und Tijeretas-HÃ¼gel.',
      it: 'L\'espedizione definitiva di 8 giorni attraverso 3 isole principali (Santa Cruz, Isabela e San CristÃ³bal) con trasferimenti privati a Quito. Tartarughe giganti, isolotto Tintoreras, Las Grietas, yacht a Santa Fe o PinzÃ³n, Centro di Interpretazione e Cerro Tijeretas.',
      pt: 'A expediÃ§Ã£o definitiva de 8 dias atravÃ©s de 3 ilhas principais (Santa Cruz, Isabela e San CristÃ³bal) com traslados privados em Quito. Tartarugas gigantes, Ilhote Tintoreras, Las Grietas, iate para Santa Fe ou PinzÃ³n, Centro de InterpretaÃ§Ã£o e Cerro Tijeretas.',
      ja: 'ã‚­ãƒˆã®å°‚ç”¨é€è¿Žã«åŠ ãˆã€ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹ã€ã‚¤ã‚µãƒ™ãƒ©ã€ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«ã®ä¸»è¦3å³¶ã‚’ç¶²ç¾…ã™ã‚‹ç©¶æ¥µã®8æ—¥é–“ã€‚é‡Žç”Ÿã‚¾ã‚¦ã‚¬ãƒ¡ã€ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹ã®æº¶å²©æ°´è·¯ã€ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ã€ã‚µãƒ³ã‚¿ãƒ•ã‚§ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã€ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«å³¶ã®è§£èª¬ã‚»ãƒ³ã‚¿ãƒ¼ã€ãƒ†ã‚£ãƒ˜ãƒ¬ã‚¿ã‚¹ã®ä¸˜ã€ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ã‚’æŽ¢è¨ªã€‚',
      zh: 'è·¨è¶Šä¸‰åº§ä¸»è¦å²›å±¿ï¼ˆåœ£å…‹é²æ–¯å²›ã€ä¼ŠèŽŽè´æ‹‰å²›å’Œåœ£å…‹é‡Œæ–¯æ‰˜å·´å°”å²›ï¼‰çš„8æ—¥ç»ˆæžæŽ¢é™©ï¼Œé…å¤‡åŸºå¤šç§äººæœºåœºæŽ¥é€ï¼šæŽ¢ç§˜é«˜åœ°é‡Žç”Ÿå·¨é¾Ÿã€è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤æµ®æ½œã€æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯å³¡è°·ã€åœ£è²/å¹³æ¾å…¨å¤©å‡ºæµ·æ¸¸è‰‡å·¡èˆªï¼Œä»¥åŠåœ£å…‹é‡Œæ–¯æ‰˜å·´å°”å²›è§£è¯»ä¸­å¿ƒã€å†›èˆ°é¸Ÿä¸˜ä¸Žæ‹‰æ´›è´é‡Œäºšæµ·ç‹®æ²™æ»©ã€‚'
    },
    highlights: [
      {
        en: 'Private Quito Airport Transfers (Arrival & Departure)',
        es: 'Traslados Privados Aeropuerto Quito (Llegada y Salida)',
        fr: 'Transferts PrivÃ©s AÃ©roport de Quito (ArrivÃ©e et DÃ©part)',
        de: 'Private Quito-Flughafentransfers (Ankunft & Abreise)',
        it: 'Trasferimenti Privati Aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados Privados Aeroporto de Quito (Chegada e Partida)',
        ja: 'ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨å¾€å¾©é€è¿Žï¼ˆåˆ°ç€ï¼†å‡ºç™ºï¼‰',
        zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦æŽ¥é€ï¼ˆæŠµè¾¾ä¸Žç¦»å¢ƒï¼‰'
      },
      {
        en: 'Twin Craters & Primicias Giant Tortoise Reserve',
        es: 'CrÃ¡teres Gemelos y Rancho Primicias en Santa Cruz',
        fr: 'CratÃ¨res Jumeaux et RÃ©serve de Tortues Primicias',
        de: 'Zwillingskrater & Primicias-RiesenschildkrÃ¶ten-Farm',
        it: 'Crateri Gemelli e Riserva Tartarughe Primicias',
        pt: 'Crateras GÃªmeas e Rancho de Tartarugas Primicias',
        ja: 'åŒå­å‘ï¼†ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹å·¨äº€ä¿è­·åŒº',
        zh: 'åŒå­å‘ä¸Žåœ£å…‹é²æ–¯æ™®é‡Œç±³è¥¿äºšå·¨é¾Ÿç”Ÿæ€ä¿æŠ¤åŒº'
      },
      {
        en: 'Isabela Island Overnight, Flamingo Lagoon & Tintoreras',
        es: 'Noche en Isla Isabela, Laguna de Flamingos y Tintoreras',
        fr: 'Nuit sur l\'Ã®le Isabela, Flamants Roses & Tintoreras',
        de: 'Ãœbernachtung auf Isabela, Flamingo-Lagune & Tintoreras',
        it: 'Pernottamento a Isabela, Fenicotteri e Tintoreras',
        pt: 'Pernoite na Ilha Isabela, Lagoa de Flamingos e Tintoreras',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶å®¿æ³Šã€ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ï¼†ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›è¿‡å¤œã€ç«çƒˆé¸Ÿæ³»æ¹–ä¸Žè’‚æ©æ‰˜é›·æ‹‰æ–¯æµ®æ½œ'
      },
      {
        en: 'Full-Day Navigable Yacht Cruise to Santa Fe or PinzÃ³n Island',
        es: 'NavegaciÃ³n Full-Day en Yate a Isla Santa Fe o PinzÃ³n',
        fr: 'CroisiÃ¨re d\'une JournÃ©e en Yacht Ã  Santa Fe ou PinzÃ³n',
        de: 'GanztÃ¤gige Yacht-Kreuzfahrt nach Santa Fe oder PinzÃ³n',
        it: 'Crociera in Yacht di un\'intera Giornata a Santa Fe o PinzÃ³n',
        pt: 'Cruzeiro de Dia Inteiro em Iate para Santa Fe ou PinzÃ³n',
        ja: 'ã‚µãƒ³ã‚¿ãƒ•ã‚§å³¶ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚º',
        zh: 'åœ£è²å²›æˆ–å¹³æ¾å²›å…¨å¤©å‡ºæµ·æ¸¸è‰‡èˆªè¡Œä¸Žæµ®æ½œ'
      },
      {
        en: 'San CristÃ³bal Island: Interpretation Center, Tijeretas Hill & La LoberÃ­a',
        es: 'Isla San CristÃ³bal: Centro de InterpretaciÃ³n, Cerro Tijeretas y La LoberÃ­a',
        fr: 'ÃŽle San CristÃ³bal: Centre d\'InterprÃ©tation, Tijeretas et La LoberÃ­a',
        de: 'Insel San CristÃ³bal: Interpretationszentrum, Tijeretas & La LoberÃ­a',
        it: 'Isola San CristÃ³bal: Centro Interpretazione, Tijeretas e La LoberÃ­a',
        pt: 'Ilha San CristÃ³bal: Centro de InterpretaÃ§Ã£o, Cerro Tijeretas e La LoberÃ­a',
        ja: 'ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«å³¶ï¼šè§£èª¬ã‚»ãƒ³ã‚¿ãƒ¼ã€ãƒ†ã‚£ãƒ˜ãƒ¬ã‚¿ã‚¹ã®ä¸˜ï¼†ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢',
        zh: 'åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”å²›ï¼šè‡ªç„¶äººç±»è§£è¯»ä¸­å¿ƒã€å†›èˆ°é¸Ÿä¸˜ä¸Žæ‹‰æ´›è´é‡Œäºšæµ·æ»©'
      }
    ],
    inclusions: [
      {
        en: 'Accommodation at the hotel of your choice in Santa Cruz (3â˜… or 4â˜…)',
        es: 'Alojamiento en el hotel seleccionado en Santa Cruz (3â˜… o 4â˜…)',
        fr: 'HÃ©bergement Ã  l\'hÃ´tel de votre choix Ã  Santa Cruz (3â˜… ou 4â˜…)',
        de: 'Unterkunft im gewÃ¤hlten Hotel auf Santa Cruz (3â˜… oder 4â˜…)',
        it: 'Sistemazione nell\'hotel prescelto a Santa Cruz (3â˜… o 4â˜…)',
        pt: 'Hospedagem no hotel de sua escolha em Santa Cruz (3â˜… ou 4â˜…)',
        ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ã®åŽ³é¸ãƒ›ãƒ†ãƒ«å®¿æ³Šï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
        zh: 'åœ£å…‹é²æ–¯å²›è‡ªé€‰ç²¾å“é…’åº—ä½å®¿ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
      },
      {
        en: 'Accommodation at Hostal Tintorera in Isabela Island',
        es: 'Alojamiento en Hostal Tintorera en Isla Isabela',
        fr: 'HÃ©bergement Ã  l\'Hostal Tintorera sur l\'Ã®le Isabela',
        de: 'Unterkunft im Hostal Tintorera auf der Insel Isabela',
        it: 'Sistemazione presso Hostal Tintorera sull\'isola Isabela',
        pt: 'Hospedagem no Hostal Tintorera na Ilha Isabela',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶ã®ã‚ªã‚¹ã‚¿ãƒ«ãƒ»ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©å®¿æ³Š',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›å»·æ‰˜é›·æ‹‰å®¢æ ˆä½å®¿'
      },
      {
        en: 'Accommodation at Hotel Algarrobos in San CristÃ³bal Island',
        es: 'Alojamiento en Hotel Algarrobos en Isla San CristÃ³bal',
        fr: 'HÃ©bergement Ã  l\'HÃ´tel Algarrobos sur l\'Ã®le San CristÃ³bal',
        de: 'Unterkunft im Hotel Algarrobos auf der Insel San CristÃ³bal',
        it: 'Sistemazione presso Hotel Algarrobos sull\'isola San CristÃ³bal',
        pt: 'Hospedagem no Hotel Algarrobos na Ilha San CristÃ³bal',
        ja: 'ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«å³¶ã®ãƒ›ãƒ†ãƒ«ãƒ»ã‚¢ãƒ«ã‚¬ãƒ­ãƒœã‚¹å®¿æ³Š',
        zh: 'åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”å²›é˜¿å°”åŠ ç½—åšæ–¯é…’åº—ä½å®¿'
      },
      {
        en: 'Private airport transfers in Quito (Arrival & Departure)',
        es: 'Traslados privados en aeropuerto de Quito (Llegada y Salida)',
        fr: 'Transferts privÃ©s aÃ©roport de Quito (ArrivÃ©e et DÃ©part)',
        de: 'Private Flughafentransfers in Quito (Ankunft & Abreise)',
        it: 'Trasferimenti privati aeroporto di Quito (Arrivo e Partenza)',
        pt: 'Traslados privados no aeroporto de Quito (Chegada e Partida)',
        ja: 'ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨ãƒ—ãƒ©ã‚¤ãƒ™ãƒ¼ãƒˆé€è¿Žï¼ˆåˆ°ç€ï¼†å‡ºç™ºï¼‰',
        zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦æŽ¥é€ï¼ˆæŠµè¾¾ä¸Žå‡ºå‘ï¼‰'
      },
      {
        en: 'Buffet breakfast at 4â˜… hotels / Continental breakfast at 3â˜… hotels',
        es: 'Desayuno buffet en hoteles 4â˜… / Desayuno continental en hoteles 3â˜…',
        fr: 'Petit-dÃ©jeuner buffet en hÃ´tel 4â˜… / continental en hÃ´tel 3â˜…',
        de: 'FrÃ¼hstÃ¼cksbuffet in 4â˜…-Hotels / Kontinentales FrÃ¼hstÃ¼ck in 3â˜…-Hotels',
        it: 'Colazione a buffet in hotel 4â˜… / Continentale in hotel 3â˜…',
        pt: 'CafÃ© da manhÃ£ buffet em hotÃ©is 4â˜… / Continental em hotÃ©is 3â˜…',
        ja: '4â˜…ãƒ›ãƒ†ãƒ«ã®ãƒ“ãƒ¥ãƒƒãƒ•ã‚§æœé£Ÿ / 3â˜…ãƒ›ãƒ†ãƒ«ã®ã‚³ãƒ³ãƒãƒãƒ³ã‚¿ãƒ«æœé£Ÿ',
        zh: '4æ˜Ÿçº§é…’åº—è‡ªåŠ©æ—©é¤ / 3æ˜Ÿçº§é…’åº—æ¬§é™†å¼æ—©é¤'
      },
      {
        en: 'Set-menu lunches according to the itinerary',
        es: 'Almuerzos menÃº incluidos segÃºn el itinerario',
        fr: 'DÃ©jeuners avec menu prÃ©Ã©tabli selon l\'itinÃ©raire',
        de: 'Mittagessen mit festem MenÃ¼ gemÃ¤ÃŸ Reiseroute',
        it: 'Pranzi con menu fisso secondo l\'itinerario',
        pt: 'AlmoÃ§os com cardÃ¡pio fixo de acordo com o itinerÃ¡rio',
        ja: 'æ—…ç¨‹ã«å¿œã˜ãŸã‚»ãƒƒãƒˆãƒ¡ãƒ‹ãƒ¥ãƒ¼ã®æ˜¼é£Ÿ',
        zh: 'è¡Œç¨‹ä¸­è§„åˆ’çš„æŒ‡å®šå¥—é¤åˆé¤'
      },
      {
        en: 'Domestic Flight Ticket (Quito â€“ Baltra / San CristÃ³bal â€“ Quito)',
        es: 'Boleto aÃ©reo domÃ©stico (Quito â€“ Baltra / San CristÃ³bal â€“ Quito)',
        fr: 'Billet d\'avion intÃ©rieur (Quito â€“ Baltra / San CristÃ³bal â€“ Quito)',
        de: 'Inlandsflugticket (Quito â€“ Baltra / San CristÃ³bal â€“ Quito)',
        it: 'Biglietto aereo nazionale (Quito â€“ Baltra / San CristÃ³bal â€“ Quito)',
        pt: 'Passagem aÃ©rea domÃ©stica (Quito â€“ Baltra / San CristÃ³bal â€“ Quito)',
        ja: 'å›½å†…ç·šã‚ªãƒ¼ãƒ—ãƒ³ã‚¸ãƒ§ãƒ¼èˆªç©ºåˆ¸ï¼ˆã‚­ãƒˆ â€“ ãƒãƒ«ãƒˆãƒ© / ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ« â€“ ã‚­ãƒˆï¼‰',
        zh: 'åŽ„ç“œå¤šå°”å¢ƒå†…ç¼ºå£å¾€è¿”æœºç¥¨ï¼ˆåŸºå¤š â€“ å·´å°”ç‰¹æ‹‰ / åœ£å…‹é‡Œæ–¯æ‰˜å·´å°” â€“ åŸºå¤šï¼‰'
      },
      {
        en: 'All guided visits to the islands according to the itinerary',
        es: 'Todas las visitas guiadas a las islas segÃºn el itinerario',
        fr: 'Toutes les visites guidÃ©es des Ã®les selon l\'itinÃ©raire',
        de: 'Alle gefÃ¼hrten Inselbesuche gemÃ¤ÃŸ Reiseroute',
        it: 'Tutte le visite guidate alle isole secondo l\'itinerario',
        pt: 'Todas as visitas guiadas Ã s ilhas de acordo com o itinerÃ¡rio',
        ja: 'æ—…ç¨‹ã«è¨˜è¼‰ã•ã‚ŒãŸã™ã¹ã¦ã®ã‚¬ã‚¤ãƒ‰ä»˜ãå³¶å†…è¦³å…‰',
        zh: 'è¡Œç¨‹è§„åˆ’çš„æ‰€æœ‰å—ä¿æŠ¤æµ·å²›å¯¼è§ˆæ¸¸è§ˆ'
      },
      {
        en: 'Airport reception and departure assistance at GalÃ¡pagos airports',
        es: 'RecepciÃ³n y asistencia en aeropuertos de GalÃ¡pagos',
        fr: 'Accueil et assistance aux aÃ©roports des GalÃ¡pagos',
        de: 'Flughafenempfang und Abreisebetreuung auf GalÃ¡pagos',
        it: 'Accoglienza e assistenza negli aeroporti delle Galapagos',
        pt: 'RecepÃ§Ã£o e assistÃªncia nos aeroportos de GalÃ¡pagos',
        ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ç©ºæ¸¯ã§ã®åˆ°ç€å‡ºè¿ŽãˆãŠã‚ˆã³å‡ºç™ºã‚µãƒãƒ¼ãƒˆ',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯å„æœºåœºæŠµè¾¾ä¸“å‘˜æŽ¥æœºä¸Žå‡ºå‘ååŠ©'
      },
      {
        en: 'Comprehensive land and maritime transportation',
        es: 'Transporte terrestre y marÃ­timo integral',
        fr: 'Transport terrestre et maritime complet',
        de: 'Umfassender Land- und Seetransport',
        it: 'Trasporto terrestre e marittimo completo',
        pt: 'Transporte terrestre e marÃ­timo completo',
        ja: 'å…¨è¡Œç¨‹ã«ãŠã‘ã‚‹é™¸ä¸ŠãŠã‚ˆã³æµ·ä¸Šç§»å‹•äº¤é€š',
        zh: 'å…¨ç¨‹ä¸“è½¦é™†è·¯ä¸Žå¿«è‰‡æµ·ä¸Šäº¤é€š'
      },
      {
        en: 'Level III Certified Naturalist Guides (Spanish / English)',
        es: 'GuÃ­as naturalistas certificados Nivel III (EspaÃ±ol / InglÃ©s)',
        fr: 'Guides naturalistes certifiÃ©s de niveau III (Espagnol / Anglais)',
        de: 'Zertifizierte NaturfÃ¼hrer der Stufe III (Spanisch / Englisch)',
        it: 'Guide naturalistiche certificate di Livello III (Spagnolo / Inglese)',
        pt: 'Guias naturalistas certificados NÃ­vel III (Espanhol / InglÃªs)',
        ja: 'ãƒ¬ãƒ™ãƒ«IIIèªå®šãƒŠãƒãƒ¥ãƒ©ãƒªã‚¹ãƒˆã‚¬ã‚¤ãƒ‰ï¼ˆè‹±èªžãƒ»ã‚¹ãƒšã‚¤ãƒ³èªžï¼‰',
        zh: 'ä¸‰çº§å›½å®¶è®¤è¯èµ„æ·±è‡ªç„¶å‘å¯¼ï¼ˆè‹±è¯­/è¥¿ç­ç‰™è¯­ï¼‰'
      },
      {
        en: 'Snorkeling equipment for boat excursions (mask and snorkel)',
        es: 'Equipo de snorkel para excursiones en barco (mÃ¡scara y tubo)',
        fr: 'Ã‰quipement de snorkeling pour les excursions en bateau (masque et tuba)',
        de: 'SchnorchelausrÃ¼stung fÃ¼r Bootstouren (Maske und Schnorchel)',
        it: 'Attrezzatura da snorkeling per escursioni in barca (maschera e boccaglio)',
        pt: 'Equipamento de snorkel para excursÃµes de barco (mÃ¡scara e snorkel)',
        ja: 'ãƒœãƒ¼ãƒˆãƒ„ã‚¢ãƒ¼ç”¨ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°è£…å‚™ï¼ˆãƒžã‚¹ã‚¯ï¼†ã‚¹ãƒŽãƒ¼ã‚±ãƒ«ï¼‰',
        zh: 'æ¸¸è‰‡å‡ºæµ·æŽ¢é™©é«˜å“è´¨æµ®æ½œè£…å¤‡ï¼ˆé¢é•œå’Œå‘¼å¸ç®¡ï¼‰'
      },
      {
        en: 'Safety lockers available at hotel reception',
        es: 'Casilleros de seguridad disponibles en la recepciÃ³n del hotel',
        fr: 'Coffres-forts disponibles Ã  la rÃ©ception de l\'hÃ´tel',
        de: 'SicherheitsschlieÃŸfÃ¤cher an der Hotelrezeption verfÃ¼gbar',
        it: 'Cassette di sicurezza alla reception dell\'hotel',
        pt: 'Cofres de seguranÃ§a na recepÃ§Ã£o do hotel',
        ja: 'ãƒ›ãƒ†ãƒ«ãƒ•ãƒ­ãƒ³ãƒˆã®ã‚»ãƒ¼ãƒ•ãƒ†ã‚£ãƒœãƒƒã‚¯ã‚¹åˆ©ç”¨å¯èƒ½',
        zh: 'é…’åº—å‰å°å…è´¹æä¾›å®‰å…¨ä¿é™©ç®±æœåŠ¡'
      },
      {
        en: 'Lobito Airport Shuttle Bus: Airport â€“ Itabaca Channel â€“ Airport',
        es: 'AutobÃºs Lobito: Aeropuerto â€“ Canal de Itabaca â€“ Aeropuerto',
        fr: 'Navette aÃ©roport Lobito: AÃ©roport â€“ Canal d\'Itabaca â€“ AÃ©roport',
        de: 'Lobito Flughafen-Shuttlebus: Flughafen â€“ Itabaca-Kanal â€“ Flughafen',
        it: 'Bus navetta Lobito: Aeroporto â€“ Canale di Itabaca â€“ Aeroporto',
        pt: 'Ã”nibus shuttle Lobito: Aeroporto â€“ Canal de Itabaca â€“ Aeroporto',
        ja: 'ãƒ­ãƒ“ãƒˆç©ºæ¸¯ã‚·ãƒ£ãƒˆãƒ«ãƒã‚¹ï¼šç©ºæ¸¯ â€“ ã‚¤ã‚¿ãƒã‚«é‹æ²³ â€“ ç©ºæ¸¯',
        zh: 'Lobitoæœºåœºç©¿æ¢­æŽ¥é©³å·´å£«ï¼šæœºåœº â€“ ä¼Šå¡”å·´å¡è¿æ²³ â€“ æœºåœº'
      },
      {
        en: 'Isabela Dock Fee: USD 5.00 for Ecuadorian nationals; USD 10.00 for foreign visitors',
        es: 'Tasa de muelle de Isabela: USD 5.00 nacionales / USD 10.00 extranjeros',
        fr: 'Taxe de quai d\'Isabela: 5,00 USD nationaux / 10,00 USD Ã©trangers',
        de: 'Isabela-DockgebÃ¼hr: USD 5,00 fÃ¼r Ecuadorianer / USD 10,00 fÃ¼r AuslÃ¤nder',
        it: 'Tassa portuale di Isabela: 5,00 USD ecuadoriani / 10,00 USD stranieri',
        pt: 'Taxa de cais de Isabela: USD 5,00 nacionais / USD 10,00 estrangeiros',
        ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶å…¥æ¸¯ç¨Žï¼šã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«å›½ç± USD 5.00 / å¤–å›½äºº USD 10.00',
        zh: 'ä¼ŠèŽŽè´æ‹‰å²›ç å¤´ç¨Žï¼šåŽ„ç“œå¤šå°”å…¬æ°‘ 5 ç¾Žå…ƒ / å¤–å›½æ¸¸å®¢ 10 ç¾Žå…ƒ'
      }
    ],
    exclusions: [
      {
        en: 'GalÃ¡pagos National Park entrance fee: USD 6.00 for Ecuadorian nationals; USD 200.00 for foreign visitors',
        es: 'Entrada al Parque Nacional GalÃ¡pagos: USD 6.00 nacionales / USD 200.00 extranjeros',
        fr: 'EntrÃ©e au Parc National des GalÃ¡pagos: 6,00 USD nationaux / 200,00 USD Ã©trangers',
        de: 'EintrittsgebÃ¼hr fÃ¼r den Galapagos-Nationalpark: USD 6,00 fÃ¼r Ecuadorianer / USD 200,00 fÃ¼r AuslÃ¤nder',
        it: 'Ingresso al Parco Nazionale delle Galapagos: 6,00 USD ecuadoriani / 200,00 USD stranieri',
        pt: 'Entrada no Parque Nacional GalÃ¡pagos: USD 6,00 nacionais / USD 200,00 estrangeiros',
        ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹å›½ç«‹å…¬åœ’å…¥å ´æ–™ï¼šã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«å›½ç± USD 6.00 / å¤–å›½äºº USD 200.00',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯å›½å®¶å…¬å›­å…¥å›­è´¹ï¼šåŽ„ç“œå¤šå°”å…¬æ°‘ 6 ç¾Žå…ƒ / å¤–å›½æ¸¸å®¢ 200 ç¾Žå…ƒ'
      },
      {
        en: 'Dinners (to give you freedom to enjoy local gastronomy)',
        es: 'Cenas (libertad para explorar la gastronomÃ­a local)',
        fr: 'DÃ®ners (pour vous laisser libre de dÃ©couvrir la gastronomie locale)',
        de: 'Abendessen (Freiheit zur Entdeckung der lokalen Gastronomie)',
        it: 'Cene (libertÃ  di esplorare la gastronomia locale)',
        pt: 'Jantares (liberdade para desfrutar da gastronomia local)',
        ja: 'å¤•é£Ÿï¼ˆåœ°å…ƒã®ã‚°ãƒ«ãƒ¡ã‚’è‡ªç”±ã«ãŠæ¥½ã—ã¿ã„ãŸã ã‘ã¾ã™ï¼‰',
        zh: 'æ™šé¤ï¼ˆç•™ç™½æ—¶é—´è‡ªç”±å“å‘³å½“åœ°ç‰¹è‰²æµ·é²œä¸Žç¾Žé¦”ï¼‰'
      },
      {
        en: 'Transit Control Card (TCT): USD 20.00 per person',
        es: 'Tarjeta de Control de TrÃ¡nsito (TCT): USD 20.00 por persona',
        fr: 'Carte de ContrÃ´le de Transit (TCT): 20,00 USD par personne',
        de: 'Transit Control Card (TCT): USD 20,00 pro Person',
        it: 'Carta di Controllo del Transito (TCT): 20,00 USD a persona',
        pt: 'CartÃ£o de Controle de TrÃ¢nsito (TCT): USD 20,00 por pessoa',
        ja: 'ãƒˆãƒ©ãƒ³ã‚¸ãƒƒãƒˆã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«ã‚«ãƒ¼ãƒ‰ï¼ˆTCTï¼‰ï¼šãŠä¸€äººæ§˜ USD 20.00',
        zh: 'åŠ æ‹‰å¸•æˆˆæ–¯é€šè¡ŒæŽ§åˆ¶å¡ï¼ˆTCTï¼‰ï¼šæ¯äºº 20 ç¾Žå…ƒ'
      },
      {
        en: 'Services not specified in the program & personal expenses',
        es: 'Servicios no especificados en el programa y gastos personales',
        fr: 'Services non spÃ©cifiÃ©s dans le programme et dÃ©penses personnelles',
        de: 'Nicht im Programm aufgefÃ¼hrte Leistungen & persÃ¶nliche Ausgaben',
        it: 'Servizi non specificati nel programma e spese personali',
        pt: 'ServiÃ§os nÃ£o especificados no programa e despesas pessoais',
        ja: 'ãƒ—ãƒ­ã‚°ãƒ©ãƒ ã«æ˜Žè¨˜ã•ã‚Œã¦ã„ãªã„ã‚µãƒ¼ãƒ“ã‚¹ãŠã‚ˆã³å€‹äººçš„ãªè²»ç”¨',
        zh: 'è¡Œç¨‹æœªæåŠçš„é¢å¤–æ¶ˆè´¹åŠç§äººæ”¯å‡º'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito | Private Airport Transfer',
          es: 'DÃ­a 1 â€“ Llegada A Quito | Traslado Privado De Aeropuerto',
          fr: 'Jour 1 â€“ ArrivÃ©e Ã  Quito | Transfert PrivÃ© AÃ©roport',
          de: 'Tag 1 â€“ Ankunft in Quito | Privater Flughafentransfer',
          it: 'Giorno 1 â€“ Arrivo a Quito | Trasferimento Privato Aeroporto',
          pt: 'Dia 1 â€“ Chegada a Quito | Traslado Privado do Aeroporto',
          ja: 'ç¬¬1æ—¥ â€“ ã‚­ãƒˆåˆ°ç€ | å°‚ç”¨ç©ºæ¸¯é€è¿Ž',
          zh: 'ç¬¬1å¤© â€“ æŠµè¾¾åŸºå¤š | å°Šäº«ç§äººæœºåœºæŽ¥æœº'
        },
        description: {
          en: 'Welcome at Quito International Airport and private transfer to your hotel. Rest and prepare for your Grand Odyssey through 3 islands of the GalÃ¡pagos.',
          es: 'RecepciÃ³n en el Aeropuerto Internacional de Quito y traslado privado a su hotel. Tiempo de descanso para prepararse para la Gran Odisea por 3 islas de GalÃ¡pagos.',
          fr: 'Accueil Ã  l\'aÃ©roport international de Quito et transfert privÃ© vers votre hÃ´tel. Reposez-vous avant votre Grande OdyssÃ©e Ã  travers les 3 Ã®les.',
          de: 'Empfang am Flughafen Quito und privater Hoteltransfer. Entspannung vor der GroÃŸen Odyssee Ã¼ber 3 Inseln.',
          it: 'Accoglienza all\'Aeroporto di Quito e trasferimento privato in hotel. Riposo prima della Grande Odissea.',
          pt: 'RecepÃ§Ã£o no Aeroporto de Quito e traslado privado ao hotel. Descanso antes da Grande Odisseia.',
          ja: 'ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã«ã¦ãŠå‡ºè¿Žãˆã—å°‚ç”¨è»Šã§ãƒ›ãƒ†ãƒ«ã¸ã€‚3å³¶ã‚’å·¡ã‚‹å£®å¤§ãªã‚ªãƒ‡ãƒƒã‚»ã‚¤ã«å‘ã‘ã¦ã”æº–å‚™ãã ã•ã„ã€‚',
          zh: 'åŸºå¤šå›½é™…æœºåœºä¸“å‘˜æŽ¥æœºï¼Œä¸“è½¦é€æŠµé…’åº—ã€‚ä¼‘æ•´è“„åŠ›ï¼Œè¿ŽæŽ¥æ¨ªè·¨åŠ æ‹‰å¸•æˆˆæ–¯ä¸‰å¤§åå²›çš„ç››å¤§å²è¯—ä¹‹æ—…ã€‚'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3â˜… or 4â˜…)',
          es: 'Hotel en Quito (CategorÃ­a seleccionada 3â˜… o 4â˜…)',
          fr: 'HÃ´tel Ã  Quito (CatÃ©gorie 3â˜… ou 4â˜…)',
          de: 'Hotel in Quito (Kategorie 3â˜… oder 4â˜…)',
          it: 'Hotel a Quito (Categoria 3â˜… o 4â˜…)',
          pt: 'Hotel em Quito (Categoria 3â˜… ou 4â˜…)',
          ja: 'ã‚­ãƒˆå¸‚å†…ã®åŽ³é¸ãƒ›ãƒ†ãƒ«ï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
          zh: 'åŸºå¤šç²¾é€‰é…’åº—ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
        },
        meals: {
          en: 'Not included / at leisure',
          es: 'No incluidas / libres',
          fr: 'Non inclus',
          de: 'Nicht inbegriffen',
          it: 'Non inclusi',
          pt: 'NÃ£o incluÃ­das',
          ja: 'é£Ÿäº‹ãªã—',
          zh: 'æ•¬è¯·è‡ªç†'
        },
        transportation: {
          en: 'Private transportation from Quito Airport',
          es: 'Transporte privado desde Aeropuerto de Quito',
          fr: 'Transport privÃ© depuis l\'aÃ©roport de Quito',
          de: 'Privater Transport vom Flughafen Quito',
          it: 'Trasporto privato dall\'aeroporto di Quito',
          pt: 'Transporte privado do aeroporto de Quito',
          ja: 'ã‚­ãƒˆç©ºæ¸¯ã‹ã‚‰ã®å°‚ç”¨é€è¿Žè»Š',
          zh: 'åŸºå¤šæœºåœºä¸“å±žå•†åŠ¡ä¸“è½¦æŽ¥æœº'
        },
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Arrival In Baltra | Twin Craters | Primicias Ranch',
          es: 'DÃ­a 2 â€“ Llegada A Baltra | CrÃ¡teres Gemelos | Rancho Primicias',
          fr: 'Jour 2 â€“ ArrivÃ©e Ã  Baltra | CratÃ¨res Jumeaux | Rancho Primicias',
          de: 'Tag 2 â€“ Ankunft in Baltra | Zwillingskrater | Rancho Primicias',
          it: 'Giorno 2 â€“ Arrivo a Baltra | Crateri Gemelli | Rancho Primicias',
          pt: 'Dia 2 â€“ Chegada a Baltra | Crateras GÃªmeas | Rancho Primicias',
          ja: 'ç¬¬2æ—¥ â€“ ãƒãƒ«ãƒˆãƒ©å³¶åˆ°ç€ | åŒå­å‘ | ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹ç‰§å ´',
          zh: 'ç¬¬2å¤© â€“ æŠµè¾¾å·´å°”ç‰¹æ‹‰ | åŒå­å‘ | æ™®é‡Œç±³è¥¿äºšå·¨é¾Ÿä¿æŠ¤åŒº'
        },
        description: {
          en: 'Transfer to Quito airport for your flight to Baltra Island. Upon arrival at Seymour Airport, welcome by our representative. Travel across Santa Cruz highlands to visit the Twin Craters (Los Gemelos) within Scalesia forests. Continue to Primicias Ranch to observe iconic giant tortoises roaming freely and walk through natural volcanic lava tunnels. Transfer to Puerto Ayora for hotel check-in and evening at leisure.',
          es: 'Traslado al aeropuerto de Quito y vuelo a Baltra. RecepciÃ³n y cruce del Canal de Itabaca hacia Santa Cruz. En las tierras altas visitamos los CrÃ¡teres Gemelos en el bosque de Scalesia y el Rancho Primicias para observar tortugas gigantes en libertad y cruzar tÃºneles de lava. Check-in en Puerto Ayora y tiempo libre.',
          fr: 'Transfert Ã  l\'aÃ©roport de Quito et vol vers Baltra. TraversÃ©e vers Santa Cruz, visite des CratÃ¨res Jumeaux et du Rancho Primicias avec tortues gÃ©antes et tunnels de lave. Nuit Ã  Santa Cruz.',
          de: 'Flug nach Baltra. Fahrt Ã¼ber Santa Cruz ins Hochland zu den Zwillingskratern und der Primicias Ranch mit freilebenden RiesenschildkrÃ¶ten und Lavatunneln. Ãœbernachtung auf Santa Cruz.',
          it: 'Volo per Baltra. Attraversamento per Santa Cruz e visita ai Crateri Gemelli e al Rancho Primicias con tartarughe giganti e tunnel di lava. Pernottamento a Santa Cruz.',
          pt: 'Voo para Baltra. Travessia para Santa Cruz e visita Ã s Crateras GÃªmeas e ao Rancho Primicias com tartarugas gigantes e tÃºneis de lava. Pernoite em Santa Cruz.',
          ja: 'ã‚­ãƒˆã‹ã‚‰ãƒãƒ«ãƒˆãƒ©ã¸ãƒ•ãƒ©ã‚¤ãƒˆã€‚ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹é«˜åœ°ã®åŒå­å‘ã¨ãƒ—ãƒªãƒŸã‚·ã‚¢ã‚¹ç‰§å ´ã®é‡Žç”Ÿã‚¾ã‚¦ã‚¬ãƒ¡ã€æº¶å²©ãƒˆãƒ³ãƒãƒ«ã‚’è¦‹å­¦ã€‚ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶æ³Šã€‚',
          zh: 'é£žæŠµå·´å°”ç‰¹æ‹‰å²›è¥¿æ‘©æœºåœºã€‚ç™»ä¸Šåœ£å…‹é²æ–¯é«˜åœ°æŽ¢ç´¢ç«å±±åŒå­å‘ï¼Œæ·±å…¥æ™®é‡Œç±³è¥¿äºšç”Ÿæ€ä¿æŠ¤åŒºå¯»è®¿é‡Žç”Ÿè±¡é¾Ÿå¹¶ç©¿è¶Šç†”å²©éš§é“ã€‚å…¥ä½é˜¿çº¦æ‹‰æ¸¯é…’åº—ã€‚'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'According to selected hotel plan',
          es: 'SegÃºn plan hotelero seleccionado',
          fr: 'Selon formule hÃ´teliÃ¨re',
          de: 'GemÃ¤ÃŸ Hotelplan',
          it: 'Secondo piano alberghiero',
          pt: 'De acordo com o plano do hotel',
          ja: 'ãƒ›ãƒ†ãƒ«ãƒ—ãƒ©ãƒ³ã«æº–ãšã‚‹',
          zh: 'æŒ‰æ‰€é€‰é…’åº—æ–¹æ¡ˆåŒ…å«'
        },
        transportation: {
          en: 'Private airport transfer in Quito, flight, ferry & private island transport',
          es: 'Transfer privado en Quito, vuelo, ferry y transporte privado en isla',
          fr: 'Transfert privÃ© Ã  Quito, vol, ferry et transport terrestre privÃ©',
          de: 'Privater Transfer in Quito, Flug, FÃ¤hre & privater Inseltransport',
          it: 'Trasferimento privato a Quito, volo, traghetto e trasporto privato',
          pt: 'Transfer privado em Quito, voo, balsa e transporte terrestre na ilha',
          ja: 'ã‚­ãƒˆç©ºæ¸¯é€è¿Žã€ãƒ•ãƒ©ã‚¤ãƒˆã€ãƒ•ã‚§ãƒªãƒ¼ï¼†å³¶å†…å°‚ç”¨è»Š',
          zh: 'åŸºå¤šä¸“è½¦é€æœºã€å›½å†…èˆªç­ã€æ¸¡è½®åŠå²›ä¸Šä¸“è½¦'
        },
      },
      {
        day: 3,
        title: {
          en: 'Day 3 â€“ Santa Cruz To Isabela | Flamingo Lagoon | Breeding Center | Tintoreras Islet',
          es: 'DÃ­a 3 â€“ Santa Cruz A Isla Isabela | Laguna De Flamingos | Centro De Crianza | Islote Tintoreras',
          fr: 'Jour 3 â€“ De Santa Cruz Ã  Isabela | Flamants Roses | Centre d\'Ã‰levage | ÃŽlot Tintoreras',
          de: 'Tag 3 â€“ Von Santa Cruz nach Isabela | Flamingo-Lagune | Zuchtzentrum | Tintoreras-Inselchen',
          it: 'Giorno 3 â€“ Da Santa Cruz a Isabela | Fenicotteri | Centro Riproduzione | Isolotto Tintoreras',
          pt: 'Dia 3 â€“ Santa Cruz a Isabela | Lagoa de Flamingos | Centro de ReproduÃ§Ã£o | Ilhote Tintoreras',
          ja: 'ç¬¬3æ—¥ â€“ ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹ã‹ã‚‰ã‚¤ã‚µãƒ™ãƒ©å³¶ã¸ | ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ | ç¹æ®–ã‚»ãƒ³ã‚¿ãƒ¼ | ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹å°å³¶',
          zh: 'ç¬¬3å¤© â€“ åœ£å…‹é²æ–¯è‡³ä¼ŠèŽŽè´æ‹‰å²› | ç«çƒˆé¸Ÿæ³»æ¹– | å·¨é¾Ÿç¹è‚²ä¸­å¿ƒ | è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤'
        },
        description: {
          en: 'Speedboat ride to Isabela Island, the largest in the archipelago. Explore Puerto Villamil, visit the Flamingo Lagoon, and tour the Giant Tortoise Breeding Center. In the afternoon, boat excursion to Tintoreras Islet to snorkel with sea turtles, sea lions, tropical fish, rays, reef sharks, and marine iguanas. Overnight in Isabela Island at Hostal Tintorera.',
          es: 'Lancha rÃ¡pida hacia Isla Isabela. En Puerto Villamil visitamos la laguna de flamingos y el Centro de Crianza de Tortugas Gigantes. Por la tarde, navegaciÃ³n al Islote Tintoreras para snorkel con leones marinos, tortugas, peces tropicales, iguanas marinas y pingÃ¼inos de GalÃ¡pagos. Noche en Isabela (Hostal Tintorera).',
          fr: 'TraversÃ©e en bateau rapide vers l\'Ã®le Isabela. Visite de la lagune des flamants roses et du centre d\'Ã©levage. Excursion en bateau aux Tintoreras pour nager avec les otaries, tortues et requins de rÃ©cif. Nuit Ã  l\'Hostal Tintorera.',
          de: 'Schnellboot zur Insel Isabela. Flamingo-Lagune und Zuchtzentrum. Nachmittags Bootsexkursion zu den Tintoreras zum Schnorcheln mit SeelÃ¶wen, MeeresschildkrÃ¶ten und Pinguinen. Ãœbernachtung im Hostal Tintorera.',
          it: 'Motoscafo verso Isabela. Laguna dei Fenicotteri e Centro Riproduzione Tartarughe. Nel pomeriggio escursione a Tintoreras con snorkeling tra leoni marini e squali. Pernottamento all\'Hostal Tintorera.',
          pt: 'Lancha rÃ¡pida para Isabela. Visita Ã  Lagoa de Flamingos e Centro de ReproduÃ§Ã£o. Ã€ tarde, snorkel em Tintoreras com leÃµes-marinhos, tartarugas e arraias. Pernoite no Hostal Tintorera.',
          ja: 'ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆã§ã‚¤ã‚µãƒ™ãƒ©å³¶ã¸ã€‚ãƒ•ãƒ©ãƒŸãƒ³ã‚´ãƒ©ã‚°ãƒ¼ãƒ³ã¨ã‚¾ã‚¦ã‚¬ãƒ¡ç¹æ®–ã‚»ãƒ³ã‚¿ãƒ¼ã‚’è¦‹å­¦ã€‚åˆå¾Œã¯ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ã‚¹ã¸æ¸¡ã‚Šã‚¢ã‚·ã‚«ã‚„ã‚¦ãƒŸã‚¬ãƒ¡ã€ãƒšãƒ³ã‚®ãƒ³ã¨ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã€‚ã‚ªã‚¹ã‚¿ãƒ«ãƒ»ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©æ³Šã€‚',
          zh: 'ä¹˜å¿«è‰‡èµ´ä¼ŠèŽŽè´æ‹‰å²›ã€‚æŽ¢è®¿ç«çƒˆé¸Ÿæ³»æ¹–ä¸Žå·¨é¾Ÿç¹æ®–ä¸­å¿ƒã€‚åˆåŽä¹˜èˆ¹è‡³è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤æµ®æ½œï¼Œä¸Žæµ·ç‹®ã€æµ·é¾Ÿã€è é²¼åŠä¼é¹…åŒæ¸¸ã€‚å…¥ä½å»·æ‰˜é›·æ‹‰å®¢æ ˆã€‚'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: {
          en: 'Isabela Island (Hostal Tintorera)',
          es: 'Isla Isabela (Hostal Tintorera)',
          fr: 'ÃŽle Isabela (Hostal Tintorera)',
          de: 'Insel Isabela (Hostal Tintorera)',
          it: 'Isola Isabela (Hostal Tintorera)',
          pt: 'Ilha Isabela (Hostal Tintorera)',
          ja: 'ã‚¤ã‚µãƒ™ãƒ©å³¶ï¼ˆã‚ªã‚¹ã‚¿ãƒ«ãƒ»ãƒ†ã‚£ãƒ³ãƒˆãƒ¬ãƒ©ï¼‰',
          zh: 'ä¼ŠèŽŽè´æ‹‰å²›ï¼ˆå»·æ‰˜é›·æ‹‰å®¢æ ˆï¼‰'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-dÃ©jeuner et dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'CafÃ© da manhÃ£ e almoÃ§o',
          ja: 'æœé£Ÿãƒ»æ˜¼é£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤ä¸Žåˆé¤'
        },
        transportation: {
          en: 'Inter-island speedboat and local land transport',
          es: 'Lancha rÃ¡pida interislas y transporte terrestre local',
          fr: 'Bateau rapide inter-Ã®les et transport local',
          de: 'Schnellboot & lokaler Transport',
          it: 'Motoscafo interisola e trasporto locale',
          pt: 'Lancha rÃ¡pida interilhas e transporte local',
          ja: 'å³¶é–“ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆï¼†ç¾åœ°é€è¿Ž',
          zh: 'åŸŽé™…å¿«è‰‡ä¸Žå²›ä¸Šè§‚å…‰ä¸“è½¦'
        },
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ Isabela To Santa Cruz | La LoberÃ­a | Las Grietas',
          es: 'DÃ­a 4 â€“ Isabela A Santa Cruz | La LoberÃ­a | Las Grietas',
          fr: 'Jour 4 â€“ D\'Isabela Ã  Santa Cruz | La LoberÃ­a | Las Grietas',
          de: 'Tag 4 â€“ Von Isabela nach Santa Cruz | La LoberÃ­a | Las Grietas',
          it: 'Giorno 4 â€“ Da Isabela a Santa Cruz | La LoberÃ­a | Las Grietas',
          pt: 'Dia 4 â€“ Isabela a Santa Cruz | La LoberÃ­a | Las Grietas',
          ja: 'ç¬¬4æ—¥ â€“ ã‚¤ã‚µãƒ™ãƒ©å³¶ã‹ã‚‰ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹ã¸ | ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ | ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹',
          zh: 'ç¬¬4å¤© â€“ ä¼ŠèŽŽè´æ‹‰å²›è¿”å›žåœ£å…‹é²æ–¯ | æ‹‰æ´›è´é‡Œäºš | æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯'
        },
        description: {
          en: 'Morning boat transfer back to Santa Cruz Island. Visit coastal La LoberÃ­a to observe colonies of sea lions. Continue to Las Grietas, a narrow volcanic chasm filled with crystal-clear turquoise brackish waterâ€”ideal for swimming and snorkeling. Afternoon at leisure in Puerto Ayora.',
          es: 'Lancha de regreso a Santa Cruz. Visita costera a La LoberÃ­a para observar lobos marinos. Luego caminata a Las Grietas, espectacular caÃ±Ã³n volcÃ¡nico de aguas cristalinas para nataciÃ³n y snorkel. Tarde libre en Puerto Ayora.',
          fr: 'Retour en bateau Ã  Santa Cruz. Visite de La LoberÃ­a pour observer les otaries. Baignade et snorkeling Ã  Las Grietas dans une eau limpide turquoise. AprÃ¨s-midi libre.',
          de: 'Bootstransfer nach Santa Cruz. Besuch von La LoberÃ­a und Las Grietas zum Schwimmen und Schnorcheln im kristallklaren Wasser. Nachmittag zur freien VerfÃ¼gung.',
          it: 'Rientro in barca a Santa Cruz. Visita a La LoberÃ­a e nuoto/snorkeling a Las Grietas. Pomeriggio libero a Puerto Ayora.',
          pt: 'Lancha de retorno a Santa Cruz. Visita a La LoberÃ­a e snorkel nas Ã¡guas lÃ­mpidas de Las Grietas. Tarde livre em Puerto Ayora.',
          ja: 'ãƒœãƒ¼ãƒˆã§ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ã¸æˆ»ã‚Šã€ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢ã®ã‚¢ã‚·ã‚«ã‚’è¦³å¯Ÿã€‚ãƒ©ã‚¹ãƒ»ã‚°ãƒªã‚¨ã‚¿ã‚¹ã®é€æ˜Žãªæ°´è·¯ã§ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã€‚ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©ã§è‡ªç”±æ™‚é–“ã€‚',
          zh: 'ä¹˜èˆ¹è¿”å›žåœ£å…‹é²æ–¯å²›ã€‚æ¸¸è§ˆæ‹‰æ´›è´é‡Œäºšæµ·ç‹®ç¾¤æ –æ¯åœ°ï¼Œåœ¨æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ç«å±±å³¡è°·ç¿¡ç¿ è‰²æ¸…æ¾ˆæ°´åŸŸä¸­ç•…æ³³æµ®æ½œã€‚ä¸‹åˆåœ¨é˜¿çº¦æ‹‰æ¸¯è‡ªç”±æ´»åŠ¨ã€‚'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Inter-island speedboat and local walking trails',
          es: 'Lancha rÃ¡pida interislas y senderos locales',
          fr: 'Bateau rapide et sentiers cÃ´tiers',
          de: 'Schnellboot & Wanderpfade',
          it: 'Motoscafo e percorsi a piedi',
          pt: 'Lancha rÃ¡pida e trilhas locais',
          ja: 'å³¶é–“ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆï¼†å¾’æ­©ãƒˆãƒ¬ã‚¤ãƒ«',
          zh: 'åŸŽé™…å¿«è‰‡ä¸Žæ­¥è¡Œæ­¥é“'
        },
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Full-Day Navigable Yacht Excursion To Santa Fe Or PinzÃ³n Island',
          es: 'DÃ­a 5 â€“ ExcursiÃ³n Full-Day En Yate A Isla Santa Fe O Islote PinzÃ³n',
          fr: 'Jour 5 â€“ Excursion JournÃ©e en Yacht Ã  l\'ÃŽle Santa Fe ou PinzÃ³n',
          de: 'Tag 5 â€“ GanztÃ¤giger Yachtausflug zur Insel Santa Fe oder PinzÃ³n',
          it: 'Giorno 5 â€“ Escursione Giornata Intera in Yacht a Santa Fe o PinzÃ³n',
          pt: 'Dia 5 â€“ ExcursÃ£o Dia Inteiro em Iate para Santa Fe ou PinzÃ³n',
          ja: 'ç¬¬5æ—¥ â€“ ã‚µãƒ³ã‚¿ãƒ•ã‚§å³¶ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚º',
          zh: 'ç¬¬5å¤© â€“ åœ£è²å²›æˆ–å¹³æ¾å²›å…¨å¤©å‡ºæµ·æ¸¸è‰‡èˆªæµ·ä¸Žæµ®æ½œ'
        },
        description: {
          en: 'Full-day navigable yacht excursion to Santa Fe Island (turquoise waters, white beaches, endemic land iguanas) or PinzÃ³n Islet (deep-water snorkeling alongside sea turtles, sea lions, rays, sharks, and schools of tropical fish). Lunch served on board.',
          es: 'NavegaciÃ³n de dÃ­a completo en yate hacia Isla Santa Fe o Islote PinzÃ³n con sesiones de snorkel de alta biodiversidad marina (tortugas, leones marinos, rayas y peces de colores). Almuerzo a bordo incluido.',
          fr: 'CroisiÃ¨re d\'une journÃ©e en yacht vers Santa Fe ou l\'Ã®lot PinzÃ³n avec snorkeling exceptionnel au milieu des tortues, raies, requins et bancs de poissons tropicaux. DÃ©jeuner Ã  bord.',
          de: 'Ganztagesausflug per Yacht nach Santa Fe oder PinzÃ³n mit erstklassigem Schnorcheln (SchildkrÃ¶ten, SeelÃ¶wen, Haie und Rochen). Mittagessen an Bord.',
          it: 'Escursione giornaliera in yacht a Santa Fe o PinzÃ³n con snorkeling d\'eccezione (tartarughe, leoni marini, mante e pesci tropicali). Pranzo a bordo.',
          pt: 'NavegaÃ§Ã£o de dia inteiro em iate para Santa Fe ou PinzÃ³n com snorkel de alta biodiversidade (tartarugas, leÃµes-marinhos, arraias e tubarÃµes). AlmoÃ§o a bordo.',
          ja: 'ã‚µãƒ³ã‚¿ãƒ•ã‚§å³¶ã¾ãŸã¯ãƒ”ãƒ³ã‚½ãƒ³å³¶ã¸ã®çµ‚æ—¥ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚ºã€‚ã‚¦ãƒŸã‚¬ãƒ¡ã€ã‚¢ã‚·ã‚«ã€ã‚µãƒ¡ã€ã‚¨ã‚¤ãŒç”Ÿæ¯ã™ã‚‹è±Šã‹ãªæµ·ã§ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ã€‚èˆ¹ä¸Šãƒ©ãƒ³ãƒä»˜ãã€‚',
          zh: 'å…¨å¤©ä¹˜æ¸¸è‰‡å‡ºæµ·æŽ¢è®¿åœ£è²å²›æˆ–å¹³æ¾å²›ã€‚åœ¨ç¢§æ³¢è¡æ¼¾çš„æ°´åŸŸä¸­æ·±æ½œæµ®æ½œï¼Œä¸Žæµ·é¾Ÿã€æµ·ç‹®ã€è é²¼å’Œç™½é¡¶ç¤é²¨åŒæ¸¸ã€‚åŒ…å«ç”²æ¿ç²¾è‡´åˆé¤ã€‚'
        },
        image: '/images/tours/16-9/santa-fe-island-16-9.webp',
        accommodation: {
          en: 'Santa Cruz Island â€“ Puerto Ayora',
          es: 'Isla Santa Cruz â€“ Puerto Ayora',
          fr: 'ÃŽle Santa Cruz â€“ Puerto Ayora',
          de: 'Insel Santa Cruz â€“ Puerto Ayora',
          it: 'Isola di Santa Cruz â€“ Puerto Ayora',
          pt: 'Ilha Santa Cruz â€“ Puerto Ayora',
          ja: 'ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹å³¶ â€“ ãƒ—ã‚¨ãƒ«ãƒˆã‚¢ãƒ¨ãƒ©',
          zh: 'åœ£å…‹é²æ–¯å²› â€“ é˜¿çº¦æ‹‰æ¸¯'
        },
        meals: {
          en: 'Breakfast and lunch',
          es: 'Desayuno y almuerzo',
          fr: 'Petit-dÃ©jeuner et dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck und Mittagessen',
          it: 'Colazione e pranzo',
          pt: 'CafÃ© da manhÃ£ e almoÃ§o',
          ja: 'æœé£Ÿãƒ»æ˜¼é£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤ä¸Žåˆé¤'
        },
        transportation: {
          en: 'Navigable tourist yacht and island ground transfers',
          es: 'Yate turÃ­stico navegable y transporte terrestre',
          fr: 'Yacht touristique navigable et transferts terrestres',
          de: 'Yachtschiff & Landtransport',
          it: 'Yacht turistico e trasporto a terra',
          pt: 'Iate turÃ­stico navegÃ¡vel e transporte terrestre',
          ja: 'è¦³å…‰ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚ºèˆ¹ï¼†é™¸ä¸Šé€è¿Ž',
          zh: 'å‡ºæµ·è§‚å…‰æ¸¸è‰‡ä¸Žé™†åœ°æŽ¥é€'
        },
        activity: {
          en: 'Open-water yacht navigation, deep-water snorkeling & hiking',
          es: 'NavegaciÃ³n en yate, snorkel en aguas abiertas y caminata',
          fr: 'Navigation en yacht, snorkeling en eau profonde et randonnÃ©e',
          de: 'Yachtfahrt, Tiefwasserschnorcheln & Wanderung',
          it: 'Navigazione in yacht, snorkeling e trekking',
          pt: 'NavegaÃ§Ã£o em iate, snorkel em mar aberto e caminhada',
          ja: 'ãƒ¨ãƒƒãƒˆã‚¯ãƒ«ãƒ¼ã‚ºã€å¤–æ´‹ã‚·ãƒ¥ãƒŽãƒ¼ã‚±ãƒªãƒ³ã‚°ï¼†ãƒã‚¤ã‚­ãƒ³ã‚°',
          zh: 'æ¸¸è‰‡èˆªè¡Œã€å¤–æµ·æ·±åº¦æµ®æ½œä¸Žç”Ÿæ€å¾’æ­¥'
        },
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Santa Cruz To San CristÃ³bal | Interpretation Center | Tijeretas Hill | La LoberÃ­a',
          es: 'DÃ­a 6 â€“ Santa Cruz A San CristÃ³bal | Centro De InterpretaciÃ³n | Cerro Tijeretas | La LoberÃ­a',
          fr: 'Jour 6 â€“ De Santa Cruz Ã  San CristÃ³bal | Centre d\'InterprÃ©tation | Tijeretas | La LoberÃ­a',
          de: 'Tag 6 â€“ Von Santa Cruz nach San CristÃ³bal | Interpretationszentrum | Tijeretas | La LoberÃ­a',
          it: 'Giorno 6 â€“ Da Santa Cruz a San CristÃ³bal | Centro Interpretazione | Tijeretas | La LoberÃ­a',
          pt: 'Dia 6 â€“ Santa Cruz a San CristÃ³bal | Centro de InterpretaÃ§Ã£o | Tijeretas | La LoberÃ­a',
          ja: 'ç¬¬6æ—¥ â€“ ã‚µãƒ³ã‚¿ã‚¯ãƒ«ã‚¹ã‹ã‚‰ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«å³¶ã¸ | è§£èª¬ã‚»ãƒ³ã‚¿ãƒ¼ | ãƒ†ã‚£ãƒ˜ãƒ¬ã‚¿ã‚¹ | ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢',
          zh: 'ç¬¬6å¤© â€“ åœ£å…‹é²æ–¯è‡³åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”å²› | è§£è¯»ä¸­å¿ƒ | å†›èˆ°é¸Ÿä¸˜ | æ‹‰æ´›è´é‡Œäºšæµ·æ»©'
        },
        description: {
          en: 'Speedboat journey from Santa Cruz to San CristÃ³bal Island. Upon arrival in Puerto Baquerizo Moreno, visit the San CristÃ³bal Interpretation Center to explore the islands\' natural origins and human history. Hike up scenic Tijeretas Hill for panoramic coastal ocean views and frigatebird nesting sites. Conclude with a visit to La LoberÃ­a beach to observe sea lions and marine iguanas. Overnight in San CristÃ³bal Island at Hotel Algarrobos.',
          es: 'Lancha rÃ¡pida a Isla San CristÃ³bal. En Puerto Baquerizo Moreno, visita al Centro de InterpretaciÃ³n para conocer el origen volcÃ¡nico y la historia humana del archipiÃ©lago. Caminata al mirador de Cerro Tijeretas con avistamiento de fragatas y relax en la playa La LoberÃ­a rodeada de lobos marinos e iguanas. Noche en San CristÃ³bal (Hotel Algarrobos).',
          fr: 'TraversÃ©e en bateau rapide vers San CristÃ³bal. Visite du Centre d\'InterprÃ©tation de Puerto Baquerizo Moreno. RandonnÃ©e au belvÃ©dÃ¨re de Cerro Tijeretas pour admirer les frÃ©gates et panorama sur l\'ocÃ©an. DÃ©tente sur la plage de La LoberÃ­a au milieu des otaries. Nuit Ã  l\'HÃ´tel Algarrobos.',
          de: 'Schnellbootfahrt nach San CristÃ³bal. Besuch des Interpretationszentrums in Puerto Baquerizo Moreno. Wanderung zum Aussichtspunkt Cerro Tijeretas zur Beobachtung von FregattvÃ¶geln und Entspannung am Strand La LoberÃ­a bei den SeelÃ¶wen. Ãœbernachtung im Hotel Algarrobos.',
          it: 'Motoscafo verso San CristÃ³bal. Visita al Centro di Interpretazione, passeggiata panoramica al Cerro Tijeretas con fregate e relax sulla spiaggia di La LoberÃ­a con i leoni marini. Pernottamento all\'Hotel Algarrobos.',
          pt: 'Lancha rÃ¡pida para San CristÃ³bal. Visita ao Centro de InterpretaÃ§Ã£o em Puerto Baquerizo Moreno. Caminhada atÃ© o mirante do Cerro Tijeretas para ver fragatas e relaxe na praia de La LoberÃ­a com leÃµes-marinhos. Pernoite no Hotel Algarrobos.',
          ja: 'ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆã§ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«å³¶ã¸ã€‚è§£èª¬ã‚»ãƒ³ã‚¿ãƒ¼ã‚’è¦‹å­¦å¾Œã€ã‚°ãƒ³ã‚«ãƒ³ãƒ‰ãƒªãŒèˆžã†ãƒ†ã‚£ãƒ˜ãƒ¬ã‚¿ã‚¹ã®ä¸˜å±•æœ›å°ã¸ãƒã‚¤ã‚­ãƒ³ã‚°ã€‚ãƒ©ãƒ»ãƒ­ãƒ™ãƒªã‚¢æµ·å²¸ã§ã‚¢ã‚·ã‚«ã‚„ã‚¦ãƒŸã‚¤ã‚°ã‚¢ãƒŠã‚’è¦³å¯Ÿã€‚ãƒ›ãƒ†ãƒ«ãƒ»ã‚¢ãƒ«ã‚¬ãƒ­ãƒœã‚¹æ³Šã€‚',
          zh: 'ä¹˜å¿«è‰‡æŠµè¾¾åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”å²›ã€‚å‚è§‚è§£è¯»ä¸­å¿ƒäº†è§£åŠ æ‹‰å¸•æˆˆæ–¯çš„åœ°è´¨ä¸Žäººæ–‡åŽ†å²ã€‚å¾’æ­¥ç™»ä¸Šå†›èˆ°é¸Ÿä¸˜ï¼ˆCerro Tijeretasï¼‰ä¿¯çž°å£®ä¸½æµ·å²¸å…¨æ™¯ä¸Žç¿±ç¿”çš„å†›èˆ°é¸Ÿï¼Œæ¼«æ­¥æ‹‰æ´›è´é‡Œäºšæµ·æ»©è§‚èµæµ·ç‹®ä¸Žæµ·é¬£èœ¥ã€‚å…¥ä½é˜¿å°”åŠ ç½—åšæ–¯é…’åº—ã€‚'
        },
        image: '/images/tours/16-9/galapagos-focas-16-9.webp',
        accommodation: {
          en: 'San CristÃ³bal Island (Hotel Algarrobos)',
          es: 'Isla San CristÃ³bal (Hotel Algarrobos)',
          fr: 'ÃŽle San CristÃ³bal (HÃ´tel Algarrobos)',
          de: 'Insel San CristÃ³bal (Hotel Algarrobos)',
          it: 'Isola San CristÃ³bal (Hotel Algarrobos)',
          pt: 'Ilha San CristÃ³bal (Hotel Algarrobos)',
          ja: 'ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«å³¶ï¼ˆãƒ›ãƒ†ãƒ«ãƒ»ã‚¢ãƒ«ã‚¬ãƒ­ãƒœã‚¹ï¼‰',
          zh: 'åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”å²›ï¼ˆé˜¿å°”åŠ ç½—åšæ–¯é…’åº—ï¼‰'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Inter-island speedboat and local ground transport',
          es: 'Lancha rÃ¡pida interislas y transporte terrestre local',
          fr: 'Bateau rapide inter-Ã®les et transport local',
          de: 'Schnellboot & lokaler Transport',
          it: 'Motoscafo interisola e trasporto locale',
          pt: 'Lancha rÃ¡pida interilhas e transporte local',
          ja: 'å³¶é–“ã‚¹ãƒ”ãƒ¼ãƒ‰ãƒœãƒ¼ãƒˆï¼†ç¾åœ°ç§»å‹•',
          zh: 'åŸŽé™…å¿«è‰‡ä¸Žå²›ä¸Šè§‚å…‰ä¸“è½¦'
        },
      },
      {
        day: 7,
        title: {
          en: 'Day 7 â€“ San CristÃ³bal Airport Transfer | Flight To Quito | Private Hotel Transfer',
          es: 'DÃ­a 7 â€“ Traslado Aeropuerto San CristÃ³bal | Vuelo A Quito | Transfer Privado Al Hotel',
          fr: 'Jour 7 â€“ Transfert AÃ©roport San CristÃ³bal | Vol vers Quito | Transfert PrivÃ© HÃ´tel',
          de: 'Tag 7 â€“ Transfer Flughafen San CristÃ³bal | Flug nach Quito | Privater Hoteltransfer',
          it: 'Giorno 7 â€“ Trasferimento Aeroporto San CristÃ³bal | Volo per Quito | Transfer Privato in Hotel',
          pt: 'Dia 7 â€“ Traslado Aeroporto San CristÃ³bal | Voo para Quito | Transfer Privado ao Hotel',
          ja: 'ç¬¬7æ—¥ â€“ ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«ç©ºæ¸¯ã¸é€è¿Ž | ã‚­ãƒˆè¡Œããƒ•ãƒ©ã‚¤ãƒˆ | ãƒ›ãƒ†ãƒ«å°‚ç”¨é€è¿Ž',
          zh: 'ç¬¬7å¤© â€“ åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”æœºåœºé€æœº | é£žå¾€åŸºå¤š | ä¸“è½¦æŽ¥æœºå…¥ä½é…’åº—'
        },
        description: {
          en: 'After breakfast, free morning depending on your flight schedule. Transfer to San CristÃ³bal Airport for your departure flight to Quito. Upon arrival in Quito, private transfer to your hotel. Evening at leisure.',
          es: 'Desayuno y tiempo libre segÃºn horario de vuelo. Traslado al Aeropuerto de San CristÃ³bal para tomar el vuelo de retorno a Quito. Llegada y traslado privado exclusivo a su hotel en Quito.',
          fr: 'Petit-dÃ©jeuner et temps libre. Transfert Ã  l\'aÃ©roport de San CristÃ³bal pour votre vol retour vers Quito. Accueil et transfert privÃ© vers votre hÃ´tel.',
          de: 'FrÃ¼hstÃ¼ck und Freizeit je nach Flugplan. Transfer zum Flughafen San CristÃ³bal fÃ¼r den Flug nach Quito. Privater Transfer zu Ihrem Hotel in Quito.',
          it: 'Colazione e tempo libero. Trasferimento all\'aeroporto di San CristÃ³bal per il volo verso Quito. Accoglienza e trasferimento privato in hotel.',
          pt: 'CafÃ© da manhÃ£ e tempo livre. Traslado ao Aeroporto de San CristÃ³bal para voo de retorno a Quito. Traslado privado para o hotel.',
          ja: 'æœé£Ÿå¾Œã€ãƒ•ãƒ©ã‚¤ãƒˆæ™‚é–“ã«åˆã‚ã›ã¦è‡ªç”±è¡Œå‹•ã€‚ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«ç©ºæ¸¯ã¸é€è¿Žã—ã‚­ãƒˆè¡Œããƒ•ãƒ©ã‚¤ãƒˆã«æ­ä¹—ã€‚ã‚­ãƒˆåˆ°ç€å¾Œå°‚ç”¨è»Šã§ãƒ›ãƒ†ãƒ«ã¸ã€‚',
          zh: 'æ—©é¤åŽæ ¹æ®èˆªç­æ—¶é—´è‡ªç”±æ´»åŠ¨ã€‚é€å¾€åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”æœºåœºé£žå¾€åŸºå¤šï¼ŒæŠµè¾¾åŽä¸“è½¦æŽ¥æœºé€å¾€é…’åº—ä¼‘æ¯ã€‚'
        },
        image: '/images/tours/16-9/galapagos-lobo-marino-16-9.webp',
        accommodation: {
          en: 'Hotel in Quito (Selected category 3â˜… or 4â˜…)',
          es: 'Hotel en Quito (CategorÃ­a seleccionada 3â˜… o 4â˜…)',
          fr: 'HÃ´tel Ã  Quito (CatÃ©gorie 3â˜… ou 4â˜…)',
          de: 'Hotel in Quito (Kategorie 3â˜… oder 4â˜…)',
          it: 'Hotel a Quito (Categoria 3â˜… o 4â˜…)',
          pt: 'Hotel em Quito (Categoria 3â˜… ou 4â˜…)',
          ja: 'ã‚­ãƒˆå¸‚å†…ã®åŽ³é¸ãƒ›ãƒ†ãƒ«ï¼ˆ3â˜…ã¾ãŸã¯4â˜…ï¼‰',
          zh: 'åŸºå¤šç²¾é€‰é…’åº—ï¼ˆ3æ˜Ÿçº§æˆ–4æ˜Ÿçº§ï¼‰'
        },
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'San CristÃ³bal airport transfer, domestic flight & private Quito transfer',
          es: 'Traslado al aeropuerto de San CristÃ³bal, vuelo y traslado privado en Quito',
          fr: 'Transfert aÃ©roport San CristÃ³bal, vol intÃ©rieur et transfert privÃ© Ã  Quito',
          de: 'Flughafentransfer San CristÃ³bal, Flug & privater Transfer in Quito',
          it: 'Trasferimento aeroporto San CristÃ³bal, volo e transfer privato a Quito',
          pt: 'Traslado ao aeroporto de San CristÃ³bal, voo e traslado privado em Quito',
          ja: 'ã‚µãƒ³ã‚¯ãƒªã‚¹ãƒˆãƒãƒ«ç©ºæ¸¯é€è¿Žã€å›½å†…ç·šãƒ•ãƒ©ã‚¤ãƒˆï¼†ã‚­ãƒˆå¸‚å†…å°‚ç”¨é€è¿Ž',
          zh: 'åœ£å…‹é‡Œæ–¯æ‰˜å·´å°”æœºåœºé€æœºã€å›½å†…èˆªç­åŠåŸºå¤šä¸“è½¦æŽ¥æœº'
        },
      },
      {
        day: 8,
        title: {
          en: 'Day 8 â€“ Private Quito Airport Transfer | International Departure',
          es: 'DÃ­a 8 â€“ Traslado Privado Al Aeropuerto De Quito | Vuelo Internacional',
          fr: 'Jour 8 â€“ Transfert PrivÃ© vers l\'AÃ©roport de Quito | Vol International',
          de: 'Tag 8 â€“ Privater Transfer zum Flughafen Quito | Internationaler RÃ¼ckflug',
          it: 'Giorno 8 â€“ Trasferimento Privato all\'Aeroporto di Quito | Partenza Internazionale',
          pt: 'Dia 8 â€“ Traslado Privado ao Aeroporto de Quito | Embarque Internacional',
          ja: 'ç¬¬8æ—¥ â€“ ã‚­ãƒˆç©ºæ¸¯å°‚ç”¨é€è¿Ž | å¸°å›½ã®é€”ã¸',
          zh: 'ç¬¬8å¤© â€“ åŸºå¤šæœºåœºç§äººä¸“è½¦é€æœº | è¸ä¸Šå½’é€”'
        },
        description: {
          en: 'Private transfer to Quito International Airport for your onward international flight connections. End of our services.',
          es: 'Traslado privado exclusivo desde su hotel hacia el Aeropuerto Internacional de Quito para su vuelo internacional. Fin de servicios.',
          fr: 'Transfert privÃ© vers l\'aÃ©roport international de Quito pour votre vol retour. Fin de nos services.',
          de: 'Privater Transfer zum internationalen Flughafen Quito fÃ¼r Ihren internationalen Weiterflug. Ende unserer Leistungen.',
          it: 'Trasferimento privato all\'Aeroporto di Quito per il volo internazionale. Fine dei nostri servizi.',
          pt: 'Traslado privado ao Aeroporto de Quito para conexÃ£o internacional. Fim de nossos serviÃ§os.',
          ja: 'ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã¸å°‚ç”¨è»Šã§é€è¿Žã€‚ã‚µãƒ¼ãƒ“ã‚¹çµ‚äº†ã¨ãªã‚Šã¾ã™ã€‚ç´ æ™´ã‚‰ã—ã„ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹ã®æ€ã„å‡ºã¨ã¨ã‚‚ã«ãŠæ°—ã‚’ã¤ã‘ã¦ãŠå¸°ã‚Šãã ã•ã„ã€‚',
          zh: 'æ ¹æ®å›½é™…èˆªç­èµ·é£žæ—¶é—´ä¸“è½¦é€å¾€åŸºå¤šå›½é™…æœºåœºï¼Œç»“æŸä¸°å¯Œå……å®žçš„ä¸‰å²›å¤§è·¨è¶ŠåŠ æ‹‰å¸•æˆˆæ–¯æŽ¢é™©ã€‚'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        meals: {
          en: 'Breakfast',
          es: 'Desayuno',
          fr: 'Petit-dÃ©jeuner',
          de: 'FrÃ¼hstÃ¼ck',
          it: 'Colazione',
          pt: 'CafÃ© da manhÃ£',
          ja: 'æœé£Ÿä»˜ã',
          zh: 'åŒ…å«æ—©é¤'
        },
        transportation: {
          en: 'Private transportation to Quito International Airport',
          es: 'Transporte privado al Aeropuerto Internacional de Quito',
          fr: 'Transport privÃ© vers l\'aÃ©roport de Quito',
          de: 'Privater Transport zum Flughafen Quito',
          it: 'Trasporto privato per l\'aeroporto di Quito',
          pt: 'Transporte privado para o Aeroporto de Quito',
          ja: 'ã‚­ãƒˆå›½éš›ç©ºæ¸¯ã¸ã®å°‚ç”¨é€è¿Žè»Š',
          zh: 'åŸºå¤šå›½é™…æœºåœºç§äººä¸“è½¦é€æœº'
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
      es: 'Volcanes, RÃ­os Y Selva: La Ruta De La Aventura',
      fr: 'Des Andes Ã  l\'Amazonie: Volcans et RiviÃ¨res',
      de: 'Von den Anden zum Amazonas: Vulkane & FlÃ¼sse',
      it: 'Dalle Ande all\'Amazzonia: Vulcani e Fiumi',
      pt: 'Dos Andes Ã  AmazÃ´nia: VulcÃµes e Rios',
      ja: 'ã‚¢ãƒ³ãƒ‡ã‚¹ã‹ã‚‰ã‚¢ãƒžã‚¾ãƒ³ã¸: ç«å±±ã¨å·ã®æ—…',
      zh: 'ä»Žå®‰ç¬¬æ–¯åˆ°äºšé©¬é€Šï¼šç«å±±ä¸Žæ²³æµ'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '8 DAYS / 7 NIGHTS',
      es: '8 DÃAS / 7 NOCHES',
      fr: '8 JOURS / 7 NUITS',
      de: '8 TAGE / 7 NÃ„CHTE',
      it: '8 GIORNI / 7 NOTTI',
      pt: '8 DIAS / 7 NOITES',
      ja: '8æ—¥é–“ / 7æ³Š',
      zh: '8å¤© / 7æ™š'
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
      es: 'Andes y AmazonÃ­a Overland',
      fr: 'Aventure Andes & Amazonie',
      de: 'Anden- & Amazonas-Reise',
      it: 'Overland Ande e Amazzonia',
      pt: 'ExpediÃ§Ã£o Andes e AmazÃ´nia',
      ja: 'ã‚¢ãƒ³ãƒ‡ã‚¹ï¼†ã‚¢ãƒžã‚¾ãƒ³å‘¨éŠ',
      zh: 'å®‰ç¬¬æ–¯ä¸Žäºšé©¬é€Šç»å…¸ç©¿è¶Š'
    },
    description: {
      en: '8-day overland journey connecting Quito Historic Center, Equator Line, Papallacta thermal springs, Tena Amazon lodge with motorized canoe, Yanacocha rescue biopark, BaÃ±os waterfalls & PailÃ³n del Diablo (Devil\'s Cauldron), and Quilotoa Crater Lake.',
      es: 'TravesÃ­a de 8 dÃ­as que conecta el Quito colonial, aguas termales de Papallacta, selva amazÃ³nica de Tena, cascadas de BaÃ±os y el crÃ¡ter Quilotoa.',
      zh: '8æ—¥ç§äººå…¨æ™¯ä¹‹æ—…ï¼Œæ¶µç›–åŸºå¤šåŽ†å²ä¸­å¿ƒã€èµ¤é“çºªå¿µç¢‘ã€å¸•å¸•äºšå…‹å¡”æ¸©æ³‰ã€ç‰¹çº³äºšé©¬é€Šé›¨æž—ç²¾å“æœ¨å±‹ã€åŠ¨åŠ›æœ¨èˆŸã€æ™®çº¦äºšçº³ç§‘æŸ¥ç”Ÿç‰©å…¬å›­ã€å·´å°¼å¥¥æ–¯æ¶é­”ä¹‹å’½ç€‘å¸ƒä¸ŽåŸºæ´›æ‰˜é˜¿ç«å±±æ¹–ã€‚'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Equator Line', es: 'Centro HistÃ³rico de Quito y Mitad del Mundo', zh: 'åŸºå¤šåŽ†å²ä¸­å¿ƒä¸Žèµ¤é“çºªå¿µç¢‘' },
      { en: 'Papallacta Thermal Hot Springs & Antisana Views', es: 'Termas de Papallacta y Vistas del Antisana', zh: 'å¸•å¸•äºšå…‹å¡”é«˜å±±æ¸©æ³‰' },
      { en: 'Tena Amazon Lodge, Canoe & Caiman Lagoon', es: 'Lodge en Tena, Canoa y Laguna de Caimanes', zh: 'ç‰¹çº³é›¨æž—æœ¨å±‹ã€æœ¨èˆŸä¸Žé³„é±¼æ¹–' },
      { en: 'Yanacocha Biopark & PailÃ³n del Diablo (Devil\'s Cauldron) Waterfall', es: 'Bioparque Yanacocha y PailÃ³n del Diablo (Devil\'s Cauldron)', zh: 'äºšçº³ç§‘æŸ¥ç”Ÿç‰©å…¬å›­ä¸Žæ¶é­”ä¹‹å’½ç€‘å¸ƒ' },
      { en: 'Quilotoa Emerald Crater Lake & Tigua Art', es: 'Laguna de Quilotoa y Arte de Tigua', zh: 'åŸºæ´›æ‰˜é˜¿ç¿¡ç¿ ç«å±±æ¹–ä¸Žè’‚ç“œè‰ºæœ¯' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado (vehÃ­culos 4x4 o buses turÃ­sticos)' },
      { en: 'Professional English-speaking guide', es: 'GuÃ­a profesional bilingÃ¼e' },
      { en: 'Accommodation at 3* or 4* hotels according to selection', es: 'Alojamiento en hoteles 3â˜… o 4â˜… segÃºn plan' },
      { en: 'Daily breakfast, plus lunches and dinners in Amazon as specified', es: 'Desayunos diarios, y comidas en AmazonÃ­a segÃºn itinerario' },
      { en: 'Entrances: La CompaÃ±Ã­a, IntiÃ±an, Papallacta, Yanacocha, PailÃ³n del Diablo (Devil\'s Cauldron), Ilinizas (Quilotoa)', es: 'Entradas: La CompaÃ±Ã­a, IntiÃ±an, Papallacta, Yanacocha, PailÃ³n del Diablo (Devil\'s Cauldron), Quilotoa' }
    ],
    exclusions: [
      { en: 'Personal expenses and optional activities in BaÃ±os', es: 'Gastos personales y actividades opcionales en BaÃ±os' },
      { en: 'Meals not specified in the itinerary', es: 'Comidas no especificadas' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito',
          es: 'DÃ­a 1 â€“ Llegada A Quito'
        },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.',
          es: 'RecepciÃ³n en el Aeropuerto Internacional Mariscal Sucre de Quito y traslado privado al hotel.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Quito City Tour & Equator Line',
          es: 'DÃ­a 2 â€“ City Tour En Quito Y LÃ­nea Ecuatorial'
        },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nToday, we explore both the modern and historic areas of Quito. The historic center is renowned for its impressive churches, colonial architecture, and beautiful plazas.\n\nWe will visit the Cathedral, the Archbishopâ€™s Palace, and the Presidential Palace, all located around the main square, known as Plaza Grande. We will also visit La CompaÃ±Ã­a de JesÃºs, one of Quitoâ€™s most spectacular churches, famous for its interior richly decorated with gold leaf, as well as San Francisco Square and Church.\n\nAfterward, we continue to the Middle of the World (Mitad del Mundo), where we visit the IntiÃ±an Museum, famous for its demonstrations and experiments related to the Equator. Here, you can experience the unique sensation of standing in the Northern and Southern Hemispheres at the same time.',
          es: 'Visita guiada al centro histÃ³rico de Quito: Plaza Grande, Catedral, Palacio Arzobispal, Palacio Presidencial, Iglesia de La CompaÃ±Ã­a de JesÃºs cubierta de pan de oro y Plaza San Francisco.\n\nContinuamos a la Mitad del Mundo y Museo IntiÃ±an con experimentos sobre la lÃ­nea ecuatorial.'
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
          en: 'Day 3 â€“ Quito â€“ Papallacta â€“ Amazon Rainforest',
          es: 'DÃ­a 3 â€“ Quito â€“ Papallacta â€“ Selva AmazÃ³nica'
        },
        description: {
          en: 'We travel approximately two hours east of Quito along a historic route used by Spanish explorers in the 16th century in their search for gold and cinnamon. This expedition eventually led to the discovery of the Amazon River.\n\nAlong the way, we pass by the historic GuÃ¡pulo Church and cross the Andes at approximately 4,100 meters (13,451 ft) above sea level. The route passes between two ecological reserves before descending toward the transition zone between the Andes and the Ecuadorian Amazon.\n\nWe stop at the famous Papallacta Hot Springs, where you can enjoy several activities: relax in thermal pools with different temperatures while enjoying spectacular views of Antisana Volcano (5,704 m / 18,714 ft), enjoy some relaxing time at the spa, or explore the walking trails around the area.\n\nWe then continue our descent toward the Amazon Rainforest.',
          es: 'Viaje al este cruzando la cordillera a 4,100 m de altitud con vistas de pÃ¡ramo y paso por GuÃ¡pulo. Parada en las Termas de Papallacta para disfrutar de las piscinas termales medicinales y senderos ecolÃ³gicos. Descenso hacia la selva amazÃ³nica de Tena.'
        },
        image: '/images/tours/16-9/papallacta-volcan-16-9.webp',
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour; descent from 4,000m to 500m; 1-hour hike', es: 'Tour de 6 horas, descenso de 4,000m a 500m y caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ Tena & Amazon Rainforest',
          es: 'DÃ­a 4 â€“ Tena Y Selva AmazÃ³nica'
        },
        description: {
          en: 'In the morning, we board a motorized canoe and travel downstream to visit an Amazon Rainforest wildlife rescue center, where we will learn about local wildlife and conservation efforts.\n\nWe then have the opportunity to explore primary rainforest on foot, accompanied by a knowledgeable local guide. During the hike, we will discover the incredible biodiversity of the Amazon and learn about the rainforest ecosystem.\n\nWe will also visit a local Kichwa family and learn about their traditions, culture, and way of life.\n\nFinally, we visit a caiman lagoon, where we can observe these fascinating Amazonian reptiles in their natural environment.\n\nWe then return to the lodge.',
          es: 'Paseo en canoa motorizada por el rÃ­o hacia un centro de rescate de fauna amazÃ³nica. Caminata guiada por la selva primaria con guÃ­a nativo, visita a una familia Kichwa y observaciÃ³n de caimanes en la laguna.'
        },
        image: '/images/tours/16-9/amazon-river-16-9.webp',
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour + 1-hour motorized canoe ride', es: 'Tour de 6h + paseo en canoa motorizada de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast, lunch, and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Tena â€“ Puyo â€“ BaÃ±os',
          es: 'DÃ­a 5 â€“ Tena â€“ Puyo â€“ BaÃ±os'
        },
        description: {
          en: 'In the morning, we travel south toward the city of Puyo. Along the way, we visit Yanacocha Biopark, where we will learn about Amazonian wildlife species that have been rescued from illegal wildlife trafficking.\n\nWe then continue toward BaÃ±os along the spectacular Route of the Waterfalls, one of Ecuadorâ€™s most scenic routes.\n\nWe will have the opportunity to hike to PailÃ³n del Diablo (Devil\'s Cauldron), one of the most impressive waterfalls in Ecuador, surrounded by lush vegetation and dramatic mountain scenery.\n\nWe continue to BaÃ±os for our overnight stay.',
          es: 'Viaje hacia Puyo y visita al Bioparque Yanacocha de rescate de fauna silvestre. ContinuaciÃ³n por el caÃ±Ã³n del rÃ­o Pastaza y la Ruta de las Cascadas hacia BaÃ±os, con caminata a la gran cascada PailÃ³n del Diablo (Devil\'s Cauldron).'
        },
        image: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
        accommodation: { en: 'BaÃ±os', es: 'BaÃ±os' },
        activity: { en: '6-hour guided tour', es: 'Tour guiado de 6 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ BaÃ±os â€“ Free Day',
          es: 'DÃ­a 6 â€“ BaÃ±os â€“ DÃ­a Libre'
        },
        description: {
          en: 'Enjoy a free day in BaÃ±os, a charming tourist town located at the foothills of the active Tungurahua Volcano.\n\nYou can enjoy a variety of optional activities at your own expense, including: cycling, white-water rafting, waterfall hikes, cable-car rides (tarabita), and horseback riding.',
          es: 'DÃ­a libre en BaÃ±os de Agua Santa para disfrutar de actividades de aventura opcionales: ciclismo de montaÃ±a, rafting, tarabitas sobre caÃ±ones, termas o cabalgatas.'
        },
        image: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
        accommodation: { en: 'BaÃ±os', es: 'BaÃ±os' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 â€“ BaÃ±os â€“ Quilotoa â€“ Quito',
          es: 'DÃ­a 7 â€“ BaÃ±os â€“ Quilotoa â€“ Quito'
        },
        description: {
          en: 'In the morning, we begin our journey toward Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, famous for its breathtaking scenery and turquoise waters.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater.\n\nWe may also make a stop in the traditional village of Tigua, famous for its colorful Andean paintings, as well as local guinea pig farms.\n\nWe then continue to Quito.',
          es: 'Viaje hacia la Laguna del CrÃ¡ter de Quilotoa con caminata al interior de la caldera volcÃ¡nica. Parada en el pueblo de pintores de Tigua y continuaciÃ³n hacia Quito.'
        },
        image: '/images/tours/16-9/laguna-quilotoa-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,483 ft)', es: 'Tour de 6h + caminata de 2h (3,500 m)' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 â€“ Transfer To The Airport',
          es: 'DÃ­a 8 â€“ Traslado Al Aeropuerto'
        },
        description: {
          en: 'Private transfer to the airport for your onward flight connections to the GalÃ¡pagos Islands or Mainland Ecuador.\n\nEnd of the tour.',
          es: 'Traslado privado al Aeropuerto Internacional de Quito para su vuelo internacional o conexiÃ³n a GalÃ¡pagos o Ecuador Continental. Fin de los servicios.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
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
      es: 'El Latido De Los Andes Y La AmazonÃ­a',
      fr: 'Andes Mystiques et ForÃªt Amazonienne',
      de: 'Mystische Anden & Amazonas Regenwald',
      it: 'Ande Mistiche e Foresta Amazzonica',
      pt: 'Andes MÃ­sticos e Floresta AmazÃ´nica',
      ja: 'ç¥žç§˜çš„ãªã‚¢ãƒ³ãƒ‡ã‚¹ã¨ã‚¢ãƒžã‚¾ãƒ³ç†±å¸¯é›¨æž—',
      zh: 'ç¥žç§˜å®‰ç¬¬æ–¯ä¸Žäºšé©¬é€Šçƒ­å¸¦é›¨æž—'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '7 DAYS / 6 NIGHTS',
      es: '7 DÃAS / 6 NOCHES',
      fr: '7 JOURS / 6 NUITS',
      de: '7 TAGE / 6 NÃ„CHTE',
      it: '7 GIORNI / 6 NOTTI',
      pt: '7 DIAS / 6 NOITES',
      ja: '7æ—¥é–“ / 6æ³Š',
      zh: '7å¤© / 6æ™š'
    },
    durationDays: 7,
    price: 1190,
    price3Star: 1190,
    price4Star: 1750,
    imageUrl: '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
    mobileImage: '/images/tours/9-16/amazon-nutria-9-16.webp',
    desktopImage: '/images/tours/16-9/amazon-cuyabeno-16-9.webp',
    gallery: [
      '/images/tours/16-9/amazon-river-16-9.webp',
      '/images/tours/16-9/amazon-nutria-16-9.webp',
      '/images/tours/16-9/laguna-quilotoa-16-9.webp',
      '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
      '/images/tours/16-9/amazon-cuyabeno-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 26,
    category: {
      en: 'Andes & Amazon Expedition',
      es: 'ExpediciÃ³n Andes y AmazonÃ­a',
      fr: 'ExpÃ©dition Andes & Amazonie',
      de: 'Anden- & Amazonas-Expedition',
      it: 'Spedizione Ande e Amazzonia',
      pt: 'ExpediÃ§Ã£o Andes e AmazÃ´nia',
      ja: 'ã‚¢ãƒ³ãƒ‡ã‚¹ï¼†ã‚¢ãƒžã‚¾ãƒ³æŽ¢æ¤œ',
      zh: 'é›¨æž—æœ¨å±‹æ²‰æµ¸æŽ¢é™©'
    },
    description: {
      en: '7-day immersive journey uniting Quito colonial heritage, Equator line, Papallacta thermal springs, Tena jungle lodge, motorized canoe expeditions, Kichwa cultural encounter, and Paikawe Amazon reserve giant fish lagoon.',
      es: 'InmersiÃ³n de 7 dÃ­as entre el patrimonio histÃ³rico de Quito, relajaciÃ³n en Papallacta, expediciÃ³n en la selva de Tena y fauna de la Reserva Paikawe.',
      zh: '7æ—¥æ²‰æµ¸å¼æŽ¢é™©ï¼Œç»“åˆåŸºå¤šæ®–æ°‘æ–‡åŒ–é—äº§ã€èµ¤é“çº¿ã€å¸•å¸•äºšå…‹å¡”æ¸©æ³‰ã€ç‰¹çº³é›¨æž—æœ¨å±‹ã€åŠ¨åŠ›æœ¨èˆŸã€å¥‡ç“¦æ–‡åŒ–ä½“éªŒã€æ´¾å¡éŸ¦äºšé©¬é€Šä¿æŠ¤åŒºå·¨åž‹é±¼ç±»è§‚èµã€‚'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Mitad del Mundo', es: 'Centro HistÃ³rico de Quito y Mitad del Mundo', zh: 'åŸºå¤šåŽ†å²ä¸­å¿ƒä¸Žèµ¤é“çºªå¿µç¢‘' },
      { en: 'Papallacta Thermal Hot Springs in the Andes', es: 'Termas de Papallacta en los Andes', zh: 'å¸•å¸•äºšå…‹å¡”é«˜å±±æ¸©æ³‰' },
      { en: 'Tena Amazon Lodge & Motorized River Canoe', es: 'Lodge en Tena y Canoa Motorizada en el RÃ­o', zh: 'ç‰¹çº³é›¨æž—æœ¨å±‹ä¸ŽåŠ¨åŠ›æœ¨èˆŸ' },
      { en: 'Amazon Wildlife Rescue Center & Kichwa Culture', es: 'Centro de Rescate y Cultura Kichwa', zh: 'é‡Žç”ŸåŠ¨ç‰©ä¿æŠ¤ä¸­å¿ƒä¸Žå¥‡ç“¦æ–‡åŒ–' },
      { en: 'MisahuallÃ­ & Paikawe Giant Fish Reserve Lagoon', es: 'MisahuallÃ­ y Laguna de Peces Gigantes de Paikawe', zh: 'ç±³è¨ç“¦åˆ©ä¸Žæ´¾å¡éŸ¦å·¨é±¼ä¿æŠ¤åŒº' }
    ],
    inclusions: [
      { en: 'Airport reception and private transfers', es: 'RecepciÃ³n en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
      { en: 'Professional English-speaking guide', es: 'GuÃ­a profesional bilingÃ¼e' },
      { en: 'Accommodation (6 nights in 3* or 4* hotels / Amazon lodge)', es: 'Alojamiento (6 noches en hoteles 3â˜… o 4â˜… / Lodge amazÃ³nico)' },
      { en: 'Meals: Daily breakfast, plus lunch and dinner at Amazon lodge', es: 'Comidas: Desayunos diarios, almuerzo y cena en lodge' },
      { en: 'Entrances: La CompaÃ±Ã­a, IntiÃ±an, Papallacta, Rescue Center, Paikawe', es: 'Entradas: La CompaÃ±Ã­a, IntiÃ±an, Papallacta, Centro de Rescate, Paikawe' }
    ],
    exclusions: [
      { en: 'Personal expenses and services not specified in the program', es: 'Gastos personales y servicios no especificados' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito',
          es: 'DÃ­a 1 â€“ Llegada A Quito'
        },
        description: {
          en: 'Airport Transfer (IN): Welcome at Quito International Airport and private transfer to your hotel.',
          es: 'RecepciÃ³n en el Aeropuerto Internacional de Quito y traslado privado al hotel.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Quito City Tour & Equator Line',
          es: 'DÃ­a 2 â€“ City Tour En Quito Y LÃ­nea Ecuatorial'
        },
        description: {
          en: 'Quito was declared a UNESCO World Cultural Heritage Site in 1978 and is considered one of the most beautiful cities in the Americas.\n\nToday, we explore both the modern and historic areas of Quito. The historic center is renowned for its impressive churches, colonial architecture, and beautiful plazas.\n\nWe will visit the Cathedral, the Archbishopâ€™s Palace, and the Presidential Palace, all located around the main square, known as Plaza Grande. We will also visit La CompaÃ±Ã­a de JesÃºs, one of Quitoâ€™s most spectacular churches, famous for its richly decorated interior covered in gold leaf, as well as San Francisco Square and Church.\n\nWe then continue to the Middle of the World (Mitad del Mundo), where we visit the IntiÃ±an Museum, famous for its demonstrations and experiments related to the Equator. Here, you can experience the unique sensation of standing in the Northern and Southern Hemispheres at the same time.',
          es: 'Recorrido por las joyas coloniales de Quito: Catedral, Palacio de Carondelet, Iglesia de la CompaÃ±Ã­a de JesÃºs y Plaza San Francisco.\n\nVisita al Museo IntiÃ±an en la Mitad del Mundo para experimentar los fenÃ³menos fÃ­sicos de la lÃ­nea ecuatorial.'
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
          en: 'Day 3 â€“ Quito â€“ Papallacta â€“ Amazon Rainforest',
          es: 'DÃ­a 3 â€“ Quito â€“ Papallacta â€“ Selva AmazÃ³nica'
        },
        description: {
          en: 'We travel approximately two hours east of Quito along a historic route used by Spanish explorers in the 16th century in their search for gold and cinnamon. This expedition eventually led to the discovery of the Amazon River.\n\nAlong the way, we pass by the historic GuÃ¡pulo Church and cross the Andes at approximately 4,100 meters (13,451 ft) above sea level. The route passes between two ecological reserves before descending toward the transition zone between the Andes and the Ecuadorian Amazon.\n\nWe stop at the famous Papallacta Hot Springs, where you can choose from several activities: relax in thermal pools with different temperatures while enjoying spectacular views of Antisana Volcano (5,704 m / 18,714 ft), enjoy some relaxing time at the spa, or explore the walking trails around the area.\n\nWe then continue our descent toward the Amazon Rainforest.',
          es: 'Cruce de los Andes a 4,100 m y relax en las Termas de Papallacta con vista al Antisana. Descenso a la AmazonÃ­a hasta llegar a nuestro lodge en Tena.'
        },
        image: '/images/tours/16-9/papallacta-laguna-16-9.webp',
        accommodation: { en: 'Tena Lodge', es: 'Tena Lodge' },
        activity: { en: '6-hour guided tour; descent from 4,000m to 500m; 1-hour hike', es: 'Tour de 6 horas y caminata de 1 hora' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ Tena & Amazon Rainforest',
          es: 'DÃ­a 4 â€“ Tena Y Selva AmazÃ³nica'
        },
        description: {
          en: 'In the morning, we board a motorized canoe and travel downstream to visit an Amazon Rainforest wildlife rescue center, where we will learn about local wildlife and conservation efforts.\n\nWe then have the opportunity to explore primary rainforest on foot, accompanied by a knowledgeable local guide. During the hike, we will discover the incredible biodiversity of the Amazon and learn about the rainforest ecosystem.\n\nWe will also visit a local Kichwa family and learn about their traditions, culture, and daily way of life.\n\nFinally, we visit a caiman lagoon, where we can observe these fascinating Amazonian reptiles in their natural environment.\n\nReturn to the lodge and overnight stay.',
          es: 'Canoa por el rÃ­o amazÃ³nico, visita al centro de rescate de fauna, caminata por la selva primaria, encuentro cultural con una familia Kichwa y laguna de caimanes.'
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
          en: 'Day 5 â€“ MisahuallÃ­ â€“ Paikawe Reserve â€“ Quito',
          es: 'DÃ­a 5 â€“ MisahuallÃ­ â€“ Reserva Paikawe â€“ Quito'
        },
        description: {
          en: 'In the morning, we visit Paikawe Reserve, where we have the opportunity to hike through primary rainforest and explore the lagoon by boat.\n\nDuring the visit, we can observe the impressive giant fish of the Amazon and discover the extraordinary biodiversity of this tropical environment.\n\nAfter the visit, we begin our return journey to Quito.',
          es: 'Visita a la Reserva Paikawe con caminata en selva y navegaciÃ³n en canoa para observar los peces gigantes del Amazonas (Paiche/Arapaima). Retorno a Quito.'
        },
        image: '/images/tours/16-9/amazon-nutria-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 1-hour rainforest hike (500m alt.)', es: 'Tour de 6 horas y caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Free Day In Quito',
          es: 'DÃ­a 6 â€“ DÃ­a Libre En Quito'
        },
        description: {
          en: 'Enjoy a free day to relax, explore Quito independently, or discover more of the cityâ€™s cultural and historical attractions.',
          es: 'DÃ­a libre en Quito para recorrer sus museos, gastronomÃ­a o descansar.'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 â€“ Transfer To The Airport',
          es: 'DÃ­a 7 â€“ Traslado Al Aeropuerto'
        },
        description: {
          en: 'Private transfer to the airport for your onward flight connections to the GalÃ¡pagos Islands.\n\nEnd of the tour.',
          es: 'Traslado privado al aeropuerto para su vuelo de conexiÃ³n o retorno internacional.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
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
      es: 'Nieve, Volcanes Y Manantiales: ExpediciÃ³n Andina',
      fr: 'ExpÃ©dition sur l\'Avenue des Volcans',
      de: 'Expedition auf der StraÃŸe der Vulkane',
      it: 'Spedizione lungo il Viale dei Vulcani',
      pt: 'ExpediÃ§Ã£o pela Avenida dos VulcÃµes',
      ja: 'ç«å±±é€šã‚Šã®æŽ¢æ¤œ',
      zh: 'ç«å±±å¤§é“æŽ¢é™©ä¹‹æ—…'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '6 DAYS / 5 NIGHTS',
      es: '6 DÃAS / 5 NOCHES',
      fr: '6 JOURS / 5 NUITS',
      de: '6 TAGE / 5 NÃ„CHTE',
      it: '6 GIORNI / 5 NOTTI',
      pt: '6 DIAS / 5 NOITES',
      ja: '6æ—¥é–“ / 5æ³Š',
      zh: '6å¤© / 5æ™š'
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
      de: 'Anden-Highlights & WasserfÃ¤lle',
      it: 'Meraviglie Andine e Cascate',
      pt: 'Destaques Andinos e Cachoeiras',
      ja: 'ã‚¢ãƒ³ãƒ‡ã‚¹çµ¶æ™¯ã¨æ»å·¡ã‚Š',
      zh: 'å®‰ç¬¬æ–¯å±±è„‰ä¸Žç€‘å¸ƒé€Ÿè§ˆ'
    },
    description: {
      en: '6-day overland journey traversing the Avenue of the Volcanoes, adventure town of BaÃ±os, PailÃ³n del Diablo (Devil\'s Cauldron) waterfall, Pastaza canyon, Puyo rainforest biopark, and Quilotoa turquoise crater lake.',
      es: 'Recorrido de 6 dÃ­as por la Avenida de los Volcanes, BaÃ±os de Agua Santa, la cascada PailÃ³n del Diablo, bioparque en Puyo y el crÃ¡ter Quilotoa.',
      zh: '6æ—¥é™†åœ°æ™¯è§‚ä¹‹æ—…ï¼Œæ²¿ç€ç«å±±å¤§é“å‰è¿›ï¼Œæ¸¸è§ˆå†’é™©å°é•‡å·´å°¼å¥¥æ–¯ã€æ¶é­”ä¹‹å’½ç€‘å¸ƒã€å¸•æ–¯å¡”è¨å³¡è°·ã€æ™®çº¦é›¨æž—å…¬å›­ä¸ŽåŸºæ´›æ‰˜é˜¿ç¿¡ç¿ ç«å±±æ¹–ã€‚'
    },
    highlights: [
      { en: 'Avenue of the Volcanoes & BaÃ±os de Agua Santa', es: 'Avenida de los Volcanes y BaÃ±os de Agua Santa', zh: 'ç«å±±å¤§é“ä¸Žå·´å°¼å¥¥æ–¯å°é•‡' },
      { en: 'PailÃ³n del Diablo (Devil\'s Cauldron) Mega Waterfall Hike', es: 'Caminata a la Cascada PailÃ³n del Diablo (Devil\'s Cauldron)', zh: 'æ¶é­”ä¹‹å’½ç€‘å¸ƒå¾’æ­¥' },
      { en: 'Puyo Amazon Rainforest & Yanacocha Biopark', es: 'Selva de Puyo y Bioparque Yanacocha', zh: 'æ™®çº¦é›¨æž—ä¸Žäºšçº³ç§‘æŸ¥ç”Ÿç‰©å…¬å›­' },
      { en: 'Hola Vida Waterfall & Kichwa Community', es: 'Cascada Hola Vida y comunidad Kichwa', zh: 'å¥¥æ‹‰ç»´è¾¾ç€‘å¸ƒä¸Žå¥‡ç“¦æ–‡åŒ–' },
      { en: 'Quilotoa Emerald Crater Lake & Tigua Art', es: 'Laguna de Quilotoa y Pinturas de Tigua', zh: 'åŸºæ´›æ‰˜é˜¿ç¿¡ç¿ ç«å±±æ¹–' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
      { en: 'Professional English-speaking guide', es: 'GuÃ­a profesional bilingÃ¼e' },
      { en: 'Accommodation (5 nights in 3* or 4* hotels)', es: 'Alojamiento (5 noches en hoteles 3â˜… o 4â˜…)' },
      { en: 'Daily breakfast and specified lunch in Puyo', es: 'Desayunos diarios y almuerzo incluido en Puyo' },
      { en: 'Entrances: PailÃ³n del Diablo (Devil\'s Cauldron), Yanacocha, Hola Vida, Quilotoa', es: 'Entradas: PailÃ³n del Diablo (Devil\'s Cauldron), Yanacocha, Hola Vida, Quilotoa' }
    ],
    exclusions: [
      { en: 'Personal expenses and optional activities in BaÃ±os', es: 'Gastos personales y actividades opcionales en BaÃ±os' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito',
          es: 'DÃ­a 1 â€“ Llegada A Quito'
        },
        description: {
          en: 'Airport assistance and private transfer to your hotel.\n\nDeparture: The tour can begin on any day of the week.',
          es: 'Asistencia en aeropuerto y traslado privado al hotel en Quito.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Quito â€“ BaÃ±os',
          es: 'DÃ­a 2 â€“ Quito â€“ BaÃ±os'
        },
        description: {
          en: 'Today, we travel south along the Pan-American Highway and through Ecuadorâ€™s famous â€œAvenue of the Volcanoes,â€ home to approximately 62 volcanoes.\n\nWe continue toward BaÃ±os, a charming tourist town located at the foothills of the active Tungurahua Volcano. Surrounded by spectacular landscapes between the Amazon Rainforest and the Andes Mountains, BaÃ±os offers a wide variety of optional activities, including cycling, rafting, horseback riding, cable-car rides, hiking, and visits to beautiful waterfalls.\n\nWe will visit the spectacular PailÃ³n del Diablo (Devil\'s Cauldron) Waterfall, one of the regionâ€™s most impressive natural attractions.',
          es: 'Viaje hacia el sur por la Avenida de los Volcanes hacia BaÃ±os de Agua Santa, al pie del volcÃ¡n Tungurahua. Visita y caminata a la majestuosa cascada PailÃ³n del Diablo (Devil\'s Cauldron).'
        },
        image: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
        accommodation: { en: 'BaÃ±os', es: 'BaÃ±os' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 â€“ BaÃ±os â€“ Amazon Rainforest â€“ Puyo',
          es: 'DÃ­a 3 â€“ BaÃ±os â€“ Selva AmazÃ³nica â€“ Puyo'
        },
        description: {
          en: 'In the morning, we head into the Amazon Rainforest, traveling through the spectacular Pastaza River Canyon toward the city of Puyo.\n\nOur first stop is Yanacocha Biopark, where you will have the opportunity to observe and learn about local animal species that have been rescued from illegal wildlife trafficking.\n\nWe then continue with a hike through the Amazon Rainforest to Hola Vida Waterfall, surrounded by lush vegetation and tropical scenery.\n\nFinally, we visit a local Indigenous family, where we will have the opportunity to learn about their traditions, culture, and way of life.\n\nAfter the visit, we return to BaÃ±os.',
          es: 'Viaje por el CaÃ±Ã³n del Pastaza hacia Puyo. Visita al Bioparque Yanacocha de rescate de fauna, caminata por la selva a la Cascada Hola Vida y visita a una familia indÃ­gena Kichwa.'
        },
        image: '/images/tours/16-9/puyo-yanacocha-16-9.webp',
        accommodation: { en: 'BaÃ±os', es: 'BaÃ±os' },
        activity: { en: '6-hour guided tour + 2-hour rainforest hike', es: 'Tour de 6h + caminata en selva de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ BaÃ±os â€“ Quilotoa â€“ Quito',
          es: 'DÃ­a 4 â€“ BaÃ±os â€“ Quilotoa â€“ Quito'
        },
        description: {
          en: 'In the morning, we begin our journey back to Quito. Along the way, we visit the spectacular Quilotoa Crater Lake, one of Ecuadorâ€™s most iconic natural attractions, famous for its striking turquoise waters and breathtaking Andean scenery.\n\nYou will have the opportunity to hike approximately two hours toward the bottom of the crater. Along the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings and Andean artistic traditions, as well as local guinea pig farms.\n\nWe then continue to Quito.',
          es: 'Viaje al crÃ¡ter volcÃ¡nico de Quilotoa con caminata hacia la laguna turquesa. Parada en los talleres de pintura de Tigua y retorno a Quito.'
        },
        image: '/images/tours/16-9/laguna-quilotoa-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,483 ft)', es: 'Tour de 6h + caminata de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Free Day In Quito',
          es: 'DÃ­a 5 â€“ DÃ­a Libre En Quito'
        },
        description: {
          en: 'Enjoy a free day to explore Quito at your own pace, relax, or discover more of the cityâ€™s attractions and cultural highlights.',
          es: 'DÃ­a libre en Quito para recorrer a su propio ritmo.'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Transfer To The Airport',
          es: 'DÃ­a 6 â€“ Traslado Al Aeropuerto'
        },
        description: {
          en: 'Private transfer to the airport for your onward flight connections, including connections to the GalÃ¡pagos Islands.\n\nEnd of the tour.',
          es: 'Traslado privado al aeropuerto para su vuelo de conexiÃ³n o salida.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
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
      es: 'Ecuador FantÃ¡stico: La Gran Ruta De Los Andes',
      fr: 'Ã‰quateur Fantastique: Le Circuit Complet',
      de: 'Fantastisches Ecuador: Die komplette Route',
      it: 'Ecuador Fantastico: Il Circuito Completo',
      pt: 'Equador FantÃ¡stico: O Circuito Completo',
      ja: 'ç´ æ™´ã‚‰ã—ã„ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ï¼šå®Œå…¨ãªå‘¨éŠ',
      zh: 'å¥‡å¦™åŽ„ç“œå¤šå°”ï¼šå…¨æ™¯çŽ¯çº¿æ¸¸'
    },
    destination: 'Mainland Ecuador',
    duration: {
      en: '8 DAYS / 7 NIGHTS',
      es: '8 DÃAS / 7 NOCHES',
      fr: '8 JOURS / 7 NUITS',
      de: '8 TAGE / 7 NÃ„CHTE',
      it: '8 GIORNI / 7 NOTTI',
      pt: '8 DIAS / 7 NOITES',
      ja: '8æ—¥é–“ / 7æ³Š',
      zh: '8å¤© / 7æ™š'
    },
    durationDays: 8,
    price: 1490,
    price3Star: 1490,
    price4Star: 2090,
    imageUrl: '/images/tours/16-9/quito-colonial-16-9.webp',
    mobileImage: '/images/tours/9-16/quito-centro-historico.webp',
    desktopImage: '/images/tours/16-9/quito-colonial-16-9.webp',
    gallery: [
      '/images/tours/16-9/quito-colonial-16-9.webp',
      '/images/tours/16-9/otavalo-market-16-9.webp',
      '/images/tours/16-9/mitad-del-mundo-16-9.webp',
      '/images/tours/16-9/pailon-del-diablo-16-9.webp',
      '/images/tours/16-9/chimborazo-volcano-16-9.webp',
      '/images/tours/16-9/cuenca-colonial-16-9.webp',
      '/images/tours/16-9/parque-nacional-el-cajas-16-9.webp'
    ],
    rating: 5,
    reviewsCount: 45,
    isPopular: true,
    category: {
      en: 'Grand Mainland Expedition',
      es: 'Gran ExpediciÃ³n Continental',
      fr: "Grande expÃ©dition Ã©quatorienne",
      de: 'GroÃŸe Festland-Expedition',
      it: 'Grande Spedizione Continentale',
      pt: 'Grande ExpediÃ§Ã£o Continental',
      ja: 'ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ç¸¦æ–­ã‚°ãƒ©ãƒ³ãƒ‰ãƒ„ã‚¢ãƒ¼',
      zh: 'åŽ„ç“œå¤šå°”é™†åœ°æ——èˆ°çºµè´¯çº¿'
    },
    description: {
      en: 'Discover the Best of Ecuador in 8 Days: Quito Historic Center, Otavalo market, Cuicocha lake, Mitad del Mundo, BaÃ±os waterfalls & PailÃ³n del Diablo (Devil\'s Cauldron), Chimborazo Volcano (6,310m), Ingapirca Inca ruins, Colonial Cuenca, Cajas National Park lakes, and finishing in coastal Guayaquil.',
      es: 'El gran circuito ecuatoriano de 8 dÃ­as: Quito colonial, mercado de Otavalo, cascadas de BaÃ±os, Chimborazo, Ingapirca, Cuenca colonial y Guayaquil.',
      zh: '8æ—¥åŽ„ç“œå¤šå°”é™†åœ°æ——èˆ°æŽ¢é™©ï¼Œè¿žæŽ¥åŸºå¤šã€å¥¥å¡”ç“¦æ´›å°ç¬¬å®‰é›†å¸‚ã€åº“ä¼Šç§‘æŸ¥æ¹–ã€å·´å°¼å¥¥æ–¯æ¶é­”ä¹‹å’½ã€é’¦åšæ‹‰ç´¢ç«å±±ï¼ˆ6310ç±³ï¼‰ã€å› åŠ çš®å°”å¡å°åŠ é—å€ã€æ˜†å¡ä¸–ç•Œé—äº§åŸŽã€å¡å“ˆæ–¯å›½å®¶å…¬å›­ä¸Žç“œäºšåŸºå°”æ¸¯ã€‚'
    },
    highlights: [
      { en: 'Otavalo Artisan Market & Cuicocha Crater Lake', es: 'Mercado de Otavalo y Laguna de Cuicocha', zh: 'å¥¥å¡”ç“¦æ´›é›†å¸‚ä¸Žåº“ä¼Šç§‘æŸ¥ç«å±±æ¹–' },
      { en: 'Quito UNESCO Historic Center & Equator Monument', es: 'Centro HistÃ³rico de Quito y Mitad del Mundo', zh: 'åŸºå¤šåŽ†å²ä¸­å¿ƒä¸Žèµ¤é“çºªå¿µç¢‘' },
      { en: 'BaÃ±os de Agua Santa & PailÃ³n del Diablo (Devil\'s Cauldron) Waterfall', es: 'BaÃ±os y Cascada PailÃ³n del Diablo (Devil\'s Cauldron)', zh: 'å·´å°¼å¥¥æ–¯ä¸Žæ¶é­”ä¹‹å’½ç€‘å¸ƒ' },
      { en: 'Chimborazo National Reserve (6,310m)', es: 'Reserva Nacional Chimborazo (6,310 m)', zh: 'é’¦åšæ‹‰ç´¢ç«å±±ä¿æŠ¤åŒºï¼ˆ6310ç±³ï¼‰' },
      { en: 'Ingapirca Inca Archaeological Complex & Cuenca City', es: 'Complejo ArqueolÃ³gico Ingapirca y Ciudad de Cuenca', zh: 'å› åŠ çš®å°”å¡å°åŠ é—å€ä¸Žæ˜†å¡å¤åŸŽ' },
      { en: 'Cajas National Park Lakes & Guayaquil Port', es: 'Parque Nacional Cajas y Puerto de Guayaquil', zh: 'å¡å“ˆæ–¯å›½å®¶å…¬å›­ä¸Žç“œäºšåŸºå°”æ¸¯' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout the itinerary', es: 'Transporte privado durante todo el itinerario' },
      { en: 'Professional English-speaking guide', es: 'GuÃ­a profesional bilingÃ¼e' },
      { en: '7 nights of accommodation (3* or 4* hotels)', es: '7 noches de alojamiento (hoteles 3â˜… o 4â˜…)' },
      { en: 'Daily breakfast', es: 'Desayunos diarios' },
      { en: 'Entrance fees: Cuicocha, La CompaÃ±Ã­a, IntiÃ±an, PailÃ³n del Diablo (Devil\'s Cauldron), Chimborazo, Ingapirca, Cajas', es: 'Entradas: Cuicocha, La CompaÃ±Ã­a, IntiÃ±an, PailÃ³n del Diablo (Devil\'s Cauldron), Chimborazo, Ingapirca, Cajas' }
    ],
    exclusions: [
      { en: 'Meals not specified', es: 'Comidas no especificadas' },
      { en: 'Personal expenses and optional activities', es: 'Gastos personales y actividades opcionales' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito',
          es: 'DÃ­a 1 â€“ Llegada A Quito'
        },
        description: {
          en: 'Airport assistance and private transfer to your hotel.\n\nImportant: Ecuador uses the US dollar (USD) as its official currency. We recommend carrying small-denomination bills, as larger notes may not always be accepted.',
          es: 'RecepciÃ³n en el Aeropuerto de Quito y traslado privado a su hotel.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Otavalo Artisan Market & Cuicocha Crater Lake',
          es: 'DÃ­a 2 â€“ Plaza de Ponchos (Mercado Artesanal) De Otavalo Y Laguna De Cuicocha'
        },
        description: {
          en: 'Travel north from Quito for approximately two hours through beautiful Andean landscapes and scenic viewpoints until reaching Otavalo, home to one of the most famous Artisan Markets in South America, renowned for its traditional handicrafts, textiles and local products.\n\nIn the afternoon, continue to Cotacachi, a town famous for its high-quality leather goods and traditional craftsmanship.\n\nWe will then visit Cuicocha Crater Lake, one of Ecuadorâ€™s most spectacular volcanic lakes, located inside a breathtaking Andean landscape.\n\nReturn to Quito in the afternoon.\n\nMarket information: The largest and most vibrant Otavalo market takes place on Saturdays, although a smaller market operates daily.',
          es: 'Viaje hacia Otavalo y su mundialmente famoso mercado artesanal en la Plaza de los Ponchos. Parada en Cotacachi para artesanÃ­as de cuero y visita a la impresionante Laguna volcÃ¡nica de Cuicocha. Retorno a Quito.'
        },
        image: '/images/tours/16-9/otavalo-market-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'VehÃ­culo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 â€“ Quito Historic Center & Mitad Del Mundo',
          es: 'DÃ­a 3 â€“ Centro HistÃ³rico De Quito Y Mitad Del Mundo'
        },
        description: {
          en: 'Discover Quito, declared a UNESCO World Heritage Site and considered one of the most beautiful historic cities in the Americas.\n\nExplore both the modern and colonial areas of the city, including its magnificent churches, plazas and historic buildings: Quito Cathedral, Archbishopâ€™s Palace, Presidential Palace, Plaza Grande, La CompaÃ±Ã­a de JesÃºs Church (famous for its richly decorated golden interior), and San Francisco Plaza and Church.\n\nWe will then travel to Mitad del Mundo (Middle of the World), where you can experience standing on the Equator between the Northern and Southern Hemispheres. Visit the IntiÃ±an Museum, known for its interactive demonstrations and fascinating exhibits related to Ecuadorian culture and the Equator.',
          es: 'Recorrido por el Centro HistÃ³rico de Quito (Patrimonio UNESCO): Catedral, Palacio Presidencial, Plaza Grande, La CompaÃ±Ã­a de JesÃºs y San Francisco. Traslado a la Mitad del Mundo y Museo IntiÃ±an.'
        },
        image: '/images/tours/16-9/mitad-del-mundo-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour', es: 'Tour guiado de 6 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'VehÃ­culo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ Quito â€“ BaÃ±os: The Avenue Of Volcanoes',
          es: 'DÃ­a 4 â€“ Quito â€“ BaÃ±os: La Avenida De Los Volcanes'
        },
        description: {
          en: 'Travel south from Quito along the famous Avenue of the Volcanoes, a spectacular Andean route surrounded by Ecuadorâ€™s impressive volcanic landscapes.\n\nContinue to BaÃ±os de Agua Santa, a picturesque adventure town located at the foot of the active Tungurahua Volcano. BaÃ±os offers a wide range of optional activities, including cycling, rafting, hiking to waterfalls, cable-car rides, and horseback riding.\n\nLocated between the Andes and the Amazon basin, BaÃ±os is surrounded by lush vegetation, dramatic mountains and spectacular waterfalls. Visit the famous PailÃ³n del Diablo (Devil\'s Cauldron) Waterfall before settling into your hotel.',
          es: 'Viaje por la Avenida de los Volcanes hacia BaÃ±os de Agua Santa, al pie del volcÃ¡n Tungurahua. Visita a la imponente cascada PailÃ³n del Diablo (Devil\'s Cauldron) y noche en BaÃ±os.'
        },
        image: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
        accommodation: { en: 'BaÃ±os', es: 'BaÃ±os' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'VehÃ­culo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Chimborazo National Reserve, Ingapirca & Cuenca',
          es: 'DÃ­a 5 â€“ Reserva Chimborazo, Ingapirca Y Cuenca'
        },
        description: {
          en: 'Start early with a visit to the Chimborazo Reserve, home to Chimborazo Volcano, Ecuadorâ€™s highest mountain at approximately 6,310 meters (20,700 ft) above sea level.\n\nEnjoy the opportunity to observe the unique flora and fauna of the high Andean pÃ¡ramo and hike toward the mountain refuge at approximately 5,000 meters (16,400 ft), weather and conditions permitting.\n\nContinue toward Cuenca, with a fascinating stop at Ingapirca, Ecuadorâ€™s most important Inca archaeological complex.',
          es: 'Ascenso a la Reserva Chimborazo (6,310 m), la montaÃ±a mÃ¡s alta del Ecuador y el punto mÃ¡s cercano al Sol. Caminata hacia el refugio a 5,000 m. ContinuaciÃ³n a Ingapirca, el complejo arqueolÃ³gico inca mÃ¡s importante del paÃ­s, y llegada a Cuenca.'
        },
        image: '/images/tours/16-9/chimborazo-volcano-16-9.webp',
        accommodation: { en: 'Cuenca', es: 'Cuenca' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'VehÃ­culo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Cuenca City Tour',
          es: 'DÃ­a 6 â€“ City Tour En Cuenca'
        },
        description: {
          en: 'Discover Cuenca, another UNESCO World Heritage Site and one of Ecuadorâ€™s most beautiful cities, famous for its charming streets, historic buildings, plazas and churches.\n\nVisit: Cuenca Cathedral, Plaza de las Flores, a traditional toquilla straw hat workshop (Panama hats), El Barranco along the Tomebamba River, and modern Cuenca. Finish the tour at El Turi Viewpoint, offering panoramic views over the city.\n\nThe remainder of the afternoon is free for you to explore Cuenca at your own pace.',
          es: 'City tour en Cuenca (Patrimonio UNESCO): Catedral Nueva, Plaza de las Flores, fÃ¡brica de sombreros de paja toquilla, El Barranco del RÃ­o Tomebamba y Mirador de Turi. Tarde libre.'
        },
        image: '/images/tours/16-9/cuenca-colonial-16-9.webp',
        accommodation: { en: 'Cuenca', es: 'Cuenca' },
        activity: { en: '3-hour guided tour', es: 'Tour guiado de 3 horas' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'VehÃ­culo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 â€“ Cuenca â€“ Cajas National Park â€“ Guayaquil',
          es: 'DÃ­a 7 â€“ Cuenca â€“ Parque Nacional Cajas â€“ Guayaquil'
        },
        description: {
          en: 'Depart Cuenca and travel west through the spectacular Cajas National Park, famous for its rugged Andean landscapes and approximately 200 natural lakes and lagoons.\n\nDepending on weather and trail conditions, enjoy a hike around Laguna Toreadora, while observing the distinctive flora and fauna of Ecuadorâ€™s high-altitude pÃ¡ramo ecosystem.\n\nFrom the high Andes, the road then descends dramatically toward sea level, arriving in Guayaquil, Ecuadorâ€™s largest port city and economic capital.',
          es: 'Cruce del Parque Nacional Cajas con mÃ¡s de 200 lagunas glaciares. Caminata alrededor de la Laguna Toreadora y descenso panorÃ¡mico desde los Andes hasta la ciudad costera de Guayaquil.'
        },
        image: '/images/tours/16-9/parque-nacional-el-cajas-16-9.webp',
        accommodation: { en: 'Guayaquil', es: 'Guayaquil' },
        activity: { en: '6-hour guided tour, including 2h hike (up to 3,500m)', es: 'Tour guiado de 6h con caminata de 2h' },
        transportation: { en: 'Private vehicle (4x4 or tourist bus)', es: 'VehÃ­culo privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 â€“ Departure From Guayaquil',
          es: 'DÃ­a 8 â€“ Salida Desde Guayaquil'
        },
        description: {
          en: 'Private transfer to JosÃ© JoaquÃ­n de Olmedo International Airport in Guayaquil for your onward flight or connection to the GalÃ¡pagos Islands.\n\nEnd of the Ecuador Fantastic journey.',
          es: 'Traslado privado al Aeropuerto Internacional JosÃ© JoaquÃ­n de Olmedo en Guayaquil para su vuelo internacional o conexiÃ³n a GalÃ¡pagos. Fin del viaje.'
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
      es: 'De Los Andes Al Encanto De GalÃ¡pagos',
      fr: 'L\'OdyssÃ©e Ultime: Ã‰quateur et GalÃ¡pagos',
      de: 'Die ultimative Ecuador & Galapagos Odyssee',
      it: 'L\'Odissea Definitiva: Ecuador e Galapagos',
      pt: 'A OdissÃ©ia Definitiva: Equador e GalÃ¡pagos',
      ja: 'ç©¶æ¥µã®ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ï¼†ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹ã®æ—…',
      zh: 'åŽ„ç“œå¤šå°”ä¸ŽåŠ æ‹‰å¸•æˆˆæ–¯ç»ˆæžå¥¥å¾·èµ›'
    },
    destination: 'Ecuador & Galapagos',
    duration: {
      en: '12 DAYS / 11 NIGHTS',
      es: '12 DÃAS / 11 NOCHES',
      fr: '12 JOURS / 11 NUITS',
      de: '12 TAGE / 11 NÃ„CHTE',
      it: '12 GIORNI / 11 NOTTI',
      pt: '12 DIAS / 11 NOITES',
      ja: '12æ—¥é–“ / 11æ³Š',
      zh: '12å¤© / 11æ™š'
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
      '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
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
      es: 'ExpediciÃ³n Suprema Continente y GalÃ¡pagos',
      fr: "Ultime combinÃ© Ã‰quateur et Galapagos",
      de: 'Ultimative Ecuador & Galapagos Expedition',
      it: 'Spedizione Suprema Continente e Galapagos',
      pt: 'ExpediÃ§Ã£o Suprema Equador e GalÃ¡pagos',
      ja: 'ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ï¼†ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è‡³é«˜ã®æ—…',
      zh: 'å¤§é™†é›¨æž—ä¸Žæµ·å²›å·…å³°12æ—¥æ¸¸'
    },
    description: {
      en: '12-day flagship expedition: Quito colonial city & Equator, Papallacta thermal springs, Tena Amazon lodge with motorized canoe & caiman lagoon, Paikawe giant fish reserve, Santa Cruz highlands & giant tortoises, Isabela Island flamingo lagoon & Tintoreras snorkeling, Las Grietas, and full-day yacht cruise to Santa Fe or PinzÃ³n Island.',
      es: 'ExpediciÃ³n insignia de 12 dÃ­as: combina Quito colonial y AmazonÃ­a de Tena con 6 dÃ­as de exploraciÃ³n insular, fauna y playas en GalÃ¡pagos.',
      zh: '12æ—¥é¡¶çº§å¥¢åŽè”åˆæŽ¢é™©ï¼Œæ¶µç›–åŸºå¤šåŽ†å²ååŸŽã€èµ¤é“çº¿ã€å¸•å¸•äºšå…‹å¡”æ¸©æ³‰ã€ç‰¹çº³äºšé©¬é€Šæœ¨å±‹ã€æ´¾å¡éŸ¦ä¿æŠ¤åŒºå·¨é±¼ã€åŠ æ‹‰å¸•æˆˆæ–¯åœ£å…‹é²æ–¯ã€ä¼ŠèŽŽè´æ‹‰å²›ã€è’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤ã€æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯åŠåœ£è²å²›/å¹³æ¾å²›å…¨å¤©æ¸¸è‰‡å·¡èˆªã€‚'
    },
    highlights: [
      { en: 'Quito UNESCO Historic Center & Equator Line', es: 'Centro HistÃ³rico de Quito y Mitad del Mundo', zh: 'åŸºå¤šåŽ†å²ä¸­å¿ƒä¸Žèµ¤é“çºªå¿µç¢‘' },
      { en: 'Papallacta Thermal Hot Springs & Antisana Views', es: 'Termas de Papallacta y Vistas del Antisana', zh: 'å¸•å¸•äºšå…‹å¡”é«˜å±±æ¸©æ³‰' },
      { en: 'Tena Amazon Lodge, Canoe & Caiman Lagoon', es: 'Lodge en Tena, Canoa y Laguna de Caimanes', zh: 'ç‰¹çº³äºšé©¬é€Šé›¨æž—æœ¨å±‹ä¸Žæœ¨èˆŸ' },
      { en: 'Paikawe Amazon Reserve & Giant Fish Lagoon', es: 'Reserva Paikawe y Peces Gigantes del Amazonas', zh: 'æ´¾å¡éŸ¦ä¿æŠ¤åŒºä¸Žå·¨åž‹é±¼ç±»æ³»æ¹–' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: 'åœ£å…‹é²æ–¯é«˜åœ°ä¸Žå·¨é¾Ÿä¿æŠ¤åŒº' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna de Flamingos y Tintoreras', zh: 'ä¼ŠèŽŽè´æ‹‰å²›ä¸Žè’‚æ©æ‰˜é›·æ‹‰æ–¯çŸ³ç¤' },
      { en: 'Full-Day Yacht Cruise to Santa Fe or PinzÃ³n Island', es: 'NavegaciÃ³n en Yate a Isla Santa Fe o PinzÃ³n', zh: 'åœ£è²å²›æˆ–å¹³æ¾å²›å…¨å¤©æ¸¸è‰‡å·¡èˆª' }
    ],
    inclusions: [
      { en: 'Airport assistance and all private transfers', es: 'Asistencia en aeropuertos y traslados privados' },
      { en: 'Private transportation on mainland and GalÃ¡pagos transfers', es: 'Transporte privado en continente y traslados en GalÃ¡pagos' },
      { en: 'Plane Ticket (Quito â€“ Baltra â€“ Quito)', es: 'Boleto aÃ©reo Quito â€“ Baltra â€“ Quito' },
      { en: 'Professional English-speaking guides and Level III Naturalists', es: 'GuÃ­as profesionales y Naturalistas Nivel III' },
      { en: '11 nights accommodation (hotels 3* or 4* / Amazon lodge / GalÃ¡pagos hotels)', es: '11 noches de alojamiento (hoteles 3â˜… o 4â˜… / Lodge amazÃ³nico / Hoteles GalÃ¡pagos)' },
      { en: 'Daily breakfast, lunches and dinners as specified', es: 'Desayunos diarios, almuerzos y cenas segÃºn itinerario' },
      { en: 'Snorkeling equipment for organized boat excursions', es: 'Equipo de snorkel para excursiones en barco' },
      { en: 'All entrance fees: La CompaÃ±Ã­a, IntiÃ±an, Papallacta, Paikawe, GalÃ¡pagos sites', es: 'Todas las entradas segÃºn programa' }
    ],
    exclusions: [
      { en: 'GalÃ¡pagos National Park entrance fee: USD 200.00 foreign / USD 6.00 national', es: 'Entrada al Parque Nacional GalÃ¡pagos: USD 200.00 extranjeros / USD 6.00 nacionales' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de TrÃ¡nsito (TCT): USD 20.00' },
      { en: 'Dinners in GalÃ¡pagos', es: 'Cenas en GalÃ¡pagos' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito | Airport Assistance & Hotel Transfer',
          es: 'DÃ­a 1 â€“ Llegada A Quito | Asistencia En Aeropuerto Y Traslado'
        },
        description: {
          en: 'Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.',
          es: 'Llegada al Aeropuerto de Quito, bienvenida por nuestro representante y traslado privado al hotel. Tiempo libre para descansar y aclimatarse.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transfer', es: 'Traslado privado' },
        meals: { en: 'Not included', es: 'No incluidas' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Quito City Tour & Mitad Del Mundo',
          es: 'DÃ­a 2 â€“ City Tour En Quito Y Mitad Del Mundo'
        },
        description: {
          en: 'After breakfast, we will explore Quito, the capital of Ecuador and one of the country\'s most important cultural destinations. The city was declared a UNESCO World Heritage Site in 1978 and is renowned for its beautifully preserved historic center, colonial architecture and spectacular Andean setting.\n\nOur city tour will include both the modern and historic areas of Quito. In the historic center, we will visit some of the city\'s most important landmarks, including Plaza Grande, where we will see the Metropolitan Cathedral, the Archbishop\'s Palace and the Presidential Palace.\n\nWe will continue to the impressive Church of La CompaÃ±Ã­a de JesÃºs, famous for its richly decorated interior covered with gold leaf. We will also visit San Francisco Square and Church, one of the most iconic architectural complexes in Quito.\n\nAfter exploring the historic center, we will continue towards the Equator Monument and Mitad del Mundo. Here, we will visit the IntiÃ±an Museum, where you can learn about indigenous cultures and participate in a variety of fascinating experiments related to the Equator.\n\nYou will have the opportunity to experience the unique sensation of standing at the Equator, where the Northern and Southern Hemispheres meet.',
          es: 'City tour completo por Quito colonial: Plaza Grande, Catedral, Palacio de Carondelet, Iglesia de la CompaÃ±Ã­a de JesÃºs y San Francisco. Traslado a la Mitad del Mundo y Museo IntiÃ±an.'
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
          en: 'Day 3 â€“ Quito â€“ Papallacta â€“ Tena | Andean Highlands & Thermal Springs',
          es: 'DÃ­a 3 â€“ Quito â€“ Papallacta â€“ Tena | Termas Y PÃ¡ramo Andino'
        },
        description: {
          en: 'After breakfast, we will travel east from Quito towards Papallacta, following a historic route once used by Spanish explorers in the 16th century in their search for gold and cinnamon, eventually leading towards the discovery and exploration of the Amazon region.\n\nAlong the way, we will pass by GuÃ¡pulo Church and continue through the spectacular Andean mountains, reaching elevations of approximately 4,100 meters / 13,450 feet above sea level.\n\nThe route passes through protected natural areas and offers impressive views of the Andean landscape before descending gradually towards the transition zone between the Andes and the Amazon Basin.\n\nWe will stop at the famous Papallacta Hot Springs, where you can enjoy the thermal pools at different temperatures while admiring the surrounding mountain scenery and, weather permitting, views of Antisana Volcano (5,704 meters / 18,714 feet).\n\nYou may also choose to relax at the spa, enjoy a massage or hydrotherapy treatment, or take a short walk along the surrounding trails.\n\nAfter the visit, we will continue our descent towards the Amazon region and the town of Tena.',
          es: 'Viaje hacia la AmazonÃ­a cruzando los Andes a 4,100 m. Parada en las Termas de Papallacta para disfrutar de sus aguas termales frente al Antisana. Descenso al lodge en Tena.'
        },
        image: '/images/tours/16-9/papallacta-laguna-16-9.webp',
        accommodation: { en: 'Tena â€“ Lodge', es: 'Tena â€“ Lodge' },
        activity: { en: '6-hour guided tour + 1h nature walk', es: 'Tour guiado de 6h + caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ Tena | Amazon Rainforest Experience | Wildlife Rescue Center | Kichwa Community',
          es: 'DÃ­a 4 â€“ Tena | Experiencia En Selva AmazÃ³nica | Centro De Rescate | Comunidad Kichwa'
        },
        description: {
          en: 'After breakfast, we will begin our Amazon adventure with a motorized canoe ride along the river, traveling downstream through the lush rainforest.\n\nOur first visit will be to a wildlife rescue and rehabilitation center, where you will learn about native Amazonian species and conservation efforts to protect animals affected by illegal wildlife trafficking and other threats.\n\nWe will then continue into the primary rainforest, where, accompanied by a local native guide, we will take a hike through the jungle. The walk offers an opportunity to discover the incredible biodiversity of the Amazon and learn about the traditional uses of plants and the relationship between local communities and the forest.\n\nWe will also visit a local Kichwa family, where you will have the opportunity to learn about their traditions, customs and culture and gain a deeper understanding of their connection with the Amazon environment.\n\nOur final visit will be to a caiman lagoon, where we will learn about these fascinating reptiles and the aquatic ecosystems of the rainforest.\n\nAfter the excursion, we will return to the lodge.',
          es: 'Canoa motorizada por el rÃ­o, visita a centro de rescate de animales silvestres, caminata botÃ¡nica en selva primaria con guÃ­a nativo, encuentro cultural con familia Kichwa y laguna de caimanes.'
        },
        image: '/images/tours/16-9/amazon-river-16-9.webp',
        accommodation: { en: 'Tena â€“ Lodge', es: 'Tena â€“ Lodge' },
        activity: { en: '6-hour guided tour + 1h motorized canoe ride', es: 'Tour de 6h + canoa motorizada de 1h' },
        transportation: { en: 'Private transportation and motorized canoe', es: 'Transporte privado y canoa motorizada' },
        meals: { en: 'Breakfast, lunch and dinner', es: 'Desayuno, almuerzo y cena' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Tena â€“ MisahuallÃ­ | Paikawe Reserve | Amazon Lagoon | Quito',
          es: 'DÃ­a 5 â€“ Tena â€“ MisahuallÃ­ | Reserva Paikawe | Laguna AmazÃ³nica | Quito'
        },
        description: {
          en: 'After breakfast, we will visit Paikawe Reserve, a beautiful Amazonian natural area where you will have the opportunity to experience the rainforest from both land and water.\n\nWe will take a walk through primary rainforest, accompanied by a local guide, and learn about the biodiversity and natural environment of the region.\n\nWe will then navigate the lagoon by canoe, where you may have the opportunity to observe some of the giant fish species found in the Amazon, depending on natural conditions and wildlife activity.\n\nAfter the visit, we will begin our return journey to Quito.',
          es: 'Caminata en la selva de la Reserva Paikawe y canoa por la laguna para observar los peces gigantes del Amazonas. Retorno a Quito.'
        },
        image: '/images/tours/16-9/amazon-nutria-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 1h rainforest hike', es: 'Tour de 6h + caminata de 1h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Quito | Free Day',
          es: 'DÃ­a 6 â€“ Quito | DÃ­a Libre'
        },
        description: {
          en: 'Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city independently, visit additional museums and cultural attractions, enjoy local cuisine, or simply relax at the hotel.\n\nThis free day also provides an opportunity to rest before continuing your journey to the GalÃ¡pagos Islands the following day.\n\nOptional excursions and activities can be arranged upon request.',
          es: 'DÃ­a libre en Quito para recorrer la ciudad a su ritmo y descansar antes del viaje a GalÃ¡pagos.'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 â€“ Quito â€“ Baltra | Twin Craters | Primicias Ranch | Puerto Ayora',
          es: 'DÃ­a 7 â€“ Quito â€“ Baltra | CrÃ¡teres Gemelos | Rancho Primicias | Puerto Ayora'
        },
        description: {
          en: 'After breakfast, transfer to Mariscal Sucre International Airport for your flight to the GalÃ¡pagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your GalÃ¡pagos adventure.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will continue towards the highlands to visit the famous Twin Craters (Los Gemelos), two impressive volcanic formations surrounded by the lush vegetation of the Santa Cruz highlands.\n\nHere, you will learn about the geological origins of the island and discover the unique Scalesia forest, one of the characteristic ecosystems of the Santa Cruz highlands.\n\nWe will then continue to Primicias Ranch, a private reserve where giant GalÃ¡pagos tortoises can be observed roaming freely in their natural environment. This is an excellent opportunity to photograph these iconic animals and learn about their importance to the GalÃ¡pagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'Vuelo a GalÃ¡pagos (Baltra), bienvenida y cruce del Canal de Itabaca hacia Santa Cruz. Visita a los CrÃ¡teres Gemelos en el bosque de Scalesia y Rancho Primicias con tortugas gigantes en libertad. Check-in en Puerto Ayora.'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
        accommodation: { en: 'Santa Cruz Island â€“ Puerto Ayora', es: 'Isla Santa Cruz â€“ Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado terrestre y shuttle de aeropuerto' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 â€“ Santa Cruz To Isabela | Flamingo Lagoon | Tortoise Breeding Center | Tintoreras',
          es: 'DÃ­a 8 â€“ Santa Cruz A Isabela | Laguna De Flamingos | Centro De Crianza | Tintoreras'
        },
        description: {
          en: 'After breakfast, we will transfer to the pier to board a speedboat to Isabela Island. The crossing takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will begin our exploration of Isabela.\n\nOur first stop will be the Flamingo Lagoon, one of the island\'s most important wetland areas. Here, you may observe GalÃ¡pagos flamingos feeding and resting in the shallow waters, together with other species of coastal and migratory birds.\n\nWe will then visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nIn the afternoon, we will take a boat excursion to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. The area is famous for its crystal-clear waters and rich marine life.\n\nDuring the snorkeling activity, you may have the opportunity to encounter sea lions, sea turtles, rays, colorful tropical fish and GalÃ¡pagos penguins, depending on sea conditions and wildlife activity.\n\nAfter the excursion, return to Puerto Villamil and enjoy the evening at leisure.',
          es: 'Lancha rÃ¡pida a Isla Isabela. Visita a la Laguna de Flamingos y al Centro de Crianza de Tortugas Gigantes. Por la tarde, excursiÃ³n nÃ¡utica a Tintoreras para snorkel con lobos marinos, tortugas, pingÃ¼inos y rayas. Noche en Isabela.'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: { en: 'Isabela Island â€“ Puerto Villamil', es: 'Isla Isabela â€“ Puerto Villamil' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Full-day guided excursion and snorkeling', es: 'ExcursiÃ³n guiada full-day y snorkeling' },
        transportation: { en: 'Shared speedboat and local land transportation', es: 'Lancha rÃ¡pida compartida y transporte terrestre' }
      },
      {
        day: 9,
        title: {
          en: 'Day 9 â€“ Isabela To Santa Cruz | La LoberÃ­a | Las Grietas',
          es: 'DÃ­a 9 â€“ Isabela A Santa Cruz | La LoberÃ­a | Las Grietas'
        },
        description: {
          en: 'After breakfast, we will return to the pier for the speedboat transfer back to Santa Cruz Island.\n\nUpon arrival in Puerto Ayora, we will continue with a visit to La LoberÃ­a, a small coastal area known for its population of GalÃ¡pagos sea lions. This is an excellent place to observe these playful animals both on the beach and in the water.\n\nWe will then visit Las Grietas, a spectacular natural formation created by volcanic activity. This narrow canyon is filled with clear, turquoise water and is one of the most popular swimming and snorkeling sites near Puerto Ayora.\n\nDuring the snorkeling activity, you will have the opportunity to explore the underwater environment and observe colorful tropical fish and other marine species.\n\nAfter the excursion, return to Puerto Ayora and check in at your hotel. The remainder of the afternoon and evening will be free to relax or explore the town independently.',
          es: 'Lancha de regreso a Santa Cruz. Visita a La LoberÃ­a para observar lobos marinos e iguanas, seguida de caminata y nataciÃ³n en las aguas cristalinas de Las Grietas. Tarde libre en Puerto Ayora.'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: { en: 'Santa Cruz Island â€“ Puerto Ayora', es: 'Isla Santa Cruz â€“ Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Guided excursion and snorkeling', es: 'ExcursiÃ³n guiada y snorkeling' },
        transportation: { en: 'Speedboat and private/local land transportation', es: 'Lancha rÃ¡pida y transporte terrestre' }
      },
      {
        day: 10,
        title: {
          en: 'Day 10 â€“ Full-Day Excursion To Santa Fe Or PinzÃ³n Island',
          es: 'DÃ­a 10 â€“ ExcursiÃ³n Full-Day A Isla Santa Fe O Isla PinzÃ³n'
        },
        description: {
          en: 'Today, enjoy a full-day boat excursion to one of the GalÃ¡pagos\' outstanding snorkeling destinations: Santa Fe Island or PinzÃ³n Island, depending on availability, sea conditions and the selected tour.\n\nSanta Fe Island is known for its beautiful turquoise waters, white sandy beaches and endemic wildlife. During the excursion, you may encounter sea lions, sea turtles, rays, marine iguanas and a variety of tropical fish. The island is also home to the endemic Santa Fe land iguana.\n\nAlternatively, the excursion may take you to PinzÃ³n Island, a spectacular location surrounded by clear waters and abundant marine life. The snorkeling sites around PinzÃ³n are particularly well known for encounters with sea turtles, sea lions, rays, colorful fish and, with some luck, GalÃ¡pagos penguins.\n\nThe day will include navigation, snorkeling and opportunities to observe wildlife both above and below the water. Lunch will generally be provided during the excursion, depending on the selected tour.\n\nReturn to Puerto Ayora in the afternoon and enjoy your final evening in the GalÃ¡pagos.',
          es: 'NavegaciÃ³n de dÃ­a completo en yate hacia Santa Fe o PinzÃ³n con sesiones de snorkel de alta biodiversidad. Almuerzo a bordo incluido. Retorno por la tarde a Puerto Ayora.'
        },
        image: '/images/tours/16-9/santa-fe-island-16-9.webp',
        accommodation: { en: 'Santa Cruz Island â€“ Puerto Ayora', es: 'Isla Santa Cruz â€“ Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        activity: { en: 'Full-day boat excursion and snorkeling', es: 'ExcursiÃ³n en barco full-day y snorkel' }
      },
      {
        day: 11,
        title: {
          en: 'Day 11 â€“ Santa Cruz â€“ Baltra Airport | Departure',
          es: 'DÃ­a 11 â€“ Santa Cruz â€“ Aeropuerto De Baltra | Salida'
        },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport (Baltra).\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Ecuador and GalÃ¡pagos Islands experience.',
          es: 'Traslado al Aeropuerto de Baltra y vuelo de retorno a Quito. RecepciÃ³n y traslado al hotel en Quito.'
        },
        image: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado y shuttle de aeropuerto' }
      },
      {
        day: 12,
        title: {
          en: 'Day 12 â€“ Quito | International Departure',
          es: 'DÃ­a 12 â€“ Quito | Salida Internacional'
        },
        description: {
          en: 'After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and GalÃ¡pagos Islands experience.',
          es: 'Desayuno y traslado privado al Aeropuerto Mariscal Sucre de Quito para abordar su vuelo internacional de retorno. Fin de los servicios.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
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
      es: 'Ecuador Y GalÃ¡pagos En Breve: Magia Y Aventura',
      fr: 'Voyage MaÃ®tre: De l\'Ã‰quateur Continental aux GalÃ¡pagos',
      de: 'Meisterreise: Vom Festland Ecuadors nach Galapagos',
      it: 'Viaggio Maestro: Dall\'Ecuador Continentale alle Galapagos',
      pt: 'Jornada Mestra: Do Equador Continental a GalÃ¡pagos',
      ja: 'ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«æœ¬åœŸã‹ã‚‰ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹ã¸ã®ãƒžã‚¹ã‚¿ãƒ¼ã‚¸ãƒ£ãƒ¼ãƒ‹ãƒ¼',
      zh: 'å¤§å¸ˆä¹‹æ—…ï¼šä»ŽåŽ„ç“œå¤šå°”å¤§é™†åˆ°åŠ æ‹‰å¸•æˆˆæ–¯'
    },
    destination: 'Ecuador & Galapagos',
    duration: {
      en: '11 DAYS / 10 NIGHTS',
      es: '11 DÃAS / 10 NOCHES',
      fr: '11 JOURS / 10 NUITS',
      de: '11 TAGE / 10 NÃ„CHTE',
      it: '11 GIORNI / 10 NOTTI',
      pt: '11 DIAS / 10 NOITES',
      ja: '11æ—¥é–“ / 10æ³Š',
      zh: '11å¤© / 10æ™š'
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
      es: 'ClÃ¡sico Continente y GalÃ¡pagos',
      fr: 'Classique Ã‰quateur et Galapagos',
      de: 'Klassisches Ecuador & Galapagos',
      it: 'Classico Ecuador e Galapagos',
      pt: 'ClÃ¡ssico Equador e GalÃ¡pagos',
      ja: 'ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ï¼†ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹å‘¨éŠ',
      zh: 'æµ·é™†ç»å…¸è”åˆå…¨æ™¯æ¸¸'
    },
    description: {
      en: '11-day master journey connecting mainland Ecuador (Quito, Avenue of Volcanoes, BaÃ±os PailÃ³n del Diablo (Devil\'s Cauldron), Puyo Amazon Rainforest, Quilotoa Crater Lake) with GalÃ¡pagos Islands (Santa Cruz highlands, giant tortoises, Isabela full-day with Tintoreras & flamingos, La LoberÃ­a and Las Grietas canyon).',
      es: 'TravesÃ­a de 11 dÃ­as conectando los Andes, BaÃ±os, la AmazonÃ­a y Quilotoa con las maravillas volcÃ¡nicas, tortugas gigantes y playas de GalÃ¡pagos.',
      zh: '11æ—¥ç»å…¸è”åˆè¡Œç¨‹ï¼Œå°†åŽ„ç“œå¤šå°”å¤§é™†ï¼ˆåŸºå¤šã€å·´å°¼å¥¥æ–¯æ¶é­”ä¹‹å’½ã€æ™®çº¦äºšé©¬é€Šã€åŸºæ´›æ‰˜é˜¿ï¼‰ä¸ŽåŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›ï¼ˆåœ£å…‹é²æ–¯ã€ä¼ŠèŽŽè´æ‹‰ã€è’‚æ©æ‰˜é›·æ‹‰æ–¯ã€æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ï¼‰å®Œç¾Žèžåˆã€‚'
    },
    highlights: [
      { en: 'Avenue of the Volcanoes & BaÃ±os PailÃ³n del Diablo (Devil\'s Cauldron)', es: 'Avenida de los Volcanes y BaÃ±os PailÃ³n del Diablo (Devil\'s Cauldron)', zh: 'ç«å±±å¤§é“ä¸Žå·´å°¼å¥¥æ–¯æ¶é­”ä¹‹å’½' },
      { en: 'Puyo Amazon Rainforest & Kichwa Community', es: 'Selva AmazÃ³nica de Puyo y Comunidad Kichwa', zh: 'æ™®çº¦äºšé©¬é€Šé›¨æž—ä¸Žå¥‡ç“¦ç¤¾åŒº' },
      { en: 'Quilotoa Emerald Volcanic Crater Lake', es: 'Laguna del CrÃ¡ter de Quilotoa', zh: 'åŸºæ´›æ‰˜é˜¿ç¿¡ç¿ ç«å±±æ¹–' },
      { en: 'Santa Cruz Highlands & Giant Tortoises', es: 'Tierras Altas de Santa Cruz y Tortugas Gigantes', zh: 'åœ£å…‹é²æ–¯é«˜åœ°ä¸Žå·¨é¾Ÿä¿æŠ¤åŒº' },
      { en: 'Isabela Island, Flamingo Lagoon & Tintoreras', es: 'Isla Isabela, Laguna de Flamingos y Tintoreras', zh: 'ä¼ŠèŽŽè´æ‹‰å²›ã€ç«çƒˆé¸Ÿä¸Žè’‚æ©æ‰˜é›·æ‹‰æ–¯' },
      { en: 'Las Grietas Crystal-Clear Volcanic Chasm', es: 'CaÃ±Ã³n VolcÃ¡nico de Las Grietas', zh: 'æ‹‰æ–¯æ ¼é‡Œå¡”æ–¯ç«å±±å³¡è°·æ½œæ°´' }
    ],
    inclusions: [
      { en: 'Airport assistance and private transfers', es: 'Asistencia en aeropuerto y traslados privados' },
      { en: 'Private transportation throughout mainland Ecuador', es: 'Transporte privado en Ecuador continental' },
      { en: 'Plane Ticket (Quito â€“ Baltra â€“ Quito)', es: 'Boleto aÃ©reo Quito â€“ Baltra â€“ Quito' },
      { en: 'Professional English-speaking guides and Level III Naturalists', es: 'GuÃ­as profesionales bilingÃ¼es y Naturalistas Nivel III' },
      { en: '10 nights accommodation (3* or 4* hotels in mainland & GalÃ¡pagos)', es: '10 noches de alojamiento (hoteles 3â˜… o 4â˜… en continente y GalÃ¡pagos)' },
      { en: 'Daily breakfast, plus specified lunches in Puyo and Isabela', es: 'Desayunos diarios, y almuerzos incluidos en Puyo e Isabela' },
      { en: 'Entrances: PailÃ³n del Diablo (Devil\'s Cauldron), Yanacocha, Hola Vida, Quilotoa, GalÃ¡pagos sites', es: 'Todas las entradas segÃºn itinerario' }
    ],
    exclusions: [
      { en: 'GalÃ¡pagos National Park entrance fee: USD 200.00 foreign / USD 6.00 national', es: 'Entrada al Parque Nacional GalÃ¡pagos: USD 200.00 extranjeros / USD 6.00 nacionales' },
      { en: 'Transit Control Card (TCT): USD 20.00', es: 'Tarjeta de Control de TrÃ¡nsito (TCT): USD 20.00' },
      { en: 'Dinners in GalÃ¡pagos and mainland (unless specified)', es: 'Cenas' }
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: 'Day 1 â€“ Arrival In Quito | Airport Assistance & Hotel Transfer',
          es: 'DÃ­a 1 â€“ Llegada A Quito | Asistencia En Aeropuerto Y Traslado'
        },
        description: {
          en: 'Upon arrival at Mariscal Sucre International Airport in Quito, you will be welcomed by our representative and assisted with your private transfer to the hotel.\n\nThis program can begin on any day of the week, depending on your travel arrangements.\n\nThe remainder of the day will be free to rest and acclimatize to the altitude of Quito.',
          es: 'Llegada al Aeropuerto Mariscal Sucre de Quito, recepciÃ³n y traslado privado al hotel. Tiempo libre para descansar y aclimatarse.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado (vehÃ­culos 4x4 o buses turÃ­sticos)' },
        meals: { en: 'Not included', es: 'No incluidas' }
      },
      {
        day: 2,
        title: {
          en: 'Day 2 â€“ Quito â€“ BaÃ±os | Avenue Of The Volcanoes | PailÃ³n Del Diablo Waterfall',
          es: 'DÃ­a 2 â€“ Quito â€“ BaÃ±os | Avenida De Los Volcanes | Cascada PailÃ³n Del Diablo'
        },
        description: {
          en: 'After breakfast, we will travel south along the Pan-American Highway, following the famous Avenue of the Volcanoes, one of the most spectacular landscapes in the Ecuadorian Andes.\n\nThe route takes us through a region surrounded by numerous volcanic peaks before continuing towards BaÃ±os de Agua Santa, a charming tourist town located at the foothills of the active Tungurahua Volcano.\n\nBaÃ±os is surrounded by dramatic mountain scenery, waterfalls and lush vegetation, offering a wide variety of adventure activities such as cycling, rafting, hiking, tarabita cable-car rides and horseback riding.\n\nDuring today\'s excursion, we will visit the spectacular PailÃ³n del Diablo (Devil\'s Cauldron) Waterfall, one of Ecuador\'s most impressive waterfalls. We will follow the trails through the lush vegetation and enjoy different viewpoints of the waterfall.\n\nBaÃ±os is located in a unique geographical setting between the Andes and the Amazon region, creating an extraordinary combination of ecosystems and landscapes.\n\nAfter the visit, we will continue to the hotel in BaÃ±os.',
          es: 'Viaje hacia el sur por la Panamericana a travÃ©s de la Avenida de los Volcanes hacia BaÃ±os de Agua Santa, al pie del volcÃ¡n Tungurahua. ExcursiÃ³n y caminata a la cascada PailÃ³n del Diablo (Devil\'s Cauldron). Noche en BaÃ±os.'
        },
        image: '/images/tours/16-9/pailon-del-diablo-16-9.webp',
        accommodation: { en: 'BaÃ±os', es: 'BaÃ±os' },
        activity: { en: '8-hour guided tour', es: 'Tour guiado de 8 horas' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 3,
        title: {
          en: 'Day 3 â€“ BaÃ±os â€“ Amazon Rainforest | Puyo | Yanacocha Biopark | Hola Vida Waterfall | Kichwa Community',
          es: 'DÃ­a 3 â€“ BaÃ±os â€“ Selva AmazÃ³nica | Puyo | Bioparque Yanacocha | Cascada Hola Vida | Comunidad Kichwa'
        },
        description: {
          en: 'After breakfast, we will head east towards the Amazon Rainforest, traveling through the spectacular Pastaza River Canyon on our way to the city of Puyo, one of the gateways to Ecuador\'s Amazon region.\n\nOur first stop will be Yanacocha Biopark, where you will learn about and observe native animal species that have been rescued from illegal wildlife trafficking. The biopark is dedicated to wildlife conservation and environmental education.\n\nWe will then continue into the Amazon Rainforest for a guided hike through the lush vegetation to Hola Vida Waterfall. The approximately two-hour hike offers an opportunity to experience the extraordinary biodiversity of the rainforest and enjoy its natural surroundings.\n\nLater, we will visit a local Kichwa family, where you will have the opportunity to learn about their traditions, customs and way of life. This cultural encounter provides an authentic insight into the relationship between the local community and the Amazon Rainforest.\n\nWe will then begin our return journey to BaÃ±os.',
          es: 'Viaje por el caÃ±Ã³n del Pastaza hacia la selva de Puyo. Visita al Bioparque Yanacocha, caminata de 2h a la cascada Hola Vida y encuentro cultural con una familia Kichwa. Retorno a BaÃ±os.'
        },
        image: '/images/tours/16-9/puyo-yanacocha-16-9.webp',
        accommodation: { en: 'BaÃ±os', es: 'BaÃ±os' },
        activity: { en: '6-hour guided tour + 2-hour rainforest hike', es: 'Tour de 6h + caminata en selva de 2h' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' }
      },
      {
        day: 4,
        title: {
          en: 'Day 4 â€“ BaÃ±os â€“ Quilotoa â€“ Quito | Quilotoa Crater Lake | Tigua',
          es: 'DÃ­a 4 â€“ BaÃ±os â€“ Quilotoa â€“ Quito | Laguna De Quilotoa | Tigua'
        },
        description: {
          en: 'After breakfast, we will begin our journey towards Quito, traveling through some of the most spectacular landscapes of the Ecuadorian Andes.\n\nOur main stop will be Quilotoa Crater Lake, one of Ecuador\'s most iconic natural attractions. The lake lies inside the crater of an ancient volcano and is famous for its striking turquoise-green waters surrounded by dramatic Andean landscapes.\n\nDuring the visit, you will have the opportunity to enjoy a two-hour hike towards the bottom of the crater. The descent provides spectacular views of the lake and surrounding mountains. Please note that the return hike is more demanding due to the steep terrain and altitude.\n\nAlong the way, we may also stop at the traditional village of Tigua, famous for its colorful paintings depicting Andean culture and everyday life. Depending on local availability, we may also visit a traditional guinea pig farm and learn about this important element of Andean rural life.\n\nWe will then continue to Quito.',
          es: 'Viaje al CrÃ¡ter VolcÃ¡nico de Quilotoa con caminata de 2h hacia la laguna verde esmeralda. Parada en el pueblo de pintores de Tigua y continuaciÃ³n hacia Quito.'
        },
        image: '/images/tours/16-9/laguna-quilotoa-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        activity: { en: '6-hour guided tour + 2-hour hike (3,500 m / 11,500 ft)', es: 'Tour de 6h + caminata de 2h (3,500 m)' },
        transportation: { en: 'Private transportation (4x4 vehicles or tourist buses)', es: 'Transporte privado' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 5,
        title: {
          en: 'Day 5 â€“ Quito | Free Day',
          es: 'DÃ­a 5 â€“ Quito | DÃ­a Libre'
        },
        description: {
          en: 'Today is free to enjoy Quito at your own pace.\n\nYou may choose to explore the city\'s historic center, visit museums and cultural attractions, discover local cuisine, or simply relax at the hotel.\n\nOptional excursions and activities can be arranged upon request.\n\nThis free day also provides an opportunity to rest before continuing your journey to the GalÃ¡pagos Islands the following day.',
          es: 'DÃ­a libre en Quito para explorar sus tesoros histÃ³ricos, gastronomÃ­a o descansar antes del vuelo a GalÃ¡pagos.'
        },
        image: '/images/tours/16-9/quito-iglesia-de-san-francisco-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Not included unless specified', es: 'No incluido' }
      },
      {
        day: 6,
        title: {
          en: 'Day 6 â€“ Quito â€“ Baltra | Twin Craters | Primicias Ranch | Puerto Ayora',
          es: 'DÃ­a 6 â€“ Quito â€“ Baltra | CrÃ¡teres Gemelos | Rancho Primicias | Puerto Ayora'
        },
        description: {
          en: 'After breakfast, transfer to Mariscal Sucre International Airport for your flight to the GalÃ¡pagos Islands.\n\nUpon arrival at Seymour Airport on Baltra Island, you will be welcomed by our representative and begin your GalÃ¡pagos adventure.\n\nAfter crossing the Itabaca Channel to Santa Cruz Island, we will travel to the highlands to visit the famous Twin Craters (Los Gemelos). These impressive volcanic formations are surrounded by lush Scalesia forest and offer an excellent introduction to the unique geological landscape of Santa Cruz Island.\n\nWe will then continue to Primicias Ranch, a private reserve where giant GalÃ¡pagos tortoises can be observed roaming freely in their natural environment. During the visit, you will learn about these iconic animals and their importance to the GalÃ¡pagos ecosystem.\n\nAfter the excursion, we will continue to Puerto Ayora for hotel check-in and the remainder of the day at leisure.',
          es: 'Vuelo a Baltra, bienvenida y cruce a Santa Cruz. Visita a los CrÃ¡teres Gemelos en el bosque de Scalesia y Rancho Primicias con tortugas gigantes en libertad. Check-in en Puerto Ayora.'
        },
        image: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
        accommodation: { en: 'Santa Cruz Island â€“ Puerto Ayora', es: 'Isla Santa Cruz â€“ Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado terrestre y shuttle de aeropuerto' }
      },
      {
        day: 7,
        title: {
          en: 'Day 7 â€“ Full-Day Excursion To Isabela Island | Tortoise Breeding Center | Flamingo Lagoon | Tintoreras',
          es: 'DÃ­a 7 â€“ ExcursiÃ³n Full-Day A Isla Isabela | Centro De Crianza | Laguna De Flamingos | Tintoreras'
        },
        description: {
          en: 'After breakfast, transfer to the pier to board a speedboat to Isabela Island. The navigation takes approximately 2 to 2.5 hours, depending on sea conditions.\n\nUpon arrival in Puerto Villamil, we will visit the Giant Tortoise Breeding Center, where you will learn about the conservation and breeding programs established to protect Isabela\'s giant tortoise populations.\n\nWe will then visit the Flamingo Lagoon, one of the island\'s most important wetlands. Depending on natural conditions, you may observe GalÃ¡pagos flamingos and other bird species in their natural habitat.\n\nThe excursion will continue with a boat trip to Tintoreras Islet, a small volcanic islet located just off the coast of Isabela. Its clear waters and rich marine environment make it an excellent snorkeling destination.\n\nDuring the snorkeling activity, you may have the opportunity to observe sea lions, sea turtles, rays, penguins and colorful tropical fish, depending on wildlife activity and sea conditions.\n\nAfter the excursion, we will return by speedboat to Santa Cruz Island and Puerto Ayora.',
          es: 'Lancha rÃ¡pida a Isabela. Visita al Centro de Crianza y Laguna de Flamingos. ExcursiÃ³n nÃ¡utica al Islote Tintoreras con snorkeling (lobos marinos, tortugas, pingÃ¼inos, rayas y peces). Retorno a Santa Cruz.'
        },
        image: '/images/tours/16-9/galapagos-isabela-island-16-9.webp',
        accommodation: { en: 'Santa Cruz Island â€“ Puerto Ayora', es: 'Isla Santa Cruz â€“ Puerto Ayora' },
        meals: { en: 'Breakfast and lunch', es: 'Desayuno y almuerzo' },
        activity: { en: 'Full-day guided excursion and snorkeling', es: 'ExcursiÃ³n guiada full-day y snorkeling' },
        transportation: { en: 'Shared speedboat and private land transportation', es: 'Lancha rÃ¡pida y transporte privado' }
      },
      {
        day: 8,
        title: {
          en: 'Day 8 â€“ La LoberÃ­a | Punta Estrada | Las Grietas',
          es: 'DÃ­a 8 â€“ La LoberÃ­a | Punta Estrada | Las Grietas'
        },
        description: {
          en: 'After breakfast, we will begin the day\'s activities with a visit to La LoberÃ­a, a coastal area famous for its resident population of GalÃ¡pagos sea lions. Here, you will have the opportunity to observe these playful animals in their natural environment.\n\nWe will then continue to Punta Estrada, a beautiful coastal area surrounded by rocky formations and clear waters. The area offers excellent opportunities for nature observation and marine activities.\n\nThe excursion will continue to Las Grietas, a spectacular natural formation consisting of a narrow volcanic canyon filled with crystal-clear turquoise water. This is one of the most popular snorkeling and swimming sites near Puerto Ayora.\n\nDuring the snorkeling activity, you can explore the underwater environment and observe a variety of colorful fish and marine life.\n\nAfter the visit, return to Puerto Ayora and enjoy the remainder of the day at leisure.',
          es: 'Visita a La LoberÃ­a con lobos marinos, Punta Estrada y nataciÃ³n/snorkel en el caÃ±Ã³n volcÃ¡nico de Las Grietas. Tarde libre en Puerto Ayora.'
        },
        image: '/images/tours/16-9/galapagos-las-grietas-16-9.webp',
        accommodation: { en: 'Santa Cruz Island â€“ Puerto Ayora', es: 'Isla Santa Cruz â€“ Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        activity: { en: 'Guided excursion and snorkeling', es: 'ExcursiÃ³n guiada y snorkel' }
      },
      {
        day: 9,
        title: {
          en: 'Day 9 â€“ Santa Cruz | Free Day',
          es: 'DÃ­a 9 â€“ Santa Cruz | DÃ­a Libre'
        },
        description: {
          en: 'After breakfast, enjoy a free day in Santa Cruz Island.\n\nThis day can be used to relax at the hotel, explore Puerto Ayora independently, visit local shops and restaurants, or simply enjoy the island at your own pace.\n\nOptional excursions and activities can be arranged upon request, depending on availability and local conditions.',
          es: 'DÃ­a libre en Santa Cruz para disfrutar de Puerto Ayora, Playa Tortuga Bay o tours opcionales.'
        },
        image: '/images/tours/16-9/galapagos-puerto-ayora-16-9.webp',
        accommodation: { en: 'Santa Cruz Island â€“ Puerto Ayora', es: 'Isla Santa Cruz â€“ Puerto Ayora' },
        meals: { en: 'Breakfast', es: 'Desayuno' }
      },
      {
        day: 10,
        title: {
          en: 'Day 10 â€“ Baltra Airport | Departure',
          es: 'DÃ­a 10 â€“ Traslado Al Aeropuerto De Baltra | Vuelo A Quito'
        },
        description: {
          en: 'After breakfast, check out from the hotel and begin the transfer from Puerto Ayora to Baltra Airport.\n\nThe journey includes transportation across Santa Cruz Island and the crossing of the Itabaca Channel, followed by the airport shuttle to Seymour Airport.\n\nUpon arrival at the airport, assistance will be provided for your departure flight, marking the end of your Ecuador and GalÃ¡pagos Islands experience.',
          es: 'Traslado al Aeropuerto Seymour de Baltra y vuelo de retorno a Quito. RecepciÃ³n y traslado al hotel.'
        },
        image: '/images/tours/16-9/galapagos-baltra-island-16-9.webp',
        accommodation: { en: 'Quito', es: 'Quito' },
        meals: { en: 'Breakfast', es: 'Desayuno' },
        transportation: { en: 'Private land transportation and airport shuttle', es: 'Transporte privado y shuttle de aeropuerto' }
      },
      {
        day: 11,
        title: {
          en: 'Day 11 â€“ Quito | International Departure',
          es: 'DÃ­a 11 â€“ Quito | Salida Internacional'
        },
        description: {
          en: 'After breakfast, check out from the hotel and meet your private driver for your transfer to Mariscal Sucre International Airport.\n\nAssistance will be provided for your departure flight and international connections.\n\nThis marks the end of your Ecuador and GalÃ¡pagos Islands experience.',
          es: 'Desayuno y traslado privado al Aeropuerto Mariscal Sucre de Quito para abordar su vuelo internacional de retorno. Fin de los servicios.'
        },
        image: '/images/tours/16-9/quito-colonial-16-9.webp',
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
    name: { en: 'Mainland Ecuador', es: 'Ecuador Continental', fr: 'Ã‰quateur Continental', de: 'Festland Ecuador', it: 'Ecuador Continentale', pt: 'Equador Continental', ja: 'ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«æœ¬åœŸ', zh: 'åŽ„ç“œå¤šå°”å¤§é™†' },
    subtitle: {
      en: 'Andes, Volcanoes & Amazon Rainforest',
      es: 'Andes, Volcanes Y Selva AmazÃ³nica', fr: 'Andes, volcans et jungle amazonienne', de: 'Anden, Vulkane & Amazonas-Regenwald', it: 'Ande, Vulcani e Foresta Amazzonica', pt: 'Andes, VulcÃµes e Floresta AmazÃ´nica', ja: 'ã‚¢ãƒ³ãƒ‡ã‚¹ã€ç«å±±ã€ã‚¢ãƒžã‚¾ãƒ³ç†±å¸¯é›¨æž—', zh: 'å®‰ç¬¬æ–¯é«˜åŽŸã€å£®ä¸½ç«å±±ä¸Žäºšé©¬é€Šé›¨æž—'
    },
    description: {
      en: 'Explore the Avenue of the Volcanoes, historic Quito, BaÃ±os waterfalls, Amazon jungle lodges and ancient Inca heritage.',
      es: 'Atraviesa la Avenida de los Volcanes, explora lodges en la selva profunda y maravÃ­llate con la arquitectura colonial.',
      zh: 'æŽ¢ç´¢ç«å±±å¤§é“ã€åŸºå¤šå¤åŸŽã€å·´å°¼å¥¥æ–¯ç€‘å¸ƒã€äºšé©¬é€Šä¸›æž—æœ¨å±‹ä¸Žå°åŠ é—å€ã€‚'
    },
    imageUrl: '/images/tours/16-9/cuenca-colonial-16-9.webp',
    toursCount: 5,
    slug: 'ecuador'
  },
  {
    id: 'galapagos',
    name: { en: 'GalÃ¡pagos Islands', es: 'Islas GalÃ¡pagos', fr: 'ÃŽles GalÃ¡pagos', de: 'Galapagos-Inseln', it: 'Isole Galapagos', pt: 'Ilhas GalÃ¡pagos', ja: 'ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶', zh: 'åŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›' },
    subtitle: {
      en: 'The Enchanted Archipelago & Cruises',
      es: 'El ArchipiÃ©lago Encantado', fr: 'L\'archipel enchantÃ© et croisiÃ¨res', de: 'Das verzauberte Archipel & Kreuzfahrten', it: 'L\'Arcipelago Incantato e Crociere', pt: 'O ArquipÃ©lago Encantado e Cruzeiros', ja: 'é­…æƒ‘ã®è«¸å³¶ã¨ãƒã‚¤ãƒãƒ£ãƒ¼ã‚¯ãƒ«ãƒ¼ã‚º', zh: 'é­”å¹»ç¾¤å²›ä¸Žå°Šäº«ç”Ÿæ€å·¡æ¸¸'
    },
    description: {
      en: 'Cruises and island-hopping tours to witness wildlife and pristine waters found nowhere else on Earth.',
      es: 'Cruceros privados curados y excursiones de isla en isla para presenciar vida silvestre que no se encuentra en ningÃºn otro lugar.',
      zh: 'é‚‚é€…åœ°çƒä¸Šç‹¬ä¸€æ— äºŒçš„é‡Žç”ŸåŠ¨ç‰©ï¼Œä¸Žæµ·ç‹®ã€æµ·é¬£èœ¥ã€å·¨é¾Ÿå’Œä¼é¹…ä¸€åŒæµ®æ½œã€‚'
    },
    imageUrl: '/images/tours/16-9/galapagos-tortuga-gigante-16-9.2.webp',
    toursCount: 3,
    slug: 'galapagos'
  },
  {
    id: 'combined',
    name: { en: 'Grand Combined Expeditions', es: 'Grandes Expediciones Combinadas', fr: 'Grandes ExpÃ©ditions CombinÃ©es', de: 'GroÃŸe Kombinations-Expeditionen', it: 'Grandi Spedizioni Combinate', pt: 'Grandes ExpediÃ§Ãµes Combinadas', ja: 'ã‚°ãƒ©ãƒ³ãƒ‰ãƒ»ã‚³ãƒ³ãƒ“ãƒãƒ¼ã‚·ãƒ§ãƒ³æŽ¢æ¤œ', zh: 'å…¨æ™¯å°Šäº«ç»„åˆæŽ¢é™©' },
    subtitle: {
      en: 'Mainland Ecuador + GalÃ¡pagos Islands',
      es: 'Ecuador Continental + Islas GalÃ¡pagos', fr: 'Ã‰quateur Continental + ÃŽles GalÃ¡pagos', de: 'Festland Ecuador + Galapagos-Inseln', it: 'Ecuador Continentale + Isole Galapagos', pt: 'Equador Continental + Ilhas GalÃ¡pagos', ja: 'ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«æœ¬åœŸ ï¼‹ ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶', zh: 'åŽ„ç“œå¤šå°”å¤§é™† ï¼‹ åŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›'
    },
    description: {
      en: 'The ultimate master journeys linking volcanic Andean trails, Amazon wonders and the pristine GalÃ¡pagos islands.',
      es: 'Grandes travesÃ­as integrales que unen lo mejor de los Andes, la AmazonÃ­a y los cruceros en las Islas GalÃ¡pagos en un solo viaje.',
      zh: 'ç²¾é€‰å…¨æ™¯è·¯çº¿ï¼Œå°†å®‰ç¬¬æ–¯å±±è„‰ã€äºšé©¬é€Šé›¨æž—ä¸ŽåŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›çš„å¥‡è¿¹å®Œç¾Žèžä¸ºä¸€ä½“ã€‚'
    },
    imageUrl: '/images/tours/16-9/cotopaxi-volcano-16-9.webp',
    toursCount: 2,
    slug: 'combined'
  },
  {
    id: 'full-day',
    name: { en: 'Day Excursions', es: 'Excursiones Full Day', fr: 'Excursions Full Day', de: 'Full-Day TagesausflÃ¼ge', it: 'Escursioni Full Day', pt: 'Passeios Full Day', ja: 'æ—¥å¸°ã‚Šãƒ„ã‚¢ãƒ¼ (Full Day)', zh: 'å•æ—¥å…¨æ™¯æ¸¸ (Full Day)' },
    subtitle: {
      en: '1-Day Tours In Mainland Ecuador',
      es: 'Tours De 1 DÃ­a En Ecuador Continental', fr: 'Tours d\'une journÃ©e en Ã‰quateur Continental', de: '1-Tages-Touren in Festland-Ecuador', it: 'Tour di 1 Giorno in Ecuador Continentale', pt: 'Tours de 1 Dia no Equador Continental', ja: 'ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«æœ¬åœŸ 1æ—¥ãƒ„ã‚¢ãƒ¼', zh: 'åŽ„ç“œå¤šå°”å¤§é™† 1æ—¥ç²¾é€‰æ¸¸'
    },
    description: {
      en: 'Immersive 1-day adventures: volcanic craters, Andean waterfalls, cloud forests, thermal springs and indigenous artisan markets.',
      es: 'Aventuras inmersivas de 1 dÃ­a a crÃ¡teres volcÃ¡nicos, cascadas andinas, bosque nuboso, termas y mercados indÃ­genas en Ecuador Continental.',
      zh: 'åŽ„ç“œå¤šå°”å¤§é™†å…¨æ—¥æ¸¸ç²¾é€‰ï¼šèµ¤é“çº¿ã€å¥¥å¡”ç“¦æ´›é›†å¸‚ã€å¸•å¸•äºšå…‹å¡”æ¸©æ³‰ã€æ˜Žå¤šäº‘é›¾æ£®æž—ã€ç§‘æ‰˜å¸•å¸Œä¸ŽåŸºæ´›æ‰˜é˜¿ã€‚'
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
    comment: 'This tour was amazing. Very detailed, organized and so fun. I canâ€™t recommend it enough. Jhayro was an incredible and knowledgeable guide.',
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
    comment: 'My time with Jhayro was truly excellent, I couldnâ€™t have asked for a better tour director for our 11 days in Ecuador. From start to finish, he went above and beyond to make the experience unforgettable. Visiting an Kichwa Community in the Amazon, sharing an authentic meal, exploring an animal refuge, and hiking to a beautiful waterfall were experiences I never would have been able to organize on my own.',
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
    comment: 'We had an amazing time in Ecuador thanks to Jhayro! He was incredibly informative and so passionate about his country and everything it has to offer. You could really feel how much he cares about sharing Ecuadorâ€™s beauty and culture. Always punctual, organized, and attentive.',
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
    comment: 'We had the absolute best experience with our tour guide in Ecuador! From start to finish, he went above and beyond to make sure everything was smooth, enjoyable, and unforgettable. His knowledge of the history, culture, and local spots was incredible. He brought places to life with stories and insights you wouldnâ€™t get anywhere else.',
    verifiedTripAdvisor: true
  },
  {
    id: 'rev-10',
    author: 'Julio M',
    location: 'United States',
    rating: 5,
    date: '2026-04-01',
    tourTitle: 'Ecuador tour (Andes, BaÃ±os, and Galapagos)',
    title: 'Attentive, Professional And Fluent English',
    comment: 'Jhayro was very attentive. Very fluent English made everything so much easier and comfortable throughout the journey. Highly recommended tour company in Ecuador!',
    verifiedTripAdvisor: true
  }
];



