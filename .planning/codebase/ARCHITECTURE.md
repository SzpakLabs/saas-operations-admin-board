<!-- refreshed: 2026-06-08 -->
# Architecture

**Analysis Date:** 2026-06-08

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Nuxt 4 Application Shell                 │
│ `app/app.vue`, `nuxt.config.ts`, `app/app.config.ts`         │
└───────────────┬───────────────────────┬─────────────────────┘
                │                       │
                ▼                       ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│ File-Based Pages            │ │ Dashboard Layout             │
│ `app/pages/*.vue`           │ │ `app/layouts/dashboard.vue`  │
└───────────────┬─────────────┘ └───────────────┬─────────────┘
                │                               │
                ▼                               ▼
┌─────────────────────────────────────────────────────────────┐
│ View State, Shared Helpers, and UI Services                 │
│ `app/stores/`, `app/composables/`, `app/middleware/`,        │
│ `app/plugins/`                                               │
└───────────────┬───────────────────────┬─────────────────────┘
                │                       │
                ▼                       ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│ Typed Mock Domain Data      │ │ Localization and Theme       │
│ `app/data/`, `app/types/`   │ │ `i18n/locales/`, CSS/UI cfg  │
└─────────────────────────────┘ └─────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Nuxt app shell | Wrap every route in Nuxt UI app context, selected layout, current page, head metadata, and locale-derived HTML language | `app/app.vue` |
| Nuxt configuration | Register Nuxt UI, Pinia, i18n, chart optimization, global CSS, and compatibility date | `nuxt.config.ts` |
| Dashboard layout | Own authenticated navigation, sidebar, mobile slideover, top bar, language menu, color mode, user menu, and notification popover | `app/layouts/dashboard.vue` |
| Auth middleware | Guard routes client-side, restore `opsboard_auth` from `localStorage`, and redirect login/authenticated paths | `app/middleware/auth.global.ts` |
| Auth plugin | Restore persisted auth before the client app mounts | `app/plugins/auth.client.ts` |
| Auth store | Hold authenticated flag and current user; persist login/logout marker to `localStorage` | `app/stores/auth.ts` |
| Tickets store | Hold mutable ticket data and update ticket status timestamps | `app/stores/tickets.ts` |
| Alerts store | Hold mutable alert data and update status/resolution timestamps | `app/stores/alerts.ts` |
| Domain types | Define shared TypeScript interfaces and union types for customers, subscriptions, tickets, invoices, alerts, activities, notes, and KPI data | `app/types/index.ts` |
| Formatter composable | Format currency, dates, date-times, and relative time with active i18n locale | `app/composables/useFormatters.ts` |
| Mock data modules | Export typed arrays used by pages and stores as the app data source | `app/data/*.ts` |
| Pages | Implement route-level data selection, filters, tables, chart setup, details, and action handlers | `app/pages/*.vue` |

## Pattern Overview

**Overall:** Nuxt file-based frontend with page-local view models, Pinia state islands, and typed in-repo mock data.

**Key Characteristics:**
- Use Nuxt conventions first: routes live in `app/pages/`, layout selection uses `definePageMeta`, plugins live in `app/plugins/`, middleware lives in `app/middleware/`.
- Keep most view state local to the route component with `ref`, `reactive`, and `computed`; promote state to Pinia only when multiple controls mutate the same domain data.
- Import mock data directly from `app/data/` for read-only pages and seed mutable Pinia stores from those same modules for interactive pages.
- Use `~/types` unions to constrain domain statuses, plan names, priorities, severities, and Nuxt UI badge colors.
- Use Nuxt UI components and Tailwind utility classes in page templates instead of custom component libraries.

## Layers

**Application Shell:**
- Purpose: Compose Nuxt UI, global metadata, layout, current page, module registration, global CSS, and UI theme colors.
- Location: `app/app.vue`, `nuxt.config.ts`, `app/app.config.ts`, `app/assets/css/main.css`
- Contains: App wrapper, Nuxt config, UI theme config, Tailwind/Nuxt UI imports.
- Depends on: `@nuxt/ui`, `@pinia/nuxt`, `@nuxtjs/i18n`, Nuxt composables.
- Used by: Every route.

