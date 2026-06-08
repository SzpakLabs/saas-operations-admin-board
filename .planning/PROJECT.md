# OpsBoard SaaS Operations Admin Dashboard

## What This Is

OpsBoard is a public portfolio demo of a SaaS operations admin dashboard. It shows how an operations manager can monitor revenue, customers, subscriptions, tickets, operational alerts, and customer health from one polished internal-tool interface.

This is not a production admin platform. The project goal is a reliable live link, a credible first screen, realistic demo workflows, and concise client-facing documentation for outreach.

## Core Value

The demo must convince a potential client, within a short walkthrough, that this codebase can become a polished SaaS operations admin tool with realistic workflows and no private setup.

## Requirements

### Validated

- [x] Dashboard shell and authenticated route structure exist through Nuxt pages, dashboard layout, fake auth middleware, and Pinia auth state.
- [x] Overview, customers, customer detail, subscriptions, tickets, alerts, and settings routes are implemented.
- [x] Typed mock data exists for customers, subscriptions, tickets, invoices, alerts, activities, and notes.
- [x] Dashboard overview includes KPI cards, MRR trend chart, ticket chart, recent alerts, activity feed, and at-risk accounts.
- [x] Customer and subscription pages include searchable, filterable, sortable, and detail-oriented views.
- [x] Tickets and alerts include local-state workflow actions through Pinia stores.
- [x] i18n, Nuxt UI, Tailwind CSS, Chart.js, Lucide/Iconify icons, and Vercel-oriented build configuration are already in place.

### Active

- [ ] Polish the first dashboard screen enough to be the lead portfolio screenshot.
- [ ] Confirm fake login, navigation, customer detail, tickets, alerts, and settings work without private setup.
- [ ] Ensure at least one ticket or alert action visibly changes local UI state during a demo.
- [ ] Package README or portfolio notes with business problem, solution, stack, local setup, deployment notes, and a 60-second demo script.
- [ ] Verify the Vercel-ready build path and document that no environment variables are required.
- [ ] Avoid broad cleanup and production backend work until the public demo is shipped.

### Out of Scope

- Real authentication, authorization, RBAC, tenant isolation, database persistence, billing integrations, or production APIs - not needed for a portfolio demo.
- New AI features - deferred until the three-demo sprint is published.
- Full redesign after the first acceptable screenshot - shipping the live link is higher priority.
- Large mobile optimization beyond avoiding obvious breakage - desktop portfolio/demo flow is the primary target.
- Broad architecture cleanup - only fix blockers or issues that weaken the published demo.

## Context

The existing app is a Nuxt 4 and Vue 3 dashboard with TypeScript strict mode, Nuxt UI, Tailwind CSS, Pinia, i18n, Chart.js, Lucide/Iconify icons, typed mock data, client-side fake auth, route middleware, and Vercel deployment config.

The demo story is an operations manager signing in, checking MRR and customer health, identifying at-risk accounts, reviewing support pressure, and resolving or dismissing operational alerts. The app should feel like a serious internal tool a startup or agency could request.

Current documentation includes README and portfolio notes, but the active milestone should verify they are aligned with the final demo flow and deployment state.

## Constraints

- **Tech stack**: Preserve Nuxt, Vue, Nuxt UI, Pinia, i18n, Chart.js, Tailwind CSS, and typed mock data - the repo already uses these patterns.
- **Architecture**: Keep mock data in `app/data/`, mutable ticket/alert state in Pinia stores, and route views in `app/pages/`.
- **Deployment**: Use the existing Vercel-oriented setup unless it blocks publication.
- **Scope**: Prefer blocker fixes, polish, demo flow, screenshots, README, and proposal value over architecture changes.
- **Backend**: No backend APIs, database, billing provider, private credentials, or environment variables for v1.
- **Testing data**: Any form, chat, browser, or user-input test data must include "Test" in person names.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Treat this as a portfolio demo, not a production platform | The user's goal is client outreach and a reliable public demo | - Pending |
| Preserve the existing Nuxt/Vue/Nuxt UI architecture | The app already implements the needed demo surface | - Pending |
| Focus on publication readiness over broad cleanup | A live credible demo is more valuable than deeper refactoring before outreach | - Pending |
| Keep auth and domain data mocked | No private setup should be required for the live URL | - Pending |
| Use coarse MVP phases | The remaining work is packaging, polish, verification, and publish readiness | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-08 after initialization*
