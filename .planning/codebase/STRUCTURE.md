# Codebase Structure

**Analysis Date:** 2026-06-08

## Directory Layout

```text
saas-operations-admin-dashboard/
├── app/                         # Nuxt app source
│   ├── app.vue                  # Root app shell
│   ├── app.config.ts            # Nuxt UI theme config
│   ├── assets/css/main.css      # Global Tailwind/Nuxt UI CSS entry
│   ├── composables/             # Auto-imported Vue/Nuxt composables
│   ├── data/                    # Typed mock data arrays
│   ├── layouts/                 # Nuxt layouts
│   ├── middleware/              # Nuxt route middleware
│   ├── pages/                   # File-based routes
│   ├── plugins/                 # Nuxt plugins
│   ├── stores/                  # Pinia stores
│   └── types/                   # Shared domain TypeScript types
├── i18n/locales/                # Locale JSON dictionaries
├── public/                      # Static public assets
├── .planning/codebase/          # GSD codebase map documents
├── .vercel/                     # Vercel project metadata
├── .vscode/                     # Editor settings
├── nuxt.config.ts               # Nuxt module/runtime config
├── package.json                 # Scripts and dependencies
├── tsconfig.json                # TypeScript/Nuxt project config
├── tailwind.config.ts           # Tailwind config
├── vercel.json                  # Vercel config
├── renovate.json                # Renovate config
├── README.md                    # Project readme
├── CLAUDE.md                    # Agent/project notes
└── PORTFOLIO_NOTES.md           # Portfolio notes
```

## Directory Purposes

**`app/`:**
- Purpose: Contains all Nuxt application source.
- Contains: App shell, route pages, layout, stores, composables, data, types, middleware, plugins, and CSS.
- Key files: `app/app.vue`, `app/layouts/dashboard.vue`, `app/pages/index.vue`, `app/types/index.ts`.

**`app/pages/`:**
- Purpose: Defines routes through Nuxt file-based routing.
- Contains: Dashboard landing page, customer list/detail routes, subscriptions, tickets, alerts, settings, and login.
- Key files: `app/pages/index.vue`, `app/pages/login.vue`, `app/pages/customers/index.vue`, `app/pages/customers/[id].vue`, `app/pages/tickets.vue`, `app/pages/alerts.vue`.

**`app/layouts/`:**
- Purpose: Defines reusable route shells.
- Contains: `dashboard.vue` authenticated dashboard shell.
- Key files: `app/layouts/dashboard.vue`.

**`app/stores/`:**
- Purpose: Holds Pinia stores for shared mutable state.
- Contains: Auth, tickets, and alerts stores.
- Key files: `app/stores/auth.ts`, `app/stores/tickets.ts`, `app/stores/alerts.ts`.

**`app/data/`:**
- Purpose: Holds typed mock records used as the app data source.
- Contains: Customer, subscription, ticket, alert, invoice, note, and activity arrays.
- Key files: `app/data/customers.ts`, `app/data/subscriptions.ts`, `app/data/tickets.ts`, `app/data/alerts.ts`, `app/data/invoices.ts`, `app/data/notes.ts`, `app/data/activities.ts`.

**`app/types/`:**
- Purpose: Centralizes shared TypeScript domain contracts.
- Contains: Interfaces and string unions for dashboard records and UI color names.
- Key files: `app/types/index.ts`.

**`app/composables/`:**
- Purpose: Holds auto-imported reusable composition functions.
- Contains: Formatting helpers.
- Key files: `app/composables/useFormatters.ts`.

**`app/middleware/`:**
- Purpose: Holds Nuxt route middleware.
- Contains: Global client auth guard.
- Key files: `app/middleware/auth.global.ts`.

**`app/plugins/`:**
- Purpose: Holds Nuxt plugins.
- Contains: Client auth hydration plugin.
- Key files: `app/plugins/auth.client.ts`.

**`app/assets/`:**
- Purpose: Holds app-bundled assets.
- Contains: Global CSS entry for Tailwind and Nuxt UI.
- Key files: `app/assets/css/main.css`.

**`i18n/locales/`:**
- Purpose: Holds translation dictionaries loaded by `@nuxtjs/i18n`.
- Contains: `en`, `es`, `it`, `fr`, and `de` JSON files.
- Key files: `i18n/locales/en.json`, `i18n/locales/es.json`, `i18n/locales/it.json`, `i18n/locales/fr.json`, `i18n/locales/de.json`.

