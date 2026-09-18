'use client';

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import {
  SystemUser,
  CrmLead,
  CrmBooking,
  RunSheetDay,
  PassengerProfile,
  UserRole,
  PakariAmenityItem,
  WhatsAppTemplate,
  GenealogyNode,
} from '@/types/crm';

// Default initial corporate users
const INITIAL_USERS: SystemUser[] = [
  {
    id: 'pablofgarciaf@gmail.com',
    email: 'pablofgarciaf@gmail.com',
    name: 'Pablo Fabricio García Flores',
    role: 'super',
    roles: ['super', 'admin', 'operator', 'editor'],
    authUid: 'DmwBje9JwvVJKbe5rr8ExCS823S2',
    phone: '+593994048458',
    cedula: '1721790721',
    address: 'Quito, Ecuador',
    isActive: true,
    assignedLeadsCount: 4,
    assignedBookingsCount: 3,
    createdAt: '2026-08-31T00:00:00.000Z',
  },
  {
    id: 'info@vermilionroutes.com',
    email: 'info@vermilionroutes.com',
    name: 'Jairo Ludeña (Operaciones & Concierge)',
    role: 'admin',
    roles: ['admin', 'operator', 'concierge'],
    phone: '+593960039156',
    address: 'Calle Seco 3, 28007 Madrid, España / Coral Tour Quito',
    isActive: true,
    assignedLeadsCount: 6,
    assignedBookingsCount: 5,
    createdAt: '2026-08-31T00:00:00.000Z',
  },
  {
    id: 'gsanchez@plustelesmart.com.ec',
    email: 'gsanchez@plustelesmart.com.ec',
    name: 'Medardo Sánchez (Dirección Financiera)',
    role: 'financial',
    roles: ['financial', 'admin'],
    phone: '+1 (786) 555-0199',
    address: 'Florida, USA (Citibank Checking 9119836186)',
    isActive: true,
    assignedLeadsCount: 2,
    assignedBookingsCount: 4,
    createdAt: '2026-09-01T00:00:00.000Z',
  },
];

const INITIAL_LEADS: CrmLead[] = [
  {
    id: 'lead-101',
    customerName: 'Pablo Fabricio García Flores',
    customerEmail: 'pablofgarciaf@gmail.com',
    customerPhone: '+593 99 404 8458',
    country: 'Ecuador',
    destination: 'Galapagos',
    passengersCount: 2,
    estimatedBudget: 1500,
    travelDates: '18 Sep - 22 Sep 2026',
    status: 'negotiation',
    assignedOperatorId: 'info@vermilionroutes.com',
    assignedOperatorName: 'Jairo Ludeña',
    notes: 'Reserva confirmada en web. Interés en tour Galápagos Magia 4 Días + extensión.',
    source: 'affiliate_referral',
    affiliateReferralCode: 'pablo.g',
    passengerDetails: {
      fullName: 'Pablo Fabricio García Flores',
      passportNumber: '1721790721',
      nationality: 'Ecuatoriana',
      dietaryRestrictions: 'Ninguna',
      fitnessLevel: 'activo',
      hatSize: '58 (M)',
    },
    createdAt: '2026-09-08T10:00:00.000Z',
    updatedAt: '2026-09-08T14:00:00.000Z',
  },
  {
    id: 'lead-102',
    customerName: 'Jairo Ludeña / Coral Tour Madrid',
    customerEmail: 'info@vermilionroutes.com',
    customerPhone: '+593 96 003 9156',
    country: 'España',
    destination: 'Galapagos & Andes',
    passengersCount: 4,
    estimatedBudget: 4760,
    travelDates: '05 Oct - 17 Oct 2026',
    status: 'itinerary_sent',
    assignedOperatorId: 'info@vermilionroutes.com',
    assignedOperatorName: 'Jairo Ludeña',
    notes: 'Expedición privada Grand Tour 12 días para grupo VIP desde Madrid.',
    source: 'landing_popup',
    passengerDetails: {
      fullName: 'Jairo Ludeña',
      nationality: 'Española / Ecuatoriana',
      dietaryRestrictions: 'Ninguna',
      fitnessLevel: 'activo',
      hatSize: '58 (M)',
    },
    createdAt: '2026-09-07T08:15:00.000Z',
    updatedAt: '2026-09-08T12:00:00.000Z',
  },
  {
    id: 'lead-103',
    customerName: 'Medardo Sánchez',
    customerEmail: 'gsanchez@plustelesmart.com.ec',
    customerPhone: '+1 (786) 555-0199',
    country: 'Estados Unidos',
    destination: 'Andes & Volcanes Luxury',
    passengersCount: 2,
    estimatedBudget: 2400,
    travelDates: '15 Nov - 22 Nov 2026',
    status: 'new',
    assignedOperatorId: 'info@vermilionroutes.com',
    assignedOperatorName: 'Jairo Ludeña',
    notes: 'Coordinando pago vía transferencia bancaria Citibank USA / Zelle.',
    source: 'affiliate_referral',
    affiliateReferralCode: 'ing.pablo',
    createdAt: '2026-09-08T09:00:00.000Z',
    updatedAt: '2026-09-08T09:00:00.000Z',
  },
];

