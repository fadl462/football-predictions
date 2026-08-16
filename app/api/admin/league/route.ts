import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({ id: z.string(), priority: z.number().int().min(0).max(1000).optional(), active: z.boolean().optional() });

export async function POST(req: Request) {
  if (!await requireAdmin()) return new NextResponse('Forbidden', { status: 403 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid league request' }, { status: 400 });
  return NextResponse.json(await prisma.league.update({
    where: { id: parsed.data.id },
    data: { ...(parsed.data.priority !== undefined ? { priority: parsed.data.priority } : {}), ...(parsed.data.active !== undefined ? { active: parsed.data.active } : {}) },
  }));
}
