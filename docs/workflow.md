# FoxCloud validation and release

## Local work

Use npm with the committed lockfile. Node 22 matches the Docker runtime and CI; `package.json` retains the existing supported-engine declaration. In a fresh checkout, install with `npm ci`; avoid reinstalling an unchanged working environment.

| Command | Purpose |
| --- | --- |
| `npm run check` | TypeScript checks and frontend JavaScript syntax. |
| `npm run build` | Compile TypeScript to `dist/`. |
| `npm run test:unit` | Run existing tests against an already-current build. |
| `npm test` | Build once, then run the tests. |
| `npm run verify` | Run checks, then build and test once. |
| `npm run deploy:nas` | Sync via the existing mounted share, rebuild remotely, and check liveness. |

For a code change, use `npm run verify`; do not separately build immediately before or after `npm test`. For a focused investigation with a matching build, run the relevant `node --test test/<file>.test.mjs`. Broaden verification when a change, failure, or unresolved concern justifies it. Test observable behavior rather than source wording.

For instructions or documentation, inspect scope, references, and the diff. For script or CI edits, execute the affected local checks; a remote deployment is not needed when runtime behavior and assets are unchanged. Run dependency audits for dependency work or a requested security audit, not automatically before and after every maintenance task.

CI runs `npm ci` and `npm run verify` on Node 22. It uses no NAS credentials and does not deploy or rebuild household history. Tests are local checks; they do not establish live inverter connectivity or NAS acceptance.

## Owner's NAS release

This section describes the established installation; contributors should use their own target rather than copying these addresses.

- Dashboard: `http://192.168.0.19:3080`.
- Host: `DS923SOPAC.local`.
- Mounted checkout: `/Volumes/Newhome/docker/foxcloud-dashboard`.
- NAS checkout: `/volume1/Newhome/docker/foxcloud-dashboard`.

For UI/backend changes, finish local verification and use `npm run deploy:nas` unless the user requested local-only work. It handles sync, SSH rebuild, and `/api/livez`; do not repeat a successful rebuild without a reason. A successful liveness response alone does not prove the requested change is deployed.

If the share is missing, inspect availability and use the established SSH alternative rather than creating a same-named local directory:

```sh
rsync -a \
  --exclude '.git/' --exclude '.DS_Store' \
  --exclude '.env' --exclude '.env.*' --exclude 'backups/' \
  --exclude 'codex_matches.txt' --exclude 'data/' \
  --exclude 'dist/' --exclude 'node_modules/' \
  ./ DS923SOPAC.local:/volume1/Newhome/docker/foxcloud-dashboard/

ssh -o BatchMode=yes DS923SOPAC.local \
  'cd /volume1/Newhome/docker/foxcloud-dashboard && sudo -n /usr/local/bin/rebuild-foxcloud-dashboard'
```

Run that from the repository root on the Mac. Synology `/volume1`, Docker, and sudo commands belong inside SSH. Do not change sudoers, permissions, or credentials to bypass a failed rebuild. If the existing wrapper cannot run, report whether files synced and whether the container rebuilt. Consult [passwordless rebuild setup](synology-passwordless-rebuild.md) only when setup or repair is requested.

After release, check `/api/livez` and authenticate to the relevant API using existing credentials without printing them. Confirm the deployed build/revision and the changed behavior. For frontend changes, verify the actual NAS page and browser console. Diagnose Modbus/provider failures separately from UI regressions; the inverter endpoint can change. See [troubleshooting](troubleshooting.md) for the observed failure.

Sites/public hosting is not this installation's release path unless the user requests a hosting change.

## GitHub completion

After the applicable checks and NAS acceptance, inspect the diff, commit the corresponding code/documentation changes, and push the current intended branch unless the user opts out. For instruction/CI-only maintenance, local verification precedes GitHub synchronization; no dashboard restart is required. Preserve unrelated edits, and do not infer permission to merge or force-push.

Report local checks, NAS state, and GitHub state separately. If access or a remote failure blocks a step, state the exact unfinished step instead of calling it complete.

## Maintaining guidance

Keep shared facts in `AGENTS.md`, domain-specific guidance in `.agents/skills/foxcloud-maintenance/SKILL.md`, and the release procedure here. The personal `foxcloud-dashboard-release-loop` skill routes to this procedure rather than maintaining another copy.

Validate skill frontmatter, linked files, command references, and realistic trigger boundaries after edits. Use current official [Astra guidance](https://developers.openai.com/api/docs/guides/latest-model), [AGENTS.md guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md), and [skill guidance](https://learn.chatgpt.com/docs/build-skills) when revisiting the instruction design. Instructions alone do not change the selected model or reasoning effort.
