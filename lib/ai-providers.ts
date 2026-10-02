import { GoogleGenAI } from '@google/genai';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { mockTours } from '@/data/mock';

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

/** âœ… W-01 FIX: CachÃ© de catÃ¡logo en memoria con TTL de 5 minutos.
 * Evita un getDocs() de Firestore en cada mensaje del concierge.
 */
interface CatalogCache {
  data: string;
  expiresAt: number;
}
let catalogCache: CatalogCache | null = null;
const CATALOG_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

/**
 * Fetches real-time tour catalog from Firestore or fallback mock.
 * Result is cached in-memory for CATALOG_CACHE_TTL_MS to avoid per-request reads.
 */
async function getCatalogContext(): Promise<string> {
  // Servir desde cachÃ© si aÃºn es vÃ¡lido
  if (catalogCache && Date.now() < catalogCache.expiresAt) {
    return catalogCache.data;
  }

  try {
    if (!db) throw new Error('Firebase DB is not initialized');
    const querySnap = await getDocs(collection(db, 'tours'));
    if (!querySnap.empty) {
      const tours = querySnap.docs.map((d) => d.data());
      const data = tours
        .map(
          (t: any) =>
            `- ID: "${t.id}" | Title: "${t.title}" | Dest: "${t.destination}" | Duration: "${t.duration}" | Price: $${t.price} USD | Rating: ${t.rating}\u2605 | Category: "${t.category}" | Highlights: ${t.highlights?.join(', ') || 'N/A'}`
        )
        .join('\n');
      // Almacenar en cachÃ©
      catalogCache = { data, expiresAt: Date.now() + CATALOG_CACHE_TTL_MS };
      return data;
    }
  } catch (err) {
    console.warn('Catalog fetch for AI context fallback:', err);
  }

  // Fallback a mock (no cachear errores para reintentar en el prÃ³ximo request)
  return mockTours
    .map(
      (t) =>
        `- ID: "${t.id}" | Title: "${t.title}" | Dest: "${t.destination}" | Duration: "${t.duration}" | Price: $${t.price} USD | Rating: ${t.rating}\u2605 | Category: "${t.category}" | Highlights: ${t.highlights?.join(', ')}`
    )
    .join('\n');
}

const LOCALE_NAMES: Record<string, string> = {
  es: 'Spanish (EspaÃ±ol)',
  en: 'English',
  fr: 'French (FranÃ§ais)',
  de: 'German (Deutsch)',
  it: 'Italian (Italiano)',
  pt: 'Portuguese (PortuguÃªs)',
  ja: 'Japanese (æ—¥æœ¬èªž)',
  zh: 'Simplified Chinese (ä¸­æ–‡)',
};

/**
 * Builds system prompt with sales loop engineering
 */