const INITIAL_BOOKINGS: CrmBooking[] = [];

const INITIAL_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'wa-1',
    lang: 'es',
    category: 'welcome',
    title: 'Bienvenida & Primer Contacto',
    body: '¡Hola {nombre}! ✨ Soy {concierge} de Vermilion Routes Ecuador. Hemos recibido tu solicitud para explorar {destino}. Estamos diseñando una propuesta exclusiva y a tu medida. ¿Tienes 5 minutos para una breve llamada o prefieres que te enviemos el itinerario en PDF por aquí?',
  },
  {
    id: 'wa-2',
    lang: 'es',
    category: 'quote',
    title: 'Envío de Cotización VIP',
    body: 'Estimado/a {nombre}, es un placer compartir contigo el diseño preliminar de tu expedición privada "{tour}". Incluye alojamientos boutique seleccionados, chofer privado y concierge en ruta. Puedes ver los detalles aquí: {link}. Quedo muy atento a cualquier ajuste.',
  },
  {
    id: 'wa-3',
    lang: 'en',
    category: 'welcome',
    title: 'Welcome & Initial Touch',
    body: 'Hello {nombre}! ✨ This is {concierge} with Vermilion Routes Ecuador. We received your private inquiry for {destino}. We are currently curating your bespoke itinerary. Would you prefer to review the proposal via PDF here or schedule a 10-minute discovery call?',
  },
  {
    id: 'wa-4',
    lang: 'de',
    category: 'welcome',
    title: 'Willkommen & Erstkontakt',
    body: 'Guten Tag {nombre}! ✨ Mein Name ist {concierge} von Vermilion Routes Ecuador. Wir haben Ihre Anfrage für {destino} erhalten und bereiten Ihre maßgeschneiderte Luxusexpedition vor. Wir freuen uns sehr darauf, Ihre Traumreise zu gestalten.',
  },
];

const INITIAL_GENEALOGY: GenealogyNode = {
  username: 'pablo.g',
  name: 'Pablo Fabricio García Flores (Founder)',
  email: 'pablofgarciaf@gmail.com',
  level: 0,
  rank: 'Founder & Root',
  totalSales: 0,
  recruitsCount: 0,
  status: 'active',
  children: [],
};

