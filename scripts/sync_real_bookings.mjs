import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  query,
  where
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');
const env = fs.readFileSync(envPath, 'utf8');
const getVal = (k) => {
  const m = env.match(new RegExp(k + '=(.*)'));
  return m ? m[1].trim().replace(/["']/g, '') : '';
};

const firebaseConfig = {
  apiKey: getVal('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: getVal('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: getVal('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: getVal('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getVal('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getVal('NEXT_PUBLIC_FIREBASE_APP_ID')
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function syncRealSales() {
  console.log('🔄 Autenticando para sincronizar ventas...');
  const cred = await signInAnonymously(auth);
  console.log('✅ Autenticado con UID:', cred.user.uid);

  // The 2 real paid sessions from Stripe:
  const realSessions = [
    {
      id: 'VR-2026-0917-PABLO',
      sessionId: 'cs_test_a1LT5X77VD8jUuuWVaPKQDTwPh1hKjDMzHRSTWLqTgmadUT16hswehaet0',
      refCode: 'VR-2026-0917-PABLO',
      bookingCode: 'VR-2026-0917-PABLO',
      tourTitle: 'Encuentro Galápagos: 4 Días De Magia',
      tourId: 'galapagos-6days',
      destination: 'Galápagos (Santa Cruz & Isabela)',
      customerName: 'Pablo Fabricio García Flores',
      customerEmail: 'pablofgarciaf@gmail.com',
      customerPhone: '+593 99 404 8458',
      passengersCount: 2,
      travelStartDate: '2026-09-17',
      travelEndDate: '2026-09-20',
      travelDates: '17 Sep - 20 Sep 2026',
      guestsCount: '2 Travelers',
      amountPaid: 1.00,
      paidAmount: 1.00,
      totalAmount: 1.00,
      directCosts: 0.55,
      affiliateId: 'pablo.g',
      affiliateCommissionAmount: 0.10,
      affiliateCommissionStatus: 'ready_for_review',
      operatorCommissionAmount: 0.15,
      operatorCommissionStatus: 'pending',
      paymentMethod: 'card',
      paymentStatus: 'confirmed',
      transferRef: 'cs_test_a1LT5X77VD8jUuuWVaPKQDTwPh1hKjDMzHRSTWLqTgmadUT16hswehaet0',
      affiliateCode: 'pablo.g',
      discountApplied: true,
      status: 'deposit_confirmed',
      assignedOperatorId: 'info@vermilionroutes.com',
      assignedOperatorName: 'Jairo Ludeña (Concierge)',
      notes: 'Primera venta real confirmada vía Stripe por el fundador. Tour Galápagos 4 Días.',
      createdAt: '2026-09-08T19:57:02.000Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'VR-1788898643277',
      sessionId: 'cs_test_a11gB5vnQX4M3eXa5x85BHcHq20zCsYRXpHfDAN49uPmj4fBUBISi76aB8',
      refCode: 'VR-1788898643277',
      bookingCode: 'VR-1788898643277',
      tourTitle: 'Encuentro Galápagos: 4 Días De Magia',
      tourId: 'galapagos-6days',
      destination: 'Galápagos (Santa Cruz & Isabela)',
      customerName: 'Pablo Fabricio García Flores',
      customerEmail: 'pablofgarciaf@gmail.com',
      customerPhone: '+593 99 404 8458',
      passengersCount: 2,
      travelStartDate: '2026-09-12',
      travelEndDate: '2026-09-15',
      travelDates: '12 Sep - 15 Sep 2026',
      guestsCount: '2 Travelers',
      amountPaid: 1.00,
      paidAmount: 1.00,
      totalAmount: 1.00,
      directCosts: 0.55,
      affiliateId: 'pablo.g',
      affiliateCommissionAmount: 0.10,
      affiliateCommissionStatus: 'ready_for_review',
      operatorCommissionAmount: 0.15,
      operatorCommissionStatus: 'pending',
      paymentMethod: 'card',
      paymentStatus: 'confirmed',
      transferRef: 'cs_test_a11gB5vnQX4M3eXa5x85BHcHq20zCsYRXpHfDAN49uPmj4fBUBISi76aB8',
      affiliateCode: 'pablo.g',
      discountApplied: true,
      status: 'deposit_confirmed',
      assignedOperatorId: 'info@vermilionroutes.com',
      assignedOperatorName: 'Jairo Ludeña (Concierge)',
      notes: 'Segunda venta real confirmada vía Stripe. Tour Galápagos 4 Días.',
      createdAt: '2026-09-08T20:18:39.000Z',
      updatedAt: new Date().toISOString()
    }
  ];

  let totalSalesVolume = 0;
  let totalCommissions = 0;

  for (const b of realSessions) {
    totalSalesVolume += b.amountPaid;
    const comm = Number((b.amountPaid * 0.10).toFixed(2));
    totalCommissions += comm;

    // Save in 'bookings' collection
    const bookingRef = await addDoc(collection(db, 'bookings'), b);
    console.log(`✅ Reserva guardada en Firestore con ID ${bookingRef.id}: ${b.refCode} - $${b.amountPaid} USD (${b.customerName})`);

    // Check / Record commission record in affiliate_commissions
    const commQuery = query(
      collection(db, 'affiliate_commissions'),
      where('bookingId', '==', b.refCode)
    );
    const commSnap = await getDocs(commQuery);
    if (commSnap.empty) {
      await addDoc(collection(db, 'affiliate_commissions'), {
        bookingId: b.refCode,
        saleAmount: b.amountPaid,
        affiliateUsername: 'pablo.g',
        affiliateName: 'Pablo Fabricio García Flores',
        commissionAmount: comm,
        percentage: 0.10,
        level: 0,
        role: 'Venta Directa (10%)',
        status: 'credited',
        createdAt: b.createdAt
      });
      console.log(`💰 Comisión registrada para @pablo.g: $${comm} USD`);
    }
  }

  // Update affiliate pablo.g record in Firestore
  const affRef = doc(db, 'affiliates', 'pablo.g');
  await updateDoc(affRef, {
    salesCount: realSessions.length,
    monthlyVolume: totalSalesVolume,
    cumulativePersonalVolume: totalSalesVolume,
    networkVolume: totalSalesVolume,
    availableBalance: totalCommissions,
    totalEarnings: totalCommissions,
    pendingBalance: 0,
    updatedAt: new Date().toISOString()
  });
  console.log(`🌟 Perfil de embajador @pablo.g actualizado con ${realSessions.length} ventas y $${totalCommissions} USD de saldo.`);

  // Mirror to crm_bookings.json for local backup
  const crmFile = path.join(process.cwd(), 'data', 'crm_bookings.json');
  fs.writeFileSync(crmFile, JSON.stringify(realSessions, null, 2), 'utf8');
  console.log(`📁 data/crm_bookings.json sincronizado con datos reales.`);

  console.log('🎉 Sincronización finalizada exitosamente.');
  process.exit(0);
}

syncRealSales().catch((err) => {
  console.error('❌ Error en sincronización:', err);
  process.exit(1);
});
