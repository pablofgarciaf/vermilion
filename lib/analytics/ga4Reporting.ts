import 'server-only';

import { GoogleAuth } from 'google-auth-library';

type GaRow = { dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> };
type GaResponse = { rows?: GaRow[] };

export type Ga4Report = {
  state: 'connected' | 'configuration_required' | 'unavailable';
  message: string;
  overview?: { activeUsers: number; newUsers: number; sessions: number; pageViews: number; events: number };
  devices?: Array<{ name: string; sessions: number }>;
  pages?: Array<{ path: string; title: string; views: number; users: number }>;
  countries?: Array<{ country: string; users: number; sessions: number }>;
  cities?: Array<{ city: string; country: string; users: number; sessions: number }>;
};

const ANALYTICS_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
// Propiedad de Vermilion (nueva oficial). Puede sobrescribirse en cada entorno sin exponer credenciales.
const DEFAULT_GA4_PROPERTY_ID = '565980829';

function numberAt(row: GaRow, index: number): number {
  return Number(row.metricValues?.[index]?.value || 0);
}

function dimensionAt(row: GaRow, index: number): string {
  return row.dimensionValues?.[index]?.value || '(not set)';
}

function getCredentials(): { client_email: string; private_key: string } | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as { client_email?: string; private_key?: string };
    if (!value.client_email || !value.private_key) return null;
    return { client_email: value.client_email, private_key: value.private_key.replace(/\\n/g, '\n') };
  } catch {
    return null;
  }
}

async function runReport(
  auth: GoogleAuth,
  propertyId: string,
  days: number,
  dimensions: string[],
  metrics: string[],
  limit?: string,
): Promise<GaResponse> {
  const client = await auth.getClient();
  const response = await client.request<GaResponse>({
    url: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    method: 'POST',
    data: {
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      ...(limit ? { limit } : {}),
    },
  });
  return response.data;
}

/** Lee GA4 en servidor. Nunca expone credenciales ni convierte fallos en métricas falsas. */
export async function getGa4Report(days: number): Promise<Ga4Report> {
  const propertyId = process.env.GA4_PROPERTY_ID || process.env.GOOGLE_ANALYTICS_PROPERTY_ID || DEFAULT_GA4_PROPERTY_ID;
  const credentials = getCredentials();
  if (!propertyId || !credentials) {
    return {
      state: 'configuration_required',
      message: 'Falta configurar la propiedad GA4 o autorizar la cuenta de servicio para leerla.',
    };
  }

  try {
    const auth = new GoogleAuth({ credentials, scopes: [ANALYTICS_SCOPE] });
    const [overview, devices, pages, countries, cities] = await Promise.all([
      runReport(auth, propertyId, days, [], ['activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'eventCount']),
      runReport(auth, propertyId, days, ['deviceCategory'], ['sessions']),
      runReport(auth, propertyId, days, ['pagePath', 'pageTitle'], ['screenPageViews', 'activeUsers'], '10'),
      runReport(auth, propertyId, days, ['country'], ['activeUsers', 'sessions'], '10'),
      runReport(auth, propertyId, days, ['city', 'country'], ['activeUsers', 'sessions'], '10'),
    ]);
    const totals = overview.rows?.[0] || {};
    return {
      state: 'connected',
      message: 'Datos históricos leídos directamente de Google Analytics 4.',
      overview: {
        activeUsers: numberAt(totals, 0), newUsers: numberAt(totals, 1), sessions: numberAt(totals, 2),
        pageViews: numberAt(totals, 3), events: numberAt(totals, 4),
      },
      devices: (devices.rows || []).map((row) => ({ name: dimensionAt(row, 0), sessions: numberAt(row, 0) })),
      pages: (pages.rows || []).map((row) => ({ path: dimensionAt(row, 0), title: dimensionAt(row, 1), views: numberAt(row, 0), users: numberAt(row, 1) })),
      countries: (countries.rows || []).map((row) => ({ country: dimensionAt(row, 0), users: numberAt(row, 0), sessions: numberAt(row, 1) })),
      cities: (cities.rows || []).map((row) => ({ city: dimensionAt(row, 0), country: dimensionAt(row, 1), users: numberAt(row, 0), sessions: numberAt(row, 1) })),
    };
  } catch (error) {
    const googleError = error as { code?: number; response?: { status?: number; data?: { error?: { status?: string; message?: string } } } };
    console.warn('[ga4-report] read unavailable:', {
      code: googleError.code,
      status: googleError.response?.status,
      reason: googleError.response?.data?.error?.status,
      message: googleError.response?.data?.error?.message,
    });
    return {
      state: 'unavailable',
      message: 'GA4 no autorizó la lectura. Agrega la cuenta de servicio como Lector de esta propiedad en Google Analytics.',
    };
  }
}
