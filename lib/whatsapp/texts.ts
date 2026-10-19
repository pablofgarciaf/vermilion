import type { WaLocale } from './config';

/** Mensajes fijos (no generados por IA) en los 8 idiomas del sitio. */
export interface FixedTexts {
  optOutConfirm: string;
  optInConfirm: string;
  handoff: string;
  aiFallback: string;
  textOnly: string;
}

export const FIXED_TEXTS: Record<WaLocale, FixedTexts> = {
  es: {
    optOutConfirm: 'Listo, no te enviaremos más mensajes. Si quieres volver a escribirnos, responde ALTA.',
    optInConfirm: '¡Bienvenido de nuevo! ¿En qué viaje te ayudo?',
    handoff: 'Gracias. Te paso con un asesor de nuestro equipo en Quito, que te escribe por aquí en breve. 🙌',
    aiFallback: 'Gracias por escribir a Vermilion Routes. Un asesor te responde por aquí en breve.',
    textOnly: 'Por ahora solo puedo leer mensajes de texto. ¿Me lo escribes, por favor? Así te ayudo más rápido.',
  },
  en: {
    optOutConfirm: "Done, we won't message you again. If you want to talk to us later, reply START.",
    optInConfirm: 'Welcome back! Which trip can I help you with?',
    handoff: 'Thank you. I am passing you to an advisor from our Quito team, who will reply here shortly. 🙌',
    aiFallback: 'Thanks for writing to Vermilion Routes. An advisor will reply here shortly.',
    textOnly: 'For now I can only read text messages. Could you type it for me? That way I can help you faster.',
  },
  fr: {
    optOutConfirm: 'C’est noté, nous ne vous enverrons plus de messages. Pour nous réécrire, répondez START.',
    optInConfirm: 'Bon retour ! Pour quel voyage puis-je vous aider ?',
    handoff: 'Merci. Je vous mets en relation avec un conseiller de notre équipe à Quito, qui vous répondra ici très bientôt. 🙌',
    aiFallback: 'Merci d’avoir écrit à Vermilion Routes. Un conseiller vous répondra ici très bientôt.',
    textOnly: 'Pour l’instant je ne lis que les messages texte. Pouvez-vous l’écrire ? Je vous aiderai plus vite.',
  },
  de: {
    optOutConfirm: 'Erledigt, wir schreiben Ihnen nicht mehr. Wenn Sie uns später schreiben möchten, antworten Sie START.',
    optInConfirm: 'Willkommen zurück! Bei welcher Reise kann ich helfen?',
    handoff: 'Danke. Ich verbinde Sie mit einem Berater unseres Teams in Quito, der Ihnen hier in Kürze antwortet. 🙌',
    aiFallback: 'Danke für Ihre Nachricht an Vermilion Routes. Ein Berater antwortet Ihnen hier in Kürze.',
    textOnly: 'Im Moment kann ich nur Textnachrichten lesen. Könnten Sie es bitte schreiben? So helfe ich Ihnen schneller.',
  },
  it: {
    optOutConfirm: 'Fatto, non ti invieremo altri messaggi. Se vuoi riscriverci, rispondi START.',
    optInConfirm: 'Bentornato! Per quale viaggio posso aiutarti?',
    handoff: 'Grazie. Ti passo a un consulente del nostro team a Quito, che ti risponderà qui a breve. 🙌',
    aiFallback: 'Grazie per aver scritto a Vermilion Routes. Un consulente ti risponderà qui a breve.',
    textOnly: 'Per ora posso leggere solo messaggi di testo. Me lo scrivi, per favore? Così ti aiuto più in fretta.',
  },
  pt: {
    optOutConfirm: 'Pronto, não enviaremos mais mensagens. Se quiser falar conosco depois, responda START.',
    optInConfirm: 'Bem-vindo de volta! Em qual viagem posso ajudar?',
    handoff: 'Obrigado. Vou passar você para um consultor da nossa equipe em Quito, que responde aqui em breve. 🙌',
    aiFallback: 'Obrigado por escrever para a Vermilion Routes. Um consultor responde aqui em breve.',
    textOnly: 'Por enquanto só consigo ler mensagens de texto. Pode escrever, por favor? Assim ajudo você mais rápido.',
  },
  ja: {
    optOutConfirm: '承知しました。今後メッセージはお送りしません。再開する場合は START と返信してください。',
    optInConfirm: 'おかえりなさい！どのご旅行についてお手伝いしましょうか？',
    handoff: 'ありがとうございます。キトのスタッフにおつなぎします。まもなくこちらでご連絡いたします。🙌',
    aiFallback: 'Vermilion Routes へのご連絡ありがとうございます。まもなくスタッフがこちらでご返信いたします。',
    textOnly: '現在はテキストメッセージのみ読み取れます。文字で送っていただけますか？より早くご案内できます。',
  },
  zh: {
    optOutConfirm: '好的，我们将不再向您发送消息。如需再次联系，请回复 START。',
    optInConfirm: '欢迎回来！请问您想了解哪条行程？',
    handoff: '谢谢。我将为您转接基多团队的旅行顾问，他会尽快在这里回复您。🙌',
    aiFallback: '感谢您联系 Vermilion Routes。旅行顾问会尽快在这里回复您。',
    textOnly: '目前我只能阅读文字消息。可以请您用文字发送吗？这样我能更快地帮助您。',
  },
};
