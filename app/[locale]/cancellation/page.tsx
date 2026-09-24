import React from 'react';
import { Metadata } from 'next';
import { getSeoAlternates } from '@/utils/seoHelper';
import { ShieldCheck, FileText, Clock, AlertTriangle, CreditCard, Phone, Mail, MapPin, Percent, CalendarX } from 'lucide-react';

const TITLES: Record<string, string> = {
  es: 'Políticas de Cancelación y Reembolsos — Vermilion Routes',
  en: 'Cancellation & Refund Policy — Vermilion Routes',
  fr: 'Politique d\'Annulation et Remboursement — Vermilion Routes',
  de: 'Stornierungs- und Rückerstattungsrichtlinien — Vermilion Routes',
  it: 'Politica di Cancellazione e Rimborso — Vermilion Routes',
  pt: 'Política de Cancelamento e Reembolso — Vermilion Routes',
  ja: 'キャンセル・返金ポリシー — Vermilion Routes',
  zh: '取消与退款政策 — Vermilion Routes',
};

const DESCRIPTIONS: Record<string, string> = {
  es: 'Consulta las políticas oficiales de cancelación, reembolsos y cambios de reserva de Vermilion Routes para tours en Ecuador y Galápagos.',
  en: 'Review the official cancellation, refund and booking change policies of Vermilion Routes for Ecuador and Galápagos tours.',
  fr: 'Consultez les politiques officielles d\'annulation, de remboursement et de modification de Vermilion Routes pour les circuits en Équateur et Galápagos.',
  de: 'Lesen Sie die offiziellen Stornierungs-, Erstattungs- und Umbuchungsrichtlinien von Vermilion Routes für Ecuador und Galápagos Reisen.',
  it: 'Consulta le politiche ufficiali di cancellazione, rimborso e modifica prenotazione di Vermilion Routes per i tour in Ecuador e Galapagos.',
  pt: 'Consulte as políticas oficiais de cancelamento, reembolso e alteração de reserva da Vermilion Routes para tours no Equador e Galápagos.',
  ja: 'Vermilion Routesのエクアドル＆ガラパゴスツアーに関する公式キャンセル・返金・予約変更ポリシーをご確認ください。',
  zh: '查阅Vermilion Routes厄瓜多尔与加拉帕戈斯旅行的官方取消、退款和预订变更政策。',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLES[locale] || TITLES['en'],
    description: DESCRIPTIONS[locale] || DESCRIPTIONS['en'],
    alternates: getSeoAlternates('/cancellation', locale),
  };
}

