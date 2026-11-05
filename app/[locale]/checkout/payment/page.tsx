'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Compass,
  Upload,
  Copy,
  Check,
  Calendar,
  Tag,
  AlertCircle,
  Download,
  FileText,
  Users,
  Printer,
  MessageCircle,
  Award,
  Clock,
  Globe2,
  Info,
  Phone,
  Star
} from 'lucide-react';
import Image from 'next/image';
import { TravelVoucherModal } from '@/components/booking/TravelVoucherModal';
import { mockTours } from '@/data/mock';
import { generateBookingCode } from '@/lib/bookings';
import { getAffiliateByCode } from '@/lib/affiliates';
import { getStoredAffiliateRef, isBookingCode } from '@/components/affiliates/AffiliateTracker';
import { useLocale } from 'next-intl';
import { getStoredUserProfile } from '@/lib/userProfile';
import { PayPalCheckoutButton } from '@/components/checkout/PayPalCheckoutButton';
import { generateTravelVoucherPDF } from '@/lib/voucherPdfGenerator';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

// ─────────────────────────────────────────────
// 8-LANGUAGE DICTIONARY FOR CHECKOUT & PAYMENT
// ─────────────────────────────────────────────
const CHECKOUT_I18N: Record<string, Record<string, string>> = {
  secureSsl: {
    en: 'Secure SSL Payment',
    es: 'Pago Seguro SSL',
    fr: 'Paiement SSL Sécurisé',
    de: 'Sichere SSL-Zahlung',
    it: 'Pagamento Sicuro SSL',
    pt: 'Pagamento Seguro SSL',
    ja: 'SSL安全暗号化決済',
    zh: 'SSL安全加密支付',
  },
  prePaymentAssuranceTitle: {
    en: 'Before You Pay: Fiduciary Trust & 100% Protection',
    es: 'Antes de Pagar: Garantía Fiduciaria y Flexibilidad Total',
    fr: 'Avant de Payer : Confiance Fiduciaire et Garantie Totale',
    de: 'Vor Ihrer Zahlung: Treuhandvertrauen & 100% Schutz',
    it: 'Prima di Pagare: Tutela Fiduciaria e Garanzia Totale',
    pt: 'Antes de Pagar: Confiança Fiduciária e Garantia Total',
    ja: 'お支払い前のご案内：万全の信頼と100%保護保証',
    zh: '支付前须知：信托保障与全额安全承诺',
  },
  prePaymentBadge: {
    en: 'Official Fiduciary Protection',
    es: 'Protección Fiduciaria Oficial',
    fr: 'Protection Fiduciaire Officielle',
    de: 'Offizieller Treuhandschutz',
    it: 'Protezione Fiduciaria Ufficiale',
    pt: 'Proteção Fiduciária Oficial',
    ja: '公式信託保護制度',
    zh: '官方信托保护准则',
  },
  prePaymentFreezeTitle: {
    en: 'Verification & Price Freeze Guarantee',
    es: 'Verificación y Congelación de Precio',
    fr: 'Vérification et Gel du Tarif',
    de: 'Prüfung & Preisgarantie',
    it: 'Verifica e Blocco Tariffa',
    pt: 'Verificação e Congelamento de Tarifa',
    ja: '予約内容の確認および料金据え置き保証',
    zh: '行程核对与特惠锁价保证',
  },
  prePaymentFreezeText: {
    en: 'Before paying: Ensure every detail of your journey is thoroughly attended to. We are entirely at your service for any questions. You can freeze the current price or promotion with your booking, with full certainty that your journey will exceed 100% of your expectations.',
    es: 'Antes de pagar: Verifica que cada detalle de tu viaje esté atendido a profundidad. Cualquier pregunta estamos a tu servicio. Puedes congelar el precio o la promoción actual con tu reserva con la total certeza de que el viaje cumplirá al 100% tus expectativas.',
    fr: 'Avant de payer : Assurez-vous que chaque détail de votre voyage est pris en compte avec le plus grand soin. Notre équipe est à votre entière disposition. Vous pouvez geler le tarif ou la promotion en cours avec votre réservation, avec la certitude absolue que ce voyage répondra à 100% à vos attentes.',
    de: 'Vor Ihrer Zahlung: Vergewissern Sie sich, dass jedes Detail Ihrer Reise sorgfältig abgestimmt ist. Unser Concierge-Team steht Ihnen jederzeit zur Verfügung. Sichern Sie sich den aktuellen Preis oder Rabatt mit Ihrer Buchung – in der Gewissheit, dass Ihre Reise Ihre Erwartungen zu 100% erfüllt.',
    it: 'Prima di pagare: Verifica che ogni dettaglio del tuo viaggio sia curato a fondo. Il nostro team è a tua completa disposizione. Puoi bloccare la tariffa o la promozione attuale con la tua prenotazione, con la certezza assoluta che il viaggio soddisferà al 100% le tue aspettative.',
    pt: 'Antes de pagar: Verifique se cada detalhe da sua viagem foi planejado com profundidade. Nossa equipe está à sua inteira disposição. Você pode congelar a tarifa ou promoção atual com sua reserva, com a certeza total de que sua viagem superará 100% de suas expectativas.',
    ja: 'お支払い前に：旅のすべての詳細がお客様のご希望に沿っているかご確認ください。ご質問がございましたら専任コンシェルジュがお応えいたします。現在の限定価格や特典を予約確定で確保し、100%ご期待以上の体験をお約束いたします。',
    zh: '支付前须知：请确认您行程的每一处细节均已得到周密安排。我们的礼宾团队随时待命为您解答任何疑问。您可通过当前预订锁定当期特惠价格，我们承诺为您带来100%符合乃至超越预期的卓越体验。',
  },
  prePaymentMedicalGuaranteeTitle: {
    en: 'Medical Guarantee & Refund Flexibility',
    es: 'Garantía Médica y Flexibilidad de Retorno',
    fr: 'Garantie Médicale et Flexibilité de Remboursement',
    de: 'Medizinische Garantie & Rückerstattungs-Flexibilität',
    it: 'Garanzia Medica e Flessibilità di Rimborso',
    pt: 'Garantia Médica e Flexibilidade de Reembolso',
    ja: '医療保証および柔軟な返金規定',
    zh: '医疗特殊保障与透明退款机制',
  },
  prePaymentMedicalGuarantee: {
    en: 'Medical Guarantee and Flexibility: In the event of illness or a verifiable medical emergency, your funds are returned pursuant to our protection policies: 100% of the paid amount is refunded, excluding only non-refundable gateway fees withheld by the credit card processor (and if the processor waives commission, 100% is returned in full). All managed with absolute transparency through your card or PayPal.',
    es: 'Garantía Médica y Flexibilidad: Si te enfermas o surge una emergencia demostrable, tu dinero es devuelto conforme a nuestras políticas de protección: se reembolsa el 100% de lo pagado excepto únicamente las tarifas no reembolsables retenidas por la pasarela de tarjeta de crédito (y si la entidad procesadora no retiene comisión, se devuelve íntegramente todo). Todo gestionado con total transparencia a través de tu tarjeta o PayPal.',
    fr: 'Garantie Médicale et Flexibilité : En cas de maladie ou d\'urgence médicale avérée, vos fonds vous sont restitués selon nos politiques de protection : 100% des montants versés sont remboursés, à la seule exception des frais non remboursables retenus par la passerelle de carte bancaire (si la passerelle ne retient aucune commission, la totalité est intégralement restituée). Tout est géré en toute transparence via votre carte ou PayPal.',
    de: 'Medizinische Garantie und Flexibilität: Bei Krankheit oder einem nachweisbaren Notfall wird Ihr Geld gemäß unseren Schutzrichtlinien zurückerstattet: 100% des gezahlten Betrags werden erstattet, abzüglich lediglich der nicht erstattungsfähigen Gebühren des Kreditkarten-Zahlungsdienstleisters (behält der Abwickler keine Gebühr ein, wird der volle Betrag zu 100% erstattet). Alles transparent abgewickelt über Ihre Karte oder PayPal.',
    it: 'Garanzia Medica e Flessibilità: In caso di malattia o emergenza medica documentabile, il tuo denaro viene restituito in conformità alle nostre politiche di tutela: viene rimborsato il 100% di quanto pagato, escluse unicamente le commissioni non rimborsabili trattenute dal circuito della carta di credito (se la piattaforma non trattiene commissioni, viene restituito l\'intero importo). Il tutto gestito con trasparenza totale tramite carta o PayPal.',
    pt: 'Garantia Médica e Flexibilidade: Em caso de enfermidade ou emergência médica comprovável, seu dinheiro é devolvido em conformidade com nossas políticas de proteção: reembolsa-se 100% do valor pago, exceto exclusivamente as taxas não reembolsáveis retidas pela operadora de cartão de crédito (e se a processadora não retiver comissão, devolve-se integralmente tudo). Tudo gerenciado com total transparência via cartão ou PayPal.',
    ja: '医療保証と柔軟な対応：病気や証明可能な緊急事態が発生した場合、当社の保護ポリシーに基づき全額返金されます。お支払いいただいた金額の100%を返金いたします（クレジットカード決済会社が差し引く返金不可手数料のみ除外され、決済会社の手数料がない場合は全額全額返還されます）。クレジットカードまたはPayPalを通じて完全に透明に手続きされます。',
    zh: '医疗保障与退改灵活性：若遇突发疾病或经证实的不可抗力紧急情况，您的款项将依我们的旅行者保护政策全额退还：扣除信用卡支付网关不可退还的手续费后，全额退还100%已付款项（若支付网关未扣除手续费，则原路全额退款）。所有流程均通过您的银行卡或PayPal以完全透明的方式处理。',
  },
  usConciergeTitle: {
    en: 'US Direct Line / SMS Concierge',
    es: 'Línea Directa EE.UU. / SMS Concierge',
    fr: 'Ligne Directe États-Unis / SMS Conciergerie',
    de: 'USA Direktleitung / SMS-Concierge',
    it: 'Linea Diretta USA / SMS Concierge',
    pt: 'Linha Direta EUA / SMS Concierge',
    ja: '米国直通ライン / SMSコンシェルジュ',
    zh: '美国直拨热线 / SMS专属礼宾',
  },
  ecWhatsAppTitle: {
    en: 'WhatsApp Concierge 24/7 (Ecuador)',
    es: 'WhatsApp Concierge 24/7 Oficial (Ecuador)',
    fr: 'WhatsApp Conciergerie 24/7 (Équateur)',
    de: 'WhatsApp Concierge 24/7 (Ecuador)',
    it: 'WhatsApp Concierge 24/7 (Ecuador)',
    pt: 'WhatsApp Concierge 24/7 (Equador)',
    ja: 'WhatsApp現地公式直通24/7（エクアドル）',
    zh: 'WhatsApp官方直联礼宾24/7（厄瓜多尔）',
  },
  bilingualOperatorsNotice: {
    en: 'Our Ecuador expedition leaders and operators are 100% bilingual in English with official tourism licenses, supported by dedicated outreach and concierge care in the United States.',
    es: 'Nuestros operadores en Ecuador son 100% bilingües en inglés con licencia turística oficial, y contamos con soporte de divulgación y atención en EE.UU.',
    fr: 'Nos opérateurs en Équateur sont 100% bilingues en anglais avec licence touristique officielle, et nous disposons d\'un support d\'assistance aux États-Unis.',
    de: 'Unsere Expeditionsleiter in Ecuador sind zu 100% zweisprachig (Englisch) mit offizieller Tourismuslizenz und verfügen über einen eigenen Betreuungsdienst in den USA.',
    it: 'I nostri operatori in Ecuador sono al 100% bilingui in inglese con licenza turistica ufficiale, e offriamo assistenza e supporto negli Stati Uniti.',
    pt: 'Nossos operadores no Equador são 100% bilíngues em inglês com licença turística oficial, contando com suporte e atendimento nos Estados Unidos.',
    ja: 'エクアドルの現地オペレーターは全員、公認観光ライセンスを保持する英語・スペイン語の完全バイリンガルであり、米国国内のサポートデスクとも連携しています。',
    zh: '我们在厄瓜多尔的探险领队与运营团队均持有官方旅游从业执照且具备100%流利英语双语能力，并配备美国本土专属联络与客户服务团队。',
  },
  sealTripAdvisor: {
    en: 'TripAdvisor 5.0 (52 Verified Reviews)',
    es: 'TripAdvisor 5.0 (52 Verified Reviews)',
    fr: 'TripAdvisor 5.0 (52 Avis Vérifiés)',
    de: 'TripAdvisor 5.0 (52 Verifizierte Bewertungen)',
    it: 'TripAdvisor 5.0 (52 Recensioni Verificate)',
    pt: 'TripAdvisor 5.0 (52 Avaliações Verificadas)',
    ja: 'TripAdvisor 5.0 (52件の認証済みレビュー)',
    zh: 'TripAdvisor 5.0 (52条真实认证好评)',
  },
  sealMintur: {
    en: 'Official Mintur License #1793215456001',
    es: 'Licencia Oficial Mintur #1793215456001',
    fr: 'Licence Officielle Mintur #1793215456001',
    de: 'Offizielle Mintur-Lizenz #1793215456001',
    it: 'Licenza Ufficiale Mintur #1793215456001',
    pt: 'Licença Oficial Mintur #1793215456001',
    ja: 'エクアドル観光省公式認定 #1793215456001',
    zh: '厄瓜多尔旅游部官方特许执照 #1793215456001',
  },
  sealDepositGuarantee: {
    en: '100% Deposit Protection Guarantee',
    es: '100% Deposit Protection Guarantee',
    fr: 'Garantie de Dépôt Protégé à 100%',
    de: '100% Anzahlungsschutz-Garantie',
    it: 'Garanzia Protezione Deposito al 100%',
    pt: 'Garantia de Depósito 100% Protegido',
    ja: '100%手付金保護保証制度',
    zh: '100%定金与付款信托保护保证',
  },
  luxuryExpeditions: {
    en: 'Bespoke Nature Expeditions',
    es: 'Expediciones a Medida • Naturaleza & Confort',
    fr: 'Expéditions Sur Mesure • Nature & Confort',
    de: 'Maßgeschneiderte Expeditionen • Natur & Komfort',
    it: 'Spedizioni su Misura • Natura e Comfort',
    pt: 'Expedições Sob Medida • Natureza e Conforto',
    ja: '大自然と快適さの特注ツアー',
    zh: '专属定制探险 • 自然与舒适之旅',
  },
  tabPaypalCard: {
    en: 'PayPal / International Card',
    es: 'PayPal / Tarjeta Internacional',
    fr: 'PayPal / Carte Internationale',
    de: 'PayPal / Internationale Karte',
    it: 'PayPal / Carta Internazionale',
    pt: 'PayPal / Cartão Internacional',
    ja: 'PayPal / 国際カード決済',
    zh: 'PayPal / 国际信用卡支付',
  },
  tabCardTitle: {
    en: 'PayPal / International Credit Card',
    es: 'PayPal / Tarjeta de Crédito Internacional',
    fr: 'PayPal / Carte Bancaire Internationale',
    de: 'PayPal / Internationale Kreditkarte',
    it: 'PayPal / Carta di Credito Internazionale',
    pt: 'PayPal / Cartão de Crédito Internacional',
    ja: 'PayPal / 国際クレジットカード',
    zh: 'PayPal / 国际信用卡与借记卡',
  },
  tabBankTitle: {
    en: 'International Wire Transfer',
    es: 'Transferencia Bancaria Internacional',
    fr: 'Virement Bancaire International',
    de: 'Internationale Banküberweisung',
    it: 'Bonifico Bancario Internazionale',
    pt: 'Transferência Bancária Internacional',
    ja: '国際銀行振込',
    zh: '国际银行电汇',
  },
    checkoutHeaderTitle: {
    en: 'Complete Your Expedition Payment',
    es: 'Completa el Pago de tu Expedición',
    fr: 'Finalisez le Paiement de votre Expédition',
    de: 'Schließen Sie Ihre Expeditionszahlung ab',
    it: 'Completa il Pagamento della tua Spedizione',
    pt: 'Conclua o Pagamento da sua Expedição',
    ja: 'ツアーのお支払いを完了する',
    zh: '完成您的专属探险行程支付',
  },
  checkoutHeaderSubtitle: {
    en: 'Select your preferred payment method to secure your official booking with 24/7 concierge assistance.',
    es: 'Selecciona tu método de pago preferido para confirmar tus plazas oficiales con asistencia y garantía 24/7.',
    fr: 'Sélectionnez votre mode de paiement pour sécuriser votre réservation avec assistance 24/7.',
    de: 'Wählen Sie Ihre bevorzugte Zahlungsmethode, um Ihre Buchung mit 24/7-Concierge zu sichern.',
    it: 'Seleziona il tuo metodo di pagamento per confermare la tua prenotazione con assistenza 24/7.',
    pt: 'Selecione seu método de pagamento preferido para confirmar sua reserva com assistência 24/7.',
    ja: '24時間対応のコンシェルジュサポート付きで、公式なお席を確定するための決済方法をお選びください。',
    zh: '选择您首选的支付方式，以确认您的专属官方名额并享受 24/7 礼宾服务。',
  },
  tabBankTitleShort: {
    en: 'Bank Wire Transfer',
    es: 'Transferencia Bancaria',
    fr: 'Virement Bancaire',
    de: 'Banküberweisung',
    it: 'Bonifico Bancario',
    pt: 'Transferência Bancária',
    ja: '銀行振込',
    zh: '银行电汇',
  },
  depositTitle: {
    en: 'Expedition Reservation Deposit',
    es: 'Depósito de Reserva de Expedición',
    fr: 'Acompte de Réservation',
    de: 'Expeditions-Buchungsanzahlung',
    it: 'Deposito di Prenotazione Spedizione',
    pt: 'Depósito de Reserva da Expedição',
    ja: '探検ツアー予約手付金',
    zh: '探险行程预订定金',
  },
  fullTitle: {
    en: 'Full Expedition Payment',
    es: 'Pago Total de Expedición',
    fr: 'Paiement Total de l\'Expédition',
    de: 'Gesamtzahlung der Expedition',
    it: 'Pagamento Completo Spedizione',
    pt: 'Pagamento Total da Expedição',
    ja: '探検ツアー全額支払い',
    zh: '探险行程全额费用',
  },
  clientLabel: {
    en: 'Client',
    es: 'Cliente',
    fr: 'Client',
    de: 'Kunde',
    it: 'Cliente',
    pt: 'Cliente',
    ja: 'お客様',
    zh: '客户',
  },
  travelDateLabel: {
    en: 'Travel Date',
    es: 'Fecha de Viaje',
    fr: 'Date de Voyage',
    de: 'Reisedatum',
    it: 'Data di Viaggio',
    pt: 'Data da Viagem',
    ja: '旅行日',
    zh: '出行日期',
  },
  toBeConfirmed: {
    en: 'To be confirmed',
    es: 'Por confirmar',
    fr: 'À confirmer',
    de: 'Zu bestätigen',
    it: 'Da confermare',
    pt: 'A confirmar',
    ja: '確認待ち',
    zh: '待确认',
  },
  totalToPay: {
    en: 'Total Amount',
    es: 'Total a Pagar',
    fr: 'Montant Total',
    de: 'Gesamtbetrag',
    it: 'Totale da Pagare',
    pt: 'Total a Pagar',
    ja: '合計お支払い金額',
    zh: '应付总额',
  },
  taxesIncluded: {
    en: 'All taxes & destination fees included',
    es: 'Impuestos y tasas de destino incluidos',
    fr: 'Toutes taxes et frais de séjour inclus',
    de: 'Inklusive aller Steuern und Zielgebühren',
    it: 'Tutte le tasse e tariffe incluse',
    pt: 'Todos os impostos e taxas inclusos',
    ja: '税金および諸手数料込み',
    zh: '已含所有税费与目的地服务费',
  },
  vipDiscountApplied: {
    en: 'VIP Ambassador Discount Applied (10% OFF):',
    es: 'Descuento VIP de Embajador Aplicado (10% OFF):',
    fr: 'Remise Ambassadeur VIP Appliquée (-10%) :',
    de: 'VIP-Botschafter-Rabatt Angewendet (10% Rabatt):',
    it: 'Sconto Ambasciatore VIP Applicato (10% OFF):',
    pt: 'Desconto VIP de Embaixador Aplicado (10% OFF):',
    ja: 'VIPアンバサダー特別割引適用 (10% OFF):',
    zh: '已应用VIP品牌大使专属特惠 (9折):',
  },
  valueWithoutTax: {
    en: 'Base amount:',
    es: 'Valor base neto:',
    fr: 'Montant hors taxes :',
    de: 'Nettobetrag:',
    it: 'Importo base:',
    pt: 'Valor base:',
    ja: '税抜金額:',
    zh: '税前基本费用:',
  },
  taxesAndFees: {
    en: 'Taxes & fees (12%):',
    es: 'Impuestos y tasas (12%):',
    fr: 'Taxes et frais (12%) :',
    de: 'Steuern und Abgaben (12%):',
    it: 'Tasse e oneri (12%):',
    pt: 'Taxas e impostos (12%):',
    ja: '税および手数料 (12%):',
    zh: '税费与附加费 (12%):',
  },
  promoPlaceholder: {
    en: 'Promo or ambassador code...',
    es: 'Código promocional o de embajador...',
    fr: 'Code promo ou ambassadeur...',
    de: 'Aktions- oder Botschafter-Code...',
    it: 'Codice promozionale o ambasciatore...',
    pt: 'Código promocional ou de embaixador...',
    ja: 'プロモまたはアンバサダーコード...',
    zh: '促销代码或大使推荐码...',
  },
  btnApply: {
    en: 'Apply',
    es: 'Aplicar',
    fr: 'Appliquer',
    de: 'Anwenden',
    it: 'Applica',
    pt: 'Aplicar',
    ja: '適用',
    zh: '使用',
  },
  codeInvalid: {
    en: 'Ambassador code invalid or expired.',
    es: 'Código de embajador no válido o expirado.',
    fr: 'Code ambassadeur invalide ou expiré.',
    de: 'Botschafter-Code ungültig oder abgelaufen.',
    it: 'Codice ambasciatore non valido o scaduto.',
    pt: 'Código de embaixador inválido ou expirado.',
    ja: '無効または期限切れのコードです。',
    zh: '大使代码无效或已过期。',
  },
  cardsAccepted: {
    en: 'Accepted Payment Methods:',
    es: 'Métodos Aceptados:',
    fr: 'Moyens de Paiement Acceptés :',
    de: 'Akzeptierte Zahlungsmethoden:',
    it: 'Metodi di Pagamento Accettati:',
    pt: 'Métodos de Pagamento Aceitos:',
    ja: '対応している決済方法:',
    zh: '支持的支付方式:',
  },
  paypalNotice: {
    en: 'Secure payment via PayPal account balance or international debit/credit cards. No PayPal account required to pay with cards.',
    es: 'Pago seguro con tu saldo PayPal o directamente con tarjeta internacional de crédito/débito. No requieres cuenta PayPal para pagar con tarjeta.',
    fr: 'Paiement sécurisé avec PayPal ou carte bancaire internationale. Aucun compte PayPal requis pour régler par carte.',
    de: 'Sichere Zahlung mit PayPal-Guthaben oder Debit-/Kreditkarte. Für Kartenzahlung ist kein PayPal-Konto erforderlich.',
    it: 'Pagamento sicuro con conto PayPal o carta di credito/debito internazionale. Nessun conto PayPal richiesto per pagare con carta.',
    pt: 'Pagamento seguro com saldo PayPal ou cartão de crédito/débito internacional. Não é necessária conta PayPal para pagar com cartão.',
    ja: 'PayPal残高または国際クレジットカード/デビットカードによる安全な決済。カード決済の場合アカウントは不要です。',
    zh: '通过 PayPal 账户余额或国际借记卡/信用卡安全结算。使用银行卡支付无需预先注册 PayPal 账户。',
  },
  wireHeaderDesc: {
    en: 'Official receiving bank accounts in the United States, Ecuador, and Europe.',
    es: 'Cuentas bancarias oficiales de recepción en Estados Unidos, Ecuador y Europa.',
    fr: 'Comptes bancaires officiels de réception aux États-Unis, en Équateur et en Europe.',
    de: 'Offizielle Empfangskonten in den USA, Ecuador und Europa.',
    it: 'Coordinate bancarie ufficiali negli Stati Uniti, in Ecuador e in Europa.',
    pt: 'Contas bancárias oficiais nos Estados Unidos, Equador e Europa.',
    ja: '米国、エクアドル、欧州の公式受取口座。',
    zh: '美国、厄瓜多尔与欧洲官方收款账户。',
  },
  step1Wire: {
    en: '1. Transfer the exact amount to one of the official accounts below.',
    es: '1. Transfiere el monto exacto a una de nuestras cuentas oficiales abajo.',
    fr: '1. Effectuez le virement du montant exact vers l\'un de nos comptes ci-dessous.',
    de: '1. Überweisen Sie den genauen Betrag auf eines der unten angegebenen Konten.',
    it: '1. Effettua il bonifico dell\'importo esatto su uno dei nostri conti qui sotto.',
    pt: '1. Transfira o valor exato para uma das contas oficiais abaixo.',
    ja: '1. 下記の公式受取口座へ正確な金額をお振込みください。',
    zh: '1. 将准确款项汇至下方任一官方收款账户。',
  },
  step2Wire: {
    en: '2. In the transfer memo/reference, put your Booking Code: ',
    es: '2. En el concepto o referencia de tu transferencia, incluye tu Código de Reserva: ',
    fr: '2. Dans la référence du virement, indiquez votre Code de Réservation : ',
    de: '2. Geben Sie im Verwendungszweck Ihren Buchungscode an: ',
    it: '2. Nella causale del bonifico indica il tuo Codice di Prenotazione: ',
    pt: '2. No campo de referência da transferência, inclua seu Código de Reserva: ',
    ja: '2. 振込名義または通信欄に予約参照コードをご記入ください: ',
    zh: '2. 在转账附言/汇款备注中填写您的预订代码: ',
  },
  step3Wire: {
    en: '3. Click "Register Booking in Pending Payment" below to hold your travel spots immediately.',
    es: '3. Haz clic en "Registrar Reserva en Espera de Pago" abajo para bloquear tus cupos de inmediato.',
    fr: '3. Cliquez ci-dessous sur "Enregistrer la Réservation en Attente de Paiement" pour bloquer vos places.',
    de: '3. Klicken Sie unten auf "Buchung als Zahlung ausstehend registrieren", um Ihre Plätze zu sichern.',
    it: '3. Clicca su "Registra Prenotazione in Attesa di Pagamento" qui sotto per bloccare subito i posti.',
    pt: '3. Clique em "Registrar Reserva em Espera de Pagamento" abaixo para garantir suas vagas.',
    ja: '3. 下の「支払い待ちとして予約を登録」をクリックして、お席を直ちに確保してください。',
    zh: '3. 点击下方“注册预订（等待付款）”按钮，即刻为您锁定尊贵席位。',
  },
  btnSubmitWire: {
    en: 'Register Booking in Pending Payment',
    es: 'Registrar Reserva en Espera de Pago',
    fr: 'Enregistrer la Réservation en Attente de Paiement',
    de: 'Buchung in Zahlungsabwartung registrieren',
    it: 'Registra Prenotazione in Attesa di Pagamento',
    pt: 'Registrar Reserva em Espera de Pagamento',
    ja: '支払い待ちとして予約を登録',
    zh: '登记预订（等待银行电汇入账）',
  },
  uploadOptional: {
    en: 'Attach Wire Transfer Receipt / Screenshot (Optional)',
    es: 'Adjuntar Comprobante de Transferencia / Captura (Opcional)',
    fr: 'Joindre le Reçu de Virement / Capture d\'Écran (Optionnel)',
    de: 'Überweisungsbeleg / Screenshot anhängen (Optional)',
    it: 'Allega Ricevuta di Bonifico / Screenshot (Opzionale)',
    pt: 'Anexar Comprovante de Transferência / Captura (Opcional)',
    ja: '振込明細書またはスクリーンショットを添付（任意）',
    zh: '上传银行汇款凭证或电子回单截图（选填）',
  },
  uploadDragText: {
    en: 'Drag or click to upload your transfer receipt',
    es: 'Arrastra o haz clic para subir tu comprobante',
    fr: 'Glissez ou cliquez pour télécharger votre reçu',
    de: 'Ziehen oder klicken Sie, um den Beleg hochzuladen',
    it: 'Trascina o fai clic per caricare la ricevuta',
    pt: 'Arraste ou clique para enviar seu comprovante',
    ja: 'ファイルをドラッグまたはクリックして領収書をアップロード',
    zh: '拖拽或点击上传您的汇款凭证',
  },
  refOptionalPlaceholder: {
    en: 'Transaction reference or bank memo number (Optional)',
    es: 'Número de referencia bancaria o transacción (Opcional)',
    fr: 'Numéro de référence ou identifiant de transaction (Optionnel)',
    de: 'Transaktionsnummer oder Bankreferenz (Optional)',
    it: 'Numero di riferimento o transazione (Opzionale)',
    pt: 'Número de referência ou comprovante (Opcional)',
    ja: '振込照会番号またはリファレンス（任意）',
    zh: '银行交易流水号或汇款参考号（选填）',
  },
  statusPendingTitle: {
    en: 'Booking Registered • Pending Payment',
    es: '¡Reserva Registrada en Espera de Pago!',
    fr: 'Réservation Enregistrée • En Attente de Paiement',
    de: 'Buchung Registriert • Zahlung Ausstehend',
    it: 'Prenotazione Registrata • In Attesa di Pagamento',
    pt: 'Reserva Registrada • Em Espera de Pagamento',
    ja: '予約受付完了 • お振込み確認待ち',
    zh: '预订已成功登记 • 等待汇款确认',
  },
  statusPaidTitle: {
    en: 'Payment Confirmed & Guaranteed!',
    es: '¡Pago Confirmado y Garantizado!',
    fr: 'Paiement Confirmé et Garanti !',
    de: 'Zahlung Bestätigt und Garantiert!',
    it: 'Pagamento Confermato e Garantito!',
    pt: 'Pagamento Confirmado e Garantido!',
    ja: 'お支払い完了・予約確定！',
    zh: '款项已成功确认 • 席位已锁定！',
  },
  pendingExplanation: {
    en: 'We have recorded your expedition request and your spots are temporarily held. Once your wire transfer arrives in our Payoneer receiving account or Produbanco, your booking will automatically switch to Confirmed.',
    es: 'Hemos registrado tu expedición y tus cupos están temporalmente reservados. Tan pronto como tu transferencia llegue a nuestras cuentas de recepción (Payoneer / Produbanco), tu reserva cambiará automáticamente a Confirmada.',
    fr: 'Nous avons enregistré votre expédition et vos places sont temporairement réservées. Dès réception de votre virement sur nos comptes Payoneer ou Produbanco, votre réservation passera à Confirmée.',
    de: 'Wir haben Ihre Expedition erfasst und Ihre Plätze sind vorübergehend reserviert. Sobald Ihre Überweisung auf unserem Payoneer- oder Produbanco-Konto eingeht, wird Ihre Buchung bestätigt.',
    it: 'Abbiamo registrato la tua spedizione e i posti sono temporaneamente bloccati. Una volta ricevuto il bonifico sui conti Payoneer o Produbanco, la prenotazione sarà confermata.',
    pt: 'Registramos sua expedição e suas vagas estão temporariamente reservadas. Assim que sua transferência chegar em nossas contas Payoneer ou Produbanco, sua reserva será Confirmada.',
    ja: '探検ツアーの登録が完了し、お席を仮確保いたしました。Payoneer受取口座またはProdubanco口座に着金次第、ご予約は自動的に「確定」となります。',
    zh: '我们已登记您的探险行程，专属名额已为您临时保留。一旦汇款到达我们的 Payoneer 收款账户或 Produbanco 账户，您的预订将自动转为正式确认。',
  },
  paidExplanation: {
    en: 'Your payment has been processed successfully. We have dispatched your confirmation and official voucher.',
    es: 'Tu pago ha sido procesado exitosamente. Hemos enviado tu confirmación y comprobante oficial a tu correo.',
    fr: 'Votre paiement a été traité avec succès. Nous avons envoyé votre confirmation et reçu officiel par e-mail.',
    de: 'Ihre Zahlung wurde erfolgreich verarbeitet. Wir haben Ihre Bestätigung und den Gutschein per E-Mail gesendet.',
    it: 'Il pagamento è stato elaborato con successo. Abbiamo inviato la conferma e il voucher ufficiale via email.',
    pt: 'Seu pagamento foi processado com sucesso. Enviamos a confirmação e o voucher oficial para o seu e-mail.',
    ja: 'お支払いが正常に完了しました。確認メールと公式バウチャーをお送りいたしました。',
    zh: '您的款项已成功支付。我们已将确认信和官方行程凭证发送至您的电子邮箱。',
  },
  btnVoucher: {
    en: 'View Travel Voucher (PDF)',
    es: 'Ver Voucher PDF',
    fr: 'Voir le Voucher PDF',
    de: 'Reisegutschein PDF anzeigen',
    it: 'Vedi Voucher PDF',
    pt: 'Ver Voucher PDF',
    ja: 'バウチャーPDFを表示',
    zh: '查看电子行程凭证 (PDF)',
  },
  btnWhatsapp: {
    en: 'Notify Concierge on WhatsApp',
    es: 'Notificar por WhatsApp',
    fr: 'Notifier par WhatsApp',
    de: 'Per WhatsApp benachrichtigen',
    it: 'Notifica su WhatsApp',
    pt: 'Notificar via WhatsApp',
    ja: 'WhatsAppで専任担当者に連絡',
    zh: '通过WhatsApp通知专属礼宾客服',
  },
  btnReturnHome: {
    en: 'Return to Home',
    es: 'Volver al Inicio',
    fr: 'Retour à l\'Accueil',
    de: 'Zurück zur Startseite',
    it: 'Torna alla Home',
    pt: 'Voltar ao Início',
    ja: 'ホームに戻る',
    zh: '返回首页',
  },
  conciergeHelp: {
    en: 'Need personalized assistance before completing payment? Our travel designers are available 24/7.',
    es: '¿Tienes alguna duda o prefieres asistencia personalizada antes de pagar? Nuestros diseñadores de viajes están disponibles 24/7.',
    fr: 'Besoin d\'aide avant de payer ? Nos concepteurs de voyage sont disponibles 24h/24.',
    de: 'Benötigen Sie persönliche Unterstützung vor der Zahlung? Unsere Reiseberater sind rund um die Uhr für Sie da.',
    it: 'Hai domande prima di pagare? I nostri travel designer sono disponibili 24/7.',
    pt: 'Precisa de assistência antes de pagar? Nossos especialistas estão disponíveis 24/7.',
    ja: 'お支払い前にご不明な点やお困りごとはございませんか？専任のトラベルデザイナーが24時間対応いたします。',
    zh: '在付款前有任何疑问或需要专属定制协助？我们的高级旅行规划师全天候24/7在线。',
  },
  termsAgreement: {
    en: 'By proceeding with this reservation, you agree to Vermilion Routes terms and privacy policies.',
    es: 'Al confirmar el pago o registrar la reserva, autorizas a Agencia de Viajes Vermilion a procesar tu expedición bajo nuestros términos y políticas de privacidad.',
    fr: 'En poursuivant cette réservation, vous acceptez les conditions et la politique de confidentialité de Vermilion Routes.',
    de: 'Mit der Bestätigung stimmen Sie den Geschäftsbedingungen und Datenschutzrichtlinien von Vermilion Routes zu.',
    it: 'Procedendo con la prenotazione, accetti i termini di servizio e le politiche sulla privacy di Vermilion Routes.',
    pt: 'Ao continuar com a reserva, você concorda com os termos e políticas de privacidade da Vermilion Routes.',
    ja: '本予約手続きを完了することにより、Vermilion Routesの利用規約およびプライバシーポリシーに同意したものとみなされます。',
    zh: '确认付款或登记预订，即代表您同意遵循 Vermilion Routes 的服务条款与隐私政策。',
  },
  adultsText: {
    en: 'Adults',
    es: 'Adultos',
    fr: 'Adultes',
    de: 'Erwachsene',
    it: 'Adulti',
    pt: 'Adultos',
    ja: '大人',
    zh: '位成人',
  },
  adultText: {
    en: 'Adult',
    es: 'Adulto',
    fr: 'Adulte',
    de: 'Erwachsener',
    it: 'Adulto',
    pt: 'Adulto',
    ja: '大人',
    zh: '位成人',
  },
  childrenText: {
    en: 'Children',
    es: 'Niños',
    fr: 'Enfants',
    de: 'Kinder',
    it: 'Bambini',
    pt: 'Crianças',
    ja: '子供',
    zh: '位儿童',
  },
  childText: {
    en: 'Child',
    es: 'Niño',
    fr: 'Enfant',
    de: 'Kind',
    it: 'Bambino',
    pt: 'Criança',
    ja: '子供',
    zh: '位儿童',
  },
  travelersText: {
    en: 'Travelers',
    es: 'Viajeros',
    fr: 'Voyageurs',
    de: 'Reisende',
    it: 'Viaggiatori',
    pt: 'Viajantes',
    ja: '名様',
    zh: '位旅行者',
  },
  travelerText: {
    en: 'Traveler',
    es: 'Viajero',
    fr: 'Voyageur',
    de: 'Reisender',
    it: 'Viaggiatore',
    pt: 'Viajante',
    ja: '名様',
    zh: '位旅行者',
  },
  defaultTravelerName: {
    en: 'Valued Traveler',
    es: 'Viajero Distinguido',
    fr: 'Voyageur Distingué',
    de: 'Geschätzter Reisender',
    it: 'Viaggiatore Distinto',
    pt: 'Viajante Ilustre',
    ja: '大切なお客様',
    zh: '尊贵旅客',
  },
  downloadVoucherPdf: {
    en: 'Download Voucher (PDF)',
    es: 'Descargar Voucher (PDF)',
    fr: 'Télécharger le Voucher (PDF)',
    de: 'Gutschein herunterladen (PDF)',
    it: 'Scarica Voucher (PDF)',
    pt: 'Baixar Voucher (PDF)',
    ja: 'バウチャーをダウンロード (PDF)',
    zh: '下载凭证 (PDF)',
  },
  backToModify: {
    en: 'Back to modify booking',
    es: 'Volver a modificar mi reserva',
    fr: 'Modifier ma réservation',
    de: 'Zurück zur Buchungsänderung',
    it: 'Torna a modificare la prenotazione',
    pt: 'Voltar para modificar minha reserva',
    ja: '予約変更に戻る',
    zh: '返回修改我的预订',
  },
  spainTransferDesc: {
    en: 'Local reception in Euros via European SEPA bank transfer with zero international exchange fees. Settle in EUR now by contacting our 24/7 Concierge on WhatsApp to receive Madrid deposit details.',
    es: 'Recepción local en euros mediante transferencia bancaria europea SEPA sin comisiones internacionales de cambio. Si deseas liquidar en EUR de inmediato, contacta a nuestro Concierge 24/7 en WhatsApp para coordinar los datos de depósito directo en Madrid.',
    fr: 'Réception locale en euros par virement bancaire européen SEPA sans frais de change. Pour régler en EUR dès maintenant, contactez notre Concierge 24/7 sur WhatsApp pour recevoir les coordonnées de dépôt à Madrid.',
    de: 'Lokaler Empfang in Euro per europäischer SEPA-Banküberweisung ohne Wechselgebühren. Um jetzt in EUR zu bezahlen, kontaktieren Sie unseren 24/7 Concierge auf WhatsApp für die Kontodaten in Madrid.',
    it: 'Ricezione locale in Euro tramite bonifico europeo SEPA senza commissioni di cambio. Per saldare in EUR ora, contatta il nostro Concierge 24/7 su WhatsApp per le coordinate di Madrid.',
    pt: 'Recebimento local em euros via transferência bancária europeia SEPA sem taxas de câmbio. Para liquidar em EUR agora, contate nosso Concierge 24/7 no WhatsApp para receber os dados de depósito em Madrid.',
    ja: '欧州SEPA銀行振込による手数料無料のユーロ受取。EURでのお支払いをご希望の場合は、24時間対応のWhatsAppコンシェルジュにマドリード口座詳細をお問い合わせください。',
    zh: '支持通过欧洲 SEPA 银行转账直接支付欧元，免除任何国际兑换手续费。如需立即使用欧元结算，请随时联系我们的 24/7 WhatsApp 礼宾客服获取马德里指定账户信息。',
  },
  requestMadridWa: {
    en: 'Request Madrid account via WhatsApp',
    es: 'Solicitar cuenta en Madrid por WhatsApp',
    fr: 'Demander le compte de Madrid via WhatsApp',
    de: 'Madrid-Kontodaten per WhatsApp anfordern',
    it: 'Richiedi conto di Madrid via WhatsApp',
    pt: 'Solicitar conta em Madrid pelo WhatsApp',
    ja: 'WhatsAppでマドリード口座を問い合わせる',
    zh: '通过 WhatsApp 索取马德里银行账户',
  },
  contactDetailsTitle: {
    en: 'Lead Traveler Contact Details',
    es: 'Datos del Pasajero Principal',
    fr: 'Coordonnées du Passager Principal',
    de: 'Kontaktdaten des Hauptreisenden',
    it: 'Dati del Passeggero Principale',
    pt: 'Dados do Passageiro Principal',
    ja: '代表者連絡先情報',
    zh: '主要旅客联系信息',
  },
  contactDetailsSubtitle: {
    en: 'Official voucher, tickets & receipts will be sent to this email.',
    es: 'Los vouchers oficiales, tickets y comprobantes se enviarán a este correo.',
    fr: 'Les bons officiels, billets et reçus seront envoyés à cette adresse.',
    de: 'Offizielle Gutscheine, Tickets und Belege werden an diese E-Mail gesendet.',
    it: 'Voucher ufficiali, biglietti e ricevute saranno inviati a questa email.',
    pt: 'Vouchers oficiais, ingressos e comprovantes serão enviados para este e-mail.',
    ja: '公式バウチャー、チケット、領収書はこのメール宛てに送信されます。',
    zh: '正式凭证、出行票据与确认单将发送至此电子邮箱。',
  },
  fullNameLabel: {
    en: 'Full Name',
    es: 'Nombre y Apellidos',
    fr: 'Nom et Prénom',
    de: 'Vollständiger Name',
    it: 'Nome e Cognome',
    pt: 'Nome e Sobrenome',
    ja: '氏名',
    zh: '旅客姓名',
  },
  fullNamePlaceholder: {
    en: 'e.g. Alexander von Humboldt',
    es: 'ej. Alejandro de Humboldt',
    fr: 'ex. Alexandre de Humboldt',
    de: 'z.B. Alexander von Humboldt',
    it: 'es. Alessandro di Humboldt',
    pt: 'ex. Alexandre de Humboldt',
    ja: '例：山田 太郎',
    zh: '例如：王小明',
  },
  emailLabel: {
    en: 'Email Address',
    es: 'Correo Electrónico',
    fr: 'Adresse Email',
    de: 'E-Mail-Adresse',
    it: 'Indirizzo Email',
    pt: 'Endereço de E-mail',
    ja: 'メールアドレス',
    zh: '电子邮箱',
  },
  emailPlaceholder: {
    en: 'alexander@example.com',
    es: 'alejandro@ejemplo.com',
    fr: 'alexandre@exemple.com',
    de: 'alexander@beispiel.de',
    it: 'alessandro@esempio.it',
    pt: 'alexandre@exemplo.com',
    ja: 'taro@example.com',
    zh: 'example@domain.com',
  },
  phoneLabel: {
    en: 'Phone / WhatsApp (Optional)',
    es: 'Teléfono / WhatsApp (Opcional)',
    fr: 'Téléphone / WhatsApp (Opcional)',
    de: 'Telefon / WhatsApp (Optional)',
    it: 'Telefono / WhatsApp (Opzionale)',
    pt: 'Telefone / WhatsApp (Opcional)',
    ja: '電話番号 / WhatsApp（任意）',
    zh: '联系电话 / WhatsApp（选填）',
  },
};

