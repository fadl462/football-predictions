# GitHub visual preview

The root `index.html` is a polished static product preview designed for GitHub Pages.
It demonstrates the user-facing experience with demo data:

- Algeria-first homepage
- Free predictions
- VIP paywall
- Match fixtures
- Prediction history
- Automated workflow explanation
- Login/payment interaction previews

The real full-stack application is the Next.js app in `app/`, with PostgreSQL, Prisma, authentication, API-Football, Chargily and cron endpoints. Those server-side capabilities require a server runtime such as Vercel and are intentionally not executed by GitHub Pages.

If GitHub Pages is enabled for the repository root, it will serve `index.html` rather than the README.
