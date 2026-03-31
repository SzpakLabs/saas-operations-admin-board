# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build (Nitro/Vercel)
npm run preview      # Preview production build
npm run typecheck    # Run vue-tsc type checking
npm run generate     # Static site generation
```

## Architecture

**Nuxt 3** app with file-based routing, Nuxt UI v4, Pinia, and Chart.js. No backend — all data is local mock data in `app/data/`.

### Key Conventions

- **Layouts**: `app/layouts/dashboard.vue` wraps all authenticated pages (sidebar + header). Login uses the default layout.
- **Auth**: Global middleware at `app/middleware/auth.global.ts` guards all routes. Auth state lives in `app/stores/auth.ts` (fake credentials, no real backend).
- **Data layer**: Static mock data in `app/data/*.ts` — no API calls. Pinia stores (`app/stores/`) layer reactive state mutations on top for tickets and alerts.
- **Types**: All domain interfaces in `app/types/index.ts` (`Customer`, `Ticket`, `Alert`, `Subscription`, etc.).
- **Formatting**: Use `useFormatters()` composable (`app/composables/useFormatters.ts`) for currency, dates, and relative time.
- **Icons**: Lucide icons via Iconify — use `i-lucide-*` naming (e.g., `i-lucide-bell`).
- **Components**: No custom component library — use Nuxt UI v4 components (`UCard`, `UButton`, `UTable`, `UDropdownMenu`, etc.).

### Routing

| Route | File |
|-------|------|
| `/` | `app/pages/index.vue` |
| `/login` | `app/pages/login.vue` |
| `/customers` | `app/pages/customers/index.vue` |
| `/customers/[id]` | `app/pages/customers/[id].vue` |
| `/subscriptions` | `app/pages/subscriptions.vue` |
| `/tickets` | `app/pages/tickets.vue` |
| `/alerts` | `app/pages/alerts.vue` |
| `/settings` | `app/pages/settings.vue` |

### Theming

Theme is configured in `app/app.config.ts` (primary: blue, neutral: slate). Dark mode is supported via Nuxt UI's `useColorMode()`. Use CSS custom properties (`var(--ui-primary)`, etc.) for theme-aware styling.
