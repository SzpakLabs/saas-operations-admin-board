# Phase 1: First Screen And Login Demo - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-06-08
**Phase:** 1-First Screen And Login Demo
**Areas discussed:** Lead screenshot composition, Demo login behavior, Navigation readiness, Scope guardrails

---

## Lead Screenshot Composition

| Option | Description | Selected |
|--------|-------------|----------|
| Lead portfolio screenshot and first-screen credibility | Polish the existing overview for the public demo's first impression | Yes |
| Full redesign | Rework the dashboard broadly before publishing | |
| New metrics module | Add more dashboard surface before validating the existing one | |

**User's choice:** Auto-selected recommended default.
**Notes:** This matches the idea document's priority: reliable live link, polished first screen, and portfolio value before cleanup.

---

## Demo Login Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Keep fake auth with prefilled or clearly visible demo credentials | Make public entry frictionless with no private setup | Yes |
| Add real auth | Introduce production auth before demo publication | |
| Remove login | Remove the admin-panel entry story | |

**User's choice:** Auto-selected recommended default.
**Notes:** Real auth is explicitly out of scope for v1.

---

## Navigation Readiness

| Option | Description | Selected |
|--------|-------------|----------|
| Verify the existing route set works without adding new routes | Confirm overview, customers, subscriptions, tickets, alerts, and settings | Yes |
| Add new dashboard modules | Expand product surface | |
| Rework routing structure | Change Nuxt route organization | |

**User's choice:** Auto-selected recommended default.
**Notes:** The codebase already has the route set required by the demo story.

---

## Scope Guardrails

| Option | Description | Selected |
|--------|-------------|----------|
| Backend, production auth, broad cleanup, and mobile redesign | Keep Phase 1 tied to publication readiness | Yes |
| Start production hardening | Add production platform concerns | |
| Expand mobile parity | Optimize mobile beyond obvious breakage | |

**User's choice:** Auto-selected recommended default.
**Notes:** These boundaries come from `.planning/idea.md`, `.planning/PROJECT.md`, and the roadmap.

## the agent's Discretion

- Exact UI polish details.
- Copy tightening.
- Spacing and chart framing adjustments.
- Verification method.

## Deferred Ideas

None.
