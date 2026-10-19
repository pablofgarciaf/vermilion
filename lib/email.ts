import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const SMTP_EMAIL = process.env.SMTP_EMAIL || 'info@vermilionroutes.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';

const SMTP_HOST = process.env.SMTP_HOST || 'mail.vermilionroutes.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export const generateVerificationToken = (email: string, cedula: string) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  return jwt.sign({ email, cedula }, secret, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  try {
    return jwt.verify(token, secret) as { email: string; cedula: string };
  } catch (error) {
    return null;
  }
};

export const sendVerificationEmail = async (toEmail: string, name: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://www.vermilionroutes.com' : 'http://localhost:3005');
  const finalUrl = `${baseUrl}/es/affiliates/verify?token=${token}`;

  const htmlTemplate = `
    <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #27272a;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #f59e0b; font-size: 28px; font-weight: normal; margin: 0;">Vermilion Routes</h1>
        <p style="color: #a1a1aa; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Ambassador Program</p>
      </div>
      
      <h2 style="font-size: 22px; font-weight: normal; border-bottom: 1px solid #27272a; padding-bottom: 15px;">Bienvenido a la Élite, ${name}</h2>
      
      <p style="color: #d4d4d8; line-height: 1.6; font-family: sans-serif;">
        Hemos recibido tu postulación al programa de embajadores de <strong>Vermilion Routes</strong>. 
        Para garantizar la seguridad de nuestra red y de tus comisiones, necesitamos verificar tu dirección de correo electrónico.
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${finalUrl}" style="background-color: #f59e0b; color: #09090b; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; font-family: sans-serif; text-transform: uppercase; font-size: 14px; display: inline-block;">
          Verificar y Crear Contraseña
        </a>
      </div>
      
      <p style="color: #a1a1aa; font-size: 12px; font-family: sans-serif; text-align: center; border-top: 1px solid #27272a; padding-top: 20px;">
        Este enlace expirará en 24 horas por motivos de seguridad.<br>
        Si no solicitaste esta cuenta, ignora este correo.
      </p>
    </div>
  `;

  try {
    if (!SMTP_PASSWORD) {
      console.warn('⚠️ SMTP_PASSWORD no configurado en .env - Simulando envío de correo en la consola:');
      console.log(`\n\n=== SIMULACRO DE CORREO A ${toEmail} ===`);
      console.log(`URL DE VERIFICACIÓN: ${finalUrl}`);
      console.log(`=========================================\n\n`);
      return true; // Simular éxito en desarrollo si no hay password
    }

    await transporter.sendMail({
      from: `"Vermilion Ambassadors" <${SMTP_EMAIL}>`,
      to: toEmail,
      subject: 'Activa tu cuenta de Embajador | Vermilion Routes',
      html: htmlTemplate,
    });
    return true;
  } catch (error) {
    console.error('Error enviando correo de verificación:', error);
    throw error;
  }
};

export const generateNewsletterToken = (email: string, affiliateId: string | null) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  return jwt.sign({ email, affiliateId }, secret, { expiresIn: '48h' });
};

export const verifyNewsletterToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  try {
    return jwt.verify(token, secret) as { email: string; affiliateId: string | null };
  } catch (error) {
    return null;
  }
};

