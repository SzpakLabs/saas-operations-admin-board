# Phase 1: First Screen And Login Demo - Context

**Gathered:** 2026-06-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers a credible public-demo entry path: fake login, dashboard overview, first-screen screenshot quality, and working navigation across the existing route set. It does not add production auth, new dashboard modules, backend services, or a broad redesign.

</domain>

<decisions>
## Implementation Decisions

### Lead Screenshot Composition
- **D-01:** Optimize the existing dashboard overview as the lead portfolio screenshot rather than redesigning the entire app.
- **D-02:** Prioritize immediate SaaS operations signals: revenue, churn, tickets, alerts, customer health, activity, and at-risk accounts.
- **D-03:** Keep polish focused on visible desktop first-screen quality; only fix mobile issues that are obvious breakage.

### Demo Login Behavior
- **D-04:** Keep fake auth for v1. Real auth, database sessions, RBAC, and tenant handling are out of scope.
- **D-05:** The login page should either prefill demo credentials or make demo credentials obvious enough that a visitor can enter without private setup.
- **D-06:** Login should continue to redirect into the dashboard overview and authenticated visits to `/login` should continue redirecting to `/`.

### Navigation Readiness
- **D-07:** Phase 1 should verify the existing navigation surface: overview, customers, subscriptions, tickets, alerts, and settings.
- **D-08:** Do not add new routes or dashboard modules in Phase 1. If a route is missing from the existing demo story, defer it rather than expanding scope.
- **D-09:** Preserve the current dashboard layout and Nuxt file-based routing conventions.

### Scope Guardrails
- **D-10:** Backend APIs, production auth, billing integrations, database persistence, broad cleanup, AI features, and full mobile redesign stay out of Phase 1.
- **D-11:** Any implementation change must improve the live demo flow, first screenshot, login, or navigation confidence.
- **D-12:** If browser/form testing enters person names, every person name must include "Test".

### the agent's Discretion
The agent may choose exact UI polish details, copy tightening, spacing fixes, chart framing adjustments, and verification method, provided the changes stay inside Phase 1 and follow existing Nuxt UI/Tailwind patterns.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` - Project purpose, validated capabilities, active scope, constraints, and out-of-scope boundaries.
- `.planning/REQUIREMENTS.md` - Phase 1 requirement IDs DEMO-01 through DEMO-04 and traceability.
- `.planning/ROADMAP.md` - Phase 1 goal, requirements, and success criteria.
- `.planning/STATE.md` - Current workflow state and next phase focus.

### Codebase Map
- `.planning/codebase/CONVENTIONS.md` - Local Vue/Nuxt naming, formatting, imports, comments, and type conventions.
- `.planning/codebase/STRUCTURE.md` - Relevant file locations and where to add or adjust dashboard code.
- `.planning/codebase/STACK.md` - Nuxt/Vue/Nuxt UI/Pinia/i18n/Chart.js stack and quality commands.

### Implementation Entry Points
- `app/pages/login.vue` - Fake login UI and login action.
- `app/pages/index.vue` - Dashboard overview and lead screenshot surface.
- `app/layouts/dashboard.vue` - Authenticated navigation and dashboard shell.
- `app/middleware/auth.global.ts` - Client-side fake auth redirects.
- `app/stores/auth.ts` - Fake auth state and localStorage marker.
- `i18n/locales/en.json` - English copy for labels and route text when copy changes are needed.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/pages/index.vue`: Existing KPI cards, MRR line chart, tickets bar chart, alerts panel, activity feed, and at-risk account section are the Phase 1 polish surface.
- `app/pages/login.vue`: Existing fake login flow is the entry point to make obvious and frictionless.
- `app/layouts/dashboard.vue`: Existing sidebar/topbar navigation should be verified rather than replaced.
- `app/composables/useFormatters.ts`: Existing formatting helpers should remain the formatting path for currency and date display.

### Established Patterns
- Route components use `<script setup lang="ts">` followed by `<template>`.
- Pages keep local filter/view state in refs and computed values.
- Mutable shared state belongs in Pinia stores; Phase 1 should not introduce new shared state unless the login flow truly needs it.
- Use Nuxt UI components and Tailwind utilities instead of adding a new UI library.
- Use `~/` aliases for app-local imports and type-only imports from `~/types`.
- User-facing route/layout copy should stay in i18n locale files when it is translated text.

### Integration Points
- Login success should continue through `useAuthStore.login()` and `navigateTo('/')`.
- Auth redirects should continue through `app/middleware/auth.global.ts` and the client auth plugin.
- Dashboard navigation changes, if needed, connect through the `navigation` array in `app/layouts/dashboard.vue`.
- First-screen polish connects primarily through `app/pages/index.vue` and may touch locale text if labels need tightening.

</code_context>

<specifics>
## Specific Ideas

The demo should feel like a serious internal tool a startup or agency could request. The first-screen story is: an operations manager signs in, sees revenue and operational pressure immediately, and can navigate into customers, subscriptions, tickets, alerts, and settings.

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope.

</deferred>

---

*Phase: 1-First Screen And Login Demo*
*Context gathered: 2026-06-08*
