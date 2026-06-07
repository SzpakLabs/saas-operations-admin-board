# External Integrations

**Analysis Date:** 2026-06-08

## APIs & External Services

**Implemented Services:**
- Not detected. Source search found no `fetch`, `$fetch`, `useFetch`, `useAsyncData`, SDK clients, API route calls, or external service client imports in `app/`, `nuxt.config.ts`, `package.json`, `vercel.json`, or `README.md`.

**Static Integration UI:**
- Slack - Display-only card in `app/pages/settings.vue`.
  - SDK/Client: Not installed.
  - Auth: Not configured.
- Stripe - Display-only card in `app/pages/settings.vue`; marked `connected: true` in local UI state only.
  - SDK/Client: Not installed.
  - Auth: Not configured.
- HubSpot - Display-only card in `app/pages/settings.vue`.
  - SDK/Client: Not installed.
  - Auth: Not configured.
- PagerDuty - Display-only card in `app/pages/settings.vue`.
  - SDK/Client: Not installed.
  - Auth: Not configured.

**Internationalization:**
- Local i18n message files are loaded from `i18n/locales/*.json` through `@nuxtjs/i18n` configuration in `nuxt.config.ts`.
- This is local file integration only; no translation API provider is configured.

## Data Storage

**Databases:**
- Not detected.
  - Connection: Not applicable.
  - Client: Not installed. No Prisma, Supabase, Firebase, SQL, MongoDB, Redis, or ORM client dependency is present in `package.json`.

**Application Data:**
- Static in-repo mock data lives in:
  - `app/data/customers.ts`
  - `app/data/subscriptions.ts`
  - `app/data/tickets.ts`
  - `app/data/alerts.ts`
  - `app/data/activities.ts`
  - `app/data/invoices.ts`
  - `app/data/notes.ts`
- Runtime mutations are local Pinia state only:
  - Ticket status updates in `app/stores/tickets.ts`
  - Alert status updates in `app/stores/alerts.ts`

**File Storage:**
- Local repository assets only. Public files are in `public/`.
- No upload provider, object storage SDK, or filesystem persistence layer is detected.

**Caching:**
- Not detected.
- No Redis, KV, cache service, or Nuxt server cache integration is configured.

## Authentication & Identity

**Auth Provider:**
- Custom fake client-side auth.
  - Implementation: `app/stores/auth.ts` sets `isAuthenticated` and stores `opsboard_auth=true` in `localStorage`.
  - Client restore: `app/plugins/auth.client.ts` reads `localStorage` before mount.
  - Route guard: `app/middleware/auth.global.ts` redirects unauthenticated users to `/login` and authenticated users away from `/login`.
  - Identity data: Hard-coded user profile in `app/stores/auth.ts`.

**External Identity Providers:**
- Not detected. No Clerk, Auth0, Firebase Auth, Supabase Auth, OAuth, OIDC, or session backend is configured.

## Monitoring & Observability

**Error Tracking:**
- Not detected. No Sentry, Bugsnag, Rollbar, LogRocket, or similar dependency is present.

**Analytics/Product Telemetry:**
- Not detected. No PostHog, Segment, Google Analytics, Plausible, or similar dependency is present.

**Logs:**
- No structured logging layer is detected.
- The app is frontend-only in current source; production platform logs are limited to Nuxt/Vercel build/runtime behavior.

## CI/CD & Deployment

**Hosting:**
- Vercel is the documented deployment target in `README.md`.
- `vercel.json` sets the build command to `npm run build`.

**CI Pipeline:**
- Not detected. No `.github/workflows`, GitLab CI, CircleCI, or similar CI config file is present in the mapped file list.

**Dependency Automation:**
- Renovate config exists at `renovate.json`.

## Environment Configuration

**Required env vars:**
- None detected.
- No `.env*` files were detected, and source searches found no env variable reads.

**Secrets location:**
- Not applicable for the current codebase.
- Do not introduce secrets into source files. If real integrations are added, use Nuxt runtime config in `nuxt.config.ts` and deployment-managed secrets.

## Webhooks & Callbacks

**Incoming:**
- Not detected.
- There is no `server/` directory, Nuxt API route, webhook handler, or callback endpoint.

**Outgoing:**
- Not detected.
- The word `webhook` appears only in mock ticket/activity content in `app/data/tickets.ts` and `app/data/activities.ts`.

## Integration Implementation Guidance

- Add real API/server integrations under Nuxt server routes or server utilities, not directly inside page components.
- Keep browser-exposed values separate from private secrets by using Nuxt runtime config.
- Preserve the current data boundaries: shared types in `app/types/index.ts`, UI state in `app/stores/`, and display pages in `app/pages/`.
- Replace display-only integration cards in `app/pages/settings.vue` with real status fetched from a server-backed source when implementing provider connections.

---

*Integration audit: 2026-06-08*
