# Permission UI Matrix

Roles are Operations, Developer, Marketing/Tracking, Support, and Admin. The matrix defines UI intent only. Backend authorization is mandatory and authoritative.

| Capability | Operations | Developer | Marketing / Tracking | Support | Admin |
|---|---:|---:|---:|---:|---:|
| View Overview | Yes | Yes | Yes | Yes | Yes |
| View Event Explorer | Yes | Yes | Limited | Yes, masked | Yes |
| Inspect Event | Yes | Yes | Limited | Yes, masked | Yes |
| Retry Event | Yes | Yes | No | No | Yes |
| Acknowledge Alert | Yes | Yes | No | Limited if policy allows | Yes |
| Pause Queue | Yes | Yes | No | No | Yes |
| Bulk Retry | Yes with guardrail | Yes | No | No | Yes |
| View Raw Payload | Limited by data policy | Yes | No | Masked | Yes |
| Edit Event Mapping | No | Yes | No | No | Yes |
| Manage Integration | No | Yes | No | No | Yes |
| View Delivery | Yes | Yes | Yes, summary | Yes | Yes |
| View Audit Log | Yes | Yes | Limited | Limited | Yes |
| Manage Settings | No | No | No | No | Yes |
| Manage Team Access | No | No | No | No | Yes |

## UI treatment

- **Unauthorized:** page-level access cannot be established. Show sign-in/session recovery; do not render sensitive data.
- **Permission Denied:** user identity is known but capability is not allowed. Keep permitted read-only content if policy allows, disable or hide action controls, state the role requirement, and provide an access-request path.
- **Masked support view:** show operational identifiers needed for support while masking raw payload, phone, token, and sensitive customer values.
- **Destructive or broad actions:** Bulk Retry and Pause Queue require explicit role permission, disabled/loading states, confirmation policy from backend, and audit logging.

Frontend gating must never be treated as security. Every read and mutation endpoint must enforce workspace, role, resource, and field-level policy on the server.

## References

[1]: ../chatgpt-project-context-prompt-th.md "Defined Signalroom user roles and product principles"
[2]: ../../client/src/pages/Home.tsx "Current prototype action surfaces"
