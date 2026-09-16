# Route Map

The prototype currently switches `activeSection` in React state rather than using a production URL router. The following URL structure is the recommended production contract. It preserves the approved navigation while making investigation state shareable and refresh-safe.

## Main routes

| Route | Page | Required query state |
|---|---|---|
| `/overview` | Overview | `workspace`, optional `dateRange` |
| `/events` | Event Explorer | Search and filters described below |
| `/data-quality` | Data Quality | `rule`, `field`, `status` |
| `/event-mapping` | Event Mapping | `version`, `sourceEvent` |
| `/test-events` | Test Events | `scenario`, `eventName` |
| `/segments` | Segments | `segmentId`, `status` |
| `/delivery` | Meta Delivery | `destination`, `status`, `dateRange` |
| `/operations/failed` | Failed Events | `source`, `destination`, `reason` |
| `/operations/retry` | Retry Queue | `queueStatus`, `destination` |
| `/alerts` | Alerts | `severity`, `status` |
| `/audit` | Audit Log | `actor`, `action`, `dateRange` |
| `/integrations` | Integrations | `connection`, `status` |
| `/settings` | Settings | `tab` |

## Secondary routes

| Route | Page |
|---|---|
| `/campaigns` | Campaign intelligence |
| `/analytics/funnel` | Sale Funnel |
| `/analytics/creative` | Creative Performance |
| `/analytics/geo` | GEO จังหวัด |
| `/analytics/recommendations` | AI แนะนำ |
| `/analytics/experiments` | A/B Testing |
| `/analytics/audience` | Audience Insights |
| `/analytics/customer-scoring` | คัดกรองลูกค้า |
| `/analytics/dayparting` | Dayparting |
| `/ads` | Ads manager |
| `/ads/creator` | AI Ad Creator |
| `/ads/drafts` | AI Drafts |
| `/automation/auto-pause` | Auto-Pause Rules |
| `/automation/checks` | ตรวจสอบอัตโนมัติ |
| `/automation/reports` | รายงาน |

## Detail routes

| Route | Purpose |
|---|---|
| `/events/:eventId` | Shared Event Inspector as a deep-linkable detail view |
| `/alerts/:alertId` | Alert detail with impact, cause, affected records, and action history |
| `/campaigns/:campaignId` | Campaign Inspector |
| `/customers/:customerId/journey` | Customer Journey dedicated view |
| `/integrations/:connectionId` | Integration detail and health |
| `/audit/:auditId` | One audit entry and related action |

## Filter and search examples

```text
/events?status=failed
/events?site=288UP
/events?event=Purchase&destination=meta_capi
/events?q=evt_01JXYZ123
/events?q=288UP&status=failed
/operations/failed?reason=missing_transaction_id
/operations/retry?queueStatus=paused
/alerts?severity=critical&status=open
```

Query parameters must be URL-encoded, preserve the current workspace scope, and be safe to copy and share. The backend must re-validate workspace and permission scope on every request.

## Deep-link contract

An Alert click must navigate to the investigation target with context. For example, the `288UP` source alert should navigate to `/events?q=288UP&event=deposit_success&status=failed`. An Event row opens `/events/:eventId`. A Failed Events Inspect action opens the same event detail, not a separate incompatible inspector.

## References

[1]: ../../client/src/pages/Home.tsx "Current prototype section switching and deep-link-like interactions"