export function useCrmData() {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [bookings, setBookings] = useState<CrmBooking[]>(INITIAL_BOOKINGS);
  const [waTemplates] = useState<WhatsAppTemplate[]>(INITIAL_WHATSAPP_TEMPLATES);
  const [genealogy, setGenealogy] = useState<GenealogyNode>(INITIAL_GENEALOGY);
  const [loading, setLoading] = useState(false);

  // Firestore & API Synchronization
  useEffect(() => {
    // 1. Fetch persistent server-side bookings
    fetch('/api/crm/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
      })
      .catch((err) => console.warn('[useCrmData] API sync notice:', err));

    let unsubscribeUsers: (() => void) | undefined;
    let unsubscribeLeads: (() => void) | undefined;
    let unsubscribeBookings: (() => void) | undefined;
    let unsubscribeAffiliates: (() => void) | undefined;

    try {
      if (db) {
        const affCol = collection(db, 'affiliates');
        unsubscribeAffiliates = onSnapshot(affCol, (snap) => {
          if (!snap.empty) {
            const affList: any[] = [];
            snap.forEach((d) => affList.push({ id: d.id, ...d.data() }));
            const root = affList.find((a) => a.username === 'pablo.g') || affList[0];
            if (root) {
              const children = affList
                .filter((a) => a.parentId === root.username && a.username !== root.username)
                .map((c) => ({
                  username: c.username,
                  name: c.name || c.username,
                  email: c.email || '',
                  level: 1,
                  rank: c.rank || 'Standard',
                  totalSales: Number(c.monthlyVolume || c.salesCount || 0),
                  recruitsCount: 0,
                  status: (c.isActive ? 'active' : 'inactive') as 'active' | 'inactive',
                  children: [],
                }));

              setGenealogy({
                username: root.username,
                name: root.name || 'Pablo Fabricio García Flores (Founder)',
                email: root.email || 'pablofgarciaf@gmail.com',
                level: 0,
                rank: 'Founder & Root',
                totalSales: Number(root.salesCount || root.monthlyVolume || 0),
                recruitsCount: children.length,
                status: 'active',
                children,
              });
            }
          }
        }, (err) => console.warn('[useCrmData] affiliates genealogy notice:', err.message));

        const usersCol = collection(db, 'usuarios');
        unsubscribeUsers = onSnapshot(usersCol, (snap) => {
          if (!snap.empty) {
            const list: SystemUser[] = [];
            snap.forEach((d) => list.push({ ...(d.data() as SystemUser), id: d.id }));
            setUsers(list);
          }
        }, (err) => console.warn('[useCrmData] usuarios notice:', err.message));

        const leadsCol = collection(db, 'leads');
        unsubscribeLeads = onSnapshot(leadsCol, (snap) => {
          if (!snap.empty) {
            const list: CrmLead[] = [];
            snap.forEach((d) => list.push({ ...(d.data() as CrmLead), id: d.id }));
            setLeads(list);
          }
        }, (err) => console.warn('[useCrmData] leads notice:', err.message));

        const bookingsCol = collection(db, 'bookings');
        unsubscribeBookings = onSnapshot(bookingsCol, (snap) => {
          if (!snap.empty) {
            const list: CrmBooking[] = [];
            const seenCodes = new Set<string>();

            snap.forEach((d) => {
              const raw = d.data() as any;
              const refCode = String(raw.bookingCode || raw.refCode || `VR-${d.id.slice(-6)}`).trim();

              // Auto-purge dummy test records
              const isTest =
                d.id.toUpperCase().includes('TEST') ||
                refCode.toUpperCase().includes('TEST') ||
                String(raw.customerName || '').toLowerCase().includes('test customer');

              if (isTest) {
                import('firebase/firestore').then(({ deleteDoc, doc: fDoc }) => {
                  deleteDoc(fDoc(db, 'bookings', d.id)).catch(() => {});
                });
                return;
              }

              // Deduplicate so duplicate documents with same refCode don't collide
              if (seenCodes.has(refCode)) {
                import('firebase/firestore').then(({ deleteDoc, doc: fDoc }) => {
                  deleteDoc(fDoc(db, 'bookings', d.id)).catch(() => {});
                });
                return;
              }
              seenCodes.add(refCode);

              const amount = Number(raw.paidAmount || raw.amountPaid || raw.totalAmount || 0);
              const pax = Number(raw.passengersCount) || (typeof raw.guestsCount === 'string' ? parseInt(raw.guestsCount) : 2) || 2;
              const dates = raw.travelStartDate || raw.travelDates || 'Por coordinar';

              const normalized: CrmBooking = {
                id: d.id,
                bookingCode: refCode,
                tourTitle: raw.tourTitle || 'Expedición Vermilion',
                destination: raw.destination || 'Galapagos & Andes',
                customerName: raw.customerName || 'Viajero Vermilion',
                customerEmail: raw.customerEmail || '',
                customerPhone: raw.customerPhone || '',
                passengersCount: pax,
                totalAmount: Number(raw.totalAmount || amount || 0),
                paidAmount: amount,
                directCosts: Number(raw.directCosts || amount * 0.55),
                status: (raw.status === 'confirmed' ? 'deposit_confirmed' : (raw.status || 'deposit_confirmed')),
                travelStartDate: dates,
                travelEndDate: raw.travelEndDate || dates,
                assignedOperatorId: raw.assignedOperatorId || '',
                assignedOperatorName: raw.assignedOperatorName || '',
                affiliateId: raw.affiliateCode || raw.affiliateId || '',
                affiliateCommissionAmount: raw.affiliateCommissionAmount || (raw.affiliateCode ? Math.round(amount * 0.1) : 0),
                affiliateCommissionStatus: raw.affiliateCommissionStatus || (raw.affiliateCode ? 'ready_for_review' : 'pending'),
                operatorCommissionAmount: raw.operatorCommissionAmount || 250,
                operatorCommissionStatus: raw.operatorCommissionStatus || 'pending',
                paymentReference: raw.transferRef || raw.paymentReference || refCode,
                vipGiftAssigned: raw.vipGiftAssigned || 'Pakari Imperial Edition & Sombrero Montecristi',
                vipGiftDelivered: !!raw.vipGiftDelivered,
                runSheet: raw.runSheet || [],
                passengersList: raw.passengersList || [],
                createdAt: raw.createdAt || new Date().toISOString(),
                updatedAt: raw.updatedAt || new Date().toISOString(),
                ...raw,
              };
              list.push(normalized);
            });
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            if (list.length > 0) {
              setBookings(list);
            }
          }
        }, (err) => console.warn('[useCrmData] bookings notice:', err.message));

      }
    } catch (e) {
      console.warn('[useCrmData] Firestore init notice:', e);
    }

    return () => {
      if (unsubscribeUsers) unsubscribeUsers();
      if (unsubscribeLeads) unsubscribeLeads();
      if (unsubscribeBookings) unsubscribeBookings();
      if (unsubscribeAffiliates) unsubscribeAffiliates();
    };
  }, []);

  // Update Lead Status
  const updateLeadStatus = useCallback(async (leadId: string, newStatus: CrmLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l))
    );
    if (db) {
      try {
        await updateDoc(doc(db, 'leads', leadId), { status: newStatus, updatedAt: new Date().toISOString() });
      } catch (err) {
        console.warn('Could not sync lead status to firestore:', err);
      }
    }
  }, []);

  // Assign Operator to Booking
  const assignOperatorToBooking = useCallback(async (bookingId: string, operatorEmail: string, operatorName: string) => {
    const updates = { assignedOperatorId: operatorEmail, assignedOperatorName: operatorName, updatedAt: new Date().toISOString() };
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ...updates } : b))
    );
    fetch('/api/crm/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bookingId, updates }),
    }).catch((e) => console.warn('[useCrmData] API update notice:', e));
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), updates);
      } catch (err) {
        console.warn('Could not sync operator assignment to firestore:', err);
      }
    }
  }, []);

  // Operator Signals Trip Completed
  const signalTripCompleted = useCallback(async (bookingId: string, operatorName: string) => {
    const updates = {
      status: 'completed' as const,
      operatorCommissionStatus: 'ready_for_review' as const,
      updatedAt: new Date().toISOString(),
    };
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? {
        ...b,
        ...updates,
        affiliateCommissionStatus: b.affiliateCommissionStatus === 'paid' ? 'paid' : 'ready_for_review',
      } : b))
    );
    fetch('/api/crm/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bookingId, updates }),
    }).catch((e) => console.warn('[useCrmData] API update notice:', e));
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), updates);
      } catch (err) {
        console.warn('Could not sync trip completion to firestore:', err);
      }
    }
  }, []);

  // Admin approves & marks commission as paid with bank reference
  const approveAndPayCommission = useCallback(async (
    bookingId: string,
    beneficiaryType: 'affiliate' | 'operator',
    paymentRef: string
  ) => {
    const updatePayload: any = {
      paymentReference: paymentRef,
      updatedAt: new Date().toISOString(),
    };
    if (beneficiaryType === 'affiliate') updatePayload.affiliateCommissionStatus = 'paid';
    if (beneficiaryType === 'operator') updatePayload.operatorCommissionStatus = 'paid';

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          ...updatePayload,
        };
      })
    );
    fetch('/api/crm/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bookingId, updates: updatePayload }),
    }).catch((e) => console.warn('[useCrmData] API update notice:', e));
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), updatePayload);
      } catch (err) {
        console.warn('Could not sync commission payment to firestore:', err);
      }
    }
  }, []);

  // Mark Pakari Amenity Delivered
  const markPakariDelivered = useCallback(async (bookingId: string, operatorName: string) => {
    const now = new Date().toISOString();
    const updates = { vipGiftDelivered: true, vipGiftDeliveredAt: now, updatedAt: now };
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, ...updates } : b
      )
    );
    fetch('/api/crm/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bookingId, updates }),
    }).catch((e) => console.warn('[useCrmData] API update notice:', e));
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), updates);
      } catch (err) {
        console.warn('Could not sync amenity delivery to firestore:', err);
      }
    }
  }, []);

  // Update RunSheet Day Status
  const updateRunSheetDayStatus = useCallback(async (
    bookingId: string,
    dayNumber: number,
    newStatus: RunSheetDay['status'],
    notes?: string
  ) => {
    const now = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId || !b.runSheet) return b;
        const updatedRunSheet = b.runSheet.map((d) =>
          d.dayNumber === dayNumber ? { ...d, status: newStatus, notes: notes || d.notes } : d
        );
        return { ...b, runSheet: updatedRunSheet, updatedAt: now };
      })
    );
  }, []);

  // Create new user in 'usuarios'
  const createSystemUser = useCallback(async (newUser: Omit<SystemUser, 'createdAt'>) => {
    const userDoc: SystemUser = {
      ...newUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev.filter((u) => u.email !== userDoc.email), userDoc]);
    if (db) {
      try {
        await setDoc(doc(db, 'usuarios', userDoc.email.toLowerCase().trim()), userDoc);
      } catch (err) {
        console.error('Error creating user in firestore:', err);
        throw err;
      }
    }
    return userDoc;
  }, []);

  // Update Booking Status
  const updateBookingStatus = useCallback(async (bookingId: string, newStatus: CrmBooking['status']) => {
    const updates = { status: newStatus, updatedAt: new Date().toISOString() };
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ...updates } : b))
    );
    fetch('/api/crm/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bookingId, updates }),
    }).catch((e) => console.warn('[useCrmData] API update notice:', e));
    if (db) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), updates);
      } catch (err) {
        console.warn('Could not sync booking status to firestore:', err);
      }
    }
  }, []);

  return {
    users,
    leads,
    bookings,
    waTemplates,
    genealogy,
    loading,
    updateLeadStatus,
    updateBookingStatus,
    assignOperatorToBooking,
    signalTripCompleted,
    approveAndPayCommission,
    markPakariDelivered,
    updateRunSheetDayStatus,
    createSystemUser,
  };
}
