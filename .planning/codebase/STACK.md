# Technology Stack

**Analysis Date:** 2026-06-08

## Languages

**Primary:**
- TypeScript 5.8.x - Nuxt app source, stores, composables, data fixtures, config, and shared interfaces in `app/**/*.ts`, `app/**/*.vue`, `nuxt.config.ts`, `tailwind.config.ts`, and `app/types/index.ts`.
- Vue Single File Components - Route pages, layout, and root app in `app/pages/**/*.vue`, `app/layouts/dashboard.vue`, and `app/app.vue`.

**Secondary:**
- JSON - npm lockfile and package manifest in `package.json` and `package-lock.json`; i18n locale catalogs in `i18n/locales/*.json`; deployment metadata in `vercel.json`.
- CSS - Global Tailwind/Nuxt UI stylesheet in `app/assets/css/main.css`.

## Runtime

**Environment:**
- Node.js runtime for Nuxt 4/Nitro builds. No `.nvmrc`, `.node-version`, `engines`, or `packageManager` field is present, so use the Node version supported by Nuxt 4 and the deployment platform.
- Browser runtime for the dashboard UI. Auth persistence uses `localStorage` in `app/stores/auth.ts`, `app/plugins/auth.client.ts`, and `app/middleware/auth.global.ts`.

**Package Manager:**
- npm - `package-lock.json` lockfile is present.
- `package.json` also includes a `check` script that invokes `bun run ...`, but no `bun.lock` or `bun.lockb` is present. Prefer npm commands unless the project explicitly standardizes on Bun.

## Frameworks

**Core:**
- Nuxt `^4.4.2` - App framework, routing, build, SSR/static generation, and Nitro output. Configured in `nuxt.config.ts`.
- Vue 3 - Component runtime provided by Nuxt; route pages live under `app/pages/`.
- Nuxt UI `^4.6.0` - UI component system configured as a Nuxt module in `nuxt.config.ts` and themed in `app/app.config.ts`.
- Pinia `^3.0.4` with `@pinia/nuxt` `^0.11.3` - Client state stores in `app/stores/auth.ts`, `app/stores/tickets.ts`, and `app/stores/alerts.ts`.
- `@nuxtjs/i18n` `^10.2.4` - Locale routing and message loading configured in `nuxt.config.ts`; locale files live in `i18n/locales/*.json`.

**UI/Data Visualization:**
- Tailwind CSS `^4.2.2` - Styling utility framework referenced by `tailwind.config.ts` and global CSS in `app/assets/css/main.css`.
- Chart.js `^4.4.0` and `vue-chartjs` `^5.3.0` - Dashboard charts in `app/pages/index.vue`; Vite dependency pre-bundling is configured in `nuxt.config.ts`.
- `@iconify-json/lucide` `^1.2.100` - Lucide icon set used through Nuxt UI/Iconify names such as `i-lucide-*`.

**Testing:**
- No test runner is configured. `package.json` has `"test": "echo \"No tests configured\""`.
- Type checking is available through `nuxt typecheck` and `vue-tsc` via `package.json`.

**Build/Dev:**
- Nuxt CLI - `npm run dev`, `npm run build`, `npm run preview`, `npm run generate`, and `npm run typecheck` in `package.json`.
- Vite - Used through Nuxt; explicit `optimizeDeps.include` entries for `vue-chartjs` and `chart.js` are in `nuxt.config.ts`.
- TypeScript project references - Root `tsconfig.json` delegates to Nuxt-generated `.nuxt/tsconfig.*.json` files.

## Key Dependencies

**Critical:**
- `nuxt` `^4.4.2` - Owns app lifecycle, pages, middleware, plugins, and production build.
- `@nuxt/ui` `^4.6.0` - Provides components such as `UCard`, `UButton`, `UTabs`, `USwitch`, `UBadge`, and `UIcon` used throughout `app/pages/*.vue`.
- `@pinia/nuxt` `^0.11.3` and `pinia` `^3.0.4` - Required for auth, tickets, and alert state.
- `@nuxtjs/i18n` `^10.2.4` - Required because pages call `useI18n()` or `$t()` and message files live in `i18n/locales/`.

**Infrastructure:**
- `typescript` `^5.8.0`, `vue-tsc` `^3.2.6`, and `@vue/language-core` `^3.2.6` - Static type analysis.
- `tailwindcss` `^4.2.2` - Utility CSS.
- `chart.js` `^4.4.0` and `vue-chartjs` `^5.3.0` - KPI and dashboard visualizations.
- `@iconify-json/lucide` `^1.2.100` - Icon assets consumed by Nuxt UI.

## Configuration

**Environment:**
- No `.env*` files were detected during mapping.
- No env access was detected in source: searches for `process.env`, `import.meta.env`, `runtimeConfig`, `NUXT_`, `DATABASE_URL`, API keys, tokens, secrets, or webhook env names returned no source matches.
- Nuxt runtime config is not defined in `nuxt.config.ts`.

**Build:**
- `nuxt.config.ts` registers modules, i18n, global CSS, Vite optimize deps, disabled devtools, and `compatibilityDate: "2025-01-15"`.
- `tailwind.config.ts` scans `app/components`, `app/layouts`, `app/pages`, `app/plugins`, and `app/app.vue`. There is no `app/components` directory currently.
- `tsconfig.json` references Nuxt-generated TypeScript configs under `.nuxt/`.
- `vercel.json` sets `"buildCommand": "npm run build"`.
- `renovate.json` is present for dependency update automation.

**Application Data:**
- Domain data is static TypeScript fixture data under `app/data/*.ts`.
- Shared domain interfaces live in `app/types/index.ts`.
- Formatting helpers live in `app/composables/useFormatters.ts`.

## Platform Requirements

**Development:**
- Install dependencies with `npm install`.
- Run locally with `npm run dev`.
- Validate types with `npm run typecheck`.
- Build with `npm run build`.

**Production:**
- Vercel deployment is configured through `vercel.json` and documented in `README.md`.
- No production environment variables are required by the current code.
- No backend service, database, queue, or server API directory is present.

---

*Stack analysis: 2026-06-08*
