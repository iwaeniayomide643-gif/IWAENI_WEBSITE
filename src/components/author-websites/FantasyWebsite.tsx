import "@fontsource/cinzel/latin-500.css";
import "@fontsource/cinzel/latin-700.css";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Compass,
  Crown,
  Flame,
  Moon,
  ShoppingBag,
  Sun,
  Swords,
  TreePine,
  Waves,
} from "lucide-react";
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

const ID = "fantasy";
const COVER = "/images/covers/chronicles-of-the-solar-king.svg";
const AUTHOR = "Kofi Mensah";
const TITLE = "Chronicles of the Solar King";

const theme: Theme = {
  bg: "#120b1c",
  bg2: "#1c1229",
  fg: "#f7ecdc",
  muted: "#bfa9b6",
  accent: "#e8ac3d",
  accent2: "#e0835f",
  card: "rgba(255,255,255,0.05)",
  border: "rgba(232,172,61,0.26)",
  on: "#1a1226",
  display: "'Cinzel', Georgia, serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const excerpt = [
  "On the morning the sun failed to rise over Aurelia, the bells of the Gilded Court rang for a king who had not yet died.",
  "Tamsin stood on the cold stair of the observatory and counted the hours the way her grandmother had taught her, by the breath, by the heartbeat, by the slow stiffening of her fingers. Seven hours past dawn. Seven hours of a sky the colour of old pewter.",
  "“It will come back,” said the astronomer beside her, and she heard how carefully he did not say when.",
  "Far below, in the throne room, the Solar King lay with his crown on his chest, and the crown, for the first time in four hundred years, had gone dark.",
];

const regions = [
  {
    id: "aurelia",
    name: "Aurelia",
    role: "The Sunlit Throne",
    icon: Crown,
    text: "A city of copper domes where the Solar King holds court. The crown here is more than a symbol: it is the engine of the day.",
    d: "M255 150 L330 130 L375 175 L350 235 L275 245 L235 200 Z",
  },
  {
    id: "veil",
    name: "The Veil Forest",
    role: "Home of the Moth Choirs",
    icon: TreePine,
    text: "A silver-leaved wood where it is always dusk. Travellers hear their own names sung by voices that are not there.",
    d: "M95 140 L170 110 L215 160 L195 235 L120 255 L75 205 Z",
  },
  {
    id: "ember",
    name: "The Ember Marches",
    role: "Frontier of the Fire Houses",
    icon: Flame,
    text: "Black glass plains and rivers of slow light. The Fire Houses forge sunsteel here, and tell no one how.",
    d: "M395 190 L470 170 L520 220 L495 285 L420 295 L380 245 Z",
  },
  {
    id: "ashen",
    name: "The Ashen Reach",
    role: "Where the Night Armies gather",
    icon: Swords,
    text: "A grey, wind-scoured north that has been waiting four hundred years for the sun to blink.",
    d: "M215 40 L300 25 L360 60 L330 105 L255 115 L205 85 Z",
  },
  {
    id: "tide",
    name: "The Tidemark Isles",
    role: "Harbours of the Salt Kings",
    icon: Waves,
    text: "Seventy islands, one fleet, and a treaty that holds only while the tide does.",
    d: "M120 290 L190 275 L230 320 L200 365 L130 360 L95 325 Z",
  },
];

