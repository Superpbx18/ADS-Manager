# Component System

The production implementation must extract shared primitives instead of reproducing JSX per page. The names below are the required conceptual components; the final framework names may differ only if behavior and visual output remain equivalent.

| Component | Important props | Variants/states | Reuse locations |
|---|---|---|---|
| `AppShell` | `workspace`, `activeRoute`, `children` | desktop, tablet, mobile drawer | All pages |
| `Sidebar` | `groups`, `activeItem`, `onNavigate`, `workspace` | expanded/collapsed, mobile open | All pages |
| `Topbar` | `breadcrumbs`, `onSearch`, `onRefresh`, `notifications` | live, disconnected | All pages |
| `GlobalSearch` | `value`, `onSubmit`, `placeholder` | idle, focused, loading, no results | Topbar and search landing |
| `PageHeader` | `eyebrow`, `title`, `description`, `actions` | normal, live, error | All pages |
| `MetricCard` | `label`, `value`, `delta`, `status`, `onClick` | healthy, warning, failed, unknown | Overview, Delivery, Analytics |
| `HealthStrip` | `items[]` | healthy, warning, disconnected | Overview, Delivery |
| `StatusBadge` | `status`, `tone`, `ariaLabel` | success, warning, danger, info, neutral | Tables, cards, inspectors |
| `DataTable` | `columns`, `rows`, `sort`, `pagination`, `onRowAction` | loading, empty, no results, partial, error | Event Explorer, operations, audit |
| `FilterBar` | `filters`, `value`, `onChange`, `savedViews` | active, disabled, loading | Event Explorer, delivery, analytics |
| `SearchInput` | `value`, `onChange`, `onClear` | idle, query, no results | Event Explorer |
| `Button` | `variant`, `size`, `disabled`, `loading`, `onClick` | primary, secondary, ghost, danger | All pages |
| `Drawer` | `open`, `title`, `onClose`, `returnFocusRef` | inspector, journey, entity | Event Inspector and related detail |
| `Modal` | `open`, `onClose`, `title`, `onSubmit` | form, confirmation, error | Segment creation, setup wizard |
| `Tabs` | `items`, `active`, `onChange` | scrollable, active, disabled | Inspector, Ads Manager |
| `EmptyState` | `title`, `description`, `action` | empty, no results | Tables and analytics |
| `ErrorState` | `title`, `reason`, `action`, `retry` | partial, disconnected, server error | Every data page |
| `PermissionState` | `status`, `reason`, `requestAction` | unauthorized, denied, read-only | Actions and pages |
| `AlertItem` | `severity`, `impact`, `cause`, `target`, `status` | open, acknowledged | Overview and Alerts |
| `ActionHistory` | `entries[]` | empty, pending, success, failed | Event Inspector, Audit |
| `PayloadFlow` | `incoming`, `normalized`, `destination`, `diff` | added, changed, removed, invalid | Event Inspector, Mapping |

## Shared behavior rules

Interactive controls need visible focus, an accessible name, disabled/loading treatment, and an error response. A drawer must implement Escape close, Tab/Shift+Tab focus containment, and focus return to the opening trigger. A modal must prevent background interaction and provide an explicit cancel path.

Avoid page-specific versions of `StatusBadge`, `DataTable`, `Drawer`, or `EmptyState`. If a page needs a new visual variant, extend the shared component and document the variant.

## References

[1]: ../../client/src/pages/Home.tsx "Current prototype component candidates and shared inspector"
[2]: ../../client/src/index.css "Current shared CSS selectors and visual behavior"