**`public/`:**
- Purpose: Holds static assets served directly.
- Contains: Favicons and robots file.
- Key files: `public/favicon.svg`, `public/favicon.ico`, `public/robots.txt`.

**`.planning/codebase/`:**
- Purpose: Holds GSD-generated codebase analysis documents.
- Contains: Architecture and structure maps from this arch pass.
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`.

## Key File Locations

**Entry Points:**
- `app/app.vue`: Root app shell that sets metadata and renders `UApp`, `NuxtLayout`, and `NuxtPage`.
- `nuxt.config.ts`: Nuxt configuration for modules, i18n, CSS, Vite optimization, and compatibility.
- `app/pages/index.vue`: Dashboard home route `/`.
- `app/pages/login.vue`: Standalone `/login` route.
- `app/middleware/auth.global.ts`: Global route guard.
- `app/plugins/auth.client.ts`: Client lifecycle auth hydration.

**Configuration:**
- `package.json`: Scripts and dependency declarations.
- `tsconfig.json`: TypeScript/Nuxt type configuration.
- `nuxt.config.ts`: Nuxt, Vite, i18n, CSS, and module configuration.
- `app/app.config.ts`: Nuxt UI color configuration.
- `tailwind.config.ts`: Tailwind configuration.
- `vercel.json`: Vercel deployment configuration.
- `renovate.json`: Dependency update configuration.
- `.editorconfig`: Editor formatting defaults.
- `.vscode/settings.json`: Workspace editor settings.

**Core Logic:**
- `app/pages/*.vue`: Route-specific view models and UI.
- `app/layouts/dashboard.vue`: Dashboard shell, navigation, header, notification menu, language menu, and user menu.
- `app/stores/*.ts`: Shared mutable state and domain actions.
- `app/composables/useFormatters.ts`: Shared formatting behavior.
- `app/types/index.ts`: Domain contracts.
- `app/data/*.ts`: Typed mock data.

**Testing:**
- Not detected. `package.json` defines `test` as `echo "No tests configured"`.
- Place future tests beside source files or in a dedicated test directory only after adding a project test runner configuration.

**Localization:**
- `i18n/locales/en.json`: English strings and default locale content.
- `i18n/locales/es.json`: Spanish strings.
- `i18n/locales/it.json`: Italian strings.
- `i18n/locales/fr.json`: French strings.
- `i18n/locales/de.json`: German strings.

## Naming Conventions

**Files:**
- Nuxt pages use route filenames: `app/pages/index.vue`, `app/pages/login.vue`, `app/pages/customers/index.vue`.
- Dynamic Nuxt route segments use brackets: `app/pages/customers/[id].vue`.
- Nuxt middleware uses `.global.ts` for global middleware: `app/middleware/auth.global.ts`.
- Client-only Nuxt plugins use `.client.ts`: `app/plugins/auth.client.ts`.
- Pinia stores use domain nouns: `app/stores/auth.ts`, `app/stores/tickets.ts`, `app/stores/alerts.ts`.
- Composables use `useX` naming: `app/composables/useFormatters.ts`.
- Data modules use plural domain nouns: `app/data/customers.ts`, `app/data/subscriptions.ts`, `app/data/alerts.ts`.
- Type registry currently uses a single barrel-style file: `app/types/index.ts`.
- Locale files use two-letter locale codes: `i18n/locales/en.json`, `i18n/locales/es.json`.

**Directories:**
- Nuxt-owned app directories use framework names: `pages`, `layouts`, `middleware`, `plugins`, `composables`.
- Domain mock data lives in `app/data/`, not beside pages.
- Shared mutable state lives in `app/stores/`, not in `app/data/`.
- Static assets served as-is live in `public/`; bundled CSS lives in `app/assets/`.

**Code Symbols:**
- Pinia stores export `useXStore`: `useAuthStore`, `useTicketsStore`, `useAlertsStore`.
- Domain arrays export plural nouns: `customers`, `subscriptions`, `tickets`, `alerts`, `invoices`, `notes`, `activities`.
- Type names use PascalCase: `Customer`, `Subscription`, `TicketStatus`, `AlertSeverity`.
- Page-local view state uses short domain names such as `search`, `statusFilter`, `planFilter`, `filtered`, `selectedTicket`.

## Where to Add New Code

**New Dashboard Route:**
- Primary code: add a `.vue` route under `app/pages/`.
- Layout: include `definePageMeta({ layout: 'dashboard' })` in authenticated pages.
- Navigation: add the route item to the computed `navigation` array in `app/layouts/dashboard.vue`.
- Locale strings: add keys to every file in `i18n/locales/`.

**New Public Route:**
- Primary code: add a `.vue` route under `app/pages/`.
- Layout: use `definePageMeta({ layout: false })` if it should bypass the dashboard shell.
- Auth behavior: update `app/middleware/auth.global.ts` if the route should be reachable without authentication.

**New Domain Entity:**
- Types: add interfaces and unions to `app/types/index.ts`.
- Mock data: add a plural domain file under `app/data/`.
- Mutable state: add a Pinia store under `app/stores/` only if records change through UI actions.
- Route UI: add pages under `app/pages/` and navigation in `app/layouts/dashboard.vue` when user-facing.

**New Table/List View:**
- Primary code: place the page in `app/pages/<domain>.vue` or `app/pages/<domain>/index.vue`.
- Data: import from `app/data/<domain>.ts` for read-only views or from `app/stores/<domain>.ts` for mutable views.
- Filters: keep filter refs and filtered computed values inside the page component.
- Formatting: use `useFormatters()` from `app/composables/useFormatters.ts`.

**New Detail View:**
- Primary code: use a dynamic route such as `app/pages/<domain>/[id].vue`.
- Missing record behavior: throw `createError({ statusCode: 404, statusMessage })`.
- Related records: derive with computed filters from `app/data/` or stores.

**New Store:**
- Implementation: add `app/stores/<domain>.ts`.
- Pattern: use `defineStore('<domain>', { state: () => ({ ... }), actions: { ... } })`.
- Types: import domain contracts from `~/types` with `import type`.
- Data seeding: import initial arrays from `~/data/<domain>`.

**New Composable:**
- Implementation: add `app/composables/use<Name>.ts`.
- Pattern: export a `use<Name>()` function and rely on Nuxt auto-imports in pages/components.
- Use composables for shared presentation or behavior; keep route-specific filters in the page.

**New Styling:**
- Global CSS: add only app-wide CSS to `app/assets/css/main.css`.
- Theme colors: update `app/app.config.ts` for Nuxt UI color tokens.
- Component/page styling: use Nuxt UI props and Tailwind utility classes inside `.vue` templates.

**New Localization Key:**
- Add the same key path to `i18n/locales/en.json`, `i18n/locales/es.json`, `i18n/locales/it.json`, `i18n/locales/fr.json`, and `i18n/locales/de.json`.
- Use `$t('key.path')` in templates and `const { t } = useI18n()` in scripts.

**New Chart:**
- Primary code: add chart setup in the route that owns the visualization.
- Dependencies: import chart components from `vue-chartjs` and Chart.js primitives as in `app/pages/index.vue`.
- Config: keep route-specific chart data/options in local `computed` values.

**Utilities:**
- Shared helpers: add composables under `app/composables/` when they use Vue/Nuxt state.
- Pure shared domain types: add to `app/types/index.ts`.
- Do not add helper logic to `app/data/`; keep data modules as typed record exports.

## Special Directories

**`.nuxt/`:**
- Purpose: Nuxt generated build/type metadata.
- Generated: Yes.
- Committed: No.

**`.output/`:**
- Purpose: Nuxt build output.
- Generated: Yes.
- Committed: No.

**`node_modules/`:**
- Purpose: Installed dependencies.
- Generated: Yes.
- Committed: No.

**`.vercel/`:**
- Purpose: Vercel project linkage metadata.
- Generated: Yes.
- Committed: Project-dependent; this repo contains `.vercel/project.json` and `.vercel/README.txt`.

**`.planning/`:**
- Purpose: GSD planning and codebase intelligence artifacts.
- Generated: Yes.
- Committed: Project-dependent.

**`.claude/`:**
- Purpose: Claude/agent local settings and worktree metadata.
- Generated: Yes.
- Committed: Project-dependent; contains local agent configuration.

**`.vscode/`:**
- Purpose: Workspace editor settings.
- Generated: No.
- Committed: Project-dependent.

**`public/`:**
- Purpose: Static files served directly from the site root.
- Generated: No.
- Committed: Yes.

---

*Structure analysis: 2026-06-08*
