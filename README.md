# Longitude Pass

One membership for longevity and recovery clinics worldwide. Concierge MVP: landing page, Stripe, WhatsApp, Airtable, and a simple member portal.

**Promise to members:** *We'll arrange your HBOT anywhere.*

## Live site (GitHub Pages)

After the deploy workflow runs on `main`:

`https://zodenode.github.io/vicebanklp/`

Enable **Settings → Pages → GitHub Actions** once if Pages is not already configured.

## Local development

```bash
npm install
cp .env.example .env   # optional integrations
npm run dev
```

## Integrations

Set these in `.env` locally, or as GitHub Actions **secrets** / **variables** for Pages:

| Variable | Purpose |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Concierge WhatsApp (digits only, e.g. `4477…`) |
| `VITE_STRIPE_PAYMENT_LINK` | Stripe Payment Link for membership |
| `VITE_AIRTABLE_API_KEY` | Airtable PAT (MVP only; proxy in production) |
| `VITE_AIRTABLE_BASE_ID` | Airtable base |
| `VITE_AIRTABLE_WAITLIST_TABLE` | Default `Waitlist` |
| `VITE_AIRTABLE_BOOKINGS_TABLE` | Default `Bookings` |

### Airtable fields (suggested)

**Waitlist:** Name, Email, City, Phone, Source, CreatedAt  
**Bookings:** Name, Email, City, Phone, PreferredDates, Notes, Service, Status, CreatedAt

If Airtable is not configured, submissions still save to `localStorage` and WhatsApp opens when configured.

## Routes

| Path | Purpose |
|---|---|
| `/#/` | Landing + waitlist |
| `/#/portal` | Member portal — request HBOT |
| `/#/concierge` | Ops directory of HBOT centres (phone + WhatsApp) |

Data for clinics: `src/data/hbotCenters.ts`.

## Manual deploy

```bash
npm run deploy
```

Uses `gh-pages` against the `dist` folder (requires write access to the repo).
