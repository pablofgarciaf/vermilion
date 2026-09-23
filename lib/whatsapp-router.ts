import { getAdminDb } from '@/lib/firebase-admin';

export interface AgentRouteResult {
  shouldRespond: boolean;
  response?: string;
  agentSlug: string;
  confidence: number;
  escalate: boolean;
}

const AGENT_MAPPING: Record<string, string> = {
  quote: 'sales-discovery-coach',
  complaint: 'support-support-responder',
  confirmation: 'sales-deal-strategist',
  booking_change: 'sales-deal-strategist',
  payment: 'support-support-responder',
  info: 'sales-discovery-coach',
  other: 'support-support-responder',
};

const ESCALATION_KEYWORDS = [
  'humano', 'persona', 'gerente', 'supervisor', 'jefe',
  'reclamo formal', 'demanda', 'abogado', 'queja oficial',
  'hablar con alguien', 'no entiende', 'no me entiende',
];

export async function routeToAgent(params: {
  intent: string;
  confidence: number;
  context: {
    parentType: string;
    parentData: any;
    message: string;
    phone: string;
  };
}): Promise<{ shouldRespond: boolean; response?: string; agentSlug: string; confidence: number; escalate: boolean }> {
  const { intent, confidence, context } = params;
  const { parentData, message } = context;

  const lowerMsg = message.toLowerCase();
  const shouldEscalate = ESCALATION_KEYWORDS.some(k => lowerMsg.includes(k)) || confidence < 0.5;

  if (shouldEscalate || context.parentData?.needs_human_review) {
    await notifyHumanEscalation(context);
    return { shouldRespond: false, agentSlug: 'human-escalation', confidence, escalate: true };
  }

  const agentSlug = AGENT_MAPPING[intent] || AGENT_MAPPING.other;
  const response = await generateAgentResponse(agentSlug, { intent, message, context: context.parentData, phone: context.phone });

  return { shouldRespond: !!response, response, agentSlug, confidence, escalate: false };
}

async function generateAgentResponse(agentSlug: string, params: any): Promise<string | null> {
  const templates: Record<string, (p: any) => string> = {
    'sales-discovery-coach': (p) =>
      `Hola! Gracias por contactar a Vermilion Routes. \ud83c\udf3f\n\n` +
      `Veo que te interesa: ${p.message}. Nuestro equipo de Travel Designers te preparara una propuesta a medida en menos de 2 horas.\n\n` +
      `Podrias contarme:\n` +
      `1. Cuantos viajeros?\n` +
      `2. Fechas aproximadas?\n` +
      `3. Destino sonado? (Galapagos, Andes, Amazonia)\n\n` +
      `O si prefieres, agendamos una llamada: +593 96 003 9156`,

    'support-support-responder': (p) =>
      `Hola, gracias por escribirnos. Tu mensaje: "${p.message}" ha sido recibido.\n\n` +
      `Nuestro equipo de Concierge lo revisara y te respondera en breve.\n` +
      `Si es urgente: +593 96 003 9156 (WhatsApp 24/7)`,

    'sales-deal-strategist': (p) =>
      `Entendido. Para cambios en tu reserva o confirmaciones de pago, ` +
      `necesito tu codigo de reserva (ej: VR-2026-XXX). Me lo compartis?`,

    'human-escalation': (p) =>
      `Entiendo, te conectare con un especialista humano. ` +
      `Un Travel Designer te contactara en menos de 15 minutos. ` +
      `Tu caso ha sido priorizado.`,
  };

  return templates[agentSlug]?.(params) || templates['support-support-responder'](params);
}

async function notifyHumanEscalation(context: any) {
  console.log('ESCALACION HUMANA:', {
    phone: context.phone,
    parentType: context.parentType,
    parentId: context.parentData?.id,
    reason: 'low_confidence_or_keyword',
  });
}