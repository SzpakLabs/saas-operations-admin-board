# Phase 01 - Brownfield Walking Skeleton

## Skeleton Goal

This project already has a working Nuxt app. For Phase 1, the walking skeleton is the verified public demo path rather than a new scaffold:

1. Visitor opens `/login`.
2. Visitor sees or uses demo credentials.
3. Visitor signs in through fake auth.
4. Visitor lands on `/`.
5. Visitor sees core operations signals in the first viewport.
6. Visitor can navigate to customers, subscriptions, tickets, alerts, and settings.

## Existing Skeleton Components

| Layer | Existing File |
|-------|---------------|
| App shell | `app/app.vue` |
| Fake auth store | `app/stores/auth.ts` |
| Auth hydration | `app/plugins/auth.client.ts` |
| Route guard | `app/middleware/auth.global.ts` |
| Login route | `app/pages/login.vue` |
| Overview route | `app/pages/index.vue` |
| Dashboard shell | `app/layouts/dashboard.vue` |
| Mock data | `app/data/*.ts` |

## Phase 1 Acceptance

- The skeleton is accepted when login, overview, and required navigation routes work without private setup.
- No real database read/write is required because v1 explicitly uses typed mock data and no backend.
- Local UI interaction proof belongs primarily to Phase 2; Phase 1 only needs navigation and first-screen confidence.

