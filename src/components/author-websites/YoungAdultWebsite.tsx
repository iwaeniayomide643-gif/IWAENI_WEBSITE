import "@fontsource-variable/bricolage-grotesque/index.css";
import { useState, type CSSProperties } from "react";
import { BookOpen, Check, Copy, RotateCcw, Sparkles } from "lucide-react";
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

const ID = "ya";
const COVER = "/images/covers/the-clockwork-kingdom.svg";
const AUTHOR = "Beatrix Sterling";
const TITLE = "The Clockwork Kingdom";

const theme: Theme = {
  bg: "#120f2b",
  bg2: "#1b1646",
  fg: "#fbf3ff",
  muted: "#b9acd9",
  accent: "#f472b6",
  accent2: "#c084fc",
  card: "rgba(255,255,255,0.06)",
  border: "rgba(244,114,182,0.28)",
  on: "#2a0a1d",
  display: "'Bricolage Grotesque Variable', 'DM Sans Variable', system-ui, sans-serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const excerpt = [
  "The night the clock tower stopped, every bell in Cogsworth Academy rang at once, and Wren Calloway, who was not supposed to be on the roof, heard them from the best seat in the kingdom.",
  "Below her, three hundred students poured into the courtyard in their nightclothes. Above her, the great brass hands of the tower hung at a minute that did not exist.",
  "“Thirteen past twelve,” whispered a voice in her pocket, and Wren nearly fell off the roof. The pocket watch she had found that morning was talking.",
];

const guilds = [
  {
    name: "The Cogwrights",
    color: "#fbbf24",
    trait: "Makers and menders",
    text: "You solve problems with your hands first and your words second. When something breaks, you are already reaching for the right tool.",
  },
  {
    name: "The Aetherborn",
    color: "#60a5fa",
    trait: "Listeners and wanderers",
    text: "You notice what everyone else walks past. Your best ideas arrive sideways, usually from a rooftop.",
  },
  {
    name: "The Gearwardens",
    color: "#f472b6",
    trait: "Protectors and planners",
    text: "You are the person people look for in a crisis. Loyal, steady, and secretly the one who holds the whole plan together.",
  },
  {
    name: "The Chronists",
    color: "#c084fc",
    trait: "Keepers of secrets",
    text: "You collect stories, dates and half-hidden clues. You always know how something began, which is exactly why you can see where it is going.",
  },
] as const;

const questions = [
  {
    q: "The great clock tower stops at midnight. You...",
    a: [
      "Climb up and fix it",
      "Listen for what the silence is saying",
      "Gather everyone below and make a plan",
      "Check what the last minute looked like",
    ],
  },
  {
    q: "Your best friend is in trouble. First move?",
    a: [
      "Build something that helps",
      "Slip in by a side door",
      "Stand right in front of them",
      "Find out how it all started",
    ],
  },
  {
    q: "Favourite place in the Academy?",
    a: ["The workshop", "The rooftop", "The great hall", "The archive"],
  },
  {
    q: "Pick a tool for the journey.",
    a: ["A spanner", "A compass", "A shield", "A pocket watch"],
  },
  {
    q: "What would you never give up?",
    a: ["My hands", "My curiosity", "My promises", "My memories"],
  },
] as const;

const perks = [
  {
    n: "01",
    t: "Clockwork magic",
    d: "Every spell in the kingdom runs on gears, springs and borrowed minutes.",
  },
  { n: "02", t: "Four guilds", d: "Pick a side, or find out the side picked you." },
  {
    n: "03",
    t: "A talking watch",
    d: "It knows something about the thirteenth hour. It will not say what.",
  },
] as const;

