'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ShieldCheck,
  Award,
  Sparkles,
  Globe
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    topDestinations: "Top Destinations", galapagos: "Galapagos Islands", ecuador: "Mainland Ecuador", fullDay: "Full Day Excursions", amazon: "Ecuadorian Amazon", volcanoes: "Avenue of Volcanoes",
    company: "Company", about: "About Us", packages: "Tour Packages", contact: "Contact Specialist",
    updates: "Get Travel Updates", subscribeText: "Subscribe to receive seasonal Galapagos premium cruise promotions and curated travel guides.", emailPlaceholder: "Your email address", subscribeBtn: "Subscribe",
    licensed: "Fully Licensed & Certified Tour Operator in Ecuador & Galapagos", support: "24/7 Dedicated Trip Specialist Support En Route", secure: "Secure Bookings & 100% Satisfaction Guarantee",
    privacy: "Privacy Policy", terms: "Terms of Service",
    footerDescription: "Premier boutique tour operator specializing in custom-crafted premium travel itineraries across Ecuador and Galapagos's most iconic wonders.",
    paymentVerified: "Verified & Secure Payment Methods",
    paymentHeading: "Secure Checkout & Encrypted Payments",
    paymentDesc: "We accept secure encrypted card payments via Stripe, official Citibank (USA) wire transfers, Zelle payments, and Banco Produbanco. Official guarantee and certified travel vouchers.",
    badgeStripe: "Stripe Payments",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "SSL 256-Bit Encrypted",
    cancellationPolicy: "Cancellation & Refund Policy",
    officeReservations: "Office / Reservations:",
    hqEcuador: "Ecuador Headquarters (HQ)",
    officeSpain: "Spain Branch (Coral Tour)",
    internationalLanguages: "International / Languages:",
    featuredExperiences: "Featured Experiences",
    expCouples: "Galapagos Anniversary Trips",
    expFamily: "Family-Friendly Ecuador",
    expWildlife: "Wildlife Photography Expeditions"
  },
  es: {
    topDestinations: "Destinos Principales", galapagos: "Islas GalÃ¡pagos", ecuador: "Ecuador Continental", fullDay: "Excursiones Full Day", amazon: "AmazonÃ­a Ecuatoriana", volcanoes: "Avenida de los Volcanes",
    company: "Empresa", about: "Sobre Nosotros", packages: "Paquetes TurÃ­sticos", contact: "Contactar Especialista",
    updates: "Recibe Novedades", subscribeText: "SuscrÃ­bete para recibir promociones de cruceros y guÃ­as de viaje seleccionadas.", emailPlaceholder: "Tu correo", subscribeBtn: "Suscribirse",
    licensed: "Operador TurÃ­stico Certificado en Ecuador y GalÃ¡pagos", support: "Soporte Especializado 24/7 Durante el Viaje", secure: "Reservas Seguras y SatisfacciÃ³n Garantizada al 100%",
    privacy: "PolÃ­tica de Privacidad", terms: "TÃ©rminos de Servicio",
    footerDescription: "Operador turÃ­stico boutique especializado en itinerarios de viaje premium a medida a travÃ©s de las maravillas mÃ¡s icÃ³nicas de Ecuador y GalÃ¡pagos.",
    paymentVerified: "MÃ©todos de Pago Verificados y Seguros",
    paymentHeading: "Pago Seguro y Encriptado",
    paymentDesc: "Aceptamos pagos directos y encriptados con tarjeta mediante Stripe, transferencias oficiales vÃ­a Citibank (EE.UU.), transferencias Zelle y Banco Produbanco. GarantÃ­a oficial y comprobantes certificados.",
    badgeStripe: "Pagos con Stripe",
    badgeCitibank: "Citibank EE.UU. & Zelle",
    badgeSSL: "EncriptaciÃ³n SSL de 256 Bits",
    cancellationPolicy: "PolÃ­ticas de CancelaciÃ³n y Reembolsos",
    officeReservations: "Oficina / Reservas:",
    hqEcuador: "Sede Ecuador (HQ)",
    officeSpain: "Sede EspaÃ±a (Coral Tour)",
    internationalLanguages: "Internacional / Idiomas:",
    featuredExperiences: "Experiencias Destacadas",
    expCouples: "Aniversario en GalÃ¡pagos",
    expFamily: "Ecuador en Familia",
    expWildlife: "FotografÃ­a de Vida Silvestre"
  },
  fr: {
    topDestinations: "Meilleures Destinations", galapagos: "ÃŽles Galapagos", ecuador: "Ã‰quateur Continental", fullDay: "Excursions Full Day", amazon: "Amazonie Ã‰quatorienne", volcanoes: "Avenue des Volcans",
    company: "Entreprise", about: "Ã€ Propos", packages: "Forfaits", contact: "Contacter un SpÃ©cialiste",
    updates: "ActualitÃ©s", subscribeText: "Abonnez-vous pour recevoir des promotions de croisiÃ¨res et des guides de voyage.", emailPlaceholder: "Votre e-mail", subscribeBtn: "S'abonner",
    licensed: "Voyagiste CertifiÃ© en Ã‰quateur et aux Galapagos", support: "Assistance SpÃ©cialisÃ©e 24/7", secure: "RÃ©servations SÃ©curisÃ©es et Satisfaction Garantie",
    privacy: "ConfidentialitÃ©", terms: "Conditions",
    footerDescription: "Voyagiste boutique de premier ordre spÃ©cialisÃ© dans les itinÃ©raires de voyage haut de gamme sur mesure Ã  travers l'Ã‰quateur et les Galapagos.",
    paymentVerified: "Moyens de Paiement VÃ©rifiÃ©s & SÃ©curisÃ©s",
    paymentHeading: "Paiement SÃ©curisÃ© & CryptÃ©",
    paymentDesc: "Nous acceptons les paiements sÃ©curisÃ©s par carte via Stripe, virements Citibank (USA), Zelle et Produbanco. Garantie officielle et bons de voyage certifiÃ©s.",
    badgeStripe: "Paiements Stripe",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "CryptÃ© SSL 256 Bits",
    cancellationPolicy: "Politique d'Annulation et Remboursement",
    officeReservations: "Bureau / RÃ©servations:",
    hqEcuador: "SiÃ¨ge Ã‰quateur (HQ)",
    officeSpain: "Filiale Espagne (Coral Tour)",
    internationalLanguages: "International / Langues:",
    featuredExperiences: "ExpÃ©riences Vedettes",
    expCouples: "Anniversaire aux GalÃ¡pagos",
    expFamily: "Ã‰quateur en Famille",
    expWildlife: "Photographie de Faune Sauvage"
  },
  de: {
    topDestinations: "Top-Reiseziele", galapagos: "Galapagos-Inseln", ecuador: "Ecuador Festland", fullDay: "TagesausflÃ¼ge (Full Day)", amazon: "Ecuadorianischer Amazonas", volcanoes: "StraÃŸe der Vulkane",
    company: "Unternehmen", about: "Ãœber Uns", packages: "Reisepakete", contact: "Kontaktieren",
    updates: "Reise-Updates", subscribeText: "Abonnieren Sie, um Kreuzfahrt-Angebote und ReisefÃ¼hrer zu erhalten.", emailPlaceholder: "Ihre E-Mail", subscribeBtn: "Abonnieren",
    licensed: "Zertifizierter Reiseveranstalter in Ecuador & Galapagos", support: "24/7 Spezialisten-Support auf der Reise", secure: "Sichere Buchungen & 100% Zufriedenheitsgarantie",
    privacy: "DatenschutzerklÃ¤rung", terms: "Nutzungsbedingungen",
    footerDescription: "Boutique-Reiseveranstalter, spezialisiert auf maÃŸgeschneiderte Premium-Reiserouten zu den kultigsten Wunderwelten von Ecuador und Galapagos.",
    paymentVerified: "Verifizierte & Sichere Zahlungsmethoden",
    paymentHeading: "Sicherer & VerschlÃ¼sselter Checkout",
    paymentDesc: "Wir akzeptieren sichere Kartenzahlungen Ã¼ber Stripe, offizielle Citibank (USA) Ãœberweisungen, Zelle und Produbanco. Offizielle Garantie und Reisezertifikate.",
    badgeStripe: "Stripe-Zahlungen",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "SSL 256-Bit-VerschlÃ¼sselung",
    cancellationPolicy: "Stornierungs- und RÃ¼ckerstattungsrichtlinien",
    officeReservations: "BÃ¼ro / Reservierungen:",
    hqEcuador: "Hauptsitz Ecuador (HQ)",
    officeSpain: "Niederlassung Spanien (Coral Tour)",
    internationalLanguages: "International / Sprachen:",
    featuredExperiences: "Besondere Erlebnisse",
    expCouples: "JubilÃ¤umsreisen auf GalÃ¡pagos",
    expFamily: "Ecuador fÃ¼r Familien",
    expWildlife: "Wildtier-Fotografie-Expeditionen"
  },
  it: {
    topDestinations: "Destinazioni Top", galapagos: "Isole Galapagos", ecuador: "Ecuador Continentale", fullDay: "Escursioni Full Day", amazon: "Amazzonia Ecuadoriana", volcanoes: "Viale dei Vulcani",
    company: "Azienda", about: "Chi Siamo", packages: "Pacchetti", contact: "Contatta",
    updates: "Aggiornamenti", subscribeText: "Iscriviti per ricevere promozioni per crociere e guide di viaggio.", emailPlaceholder: "La tua email", subscribeBtn: "Iscriviti",
    licensed: "Tour Operator Certificato in Ecuador e Galapagos", support: "Assistenza Specializzata 24/7", secure: "Prenotazioni Sicure e Soddisfazione Garantita",
    privacy: "Privacy", terms: "Termini",
    footerDescription: "Tour operator boutique di alto livello specializzato in itinerari di viaggio premium su misura attraverso le meraviglie di Ecuador e Galapagos.",
    paymentVerified: "Metodi di Pagamento Verificati e Sicuri",
    paymentHeading: "Pagamento Sicuro e Crittografato",
    paymentDesc: "Accettiamo pagamenti sicuri con carta tramite Stripe, bonifici ufficiali Citibank (USA), Zelle e Produbanco. Garanzia ufficiale e voucher certificati.",
    badgeStripe: "Pagamenti Stripe",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "Crittografia SSL a 256 Bit",
    cancellationPolicy: "Politica di Cancellazione e Rimborso",
    officeReservations: "Ufficio / Prenotazioni:",
    hqEcuador: "Sede Ecuador (HQ)",
    officeSpain: "Sede Spagna (Coral Tour)",
    internationalLanguages: "Internazionale / Lingue:",
    featuredExperiences: "Esperienze in Evidenza",
    expCouples: "Anniversario alle GalÃ¡pagos",
    expFamily: "Ecuador in Famiglia",
    expWildlife: "Spedizioni di Fotografia Naturalistica"
  },
  pt: {
    topDestinations: "Principais Destinos", galapagos: "Ilhas GalÃ¡pagos", ecuador: "Equador Continental", fullDay: "ExcursÃµes Full Day", amazon: "AmazÃ´nia Equatoriana", volcanoes: "Avenida dos VulcÃµes",
    company: "Empresa", about: "Sobre NÃ³s", packages: "Pacotes", contact: "Contatar",
    updates: "Atualizaciones", subscribeText: "Inscreva-se para receber promoÃ§Ãµes de cruzeiros e guias de viagem.", emailPlaceholder: "Seu e-mail", subscribeBtn: "Inscrever-se",
    licensed: "Operador TurÃ­stico Certificado no Equador e GalÃ¡pagos", support: "Suporte Especializado 24/7", secure: "Reservas Seguras e 100% de SatisfaÃ§Ã£o Garantida",
    privacy: "Privacidade", terms: "Termos",
    footerDescription: "Operador turÃ­stico boutique especializado em itinerÃ¡rios de viagem premium sob medida pelas maravilhas mais icÃ´nicas do Equador e GalÃ¡pagos.",
    paymentVerified: "MÃ©todos de Pagamento Verificados e Seguros",
    paymentHeading: "Checkout Seguro e Criptografado",
    paymentDesc: "Aceitamos pagamentos seguros com cartÃ£o via Stripe, transferÃªncias Citibank (EUA), Zelle e Produbanco. Garantia oficial e vouchers certificados.",
    badgeStripe: "Pagamentos Stripe",
    badgeCitibank: "Citibank EUA & Zelle",
    badgeSSL: "Criptografia SSL de 256 Bits",
    cancellationPolicy: "PolÃ­tica de Cancelamento e Reembolso",
    officeReservations: "EscritÃ³rio / Reservas:",
    hqEcuador: "Sede Equador (HQ)",
    officeSpain: "Sede Espanha (Coral Tour)",
    internationalLanguages: "Internacional / Idiomas:",
    featuredExperiences: "ExperiÃªncias em Destaque",
    expCouples: "AniversÃ¡rio em GalÃ¡pagos",
    expFamily: "Equador em FamÃ­lia",
    expWildlife: "ExpediÃ§Ãµes de Fotografia de Vida Selvagem"
  },
  ja: {
    topDestinations: "äººæ°—ã®ç›®çš„åœ°", galapagos: "ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è«¸å³¶", ecuador: "ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«æœ¬åœŸ", fullDay: "æ—¥å¸°ã‚Šãƒ„ã‚¢ãƒ¼ï¼ˆFull Dayï¼‰", amazon: "ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ãƒ»ã‚¢ãƒžã‚¾ãƒ³", volcanoes: "ç«å±±ã®é“",
    company: "ä¼šç¤¾æ¦‚è¦", about: "ç§ãŸã¡ã«ã¤ã„ã¦", packages: "ãƒ„ã‚¢ãƒ¼ãƒ—ãƒ©ãƒ³", contact: "é€£çµ¡ã™ã‚‹",
    updates: "æœ€æ–°æƒ…å ±", subscribeText: "ã‚¯ãƒ«ãƒ¼ã‚ºã®ãƒ—ãƒ­ãƒ¢ãƒ¼ã‚·ãƒ§ãƒ³ã‚„æ—…è¡Œã‚¬ã‚¤ãƒ‰ã‚’å—ã‘å–ã‚‹ãŸã‚ã«è³¼èª­ã—ã¦ãã ã•ã„ã€‚", emailPlaceholder: "ãƒ¡ãƒ¼ãƒ«ã‚¢ãƒ‰ãƒ¬ã‚¹", subscribeBtn: "è³¼èª­ã™ã‚‹",
    licensed: "ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ã¨ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹ã®èªå®šæ—…è¡Œä¼šç¤¾", support: "24æ™‚é–“365æ—¥ã®å°‚é–€å®¶ã‚µãƒãƒ¼ãƒˆ", secure: "å®‰å…¨ãªäºˆç´„ã¨100%ã®æº€è¶³ä¿è¨¼",
    privacy: "ãƒ—ãƒ©ã‚¤ãƒã‚·ãƒ¼ãƒãƒªã‚·ãƒ¼", terms: "åˆ©ç”¨è¦ç´„",
    footerDescription: "ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«ã¨ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹ã®è±¡å¾´çš„ãªè¦‹ã©ã“ã‚ã‚’å·¡ã‚‹ã‚ªãƒ¼ãƒ€ãƒ¼ãƒ¡ã‚¤ãƒ‰ã®ãƒ—ãƒ¬ãƒŸã‚¢ãƒ æ—…è¡Œã‚’å°‚é–€ã¨ã™ã‚‹ãƒ–ãƒ†ã‚£ãƒƒã‚¯æ—…è¡Œä¼šç¤¾ã§ã™ã€‚",
    paymentVerified: "èªè¨¼æ¸ˆã¿å®‰å…¨ãªæ±ºæ¸ˆæ–¹æ³•",
    paymentHeading: "å®‰å…¨ãªæš—å·åŒ–ãƒã‚§ãƒƒã‚¯ã‚¢ã‚¦ãƒˆï¼†æ±ºæ¸ˆ",
    paymentDesc: "Stripeã«ã‚ˆã‚‹å®‰å…¨ãªæš—å·åŒ–ã‚«ãƒ¼ãƒ‰æ±ºæ¸ˆã€ç±³å›½Citibankå…¬å¼é€é‡‘ã€Zelleã€ProdubancoéŠ€è¡Œé€é‡‘ã«å¯¾å¿œã€‚å…¬å¼ä¿è¨¼ãŠã‚ˆã³æ­£è¦æ—…è¡Œãƒã‚¦ãƒãƒ£ãƒ¼ã‚’ç™ºè¡Œã—ã¾ã™ã€‚",
    badgeStripe: "Stripe ã‚«ãƒ¼ãƒ‰æ±ºæ¸ˆ",
    badgeCitibank: "ç±³å›½ã‚·ãƒ†ã‚£ãƒãƒ³ã‚¯ & Zelle",
    badgeSSL: "256ãƒ“ãƒƒãƒˆ SSL æš—å·åŒ–ä¿è­·",
    cancellationPolicy: "ã‚­ãƒ£ãƒ³ã‚»ãƒ«ãƒ»è¿”é‡‘ãƒãƒªã‚·ãƒ¼",
    officeReservations: "ã‚ªãƒ•ã‚£ã‚¹ / äºˆç´„:",
    hqEcuador: "ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«æœ¬ç¤¾ (HQ)",
    officeSpain: "ã‚¹ãƒšã‚¤ãƒ³æ”¯ç¤¾ (Coral Tour)",
    internationalLanguages: "ã‚°ãƒ­ãƒ¼ãƒãƒ« / è¨€èªžã‚’é¸æŠž:",
    featuredExperiences: "æ³¨ç›®ã®ä½“é¨“",
    expCouples: "ã‚¬ãƒ©ãƒ‘ã‚´ã‚¹è¨˜å¿µæ—¥æ—…è¡Œ",
    expFamily: "ãƒ•ã‚¡ãƒŸãƒªãƒ¼å‘ã‘ã‚¨ã‚¯ã‚¢ãƒ‰ãƒ«",
    expWildlife: "é‡Žç”Ÿå‹•ç‰©ãƒ•ã‚©ãƒˆã‚°ãƒ©ãƒ•ã‚£ãƒ¼é å¾"
  },
  zh: {
    topDestinations: "çƒ­é—¨ç›®çš„åœ°", galapagos: "åŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›", ecuador: "åŽ„ç“œå¤šå°”å¤§é™†", fullDay: "å…¨å¤©ä¸€æ—¥æ¸¸", amazon: "åŽ„ç“œå¤šå°”äºšé©¬é€Š", volcanoes: "ç«å±±å¤§é“",
    company: "å…¬å¸ä¿¡æ¯", about: "å…³äºŽæˆ‘ä»¬", packages: "æ—…æ¸¸å¥—é¤", contact: "è”ç³»ä¸“å®¶",
    updates: "èŽ·å–æ—…æ¸¸æ›´æ–°", subscribeText: "è®¢é˜…ä»¥æŽ¥æ”¶æ¸¸è½®ä¿ƒé”€æ´»åŠ¨å’Œç²¾é€‰æ—…æ¸¸æŒ‡å—ã€‚", emailPlaceholder: "æ‚¨çš„ç”µå­é‚®ç®±", subscribeBtn: "è®¢é˜…",
    licensed: "åŽ„ç“œå¤šå°”å’ŒåŠ æ‹‰å¸•æˆˆæ–¯çš„è®¤è¯æ—…è¡Œç¤¾", support: "24/7 ä¸“ä¸šæ—…è¡Œæ”¯æŒ", secure: "å®‰å…¨é¢„è®¢å’Œ100%æ»¡æ„ä¿è¯",
    privacy: "éšç§æ”¿ç­–", terms: "æœåŠ¡æ¡æ¬¾",
    footerDescription: "ç²¾å“æ—…è¡Œç¤¾ï¼Œä¸“æ³¨äºŽåœ¨åŽ„ç“œå¤šå°”å’ŒåŠ æ‹‰å¸•æˆˆæ–¯ç¾¤å²›æ‰“é€ å®šåˆ¶çš„å°Šäº«ç²¾å“æ—…è¡Œè¡Œç¨‹ã€‚",
    paymentVerified: "å®˜æ–¹æƒå¨è®¤è¯å®‰å…¨æ”¯ä»˜æ–¹å¼",
    paymentHeading: "å…¨æµç¨‹ 256 ä½é“¶è¡Œçº§å®‰å…¨åŠ å¯†æ”¯ä»˜",
    paymentDesc: "æ”¯æŒé€šè¿‡ Stripe è¿›è¡Œå®‰å…¨é“¶è¡Œå¡æ”¯ä»˜ã€ç¾Žå›½èŠ±æ——é“¶è¡Œï¼ˆCitibankï¼‰å®˜æ–¹ç”µæ±‡ã€Zelle ä»¥åŠåŽ„ç“œå¤šå°” Produbanco é“¶è¡Œè½¬è´¦ã€‚æä¾›å®˜æ–¹åˆåŒæ‹…ä¿ä¸Žæ­£è§„æ—…è¡Œå‡­æ®ã€‚",
    badgeStripe: "Stripe å›½é™…é“¶è¡Œå¡æ”¯ä»˜",
    badgeCitibank: "ç¾Žå›½èŠ±æ——é“¶è¡Œ & Zelle",
    badgeSSL: "256ä½ SSL é¡¶çº§åŠ å¯†",
    cancellationPolicy: "å–æ¶ˆä¸Žé€€æ¬¾æ”¿ç­–",
    officeReservations: "åŠžå…¬å®¤ / é¢„è®¢ä¸“çº¿:",
    hqEcuador: "åŽ„ç“œå¤šå°”æ€»éƒ¨ (HQ)",
    officeSpain: "è¥¿ç­ç‰™åˆ†éƒ¨ (Coral Tour)",
    internationalLanguages: "å›½é™…å¤šè¯­è¨€åˆ‡æ¢:",
    featuredExperiences: "ç²¾é€‰ä½“éªŒ",
    expCouples: "åŠ æ‹‰å¸•æˆˆæ–¯çºªå¿µæ—¥ä¹‹æ—…",
    expFamily: "åŽ„ç“œå¤šå°”äº²å­æ¸¸",
    expWildlife: "é‡Žç”ŸåŠ¨ç‰©æ‘„å½±æŽ¢é™©"
  }
};

