# Project Roadmap — `demo-story`

A phased roadmap for building the **10-episode Harry Potter Series 1** daily-release website while practicing **GitHub workflows** and **multi-agent AI engineering**.

---

## Project Plan Overview & Metrics

| Metric | Planned Count | Breakdown |
| :--- | :--- | :--- |
| **GitHub Issues** | **14** | `#1`–`#10` (Episodes 1–10), `#11` (`CHARACTERS.md`), `#12` (`TIMELINE.md`), `#13` (UI polish), `#14` (External contributor task) |
| **Branches** | **14** | `chore/setup-app`, `chore/agent-tooling`, `feat/ep01`–`feat/ep10` (10), `fix/ui-polish`, `contrib/ep01-typo` |
| **Pull Requests** | **14** | 1 PR per branch into `main` (each CI-checked & agent-reviewed) |
| **Commits** | **~35–45** | ~2–3 commits per PR (feature + review fixes + merge conflict resolutions) + initial docs commit |
| **Git Tags** | **5** | `v0.1.0-setup`, `v0.2.0-tooling`, `v0.3.0-wave1`, `v0.4.0-wave2`, `v1.0.0` |

### Tagging Schedule (Annotated Tags)
Create annotated tags on `main` after each milestone merge:
```bash
git tag -a v0.1.0-setup -m "Phase 1: Next.js app, tests, and GitHub Actions CI"
git push origin --tags
```

| Tag | Milestone | What It Marks |
| :--- | :--- | :--- |
| `v0.1.0-setup` | End of Phase 1 | Next.js + Tailwind app, Vitest suite, and CI workflows live on `main` |
| `v0.2.0-tooling` | End of Phase 2 | Skills, subagents, plugin packaging, and multi-agent docs ready |
| `v0.3.0-wave1` | End of Phase 4 | Episodes 01–03 merged, first merge conflicts resolved, contributor PR merged |
| `v0.4.0-wave2` | Mid Phase 5 | Episodes 04–06 merged and reviewed |
| `v1.0.0` | End of Phase 5 | All 10 episodes complete, full continuity pass, GitHub Release published |

---

## Phase 1: App Scaffold, Tests & GitHub Workflows (`chore/setup-app`)
**Goal:** Build the simple Next.js + Tailwind app, test suite, and CI pipeline on a feature branch and merge via PR.

- [ ] Initialize **Next.js (App Router) + TypeScript + Tailwind CSS**.
- [ ] Implement `src/lib/episodes.ts` to parse `episodes/*.md` YAML frontmatter (`episodeNumber`, `title`, `releaseDate`, `summary`) and compute `isReleased` from the current date.
- [ ] Build simple pages:
  - `/` — Series header + 10-episode grid showing **Released** cards and **Coming Soon (`releaseDate`)** locked cards.
  - `/episodes/[slug]` — Episode reader view (blocks future-dated episodes with a Coming Soon notice).
- [ ] Add **Vitest + React Testing Library** tests in `tests/` (frontmatter parsing, date-gating logic, home page rendering).
- [ ] Add **GitHub Actions** in `.github/workflows/`:
  - `ci.yml` — Runs `npm run lint`, `npm test`, and `npm run build` on every PR to `main`.
  - `pr-check.yml` — Validates episode frontmatter & PR checklist formatting.
- [ ] Add `.github/ISSUE_TEMPLATE/` and `.github/pull_request_template.md`, plus `CHARACTERS.md` and `TIMELINE.md`.
- [ ] Open PR #1 → verify CI passes → review → merge to `main` → tag **`v0.1.0-setup`**.

---

## Phase 2: Agentic Customizations — Skills, Subagents & Plugins (`chore/agent-tooling`)
**Goal:** Set up reusable AI workflows so multiple agents produce consistent stories and reviews.

