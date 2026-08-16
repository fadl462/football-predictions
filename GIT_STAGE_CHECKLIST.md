# DZ Football Edge — Git Stage Checklist

This repository is intended to be completed and reviewed on GitHub before any paid hosting or production cron is activated.

## Completed in source

- [x] Next.js + TypeScript application
- [x] PostgreSQL + Prisma schema
- [x] Server-side football API integration
- [x] Algeria-first fixture filtering and league priority
- [x] Versioned prediction engine (`dz-v2`)
- [x] Free/VIP prediction tiers
- [x] Prediction history and settlement
- [x] Final-score-only settlement protection
- [x] Canceled/postponed fixture voiding
- [x] User registration/login/logout
- [x] Signed HTTP-only sessions
- [x] Admin role protection
- [x] User/VIP administration
- [x] Prediction manual override
- [x] League enable/disable and priority control
- [x] Affiliate URL management and click redirect
- [x] Chargily Pay V2 checkout integration
- [x] Chargily webhook HMAC verification
- [x] DZD pricing and configurable VIP price
- [x] Health endpoint
- [x] Local PostgreSQL Docker setup
- [x] GitHub CI workflow
- [x] Future hosted sync workflow
- [x] Vercel cron configuration
- [x] Mobile navigation
- [x] Demo-mode disclosure
- [x] No production secrets in the repository

## Verification performed here

- TypeScript/TSX syntax transpilation check: **35 files parsed, 0 syntax errors**.
- Full `npm install` / production build could not be completed in this environment because the npm registry operation timed out.
- The GitHub Actions CI workflow is included to perform dependency installation, Prisma generation, TypeScript checking and the production build on GitHub.

## Before paid deployment

1. Review the UI from local demo mode.
2. Run the project locally with PostgreSQL.
3. Run `npm install`, `npx prisma generate`, `npx prisma db push`, `npm run db:seed`.
4. Run `npm run typecheck` and `npm run build`.
5. Commit the final reviewed source to GitHub.
6. Only then configure production database, Vercel, live Chargily and hosted cron.

Never commit `.env.local`, API keys, database credentials, or production payment secrets.
