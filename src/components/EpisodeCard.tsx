import Link from "next/link";
import type { EpisodeMeta } from "@/lib/episodes";

interface EpisodeCardProps {
  episode: EpisodeMeta;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const paddedNumber = String(episode.episodeNumber).padStart(2, "0");

  if (!episode.isReleased) {
    return (
      <article className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-5 opacity-75">
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Episode {paddedNumber}
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">
              Coming Soon · {episode.releaseDate}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-slate-300">
            {episode.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Unlocks on {episode.releaseDate}.
          </p>
        </div>
        <div className="mt-4 text-xs font-medium text-slate-500">
          🔒 Locked until release date
        </div>
      </article>
    );
  }

  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-amber-500/60 hover:bg-slate-900/80"
    >
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Episode {paddedNumber}
          </span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
            Released · {episode.releaseDate}
          </span>
        </div>
        <h2 className="text-lg font-semibold text-slate-100 group-hover:text-amber-300">
          {episode.title}
        </h2>
        <p className="mt-2 text-sm text-slate-400">{episode.summary}</p>
      </div>
      <div className="mt-4 text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
        Read episode →
      </div>
    </Link>
  );
}
