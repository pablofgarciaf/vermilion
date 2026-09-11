/**
 * PayPal REST API Integration Service
 * Supports PayPal Business Ecuador (official currency USD)
 * Handles OAuth2 Token generation, Order creation, and Payment capture.
 */

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
const PAYPAL_ENVIRONMENT = process.env.PAYPAL_MODE || (process.env.NODE_ENV === 'production' ? 'live' : 'sandbox');

const PAYPAL_API_BASE = PAYPAL_ENVIRONMENT === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

/**
 * Obtain OAuth2 Access Token from PayPal
 */
async function getPayPalAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PAYPAL_NOT_CONFIGURED: Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET in .env');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`PayPal OAuth Token error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export interface CreateOrderParams {
  amount: number;
  currency?: string;
  bookingRef: string;
  tourTitle?: string;
  clientName?: string;
  clientEmail?: string;
}

/**
 * Create a PayPal Checkout Order
 */
export async function createPayPalOrder(params: CreateOrderParams) {
  const { amount, currency = 'USD', bookingRef, tourTitle = 'Vermilion Routes Expedition' } = params;

  // If credentials are not set, return simulated demo order id
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    console.warn('[PayPal] Keys not configured in .env. Returning simulated demo order.');
    return {
      id: `SIMULATED_PAYPAL_${Date.now()}`,
      status: 'CREATED',
      simulated: true,
    };
  }

  const accessToken = await getPayPalAccessToken();

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: bookingRef,
        description: tourTitle.slice(0, 127),
        amount: {
          currency_code: currency,
          value: amount.toFixed(2),
        },
        custom_id: bookingRef,
      },
    ],
    application_context: {
      brand_name: 'Vermilion Routes',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      shipping_preference: 'NO_SHIPPING',
    },
  };

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal Create Order Failed (${response.status}): ${errorText}`);
  }

  return await response.json();
}

/**
 * Capture funds for an approved PayPal Checkout Order
 */
export async function capturePayPalOrder(orderId: string) {
  if (orderId.startsWith('SIMULATED_PAYPAL_')) {
    return {
      id: orderId,
      status: 'COMPLETED',
      simulated: true,
      payer: {
        email_address: 'demo@vermilionroutes.com',
        name: { given_name: 'Demo Traveler' },
      },
    };
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal Capture Order Failed (${response.status}): ${errorText}`);
  }

  return await response.json();
}

export function isPayPalConfigured(): boolean {
  return Boolean(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET);
}
