import { GoogleGenAI } from '@google/genai';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { mockTours } from '@/data/mock';
import { FULL_DAY_FROM_PRICE } from '@/data/startingPrices';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ConciergeResponse {
  message: string;
  providerUsed: string;
  detectedLead?: {
    name?: string;
    email?: string;
    phone?: string;
    destination?: string;
    travelers?: string;
    travelDates?: string;
  };
  paymentIntent?: {
    tourId?: string;
    clientEmail?: string;
    customerName?: string;
  };
}

function getStr(obj: any, locale: string): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj['en'] || obj['es'] || Object.values(obj)[0] || '';
}

function getHighlightsStr(arr: any, locale: string): string {
  if (!Array.isArray(arr)) return '';
  return arr
    .map((item) => (typeof item === 'string' ? item : getStr(item, locale)))
    .filter(Boolean)
    .join(', ');
}

interface CatalogCache {
  [locale: string]: {
    data: string;
    expiresAt: number;
  };
}
const catalogCache: CatalogCache = {};
const CATALOG_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

/**
 * Fetches real-time tour catalog with localized links, durations, and highlights.
 * Result is cached in-memory per locale for CATALOG_CACHE_TTL_MS.
 */
async function getCatalogContext(locale: string = 'en'): Promise<string> {
  const cached = catalogCache[locale];
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  // Use mockTours as source of truth (combines multiDayTours and dailyTours)
  const data = mockTours
    .map((t) => {
      const title = getStr(t.title, locale);
      const duration = getStr(t.duration, locale);
      const category = getStr(t.category, locale);
      const highlights = getHighlightsStr(t.highlights, locale);
      const dest = t.destination;
      const price = t.price || t.priceFromUSD || (t as any).price3Star || 0;
      const link = `/${locale}/tours/${t.id}`;

      return `- Tour ID: "${t.id}" | Name: "${title}" | Link: "${link}" | Duration: "${duration}" | Starting Price: $${price} USD | Dest: "${dest}" | Category: "${category}" | Highlights: ${highlights || 'Private naturalist guides, boutique lodges, customized transfers'}`;
    })
    .join('\n');

  catalogCache[locale] = { data, expiresAt: Date.now() + CATALOG_CACHE_TTL_MS };
  return data;
}

const LOCALE_NAMES: Record<string, string> = {
  es: 'Spanish (Español)',
  en: 'English',
  fr: 'French (Français)',
  de: 'German (Deutsch)',
  it: 'Italian (Italiano)',
  pt: 'Portuguese (Português)',
  ja: 'Japanese (日本語)',
  zh: 'Simplified Chinese (中文)',
};

/**
 * Builds system prompt with consultative luxury sales loop engineering
 */
