# DZ Football Edge — Deployment

## 1. Database
Use a managed PostgreSQL provider such as Neon, Supabase, Railway or another production PostgreSQL service.

Set `DATABASE_URL` in Vercel.

## 2. Football API
Create an API-Football/API-Sports account and add `FOOTBALL_API_KEY` as a Vercel server environment variable. Never expose it through `NEXT_PUBLIC_*` variables.

## 3. Chargily Pay
Create a Chargily Pay application, complete the required verification for live mode, and set:

- `CHARGILY_SECRET_KEY`
- `CHARGILY_API_BASE_URL=https://pay.chargily.net/api/v2`
- `VIP_PRICE_DZD=1999`

The webhook endpoint is:

`https://YOUR-DOMAIN/api/chargily/webhook`

Register it in Chargily or allow the checkout creation request to provide it. Webhook signatures are verified server-side.

## 4. Vercel
Set:

- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `FOOTBALL_API_KEY`
- `FOOTBALL_API_BASE_URL`
- `CRON_SECRET`
- `CHARGILY_SECRET_KEY`
- `CHARGILY_API_BASE_URL`
- `VIP_PRICE_DZD`
- `DEFAULT_AFFILIATE_URL`
- `DEMO_MODE=false`

Then deploy.

## 5. Database initialization
After the first deployment, run the Prisma commands from a trusted development environment against the production database:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## 6. Cron
`vercel.json` schedules the sync twice daily. For high-volume fixtures, move to an external scheduler that can call `/api/cron/sync` every 1–3 hours with the `Authorization: Bearer <CRON_SECRET>` header.
