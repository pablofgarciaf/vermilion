import { createGeminiClient } from './ai';
import { describeConfig, getWhatsAppConfig, type WhatsAppConfig } from './config';
import { createNotifier } from './notify';
import type { ProcessorDeps } from './processor';
import { createGraphSender } from './sender';
import { createFirestoreStore } from './store';

export { extractEvents, processEvents } from './processor';
export { verifyMetaSignature, safeEqual } from './security';
export { getWhatsAppConfig, describeConfig, LIMITS } from './config';
export { WHATSAPP_LEAD_TOUR_ID } from './store';

/** Dependencias reales (Firestore, Gemini, Graph, SMTP) a partir del entorno. */
export function createProductionDeps(config: WhatsAppConfig = getWhatsAppConfig()): ProcessorDeps {
  const sender = createGraphSender(config);
  const missing = describeConfig(config);
  if (missing.length) console.error('[WhatsApp] Faltan variables de entorno:', missing.join(', '));
  return {
    config,
    store: createFirestoreStore(),
    ai: config.aiEnabled && config.geminiApiKey ? createGeminiClient(config.geminiApiKey, config.geminiModel) : null,
    sender,
    notifier: createNotifier(config, sender),
    now: () => Date.now(),
  };
}