export async function buildSystemPrompt(locale: string = 'en'): Promise<string> {
  const catalog = await getCatalogContext(locale);
  const targetLanguage = LOCALE_NAMES[locale] || 'Spanish (Español)';

  return `You are "Pyro", the Lead Private Expedition Specialist & Senior VIP Concierge at Vermilion Routes (https://vermilionroutes.com).
Vermilion Routes is the premier luxury expedition operator for Ecuador and the Galapagos Islands, recognized as TripAdvisor Travelers' Choice 2026 Winner (5.0 rating with 51+ five-star verified reviews).

CRITICAL INSTRUCTION: You MUST communicate EXCLUSIVELY in ${targetLanguage}. Do not use English unless the user writes in English. All your responses, suggestions, tour links, and tone MUST be in ${targetLanguage}.

### 🚨 MANDATO CRÍTICO DE VENTAS: EL CERRADOR DE LUJO (PROHIBIDO INTERROGAR)
Eres un Asesor Senior de Ventas de Expediciones de Ultra-Lujo en Vermilion Routes. Tu único propósito es VENDER y CERRAR reservas, NO hacer de recepcionista ni ser un loro que hace preguntas.

1. PROHIBIDO EL MODO INTERROGATORIO (CERO ENCUESTAS):
- Está TERMINANTEMENTE PROHIBIDO encadenar preguntas como "¿cuántos días?", "¿en qué fechas?", "¿prefieres crucero o hotel?", "¿qué actividades te gustan?", "¿qué regiones te atraen?".
- NUNCA hagas preguntas exploratorias abiertas. El viajero no entra al chat a ser interrogado; entra a ver expediciones de lujo, precios y soluciones.
- NUNCA hagas más de UNA sola pregunta al final de tu respuesta, y esa única pregunta DEBE ser una pregunta de CIERRE de venta.

2. PRESCRIPCIÓN INMEDIATA EN EL PRIMER MENSAJE DE INTERÉS:
En el instante en que el viajero mencione cualquier destino, actividad, duración o preferencia (ej. Galápagos, tortugas marinas, crucero, 10-12 días, Mindo, volcanes, etc.):
- Recomienda INMEDIATAMENTE de 1 a 2 tours específicos de nuestro catálogo que resuelvan su deseo.
- Cada tour DEBE tener su enlace Markdown exacto: [Nombre del Tour](/${locale}/tours/\${tourId})
- Incluye duración y precio real de partida: (X Días • Desde $Y USD por persona).
- Explica la logística sin fricción: por ejemplo, que el Bosque Nublado de Mindo está a solo 2 horas en traslado privado desde Quito, lo que lo convierte en el día perfecto de aclimatación antes o después de volar a Galápagos.

3. LLAMADOS A LA ACCIÓN (CTA) Y CIERRE OBLIGATORIO EN CADA RESPUESTA:
- Incluye SIEMPRE los enlaces de acción directa para ver el itinerario o reservar:
  👉 [Ver Itinerario Completo y Reservar - Nombre del Tour](/${locale}/tours/\${tourId})
  💬 [Conversar por WhatsApp VIP (+593 96 003 9156)](https://wa.me/593960039156?text=Hola,%20quisiera%20reservar%20el%20tour)
- Termina SIEMPRE con una pregunta de cierre asertiva para avanzar a la reserva:
  "¿Deseas que aseguremos tu camarote en el yate o prefieres revisar el itinerario detallado en el enlace?"

### TOUR CATALOG WITH VERIFIED LOCALIZED LINKS (ALWAYS USE THESE LINKS IN YOUR REPLIES):
${catalog}

### KEY CURATED EXPEDITIONS CHEAT SHEET:
- **Galapagos & Mainland Combined (10 to 12 Days):**
  - **Ecuador & Galápagos 11 Días** ([Enlace](/${locale}/tours/ecuador-galapagos-11days) • Desde $3,850 USD): The flagship combo. Quito, Cotopaxi, Baños waterfalls, Amazon lodge + Galapagos with yacht navigation & sea turtles.
  - **Ecuador & Galápagos 12 Días** ([Enlace](/${locale}/tours/ecuador-galapagos-12days) • Desde $4,290 USD): The comprehensive ultimate grand journey.
- **Galapagos Dedicated Expeditions (Cruises & Island Hopping):**
  - **Galápagos 6 Días** ([Enlace](/${locale}/tours/galapagos-6days) • Desde $2,450 USD): Santa Cruz, Isabela, Los Túneles snorkeling with sea turtles & rays.
  - **Galápagos 7 Días Crucero & Expedición** ([Enlace](/${locale}/tours/galapagos-7days) • Desde $2,890 USD): Intimate yacht experience, sea lions, marine iguanas, giant tortoises.
  - **Galápagos 8 Días Expedición Total** ([Enlace](/${locale}/tours/galapagos-8days) • Desde $3,350 USD): Multi-island natural history immersion.
- **Mainland Day Tours (from Quito):**
  - **Bosque Nublado de Mindo & Santuario de Colibríes** ([Enlace](/${locale}/tours/mindo-cloud-forest) • 1 Día • Desde $165 USD): 2h from Quito. Hundreds of hummingbirds, Tarabita cable car over waterfalls, chocolate workshop. The perfect pre/post-Galapagos addition!
  - **Parque Nacional Cotopaxi** ([Enlace](/${locale}/tours/cotopaxi-national-park) • 1 Día • Desde $145 USD)
  - **Laguna del Quilotoa** ([Enlace](/${locale}/tours/quilotoa-crater-lake) • 1 Día • Desde $155 USD)
  - **Mercado Indígena de Otavalo** ([Enlace](/${locale}/tours/otavalo-indigenous-market) • 1 Día • Desde $140 USD)
  - **Termas de Papallacta** ([Enlace](/${locale}/tours/papallacta-hot-springs) • 1 Día • Desde $150 USD)
- **Custom Itinerary Planner:** [Diseñar Itinerario a Medida](/${locale}/booking)

### EXPRESS 24-HOUR DEPARTURES (SALIDAS RELÁMPAGO EN 24 HORAS):
If a traveler asks to travel tomorrow or within 48 hours ("¿Quieres viajar mañana?"), reassure them with absolute confidence: Vermilion Routes maintains permanent operations desks stationed in Quito and Galapagos. Domestic flights, park transit cards (TCT), naturalist guides, boutique hotels, and private yachts can be confirmed in under 24 hours. Connect them immediately to WhatsApp (+593 96 003 9156 / +593 99 404 8458).

### AMBASSADOR & AFFILIATE PROGRAM ("PLAN HIGH-TICKET 10-3-2"):
- 10% instant discount for travelers using a ref link (?ref=username).
- 10% direct commission in USD on luxury tours ($300-$700+ per booking).
- 3% tier 1, 2% tier 2, 6% global profit pool.
- Free instant registration: [Unirse al Club de Embajadores](/${locale}/affiliates).

### LEAD CAPTURE:
When the user shares contact details (name, email, phone, or specific dates), append this exact tag at the very end of your response:
[[LEAD_DATA: {"customerName":"...", "customerEmail":"...", "customerPhone":"...", "destination":"...", "travelers":"...", "travelDates":"..."}]]
`;
}

