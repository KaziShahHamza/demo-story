import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface EpisodeMeta {
  slug: string;
  episodeNumber: number;
  title: string;
  releaseDate: string;
  summary: string;
  isReleased: boolean;
}

export interface Episode extends EpisodeMeta {
  content: string;
  html: string;
}

const DEFAULT_EPISODES_DIR = path.join(process.cwd(), "episodes");

/**
 * Return today's date as YYYY-MM-DD in local time.
 */
export function getTodayDateString(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Determine whether an episode with an ISO YYYY-MM-DD releaseDate is released.
 */
export function isEpisodeReleased(
  releaseDate: string,
  today: string = getTodayDateString()
): boolean {
  return releaseDate <= today;
}

/**
 * Parse a single markdown episode file into an Episode object.
 */
export function parseEpisodeMarkdown(
  slug: string,
  rawMarkdown: string,
  today: string = getTodayDateString()
): Episode {
  const { data, content } = matter(rawMarkdown);

  const episodeNumber = Number(data.episodeNumber);
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const releaseDate =
    typeof data.releaseDate === "string" ? data.releaseDate.trim() : "";
  const summary = typeof data.summary === "string" ? data.summary.trim() : "";

  if (!Number.isInteger(episodeNumber) || episodeNumber < 1) {
    throw new Error(`Invalid episodeNumber in ${slug}`);
  }
  if (!title) {
    throw new Error(`Missing title in ${slug}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
    throw new Error(`Invalid releaseDate (expected YYYY-MM-DD) in ${slug}`);
  }

  return {
    slug,
    episodeNumber,
    title,
    releaseDate,
    summary,
    isReleased: isEpisodeReleased(releaseDate, today),
    content: content.trim(),
    html: marked.parse(content.trim(), { async: false }) as string,
  };
}

/**
 * Load all episodes from disk, sorted by episodeNumber ascending.
 */
export function getAllEpisodes(
  episodesDir: string = DEFAULT_EPISODES_DIR,
  today: string = getTodayDateString()
): Episode[] {
  if (!fs.existsSync(episodesDir)) {
    return [];
  }

  const files = fs
    .readdirSync(episodesDir)
    .filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(episodesDir, file), "utf8");
      return parseEpisodeMarkdown(slug, raw, today);
    })
    .sort((a, b) => a.episodeNumber - b.episodeNumber);
}

/**
 * Load a single episode by its slug, or null if not found.
 */
export function getEpisodeBySlug(
  slug: string,
  episodesDir: string = DEFAULT_EPISODES_DIR,
  today: string = getTodayDateString()
): Episode | null {
  const filePath = path.join(episodesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  return parseEpisodeMarkdown(slug, raw, today);
}
