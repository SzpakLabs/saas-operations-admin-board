# Coding Conventions

**Analysis Date:** 2026-06-08

## Naming Patterns

**Files:**
- Use Nuxt app-directory conventions under `app/`: route files in `app/pages/`, layouts in `app/layouts/`, middleware in `app/middleware/`, plugins in `app/plugins/`, composables in `app/composables/`, stores in `app/stores/`, and shared types in `app/types/index.ts`.
- Use kebab-free, domain-named route files for top-level pages: `app/pages/tickets.vue`, `app/pages/alerts.vue`, `app/pages/subscriptions.vue`, and `app/pages/settings.vue`.
- Use Nuxt dynamic route bracket syntax for route params: `app/pages/customers/[id].vue`.
- Use `useX.ts` naming for composables: `app/composables/useFormatters.ts`.
- Use plural domain names for fixture data modules: `app/data/customers.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`, `app/data/invoices.ts`, `app/data/subscriptions.ts`, `app/data/activities.ts`, and `app/data/notes.ts`.

**Functions:**
- Use camelCase for local helpers and actions: `formatCurrency`, `formatDateTime`, `timeAgo` in `app/composables/useFormatters.ts`; `setSort`, `statusColor`, `statusLabel`, `planColor`, and `healthColor` in `app/pages/customers/index.vue`.
- Name Pinia store composables as `use{Domain}Store`: `useAuthStore` in `app/stores/auth.ts`, `useTicketsStore` in `app/stores/tickets.ts`, and `useAlertsStore` in `app/stores/alerts.ts`.
- Use domain verb names for store actions: `login`, `logout`, and `updateStatus` in `app/stores/auth.ts`, `app/stores/tickets.ts`, and `app/stores/alerts.ts`.

**Variables:**
- Use camelCase for refs, computed values, and local constants: `searchQuery`, `mobileMenuOpen`, `unreadAlerts`, and `userMenuItems` in `app/layouts/dashboard.vue`; `statusFilter`, `planFilter`, `sortKey`, `sortDir`, and `paginated` in `app/pages/customers/index.vue`.
- Use `allX` aliases when importing immutable fixture arrays into page-local filtering flows: `customers as allCustomers` in `app/pages/customers/index.vue` and `subscriptions as allSubs` in `app/pages/subscriptions.vue`.
- Use short callback parameters for simple array transformations only when the domain remains obvious: `customers.filter(c => ...)` in `app/pages/index.vue` and `alerts.filter(a => ...)` in `app/layouts/dashboard.vue`.

**Types:**
- Use PascalCase interfaces for entity shapes in `app/types/index.ts`: `Customer`, `Subscription`, `Ticket`, `Invoice`, `Alert`, `Activity`, `InternalNote`, and `KpiData`.
- Use PascalCase union types for enums represented as strings: `CustomerStatus`, `PlanTier`, `TicketPriority`, `TicketStatus`, `AlertSeverity`, `AlertStatus`, and `BadgeColor` in `app/types/index.ts`.
- Use literal union types instead of TypeScript `enum`.
- Use `Record<UnionType, ValueType>` for exhaustive display maps: `Record<CustomerStatus, BadgeColor>` in `app/pages/customers/index.vue`, `Record<TicketStatus, BadgeColor>` in `app/pages/tickets.vue`, and `Record<AlertSeverity, BadgeColor>` in `app/pages/index.vue`.

## Code Style

**Formatting:**
- `.editorconfig` defines 2-space indentation, LF line endings, UTF-8 charset, trimmed trailing whitespace, and final newlines.
- Existing TypeScript and Vue files use semicolon-free style.
- Existing string literals mostly use single quotes in application files such as `app/stores/auth.ts`, `app/pages/tickets.vue`, and `app/composables/useFormatters.ts`; `nuxt.config.ts` uses both single and double quotes. Prefer single quotes in app code.
- Use trailing commas only where the existing multiline call or object already has them. Files such as `app/pages/index.vue` and `app/composables/useFormatters.ts` generally omit trailing commas in object literals and import lists.
- Keep Vue single-file components ordered as `<script setup lang="ts">` first, then `<template>`, as seen in `app/pages/index.vue`, `app/pages/customers/index.vue`, `app/pages/tickets.vue`, and `app/layouts/dashboard.vue`.

