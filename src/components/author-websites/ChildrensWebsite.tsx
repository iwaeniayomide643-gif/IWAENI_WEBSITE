import "@fontsource-variable/fredoka/index.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Cloud,
  Download,
  Flame,
  Mountain,
  RotateCcw,
  Sparkles,
  Star,
  Wind,
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

const ID = "kids";
const COVER = "/images/covers/the-dragon-who-lost-his-spark.svg";
const AUTHOR = "Amara & Leo Fox";
const TITLE = "The Dragon Who Lost His Spark";

const theme: Theme = {
  bg: "#fff6e4",
  bg2: "#ffe9c2",
  fg: "#2b2150",
  muted: "#6c5f8f",
  accent: "#f59e0b",
  accent2: "#ef4f7b",
  card: "rgba(255,255,255,0.7)",
  border: "rgba(43,33,80,0.16)",
  on: "#2b1a02",
  display: "'Fredoka Variable', 'DM Sans Variable', system-ui, sans-serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const excerpt = [
  "Deep in the Meadow Mountains lived a small dragon named Ember, who could light up the whole valley with one sneeze.",
  "Every evening, the animals would gather on the hill. “Sneeze, Ember, sneeze!” they would cheer, and Ember would take a deep breath, scrunch up his nose, and — ACHOO! — the sky filled with golden sparks.",
  "But one windy morning, Ember sneezed, and nothing happened. Not a spark. Not even a puff of smoke.",
];

const pages = [
  {
    icon: Flame,
    bg: "from-[#ffcf70] to-[#ff9a5c]",
    text: "Deep in the Meadow Mountains lived a small dragon named Ember, who could light up the whole valley with one sneeze.",
  },
  {
    icon: Wind,
    bg: "from-[#9edcff] to-[#6fb7f5]",
    text: "But one windy morning, Ember sneezed, and nothing happened. Not a spark. Not even a puff of smoke.",
  },
  {
    icon: Mountain,
    bg: "from-[#c9b6ff] to-[#8f7bea]",
    text: "He asked the owl, the river and the sleepy old mountain where his spark had gone. “Look where you last felt brave,” rumbled the mountain.",
  },
  {
    icon: Sparkles,
    bg: "from-[#ffe58a] to-[#ffb347]",
    text: "So Ember thought, and then he did something brave. He laughed at himself. And POOF! A little golden spark came back.",
  },
] as const;

const guide = [
  {
    q: "How did Ember feel when his spark went missing?",
    a: "Invite children to name the feeling and say when they have felt it too.",
  },
  {
    q: "Who did Ember ask for help?",
    a: "Talk about why asking for help can be brave, and who we can ask.",
  },
  {
    q: "What brought the spark back?",
    a: "Laughing at ourselves can make a hard moment lighter. What helps your class?",
  },
];

const DRAGON = `<g fill="#fff" stroke="#2b2150" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
<path d="M96 196 C 62 206 36 192 22 162 C 44 166 58 160 66 146 C 76 168 90 176 108 178 Z"/>
<path d="M150 150 L 186 82 L 214 146 Z"/>
<ellipse cx="190" cy="190" rx="92" ry="58"/>
<path d="M150 150 L 162 128 L 174 150 M 190 142 L 204 118 L 218 142 M 230 150 L 244 128 L 256 154"/>
<rect x="144" y="226" width="34" height="42" rx="16"/>
<rect x="206" y="226" width="34" height="42" rx="16"/>
<circle cx="288" cy="144" r="46"/>
<path d="M262 106 L 258 74 L 284 98 M 304 98 L 326 72 L 330 108"/>
<circle cx="302" cy="134" r="6" fill="#2b2150"/>
<path d="M286 164 C 300 178 322 176 332 162" fill="none"/>
<path d="M200 190 C 224 176 248 180 262 192" fill="none"/>
</g>
<g fill="#ffd23f" stroke="#2b2150" stroke-width="4" stroke-linejoin="round">
<path d="M352 188 L 360 206 L 380 208 L 365 221 L 370 241 L 352 230 L 334 241 L 339 221 L 324 208 L 344 206 Z"/>
</g>`;

function Dragon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 290"
      className={className}
      role="img"
      aria-label="Outline of a friendly dragon to colour in"
      dangerouslySetInnerHTML={{ __html: DRAGON }}
    />
  );
}

