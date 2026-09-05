# FoxCloud repository guidance

Express/TypeScript backend; plain HTML/CSS/JavaScript and Chart.js frontend. Preserve the existing architecture and capabilities unless the request changes them.

## Project map

- `src/`: providers, calculations, storage, and API; `public/`: dashboard UI.
- `test/*.test.mjs`: tests; `scripts/deploy-nas.sh`: NAS sync/rebuild helper.
- [Workflow](docs/workflow.md): commands and release procedure. Load `.agents/skills/foxcloud-maintenance/SKILL.md` for domain-specific dashboard changes.

## Working agreement

Use npm and the lockfile. Complete authorized work with routine decisions made from context; ask when missing information materially changes correctness, scope, or authorization. Preserve unrelated edits.

Keep credentials server-side and out of logs. Inspect only relevant non-secret configuration. Protect environment files, `data/`, and `backups/`; diagnose ownership and references before destructive Docker/storage operations.

## Verification and release

`npm run verify` checks, builds, and tests once. Use the workflow's narrower checks for focused or guidance-only changes; avoid repeating successful checks without new evidence.

UI/backend changes require NAS sync, rebuild, and live acceptance at `http://192.168.0.19:3080` unless the user opts out. Synology commands run through SSH to `DS923SOPAC.local`, not the Mac shell. Instruction-only maintenance does not require a dashboard restart.

After applicable verification, commit and push corresponding changes unless the user opts out. Report local, NAS, and GitHub status separately, with genuine blockers, concisely in the user's language.
