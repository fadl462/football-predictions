# Migration from the original Football Edge package

This repository is now the Algeria-first build.

## Main changes

- Algeria-first league priority
- USD pricing
- Africa/Algiers timezone
- Chargily Pay V2 integration
- French Algeria UI foundation with Arabic-ready locale configuration
- Versioned `dz-v2` prediction engine
- Admin controls for users, VIP access, predictions, leagues and affiliates
- Affiliate click redirect
- Health endpoint
- Local PostgreSQL Docker setup
- GitHub CI

## Old Paystack files

If an older copy of the repository still contains `app/api/paystack/`, delete that directory. The current package uses `app/api/chargily/` instead.

Remove old variables such as:

- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_VIP_PLAN_CODE`

## Seed security

The administrator password is no longer hard-coded. Set `ADMIN_SEED_PASSWORD` in the environment used for the seed command.

## Database

The current Prisma schema is designed for PostgreSQL. For local testing:

```bash
docker compose up -d postgres
npx prisma db push
npm run db:seed
```

For production, use a managed PostgreSQL database and run the same schema initialization from a trusted environment.
