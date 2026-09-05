# Contributing

Thanks for helping improve the FoxCloud Energy Dashboard.

## Before You Open an Issue

Please check:

- You are using Node.js 20 or newer.
- You ran `npm install`.
- You created a local `.env`.
- You did not commit `.env`.
- You tried `npm run check`.

## What To Include

Useful details:

- Operating system: macOS, Windows, Linux, or NAS.
- Browser: Safari, Chrome, Firefox, Edge.
- Inverter/battery model.
- Whether `http://localhost:3000` works.
- Whether LAN access from another device works.
- Terminal error messages with secrets removed.
- Screenshots with serial numbers, addresses, and API keys hidden.

## What Not To Share

Do not share:

- FoxCloud API key.
- FoxCloud username or password.
- dashboard password.
- `.env` file.
- public IP address if you do not want it visible.
- full inverter or battery serial number unless you are comfortable sharing it.

## Local Development

```bash
npm install
npm run setup
npm run dev
```

Open:

```text
http://localhost:3000
```

Before submitting a change:

```bash
npm run verify
```

This checks, builds, and tests once. See [the workflow](docs/workflow.md) for focused checks and the owner's NAS release procedure.

## Project Goals

- Keep credentials server-side only.
- Keep setup beginner-friendly.
- Prefer simple, maintainable code over complex frameworks.
- Make LAN use easy before asking users to deploy to NAS or the Internet.
- Avoid unnecessary FoxCloud API calls by using local cache where possible.
