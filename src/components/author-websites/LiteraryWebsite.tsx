import { useEffect, useRef, useState, type FormEvent } from "react";
import { BookOpen, Check, ChevronDown, Moon, Pause, Play, Sun } from "lucide-react";
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

const ID = "literary";
const COVER = "/images/covers/dust-and-jasmine.svg";
const AUTHOR = "Soraya Al-Mansoor";
const TITLE = "Dust and Jasmine";

const theme: Theme = {
  bg: "#f5f0e8",
  bg2: "#ece4d6",
  fg: "#221d1a",
  muted: "#6b5f55",
  accent: "#9a5b3a",
  accent2: "#4d5b4a",
  card: "rgba(34,29,26,0.04)",
  border: "rgba(34,29,26,0.16)",
  on: "#fff8ee",
  display: "'Instrument Serif', Georgia, serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const excerpt = [
  "My grandmother kept her jasmine in a cracked blue bowl, and every evening she watered it with what was left of the tea.",
  "She said a house should smell of someone who intends to stay.",
  "We stayed, for a while. Then the road widened, and the courtyard was taken, and the jasmine went into a plastic bag on my lap, travelling west at the speed of everything we owned.",
  "Dust, my mother told me, is only the memory of rooms.",
];

const essays = [
  { title: "The weight of a borrowed language", tag: "Craft", min: 9 },
  { title: "What the courtyard knew", tag: "Place", min: 6 },
  { title: "Notes on carrying a smell across a border", tag: "Memory", min: 5 },
  { title: "Why I write the ending first", tag: "Craft", min: 7 },
  { title: "Tea, and the long afternoon", tag: "Memory", min: 4 },
  { title: "Streets I can only walk at night", tag: "Place", min: 8 },
] as const;

const tags = ["All", "Memory", "Place", "Craft"] as const;

const poem = [
  "Every house I have loved",
  "has been a little too small",
  "for the sound of my mother's name.",
  "I carry the doorframes anyway,",
  "folded like letters,",
  "and wait for a wall to say yes.",
];

const questions = [
  {
    q: "The jasmine travels with the narrator. What does each object that is carried tell us about what was left behind?",
    a: "Look for how the book decides what is worth the weight of a journey, and who gets to choose.",
  },
  {
    q: "Dust appears in the title and again in the closing pages. Does its meaning change?",
    a: "Consider the difference between dust as loss and dust as proof that something once stood there.",
  },
  {
    q: "Who is the book written for: the people who stayed, the people who left, or the people who will never know?",
    a: "There is no right answer. The best conversations tend to begin with a disagreement.",
  },
  {
    q: "The narrator rarely names the city. Why might the author leave it unnamed?",
    a: "Think about what a name fixes in place, and what a silence allows.",
  },
];

