import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EpisodeCard } from "@/components/EpisodeCard";

describe("EpisodeCard", () => {
  it("renders a clickable link when episode is released", () => {
    render(
      <EpisodeCard
        episode={{
          slug: "ep01-the-boy-who-lived",
          episodeNumber: 1,
          title: "The Boy Who Lived",
          releaseDate: "2026-11-17",
          summary: "A mysterious night on Privet Drive.",
          isReleased: true,
        }}
      />
    );

    expect(screen.getByText("The Boy Who Lived")).toBeInTheDocument();
    expect(screen.getByText(/Released · 2026-11-17/)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/episodes/ep01-the-boy-who-lived"
    );
  });

  it("renders a locked Coming Soon card when episode is not released", () => {
    render(
      <EpisodeCard
        episode={{
          slug: "ep02-letters-from-no-one",
          episodeNumber: 2,
          title: "Letters from No One",
          releaseDate: "2026-11-18",
          summary: "Hogwarts letters arrive.",
          isReleased: false,
        }}
      />
    );

    expect(screen.getByText("Letters from No One")).toBeInTheDocument();
    expect(screen.getByText(/Coming Soon · 2026-11-18/)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
