const fs = require('fs');
const path = require('path');

const messages = {
  en: "Hello Vermilion Routes! I would like to contact with a human travel specialist about planning an itinerary in Ecuador and Galapagos Islands.",
  es: "¡Hola Vermilion Routes! Me gustaría contactar a un especialista en viajes para planificar un itinerario en Ecuador y las Islas Galápagos.",
  fr: "Bonjour Vermilion Routes ! Je souhaite contacter un conseiller en voyages pour planifier un itinéraire en Équateur et aux Îles Galápagos.",
  de: "Hallo Vermilion Routes! Ich möchte einen Reiseexperten kontaktieren, um eine Reiseroute in Ecuador und auf den Galapagos-Inseln zu planen.",
  it: "Ciao Vermilion Routes! Vorrei contattare un esperto di viaggi per pianificare un itinerario in Ecuador e alle Isole Galapagos.",
  pt: "Olá Vermilion Routes! Gostaria de falar com um especialista em viagens para planejar um itinerário no Equador e nas Ilhas Galápagos.",
  ja: "こんにちは Vermilion Routes！エクアドルとガラパゴス諸島の旅行を計画するために、旅行の専門家に連絡したいです。",
  zh: "您好 Vermilion Routes！我想联系一位旅行专家，计划一次在厄瓜多尔和加拉帕戈斯群岛的旅行。"
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
    
    data.concierge.defaultWaMessage = messages[locale] || messages['en'];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log('Updated ' + file);
  }
});