function downloadColouring() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 290" width="1200" height="870"><rect width="400" height="290" fill="#fff"/>${DRAGON}</svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const link = Object.assign(document.createElement("a"), {
    href: url,
    download: "ember-the-dragon-colouring-page.svg",
  });
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function Storytime() {
  const [page, setPage] = useState(0);
  const current = pages[page] ?? pages[0];
  const Icon = current.icon;
  const last = page === pages.length - 1;
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border-4 border-[var(--s-fg)] bg-[var(--s-bg)] shadow-[10px_10px_0_0_var(--s-fg)]">
      <div className="grid @3xl:grid-cols-2">
        <div
          key={`art-${page}`}
          className={`relative grid min-h-64 place-items-center overflow-hidden bg-gradient-to-br ${current.bg} animate-in fade-in-0 zoom-in-95 duration-500`}
        >
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 size-10 rounded-full bg-white/50 [animation:s-bob_5s_ease-in-out_infinite]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-8 right-8 size-16 rounded-full bg-white/40 [animation:s-bob_6s_ease-in-out_infinite_1s]"
          />
          <span
            aria-hidden="true"
            className="absolute right-12 top-10 size-5 rounded-full bg-white/70 [animation:s-twinkle_3s_ease-in-out_infinite]"
          />
          <span className="grid size-36 place-items-center rounded-full bg-white/80 text-[var(--s-fg)] shadow-[0_20px_40px_-15px_rgba(43,33,80,0.5)] [animation:s-bob_4s_ease-in-out_infinite]">
            <Icon size={72} aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-col justify-between gap-8 p-7 @3xl:p-10">
          <div
            key={`text-${page}`}
            className="animate-in fade-in-0 slide-in-from-right-3 duration-500"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--s-accent2)]">
              Page {page + 1} of {pages.length}
            </p>
            <p
              className="mt-4 text-2xl leading-[1.45] [font-family:var(--s-display)] @3xl:text-[1.7rem]"
              aria-live="polite"
            >
              {current.text}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Btn
              variant="outline"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="disabled:opacity-40"
              aria-label="Previous page"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </Btn>
            <span className="flex gap-1.5" aria-hidden="true">
              {pages.map((_, i) => (
                <span
                  key={i}
                  className={`size-2.5 rounded-full transition-all ${i === page ? "w-7 bg-[var(--s-accent2)]" : "bg-[var(--s-fg)]/20"}`}
                />
              ))}
            </span>
            <Btn onClick={() => (last ? setPage(0) : setPage((p) => p + 1))}>
              {last ? <RotateCcw size={16} aria-hidden="true" /> : null}{" "}
              {last ? "Read again" : "Next"}{" "}
              {last ? null : <ArrowRight size={16} aria-hidden="true" />}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

const COLS = 4;

