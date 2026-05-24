# FoxCloud Dashboard Maintenance

This is a maintenance stream for the existing project: **Build FoxCloud Dashboard**.

The goal is to update, improve, debug, and maintain the current FoxCloud Dashboard without rebuilding it from scratch.

## Scope

- Preserve existing FoxCloud, Modbus, SQLite, Docker, multilingual UI, export, and dashboard features.
- Prioritise bug fixes, stability, API reliability, clear error messages, and safe handling of credentials.
- Keep secrets out of source code and browser code.
- Use environment variables for API keys, tokens, passwords, and local inverter settings.
- Update README or setup documentation whenever setup steps change.
- Add or update tests where practical.

## Current Structure

- `src/server.ts`: Express server, routes, Basic Auth, static frontend hosting.
- `src/config/env.ts`: environment variable parsing and validation.
- `src/lib/foxcloudClient.ts`: FoxCloud OpenAPI client and request signing.
- `src/services/dashboardService.ts`: FoxCloud dashboard aggregation, report/history handling, cache rebuild.
- `src/services/modbusDashboardService.ts`: read-only local Modbus provider and daily/live data aggregation.
- `src/services/modbusSampler.ts`: Modbus background sampler.
- `src/services/sqliteStore.ts`: SQLite daily energy and live sample storage.
- `src/services/sqliteBackup.ts`: SQLite backup scheduler.
- `public/index.html`: dashboard markup.
- `public/app.js`: frontend state, i18n, rendering, charts, CSV/PDF export.
- `public/styles.css`: responsive dashboard styling.
- `README.md` and `README_FIRST.md`: user setup documentation.

## Maintenance Completion Status

Status: completed for the first maintenance stream on 2026-05-12.

Final maintenance focus:

- Security hardening without reintroducing the Synology HTTP/CSP breakage.
- Safer API parameter validation and JSON API errors.
- More reliable FoxCloud retry handling and request signing coverage.
- Shared energy calculation helpers and regression tests.
- Local Modbus profile support, profile health metadata, and fallback warnings.
- Safer rebuild-cache UX with structured summaries and API-call preview.
- English and Chinese documentation kept in sync for setup-impacting changes.

Open-source handoff:

- The maintenance branch is ready to fast-forward into `main`.
- Remaining larger product ideas should move into the next redesign project rather than
  extending this maintenance stream.
- Avoid broad security header/CSP changes until they are tested on both LAN HTTP and
  HTTPS reverse-proxy deployments.

## Current Verification Baseline

Run these before and after maintenance changes:

```bash
npm run check
npm test
npm run build
npm audit --audit-level=moderate
```

Current baseline at stream creation:

- `npm run check`: passing
- `npm test`: passing
- `npm run build`: passing
- `npm audit --audit-level=moderate`: 0 vulnerabilities

## Known Fragile Areas

- Frontend uses `innerHTML` in a few render paths. Replace with DOM APIs and `textContent` to reduce XSS risk.
- FoxCloud and Modbus have similar 5-minute energy calculation logic. Extract shared helpers to avoid drift.
- Modbus support currently targets FoxESS H3 Smart style registers and needs clearer model profiles.
- `rebuild-cache` can make many FoxCloud API calls and needs better progress, rate-limit handling, and user feedback.
- `range`, `year`, and `month` request parameters need stricter validation and clearer errors.
- PDF export is intentionally simple and does not include rendered charts.
- Request parameter parsing has unit tests. More tests are still needed for energy calculations, Modbus decoding, and export helpers.

## FoxCloud API Integration Notes

Current FoxCloud endpoints are called server-side only:

- `/op/v0/device/list`
- `/op/v0/device/real/query`
- `/op/v0/device/report/query`
- `/op/v0/device/history/query`
- `/op/v0/device/generation`
- `/op/v0/plant/detail`

The browser must never call FoxCloud directly. The backend signs FoxCloud requests using `FOXCLOUD_API_KEY`.

## Security Notes

- `.env`, `.env.local`, `data/*`, and `backups/` are ignored by Git.
- Keep `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD`, and `DASHBOARD_USERS` configured before exposing the app outside a private LAN.
- Use HTTPS when exposing the dashboard through Synology reverse proxy or similar.
- Do not paste real API keys, passwords, tokens, serial numbers, or database files into GitHub issues.
- Review `/api/health` output before public deployments; it should not expose secrets.

## Prioritised Roadmap

1. Remove unsafe frontend `innerHTML` rendering.
2. Add strict API parameter validation for `range`, `year`, and `month`.
3. Add unit tests for date ranges, PV production calculations, Modbus register decoding, and CSV/PDF helpers.
4. Add FoxCloud retry/backoff handling for timeouts, 429s, and transient network failures.
5. Extract shared energy calculation helpers used by FoxCloud and Modbus.
6. Make Modbus register maps profile-based for easier inverter support.
7. Improve `rebuild-cache` with progress reporting, clearer limits, and better UI feedback.
8. Improve troubleshooting docs for Modbus connectivity, Synology deployment, SQLite backup/restore, and PV mismatch.

