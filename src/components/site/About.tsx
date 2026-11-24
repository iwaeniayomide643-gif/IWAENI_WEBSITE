import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";

interface AboutProps {
  onOrder: () => void;
  onProcess: () => void;
}

/** A different composition from the hero: an arched portrait and one belief. */
export function About({ onOrder, onProcess }: AboutProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-gold">
            About
          </p>
          <h2
            id="about-title"
            className="font-display text-[clamp(2.9rem,6.6vw,5.6rem)] leading-[0.98] tracking-[-0.015em]"
          >
            Every book has a story{" "}
            <span className="text-gold-gradient italic">worth discovering.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8">
            That belief is behind everything I do, from a short cinematic trailer to a full author
            website. My goal is to help more readers discover the books, and the authors, behind
            them.
          </p>
          <p className="mt-5 font-display text-2xl text-foreground/90 sm:text-3xl">
            &mdash; {brand.name}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <Button size="lg" onClick={onOrder} data-cta className="w-full sm:w-auto">
              Order a book trailer <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <Button size="lg" variant="glass" onClick={onProcess} className="w-full sm:w-auto">
              See how I work
            </Button>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10"
            style={{
              background: "radial-gradient(closest-side, rgba(217,139,131,0.20), transparent)",
            }}
          />
          <div className="rounded-t-[999px] rounded-b-[2rem] bg-gradient-to-b from-gold/55 via-white/10 to-rose/40 p-px shadow-[0_40px_100px_rgba(5,2,6,0.65)]">
            <div className="glass-panel rounded-t-[999px] rounded-b-[calc(2rem-1px)] p-3 sm:p-4">
              <div className="group relative overflow-hidden rounded-t-[999px] rounded-b-[1.4rem]">
                <img
                  src={brand.portrait}
                  alt={`${brand.name}, smiling`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="zoom-photo aspect-[4/5] w-full object-cover object-top"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
