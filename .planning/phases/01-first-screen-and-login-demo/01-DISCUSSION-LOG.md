# Phase 1: First Screen And Login Demo - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-08T13:52:42Z
**Phase:** 01-first-screen-and-login-demo
**Areas discussed:** Lead Screenshot Composition, Demo Login Behavior, Navigation Readiness, Scope Guardrails

---

## Lead Screenshot Composition

| Option | Description | Selected |
|--------|-------------|----------|
| Existing overview screenshot | Polish the current dashboard overview as the lead portfolio screenshot. | Yes |
| Full dashboard redesign | Redesign the dashboard surface before planning implementation. | |
| Minimal metric landing screen | Replace the overview with a simpler screenshot-first surface. | |

**User's choice:** Auto-selected recommended default.
**Notes:** Existing `app/pages/index.vue` already has KPI cards, MRR trend, ticket chart, active alerts, activity, and at-risk accounts. Phase 1 should improve this surface rather than rebuild the app.

---

## Demo Login Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Prefilled or clearly visible demo credentials | Keep fake auth and make the public demo easy to enter without setup. | Yes |
| Real authentication | Add production auth, sessions, RBAC, or provider setup. | |
| Anonymous bypass | Remove the login moment and route visitors directly to the dashboard. | |

**User's choice:** Auto-selected recommended default.
**Notes:** Existing `app/pages/login.vue`, `app/stores/auth.ts`, `app/plugins/auth.client.ts`, and `app/middleware/auth.global.ts` already support the fake-auth demo path.

---

## Navigation Readiness

| Option | Description | Selected |
|--------|-------------|----------|
| Verify existing navigation surface | Confirm overview, customers, subscriptions, tickets, alerts, and settings work from the shell. | Yes |
| Add new routes | Expand the dashboard module set. | |
| Redesign the shell | Replace the current sidebar/topbar structure. | |

**User's choice:** Auto-selected recommended default.
**Notes:** Existing `app/layouts/dashboard.vue` already includes the required route entries. Phase 1 should verify and polish, not add route scope.

---

## Scope Guardrails

| Option | Description | Selected |
|--------|-------------|----------|
| Portfolio-demo scope only | Keep changes tied to login, overview, screenshot quality, and navigation confidence. | Yes |
| Production platform scope | Add backend APIs, real auth, billing, database, or tenant behavior. | |
| Broad redesign scope | Rework the whole UI before shipping the first public demo. | |

**User's choice:** Auto-selected recommended default.
**Notes:** This matches `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, and `.planning/ROADMAP.md`.

## the agent's Discretion

- Exact UI polish details, copy tightening, spacing fixes, and chart framing adjustments.
- Route-by-route verification method.
- Minor locale text tightening if it directly improves Phase 1 demo clarity.

## Deferred Ideas

None - discussion stayed within phase scope.
