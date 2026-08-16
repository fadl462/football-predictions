# DZ Football Edge 🇩🇿

> **GitHub Preview:** the repository root includes a polished static `index.html` preview so GitHub Pages can display the actual product interface. The full Next.js application remains in `app/` and is intended for the later server deployment.


Europe-first football predictions platform with a featured Algeria market with automated fixtures, free predictions, VIP predictions, historical results, affiliate management and an admin control center.

## What is already in the Git project

- Next.js + TypeScript full-stack application
- PostgreSQL + Prisma data model
- API-Football / API-Sports integration
- Europe-first competition prioritisation with Algeria as a featured market
- Automated free and VIP prediction generation
- Versioned prediction engine (`dz-v2`)
- Automatic prediction settlement and history
- User registration/login with signed sessions
- VIP access control
- Chargily Pay V2 payment integration for DZD
- Server-side webhook verification
- Admin controls for settings, users/VIP, predictions, leagues and affiliates
- Affiliate redirect/click tracking (`/go/<id>`)
- Health endpoint (`/api/health`)
- Vercel cron configuration
- Optional GitHub Actions sync workflow
- GitHub CI for typecheck + production build
- Local PostgreSQL Docker setup
- Demo mode for reviewing the UI before paid services are configured

## Architecture

**API-Football → PostgreSQL → Europe-first priority engine → Free/VIP publication → settlement → history**

API credentials and payment secrets are used only on the server. They are never placed in `NEXT_PUBLIC_*` variables.

## Algeria defaults

- Country: Algeria (`DZ`)
- Timezone: `Africa/Algiers`
- Primary locale: `fr-DZ`
- Prepared locales: `fr-DZ`, `ar-DZ`, `en`
- Currency: DZD
- Priority: Ligue 1, Ligue 2, Coupe Nationale
- Free picks/day: 3
- VIP picks/day: 8
- Free minimum confidence: 68%
- VIP minimum confidence: 72%
- VIP default price: 1,999 DZD / 30 days

## Local development — no Vercel required

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Start local PostgreSQL:

```bash
docker compose up -d postgres
```

4. Set this local database URL in `.env.local`:

```text
DATABASE_URL="postgresql://dz_edge:dz_edge_local_password@localhost:5432/dz_football_edge?schema=public"
```

5. Set `AUTH_SECRET`, `CRON_SECRET` and `ADMIN_SEED_PASSWORD`.
6. Leave `DEMO_MODE=true` while reviewing the interface, or add a real Football API key and database when testing the automated engine.
7. Install and initialise:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

8. Open `http://localhost:3000`.

The admin account uses the values from `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD`. The password is no longer hard-coded in the repository.

## Automated sync

`GET /api/cron/sync` requires:

```text
Authorization: Bearer <CRON_SECRET>
```

The sync process imports curated priority fixtures across Europe, UEFA, global competitions and Algeria, ranks leagues by priority, requests prediction inputs, publishes the configured free/VIP tiers, settles completed predictions, expires VIP subscriptions and records an operational log.

## Health check

`GET /api/health` returns non-secret configuration/connection status. It never returns API keys or payment secrets.

## GitHub stage before paid deployment

You can complete the entire code/configuration stage on GitHub before paying for Vercel or enabling any hosted cron service.

The repository already contains:

- `vercel.json` for future Vercel Cron activation
- `.github/workflows/sync.yml` for an optional future GitHub Actions scheduler
- `.github/workflows/ci.yml` for code/build verification
- `docker-compose.yml` for local PostgreSQL
- `.env.example` documenting all required deployment variables

Do **not** upload `.env.local`, real API keys, payment secrets or production database credentials.

## Production variables to add later

- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `FOOTBALL_API_KEY`
- `FOOTBALL_API_BASE_URL`
- `CRON_SECRET`
- `CHARGILY_SECRET_KEY`
- `CHARGILY_API_BASE_URL`
- `CHARGILY_PAYMENT_METHOD`
- `VIP_PRICE_DZD`
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`
- `DEFAULT_AFFILIATE_URL` (optional)
- `DEMO_MODE=false`

## Important production note

Predictions are informational and are not guarantees of outcomes. Betting/gambling availability, affiliate arrangements, advertising rules and applicable Algerian laws/regulations should be reviewed before launch.


## Git-only completion

The project can be reviewed locally without Vercel. See `GIT_STAGE_CHECKLIST.md` for the source-completion and verification status. Vercel, production PostgreSQL, live Chargily credentials and hosted cron are intentionally deferred until the Git version is fully approved.
