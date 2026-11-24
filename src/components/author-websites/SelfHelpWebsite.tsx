import "@fontsource-variable/bricolage-grotesque/index.css";
import { useEffect, useState } from "react";
import { BookOpen, Pause, Play, RotateCcw, Timer } from "lucide-react";
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

const ID = "selfhelp";
const COVER = "/images/covers/mastering-focus.svg";
const AUTHOR = "Julian O’Reilly";
const TITLE = "Mastering Focus";

const theme: Theme = {
  bg: "#f2faf6",
  bg2: "#e0f1e8",
  fg: "#0f2a22",
  muted: "#52695f",
  accent: "#0b8a5d",
  accent2: "#2f6fdd",
  card: "rgba(15,42,34,0.045)",
  border: "rgba(15,42,34,0.16)",
  on: "#ffffff",
  display: "'Bricolage Grotesque Variable', 'DM Sans Variable', system-ui, sans-serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const excerpt = [
  "Focus is not a gift some people are born with. It is a way of arranging a day so that the next right thing is obvious.",
  "Most of us do not lack willpower. We lack a clear first task, a quiet place to start, and a kind way of coming back after we drift.",
  "This book is built around those three things. Take the first one today: before you close this page, write down the one task that would make tomorrow a good day.",
];

const areas = [
  {
    key: "Distraction",
    q: "I can work for 30 minutes without checking my phone.",
    tip: "Put your phone in another room for one 25-minute block. Notice how hard it feels, then try again tomorrow.",
  },
  {
    key: "Energy",
    q: "I have steady energy through the afternoon.",
    tip: "Move for five minutes before your hardest task, and drink some water before the next coffee.",
  },
  {
    key: "Planning",
    q: "I know my one most important task before the day starts.",
    tip: "Write tomorrow's single task tonight, on paper, where it will be the first thing you see.",
  },
  {
    key: "Space",
    q: "My workspace helps me concentrate.",
    tip: "Clear your desk of everything except what the task needs. Put the rest in a box for later.",
  },
  {
    key: "Rhythm",
    q: "I start work at roughly the same time each day.",
    tip: "Choose a fixed start time and attach it to something you already do, like your first cup of tea.",
  },
  {
    key: "Return",
    q: "I return to the task calmly after being interrupted.",
    tip: "When you are interrupted, write down exactly where you stopped. It makes coming back easy and kind.",
  },
] as const;

function Radar({ values }: { values: number[] }) {
  const c = 150;
  const r = 105;
  const point = (i: number, v: number) => {
    const angle = (Math.PI * 2 * i) / areas.length - Math.PI / 2;
    return [c + Math.cos(angle) * r * (v / 5), c + Math.sin(angle) * r * (v / 5)] as const;
  };
  const poly = values.map((v, i) => point(i, v).join(",")).join(" ");
  return (
    <svg
      viewBox="0 0 300 300"
      className="mx-auto h-auto w-full max-w-sm"
      role="img"
      aria-label="Radar chart of your six focus areas"
    >
      {[1, 2, 3, 4, 5].map((ring) => (
        <polygon
          key={ring}
          points={areas.map((_, i) => point(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="rgba(15,42,34,0.14)"
        />
      ))}
      {areas.map((a, i) => {
        const [x, y] = point(i, 5);
        const [lx, ly] = point(i, 6.1);
        return (
          <g key={a.key}>
            <line x1={c} y1={c} x2={x} y2={y} stroke="rgba(15,42,34,0.14)" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="600"
              fill="#52695f"
            >
              {a.key}
            </text>
          </g>
        );
      })}
      <polygon
        points={poly}
        fill="rgba(11,138,93,0.22)"
        stroke="#0b8a5d"
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ transition: "all 0.5s ease" }}
      />
      {values.map((v, i) => {
        const [x, y] = point(i, v);
        return (
          <circle
            key={areas[i]?.key}
            cx={x}
            cy={y}
            r="4.5"
            fill="#0b8a5d"
            style={{ transition: "all 0.5s ease" }}
          />
        );
      })}
    </svg>
  );
}

function FocusCheck() {
  const [values, setValues] = useState<number[]>(() => areas.map(() => 3));
  const total = Math.round((values.reduce((a, b) => a + b, 0) / (areas.length * 5)) * 100);
  const lowest = values.indexOf(Math.min(...values));
  const weak = areas[lowest] ?? areas[0];
  return (
    <div className="grid items-center gap-8 @3xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        {areas.map((a, i) => (
          <div
            key={a.key}
            className="rounded-2xl border border-[var(--s-border)] bg-[var(--s-bg)] p-5"
          >
            <label htmlFor={`sh-${i}`} className="text-sm font-medium leading-snug">
              {a.q}
            </label>
            <div className="mt-3 flex items-center gap-4">
              <span className="w-14 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--s-muted)]">
                Rarely
              </span>
              <input
                id={`sh-${i}`}
                type="range"
                min={1}
                max={5}
                step={1}
                value={values[i] ?? 3}
                onChange={(e) =>
                  setValues((p) => p.map((v, j) => (j === i ? Number(e.target.value) : v)))
                }
                className="h-2 flex-1 accent-[var(--s-accent)]"
              />
              <span className="w-14 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--s-muted)]">
                Often
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-bg)] p-6 @3xl:p-8"
        aria-live="polite"
      >
        <Radar values={values} />
        <p className="mt-4 text-center text-5xl font-extrabold tabular-nums [font-family:var(--s-display)]">
          {total}
          <span className="text-xl text-[var(--s-muted)]">%</span>
        </p>
        <p className="mt-1 text-center text-xs uppercase tracking-[0.2em] text-[var(--s-muted)]">
          Your focus picture today
        </p>
        <div className="mt-5 rounded-2xl bg-[var(--s-accent)]/10 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--s-accent)]">
            Start here: {weak.key}
          </p>
          <p className="mt-2 text-sm leading-7">{weak.tip}</p>
        </div>
      </div>
    </div>
  );
}

