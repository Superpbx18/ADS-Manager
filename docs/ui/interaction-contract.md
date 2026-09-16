# Interaction Contract

Every interaction below is part of the approved behavior. Production implementations may change transport details, but not the observable result without approval.

| Trigger | Result | Loading | Success | Error | State affected |
|---|---|---|---|---|---|
| Click Overview Alert | Open investigation target with alert context | Navigate/loading indicator | Event Explorer or Delivery opens with filters | Explain route/data failure and keep alert context | URL filters, page data |
| Critical source alert | Open Event Explorer with source/event/status query | Table loading | Affected events show | “Could not load affected events” with retry | Explorer query/filter |
| Global Search submit | Navigate to most relevant search result | Search progress | Query preserved in URL and result list | No-results state with Clear Filters | Search query |
| Event row action | Open Shared Event Inspector | Drawer opens and focuses | Inspector shows event detail | ErrorState inside drawer | Selected event, focus |
| Inspector tab | Replace inspector content without losing event | Tab-level loading if backend data differs | Selected tab and URL/hash may update | Tab-specific error and retry | Active tab |
| Retry Event | Submit one retry command | Button loading/disabled | Event becomes retrying/queued, toast, action history entry | Error message, retry remains eligible if applicable | Event, Failed Events, Retry Queue, Alert relations, history |
| Acknowledge Alert | Mark alert acknowledged | Button loading | Alert count and alert row update, audit entry | Explain conflict or permission denial | Alert, Overview, Audit |
| Pause Queue | Pause retry workers for workspace | Button loading | Queue status becomes Paused | Explain unavailable worker or permission | Retry Queue, Delivery, Overview |
| Bulk Retry | Submit eligible selected jobs | Button loading and selection locked | Eligible jobs become Retrying/Queued; summary feedback | Partial failure lists successful and failed IDs | Retry Queue, Failed Events, Inspector history |
| Failed Events Inspect | Navigate to same Event Inspector | Route transition | Shared event detail opens | Preserve failure context and retry path | URL, selected event |
| Clear Filters | Reset query, filter, saved transient context | None or brief refresh | Default event list returns | Preserve user query if reset fails | Explorer filters |
| Save View | Save current filters and search | Save indicator | Saved View named/available | Explain validation or server failure | Saved views |
| Export CSV | Export current filtered dataset | Export progress | Download generated file | Error with retry | None or export job |
| Drawer close by button/backdrop | Close current drawer | None | Return focus to trigger | N/A | Selected entity, focus |
| Escape | Close topmost drawer/modal | Immediate | Focus returns to trigger | N/A | Overlay stack, focus |
| Tab/Shift+Tab in drawer | Cycle within drawer | Immediate | Focus never escapes | N/A | Focus only |
| Enter on focused button | Perform same action as click | Same as action | Same as click | Same as click | Same as action |
| Meta/Source disconnected state | Disable affected action and explain why | Health check loading | Recovery state updates | Keep action disabled and show reconnect/replay path | Destination/source health |

## Shared action state

Retry, Acknowledge, Pause, and Bulk Retry must be represented by one operational state model. A page-local optimistic label is not sufficient. Every mutation should produce an action result with command ID, target ID, actor, timestamp, previous state, next state, outcome, and error information when applicable.

## Action history

The Shared Event Inspector should show relevant action history. Audit Log is the authoritative cross-entity view. Action history is not a new feature; it makes the approved action result inspectable and backend-ready.

## References

[1]: ../../client/src/pages/Home.tsx "Current P0.1 action behavior and shared store prototype"
