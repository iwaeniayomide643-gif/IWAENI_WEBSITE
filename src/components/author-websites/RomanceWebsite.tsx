import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import { useState, type CSSProperties } from "react";
import {
  BookOpen,
  Feather,
  Heart,
  Mail,
  Music2,
  Pause,
  Play,
  ShoppingBag,
  Sparkles,
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

const ID = "romance";
const COVER = "/images/covers/the-autumn-atelier.svg";
const AUTHOR = "Camille Laurent";
const TITLE = "The Autumn Atelier";

const theme: Theme = {
  bg: "#170811",
  bg2: "#26101c",
  fg: "#f8ede6",
  muted: "#c9aab4",
  accent: "#e3b97a",
  accent2: "#d4677f",
  card: "rgba(255,255,255,0.05)",
  border: "rgba(227,185,122,0.22)",
  on: "#26101c",
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const chapter = [
  "The letter had been waiting for eighty years, folded small as a prayer and pressed between the pages of a ledger nobody wanted. Odile found it on a Tuesday in October, while the rain came down on the rue des Saules and the whole shop smelled of old glue and cold coffee.",
  "She was not a woman who read other people's love. She restored bindings. She mended spines, lifted foxing, taught torn paper to hold again. But the ink on this page was still dark, and the first line was her own street.",
  "“If you are reading this,” it began, “then the atelier survived, and so, I hope, did she.”",
  "Behind her the bell above the door gave one bright note. Odile did not turn. She already knew that whoever had come in would want the ledger, and she already knew she would not sell it.",
];

const order = [
  {
    tag: "Free for readers",
    name: "Letters in the Margin",
    note: "A short prequel novella, sent when you join the list.",
  },
  {
    tag: "Book one",
    name: TITLE,
    note: "Paris, October. A restorer, a hidden letter, a collector.",
  },
  { tag: "Coming next", name: "The Winter Binding", note: "Odile returns to the rue des Saules." },
];

const tracks = [
  "Rain on the Rue des Saules",
  "Candlelight Ledger",
  "Last Train to Montmartre",
  "Ink & Roses",
  "The Collector’s Waltz",
  "Morning, Unsent",
];

const moods = [
  { name: "Candlelight", bg: "linear-gradient(135deg,#6b2740,#241018)" },
  { name: "Old paper", bg: "linear-gradient(135deg,#d9c3a0,#8a6b4a)" },
  { name: "Rain glass", bg: "linear-gradient(135deg,#34475e,#10151d)" },
  { name: "Rose ink", bg: "linear-gradient(135deg,#d4677f,#5a1f34)" },
  { name: "Gold leaf", bg: "linear-gradient(135deg,#f0d28f,#a9742a)" },
  { name: "Midnight blue", bg: "linear-gradient(135deg,#1f2a52,#0a0e22)" },
];

export function RomanceWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Parisian romance"
        links={[
          ["story", "The story"],
          ["order", "Reading order"],
          ["chapter", "Chapter one"],
          ["letters", "Letters"],
        ]}
        cta="Get the book"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--s-accent)]/50 bg-[var(--s-card)] text-sm italic [font-family:var(--s-display)] text-[var(--s-accent)]">
            CL
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
              "radial-gradient(60% 55% at 78% 40%, rgba(212,103,127,0.28), transparent 70%), radial-gradient(45% 45% at 10% 0%, rgba(227,185,122,0.18), transparent 70%)",
          }}
        />
        {/* drifting petals */}
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 h-3.5 w-2.5 rounded-[100%_0_100%_0] bg-[var(--s-accent2)]/60"
            style={
              {
                left: `${(i * 6.3 + 3) % 100}%`,
                "--dx": `${(i % 2 ? 1 : -1) * (30 + (i % 4) * 20)}px`,
                animation: `s-fall ${11 + (i % 5) * 2.2}s linear ${i * 0.8}s infinite`,
              } as CSSProperties
            }
          />
        ))}
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--s-border)] bg-[var(--s-card)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--s-accent)]">
              <Heart size={12} aria-hidden="true" /> A Parisian love story
            </p>
            <Display as="h1" className="mt-6 text-[clamp(2.8rem,9cqi,5.8rem)] font-medium italic">
              Love, whispered along the banks of the Seine.
            </Display>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--s-muted)] @3xl:text-lg @3xl:leading-8">
              When a restorer of antique books finds an unsent confession hidden in a 1940s ledger,
              she never expects the collector hunting for it to rewrite her whole heart.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => setBuying(true)}>
                <ShoppingBag size={16} aria-hidden="true" /> Get {TITLE}
              </Btn>
              <Btn variant="outline" onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read chapter one
              </Btn>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-[var(--s-muted)]">
              <Mail size={15} className="text-[var(--s-accent)]" aria-hidden="true" />
              Join the list and receive the prequel novella free.
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[112%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] border border-[var(--s-accent)]/40"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[100%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] bg-gradient-to-b from-[var(--s-accent2)]/25 to-transparent"
            />
            <Book3D cover={COVER} title={TITLE} width={270} className="my-10" />
          </div>
        </Wrap>
      </section>

      {/* Story */}
      <Section site={ID} id="story" className="bg-[var(--s-bg2)]">
        <Wrap className="grid gap-12 @3xl:grid-cols-[0.9fr_1.1fr] @3xl:items-center">
          <div>
            <Eyebrow>The story</Eyebrow>
            <Display className="mt-4 text-4xl font-medium @3xl:text-6xl">
              Some letters wait a lifetime to be read.
            </Display>
            <p className="mt-6 text-base leading-8 text-[var(--s-muted)]">
              Set between a rain-soaked October and a candlelit December, {TITLE} is a slow-burn
              romance about second chances, quiet crafts, and the courage it takes to answer a
              message from the past.
            </p>
          </div>
          <div className="grid gap-4 @lg:grid-cols-3">
            {[
              {
                icon: Feather,
                t: "Hidden letters",
                d: "A confession tucked inside a ledger for eighty years.",
              },
              {
                icon: Heart,
                t: "Slow-burn romance",
                d: "Two people who handle fragile things carefully.",
              },
              {
                icon: Sparkles,
                t: "Second chances",
                d: "Paris in autumn, and a shop worth saving.",
              },
            ].map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-3xl border border-[var(--s-border)] bg-[var(--s-card)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--s-accent)]"
              >
                <Icon size={22} className="text-[var(--s-accent)]" aria-hidden="true" />
                <p className="mt-4 text-2xl [font-family:var(--s-display)]">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--s-muted)]">{d}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* Reading order */}
      <Section site={ID} id="order">
        <Wrap>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Reading order</Eyebrow>
            <Display className="mt-4 text-4xl font-medium @3xl:text-6xl">Where to begin</Display>
          </div>
          <ol className="relative mt-14 grid gap-5 @3xl:grid-cols-3">
            <span
              aria-hidden="true"
              className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--s-accent)]/50 to-transparent @3xl:block"
            />
            {order.map((item, i) => (
              <li key={item.name} className="relative text-center">
                <span className="relative z-10 mx-auto grid size-14 place-items-center rounded-full border border-[var(--s-accent)] bg-[var(--s-bg)] text-xl italic text-[var(--s-accent)] [font-family:var(--s-display)]">
                  {i + 1}
                </span>
                <div className="mt-5 rounded-3xl border border-[var(--s-border)] bg-[var(--s-card)] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--s-accent2)]">
                    {item.tag}
                  </p>
                  <p className="mt-2 text-2xl [font-family:var(--s-display)]">{item.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--s-muted)]">{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Wrap>
      </Section>

      {/* Chapter one + narration */}
      <Section site={ID} id="chapter" className="bg-[var(--s-bg2)]">
        <Wrap className="grid items-start gap-10 @3xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] bg-[#f6ecdc] p-7 text-[#2b1a1f] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] @3xl:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#a35468]">
              Chapter one &middot; Preview
            </p>
            <h3 className="mt-3 text-4xl font-medium italic leading-tight [font-family:var(--s-display)]">
              The Ledger
            </h3>
            <p className="mt-5 text-[1.08rem] leading-[1.9] [font-family:var(--s-display)] first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[#a35468]">
              {chapter[0]}
            </p>
            <p className="mt-4 text-[1.08rem] leading-[1.9] [font-family:var(--s-display)]">
              {chapter[1]}
            </p>
            <Btn className="mt-7 !bg-[#2b1a1f] !text-[#f6ecdc]" onClick={() => setReading(true)}>
              Keep reading <BookOpen size={16} aria-hidden="true" />
            </Btn>
          </article>
          <aside className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-6 @3xl:p-8">
            <Eyebrow>Narration preview</Eyebrow>
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause narration preview" : "Play narration preview"}
                className="grid size-14 shrink-0 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-on)] shadow-[0_12px_30px_-10px_var(--s-accent)] transition hover:scale-105"
              >
                {playing ? (
                  <Pause size={20} aria-hidden="true" />
                ) : (
                  <Play size={20} className="ml-0.5" aria-hidden="true" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg [font-family:var(--s-display)]">
                  Chapter one, read aloud
                </p>
                <div className="mt-2 flex h-8 items-end gap-[3px]" aria-hidden="true">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-full rounded-full bg-[var(--s-accent)]/70 transition-[height]"
                      style={{
                        height: `${28 + ((i * 37) % 70)}%`,
                        animation: playing
                          ? `s-twinkle ${0.7 + (i % 5) * 0.15}s ease-in-out ${i * 0.04}s infinite`
                          : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[var(--s-muted)]">
              Website concept: this is where a short audio sample, in English and French, would
              play.
            </p>
            <div className="my-6 h-px bg-[var(--s-border)]" />
            <Eyebrow>Playlist</Eyebrow>
            <ul className="mt-3 divide-y divide-[var(--s-border)]">
              {tracks.map((track, i) => (
                <li key={track} className="flex items-center gap-3 py-2.5 text-sm">
                  <Music2
                    size={14}
                    className="shrink-0 text-[var(--s-accent2)]"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate">{track}</span>
                  <span className="text-xs text-[var(--s-muted)]">
                    0{(i % 4) + 2}:{["14", "47", "31", "58", "09", "26"][i]}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </Wrap>
      </Section>

      {/* Moodboard */}
      <Section site={ID} id="mood">
        <Wrap>
          <Eyebrow>Moodboard</Eyebrow>
          <Display className="mt-4 max-w-xl text-4xl font-medium @3xl:text-5xl">
            The colours of the book
          </Display>
          <div className="mt-10 grid grid-cols-2 gap-3 @3xl:grid-cols-6">
            {moods.map((m, i) => (
              <div
                key={m.name}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--s-border)] transition duration-500 hover:-translate-y-1.5"
                style={{ background: m.bg, marginTop: i % 2 ? "1.25rem" : 0 }}
              >
                <span className="absolute inset-x-3 bottom-3 text-lg italic text-white/90 [font-family:var(--s-display)]">
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* Sign-up */}
      <Section site={ID} id="letters" className="pt-4">
        <Wrap>
          <Signup
            title="Letters from Paris"
            text="One note a month: new chapters, behind-the-scenes from the atelier, and the free prequel novella as a welcome gift."
            cta="Send me the prequel"
            gift="the prequel novella "
          />
        </Wrap>
      </Section>

      {/* Author */}
      <Section
        site={ID}
        id="author"
        className="border-t border-[var(--s-border)] bg-[var(--s-bg2)]"
      >
        <Wrap className="grid items-center gap-8 @3xl:grid-cols-[auto_1fr]">
          <span className="mx-auto grid size-36 place-items-center rounded-full border border-[var(--s-accent)]/50 bg-gradient-to-br from-[var(--s-accent2)]/30 to-[var(--s-accent)]/20 text-6xl italic text-[var(--s-accent)] [font-family:var(--s-display)] @3xl:size-44">
            CL
          </span>
          <div className="text-center @3xl:text-left">
            <Eyebrow>About the author</Eyebrow>
            <Display className="mt-3 text-3xl font-medium @3xl:text-5xl">{AUTHOR}</Display>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--s-muted)]">
              Camille writes slow, sensory love stories about people who work with their hands. She
              divides her time between a narrow flat in Paris and a desk by the sea, and keeps a
              drawer of ribbon, thread and half-finished letters.
            </p>
            <Btn variant="outline" className="mt-5" onClick={() => jump(ID, "letters")}>
              <Mail size={15} aria-hidden="true" /> Join the letters
            </Btn>
          </div>
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Romance author website concept" />

      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="The Ledger"
        author={AUTHOR}
        chapter="Chapter one"
        paragraphs={chapter}
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
