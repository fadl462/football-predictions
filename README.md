# DZ Football Edge 🇩🇿

Algeria-first football predictions platform with automated fixtures, free predictions, VIP predictions, historical results, affiliate management and an admin dashboard.

## Core architecture

**API-Football / API-Sports → PostgreSQL → Algeria-first prediction engine → Free/VIP publication → automatic settlement → history**

API-Football currently lists Algeria coverage including Ligue 1, Ligue 2 and Coupe Nationale, with fixtures, standings and other football data available according to competition/season coverage. The prediction engine treats the API as an input layer and applies its own rules so the algorithm can evolve independently.

## Algeria localization

- Country: Algeria (`DZ`)
- Timezone: `Africa/Algiers`
- Locale: French Algeria (`fr-DZ`), with the UI structured to add Arabic later
- Currency: DZD
- Priority competitions: Ligue 1, Ligue 2, Coupe Nationale
- CAF competitions can be prioritized when relevant
- Free default: 3 picks/day
- VIP default: up to 8 picks/day
- Free confidence threshold: 68%
- VIP confidence threshold: 72%

## VIP payments

The Algeria build uses **Chargily Pay V2** instead of the Ghana-focused Paystack integration. Chargily Pay documents checkout creation in DZD and supports EDAHABIA and CIB payment methods. The integration keeps the secret key server-side and verifies webhook signatures before activating 30-day VIP access.

For live payments, complete Chargily account/application verification and use the live API base URL. Test mode is available during development.

## Local setup

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL`.
4. Set `AUTH_SECRET` and `CRON_SECRET`.
5. Add `FOOTBALL_API_KEY`.
6. Add `CHARGILY_SECRET_KEY` and set `VIP_PRICE_DZD`.
7. Set `DEMO_MODE=false` when real credentials are ready.
8. Run:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Seed admin:

- Email: `admin@dzfootball-edge.local`
- Password: `Admin@12345`

Change the password immediately in production.

## Automation

`GET /api/cron/sync` is protected by `Authorization: Bearer <CRON_SECRET>`.

The sync process:

1. Retrieves Algeria fixtures for today and tomorrow.
2. Stores/updates leagues and fixtures.
3. Prioritizes Ligue 1, Ligue 2 and Coupe Nationale.
4. Requests prediction inputs from API-Football.
5. Applies the versioned DZ prediction rules.
6. Publishes the configured free and VIP cards.
7. Settles completed predictions from final scores.
8. Expires VIP subscriptions after their end date.
9. Records an API log for operational visibility.

## GitHub / Vercel

Upload the project root contents to GitHub. Do not upload `.env.local` or any secret keys. Configure all secrets as Vercel environment variables.

## Important production note

Predictions are informational and are not guarantees of outcomes. Betting and gambling availability, affiliate arrangements, advertising rules and applicable Algerian laws/regulations must be reviewed before launch.
