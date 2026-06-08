# SaaS Ops Admin Dashboard Idea

## Goal

Ship SaaS Ops Admin Dashboard as one of three public portfolio demos for client outreach. The demo should prove that I can build polished internal admin tools for SaaS operations: monitor revenue, customers, subscriptions, support tickets, operational alerts, and account health from one dashboard.

This is a portfolio demo, not a production admin platform. The priority is a reliable live link, polished first screen, realistic business workflows, and concise client-facing documentation.

## Current Product

The existing app is a Nuxt 4 and Vue 3 dashboard with TypeScript strict mode, Nuxt UI, Tailwind CSS, Pinia, i18n, Chart.js, Lucide/Iconify icons, typed mock data, client-side fake auth, route middleware, and Vercel deployment config.

It already includes dashboard overview, login, customers, customer detail, subscriptions, tickets, alerts, settings, local-state ticket and alert actions, charts, KPI cards, tables, filters, badges, and typed data fixtures.

## Demo Story

An operations manager signs in to a SaaS admin panel, checks MRR and customer health, identifies at-risk accounts, reviews support pressure, and resolves or dismisses operational alerts. The demo should feel like a serious internal tool a startup or agency could request.

Primary demo moments:

- Open the overview and understand revenue, churn, tickets, and alerts quickly.
- Review customers, subscriptions, and account health.
- Open support tickets and change a ticket status.
- Review alerts and resolve, dismiss, or investigate them through local state.
- Show that the demo needs no production backend or private credentials.

## v1 Scope

- Polished Nuxt dashboard first screen.
- Fake login with prefilled credentials or clear demo credentials.
- Working navigation across dashboard, customers, subscriptions, tickets, alerts, and settings.
- Typed mock data for customers, subscriptions, tickets, invoices, alerts, activity, and notes.
- At least one visible local-state workflow action in tickets or alerts.
- README or portfolio notes with business problem, solution, stack, local setup, deployment notes, and 60-second demo script.
- Public Vercel deployment path with no environment variables required.

## Out Of Scope

- Real auth, database, billing provider, production tenancy, or role-based access control.
- Backend APIs or real integrations.
- Full redesign after the first acceptable screenshot.
- New AI features before the three-demo sprint is published.
- Large mobile optimization beyond avoiding obvious breakage.

## Shipping Constraints

- Preserve the existing Nuxt, Vue, Nuxt UI, Pinia, i18n, and mock-data architecture.
- Prefer blocker fixes and portfolio packaging over architecture changes.
- Do not start broad cleanup before the public demo is shipped.
- Every change should help publish the live link, demo flow, README, screenshots, or proposal value.
- Use the existing Vercel-oriented deployment setup unless it blocks publication.

## Acceptance Criteria

- Live URL opens without private setup.
- Login and main navigation work.
- First screen looks like a credible B2B operations dashboard.
- User can demonstrate customers, tickets, alerts, and dashboard overview.
- At least one ticket or alert action visibly changes local UI state.
- README or portfolio notes explain the problem, solution, stack, and 60-second demo flow.
