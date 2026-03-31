# OpsBoard — SaaS Operations Admin Dashboard

A production-grade internal operations dashboard for SaaS companies. Built as a portfolio demo to showcase full-stack Nuxt 3 capabilities with realistic product UX.

## Concept

OpsBoard is a B2B admin panel for operations teams managing customers, subscriptions, support workflows, and internal alerts. It mirrors what a real startup or agency would use to track MRR, identify at-risk accounts, manage support tickets, and respond to operational incidents.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 + Vue 3 |
| UI Library | Nuxt UI v4 (Tailwind CSS v4) |
| State | Pinia |
| Charts | Chart.js + vue-chartjs |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide (via Iconify) |
| Deployment | Vercel |

## Key Features

- **Login page** — Fake auth with pre-filled credentials, polished split layout
- **Dashboard Overview** — MRR/ARR/churn KPI cards, line chart (MRR trend), bar chart (tickets), recent alerts, activity feed, at-risk accounts
- **Customers** — Searchable, sortable, filterable table with health score bars, status badges, pagination; click row to open detail
- **Customer Detail** — Profile sidebar, subscription summary, invoice history, support ticket history, internal notes with author/timestamp
- **Subscriptions** — Filterable list by plan/status with billing cycle, trial expiry dates, MRR summaries
- **Support Tickets** — Split-panel layout: list with priority/status badges + detail panel with status change actions
- **Alerts & Issues** — Severity-coded incidents with Investigate / Resolve / Dismiss quick actions (local state)
- **Settings** — Organization details, notification toggles, team roster with role badges, integrations panel

## Routes

| Route | Page |
|---|---|
| `/login` | Login (fake auth) |
| `/` | Dashboard overview |
| `/customers` | Customer list |
| `/customers/[id]` | Customer detail |
| `/subscriptions` | Subscription list |
| `/tickets` | Support tickets |
| `/alerts` | Alerts & Issues |
| `/settings` | Settings |

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:3000](http://localhost:3000) and sign in with the pre-filled credentials.

## Deploying to Vercel

1. Push to GitHub
2. Import the repository in Vercel
3. Set framework preset to **Nuxt.js** (auto-detected)
4. Deploy — no environment variables required

Or via CLI:

```bash
npm i -g vercel
vercel --prod
```

## Project Structure

```
app/
├── assets/css/      # Global CSS (Tailwind + Nuxt UI)
├── composables/     # useFormatters (currency, dates, timeAgo)
├── data/            # Mock data (customers, tickets, alerts, etc.)
├── layouts/         # dashboard.vue (sidebar + topbar shell)
├── middleware/      # auth.global.ts (route guard)
├── pages/           # All routes
│   ├── index.vue
│   ├── login.vue
│   ├── customers/
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── subscriptions.vue
│   ├── tickets.vue
│   ├── alerts.vue
│   └── settings.vue
├── stores/          # Pinia stores (auth, tickets, alerts)
└── types/           # Shared TypeScript interfaces
```
