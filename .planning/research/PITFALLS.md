# Research: Pitfalls

**Project:** OpsBoard SaaS Operations Admin Dashboard
**Date:** 2026-06-08

## Common Mistakes

### Treating The Demo Like A Production Platform

Warning signs: real auth, database, billing, RBAC, or API work appears before the live portfolio link is published.

Prevention: keep v1 focused on mock-data workflows, screenshots, documentation, build health, and deployment.

### Weak First Screen

Warning signs: KPI hierarchy is unclear, charts do not render, alerts or activity look generic, or the dashboard does not communicate SaaS operations quickly.

Prevention: Phase 1 should verify desktop first impression and fix only issues that weaken the lead screenshot.

### Local Actions Are Not Demonstrable

Warning signs: ticket or alert actions do not visibly change status, selected details, timestamps, or list content.

Prevention: Phase 2 should manually test ticket and alert actions and make state changes obvious.

### Documentation Does Not Sell The Demo

Warning signs: README only lists setup commands, does not explain business value, or lacks a concise walkthrough.

Prevention: Phase 3 should align README and portfolio notes around the problem, solution, stack, deployment, and 60-second script.

### Deployment Requires Hidden Setup

Warning signs: environment variables, private services, or broken build assumptions are required.

Prevention: Phase 4 should verify typecheck/build and document that no env vars are needed.
