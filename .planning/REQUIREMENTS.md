# Requirements: OpsBoard SaaS Operations Admin Dashboard

**Defined:** 2026-06-08
**Core Value:** The demo must convince a potential client, within a short walkthrough, that this codebase can become a polished SaaS operations admin tool with realistic workflows and no private setup.

## v1 Requirements

Requirements for the public portfolio release. Each maps to roadmap phases.

### Demo Experience

- [ ] **DEMO-01**: Visitor can open the dashboard overview after fake login and quickly understand revenue, churn, tickets, alerts, and customer health.
- [ ] **DEMO-02**: First dashboard screen is polished enough to use as the lead portfolio screenshot.
- [ ] **DEMO-03**: Demo credentials are prefilled or clearly visible on the login page.
- [ ] **DEMO-04**: Main navigation works across overview, customers, subscriptions, tickets, alerts, and settings.

### Customer Operations

- [ ] **CUST-01**: Visitor can review customers with status, plan, and health signals.
- [ ] **CUST-02**: Visitor can open a customer detail page with subscription, invoice, ticket, and note context.
- [ ] **CUST-03**: Visitor can review subscription status, plan, billing, and revenue context.

### Workflow Actions

- [ ] **WORK-01**: Visitor can open support tickets and see priority, status, customer, and detail context.
- [ ] **WORK-02**: Visitor can change a ticket status and see the local UI update.
- [ ] **WORK-03**: Visitor can review operational alerts with severity, status, and action context.
- [ ] **WORK-04**: Visitor can investigate, resolve, or dismiss an alert and see the local UI update.

### Documentation And Positioning

- [ ] **DOCS-01**: README or portfolio notes explain the business problem, solution, stack, local setup, and deployment path.
- [ ] **DOCS-02**: README or portfolio notes include a 60-second demo script.
- [ ] **DOCS-03**: Portfolio notes identify the best screenshots and client-facing skill tags.

### Deployment And Verification

- [ ] **SHIP-01**: Production build path works with the existing Vercel-oriented setup.
- [ ] **SHIP-02**: Documentation states that no environment variables or private credentials are required.
- [ ] **SHIP-03**: Final verification covers login, navigation, customers, tickets, alerts, and overview.
- [ ] **SHIP-04**: Any test names entered through forms or browser testing include "Test".

## v2 Requirements

Deferred to future releases. Tracked but not in current roadmap.

### Production Platform

- **PROD-01**: Real authentication and session management.
- **PROD-02**: Database-backed customers, subscriptions, tickets, invoices, alerts, and notes.
- **PROD-03**: Role-based access control and tenant isolation.
- **PROD-04**: Billing provider or CRM integrations.
- **PROD-05**: Automated test suite beyond publication-readiness checks.

### Extended Experience

- **EXT-01**: Broader mobile optimization.
- **EXT-02**: AI-assisted operations workflows.
- **EXT-03**: Additional dashboard modules beyond the current demo story.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real auth, RBAC, or tenancy | Portfolio demo only; fake auth is enough for public walkthrough |
| Backend APIs or database | No private setup should be required |
| Billing provider integration | Would add complexity without improving the demo story |
| Full redesign | Existing app already has the target structure; polish is enough for v1 |
| New AI features | Deferred until the three-demo sprint is published |
| Large mobile optimization | Desktop demo and screenshot quality are the priority |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DEMO-01 | Phase 1 | Pending |
| DEMO-02 | Phase 1 | Pending |
| DEMO-03 | Phase 1 | Pending |
| DEMO-04 | Phase 1 | Pending |
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
*Requirements defined: 2026-06-08*
*Last updated: 2026-06-08 after initial definition*
