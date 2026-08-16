import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Connexion requise' }, { status: 401 });
  const key = process.env.CHARGILY_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'CHARGILY_SECRET_KEY n’est pas configurée.' }, { status: 503 });
  const amount = Number(process.env.VIP_PRICE_DZD || 1999);
  const base = process.env.CHARGILY_API_BASE_URL || 'https://pay.chargily.net/api/v2';
  const app = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const r = await fetch(`${base}/checkouts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount,
      currency: 'dzd',
      payment_method: process.env.CHARGILY_PAYMENT_METHOD || 'edahabia',
      success_url: `${app}/vip?payment=success`,
      failure_url: `${app}/pricing?payment=failed`,
      webhook_endpoint: `${app}/api/chargily/webhook`,
      locale: 'fr',
      description: 'DZ Football Edge — accès VIP 30 jours',
      metadata: { user_id: user.id, email: user.email, plan: 'VIP_30_DAYS' },
    }),
  });
  const j = await r.json();
  if (!r.ok || !j.checkout_url) return NextResponse.json({ error: j?.message || 'Impossible de créer le paiement.' }, { status: 502 });
  await prisma.apiLog.create({ data: { operation: 'chargily-checkout', success: true, message: `Checkout ${j.id} created for ${user.email}` } }).catch(()=>{});
  return NextResponse.json({ checkout_url: j.checkout_url, checkout_id: j.id });
}
