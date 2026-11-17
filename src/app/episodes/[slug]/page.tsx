import Link from "next/link";
import { notFound } from "next/navigation";
import { getEpisodeBySlug } from "@/lib/episodes";

export const dynamic = "force-dynamic";

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const paddedNumber = String(episode.episodeNumber).padStart(2, "0");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-amber-400 hover:text-amber-300"
      >
        ← Back to all episodes
      </Link>

      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Episode {paddedNumber}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              {episode.title}
            </h1>
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            Release Date: {episode.releaseDate}
          </span>
        </div>

        {!episode.isReleased ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold text-slate-200">
              🔒 This episode unlocks on {episode.releaseDate}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Check back on the release date to read the full story.
            </p>
          </div>
        ) : (
          <div
            className="episode-prose mt-6"
            dangerouslySetInnerHTML={{ __html: episode.html }}
          />
        )}
      </article>
    </div>
  );
}
