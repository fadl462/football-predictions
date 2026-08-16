import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('signature') || '';
  const secret = process.env.CHARGILY_SECRET_KEY || '';
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  if (!secret || signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return new NextResponse('Forbidden', { status: 403 });
  const event = JSON.parse(body);
  const data = event?.data || {};
  const metadata = data?.metadata || {};
  const userId = metadata.user_id;
  if (event?.type === 'checkout.paid' && userId) {
    const startsAt = new Date();
    const endsAt = new Date(startsAt); endsAt.setDate(endsAt.getDate() + 30);
    await prisma.subscription.upsert({
      where: { userId },
      update: { status: 'ACTIVE', planCode: 'VIP_30_DAYS', provider: 'CHARGILY', providerReference: data.id, amount: Number(data.amount || 0), currency: 'DZD', startsAt, endsAt },
      create: { userId, status: 'ACTIVE', planCode: 'VIP_30_DAYS', provider: 'CHARGILY', providerReference: data.id, amount: Number(data.amount || 0), currency: 'DZD', startsAt, endsAt },
    });
  }
  if (event?.type === 'checkout.failed' || event?.type === 'checkout.canceled') {
    await prisma.apiLog.create({ data: { operation: 'chargily-payment-failed', success: false, message: `${event.type}: ${data.id || 'unknown checkout'}` } }).catch(()=>{});
  }
  return NextResponse.json({ received: true });
}