**Routing and Layout:**
- Purpose: Map URLs to page components and wrap authenticated routes with dashboard chrome.
- Location: `app/pages/`, `app/layouts/dashboard.vue`
- Contains: Dashboard route pages, login route, dynamic customer detail route, navigation definitions, responsive shell.
- Depends on: Nuxt file-based routing, `useRoute`, `useRouter`, `useI18n`, `useAuthStore`, `app/data/alerts.ts`.
- Used by: Nuxt router and `app/app.vue`.

**Client Auth Boundary:**
- Purpose: Provide mock client-side auth persistence and route redirection.
- Location: `app/stores/auth.ts`, `app/plugins/auth.client.ts`, `app/middleware/auth.global.ts`, `app/pages/login.vue`
- Contains: Auth store, localStorage marker restoration, login/logout actions, route guard.
- Depends on: Pinia and browser `localStorage`; server execution is explicitly skipped in middleware.
- Used by: Global middleware, client plugin, dashboard layout, login page.

**Domain Data:**
- Purpose: Provide typed seed data for all dashboard domains.
- Location: `app/data/customers.ts`, `app/data/subscriptions.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`, `app/data/invoices.ts`, `app/data/notes.ts`, `app/data/activities.ts`
- Contains: Exported arrays typed against `app/types/index.ts`.
- Depends on: Type-only imports from `~/types`.
- Used by: Pages and Pinia stores.

**State Stores:**
- Purpose: Hold mutable in-session state for auth, tickets, and alerts.
- Location: `app/stores/auth.ts`, `app/stores/tickets.ts`, `app/stores/alerts.ts`
- Contains: Pinia options stores with `state` and `actions`.
- Depends on: `pinia`, `~/types`, data seed modules.
- Used by: `app/pages/tickets.vue`, `app/pages/alerts.vue`, `app/layouts/dashboard.vue`, auth plugin/middleware/login.

**View Utilities:**
- Purpose: Share reusable presentation logic without centralizing page state.
- Location: `app/composables/useFormatters.ts`
- Contains: Currency, date, date-time, and relative-time formatters.
- Depends on: `useI18n`, Vue `computed`, browser date/Intl APIs.
- Used by: Dashboard, customer, subscription, ticket, and alert pages.

**Localization and Theme:**
- Purpose: Provide translated UI strings and global UI styling.
- Location: `i18n/locales/*.json`, `nuxt.config.ts`, `app/app.config.ts`, `app/assets/css/main.css`
- Contains: Locale JSON files, i18n module config, primary/neutral UI colors, Tailwind/Nuxt UI imports.
- Depends on: `@nuxtjs/i18n`, `@nuxt/ui`, Tailwind CSS.
- Used by: All pages and layout through `$t()` / `useI18n()`.

## Data Flow

### Authenticated Page Request Path

1. Nuxt mounts the shell and renders `<NuxtLayout><NuxtPage /></NuxtLayout>` (`app/app.vue:19`).
2. Global route middleware skips server execution, restores `opsboard_auth` from `localStorage`, and redirects unauthenticated users to `/login` (`app/middleware/auth.global.ts:3`).
3. The client auth plugin also restores auth before mount for browser sessions (`app/plugins/auth.client.ts:3`).
4. Authenticated pages declare `definePageMeta({ layout: 'dashboard' })` and are wrapped by `app/layouts/dashboard.vue` (`app/pages/index.vue:22`, `app/pages/customers/index.vue:5`, `app/pages/tickets.vue:5`).
5. The dashboard layout renders navigation and user actions from `useAuthStore()` and route state (`app/layouts/dashboard.vue:5`).
6. Route components import data/stores, compute filtered view models, and render Nuxt UI tables, cards, charts, and detail panels (`app/pages/customers/index.vue:43`, `app/pages/tickets.vue:41`, `app/pages/alerts.vue:30`).

### Login Flow

1. The login page disables layouts with `definePageMeta({ layout: false })` (`app/pages/login.vue:4`).
2. `handleLogin()` accepts any non-empty email/password, calls `auth.login()`, and navigates to `/` (`app/pages/login.vue:13`).
3. `useAuthStore.login()` sets `isAuthenticated` and writes `opsboard_auth=true` in client storage (`app/stores/auth.ts:15`).
4. Global middleware redirects authenticated visits to `/login` back to `/` (`app/middleware/auth.global.ts:15`).

### Read-Only Domain Page Flow

