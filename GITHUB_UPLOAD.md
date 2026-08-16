# GitHub upload — final Git stage

The repository should contain these folders/files at the repository root:

```text
.github/
app/
components/
lib/
prisma/
public/
.env.example
.gitignore
DEPLOY.md
GITHUB_UPLOAD.md
MIGRATION_FROM_V1.md
README.md
docker-compose.yml
next.config.ts
next-env.d.ts
package.json
prisma/schema.prisma
vercel.json
```

Do not upload `.env.local` or any real secret.

## Replacing the previous upload

Upload the project root contents and replace the existing files. If the older repository still contains `app/api/paystack/`, delete that old directory. The current payment implementation is under `app/api/chargily/`.

## Commit message

`Complete Algeria-first DZ Football Edge Git setup`

After this commit, the Git stage is complete. Vercel, production PostgreSQL, live Chargily credentials and hosted cron can be configured later.
