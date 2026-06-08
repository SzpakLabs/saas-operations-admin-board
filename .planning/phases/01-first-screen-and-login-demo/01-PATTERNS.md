# Phase 01 - Pattern Map

## Pattern Mapping Complete

## Files In Scope

| File | Role | Closest Pattern |
|------|------|-----------------|
| `app/pages/login.vue` | Demo entry and fake login form | Existing standalone route with `definePageMeta({ layout: false })` |
| `app/pages/index.vue` | Dashboard overview and lead screenshot | Existing route-local computed KPI/chart/list view model |
| `app/layouts/dashboard.vue` | Authenticated shell and navigation | Existing computed navigation array and NuxtLink active-state classes |
| `app/stores/auth.ts` | Fake auth state | Existing Pinia options store |
| `app/middleware/auth.global.ts` | Client route guard | Existing Nuxt global middleware |
| `app/plugins/auth.client.ts` | Client auth hydration | Existing client-only plugin |
| `i18n/locales/*.json` | User-facing route/login/dashboard copy | Existing locale key paths |

## Reuse Rules

- Use `<script setup lang="ts">` before `<template>`.
- Keep login state local unless a change must affect global auth behavior.
- Keep overview data derived in local `computed` values from `app/data/*`.
- Use Nuxt UI components and Tailwind classes already present in the route files.
- Use `~/` imports for app-local modules.
- Do not introduce a new component library, backend API, or persistence layer.

## Verification Anchors

- `app/pages/login.vue` should still call `auth.login()` and `navigateTo('/')`.
- `app/layouts/dashboard.vue` should retain route entries for `/`, `/customers`, `/subscriptions`, `/tickets`, `/alerts`, and `/settings`.
- `app/pages/index.vue` should continue showing KPI, chart, alert, activity, and at-risk-account sections.
- `npm run typecheck` should pass after implementation.

