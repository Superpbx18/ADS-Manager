# Information Architecture

## Principle

Navigation is organized by the operator’s job, not by backend service boundaries. The primary path is Overview → investigation surface → shared inspector → governed action.

## Approved groups

| Group | Pages | User job |
|---|---|---|
| Overview | ภาพรวม | Know whether the system is healthy |
| DATA | Event Stream, Data Quality, Event Mapping, Test Events | Receive, validate, normalize, debug |
| CUSTOMERS | Segments, Audience Insights, คัดกรองลูกค้า | Qualify and group customers |
| META | Meta Sync, Failed Events, Retry Queue, Campaigns, Integrations | Monitor delivery and configure destinations |
| ANALYTICS | Sale Funnel, Creative Performance, GEO จังหวัด, AI แนะนำ, A/B Testing, Audience Insights, Dayparting | Understand performance and opportunities |
| AUTOMATION | Auto-Pause Rules, ตรวจสอบอัตโนมัติ, รายงาน | Review controlled automation |
| SYSTEM | Alerts, Audit Log, Settings | Govern, audit, and administer |

The prototype has a few label/group differences caused by its historical evolution. Production should preserve the approved visible IA from the latest prototype and resolve only duplicate placement during implementation review. Do not create additional top-level groups.

## Core versus secondary

P0 Core Operations are Overview, Event Explorer, Event Inspector, Data Quality, Event Mapping, Meta Delivery, Failed Events, Retry Queue, Alerts, Audit Log, and Integrations. Segments and Customer Journey are important adjacent workflows. Advanced Analytics, GEO, AI, Ads, and Automation remain secondary and must not obstruct P0 discovery.

## Global search

Global Search is available from the topbar and accepts Event ID, Customer, Phone, User ID, Transaction, FCID, fbclid, Campaign, Ad, Pixel, and Source. Search submission should land in Event Explorer or the most specific result type while preserving the query in the URL.

## Duplicate avoidance

Data Quality answers “is the data valid?” Event Mapping answers “what is this data transformed into?” Integrations answers “is configuration valid?” Delivery answers “what happened operationally?” Failed Events and Retry Queue are action-oriented delivery views, not duplicate configuration pages.

## References

[1]: ../../client/src/pages/Home.tsx "Current sidebar groups and navigation definitions"
[2]: ../information-architecture-th.md "Existing Signalroom information architecture documentation"
