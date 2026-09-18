import { jsPDF } from 'jspdf';

export interface VoucherPdfData {
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  tourTitle: string;
  destination?: string;
  travelDate: string;
  travelersCount: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'confirmed' | 'pending_payment';
  locale?: string;
}

/**
 * Generates an official 1-page A4 Travel Voucher & Booking Confirmation PDF.
 * Downloads immediately as Vermilion-Voucher-[Ref].pdf
 */
export async function generateTravelVoucherPDF(data: VoucherPdfData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const isEs = (data.locale || 'es').startsWith('es');
  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // ── 1. TOP HEADER BANNER (Luxury Forest Green) ──
  doc.setFillColor(7, 19, 12); // #07130C
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Gold accent rule
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(0, 32, pageWidth, 1.5, 'F');

  // Brand Titles in Banner
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('VERMILION SOUTH AMERICAN ROUTES', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(209, 213, 219); // stone-300
  const subTitle = isEs
    ? 'VOUCHER OFICIAL DE EXPEDICION Y RESERVA'
    : 'OFFICIAL EXPEDITION TRAVEL VOUCHER & BOOKING CONFIRMATION';
  doc.text(subTitle, margin, 21);

  doc.setFontSize(7.5);
  doc.setTextColor(156, 163, 175);
  const nowStr = new Date().toLocaleDateString(isEs ? 'es-EC' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  doc.text(`${isEs ? 'Fecha de Emisión' : 'Issue Date'}: ${nowStr} • RUC: 1711992808001`, margin, 27);

  // ── 2. BOOKING CODE & STATUS BADGE (Hero Box) ──
  let y = 40;
  const isPaid = data.paymentStatus === 'confirmed';

  // Box background
  doc.setFillColor(isPaid ? 240 : 254, isPaid ? 253 : 243, isPaid ? 244 : 199); // light green or amber
  doc.setDrawColor(isPaid ? 5 : 217, isPaid ? 150 : 119, isPaid ? 105 : 6); // green or amber border
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'FD');

  // Booking Code
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(isEs ? 'CODIGO OFICIAL DE RESERVA' : 'OFFICIAL BOOKING REFERENCE', margin + 6, y + 7);

  doc.setTextColor(15, 23, 42);
  doc.setFont('courier', 'bold');
  doc.setFontSize(14);
  doc.text(data.bookingRef, margin + 6, y + 16);

  // Status Pill on the right
  const badgeText = isPaid
    ? (isEs ? 'PAGO CONFIRMADO & GARANTIZADO' : 'PAYMENT CONFIRMED & GUARANTEED')
    : (isEs ? 'EN ESPERA DE PAGO FIDUCIARIO' : 'REGISTERED • PENDING WIRE PAYMENT');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  const badgeWidth = doc.getTextWidth(badgeText) + 8;
  const badgeX = margin + contentWidth - badgeWidth - 6;

  doc.setFillColor(isPaid ? 16 : 217, isPaid ? 185 : 119, isPaid ? 129 : 6);
  doc.roundedRect(badgeX, y + 6, badgeWidth, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(badgeText, badgeX + 4, y + 12.5);

  y += 28;

  // ── 3. PASSENGER & EXPEDITION DETAILS ──
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 75, 2.5, 2.5, 'FD');

  // Section Header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(isEs ? 'DETALLES DEL PASAJERO Y EXPEDICION' : 'PASSENGER & EXPEDITION DETAILS', margin + 5, y + 5);

  y += 13;

  const leftX = margin + 6;
  const rightX = margin + 96;
  const lineHeight = 11;

  // Row 1: Titular & Tour
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(isEs ? 'Pasajero Titular (Lead Guest):' : 'Lead Traveler Name:', leftX, y);
  doc.text(isEs ? 'Expedición / Tour Contratado:' : 'Tour / Expedition Name:', rightX, y);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(data.customerName || 'Valued Traveler', leftX, y + 4.5);
  const truncatedTour = data.tourTitle.length > 38 ? data.tourTitle.slice(0, 36) + '...' : data.tourTitle;
  doc.text(truncatedTour, rightX, y + 4.5);

  y += lineHeight;

  // Row 2: Email & Dates
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(isEs ? 'Correo de Contacto:' : 'Contact Email:', leftX, y);
  doc.text(isEs ? 'Fecha de Viaje / Itinerario:' : 'Travel Date / Dates:', rightX, y);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(data.customerEmail || 'No especificado', leftX, y + 4.5);
  doc.text(data.travelDate || (isEs ? 'Por confirmar' : 'To be confirmed'), rightX, y + 4.5);

  y += lineHeight;

  // Row 3: Phone & Travelers Count
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(isEs ? 'Teléfono de Contacto:' : 'Contact Phone:', leftX, y);
  doc.text(isEs ? 'Número de Viajeros:' : 'Travelers Count:', rightX, y);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(data.customerPhone || '+593 96 003 9156', leftX, y + 4.5);
  doc.text(data.travelersCount || '1 Viajero', rightX, y + 4.5);

  y += lineHeight;

  // Row 4: Destination & Payment Method
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(isEs ? 'Destino Principal:' : 'Primary Destination:', leftX, y);
  doc.text(isEs ? 'Método de Pago:' : 'Payment Method:', rightX, y);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(data.destination || 'Ecuador & Galápagos', leftX, y + 4.5);
  doc.text(data.paymentMethod || 'PayPal / Tarjeta Internacional', rightX, y + 4.5);

  y += lineHeight;

  // Row 5: Total Amount Bar
  doc.setFillColor(241, 245, 249);
  doc.rect(margin + 2, y - 2, contentWidth - 4, 11, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(isEs ? 'MONTO TOTAL REGISTRADO:' : 'TOTAL AMOUNT REGISTERED:', leftX, y + 5);

  const formattedAmount = `$${data.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  doc.setTextColor(4, 120, 87); // emerald-700
  doc.setFontSize(11);
  doc.text(formattedAmount, rightX, y + 5);

  y += 20;

  // ── 4. INCLUDED SERVICES & OPERATIONAL STANDARDS ──
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 48, 2.5, 2.5, 'FD');

  doc.setFillColor(7, 19, 12);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(isEs ? 'SERVICIOS INCLUIDOS Y GARANTIAS OPERATIVAS' : 'INCLUDED SERVICES & GUARANTEES', margin + 5, y + 5);

  y += 12;

  const inclusions = isEs
    ? [
        '• Transporte terrestre privado con aire acondicionado y chofer profesional certificado.',
        '• Guía naturalista bilingüe acreditado por el Ministerio de Turismo y Parque Nacional Galápagos.',
        '• Alojamiento boutique seleccionado según categoría acordada (confort, naturaleza y encanto).',
        '• Permisos de navegación, transfer marítimo y asistencia en aeropuerto a la llegada.',
        '• Soporte y monitoreo directo 24/7 vía WhatsApp Concierge durante toda la estancia.',
      ]
    : [
        '• Private air-conditioned ground transportation with certified professional drivers.',
        '• Certified bilingual naturalist guide licensed by the Ministry of Tourism & Galapagos National Park.',
        '• Boutique accommodations selected for comfort, nature, and prime locations.',
        '• Navigation permits, maritime transfers, and personal airport greeting upon arrival.',
        '• Dedicated 24/7 WhatsApp Concierge emergency and logistical assistance throughout your stay.',
      ];

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  inclusions.forEach((inc) => {
    doc.text(inc, margin + 5, y);
    y += 6.5;
  });

  y += 8;

  // ── 5. IMPORTANT INSTRUCTIONS & CONCIERGE SUPPORT ──
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(245, 158, 11); // amber-500
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentWidth, 30, 2, 2, 'FD');

  doc.setTextColor(146, 64, 14); // amber-800
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(isEs ? 'INSTRUCCIONES CLAVE DE VIAJE:' : 'KEY TRAVEL INSTRUCTIONS:', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const instructions = isPaid
    ? (isEs
        ? 'Presente este voucher en formato digital (PDF en su teléfono) o impreso a su llegada al aeropuerto. Su guía naturalista y chofer privado le recibirán portando el identificador con su nombre y el código oficial de reserva.'
        : 'Present this voucher digitally on your mobile or printed upon arrival at the airport. Your private guide and driver will meet you holding a sign with your name and official booking reference.')
    : (isEs
        ? 'Su reserva ha sido registrada temporalmente. Por favor complete la transferencia antes de la fecha límite e incluya su código de reserva en el concepto bancario. Notifique a nuestro Concierge 24/7 al +593 96 003 9156.'
        : 'Your expedition spot is held. Please complete wire transfer before expiry and include your reference code in the bank memo. Notify our 24/7 Concierge at +593 96 003 9156.');

  const splitInst = doc.splitTextToSize(instructions, contentWidth - 10);
  doc.text(splitInst, margin + 5, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.text(
    isEs
      ? 'Concierge 24/7: +593 96 003 9156  •  Email: info@vermilionroutes.com  •  Web: vermilionroutes.com'
      : 'Concierge 24/7: +593 96 003 9156  •  Email: info@vermilionroutes.com  •  Web: vermilionroutes.com',
    margin + 5,
    y + 24
  );

  y += 36;

  // ── 6. OFFICIAL VERIFICATION SEAL & LEGAL FOOTER ──
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, y, margin + contentWidth, y);

  y += 5;
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(
    isEs
      ? 'DOCUMENTO OFICIAL VERIFICABLE • AGENCIA DE VIAJES VERMILION CIA. LTDA.'
      : 'OFFICIAL VERIFIABLE DOCUMENT • VERMILION TRAVEL AGENCY CIA. LTDA.',
    margin,
    y
  );

  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.text(
    isEs
      ? 'Certificado por el Ministerio de Turismo del Ecuador • Ganador TripAdvisor Travelers\' Choice 2026 • Quito, Ecuador & Madrid, España'
      : 'Certified by the Ministry of Tourism of Ecuador • TripAdvisor Travelers\' Choice 2026 Winner • Quito, Ecuador & Madrid, Spain',
    margin,
    y
  );

  // Download PDF
  const cleanRef = (data.bookingRef || 'R-2026-VR').replace(/[^a-zA-Z0-9.-]/g, '_');
  doc.save(`Vermilion-Voucher-${cleanRef}.pdf`);
}