const codex = {
  Houses: [
    {
      icon: Sun,
      t: "House Aurel",
      d: "Keepers of the crown. They govern by daylight and break their fast at dawn.",
    },
    {
      icon: Flame,
      t: "House Cinder",
      d: "Smiths of sunsteel. They trade in fire and secrets, in that order.",
    },
    {
      icon: Moon,
      t: "House Veyra",
      d: "The night-born. Patient, soft-spoken, and always at the edge of the room.",
    },
  ],
  Magic: [
    {
      icon: Sun,
      t: "Dawnbinding",
      d: "Drawing daylight into objects. It is strongest at noon and costs a memory.",
    },
    {
      icon: Moon,
      t: "Dusksong",
      d: "Singing a place into stillness. Only the Moth Choirs have ever mastered it.",
    },
    {
      icon: Flame,
      t: "Emberwork",
      d: "Shaping heat as if it were clay. Every smith carries the scars.",
    },
  ],
  Timeline: [
    {
      icon: Crown,
      t: "Year 0",
      d: "The first king takes the crown and the sun rises on his word.",
    },
    { icon: Swords, t: "Year 212", d: "The Ember War ends with a treaty signed at midnight." },
    { icon: Sun, t: "Year 400", d: "The crown goes dark. The sun does not rise." },
  ],
} as const;