export const sendNewsletterVerificationEmail = async (toEmail: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://www.vermilionroutes.com' : 'http://localhost:3005');
  const finalUrl = `${baseUrl}/es/verify-newsletter?token=${token}`;

  const htmlTemplate = `
    <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #052e16; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #064e3b;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #34d399; font-size: 28px; font-weight: normal; margin: 0;">Vermilion Routes</h1>
        <p style="color: #a7f3d0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Club Exclusivo de Viajes</p>
      </div>
      
      <h2 style="font-size: 22px; font-weight: normal; border-bottom: 1px solid #064e3b; padding-bottom: 15px;">Estás a un paso de la Élite</h2>
      
      <p style="color: #d1fae5; line-height: 1.6; font-family: sans-serif;">
        Has solicitado unirte al <strong>Club Exclusivo de Viajes Vermilion</strong>. 
        Por favor, confirma tu correo para recibir alertas de migración de fauna, ofertas de cruceros de lujo y tu 10% de descuento.
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${finalUrl}" style="background-color: #059669; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; font-family: sans-serif; text-transform: uppercase; font-size: 14px; display: inline-block;">
          Confirmar mi Correo
        </a>
      </div>
      
      <p style="color: #6ee7b7; font-size: 12px; font-family: sans-serif; text-align: center; border-top: 1px solid #064e3b; padding-top: 20px;">
        Si no solicitaste unirte, puedes ignorar este correo.
      </p>
    </div>
  `;

  try {
    if (!SMTP_PASSWORD) {
      console.warn('⚠️ SMTP_PASSWORD no configurado en .env - Simulando correo Newsletter a ' + toEmail);
      console.log(`URL DE VERIFICACIÓN NEWSLETTER: ${finalUrl}`);
      return true; 
    }

    await transporter.sendMail({
      from: `"Club Vermilion" <${SMTP_EMAIL}>`,
      to: toEmail,
      subject: 'Confirma tu Suscripción | Vermilion Routes',
      html: htmlTemplate,
    });
    return true;
  } catch (error) {
    console.error('Error enviando correo de newsletter:', error);
    throw error;
  }
};

export const sendLeadMagnetEmail = async (toEmail: string, locale: string = 'es') => {
  const isEs = locale === 'es';
  const downloadUrl = 'https://www.vermilionroutes.com/guides/guia-ecuador-galapagos-2026.pdf';

  const htmlTemplate = `
    <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #042f2e; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #134e4a;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2dd4bf; font-size: 28px; font-weight: normal; margin: 0;">Vermilion Routes</h1>
        <p style="color: #99f6e4; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Luxury Expeditions & Custom Travel</p>
      </div>
      
      <h2 style="font-size: 22px; font-weight: normal; border-bottom: 1px solid #134e4a; padding-bottom: 15px; color: #ffffff;">
        ${isEs ? 'Tu Guía Exclusiva de Ecuador & Galápagos' : 'Your Exclusive Ecuador & Galapagos Guide'}
      </h2>
      
      <p style="color: #ccfbf1; line-height: 1.6; font-family: sans-serif; font-size: 15px;">
        ${isEs 
          ? 'Gracias por tu interés en descubrir los rincones más fascinantes y exclusivos de Ecuador Continental y las Islas Galápagos. Hemos preparado esta guía con recomendaciones de naturalistas locales, secretos de viaje y experiencias que no encontrarás en ningún otro lugar.'
          : 'Thank you for your interest in discovering the most fascinating and exclusive corners of Mainland Ecuador and the Galapagos Islands. We have prepared this guide curated by local naturalists with travel secrets and experiences found nowhere else.'}
      </p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${downloadUrl}" target="_blank" style="background-color: #0d9488; color: #ffffff; padding: 15px 36px; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: sans-serif; text-transform: uppercase; font-size: 14px; display: inline-block; box-shadow: 0 4px 14px rgba(13, 148, 136, 0.4);">
          ${isEs ? '📥 Descargar Guía en PDF' : '📥 Download PDF Guide'}
        </a>
      </div>

      <div style="background-color: #115e59; padding: 20px; border-radius: 8px; margin-top: 30px; font-family: sans-serif; font-size: 13px; color: #e6fffa;">
        <p style="margin: 0; font-weight: bold; color: #ffffff;">${isEs ? '¿Planeando un viaje a medida?' : 'Planning a custom expedition?'}</p>
        <p style="margin: 5px 0 0 0; color: #ccfbf1;">
          ${isEs 
            ? 'Nuestro equipo de especialistas en expediciones está listo para diseñar tu itinerario privado perfecto. Contáctanos por WhatsApp al +593 96 003 9156.' 
            : 'Our expedition specialists are ready to craft your bespoke private itinerary. Contact us on WhatsApp at +593 96 003 9156.'}
        </p>
      </div>
      
      <p style="color: #5eead4; font-size: 11px; font-family: sans-serif; text-align: center; border-top: 1px solid #134e4a; padding-top: 20px; margin-top: 30px;">
        © 2026 Vermilion Routes. ${isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
      </p>
    </div>
  `;

  try {
    if (!SMTP_PASSWORD) {
      console.warn('⚠️ SMTP_PASSWORD no configurado en .env - Simulando envío de Guía PDF a ' + toEmail);
      return true;
    }

    await transporter.sendMail({
      from: `"Vermilion Expeditions" <${SMTP_EMAIL}>`,
      to: toEmail,
      subject: isEs 
        ? '✨ Tu Guía Exclusiva de Viaje: Ecuador & Galápagos | Vermilion Routes' 
        : '✨ Your Exclusive Travel Guide: Ecuador & Galapagos | Vermilion Routes',
      html: htmlTemplate,
    });
    return true;
  } catch (error) {
    console.error('Error enviando correo de Guía Lead Magnet:', error);
    throw error;
  }
};

