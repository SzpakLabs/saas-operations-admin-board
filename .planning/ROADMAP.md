# Roadmap: OpsBoard SaaS Operations Admin Dashboard

**Created:** 2026-06-08
**Mode:** Coarse MVP phases
**Project Mode:** mvp

## Summary

This roadmap finishes the existing OpsBoard codebase as a public portfolio demo. It avoids production-platform expansion and focuses on first impression, demonstrable workflows, client-facing packaging, and deployment readiness.

| Phase | Name | Goal | Requirements |
|-------|------|------|--------------|
| 1 | First Screen And Login Demo | Make the entry and overview credible for the 60-second walkthrough | DEMO-01, DEMO-02, DEMO-03, DEMO-04 |
| 2 | Operational Workflow Demo | Confirm customer, subscription, ticket, and alert workflows demonstrate realistic SaaS ops | CUST-01, CUST-02, CUST-03, WORK-01, WORK-02, WORK-03, WORK-04 |
| 3 | Portfolio Packaging | Make README and portfolio notes sell the demo clearly | DOCS-01, DOCS-02, DOCS-03 |
| 4 | Deployment Readiness | Verify build, deployment assumptions, and final demo path | SHIP-01, SHIP-02, SHIP-03, SHIP-04 |

## Phases

### Phase 1: First Screen And Login Demo
**Goal:** Make the login and overview flow credible as the lead portfolio moment.
**Mode:** mvp
**UI hint:** yes

**Requirements:** DEMO-01, DEMO-02, DEMO-03, DEMO-04

**Success Criteria**:
1. Login page exposes usable demo credentials or prefilled credentials.
2. Visitor can reach the overview and understand core SaaS operations signals without explanation.
3. Dashboard first screen is polished enough for the lead portfolio screenshot.
4. Navigation entries for overview, customers, subscriptions, tickets, alerts, and settings work from the dashboard shell.

### Phase 2: Operational Workflow Demo
**Goal:** Confirm the demo proves realistic SaaS operations workflows with local state changes.
**Mode:** mvp
**UI hint:** yes

**Requirements:** CUST-01, CUST-02, CUST-03, WORK-01, WORK-02, WORK-03, WORK-04

**Success Criteria**:
1. Customer list and detail views show status, plan, health, subscription, invoices, tickets, and notes clearly.
2. Subscription page communicates plan, billing, status, and revenue context.
3. Ticket detail and status controls visibly update local UI state.
4. Alert investigate, resolve, and dismiss actions visibly update local UI state.

### Phase 3: Portfolio Packaging
**Goal:** Package the demo so a client can understand the business value, stack, and walkthrough quickly.
**Mode:** mvp
**UI hint:** no

**Requirements:** DOCS-01, DOCS-02, DOCS-03

**Success Criteria**:
1. README or portfolio notes explain the business problem, solution, stack, local setup, and deployment path.
2. README or portfolio notes include a concise 60-second demo script.
3. Portfolio notes identify screenshot targets and client-facing skill tags.

### Phase 4: Deployment Readiness
**Goal:** Verify the public release path and final walkthrough with no private setup.
**Mode:** mvp
**UI hint:** yes

**Requirements:** SHIP-01, SHIP-02, SHIP-03, SHIP-04

**Success Criteria**:
1. Typecheck and production build path pass or any blockers are fixed.
2. Documentation states that no environment variables or private credentials are required.
3. Final manual verification covers login, navigation, overview, customers, tickets, and alerts.
4. Any browser or form testing uses person names containing "Test".

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DEMO-01 | Phase 1 | Complete |
| DEMO-02 | Phase 1 | Complete |
| DEMO-03 | Phase 1 | Complete |
| DEMO-04 | Phase 1 | Complete |
| CUST-01 | Phase 2 | Pending |
| CUST-02 | Phase 2 | Pending |
| CUST-03 | Phase 2 | Pending |
| WORK-01 | Phase 2 | Pending |
| WORK-02 | Phase 2 | Pending |
| WORK-03 | Phase 2 | Pending |
| WORK-04 | Phase 2 | Pending |
| DOCS-01 | Phase 3 | Pending |
| DOCS-02 | Phase 3 | Pending |
| DOCS-03 | Phase 3 | Pending |
| SHIP-01 | Phase 4 | Pending |
| SHIP-02 | Phase 4 | Pending |
| SHIP-03 | Phase 4 | Pending |
| SHIP-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Roadmap created: 2026-06-08*
*Last updated: 2026-06-08 after initialization*
