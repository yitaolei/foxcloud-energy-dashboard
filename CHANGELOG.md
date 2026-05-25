# Changelog

## 2026-05-24

### Added

- Added a last-24-hours operational heatmap to the dashboard, showing solar generation, home load, battery discharge, and grid import intensity as visual bands.
- Added solar generation and grid import series to the `last24Hours` dashboard payload for FoxCloud, Modbus, and demo data.
- Added a monthly solar production calendar and weekday energy profile so daily and weekly patterns can be read visually instead of only through table values.
- Replaced the solar-vs-load daily map with an evening peak readiness panel that scores battery readiness, tariff state, grid flow, and estimated savings.
- Added SQLite backup status metadata to the protected `/api/health` response, including backup path, interval, retention count, scheduler state, next run time, running state, last successful backup path, and last success/failure timestamps.
- Added regression coverage for the SQLite backup health status shape.

### Fixed

- Prevented duplicate SQLite backup scheduler intervals if the scheduler startup hook is called more than once in the same process.
- Kept an explicit server reference so newer Node runtimes do not allow the app process to exit immediately after startup.

## 2026-05-06

### Added

- Added shared energy math helpers for converting timestamped kW samples into kWh totals.
- Added tests for energy rounding, trapezoid integration, sample sorting, long sample gaps, and invalid/negative power values.
- Added conservative FoxCloud API retry/backoff handling for transient network errors, HTTP 429, and HTTP 5xx responses.
- Added tests for FoxCloud retry behavior and non-retryable application errors.
- Added shared Modbus register decoding helpers for signed, unsigned, and scaled register values.
- Added tests for Modbus 16-bit/32-bit decoding, low-word-first ordering, missing registers, scaling, and signed negative values.
- Added a FoxCloud request-signing helper and regression test for the literal `\\r\\n` signature separator format.
- Added shared date-range helpers for dashboard table ranges and month list generation.
- Added tests for current week, current month, previous month, multi-month, all-data, leap-year, and inclusive month-list behavior.
- Added structured rebuild-cache summary metadata and tested frontend formatting for rebuild results.
- Added a first Modbus register profile for FoxESS H3 Smart and tests for profile selection and key addresses.
- Added rebuild-cache confirmation formatting that includes the 31-day rebuild limit.
- Added `MODBUS_PROFILE` as the explicit Modbus register-map selector while preserving `MODBUS_INVERTER_MODEL` compatibility.

### Changed

- FoxCloud last-hour totals and Modbus last-hour totals now use the same tested integration helper to reduce calculation drift.
- Modbus dashboard register reads now use the shared decoding helper, preparing the codebase for profile-based register maps.
- FoxCloud request signing now routes through a named helper so the separator format is explicit and tested.
- FoxCloud and Modbus dashboard services now share common date/month utility functions instead of carrying duplicate range logic.
- Rebuild cache status now reports checked, recalculated, unchanged, omitted, and limit information instead of only processed days.
- Modbus snapshot reads now use the selected register profile instead of hard-coded addresses inside the dashboard service.
- Rebuild cache confirmation text now warns users about the most-recent-days limit before making FoxCloud history API calls.
- Modbus setup docs now separate the register profile selector from the friendly inverter model label.

## 2026-05-05

### Added

- Added a maintenance stream branch and maintenance documentation for small, reviewable fixes.
- Added `README.zh-CN.md` and linked it from the English README.
- Added `npm test` using Node's built-in test runner for request parameter parsing.
- Added test coverage for browser CSV export escaping.
- Added test coverage for Basic Auth parsing.
- Added a public lightweight `/api/livez` endpoint for reverse proxy and container liveness checks.
- Added protected `/api/health` metadata for app version, optional git SHA, server start time, and uptime.
- Added optional Docker build metadata (`APP_VERSION`, `GIT_SHA`) and `npm run metadata` to update non-secret deployment metadata.

### Changed

- Dashboard language and table range selections are now remembered per browser with safe local storage fallbacks.
- Request parameter parsing for `year`, `month`, and `range` was moved into a small tested helper module.
- Unknown `/api/*` routes now return JSON `404` responses instead of falling back to the frontend HTML page.
- Basic Auth parsing now preserves colons inside passwords.

### Security

- Removed remaining frontend `innerHTML` render paths in badges, warnings, and the daily energy table.
- Added CSV formula-injection protection for exported daily energy CSV files.
- Documented that broad Helmet/CSP changes must be tested on both LAN HTTP and reverse-proxy HTTPS before being reintroduced.

### Notes

- A previous broad security-header attempt broke Synology LAN HTTP resource loading and was reverted.
- This maintenance set avoids new runtime dependencies and has been tested on the Synology deployment path step by step.

## 2026-04-29

### Added

- Added an experimental read-only local Modbus TCP provider with `DATA_PROVIDER=modbus`.
- Added Modbus environment variables for inverter LAN host, port, unit ID, timeout, local device label, and read-only mode.
- Added SQLite live sample storage for Modbus-powered last-hour and last-24-hour dashboard charts.
- Added a Modbus background sampler that stores live samples every minute while the server is running.
- Added automatic SQLite backups with Docker/NAS-friendly `./backups` storage.
- Added README setup notes for users who want to run without FoxCloud API keys.

### Fixed

- Added safe signed 32-bit Modbus register decoding so battery charge/discharge power does not show impossible values.
- Aligned the dashboard battery temperature card with FoxCloud's minimum battery temperature by reading the Modbus low cell temperature register.
- Added separate minimum battery, maximum battery, and battery pack temperature values for Modbus dashboards.

### Notes

- The first Modbus register map targets FoxESS H3 Smart style holding registers and must be verified by users with other inverter models.
- Modbus setting writes are intentionally not enabled.

## 2026-04-28

### Added

- Added a dashboard `Rebuild cache` action that recalculates the selected date range from FoxCloud 5-minute history data.
- Added a `This week` table/range option.
- Added direct browser PDF export without opening the print dialog.
- Added multilingual UI text for the new controls in English, Chinese, and Thai.

### Changed

- Today's `PV produced` now follows the FoxCloud Analysis day-view logic: self-consumption plus export from the 5-minute power curve.
- Historical rows can now be recalculated so `PV produced`, self-consumption, return to grid, home usage, grid consumption, and battery charge/discharge use the same 5-minute history approach where data is available.
- Regular dashboard refreshes now preserve rebuilt historical rows and only refresh today's live row, avoiding accidental overwrite by monthly report data.

### Fixed

- Fixed overnight `PV produced` over-counting by only calculating solar production during intervals where FoxCloud history shows real PV/export activity.
- Fixed current-month refreshes overwriting rebuilt historical rows with older monthly report values.

### Notes

- `Rebuild cache` is intentionally manual because it can make many FoxCloud API calls.
- The rebuild operation is capped to a recent range to reduce API-limit risk.
- Private `.env`, SQLite database files, household energy history, and inverter serial numbers remain excluded from Git.
