# Football Edge Predictions

A production-ready Next.js football predictions platform with:

- Automatic football fixture import via API-Football / API-Sports
- Rule-based prediction engine with versioned algorithm field
- Daily free and VIP prediction tiers
- Prediction history and automatic settlement
- Secure server-side API keys
- User accounts and admin role
- Paystack subscription integration
- Admin dashboard and affiliate-link management
- Responsive, mobile-first UI
- Vercel cron configuration for automated sync

## Recommended stack

**Next.js + TypeScript + PostgreSQL + Prisma + Paystack + API-Football.** Next.js App Router provides a full-stack React architecture and server-side route handlers. Prisma gives typed database access. PostgreSQL is suited to relational records such as users, subscriptions, fixtures and predictions. Paystack is a strong fit for Ghana because it supports recurring subscriptions. API-Football is recommended because it provides fixtures, live match data, statistics, standings, injuries, odds and a predictions endpoint across many competitions.

API-Football data should be treated as an input layer, not as the site's own prediction logic. The included engine stores an `algorithmVersion` so future rules/ML models can be swapped in without redesigning the database.

## Local setup

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL`.
4. Set `AUTH_SECRET` and `CRON_SECRET`.
5. Add `FOOTBALL_API_KEY` from API-Football/API-Sports.
6. Add Paystack credentials and a recurring plan code when payments are ready.
7. Run:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Demo mode is enabled by default, so the interface can be reviewed without API credentials. For production, set `DEMO_MODE=false`.

## Admin

Seeded admin account:

- Email: `admin@football-edge.local`
- Password: `Admin@12345`

**Change this password immediately in production.**

## Automation

The `/api/cron/sync` route:

1. Imports today's and tomorrow's fixtures.
2. Upserts leagues and fixtures.
3. Requests API-Football prediction inputs for eligible fixtures.
4. Filters candidates by confidence.
5. Publishes the configured number of free picks.
6. Stores each prediction in PostgreSQL.
7. Settles completed predictions using match scores.
8. Writes an API log.

Vercel cron is configured twice daily. For higher-frequency result updates, call the same endpoint from an external scheduler every 15–30 minutes or move the worker to a long-running job service.

## Production notes

- Keep all secret API keys in deployment environment variables.
- Configure a real Paystack plan and webhook URL: `/api/paystack/webhook`.
- Use a production PostgreSQL provider such as Prisma Postgres, Neon or Supabase.
- Add rate limiting/WAF at the edge before public launch.
- Add transactional email for subscription and prediction notifications.
- Replace the starter password and seed affiliate URL.
- Review betting/affiliate disclosures and local regulatory requirements before launch.
