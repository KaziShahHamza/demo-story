import { EpisodeCard } from "@/components/EpisodeCard";
import { getAllEpisodes } from "@/lib/episodes";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const episodes = getAllEpisodes();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          Daily Story Releases
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Harry Potter · Series 1
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          A 10-episode adaptation of Harry&apos;s first year at Hogwarts. New
          episodes unlock automatically on their scheduled release date as
          branches and PRs merge into <code className="text-amber-300">main</code>.
        </p>
      </section>

      {episodes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-200">
            No episodes published yet
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Add Markdown files to <code className="text-amber-300">episodes/</code>{" "}
            via episode branches and PRs to see them appear here.
          </p>
        </div>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.slug} episode={episode} />
          ))}
        </section>
      )}
    </div>
  );
}
