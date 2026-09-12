import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { BookingRequest } from '@/types';
import { sanitizeText, isValidEmail, isValidPhone } from './validation';
import { mockTours } from '@/data/mock';

const BOOKINGS_COLLECTION = 'bookings';

/**
 * Generates an official, standardized sequential booking code:
 * Format: R-[YEAR]-[TOUR_CODE]-[SEQUENTIAL]
 * Example: "R-2026-1.1-80"
 * Starts at sequential 80 for the current year.
 */
export async function generateBookingCode(tourId?: string, affiliateUsername?: string): Promise<string> {
  // 1. Determine tour code (default '1.1')
  let tourCode = '1.1';
  if (tourId) {
    const cleanId = tourId.split(',')[0].trim();
    const matchedTour = mockTours.find(
      (t) => t.id === cleanId || t.code === cleanId || (typeof t.title === 'string' && t.title === cleanId)
    );
    if (matchedTour?.code) {
      tourCode = matchedTour.code;
    }
  }

  // 2. Current year
  const year = new Date().getFullYear();

  // 3. Sequential counter starting strictly at 80
  let seqNumber = 80;

  if (db) {
    try {
      // Calculate sequence from real bookings in the database:
      // 0 bookings -> 80
      // 1 booking  -> 81
      // 2 bookings -> 82
      const bookingsSnap = await getDocs(collection(db, BOOKINGS_COLLECTION));
      const realBookingsCount = bookingsSnap.size;
      seqNumber = 80 + realBookingsCount;

      // Candidate official code
      const candidateCode = `R-${year}-${tourCode}-${seqNumber}`;

      // Synchronize settings/booking_counters
      try {
        const counterDocRef = doc(db, 'settings', 'booking_counters');
        await setDoc(counterDocRef, { [`seq_${year}`]: seqNumber, [String(year)]: seqNumber, lastUpdated: new Date().toISOString() }, { merge: true });
      } catch (_) {}

      return candidateCode;
    } catch (e) {
      console.warn('[generateBookingCode] Firestore count notice, using baseline seq 80:', e);
      seqNumber = 80;
    }
  }

  return `R-${year}-${tourCode}-${seqNumber}`;
}

/**
 * Creates a new booking in Firestore after sanitizing fields.
 * Uses the booking reference code as the Firestore Document ID (e.g. "R-2026-1.1-80").
 */
export async function createBookingInFirestore(
  bookingData: Omit<BookingRequest, 'id' | 'status' | 'createdAt'> & { status?: BookingRequest['status'] }
): Promise<string> {
  let sanitizedName = sanitizeText(bookingData.customerName);
  let sanitizedEmail = sanitizeText(bookingData.customerEmail);
  const sanitizedPhone = sanitizeText(bookingData.customerPhone);
  const sanitizedMessage = sanitizeText(bookingData.message || '');
  const sanitizedTourTitle = sanitizeText(bookingData.tourTitle);
  const sanitizedTourId = sanitizeText(bookingData.tourId);
  const sanitizedDestination = sanitizeText(bookingData.destination || '');
  const sanitizedTravelDates = sanitizeText(bookingData.travelDates || '');
  const sanitizedGuestsCount = sanitizeText(bookingData.guestsCount || '');

  if (!sanitizedName || sanitizedName.length < 2) {
    sanitizedName = 'Viajero Distinguido';
  }

  if (!isValidEmail(sanitizedEmail)) {
    sanitizedEmail = 'guest@vermilionroutes.com';
  }

  if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
    throw new Error('Please enter a valid phone number (e.g. +1 555 000 0000).');
  }

  const refCode = bookingData.refCode || bookingData.bookingCode || (await generateBookingCode(sanitizedTourId));
  const amount = Number(bookingData.amountPaid || bookingData.paidAmount || bookingData.totalAmount || 0);
  const dates = sanitizedTravelDates || 'To be confirmed';
  const pax = Number(bookingData.passengersCount) || (parseInt(sanitizedGuestsCount) || 2);

  const payload: BookingRequest = {
    id: refCode,
    refCode,
    bookingCode: refCode,
    tourId: sanitizedTourId,
    tourTitle: sanitizedTourTitle,
    customerName: sanitizedName,
    customerEmail: sanitizedEmail,
    customerPhone: sanitizedPhone,
    travelDates: dates,
    travelStartDate: dates,
    travelEndDate: dates,
    guestsCount: sanitizedGuestsCount || `${pax} Travelers`,
    passengersCount: pax,
    destination: sanitizedDestination || 'Ecuador & Galápagos',
    message: sanitizedMessage,
    amountPaid: amount,
    paidAmount: amount,
    totalAmount: amount,
    paymentMethod: bookingData.paymentMethod,
    paymentStatus: bookingData.paymentStatus || 'pending_verification',
    transferRef: bookingData.transferRef,
    affiliateCode: bookingData.affiliateCode,
    discountApplied: bookingData.discountApplied,
    receiptUrl: bookingData.receiptUrl,
    status: bookingData.status || (bookingData.paymentStatus === 'confirmed' ? 'confirmed' : 'pending'),
    createdAt: new Date().toISOString()
  };

  if (db) {
    const docRef = doc(db, BOOKINGS_COLLECTION, refCode);
    await setDoc(docRef, payload, { merge: true });
    return refCode;
  }
  return refCode;
}

/**
 * Subscribes to real-time updates for the `bookings` collection in Firestore (Admin access).
 */
export function subscribeBookingsFromFirestore(
  onUpdate: (bookings: BookingRequest[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (typeof window === 'undefined' || !db) {
    onUpdate([]);
    return () => {};
  }

  try {
    const bookingsRef = collection(db, BOOKINGS_COLLECTION);
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const bookings: BookingRequest[] = [];
        snapshot.forEach((docSnap) => {
          bookings.push({ id: docSnap.id, ...docSnap.data() } as BookingRequest);
        });
        onUpdate(bookings);
      },
      (err) => {
        console.warn('Firestore bookings subscription error:', err);
        if (onError) onError(err);
      }
    );
    return unsubscribe;
  } catch (err: any) {
    console.warn('Failed to subscribe to Firestore bookings:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Updates status of a booking request (e.g., 'contacted', 'confirmed', 'cancelled').
 */
export async function updateBookingStatusInFirestore(
  id: string,
  status: BookingRequest['status']
): Promise<void> {
  const docRef = doc(db, BOOKINGS_COLLECTION, id);
  await updateDoc(docRef, { status });
}

/**
 * Deletes a booking document from Firestore.
 */
export async function deleteBookingFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, BOOKINGS_COLLECTION, id);
  await deleteDoc(docRef);
}