1. A page imports a typed data array from `app/data/` (`app/pages/customers/index.vue:2`, `app/pages/subscriptions.vue:2`).
2. Local filters, sorting, pagination, or KPI calculations are held in route-local `ref` and `computed` values (`app/pages/customers/index.vue:10`, `app/pages/subscriptions.vue:31`).
3. Templates render Nuxt UI controls and standard tables from computed arrays (`app/pages/customers/index.vue:134`, `app/pages/subscriptions.vue:118`).

### Mutable Domain Page Flow

1. A Pinia store seeds state from a mock data module (`app/stores/tickets.ts:5`, `app/stores/alerts.ts:5`).
2. The page reads store state through a filtered computed value (`app/pages/tickets.vue:41`, `app/pages/alerts.vue:30`).
3. User actions call store actions such as `ticketsStore.updateStatus()` or `alertsStore.updateStatus()` (`app/pages/tickets.vue:81`, `app/pages/alerts.vue:168`).
4. Store actions mutate in-memory records and timestamp changed items (`app/stores/tickets.ts:11`, `app/stores/alerts.ts:11`).

### Chart Flow

1. The dashboard page imports `Bar` and `Line` from `vue-chartjs` and Chart.js primitives (`app/pages/index.vue:2`).
2. Chart.js components are registered at module setup time (`app/pages/index.vue:20`).
3. Chart datasets and options are computed from local constants and color mode (`app/pages/index.vue:35`, `app/pages/index.vue:76`).
4. The template renders chart components inside fixed-height card regions (`app/pages/index.vue:170`).

**State Management:**
- Use Pinia stores in `app/stores/` for auth and mutable domain records.
- Use page-local `ref`, `reactive`, and `computed` for filters, selected rows, tabs, status controls, and temporary form state.
- Use direct `app/data/` imports for read-only data views.
- Use `localStorage` only in client-only auth paths guarded by `import.meta.client`, `import.meta.server`, or `.client.ts`.

## Key Abstractions

**Page Component:**
- Purpose: Own a route's view model and UI.
- Examples: `app/pages/index.vue`, `app/pages/customers/index.vue`, `app/pages/customers/[id].vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`
- Pattern: `<script setup lang="ts">` imports data/stores/types, defines local computed state, and renders Nuxt UI components.

**Dashboard Layout:**
- Purpose: Provide authenticated navigation and global dashboard controls.
- Examples: `app/layouts/dashboard.vue`
- Pattern: Layout-scoped navigation arrays are computed from translations; route state controls active links; auth state controls user menu.

**Pinia Options Store:**
- Purpose: Share and mutate domain state across a page and app shell.
- Examples: `app/stores/auth.ts`, `app/stores/tickets.ts`, `app/stores/alerts.ts`
- Pattern: `defineStore('name', { state: () => (...), actions: { ... } })`; seed domain arrays with shallow copies from `app/data/`.

**Domain Data Module:**
- Purpose: Provide typed mock records.
- Examples: `app/data/customers.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`
- Pattern: `import type { X } from '~/types'` and `export const xs: X[] = [...]`.

**Domain Type Registry:**
- Purpose: Centralize interfaces and string unions used by pages, stores, and data modules.
- Examples: `app/types/index.ts`
- Pattern: Export `interface` for record shapes and `type` unions for statuses, priorities, severities, plan tiers, and UI color names.

**Composable Helper:**
- Purpose: Share presentation logic that depends on active locale.
- Examples: `app/composables/useFormatters.ts`
- Pattern: Nuxt auto-imported function returning stable formatter methods.

## Entry Points

**Application Root:**
- Location: `app/app.vue`
- Triggers: Nuxt app render.
- Responsibilities: Set viewport/favicon/head metadata and render `UApp`, `NuxtLayout`, and `NuxtPage`.

**Nuxt Configuration:**
- Location: `nuxt.config.ts`
- Triggers: Nuxt build/dev runtime.
- Responsibilities: Register modules, i18n locales, global CSS, chart dependency optimization, devtools setting, and compatibility date.

**Dashboard Routes:**
- Location: `app/pages/index.vue`, `app/pages/customers/index.vue`, `app/pages/customers/[id].vue`, `app/pages/subscriptions.vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`, `app/pages/settings.vue`
- Triggers: URL navigation.
- Responsibilities: Render authenticated dashboard experiences under `app/layouts/dashboard.vue`.

**Login Route:**
- Location: `app/pages/login.vue`
- Triggers: `/login` URL and middleware redirects.
- Responsibilities: Render standalone login UI and call `useAuthStore.login()`.

