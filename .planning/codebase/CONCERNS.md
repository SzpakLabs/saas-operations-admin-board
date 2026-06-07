# Codebase Concerns

**Analysis Date:** 2026-06-08

## Tech Debt

**Demo-only authentication is wired into the app shell:**
- Issue: Authentication accepts any non-empty email/password and stores only `opsboard_auth=true` in browser storage.
- Files: `app/pages/login.vue`, `app/stores/auth.ts`, `app/middleware/auth.global.ts`, `app/plugins/auth.client.ts`
- Impact: Any user can set the local storage flag and enter the dashboard. User identity, roles, session expiry, CSRF protection, and server-side route protection are not represented.
- Fix approach: Replace the local storage flag with a real auth provider or server session, validate credentials server-side, persist only opaque session state, and make `app/middleware/auth.global.ts` depend on an authenticated server/user fetch rather than browser-only state.

**Static mock data drives production-shaped workflows:**
- Issue: Customers, subscriptions, tickets, alerts, notes, invoices, and activities are all imported from static files.
- Files: `app/data/customers.ts`, `app/data/subscriptions.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`, `app/data/notes.ts`, `app/data/invoices.ts`, `app/data/activities.ts`
- Impact: The UI looks operational but cannot represent multi-user updates, persistence, authorization, audit trails, pagination, server filtering, or stale data handling.
- Fix approach: Introduce typed data access modules or Nuxt server routes for each domain, keep mock data behind a fixture adapter, and migrate pages to call the domain layer instead of importing fixture arrays directly.

**Page components own repeated business and presentation rules:**
- Issue: Status colors, labels, plan colors, health thresholds, filtering, sorting, and badge mappings are duplicated inside route components.
- Files: `app/pages/index.vue`, `app/pages/customers/index.vue`, `app/pages/customers/[id].vue`, `app/pages/subscriptions.vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`
- Impact: Adding a new status, plan tier, or health threshold requires scattered edits and can create inconsistent UI semantics across pages.
- Fix approach: Move shared mapping logic to composables or domain helpers such as `app/composables/useCustomerPresentation.ts`, `app/composables/useTicketPresentation.ts`, and `app/composables/useAlertPresentation.ts`.

**Large route files combine data preparation, workflow logic, and layout:**
- Issue: Several route files are 200+ lines and mix composable setup, data transforms, event handlers, and full templates.
- Files: `app/layouts/dashboard.vue`, `app/pages/settings.vue`, `app/pages/index.vue`, `app/pages/customers/[id].vue`, `app/pages/customers/index.vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`
- Impact: Small changes have a broad review surface, increase regression risk, and make focused testing difficult.
- Fix approach: Extract repeated tables, KPI cards, filters, detail panels, and topbar/side navigation into local components under `app/components/` before adding more workflow behavior.

**Package manager assumptions are inconsistent:**
- Issue: The repo contains `package-lock.json`, but CI installs and caches with pnpm while `package.json` examples use npm and the `check` script uses bun.
- Files: `package.json`, `package-lock.json`, `.github/workflows/ci.yml`, `README.md`
- Impact: Local, CI, and deployment dependency resolution can drift. CI may install without the committed lockfile being the source of truth.
- Fix approach: Choose one package manager, commit the matching lockfile, update `.github/workflows/ci.yml`, `README.md`, and `package.json` scripts to use it consistently.

## Known Bugs

**Customer notes submit button discards input:**
- Symptoms: Entering a new customer note and clicking send clears the textarea without adding a note.
- Files: `app/pages/customers/[id].vue`
- Trigger: Open `/customers/[id]`, type into the notes box, click the send icon.
- Workaround: Not available in the UI; notes remain fixture-only in `app/data/notes.ts`.

**Settings save actions do not persist organization, team, or integration changes:**
- Symptoms: Organization fields are static `model-value` bindings, notification settings only show a temporary saved state, and integration buttons do not change connection state.
- Files: `app/pages/settings.vue`
- Trigger: Edit any organization field, toggle notifications, or click integration actions, then navigate away or reload.
- Workaround: None; the page is presentation-only except temporary in-memory switch values.

**Alert and ticket status updates reset on reload:**
- Symptoms: Resolving an alert or changing a ticket status updates the current Pinia store instance only, then returns to fixture values after reload.
- Files: `app/stores/alerts.ts`, `app/stores/tickets.ts`, `app/pages/alerts.vue`, `app/pages/tickets.vue`
- Trigger: Change an alert or ticket status, refresh the browser.
- Workaround: None; status mutations need persistence or explicit demo-state labeling.

**Header search has no behavior:**
- Symptoms: Typing in the dashboard header search input does not filter, navigate, or show results.
- Files: `app/layouts/dashboard.vue`
- Trigger: Type into the topbar search field on desktop.
- Workaround: Use page-specific filters where available.

## Security Considerations

