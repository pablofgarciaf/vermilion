import { getAdminDb } from '@/lib/firebaseAdmin';

export type VisitorDevice = 'mobile' | 'tablet' | 'desktop';

const DEVICE_TYPES: VisitorDevice[] = ['mobile', 'tablet', 'desktop'];

type DeviceCounter = Record<VisitorDevice, number>;

function emptyCounter(): DeviceCounter {
  return { mobile: 0, tablet: 0, desktop: 0 };
}

function incrementCounter(value: unknown, device: VisitorDevice): DeviceCounter {
  const source = (value || {}) as Partial<DeviceCounter>;
  const next = emptyCounter();
  for (const type of DEVICE_TYPES) next[type] = Number(source[type]) || 0;
  next[device] += 1;
  return next;
}

/** Guarda solo un contador agregado: no IP, user agent, cookie ni identificador personal. */
export async function recordDeviceVisit(device: VisitorDevice): Promise<void> {
  const day = new Date().toISOString().slice(0, 10);
  const db = getAdminDb();
  const totalRef = db.collection('web_stats').doc('device_sessions_total');
  const dailyRef = db.collection('web_stats').doc(`device_sessions_${day}`);

  await db.runTransaction(async (transaction) => {
    const [total, daily] = await Promise.all([transaction.get(totalRef), transaction.get(dailyRef)]);
    transaction.set(totalRef, { total: (Number(total.data()?.total) || 0) + 1, byDevice: incrementCounter(total.data()?.byDevice, device) });
    transaction.set(dailyRef, { date: day, total: (Number(daily.data()?.total) || 0) + 1, byDevice: incrementCounter(daily.data()?.byDevice, device) });
  });
}

