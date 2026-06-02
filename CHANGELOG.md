# Changelog

## 2026-05-24

### Added

- Added a last-24-hours operational heatmap to the dashboard, showing solar generation, home load, battery discharge, and grid import intensity as visual bands.
- Added solar generation and grid import series to the `last24Hours` dashboard payload for FoxCloud, Modbus, and demo data.
- Added a monthly solar production calendar and weekday energy profile so daily and weekly patterns can be read visually instead of only through table values.
- Replaced the solar-vs-load daily map with an evening peak readiness panel that scores battery readiness, tariff state, grid flow, and estimated savings.
- Added a battery reserve plan panel that shows usable reserve above the safety floor, current battery mode, battery power, home-load coverage, and a direct action hint.
- Added a flexible load planner that estimates usable solar surplus, recommends whether to run deferrable loads now, and warns about peak import or low battery reserve.
- Added a battery runway forecast that estimates time to the 20% reserve floor from recent SOC trends and highlights overnight risk.
- Added a grid import forecast that combines recent import, live grid flow, tariff state, battery reserve, and solar trend into an import-pressure score with a suggested action.
- Added a today energy timeline that groups recent 24-hour samples into solar-led, battery-led, grid-import, mixed, and quiet operating segments.
- Added an operating summary panel that turns self-sufficiency, net grid position, recent operating mode, battery reserve, and suggested action into a single at-a-glance daily verdict.
- Added a top-level bill impact panel that compares today's estimated no-solar/no-battery grid cost, actual grid cost, export credit, and net bill benefit.
- Added structured Modbus TCP connection diagnostics so DHCP/IP changes show a useful dashboard warning with the attempted host, port, timeout, and next steps.
- Added a tomorrow solar readiness panel that combines tomorrow's forecast, rain/cloud outlook, current battery reserve, recent home load, and tariff state into a practical load-planning recommendation.
- Added daily mean cloud-cover data to the weather forecast payload so solar-readiness decisions can account for tomorrow's cloud conditions.
- Added a priority action board that summarizes live solar surplus, grid import pressure, battery runway, peak tariff timing, and tomorrow's forecast into immediate household actions.
- Added SQLite backup status metadata to the protected `/api/health` response, including backup path, interval, retention count, scheduler state, next run time, running state, last successful backup path, and last success/failure timestamps.
- Added regression coverage for the SQLite backup health status shape.
- Added a sticky dashboard section navigator for jumping directly to overview, actions, battery, daily data, and settings.
- Added a smart energy pilot panel that combines solar surplus, battery reserve, grid pressure, tariff timing, weather outlook, and warnings into one plain-language decision with action cards.
- Added a decision-basis row to the smart energy pilot so solar surplus, battery reserve, grid pressure, and next-window inputs are visible beside the recommendation.
- Added a local load advisor that estimates whether common flexible loads are worth running now based on current surplus, battery reserve, tariff state, and grid pressure.
- Added best-window guidance to the load advisor so each flexible load can point to now, off-peak, tomorrow's solar window, or a battery-recovery window.
- Added a smart daily plan strip that summarizes what to do now, next, during peak, and tomorrow based on the same local decision signals.
- Added a flexible-load priority recommendation that ranks the load advisor options and highlights the lowest-impact load to run first.
- Added a smart-hub confidence score that explains how reliable the current recommendation is based on live data age, warning count, sample coverage, and weather availability.
- Added a browser-local smart decision log so recent smart-hub recommendations can be compared as conditions change.
- Added a smart decision trend explanation that compares the latest recommendation with the previous browser-local entry and names the main changing signal.
- Added a smart watchlist that ranks the top three live signals to monitor now across battery reserve, solar surplus, grid pressure, data confidence, and tomorrow's outlook.
- Added a tonight operating plan that turns live load headroom, peak timing, battery runway, grid pressure, and tomorrow's forecast into a four-stage evening timeline.

### Changed

- Moved weather forecast settings, live data confidence, the 24-hour heatmap, the solar calendar, the weekday profile, and savings settings below the daily energy table so the main dashboard stays focused on daily operation.
- Added a top KPI card for today's battery net charge/discharge between daily consumption and daily export.
- Made the battery factor in the energy health score larger and color-coded by SOC level.
- Expanded live data confidence warning text with the current response warning detail and generated timestamp.
- Kept settings panels grouped near the bottom of the dashboard, with forecast location settings immediately before savings settings.
- Reworked the smart decision log into a compact signal-change trail so repeated recommendations no longer dominate the smart energy panel.
- Rebalanced the smart energy panel layout by turning decision basis into a lighter strip and grouping watchlist/history as secondary context.
- Tightened the load advisor into a compact step strip and two-column load list, with full detail reserved for loads that need waiting or avoiding.
- Grouped daily bill/score and data/tariff panels into compact dashboard rows, and turned savings plus action advice into lighter scanning sections.

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