- [ ] **Multiple Skills** (in `.agents/skills/`):
  - `episode-writer` — Enforces episode markdown frontmatter, scene pacing, cliffhanger, and canon tone.
  - `lore-continuity` — Rules for updating `CHARACTERS.md` and `TIMELINE.md` without breaking canon.
  - `git-worktree-flow` — Standard commands for branching, worktrees, `[agent-name]` commits, and conflict resolution.
- [ ] **Multiple Subagents**:
  - `episode-author` — Drafts an episode inside an assigned worktree.
  - `lore-reviewer` — Reviews episode PRs for Harry Potter Series 1 continuity and formatting.
  - `code-reviewer` — Reviews TypeScript/React/Tailwind changes and test coverage.
- [ ] **Plugins & Multi-Agent Configs**:
  - Add `CLAUDE.md` (Claude Code) and `.github/copilot-instructions.md` (Copilot) pointing to `AGENTS.md`.
  - Package the project's skills into a local Antigravity plugin (via `/plugin`) and use `github-mcp` for issue/PR automation.
- [ ] Open PR #2 → review → merge to `main` → tag **`v0.2.0-tooling`**.

---

## Phase 3: GitHub Issues & Multi-Agent Worktree Setup
**Goal:** Track all work in GitHub Issues and prepare parallel workspaces.

- [ ] Create GitHub Issues `#1`–`#10` (one per episode, with assigned `releaseDate`s).
- [ ] Create GitHub Issues `#11`–`#13` (shared `CHARACTERS.md`, `TIMELINE.md`, and UI polish tasks).
- [ ] Spin up parallel `git worktree`s for Wave 1:
  - `../demo-story-ep01` (`feat/ep01-boy-who-lived`) → **Antigravity**
  - `../demo-story-ep02` (`feat/ep02-hogwarts-letters`) → **Claude Code**
  - `../demo-story-ep03` (`feat/ep03-diagon-alley`) → **Codex / Copilot**

---

## Phase 4: Wave 1 (Ep 01–03) — PRs, Code Reviews, Contributor PR & Merge Conflicts
**Goal:** Experience real-world multi-agent collaboration, reviews, and conflict resolution.

- [ ] **Parallel Drafting:** Each agent writes its assigned episode, adds unit/content checks, and edits the shared sections of `CHARACTERS.md`, `TIMELINE.md`, and `README.md`.
- [ ] **External Contributor PR:** Simulate or accept a PR from a second contributor/fork (e.g., UI theme tweak or Episode 1 typo fix) and review it.
- [ ] **Code & Lore Review Agents:** Run `lore-reviewer` and `code-reviewer` on each PR; address feedback with follow-up commits.
- [ ] **Intentional Merge Conflicts:**
  1. Merge Ep 01 PR into `main` first.
  2. Ep 02 and Ep 03 PRs hit merge conflicts on `CHARACTERS.md`, `TIMELINE.md`, and `README.md`.
  3. Resolve conflicts in each worktree (`git merge main`), run `npm test`, push, and merge.
- [ ] Remove merged worktrees (`git worktree remove ...`).
- [ ] Tag **`v0.3.0-wave1`** on `main` after Ep 01–03 and contributor PRs are merged.

---

## Phase 5: Wave 2 (Ep 04–06) & Wave 3 (Ep 07–10) + `v1.0.0` Release
**Goal:** Complete all 10 episodes while watching the local Next.js site update live as PRs merge.

- [ ] **Wave 2 (Ep 04–06):** Repeat worktree → multi-agent commits → CI → review → conflict resolution → merge → tag **`v0.4.0-wave2`**.
- [ ] **Wave 3 (Ep 07–10):** Repeat through the finale (`ep10-through-the-trapdoor.md`).
- [ ] **Final Verification:**
  - All 10 episodes render cleanly at `http://localhost:3000` (with date-gating verified).
  - All GitHub Issues `#1`–`#13` closed via PRs.
  - `npm run lint`, `npm test`, and `npm run build` pass on `main`.
- [ ] **Release:** Tag `v1.0.0` and publish a GitHub Release on `KaziShahHamza02/demo-story`.
