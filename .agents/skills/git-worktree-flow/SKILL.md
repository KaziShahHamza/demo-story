---
name: git-worktree-flow
description: Standardizes multi-agent git worktree creation, [agent-name] commit attribution, Co-authored-by trailers, and merge-conflict resolution.
---

# Git Worktree Flow Skill

Use this skill when working in parallel across multiple agents or resolving merge conflicts.

## 1. Create an Isolated Worktree
```bash
git worktree add ../demo-story-ep01 -b feat/ep01-boy-who-lived
```

## 2. Commit Attribution
Prefix every commit with the agent or contributor tag:
- `[antigravity] feat(ep01): ...`
- `[claude-code] feat(ep02): ...`
- `[codex] test(parser): ...`
- `[copilot] fix(ui): ...`

Add a `Co-authored-by` trailer when collaborating across agents.

## 3. Resolve Merge Conflicts
```bash
git fetch origin
git merge origin/main
# Resolve conflicts in CHARACTERS.md, TIMELINE.md, README.md keeping both episodes' updates
npm run lint && npm test && npm run build
git add .
git commit -m "[agent] merge: resolve conflicts with main"
git push
```

## 4. Clean Up After Merge
```bash
git worktree remove ../demo-story-ep01
git branch -d feat/ep01-boy-who-lived
```
