# Research: Stack

**Project:** OpsBoard SaaS Operations Admin Dashboard
**Date:** 2026-06-08

## Recommendation

Keep the existing stack. The project already has the right frontend architecture for a polished internal admin demo:

- Nuxt 4 and Vue 3 for routing, application shell, build, and deployment.
- TypeScript strict mode for typed pages, stores, fixtures, and config.
- Nuxt UI and Tailwind CSS for internal-tool UI density and consistency.
- Pinia for auth, ticket, and alert state.
- Chart.js and vue-chartjs for KPI and trend visualizations.
- i18n for localized route and layout text.
- Static TypeScript mock data for a zero-backend public demo.
- Vercel build configuration with no environment variables.

## What Not To Add Before v1

- Backend APIs, database, real auth, Stripe, or tenant modeling.
- A new component system.
- A large test framework migration unless a blocker appears.
- AI features or external integrations.

## Confidence

High. The current stack matches the goal: a credible B2B operations dashboard portfolio demo that can deploy publicly without private services.