export interface BookingConfirmationEmailParams {
  toEmail: string;
  customerName: string;
  tourTitle: string;
  bookingRef: string;
  amountPaid: number;
  paymentMethod: string;
  travelDate?: string;
  guestsCount?: string;
  locale?: string;
}

export interface BookingConfirmationEmailResult {
  sent: true;
  messageId?: string;
}

export const sendBookingConfirmationEmail = async (
  params: BookingConfirmationEmailParams
): Promise<BookingConfirmationEmailResult> => {
  const {
    toEmail,
    customerName,
    tourTitle,
    bookingRef,
    amountPaid,
    paymentMethod,
    travelDate = 'Por confirmar / To be confirmed',
    guestsCount = '2 Viajeros / Travelers',
    locale = 'es'
  } = params;

  const isEs = locale === 'es';
  const methodLabel = paymentMethod === 'card' 
    ? (isEs ? 'Tarjeta de Crédito / Débito (Stripe)' : 'Credit / Debit Card (Stripe)')
    : (paymentMethod === 'bank_wire' ? (isEs ? 'Transferencia Bancaria / Zelle' : 'Bank Wire / Zelle') : paymentMethod);

  const formattedAmount = `$${amountPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="${isEs ? 'es' : 'en'}">
    <head>
      <meta charset="UTF-8">
      <title>${isEs ? 'Confirmación Oficial de Reserva' : 'Official Booking Confirmation'}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #05140b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f4f4f5;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #05140b; padding: 30px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; background-color: #0b2014; border: 1px solid #14532d; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <!-- Header -->
              <tr>
                <td align="center" style="padding: 40px 30px 20px 30px; border-bottom: 1px solid #14532d; background: linear-gradient(180deg, #071a10 0%, #0b2014 100%);">
                  <h1 style="margin: 0; color: #34d399; font-size: 26px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">
                    VERMILION ROUTES
                  </h1>
                  <p style="margin: 6px 0 0 0; color: #a7f3d0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">
                    ${isEs ? 'Agencia de Viajes Vermilion Cia. Ltda. • Expediciones de Lujo' : 'Bespoke Expeditions & Luxury Travel'}
                  </p>
                  
                  <div style="margin-top: 25px; display: inline-block; background-color: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 30px; padding: 8px 20px;">
                    <span style="color: #6ee7b7; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                      ✓ ${isEs ? 'Reserva & Pago Confirmado' : 'Reservation & Payment Confirmed'}
                    </span>
                  </div>
                </td>
              </tr>

              <!-- Greeting & Reference -->
              <tr>
                <td style="padding: 35px 35px 20px 35px;">
                  <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                    ${isEs ? `Estimado/a ${customerName},` : `Dear ${customerName},`}
                  </h2>
                  <p style="margin: 0; color: #d1fae5; font-size: 14px; line-height: 1.6;">
                    ${isEs
                      ? 'Es un honor confirmar la recepción de tu pago y la reserva oficial de tu plaza para tu expedición en Ecuador y las Islas Galápagos. A continuación detallamos los pormenores de tu comprobante:'
                      : 'It is our utmost pleasure to confirm the receipt of your payment and your official reservation for your expedition across Ecuador and the Galápagos Islands. Here are your booking details:'}
                  </p>
                </td>
              </tr>

              <!-- Booking Details Card -->
              <tr>
                <td style="padding: 0 35px 25px 35px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #06180e; border: 1px solid #166534; border-radius: 12px; padding: 20px;">
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #86efac; font-size: 12px; text-transform: uppercase; font-weight: bold;">
                        ${isEs ? 'Código de Referencia:' : 'Booking Reference:'}
                      </td>
                      <td align="right" style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #fbbf24; font-family: monospace; font-size: 16px; font-weight: bold;">
                        ${bookingRef}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #86efac; font-size: 12px; text-transform: uppercase; font-weight: bold;">
                        ${isEs ? 'Expedición:' : 'Expedition:'}
                      </td>
                      <td align="right" style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #ffffff; font-size: 13px; font-weight: 600;">
                        ${tourTitle}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #86efac; font-size: 12px; text-transform: uppercase; font-weight: bold;">
                        ${isEs ? 'Fecha de Salida:' : 'Departure Date:'}
                      </td>
                      <td align="right" style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #ffffff; font-size: 13px;">
                        ${travelDate}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #86efac; font-size: 12px; text-transform: uppercase; font-weight: bold;">
                        ${isEs ? 'Pasajeros:' : 'Travelers:'}
                      </td>
                      <td align="right" style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #ffffff; font-size: 13px;">
                        ${guestsCount}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #86efac; font-size: 12px; text-transform: uppercase; font-weight: bold;">
                        ${isEs ? 'Método de Pago:' : 'Payment Method:'}
                      </td>
                      <td align="right" style="padding: 8px 0; border-bottom: 1px solid rgba(22, 101, 52, 0.5); color: #ffffff; font-size: 13px;">
                        ${methodLabel}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0 4px 0; color: #86efac; font-size: 13px; text-transform: uppercase; font-weight: bold;">
                        ${isEs ? 'Monto Recibido:' : 'Amount Paid:'}
                      </td>
                      <td align="right" style="padding: 12px 0 4px 0; color: #34d399; font-size: 20px; font-weight: bold; font-family: monospace;">
                        ${formattedAmount}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Inclusions & Next Steps -->
              <tr>
                <td style="padding: 0 35px 25px 35px;">
                  <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                    ${isEs ? 'Próximos Pasos de tu Concierge' : 'Your Concierge Next Steps'}
                  </h3>
                  <ul style="margin: 0; padding-left: 20px; color: #a7f3d0; font-size: 13px; line-height: 1.7;">
                    <li>${isEs ? 'Tu Travel Concierge asignado te contactará por WhatsApp en menos de 24 horas.' : 'Your dedicated Travel Concierge will reach out via WhatsApp within 24 hours.'}</li>
                    <li>${isEs ? 'Coordinaremos requerimientos dietéticos, tallas para el equipo de snorkel y vuelos internos.' : 'We will coordinate dietary preferences, snorkel equipment sizes and domestic flights.'}</li>
                    <li>${isEs ? 'Recibirás el dossier oficial de expedición con recomendaciones de equipaje y clima.' : 'You will receive the complete packing dossier and climate advisory for the Galápagos and Andes.'}</li>
                  </ul>
                </td>
              </tr>

              <!-- Concierge Direct Box -->
              <tr>
                <td style="padding: 0 35px 35px 35px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #072a18; border: 1px solid #059669; border-radius: 10px; padding: 18px;">
                    <tr>
                      <td>
                        <p style="margin: 0; color: #ffffff; font-size: 13px; font-weight: bold;">
                          ${isEs ? '¿Tienes alguna duda inmediata sobre tu viaje?' : 'Need immediate trip assistance?'}
                        </p>
                        <p style="margin: 6px 0 0 0; color: #a7f3d0; font-size: 12px;">
                          ${isEs ? 'Línea de Asistencia & WhatsApp 24/7:' : '24/7 WhatsApp & Concierge Hotline:'} 
                          <strong style="color: #34d399;">+593 96 003 9156</strong> • 
                          <strong style="color: #34d399;">info@vermilionroutes.com</strong>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 25px 30px; border-top: 1px solid #14532d; background-color: #07170e; color: #6ee7b7; font-size: 11px; line-height: 1.5;">
                  <p style="margin: 0 0 4px 0;">
                    <strong>Agencia de Viajes Vermilion Cia. Ltda.</strong> • RUC: 1711992808001
                  </p>
                  <p style="margin: 0 0 4px 0;">
                    Sede Ecuador: Monteserrín, De los Lirios N45-206 y Julio Arellano, 3er Piso, Quito (CP 170503) • Sede España (Coral Tour): Calle Seco 3, 28007 Madrid, España
                  </p>
                  <p style="margin: 0; color: #059669;">
                    © ${new Date().getFullYear()} Vermilion Routes. ${isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    if (!SMTP_PASSWORD) {
      throw new Error('SMTP_PASSWORD is not configured; booking email was not sent.');
    }

    const bccList = [SMTP_EMAIL, 'pablofgarciaf@gmail.com'].filter(Boolean);

    const info = await transporter.sendMail({
      from: `"Vermilion Expeditions" <${SMTP_EMAIL}>`,
      to: toEmail,
      bcc: bccList,
      subject: isEs
        ? `✨ Reserva Confirmada: ${tourTitle} | Ref: ${bookingRef}`
        : `✨ Booking Confirmed: ${tourTitle} | Ref: ${bookingRef}`,
      html: htmlTemplate,
    });

    console.log(`[Email] Booking confirmation email dispatched successfully to ${toEmail} (BCC: ${bccList.join(', ')})`);
    return {
      sent: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error enviando correo de confirmación de reserva:', error);
    throw error instanceof Error ? error : new Error('Unknown SMTP delivery error');
  }
};

// ============================================================================
// AVISO DE NUEVO LEAD (al equipo) + ACUSE DE RECIBO (al viajero)
// ============================================================================

/** Datos mínimos de un lead para avisar al equipo. Todo viene del usuario: se escapa siempre. */
export interface NewLeadNotification {
  leadId: string;
  /** contact_form | ai_concierge | lead_magnet ... */
  source: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  tourTitle?: string;
  destination?: string;
  travelDates?: string;
  guestsCount?: string;
  message?: string;
  locale?: string;
  createdAt: string;
}

export type LeadEmailResult =
  | { sent: true; messageId?: string }
  | { sent: false; reason: 'smtp_not_configured' | 'no_valid_recipient' };

/** Emails de relleno que el sistema pone cuando el viajero no dio uno real. */
const PLACEHOLDER_EMAILS = new Set(['pending@guest.com', 'guest@vermilionroutes.com']);

const escapeHtml = (value: string | undefined | null): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isRealEmail = (email: string | undefined): email is string =>
  !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !PLACEHOLDER_EMAILS.has(email.toLowerCase());

/** Solo dígitos (formato que exige wa.me). Devuelve null si no parece un teléfono. */
const toWhatsAppDigits = (phone: string | undefined): string | null => {
  const digits = String(phone ?? '').replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
};

type LeadCopy = {
  subject: string;
  greeting: (name: string) => string;
  body: string;
  whatsapp: string;
  signoff: string;
  /** Saludo que el equipo envía al responder por WhatsApp, en el idioma del viajero. */
  replyGreeting: (name: string) => string;
};

/** Textos del acuse al viajero, en los 8 idiomas del sitio. */
const LEAD_ACK_COPY: Record<string, LeadCopy> = {
  es: {
    subject: 'Recibimos tu solicitud | Vermilion Routes',
    greeting: (n) => `Hola ${n},`,
    body: 'Gracias por escribirnos. Un especialista de nuestro equipo en Quito revisará tu solicitud y te responderá en menos de 24 horas con ideas y precios para tu viaje.',
    whatsapp: '¿Prefieres hablar ya? Escríbenos por WhatsApp',
    signoff: 'El equipo de Vermilion Routes',
    replyGreeting: (n) => `Hola ${n}, te escribimos de Vermilion Routes. Gracias por tu solicitud de viaje.`,
  },
  en: {
    subject: 'We received your request | Vermilion Routes',
    greeting: (n) => `Hello ${n},`,
    body: 'Thank you for reaching out. A specialist from our Quito team will review your request and reply within 24 hours with ideas and prices for your trip.',
    whatsapp: 'Prefer to talk now? Message us on WhatsApp',
    signoff: 'The Vermilion Routes team',
    replyGreeting: (n) => `Hello ${n}, this is Vermilion Routes. Thank you for your travel request.`,
  },
  fr: {
    subject: 'Nous avons bien reçu votre demande | Vermilion Routes',
    greeting: (n) => `Bonjour ${n},`,
    body: 'Merci de nous avoir écrit. Un spécialiste de notre équipe à Quito étudiera votre demande et vous répondra sous 24 heures avec des idées et des tarifs pour votre voyage.',
    whatsapp: 'Vous préférez échanger tout de suite ? Écrivez-nous sur WhatsApp',
    signoff: "L'équipe Vermilion Routes",
    replyGreeting: (n) => `Bonjour ${n}, ici Vermilion Routes. Merci pour votre demande de voyage.`,
  },
  de: {
    subject: 'Wir haben Ihre Anfrage erhalten | Vermilion Routes',
    greeting: (n) => `Hallo ${n},`,
    body: 'Vielen Dank für Ihre Nachricht. Ein Spezialist unseres Teams in Quito prüft Ihre Anfrage und antwortet Ihnen innerhalb von 24 Stunden mit Ideen und Preisen für Ihre Reise.',
    whatsapp: 'Lieber gleich sprechen? Schreiben Sie uns auf WhatsApp',
    signoff: 'Ihr Vermilion Routes Team',
    replyGreeting: (n) => `Hallo ${n}, hier ist Vermilion Routes. Vielen Dank für Ihre Reiseanfrage.`,
  },
  it: {
    subject: 'Abbiamo ricevuto la tua richiesta | Vermilion Routes',
    greeting: (n) => `Ciao ${n},`,
    body: 'Grazie per averci scritto. Uno specialista del nostro team a Quito esaminerà la tua richiesta e ti risponderà entro 24 ore con idee e prezzi per il tuo viaggio.',
    whatsapp: 'Preferisci parlare subito? Scrivici su WhatsApp',
    signoff: 'Il team di Vermilion Routes',
    replyGreeting: (n) => `Ciao ${n}, ti scrive Vermilion Routes. Grazie per la tua richiesta di viaggio.`,
  },
  pt: {
    subject: 'Recebemos o seu pedido | Vermilion Routes',
    greeting: (n) => `Olá ${n},`,
    body: 'Obrigado por nos escrever. Um especialista da nossa equipe em Quito vai analisar o seu pedido e responder em até 24 horas com ideias e preços para a sua viagem.',
    whatsapp: 'Prefere falar agora? Escreva-nos pelo WhatsApp',
    signoff: 'A equipe Vermilion Routes',
    replyGreeting: (n) => `Olá ${n}, aqui é a Vermilion Routes. Obrigado pelo seu pedido de viagem.`,
  },
  ja: {
    subject: 'お問い合わせを受け付けました | Vermilion Routes',
    greeting: (n) => `${n} 様`,
    body: 'お問い合わせいただきありがとうございます。キトの専門スタッフが内容を確認し、24時間以内に旅行のご提案と料金をご連絡いたします。',
    whatsapp: 'すぐに相談したい方は WhatsApp でご連絡ください',
    signoff: 'Vermilion Routes チーム',
    replyGreeting: (n) => `${n} 様、Vermilion Routes です。旅行のお問い合わせありがとうございます。`,
  },
  zh: {
    subject: '我们已收到您的咨询 | Vermilion Routes',
    greeting: (n) => `${n} 您好，`,
    body: '感谢您的来信。我们基多团队的旅行专家将审阅您的需求，并在 24 小时内回复您行程建议和报价。',
    whatsapp: '想立即沟通？请通过 WhatsApp 联系我们',
    signoff: 'Vermilion Routes 团队',
    replyGreeting: (n) => `${n} 您好，这里是 Vermilion Routes。感谢您的旅行咨询。`,
  },
};

const getLeadCopy = (locale?: string): LeadCopy => LEAD_ACK_COPY[(locale || 'en').slice(0, 2)] || LEAD_ACK_COPY.en;

const COMPANY_WHATSAPP = '593960039156';

/** Primer nombre, recortado: va dentro de correos a terceros, así que no damos espacio para texto arbitrario. */
const firstNameOf = (name: string | undefined) => ((name || '').trim().split(/\s+/)[0] || '').slice(0, 40);

/**
 * Avisa al equipo (LEAD_ALERT_EMAIL, o SMTP_EMAIL si falta) de un lead nuevo, con enlaces para responder en un clic.
 * Lanza si el SMTP falla: quien la llame debe capturarlo para no romper el guardado del lead.
 */
export const sendNewLeadAlertEmail = async (lead: NewLeadNotification): Promise<LeadEmailResult> => {
  // ADMIN_EMAIL es el usuario del CRM y no tiene por qué ser un buzón real.
  const adminEmail = process.env.LEAD_ALERT_EMAIL || SMTP_EMAIL;
  if (!SMTP_PASSWORD) {
    console.warn(`[LeadEmail] SMTP_PASSWORD no configurado: no se envía el aviso del lead ${lead.leadId}.`);
    return { sent: false, reason: 'smtp_not_configured' };
  }
  if (!isRealEmail(adminEmail)) return { sent: false, reason: 'no_valid_recipient' };

  const copy = getLeadCopy(lead.locale);
  const waDigits = toWhatsAppDigits(lead.customerPhone);
  const waHref = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(copy.replyGreeting(firstNameOf(lead.customerName)))}`
    : null;
  const hasEmail = isRealEmail(lead.customerEmail);
  const mailHref = hasEmail
    ? `mailto:${encodeURIComponent(lead.customerEmail)}?subject=${encodeURIComponent(`Re: ${lead.tourTitle || 'Vermilion Routes'}`)}`
    : null;

  const rows: Array<[string, string | undefined]> = [
    ['Nombre', lead.customerName],
    ['Email', hasEmail ? lead.customerEmail : `${lead.customerEmail || '—'} (no válido o no lo dio)`],
    ['Teléfono / WhatsApp', lead.customerPhone],
    ['Tour / Interés', lead.tourTitle],
    ['Destino', lead.destination],
    ['Fechas / Plazo', lead.travelDates],
    ['Viajeros', lead.guestsCount],
    ['Idioma de la web', lead.locale],
    ['Origen', lead.source],
    ['Recibido', lead.createdAt],
    ['ID en Firestore', lead.leadId],
  ];

  const rowsHtml = rows
    .filter(([, v]) => v && String(v).trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;color:#71717a;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:6px 10px;color:#18181b;font-size:14px;">${escapeHtml(v)}</td></tr>`
    )
    .join('');

  const button = (href: string, label: string, bg: string) =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;margin:4px 6px 4px 0;padding:12px 20px;background:${bg};color:#ffffff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px;font-family:sans-serif;">${label}</a>`;

  const html = `
    <div style="font-family:sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:10px;padding:24px;">
      <h2 style="margin:0 0 4px 0;color:#065f46;font-size:20px;">🔔 Nuevo lead en la web</h2>
      <p style="margin:0 0 18px 0;color:#52525b;font-size:13px;">Responde rápido: un lead contestado en la primera hora convierte mucho más.</p>
      <div style="margin-bottom:18px;">
        ${waHref ? button(waHref, '💬 Responder por WhatsApp', '#16a34a') : ''}
        ${mailHref ? button(mailHref, '✉️ Responder por email', '#0f766e') : ''}
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:8px;">${rowsHtml}</table>
      ${lead.message ? `<div style="margin-top:16px;padding:14px;background:#f0fdf4;border-left:4px solid #16a34a;border-radius:6px;color:#18181b;font-size:14px;white-space:pre-wrap;">${escapeHtml(lead.message)}</div>` : ''}
      <p style="margin-top:20px;color:#a1a1aa;font-size:11px;">Aviso automático de vermilionroutes.com. El lead también queda guardado en Firestore y en el panel /admin.</p>
    </div>`;

  const subjectName = (lead.customerName || 'Sin nombre').slice(0, 60);
  const subjectTopic = (lead.destination || lead.tourTitle || 'Consulta').slice(0, 60);
  const info = await transporter.sendMail({
    from: `"Vermilion Leads" <${SMTP_EMAIL}>`,
    to: adminEmail,
    ...(hasEmail ? { replyTo: lead.customerEmail } : {}),
    subject: `🔔 Nuevo lead: ${subjectName} — ${subjectTopic}`,
    html,
  });
  return { sent: true, messageId: info.messageId };
};