**Linting:**
- No ESLint, Prettier, or Biome config is present.
- `package.json` defines `lint` as `echo "No lint configured"`.
- `.github/workflows/ci.yml` runs `pnpm run lint` and `pnpm run typecheck`; lint currently succeeds by placeholder script rather than static analysis.
- `package.json` defines `typecheck` as `nuxt typecheck`; use this as the active quality gate.

## Import Organization

**Order:**
1. External package imports: `vue-chartjs` and `chart.js` in `app/pages/index.vue`; `pinia` in `app/stores/auth.ts`.
2. Nuxt aliases for stores, data, composables, and app modules: `~/stores/auth`, `~/data/alerts`, `~/data/customers`, and `~/data/tickets`.
3. Type-only imports from `~/types`: `import type { BadgeColor, Customer, CustomerStatus, PlanTier } from '~/types'` in `app/pages/customers/index.vue`.

**Path Aliases:**
- Use Nuxt `~` alias for app-local modules: `~/stores/auth`, `~/types`, `~/data/tickets`, and `~/assets/css/main.css`.
- Do not use relative parent imports between app modules when a `~/` alias is available.

## Error Handling

**Patterns:**
- Current app code uses optimistic UI state and guard clauses rather than thrown errors.
- Auth route protection returns early on server-side execution and redirects client-side in `app/middleware/auth.global.ts`.
- Store updates are no-op when the target entity is not found: `app/stores/tickets.ts` checks `if (ticket)` and `app/stores/alerts.ts` checks `if (alert)`.
- Form validation uses local reactive error state rather than exceptions: `app/pages/login.vue` sets `error.value` when email or password is missing.
- Do not introduce thrown exceptions for routine UI validation unless the calling code already handles them.

## Logging

**Framework:** Not detected

**Patterns:**
- No `console.*` logging is used in `app/`.
- Do not add console logging for normal UI flows.
- For new observability needs, add an explicit logging or telemetry pattern first rather than scattering `console.log`.

## Comments

**When to Comment:**
- Keep comments rare. The only application comment observed is a short auth-state note in `app/middleware/auth.global.ts`.
- Prefer descriptive names, typed helpers, and small local functions over comments.
- Add comments only for non-obvious framework lifecycle behavior or complex business logic.

**JSDoc/TSDoc:**
- Not used in `app/types/index.ts`, stores, composables, or pages.
- Do not add JSDoc for straightforward entity interfaces or simple helpers.

## Function Design

**Size:** Keep reusable logic in composables or stores, and keep page helpers local when used by one page. `app/composables/useFormatters.ts` centralizes formatting, while badge color and label helpers stay in page files such as `app/pages/tickets.vue`.

**Parameters:** Use explicit primitive or union types for helper parameters: `formatCurrency(amount: number)`, `formatDate(date: string)`, `statusColor(status: CustomerStatus)`, and `priorityColor(priority: TicketPriority)`.

**Return Values:** Annotate exported composable helper returns where simple and stable, as in `formatCurrency(amount: number): string`; page-local display helpers may rely on inference when returning mapped values.

## Module Design

**Exports:**
- Use named exports for composables and data modules: `useFormatters` in `app/composables/useFormatters.ts`, `customers` in `app/data/customers.ts`, and `tickets` in `app/data/tickets.ts`.
- Use named `export const useXStore = defineStore(...)` for Pinia stores in `app/stores/auth.ts`, `app/stores/tickets.ts`, and `app/stores/alerts.ts`.
- Use `export default` only for Nuxt-required plugin, middleware, and config entry points: `app/plugins/auth.client.ts`, `app/middleware/auth.global.ts`, and `nuxt.config.ts`.

**Barrel Files:**
- `app/types/index.ts` is the only barrel-style shared module.
- No barrel files are used for stores, data fixtures, pages, or composables. Import those modules directly by file path.

---

*Convention analysis: 2026-06-08*
