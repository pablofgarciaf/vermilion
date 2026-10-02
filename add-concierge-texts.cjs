const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    aiConcierge: "AI Concierge",
    aiConciergeBadge: "24/7 Instant",
    aiConciergeDesc: "Instant quotes, day-by-day itineraries & customized recommendations.",
    directWhatsapp: "Direct WhatsApp Advisor",
    directWhatsappBadge: "Quito HQ",
    directWhatsappDesc: "Chat with senior travel specialist Pablo & Team (+593 96 003 9156).",
    authorizedOperator: "Authorized Operator",
    responseTime: "Response time: < 1 min",
    aiSpecialistTitle: "Vermilion Routes Expedition Specialist",
    suggestions: "Suggestions:",
    sugg1: "Recommend top Galapagos cruise itineraries and prices",
    sugg2: "How to combine Galapagos and Mainland Ecuador in one trip?",
    sugg3: "I want to request a custom travel quote for 2 people",
    preferHuman: "Prefer human response?",
    transferWhatsApp: "Transfer Chat to WhatsApp",
    leadSaved: "Lead details saved to system!",
    advisorsWillContact: "Our advisors will contact you",
    typeMessage: "Type your message here..."
  },
  es: {
    aiConcierge: "Conserje IA",
    aiConciergeBadge: "24/7 Al instante",
    aiConciergeDesc: "Cotizaciones instantáneas, itinerarios día a día y recomendaciones personalizadas.",
    directWhatsapp: "Asesor Directo por WhatsApp",
    directWhatsappBadge: "Quito HQ",
    directWhatsappDesc: "Chatea con el especialista senior Pablo y su equipo (+593 96 003 9156).",
    authorizedOperator: "Operador Autorizado",
    responseTime: "Tiempo de respuesta: < 1 min",
    aiSpecialistTitle: "Especialista en Expediciones Vermilion",
    suggestions: "Sugerencias:",
    sugg1: "Recomienda los mejores cruceros en Galápagos y precios",
    sugg2: "¿Cómo combinar Galápagos y Ecuador Continental en un solo viaje?",
    sugg3: "Quiero solicitar una cotización de viaje personalizada para 2 personas",
    preferHuman: "¿Prefieres atención humana?",
    transferWhatsApp: "Transferir chat a WhatsApp",
    leadSaved: "¡Datos guardados en el sistema!",
    advisorsWillContact: "Nuestros asesores te contactarán",
    typeMessage: "Escribe tu mensaje aquí..."
  },
  fr: {
    aiConcierge: "Concierge IA",
    aiConciergeBadge: "24/7 Instantané",
    aiConciergeDesc: "Devis instantanés, itinéraires au jour le jour et recommandations personnalisées.",
    directWhatsapp: "Conseiller Direct WhatsApp",
    directWhatsappBadge: "Quito HQ",
    directWhatsappDesc: "Discutez avec le conseiller principal Pablo et son équipe (+593 96 003 9156).",
    authorizedOperator: "Opérateur Autorisé",
    responseTime: "Temps de réponse : < 1 min",
    aiSpecialistTitle: "Spécialiste en Expéditions Vermilion",
    suggestions: "Suggestions :",
    sugg1: "Recommander les meilleures croisières aux Galápagos et les prix",
    sugg2: "Comment combiner les Galápagos et l'Équateur continental en un seul voyage ?",
    sugg3: "Je souhaite demander un devis de voyage personnalisé pour 2 personnes",
    preferHuman: "Préférez-vous une réponse humaine ?",
    transferWhatsApp: "Transférer la conversation sur WhatsApp",
    leadSaved: "Détails enregistrés dans le système !",
    advisorsWillContact: "Nos conseillers vous contacteront",
    typeMessage: "Tapez votre message ici..."
  },
  de: {
    aiConcierge: "KI-Concierge",
    aiConciergeBadge: "24/7 Sofort",
    aiConciergeDesc: "Sofortige Angebote, tägliche Reiserouten & individuelle Empfehlungen.",
    directWhatsapp: "Direkter WhatsApp-Berater",
    directWhatsappBadge: "Quito HQ",
    directWhatsappDesc: "Chatten Sie mit dem leitenden Reiseexperten Pablo & Team (+593 96 003 9156).",
    authorizedOperator: "Autorisierter Betreiber",
    responseTime: "Antwortzeit: < 1 Min.",
    aiSpecialistTitle: "Vermilion Expeditionsspezialist",
    suggestions: "Vorschläge:",
    sugg1: "Top Galapagos-Kreuzfahrten und Preise empfehlen",
    sugg2: "Wie kombiniert man Galapagos und das Festland von Ecuador in einer Reise?",
    sugg3: "Ich möchte ein individuelles Reiseangebot für 2 Personen anfordern",
    preferHuman: "Bevorzugen Sie eine menschliche Antwort?",
    transferWhatsApp: "Chat zu WhatsApp übertragen",
    leadSaved: "Lead-Details im System gespeichert!",
    advisorsWillContact: "Unsere Berater werden Sie kontaktieren",
    typeMessage: "Geben Sie hier Ihre Nachricht ein..."
  },
  it: {
    aiConcierge: "Concierge IA",
    aiConciergeBadge: "24/7 Immediato",
    aiConciergeDesc: "Preventivi istantanei, itinerari giorno per giorno e raccomandazioni personalizzate.",
    directWhatsapp: "Consulente Diretto WhatsApp",
    directWhatsappBadge: "Quito HQ",
    directWhatsappDesc: "Chatta con l'esperto di viaggi senior Pablo e il suo team (+593 96 003 9156).",
    authorizedOperator: "Operatore Autorizzato",
    responseTime: "Tempo di risposta: < 1 min",
    aiSpecialistTitle: "Specialista in Spedizioni Vermilion",
    suggestions: "Suggerimenti:",
    sugg1: "Consiglia i migliori itinerari e prezzi per crociere alle Galapagos",
    sugg2: "Come combinare Galapagos ed Ecuador continentale in un solo viaggio?",
    sugg3: "Voglio richiedere un preventivo di viaggio personalizzato per 2 persone",
    preferHuman: "Preferisci una risposta umana?",
    transferWhatsApp: "Trasferisci la chat su WhatsApp",
    leadSaved: "Dettagli del lead salvati nel sistema!",
    advisorsWillContact: "I nostri consulenti ti contatteranno",
    typeMessage: "Scrivi qui il tuo messaggio..."
  },
  pt: {
    aiConcierge: "Concierge de IA",
    aiConciergeBadge: "24/7 Imediato",
    aiConciergeDesc: "Cotações instantâneas, itinerários dia a dia e recomendações personalizadas.",
    directWhatsapp: "Consultor Direto via WhatsApp",
    directWhatsappBadge: "Quito HQ",
    directWhatsappDesc: "Converse com o especialista sênior Pablo e equipe (+593 96 003 9156).",
    authorizedOperator: "Operador Autorizado",
    responseTime: "Tempo de resposta: < 1 min",
    aiSpecialistTitle: "Especialista em Expedições Vermilion",
    suggestions: "Sugestões:",
    sugg1: "Recomendar os melhores cruzeiros em Galápagos e preços",
    sugg2: "Como combinar Galápagos e o Equador continental em uma viagem?",
    sugg3: "Quero solicitar um orçamento de viagem personalizado para 2 pessoas",
    preferHuman: "Prefere atendimento humano?",
    transferWhatsApp: "Transferir conversa para o WhatsApp",
    leadSaved: "Detalhes do contato salvos no sistema!",
    advisorsWillContact: "Nossos consultores entrarão em contato",
    typeMessage: "Digite sua mensagem aqui..."
  },
  ja: {
    aiConcierge: "AI コンシェルジュ",
    aiConciergeBadge: "24/7 即時",
    aiConciergeDesc: "即時見積もり、日別の日程表、カスタマイズされた推奨事項。",
    directWhatsapp: "WhatsApp 直接相談",
    directWhatsappBadge: "キト本社",
    directWhatsappDesc: "シニア旅行スペシャリストのパブロとチームにチャット (+593 96 003 9156)。",
    authorizedOperator: "公認オペレーター",
    responseTime: "応答時間: 1分未満",
    aiSpecialistTitle: "ヴァーミリオン遠征スペシャリスト",
    suggestions: "提案：",
    sugg1: "おすすめのガラパゴスクルーズの旅程と価格を教えて",
    sugg2: "ガラパゴスとエクアドル本土を1回の旅行で組み合わせる方法は？",
    sugg3: "2人分のカスタマイズされた旅行見積もりをリクエストしたい",
    preferHuman: "人間のスタッフをご希望ですか？",
    transferWhatsApp: "チャットを WhatsApp に転送",
    leadSaved: "連絡先情報がシステムに保存されました！",
    advisorsWillContact: "アドバイザーからご連絡いたします",
    typeMessage: "ここにメッセージを入力..."
  },
  zh: {
    aiConcierge: "AI 礼宾",
    aiConciergeBadge: "24/7 即时",
    aiConciergeDesc: "即时报价，每日行程和定制建议。",
    directWhatsapp: "WhatsApp 直联顾问",
    directWhatsappBadge: "基多总部",
    directWhatsappDesc: "与高级旅行专家 Pablo 及团队聊天 (+593 96 003 9156)。",
    authorizedOperator: "授权运营商",
    responseTime: "响应时间：< 1分钟",
    aiSpecialistTitle: "Vermilion 探险专家",
    suggestions: "建议：",
    sugg1: "推荐顶级的加拉帕戈斯游轮行程和价格",
    sugg2: "如何在一次旅行中结合加拉帕戈斯和厄瓜多尔大陆？",
    sugg3: "我想为2人申请定制的旅行报价",
    preferHuman: "更喜欢人工回复？",
    transferWhatsApp: "将聊天转移到 WhatsApp",
    leadSaved: "线索详情已保存到系统！",
    advisorsWillContact: "我们的顾问将与您联系",
    typeMessage: "在此输入您的消息..."
  }
};

const dir = path.join(__dirname, 'messages');
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.json')) {
    const locale = path.basename(file, '.json');
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.concierge) {
      data.concierge = {};
    }
    
    const localeTrans = translations[locale] || translations['en'];
    Object.assign(data.concierge, localeTrans);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log('Updated ' + file);
  }
});
