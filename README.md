# The Match Desk

World football intelligence, organized by competition importance.

## Product hierarchy

1. Top Leagues — Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Eredivisie, Primeira Liga, Championship
2. UEFA — Champions League, Europa League, Conference League
3. Americas — Copa Libertadores, Brasileirão, Argentina Primera, Liga MX, MLS
4. Asia & Middle East — Saudi Pro League, J1 League, K League 1, Qatar Stars League, AFC Champions League Elite
5. Africa — CAF Champions League, CAF Confederation Cup, Egypt Premier League, Botola Pro, Algeria Ligue 1 and Ligue 2

The interface uses explicit country and region names instead of country-flag emojis so competitions remain immediately understandable on every device.

## GitHub Pages preview

The repository contains a static preview in `index.html` plus working static routes for Match Centre, match detail pages, Track Record, Pro, login, registration, admin, About, FAQ, Contact, Privacy, Terms, Safety and Updates. This allows the product experience to be reviewed on GitHub Pages without Vercel.

## Full application

The `app/` directory is the production Next.js application. It contains server-side authentication, PostgreSQL/Prisma data access, football API integration, prediction generation, result settlement, Chargily payment integration, admin controls and the protected sync endpoint.

## Prediction engine

The API is an input layer. The application applies its own versioned competition-priority and confidence rules so the ranking model can evolve independently.

## Local development

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Start PostgreSQL locally with `docker compose up -d postgres`.
4. Set `DATABASE_URL`, `AUTH_SECRET`, `CRON_SECRET`, `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD` and provider credentials as needed.
5. Keep `DEMO_MODE=true` while reviewing the UI.
6. Run `npm install`, `npx prisma generate`, `npx prisma db push`, `npm run db:seed`, then `npm run dev`.

No Vercel, paid cron or live payment account is required to review the Git-stage application.

## Currency

Public pricing is displayed in USD. Payment settlement remains configurable at the production adapter layer so the display currency is never confused with a provider's supported settlement currency.

## Security

Never commit `.env.local`, API keys, database passwords or payment secrets. Football and payment credentials are accessed only on the server in the production Next.js application.
