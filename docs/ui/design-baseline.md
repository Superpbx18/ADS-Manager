# Design Baseline

## Approved baseline

The approved UI baseline is Signalroom at checkpoint `daed8d4e`, after P0.1 Core Operations Hardening. This is the baseline to compare against during production implementation. The prototype is not a proposal for V2.

## Visual language

Signalroom uses a dark **Midnight Operator Console** language. The visual hierarchy is built from a near-black blue canvas, dark navy panels, thin low-contrast borders, cyan operational information, coral critical action, amber warning, violet analytical emphasis, and restrained motion. The interface favors high readability over decorative density.

The current comfortable density is intentional. At browser zoom 100%, typography, controls, table rows, sidebar labels, inspector content, and spacing are sized to approximate the previously approved 110–116% reading experience without applying root `transform: scale()` or browser zoom.

## Layout structure

The desktop shell contains a persistent left sidebar, a topbar, and a scrollable main content area. The sidebar contains workspace context and workflow-based navigation. The topbar contains breadcrumbs, global search, live status, refresh, notifications, and operator identity. Page content uses a page intro followed by panels, tables, summaries, charts, or inspectors.

On mobile, the sidebar becomes a drawer opened by the menu button. The topbar hides the wide global search field. Tables remain usable through horizontal scrolling or prioritized row layouts. Drawers become full-width or near-full-width panels and action controls stack vertically.

## Navigation

The approved navigation is grouped by workflow rather than by technical implementation. The groups are DATA, CUSTOMERS, META, ANALYTICS, AUTOMATION, and SYSTEM, with Overview as the primary entry. Do not add a second menu for an existing operational concept.

## Core UX principle

> **Observe → Investigate → Act**

Overview exposes health and operational signals. Event Explorer and Alerts provide investigation entry points with context. Shared Event Inspector exposes payload, identity, mapping, quality, delivery, and relationships. Retry, acknowledge, pause, and bulk retry are guarded actions with visible feedback and action history.

## Change control

A production developer must compare each completed page against this baseline for layout, spacing, typography, hierarchy, states, interaction, and responsive behavior. Use `MATCH`, `MATCH WITH NOTES`, or `BLOCKED`. Do not change UX because of implementation preference. Report technical limitations before changing the approved behavior.

## References

[1]: ../../client/src/pages/Home.tsx "Approved prototype implementation"
[2]: ../../client/src/index.css "Approved prototype styles"