/**
 * Acuse de recibo al viajero en su idioma. Solo si dejó un email real.
 * Lanza si el SMTP falla (quien la llame lo captura).
 */
export const sendLeadAcknowledgementEmail = async (lead: NewLeadNotification): Promise<LeadEmailResult> => {
  if (!SMTP_PASSWORD) return { sent: false, reason: 'smtp_not_configured' };
  if (!isRealEmail(lead.customerEmail)) return { sent: false, reason: 'no_valid_recipient' };

  const copy = getLeadCopy(lead.locale);
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#042f2e;color:#ffffff;padding:32px;border-radius:12px;">
      <h1 style="font-family:'Times New Roman',serif;color:#2dd4bf;font-weight:normal;font-size:26px;margin:0 0 20px 0;">Vermilion Routes</h1>
      <p style="font-size:16px;margin:0 0 12px 0;">${escapeHtml(copy.greeting(firstNameOf(lead.customerName)))}</p>
      <p style="font-size:15px;line-height:1.6;color:#ccfbf1;margin:0 0 24px 0;">${escapeHtml(copy.body)}</p>
      <a href="https://wa.me/${COMPANY_WHATSAPP}" style="display:inline-block;padding:12px 22px;background:#16a34a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:bold;">💬 ${escapeHtml(copy.whatsapp)}</a>
      <p style="margin-top:28px;color:#99f6e4;font-size:13px;">${escapeHtml(copy.signoff)}<br>+593 96 003 9156 · info@vermilionroutes.com</p>
    </div>`;

  const info = await transporter.sendMail({
    from: `"Vermilion Routes" <${SMTP_EMAIL}>`,
    to: lead.customerEmail,
    replyTo: SMTP_EMAIL,
    subject: copy.subject,
    html,
  });
  return { sent: true, messageId: info.messageId };
};

/** Registra un fallo de correo sin credenciales: solo nombre, código y mensaje. */
const logLeadEmailFailure = (label: string, leadId: string, err: unknown) => {
  const e = err as { name?: string; code?: string; responseCode?: number; message?: string } | undefined;
  console.error(`[LeadEmail] ${label} falló para el lead ${leadId}`, {
    name: e?.name,
    code: e?.code,
    responseCode: e?.responseCode,
    message: e?.message,
  });
};

export type NotifyNewLeadResult = {
  alert: LeadEmailResult | 'failed';
  acknowledgement: LeadEmailResult | 'failed' | 'skipped';
};

/**
 * Envía el aviso al equipo y, si se pide, el acuse al viajero. NUNCA lanza:
 * un fallo de correo no debe hacer fallar el guardado del lead.
 */
export const notifyNewLead = async (
  lead: NewLeadNotification,
  options: { acknowledgeCustomer?: boolean } = {}
): Promise<NotifyNewLeadResult> => {
  const [alert, acknowledgement] = await Promise.all([
    sendNewLeadAlertEmail(lead).catch((err): 'failed' => {
      logLeadEmailFailure('Aviso al equipo', lead.leadId, err);
      return 'failed';
    }),
    options.acknowledgeCustomer
      ? sendLeadAcknowledgementEmail(lead).catch((err): 'failed' => {
          logLeadEmailFailure('Acuse al viajero', lead.leadId, err);
          return 'failed';
        })
      : Promise.resolve<'skipped'>('skipped'),
  ]);
  if (alert !== 'failed' && alert.sent) {
    console.log(`[LeadEmail] Aviso del lead ${lead.leadId} enviado al equipo.`);
  }
  return { alert, acknowledgement };
};

