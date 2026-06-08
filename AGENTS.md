<!-- GSD:project-start source:PROJECT.md -->
## Project

**OpsBoard SaaS Operations Admin Dashboard**

OpsBoard is a public portfolio demo of a SaaS operations admin dashboard. It shows how an operations manager can monitor revenue, customers, subscriptions, tickets, operational alerts, and customer health from one polished internal-tool interface.

This is not a production admin platform. The project goal is a reliable live link, a credible first screen, realistic demo workflows, and concise client-facing documentation for outreach.

**Core Value:** The demo must convince a potential client, within a short walkthrough, that this codebase can become a polished SaaS operations admin tool with realistic workflows and no private setup.

### Constraints

- **Tech stack**: Preserve Nuxt, Vue, Nuxt UI, Pinia, i18n, Chart.js, Tailwind CSS, and typed mock data - the repo already uses these patterns.
- **Architecture**: Keep mock data in `app/data/`, mutable ticket/alert state in Pinia stores, and route views in `app/pages/`.
- **Deployment**: Use the existing Vercel-oriented setup unless it blocks publication.
- **Scope**: Prefer blocker fixes, polish, demo flow, screenshots, README, and proposal value over architecture changes.
- **Backend**: No backend APIs, database, billing provider, private credentials, or environment variables for v1.
- **Testing data**: Any form, chat, browser, or user-input test data must include "Test" in person names.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.8.x - Nuxt app source, stores, composables, data fixtures, config, and shared interfaces in `app/**/*.ts`, `app/**/*.vue`, `nuxt.config.ts`, `tailwind.config.ts`, and `app/types/index.ts`.
- Vue Single File Components - Route pages, layout, and root app in `app/pages/**/*.vue`, `app/layouts/dashboard.vue`, and `app/app.vue`.
- JSON - npm lockfile and package manifest in `package.json` and `package-lock.json`; i18n locale catalogs in `i18n/locales/*.json`; deployment metadata in `vercel.json`.
- CSS - Global Tailwind/Nuxt UI stylesheet in `app/assets/css/main.css`.
## Runtime
- Node.js runtime for Nuxt 4/Nitro builds. No `.nvmrc`, `.node-version`, `engines`, or `packageManager` field is present, so use the Node version supported by Nuxt 4 and the deployment platform.
- Browser runtime for the dashboard UI. Auth persistence uses `localStorage` in `app/stores/auth.ts`, `app/plugins/auth.client.ts`, and `app/middleware/auth.global.ts`.
- npm - `package-lock.json` lockfile is present.
- `package.json` also includes a `check` script that invokes `bun run ...`, but no `bun.lock` or `bun.lockb` is present. Prefer npm commands unless the project explicitly standardizes on Bun.
## Frameworks
- Nuxt `^4.4.2` - App framework, routing, build, SSR/static generation, and Nitro output. Configured in `nuxt.config.ts`.
- Vue 3 - Component runtime provided by Nuxt; route pages live under `app/pages/`.
- Nuxt UI `^4.6.0` - UI component system configured as a Nuxt module in `nuxt.config.ts` and themed in `app/app.config.ts`.
- Pinia `^3.0.4` with `@pinia/nuxt` `^0.11.3` - Client state stores in `app/stores/auth.ts`, `app/stores/tickets.ts`, and `app/stores/alerts.ts`.
- `@nuxtjs/i18n` `^10.2.4` - Locale routing and message loading configured in `nuxt.config.ts`; locale files live in `i18n/locales/*.json`.
- Tailwind CSS `^4.2.2` - Styling utility framework referenced by `tailwind.config.ts` and global CSS in `app/assets/css/main.css`.
- Chart.js `^4.4.0` and `vue-chartjs` `^5.3.0` - Dashboard charts in `app/pages/index.vue`; Vite dependency pre-bundling is configured in `nuxt.config.ts`.
- `@iconify-json/lucide` `^1.2.100` - Lucide icon set used through Nuxt UI/Iconify names such as `i-lucide-*`.
- No test runner is configured. `package.json` has `"test": "echo \"No tests configured\""`.
- Type checking is available through `nuxt typecheck` and `vue-tsc` via `package.json`.
- Nuxt CLI - `npm run dev`, `npm run build`, `npm run preview`, `npm run generate`, and `npm run typecheck` in `package.json`.
- Vite - Used through Nuxt; explicit `optimizeDeps.include` entries for `vue-chartjs` and `chart.js` are in `nuxt.config.ts`.
- TypeScript project references - Root `tsconfig.json` delegates to Nuxt-generated `.nuxt/tsconfig.*.json` files.
## Key Dependencies
- `nuxt` `^4.4.2` - Owns app lifecycle, pages, middleware, plugins, and production build.
- `@nuxt/ui` `^4.6.0` - Provides components such as `UCard`, `UButton`, `UTabs`, `USwitch`, `UBadge`, and `UIcon` used throughout `app/pages/*.vue`.
- `@pinia/nuxt` `^0.11.3` and `pinia` `^3.0.4` - Required for auth, tickets, and alert state.
- `@nuxtjs/i18n` `^10.2.4` - Required because pages call `useI18n()` or `$t()` and message files live in `i18n/locales/`.
- `typescript` `^5.8.0`, `vue-tsc` `^3.2.6`, and `@vue/language-core` `^3.2.6` - Static type analysis.
- `tailwindcss` `^4.2.2` - Utility CSS.
- `chart.js` `^4.4.0` and `vue-chartjs` `^5.3.0` - KPI and dashboard visualizations.
- `@iconify-json/lucide` `^1.2.100` - Icon assets consumed by Nuxt UI.
## Configuration
- No `.env*` files were detected during mapping.
- No env access was detected in source: searches for `process.env`, `import.meta.env`, `runtimeConfig`, `NUXT_`, `DATABASE_URL`, API keys, tokens, secrets, or webhook env names returned no source matches.
- Nuxt runtime config is not defined in `nuxt.config.ts`.
- `nuxt.config.ts` registers modules, i18n, global CSS, Vite optimize deps, disabled devtools, and `compatibilityDate: "2025-01-15"`.
- `tailwind.config.ts` scans `app/components`, `app/layouts`, `app/pages`, `app/plugins`, and `app/app.vue`. There is no `app/components` directory currently.
- `tsconfig.json` references Nuxt-generated TypeScript configs under `.nuxt/`.
- `vercel.json` sets `"buildCommand": "npm run build"`.
- `renovate.json` is present for dependency update automation.
- Domain data is static TypeScript fixture data under `app/data/*.ts`.
- Shared domain interfaces live in `app/types/index.ts`.
- Formatting helpers live in `app/composables/useFormatters.ts`.
## Platform Requirements
- Install dependencies with `npm install`.
- Run locally with `npm run dev`.
- Validate types with `npm run typecheck`.
- Build with `npm run build`.
- Vercel deployment is configured through `vercel.json` and documented in `README.md`.
- No production environment variables are required by the current code.
- No backend service, database, queue, or server API directory is present.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Use Nuxt app-directory conventions under `app/`: route files in `app/pages/`, layouts in `app/layouts/`, middleware in `app/middleware/`, plugins in `app/plugins/`, composables in `app/composables/`, stores in `app/stores/`, and shared types in `app/types/index.ts`.
- Use kebab-free, domain-named route files for top-level pages: `app/pages/tickets.vue`, `app/pages/alerts.vue`, `app/pages/subscriptions.vue`, and `app/pages/settings.vue`.
- Use Nuxt dynamic route bracket syntax for route params: `app/pages/customers/[id].vue`.
- Use `useX.ts` naming for composables: `app/composables/useFormatters.ts`.
- Use plural domain names for fixture data modules: `app/data/customers.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`, `app/data/invoices.ts`, `app/data/subscriptions.ts`, `app/data/activities.ts`, and `app/data/notes.ts`.
- Use camelCase for local helpers and actions: `formatCurrency`, `formatDateTime`, `timeAgo` in `app/composables/useFormatters.ts`; `setSort`, `statusColor`, `statusLabel`, `planColor`, and `healthColor` in `app/pages/customers/index.vue`.
- Name Pinia store composables as `use{Domain}Store`: `useAuthStore` in `app/stores/auth.ts`, `useTicketsStore` in `app/stores/tickets.ts`, and `useAlertsStore` in `app/stores/alerts.ts`.
- Use domain verb names for store actions: `login`, `logout`, and `updateStatus` in `app/stores/auth.ts`, `app/stores/tickets.ts`, and `app/stores/alerts.ts`.
- Use camelCase for refs, computed values, and local constants: `searchQuery`, `mobileMenuOpen`, `unreadAlerts`, and `userMenuItems` in `app/layouts/dashboard.vue`; `statusFilter`, `planFilter`, `sortKey`, `sortDir`, and `paginated` in `app/pages/customers/index.vue`.
- Use `allX` aliases when importing immutable fixture arrays into page-local filtering flows: `customers as allCustomers` in `app/pages/customers/index.vue` and `subscriptions as allSubs` in `app/pages/subscriptions.vue`.
- Use short callback parameters for simple array transformations only when the domain remains obvious: `customers.filter(c => ...)` in `app/pages/index.vue` and `alerts.filter(a => ...)` in `app/layouts/dashboard.vue`.
- Use PascalCase interfaces for entity shapes in `app/types/index.ts`: `Customer`, `Subscription`, `Ticket`, `Invoice`, `Alert`, `Activity`, `InternalNote`, and `KpiData`.
- Use PascalCase union types for enums represented as strings: `CustomerStatus`, `PlanTier`, `TicketPriority`, `TicketStatus`, `AlertSeverity`, `AlertStatus`, and `BadgeColor` in `app/types/index.ts`.
- Use literal union types instead of TypeScript `enum`.
- Use `Record<UnionType, ValueType>` for exhaustive display maps: `Record<CustomerStatus, BadgeColor>` in `app/pages/customers/index.vue`, `Record<TicketStatus, BadgeColor>` in `app/pages/tickets.vue`, and `Record<AlertSeverity, BadgeColor>` in `app/pages/index.vue`.
## Code Style
- `.editorconfig` defines 2-space indentation, LF line endings, UTF-8 charset, trimmed trailing whitespace, and final newlines.
- Existing TypeScript and Vue files use semicolon-free style.
- Existing string literals mostly use single quotes in application files such as `app/stores/auth.ts`, `app/pages/tickets.vue`, and `app/composables/useFormatters.ts`; `nuxt.config.ts` uses both single and double quotes. Prefer single quotes in app code.
- Use trailing commas only where the existing multiline call or object already has them. Files such as `app/pages/index.vue` and `app/composables/useFormatters.ts` generally omit trailing commas in object literals and import lists.
- Keep Vue single-file components ordered as `<script setup lang="ts">` first, then `<template>`, as seen in `app/pages/index.vue`, `app/pages/customers/index.vue`, `app/pages/tickets.vue`, and `app/layouts/dashboard.vue`.
- No ESLint, Prettier, or Biome config is present.
- `package.json` defines `lint` as `echo "No lint configured"`.
- `.github/workflows/ci.yml` runs `pnpm run lint` and `pnpm run typecheck`; lint currently succeeds by placeholder script rather than static analysis.
- `package.json` defines `typecheck` as `nuxt typecheck`; use this as the active quality gate.
## Import Organization
- Use Nuxt `~` alias for app-local modules: `~/stores/auth`, `~/types`, `~/data/tickets`, and `~/assets/css/main.css`.
- Do not use relative parent imports between app modules when a `~/` alias is available.
## Error Handling
- Current app code uses optimistic UI state and guard clauses rather than thrown errors.
- Auth route protection returns early on server-side execution and redirects client-side in `app/middleware/auth.global.ts`.
- Store updates are no-op when the target entity is not found: `app/stores/tickets.ts` checks `if (ticket)` and `app/stores/alerts.ts` checks `if (alert)`.
- Form validation uses local reactive error state rather than exceptions: `app/pages/login.vue` sets `error.value` when email or password is missing.
- Do not introduce thrown exceptions for routine UI validation unless the calling code already handles them.
## Logging
- No `console.*` logging is used in `app/`.
- Do not add console logging for normal UI flows.
- For new observability needs, add an explicit logging or telemetry pattern first rather than scattering `console.log`.
## Comments
- Keep comments rare. The only application comment observed is a short auth-state note in `app/middleware/auth.global.ts`.
- Prefer descriptive names, typed helpers, and small local functions over comments.
- Add comments only for non-obvious framework lifecycle behavior or complex business logic.
- Not used in `app/types/index.ts`, stores, composables, or pages.
- Do not add JSDoc for straightforward entity interfaces or simple helpers.
## Function Design
## Module Design
- Use named exports for composables and data modules: `useFormatters` in `app/composables/useFormatters.ts`, `customers` in `app/data/customers.ts`, and `tickets` in `app/data/tickets.ts`.
- Use named `export const useXStore = defineStore(...)` for Pinia stores in `app/stores/auth.ts`, `app/stores/tickets.ts`, and `app/stores/alerts.ts`.
- Use `export default` only for Nuxt-required plugin, middleware, and config entry points: `app/plugins/auth.client.ts`, `app/middleware/auth.global.ts`, and `nuxt.config.ts`.
- `app/types/index.ts` is the only barrel-style shared module.
- No barrel files are used for stores, data fixtures, pages, or composables. Import those modules directly by file path.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
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
- Use Nuxt conventions first: routes live in `app/pages/`, layout selection uses `definePageMeta`, plugins live in `app/plugins/`, middleware lives in `app/middleware/`.
- Keep most view state local to the route component with `ref`, `reactive`, and `computed`; promote state to Pinia only when multiple controls mutate the same domain data.
- Import mock data directly from `app/data/` for read-only pages and seed mutable Pinia stores from those same modules for interactive pages.
- Use `~/types` unions to constrain domain statuses, plan names, priorities, severities, and Nuxt UI badge colors.
- Use Nuxt UI components and Tailwind utility classes in page templates instead of custom component libraries.
## Layers
- Purpose: Compose Nuxt UI, global metadata, layout, current page, module registration, global CSS, and UI theme colors.
- Location: `app/app.vue`, `nuxt.config.ts`, `app/app.config.ts`, `app/assets/css/main.css`
- Contains: App wrapper, Nuxt config, UI theme config, Tailwind/Nuxt UI imports.
- Depends on: `@nuxt/ui`, `@pinia/nuxt`, `@nuxtjs/i18n`, Nuxt composables.
- Used by: Every route.
- Purpose: Map URLs to page components and wrap authenticated routes with dashboard chrome.
- Location: `app/pages/`, `app/layouts/dashboard.vue`
- Contains: Dashboard route pages, login route, dynamic customer detail route, navigation definitions, responsive shell.
- Depends on: Nuxt file-based routing, `useRoute`, `useRouter`, `useI18n`, `useAuthStore`, `app/data/alerts.ts`.
- Used by: Nuxt router and `app/app.vue`.
- Purpose: Provide mock client-side auth persistence and route redirection.
- Location: `app/stores/auth.ts`, `app/plugins/auth.client.ts`, `app/middleware/auth.global.ts`, `app/pages/login.vue`
- Contains: Auth store, localStorage marker restoration, login/logout actions, route guard.
- Depends on: Pinia and browser `localStorage`; server execution is explicitly skipped in middleware.
- Used by: Global middleware, client plugin, dashboard layout, login page.
- Purpose: Provide typed seed data for all dashboard domains.
- Location: `app/data/customers.ts`, `app/data/subscriptions.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`, `app/data/invoices.ts`, `app/data/notes.ts`, `app/data/activities.ts`
- Contains: Exported arrays typed against `app/types/index.ts`.
- Depends on: Type-only imports from `~/types`.
- Used by: Pages and Pinia stores.
- Purpose: Hold mutable in-session state for auth, tickets, and alerts.
- Location: `app/stores/auth.ts`, `app/stores/tickets.ts`, `app/stores/alerts.ts`
- Contains: Pinia options stores with `state` and `actions`.
- Depends on: `pinia`, `~/types`, data seed modules.
- Used by: `app/pages/tickets.vue`, `app/pages/alerts.vue`, `app/layouts/dashboard.vue`, auth plugin/middleware/login.
- Purpose: Share reusable presentation logic without centralizing page state.
- Location: `app/composables/useFormatters.ts`
- Contains: Currency, date, date-time, and relative-time formatters.
- Depends on: `useI18n`, Vue `computed`, browser date/Intl APIs.
- Used by: Dashboard, customer, subscription, ticket, and alert pages.
- Purpose: Provide translated UI strings and global UI styling.
- Location: `i18n/locales/*.json`, `nuxt.config.ts`, `app/app.config.ts`, `app/assets/css/main.css`
- Contains: Locale JSON files, i18n module config, primary/neutral UI colors, Tailwind/Nuxt UI imports.
- Depends on: `@nuxtjs/i18n`, `@nuxt/ui`, Tailwind CSS.
- Used by: All pages and layout through `$t()` / `useI18n()`.
## Data Flow
### Authenticated Page Request Path
### Login Flow
### Read-Only Domain Page Flow
### Mutable Domain Page Flow
### Chart Flow
- Use Pinia stores in `app/stores/` for auth and mutable domain records.
- Use page-local `ref`, `reactive`, and `computed` for filters, selected rows, tabs, status controls, and temporary form state.
- Use direct `app/data/` imports for read-only data views.
- Use `localStorage` only in client-only auth paths guarded by `import.meta.client`, `import.meta.server`, or `.client.ts`.
## Key Abstractions
- Purpose: Own a route's view model and UI.
- Examples: `app/pages/index.vue`, `app/pages/customers/index.vue`, `app/pages/customers/[id].vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`
- Pattern: `<script setup lang="ts">` imports data/stores/types, defines local computed state, and renders Nuxt UI components.
- Purpose: Provide authenticated navigation and global dashboard controls.
- Examples: `app/layouts/dashboard.vue`
- Pattern: Layout-scoped navigation arrays are computed from translations; route state controls active links; auth state controls user menu.
- Purpose: Share and mutate domain state across a page and app shell.
- Examples: `app/stores/auth.ts`, `app/stores/tickets.ts`, `app/stores/alerts.ts`
- Pattern: `defineStore('name', { state: () => (...), actions: { ... } })`; seed domain arrays with shallow copies from `app/data/`.
- Purpose: Provide typed mock records.
- Examples: `app/data/customers.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`
- Pattern: `import type { X } from '~/types'` and `export const xs: X[] = [...]`.
- Purpose: Centralize interfaces and string unions used by pages, stores, and data modules.
- Examples: `app/types/index.ts`
- Pattern: Export `interface` for record shapes and `type` unions for statuses, priorities, severities, plan tiers, and UI color names.
- Purpose: Share presentation logic that depends on active locale.
- Examples: `app/composables/useFormatters.ts`
- Pattern: Nuxt auto-imported function returning stable formatter methods.
## Entry Points
- Location: `app/app.vue`
- Triggers: Nuxt app render.
- Responsibilities: Set viewport/favicon/head metadata and render `UApp`, `NuxtLayout`, and `NuxtPage`.
- Location: `nuxt.config.ts`
- Triggers: Nuxt build/dev runtime.
- Responsibilities: Register modules, i18n locales, global CSS, chart dependency optimization, devtools setting, and compatibility date.
- Location: `app/pages/index.vue`, `app/pages/customers/index.vue`, `app/pages/customers/[id].vue`, `app/pages/subscriptions.vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`, `app/pages/settings.vue`
- Triggers: URL navigation.
- Responsibilities: Render authenticated dashboard experiences under `app/layouts/dashboard.vue`.
- Location: `app/pages/login.vue`
- Triggers: `/login` URL and middleware redirects.
- Responsibilities: Render standalone login UI and call `useAuthStore.login()`.
- Location: `app/middleware/auth.global.ts`
- Triggers: Every Nuxt route navigation.
- Responsibilities: Enforce client-side auth redirects.
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
### Browser APIs Outside Client Guards
### Page-Level Domain Types
## Error Handling
- Use `throw createError({ statusCode, statusMessage })` for invalid dynamic route entities, as in `app/pages/customers/[id].vue`.
- Use local `error` refs for form-level validation and show Nuxt UI alerts, as in `app/pages/login.vue`.
- Store actions silently ignore missing IDs in `app/stores/tickets.ts` and `app/stores/alerts.ts`.
- Empty states are rendered in templates when filtered arrays have no results.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
