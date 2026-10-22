import { NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { runAfterResponse } from '@/lib/runAfterResponse';
import { notifyNewLead } from '@/lib/email';
import { isValidEmail, isValidPhone, sanitizeText } from '@/lib/validation';
import { toLeadEmailStatus } from '@/lib/crm/leadEmailStatus';
import { getAdminDb } from '@/lib/firebaseAdmin';

/**
 * Descarga del itinerario en PDF de un tour (LeadCaptureModal).
 * Guarda el lead en `leads`, avisa al equipo, envía al viajero un acuse con el enlace
 * del tour y deja en el lead si cada correo salió (lo muestra el CRM).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: los bots rellenan campos ocultos. Se responde "ok" sin guardar nada.
  if (body._hp_trap || body.website_url) {
    return NextResponse.json({ success: true });
  }

  const name = sanitizeText(String(body.name || '')).slice(0, 120);
  const email = sanitizeText(String(body.email || '')).trim().toLowerCase().slice(0, 200);
  const phone = sanitizeText(String(body.phone || '')).slice(0, 40);
  const tourId = sanitizeText(String(body.tourId || '')).replace(/[^a-z0-9-]/gi, '').slice(0, 120);
  const tourName = sanitizeText(String(body.tourName || tourId || 'Tour')).slice(0, 200);
  const destination = sanitizeText(String(body.destination || 'Ecuador & Galápagos')).slice(0, 120);
  const rawLocale = String(body.locale || 'en');
  const locale = ['es', 'en', 'fr', 'de', 'zh', 'it', 'pt', 'ja'].includes(rawLocale) ? rawLocale : 'en';
  const estimatedBudget = Math.max(0, Math.min(Number(body.estimatedBudget) || 0, 100000));

  if (name.length < 2) return NextResponse.json({ success: false, error: 'name' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ success: false, error: 'email' }, { status: 400 });
  if (!isValidPhone(phone)) return NextResponse.json({ success: false, error: 'phone' }, { status: 400 });
  if (!db) return NextResponse.json({ success: false, error: 'db_unavailable' }, { status: 503 });

  const createdAt = new Date().toISOString();
  const ref = await addDoc(collection(db, 'leads'), {
    name,
    customerName: name,
    email,
    customerEmail: email,
    phone,
    customerPhone: phone,
    tourId,
    tourName,
    destination,
    estimatedBudget,
    passengersCount: 2,
    status: 'new',
    source: 'pdf_download',
    locale,
    notes: `Descargó el itinerario en PDF de "${tourName}" (${locale}).`,
    createdAt,
  });

  const tourUrl = tourId ? `https://www.vermilionroutes.com/${locale}/tours/${tourId}` : undefined;

  runAfterResponse(async () => {
    const result = await notifyNewLead(
      {
        leadId: ref.id,
        source: 'pdf_download',
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        tourTitle: tourName,
        destination,
        message: `Descargó el itinerario en PDF de "${tourName}". Escríbele mientras lo está leyendo.`,
        locale,
        tourUrl,
        createdAt,
      },
      { acknowledgeCustomer: true }
    );
    try {
      await getAdminDb().collection('leads').doc(ref.id).update({ emailStatus: toLeadEmailStatus(result) });
    } catch (err) {
      console.warn('[leads/itinerary] No se pudo guardar el estado del correo:', err instanceof Error ? err.message : err);
    }
  });

  return NextResponse.json({ success: true, leadId: ref.id });
}
