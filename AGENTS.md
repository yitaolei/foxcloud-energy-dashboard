# FoxCloud Dashboard Codex Guide

## Project Shape

This repo is a plain TypeScript backend with a plain HTML/CSS/JS frontend.

- Backend: `src/`
- Frontend: `public/index.html`, `public/app.js`, `public/styles.css`
- Tests: `test/*.test.mjs`
- NAS deploy script: `scripts/deploy-nas.sh`
- Live NAS target: `http://192.168.0.19:3080`

Avoid framework rewrites. Prefer small, testable changes that follow existing patterns.

## Checks

Before reporting code changes as done, run the relevant checks:

```sh
npm run check
npm run build
npm test
```

For frontend changes, also verify the live page and browser console after NAS deployment unless the user explicitly asks for local-only work.

## NAS Deployment

The user's real acceptance target is the Synology dashboard, not only the local repo.

Default deployment:

```sh
npm run deploy:nas
```

If `/Volumes/Newhome/docker/foxcloud-dashboard` is unavailable, use SSH sync to:

```text
DS923SOPAC.local:/volume1/Newhome/docker/foxcloud-dashboard/
```

Then rebuild on Synology. Keep Synology commands inside an SSH session; do not run `/volume1` or Synology Docker commands in the Mac Mini shell.

## Plugin Usage

- GitHub: commit, push, PR, issue, and CI work.
- Browser: verify local/live dashboard pages and console behavior.
- Chrome: use only when the user's existing browser session matters.
- Computer Use: fallback for Mac app UI operations.
- Documents/Spreadsheets/Presentations: only when creating or editing those artifact types.
- Sites and public hosting plugins are not part of the normal FoxCloud NAS workflow.

## Secrets And Runtime Config

Do not print `.env` secrets. It is OK to inspect non-secret keys such as `MODBUS_HOST` when diagnosing runtime connectivity.

The inverter Modbus IP can change. If live data fails with Modbus timeout, check the NAS `.env` `MODBUS_HOST` and restart the container after updating it.
