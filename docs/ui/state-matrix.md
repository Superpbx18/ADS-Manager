# State Matrix

Every data page must implement these states. The prototype currently demonstrates several states locally; production must obtain them from backend health, permissions, and query responses.

| Page/surface | Loading | Success | Empty / No Results | Error | Partial Failure | Disconnected | Unauthorized | Permission Denied | Available action |
|---|---|---|---|---|---|---|---|---|---|
| Overview | Skeleton metrics and health strip | Metrics, pipeline, alerts | Explain no activity, not “healthy” | Retry overview query | Show healthy sections plus affected metric | Show stale timestamp and source/Meta recovery | Sign in | Read-only overview | Refresh, open affected area, request access |
| Event Explorer | Table skeleton, preserve filters | Paginated event table | Empty means no events; No Results means query/filter mismatch | Retry query | Show loaded rows plus failed data source notice | Show last known data and reconnect | Sign in | Hide restricted fields/actions | Clear filters, retry, export if allowed |
| Event Inspector | Drawer skeleton; preserve event ID | Summary, payload, quality, delivery | Missing optional section explains unavailable data | Retry section | Show available tabs and failed tab reason | Show last synced timestamp | Sign in | Mask/hide payload or action | Close, request access, retry if allowed |
| Data Quality | Score and rule skeleton | Score, rules, affected events | No issues is positive empty state | Retry scan | Some rules pending/failed | Show last scan and source health | Sign in | Read-only or hide sensitive records | View affected, rescan, request access |
| Event Mapping | Registry skeleton | Versioned mapping and preview | No mapping explains setup needed | Retry registry | Some mappings unavailable | Show stale registry | Sign in | View-only if no edit permission | Preview, request edit, test |
| Meta Delivery | KPI and destination skeleton | Delivery metrics and logs | No deliveries explains date range | Retry metrics | Success plus failed destination panel | Reconnect Meta, no retry until healthy | Sign in | Read-only health | Open failed/retry/integrations |
| Failed Events | Failure table skeleton | Failed rows and retry eligibility | No failed events is healthy empty state | Retry list | Bulk retry result identifies per-ID outcome | Pause actions and explain destination outage | Sign in | Disable retry, allow inspect if permitted | Inspect, retry, acknowledge, request access |
| Retry Queue | Queue skeleton | Waiting/Retrying/Paused/Failed Permanently | Empty queue is healthy | Retry queue query | Bulk result with successes/failures | Pause and reconnect destination | Sign in | Disable pause/bulk retry | Inspect, pause, retry, request access |
| Alerts | Alert list skeleton | Open and acknowledged alerts | No open alerts is healthy | Retry alert query | Some alert sources unavailable | Show source of disconnection | Sign in | Read-only or hide acknowledge | Investigate, acknowledge, request access |
| Audit Log | Log skeleton | Immutable paginated entries | No entries for filter | Retry log query | Explain missing source partitions | Show last sync time | Sign in | Deny if role lacks audit | Filter, inspect, export if allowed |
| Integrations | Connection skeleton | Healthy/configured connections | Setup-needed state | Retry health check | Some components healthy, others failed | Reconnect flow | Sign in | Hide tokens and block settings | Reconnect, rotate token, test |

## State wording rules

Every non-success state must include the reason, the scope of impact, and the next available action. Do not show a red badge without an investigation path. Do not show a disconnected state as an empty state. Do not allow a retry action when the destination is disconnected or the role is denied.

## References

[1]: ../../client/src/pages/Home.tsx "Current prototype states and state coverage panel"
