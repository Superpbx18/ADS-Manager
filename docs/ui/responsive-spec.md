# Responsive Specification

## Breakpoints

| Viewport | Shell | Primary behavior |
|---|---|---|
| Desktop `>= 1280px` | Persistent sidebar around 300px | Full table columns, wide inspector, topbar search visible |
| Tablet `768–1279px` | Persistent or constrained sidebar around 280px | Reduce secondary columns, allow panel stacking, retain readable controls |
| Mobile `< 768px` | Off-canvas sidebar | Single-column panels, stacked actions, horizontal table scroll or prioritized rows |
| Acceptance target | `375x812` | No unnecessary horizontal page overflow; actions remain reachable |

## Sidebar and header

Desktop keeps the sidebar visible with independent vertical scrolling. Tablet may constrain the sidebar. Mobile opens the sidebar from the menu button and closes it through close button, backdrop, or Escape. The topbar hides the wide global search at compact widths while preserving navigation, refresh, notification, and identity controls.

## Tables

Event Explorer keeps a minimum content width because identifiers and delivery columns must remain readable. The table container may scroll horizontally; the page itself must not. Failed Events, Retry Queue, and Audit Log prioritize time, entity, reason/status, and action. Secondary metadata may move below the primary row or be hidden at tablet/mobile widths.

## Filters

Filter pills wrap. Search remains full width. Saved view and export actions must remain reachable without overlapping. On mobile, action groups stack and primary actions should not be hidden behind overflow.

## Inspectors, drawers, and modals

Desktop inspectors use a right-side drawer with a backdrop. Mobile inspectors use the available viewport width and stack action buttons. Drawers must have internal scrolling, visible close control, Escape close, focus trap, and return focus. Modals must not create nested modal/drawer layers for ordinary investigation.

## Charts and cards

KPI cards use one column on mobile and a grid on desktop. Charts must fit their panel or scroll only inside their own container. Avoid fixed widths that cause body-level horizontal overflow.

## Verification checklist

Verify at 1920×1080, 1440×900, 1366×768, 768×1024, and 375×812. Check sidebar access, topbar controls, Event Explorer filters, tables, Inspector, error states, and action bars at each target.

## References

[1]: ../../client/src/index.css "Current responsive CSS and compact breakpoints"
[2]: ../../client/src/pages/Home.tsx "Current mobile shell and operational page structure"