const CONTENT: Record<string, {
  badge: string;
  h1: string;
  intro: string;
  effectiveDate: string;
  sections: { icon: string; title: string; items: string[] }[];
  contactTitle: string;
  contactDesc: string;
}> = {
  en: {
    badge: 'Official Policy',
    h1: 'Cancellation & Refund Policy',
    intro: 'The following cancellation and refund policies apply to all bookings made through Vermilion Routes (Agencia de Viajes Vermilion Cia. Ltda.). By completing a reservation, the traveler accepts these conditions in full.',
    effectiveDate: 'Effective from January 1, 2026',
    sections: [
      {
        icon: 'calendar',
        title: '1. Cancellations by the Traveler',
        items: [
          'More than 60 days before departure: Full refund minus a $50 USD administrative fee per person.',
          '59 to 30 days before departure: 70% refund of the total amount paid.',
          '29 to 15 days before departure: 50% refund of the total amount paid.',
          '14 to 8 days before departure: 25% refund of the total amount paid.',
          '7 days or less before departure, or no-show: No refund.',
          'All cancellation requests must be submitted in writing via email to info@vermilionroutes.com.',
        ],
      },
      {
        icon: 'clock',
        title: '2. Refund Processing',
        items: [
          'Approved refunds will be processed within 15 to 30 business days from the date the cancellation is confirmed.',
          'Refunds will be issued to the same payment method used for the original booking (PayPal, credit card, or bank transfer).',
          'Any bank fees, currency conversion differences, or third-party transaction charges incurred during the refund process are the responsibility of the traveler.',
        ],
      },
      {
        icon: 'percent',
        title: '3. Reservation Deposits',
        items: [
          'A minimum deposit of 30% of the total tour price is required to confirm any reservation.',
          'The remaining balance must be paid no later than 30 days before the departure date.',
          'Failure to pay the remaining balance within the specified deadline may result in automatic cancellation of the reservation without refund of the deposit.',
        ],
      },
      {
        icon: 'alert',
        title: '4. Modifications and Date Changes',
        items: [
          'Date changes or itinerary modifications requested more than 30 days before departure may be accommodated at no additional charge, subject to availability.',
          'Changes requested within 30 days of departure may incur a modification fee of up to 15% of the booking total.',
          'Modifications are not guaranteed and are subject to hotel, flight, and service availability at the time of the request.',
        ],
      },
      {
        icon: 'shield',
        title: '5. Cancellations by Vermilion Routes',
        items: [
          'In the rare event that Vermilion Routes must cancel a tour due to force majeure, natural disasters, government restrictions, or safety concerns, travelers will be offered a full refund or the option to reschedule at no extra cost.',
          'Vermilion Routes is not liable for any additional expenses (flights, accommodation, insurance) incurred by the traveler as a consequence of the cancellation.',
        ],
      },
      {
        icon: 'creditcard',
        title: '6. Travel Insurance',
        items: [
          'We strongly recommend that all travelers purchase comprehensive travel insurance that covers trip cancellation, medical emergencies, and evacuation.',
          'Vermilion Routes is not responsible for any losses not covered by the traveler\'s insurance policy.',
        ],
      },
    ],
    contactTitle: 'Questions About Your Booking?',
    contactDesc: 'Our concierge team is available 24/7 to assist you with any questions regarding cancellations, modifications, or refunds.',
  },
  es: {
    badge: 'Política Oficial',
    h1: 'Políticas de Cancelación y Reembolsos',
    intro: 'Las siguientes políticas de cancelación y reembolso aplican a todas las reservas realizadas a través de Vermilion Routes (Agencia de Viajes Vermilion Cia. Ltda.). Al completar una reserva, el viajero acepta estas condiciones en su totalidad.',
    effectiveDate: 'Vigente desde el 1 de enero de 2026',
    sections: [
      {
        icon: 'calendar',
        title: '1. Cancelaciones por parte del Viajero',
        items: [
          'Más de 60 días antes de la salida: Reembolso completo menos una tarifa administrativa de $50 USD por persona.',
          'De 59 a 30 días antes de la salida: Reembolso del 70% del monto total pagado.',
          'De 29 a 15 días antes de la salida: Reembolso del 50% del monto total pagado.',
          'De 14 a 8 días antes de la salida: Reembolso del 25% del monto total pagado.',
          '7 días o menos antes de la salida, o no-show: Sin reembolso.',
          'Todas las solicitudes de cancelación deben enviarse por escrito al correo info@vermilionroutes.com.',
        ],
      },
      {
        icon: 'clock',
        title: '2. Procesamiento de Reembolsos',
        items: [
          'Los reembolsos aprobados serán procesados dentro de 15 a 30 días hábiles desde la fecha en que se confirme la cancelación.',
          'Los reembolsos se emitirán al mismo método de pago utilizado para la reserva original (PayPal, tarjeta de crédito o transferencia bancaria).',
          'Cualquier comisión bancaria, diferencia cambiaria o cargo de terceros generado durante el proceso de reembolso será responsabilidad del viajero.',
        ],
      },
      {
        icon: 'percent',
        title: '3. Depósitos de Reserva',
        items: [
          'Se requiere un depósito mínimo del 30% del precio total del tour para confirmar cualquier reserva.',
          'El saldo restante debe pagarse a más tardar 30 días antes de la fecha de salida.',
          'El incumplimiento del pago del saldo dentro del plazo establecido podrá resultar en la cancelación automática de la reserva sin reembolso del depósito.',
        ],
      },
      {
        icon: 'alert',
        title: '4. Modificaciones y Cambios de Fecha',
        items: [
          'Los cambios de fecha o modificaciones de itinerario solicitados con más de 30 días de antelación podrán ser atendidos sin cargo adicional, sujeto a disponibilidad.',
          'Los cambios solicitados dentro de los 30 días previos a la salida podrán incurrir en un cargo de modificación de hasta el 15% del total de la reserva.',
          'Las modificaciones no están garantizadas y están sujetas a la disponibilidad de hoteles, vuelos y servicios al momento de la solicitud.',
        ],
      },
      {
        icon: 'shield',
        title: '5. Cancelaciones por parte de Vermilion Routes',
        items: [
          'En el caso excepcional de que Vermilion Routes deba cancelar un tour por fuerza mayor, desastres naturales, restricciones gubernamentales o razones de seguridad, se ofrecerá al viajero un reembolso completo o la opción de reprogramar sin costo adicional.',
          'Vermilion Routes no será responsable de gastos adicionales (vuelos, alojamiento, seguros) en los que haya incurrido el viajero como consecuencia de la cancelación.',
        ],
      },
      {
        icon: 'creditcard',
        title: '6. Seguro de Viaje',
        items: [
          'Recomendamos encarecidamente que todos los viajeros adquieran un seguro de viaje integral que cubra cancelación de viaje, emergencias médicas y evacuación.',
          'Vermilion Routes no es responsable de pérdidas no cubiertas por la póliza de seguro del viajero.',
        ],
      },
    ],
    contactTitle: '¿Preguntas Sobre Su Reserva?',
    contactDesc: 'Nuestro equipo de concierge está disponible 24/7 para asistirle con cualquier consulta sobre cancelaciones, modificaciones o reembolsos.',
  },
  fr: {
    badge: 'Politique Officielle',
    h1: 'Politique d\'Annulation et de Remboursement',
    intro: 'Les politiques d\'annulation et de remboursement suivantes s\'appliquent à toutes les réservations effectuées via Vermilion Routes (Agencia de Viajes Vermilion Cia. Ltda.). En finalisant une réservation, le voyageur accepte ces conditions dans leur intégralité.',
    effectiveDate: 'En vigueur depuis le 1er janvier 2026',
    sections: [
      { icon: 'calendar', title: '1. Annulations par le Voyageur', items: ['Plus de 60 jours avant le départ : Remboursement intégral moins des frais administratifs de 50 $ USD par personne.', 'De 59 à 30 jours avant le départ : Remboursement de 70 % du montant total payé.', 'De 29 à 15 jours avant le départ : Remboursement de 50 % du montant total payé.', 'De 14 à 8 jours avant le départ : Remboursement de 25 % du montant total payé.', '7 jours ou moins avant le départ, ou non-présentation : Aucun remboursement.', 'Toutes les demandes d\'annulation doivent être soumises par écrit à info@vermilionroutes.com.'] },
      { icon: 'clock', title: '2. Traitement des Remboursements', items: ['Les remboursements approuvés seront traités dans un délai de 15 à 30 jours ouvrables.', 'Les remboursements seront effectués via le même mode de paiement utilisé pour la réservation.', 'Les frais bancaires ou de conversion sont à la charge du voyageur.'] },
      { icon: 'percent', title: '3. Acomptes de Réservation', items: ['Un acompte minimum de 30 % du prix total est requis pour confirmer toute réservation.', 'Le solde restant doit être réglé au plus tard 30 jours avant le départ.', 'Le non-paiement dans les délais peut entraîner l\'annulation automatique sans remboursement de l\'acompte.'] },
      { icon: 'alert', title: '4. Modifications et Changements de Date', items: ['Les modifications demandées plus de 30 jours avant le départ peuvent être traitées sans frais supplémentaires, sous réserve de disponibilité.', 'Les modifications dans les 30 jours peuvent entraîner des frais allant jusqu\'à 15 % du total.', 'Les modifications ne sont pas garanties et dépendent de la disponibilité.'] },
      { icon: 'shield', title: '5. Annulations par Vermilion Routes', items: ['En cas de force majeure, les voyageurs se verront proposer un remboursement intégral ou une reprogrammation sans frais.', 'Vermilion Routes n\'est pas responsable des frais supplémentaires engagés par le voyageur.'] },
      { icon: 'creditcard', title: '6. Assurance Voyage', items: ['Nous recommandons vivement une assurance voyage complète.', 'Vermilion Routes n\'est pas responsable des pertes non couvertes par l\'assurance du voyageur.'] },
    ],
    contactTitle: 'Questions Sur Votre Réservation ?',
    contactDesc: 'Notre équipe de conciergerie est disponible 24/7 pour vous assister.',
  },
  de: {
    badge: 'Offizielle Richtlinie',
    h1: 'Stornierungs- und Rückerstattungsrichtlinien',
    intro: 'Die folgenden Stornierungs- und Rückerstattungsrichtlinien gelten für alle über Vermilion Routes getätigten Buchungen. Mit Abschluss einer Reservierung akzeptiert der Reisende diese Bedingungen vollständig.',
    effectiveDate: 'Gültig ab 1. Januar 2026',
    sections: [
      { icon: 'calendar', title: '1. Stornierung durch den Reisenden', items: ['Mehr als 60 Tage vor Abreise: Vollständige Rückerstattung abzüglich 50 $ USD Verwaltungsgebühr pro Person.', '59 bis 30 Tage vor Abreise: 70 % Rückerstattung.', '29 bis 15 Tage vor Abreise: 50 % Rückerstattung.', '14 bis 8 Tage vor Abreise: 25 % Rückerstattung.', '7 Tage oder weniger vor Abreise oder Nichterscheinen: Keine Rückerstattung.', 'Stornierungsanträge müssen schriftlich an info@vermilionroutes.com gesendet werden.'] },
      { icon: 'clock', title: '2. Rückerstattungsverarbeitung', items: ['Genehmigte Rückerstattungen werden innerhalb von 15 bis 30 Werktagen bearbeitet.', 'Die Rückerstattung erfolgt über die ursprüngliche Zahlungsmethode.', 'Bankgebühren oder Währungsumrechnungsdifferenzen gehen zu Lasten des Reisenden.'] },
      { icon: 'percent', title: '3. Reservierungsanzahlung', items: ['Eine Mindestanzahlung von 30 % des Gesamtpreises ist zur Buchungsbestätigung erforderlich.', 'Der Restbetrag ist spätestens 30 Tage vor Abreise fällig.', 'Nichtzahlung kann zur automatischen Stornierung ohne Erstattung der Anzahlung führen.'] },
      { icon: 'alert', title: '4. Änderungen und Terminverschiebungen', items: ['Änderungen mehr als 30 Tage vor Abreise können kostenlos vorgenommen werden, vorbehaltlich Verfügbarkeit.', 'Änderungen innerhalb von 30 Tagen können Gebühren von bis zu 15 % verursachen.', 'Änderungen sind nicht garantiert und von der Verfügbarkeit abhängig.'] },
      { icon: 'shield', title: '5. Stornierung durch Vermilion Routes', items: ['Bei höherer Gewalt wird eine vollständige Rückerstattung oder kostenlose Umbuchung angeboten.', 'Vermilion Routes haftet nicht für zusätzliche Kosten des Reisenden.'] },
      { icon: 'creditcard', title: '6. Reiseversicherung', items: ['Wir empfehlen dringend eine umfassende Reiseversicherung.', 'Vermilion Routes haftet nicht für nicht versicherte Verluste.'] },
    ],
    contactTitle: 'Fragen zu Ihrer Buchung?',
    contactDesc: 'Unser Concierge-Team steht Ihnen rund um die Uhr zur Verfügung.',
  },
  it: {
    badge: 'Politica Ufficiale',
    h1: 'Politica di Cancellazione e Rimborso',
    intro: 'Le seguenti politiche di cancellazione e rimborso si applicano a tutte le prenotazioni effettuate tramite Vermilion Routes. Completando una prenotazione, il viaggiatore accetta integralmente queste condizioni.',
    effectiveDate: 'In vigore dal 1° gennaio 2026',
    sections: [
      { icon: 'calendar', title: '1. Cancellazioni da parte del Viaggiatore', items: ['Oltre 60 giorni prima della partenza: Rimborso completo meno $50 USD di spese amministrative per persona.', 'Da 59 a 30 giorni: Rimborso del 70%.', 'Da 29 a 15 giorni: Rimborso del 50%.', 'Da 14 a 8 giorni: Rimborso del 25%.', '7 giorni o meno, o mancata presentazione: Nessun rimborso.', 'Le richieste devono essere inviate per iscritto a info@vermilionroutes.com.'] },
      { icon: 'clock', title: '2. Elaborazione dei Rimborsi', items: ['I rimborsi approvati saranno elaborati entro 15-30 giorni lavorativi.', 'Il rimborso sarà effettuato con lo stesso metodo di pagamento originale.', 'Le commissioni bancarie sono a carico del viaggiatore.'] },
      { icon: 'percent', title: '3. Depositi di Prenotazione', items: ['È richiesto un deposito minimo del 30% per confermare la prenotazione.', 'Il saldo deve essere pagato almeno 30 giorni prima della partenza.', 'Il mancato pagamento può comportare la cancellazione automatica senza rimborso del deposito.'] },
      { icon: 'alert', title: '4. Modifiche e Cambi di Data', items: ['Le modifiche richieste con oltre 30 giorni di anticipo possono essere gestite senza costi aggiuntivi.', 'Le modifiche entro 30 giorni possono comportare costi fino al 15%.', 'Le modifiche non sono garantite e dipendono dalla disponibilità.'] },
      { icon: 'shield', title: '5. Cancellazioni da parte di Vermilion Routes', items: ['In caso di forza maggiore, sarà offerto un rimborso completo o la riprogrammazione gratuita.', 'Vermilion Routes non è responsabile per spese aggiuntive del viaggiatore.'] },
      { icon: 'creditcard', title: '6. Assicurazione di Viaggio', items: ['Raccomandiamo vivamente un\'assicurazione di viaggio completa.', 'Vermilion Routes non è responsabile per perdite non coperte dall\'assicurazione.'] },
    ],
    contactTitle: 'Domande Sulla Sua Prenotazione?',
    contactDesc: 'Il nostro team di concierge è disponibile 24/7 per assistervi.',
  },
  pt: {
    badge: 'Política Oficial',
    h1: 'Política de Cancelamento e Reembolso',
    intro: 'As seguintes políticas de cancelamento e reembolso aplicam-se a todas as reservas feitas através da Vermilion Routes. Ao concluir uma reserva, o viajante aceita estas condições na íntegra.',
    effectiveDate: 'Em vigor desde 1 de janeiro de 2026',
    sections: [
      { icon: 'calendar', title: '1. Cancelamentos pelo Viajante', items: ['Mais de 60 dias antes da partida: Reembolso integral menos $50 USD de taxa administrativa por pessoa.', '59 a 30 dias: Reembolso de 70%.', '29 a 15 dias: Reembolso de 50%.', '14 a 8 dias: Reembolso de 25%.', '7 dias ou menos, ou não comparecimento: Sem reembolso.', 'Os pedidos devem ser enviados por escrito para info@vermilionroutes.com.'] },
      { icon: 'clock', title: '2. Processamento de Reembolsos', items: ['Reembolsos aprovados serão processados em 15 a 30 dias úteis.', 'O reembolso será feito pelo mesmo método de pagamento original.', 'Taxas bancárias ou de conversão são de responsabilidade do viajante.'] },
      { icon: 'percent', title: '3. Depósitos de Reserva', items: ['É necessário um depósito mínimo de 30% para confirmar a reserva.', 'O saldo deve ser pago até 30 dias antes da partida.', 'A falta de pagamento pode resultar em cancelamento automático sem reembolso do depósito.'] },
      { icon: 'alert', title: '4. Modificações e Alterações de Data', items: ['Alterações solicitadas com mais de 30 dias de antecedência podem ser atendidas sem custo adicional.', 'Alterações dentro de 30 dias podem gerar taxas de até 15%.', 'Modificações não são garantidas e dependem de disponibilidade.'] },
      { icon: 'shield', title: '5. Cancelamentos pela Vermilion Routes', items: ['Em caso de força maior, será oferecido reembolso total ou reagendamento gratuito.', 'A Vermilion Routes não é responsável por despesas adicionais do viajante.'] },
      { icon: 'creditcard', title: '6. Seguro de Viagem', items: ['Recomendamos fortemente um seguro de viagem abrangente.', 'A Vermilion Routes não é responsável por perdas não cobertas pelo seguro.'] },
    ],
    contactTitle: 'Perguntas Sobre Sua Reserva?',
    contactDesc: 'Nossa equipe de concierge está disponível 24/7 para ajudá-lo.',
  },
  ja: {
    badge: '公式ポリシー',
    h1: 'キャンセル・返金ポリシー',
    intro: '以下のキャンセルおよび返金ポリシーは、Vermilion Routes（Agencia de Viajes Vermilion Cia. Ltda.）を通じて行われたすべての予約に適用されます。予約を完了することにより、旅行者はこれらの条件に完全に同意したものとみなされます。',
    effectiveDate: '2026年1月1日より有効',
    sections: [
      { icon: 'calendar', title: '1. 旅行者によるキャンセル', items: ['出発60日以上前：1人あたり50ドルの事務手数料を差し引いた全額返金。', '出発59〜30日前：支払総額の70%を返金。', '出発29〜15日前：支払総額の50%を返金。', '出発14〜8日前：支払総額の25%を返金。', '出発7日以内またはノーショー：返金なし。', 'すべてのキャンセルリクエストはinfo@vermilionroutes.comまで書面でお送りください。'] },
      { icon: 'clock', title: '2. 返金処理', items: ['承認された返金は15〜30営業日以内に処理されます。', '返金は元の支払い方法で行われます。', '銀行手数料や為替差額は旅行者の負担となります。'] },
      { icon: 'percent', title: '3. 予約デポジット', items: ['予約確定には、ツアー総額の30%以上のデポジットが必要です。', '残額は出発30日前までにお支払いください。', '期限内にお支払いがない場合、デポジット返金なしで自動キャンセルとなる場合があります。'] },
      { icon: 'alert', title: '4. 変更・日程変更', items: ['出発30日以上前のリクエストは追加料金なしで対応可能です（空き状況による）。', '30日以内の変更には最大15%の変更手数料が発生する場合があります。', '変更は保証されず、空き状況に依存します。'] },
      { icon: 'shield', title: '5. Vermilion Routesによるキャンセル', items: ['不可抗力の場合、全額返金または無料での日程変更をご提案します。', 'Vermilion Routesは旅行者の追加費用について責任を負いません。'] },
      { icon: 'creditcard', title: '6. 旅行保険', items: ['包括的な旅行保険への加入を強くお勧めします。', 'Vermilion Routesは保険でカバーされない損失について責任を負いません。'] },
    ],
    contactTitle: 'ご予約に関するご質問は？',
    contactDesc: 'コンシェルジュチームが24時間年中無休でサポートいたします。',
  },
  zh: {
    badge: '官方政策',
    h1: '取消与退款政策',
    intro: '以下取消和退款政策适用于通过Vermilion Routes（Agencia de Viajes Vermilion Cia. Ltda.）进行的所有预订。完成预订即表示旅行者完全接受这些条款。',
    effectiveDate: '自2026年1月1日起生效',
    sections: [
      { icon: 'calendar', title: '1. 旅行者取消', items: ['出发前60天以上：全额退款，扣除每人50美元行政费用。', '出发前59至30天：退还已付总额的70%。', '出发前29至15天：退还已付总额的50%。', '出发前14至8天：退还已付总额的25%。', '出发前7天内或未到场：不予退款。', '所有取消请求必须以书面形式发送至info@vermilionroutes.com。'] },
      { icon: 'clock', title: '2. 退款处理', items: ['批准的退款将在15至30个工作日内处理。', '退款将通过原始付款方式退还。', '银行手续费或汇率差额由旅行者承担。'] },
      { icon: 'percent', title: '3. 预订定金', items: ['确认预订需支付不低于旅游总价30%的定金。', '余款须在出发前30天内支付。', '未按时支付可能导致预订自动取消且定金不予退还。'] },
      { icon: 'alert', title: '4. 修改与日期变更', items: ['出发前30天以上的修改请求可免费处理（视可用性而定）。', '30天内的修改可能产生最高15%的修改费用。', '修改不保证成功，取决于酒店、航班和服务的可用性。'] },
      { icon: 'shield', title: '5. Vermilion Routes取消', items: ['因不可抗力取消时，将提供全额退款或免费改期。', 'Vermilion Routes不对旅行者的额外费用承担责任。'] },
      { icon: 'creditcard', title: '6. 旅行保险', items: ['我们强烈建议购买全面的旅行保险。', 'Vermilion Routes不对保险未覆盖的损失承担责任。'] },
    ],
    contactTitle: '有关预订的问题？',
    contactDesc: '我们的礼宾团队全天候24/7为您提供服务。',
  },
};

