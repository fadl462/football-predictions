import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

function getAuthSecret() {
  const value = process.env.AUTH_SECRET?.trim();
  if (value && value.length >= 32) return new TextEncoder().encode(value);
  if (process.env.NODE_ENV !== 'production') return new TextEncoder().encode('local-development-secret-change-me-32chars');
  throw new Error('AUTH_SECRET must be configured with at least 32 characters.');
}

export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash); }

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getAuthSecret());

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSessionUser() {
  const token = (await cookies()).get('session')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (!payload.sub) return null;
    return prisma.user.findUnique({ where: { id: payload.sub }, include: { subscription: true } });
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== 'ADMIN') return null;
  return user;
}

export async function logout() { (await cookies()).delete('session'); }

export function hasVip(user: any) {
  return !!user && (
    user.role === 'ADMIN' ||
    (user.subscription?.status === 'ACTIVE' && (!user.subscription.endsAt || user.subscription.endsAt > new Date()))
  );
}
