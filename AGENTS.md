# AGENTS.md — Multi-Agent & Contributor Guide

This file provides shared instructions for all AI coding agents (**Antigravity**, **Claude Code**, **Codex**, **GitHub Copilot**) and human contributors working on **`demo-story`**.

---

## 1. Project Overview
`demo-story` is a **practice project** designed to master **GitHub workflows** and **multi-agent AI collaboration** while building a simple, clean **Next.js (App Router) + React + Tailwind CSS** website that releases a **10-episode Harry Potter (Series 1) story** on a daily schedule.

- **Primary Goal:** Practice branches, commits, PRs, code reviews, GitHub Issues, GitHub Actions CI, git worktrees, intentional merge conflicts, and Antigravity customizations (skills, subagents, plugins).
- **Keep Tech Simple:** Plain Next.js App Router + React + Tailwind CSS + Vitest. No database, no authentication, no complex state management.

---

## 2. Repository Layout
```text
demo-story/
├── AGENTS.md                  # Shared instructions for all AI agents
├── README.md                  # Project overview & episode index
├── plan/
│   └── roadmap.md             # Phased execution roadmap
├── CHARACTERS.md              # Shared character registry (intentional conflict target)
├── TIMELINE.md                # Shared chronological tracker (intentional conflict target)
├── episodes/                  # Markdown episodes (ep01-*.md ... ep10-*.md)
├── src/                       # Next.js App Router + Tailwind UI + episode parser
├── tests/                     # Vitest + React Testing Library tests
├── .agents/skills/            # Antigravity workspace skills
└── .github/
    ├── workflows/             # GitHub Actions (CI, PR review checks)
    └── ISSUE_TEMPLATE/        # Issue & PR templates
```

---

## 3. Episode Content Contract (`episodes/*.md`)
Every episode is a Markdown file in `episodes/` with required YAML frontmatter:

```yaml
---
episodeNumber: 1
title: "The Boy Who Lived"
releaseDate: "2026-11-17"
summary: "A mysterious night on Privet Drive changes the wizarding world forever."
---
```

### Date-Gating Rules
- `releaseDate <= today` → Rendered on the site with a **Released** badge (clickable to read).
- `releaseDate > today` → Rendered as a **Coming Soon (`releaseDate`)** locked card.

---

## 4. Multi-Agent Git & GitHub Workflow Rules

1. **One Task = One Issue = One Worktree = One Branch = One PR**
   - Never commit directly to `main`.
   - Use isolated worktrees for parallel agent work:
     ```bash
     git worktree add ../demo-story-ep01 -b feat/ep01-boy-who-lived
     ```
2. **Branch Naming**
   - `feat/epXX-<slug>` — new episode or app feature
   - `fix/<scope>` — bug fix or continuity fix
   - `chore/<scope>` — tooling, CI, skills, or docs
3. **Commit Attribution**
   - Prefix commit messages with the agent or contributor tag and conventional commit type:
     ```text
     [antigravity] feat(ep01): draft Episode 1 and update CHARACTERS.md
     [claude-code] feat(ep02): draft Episode 2 and update TIMELINE.md
     [codex] test(parser): add frontmatter validation tests
     [copilot] fix(ui): polish Coming Soon card spacing
     ```
   - Include a `Co-authored-by` trailer when appropriate:
     ```text
     Co-authored-by: Claude Code <claude@anthropic.com>
     ```
4. **Pull Requests & Code Review**
   - Every PR must link its issue (`Closes #1`) and pass GitHub Actions CI (`npm run lint`, `npm test`, `npm run build`).
   - Every PR must be reviewed by at least one **code/lore review agent** (or external contributor) before merging.
5. **Intentional Merge Conflicts (Practice Drill)**
   - Between waves, parallel branches intentionally edit shared sections of `CHARACTERS.md`, `TIMELINE.md`, and `README.md`.
   - Resolve conflicts locally via `git merge main` or `git rebase main`, re-run `npm test`, and push the resolution commit.

---

## 5. Verification Commands
Before opening or updating any PR, every agent must run:
```bash
npm run lint
npm test
npm run build
```
