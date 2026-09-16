# Signalroom UI Developer Handoff

> **Approved Prototype Baseline — Signalroom / Meta Event Operations**
>
> Baseline checkpoint: `daed8d4e` (P0.1 Core Operations Hardening). This package describes the approved prototype as it exists today. It is a documentation handoff, not a redesign specification.

## Purpose

This package is the implementation contract for Claude Code or another production engineering team. It removes the need to infer layout, navigation, interaction, state behavior, responsive behavior, permission treatment, mock data shape, and backend dependencies from screenshots alone.

The prototype follows **Observe → Investigate → Act**. A user should be able to see operational health, open the affected records, inspect the event or entity, and perform a governed action without leaving the operations console.

## Non-negotiable constraints

- Do not redesign the visual language, navigation, or approved UX without explicit product approval.
- Do not add features or menus merely to make the application appear larger.
- Preserve the existing dark Midnight Operator Console language, comfortable density, workflow-based sidebar, and shared inspectors.
- Treat every simulated mutation as **PROTOTYPE ONLY — DO NOT TREAT AS PRODUCTION LOGIC** until a backend adapter and authorization check replace it.
- Frontend permission checks are UI gating only. The backend must enforce authorization.
- Any technical limitation that changes layout, navigation, interaction, or state behavior must be reported before implementation.

## Package map

| Document | Implementation question answered |
|---|---|
| `design-baseline.md` | What visual and UX decisions are approved? |
| `page-inventory.md` | What pages exist and what does each page do? |
| `route-map.md` | What production URLs and deep links should be used? |
| `information-architecture.md` | How are pages grouped and discovered? |
| `component-system.md` | Which components must be shared? |
| `design-tokens.md` | Which values should be tokens rather than hardcoded? |
| `interaction-contract.md` | What must each important interaction do? |
| `state-matrix.md` | How must loading, error, access, and partial states behave? |
| `responsive-spec.md` | How does the approved UI adapt by viewport? |
| `permission-ui-matrix.md` | What can each role see and do in the UI? |
| `mock-data-contract.md` | What data shape does the current UI consume? |
| `backend-integration-map.md` | What backend reads and mutations are required? |
| `implementation-checklist.md` | In what order should production implementation proceed? |

## Source of truth

The current visual source is `client/src/index.css`. The current page and interaction source is `client/src/pages/Home.tsx`. Existing Thai technical documents in `docs/` provide product context, but this directory is the handoff contract for implementation.

## Prototype-only disclaimer

The current application is a static React prototype. It uses local React state, deterministic sample data, simulated latency, simulated Meta delivery, simulated retry actions, and demo permission/state coverage. It does not call Meta production APIs and does not persist actions to a backend.

## References

[1]: ../../client/src/pages/Home.tsx "Current Signalroom prototype page and interaction source"
[2]: ../../client/src/index.css "Current Signalroom prototype design tokens and styles"
[3]: ../chatgpt-project-context-prompt-th.md "Signalroom project context and product principles"
