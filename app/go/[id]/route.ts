import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = await prisma.affiliateLink.findUnique({ where: { id } });
  if (!link || !link.active) return NextResponse.redirect(new URL('/pricing?affiliate=unavailable', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  await prisma.affiliateLink.update({ where: { id }, data: { clicks: { increment: 1 } } }).catch(() => undefined);
  return NextResponse.redirect(link.url, 302);
}
