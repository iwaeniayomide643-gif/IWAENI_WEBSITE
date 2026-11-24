import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/motion";

const words: { w: string; accent?: boolean }[] = [
  { w: "Readers" },
  { w: "decide" },
  { w: "in" },
  { w: "seconds." },
  { w: "A" },
  { w: "good" },
  { w: "trailer" },
  { w: "lets" },
  { w: "them" },
  { w: "feel", accent: true },
  { w: "your", accent: true },
  { w: "story", accent: true },
  { w: "before" },
  { w: "they" },
  { w: "read" },
  { w: "a" },
  { w: "single" },
  { w: "page." },
];

/**
 * Dealt moment 2 (type): the sentence lights up word by word as you scroll.
 * Without JavaScript, or with reduced motion, every word simply stays lit.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-w]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: root.current,
              start: "top 72%",
              end: "bottom 62%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Why a trailer"
      className="relative z-10 px-4 py-24 sm:px-6 sm:py-32 lg:py-40"
    >
      <p className="mx-auto max-w-5xl font-display text-[clamp(2.1rem,5.6vw,5rem)] leading-[1.08] tracking-[-0.01em]">
        {words.map(({ w, accent }, i) => (
          <span key={`${w}-${i}`} data-w className={accent ? "italic text-gold" : undefined}>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
