# CLAUDE.md — Claude Code Instructions

Read [AGENTS.md](./AGENTS.md) and [plan/roadmap.md](./plan/roadmap.md) before making any changes.

## Key Rules for Claude Code
1. Always work in an isolated `git worktree` and feature branch (`feat/epXX-...` or `fix/...`). Never commit directly to `main`.
2. Follow `.agents/skills/episode-writer/SKILL.md` and `.agents/skills/lore-continuity/SKILL.md` when drafting episodes.
3. Prefix commits with `[claude-code] <type>(<scope>): <message>` and include:
   `Co-authored-by: Claude Code <claude@anthropic.com>`
4. Run `npm run lint`, `npm test`, and `npm run build` before pushing or opening a PR.
