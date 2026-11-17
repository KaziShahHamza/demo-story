---
name: Episode Task
about: Create a tracked task for drafting and reviewing one Harry Potter Series 1 episode
title: "[Ep XX] <Episode Title>"
labels: ["episode"]
---

## Episode Details
- **Episode Number:**
- **Target Release Date (`YYYY-MM-DD`):**
- **Assigned Agent / Contributor:** (Antigravity / Claude Code / Codex / Copilot)
- **Branch Name:** `feat/epXX-<slug>`

## Acceptance Criteria
- [ ] Markdown file created in `episodes/epXX-<slug>.md` with valid YAML frontmatter
- [ ] `CHARACTERS.md` and `TIMELINE.md` updated
- [ ] `npm run lint`, `npm test`, and `npm run build` pass
- [ ] Reviewed by a code/lore review agent before merge