**Global Auth Middleware:**
- Location: `app/middleware/auth.global.ts`
- Triggers: Every Nuxt route navigation.
- Responsibilities: Enforce client-side auth redirects.

**Client Auth Plugin:**
- Location: `app/plugins/auth.client.ts`
- Triggers: Client app lifecycle before mount.
- Responsibilities: Hydrate auth state from browser storage.

## Architectural Constraints

- **Runtime model:** Nuxt/Vue single-page frontend behavior on top of Nuxt SSR-capable conventions. Browser-only auth storage must stay behind `import.meta.client`, `import.meta.server`, or `.client.ts`.
- **Data source:** There is no server API, persistence layer, or database in the repo. Current domain data comes from committed arrays in `app/data/`.
- **Mutation persistence:** Ticket and alert mutations persist only in Pinia memory for the active browser session. Auth persists through `localStorage`.
- **Global state:** Shared mutable state is limited to Pinia stores in `app/stores/auth.ts`, `app/stores/tickets.ts`, and `app/stores/alerts.ts`.
- **Routing:** Nuxt file names define routes. The customer detail route is `app/pages/customers/[id].vue`.
- **Localization:** All user-facing route/layout text should use `$t()` or `useI18n().t()` with keys in `i18n/locales/*.json`.
- **Circular imports:** Not detected in scanned app imports. Keep data modules dependent only on `~/types`, stores dependent on data/types, and pages dependent on stores/data/composables/types.
- **Project skills:** Repo-local `.codex/skills/` and `.agents/skills/` directories are not present.

## Anti-Patterns

### Mutating Direct Data Imports

**What happens:** Read-only pages import arrays directly from `app/data/` and derive computed views.
**Why it's wrong:** Directly mutating imported arrays would bypass Pinia and create module-level shared state without action boundaries.
**Do this instead:** For mutable records, create or extend a Pinia store like `app/stores/tickets.ts` or `app/stores/alerts.ts`, seed from `app/data/`, and mutate through store actions.

### Browser APIs Outside Client Guards

**What happens:** Auth uses `localStorage`, which only exists in the browser.
**Why it's wrong:** Unprotected browser API access can break server rendering or build-time execution.
**Do this instead:** Keep browser storage in `.client.ts` plugins or in branches guarded by `import.meta.client` / `import.meta.server`, as in `app/plugins/auth.client.ts` and `app/stores/auth.ts`.

### Page-Level Domain Types

**What happens:** Pages use shared status and color unions from `app/types/index.ts`.
**Why it's wrong:** Creating duplicate page-local status strings makes filters, badges, stores, and data modules drift.
**Do this instead:** Add new domain interfaces and unions to `app/types/index.ts`, then import them with `import type`.

## Error Handling

**Strategy:** Minimal frontend-only handling with Nuxt route errors and local form state.

**Patterns:**
- Use `throw createError({ statusCode, statusMessage })` for invalid dynamic route entities, as in `app/pages/customers/[id].vue`.
- Use local `error` refs for form-level validation and show Nuxt UI alerts, as in `app/pages/login.vue`.
- Store actions silently ignore missing IDs in `app/stores/tickets.ts` and `app/stores/alerts.ts`.
- Empty states are rendered in templates when filtered arrays have no results.

## Cross-Cutting Concerns

**Logging:** Not detected.

**Validation:** Client-side validation is inline and minimal. Login checks non-empty email/password in `app/pages/login.vue`; filters rely on typed options and union casts.

**Authentication:** Mock client auth with Pinia plus `localStorage` marker. No external identity provider, server session, JWT, or role enforcement is present.

**Authorization:** Role and permission displays exist in `app/pages/settings.vue`, but route access is a single authenticated/unauthenticated check.

**Internationalization:** Nuxt i18n is configured in `nuxt.config.ts`; locale JSON files live in `i18n/locales/`; layout and pages use `useI18n()` and `$t()`.

**Theming:** Nuxt UI primary/neutral colors are configured in `app/app.config.ts`; global CSS imports Tailwind and Nuxt UI in `app/assets/css/main.css`.

**Charts:** Chart.js registration and chart configuration are local to `app/pages/index.vue`; Vite pre-optimizes `vue-chartjs` and `chart.js` in `nuxt.config.ts`.

---

*Architecture analysis: 2026-06-08*
