# GitHub Pages Preview

The static GitHub preview is intentionally complete enough to review the product before paid deployment.

## Routes included

- `/` — World football desk
- `/matches/` — World Match Centre
- `/matches/arsenal-man-city/` — Match intelligence example
- `/matches/real-atletico/` — Match intelligence example
- `/matches/psg-bayern/` — Match intelligence example
- `/matches/inter-napoli/` — Match intelligence example
- `/matches/mc-alger-crb/` — Algeria match example
- `/history/` — Public track record
- `/pricing/` — Pro pricing in USD
- `/vip/` — Pro experience
- `/login/` — Login preview
- `/register/` — Registration preview
- `/admin/` — Control Room preview
- `/about/`, `/faq/`, `/contact/`, `/updates/`, `/privacy/`, `/terms/`, `/safety/`

The preview uses demo data and browser navigation only. Server-side accounts, database queries, football API synchronization, payments and automated settlement are provided by the Next.js application under `app/` and activate after server deployment.

## Navigation principle

The main navigation does not use Algeria as a top-level global category. The primary menu is:

**Top Leagues → UEFA → Americas → Asia & Middle East → Africa → Matches → Track Record**

Algeria is discoverable under the Africa menu and has dedicated competition coverage.

Country flags are deliberately not used as navigation labels. Country and region names are written explicitly.
