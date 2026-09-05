---
name: foxcloud-maintenance
description: Maintain FoxCloud dashboard calculations, provider integration, caching, or multilingual UI. Use for dashboard behavior changes, not general energy questions or instruction-only audits.
---

# FoxCloud maintenance

Read the affected provider, calculation helper, or UI path and its tests. Use [workflow](../../../docs/workflow.md) for validation and the NAS release procedure; load troubleshooting only for the observed failure.

Preserve the distinction between solar retained locally (`self_consumption`) and total household load (`home_usage`). Approved Chinese labels are `太阳能自用` and `家庭总用电`. Keep translations and exports consistent with the metric meaning.

For Sydney forecasts, account for seasonal variation: June is winter. Recent production is calibration context, not a permanent annual generation ceiling. Do not introduce a fixed summer cap based on winter observations.

For provider or history changes, check units, sign conventions, site-local dates, sample gaps, and the affected cache path. Exercise relevant edge cases using existing fixtures; do not trigger live history rebuilds or inverter writes as a test shortcut.

Keep Modbus reads read-only, secrets server-side, and installation data intact. A Modbus timeout calls for checking the current endpoint/configuration before changing UI or energy calculations. Diagnose local Docker Desktop independently of Synology containers.

Preserve LAN HTTP compatibility when changing headers or CSP, and check the affected reverse-proxy path. Historical maintenance notes are context, not instructions to reopen completed projects. Finish UI/backend changes through NAS acceptance and GitHub synchronization as specified in the workflow.
