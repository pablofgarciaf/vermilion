'use client';

import { trackFormSubmit } from '@/lib/analytics/trackLead';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import {
  X,
  Download,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Users,
  Mail,
  User,
  MessageCircle,
  FileText,
  Clock,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { isBotOrCrawler } from '@/utils/isBot';

interface I18nContent {
  badge: string;
  modalTitle: string;
  modalSubtitle: string;
  benefitsTitle: string;
  benefit1: string;
  benefit2: string;
  benefit3: string;
  benefit4: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  datesLabel: string;
  datesPlaceholder: string;
  travelersLabel: string;
  travelersPlaceholder: string;
  submitButton: string;
  submitting: string;
  privacyNotice: string;
  successTitle: string;
  successSubtitle: string;
  downloadAgainBtn: string;
  whatsAppButton: string;
  errorRequired: string;
  errorEmail: string;
  errorConnection: string;
  floatingPill: string;
  optMonth1: string;
  optMonth2: string;
  optMonth3: string;
  optMonth4: string;
  optMonth5: string;
  optMonth6: string;
  optTraveler1: string;
  optTraveler2: string;
  optTraveler3: string;
  optTraveler4: string;
}

const LEAD_MAGNET_I18N: Record<string, I18nContent> = {
  en: {
    badge: 'Official 2026 Insider Report • Free 24-Page PDF',
    modalTitle: 'Download the Official 2026 Galapagos Expedition Guide & Private Cabin Rates',
    modalSubtitle: 'Get immediate access to unpublished 2026 yacht cabin rates, wildlife migration calendar, and island itineraries curated by certified naturalist designers.',
    benefitsTitle: 'Inside this 24-Page Collector Edition Guide:',
    benefit1: 'Month-by-Month Wildlife Calendar (Mating, nesting & underwater visibility)',
    benefit2: 'Direct Operator Cabin Rates (Luxury catamarans & first-class expedition yachts)',
    benefit3: 'Island-by-Island Routes (Western Isabela vs. Central & Southern routes)',
    benefit4: 'Galapagos National Park Biosecurity Rules & 2026 Luggage Regulations',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Eleanor Vance',
    emailLabel: 'Email Address (where to send guide)',
    emailPlaceholder: 'e.g. eleanor@example.com',
    datesLabel: 'Estimated Travel Month',
    datesPlaceholder: 'Select approximate season',
    travelersLabel: 'Number of Travelers',
    travelersPlaceholder: 'Select party size',
    submitButton: 'Download Official 2026 Guide (Free PDF)',
    submitting: 'Generating Your Private Access...',
    privacyNotice: '🔒 Zero spam. We protect your privacy. Instant PDF download + email copy.',
    successTitle: 'Your 2026 Galapagos Guide is Ready!',
    successSubtitle: 'Your download should start automatically. We also dispatched a copy to your email. Need real-time cabin availability or flexible hold options?',
    downloadAgainBtn: 'Click to Download PDF Again',
    whatsAppButton: 'Text Our Expedition Designers on WhatsApp',
    errorRequired: 'Please complete all required fields.',
    errorEmail: 'Please enter a valid email address.',
    errorConnection: "Could not send your request. Please check your connection and try again.",
    floatingPill: '📘 Free 2026 Galapagos Guide (24p PDF)',
    optMonth1: 'January – March 2026 (Warm Waters & Snorkeling Peak)',
    optMonth2: 'April – June 2026 (Albatross Arrival & Nesting)',
    optMonth3: 'July – August 2026 (Peak Wildlife & Whales)',
    optMonth4: 'September – October 2026 (Penguins & Sea Lion Pups)',
    optMonth5: 'November – December 2026 (Festive Holiday Season)',
    optMonth6: '2027 / Flexible Future Dates',
    optTraveler1: '1 Solo Traveler',
    optTraveler2: '2 Travelers (Couple / Pair)',
    optTraveler3: '3–4 Travelers (Family / Small Group)',
    optTraveler4: '5+ Travelers (Private Yacht Charter / Group)',
  },
  es: {
    badge: 'Reporte Oficial 2026 • PDF Gratuito de 24 Páginas',
    modalTitle: 'Descarga la Guía Oficial de Expediciones a Galápagos y Tarifas de Cabinas 2026',
    modalSubtitle: 'Accede a tarifas confidenciales de cabinas en yates 2026, calendario de fauna y rutas diseñadas por naturalistas certificados.',
    benefitsTitle: 'Contenido exclusivo de la edición 2026:',
    benefit1: 'Calendario mes a mes de fauna (anidación, avistamientos y visibilidad marina)',
    benefit2: 'Tarifas netas de operador para catamaranes de lujo y yates primera clase',
    benefit3: 'Comparativa isla por isla (Isabela Occidental vs. islas centrales y del sur)',
    benefit4: 'Reglamento 2026 del Parque Nacional Galápagos y equipaje recomendado',
    nameLabel: 'Nombre Completo',
    namePlaceholder: 'Ej. Carlos Mendoza',
    emailLabel: 'Correo Electrónico (para recibir la guía)',
    emailPlaceholder: 'Ej. carlos@empresa.com',
    datesLabel: 'Mes Aproximado de Viaje',
    datesPlaceholder: 'Selecciona temporada aproximada',
    travelersLabel: 'Número de Viajeros',
    travelersPlaceholder: 'Selecciona cantidad de personas',
    submitButton: 'Descargar Guía Oficial 2026 (PDF Gratis)',
    submitting: 'Generando acceso exclusivo...',
    privacyNotice: '🔒 Cero spam. Respetamos tu privacidad. Descarga inmediata + copia al correo.',
    successTitle: '¡Tu Guía de Galápagos 2026 está lista!',
    successSubtitle: 'La descarga iniciará automáticamente. También te enviamos una copia a tu correo. ¿Deseas consultar disponibilidad de cabinas en tiempo real?',
    downloadAgainBtn: 'Descargar PDF de Nuevo',
    whatsAppButton: 'Escribir a un Diseñador por WhatsApp',
    errorRequired: 'Por favor completa todos los campos requeridos.',
    errorEmail: 'Por favor ingresa un correo electrónico válido.',
    errorConnection: "No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo.",
    floatingPill: '📘 Guía Galápagos 2026 Gratis (PDF)',
    optMonth1: 'Enero – Marzo 2026 (Aguas Cálidas & Snorkel)',
    optMonth2: 'Abril – Junio 2026 (Llegada de Albatros & Anidación)',
    optMonth3: 'Julio – Agosto 2026 (Fauna Plena & Ballenas)',
    optMonth4: 'Septiembre – Octubre 2026 (Pingüinos & Crías de Lobos)',
    optMonth5: 'Noviembre – Diciembre 2026 (Temporada Festiva)',
    optMonth6: '2027 / Fechas Flexibles',
    optTraveler1: '1 Viajero Individual',
    optTraveler2: '2 Viajeros (Pareja)',
    optTraveler3: '3–4 Viajeros (Familia / Grupo Pequeño)',
    optTraveler4: '5+ Viajeros (Charter Privado / Grupo)',
  },
  fr: {
    badge: 'Rapport Officiel 2026 • PDF Gratuit de 24 Pages',
    modalTitle: 'Téléchargez le Guide Officiel des Expéditions aux Galápagos & Tarifs Cabines 2026',
    modalSubtitle: 'Accédez aux tarifs directs des yachts 2026, au calendrier de migration animale et aux itinéraires conçus par nos guides naturalistes.',
    benefitsTitle: 'Au sommaire de ce guide exclusif :',
    benefit1: 'Calendrier faunique mois par mois (reproduction, nidification & plongée)',
    benefit2: 'Tarifs opérateurs pour catamarans de luxe et yachts de première classe',
    benefit3: 'Comparatif île par île (Isabela Ouest vs. îles centrales et du sud)',
    benefit4: 'Règles du Parc National des Galápagos 2026 & conseils bagages',
    nameLabel: 'Nom et Prénom',
    namePlaceholder: 'Ex. Jean Dupont',
    emailLabel: 'Adresse E-mail',
    emailPlaceholder: 'Ex. jean@example.com',
    datesLabel: 'Mois Estimé de Voyage',
    datesPlaceholder: 'Sélectionnez la saison',
    travelersLabel: 'Nombre de Voyageurs',
    travelersPlaceholder: 'Taille du groupe',
    submitButton: 'Télécharger le Guide Officiel 2026 (PDF Gratuit)',
    submitting: 'Génération de votre accès...',
    privacyNotice: '🔒 Zéro spam. Téléchargement immédiat + envoi par e-mail.',
    successTitle: 'Votre Guide Galápagos 2026 est prêt !',
    successSubtitle: 'Le téléchargement démarre automatiquement. Une copie vous a été envoyée. Besoin de vérifier la disponibilité d\'une cabine ?',
    downloadAgainBtn: 'Télécharger à nouveau le PDF',
    whatsAppButton: 'Contacter un Concepteur sur WhatsApp',
    errorRequired: 'Veuillez remplir tous les champs obligatoires.',
    errorEmail: 'Veuillez entrer une adresse e-mail valide.',
    errorConnection: "Nous n'avons pas pu envoyer votre demande. Vérifiez votre connexion et réessayez.",
    floatingPill: '📘 Guide Galápagos 2026 Gratuit (PDF)',
    optMonth1: 'Janvier – Mars 2026 (Eaux chaudes & Snorkeling)',
    optMonth2: 'Avril – Juin 2026 (Nidification des Albatros)',
    optMonth3: 'Juillet – Août 2026 (Faune marine & Baleines)',
    optMonth4: 'Septembre – Octobre 2026 (Manchots & Bébés otaries)',
    optMonth5: 'Novembre – Décembre 2026 (Fêtes de fin d\'année)',
    optMonth6: '2027 / Dates Flexibles',
    optTraveler1: '1 Voyageur Solo',
    optTraveler2: '2 Voyageurs (Couple)',
    optTraveler3: '3–4 Voyageurs (Famille)',
    optTraveler4: '5+ Voyageurs (Charter Privé / Groupe)',
  },
  de: {
    badge: 'Offizieller Expeditions-Report 2026 • Kostenloses 24-Seiten-PDF',
    modalTitle: 'Offiziellen Galápagos-Reiseführer & Kabinenpreise 2026 herunterladen',
    modalSubtitle: 'Erhalten Sie direkten Zugang zu unveröffentlichten Kabinenpreisen für 2026, Tierwanderungskalender und Routen von Naturführern.',
    benefitsTitle: 'In diesem 24-seitigen Sammlerleitfaden enthalten:',
    benefit1: 'Monat-für-Monat Wildtierkalender (Paarung, Nistzeit & Schnorchelsicht)',
    benefit2: 'Direkte Veranstalter-Kabinenpreise für Luxus-Katamarane & Yachten',
    benefit3: 'Insel-für-Insel Vergleich (West-Isabela vs. Zentral- & Südinseln)',
    benefit4: 'Offizielle Nationalpark-Regularien 2026 & Packliste',
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'z.B. Maximilian Weber',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'z.B. maximilian@example.de',
    datesLabel: 'Geschätzter Reisemonat',
    datesPlaceholder: 'Reisezeitraum wählen',
    travelersLabel: 'Anzahl der Reisenden',
    travelersPlaceholder: 'Reisegruppe wählen',
    submitButton: 'Offiziellen Leitfaden 2026 herunterladen (PDF)',
    submitting: 'Zugang wird vorbereitet...',
    privacyNotice: '🔒 Kein Spam. Sofortiger Download + E-Mail-Kopie.',
    successTitle: 'Ihr Galápagos-Leitfaden 2026 ist bereit!',
    successSubtitle: 'Der Download startet automatisch. Eine Kopie wurde per E-Mail gesendet. Möchten Sie freie Kabinen anfragen?',
    downloadAgainBtn: 'PDF erneut herunterladen',
    whatsAppButton: 'Per WhatsApp mit Reise-Designer sprechen',
    errorRequired: 'Bitte füllen Sie alle erforderlichen Felder aus.',
    errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errorConnection: "Ihre Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
    floatingPill: '📘 Galápagos-Guide 2026 (24p PDF)',
    optMonth1: 'Januar – März 2026 (Warme Gewässer & Schnorcheln)',
    optMonth2: 'April – Juni 2026 (Albatros-Ankunft & Brutzeit)',
    optMonth3: 'Juli – August 2026 (Wale & Wildtierhöhepunkt)',
    optMonth4: 'September – Oktober 2026 (Pinguine & Seelöwenjunge)',
    optMonth5: 'November – Dezember 2026 (Festtage & Feiertage)',
    optMonth6: '2027 / Flexible Daten',
    optTraveler1: '1 Alleinreisender',
    optTraveler2: '2 Reisende (Paar)',
    optTraveler3: '3–4 Reisende (Familie / Kleine Gruppe)',
    optTraveler4: '5+ Reisende (Privatcharter / Gruppe)',
  },
  it: {
    badge: 'Report Ufficiale 2026 • PDF Gratuito di 24 Pagine',
    modalTitle: 'Scarica la Guida Ufficiale alle Galapagos & Tariffe Cabine 2026',
    modalSubtitle: 'Accedi alle tariffe riservate delle cabine yacht 2026, al calendario della fauna e agli itinerari dei biologi naturalisti.',
    benefitsTitle: 'Incluso nella guida di 24 pagine:',
    benefit1: 'Calendario mensile della fauna selvatica (nidificazione, avvistamenti e immersioni)',
    benefit2: 'Tariffe dirette operatore per catamarani luxury e yacht prima classe',
    benefit3: 'Confronto isola per isola (Isabela Ovest vs. isole centrali e meridionali)',
    benefit4: 'Regolamento Parco Nazionale Galapagos 2026 & lista bagagli',
    nameLabel: 'Nome e Cognome',
    namePlaceholder: 'Es. Marco Rossi',
    emailLabel: 'Indirizzo E-mail',
    emailPlaceholder: 'Es. marco@example.it',
    datesLabel: 'Mese Indicativo del Viaggio',
    datesPlaceholder: 'Seleziona periodo',
    travelersLabel: 'Numero di Viaggiatori',
    travelersPlaceholder: 'Seleziona numero persone',
    submitButton: 'Scarica la Guida Ufficiale 2026 (PDF Gratis)',
    submitting: 'Preparazione del documento...',
    privacyNotice: '🔒 Zero spam. Download istantaneo + invio via e-mail.',
    successTitle: 'La tua Guida Galapagos 2026 è pronta!',
    successSubtitle: 'Il download partirà automaticamente. Abbiamo inviato anche una copia alla tua email. Vuoi verificare le cabine disponibili?',
    downloadAgainBtn: 'Scarica di nuovo il PDF',
    whatsAppButton: 'Scrivi su WhatsApp ai nostri Expedition Designer',
    errorRequired: 'Compila tutti i campi richiesti.',
    errorEmail: 'Inserisci un indirizzo email valido.',
    errorConnection: "Non siamo riusciti a inviare la richiesta. Controlla la connessione e riprova.",
    floatingPill: '📘 Guida Galapagos 2026 Gratis (PDF)',
    optMonth1: 'Gennaio – Marzo 2026 (Acque calde & Snorkeling)',
    optMonth2: 'Aprile – Giugno 2026 (Arrivo albatros & Nidificazione)',
    optMonth3: 'Luglio – Agosto 2026 (Balene & Massima fauna)',
    optMonth4: 'Settembre – Ottobre 2026 (Pinguini & Cuccioli di leone marino)',
    optMonth5: 'Novembre – Dicembre 2026 (Vacanze di fine anno)',
    optMonth6: '2027 / Date Flessibili',
    optTraveler1: '1 Viaggiatore Singolo',
    optTraveler2: '2 Viaggiatori (Coppia)',
    optTraveler3: '3–4 Viaggiatori (Famiglia)',
    optTraveler4: '5+ Viaggiatori (Charter Privato)',
  },
  pt: {
    badge: 'Relatório Oficial 2026 • PDF Gratuito de 24 Páginas',
    modalTitle: 'Baixe o Guia Oficial de Galápagos & Tarifas de Cabines 2026',
    modalSubtitle: 'Acesse tarifas exclusivas de iates 2026, calendário de vida selvagem e rotas planejadas por naturalistas certificados.',
    benefitsTitle: 'Neste guia exclusivo de 24 páginas:',
    benefit1: 'Calendário mês a mês de vida silvestre (acasalamento, nidificação e snorkel)',
    benefit2: 'Tarifas diretas de operador para catamarãs de luxo e iates de primeira classe',
    benefit3: 'Comparativo ilha a ilha (Isabela Ocidental vs. ilhas centrais e do sul)',
    benefit4: 'Regras de biossegurança do Parque Nacional e bagagem recomendada',
    nameLabel: 'Nome Completo',
    namePlaceholder: 'Ex. Rodrigo Silva',
    emailLabel: 'E-mail para Recebimento',
    emailPlaceholder: 'Ex. rodrigo@example.com',
    datesLabel: 'Mês Estimado da Viagem',
    datesPlaceholder: 'Selecione o período',
    travelersLabel: 'Número de Viajantes',
    travelersPlaceholder: 'Selecione a quantidade',
    submitButton: 'Baixar Guia Oficial 2026 (PDF Grátis)',
    submitting: 'Gerando acesso exclusivo...',
    privacyNotice: '🔒 Zero spam. Download imediato + envio por e-mail.',
    successTitle: 'Seu Guia de Galápagos 2026 está pronto!',
    successSubtitle: 'O download iniciará automaticamente. Enviamos também uma cópia para seu e-mail. Deseja verificar a disponibilidade de cabines?',
    downloadAgainBtn: 'Baixar PDF Novamente',
    whatsAppButton: 'Falar com Designer de Expedição no WhatsApp',
    errorRequired: 'Por favor, preencha todos os campos obrigatórios.',
    errorEmail: 'Por favor, insira um e-mail válido.',
    errorConnection: "Não foi possível enviar o seu pedido. Verifique a ligação e tente novamente.",
    floatingPill: '📘 Guia Galápagos 2026 Grátis (PDF)',
    optMonth1: 'Janeiro – Março 2026 (Águas quentes & Snorkel)',
    optMonth2: 'Abril – Junho 2026 (Chegada dos Albatrozes)',
    optMonth3: 'Julho – Agosto 2026 (Baleias & Pico de Fauna)',
    optMonth4: 'Setembro – Outubro 2026 (Pinguins & Filhotes de Lobo)',
    optMonth5: 'Novembro – Dezembro 2026 (Festas de Fim de Ano)',
    optMonth6: '2027 / Datas Flexíveis',
    optTraveler1: '1 Viajante Solo',
    optTraveler2: '2 Viajantes (Casal)',
    optTraveler3: '3–4 Viajantes (Família / Grupo Pequeno)',
    optTraveler4: '5+ Viajantes (Charter Privado / Grupo)',
  },
  ja: {
    badge: '公式2026年レポート • 無料24ページPDFガイド',
    modalTitle: '2026年ガラパゴス公式遠征ガイド＆プライベート客室料金表をダウンロード',
    modalSubtitle: '非公開の2026年ヨット客室料金、野生生物の季節カレンダー、専任ナチュラリスト監修の島巡り航路をご案内します。',
    benefitsTitle: '本ガイド（24ページ）の主な内容：',
    benefit1: '月別野生動物カレンダー（求愛行動、営巣、シュノーケリング透明度）',
    benefit2: '高級カタマラン＆ファーストクラス遠征ヨットの直営客室料金',
    benefit3: '島ごとのルート比較（西イサベラ島 vs 中央・南部諸島）',
    benefit4: 'ガラパゴス国立公園の2026年最新規則と持ち物チェックリスト',
    nameLabel: 'お名前（フルネーム）',
    namePlaceholder: '例: 田中 太郎',
    emailLabel: 'メールアドレス（送信用）',
    emailPlaceholder: '例: tanaka@example.jp',
    datesLabel: 'ご旅行の予定時期',
    datesPlaceholder: '希望のシーズンを選択',
    travelersLabel: 'ご参加人数',
    travelersPlaceholder: '人数を選択',
    submitButton: '公式2026年ガイドを無料ダウンロード (PDF)',
    submitting: 'ダウンロードを準備中...',
    privacyNotice: '🔒 スパム送信は一切いたしません。即時ダウンロード＋メール控え。',
    successTitle: '2026年ガラパゴスガイドの準備が完了しました！',
    successSubtitle: 'ダウンロードが自動的に始まります。メールにも控えをお送りしました。最新の客室空き状況を相談しますか？',
    downloadAgainBtn: 'PDFを再ダウンロードする',
    whatsAppButton: '遠征デザイナーにWhatsAppで相談する',
    errorRequired: 'すべての必須項目を入力してください。',
    errorEmail: '有効なメールアドレスを入力してください。',
    errorConnection: "リクエストを送信できませんでした。接続を確認して、もう一度お試しください。",
    floatingPill: '📘 ガラパゴス公式ガイド 2026 (PDF)',
    optMonth1: '2026年 1月～3月（水温が高くシュノーケリングに最適）',
    optMonth2: '2026年 4月～6月（アホウドリの飛来・求愛営巣期）',
    optMonth3: '2026年 7月～8月（クジラや豊富な海洋生物のピーク）',
    optMonth4: '2026年 9月～10月（ペンギンやアシカの赤ちゃんの活発期）',
    optMonth5: '2026年 11月～12月（年末年始ホリデーシーズン）',
    optMonth6: '2027年以降 / 日程未定',
    optTraveler1: '1名様（一人旅）',
    optTraveler2: '2名様（カップル・ご夫婦）',
    optTraveler3: '3～4名様（ご家族・グループ）',
    optTraveler4: '5名様以上（プライベート貸切・団体）',
  },
  zh: {
    badge: '2026年度官方内幕报告 • 免费24页高精PDF',
    modalTitle: '下载2026加拉帕戈斯官方探险指南与私享游艇舱位价目表',
    modalSubtitle: '即刻获取2026未公开发布的游艇包舱底价、野生动物全年月度观测日历以及资深自然学家定制航线。',
    benefitsTitle: '24页精编指南核心内容：',
    benefit1: '全年月度野生动物日历（繁育求偶、筑巢孵化及浮潜能见度）',
    benefit2: '顶级奢华双体船与头等舱探险游艇一手运营商舱位直售价',
    benefit3: '各岛屿航线全景对比（西部伊莎贝拉 vs 中部与南部群岛）',
    benefit4: '2026加拉帕戈斯国家公园最新生态检疫规则与打包装备清单',
    nameLabel: '您的姓名',
    namePlaceholder: '例: 张伟',
    emailLabel: '电子邮箱（用于接收指南）',
    emailPlaceholder: '例: zhangwei@example.com',
    datesLabel: '预计出行月份',
    datesPlaceholder: '请选择预计出行季节',
    travelersLabel: '出行人数',
    travelersPlaceholder: '请选择出行人数',
    submitButton: '免费下载2026官方探险指南 (PDF)',
    submitting: '正在生成您的专属访问权限...',
    privacyNotice: '🔒 严守隐私，拒绝垃圾邮件。即刻极速下载 + 邮箱备用备份。',
    successTitle: '您的2026加拉帕戈斯探险指南已生成！',
    successSubtitle: '下载即将自动开始，我们已同步向您的邮箱发送了一份副本。如需实时查询游艇舱位余位或申请留位：',
    downloadAgainBtn: '点击重新下载PDF',
    whatsAppButton: '通过 WhatsApp 咨询探险定制专家',
    errorRequired: '请完整填写所有必填项。',
    errorEmail: '请输入有效的电子邮箱地址。',
    errorConnection: "无法发送您的请求，请检查网络连接后重试。",
    floatingPill: '📘 免费获取2026加拉帕戈斯指南 (24p PDF)',
    optMonth1: '2026年 1月–3月（水温温暖，浮潜极佳）',
    optMonth2: '2026年 4月–6月（信天翁求偶与筑巢期）',
    optMonth3: '2026年 7月–8月（鲸鱼洄游，野生生灵巅峰）',
    optMonth4: '2026年 9月–10月（企鹅与海狮幼崽活跃期）',
    optMonth5: '2026年 11月–12月（岁末假日旺季航次）',
    optMonth6: '2027年 / 灵活待定',
    optTraveler1: '1位 独自旅行',
    optTraveler2: '2位 夫妻/同行情侣',
    optTraveler3: '3–4位 家庭/小包团',
    optTraveler4: '5位以上 私人包船/高端定制团',
  },
};

export function GalapagosLeadMagnetModal() {
  if (isBotOrCrawler()) return null;
  return <GalapagosLeadMagnetModalContent />;
}

function GalapagosLeadMagnetModalContent() {
  const locale = useLocale();
  const t = LEAD_MAGNET_I18N[locale] || LEAD_MAGNET_I18N.en;

  const [isOpen, setIsOpen] = useState(false);
  const [isFloatingPillVisible, setIsFloatingPillVisible] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [guestsCount, setGuestsCount] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const pdfDownloadUrl = '/guides/galapagos-expedition-guide-2026.pdf';

  // Open via custom event (triggerable by buttons across the site)
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-lead-magnet', handleOpen);
    return () => {
      window.removeEventListener('open-lead-magnet', handleOpen);
    };
  }, []);

  // Smart delayed trigger: pops up once per session after 30 seconds or scroll depth
  useEffect(() => {
    try {
      const alreadySeen = sessionStorage.getItem('vermilion_guide_modal_dismissed');
      if (alreadySeen) return;

      const timer = setTimeout(() => {
        const dismissedNow = sessionStorage.getItem('vermilion_guide_modal_dismissed');
        if (!dismissedNow) {
          setIsOpen(true);
        }
      }, 35000);

      const handleScroll = () => {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if (scrollPercent > 0.45) {
          const dismissedNow = sessionStorage.getItem('vermilion_guide_modal_dismissed');
          if (!dismissedNow) {
            setIsOpen(true);
            window.removeEventListener('scroll', handleScroll);
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch {
      // safe fallback in case sessionStorage is restricted
    }
  }, []);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('vermilion_guide_modal_dismissed', 'true');
    } catch {}
  };

  const triggerPdfDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = pdfDownloadUrl;
      link.download = 'Vermilion-Routes-Galapagos-Expedition-Guide-2026.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      window.open(pdfDownloadUrl, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (honeypot) {
      // Bot trapped: pretend success
      setStatus('success');
      return;
    }

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage(t.errorRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim() || !emailRegex.test(customerEmail.trim())) {
      setErrorMessage(t.errorEmail);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          travelDates: travelDates || 'Flexible 2026-2027',
          guestsCount: guestsCount || '2 Travelers',
          destination: 'Galapagos Islands',
          tourId: 'lead-magnet-galapagos-guide-2026',
          tourTitle: 'Official 2026 Galapagos Expedition Guide & Private Cabin Rates (Free 24-page PDF)',
          message: `Lead Magnet Request: Official 2026 Galapagos Expedition Guide & Private Cabin Rates (Free 24-page PDF). Estimated Travel Month: ${travelDates || 'Flexible'}, Travelers: ${guestsCount || '2'}.`,
          locale,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        trackFormSubmit({ method: 'lead_magnet', placement: 'galapagos_guide_modal', item: 'galapagos-guide-2026' });
        try {
          sessionStorage.setItem('vermilion_guide_modal_dismissed', 'true');
        } catch {}
        // Trigger download automatically after brief delay
        setTimeout(() => {
          triggerPdfDownload();
        }, 800);
      } else {
        setErrorMessage(data.error || data.message || t.errorRequired);
        setStatus('error');
      }
    } catch (err: any) {
      // Sin confirmación del servidor no hay lead: se avisa al usuario en vez de mostrar éxito falso.
      console.error('Lead magnet submission failed:', err);
      setErrorMessage(t.errorConnection);
      setStatus('error');
    }
  };

  return (
    <>
      {/* ── PERSISTENT DISCREET FLOATING PILL (Bottom Left) ──────────────── */}
      {isFloatingPillVisible && !isOpen && (
        <aside
          aria-label="Free Galapagos Guide Teaser"
          className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 group animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-950/90 hover:bg-zinc-900 text-amber-200 hover:text-amber-100 border border-amber-500/40 hover:border-amber-400 shadow-xl shadow-black/40 backdrop-blur-md text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.floatingPill}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          </button>
          <button
            onClick={() => setIsFloatingPillVisible(false)}
            className="w-7 h-7 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 flex items-center justify-center text-[10px] transition-colors cursor-pointer"
            aria-label="Dismiss guide button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* ── MODAL OVERLAY & CONTAINER ────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-magnet-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-zinc-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto text-white grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-400 hover:text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── LEFT COLUMN: EDITORIAL 3D MAGAZINE VISUAL & HIGHLIGHTS (5 cols) ── */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-950/60 via-zinc-950 to-emerald-950/60 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800/80 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -top-16 -left-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t.badge}</span>
                </div>

                {/* Magazine 3D Cover Mockup Card */}
                <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/30 p-5 shadow-2xl relative group overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                    <span className="font-mono text-[10px] text-amber-400 tracking-widest uppercase font-bold">
                      VERMILION ROUTES • CONFIDENTIAL
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      2026 EDITION
                    </span>
                  </div>

                  <div className="space-y-1 my-2">
                    <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                      INSIDER EXPEDITION DOSSIER
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 tracking-tight leading-tight">
                      GALAPAGOS
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">
                      Private Yacht Rates & Seasonal Migration Calendar
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> 24 Pages • High-Res
                    </span>
                    <span className="text-emerald-400 font-bold">100% Free</span>
                  </div>
                </div>

                {/* 4 Core Value Bullets */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
                    {t.benefitsTitle}
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t.benefit1}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t.benefit2}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t.benefit3}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t.benefit4}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Trust Badge at bottom of left column */}
              <div className="relative z-10 pt-4 mt-6 border-t border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ministry of Tourism Ecuador Certified Operator</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: HIGH CONVERSION CAPTURE FORM (7 cols) ───────── */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              {status === 'success' ? (
                /* SUCCESS STATE */
                <div className="my-auto py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      {t.successTitle}
                    </h3>
                    <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                      {t.successSubtitle}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={triggerPdfDownload}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.downloadAgainBtn}</span>
                    </button>

                    <a
                      href="https://wa.me/593994048458?text=Hello%20Vermilion%20Routes!%20I%20just%20downloaded%20the%202026%20Galapagos%20Expedition%20Guide.%20Could%20you%20share%20current%20cabin%20availability%20and%20rates%3F"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.whatsAppButton}</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* LEAD FORM */
                <div className="space-y-6">
                  {/* Form Header */}
                  <div className="space-y-2">
                    <h2
                      id="lead-magnet-title"
                      className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug"
                    >
                      {t.modalTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {t.modalSubtitle}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field (hidden from humans, traps automated scrapers) */}
                    <input
                      type="text"
                      name="_hp_trap"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Field 1: Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="lm-name" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.nameLabel} *</span>
                      </label>
                      <input
                        id="lm-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-zinc-500 text-xs sm:text-sm transition-colors outline-none"
                      />
                    </div>

                    {/* Field 2: Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="lm-email" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.emailLabel} *</span>
                      </label>
                      <input
                        id="lm-email"
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-zinc-500 text-xs sm:text-sm transition-colors outline-none"
                      />
                    </div>

                    {/* Grid: Travel Month + Number of Travelers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Field 3: Travel Month */}
                      <div className="space-y-1.5">
                        <label htmlFor="lm-month" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t.datesLabel}</span>
                        </label>
                        <select
                          id="lm-month"
                          value={travelDates}
                          onChange={(e) => setTravelDates(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-xs sm:text-sm transition-colors outline-none cursor-pointer"
                        >
                          <option value="">{t.datesPlaceholder}</option>
                          <option value="January – March 2026">{t.optMonth1}</option>
                          <option value="April – June 2026">{t.optMonth2}</option>
                          <option value="July – August 2026">{t.optMonth3}</option>
                          <option value="September – October 2026">{t.optMonth4}</option>
                          <option value="November – December 2026">{t.optMonth5}</option>
                          <option value="2027 / Flexible Dates">{t.optMonth6}</option>
                        </select>
                      </div>

                      {/* Field 4: Travelers Count */}
                      <div className="space-y-1.5">
                        <label htmlFor="lm-travelers" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t.travelersLabel}</span>
                        </label>
                        <select
                          id="lm-travelers"
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-xs sm:text-sm transition-colors outline-none cursor-pointer"
                        >
                          <option value="">{t.travelersPlaceholder}</option>
                          <option value="1 Solo Traveler">{t.optTraveler1}</option>
                          <option value="2 Travelers (Couple / Pair)">{t.optTraveler2}</option>
                          <option value="3–4 Travelers (Family / Small Group)">{t.optTraveler3}</option>
                          <option value="5+ Travelers (Private Yacht Charter / Group)">{t.optTraveler4}</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40 disabled:opacity-60"
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                            <span>{t.submitting}</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 stroke-[2.5]" />
                            <span>{t.submitButton}</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-500 text-center leading-normal">
                      {t.privacyNotice}
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