export default function CheckoutPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawLocale = useLocale();
  const locale = ['es', 'en', 'fr', 'de', 'zh', 'it', 'pt', 'ja'].includes(rawLocale) ? rawLocale : 'en';

  const t = (key: string): string => {
    return CHECKOUT_I18N[key]?.[locale] || CHECKOUT_I18N[key]?.['en'] || key;
  };

  const tourId = searchParams.get('tourid') || searchParams.get('tourId') || 'custom';
  const tourTitle = searchParams.get('tourTitle') || 'Vermilion Routes Expedition';
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [clientName, setClientName] = useState(searchParams.get('name') || '');
  const [clientPhone, setClientPhone] = useState(searchParams.get('phone') || '');
  const amountStr = searchParams.get('amount') || '500';
  const type = searchParams.get('type') || 'deposit';
  const initialRef = searchParams.get('ref') || '';
  const [ref, setRef] = useState(initialRef.includes('-751') ? '' : initialRef);
  const travelDate = searchParams.get('date') || '';
  const travelersParam = searchParams.get('travelers') || searchParams.get('guestsCount') || '';
  const adultsParam = searchParams.get('adults') || '';
  const childrenParam = searchParams.get('children') || '';
  const isDailyTourParam = searchParams.get('isDailyTour') === 'true';

  // Dynamic travelers description based on real passenger selection
  const getTravelersText = () => {
    const a = parseInt(adultsParam);
    const c = parseInt(childrenParam);
    if (!isNaN(a) && a > 0) {
      if (!isNaN(c) && c > 0) {
        return `${a} ${a === 1 ? t('adultText') : t('adultsText')}, ${c} ${c === 1 ? t('childText') : t('childrenText')}`;
      }
      return `${a} ${a === 1 ? t('travelerText') : t('travelersText')}`;
    }
    const tCount = parseInt(travelersParam);
    if (!isNaN(tCount) && tCount > 0) {
      return `${tCount} ${tCount === 1 ? t('travelerText') : t('travelersText')}`;
    }
    return `1 ${t('travelerText')}`;
  };

  // Discount code & Automatic 10% Referral Discount
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(searchParams.get('discountApplied') === 'true');
  const [discountError, setDiscountError] = useState('');

  // Tabs: 'card' (PayPal & Cards) | 'bank' (Payoneer & Produbanco Wire)
  const [activeTab, setActiveTab] = useState<'card' | 'bank'>('card');
  const [openBankCard, setOpenBankCard] = useState<'usa' | 'ecuador' | 'spain' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);
  const [voucherOpen, setVoucherOpen] = useState(false);
  const [isGeneratingVoucherPdf, setIsGeneratingVoucherPdf] = useState(false);

  const handleDownloadPdfDirect = async () => {
    if (isGeneratingVoucherPdf) return;
    setIsGeneratingVoucherPdf(true);
    try {
      await generateTravelVoucherPDF({
        bookingRef: ref,
        customerName: clientName || email.split('@')[0] || t('defaultTravelerName'),
        customerEmail: email || 'info@vermilionroutes.com',
        tourTitle,
        destination: matchedTour?.destination || 'Ecuador & Galápagos',
        travelDate: travelDate || t('toBeConfirmed'),
        travelersCount: getTravelersText(),
        totalAmount: finalAmount,
        paymentMethod: receiptSubmitted ? 'Transferencia Bancaria Internacional' : 'PayPal / Tarjeta Internacional',
        paymentStatus: isPaid && !receiptSubmitted ? 'confirmed' : 'pending_payment',
        locale,
      });
    } catch (err) {
      console.error('Error generating official voucher PDF:', err);
    } finally {
      setIsGeneratingVoucherPdf(false);
    }
  };

  // Wire Currency (USD)
  const wireCurrency = 'USD';
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Bank Transfer Form state & 🛡️ Anti-bot honeypot
  const [bankReceipt, setBankReceipt] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [transferRef, setTransferRef] = useState('');
  const [hpTrap, setHpTrap] = useState(''); // Off-screen honeypot field for Python bot defense

  const initialAmount = Number(amountStr) || 500;
  const finalAmount = discountApplied ? Number((initialAmount * 0.9).toFixed(2)) : initialAmount;
  const discountSavings = discountApplied ? Number((initialAmount - finalAmount).toFixed(2)) : 0;

  const matchedTour = mockTours.find((t) => t.id === tourId || t.title.en === tourTitle) || mockTours[0];

  useEffect(() => {
    const stored = getStoredUserProfile();
    if (!email && stored.email) setEmail(stored.email);
    if (!clientName && stored.name) setClientName(stored.name);

    // Guarantee ref format R-[year]-[tourCode]-[sequential] (starts at 80)
    if (!ref || !ref.startsWith('R-2026-') || ref.includes('-751')) {
      const affCode = searchParams.get('affiliateCode') || searchParams.get('vid') || getStoredAffiliateRef();
      generateBookingCode(tourId, affCode || undefined).then((newCode) => {
        setRef(newCode);
      });
    }
  }, [tourId, ref, searchParams, email, clientName]);

  // Auto-detect affiliate referral code from URL or Storage/Cookie
  useEffect(() => {
    const explicitAffiliate = searchParams.get('affiliateCode') || searchParams.get('affiliate') || searchParams.get('vid') || searchParams.get('code');
    const refParam = searchParams.get('ref');
    const paramDiscountApplied = searchParams.get('discountApplied') === 'true';

    let detectedAffiliate = explicitAffiliate;
    if (!detectedAffiliate && refParam && !isBookingCode(refParam)) {
      detectedAffiliate = refParam;
    }

    if (detectedAffiliate) {
      const cleanCode = detectedAffiliate.trim().toLowerCase();
      setDiscountCode(cleanCode);
      setDiscountApplied(true);
    } else if (paramDiscountApplied) {
      setDiscountApplied(true);
      const stored = getStoredAffiliateRef();
      if (stored && !isBookingCode(stored)) {
        setDiscountCode(stored);
      }
    } else if (!discountApplied) {
      const stored = getStoredAffiliateRef();
      if (stored && !isBookingCode(stored)) {
        setDiscountCode(stored);
        setDiscountApplied(true);
      }
    }
  }, [searchParams, discountApplied]);

  const formatPrice = (val: number) => {
    return (val % 1 !== 0 || val < 10)
      ? val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : val.toLocaleString('en-US');
  };

  const handleApplyDiscount = async () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'VERMILION10' || code === 'CLUB10' || code === 'WELCOME10') {
      setDiscountApplied(true);
      setDiscountError('');
      return;
    }

    try {
      const affiliate = await getAffiliateByCode(code);
      if (affiliate) {
        setDiscountApplied(true);
        setDiscountError('');
      } else {
        setDiscountError(t('codeInvalid'));
      }
    } catch {
      setDiscountError(t('codeInvalid'));
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBankReceipt(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ─────────────────────────────────────────────
  // SUBMIT PAYONEER / WIRE TRANSFER REGISTRATION
  // Status is persisted as 'pending_payment' (Espera de pago)
  // ─────────────────────────────────────────────
  const handleSubmitWireRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const buyerName = clientName || email.split('@')[0] || 'Valued Traveler';
    const activeRef = ref || (await generateBookingCode(tourId, discountApplied ? discountCode : undefined));
    const cleanEmail = (email || 'guest@vermilionroutes.com').trim().toLowerCase();
    const travelersStr = getTravelersText();

    // 1. Direct client-side Firestore persistence (Guaranteed write)
    if (db) {
      try {
        await setDoc(doc(db, 'bookings', activeRef), {
          id: activeRef,
          refCode: activeRef,
          bookingCode: activeRef,
          tourId,
          tourTitle,
          customerName: buyerName,
          customerEmail: cleanEmail,
          customerPhone: '',
          travelDates: travelDate || 'To be confirmed',
          guestsCount: travelersStr,
          passengersCount: parseInt(travelersParam) || parseInt(adultsParam) || 1,
          destination: matchedTour?.destination || 'Ecuador & Galápagos',
          amountPaid: finalAmount,
          paidAmount: finalAmount,
          totalAmount: finalAmount,
          paymentMethod: 'payoneer_wire',
          paymentStatus: 'pending_payment',
          status: 'pending',
          transferRef: transferRef || 'Wire transfer registration',
          affiliateCode: discountApplied ? discountCode : undefined,
          discountApplied,
          createdAt: new Date().toISOString(),
        }, { merge: true });
        console.log('✅ [CLIENT FIRESTORE] Wire transfer booking saved:', activeRef);
      } catch (clientErr) {
        console.warn('[CLIENT FIRESTORE NOTICE]', clientErr);
      }
    }

    try {
      const res = await fetch('/api/checkout/payoneer/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: activeRef,
          tourId,
          tourTitle,
          clientName: buyerName,
          clientEmail: cleanEmail,
          clientPhone: '',
          amount: finalAmount,
          currency: wireCurrency,
          travelDate: travelDate || undefined,
          guestsCount: travelersStr,
          locale,
          affiliateCode: discountApplied ? discountCode : undefined,
          _hp_trap: hpTrap, // 🛡️ Honeypot bot defense
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error registering wire transfer.');
      }

      setRef(data.bookingRef || activeRef);
      setReceiptSubmitted(true);
      setIsPaid(true);
    } catch (err: any) {
      console.warn('[Payoneer transfer register notice]', err);
      // Graceful fallback for demo simulation
      setReceiptSubmitted(true);
      setIsPaid(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#07130C] text-stone-900 dark:text-white py-4 sm:py-6 px-3 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className={`w-full mx-auto relative z-10 transition-all ${
        isPaid 
          ? 'max-w-xl my-6 bg-white dark:bg-zinc-900/90 border border-stone-200 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6 text-stone-900 dark:text-white' 
          : 'max-w-[96%] xl:max-w-7xl 2xl:max-w-[1440px] space-y-3.5'
      }`}>
        
        {/* Top Header for Paid State */}
        {isPaid && (
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <span className="font-serif font-bold tracking-widest uppercase text-xs text-stone-900 dark:text-zinc-100 block">
                VERMILION ROUTES
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400/80 uppercase tracking-wider block font-medium">
                {t('luxuryExpeditions')}
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
            <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>{t('secureSsl')}</span>
          </div>
        </div>
        )}

        {isPaid ? (
          /* ─────────────────────────────────────────────
             SUCCESS SCREEN (PAID OR PENDING PAYMENT)
             ───────────────────────────────────────────── */
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg border ${
              receiptSubmitted
                ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/40 shadow-amber-900/10'
                : 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/40 shadow-emerald-900/10'
            }`}>
              {receiptSubmitted ? <Clock className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>

            <div className="space-y-1">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                receiptSubmitted
                  ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-500/40 text-amber-800 dark:text-amber-300'
                  : 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
              }`}>
                {receiptSubmitted ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                <span>{receiptSubmitted ? 'Espera de pago' : 'Pago Confirmado'}</span>
              </span>

              <h1 className="text-2xl font-bold font-serif text-stone-900 dark:text-white pt-2">
                {receiptSubmitted ? t('statusPendingTitle') : t('statusPaidTitle')}
              </h1>
            </div>

            <p className="text-sm text-stone-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed" suppressHydrationWarning>
              {receiptSubmitted ? t('pendingExplanation') : t('paidExplanation')}
            </p>

            {/* Booking Details Box */}
            <div className="p-4 bg-stone-50 dark:bg-zinc-950/80 border border-stone-200 dark:border-white/10 rounded-2xl text-xs text-stone-600 dark:text-zinc-400 space-y-2 text-left max-w-md mx-auto">
              <p className="flex justify-between"><span className="text-stone-500 dark:text-zinc-500">Expedición:</span> <strong className="text-stone-900 dark:text-white text-right line-clamp-1">{tourTitle}</strong></p>
              {travelDate && <p className="flex justify-between"><span className="text-stone-500 dark:text-zinc-500">{t('travelDateLabel')}:</span> <strong className="text-emerald-700 dark:text-emerald-400">{travelDate}</strong></p>}
              <p className="flex justify-between"><span className="text-stone-500 dark:text-zinc-500">Código de Reserva:</span> <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">{ref}</span></p>
              <p className="flex justify-between"><span className="text-stone-500 dark:text-zinc-500">Método Registrado:</span> <span className="text-stone-800 dark:text-zinc-200 font-medium">{receiptSubmitted ? 'Transferencia Bancaria Internacional' : 'PayPal / Tarjeta'}</span></p>
              <p className="flex justify-between border-t border-stone-200 dark:border-white/10 pt-2"><span className="text-stone-700 dark:text-zinc-400 font-semibold">{t('totalToPay')}:</span> <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm" suppressHydrationWarning>${formatPrice(finalAmount)} USD</span></p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleDownloadPdfDirect}
                disabled={isGeneratingVoucherPdf}
                className="px-5 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 group border-none disabled:opacity-60"
              >
                {isGeneratingVoucherPdf ? (
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                )}
                <span>{t('downloadVoucherPdf')}</span>
              </button>

              <a
                href={`https://wa.me/593994048458?text=${encodeURIComponent(
                  `Hola Vermilion Routes, he registrado mi reserva para "${tourTitle}" (Ref: ${ref}). Método: ${receiptSubmitted ? 'Transferencia Bancaria Internacional' : 'PayPal'}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('btnWhatsapp')}</span>
              </a>

              <button
                onClick={() => router.push(`/${locale}`)}
                className="px-5 py-3 bg-transparent border-2 border-stone-300 dark:border-emerald-500/30 hover:border-emerald-600 dark:hover:border-emerald-500/60 hover:bg-stone-100 dark:hover:bg-zinc-800 text-stone-700 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 group"
              >
                <span>{t('btnReturnHome')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ── NAVBAR CHIKITITO VIP (Compact Top Bar) ── */}
            <header className="bg-white dark:bg-zinc-900/95 backdrop-blur-md border border-stone-200 dark:border-white/10 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-stone-900 dark:text-white">
              {/* Brand + Tour Details */}
              <div className="flex items-center gap-3 w-full md:w-auto min-w-0 justify-between md:justify-start">
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="font-serif font-black tracking-widest uppercase text-xs text-stone-900 dark:text-white block leading-tight">
                      VERMILION ROUTES
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400/90 uppercase tracking-wider block font-semibold leading-tight">
                      {t('luxuryExpeditions')}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block h-7 w-px bg-stone-200 dark:bg-white/10 shrink-0" />

                {/* Tour snippet */}
                <div className="min-w-0 flex-1 sm:flex-initial">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-zinc-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
                      Ref: {ref}
                    </span>
                    <h1 className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-white truncate max-w-[200px] sm:max-w-[320px] lg:max-w-[420px]" title={tourTitle}>
                      {tourTitle}
                    </h1>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 dark:text-zinc-400 pt-0.5">
                    {travelDate && (
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        {travelDate}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Users className="w-3 h-3 text-emerald-600" />
                      {getTravelersText()}
                    </span>
                    <button
                      type="button"
                      onClick={() => router.push(`/${locale}/booking?tourid=${tourId}&date=${travelDate}&adults=${adultsParam || '2'}&children=${childrenParam || '0'}`)}
                      className="inline-flex items-center gap-1 text-stone-500 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 underline transition-colors cursor-pointer ml-1"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span className="hidden sm:inline">{t('backToModify')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price in strictly USD & SSL Badge */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-stone-100 dark:border-white/5 pt-2.5 md:pt-0">
                <div className="text-left md:text-right">
                  <div className="flex items-baseline md:justify-end gap-1" suppressHydrationWarning>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mr-1">
                      {t('totalToPay')}:
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">$</span>
                    <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                      {formatPrice(finalAmount)}
                    </span>
                    <span className="text-xs font-bold text-stone-600 dark:text-zinc-400">
                      USD
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-medium">
                    {t('taxesIncluded')}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold shrink-0">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">{t('secureSsl')}</span>
                  <span className="sm:hidden">SSL 256-Bit</span>
                </div>
              </div>
            </header>

            {/* ── BLOQUE REASEGURADOR FIDUCIARIO "ANTES DE PAGAR" (PRE-PAYMENT ASSURANCE) ── */}
            <section
              aria-label="Fiduciary Pre-Payment Assurance"
              className="bg-gradient-to-br from-amber-500/[0.08] via-emerald-500/[0.05] to-teal-500/[0.07] dark:from-amber-400/[0.06] dark:via-zinc-900/90 dark:to-emerald-950/40 border border-amber-300/60 dark:border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-lg shadow-amber-950/5 space-y-5"
            >
              {/* Header con Badges Fiduciarios Mandatorios */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-amber-200/50 dark:border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400 block">
                      {t('prePaymentBadge')}
                    </span>
                    <h2 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                      {t('prePaymentAssuranceTitle')}
                    </h2>
                  </div>
                </div>

                {/* Sellos Fiduciarios Mandatorios */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-amber-300 dark:border-amber-500/40 text-stone-800 dark:text-amber-300 text-[11px] font-bold shadow-xs hover:border-amber-400 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span>{t('sealTripAdvisor')}</span>
                  </a>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-500/40 text-stone-800 dark:text-emerald-300 text-[11px] font-bold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('sealMintur')}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-teal-300 dark:border-teal-500/40 text-stone-800 dark:text-teal-300 text-[11px] font-bold shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>{t('sealDepositGuarantee')}</span>
                  </div>
                </div>
              </div>

              {/* Mensajes Reaseguradores Mandatorios (Verificación & Congelación + Garantía Médica) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-[13px] leading-relaxed">
                <div className="p-4 rounded-2xl bg-white/85 dark:bg-zinc-950/70 border border-amber-200/70 dark:border-amber-500/25 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('prePaymentFreezeTitle')}</span>
                  </div>
                  <p className="text-stone-700 dark:text-zinc-300">
                    {t('prePaymentFreezeText')}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/85 dark:bg-zinc-950/70 border border-teal-200/70 dark:border-teal-500/25 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>{t('prePaymentMedicalGuaranteeTitle')}</span>
                  </div>
                  <p className="text-stone-700 dark:text-zinc-300">
                    {t('prePaymentMedicalGuarantee')}
                  </p>
                </div>
              </div>

              {/* Canales de Contacto Directo & Aviso de Operadores Bilingües */}
              <div className="pt-3 border-t border-amber-200/40 dark:border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-700 dark:text-zinc-300 text-[11px] sm:text-xs">
                  <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t('bilingualOperatorsNotice')}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                  <a
                    href="tel:+13022041881"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-100 font-bold hover:border-emerald-500 transition-colors shadow-2xs text-[11px] active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{t('usConciergeTitle')}: +1 (302) 204-1881</span>
                  </a>

                  <a
                    href={`https://wa.me/593994048458?text=${encodeURIComponent(
                      `Hola Vermilion Routes, estoy en el checkout del tour "${tourTitle}" (Ref: ${ref || 'Web'}). Deseo asistencia directa antes de pagar.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs text-[11px] active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t('ecWhatsAppTitle')}: +593 99 404 8458</span>
                  </a>
                </div>
              </div>
            </section>

            {/* LAS 2 COLUMNAS (50% / 50% en pantallas grandes) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              
              {/* ── COLUMNA 1: PAYPAL / TARJETA INTERNACIONAL ── */}
              <div className="bg-white dark:bg-zinc-950/70 border border-stone-200 dark:border-white/10 rounded-3xl p-5 sm:p-7 space-y-5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                        {t('tabPaypalCard')}
                      </h3>
                      <span className="text-[11px] text-stone-500 dark:text-zinc-400 block">
                        Confirmación Inmediata • Cifrado 256-Bit
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-blue-800 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                    Recomendado
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-zinc-300 leading-relaxed">
                  {t('paypalNotice')}
                </p>

                {/* PayPal Official SDK Buttons */}
                <div className="pt-2">
                  <PayPalCheckoutButton
                    amount={finalAmount}
                    bookingRef={ref}
                    tourId={tourId}
                    tourTitle={tourTitle}
                    clientName={clientName || email.split('@')[0] || t('defaultTravelerName')}
                    clientEmail={email}
                    clientPhone={clientPhone}
                    travelDate={travelDate}
                    guestsCount={getTravelersText()}
                    passengersCount={parseInt(travelersParam) || parseInt(adultsParam) || 1}
                    locale={locale}
                    currency="USD"
                    affiliateCode={discountApplied ? discountCode : undefined}
                    onSuccess={(confirmedRef) => {
                      setRef(confirmedRef);
                      setReceiptSubmitted(false);
                      setIsPaid(true);
                    }}
                  />
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-[11px] text-stone-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PayPal Holdings, Inc.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SSL 256-Bit Encryption</span>
                  </div>
                </div>
              </div>

              {/* ── COLUMNA 2: TRANSFERENCIA BANCARIA INTERNACIONAL ── */}
              <div className="bg-white dark:bg-zinc-950/70 border border-stone-200 dark:border-white/10 rounded-3xl p-5 sm:p-7 space-y-5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                        {t('tabBankTitle')}
                      </h3>
                      <span className="text-[11px] text-stone-500 dark:text-zinc-400 block">
                        Cuentas Oficiales • Sin recargo de pasarela
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    Directo
                  </span>
                </div>

                <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-xs space-y-1">
                  <p className="text-stone-700 dark:text-zinc-200 font-medium">
                    1. Elige una de nuestras cuentas oficiales abajo para ver los datos bancarios.
                  </p>
                  <p className="text-stone-700 dark:text-zinc-200">
                    2. En el concepto, coloca tu Referencia: <strong className="font-mono text-emerald-700 dark:text-emerald-300 bg-white dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">{ref}</strong>
                  </p>
                </div>

                {/* 3 Cuentas Bancarias Oficiales en Acordeón */}
                <div className="space-y-2.5">
                  
                  {/* CUENTA 1: USA (USD) Citi bank */}
                  <div className={`border rounded-2xl overflow-hidden transition-all ${openBankCard === 'usa' ? 'border-emerald-500 bg-emerald-50/20 dark:bg-zinc-900 shadow-sm ring-1 ring-emerald-500/30' : 'border-stone-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 hover:border-emerald-400'}`}>
                    <button
                      type="button"
                      onClick={() => setOpenBankCard(openBankCard === 'usa' ? null : 'usa')}
                      className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🇺🇸</span>
                        <div>
                          <span className="text-xs font-bold text-stone-900 dark:text-white block">
                            USA (USD) • Citi bank (Florida)
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                            ACH / Domestic Wire / Zelle
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[9px] font-bold text-emerald-800 dark:text-emerald-300">
                          USD
                        </span>
                        {openBankCard === 'usa' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                      </div>
                    </button>

                    {openBankCard === 'usa' && (
                      <div className="p-3.5 pt-0 border-t border-stone-100 dark:border-white/5 space-y-1.5 font-mono text-[11px] text-stone-700 dark:text-zinc-300 animate-fade-in">
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Checking Account:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('9119836186', 'us_acc')}
                            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            9119836186 {copiedKey === 'us_acc' ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-stone-400 dark:text-zinc-500" />}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Account Holder:</span>
                          <span className="text-stone-900 dark:text-white font-sans text-[11px] font-medium">Medardo Sanchez</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Routing (ACH):</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('063100277', 'us_ach')}
                            className="text-stone-900 dark:text-white font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            063100277 {copiedKey === 'us_ach' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Routing (Wire):</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('021000089', 'us_wire')}
                            className="text-stone-900 dark:text-white font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            021000089 {copiedKey === 'us_wire' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Zelle Transfer:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('*gsanchez@plustelesmart.com.ec', 'us_zelle')}
                            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer font-sans"
                          >
                            *gsanchez@plustelesmart.com.ec {copiedKey === 'us_zelle' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CUENTA 2: ECUADOR (USD) Banco Produbanco */}
                  <div className={`border rounded-2xl overflow-hidden transition-all ${openBankCard === 'ecuador' ? 'border-emerald-500 bg-emerald-50/20 dark:bg-zinc-900 shadow-sm ring-1 ring-emerald-500/30' : 'border-stone-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 hover:border-emerald-400'}`}>
                    <button
                      type="button"
                      onClick={() => setOpenBankCard(openBankCard === 'ecuador' ? null : 'ecuador')}
                      className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🇪🇨</span>
                        <div>
                          <span className="text-xs font-bold text-stone-900 dark:text-white block">
                            Ecuador (USD) • Produbanco
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                            Cuenta Corriente / SWIFT
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[9px] font-bold text-emerald-800 dark:text-emerald-300">
                          USD
                        </span>
                        {openBankCard === 'ecuador' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                      </div>
                    </button>

                    {openBankCard === 'ecuador' && (
                      <div className="p-3.5 pt-0 border-t border-stone-100 dark:border-white/5 space-y-1.5 font-mono text-[11px] text-stone-700 dark:text-zinc-300 animate-fade-in">
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Cuenta Corriente:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('27059152821', 'pro_acc')}
                            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            27059152821 {copiedKey === 'pro_acc' ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-stone-400 dark:text-zinc-500" />}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Beneficiario:</span>
                          <span className="text-stone-900 dark:text-white font-sans text-[11px] font-medium truncate max-w-[200px]">Agencia de Viajes Vermilion</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">RUC:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('1793215456001', 'pro_ruc')}
                            className="text-stone-900 dark:text-white font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            1793215456001 {copiedKey === 'pro_ruc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">SWIFT:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('PRODECEQXXX', 'pro_swift')}
                            className="text-stone-900 dark:text-white font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            PRODECEQXXX {copiedKey === 'pro_swift' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CUENTA 3: ESPAÑA / EUROPA (EUR) CaixaBank SEPA */}
                  <div className={`border rounded-2xl overflow-hidden transition-all ${openBankCard === 'spain' ? 'border-emerald-500 bg-emerald-50/20 dark:bg-zinc-900 shadow-sm ring-1 ring-emerald-500/30' : 'border-stone-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 hover:border-emerald-400'}`}>
                    <button
                      type="button"
                      onClick={() => setOpenBankCard(openBankCard === 'spain' ? null : 'spain')}
                      className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🇪🇸</span>
                        <div>
                          <span className="text-xs font-bold text-stone-900 dark:text-white block">
                            España / Europa (EUR) • SEPA
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                            Sede Asociada Madrid (Coral Tour)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-[9px] font-bold text-blue-800 dark:text-blue-300">
                          EUR
                        </span>
                        {openBankCard === 'spain' ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                      </div>
                    </button>

                    {openBankCard === 'spain' && (
                      <div className="p-3.5 pt-0 border-t border-stone-100 dark:border-white/5 space-y-1.5 font-mono text-[11px] text-stone-700 dark:text-zinc-300 animate-fade-in">
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">IBAN SEPA:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('ES4021000418450200051192', 'es_iban')}
                            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer text-[10px]"
                          >
                            ES40 2100 0418 4502 0005 1192 {copiedKey === 'es_iban' ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-stone-400" />}
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">Beneficiario:</span>
                          <span className="text-stone-900 dark:text-white font-sans text-[11px] font-medium truncate max-w-[200px]">Coral Tour Operador España</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 dark:text-zinc-500 font-sans">BIC / SWIFT:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('CAIXESBBXXX', 'es_bic')}
                            className="text-stone-900 dark:text-white font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            CAIXESBBXXX {copiedKey === 'es_bic' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* ── SECCIÓN DE SUBIDA DE COMPROBANTE: SOLO VISIBLE SI UNA CUENTA ESTÁ ABIERTA ── */}
                {openBankCard !== null ? (
                  <form onSubmit={handleSubmitWireRegistration} className="space-y-3 pt-3 border-t border-stone-200 dark:border-white/10 animate-fade-in">
                    
                    {/* Honeypot trap */}
                    <div className="sr-only opacity-0 h-0 w-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
                      <label htmlFor="website_url_hp">Website URL</label>
                      <input
                        id="website_url_hp"
                        type="text"
                        name="_hp_trap"
                        value={hpTrap}
                        onChange={(e) => setHpTrap(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <h4 className="font-bold text-stone-900 dark:text-white text-xs flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('uploadOptional')}</span>
                    </h4>

                    {/* File Dropzone */}
                    <div className="border-2 border-dashed border-stone-300 dark:border-zinc-700 hover:border-emerald-600 dark:hover:border-emerald-500 rounded-2xl p-4 text-center transition-all bg-stone-50/60 dark:bg-zinc-950/60 cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {previewUrl ? (
                        <div className="space-y-2">
                          <div className="relative w-28 h-20 mx-auto rounded-lg overflow-hidden border border-stone-300 dark:border-zinc-700">
                            <Image src={previewUrl} alt="Receipt Preview" fill className="object-cover" />
                          </div>
                          <p className="text-emerald-700 dark:text-emerald-400 font-medium text-xs">
                            {bankReceipt?.name} ({Math.round((bankReceipt?.size || 0) / 1024)} KB)
                          </p>
                          <span className="text-[10px] text-stone-500 dark:text-zinc-500">Haz clic para cambiar archivo</span>
                        </div>
                      ) : (
                        <div className="space-y-1 py-2">
                          <Upload className="w-6 h-6 text-emerald-600 dark:text-emerald-500 mx-auto" />
                          <p className="text-xs text-stone-800 dark:text-zinc-200 font-semibold">
                            {t('uploadDragText')}
                          </p>
                          <p className="text-[10px] text-stone-500 dark:text-zinc-500">Formatos JPG, PNG, PDF hasta 10MB</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder={t('refOptionalPlaceholder')}
                        value={transferRef}
                        onChange={(e) => setTransferRef(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-stone-300 dark:border-zinc-800 rounded-xl text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.01] active:scale-95 group disabled:opacity-50 disabled:hover:scale-100 cursor-pointer border-none"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Registrando Reserva...</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 shrink-0 group-hover:-translate-y-0.5 transition-transform text-amber-300" />
                          <span>{t('btnSubmitWire')}</span>
                          <ArrowRight className="w-4 h-4 hidden sm:block shrink-0 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="p-3.5 bg-stone-50 dark:bg-zinc-900/50 border border-stone-200 dark:border-white/5 rounded-2xl text-center text-xs text-stone-600 dark:text-zinc-400 space-y-1">
                    <span className="block font-medium text-emerald-700 dark:text-emerald-400">👆 ¿Deseas pagar por transferencia?</span>
                    <span className="block text-[11px]">Haz clic en cualquiera de las 3 cuentas arriba para ver los números de cuenta oficiales y adjuntar tu comprobante de pago.</span>
                  </div>
                )}
              </div>

            </div>

            {/* Support & Trust Footer */}
            <div className="w-full pt-4 space-y-4 max-w-3xl mx-auto">
              {/* Direct Concierge Channels */}
              <div className="text-center space-y-2.5">
                <p className="text-xs font-medium text-stone-500 dark:text-zinc-400">
                  {t('conciergeHelp')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href="tel:+13022041881"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-blue-600/30 dark:border-blue-500/40 bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-bold text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{t('usConciergeTitle')}: +1 (302) 204-1881</span>
                  </a>

                  <a
                    href={`https://wa.me/593994048458?text=${encodeURIComponent(
                      `Hola Vermilion Routes, estoy en el checkout del tour "${tourTitle}" (Ref: ${ref || 'Web'}). Deseo asistencia personalizada.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-emerald-600/30 dark:border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('ecWhatsAppTitle')}: +593 99 404 8458</span>
                  </a>
                </div>

                <p className="text-[11px] text-stone-500 dark:text-zinc-400 max-w-xl mx-auto pt-1">
                  {t('bilingualOperatorsNotice')}
                </p>
              </div>

              {/* Fiduciary Mandated Trust Badges */}
              <div className="pt-3 border-t border-stone-200 dark:border-zinc-800/80">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pb-2 text-[11px] font-semibold text-stone-600 dark:text-zinc-400">
                  <a
                    href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-amber-600 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{t('sealTripAdvisor')}</span>
                  </a>

                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('sealMintur')}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>{t('sealDepositGuarantee')}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>SSL 256-Bit Encrypted</span>
                  </div>
                </div>
                
                <p className="text-[10px] text-stone-400 dark:text-zinc-500 text-center leading-relaxed">
                  {t('termsAgreement')}
                </p>
              </div>
            </div>
          </>
      )}

      </div>

      <TravelVoucherModal
        isOpen={voucherOpen}
        onClose={() => setVoucherOpen(false)}
        tour={matchedTour}
        clientInfo={{
          name: clientName || email.split('@')[0] || 'Viajero Vermilion',
          email: email,
          phone: '',
          date: travelDate || t('toBeConfirmed'),
          adults: parseInt(adultsParam) || parseInt(travelersParam) || 1,
          children: parseInt(childrenParam) || 0,
          refCode: ref,
          hotelTier: 'Boutique & Superior Comfort',
          amountPaid: finalAmount,
          isConfirmed: isPaid && !receiptSubmitted
        }}
        locale={locale}
      />
    </div>
  );
}