**Client-side route guard is not an access control boundary:**
- Risk: Protected pages are gated only after client navigation; the server path exits early from the auth middleware.
- Files: `app/middleware/auth.global.ts`, `app/stores/auth.ts`, `app/plugins/auth.client.ts`
- Current mitigation: Client-side redirects to `/login` when the local Pinia state/local storage flag is absent.
- Recommendations: Add server-side authentication checks for protected data routes, avoid relying on local storage for authorization, and treat client middleware only as UX routing.

**Hardcoded demo credentials and user identity are visible in source:**
- Risk: Login defaults and user profile values can be mistaken for real credentials or copied into production flows.
- Files: `app/pages/login.vue`, `app/stores/auth.ts`, `README.md`
- Current mitigation: README identifies the app as a portfolio demo with fake auth.
- Recommendations: Keep demo credentials clearly fixture-scoped, remove default password values when real auth is introduced, and ensure production builds cannot enable fake-login behavior accidentally.

**Sensitive-looking customer and team data is committed as fixtures:**
- Risk: The app includes realistic names, emails, companies, phone numbers, team roles, billing values, subscriptions, tickets, notes, and incident descriptions.
- Files: `app/data/customers.ts`, `app/data/tickets.ts`, `app/data/notes.ts`, `app/pages/settings.vue`
- Current mitigation: No `.env*` files were detected, and the data appears to be mock portfolio content.
- Recommendations: Keep fixtures synthetic and clearly marked, avoid importing real customer exports into `app/data/`, and add review guidance before replacing mock data.

**No permission checks around role-sensitive actions:**
- Risk: UI actions such as exporting customers, resolving alerts, changing tickets, inviting team members, and managing billing/integrations are visible without role enforcement.
- Files: `app/pages/customers/index.vue`, `app/pages/alerts.vue`, `app/pages/tickets.vue`, `app/pages/settings.vue`, `app/stores/auth.ts`
- Current mitigation: Static role labels are displayed in the UI.
- Recommendations: Model permissions as data, gate UI affordances and server mutations by role, and test unauthorized access paths.

## Performance Bottlenecks

**Client-side filtering and sorting over full arrays:**
- Problem: Pages copy full fixture arrays, filter with string scans, and sort in computed properties on every dependency change.
- Files: `app/pages/customers/index.vue`, `app/pages/subscriptions.vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`
- Cause: No server pagination, indexes, query params, or debounced search.
- Improvement path: Move filtering, sorting, and pagination to server/API boundaries for real datasets; add debounce for search inputs and preserve filter state in route query params.

**Customer detail performs repeated linear joins across multiple datasets:**
- Problem: The detail page filters invoices, tickets, and notes by customer ID separately each time computed values re-evaluate.
- Files: `app/pages/customers/[id].vue`, `app/data/invoices.ts`, `app/data/tickets.ts`, `app/data/notes.ts`
- Cause: Data is stored as flat arrays with no indexing or backend query layer.
- Improvement path: Fetch customer detail as a single aggregate payload or introduce indexed selectors in stores/composables.

**Chart.js is loaded in the dashboard route:**
- Problem: The overview page imports Chart.js and registers chart primitives directly in `app/pages/index.vue`.
- Files: `app/pages/index.vue`
- Cause: Chart code is coupled to the main dashboard page rather than isolated behind async/client-only components.
- Improvement path: Extract chart widgets into components, lazy-load chart modules where possible, and measure bundle impact before adding more visualizations.

## Fragile Areas

**Auth initialization happens in multiple client paths:**
- Files: `app/stores/auth.ts`, `app/middleware/auth.global.ts`, `app/plugins/auth.client.ts`
- Why fragile: Both middleware and plugin read the same local storage key and mutate `auth.isAuthenticated`, creating duplicated initialization rules.
- Safe modification: Centralize auth restoration in one store action and call it from one lifecycle location; keep route guards as consumers of normalized auth state.
- Test coverage: No tests cover login, logout, refresh persistence, or redirect behavior.

**Domain state is split between static data and shallow store copies:**
- Files: `app/stores/alerts.ts`, `app/stores/tickets.ts`, `app/data/alerts.ts`, `app/data/tickets.ts`, `app/pages/index.vue`, `app/layouts/dashboard.vue`
- Why fragile: Some views import fixtures directly while others read mutable Pinia stores, so related screens can disagree after an in-memory update.
- Safe modification: Route all mutable domains through stores or a data service, and avoid direct fixture imports from pages once a store exists.
- Test coverage: No tests cover cross-page consistency after alert or ticket status changes.

**Internationalized labels are assembled from dynamic keys:**
- Files: `app/pages/customers/index.vue`, `app/pages/customers/[id].vue`, `app/pages/subscriptions.vue`, `i18n/locales/en.json`, `i18n/locales/es.json`, `i18n/locales/it.json`, `i18n/locales/fr.json`, `i18n/locales/de.json`
- Why fragile: Plan/status additions require matching keys in every locale, and dynamic key construction can hide missing translations from simple static searches.
- Safe modification: Define plan/status display metadata in typed helpers and add locale-key coverage checks before expanding enums.
- Test coverage: No tests validate translation completeness across supported locales.