const AI_TIMEOUT_MS = 8000;

function createTimeoutSignal(ms: number = AI_TIMEOUT_MS): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeoutId),
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number = AI_TIMEOUT_MS, label: string = 'Operation'): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

/**
 * Multi-Provider AI Routing Engine
 * Supports: NVIDIA API, DeepSeek, GLM (Zhipu AI), Gemini, or Fallback.
 */
export async function generateConciergeReply(
  messages: ChatMessage[],
  preferredProvider?: string,
  locale: string = 'en'
): Promise<ConciergeResponse> {
  const systemPrompt = await buildSystemPrompt(locale);

  const activeProvider = (
    preferredProvider ||
    process.env.AI_PROVIDER ||
    'nvidia'
  ).toLowerCase();

  const nvidiaKey = process.env.NVIDIA_API_KEY || process.env.NVAPI_KEY;
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const glmKey = process.env.GLM_API_KEY || process.env.ZHIPU_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  // 1. Try NVIDIA API (Nemotron 3 Super 120B / GPT-OSS 20B)
  if ((activeProvider === 'nvidia' || (!deepseekKey && !glmKey)) && nvidiaKey) {
    const { signal, cleanup } = createTimeoutSignal(AI_TIMEOUT_MS);
    try {
      const response = await fetch(
        'https://integrate.api.nvidia.com/v1/chat/completions',
        {
          method: 'POST',
          signal,
          headers: {
            Authorization: `Bearer ${nvidiaKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'nvidia/nemotron-3-super-120b-a12b',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.5,
            max_tokens: 1024,
            chat_template_kwargs: { enable_thinking: false },
          }),
        }
      );
      cleanup();

      if (response.ok) {
        const data = await response.json();
        const replyText =
          data.choices?.[0]?.message?.content || '';
        if (replyText) {
          return parseResponseText(replyText, 'NVIDIA (Nemotron-3-Super-120B)');
        }
      } else {
        console.warn('NVIDIA primary model status error:', response.status);
        // Fallback directly to secondary model on NVIDIA (GPT-OSS-20B)
        const fallbackRes = await fetch(
          'https://integrate.api.nvidia.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${nvidiaKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'openai/gpt-oss-20b',
              messages: [
                { role: 'system', content: systemPrompt },
                ...messages.map((m) => ({ role: m.role, content: m.content })),
              ],
              temperature: 0.5,
              max_tokens: 1024,
            }),
          }
        );
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          const fallbackReply = fallbackData.choices?.[0]?.message?.content;
          if (fallbackReply) {
            return parseResponseText(fallbackReply, 'NVIDIA (GPT-OSS-20B)');
          }
        }
      }
    } catch (err) {
      cleanup();
      console.warn('NVIDIA API execution failed or timed out:', err);
    }
  }

  // 2. Try DeepSeek API
  if ((activeProvider === 'deepseek' || deepseekKey) && deepseekKey) {
    const { signal, cleanup } = createTimeoutSignal(AI_TIMEOUT_MS);
    try {
      const response = await fetch(
        'https://api.deepseek.com/v1/chat/completions',
        {
          method: 'POST',
          signal,
          headers: {
            Authorization: `Bearer ${deepseekKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.6,
            max_tokens: 1024,
          }),
        }
      );
      cleanup();

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || '';
        if (replyText) {
          return parseResponseText(replyText, 'DeepSeek V3');
        }
      }
    } catch (err) {
      cleanup();
      console.warn('DeepSeek API execution failed or timed out:', err);
    }
  }

  // 3. Try GLM (Zhipu AI API)
  if ((activeProvider === 'glm' || glmKey) && glmKey) {
    const { signal, cleanup } = createTimeoutSignal(AI_TIMEOUT_MS);
    try {
      const response = await fetch(
        'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        {
          method: 'POST',
          signal,
          headers: {
            Authorization: `Bearer ${glmKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'glm-4-flash',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            temperature: 0.6,
            max_tokens: 1024,
          }),
        }
      );
      cleanup();

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || '';
        if (replyText) {
          return parseResponseText(replyText, 'GLM-4 Flash');
        }
      }
    } catch (err) {
      cleanup();
      console.warn('GLM API execution failed or timed out:', err);
    }
  }

  // 4. Try Google Gemini API
  if (geminiKey || activeProvider === 'gemini') {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey || process.env.GEMINI_API_KEY });
      const conversationText = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');

      const res = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: conversationText,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.5,
          },
        }),
        AI_TIMEOUT_MS,
        'Gemini API'
      );

      if (res.text) {
        return parseResponseText(res.text, 'Google Gemini 2.5 Flash');
      }
    } catch (err) {
      console.warn('Gemini API execution failed or timed out:', err);
    }
  }

  // 5. Intelligent Fallback Concierge Engine with 8 language support
  return generateFallbackConciergeReply(messages, systemPrompt, locale);
}

/**
 * Extracts [[LEAD_DATA: {...}]] tags from AI generated text if present
 */
function parseResponseText(fullText: string, providerName: string): ConciergeResponse {
  let cleanMessage = fullText;
  let detectedLead: ConciergeResponse['detectedLead'] = undefined;
  let paymentIntent: ConciergeResponse['paymentIntent'] = undefined;

  const leadMatch = fullText.match(/\[\[LEAD_DATA:\s*(\{.*?\})\s*\]\]/s);
  if (leadMatch && leadMatch[1]) {
    try {
      detectedLead = JSON.parse(leadMatch[1]);
      cleanMessage = cleanMessage.replace(/\[\[LEAD_DATA:\s*\{.*?\}\s*\]\]/s, '').trim();
    } catch (e) {
      console.warn('Failed to parse lead JSON from AI output:', e);
    }
  }

  const paymentMatch = fullText.match(/\[\[PAYMENT_INTENT:\s*(\{.*?\})\s*\]\]/s);
  if (paymentMatch && paymentMatch[1]) {
    try {
      paymentIntent = JSON.parse(paymentMatch[1]);
      cleanMessage = cleanMessage.replace(/\[\[PAYMENT_INTENT:\s*\{.*?\}\s*\]\]/s, '').trim();
    } catch (e) {
      console.warn('Failed to parse payment intent from AI output:', e);
    }
  }

  return {
    message: cleanMessage,
    providerUsed: providerName,
    detectedLead,
    paymentIntent,
  };
}

/**
 * Smart rules-based fallback engine for uninterrupted guest service in 8 languages
 */
function generateFallbackConciergeReply(
  messages: ChatMessage[],
  _catalogPrompt: string,
  locale: string = 'en'
): ConciergeResponse {
  const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || '';

  // Language dispatch
  let reply = '';
  switch (locale) {
    case 'es':
      if (lastUserMsg.includes('mindo') || lastUserMsg.includes('bosque')) {
        reply = `¡El **Bosque Nublado de Mindo** es un paraíso absoluto para los amantes de las orquídeas, cascadas y colibríes! Está a solo 2 horas privadas de Quito.\n\nPuedes ver los detalles de nuestra excursión privada aquí:\n👉 [Bosque Nublado de Mindo & Santuario de Colibríes](/${locale}/tours/mindo-cloud-forest) (1 Día • Desde $165 USD)\n\n¿Te gustaría combinar Mindo con Galápagos en una expedición de 11 días o prefieres que te contactemos por [WhatsApp VIP (+593 96 003 9156)](https://wa.me/593960039156?text=Hola,%20me%20interesa%20Mindo%20y%20Galapagos)?`;
      } else if (lastUserMsg.includes('galapagos') || lastUserMsg.includes('tortuga') || lastUserMsg.includes('crucer') || lastUserMsg.includes('isla')) {
        reply = `¡Navegar por las **Islas Galápagos** y nadar con tortugas marinas y leones marinos es una vivencia inigualable!\n\nNuestras expediciones recomendadas con cupos garantizados son:\n👉 [Ecuador & Galápagos 11 Días](/${locale}/tours/ecuador-galapagos-11days) (Desde $3,850 USD) — Incluye Quito, volcanes, Amazonía y crucero en Galápagos.\n👉 [Galápagos 7 Días Crucero & Expedición](/${locale}/tours/galapagos-7days) (Desde $2,890 USD)\n\n¿Tienes fechas tentativas o prefieres consultar disponibilidad inmediata por [WhatsApp VIP](https://wa.me/593960039156?text=Hola,%20quisiera%20consultar%20disponibilidad%20para%20Galapagos)?`;
      } else if (lastUserMsg.includes('precio') || lastUserMsg.includes('costo') || lastUserMsg.includes('cotiz')) {
        reply = `Nuestras expediciones a medida van desde excursiones privadas de 1 día (desde ${'$'}${FULL_DAY_FROM_PRICE} USD) hasta travesías de 12 días con guías naturalistas y yates boutique.\n\nPuedes explorar todos los precios aquí: [Ver Catálogo de Expediciones](/${locale}/tours) o pedir tu cotización gratis en [Diseñar Itinerario a Medida](/${locale}/booking).\n\n¿Deseas que un asesor te asista en tiempo real por [WhatsApp VIP (+593 96 003 9156)](https://wa.me/593960039156)?`;
      } else {
        reply = `¡Hola! Soy **Pyro**, Especialista en Expediciones y Concierge VIP en Vermilion Routes.\n\nDiseñamos viajes privados y a medida por **Ecuador Continental y las Islas Galápagos** con salidas garantizadas todo el año y confirmación en 24 horas.\n\n¿Te atrae más la fauna marina de 👉 [Islas Galápagos](/${locale}/tours?destination=galapagos) o la magia de los Andes y 👉 [Bosque de Mindo](/${locale}/tours/mindo-cloud-forest)?`;
      }
      break;

    case 'fr':
      reply = `Bonjour ! Je suis **Pyro**, votre Concierge VIP chez Vermilion Routes.\n\nNos expéditions exclusives aux **Îles Galápagos et en Équateur** sont entièrement privatisées et personnalisables.\n\nDécouvrez nos itinéraires phares :\n👉 [Équateur & Galápagos 11 Jours](/${locale}/tours/ecuador-galapagos-11days)\n👉 [Forêt de Nuages de Mindo](/${locale}/tours/mindo-cloud-forest)\n\nSouhaitez-vous que nous vérifiions les disponibilités de yachts sur [WhatsApp VIP (+593 96 003 9156)](https://wa.me/593960039156) ?`;
      break;

    case 'de':
      reply = `Guten Tag! Ich bin **Pyro**, Ihr persönlicher VIP Concierge bei Vermilion Routes.\n\nWir gestalten exklusive Luxusreisen durch **Ecuador und die Galapagos-Inseln** mit privaten Guides und Boutique-Hotels.\n\nUnsere beliebtesten Expeditionen:\n👉 [Ecuador & Galapagos 11 Tage](/${locale}/tours/ecuador-galapagos-11days)\n👉 [Mindo Nebelwald & Kolibri-Reservat](/${locale}/tours/mindo-cloud-forest)\n\nKontaktieren Sie uns gerne direkt über [WhatsApp VIP (+593 96 003 9156)](https://wa.me/593960039156) für ein individuelles Angebot.`;
      break;

    case 'it':
      reply = `Buongiorno! Sono **Pyro**, il tuo Concierge VIP per Vermilion Routes.\n\nCreiamo itinerari su misura tra l'**Ecuador Continentale e le Isole Galapagos**.\n\nI nostri itinerari più amati:\n👉 [Ecuador & Galapagos 11 Giorni](/${locale}/tours/ecuador-galapagos-11days)\n👉 [Foresta Nebbiosa di Mindo](/${locale}/tours/mindo-cloud-forest)\n\nPreferisci verificare la disponibilità delle cabine su [WhatsApp VIP (+593 96 003 9156)](https://wa.me/593960039156)?`;
      break;

    case 'pt':
      reply = `Olá! Sou **Pyro**, seu Concierge VIP na Vermilion Routes.\n\nDesenhamos roteiros sob medida pelas **Ilhas Galápagos e Equador Continental** com guias naturalistas dedicados.\n\nExperiências em destaque:\n👉 [Equador & Galápagos 11 Dias](/${locale}/tours/ecuador-galapagos-11days)\n👉 [Floresta Nebulosa de Mindo](/${locale}/tours/mindo-cloud-forest)\n\nDeseja consultar disponibilidade em tempo real pelo [WhatsApp VIP (+593 96 003 9156)](https://wa.me/593960039156)?`;
      break;

    case 'ja':
      reply = `こんにちは！Vermilion Routes専任AIコンシェルジュの**Pyro（パイロ）**です。\n\n**ガラパゴス諸島およびエクアドル本土**の最高峰オーダーメイド旅行をご案内いたします。\n\n人気のプラン：\n👉 [エクアドル＆ガラパゴス 11日間](/${locale}/tours/ecuador-galapagos-11days)\n👉 [ミンド雲霧林プライベートツアー](/${locale}/tours/mindo-cloud-forest)\n\nご希望の日程や詳細を [VIP WhatsApp (+593 96 003 9156)](https://wa.me/593960039156) にてお気軽にお問い合わせください。`;
      break;

    case 'zh':
      reply = `您好！我是 Vermilion Routes 的专属 AI 旅行礼宾顾问 **Pyro**。\n\n我们为您量身定制**加拉帕戈斯群岛与厄瓜多尔大陆**的高端私家探险之旅：\n👉 [厄瓜多尔与加拉帕戈斯11天旗舰之旅](/${locale}/tours/ecuador-galapagos-11days)\n👉 [明多云雾森林与蜂鸟保护区1日游](/${locale}/tours/mindo-cloud-forest)\n\n欢迎通过 [VIP WhatsApp (+593 96 003 9156)](https://wa.me/593960039156) 实时获取定制行程与游艇舱位。`;
      break;

    default: // en
      if (lastUserMsg.includes('mindo') || lastUserMsg.includes('cloud forest')) {
        reply = `The **Mindo Cloud Forest** is an astonishing biodiversity haven with hundreds of hummingbirds, orchid gardens, and waterfall cable cars just 2 hours from Quito!\n\nExplore our private day expedition:\n👉 [Mindo Cloud Forest & Hummingbirds](/${locale}/tours/mindo-cloud-forest) (1 Day • From $165 USD)\n\nWould you like to combine Mindo with a Galapagos cruise? Chat with our team on [VIP WhatsApp (+593 96 003 9156)](https://wa.me/593960039156?text=Hello,%20I%20am%20interested%20in%20Mindo%20and%20Galapagos) for instant assistance.`;
      } else if (lastUserMsg.includes('galapagos') || lastUserMsg.includes('turtle') || lastUserMsg.includes('cruise') || lastUserMsg.includes('island')) {
        reply = `Snorkeling with sea turtles and marine iguanas in the **Galapagos Islands** is truly an unforgettable adventure!\n\nOur top-rated expeditions with guaranteed departures are:\n👉 [Ecuador & Galapagos 11 Days](/${locale}/tours/ecuador-galapagos-11days) (From $3,850 USD) — The Avenue of Volcanoes, Amazon & Galapagos Cruise.\n👉 [Galapagos Unveiled 7 Days Cruise](/${locale}/tours/galapagos-7days) (From $2,890 USD)\n\nDo you have tentative dates, or would you like us to check real-time yacht availability on [VIP WhatsApp](https://wa.me/593960039156?text=Hello,%20checking%20Galapagos%20availability)?`;
      } else if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('quote')) {
        reply = `Our private bespoke expeditions range from day tours (from ${'$'}${FULL_DAY_FROM_PRICE} USD) to 12-day complete journeys with private naturalist guides and luxury yacht cabins.\n\nYou can explore all itineraries here: [View Expeditions Catalog](/${locale}/tours) or customize your trip in [Bespoke Journey Planner](/${locale}/booking).\n\nWould you like an immediate proposal on [VIP WhatsApp (+593 96 003 9156)](https://wa.me/593960039156)?`;
      } else {
        reply = `Hello! I am **Pyro**, Lead Expedition Specialist & VIP Concierge at Vermilion Routes.\n\nWe craft private, bespoke journeys through **Mainland Ecuador and the Galapagos Islands**, backed by TripAdvisor Travelers' Choice 2026 excellence and 24-hour express confirmations.\n\nAre you looking to explore the marine wildlife of 👉 [Galapagos Islands](/${locale}/tours?destination=galapagos) or the lush Andean nature in 👉 [Mindo Cloud Forest](/${locale}/tours/mindo-cloud-forest)?`;
      }
      break;
  }

  return {
    message: reply,
    providerUsed: 'Vermilion Concierge Engine',
  };
}
