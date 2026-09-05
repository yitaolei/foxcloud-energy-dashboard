# Agent guidance and workflow audit — 2026-09-05

## Scope

Reviewed repository guidance, package commands, contribution/release documentation, deployment helper, existing tests, and the directly associated personal release skill. Starting commit: `d0abcf0`; the initial working tree was clean on `codex/foxcloud-dashboard-redesign-v2`.

No repository-local skill or CI existed. The personal skill at `~/.codex/skills/foxcloud-dashboard-release-loop/SKILL.md` duplicated repository instructions. Other installed plugins and global model configuration were not edited.

## Changes and rationale

| Finding | Resolution |
| --- | --- |
| `AGENTS.md`, release skill, README, and maintenance guide repeated verification/release rules | Kept a short repository entrypoint and one canonical `docs/workflow.md`; personal release skill now routes to it. |
| Recommended `check → build → test` rebuilt twice because `test` already compiled | Added `verify` for one check/build/test sequence and `test:unit` for an already-current build. Updated English/Chinese and contributor instructions. |
| Repeated tool/plugin catalogs loaded generic guidance | Removed catalogs; retained only the NAS versus public-hosting distinction where it affects release decisions. |
| Historical maintenance text appeared to require before/after full checks and an audit on every task | Marked the May record as historical; current checks depend on the changed surface. Historical incident/completion evidence remains intact. |
| Important domain preferences depended on prior conversation context | Added the narrowly triggered `foxcloud-maintenance` skill, including approved labels, seasonal forecast behavior, and provider/cache invariants. |
| No CI for the established local checks | Added a Node 22 workflow using locked dependencies, read-only permissions, pinned action revisions, cancellation of superseded runs, and a bounded job duration. No NAS credentials or deployment actions. |

Preserved the owner's requirements: NAS acceptance for UI/backend changes, GitHub synchronization by default, Synology/Mac separation, secret and installation-data protection, `太阳能自用` and `家庭总用电`, and seasonal Sydney forecast calibration. Instruction-only maintenance is not a reason to restart an otherwise unchanged dashboard.

The build/typecheck implementation, deployment shell script, dependencies, lockfile, backend, and frontend were not changed. The personal skill edit is local to this Mac; the canonical workflow and repository skill are tracked in Git.

## Official source alignment

Verified live on 2026-09-05:

- [GPT-6 Astra model guidance](https://developers.openai.com/api/docs/guides/latest-model): remove conflicting guidance, calibrate autonomy and verification, and avoid unnecessary pauses. Applied proportionately, without changing runtime permissions or forcing maximum reasoning or delegation on every task.
- [AGENTS.md discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md): one concise root entrypoint; no unnecessary overrides.
- [Build skills](https://learn.chatgpt.com/docs/build-skills): discoverable `.agents/skills/<name>/SKILL.md`, required metadata, precise triggers, and details loaded only when relevant.

No OpenAI API integration or model setting exists in this app. This audit tunes instructions; it does not switch the active model. No measured Astra speed, cost, or quality improvement is claimed.

## Verification

- `npm run verify`: passed; one TypeScript build, frontend syntax/type checks, and 78 tests.
- Both new/revised skills: official Skill Creator validator passed.
- Local Markdown links, CI structure/command references, and `git diff --check`: passed.
- NAS `/api/livez`: returned `ok: true`. This is a liveness observation, not a new deployed-version claim. Runtime/assets were unchanged, so no NAS sync or restart was performed.
- Hosted Node 22 CI passed on commit `79f707f`: [GitHub Actions run](https://github.com/yitaolei/foxcloud-energy-dashboard/actions/runs/33954930935).

The initial command-line push lacked `workflow` scope. On 2026-09-05, the owner's existing Safari GitHub session successfully committed the exact CI file. The local branch was reconciled with that remote commit; no credential scopes were expanded.

## Behavior review

Reviewed these intended routes against the written guidance, without launching independent model evaluations:

- Instruction typo: targeted file/link checks and GitHub sync; no NAS restart.
- UI metric rename: domain skill, consistent semantics, relevant checks, NAS page/console acceptance, then GitHub sync.
- Missing NAS share: diagnose or use documented SSH alternative; never create a misleading local mount.
- Modbus timeout: inspect the current non-secret endpoint/configuration; do not rewrite calculations or issue inverter writes.
- Forecast adjustment: retain seasonal variation instead of an annual cap inferred from winter.

To measure future efficiency, hold model, reasoning effort, tools, checkout, and representative requests constant; compare correctness, tokens, elapsed time, unnecessary questions, and repeated checks. Use an isolated checkout with external mutations stubbed.
