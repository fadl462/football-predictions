# Migration from the original Football Edge package

This version converts the project to an Algeria-first product.

## Important GitHub cleanup

The old version used Paystack. This version uses Chargily Pay V2 for Algeria.

When replacing the files in an existing GitHub repository, delete the old directory:

`app/api/paystack/`

Also remove any old Paystack environment variables from Vercel:

- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_VIP_PLAN_CODE`

Add the new Chargily variables from `.env.example`.

## Database migration

Run:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

The schema now stores the payment provider/reference, DZD amount and subscription end date.