export async function buildSystemPrompt(locale: string = 'en'): Promise<string> {
  const catalog = await getCatalogContext();
  const targetLanguage = LOCALE_NAMES[locale] || 'Spanish (EspaÃ±ol)';

  return `You are "Pyro", the Senior Consultative Sales & VIP Ambassador Concierge at Vermilion Routes (https://vermilionroutes.com).

CRITICAL INSTRUCTION: You MUST communicate EXCLUSIVELY in ${targetLanguage}. Do not use English unless the user speaks English. All your responses, suggestions, and output MUST be in ${targetLanguage}.

### CORE MISSION & SALES PHILOSOPHY:
You are an elite, warm, and highly persuasive travel & business advisor.
CRITICAL SALES RULE: The key to great sales is ACTIVE LISTENING and BREVITY.
- KEEP RESPONSES SHORT AND PUNCHY (2 to 4 sentences maximum).
- Never overwhelm the client with long walls of text. Answer their exact question first, then ask one clarifying question to understand their needs.
- After 1-2 interactions, guide them naturally to the next step (WhatsApp handoff, email quote, or free ambassador registration).

### CURRENT VISITOR LANGUAGE:
- Language: **${targetLanguage}** (locale code: "${locale}").
- You MUST respond in **${targetLanguage}** with impeccable, natural phrasing.

### TOUR CATALOG CONTEXT:
${catalog}

### AMBASSADOR & AFFILIATE PROGRAM ("PLAN HIGH-TICKET 10-3-2"):
- **Client Benefit**: 10% instant discount on checkout using ref link (?ref=username).
- **Direct Commission (Level 0)**: 10% in USD on every sale, without limits.
- **Team Commission (Level 1)**: 3% on the first $10,000 USD sold by direct recruits (Padre).
- **Extended Team (Level 2)**: 2% on second level (Abuelo).
- **Reverse Compression**: If uplines are inactive/capped, the seller earns up to 15% total.
- **Global Pool (6%)**: Profit-sharing shares at $3,000, $7,000, and $15,000 monthly volume.
- **Registration**: Free, simple, no initial password needed (ID number is temporary password).

### EXPRESS 24-HOUR DEPARTURES SPECIALIST (SALIDAS RELÃMPAGO EN 24 HORAS):
- **Core Differentiator**: We specialize in immediate, last-minute express departures within 24 hours.
- **Promise**: If a traveler asks to travel tomorrow or within 48 hours ("Â¿Quieres viajar maÃ±ana?"), reassure them warmly and immediately: Vermilion Routes maintains permanent operations teams stationed in Quito and the Galapagos Islands. We coordinate and confirm domestic flights (UIO/GYE - GPS/SCY), Galapagos National Park transit cards (TCT) and park fees, private yachts, certified naturalist guides, and boutique hotels in under 24 hours.
- For urgent departures, prioritize immediate WhatsApp handoff (+593 96 003 9156 / +593 99 404 8458) so the flight desk and yachts can be booked instantly.

### CONSULTATIVE CONVERSATION LOOP:
1. **Direct Answer**: Give a clear, direct answer in 1-2 sentences.
2. **Listen & Qualify**: Ask what they specifically need:
   - For Travelers: Dates (especially if they need to travel tomorrow or soon), destinations (Galapagos vs Andes/Amazon), or number of travelers?
   - For Ambassadors: Are they looking to monetize their social media audience or promote to luxury clients?
3. **Closing Call-to-Action**: Propose:
   - "Â¿Deseas que te contactemos por WhatsApp (+593 96 003 9156 / +593 99 404 8458) o llamada inmediata?"
   - "Â¿Prefieres dejarnos tu correo para enviarte el itinerario personalizado o cotizaciÃ³n?"
   - "Â¿O deseas registrarte gratis ahora mismo en nuestro portal de embajadores?"

### LEAD EXTRACTION:
When user provides contact details (name, email, or phone), append at the end:
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

  // 1. Try NVIDIA API (Meta Llama 3.1 70B Instruct / Mistral)
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
            model: 'meta/llama-3.1-70b-instruct',
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
        const replyText =
          data.choices?.[0]?.message?.content || 'Thank you for reaching out!';
        return parseResponseText(replyText, 'NVIDIA (Meta Llama-3.1-70B)');
      } else {
        console.warn('NVIDIA API status error:', response.status);
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
      const formattedHistory = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
      const fullPrompt = `${systemPrompt}\n\nCONVERSATION HISTORY:\n${formattedHistory}\n\nASSISTANT:`;

      const res = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
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
      if (lastUserMsg.includes('galapagos') || lastUserMsg.includes('isla')) {
        reply = `Â¡Hola! Con mucho gusto te asesoro sobre nuestras **Expediciones Exclusivas a las Islas GalÃ¡pagos**.\n\nNuestras experiencias insignia incluyen:\n- **Ecuador Continental y GalÃ¡pagos Completo** (11 y 12 DÃ­as)\n- **GalÃ¡pagos Esencial e Isla Isabela** (4, 5 y 6 DÃ­as)\n\nÂ¿En quÃ© fechas tentativas planeas viajar y cuÃ¡ntas personas te acompaÃ±an? Con esos datos te preparo una propuesta a medida.`;
      } else if (lastUserMsg.includes('precio') || lastUserMsg.includes('costo') || lastUserMsg.includes('cotiz')) {
        reply = `Nuestras expediciones a medida van desde escapadas de 1 dÃ­a hasta travesÃ­as integrales de 12 dÃ­as, con guÃ­as naturalistas privados, hoteles boutique seleccionados y logÃ­stica integral.\n\nSi me compartes tu **Nombre**, **Correo** y **WhatsApp**, te preparo una cotizaciÃ³n formal y personalizada de inmediato.`;
      } else {
        reply = `Â¡Hola! Soy **Pyro**, tu Concierge y asesor de viajes inteligente en Vermilion Routes.\n\nYa sea que sueÃ±es con nadar con leones marinos en **GalÃ¡pagos**, explorar la **AmazonÃ­a profunda** o recorrer la **Avenida de los Volcanes**, estoy listo para ayudarte a diseÃ±ar la experiencia perfecta.\n\nÂ¿QuÃ© destino te gustarÃ­a conocer primero?`;
      }
      break;

    case 'fr':
      reply = `Bonjour ! Je suis **Pyro**, votre Concierge chez Vermilion Routes.\n\nNos expÃ©ditions exclusives aux **ÃŽles GalÃ¡pagos et en Ã‰quateur Continental** sont entiÃ¨rement personnalisables.\n\nQuelles sont vos dates de voyage souhaitÃ©es et le nombre de participants ? Je me ferai un plaisir de vous prÃ©parer un itinÃ©raire sur mesure.`;
      break;

    case 'de':
      reply = `Guten Tag! Ich bin **Pyro**, Ihr Concierge bei Vermilion Routes.\n\nGerne plane ich Ihre maÃŸgeschneiderte Luxusreise durch **Festland-Ecuador und die Galapagos-Inseln**.\n\nWelche Reisedaten oder Regionen interessieren Sie besonders?`;
      break;

    case 'it':
      reply = `Buongiorno! Sono **Pyro**, il tuo Concierge per Vermilion Routes.\n\nSarei lieto di aiutarti a creare un itinerario su misura per le **Isole Galapagos e l'Ecuador Continentale**.\n\nIn quali date vorresti viaggiare e quante persone faranno parte del viaggio?`;
      break;

    case 'pt':
      reply = `OlÃ¡! Sou **Pyro**, seu Concierge na Vermilion Routes.\n\nSerÃ¡ um prazer desenhar seu roteiro personalizado pelas **Ilhas GalÃ¡pagos e Equador Continental**.\n\nQuais sÃ£o as suas datas de viagem estimadas e o nÃºmero de pessoas?`;
      break;

    case 'ja':
      reply = `ã“ã‚“ã«ã¡ã¯ï¼Vermilion Routeså°‚ä»»AIã‚³ãƒ³ã‚·ã‚§ãƒ«ã‚¸ãƒ¥ã®**Pyroï¼ˆãƒ‘ã‚¤ãƒ­ï¼‰**ã§ã™ã€‚\n\n**ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶ãŠã‚ˆã³ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«æœ¬åœŸ**ã®ã‚ªãƒ¼ãƒ€ãƒ¼ãƒ¡ã‚¤ãƒ‰æ—…è¡Œãƒ—ãƒ©ãƒ³ã‚’ã”æ¡ˆå†…ã„ãŸã—ã¾ã™ã€‚\n\nã”å¸Œæœ›ã®æ™‚æœŸã‚„äººæ•°ã‚’ãŠçŸ¥ã‚‰ã›ã„ãŸã ã‘ã‚Œã°ã€æœ€é©ãªãƒ—ãƒ©ãƒ³ã¨ãŠè¦‹ç©ã‚Šã‚’ã”ææ¡ˆã„ãŸã—ã¾ã™ã€‚`;
      break;

    case 'zh':
      reply = `æ‚¨å¥½ï¼æˆ‘æ˜¯ Vermilion Routes çš„ä¸“å±ž AI æ—…è¡Œç¤¼å®¾é¡¾é—® **Pyro**ã€‚\n\næˆ‘å°†ä¸ºæ‚¨é‡èº«å®šåˆ¶**åŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›ä¸ŽåŽ„ç“œå¤šå°”å¤§é™†**çš„é«˜ç«¯ä¸“å±žè¡Œç¨‹ã€‚\n\nè¯·é—®æ‚¨çš„é¢„è®¡å‡ºè¡Œæ—¶é—´ä¸Žéšè¡Œäººæ•°æ˜¯å¤šå°‘ï¼Ÿæˆ‘å°†ç«‹å³ä¸ºæ‚¨å‡ºå…·ä¸“å±žæ–¹æ¡ˆã€‚`;
      break;

    default: // en
      if (lastUserMsg.includes('galapagos') || lastUserMsg.includes('island')) {
        reply = `Greetings! I would be delighted to assist you with our **Galapagos Islands Luxury Expeditions**.\n\nOur top-rated experiences include:\n- **Mainland Ecuador & Enchanted Galapagos Expedition** (12 Days)\n- **Galapagos Island Hopping & Tintoreras** (5 & 6 Days)\n\nMay I ask your estimated travel dates and how many guests will be traveling? I can customize the itinerary for you immediately.`;
      } else if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('quote')) {
        reply = `Our tailor-made expeditions include boutique stays, private expert naturalist guides, and seamless internal transfers.\n\nIf you provide your **Name**, **Email**, and **WhatsApp number**, I will instantly submit a custom quote request for our team to review.`;
      } else {
        reply = `Hello! I am **Pyro**, Lead AI Concierge at Vermilion Routes.\n\nWhether you dream of snorkeling with sea lions in the **Galapagos Islands**, exploring the **Amazon Rainforest**, or hiking the **Avenue of Volcanoes**, I am here to design your perfect journey.\n\nHow may I assist you today?`;
      }
      break;
  }

  return {
    message: reply,
    providerUsed: 'Vermilion Concierge Engine',
  };
}