function FindSpark() {
  const [spark, setSpark] = useState(0);
  const [tried, setTried] = useState<number[]>([]);
  const [hint, setHint] = useState("The spark is hiding behind one cloud. Tap to look!");
  const found = tried.includes(spark);

  const reset = () => {
    setSpark(Math.floor(Math.random() * 12));
    setTried([]);
    setHint("The spark is hiding behind one cloud. Tap to look!");
  };
  useEffect(reset, []);

  const look = (i: number) => {
    if (found || tried.includes(i)) return;
    setTried((t) => [...t, i]);
    if (i === spark)
      return setHint(
        `You found it in ${tried.length + 1} ${tried.length === 0 ? "try" : "tries"}! Hooray!`,
      );
    const dist =
      Math.abs((i % COLS) - (spark % COLS)) +
      Math.abs(Math.floor(i / COLS) - Math.floor(spark / COLS));
    setHint(
      dist <= 1
        ? "So warm! The spark is right next to that cloud."
        : dist <= 2
          ? "Getting warmer..."
          : "Brrr, that one is cold. Try somewhere else.",
    );
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2.5rem] border-4 border-[var(--s-fg)] bg-[var(--s-bg)] p-6 shadow-[10px_10px_0_0_var(--s-fg)] @3xl:p-8">
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => {
          const open = tried.includes(i);
          const isSpark = i === spark;
          return (
            <button
              key={i}
              type="button"
              onClick={() => look(i)}
              disabled={found && !open}
              aria-label={open ? (isSpark ? "The spark!" : "Empty cloud") : `Cloud ${i + 1}`}
              className={`grid aspect-square place-items-center rounded-2xl border-2 border-[var(--s-fg)] transition duration-300 active:scale-90 ${open ? (isSpark ? "scale-110 bg-[var(--s-accent)]" : "bg-[var(--s-bg2)]") : "bg-white hover:-translate-y-1 hover:bg-[#e6f4ff]"}`}
            >
              {open ? (
                isSpark ? (
                  <Star
                    size={30}
                    fill="currentColor"
                    className="animate-in zoom-in-50 duration-300"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="text-xs font-bold text-[var(--s-muted)]">no</span>
                )
              ) : (
                <Cloud size={30} className="text-[#6fb7f5]" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
      <p
        role="status"
        className="mt-6 min-h-14 text-center text-lg font-medium [font-family:var(--s-display)]"
      >
        {hint}
      </p>
      <div className="flex justify-center">
        <Btn variant="outline" onClick={reset}>
          <RotateCcw size={16} aria-hidden="true" />{" "}
          {found ? "Play again" : "Hide it somewhere new"}
        </Btn>
      </div>
    </div>
  );
}

function Visit() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const school = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!school.current?.value.trim()) {
      setError("Please add the name of your school or library.");
      return school.current?.focus();
    }
    if (!/^\S+@\S+\.\S+$/.test(email.current?.value.trim() ?? "")) {
      setError("Please enter a valid email address.");
      return email.current?.focus();
    }
    setError("");
    setDone(true);
  };
  const field =
    "mt-2 min-h-12 w-full rounded-2xl border-2 border-[var(--s-fg)]/25 bg-white px-4 text-sm font-normal normal-case tracking-normal text-[var(--s-fg)] outline-none transition focus:border-[var(--s-accent2)]";
  if (done) {
    return (
      <div
        className="rounded-[2rem] border-2 border-[var(--s-fg)] bg-white p-9 text-center"
        role="status"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-on)]">
          <Check size={26} aria-hidden="true" />
        </span>
        <p className="mt-4 text-2xl font-semibold [font-family:var(--s-display)]">Thank you!</p>
        <p className="mt-2 text-sm text-[var(--s-muted)]">
          Website concept: on a real site this request would reach the authors.
        </p>
      </div>
    );
  }
  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid gap-4 rounded-[2rem] border-2 border-[var(--s-fg)] bg-[var(--s-bg)] p-6 @3xl:p-8"
    >
      <label className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--s-muted)]">
        School or library
        <input ref={school} className={field} />
      </label>
      <label className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--s-muted)]">
        Email
        <input ref={email} type="email" className={field} autoComplete="email" />
      </label>
      <label className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--s-muted)]">
        Age group
        <select className={field} defaultValue="Ages 4 to 6">
          {["Ages 3 to 4", "Ages 4 to 6", "Ages 6 to 8", "Mixed ages"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      {error && (
        <p role="alert" className="text-xs text-[color-mix(in_oklab,#ff5d5d_70%,var(--s-fg))]">
          {error}
        </p>
      )}
      <Btn type="submit">Ask about a visit</Btn>
    </form>
  );
}