function Gear({
  size,
  teeth = 12,
  className,
  style,
}: {
  size: number;
  teeth?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <circle r="30" />
        {Array.from({ length: teeth }).map((_, i) => (
          <rect
            key={i}
            x="-4"
            y="-42"
            width="8"
            height="13"
            rx="2"
            transform={`rotate(${(360 / teeth) * i})`}
          />
        ))}
      </g>
      <circle r="13" fill="var(--s-bg)" />
      <circle r="5" fill="currentColor" />
    </svg>
  );
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState<number[]>([0, 0, 0, 0]);
  const [copied, setCopied] = useState(false);
  const done = step >= questions.length;
  const winner = tally.indexOf(Math.max(...tally));
  const guild = guilds[winner] ?? guilds[0];
  const current = questions[Math.min(step, questions.length - 1)] ?? questions[0];

  const pick = (index: number) => {
    setTally((t) => t.map((v, i) => (i === index ? v + 1 : v)));
    setStep((s) => s + 1);
  };
  const restart = () => {
    setStep(0);
    setTally([0, 0, 0, 0]);
    setCopied(false);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `I was sorted into ${guild.name} at Cogsworth Academy. Which guild are you?`,
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-6 @3xl:p-10">
      {!done ? (
        <div key={step} className="animate-in fade-in-0 slide-in-from-right-3 duration-500">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[var(--s-muted)]">
            <span>
              Question {step + 1} of {questions.length}
            </span>
            <span className="flex gap-1.5" aria-hidden="true">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-colors duration-500 ${i <= step ? "bg-[var(--s-accent)]" : "bg-white/15"}`}
                />
              ))}
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-bold leading-tight [font-family:var(--s-display)] @3xl:text-4xl">
            {current.q}
          </h3>
          <div className="mt-7 grid gap-3 @sm:grid-cols-2">
            {current.a.map((text, i) => (
              <button
                key={text}
                type="button"
                onClick={() => pick(i)}
                className="group flex min-h-16 items-center gap-4 rounded-2xl border border-[var(--s-border)] bg-[var(--s-bg)]/60 px-5 text-left text-sm font-medium transition duration-300 hover:-translate-y-1 hover:border-[var(--s-accent)] hover:bg-[var(--s-accent)]/10 active:scale-[0.98]"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold transition group-hover:bg-[var(--s-accent)] group-hover:text-[var(--s-on)]">
                  {"ABCD"[i]}
                </span>
                {text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in-0 zoom-in-95 duration-500 text-center" role="status">
          <span
            className="mx-auto grid size-20 place-items-center rounded-full"
            style={{ background: `${guild.color}22`, color: guild.color }}
          >
            <Gear size={48} className="[animation:s-spin_14s_linear_infinite]" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--s-muted)]">
            You belong to
          </p>
          <h3
            className="mt-2 text-4xl font-extrabold [font-family:var(--s-display)] @3xl:text-6xl"
            style={{ color: guild.color }}
          >
            {guild.name}
          </h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--s-accent2)]">
            {guild.trait}
          </p>
          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-[var(--s-muted)]">
            {guild.text}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 @sm:flex-row">
            <Btn onClick={copy}>
              {copied ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}{" "}
              {copied ? "Copied" : "Copy my result"}
            </Btn>
            <Btn variant="outline" onClick={restart}>
              <RotateCcw size={16} aria-hidden="true" /> Take it again
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}

function Claim() {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "error" | "ok">("idle");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(code.trim().length >= 6 ? "ok" : "error");
      }}
      className="mx-auto max-w-xl rounded-[2rem] border border-dashed border-[var(--s-accent)]/60 bg-[var(--s-card)] p-7 text-center @3xl:p-10"
    >
      <Sparkles size={28} className="mx-auto text-[var(--s-accent)]" aria-hidden="true" />
      <h3 className="mt-4 text-3xl font-bold [font-family:var(--s-display)]">
        Claim your pre-order goodies
      </h3>
      <p className="mt-2 text-sm leading-7 text-[var(--s-muted)]">
        Enter the order number from your receipt to unlock the bonus.
      </p>
      <label htmlFor="ya-order" className="sr-only">
        Order number
      </label>
      <input
        id="ya-order"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setState("idle");
        }}
        placeholder="Order number"
        aria-invalid={state === "error"}
        className="mt-6 min-h-12 w-full rounded-full border border-[var(--s-border)] bg-[var(--s-bg)]/70 px-5 text-center text-sm text-[var(--s-fg)] outline-none transition placeholder:text-[var(--s-muted)] focus:border-[var(--s-accent)]"
      />
      {state === "error" && (
        <p role="alert" className="mt-2 text-xs text-[color-mix(in_oklab,#ff5d5d_70%,var(--s-fg))]">
          That looks too short. Check the order number on your receipt.
        </p>
      )}
      <Btn type="submit" className="mt-4 w-full @sm:w-auto">
        Unlock the bonus
      </Btn>
      <p role="status" className="mt-4 min-h-5 text-xs text-[var(--s-muted)]">
        {state === "ok"
          ? "Website concept: on a real site the order would be checked and the bonus content unlocked here."
          : ""}
      </p>
    </form>
  );
}

export function YoungAdultWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Young adult fantasy"
        links={[
          ["quiz", "Guild quiz"],
          ["academy", "The Academy"],
          ["claim", "Pre-order"],
          ["join", "Join"],
        ]}
        cta="Pre-order"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--s-accent)]/15 text-[var(--s-accent)]">
            <Gear size={26} className="[animation:s-spin_12s_linear_infinite]" />
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
              "radial-gradient(50% 55% at 80% 35%, rgba(244,114,182,0.30), transparent 70%), radial-gradient(45% 50% at 5% 90%, rgba(192,132,252,0.26), transparent 70%)",
          }}
        />
        <Gear
          size={340}
          teeth={14}
          className="absolute -left-24 top-28 text-[var(--s-accent2)]/15 [animation:s-spin_60s_linear_infinite]"
        />
        <Gear
          size={220}
          teeth={10}
          className="absolute -right-10 bottom-0 text-[var(--s-accent)]/15 [animation:s-spin-rev_44s_linear_infinite]"
        />
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--s-accent)]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--s-accent)]">
              <Sparkles size={13} aria-hidden="true" /> Book one of the Cogsworth series
            </p>
            <Display
              as="h1"
              className="mt-6 text-[clamp(2.5rem,8.4cqi,5.8rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
            >
              The clock stopped at{" "}
              <span className="bg-gradient-to-r from-[var(--s-accent)] to-[var(--s-accent2)] bg-clip-text text-transparent">
                13:13.
              </span>
            </Display>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--s-muted)] @3xl:text-lg">
              Wren Calloway found a pocket watch that talks, an academy powered by borrowed time,
              and a minute that should not exist. Which guild would you have joined?
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => jump(ID, "quiz")}>
                <Sparkles size={16} aria-hidden="true" /> Find your guild
              </Btn>
              <Btn variant="outline" onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read chapter one
              </Btn>
            </div>
          </div>
          <Book3D cover={COVER} title={TITLE} width={250} className="my-8" />
        </Wrap>
      </section>

      <Section site={ID} id="quiz" className="bg-[var(--s-bg2)]">
        <Wrap>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Eyebrow>Guild sorting</Eyebrow>
            <Display className="mt-4 text-4xl font-extrabold @3xl:text-6xl">
              Which guild is yours?
            </Display>
            <p className="mt-4 text-base text-[var(--s-muted)]">
              Five questions. No wrong answers. Share your result with your friends.
            </p>
          </div>
          <Quiz />
        </Wrap>
      </Section>

      <Section site={ID} id="academy">
        <Wrap>
          <Eyebrow>Welcome to Cogsworth</Eyebrow>
          <Display className="mt-4 text-4xl font-extrabold @3xl:text-6xl">
            Three reasons to step inside
          </Display>
          <div className="mt-10 grid gap-4 @3xl:grid-cols-3">
            {perks.map((p) => (
              <div
                key={p.n}
                className="group rounded-3xl border border-[var(--s-border)] bg-[var(--s-card)] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--s-accent)]"
              >
                <span className="text-5xl font-extrabold text-[var(--s-accent)]/40 transition group-hover:text-[var(--s-accent)] [font-family:var(--s-display)]">
                  {p.n}
                </span>
                <p className="mt-4 text-2xl font-bold [font-family:var(--s-display)]">{p.t}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--s-muted)]">{p.d}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="claim" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Claim />
        </Wrap>
      </Section>

      <Section site={ID} id="join">
        <Wrap>
          <Signup
            title="Join the guild newsletter"
            text="Sneak peeks, character art, and the first look at book two."
            cta="Count me in"
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
          <Display className="mt-3 text-3xl font-extrabold @3xl:text-5xl">{AUTHOR}</Display>
          <p className="mt-5 text-base leading-8 text-[var(--s-muted)]">
            Beatrix writes fast, funny, heart-first fantasy for readers who like their magic a
            little mechanical. She keeps a broken clock on her desk &ldquo;for luck.&rdquo;
          </p>
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Young adult author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="Thirteen Past Twelve"
        author={AUTHOR}
        chapter="Chapter one"
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
