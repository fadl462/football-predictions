import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Sign-in required.' }, { status: 401 });
  const key = process.env.CHARGILY_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'Payment service is not configured yet.' }, { status: 503 });
  const amount = Number(process.env.PAYMENT_AMOUNT || 0);
  const currency = (process.env.PAYMENT_CURRENCY || 'dzd').toLowerCase();
  if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: 'The production payment amount has not been configured. The public price is displayed in USD; the payment rail will use its supported settlement currency.' }, { status: 503 });
  const base = process.env.CHARGILY_API_BASE_URL || 'https://pay.chargily.net/api/v2';
  const app = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const r = await fetch(`${base}/checkouts`, { method:'POST', headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'}, body:JSON.stringify({ amount, currency, payment_method:process.env.CHARGILY_PAYMENT_METHOD||'edahabia', success_url:`${app}/vip?payment=success`, failure_url:`${app}/pricing?payment=failed`, webhook_endpoint:`${app}/api/chargily/webhook`, locale:'fr', chargily_pay_fees_allocation:process.env.CHARGILY_FEE_ALLOCATION||'customer', description:'The Match Desk — Pro access 30 days', metadata:{user_id:user.id,email:user.email,plan:'PRO_30_DAYS',display_price_usd:process.env.VIP_PRICE_USD||'9.99'} }) });
  const j=await r.json();
  if(!r.ok||!j.checkout_url) return NextResponse.json({error:j?.message||'Unable to create checkout.'},{status:502});
  return NextResponse.json({checkout_url:j.checkout_url,checkout_id:j.id});
}
