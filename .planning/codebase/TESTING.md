# Testing Patterns

**Analysis Date:** 2026-06-08

## Test Framework

**Runner:**
- Not configured.
- No `vitest.config.*`, `jest.config.*`, `playwright.config.*`, `cypress.config.*`, `*.test.*`, or `*.spec.*` files are present.
- `package.json` defines `test` as `echo "No tests configured"`.

**Assertion Library:**
- Not detected.

**Run Commands:**
```bash
npm run test        # Placeholder only; prints "No tests configured"
npm run typecheck   # Active TypeScript/Nuxt quality gate
npm run build       # Build verification through Nuxt
npm run check       # Uses bun script chain from package.json
```

## Test File Organization

**Location:**
- Not established. The repo has no `tests/`, `e2e/`, `__tests__/`, colocated `*.test.ts`, or colocated `*.spec.ts` files.

**Naming:**
- Not established.

**Structure:**
```text
Not detected
```

## Test Structure

**Suite Organization:**
```typescript
// Not detected in this repository.
```

**Patterns:**
- No setup, teardown, fixture factory, or assertion patterns are present.
- Current automated checks are script-level checks in `package.json` and `.github/workflows/ci.yml`.
- CI runs dependency install, lint placeholder, and Nuxt typecheck through `.github/workflows/ci.yml`.

## Mocking

**Framework:** Not configured

**Patterns:**
```typescript
// Not detected in this repository.
```

**What to Mock:**
- Not established by current code.
- If tests are introduced, mock browser-only APIs used by auth flows: `localStorage` in `app/stores/auth.ts`, `app/plugins/auth.client.ts`, and `app/middleware/auth.global.ts`.
- If tests are introduced for time-based formatting, control time around `Date.now()` in `app/composables/useFormatters.ts`.

**What NOT to Mock:**
- Do not mock static fixture modules by default; page logic directly consumes `app/data/customers.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`, `app/data/invoices.ts`, `app/data/subscriptions.ts`, `app/data/activities.ts`, and `app/data/notes.ts`.
- Do not mock Pinia stores when testing store actions themselves; exercise `updateStatus` in `app/stores/tickets.ts` and `app/stores/alerts.ts` against store state.

## Fixtures and Factories

**Test Data:**
```typescript
// Production fixture modules are typed arrays, for example:
import type { Ticket } from '~/types'

export const tickets: Ticket[] = [
  // domain objects
]
```

**Location:**
- Current domain fixture data lives in `app/data/*.ts`.
- Shared entity types live in `app/types/index.ts`.
- No separate test fixtures or factories exist.

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# Not available; no coverage command is configured.
```

## Test Types

**Unit Tests:**
- Not used.
- Natural unit-test candidates are pure formatting helpers in `app/composables/useFormatters.ts`, Pinia store actions in `app/stores/tickets.ts` and `app/stores/alerts.ts`, and page-local mapping helpers such as badge color functions in `app/pages/tickets.vue`, `app/pages/alerts.vue`, and `app/pages/customers/index.vue`.

**Integration Tests:**
- Not used.
- Natural integration-test candidates are auth restore and redirects across `app/plugins/auth.client.ts`, `app/middleware/auth.global.ts`, and `app/stores/auth.ts`.

**E2E Tests:**
- Not used.
- No browser automation framework or E2E folder is configured.
- If E2E tests are introduced for forms or user inputs, person names in test data must include `Test`, such as `Alex Test` or `Test User`.

## Common Patterns

**Async Testing:**
```typescript
// Not detected.
// The primary async UI flow is handleLogin in app/pages/login.vue.
```

**Error Testing:**
```typescript
// Not detected.
// Current validation uses local error state in app/pages/login.vue.
```

---

*Testing analysis: 2026-06-08*
