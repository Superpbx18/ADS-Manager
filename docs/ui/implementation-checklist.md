# Implementation Checklist for Claude Code

## M0 — Audit existing repository

- [ ] Read this package before changing UI.
- [ ] Inspect the existing repository, routes, auth, API client, state management, and test setup.
- [ ] Identify which prototype components can be reused and which must be extracted from `Home.tsx`.
- [ ] Record technical limitations before changing approved UX.
- [ ] Confirm workspace scoping and role model with backend owners.

## M1 — Establish production foundations

- [ ] Create route structure from `route-map.md`.
- [ ] Create AppShell, Sidebar, Topbar, PageHeader, buttons, fields, badges, tables, drawers, modals, tabs, empty/error/access states.
- [ ] Centralize tokens from `design-tokens.md`.
- [ ] Add typed API adapter and fixture adapter with the same interfaces.
- [ ] Add authentication/session handling and workspace context.
- [ ] Add server-driven permission context; do not rely on frontend checks.

## M2 — Implement P0 pages with fixture adapter

- [ ] Overview.
- [ ] Event Explorer.
- [ ] Shared Event Inspector.
- [ ] Data Quality.
- [ ] Event Mapping.
- [ ] Meta Delivery.
- [ ] Failed Events.
- [ ] Retry Queue.
- [ ] Alerts.
- [ ] Audit Log.
- [ ] Integrations.

## M3 — Match approved interactions

- [ ] Alert deep-links preserve query and source context.
- [ ] Event row opens the same Shared Event Inspector.
- [ ] Retry/Acknowledge/Pause/Bulk Retry use one shared state model.
- [ ] Action history appears in Inspector and Audit Log.
- [ ] Loading, success, empty, no-results, error, partial, disconnected, unauthorized, and permission-denied states match `state-matrix.md`.
- [ ] Escape closes the topmost overlay.
- [ ] Tab and Shift+Tab remain inside drawers/modals.
- [ ] Focus returns to the opening trigger.
- [ ] Save View and filter URL state are shareable.

## M4 — Backend integration

- [ ] Replace fixture reads with typed API reads page by page.
- [ ] Replace local mutations with idempotent backend commands.
- [ ] Add request IDs and audit references to action feedback.
- [ ] Implement per-item bulk retry outcomes.
- [ ] Enforce workspace, role, resource, and field-level permissions server-side.
- [ ] Mask customer identifiers and never expose raw tokens.
- [ ] Add stale data timestamps and disconnected handling.

## M5 — QA and visual acceptance

- [ ] Compare every page with the Approved Prototype Baseline.
- [ ] Record `MATCH`, `MATCH WITH NOTES`, or `BLOCKED` for layout, spacing, typography, hierarchy, states, interactions, and responsive behavior.
- [ ] Test 1920×1080, 1440×900, 1366×768, 768×1024, and 375×812.
- [ ] Test Tab, Shift+Tab, Enter, Escape, focus trap, and focus return.
- [ ] Test normal, error, access, disconnected, and partial failure flows.
- [ ] Check browser console and network failures.
- [ ] Run TypeScript, lint, unit, integration, E2E, and production build checks.
- [ ] Verify no production Meta action can occur from fixture/simulation mode.

## Visual acceptance record

For each page, create a short record:

```text
Page:
Route:
Baseline checkpoint: daed8d4e
Layout: MATCH / MATCH WITH NOTES / BLOCKED
Spacing: MATCH / MATCH WITH NOTES / BLOCKED
Typography: MATCH / MATCH WITH NOTES / BLOCKED
Component hierarchy: MATCH / MATCH WITH NOTES / BLOCKED
States: MATCH / MATCH WITH NOTES / BLOCKED
Interaction: MATCH / MATCH WITH NOTES / BLOCKED
Responsive: MATCH / MATCH WITH NOTES / BLOCKED
Notes:
Approval owner:
Date:
```

## Known risks

The prototype currently centralizes many components in one file, uses section state instead of production routes, and uses static fixture data. The production team must extract without changing the observable UX. The prototype’s sample IDs and status labels are useful for referential consistency but are not automatically backend enums. Meta API permissions, token lifecycle, retry idempotency, raw payload privacy, and customer identity policy require backend confirmation.

## References

[1]: ./design-baseline.md "Approved baseline and change control"
[2]: ./interaction-contract.md "Required interaction behavior"
[3]: ./state-matrix.md "Required state coverage"
[4]: ./backend-integration-map.md "Backend reads and mutations"
