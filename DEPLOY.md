# The Match Desk — deployment checklist

This file deliberately separates the **Git/code stage** from the **paid hosting stage**. You can finish and test the application locally before connecting Vercel, a hosted database or a live scheduler.

## A. Complete on GitHub first

- [ ] Repository contains the full project root.
- [ ] `.env.example` is present.
- [ ] `.env.local` and secrets are not committed.
- [ ] GitHub CI passes typecheck/build.
- [ ] Local PostgreSQL works with `docker compose up -d postgres`.
- [ ] Prisma schema initializes with `npx prisma db push`.
- [ ] Seed runs with `npm run db:seed`.
- [ ] Demo UI works with `DEMO_MODE=true`.
- [ ] Admin login works.
- [ ] Prediction override controls work.
- [ ] Affiliate management works.
- [ ] `/api/health` responds.
- [ ] Real API-Football credentials have been tested before production.
- [ ] Chargily test credentials have been tested before production.

## B. Paid hosting stage — do later

### Vercel

Import the GitHub repository into Vercel and add the production environment variables listed in `README.md`.

Set:

```text
DEMO_MODE=false
```

### PostgreSQL

Use a production PostgreSQL provider. Run:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

against the production database from a trusted environment.

### Chargily

Configure the production Chargily application and webhook endpoint:

```text
https://YOUR-DOMAIN/api/chargily/webhook
```

Keep `CHARGILY_SECRET_KEY` server-side.

### Cron

`vercel.json` already contains the scheduled sync configuration. It does not need to be edited when you later enable Vercel hosting.

The alternative GitHub Actions workflow is `.github/workflows/sync.yml`; it requires `SITE_URL` and `CRON_SECRET` repository secrets and should only be enabled after the production URL exists.
