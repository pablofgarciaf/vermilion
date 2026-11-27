import { NextResponse } from 'next/server';

export interface RateLimitPolicy {
  /** Stable name that separates unrelated public endpoints. */
  name: string;
  /** Maximum requests allowed during the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

// Vercel keeps a warm module between requests on an instance. This inexpensive
// guard stops bursts without adding a database write to every public form.
// A provider-level WAF/rate limiter can be added later for cross-instance limits.
const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

/** Clears in-memory buckets for isolated unit/integration tests. */
export function resetRateLimitBuckets(): void {
  buckets.clear();
}

function getClientKey(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const vercelIp = req.headers.get('x-vercel-forwarded-for');
  const ip = vercelIp || realIp || forwarded?.split(',')[0]?.trim() || 'anonymous';
  return ip.slice(0, 120);
}

function prune(now: number): void {
  if (buckets.size < MAX_BUCKETS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/** Returns a 429 response when the request exceeds its public endpoint budget. */
export function enforceRateLimit(req: Request, policy: RateLimitPolicy): NextResponse | null {
  const now = Date.now();
  prune(now);

  const key = `${policy.name}:${getClientKey(req)}`;
  const current = buckets.get(key);
  const bucket = !current || current.resetAt <= now
    ? { count: 1, resetAt: now + policy.windowMs }
    : { count: current.count + 1, resetAt: current.resetAt };

  buckets.set(key, bucket);
  const resetSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  if (bucket.count <= policy.limit) return null;

  return NextResponse.json(
    { success: false, error: 'too_many_requests', message: 'Please try again shortly.' },
    {
      status: 429,
      headers: {
        'Cache-Control': 'no-store',
        'Retry-After': String(resetSeconds),
        'X-RateLimit-Limit': String(policy.limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(bucket.resetAt / 1000)),
      },
    },
  );
}

export const PUBLIC_LEAD_LIMIT: RateLimitPolicy = {
  name: 'public-lead',
  limit: 8,
  windowMs: 15 * 60 * 1000,
};

export const PUBLIC_ITINERARY_LIMIT: RateLimitPolicy = {
  name: 'public-itinerary',
  limit: 5,
  windowMs: 15 * 60 * 1000,
};

export const PUBLIC_EMAIL_LIMIT: RateLimitPolicy = {
  name: 'public-email-lead',
  limit: 3,
  windowMs: 15 * 60 * 1000,
};

export const PUBLIC_CONCIERGE_LIMIT: RateLimitPolicy = {
  name: 'public-concierge',
  limit: 20,
  windowMs: 10 * 60 * 1000,
};
