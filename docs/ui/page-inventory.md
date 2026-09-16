# Page Inventory

Priority uses P0 for core operations, P1 for important workflows, and P2 for advanced or optimization surfaces. “Approved” means the page exists in the prototype and its current layout is the baseline; it does not mean backend behavior is complete.

| Page | Recommended route | Navigation group | Purpose | Primary user | Priority | Prototype status | Backend required | Notes |
|---|---|---|---|---|---|---|---|---|
| Overview | `/overview` | Core | System health, event flow, delivery, quality, alerts | Operations | P0 | Approved | Yes | First landing page; all key metrics should drill down |
| Event Explorer | `/events` | DATA | Search, filter, inspect events | Operations, Developer, Support | P0 | Approved | Yes | Current label is Event Stream; production name should be Event Explorer |
| Event Inspector | `/events/:eventId` | DATA detail | Debug one event across payload, identity, mapping, quality, delivery | Developer, Operations | P0 | Approved | Yes | Shared drawer in prototype; production route may render dedicated view |
| Data Quality | `/data-quality` | DATA | Quality score, missing fields, affected events | Developer, Operations | P0 | Approved | Yes | Metric cards must drill down |
| Event Mapping | `/event-mapping` | DATA | Versioned source-to-normalized-to-Meta mapping | Developer | P0 | Approved | Yes | Separate from Data Quality |
| Test Events | `/test-events` | DATA | Validate sample payload and simulate delivery | Developer | P0 | Approved | Yes | No production Meta request in prototype |
| Segments | `/segments` | CUSTOMERS | Define and monitor customer groups | Marketing, Operations | P1 | Approved | Yes | Segment creation is simulated locally |
| Audience Insights | `/audience-insights` | CUSTOMERS | Customer quality and audience intelligence | Marketing | P1 | Approved | Yes | Static analytical data in prototype |
| คัดกรองลูกค้า | `/customer-scoring` | CUSTOMERS | Quality scoring and qualification | Marketing, Operations | P1 | Approved | Yes | Keep governed and explainable |
| Meta Sync / Delivery | `/delivery` | META | Delivery health, logs, destinations, API metrics | Operations, Developer | P0 | Approved | Yes | Configuration belongs in Integrations |
| Failed Events | `/operations/failed` | META | Inspect failed deliveries and retry eligible events | Operations, Developer | P0 | Approved | Yes | Shared action state required |
| Retry Queue | `/operations/retry` | META | Monitor waiting, retrying, paused, permanently failed jobs | Operations | P0 | Approved | Yes | Queue controls require permission and audit |
| Campaigns | `/campaigns` | META | Read-only campaign and conversion intelligence | Marketing | P1 | Approved | Yes | No ad mutation in this surface |
| Integrations | `/integrations` | META | Business, app, dataset, token, CAPI setup | Admin, Developer | P0 | Approved | Yes | Configuration/setup, not monitoring |
| Sale Funnel | `/analytics/funnel` | ANALYTICS | Conversion journey and drop-off analysis | Marketing, Operations | P1 | Approved | Yes | Clickable stage drill-down |
| Creative Performance | `/analytics/creative` | ANALYTICS | Creative-level conversion performance | Marketing | P1 | Approved | Yes | Read-only intelligence |
| GEO จังหวัด | `/analytics/geo` | ANALYTICS | Province map, ranking, comparison, drill-down | Marketing | P1 | Approved | Yes | Real GeoJSON is presentation input; analytics must be backend-driven |
| AI แนะนำ | `/analytics/recommendations` | ANALYTICS | Recommendations for review | Marketing, Admin | P2 | Approved | Yes | Recommendation is not automatic execution |
| A/B Testing | `/analytics/experiments` | ANALYTICS | Experiment comparison | Marketing | P2 | Approved | Yes | Preserve approval/measurement guardrails |
| Dayparting | `/analytics/dayparting` | ANALYTICS | Time-of-day performance | Marketing | P2 | Approved | Yes | Analytical view only |
| Ads manager | `/ads` | Automation/Ads | Read-only campaign, ad set, ad intelligence | Marketing | P1 | Approved | Yes | No live mutation without separate approval |
| AI Ad Creator | `/ads/creator` | Ads | Draft ad concepts | Marketing | P2 | Approved | Yes | Draft only |
| AI Drafts | `/ads/drafts` | Ads | Review simulated drafts | Marketing, Admin | P2 | Approved | Yes | Approval boundary required |
| Auto-Pause Rules | `/automation/auto-pause` | AUTOMATION | Guardrail rule review | Admin, Marketing | P2 | Approved | Yes | Execution must be governed |
| ตรวจสอบอัตโนมัติ | `/automation/checks` | AUTOMATION | Scheduled health checks | Operations, Admin | P2 | Approved | Yes | Report failures with next action |
| รายงาน | `/automation/reports` | AUTOMATION | Scheduled reporting | Marketing, Admin | P2 | Approved | Yes | Delivery and ownership required |
| Alerts | `/alerts` | SYSTEM | Investigate active alerts | Operations, Developer | P0 | Approved | Yes | Alert must deep-link to investigation |
| Audit Log | `/audit` | SYSTEM | Review material changes and actions | Admin, Operations | P0 | Approved | Yes | Immutable backend record required |
| Settings | `/settings` | SYSTEM | Workspace controls, privacy, team access | Admin | P0 | Approved | Yes | UI gating only; backend enforcement required |

## Inventory interpretation

The prototype contains additional analysis and automation pages because they were previously approved. They are secondary to Core Operations and must not increase cognitive load in the primary workflow. Backend implementation should deliver P0 pages before P1 and P2 pages.

## References

[1]: ../../client/src/pages/Home.tsx "Prototype page components and active section routing"