function Sprint() {
  const options = [5, 15, 25] as const;
  const [minutes, setMinutes] = useState<(typeof options)[number]>(5);
  const [left, setLeft] = useState(5 * 60);
  const [running, setRunning] = useState(false);
  const total = minutes * 60;
  const finished = left === 0;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  useEffect(() => {
    if (left === 0) setRunning(false);
  }, [left]);

  const choose = (m: (typeof options)[number]) => {
    setMinutes(m);
    setLeft(m * 60);
    setRunning(false);
  };
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const circumference = 2 * Math.PI * 88;
  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-bg)] p-7 text-center @3xl:p-9">
      <div
        className="inline-flex rounded-full border border-[var(--s-border)] p-1"
        role="group"
        aria-label="Sprint length"
      >
        {options.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => choose(m)}
            aria-pressed={minutes === m}
            className={`min-h-10 rounded-full px-5 text-sm font-semibold transition ${minutes === m ? "bg-[var(--s-accent)] text-[var(--s-on)]" : "text-[var(--s-muted)] hover:text-[var(--s-fg)]"}`}
          >
            {m} min
          </button>
        ))}
      </div>
      <div className="relative mx-auto mt-7 size-56">
        <svg viewBox="0 0 200 200" className="size-full -rotate-90" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="rgba(15,42,34,0.1)"
            strokeWidth="10"
          />
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="var(--s-accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (left / total)}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p
              className="text-5xl font-extrabold tabular-nums [font-family:var(--s-display)]"
              role="timer"
              aria-live="off"
            >
              {mm}:{ss}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--s-muted)]">
              {finished ? "Done" : running ? "Focus" : "Ready"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-7 flex justify-center gap-3">
        <Btn onClick={() => (finished ? choose(minutes) : setRunning((r) => !r))}>
          {running ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{" "}
          {finished ? "Again" : running ? "Pause" : "Start sprint"}
        </Btn>
        <Btn variant="outline" onClick={() => choose(minutes)} aria-label="Reset the timer">
          <RotateCcw size={16} aria-hidden="true" />
        </Btn>
      </div>
      <p role="status" className="mt-5 min-h-5 text-sm text-[var(--s-muted)]">
        {finished ? "Well done. Stand up, stretch, and take a short break." : ""}
      </p>
    </div>
  );
}

