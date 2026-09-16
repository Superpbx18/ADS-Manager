# Mock Data Contract

> **PROTOTYPE ONLY — DO NOT TREAT AS PRODUCTION LOGIC.**

The current prototype uses local arrays and React state. These shapes describe what the UI needs, not a final database schema. Backend teams must confirm identifiers, enum names, pagination, timestamps, privacy rules, and ownership before implementation.

## Event

Required: `event_id`, `event_name`, `occurred_at`, `workspace_id`, `source`, `site`, `user_id` or anonymous identifier, `delivery_status`, `quality_status`.

Optional: `phone_hash`, `transaction_id`, `amount`, `currency`, `fbclid`, `fbc`, `fbp`, `consent_status`, `campaign_id`, `adset_id`, `ad_id`, `mapping_version`, `payload_refs`, `delivery_attempts`.

Status enums: `received`, `queued`, `delivered`, `failed`, `filtered`, `retrying`, `acknowledged`.

```json
{"event_id":"evt_01JXYZ123","event_name":"Purchase","workspace_id":"ws_northstar","site":"288UP","source":"Website","user_id":"U10492","transaction_id":"txn_test_001","amount":4290,"currency":"THB","quality_status":"passed","delivery_status":"delivered","occurred_at":"2026-09-16T14:28:12Z"}
```

## Alert

Required: `alert_id`, `workspace_id`, `severity`, `title`, `impact`, `cause`, `status`, `created_at`, `target_type`, `target_query`.

Status enums: `open`, `acknowledged`, `resolved`, `suppressed`.

## RetryJob

Required: `job_id`, `event_id` or `batch_id`, `workspace_id`, `destination`, `status`, `attempt`, `max_attempts`, `next_attempt_at`, `created_at`.

Status enums: `waiting`, `retrying`, `paused`, `failed_permanently`, `succeeded`, `cancelled`.

## ActionHistory / AuditEntry

Required: `action_id`, `workspace_id`, `actor_id`, `actor_role`, `action`, `target_type`, `target_id`, `previous_state`, `next_state`, `outcome`, `created_at`, `request_id`.

Optional: `error_code`, `error_message`, `metadata`, `source_page`.

## Source and Destination

Source requires `source_id`, `workspace_id`, `name`, `kind`, `health_status`, `last_heartbeat_at`. Destination requires `destination_id`, `kind`, `connection_status`, `token_expiry_at`, `last_delivery_at`, and safe masked identifiers.

Status enums: `healthy`, `warning`, `disconnected`, `unknown`, `expired`.

## Customer, Campaign, Ad Set, Ad

Each requires a stable ID, workspace scope, display name, and relationship IDs. Customer identity values must follow masking and hashing policy. Campaign entities are read-only in Core Operations unless an approved mutation contract exists.

## Backend confirmation points

Confirm event immutability, deduplication key, timezone, currency rules, phone hashing algorithm, raw payload retention, field-level redaction, event-to-customer relationship cardinality, retry idempotency, bulk command semantics, and audit retention before treating these shapes as API contracts.

## References

[1]: ../../client/src/pages/Home.tsx "Current prototype sample data and local state"
[2]: ../event-data-contract-th.md "Existing event contract context"