function PoemPlayer() {
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(-1);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setLine((current) => {
        if (current >= poem.length - 1) {
          setPlaying(false);
          return -1;
        }
        return current + 1;
      });
    }, 2300);
    return () => window.clearInterval(id);
  }, [playing]);

  const toggle = () => {
    if (!playing && line < 0) setLine(0);
    setPlaying((p) => !p);
  };

  return (
    <div className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-bg)] p-7 @3xl:p-10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause the poem" : "Play the poem"}
          className="grid size-14 shrink-0 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-on)] transition hover:scale-105 active:scale-95"
        >
          {playing ? (
            <Pause size={20} aria-hidden="true" />
          ) : (
            <Play size={20} className="translate-x-0.5" aria-hidden="true" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-2xl leading-tight [font-family:var(--s-display)]">Doorframes</p>
          <div
            className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--s-border)]"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-[var(--s-accent)] transition-all duration-[2300ms] ease-linear"
              style={{ width: `${((line + 1) / poem.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div
        className="mt-8 space-y-1.5 text-2xl leading-snug [font-family:var(--s-display)] @3xl:text-3xl"
        aria-live="polite"
      >
        {poem.map((text, i) => (
          <p
            key={text}
            className={`transition-all duration-700 ${i === line ? "translate-x-2 text-[var(--s-accent)]" : i < line ? "text-[var(--s-fg)]/70" : "text-[var(--s-fg)]/30"}`}
          >
            {text}
          </p>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-[var(--s-muted)]">
        Website concept: the lines light up as a recording would play. Sample poem written for this
        concept.
      </p>
    </div>
  );
}

function ReadingRoom() {
  const [size, setSize] = useState(20);
  const [serif, setSerif] = useState(true);
  const [night, setNight] = useState(false);
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-[var(--s-border)] transition-colors duration-500 ${night ? "bg-[#17130f] text-[#eadfce]" : "bg-[var(--s-bg)] text-[var(--s-fg)]"}`}
    >
      <div className="flex flex-wrap items-center gap-4 border-b border-current/10 px-6 py-4 text-xs">
        <label className="flex items-center gap-3">
          <span className="uppercase tracking-[0.18em] opacity-70">Size</span>
          <input
            type="range"
            min={16}
            max={28}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-28 accent-[var(--s-accent)]"
            aria-label="Text size"
          />
        </label>
        <div className="flex rounded-full border border-current/20 p-0.5">
          {([true, false] as const).map((isSerif) => (
            <button
              key={String(isSerif)}
              type="button"
              onClick={() => setSerif(isSerif)}
              aria-pressed={serif === isSerif}
              className={`min-h-8 rounded-full px-3 transition ${serif === isSerif ? "bg-[var(--s-accent)] text-[var(--s-on)]" : "opacity-70"}`}
            >
              {isSerif ? "Serif" : "Sans"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setNight((n) => !n)}
          aria-pressed={night}
          className="ml-auto inline-flex min-h-8 items-center gap-2 rounded-full border border-current/20 px-3 transition hover:border-[var(--s-accent)]"
        >
          {night ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}{" "}
          {night ? "Paper" : "Night"}
        </button>
      </div>
      <div
        className="mx-auto max-w-xl space-y-5 px-6 py-10 leading-[1.85] @3xl:py-14"
        style={{ fontSize: size, fontFamily: serif ? "var(--s-display)" : "var(--s-body)" }}
      >
        <p className="first-letter:float-left first-letter:mr-3 first-letter:text-[3.4em] first-letter:leading-[0.8] first-letter:text-[var(--s-accent)]">
          {excerpt[0]}
        </p>
        {excerpt.slice(1, 3).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}

function Invite() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.current?.value.trim()) {
      setError("Please add your name.");
      return name.current?.focus();
    }
    if (!/^\S+@\S+\.\S+$/.test(email.current?.value.trim() ?? "")) {
      setError("Please enter a valid email address.");
      return email.current?.focus();
    }
    setError("");
    setDone(true);
  };
  const field =
    "mt-2 min-h-12 w-full rounded-2xl border border-[var(--s-border)] bg-[var(--s-bg)] px-4 text-sm text-[var(--s-fg)] outline-none transition focus:border-[var(--s-accent)]";
  if (done) {
    return (
      <div
        className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-bg)] p-10 text-center"
        role="status"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-on)]">
          <Check size={26} aria-hidden="true" />
        </span>
        <p className="mt-4 text-3xl [font-family:var(--s-display)]">Thank you.</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--s-muted)]">
          Website concept: on a real site this message would reach the author&rsquo;s inbox.
        </p>
      </div>
    );
  }
  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid gap-4 rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-bg)] p-7 @3xl:grid-cols-2 @3xl:p-10"
    >
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--s-muted)]">
        Your name
        <input ref={name} className={field} autoComplete="name" />
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--s-muted)]">
        Email
        <input ref={email} type="email" className={field} autoComplete="email" />
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--s-muted)]">
        Event type
        <select className={field} defaultValue="Festival">
          {["Festival", "Library", "University", "Book club", "Bookshop"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--s-muted)]">
        Preferred date
        <input type="date" className={field} />
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--s-muted)] @3xl:col-span-2">
        A few words
        <textarea rows={3} className={`${field} py-3`} />
      </label>
      {error && (
        <p
          role="alert"
          className="text-xs text-[color-mix(in_oklab,#ff5d5d_70%,var(--s-fg))] @3xl:col-span-2"
        >
          {error}
        </p>
      )}
      <Btn type="submit" className="@3xl:col-span-2 @3xl:justify-self-start">
        Send the invitation
      </Btn>
    </form>
  );
}

