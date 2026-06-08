# Phase 01 - Research: First Screen And Login Demo

## RESEARCH COMPLETE

## Scope

Phase 1 is a brownfield frontend polish and verification phase. The codebase already has the required Nuxt routes, fake auth flow, dashboard shell, overview cards, charts, alerts, activity, at-risk accounts, and typed mock data. Planning should focus on demo credibility, not new platform capability.

## Findings

### Existing Entry Path
- `app/pages/login.vue` already uses fake credentials in local reactive state and calls `useAuthStore.login()` before navigating to `/`.
- `app/stores/auth.ts`, `app/plugins/auth.client.ts`, and `app/middleware/auth.global.ts` own the client-side auth marker and redirects.
- Real auth, sessions, RBAC, tenants, and provider setup are explicitly out of scope.

### Existing Overview Surface
- `app/pages/index.vue` owns the first portfolio screenshot surface.
- It already includes KPIs for MRR, active customers, open tickets, churn, ARR, and average health.
- It already renders MRR and ticket charts through Chart.js/vue-chartjs.
- It already surfaces active alerts, recent activity, and at-risk accounts.
- The highest-value implementation work is copy, spacing, data signal clarity, chart framing, and first-viewport scan quality.

### Existing Navigation
- `app/layouts/dashboard.vue` defines the required navigation entries for overview, customers, subscriptions, tickets, alerts, and settings.
- Navigation uses Nuxt file-based routes already present under `app/pages/`.
- Phase 1 should verify route reachability and active-state clarity rather than add routes.

### UI Constraints
- Preserve Nuxt UI components, Tailwind utilities, and Nuxt UI color tokens.
- Keep dashboard UI dense, utilitarian, and scan-friendly.
- Avoid marketing hero composition inside the authenticated dashboard.
- Desktop screenshot quality is primary; mobile work is limited to obvious breakage.

### Verification Constraints
- `npm run typecheck` is the active static quality gate.
- No real test runner is configured.
- Browser verification should cover `/login`, `/`, `/customers`, `/subscriptions`, `/tickets`, `/alerts`, and `/settings`.
- Any testing that enters person names must include "Test" in the person name.

## Planning Recommendations

1. Use one focused plan for Phase 1 because the work is a tight vertical demo slice.
2. Modify only login, overview, dashboard shell, locale copy, and small supporting style/config files if needed.
3. Include manual/browser verification as a task because route confidence is a phase requirement.
4. Keep all production-auth/backend/database/billing work out of task scope.

## Risks

- Over-polishing the entire dashboard could delay the public demo without improving Phase 1 requirements.
- Adding new routes or auth mechanics would violate the roadmap boundary.
- Copy changes can drift across locale files if only `en.json` is updated where existing translated keys are reused.