**No real lint or unit/e2e test gate:**
- Files: `package.json`, `.github/workflows/ci.yml`
- Why fragile: `npm run lint` and `npm run test` are placeholders, while CI only runs placeholder lint and typecheck.
- Safe modification: Add ESLint or Nuxt linting, add Vitest for composables/stores, add Playwright for core routes, and make CI run the same package-manager commands developers use locally.
- Test coverage: No `*.test.*` or `*.spec.*` files were detected.

## Scaling Limits

**Dataset size:**
- Current capacity: Fixture arrays are small, with 12 customers, 13 subscriptions, 10 tickets, 10 alerts, and related notes/invoices/activities.
- Limit: Full-table rendering and in-browser search/sort/filter will degrade as customer, ticket, or alert counts grow.
- Scaling path: Introduce API pagination, server-side filters, cursor-based list endpoints, and virtualized rows for large lists.

**Multi-user workflows:**
- Current capacity: One browser session with local in-memory mutations.
- Limit: No conflict resolution, audit log, subscriptions/realtime sync, optimistic update rollback, or persisted mutation state.
- Scaling path: Move mutations to server endpoints, return canonical domain events, and refresh list/detail views from shared persisted state.

**Authorization model:**
- Current capacity: One hardcoded user with one hardcoded role.
- Limit: Cannot safely support teams, role-based permissions, customer scoping, or billing/admin-only workflows.
- Scaling path: Add typed roles and permissions, attach them to authenticated users server-side, and enforce them in both UI and API handlers.

## Dependencies at Risk

**Package manager/tooling stack:**
- Risk: npm lockfile, pnpm CI commands, and bun check script create three competing install/runtime assumptions.
- Impact: Dependency trees, generated Nuxt artifacts, and CI behavior can differ from local development and Vercel deployment.
- Migration plan: Standardize on npm, pnpm, or bun; remove unused lockfiles/scripts; configure CI cache and install commands for the selected manager.

**Chart.js direct page dependency:**
- Risk: Chart registration and options live in `app/pages/index.vue`, tying dashboard rendering to Chart.js imports.
- Impact: Dashboard bundle size and SSR/client rendering behavior become harder to manage as charts grow.
- Migration plan: Wrap chart usage in dedicated client components and lazy-load chart-heavy widgets.

## Missing Critical Features

**Backend/API layer:**
- Problem: No Nuxt server routes or external API clients exist for customers, subscriptions, tickets, alerts, notes, or settings.
- Blocks: Persistence, validation, authorization, audit trails, integrations, webhooks, real search, and production data loading.

**Observability and error handling:**
- Problem: No application logging, error reporting, API error states, or user-facing retry patterns are implemented.
- Blocks: Debugging production incidents, tracking failed mutations, and validating external integration failures.

**Export, billing, integrations, team management, and search workflows:**
- Problem: Several visible controls are non-functional or presentation-only.
- Blocks: Treating the app as a real operations tool without clearly separating demo UI from implemented workflows.

## Test Coverage Gaps

**Auth and route protection:**
- What's not tested: Login acceptance, logout, refresh restoration, redirecting protected pages, and blocking logged-in users from `/login`.
- Files: `app/pages/login.vue`, `app/stores/auth.ts`, `app/middleware/auth.global.ts`, `app/plugins/auth.client.ts`
- Risk: Auth regressions can expose protected screens or trap users in redirect loops.
- Priority: High

**List filtering, sorting, pagination, and empty states:**
- What's not tested: Customer sorting by each column, filter combinations, pagination reset, subscription filters, ticket filters, and alert filters.
- Files: `app/pages/customers/index.vue`, `app/pages/subscriptions.vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`
- Risk: Core operator workflows can silently break while typecheck still passes.
- Priority: High

**Mutable store actions:**
- What's not tested: Alert status transitions, resolved timestamps, ticket status transitions, selected ticket refresh, and cross-page consistency.
- Files: `app/stores/alerts.ts`, `app/stores/tickets.ts`, `app/pages/alerts.vue`, `app/pages/tickets.vue`
- Risk: UI state can show stale or contradictory statuses.
- Priority: Medium

**Customer detail aggregation:**
- What's not tested: 404 handling, customer invoice filtering, customer ticket filtering, customer notes rendering, and note submission behavior.
- Files: `app/pages/customers/[id].vue`, `app/data/invoices.ts`, `app/data/tickets.ts`, `app/data/notes.ts`
- Risk: Detail pages can show incorrect related records or drop user input.
- Priority: Medium

**Localization coverage:**
- What's not tested: Required keys across `en`, `es`, `it`, `fr`, and `de`, dynamic enum label keys, and route rendering per locale.
- Files: `i18n/locales/en.json`, `i18n/locales/es.json`, `i18n/locales/it.json`, `i18n/locales/fr.json`, `i18n/locales/de.json`
- Risk: Missing keys surface at runtime in only some languages.
- Priority: Medium

---

*Concerns audit: 2026-06-08*
