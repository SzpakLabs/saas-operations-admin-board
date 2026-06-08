---
phase: 01
slug: first-screen-and-login-demo
status: approved
shadcn_initialized: false
preset: none
created: 2026-06-08
---

# Phase 01 - UI Design Contract

> Visual and interaction contract for Phase 1. Generated for the first-screen and fake-login demo flow, verified against the existing Nuxt UI implementation.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | Nuxt UI |
| Icon library | Iconify Lucide via `@iconify-json/lucide` |
| Font | Inter, system-ui, sans-serif |

---

## Spacing Scale

Declared values must stay aligned to Tailwind spacing tokens and multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, badge/icon separation, tight metadata rows |
| sm | 8px | Compact button groups, list item inner gaps, card micro-spacing |
| md | 16px | Default card padding, form spacing, mobile page padding |
| lg | 24px | Desktop page padding, chart/card gaps, major dashboard groups |
| xl | 32px | Login panel spacing and large form breaks |
| 2xl | 48px | Login split-panel padding and first-screen breathing room |
| 3xl | 64px | Not required for Phase 1 |

Exceptions: Existing Nuxt UI component internal padding may stand if it renders consistently and does not create text overlap.

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 14px | 400 | 1.5 |
| Label | 12px | 500 | 1.35 |
| Heading | 24px | 700 | 1.25 |
| Display | 32px max | 700 | 1.2 |

Guidelines:
- Keep dashboard panel headings compact, usually `text-sm font-semibold`.
- Use hero-scale text only on the login page, not inside dashboard cards.
- Do not use negative letter spacing or viewport-scaled font sizes.
- Long labels must wrap or truncate cleanly inside KPI cards and navigation.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | Nuxt UI neutral/slate background tokens | App background and default text surfaces |
| Secondary (30%) | Nuxt UI elevated/accented background tokens | Sidebar, cards, list rows, popovers |
| Accent (10%) | Nuxt UI blue primary tokens | Primary buttons, active navigation, brand icon, chart primary line |
| Destructive | Nuxt UI error/red tokens | Critical alerts, destructive or high-risk status only |

Accent reserved for: primary login button, active navigation item, brand icon, primary chart series, focused primary actions, and positive portfolio-leading emphasis.

Signal colors:
- Green: positive revenue and resolution trends only.
- Orange/yellow: support pressure or warning status.
- Red: churn, critical alerts, at-risk states, or destructive outcomes.
- Purple/pink/blue may appear as small KPI icon accents but must not dominate the page palette.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Sign in |
| Demo credential hint | Use the demo credentials shown here or prefilled in the form. |
| Overview heading | Operations Overview |
| Empty state heading | No records match your filters |
| Empty state body | Adjust filters or return to the overview to continue the demo. |
| Error state | Please enter your email and password. |
| Destructive confirmation | Not required in Phase 1 |

Guidelines:
- Copy should sound like an operations dashboard, not a marketing landing page.
- The login page may include demo framing; authenticated dashboard pages should stay utilitarian and scan-friendly.
- If translated login or navigation copy changes, update every `i18n/locales/*.json` file touched by the existing key path.

---

## Interaction Contract

| Area | Contract |
|------|----------|
| Login | Keep fake auth, make credentials prefilled or clearly visible, and preserve redirect to `/`. |
| Overview | First viewport must communicate revenue, customer count, ticket pressure, churn, ARR, health, alerts, and at-risk accounts without explanation. |
| Navigation | Overview, customers, subscriptions, tickets, alerts, and settings must be reachable from the dashboard shell. |
| Charts | Chart containers must have stable heights and render without layout jump. |
| Mobile | Fix obvious breakage only; desktop screenshot quality is primary for Phase 1. |
| Theme | Dark and light mode should remain legible using Nuxt UI tokens. |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not required |
| third-party | none | not allowed in Phase 1 |

No new component registry should be added for this phase. Use Nuxt UI, Tailwind utilities, Chart.js, and existing app-local patterns.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-06-08
