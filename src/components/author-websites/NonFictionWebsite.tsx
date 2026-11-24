import { useEffect, useState } from "react";
import { BookOpen, Orbit, Pause, Play, Telescope } from "lucide-react";
import {
  Book3D,
  Btn,
  ConceptFooter,
  Display,
  Eyebrow,
  Nav,
  Reader,
  Retailers,
  Section,
  Signup,
  Site,
  Wrap,
  jump,
  type Theme,
} from "./kit";

const ID = "science";
const COVER = "/images/covers/echoes-of-nova-prime.svg";
const AUTHOR = "Tariq Vance";
const TITLE = "Echoes of Nova Prime";

const theme: Theme = {
  bg: "#050714",
  bg2: "#0a0f2e",
  fg: "#eef0ff",
  muted: "#98a0cf",
  accent: "#818cf8",
  accent2: "#c084fc",
  card: "rgba(129,140,248,0.07)",
  border: "rgba(129,140,248,0.26)",
  on: "#0a0b24",
  display: "'Instrument Serif', Georgia, serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const mono = "[font-family:'JetBrains_Mono',ui-monospace,monospace]";

const excerpt = [
  "Every night the sky sends us letters in light, and almost all of them are very old.",
  "The light from the nearest star beyond our Sun left it more than four years ago. The light from the galaxy next door began its journey before there were any people like us to look up.",
  "This book is about learning to read those letters, and about the quiet thrill of realising that looking far away is also looking back in time.",
];

// Real values. Orbit sizes on screen are not to scale, but the relative orbital periods are.
const planets = [
  {
    name: "Mercury",
    r: 15,
    size: 9,
    color: "#b6a79a",
    au: "0.39",
    year: "88 days",
    period: 0.241,
    fact: "A year lasts only 88 Earth days, yet a single sunrise to sunrise takes about 176 Earth days.",
  },
  {
    name: "Venus",
    r: 23,
    size: 13,
    color: "#e8c98a",
    au: "0.72",
    year: "225 days",
    period: 0.615,
    fact: "It spins backwards compared with most planets, and a day there is longer than its year.",
  },
  {
    name: "Earth",
    r: 31,
    size: 14,
    color: "#5aa9ff",
    au: "1.00",
    year: "365 days",
    period: 1,
    fact: "The only place we know of with liquid water on its surface and life.",
  },
  {
    name: "Mars",
    r: 39,
    size: 11,
    color: "#e0714a",
    au: "1.52",
    year: "687 days",
    period: 1.881,
    fact: "Home to Olympus Mons, the largest known volcano in the Solar System.",
  },
  {
    name: "Jupiter",
    r: 48,
    size: 24,
    color: "#d9b48f",
    au: "5.20",
    year: "11.9 years",
    period: 11.86,
    fact: "More than 1,300 Earths could fit inside it.",
  },
] as const;

const distances = [
  { name: "The Moon", time: "1.3 seconds", note: "About 384,400 km away.", w: 4 },
  { name: "The Sun", time: "8 minutes 20 seconds", note: "About 150 million km away.", w: 22 },
  {
    name: "Jupiter",
    time: "about 43 minutes",
    note: "The average over its orbit, since the distance changes.",
    w: 46,
  },
  {
    name: "Proxima Centauri",
    time: "4.2 years",
    note: "The nearest known star beyond our Sun.",
    w: 74,
  },
  {
    name: "Andromeda Galaxy",
    time: "about 2.5 million years",
    note: "The nearest large galaxy to our own.",
    w: 100,
  },
] as const;

const sky = [
  {
    name: "Emission nebula",
    style:
      "radial-gradient(60% 50% at 38% 42%, #f472b6 0%, #7c3aed 45%, transparent 75%), radial-gradient(50% 45% at 68% 62%, #38bdf8 0%, transparent 70%), #0a0b24",
    data: [
      ["Target type", "Glowing gas cloud"],
      ["Exposure", "Sample: 90 × 120 s"],
      ["Filter", "Sample: hydrogen-alpha"],
      ["Processing", "Sample: stacked, stretched"],
    ],
  },
  {
    name: "Spiral galaxy",
    style:
      "conic-gradient(from 20deg at 50% 50%, #818cf8, #14173f, #c084fc, #14173f, #818cf8), #0a0b24",
    data: [
      ["Target type", "Spiral galaxy"],
      ["Exposure", "Sample: 60 × 180 s"],
      ["Filter", "Sample: luminance"],
      ["Processing", "Sample: stacked, stretched"],
    ],
  },
  {
    name: "Star cluster",
    style:
      "radial-gradient(circle at 50% 50%, #fff8 0 2px, transparent 3px) 0 0 / 22px 22px, radial-gradient(circle at 30% 70%, #818cf855, transparent 45%), #0a0b24",
    data: [
      ["Target type", "Open cluster"],
      ["Exposure", "Sample: 40 × 60 s"],
      ["Filter", "Sample: none"],
      ["Processing", "Sample: stacked, lightly stretched"],
    ],
  },
] as const;

function Orrery() {
  const [selected, setSelected] = useState(2);
  const [paused, setPaused] = useState(false);
  const p = planets[selected] ?? planets[2];
  return (
    <div className="grid items-center gap-8 @3xl:grid-cols-[1.1fr_0.9fr]">
      <div className="relative mx-auto aspect-square w-full max-w-xl">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-[9%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd36e] shadow-[0_0_60px_20px_rgba(255,200,90,0.5)]"
        />
        {planets.map((pl, i) => (
          <div
            key={pl.name}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
            style={{
              width: `${pl.r * 2}%`,
              height: `${pl.r * 2}%`,
              translate: "-50% -50%",
              animation: `s-spin ${(pl.period * 12).toFixed(1)}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            <button
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`${pl.name}${i === selected ? " (selected)" : ""}`}
              aria-pressed={i === selected}
              className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-shadow duration-300 before:absolute before:-inset-3 before:content-[''] ${i === selected ? "ring-2 ring-white ring-offset-2 ring-offset-transparent shadow-[0_0_24px_6px_var(--c)]" : "hover:shadow-[0_0_16px_4px_var(--c)]"}`}
              style={{
                width: pl.size,
                height: pl.size,
                background: pl.color,
                ["--c" as string]: pl.color,
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <div
          className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-7"
          aria-live="polite"
        >
          <p className={`text-[11px] uppercase tracking-[0.22em] text-[var(--s-accent)] ${mono}`}>
            Selected world
          </p>
          <p className="mt-2 text-5xl [font-family:var(--s-display)]">{p.name}</p>
          <dl className={`mt-5 grid grid-cols-2 gap-4 text-sm ${mono}`}>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-[var(--s-muted)]">
                Distance from Sun
              </dt>
              <dd className="mt-1 text-lg">{p.au} AU</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-[var(--s-muted)]">
                One year
              </dt>
              <dd className="mt-1 text-lg">{p.year}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm leading-7 text-[var(--s-muted)]">{p.fact}</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Btn variant="outline" onClick={() => setPaused((x) => !x)}>
            {paused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}{" "}
            {paused ? "Resume" : "Pause"}
          </Btn>
          <p className="max-w-xs text-xs leading-relaxed text-[var(--s-muted)]">
            Time-lapse: one Earth year takes 12 seconds. Orbit sizes are not to scale.
          </p>
        </div>
      </div>
    </div>
  );
}

function LightTravel() {
  const [i, setI] = useState(1);
  const [go, setGo] = useState(false);
  const d = distances[i] ?? distances[1];
  useEffect(() => {
    setGo(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setGo(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [i]);
  return (
    <div className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-7 @3xl:p-10">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a destination">
        {distances.map((x, idx) => (
          <button
            key={x.name}
            type="button"
            onClick={() => setI(idx)}
            aria-pressed={i === idx}
            className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition ${i === idx ? "border-[var(--s-accent)] bg-[var(--s-accent)] text-[var(--s-on)]" : "border-[var(--s-border)] hover:border-[var(--s-accent)]"}`}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className="mt-10" aria-live="polite">
        <p className={`text-[11px] uppercase tracking-[0.22em] text-[var(--s-muted)] ${mono}`}>
          Light takes
        </p>
        <p className="mt-2 text-5xl leading-tight [font-family:var(--s-display)] @3xl:text-7xl">
          {d.time}
        </p>
        <p className="mt-3 text-sm text-[var(--s-muted)]">
          to reach us from {d.name.toLowerCase().startsWith("the ") ? d.name.toLowerCase() : d.name}
          . {d.note}
        </p>
      </div>
      <div className="relative mt-10 h-px bg-[var(--s-border)]">
        <span
          className={`absolute -top-5 left-0 text-[10px] uppercase tracking-widest text-[var(--s-muted)] ${mono}`}
        >
          {d.name}
        </span>
        <span
          className={`absolute -top-5 right-0 text-[10px] uppercase tracking-widest text-[var(--s-muted)] ${mono}`}
        >
          You
        </span>
        <span
          aria-hidden="true"
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#fff6c8] shadow-[0_0_18px_6px_rgba(255,240,170,0.7)]"
          style={{
            left: go ? "calc(100% - 12px)" : "0%",
            transition: go ? "left 2.4s cubic-bezier(.4,0,.2,1)" : "none",
          }}
        />
      </div>
      <p className="mt-8 text-xs text-[var(--s-muted)]">
        Times are approximate. The animation shows the idea, not the real speed.
      </p>
    </div>
  );
}

export function NonFictionWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [photo, setPhoto] = useState(0);
  const shot = sky[photo] ?? sky[0];

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Science writing"
        links={[
          ["orbits", "Orbits"],
          ["light", "Light"],
          ["sky", "Sky gallery"],
          ["dispatch", "Dispatch"],
        ]}
        cta="Get the book"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--s-accent)]/50 bg-[var(--s-card)] text-[var(--s-accent)]">
            <Orbit size={20} aria-hidden="true" />
          </span>
        }
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-14 @3xl:px-10 @3xl:pb-28 @3xl:pt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 80% 35%, rgba(129,140,248,0.28), transparent 70%), radial-gradient(40% 45% at 0% 100%, rgba(192,132,252,0.18), transparent 70%)",
          }}
        />
        {Array.from({ length: 44 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute rounded-full bg-white [animation:s-twinkle_4s_ease-in-out_infinite]"
            style={{
              left: `${(i * 53 + 7) % 100}%`,
              top: `${(i * 37 + 11) % 100}%`,
              width: i % 7 === 0 ? 3 : 2,
              height: i % 7 === 0 ? 3 : 2,
              animationDelay: `${(i % 9) * -0.7}s`,
            }}
          />
        ))}
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow>A journey through deep time</Eyebrow>
            <Display
              as="h1"
              className="mt-5 text-[clamp(3rem,10.5cqi,7.4rem)] font-normal leading-[0.92] tracking-[-0.02em]"
            >
              Listen for the <span className="italic text-[var(--s-accent)]">echoes.</span>
            </Display>
            <p className="mt-7 max-w-xl text-base leading-8 text-[var(--s-muted)] @3xl:text-lg">
              Echoes of Nova Prime explains how astronomers read the oldest light in the universe,
              and why looking far away is also a way of looking back in time.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => jump(ID, "orbits")}>
                <Orbit size={16} aria-hidden="true" /> Explore the orbits
              </Btn>
              <Btn variant="outline" onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read the opening
              </Btn>
            </div>
          </div>
          <Book3D cover={COVER} title={TITLE} width={250} className="my-8" />
        </Wrap>
      </section>

      <Section site={ID} id="orbits" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>The Solar System, in motion</Eyebrow>
          <Display className="mb-10 mt-4 text-4xl font-normal @3xl:text-6xl">Tap a world</Display>
          <Orrery />
        </Wrap>
      </Section>

      <Section site={ID} id="light">
        <Wrap>
          <Eyebrow>How far is far?</Eyebrow>
          <Display className="mb-10 mt-4 text-4xl font-normal @3xl:text-6xl">
            Light has a long way to go
          </Display>
          <LightTravel />
        </Wrap>
      </Section>

      <Section site={ID} id="sky" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>Sky gallery</Eyebrow>
          <Display className="mb-10 mt-4 text-4xl font-normal @3xl:text-6xl">
            Pictures with their data sheets
          </Display>
          <div className="grid gap-6 @3xl:grid-cols-[1.2fr_0.8fr]">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[var(--s-border)] transition-all duration-700"
              style={{ background: shot.style }}
              role="img"
              aria-label={`${shot.name}, a sample picture for this concept`}
            >
              <span
                className={`absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] backdrop-blur ${mono}`}
              >
                {shot.name}
              </span>
            </div>
            <div>
              <div className="flex gap-2" role="tablist" aria-label="Pictures">
                {sky.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    role="tab"
                    aria-selected={photo === i}
                    onClick={() => setPhoto(i)}
                    className={`min-h-10 flex-1 rounded-full border px-2 text-xs font-semibold transition ${photo === i ? "border-[var(--s-accent)] bg-[var(--s-accent)] text-[var(--s-on)]" : "border-[var(--s-border)] hover:border-[var(--s-accent)]"}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <dl
                className={`mt-5 divide-y divide-[var(--s-border)] rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] px-6 text-sm ${mono}`}
                aria-live="polite"
              >
                {shot.data.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-4">
                    <dt className="text-[10px] uppercase tracking-widest text-[var(--s-muted)]">
                      {k}
                    </dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-[var(--s-muted)]">
                Sample images and data sheets made for this website concept.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="dispatch">
        <Wrap>
          <Signup
            title="The Deep Sky Dispatch"
            text="One clear explanation of something strange in the sky, in your inbox once a month."
            cta="Subscribe"
          />
        </Wrap>
      </Section>

      <Section
        site={ID}
        id="author"
        className="border-t border-[var(--s-border)] bg-[var(--s-bg2)]"
      >
        <Wrap className="mx-auto max-w-3xl text-center">
          <Eyebrow>About the author</Eyebrow>
          <Display className="mt-3 text-4xl font-normal @3xl:text-6xl">{AUTHOR}</Display>
          <p className="mt-5 text-base leading-8 text-[var(--s-muted)]">
            Tariq explains the universe for people who have never studied it. He is available for
            science festivals, school talks and keynotes.
          </p>
          <Btn className="mt-7" variant="outline" onClick={() => jump(ID, "dispatch")}>
            <Telescope size={16} aria-hidden="true" /> Ask about a talk
          </Btn>
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Science author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="Letters in Light"
        author={AUTHOR}
        chapter="Introduction"
        paragraphs={excerpt}
        onBuy={() => setBuying(true)}
      />
      <Retailers
        open={buying}
        onClose={() => setBuying(false)}
        title={TITLE}
        author={AUTHOR}
        cover={COVER}
      />
    </Site>
  );
}
