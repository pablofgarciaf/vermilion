import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin';

export type AdminRole = 'super' | 'admin' | 'editor' | 'operator' | 'financial' | 'concierge';

export interface VerifiedAdminUser {
  uid: string;
  email: string;
  role: AdminRole;
  roles: AdminRole[];
}

const FOUNDER_EMAILS = new Set([
  'pablofgarciaf@gmail.com',
  'info@vermilionroutes.com',
  (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase().trim(),
].filter(Boolean));

function unauthorized(status = 401) {
  return NextResponse.json({ success: false, error: status === 401 ? 'UNAUTHENTICATED' : 'FORBIDDEN' }, { status });
}

export async function requireAdmin(
  req: NextRequest,
  allowedRoles: AdminRole[] = ['super', 'admin', 'editor', 'operator', 'financial', 'concierge']
): Promise<{ user: VerifiedAdminUser } | { response: NextResponse }> {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return { response: unauthorized(401) };

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    const email = (decoded.email || '').toLowerCase().trim();
    if (!email) return { response: unauthorized(403) };

    if (FOUNDER_EMAILS.has(email)) {
      return {
        user: {
          uid: decoded.uid,
          email,
          role: 'super',
          roles: ['super', 'admin', 'editor', 'operator'],
        },
      };
    }

    const snap = await getAdminDb().collection('usuarios').doc(email).get();
    if (!snap.exists) return { response: unauthorized(403) };

    const data = snap.data() || {};
    const role = String(data.role || '').toLowerCase().trim() as AdminRole;
    const roles = Array.isArray(data.roles)
      ? data.roles.map((r) => String(r).toLowerCase().trim() as AdminRole)
      : [];
    const effectiveRoles = Array.from(new Set([role, ...roles].filter(Boolean)));
    const isAllowed = effectiveRoles.some((r) => allowedRoles.includes(r));

    if (!isAllowed) return { response: unauthorized(403) };

    return {
      user: {
        uid: decoded.uid,
        email,
        role,
        roles: effectiveRoles,
      },
    };
  } catch {
    return { response: unauthorized(401) };
  }
}