function useCountdown(days: number) {
  const [target] = useState(() => Date.now() + days * 86_400_000);
  const [left, setLeft] = useState(days * 86_400_000);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);
  const s = Math.floor(left / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

export function FantasyWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [region, setRegion] = useState(regions[0]);
  const [tab, setTab] = useState<keyof typeof codex>("Houses");
  const clock = useCountdown(21);
  const active = region ?? regions[0];
  const ActiveIcon = active?.icon ?? Crown;

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Epic fantasy"
        links={[
          ["map", "Realm map"],
          ["codex", "Codex"],
          ["excerpt", "Excerpt"],
          ["court", "The Court"],
        ]}
        cta="Pre-order"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--s-accent)]/60 bg-[var(--s-card)] text-[var(--s-accent)]">
            <Sun size={18} aria-hidden="true" />
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
              "radial-gradient(55% 60% at 72% 42%, rgba(232,172,61,0.30), transparent 70%), radial-gradient(40% 40% at 5% 100%, rgba(224,131,95,0.2), transparent 70%)",
          }}
        />
        {/* the dark sun */}
        <div
          aria-hidden="true"
          className="absolute right-[-12%] top-1/2 size-[44rem] -translate-y-1/2 opacity-60 @3xl:right-[2%]"
        >
          <div className="absolute inset-0 [animation:s-spin_90s_linear_infinite]">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gradient-to-b from-[var(--s-accent)]/60 to-transparent"
                style={{ transform: `rotate(${i * 15}deg)` }}
              />
            ))}
          </div>
          <div className="absolute inset-[22%] rounded-full border border-[var(--s-accent)]/50" />
          <div className="absolute inset-[30%] rounded-full border border-[var(--s-accent)]/30" />
        </div>
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Book one of the Solar Throne cycle</Eyebrow>
            <Display
              as="h1"
              className="mt-5 text-[clamp(2.3rem,7.4cqi,4.9rem)] font-bold uppercase leading-[1.05] tracking-[0.02em]"
            >
              When the sun forgets its king
            </Display>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--s-muted)] @3xl:text-lg">
              Four hundred years of daylight rest on a single crown. Tonight it has gone dark, and a
              girl who counts the hours must find out why before the night armies move.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => jump(ID, "map")}>
                <Compass size={16} aria-hidden="true" /> Explore the realm
              </Btn>
              <Btn variant="outline" onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read the prologue
              </Btn>
            </div>
            <div className="mt-10 inline-block rounded-3xl border border-[var(--s-border)] bg-[var(--s-card)] px-5 py-4 backdrop-blur">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--s-accent)]">
                Collector&rsquo;s hardcover launches in
              </p>
              <div
                className="mt-2 flex gap-5 [font-family:var(--s-display)]"
                role="timer"
                aria-live="off"
              >
                {(
                  [
                    ["d", "days"],
                    ["h", "hrs"],
                    ["m", "min"],
                    ["s", "sec"],
                  ] as const
                ).map(([k, label]) => (
                  <div key={k} className="text-center">
                    <p className="text-3xl font-bold tabular-nums @3xl:text-4xl">
                      {String(clock[k]).padStart(2, "0")}
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--s-muted)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Book3D cover={COVER} title={TITLE} width={270} className="my-8" />
        </Wrap>
      </section>

      {/* Realm map */}
      <Section site={ID} id="map" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>The realm of Aurelia</Eyebrow>
          <Display className="mt-4 text-3xl font-bold uppercase @3xl:text-5xl">
            Choose a land
          </Display>
          <div className="mt-10 grid gap-8 @3xl:grid-cols-[1.25fr_0.75fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--s-border)] bg-[#241833] p-3">
              <svg
                viewBox="0 0 600 400"
                role="group"
                aria-label="Map of the realm"
                className="h-auto w-full"
              >
                <defs>
                  <pattern id="fy-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path
                      d="M28 0H0V28"
                      fill="none"
                      stroke="rgba(232,172,61,0.08)"
                      strokeWidth="1"
                    />
                  </pattern>
                  <radialGradient id="fy-sea" cx="50%" cy="45%" r="70%">
                    <stop offset="0%" stopColor="#2c2142" />
                    <stop offset="100%" stopColor="#150e22" />
                  </radialGradient>
                </defs>
                <rect width="600" height="400" fill="url(#fy-sea)" />
                <rect width="600" height="400" fill="url(#fy-grid)" />
                <g
                  strokeDasharray="3 6"
                  stroke="rgba(232,172,61,0.35)"
                  fill="none"
                  strokeWidth="1.5"
                >
                  <path d="M300 190 C 250 170, 200 190, 160 190" />
                  <path d="M335 195 C 390 200, 420 220, 440 235" />
                  <path d="M300 130 C 295 110, 290 90, 285 75" />
                  <path d="M270 245 C 240 270, 210 290, 175 305" />
                </g>
                {regions.map((r) => {
                  const on = r.id === active?.id;
                  return (
                    <path
                      key={r.id}
                      d={r.d}
                      role="button"
                      tabIndex={0}
                      aria-label={`${r.name}: ${r.role}`}
                      aria-pressed={on}
                      onClick={() => setRegion(r)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setRegion(r)}
                      strokeLinejoin="round"
                      strokeWidth={on ? 14 : 10}
                      stroke={on ? "#e8ac3d" : "#7a5f3a"}
                      fill={on ? "#e8ac3d" : "#8e6f45"}
                      fillOpacity={on ? 0.9 : 0.55}
                      className="cursor-pointer outline-none transition-all duration-300 hover:fill-[#e0835f] hover:stroke-[#e0835f] focus-visible:stroke-white"
                    />
                  );
                })}
                {regions.map((r) => (
                  <text
                    key={r.id}
                    x={
                      r.id === "aurelia"
                        ? 305
                        : r.id === "veil"
                          ? 145
                          : r.id === "ember"
                            ? 445
                            : r.id === "ashen"
                              ? 282
                              : 160
                    }
                    y={
                      r.id === "aurelia"
                        ? 192
                        : r.id === "veil"
                          ? 188
                          : r.id === "ember"
                            ? 240
                            : r.id === "ashen"
                              ? 72
                              : 322
                    }
                    textAnchor="middle"
                    className="pointer-events-none select-none [font-family:var(--s-display)]"
                    fontSize="13"
                    fontWeight="700"
                    fill="#1a1226"
                  >
                    {r.name.replace("The ", "")}
                  </text>
                ))}
                <g
                  transform="translate(540 350)"
                  fill="none"
                  stroke="rgba(232,172,61,0.7)"
                  strokeWidth="1.5"
                >
                  <circle r="22" />
                  <path d="M0 -30 L5 0 L0 30 L-5 0 Z" fill="rgba(232,172,61,0.6)" />
                  <path d="M-30 0 L0 5 L30 0 L0 -5 Z" />
                </g>
              </svg>
            </div>
            <div
              className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-7"
              aria-live="polite"
            >
              <span className="grid size-12 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-on)]">
                <ActiveIcon size={22} aria-hidden="true" />
              </span>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--s-accent2)]">
                {active?.role}
              </p>
              <p className="mt-1 text-3xl font-bold uppercase [font-family:var(--s-display)]">
                {active?.name}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--s-muted)]">{active?.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {regions.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegion(r)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${r.id === active?.id ? "border-[var(--s-accent)] bg-[var(--s-accent)] text-[var(--s-on)]" : "border-[var(--s-border)] hover:border-[var(--s-accent)]"}`}
                  >
                    {r.name.replace("The ", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* Codex */}
      <Section site={ID} id="codex">
        <Wrap>
          <div className="flex flex-col gap-6 @3xl:flex-row @3xl:items-end @3xl:justify-between">
            <div>
              <Eyebrow>The codex</Eyebrow>
              <Display className="mt-4 text-3xl font-bold uppercase @3xl:text-5xl">
                Lore for the long wait
              </Display>
            </div>
            <div
              role="tablist"
              aria-label="Codex"
              className="flex gap-1 rounded-full border border-[var(--s-border)] bg-[var(--s-card)] p-1"
            >
              {(Object.keys(codex) as (keyof typeof codex)[]).map((name) => (
                <button
                  key={name}
                  role="tab"
                  type="button"
                  aria-selected={tab === name}
                  onClick={() => setTab(name)}
                  className={`min-h-10 rounded-full px-5 text-xs font-semibold uppercase tracking-[0.16em] transition ${tab === name ? "bg-[var(--s-accent)] text-[var(--s-on)]" : "text-[var(--s-muted)] hover:text-[var(--s-fg)]"}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div role="tabpanel" className="mt-10 grid gap-4 @3xl:grid-cols-3">
            {codex[tab].map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="group rounded-3xl border border-[var(--s-border)] bg-[var(--s-card)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--s-accent)]"
              >
                <Icon
                  size={26}
                  className="text-[var(--s-accent)] transition group-hover:scale-110"
                  aria-hidden="true"
                />
                <p className="mt-5 text-xl font-bold uppercase [font-family:var(--s-display)]">
                  {t}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--s-muted)]">{d}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* Excerpt */}
      <Section site={ID} id="excerpt" className="bg-[var(--s-bg2)]">
        <Wrap className="grid items-center gap-10 @3xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[var(--s-border)] bg-gradient-to-br from-[var(--s-accent)]/15 to-transparent p-8 text-center">
            <Crown size={40} className="mx-auto text-[var(--s-accent)]" aria-hidden="true" />
            <p className="mt-5 text-2xl font-bold uppercase leading-snug [font-family:var(--s-display)]">
              &ldquo;The crown had gone dark.&rdquo;
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[var(--s-muted)]">
              From the prologue
            </p>
          </div>
          <div>
            <p className="text-lg italic leading-9 text-[var(--s-fg)]/90">{excerpt[0]}</p>
            <p className="mt-4 text-sm leading-8 text-[var(--s-muted)]">{excerpt[1]}</p>
            <div className="mt-7 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read the prologue
              </Btn>
              <Btn variant="outline" onClick={() => setBuying(true)}>
                <ShoppingBag size={16} aria-hidden="true" /> Pre-order the book
              </Btn>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="court">
        <Wrap>
          <Signup
            title="Join the Sunlit Court"
            text="Fan-club updates, first looks at maps and sketches, and early access to the collector's edition."
            cta="Join the Court"
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
          <Display className="mt-3 text-3xl font-bold uppercase @3xl:text-5xl">{AUTHOR}</Display>
          <p className="mt-5 text-base leading-8 text-[var(--s-muted)]">
            Kofi builds worlds the way some people build boats: slowly, with maps, and with a quiet
            fear of leaks. He writes fantasy rooted in West African storytelling and in a lifelong
            love of night skies.
          </p>
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Fantasy author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="Prologue: The Dark Crown"
        author={AUTHOR}
        chapter="Prologue"
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