function Chain() {
  const [habit, setHabit] = useState("Ten minutes of quiet reading");
  const [days, setDays] = useState<boolean[]>(() => Array.from({ length: 14 }, (_, i) => i < 3));
  const best = days.reduce<{ best: number; run: number }>(
    (acc, d) => {
      const run = d ? acc.run + 1 : 0;
      return { best: Math.max(acc.best, run), run };
    },
    { best: 0, run: 0 },
  ).best;
  return (
    <div className="rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-bg)] p-7 @3xl:p-9">
      <label
        htmlFor="sh-habit"
        className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--s-muted)]"
      >
        My habit
      </label>
      <input
        id="sh-habit"
        value={habit}
        onChange={(e) => setHabit(e.target.value.slice(0, 48))}
        className="mt-2 min-h-12 w-full rounded-full border border-[var(--s-border)] bg-[var(--s-bg2)] px-5 text-base font-semibold outline-none transition focus:border-[var(--s-accent)]"
      />
      <div className="mt-6 grid grid-cols-7 gap-2.5" role="group" aria-label="Fourteen day chain">
        {days.map((on, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={on}
            aria-label={`Day ${i + 1}`}
            onClick={() => setDays((p) => p.map((v, j) => (j === i ? !v : v)))}
            className={`grid aspect-square place-items-center rounded-xl text-xs font-bold transition duration-300 active:scale-90 ${on ? "bg-[var(--s-accent)] text-[var(--s-on)] shadow-[0_8px_18px_-8px_var(--s-accent)]" : "border border-[var(--s-border)] text-[var(--s-muted)] hover:border-[var(--s-accent)]"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm text-[var(--s-muted)]" aria-live="polite">
        Longest chain:{" "}
        <strong className="text-[var(--s-fg)]">
          {best} {best === 1 ? "day" : "days"}
        </strong>
        . Missing a day is fine. Start the chain again tomorrow.
      </p>
    </div>
  );
}

export function SelfHelpWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Focus & habits"
        links={[
          ["check", "Focus check"],
          ["sprint", "Focus sprint"],
          ["chain", "Habit chain"],
          ["friday", "Newsletter"],
        ]}
        cta="Get the book"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-on)]">
            <Timer size={19} aria-hidden="true" />
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
              "radial-gradient(50% 55% at 80% 40%, rgba(11,138,93,0.20), transparent 70%), radial-gradient(40% 40% at 0% 0%, rgba(47,111,221,0.14), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute right-[6%] top-1/2 size-[34rem] -translate-y-1/2 rounded-full border border-[var(--s-accent)]/25 [animation:s-pulse-ring_6s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[14%] top-1/2 size-[22rem] -translate-y-1/2 rounded-full border border-[var(--s-accent)]/30 [animation:s-pulse-ring_6s_ease-in-out_infinite_1.2s]"
        />
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow>A calmer way to get things done</Eyebrow>
            <Display
              as="h1"
              className="mt-5 text-[clamp(2.6rem,8.6cqi,6rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
            >
              Do one thing. <span className="text-[var(--s-accent)]">Then the next.</span>
            </Display>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--s-muted)] @3xl:text-lg">
              Mastering Focus is a kind, practical guide to clearing the noise, choosing your one
              task, and finding your way back when you drift.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => jump(ID, "check")}>Take the focus check</Btn>
              <Btn variant="outline" onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read a chapter
              </Btn>
            </div>
          </div>
          <Book3D cover={COVER} title={TITLE} width={250} className="my-8" />
        </Wrap>
      </section>

      <Section site={ID} id="check" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>Two-minute check</Eyebrow>
          <Display className="mt-4 text-3xl font-extrabold @3xl:text-5xl">
            Where does your focus leak?
          </Display>
          <p className="mt-3 max-w-xl text-sm text-[var(--s-muted)]">
            Slide each answer, and watch the picture change.
          </p>
          <div className="mt-10">
            <FocusCheck />
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="sprint">
        <Wrap className="grid items-center gap-10 @3xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Try it now</Eyebrow>
            <Display className="mt-4 text-3xl font-extrabold @3xl:text-5xl">
              Start with a short sprint
            </Display>
            <p className="mt-4 max-w-md text-base leading-8 text-[var(--s-muted)]">
              Pick one task. Set the timer. Nothing else matters until it rings. The first five
              minutes are the hardest, so start small.
            </p>
          </div>
          <Sprint />
        </Wrap>
      </Section>

      <Section site={ID} id="chain" className="bg-[var(--s-bg2)]">
        <Wrap className="grid items-center gap-10 @3xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Make it stick</Eyebrow>
            <Display className="mt-4 text-3xl font-extrabold @3xl:text-5xl">
              Build a fourteen-day chain
            </Display>
            <p className="mt-4 max-w-md text-base leading-8 text-[var(--s-muted)]">
              Name one small habit, then tap a day each time you do it. Seeing the chain grow is
              more motivating than it sounds.
            </p>
          </div>
          <Chain />
        </Wrap>
      </Section>

      <Section site={ID} id="friday">
        <Wrap>
          <Signup
            title="Focus Friday"
            text="One short idea, one small experiment, every Friday morning. Read it in two minutes."
            cta="Send me Focus Friday"
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
            Julian writes about attention, habits and the small, repeatable things that make a good
            day. He believes focus should feel more like a quiet room than a battle.
          </p>
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Self-help author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="The One Task"
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