## Suggested Follow-Up Tasks

- `maintenance/security-sanitize-frontend-rendering`
- `maintenance/api-parameter-validation`
- `maintenance/add-energy-calculation-tests`
- `maintenance/foxcloud-retry-backoff`
- `maintenance/extract-energy-calculation-module`
- `maintenance/modbus-register-profiles`
- `maintenance/rebuild-cache-progress`
- `maintenance/troubleshooting-docs`

## Maintenance Incident Notes

- 2026-05-04: A first attempt to add `helmet` security headers broke the Synology LAN
  HTTP deployment. The page loaded as unstyled HTML because browser resource loading was
  affected by the default security header behavior, most likely
  `upgrade-insecure-requests` on `http://192.168.0.19:3080`.
- Do not reintroduce `helmet` or a Content Security Policy as a broad change until it has
  been tested on both local HTTP/LAN access and HTTPS reverse-proxy access.
- Safer first steps are backend parameter validation, API 404 handling, CSV export
  hardening, and frontend rendering cleanup without changing response security headers.

## Completed Maintenance Notes

- Added backend validation for dashboard `year`, `month`, and `range` parameters.
- Returned JSON 404 responses for unknown `/api/*` routes instead of serving the SPA HTML.
- Added CSV formula-injection protection for exports.
- Replaced remaining frontend `innerHTML` rendering in badges, warnings, and the daily
  table with DOM APIs and `textContent`.
- Added `README.zh-CN.md` and linked it from the English README.
- Extracted request parameter validation into a tested helper module.
- Persisted each browser's selected language and table range in local storage with safe
  fallbacks.
- Added public lightweight `/api/livez` for reverse-proxy or container liveness checks
  without exposing detailed configuration.
- Added protected `/api/health` operational metadata for version, optional git SHA,
  start time, and uptime.
- Passed optional Docker build metadata (`APP_VERSION`, `GIT_SHA`) into the runtime
  image so `/api/health` can identify deployed revisions.
- Added `npm run metadata` to update non-secret build metadata in `.env` before Docker
  rebuilds.
- Added `docs/troubleshooting.md` with checks for local installs, Synology, Docker,
  reverse proxy, Modbus, FoxCloud, SQLite, and safe GitHub issue reports.
- Added tests for the browser CSV export escaping helper.
- Extracted Basic Auth parsing into a tested helper and preserved passwords containing
  colons.
- Extracted shared kW-to-kWh sample integration into `src/lib/energyMath.ts` and added
  regression tests for rounding, sample order, long gaps, and invalid values.
- Added conservative FoxCloud retry/backoff handling for transient network errors, 429
  rate limits, and HTTP 5xx responses, with regression tests.
- Extracted Modbus register decoding into `src/lib/modbusRegisters.ts` and added tests
  for signed/unsigned multi-register reads, scaling, missing registers, and negative
  signed values.
- Extracted FoxCloud request signing into `createFoxCloudSignature()` and added a
  regression test documenting the literal `\\r\\n` separator format used by working
  FoxCloud examples.
- Extracted shared date/month range helpers into `src/lib/dateRanges.ts` and added
  tests for week, month, previous-month, multi-month, all-data, leap-year, and
  inclusive month-list behavior.
- Added structured rebuild-cache result metadata and tested frontend formatting so
  users can see checked, recalculated, unchanged, omitted, and limit counts.
- Added the first profile-based Modbus register map in `src/services/modbus/profiles.ts`
  for FoxESS H3 Smart and covered profile selection/key addresses with tests.
- Updated rebuild-cache confirmation text so it clearly states the current most-recent
  day limit before the user starts API-heavy history recalculation.
- Added `MODBUS_PROFILE` for explicit register-map selection, with backward
  compatibility for older `MODBUS_INVERTER_MODEL` based setups.
- Added Modbus profile metadata to the protected `/api/health` response so deployments
  can confirm which register map is active.
- Added explicit Modbus profile fallback detection so misspelled profile names remain
  backward compatible but are visible in `/api/health` and dashboard warnings.
- Added a rebuild-cache preview endpoint and frontend confirmation text showing the
  estimated rebuild day count and FoxCloud history API calls before work starts.
- Added SQLite backup configuration, scheduler state, next run time, and last-run status
  to the protected `/api/health` response so Docker and NAS deployments can verify
  backups without reading logs.
- Made SQLite backup scheduler startup idempotent so duplicate calls do not create
  duplicate interval timers in one process.
