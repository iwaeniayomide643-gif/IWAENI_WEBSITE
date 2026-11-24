import { ArrowDownRight, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trailers, type Trailer } from "@/data/trailers";
import { Poster } from "./Poster";

interface FeaturedTrailerProps {
  onPlay: (index: number) => void;
  onSeeMore: () => void;
  onOrder: () => void;
}

/** Second screen: the main offer, with the featured trailer as the headline picture. */
export function FeaturedTrailer({ onPlay, onSeeMore, onOrder }: FeaturedTrailerProps) {
  const featured = trailers[0];
  const ghosts = [trailers[3], trailers[7]].filter((t): t is Trailer => Boolean(t));
  if (!featured) return null;

  return (
    <section
      id="trailers"
      aria-labelledby="featured-title"
      className="relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:flex lg:min-h-[88svh] lg:items-center"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Book trailers
          </p>
          <h2
            id="featured-title"
            className="font-display text-[clamp(2.9rem,6.6vw,5.6rem)] leading-[0.96] tracking-[-0.015em]"
          >
            Book trailers that make readers{" "}
            <span className="text-gold-gradient italic">press play.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8">
            I turn your book into a short, cinematic trailer that readers watch, share and remember.
            Then I help you promote it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Button size="lg" onClick={onOrder} data-cta className="w-full sm:w-auto">
              Order a book trailer <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <Button size="lg" variant="glass" onClick={onSeeMore} className="w-full sm:w-auto">
              See more trailers <ArrowDownRight size={18} aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:mt-10 sm:text-xs">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
              {trailers.length} sample trailers
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
              Trailers · websites · launch promotion
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          {ghosts.map((ghost, i) => (
            <div
              key={ghost.id}
              aria-hidden="true"
              className={
                i === 0
                  ? "absolute -right-4 -top-9 hidden aspect-video w-[70%] overflow-hidden rounded-2xl border border-glass-border opacity-70 lg:block xl:-right-8"
                  : "absolute -bottom-9 -left-4 hidden aspect-video w-[62%] overflow-hidden rounded-2xl border border-glass-border opacity-70 lg:block xl:-left-8"
              }
            >
              <Poster trailer={ghost} width={640} />
              <div className="absolute inset-0 bg-ink/45" />
            </div>
          ))}

          <button
            type="button"
            onClick={() => onPlay(0)}
            aria-label="Play the featured trailer"
            className="group relative z-10 block aspect-video w-full overflow-hidden rounded-[1.6rem] border border-glass-border bg-black text-left shadow-[0_40px_120px_rgba(8,3,8,0.75)] transition-[transform,border-color] duration-500 hover:-translate-y-0.5 hover:border-glass-highlight"
          >
            <Poster trailer={featured} width={1280} className="zoom-photo" />
            <span
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30"
              aria-hidden="true"
            />

            {/* letterbox bars */}
            <span className="absolute inset-x-0 top-0 flex h-9 items-center justify-between bg-black/85 px-4 sm:h-11 sm:px-5">
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold sm:text-[11px]">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" /> Featured
                trailer
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/60 sm:text-[11px]">
                01 / {String(trailers.length).padStart(2, "0")}
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-center bg-black/85 sm:h-11">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70 sm:text-[11px]">
                Press play
              </span>
            </span>

            <span className="absolute inset-0 grid place-items-center">
              <span className="relative grid size-20 place-items-center rounded-full bg-foreground text-ink shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:scale-110 sm:size-24">
                <span
                  className="absolute inset-0 rounded-full border border-foreground/60 opacity-0 group-hover:animate-[ping-ring_1.6s_ease-out_infinite]"
                  aria-hidden="true"
                />
                <Play className="ml-1 size-8 fill-current sm:size-9" aria-hidden="true" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
