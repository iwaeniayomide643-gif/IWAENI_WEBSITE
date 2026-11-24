import "@fontsource-variable/manrope/index.css";
import { useEffect, useState, type FormEvent } from "react";
import {
  BookOpen,
  Check,
  ClipboardCheck,
  Download,
  Mic,
  Package,
  Rocket,
  Target,
  TrendingUp,
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

const ID = "business";
const COVER = "/images/covers/zero-to-market.svg";
const AUTHOR = "Marcos Valdés";
const TITLE = "Zero to Market";

const theme: Theme = {
  bg: "#080c15",
  bg2: "#0f1626",
  fg: "#eef4fb",
  muted: "#93a4bd",
  accent: "#38bdf8",
  accent2: "#f59e0b",
  card: "rgba(56,189,248,0.06)",
  border: "rgba(56,189,248,0.22)",
  on: "#04121c",
  display: "'Manrope Variable', 'DM Sans Variable', system-ui, sans-serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const excerpt = [
  "Most products do not fail because they are bad. They fail because nobody could say, in one sentence, who they were for.",
  "Before you build a single feature, write down the person you are building for: what they do on a Monday morning, what annoys them by Tuesday, and what they would pay to never think about again.",
  "If that person is “everyone,” you do not have a market. You have a hope.",
];

const stages = [
  {
    name: "Validate",
    icon: Target,
    points: [
      "Describe your customer in one sentence",
      "Talk to ten real people before you build",
      "Write down the problem in their words, not yours",
    ],
  },
  {
    name: "Position",
    icon: TrendingUp,
    points: [
      "Say what you do better than the alternatives",
      "Pick one clear promise",
      "Test your message with strangers",
    ],
  },
  {
    name: "Price",
    icon: ClipboardCheck,
    points: [
      "Know your cost to serve one customer",
      "Anchor on the value, not the effort",
      "Run a price test before you commit",
    ],
  },
  {
    name: "Launch",
    icon: Rocket,
    points: [
      "Choose a single first channel",
      "Set a launch date that cannot slip",
      "Write the day-one checklist",
    ],
  },
  {
    name: "Scale",
    icon: Package,
    points: [
      "Double what already works",
      "Remove what does not",
      "Hire against a bottleneck, not a feeling",
    ],
  },
] as const;

const checks = [
  "I can describe my customer in one sentence.",
  "I have spoken to at least ten potential customers.",
  "I know what my closest alternatives cost.",
  "I have one clear first channel to reach customers.",
  "I can explain why someone should buy now, not later.",
  "I know what it costs me to serve one customer.",
];

const topics = [
  "Finding your first ten customers",
  "Positioning when you are the small player",
  "Pricing without guessing",
  "Why launches fail quietly",
];

function Chart() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setGo(true), 300);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <svg
      viewBox="0 0 400 260"
      className="h-auto w-full"
      role="img"
      aria-label="An upward line, illustrating growth from zero to market"
    >
      <defs>
        <linearGradient id="biz-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[50, 100, 150, 200].map((y) => (
        <line
          key={y}
          x1="0"
          x2="400"
          y1={y}
          y2={y}
          stroke="rgba(147,164,189,0.15)"
          strokeDasharray="4 6"
        />
      ))}
      <path
        d="M10 235 C 70 232, 90 215, 130 200 S 190 170, 230 130 S 320 70, 390 22 L390 250 L10 250 Z"
        fill="url(#biz-fill)"
        opacity={go ? 1 : 0}
        style={{ transition: "opacity 1.4s ease 0.6s" }}
      />
      <path
        d="M10 235 C 70 232, 90 215, 130 200 S 190 170, 230 130 S 320 70, 390 22"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={go ? 0 : 1}
        style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(.3,.7,.2,1)" }}
      />
      {[
        [10, 235, "0"],
        [230, 130, "Launch"],
        [390, 22, "Market"],
      ].map(([x, y, label]) => (
        <g
          key={String(label)}
          style={{ opacity: go ? 1 : 0, transition: "opacity 0.6s ease 1.6s" }}
        >
          <circle cx={x as number} cy={y as number} r="7" fill="#f59e0b" />
          <text
            x={Math.min(Math.max(x as number, 30), 370)}
            y={(y as number) - 16}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#eef4fb"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Scorecard() {
  const [yes, setYes] = useState<boolean[]>(() => checks.map(() => false));
  const score = yes.filter(Boolean).length;
  const result =
    score <= 2
      ? {
          stage: 0,
          title: "Start with validation",
          text: "Before you spend money, talk to people. Stage one will save you the most time.",
        }
      : score <= 4
        ? {
            stage: 1,
            title: "Sharpen your position",
            text: "You have a foundation. Now make your promise clearer than the alternatives.",
          }
        : {
            stage: 3,
            title: "You are close to launch",
            text: "Choose a first channel, set a date, and write the day-one checklist.",
          };

  return (
    <div className="grid gap-6 @3xl:grid-cols-[1.2fr_0.8fr]">
      <ul className="space-y-2.5">
        {checks.map((c, i) => (
          <li key={c}>
            <button
              type="button"
              role="checkbox"
              aria-checked={yes[i]}
              onClick={() => setYes((p) => p.map((v, j) => (j === i ? !v : v)))}
              className={`flex min-h-14 w-full items-center gap-4 rounded-2xl border px-5 text-left text-sm transition duration-300 ${yes[i] ? "border-[var(--s-accent)] bg-[var(--s-accent)]/10" : "border-[var(--s-border)] bg-[var(--s-card)] hover:border-[var(--s-accent)]/60"}`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-md border transition ${yes[i] ? "border-[var(--s-accent)] bg-[var(--s-accent)] text-[var(--s-on)]" : "border-[var(--s-muted)]"}`}
              >
                {yes[i] && <Check size={15} aria-hidden="true" />}
              </span>
              {c}
            </button>
          </li>
        ))}
      </ul>
      <div
        className="flex flex-col justify-between rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-7"
        aria-live="polite"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--s-accent)]">
            Your readiness
          </p>
          <p className="mt-3 text-7xl font-extrabold tabular-nums [font-family:var(--s-display)]">
            {score}
            <span className="text-3xl text-[var(--s-muted)]"> / {checks.length}</span>
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--s-accent)] to-[var(--s-accent2)] transition-all duration-700"
              style={{ width: `${(score / checks.length) * 100}%` }}
            />
          </div>
          <p className="mt-6 text-xl font-bold [font-family:var(--s-display)]">{result.title}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--s-muted)]">{result.text}</p>
        </div>
        <Btn variant="outline" className="mt-6" onClick={() => jump(ID, "stages")}>
          See the {stages[result.stage]?.name ?? "first"} stage
        </Btn>
      </div>
    </div>
  );
}

function downloadCanvas() {
  const rows = [
    ["Section", "Question", "Your answer"],
    ["Customer", "Who exactly is this for, in one sentence?", ""],
    ["Customer", "What do they do on a normal Monday?", ""],
    ["Problem", "What annoys them most, in their own words?", ""],
    ["Promise", "What is the one thing you do better than the alternatives?", ""],
    ["Price", "What does it cost you to serve one customer?", ""],
    ["Price", "What would the customer pay to stop thinking about this?", ""],
    ["Channel", "Where will you find your first ten customers?", ""],
    ["Launch", "What is the date, and what must be true by then?", ""],
  ];
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = Object.assign(document.createElement("a"), {
    href: url,
    download: "go-to-market-canvas.csv",
  });
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function BulkOrder() {
  const [qty, setQty] = useState(50);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "sent">("idle");
  const tier =
    qty < 25
      ? "Team order"
      : qty < 100
        ? "Department order"
        : qty < 250
          ? "Company order"
          : "Enterprise order";
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setState(/^\S+@\S+\.\S+$/.test(email.trim()) ? "sent" : "error");
  };
  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-7 @3xl:p-9"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--s-accent)]">
            {tier}
          </p>
          <p className="mt-1 text-6xl font-extrabold tabular-nums [font-family:var(--s-display)]">
            {qty}
          </p>
          <p className="text-xs text-[var(--s-muted)]">copies</p>
        </div>
        <Package size={44} className="text-[var(--s-accent2)]" aria-hidden="true" />
      </div>
      <label className="mt-6 block">
        <span className="sr-only">Number of copies</span>
        <input
          type="range"
          min={10}
          max={500}
          step={5}
          value={qty}
          onChange={(e) => {
            setQty(Number(e.target.value));
            setState("idle");
          }}
          className="w-full accent-[var(--s-accent)]"
        />
      </label>
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-widest text-[var(--s-muted)]">
        <span>10</span>
        <span>500</span>
      </div>
      <label htmlFor="biz-email" className="sr-only">
        Work email
      </label>
      <input
        id="biz-email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setState("idle");
        }}
        type="email"
        placeholder="Work email"
        aria-invalid={state === "error"}
        className="mt-6 min-h-12 w-full rounded-full border border-[var(--s-border)] bg-[var(--s-bg)]/70 px-5 text-sm text-[var(--s-fg)] outline-none transition placeholder:text-[var(--s-muted)] focus:border-[var(--s-accent)]"
      />
      {state === "error" && (
        <p
          role="alert"
          className="mt-2 px-2 text-xs text-[color-mix(in_oklab,#ff5d5d_70%,var(--s-fg))]"
        >
          Please enter a valid work email.
        </p>
      )}
      <Btn type="submit" className="mt-4 w-full">
        Request a quote
      </Btn>
      <p role="status" className="mt-4 min-h-5 text-xs leading-relaxed text-[var(--s-muted)]">
        {state === "sent"
          ? `Website concept: on a real site a quote for ${qty} copies would be sent to ${email.trim()}.`
          : ""}
      </p>
    </form>
  );
}

export function BusinessWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const active = stages[stage] ?? stages[0];
  const StageIcon = active.icon;

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Business & strategy"
        links={[
          ["stages", "Framework"],
          ["score", "Scorecard"],
          ["toolkit", "Toolkit"],
          ["speaking", "Speaking"],
        ]}
        cta="Get the book"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--s-accent)] text-[var(--s-on)]">
            <TrendingUp size={20} aria-hidden="true" />
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
              "radial-gradient(55% 55% at 85% 20%, rgba(56,189,248,0.22), transparent 70%), radial-gradient(40% 45% at 0% 100%, rgba(245,158,11,0.14), transparent 70%)",
          }}
        />
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>A practical guide for founders</Eyebrow>
            <Display
              as="h1"
              className="mt-5 text-[clamp(2.5rem,8cqi,5.6rem)] font-extrabold leading-[1] tracking-[-0.04em]"
            >
              Go from <span className="text-[var(--s-accent)]">zero</span> to a real market.
            </Display>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--s-muted)] @3xl:text-lg">
              Zero to Market is a plain-language playbook for finding your first customers, setting
              a price you can defend, and launching without burning your runway.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => jump(ID, "score")}>
                <ClipboardCheck size={16} aria-hidden="true" /> Check your readiness
              </Btn>
              <Btn variant="outline" onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read a chapter
              </Btn>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-5 backdrop-blur">
              <Chart />
            </div>
            <Book3D
              cover={COVER}
              title={TITLE}
              width={150}
              className="absolute -bottom-10 -left-6 hidden @3xl:block"
            />
          </div>
        </Wrap>
      </section>

      {/* Stages */}
      <Section site={ID} id="stages" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>The framework</Eyebrow>
          <Display className="mt-4 text-3xl font-extrabold @3xl:text-5xl">
            Five stages, one at a time
          </Display>
          <div role="tablist" aria-label="Stages" className="mt-10 grid grid-cols-5 gap-2">
            {stages.map((s, i) => (
              <button
                key={s.name}
                role="tab"
                type="button"
                aria-selected={stage === i}
                onClick={() => setStage(i)}
                className="group text-left"
              >
                <span
                  className={`block h-1.5 rounded-full transition-colors duration-500 ${i <= stage ? "bg-[var(--s-accent)]" : "bg-white/15"}`}
                />
                <span
                  className={`mt-3 block text-[10px] font-bold uppercase tracking-[0.12em] transition @sm:text-xs ${stage === i ? "text-[var(--s-accent)]" : "text-[var(--s-muted)] group-hover:text-[var(--s-fg)]"}`}
                >
                  {i + 1}. {s.name}
                </span>
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            key={active.name}
            className="mt-8 grid gap-6 rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-7 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 @3xl:grid-cols-[auto_1fr] @3xl:p-10"
          >
            <span className="grid size-16 place-items-center rounded-2xl bg-[var(--s-accent)] text-[var(--s-on)]">
              <StageIcon size={30} aria-hidden="true" />
            </span>
            <div>
              <p className="text-3xl font-extrabold [font-family:var(--s-display)]">
                {active.name}
              </p>
              <ul className="mt-4 space-y-3">
                {active.points.map((p) => (
                  <li key={p} className="flex gap-3 text-base leading-7 text-[var(--s-muted)]">
                    <Check
                      size={18}
                      className="mt-1 shrink-0 text-[var(--s-accent2)]"
                      aria-hidden="true"
                    />{" "}
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="score">
        <Wrap>
          <Eyebrow>Two-minute scorecard</Eyebrow>
          <Display className="mt-4 max-w-2xl text-3xl font-extrabold @3xl:text-5xl">
            How ready is your idea?
          </Display>
          <p className="mt-3 max-w-xl text-sm text-[var(--s-muted)]">
            Tick every statement that is honestly true today.
          </p>
          <div className="mt-10">
            <Scorecard />
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="toolkit" className="bg-[var(--s-bg2)]">
        <Wrap className="grid gap-8 @3xl:grid-cols-2">
          <div className="flex flex-col justify-between rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-7 @3xl:p-9">
            <div>
              <Eyebrow>Free toolkit</Eyebrow>
              <Display className="mt-4 text-3xl font-extrabold">The go-to-market canvas</Display>
              <p className="mt-3 text-sm leading-7 text-[var(--s-muted)]">
                Eight questions that turn a vague idea into a plan. Download it as a spreadsheet and
                fill it in with your team.
              </p>
            </div>
            <Btn
              className="mt-8 self-start"
              onClick={() => {
                downloadCanvas();
                setDone(true);
              }}
            >
              <Download size={16} aria-hidden="true" />{" "}
              {done ? "Download again" : "Download the canvas"}
            </Btn>
          </div>
          <div>
            <Eyebrow>Bulk orders</Eyebrow>
            <Display className="mb-5 mt-4 text-3xl font-extrabold">
              Books for your whole team
            </Display>
            <BulkOrder />
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="speaking">
        <Wrap className="grid items-start gap-10 @3xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Speaking</Eyebrow>
            <Display className="mt-4 text-3xl font-extrabold @3xl:text-5xl">
              Talks that leave a plan behind
            </Display>
            <p className="mt-4 text-base leading-8 text-[var(--s-muted)]">
              Practical sessions for teams, accelerators, and conferences. Every talk ends with
              something the audience can do on Monday.
            </p>
          </div>
          <ul className="grid gap-3">
            {topics.map((t, i) => (
              <li
                key={t}
                className="flex items-center gap-4 rounded-2xl border border-[var(--s-border)] bg-[var(--s-card)] p-5 transition hover:border-[var(--s-accent)]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--s-accent2)]/15 text-[var(--s-accent2)]">
                  <Mic size={18} aria-hidden="true" />
                </span>
                <span className="text-base font-semibold">{t}</span>
                <span className="ml-auto text-xs tabular-nums text-[var(--s-muted)]">0{i + 1}</span>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      <Section site={ID} id="join" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Signup
            title="One useful idea, every other Thursday"
            text="Short, practical notes on launching, pricing and growing a business. Unsubscribe whenever you like."
            cta="Subscribe"
          />
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Business author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="Who Is It For?"
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