export function LiteraryWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const [openQ, setOpenQ] = useState<number | null>(0);
  const list = essays.filter((e) => tag === "All" || e.tag === tag);

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Literary fiction & essays"
        links={[
          ["essays", "Essays"],
          ["poem", "Poem"],
          ["room", "Reading room"],
          ["invite", "Invite me"],
        ]}
        cta="The novel"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--s-fg)]/30 text-xl italic [font-family:var(--s-display)]">
            S
          </span>
        }
      />

      {/* Hero */}
      <section className="px-5 pb-16 pt-14 @3xl:px-10 @3xl:pb-24 @3xl:pt-24">
        <Wrap className="grid items-center gap-14 @3xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow className="text-[var(--s-accent)]">A novel in fragments</Eyebrow>
            <Display
              as="h1"
              className="mt-6 text-[clamp(3rem,11cqi,8rem)] font-normal leading-[0.92] tracking-[-0.02em]"
            >
              Dust <span className="italic text-[var(--s-accent)]">and</span> Jasmine
            </Display>
            <p className="mt-8 max-w-lg text-lg leading-9 text-[var(--s-muted)]">
              Three generations, one blue bowl, and the smell of a house that no longer exists. A
              quiet, exact book about what we carry when we cannot carry anything.
            </p>
            <div className="mt-9 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read the opening
              </Btn>
              <Btn variant="outline" onClick={() => jump(ID, "essays")}>
                Browse the essays
              </Btn>
            </div>
          </div>
          <Book3D cover={COVER} title={TITLE} width={250} float={false} className="my-6" />
        </Wrap>
      </section>

      {/* Essays */}
      <Section site={ID} id="essays" className="bg-[var(--s-bg2)]">
        <Wrap>
          <div className="flex flex-col gap-6 @3xl:flex-row @3xl:items-end @3xl:justify-between">
            <div>
              <Eyebrow>The archive</Eyebrow>
              <Display className="mt-4 text-4xl font-normal @3xl:text-6xl">Essays, slowly</Display>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter essays">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  aria-pressed={tag === t}
                  className={`min-h-10 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.14em] transition ${tag === t ? "border-[var(--s-fg)] bg-[var(--s-fg)] text-[var(--s-bg)]" : "border-[var(--s-border)] hover:border-[var(--s-fg)]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ul className="mt-10 divide-y divide-[var(--s-border)] border-y border-[var(--s-border)]">
            {list.map((e, i) => (
              <li
                key={e.title}
                className="group flex items-baseline gap-5 py-6 transition-colors hover:text-[var(--s-accent)] @3xl:gap-8"
              >
                <span className="w-8 text-sm tabular-nums text-[var(--s-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-2xl leading-snug transition-transform duration-300 [font-family:var(--s-display)] group-hover:translate-x-2 @3xl:text-3xl">
                  {e.title}
                </span>
                <span className="hidden text-xs uppercase tracking-[0.18em] text-[var(--s-muted)] @sm:block">
                  {e.tag}
                </span>
                <span className="text-xs tabular-nums text-[var(--s-muted)]">{e.min} min</span>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      <Section site={ID} id="poem">
        <Wrap className="grid items-center gap-10 @3xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Poetry</Eyebrow>
            <Display className="mt-4 text-4xl font-normal @3xl:text-6xl">
              Hear it, line by line
            </Display>
            <p className="mt-5 max-w-sm text-base leading-8 text-[var(--s-muted)]">
              Readers follow the words as they are spoken. A small touch that makes a poem feel like
              an event.
            </p>
          </div>
          <PoemPlayer />
        </Wrap>
      </Section>

      <Section site={ID} id="room" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>The reading room</Eyebrow>
          <Display className="mt-4 max-w-2xl text-4xl font-normal @3xl:text-6xl">
            Make the page yours
          </Display>
          <div className="mt-10">
            <ReadingRoom />
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="club">
        <Wrap className="grid gap-10 @3xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>For book clubs</Eyebrow>
            <Display className="mt-4 text-4xl font-normal @3xl:text-6xl">
              Questions to argue about
            </Display>
          </div>
          <div className="divide-y divide-[var(--s-border)] border-y border-[var(--s-border)]">
            {questions.map((item, i) => {
              const open = openQ === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenQ(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-5 py-5 text-left"
                  >
                    <span className="text-xl leading-snug [font-family:var(--s-display)] @3xl:text-2xl">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`mt-1 shrink-0 text-[var(--s-accent)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <p
                    className={`overflow-hidden text-sm leading-7 text-[var(--s-muted)] transition-all duration-500 ${open ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {item.a}
                  </p>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="invite" className="bg-[var(--s-bg2)]">
        <Wrap>
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Speaking & events</Eyebrow>
            <Display className="mt-4 text-4xl font-normal @3xl:text-6xl">Invite the author</Display>
            <p className="mt-4 text-base leading-8 text-[var(--s-muted)]">
              For festivals, libraries, universities and reading groups.
            </p>
          </div>
          <Invite />
        </Wrap>
      </Section>

      <Section site={ID} id="letters">
        <Wrap>
          <Signup
            title="Letters, now and then"
            text="A short note when a new essay is published. No schedule, no noise."
            cta="Subscribe"
          />
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Literary author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="Dust and Jasmine"
        author={AUTHOR}
        chapter="Opening"
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
