import { useCallback, useRef, useState, type FocusEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trailers } from "@/data/trailers";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion";
import { Poster } from "./Poster";
import { PreviewVideo } from "./PreviewVideo";

interface TrailerReelProps {
  onPlay: (index: number) => void;
  onOrder: () => void;
}

// The hero already shows trailer 01, so the reel carries the next eight.
const FIRST = 1;
const COUNT = 8;
const reel = trailers
  .slice(FIRST, FIRST + COUNT)
  .map((trailer, i) => ({ trailer, index: FIRST + i }));

const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/**
 * Dealt moment: a film strip. On desktop the section pins and the strip slides
 * sideways as you scroll. On phones, tablets and reduced motion it is a normal
 * swipeable strip with arrow buttons.
 */
export function TrailerReel({ onPlay, onOrder }: TrailerReelProps) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [pinned, setPinned] = useState(false);

  const paint = useCallback((progress: number) => {
    const p = Math.min(1, Math.max(0, progress));
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    if (counter.current) {
      const n = Math.min(reel.length, Math.floor(p * reel.length) + 1);
      counter.current.textContent = String(n).padStart(2, "0");
    }
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PIN_QUERY, () => {
        const sec = section.current;
        const vp = viewport.current;
        const tr = track.current;
        if (!sec || !vp || !tr) return;

        vp.style.overflowX = "hidden";
        vp.style.scrollSnapType = "none";
        vp.scrollLeft = 0;
        setPinned(true);

        const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
        const tween = gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => paint(self.progress),
          },
        });
        trigger.current = tween.scrollTrigger ?? null;

        return () => {
          vp.style.overflowX = "";
          vp.style.scrollSnapType = "";
          trigger.current = null;
          setPinned(false);
          paint(0);
        };
      });

      // Fonts and images change heights, so measure again once they land.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    },
    { scope: section },
  );

  const nudge = (direction: 1 | -1) => {
    const vp = viewport.current;
    if (!vp) return;
    const card = vp.querySelector<HTMLElement>("li");
    const step = (card?.offsetWidth ?? 320) + 20;
    vp.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const onScroll = () => {
    const vp = viewport.current;
    if (!vp || trigger.current) return;
    const max = vp.scrollWidth - vp.clientWidth;
    paint(max > 0 ? vp.scrollLeft / max : 0);
  };

  // While the strip is pinned, Tab must move the page, not the hidden overflow.
  const onCardFocus = (event: FocusEvent<HTMLElement>) => {
    const vp = viewport.current;
    const tr = track.current;
    const st = trigger.current;
    if (!vp || !tr || !st) return;
    vp.scrollLeft = 0;
    // Only follow keyboard focus; a mouse click or a focus returned from the player must not move the page.
    if (!event.currentTarget.matches(":focus-visible")) return;
    const card = event.currentTarget.closest("li");
    if (!card) return;
    const distance = Math.max(1, tr.scrollWidth - vp.clientWidth);
    const lead = parseFloat(getComputedStyle(tr).paddingLeft) || 0;
    const target = Math.min(distance, Math.max(0, card.offsetLeft - lead));
    window.scrollTo({
      top: st.start + (target / distance) * (st.end - st.start),
      behavior: "auto",
    });
  };

  return (
    <section
      id="reel"
      ref={section}
      aria-labelledby="reel-title"
      className="relative z-10 flex flex-col justify-center py-20 sm:py-24 lg:min-h-svh lg:py-0"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-gold">
              The reel
            </p>
            <h2
              id="reel-title"
              className="font-display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              Press play on a few of my trailers.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
              aria-hidden="true"
            >
              <span ref={counter} className="text-lg text-foreground">
                01
              </span>
              <span className="mx-1.5">/</span>
              {String(reel.length).padStart(2, "0")}
            </p>
            {pinned ? (
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Keep scrolling <ArrowRight size={14} aria-hidden="true" />
              </p>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="glass"
                  size="icon"
                  aria-label="Previous trailers"
                  onClick={() => nudge(-1)}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </Button>
                <Button
                  variant="glass"
                  size="icon"
                  aria-label="Next trailers"
                  onClick={() => nudge(1)}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 lg:mt-12">
        <div
          className="film-holes mx-auto mb-4 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)]"
          aria-hidden="true"
        />

        <div
          ref={viewport}
          onScroll={onScroll}
          className="scrollbar-none scroll-pl-4 snap-x snap-mandatory overflow-x-auto overscroll-x-contain sm:scroll-pl-6"
          role="region"
          aria-label="Trailer reel"
        >
          <ul
            ref={track}
            className="flex w-max gap-5 px-4 sm:px-6 lg:gap-6 lg:pl-[max(1.5rem,calc((100%-80rem)/2+1.5rem))] lg:pr-[max(1.5rem,calc((100%-80rem)/2+1.5rem))]"
          >
            {reel.map(({ trailer, index }) => (
              <li
                key={trailer.id}
                className="w-[78vw] max-w-[26rem] shrink-0 snap-start sm:w-[22rem] lg:w-[26rem] xl:w-[28rem]"
              >
                <button
                  type="button"
                  onClick={() => onPlay(index)}
                  onFocus={onCardFocus}
                  aria-label={`Play trailer: ${trailer.title}`}
                  className="group lift block w-full text-left"
                >
                  <span className="relative block aspect-video overflow-hidden rounded-2xl border border-glass-border bg-black shadow-[0_24px_70px_rgba(8,3,8,0.6)] transition-colors duration-300 group-hover:border-glass-highlight">
                    <Poster trailer={trailer} width={900} className="zoom-photo" />
                    <PreviewVideo trailer={trailer} className="zoom-photo" hint />
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-black/65 px-2 py-1 font-mono text-[11px] tracking-[0.18em] text-foreground/85">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {trailer.duration && (
                      <span className="absolute bottom-3 right-3 rounded-md bg-black/65 px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-foreground/85">
                        {trailer.duration}
                      </span>
                    )}
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-16 place-items-center rounded-full bg-foreground/95 text-ink opacity-90 shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100">
                        <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                  <span className="mt-4 block font-display text-[1.7rem] leading-tight line-clamp-2">
                    {trailer.title}
                  </span>
                  <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-gold line-clamp-1">
                    {trailer.author ? `by ${trailer.author}` : trailer.genre}
                  </span>
                </button>
              </li>
            ))}

            {/* End card */}
            <li className="w-[78vw] max-w-[26rem] shrink-0 snap-start sm:w-[22rem] lg:w-[26rem] xl:w-[28rem]">
              <div className="glass-card flex h-full min-h-[18rem] flex-col justify-between rounded-2xl p-6 sm:p-8">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                    The end
                  </p>
                  <p className="mt-3 font-display text-4xl leading-[1.02] sm:text-5xl">
                    Your book, <span className="text-gold-gradient italic">next.</span>
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <Button onClick={onOrder} onFocus={onCardFocus} data-cta>
                    Order a book trailer <ArrowUpRight size={16} aria-hidden="true" />
                  </Button>
                  <Button variant="glass" onClick={() => onPlay(0)} onFocus={onCardFocus}>
                    Watch all {trailers.length} trailers
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div
          className="film-holes mx-auto mt-4 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)]"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:mt-8" aria-hidden="true">
        <span className="block h-px w-full overflow-hidden bg-border">
          <span ref={bar} className="block h-full origin-left scale-x-0 bg-gold" />
        </span>
      </div>
    </section>
  );
}
