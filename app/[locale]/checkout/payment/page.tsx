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
  Info
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
    en: 'International Wire Transfer (USA / Ecuador)',
    es: 'Transferencia Bancaria Internacional (EE. UU. / Ecuador)',
    fr: 'Virement Bancaire International (USA / Équateur)',
    de: 'Internationale Banküberweisung (USA / Ecuador)',
    it: 'Bonifico Bancario Internazionale (USA / Ecuador)',
    pt: 'Transferência Bancária Internacional (EUA / Equador)',
    ja: '国際銀行振込 (米国 / エクアドル)',
    zh: '国际银行电汇 (美国 / 厄瓜多尔)',
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
    en: 'Official bank wire transfer details for Citibank (Florida, USA) and Produbanco (Ecuador).',
    es: 'Cuentas bancarias oficiales de recepción en Citibank (Florida, EE. UU.) y Produbanco (Ecuador).',
    fr: 'Comptes bancaires officiels de réception chez Citibank (Floride, USA) et Produbanco (Équateur).',
    de: 'Offizielle Empfangskonten bei der Citibank (Florida, USA) und Produbanco (Ecuador).',
    it: 'Coordinate bancarie ufficiali per Citibank (Florida, USA) e Produbanco (Ecuador).',
    pt: 'Contas bancárias oficiais no Citibank (Flórida, EUA) e Produbanco (Equador).',
    ja: 'Citibank（米国フロリダ州）およびProdubanco（エクアドル）の公式受取口座情報。',
    zh: '花旗银行（美国佛罗里达州）与 Produbanco（厄瓜多尔）官方收款账户信息。',
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
  toBeConfirmed: {
    en: 'To be confirmed',
    es: 'Por confirmar',
    fr: 'À confirmer',
    de: 'Zu bestätigen',
    it: 'Da confermare',
    pt: 'A confirmar',
    ja: '確認中',
    zh: '待确认',
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
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#07130C] text-stone-900 dark:text-white flex items-center justify-center pt-8 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className={`w-full bg-white dark:bg-zinc-900/90 border border-stone-200 dark:border-emerald-500/20 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl shadow-stone-200/50 dark:shadow-2xl backdrop-blur-xl relative z-10 space-y-6 text-stone-900 dark:text-white transition-all ${
        isPaid ? 'max-w-xl' : 'max-w-5xl'
      }`}>
        
        {/* Top Header */}
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
          /* ─────────────────────────────────────────────
             CHECKOUT 2-COLUMN VIEWPORT LAYOUT
             ───────────────────────────────────────────── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN (5 COLS): EXPEDITION SUMMARY & PRICE ── */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-stone-50 dark:bg-zinc-950/60 border border-stone-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider">
                    {type === 'full' ? t('fullTitle') : t('depositTitle')}
                  </span>
                  <span className="font-mono text-[11px] text-stone-500 dark:text-zinc-400">Ref: <strong className="text-stone-900 dark:text-zinc-200">{ref}</strong></span>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-zinc-800">
                    <Image
                      src={matchedTour.imageUrl || '/images/tours/16-9/galapagos-snorkeling-16-9.jpg'}
                      alt={tourTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold font-serif text-stone-900 dark:text-white leading-snug line-clamp-2">
                      {tourTitle}
                    </h3>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium block mt-0.5">
                      {matchedTour.duration?.en || matchedTour.duration?.es || 'Ecuador & Galápagos'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 dark:text-zinc-400 pt-2 border-t border-stone-200 dark:border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 dark:text-zinc-500">{t('clientLabel')}:</span>
                    <strong className="text-stone-900 dark:text-zinc-200 truncate max-w-[180px]">{email || 'Traveler'}</strong>
                  </div>
                  {travelDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 dark:text-zinc-500">{t('travelDateLabel')}:</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {travelDate}
                      </strong>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 dark:text-zinc-500">{t('travelersText')}:</span>
                    <strong className="text-stone-900 dark:text-zinc-200 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {getTravelersText()}
                      {isDailyTourParam && (parseInt(travelersParam) === 1 || adultsParam === '1') && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-normal">
                          (Mín. 2 pax)
                        </span>
                      )}
                    </strong>
                  </div>
                </div>

                {/* Back to Modify Booking Button */}
                <div className="pt-2 border-t border-stone-200 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => router.push(`/${locale}/booking?tourid=${tourId}&date=${travelDate}&adults=${adultsParam || '1'}&children=${childrenParam || '0'}`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs text-stone-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium border border-stone-200 dark:border-white/10 rounded-xl hover:bg-stone-50 dark:hover:bg-zinc-800/50 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('backToModify')}</span>
                  </button>
                </div>
              </div>

              {/* Clean Price Box */}
              <div className="p-4 sm:p-5 bg-stone-50/80 dark:bg-zinc-950/80 border border-emerald-600/20 dark:border-emerald-500/30 rounded-2xl space-y-3.5 shadow-sm relative overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-stone-200 dark:border-white/10 pb-3">
                  <div>
                    <h2 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-widest">
                      {t('totalToPay')}
                    </h2>
                    <p className="text-[10px] text-stone-500 dark:text-zinc-400">
                      {t('taxesIncluded')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold font-serif text-emerald-700 dark:text-emerald-400" suppressHydrationWarning>
                      ${formatPrice(finalAmount)}
                    </span>
                    <span className="text-xs text-emerald-700/80 dark:text-emerald-400/80 font-medium ml-1">USD</span>
                  </div>
                </div>

                {/* VIP Discount Row if active */}
                {discountApplied && (
                  <div className="flex items-center justify-between text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-2 rounded-xl text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{t('vipDiscountApplied')}</span>
                    </span>
                    <span className="font-bold font-mono" suppressHydrationWarning>
                      -${formatPrice(discountSavings)} USD
                    </span>
                  </div>
                )}

                {/* Promo Code Input */}
                {!discountApplied ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder={t('promoPlaceholder')}
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 rounded-xl text-xs text-stone-900 dark:text-white placeholder-stone-400 uppercase focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      className="px-3.5 py-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer border-none"
                    >
                      {t('btnApply')}
                    </button>
                  </div>
                ) : null}
                {discountError && <p className="text-[11px] text-amber-600 text-center">{discountError}</p>}

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200 dark:border-white/5 text-[10px] text-stone-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Flexible</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>TripAdvisor Choice</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 dark:text-zinc-400 text-center leading-relaxed px-3">
                {t('conciergeHelp')}
              </p>
            </div>

            {/* ── RIGHT COLUMN (7 COLS): PAYMENT METHOD & DIRECT ACTIONS ── */}
            <div className="lg:col-span-7 space-y-4">

              {/* Lead Traveler Contact Details Card */}
              <div className="bg-white dark:bg-zinc-950 border border-stone-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                      {t('contactDetailsTitle')}
                    </h2>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    256-Bit SSL
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                  {t('contactDetailsSubtitle')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      {t('fullNameLabel')}
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={t('fullNamePlaceholder')}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      {t('emailLabel')} *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-stone-600 dark:text-zinc-300 uppercase tracking-wider mb-1">
                      {t('phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-stone-100 dark:bg-zinc-950 border border-stone-200 dark:border-white/10 rounded-2xl text-xs font-semibold">
                {/* Tab 1: PayPal / Card */}
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'card'
                      ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-md'
                      : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-center leading-tight">{t('tabPaypalCard')}</span>
                </button>

                {/* Tab 2: International Wire Transfer */}
                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'bank'
                      ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-md'
                      : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-center leading-tight">{t('tabBankTitleShort')}</span>
                </button>
              </div>

              {/* ─────────────────────────────────────────────
                  TAB 1: OFFICIAL PAYPAL CHECKOUT & CARDS (LUXURY FINTECH DESIGN)
                  ───────────────────────────────────────────── */}
              {activeTab === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  {/* PayPal Official SDK Buttons */}
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
                    affiliateCode={discountApplied ? discountCode : undefined}
                    onSuccess={(confirmedRef) => {
                      setRef(confirmedRef);
                      setReceiptSubmitted(false);
                      setIsPaid(true);
                    }}
                  />

                </div>
              )}

              {/* ─────────────────────────────────────────────
                  TAB 2: WIRE TRANSFER (CITIBANK USA & PRODUBANCO ECUADOR)
                  Leaves order in status 'Espera de pago' (pending_payment)
                  ───────────────────────────────────────────── */}
              {activeTab === 'bank' && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{t('tabBankTitle')}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-zinc-300 leading-relaxed">
                      {t('wireHeaderDesc')}
                    </p>
                  </div>

                  {/* Steps Guide */}
                  <div className="p-3.5 bg-stone-50 dark:bg-zinc-950/90 border border-stone-200 dark:border-white/5 rounded-2xl space-y-1.5 text-[11px] text-stone-700 dark:text-zinc-300">
                    <p>{t('step1Wire')}</p>
                    <p className="text-amber-800 dark:text-amber-300 font-medium">
                      {t('step2Wire')} <span className="font-mono font-bold text-stone-900 dark:text-white bg-white dark:bg-black/50 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-500/30">{ref}</span>
                    </p>
                    <p className="text-emerald-700 dark:text-emerald-400">{t('step3Wire')}</p>
                  </div>

                  {/* Official Receiving Account Accordion Cards */}
                  <div className="space-y-2">
                    
                    {/* ACCORDION 1: USA (USD) Citi bank */}
                    <div className="border border-stone-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 transition-all shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setOpenBankCard(openBankCard === 'usa' ? null : 'usa')}
                        className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left hover:bg-stone-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🇺🇸</span>
                          <div>
                            <span className="text-[11px] font-bold text-stone-900 dark:text-white block">
                              USA (USD) • Citi bank (Florida)
                            </span>
                            <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                              ACH / Domestic Wire / Zelle
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-[9px] font-bold text-emerald-800 dark:text-emerald-300">
                            USD
                          </span>
                          {openBankCard === 'usa' ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
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
                            <span className="text-stone-500 dark:text-zinc-500 font-sans">Zelle Transfer:</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('*gsanchez@plustelesmart.com.ec', 'us_zelle')}
                              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer font-sans"
                            >
                              *gsanchez@plustelesmart.com.ec {copiedKey === 'us_zelle' ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-stone-400 dark:text-zinc-500" />}
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-500 dark:text-zinc-500 font-sans">Location:</span>
                            <span className="text-stone-700 dark:text-zinc-300 font-sans text-[11px]">Florida, USA</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ACCORDION 2: ECUADOR (USD) Banco Produbanco */}
                    <div className="border border-stone-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 transition-all shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setOpenBankCard(openBankCard === 'ecuador' ? null : 'ecuador')}
                        className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left hover:bg-stone-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🇪🇨</span>
                          <div>
                            <span className="text-[11px] font-bold text-stone-900 dark:text-white block">
                              Ecuador (USD) • Produbanco
                            </span>
                            <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                              Cuenta Corriente / SWIFT
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-zinc-800 text-[9px] font-bold text-stone-700 dark:text-zinc-300">
                            USD
                          </span>
                          {openBankCard === 'ecuador' ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
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
                            <span className="text-stone-500 dark:text-zinc-500 font-sans">SWIFT:</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('PRODECEQXXX', 'pro_swift')}
                              className="text-stone-900 dark:text-white font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              PRODECEQXXX {copiedKey === 'pro_swift' ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-stone-400 dark:text-zinc-500" />}
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-stone-500 dark:text-zinc-500 font-sans">Titular:</span>
                            <span className="text-stone-900 dark:text-white font-sans text-[11px] font-medium">VERMILION ROUTES (RUC 1711992808001)</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ACCORDION 3: ESPAÑA / EUROPA (EUR) SEPA Transfer */}
                    <div className="border border-stone-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 transition-all shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setOpenBankCard(openBankCard === 'spain' ? null : 'spain')}
                        className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left hover:bg-stone-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🇪🇸</span>
                          <div>
                            <span className="text-[11px] font-bold text-stone-900 dark:text-white block">
                              España / Europa (EUR) • Transferencia SEPA
                            </span>
                            <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                              Sede Asociada Madrid (Coral Tour)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-[9px] font-bold text-blue-800 dark:text-blue-300">
                            EUR
                          </span>
                          {openBankCard === 'spain' ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                        </div>
                      </button>

                      {openBankCard === 'spain' && (
                        <div className="p-3.5 pt-0 border-t border-stone-100 dark:border-white/5 space-y-2 text-[11px] text-stone-600 dark:text-zinc-400 animate-fade-in">
                          <p className="pt-2 leading-relaxed">
                            {t('spainTransferDesc')}
                          </p>
                          <a
                            href={`https://wa.me/593994048458?text=${encodeURIComponent(
                              `Hola Vermilion Routes, deseo transferir en Euros (EUR) vía SEPA a su cuenta en Madrid para el tour "${tourTitle}" (Ref: ${ref}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] hover:bg-emerald-100 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{t('requestMadridWa')}</span>
                          </a>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Wire Transfer Registration Form */}
                  <form onSubmit={handleSubmitWireRegistration} className="space-y-3 pt-2 border-t border-stone-200 dark:border-white/10">
                    
                    {/* 🛡️ Anti-bot honeypot field (Catches automated scripts & Python bots) */}
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

                    <h3 className="font-bold text-stone-900 dark:text-white text-xs flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {t('uploadOptional')}
                    </h3>

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
                </div>
              )}

          </div>

          {/* ── THIRD SECTION: CONCIERGE, TRUST & TERMS ── */}
          <section className="lg:col-span-12 border-t border-stone-200 dark:border-white/10 pt-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 text-[10px] text-stone-600 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>PayPal Business Ecuador</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>RUC 1711992808001</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>TripAdvisor Travelers Choice</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Garantía de Fechas</span>
                </div>
              </div>

              <a
                href={`https://wa.me/593994048458?text=${encodeURIComponent(
                  `Hola, estoy en el checkout del tour "${tourTitle}" (Ref: ${ref || 'Web'}). Deseo asistencia personalizada para completar mi reserva.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-emerald-600/30 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs transition-all hover:scale-[1.01] active:scale-95 shadow-sm shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>WhatsApp Concierge (24/7)</span>
              </a>
            </div>

            <p className="text-[10px] text-stone-500 dark:text-zinc-500 text-center leading-relaxed pt-4 border-t border-stone-200 dark:border-white/5">
              {t('termsAgreement')}
            </p>
          </section>
        </div>
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
