# GitHub Copilot Instructions (`demo-story`)

Follow [AGENTS.md](../AGENTS.md) for all tasks in this repository.

## Copilot Workflow Rules
- **Simple Stack:** Next.js App Router + React + Tailwind CSS + Vitest. Do not introduce databases or complex state libraries.
- **Episode Files:** Place episodes in `episodes/epXX-<slug>.md` with required YAML frontmatter (`episodeNumber`, `title`, `releaseDate`, `summary`). See `.agents/skills/episode-writer/SKILL.md`.
- **Shared Lore:** When adding or editing an episode, also update `CHARACTERS.md`, `TIMELINE.md`, and `README.md`.
- **Commit Attribution:** Prefix commits with `[copilot] <type>(<scope>): <message>`.
- **Verification:** Always run `npm run lint`, `npm test`, and `npm run build` before finalizing a PR.
