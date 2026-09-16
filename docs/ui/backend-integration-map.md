# Backend Integration Map

This document identifies the backend reads and mutations required to replace the prototype adapter. It does not prescribe database tables, queue technology, or Meta implementation details.

| Page/component | Reads required | Mutations required | Caching/consistency notes |
|---|---|---|---|
| Overview | workspace health, event counts, delivery metrics, quality metrics, open alerts, token health | refresh/recompute only | Metrics may be eventually consistent; show timestamp |
| Global Search | cross-entity search by supported identifiers | none | Enforce workspace and field masking |
| Event Explorer | paginated events, filters, sort, saved views, counts | save/delete view, export request | URL state must be shareable; cursor pagination preferred |
| Event Inspector | event summary, identity, attribution, raw/normalized/destination payloads, diffs, quality, mapping, delivery attempts, action history | retry event, acknowledge related alert | Event detail should be consistent by event version/request ID |
| Data Quality | score, rule results, affected counts, affected events | rescan, rule acknowledgment if approved | Scan result needs version and timestamp |
| Event Mapping | mapping registry, versions, preview diff, validation result | create draft, submit review, activate according to approval | Separate draft, approved, active versions |
| Test Events | validation rules, test history, simulated or sandbox delivery result | run validation, send sandbox test | Never route prototype simulation to production Meta |
| Meta Delivery | destination health, delivery metrics, logs, latency, API errors | refresh health, reconnect/rotate via integration flow | Delivery is operational monitoring |
| Failed Events | failed event list, reason, eligibility, attempts | retry one, bulk retry, ignore/acknowledge if approved | Bulk command returns per-item result |
| Retry Queue | jobs, statuses, next attempts, worker health | pause/resume queue, retry eligible jobs, cancel if approved | Queue state is shared across all views |
| Alerts | open/acknowledged alerts, impact, cause, target | acknowledge, resolve, suppress if authorized | Alert mutation creates AuditEntry |
| Audit Log | immutable entries with filters and pagination | none or export request | Append-only; server authoritative |
| Integrations | business/app/dataset/token permissions and health | connect, disconnect, rotate token, test connection | Secrets never return raw to browser |
| Settings | workspace, members, role policy, privacy settings | update approved settings | Backend enforces workspace boundary |

## Required mutation semantics

### Retry

`POST /workspaces/:workspaceId/events/:eventId/retry` should be idempotent by request key. It returns command status, eligible/blocked reason, queue job ID, and audit reference.

### Acknowledge

`POST /workspaces/:workspaceId/alerts/:alertId/acknowledge` returns the new alert status and audit reference. Concurrent acknowledgment should be safe and explain if already acknowledged.

### Pause Queue

`POST /workspaces/:workspaceId/retry-queue/pause` returns worker state, actor, reason, and audit reference. The UI must not imply pause succeeded until the server confirms it.

### Bulk Retry

`POST /workspaces/:workspaceId/retry-queue/bulk-retry` accepts selected event/job IDs and an idempotency key. The response must include per-item outcomes, aggregate counts, and reasons for blocked items.

## Adapter boundary

Implement a typed API adapter behind the existing UI. Keep the prototype fixture adapter available for local development, but make the adapter explicit so a developer cannot mistake local state for persistence.

## References

[1]: ../../client/src/pages/Home.tsx "Current prototype data flows and action handlers"
[2]: ../event-data-contract-th.md "Existing REST/event contract context"
