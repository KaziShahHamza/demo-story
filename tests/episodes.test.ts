import { describe, expect, it } from "vitest";
import { isEpisodeReleased, parseEpisodeMarkdown } from "@/lib/episodes";

describe("isEpisodeReleased", () => {
  it("returns true when releaseDate is before or equal to today", () => {
    expect(isEpisodeReleased("2026-11-16", "2026-11-17")).toBe(true);
    expect(isEpisodeReleased("2026-11-17", "2026-11-17")).toBe(true);
  });

  it("returns false when releaseDate is in the future", () => {
    expect(isEpisodeReleased("2026-11-18", "2026-11-17")).toBe(false);
  });
});

describe("parseEpisodeMarkdown", () => {
  const sampleMarkdown = `---
episodeNumber: 1
title: "The Boy Who Lived"
releaseDate: "2026-11-17"
summary: "A mysterious night on Privet Drive."
---

# Chapter One

Mr. and Mrs. Dursley, of number four, Privet Drive...
`;

  it("parses valid frontmatter and markdown body", () => {
    const episode = parseEpisodeMarkdown(
      "ep01-the-boy-who-lived",
      sampleMarkdown,
      "2026-11-17"
    );

    expect(episode.episodeNumber).toBe(1);
    expect(episode.title).toBe("The Boy Who Lived");
    expect(episode.releaseDate).toBe("2026-11-17");
    expect(episode.isReleased).toBe(true);
    expect(episode.html).toContain("<h1>Chapter One</h1>");
  });

  it("throws when releaseDate format is invalid", () => {
    const badMarkdown = `---
episodeNumber: 1
title: "Bad Date"
releaseDate: "17-11-2026"
summary: "Oops"
---
Body
`;
    expect(() => parseEpisodeMarkdown("ep01", badMarkdown)).toThrow(
      /Invalid releaseDate/
    );
  });
});