export function ChildrensWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [openQ, setOpenQ] = useState<number | null>(0);

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Picture books"
        links={[
          ["story", "Storytime"],
          ["game", "Play"],
          ["colour", "Colouring"],
          ["teachers", "Teachers"],
        ]}
        cta="Get the book"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-[var(--s-fg)] bg-[var(--s-accent)] text-[var(--s-on)]">
            <Flame size={19} aria-hidden="true" />
          </span>
        }
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-12 @3xl:px-10 @3xl:pb-28 @3xl:pt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 82% 40%, rgba(245,158,11,0.35), transparent 70%), radial-gradient(40% 50% at 0% 100%, rgba(239,79,123,0.2), transparent 70%)",
          }}
        />
        {[
          "left-[6%] top-[14%] size-6 bg-[var(--s-accent2)] [animation:s-bob_5s_ease-in-out_infinite]",
          "left-[44%] top-[8%] size-4 bg-[var(--s-accent)] [animation:s-bob_6s_ease-in-out_infinite]",
          "right-[8%] bottom-[12%] size-8 bg-[#6fb7f5] [animation:s-bob_7s_ease-in-out_infinite]",
        ].map((cls) => (
          <span
            key={cls}
            aria-hidden="true"
            className={`absolute rounded-full opacity-70 ${cls}`}
          />
        ))}
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--s-fg)] bg-[var(--s-accent)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--s-on)]">
              <Star size={13} fill="currentColor" aria-hidden="true" /> A picture book for ages 3 to
              7
            </p>
            <Display
              as="h1"
              className="mt-6 text-[clamp(2.4rem,8.2cqi,5.6rem)] font-bold leading-[1] tracking-[-0.02em]"
            >
              The Dragon Who Lost His <span className="text-[var(--s-accent2)]">Spark</span>
            </Display>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--s-muted)]">
              Ember can light up a whole valley with one sneeze. So what happens on the morning
              nothing comes out? A warm, funny story about bravery and laughing at ourselves.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => jump(ID, "story")}>Start the story</Btn>
              <Btn variant="outline" onClick={() => jump(ID, "game")}>
                Find the spark
              </Btn>
            </div>
          </div>
          <Book3D cover={COVER} title={TITLE} width={240} className="my-8" />
        </Wrap>
      </section>

      <Section site={ID} id="story" className="bg-[var(--s-bg2)]">
        <Wrap>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Eyebrow className="text-[var(--s-accent2)]">Storytime</Eyebrow>
            <Display className="mt-3 text-4xl font-bold @3xl:text-6xl">Turn the pages</Display>
          </div>
          <Storytime />
          <p className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setReading(true)}
              className="text-sm font-semibold underline decoration-[var(--s-accent2)] decoration-2 underline-offset-4 hover:text-[var(--s-accent2)]"
            >
              Open the read-aloud version
            </button>
          </p>
        </Wrap>
      </Section>

      <Section site={ID} id="game">
        <Wrap>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Eyebrow className="text-[var(--s-accent2)]">A little game</Eyebrow>
            <Display className="mt-3 text-4xl font-bold @3xl:text-6xl">
              Where is Ember&rsquo;s spark?
            </Display>
          </div>
          <FindSpark />
        </Wrap>
      </Section>

      <Section site={ID} id="colour" className="bg-[var(--s-bg2)]">
        <Wrap className="grid items-center gap-10 @3xl:grid-cols-2">
          <div className="rounded-[2.5rem] border-4 border-[var(--s-fg)] bg-white p-6 shadow-[10px_10px_0_0_var(--s-fg)]">
            <Dragon className="h-auto w-full" />
          </div>
          <div>
            <Eyebrow className="text-[var(--s-accent2)]">Free activity</Eyebrow>
            <Display className="mt-3 text-4xl font-bold @3xl:text-6xl">Colour in Ember</Display>
            <p className="mt-4 max-w-md text-lg leading-8 text-[var(--s-muted)]">
              Download the colouring page, print it, and give Ember the brightest scales you can
              find.
            </p>
            <Btn className="mt-7" onClick={downloadColouring}>
              <Download size={16} aria-hidden="true" /> Download colouring page
            </Btn>
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="teachers">
        <Wrap className="grid gap-10 @3xl:grid-cols-2">
          <div>
            <Eyebrow className="text-[var(--s-accent2)]">For teachers and librarians</Eyebrow>
            <Display className="mt-3 text-4xl font-bold @3xl:text-5xl">
              Questions for story circle
            </Display>
            <div className="mt-8 space-y-3">
              {guide.map((g, i) => {
                const open = openQ === i;
                return (
                  <div key={g.q} className="rounded-2xl border-2 border-[var(--s-fg)]/25 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenQ(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold"
                    >
                      {g.q}
                      <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    <p
                      className={`overflow-hidden px-5 text-sm leading-7 text-[var(--s-muted)] transition-all duration-500 ${open ? "max-h-32 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {g.a}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <Eyebrow className="text-[var(--s-accent2)]">Author visits</Eyebrow>
            <Display className="mb-6 mt-3 text-4xl font-bold @3xl:text-5xl">
              Invite us to your class
            </Display>
            <Visit />
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="club" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Signup
            title="Join the Storytime Club"
            text="Free activity pages, new stories, and a little note from Ember. For grown-ups to sign up."
            cta="Join the club"
          />
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Children's book author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="The Dragon Who Lost His Spark"
        author={AUTHOR}
        chapter="Read-aloud"
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
