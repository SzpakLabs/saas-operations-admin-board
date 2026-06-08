# Research Notes: SaaS Ops Admin Dashboard

**Created:** 2026-06-08

## Sources Used

- `.planning/idea.md`
- `.planning/codebase/*.md`
- `/Users/macos/Documents/demo/demo-keeper/three-demo-shipping-checklist.md`
- `/Users/macos/Documents/demo/demo-keeper/shipping-knowledge-base.md`
- `/Users/macos/Documents/demo/demo-keeper/codex-agents-runbook.md`

## Findings

- This demo should prove SaaS admin and operations UX, not AI automation.
- The existing codebase already has broad route coverage: overview, customers, customer detail, subscriptions, tickets, alerts, settings, and fake login.
- The main risks are broken navigation, first-screen polish, missing README/demo script, and overbuilding production features.
- A no-env Vercel deployment path is a strength and should be preserved.

## Planning Implications

- Phase 1 should prioritize login, overview, and first screenshot quality.
- Phase 2 should verify route coverage and local-state workflows.
- Phase 3 should package and deploy rather than add backend functionality.