import { BrandLogo } from '@/components/ui/BrandLogo';

export function Footer() {
  const { settings } = useSettings();
  const locale = useLocale();
  const pathname = usePathname();
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const stored = getStoredUserProfile();
    if (stored.email) setNewsletterEmail(stored.email);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    ...targetIds: string[]
  ) => {
    const isHomePage =
      pathname === `/${locale}` ||
      pathname === `/${locale}/` ||
      pathname === '/' ||
      !pathname;

    if (isHomePage) {
      for (const id of targetIds) {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          try {
            window.history.pushState(null, '', `#${id}`);
          } catch {}
          return;
        }
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-emerald-950 via-[#032118] to-[#021812] dark:from-black dark:via-zinc-950 dark:to-black text-zinc-100 pt-16 pb-8 border-t border-emerald-900/80 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <a href={`/${locale}`} aria-label="Vermilion Routes Home" className="flex items-center gap-3">
              <div className="relative w-[160px] h-[40px] md:w-[220px] md:h-[55px] shrink-0">
                <Image quality={95}
                  src="/logo_blanco.png"
                  alt="Vermilion Routes"
                  width={220}
                  height={55}
                  className="w-auto h-full object-contain drop-shadow-md"
                />
              </div>
            </a>

            <p className="text-zinc-200 text-sm leading-relaxed max-w-sm">
              {(() => {
                const custom: any = settings?.footer?.description;
                if (custom && typeof custom === 'object') {
                  return getLocalizedText(custom, locale) || t.footerDescription;
                }
                if (typeof custom === 'string') {
                  const str = custom as string;
                  if (str.includes('Premier boutique') || str.includes('South America specialists') || str.includes('tour operator')) {
                    return t.footerDescription;
                  }
                  if (str.trim().length > 0) {
                    return str;
                  }
                }
                return t.footerDescription;
              })()}
            </p>

            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <a
                href={settings?.contact?.facebook || 'https://www.facebook.com/VermilionSouthAmericanRoutes'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings?.contact?.instagram || 'https://www.instagram.com/vermilionsouthamericanroutes/'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.contact?.tiktok || 'https://www.tiktok.com/@vermilionsaroutes'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="TikTok"
                title="TikTok Vermilion Routes"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@VermilionSouthAmericanRoutes"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-amber-400 transition-all hover:scale-105 active:scale-95"
                aria-label="TripAdvisor"
                title="TripAdvisor Vermilion Routes"
              >
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <p className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.topDestinations}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <a href={`/${locale}/tours#galapagos`} className="hover:text-white transition-colors">
                  {t.galapagos}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
                  {t.ecuador}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#diarios`} className="hover:text-white transition-colors">
                  {t.fullDay}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
                  {t.amazon}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
                  {t.volcanoes}
                </a>
              </li>
            </ul>

            <p className="font-serif font-semibold text-sm text-white tracking-wide pt-2">
              {t.featuredExperiences}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <a href={`/${locale}/couples-anniversary-galapagos`} className="hover:text-white transition-colors">
                  {t.expCouples}
                </a>
              </li>
              <li>
                <a href={`/${locale}/family-friendly-ecuador`} className="hover:text-white transition-colors">
                  {t.expFamily}
                </a>
              </li>
              <li>
                <a href={`/${locale}/wildlife-photography-expeditions`} className="hover:text-white transition-colors">
                  {t.expWildlife}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.company}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <a
                  href={`/${locale}/about`}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours`} className="hover:text-white transition-colors">
                  {t.packages}
                </a>
              </li>
              <li>
                <a href={`/${locale}/blog`} className="hover:text-white transition-colors">
                  Blog &amp; Travel Guides
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}#contact`}
                  onClick={(e) => handleAnchorClick(e, 'contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Quick Contact */}
          <div className="space-y-4">
            <p className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.updates}
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {t.subscribeText}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.trim()) {
                  saveStoredUserProfile({ email: newsletterEmail.trim() });
                  alert(locale === 'es' ? 'Â¡Gracias! Has sido registrado como Cliente Premium. Pronto recibirÃ¡s nuestras mejores ofertas.' : 'Thank you! You have been registered as a Premium Client. You will receive our best offers soon.');
                }
              }}
              className="space-y-2"
            >
              <div className="relative">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  {t.emailPlaceholder || "Email"}
                </label>
                <input
                  type="email"
                  id="footer-newsletter-email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    saveStoredUserProfile({ email: e.target.value });
                  }}
                  aria-label={t.emailPlaceholder || "Email"}
                  placeholder={t.emailPlaceholder}
                  suppressHydrationWarning
                  className="w-full bg-emerald-950/80 dark:bg-zinc-900/80 border border-emerald-800/80 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400 dark:focus:border-amber-400 focus:ring-1 focus:ring-emerald-400 dark:focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
                suppressHydrationWarning
              >
                <Send className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span>{t.subscribeBtn}</span>
              </button>
            </form>

            <div className="pt-2 space-y-2 text-xs text-zinc-200">
              <p className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-400 text-[11px]">WhatsApp 24/7:</span>
                <a href="tel:+593960039156" className="hover:text-emerald-300 transition-colors">
                  +593 96 003 9156
                </a>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-400 text-[11px]">{t.officeReservations}</span>
                <a href="tel:+593994048458" className="hover:text-emerald-300 transition-colors">
                  +593 99 404 8458
                </a>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:info@vermilionroutes.com" className="hover:text-emerald-300 transition-colors">
                  <span>info</span>
                  <span className="text-emerald-400 font-bold">&#64;</span>
                  <span>vermilionroutes.com</span>
                </a>
              </p>

              {/* Sedes Oficiales Internacionales */}
              <div className="pt-2 space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{t.hqEcuador}</span>
                  </div>
                  <p className="text-zinc-300 pl-5">
                    MonteserrÃ­n, De los Lirios N45-206 y Julio Arellano, Tercer Piso, Quito (CP 170124)
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{t.officeSpain}</span>
                  </div>
                  <p className="text-zinc-300 pl-5">
                    Calle Seco 3, 28007 Madrid, EspaÃ±a
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-10 border-b border-emerald-900/60 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {t.paymentVerified}
              </span>
              <p className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {t.paymentHeading}
              </p>
              <p className="text-xs text-zinc-300 max-w-2xl mt-1">
                {t.paymentDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 text-xs font-semibold text-emerald-300">
                {t.badgeStripe}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 text-xs font-semibold text-emerald-300">
                {t.badgeCitibank}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 text-xs font-semibold text-emerald-300 dark:text-amber-400">
                {t.badgeSSL}
              </span>
            </div>
          </div>
        </div>

        {/* Guarantees & Badges */}
        <div className="py-8 flex flex-wrap justify-between items-center gap-4 border-b border-emerald-900/60 dark:border-zinc-900 text-xs text-zinc-200">
          <a href="/patente%20turismo.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 px-4 py-2.5 rounded-2xl hover:bg-emerald-900/60 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-amber-400" />
              <span className="text-white font-medium">{t.licensed}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 dark:text-zinc-500 font-mono">Reg. No: 1793215456001 &bull; Ministerio de Turismo EC</span>
            </a>
          <div className="flex items-center gap-2 bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 px-4 py-2.5 rounded-2xl">
            <Award className="w-4 h-4 text-emerald-400 dark:text-amber-400" />
            <span className="text-white font-medium">{t.support}</span>
          </div>
          <a href="/Ruc.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 px-4 py-2.5 rounded-2xl hover:bg-emerald-900/60 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
              <Sparkles className="w-4 h-4 text-emerald-400 dark:text-amber-400" />
              <span className="text-white font-medium">{t.secure}</span>
            </a>
        </div>

        {/* International Language Hub - 8 Supported Locales */}
        <div className="py-6 border-b border-emerald-900/60 dark:border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400/90 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.internationalLanguages}</span>
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { code: 'en', label: 'English', flag: '/flags/us.svg' },
              { code: 'es', label: 'EspaÃ±ol', flag: '/flags/es.svg' },
              { code: 'fr', label: 'FranÃ§ais', flag: '/flags/fr.svg' },
              { code: 'de', label: 'Deutsch', flag: '/flags/de.svg' },
              { code: 'pt', label: 'PortuguÃªs', flag: '/flags/pt.svg' },
              { code: 'it', label: 'Italiano', flag: '/flags/it.svg' },
              { code: 'ja', label: 'æ—¥æœ¬èªž', flag: '/flags/jp.svg' },
              { code: 'zh', label: 'ä¸­æ–‡', flag: '/flags/cn.svg' },
            ].map((lang) => (
              <a
                key={lang.code}
                href={`/${lang.code}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  locale === lang.code
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-zinc-300 hover:text-white border border-emerald-800/40'
                }`}
              >
                <img src={lang.flag} alt={lang.label} width={16} height={12} className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                <span>{lang.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-300">
          <p>{getLocalizedText(settings?.footer?.copyright, locale) || `Â© ${new Date().getFullYear()} Agencia de Viajes Vermilion (RUC 1711992808001). All Rights Reserved.`}</p>
          <div className="flex gap-6">
            <a href={`/${locale}/privacy-policy`} className="hover:text-white transition-colors underline underline-offset-4 decoration-emerald-600/60">
              {t.privacy}
            </a>
            <a href={`/${locale}/terms`} className="hover:text-white transition-colors underline underline-offset-4 decoration-emerald-600/60">
              {t.terms}
            </a>
            <a
              href={`/${locale}/cancellation`}
              className="hover:text-white transition-colors underline underline-offset-4 decoration-emerald-600/60 cursor-pointer"
            >
              {t.cancellationPolicy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


