# Research: Architecture

**Project:** OpsBoard SaaS Operations Admin Dashboard
**Date:** 2026-06-08

## Current Architecture

OpsBoard is a Nuxt frontend with route-level Vue pages, a dashboard layout, Pinia state islands, typed fixture data, and shared formatters.

## Component Boundaries

- `app/pages/` owns route view models, filtering, selection, tables, charts, and page actions.
- `app/layouts/dashboard.vue` owns authenticated navigation and global dashboard chrome.
- `app/stores/` owns mutable auth, tickets, and alerts state.
- `app/data/` owns static typed fixture data.
- `app/types/index.ts` owns domain interfaces and status unions.
- `app/composables/useFormatters.ts` owns locale-aware currency and date formatting.
- `i18n/locales/` owns user-facing copy.

## Data Flow

Read-only pages import typed data directly from `app/data/`. Mutable ticket and alert pages seed Pinia stores from data fixtures and mutate state through store actions. Auth persists only a client-side fake marker in localStorage.

## Build Order Implications

The remaining project should be vertical and publication-driven:

1. Verify the first impression and demo path.
2. Tighten local workflows and navigation.
3. Package documentation and deployment notes.
4. Run build/typecheck and final live-link readiness checks.

No new backend layer is required.
