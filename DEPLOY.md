# Deployment checklist

## Vercel
1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Add every variable from `.env.example`.
4. Set `DEMO_MODE=false`.
5. Use a production PostgreSQL URL.
6. Run `npx prisma db push` once against the production database, then `npm run db:seed`.
7. Change the seeded admin password before launch.
8. Add the Paystack webhook URL as `https://YOUR_DOMAIN/api/paystack/webhook`.

## Football API
Use API-Football / API-Sports. The application calls the provider only from server-side code, so the API key never enters browser JavaScript.

## Payment
Create a recurring VIP plan in Paystack, then set `PAYSTACK_VIP_PLAN_CODE`. Set `PAYSTACK_SECRET_KEY` server-side. Set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` only if you later add client-side Paystack UI.

## Automation
Use Vercel Cron or the included GitHub Actions workflow. For GitHub Actions, add repository secrets:
- `SITE_URL`
- `CRON_SECRET`

The sync job imports fixtures, generates candidates, publishes the configured free-pick count and settles completed predictions.
