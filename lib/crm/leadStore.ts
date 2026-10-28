/**
 * Escritura de leads y solicitudes web desde el SERVIDOR.
 *
 * Usa el Firebase Admin SDK (no depende de las reglas de Firestore ni de que haya sesión).
 * Si el Admin SDK no está disponible en el runtime, cae al SDK de cliente para no perder el lead.
 * Si ambos fallan, el error SUBE a la ruta: nunca se responde "ok" sin haber guardado.
 *
 * - `saveWebInquiry` -> colección `bookings` con `tourId` de formulario de leads (el CRM lo muestra
 *   en el pipeline gracias a isWebInquiry, lib/crm/webInquiry.ts).
 * - `saveLead` -> colección `leads` (guía PDF, banner, blog...) con estado `new`.
 */
import { getAdminDb } from '@/lib/firebaseAdmin';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { leadsRepository } from '@/lib/services/DatabaseService';

export type LeadPayload = Record<string, unknown>;

function withTimestamps(data: LeadPayload): LeadPayload {
  const now = new Date().toISOString();
  return { status: 'new', createdAt: now, updatedAt: now, ...data };
}

/** Guarda un lead en `leads`. Devuelve el id del documento. */
export async function saveLead(data: LeadPayload): Promise<string> {
  const payload = withTimestamps(data);
  try {
    const ref = await getAdminDb().collection('leads').add(payload);
    return ref.id;
  } catch (adminErr) {
    console.error('[leadStore] Admin SDK no pudo guardar en leads, reintento con cliente:', adminErr);
    if (!db) throw adminErr;
    const ref = await addDoc(collection(db, 'leads'), payload);
    return ref.id;
  }
}

/** Guarda una solicitud web (formulario de contacto, cotización, bot, WhatsApp) en `bookings`. */
export async function saveWebInquiry(data: LeadPayload): Promise<string> {
  const payload = { status: 'pending', createdAt: new Date().toISOString(), ...data };
  try {
    const ref = await getAdminDb().collection('bookings').add(payload);
    return ref.id;
  } catch (adminErr) {
    console.error('[leadStore] Admin SDK no pudo guardar la solicitud, reintento con cliente:', adminErr);
    return leadsRepository.create(payload as any);
  }
}