function getIcon(name: string) {
  switch (name) {
    case 'calendar': return <CalendarX className="w-5 h-5 text-emerald-400" />;
    case 'clock': return <Clock className="w-5 h-5 text-emerald-400" />;
    case 'percent': return <Percent className="w-5 h-5 text-emerald-400" />;
    case 'alert': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    case 'shield': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    case 'creditcard': return <CreditCard className="w-5 h-5 text-emerald-400" />;
    default: return <FileText className="w-5 h-5 text-emerald-400" />;
  }
}

export default async function CancellationPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT['en'];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">

        <div className="space-y-4 text-center sm:text-left border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            {c.h1}
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {c.intro}
          </p>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{c.effectiveDate}</p>
        </div>

        <div className="bg-zinc-900/80 border border-emerald-900/50 rounded-3xl p-6 sm:p-8 space-y-4 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-bold font-serif text-emerald-400">
            Agencia de Viajes Vermilion Cia. Ltda.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-300">
            <div className="space-y-1.5">
              <p><strong className="text-white">RUC:</strong> 1711992808001</p>
              <p className="flex items-start gap-1.5 text-xs text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Ecuador:</strong> Monteserrín, De los Lirios N45-206, Quito</span>
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+593 96 003 9156 (WhatsApp 24/7)</span>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>info@vermilionroutes.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {c.sections.map((section, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-emerald-900/60 transition-colors">
              <h2 className="flex items-center gap-3 text-lg font-bold font-serif text-white">
                {getIcon(section.icon)}
                {section.title}
              </h2>
              <ul className="space-y-2.5 text-sm text-zinc-300 leading-relaxed">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-950/60 via-emerald-900/30 to-emerald-950/60 border border-emerald-700/40 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-xl font-bold font-serif text-emerald-400">{c.contactTitle}</h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto">{c.contactDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href="https://wa.me/593960039156" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]">
              <Phone className="w-4 h-4" /> WhatsApp 24/7
            </a>
            <a href="mailto:info@vermilionroutes.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] border border-zinc-700">
              <Mail className="w-4 h-4" /> info@vermilionroutes.com
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 pt-4">
          © {new Date().getFullYear()} Vermilion Routes — Agencia de Viajes Vermilion Cia. Ltda. • RUC: 1711992808001
        </p>
      </div>
    </div>
  );
}
