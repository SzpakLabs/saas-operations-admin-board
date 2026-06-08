# SaaS Ops Admin Dashboard

## What This Is

SaaS Ops Admin Dashboard is a portfolio demo of a polished internal operations dashboard for SaaS teams. It helps an operations manager monitor revenue, customers, subscriptions, support tickets, alerts, settings, and account health using realistic mock data.

## Core Value

Show a credible SaaS operations command center that feels ready for a startup or agency admin workflow.

## Requirements

### Validated

- Existing Nuxt/Vue app implements login, dashboard overview, customers, customer detail, subscriptions, tickets, alerts, and settings routes.
- Existing typed mock data supports customers, subscriptions, tickets, invoices, alerts, activities, notes, and KPI views.
- Existing Pinia stores provide client-side auth, ticket state, and alert state.
- Existing local actions support ticket and alert status changes.
- Existing Vercel config and README describe deployment without required environment variables.

### Active

- [ ] Publish a reliable live demo with no private setup.
- [ ] Keep login, navigation, overview, customers, tickets, alerts, and settings demonstrable.
- [ ] Make the first screen acceptable for Upwork, LinkedIn, GitHub, and proposals.
- [ ] Document business value, stack, setup, deployment notes, and 60-second demo flow.
- [ ] Run the strongest practical short check before publication.

### Out of Scope

- Real auth, database, billing, tenancy, or role-based access control - unnecessary for this portfolio link.
- Backend APIs or real integrations - mock data already proves the admin workflow.
- New AI features - this demo's value is SaaS ops/admin depth.
- Full redesign - freeze after the first acceptable screenshot.
- Large mobile optimization - avoid obvious breakage only.

## Context

This is one of three demos in a fast portfolio sprint. The current mission is public links and outreach, not a production admin platform.

The mapped codebase is a strict TypeScript Nuxt 4/Vue 3 app with Nuxt UI, Tailwind CSS, Pinia, i18n, Chart.js, Iconify/Lucide icons, typed fixtures, fake client auth, route middleware, and Vercel deployment metadata.

## Constraints

- **Architecture**: Preserve the existing Nuxt, Nuxt UI, Pinia, i18n, and mock-data structure.
- **Timeline**: Ship quickly enough to support immediate client outreach.
- **Scope**: Fix blockers and first-screen issues before polish.
- **Deployment**: Prefer the existing Vercel path and no-env setup.
- **Verification**: Use the strongest existing short check without adding a large test harness.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep this as a mock-data admin demo | No backend is required to prove operations UX | Pending |
| Preserve fake auth | It supports a realistic demo flow without production complexity | Pending |
| Avoid AI scope in v1 | The portfolio set already has AI-heavy demos | Pending |
| Freeze design after acceptable screenshot | Prevents scope creep during the 3-demo sprint | Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

After each phase transition:

1. Requirements invalidated? Move to Out of Scope with reason.
2. Requirements validated? Move to Validated with phase reference.
3. New requirements emerged? Add to Active.
4. Decisions to log? Add to Key Decisions.
5. What This Is still accurate? Update if drifted.

After each milestone:

1. Full review of all sections.
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state.

---
*Last updated: 2026-06-08 after initialization*
