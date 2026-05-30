# Troubleshooting Guide

This guide collects practical checks for local installs, Docker, Synology, FoxCloud, Modbus, and SQLite.

Do not paste real API keys, passwords, full serial numbers, or database files into GitHub issues.

## Quick Health Checks

Public liveness check:

```text
http://localhost:3000/api/livez
```

Expected result:

```json
{"ok":true,"timestamp":"..."}
```

Protected health check:

```text
http://localhost:3000/api/health
```

This should ask for the dashboard username and password. After login it shows provider, version, git SHA, uptime, and configuration status without exposing secrets.

For Synology LAN deployments, replace `localhost:3000` with your NAS URL, for example:

```text
http://192.168.0.19:3080/api/livez
```

## Page Loads Without Styling

Symptom: the dashboard appears as plain HTML, with no styling or charts.

Checks:

- Open the browser developer tools and confirm `/styles.css` and `/app.js` return `200`.
- If you recently changed security headers, remove broad Helmet/CSP changes and test HTTP LAN access again.
- Do not enable `upgrade-insecure-requests` for plain LAN HTTP deployments such as `http://192.168.0.19:3080`.
- Test both local HTTP and reverse-proxy HTTPS before reintroducing CSP or Helmet.

## Login Problems

Checks:

- Open the dashboard normally, for example `http://localhost:3000`.
- Do not use `http://username:password@localhost:3000`; some browsers block `fetch` from pages opened with credentials in the URL.
- Confirm `.env` contains `DASHBOARD_USERNAME` and `DASHBOARD_PASSWORD`, or extra users in `DASHBOARD_USERS`.
- If you changed `.env`, restart the server or rebuild/recreate the container.

## Docker Or Synology Rebuild Problems

Checks:

- Confirm `.env` exists in the project folder on the NAS.
- Confirm `data/` or the Docker named volume is not deleted when rebuilding.
- Confirm the host port is not already used by another container.
- For this project, keep source syncs from overwriting `.env`, `data/`, `backups/`, `node_modules/`, and `dist/`.
- After rebuild, check `/api/health` and confirm `gitSha` matches the expected commit.

Useful metadata command before a Docker rebuild:

```bash
npm run metadata
```

This updates only `APP_VERSION` and `GIT_SHA` in `.env`.

## Modbus Connectivity

Checks:

- Confirm the dashboard server is on the same LAN or Wi-Fi as the inverter/datalogger.
- Confirm `DATA_PROVIDER=modbus`.
- Confirm `MODBUS_HOST`, `MODBUS_PORT`, and `MODBUS_UNIT_ID`.
- If the router rebooted, check whether DHCP assigned a new inverter IP address. Update `MODBUS_HOST` and restart the container if it changed.
- Add a DHCP reservation/static lease for the inverter MAC address so future router reboots keep the same IP.
- Keep `MODBUS_READ_ONLY=true`.
- Test TCP connectivity:

```bash
nc -zv YOUR_INVERTER_IP 502
```

When the dashboard shows `TCP Connection Timed Out`, the app is usually running but cannot open a Modbus TCP connection to `MODBUS_HOST:MODBUS_PORT`. Check the inverter IP in the router, confirm port `502` is reachable from Synology, then restart the `foxcloud-dashboard` container after any `.env` change.

If TCP connects but values are wrong, the inverter model may need a different Modbus register profile.

## FoxCloud Mode Problems

Checks:

- Confirm `DATA_PROVIDER=foxcloud`.
- Confirm `FOXCLOUD_API_KEY` is present in `.env`.
- Confirm `FOXCLOUD_BASE_URL=https://www.foxesscloud.com` unless you intentionally use another endpoint.
- Watch for API rate limits when using `Rebuild cache`.
- If values differ from FoxCloud Analysis, check whether the dashboard is using daily reports or 5-minute history calculations.

## Daily Data Looks Wrong

Checks:

- For today's row, values may change during the day because they are still accumulating.
- In FoxCloud mode, `PV produced` may use FoxCloud Analysis logic: self-consumption plus return to grid from 5-minute samples.
- In Modbus mode, historical rows depend on locally sampled and cached data.
- Use `Rebuild cache` carefully. It can make many FoxCloud API calls.
- Compare one day at a time against FoxCloud before rebuilding long ranges.

## Last 24 Hours Chart Is Empty

Checks:

- In Modbus mode, the chart fills as the server samples live values.
- If the container was just rebuilt, the chart may need time to accumulate samples unless SQLite data was preserved.
- Confirm the SQLite database or Docker volume was not deleted.
- Confirm the server has been running for at least several sample intervals.

## SQLite Backups

Default local data file:

```text
data/foxcloud-dashboard.sqlite
```

Backup folder:

```text
data/backups/
```

or in Docker/Synology deployments:

```text
./backups
```

The database and backups are private household data. Do not upload them to GitHub.

## Safe GitHub Issue Checklist

When reporting a problem, include:

- Operating system or NAS model.
- Data provider: FoxCloud or Modbus.
- Browser name.
- Whether `/api/livez` works.
- Whether `/api/health` works after login.
- A screenshot with serial numbers hidden.
- Relevant log lines with secrets removed.

Do not include:

- API keys.
- FoxCloud password.
- Dashboard password.
- Full inverter or battery serial number.
- SQLite database or backup files.
