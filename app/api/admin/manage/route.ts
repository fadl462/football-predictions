import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  action: z.enum(['setting', 'affiliate', 'prediction', 'user']),
  id: z.string().optional(),
  key: z.string().optional(),
  value: z.string().optional(),
  name: z.string().optional(),
  url: z.string().url().refine(value => /^https?:\/\//i.test(value), 'Only http(s) URLs are allowed').optional(),
  active: z.boolean().optional(),
  market: z.string().optional(),
  selection: z.string().optional(),
  confidence: z.number().int().min(0).max(100).optional(),
  status: z.enum(['PENDING', 'WON', 'LOST', 'VOID']).optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  subscriptionStatus: z.enum(['ACTIVE', 'NON_RENEWING', 'EXPIRED', 'CANCELLED']).optional(),
});

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return new NextResponse('Forbidden', { status: 403 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid admin request', details: parsed.error.flatten() }, { status: 400 });
  const input = parsed.data;

  if (input.action === 'setting') {
    if (!input.key || input.value === undefined) return NextResponse.json({ error: 'Setting key and value are required.' }, { status: 400 });
    const rules: Record<string, { min: number; max: number }> = {
      free_prediction_count: { min: 1, max: 10 },
      vip_prediction_count: { min: 1, max: 30 },
      min_confidence: { min: 50, max: 99 },
      vip_min_confidence: { min: 50, max: 99 },
      vip_price_dzd: { min: 100, max: 1000000 },
    };
    if (!(input.key in rules)) return NextResponse.json({ error: 'This setting is not editable from the admin panel.' }, { status: 400 });
    const value = Number(input.value);
    if (!Number.isInteger(value) || value < rules[input.key].min || value > rules[input.key].max) return NextResponse.json({ error: `Invalid value for ${input.key}.` }, { status: 400 });
    if (input.key === 'vip_min_confidence' || input.key === 'min_confidence') {
      const otherKey = input.key === 'vip_min_confidence' ? 'min_confidence' : 'vip_min_confidence';
      const fallback = input.key === 'vip_min_confidence' ? 68 : 72;
      const other = Number((await prisma.setting.findUnique({ where: { key: otherKey } }))?.value || fallback);
      if (input.key === 'vip_min_confidence' && value < other) return NextResponse.json({ error: 'VIP confidence cannot be lower than free confidence.' }, { status: 400 });
      if (input.key === 'min_confidence' && value > other) return NextResponse.json({ error: 'Free confidence cannot exceed VIP confidence.' }, { status: 400 });
    }
    return NextResponse.json(await prisma.setting.upsert({ where: { key: input.key }, update: { value: String(value) }, create: { key: input.key, value: String(value) } }));
  }

  if (input.action === 'affiliate') {
    if (!input.url) return NextResponse.json({ error: 'Affiliate URL is required.' }, { status: 400 });
    const row = input.id
      ? await prisma.affiliateLink.update({ where: { id: input.id }, data: { name: input.name || 'Affiliate', url: input.url, active: input.active !== false } })
      : await prisma.affiliateLink.create({ data: { name: input.name || 'Affiliate', url: input.url, active: input.active !== false } });
    return NextResponse.json(row);
  }

  if (input.action === 'prediction') {
    if (!input.id) return NextResponse.json({ error: 'Prediction id is required.' }, { status: 400 });
    return NextResponse.json(await prisma.prediction.update({
      where: { id: input.id },
      data: {
        ...(input.selection ? { selection: input.selection } : {}),
        ...(input.market ? { market: input.market } : {}),
        ...(input.confidence !== undefined ? { confidence: input.confidence } : {}),
        ...(input.status ? { status: input.status, settledAt: input.status === 'PENDING' ? null : new Date() } : {}),
        manuallyOverridden: true,
      },
    }));
  }

  if (input.action === 'user') {
    if (!input.id) return NextResponse.json({ error: 'User id is required.' }, { status: 400 });
    if (input.id === admin.id && input.role === 'USER') return NextResponse.json({ error: 'You cannot remove your own admin access.' }, { status: 400 });
    const user = await prisma.user.update({ where: { id: input.id }, data: input.role ? { role: input.role } : {} });
    if (input.subscriptionStatus) {
      await prisma.subscription.upsert({
        where: { userId: input.id },
        update: { status: input.subscriptionStatus, ...(input.subscriptionStatus === 'ACTIVE' ? { startsAt: new Date(), endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } : {}) },
        create: { userId: input.id, status: input.subscriptionStatus, provider: 'ADMIN', currency: 'DZD', startsAt: new Date(), endsAt: input.subscriptionStatus === 'ACTIVE' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null },
      });
    }
    return NextResponse.json(user);
  }

  return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
}
