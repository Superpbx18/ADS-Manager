# Design Tokens

These values are extracted from the current prototype and should become centralized production tokens. The exact implementation can use CSS variables, a theme object, or a design-token package, but pages must not scatter equivalent hardcoded values.

## Color roles

| Token role | Current value/behavior | Meaning |
|---|---|---|
| Canvas | near-black navy from `--bg` | Application background |
| Panel | dark navy from `--panel` | Cards and operational panels |
| Panel raised | darker/lighter panel variant | Inspector and elevated content |
| Line | low-contrast border from `--line` | Separation without heavy borders |
| Text primary | light blue-white | Titles and high-priority values |
| Text secondary | muted blue-gray | Supporting labels and descriptions |
| Cyan | `#62e4d6` family | Healthy, information, processing |
| Coral | `#ff735d` / `#ff8878` family | Failed, critical, destructive attention |
| Amber | `#f4be62` family | Warning, pending, queue |
| Violet | existing violet accent | Analysis and segmentation emphasis |
| Blue | existing blue accent | Information/processing |
| Gray | muted neutral | Disabled or unknown |

Status mapping is fixed: green/cyan = healthy/success, yellow/amber = warning/pending, red/coral = failed/critical, blue = processing/information, gray = disabled/unknown.

## Typography

The prototype uses Space Grotesk for operational headings and values, with a readable sans-serif body treatment. Use the existing font stack and hierarchy. Do not replace typography per page. Page titles are large and high contrast; section kickers use uppercase, letter spacing, and small size; table and metadata text are intentionally compact but were increased in the native density pass.

## Density and sizing

Use the current tokenized comfortable density as the baseline. The prototype intentionally avoids root scaling. Preserve the relationship among base font size, button/input height, table row height, card padding, sidebar row height, and inspector content. Do not solve density by applying browser zoom or `transform: scale()` to the application.

## Layout tokens

| Token | Baseline rule |
|---|---|
| Desktop sidebar | approximately 300px |
| Tablet sidebar | approximately 280px when persistent |
| Mobile sidebar | off-canvas drawer, max width approximately 330px |
| Desktop breakpoint | `>= 1280px` |
| Tablet breakpoint | `768–1279px` |
| Mobile breakpoint | `< 768px`; current CSS uses a 650px compact breakpoint for some controls |
| Table minimum | Event Explorer keeps a wide table and allows horizontal scroll |
| Drawer layer | above page content and backdrop |
| Focus outline | visible cyan 2px outline with offset |

## Radius, shadow, border, motion

Use the existing restrained radius and thin borders. Panels use soft dark shadows rather than bright outlines. Motion is short and purposeful. Keyboard-initiated navigation should be immediate. Respect `prefers-reduced-motion`.

## Z-index contract

Maintain the layer order: page content below backdrop, backdrop below drawer/modal, drawer/modal content above backdrop, toast above all temporary surfaces. Centralize z-index values in tokens rather than inventing page-specific values.

## References

[1]: ../../client/src/index.css "Current Signalroom design tokens and responsive rules"
