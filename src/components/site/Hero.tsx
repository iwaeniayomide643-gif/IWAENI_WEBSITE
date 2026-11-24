import { Fragment, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";
import { trailers } from "@/data/trailers";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, MOTION_OK } from "@/lib/motion";
import { Particles } from "./Particles";
import { Poster } from "./Poster";

interface HeroProps {
  onPlay: (index: number) => void;
  onWatch: () => void;
  onOrder: () => void;
}

/** Splits a line into words, each in its own mask so it can rise into place. */
function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] pr-[0.12em] align-bottom">
            <span data-h-word className={`inline-block ${className ?? ""}`}>
              {word}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

export function Hero({ onPlay, onWatch, onOrder }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const floater = useRef<HTMLDivElement>(null);
  const [bioOpen, setBioOpen] = useState(false);
  const featured = trailers[0];

  const [first = "", ...rest] = brand.name.split(" ");
  const last = rest.join(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current;
        if (!el) return;

        // Take over from the CSS fail-safe so nothing flashes.
        el.querySelectorAll<HTMLElement>(
          "[data-h-fade],[data-h-photo],[data-h-chip],[data-h-word]",
        ).forEach((node) => {
          node.style.animation = "none";
        });
        el.querySelectorAll<HTMLElement>("[data-h-word]").forEach((node) => {
          node.style.transform = "none";
        });

        const wide = window.matchMedia("(min-width: 1024px)").matches;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl
          // the portrait slides in from the left while a mask wipes it open
          .fromTo(
            "[data-h-photo]",
            { opacity: 0, x: wide ? -170 : -60, scale: 0.96 },
            { opacity: 1, x: 0, scale: 1, duration: 1.8, clearProps: "transform" },
            0.05,
          )
          .fromTo(
            "[data-h-clip]",
            { clipPath: "inset(0% 100% 0% 0% round 1.4rem)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 1.4rem)",
              duration: 1.6,
              ease: "power4.inOut",
              clearProps: "clipPath",
            },
            0.12,
          )
          .fromTo(
            "[data-h-img]",
            { scale: 1.3, filter: "blur(12px)" },
            { scale: 1, filter: "blur(0px)", duration: 2.3, clearProps: "filter" },
            0.12,
          )
          .fromTo(
            "[data-h-sheen]",
            { xPercent: -140, opacity: 1 },
            { xPercent: 480, duration: 1.5, ease: "power2.inOut" },
            1.15,
          )
          .fromTo(
            "[data-h-chip]",
            { opacity: 0, y: 14, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.16 },
            1.2,
          )
          // the words
          .fromTo(
            "[data-h-fade='1']",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.9 },
            0.3,
          )
          .fromTo(
            "[data-h-word]",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.25, stagger: 0.13 },
            0.45,
          )
          .fromTo(
            "[data-h-fade='2']",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
            1.0,
          )
          // once settled, the portrait drifts very gently
          .add(() => floater.current?.classList.add("gentle-float"), 2.2);
      });
    },
    { scope: root },
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:flex lg:min-h-svh lg:items-center lg:pb-20 lg:pt-24"
    >
      <div aria-hidden="true" className="hero-spot" />
      <div aria-hidden="true" className="hero-beam" />
      <Particles className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24">
        {/* Portrait */}
        <div
          data-h-photo
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[28rem] xl:max-w-[31rem]"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 opacity-80"
            style={{
              background:
                "radial-gradient(closest-side, rgba(214,180,119,0.22), rgba(217,139,131,0.10) 55%, transparent)",
            }}
          />
          <div ref={floater}>
            {/* gradient rim, then the glass frame inside it */}
            <div className="rounded-[2rem] bg-gradient-to-br from-gold/55 via-white/10 to-rose/45 p-px shadow-[0_40px_120px_rgba(5,2,6,0.7)]">
              <div className="glass-panel rounded-[calc(2rem-1px)] p-3 sm:p-4">
                <div data-h-clip className="group relative overflow-hidden rounded-[1.4rem]">
                  <img
                    data-h-img
                    src={brand.portrait}
                    alt={`Portrait of ${brand.name}, book trailer and author services specialist`}
                    width={1024}
                    height={1024}
                    fetchPriority="high"
                    className="zoom-photo aspect-square w-full object-cover object-top sm:aspect-[4/5]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                  />
                  <span
                    data-h-sheen
                    aria-hidden="true"
                    className="absolute -left-1/3 inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0"
                  />
                </div>
              </div>
            </div>

            <span
              data-h-chip
              className="absolute left-4 top-4 rounded-full border border-glass-border bg-ink/55 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/90 backdrop-blur-xl sm:left-7 sm:top-7 sm:px-4 sm:py-2 sm:text-[11px]"
            >
              Books · Brands · Beyond
            </span>
            <span
              data-h-chip
              className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-glass-border bg-ink/60 px-4 py-3 backdrop-blur-xl sm:inset-x-8 sm:bottom-8"
            >
              <span className="h-px w-6 shrink-0 bg-gold" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold sm:text-[11px]">
                Creative partner for authors
              </span>
            </span>
          </div>
        </div>

        {/* Name, bio, actions */}
        <div>
          <p
            data-h-fade="1"
            className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-gold sm:mb-7 sm:text-xs"
          >
            <span className="h-px w-8 shrink-0 bg-gold sm:w-10" aria-hidden="true" />
            {brand.role}
          </p>

          <h1 className="font-display text-[clamp(4.4rem,12.6vw,11.5rem)] uppercase leading-[0.9] tracking-[-0.01em]">
            <span className="block">
              <Words text={first} />
            </span>
            {last && (
              <span className="block">
                <Words text={last} className="text-gold-gradient italic" />
              </span>
            )}
            <span className="sr-only">, book trailers and author services</span>
          </h1>

          <p
            data-h-fade="2"
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8"
          >
            I&rsquo;m {brand.name}, a book services specialist helping authors present, promote, and
            grow their books. My main service is book trailers: short, cinematic films that make
            readers want to read.
          </p>

          <div data-h-fade="2">
            <button
              type="button"
              onClick={() => setBioOpen((v) => !v)}
              aria-expanded={bioOpen}
              aria-controls="hero-bio"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-gold"
            >
              <span className="link-draw">{bioOpen ? "Read less" : "Read more about me"}</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={cn("transition-transform duration-300", bioOpen && "rotate-180")}
              />
            </button>

            <div
              id="hero-bio"
              aria-hidden={!bioOpen}
              className={cn(
                "grid max-w-xl transition-[grid-template-rows,opacity,filter,margin] duration-700 ease-[var(--ease-out-expo)]",
                bioOpen
                  ? "mt-2 grid-rows-[1fr] opacity-100 blur-0"
                  : "mt-0 grid-rows-[0fr] opacity-0 blur-sm",
              )}
            >
              <div className="overflow-hidden">
                <div className="glass-panel rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
                  I help authors transform their books into professionally presented, discoverable,
                  and marketable projects. Besides trailers, I offer book promotion, author
                  websites, author spotlights, editing, proofreading, formatting, SEO, and
                  marketing.
                </div>
              </div>
            </div>
          </div>

          <div
            data-h-fade="2"
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
          >
            <Button size="lg" onClick={onOrder} data-cta className="w-full sm:w-auto">
              Order a book trailer <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <Button size="lg" variant="glass" onClick={onWatch} className="w-full sm:w-auto">
              <Play size={16} className="fill-current" aria-hidden="true" /> Watch sample trailers
            </Button>
          </div>

          {featured && (
            <button
              type="button"
              data-h-fade="2"
              onClick={() => onPlay(0)}
              aria-label="Play the featured trailer"
              className="group lift mt-8 flex w-full max-w-md items-center gap-4 rounded-2xl border border-glass-border bg-glass p-2.5 pr-5 text-left sm:mt-10"
            >
              <span className="relative block aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-black sm:w-32">
                <Poster trailer={featured} width={400} eager className="zoom-photo" />
                <span className="absolute inset-0 grid place-items-center bg-ink/30">
                  <span className="grid size-9 place-items-center rounded-full bg-foreground/95 text-ink">
                    <Play size={14} className="ml-0.5 fill-current" aria-hidden="true" />
                  </span>
                </span>
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Featured trailer
                </span>
                <span className="mt-1 block text-sm text-foreground/90">
                  Press play &middot; {trailers.length} sample trailers
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
