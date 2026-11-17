---
name: episode-writer
description: Drafts a Harry Potter Series 1 episode in episodes/epXX-<slug>.md with valid YAML frontmatter, consistent pacing, and a cliffhanger.
---

# Episode Writer Skill

Use this skill whenever creating or editing a story episode in `episodes/`.

## 1. File Naming & Location
- Path: `episodes/epXX-<slug>.md` (e.g., `episodes/ep01-the-boy-who-lived.md`).
- Zero-pad `XX` to two digits (`01`–`10`).

## 2. Required YAML Frontmatter
```yaml
---
episodeNumber: 1
title: "The Boy Who Lived"
releaseDate: "2026-11-17"
summary: "One concise sentence summarizing the episode."
---
```
- `episodeNumber`: integer `1`–`10`
- `title`: quoted string
- `releaseDate`: quoted `YYYY-MM-DD` date string
- `summary`: quoted 1-sentence teaser (shown on Released cards)

## 3. Story Structure & Tone
- **Length:** ~400–700 words (concise, vivid, engaging).
- **Structure:**
  1. `# Episode XX: <Title>`
  2. Opening hook (2–3 paragraphs)
  3. Core scene(s) with dialogue
  4. Closing cliffhanger leading into the next episode
- **Canon:** Stay faithful to Harry Potter Series 1 (*The Philosopher's Stone*).
- **Verification:** Run `npm test` and `npm run build` after adding or editing an episode.
