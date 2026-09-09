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
 * Generates a standardized booking code:
 * Format: [tourCode]-[year]-[salesNumberPadded]
 * Example: "1.1-2026-0001"
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

  // 2. Determine current year
  const year = new Date().getFullYear();

  // 3. Determine consecutive sales number for the affiliate (starting at 1)
  let salesNumber = 1;
  const cleanAffiliate = affiliateUsername?.trim().toLowerCase();
  if (cleanAffiliate && db) {
    try {
      const affDoc = await getDoc(doc(db, 'affiliates', cleanAffiliate));
      if (affDoc.exists()) {
        const count = Number(affDoc.data()?.salesCount || 0);
        salesNumber = count + 1;
      }
    } catch (e) {
      console.warn('[generateBookingCode] Affiliate lookup notice:', e);
    }
  }

  let paddedNumber = String(salesNumber).padStart(4, '0');
  let candidateCode = `${tourCode}-${year}-${paddedNumber}`;

  // 4. Verify that the candidate code is not already assigned to an existing booking
  if (db) {
    try {
      let isTaken = true;
      let safetyCounter = 0;
      while (isTaken && safetyCounter < 50) {
        safetyCounter++;
        const qTaken = query(collection(db, BOOKINGS_COLLECTION), where('refCode', '==', candidateCode));
        const snapTaken = await getDocs(qTaken);
        if (snapTaken.empty) {
          isTaken = false;
        } else {
          salesNumber += 1;
          paddedNumber = String(salesNumber).padStart(4, '0');
          candidateCode = `${tourCode}-${year}-${paddedNumber}`;
        }
      }
    } catch (e) {
      // Non-blocking fallback
    }
  }

  return candidateCode;
}

/**
 * Creates a new booking in Firestore after sanitizing fields.
 */
export async function createBookingInFirestore(
  bookingData: Omit<BookingRequest, 'id' | 'status' | 'createdAt'> & { status?: BookingRequest['status'] }
): Promise<string> {
  const sanitizedName = sanitizeText(bookingData.customerName);
  const sanitizedEmail = sanitizeText(bookingData.customerEmail);
  const sanitizedPhone = sanitizeText(bookingData.customerPhone);
  const sanitizedMessage = sanitizeText(bookingData.message || '');
  const sanitizedTourTitle = sanitizeText(bookingData.tourTitle);
  const sanitizedTourId = sanitizeText(bookingData.tourId);
  const sanitizedDestination = sanitizeText(bookingData.destination || '');
  const sanitizedTravelDates = sanitizeText(bookingData.travelDates || '');
  const sanitizedGuestsCount = sanitizeText(bookingData.guestsCount || '');

  if (!sanitizedName || sanitizedName.length < 2) {
    throw new Error('Customer name is required and must be at least 2 characters.');
  }

  if (!isValidEmail(sanitizedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
    throw new Error('Please enter a valid phone number (e.g. +1 555 000 0000).');
  }

  const refCode = bookingData.refCode || bookingData.bookingCode || `VR-${Date.now().toString().slice(-6)}`;
  const amount = Number(bookingData.amountPaid || bookingData.paidAmount || bookingData.totalAmount || 0);
  const dates = sanitizedTravelDates || 'To be confirmed';
  const pax = Number(bookingData.passengersCount) || (parseInt(sanitizedGuestsCount) || 2);

  const payload: BookingRequest = {
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

  const bookingsRef = collection(db, BOOKINGS_COLLECTION);
  const docRef = await addDoc(bookingsRef, payload);
  return docRef.id;
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
