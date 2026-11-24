import "@fontsource-variable/space-grotesk/index.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  BookOpen,
  Eye,
  EyeOff,
  FileText,
  Fingerprint,
  Lock,
  ShieldAlert,
  Terminal as TerminalIcon,
  Unlock,
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

const ID = "thriller";
const COVER = "/images/covers/terminal-protocol.svg";
const AUTHOR = "Declan Cross";
const TITLE = "Terminal Protocol";

const theme: Theme = {
  bg: "#070b10",
  bg2: "#0d141c",
  fg: "#e6f1ea",
  muted: "#8aa39a",
  accent: "#4ade80",
  accent2: "#38bdf8",
  card: "rgba(74,222,128,0.05)",
  border: "rgba(74,222,128,0.22)",
  on: "#04130a",
  display: "'Space Grotesk Variable', 'DM Sans Variable', system-ui, sans-serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const mono = "[font-family:'JetBrains_Mono',ui-monospace,monospace]";

const excerpt = [
  "At 02:14 on a Tuesday, the Meridian Exchange lost eleven seconds of its life.",
  "No alarm sounded. No log was written. The night staff drank their coffee and watched the same numbers scroll past on the same screens, and not one of them felt the hole.",
  "Mara Quill felt it three days later, buried in a spreadsheet nobody had asked her to open. Eleven seconds, perfectly empty, and in the middle of the emptiness a single signature.",
  "Her own.",
];

const boot = [
  "establishing secure connection ...",
  "reader identity ............ unverified",
  "file located: TERMINAL_PROTOCOL.enc",
  "access level ............... granted",
];

const dossier = [
  {
    before: "At 02:14 on a Tuesday, the ",
    secret: "Meridian Exchange",
    after: " lost eleven seconds of its life.",
  },
  {
    before: "No alarm sounded. No log was written. ",
    secret: "Nobody inside the building",
    after: " noticed the gap.",
  },
  {
    before: "Mara Quill noticed, because the eleven seconds ",
    secret: "carried her name",
    after: ".",
  },
  {
    before: "Someone had signed the gap with her credentials, from ",
    secret: "a desk that burned down in 2019",
    after: ".",
  },
];

const files = [
  {
    name: "Mara Quill",
    role: "Forensic analyst",
    level: 82,
    text: "Finds the gap in any story. Has just discovered she is inside one.",
  },
  {
    name: "Ilya Brandt",
    role: "Fixer",
    level: 64,
    text: "Knows who owes whom, and in what currency. Never says which side he is on.",
  },
  {
    name: "Lantern",
    role: "Anonymous source",
    level: 31,
    text: "Speaks only on dead channels, and only after midnight. Might be one person. Might not.",
  },
  {
    name: "Commander Reyes",
    role: "Oversight",
    level: 93,
    text: "Wants it buried, and says it is for everyone's safety. Is it?",
  },
];

type Line = { kind: "in" | "out"; text: string };

function useBoot(lines: string[], speed = 700) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(lines.length);
      return;
    }
    if (count >= lines.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(id);
  }, [count, lines.length, speed]);
  return count;
}

/** A small terminal that really answers: type "help". */
function Console({ onRead, onBuy }: { onRead: () => void; onBuy: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "TERMINAL PROTOCOL // reader console" },
    { kind: "out", text: 'Type "help" to see what this terminal can do.' },
  ]);
  const [value, setValue] = useState("");
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [lines]);

  const run = (event: FormEvent) => {
    event.preventDefault();
    const cmd = value.trim().toLowerCase();
    if (!cmd) return;
    setValue("");
    const reply: Record<string, string[]> = {
      help: ["commands: about, book, excerpt, buy, clearance, clear"],
      about: ["Declan Cross writes techno-thrillers about the quiet places inside loud systems."],
      book: [
        "TERMINAL PROTOCOL. A forensic analyst finds her own signature inside eleven missing seconds.",
      ],
    };
    if (cmd === "clear") return setLines([]);
    const next: Line[] = [{ kind: "in", text: cmd }];
    if (cmd === "excerpt") {
      next.push({ kind: "out", text: "opening the first pages ..." });
      window.setTimeout(onRead, 450);
    } else if (cmd === "buy") {
      next.push({ kind: "out", text: "routing you to retailers ..." });
      window.setTimeout(onBuy, 450);
    } else if (cmd === "clearance") {
      next.push({ kind: "out", text: "scrolling to the clearance form ..." });
      window.setTimeout(() => jump(ID, "clearance"), 450);
    } else {
      const answer = reply[cmd];
      (answer ?? [`command not found: ${cmd}. Type "help".`]).forEach((text) =>
        next.push({ kind: "out", text }),
      );
    }
    setLines((prev) => [...prev, ...next]);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--s-border)] bg-black/60 shadow-[0_30px_80px_-30px_rgba(74,222,128,0.35)]">
      <div className="flex items-center gap-2 border-b border-[var(--s-border)] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f56]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-[#27c93f]" />
        <span className={`ml-3 text-[11px] text-[var(--s-muted)] ${mono}`}>
          reader@terminal-protocol
        </span>
      </div>
      <div
        ref={log}
        className={`h-60 overflow-y-auto px-4 py-4 text-[13px] leading-7 ${mono}`}
        aria-live="polite"
        onClick={() => document.getElementById("thriller-input")?.focus()}
      >
        {lines.map((l, i) => (
          <p key={i} className={l.kind === "in" ? "text-[var(--s-fg)]" : "text-[var(--s-accent)]"}>
            {l.kind === "in" ? <span className="text-[var(--s-accent2)]">$ </span> : null}
            {l.text}
          </p>
        ))}
      </div>
      <form
        onSubmit={run}
        className={`flex items-center gap-2 border-t border-[var(--s-border)] px-4 py-3 text-[13px] ${mono}`}
      >
        <span className="text-[var(--s-accent2)]">$</span>
        <label htmlFor="thriller-input" className="sr-only">
          Terminal command
        </label>
        <input
          id="thriller-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="type a command"
          className="min-h-9 flex-1 bg-transparent text-[var(--s-fg)] outline-none placeholder:text-[var(--s-muted)]/60"
        />
        <button
          type="submit"
          className="rounded-md border border-[var(--s-border)] px-3 py-1.5 text-[11px] uppercase tracking-widest text-[var(--s-accent)] transition hover:bg-[var(--s-accent)] hover:text-[var(--s-on)]"
        >
          run
        </button>
      </form>
    </div>
  );
}

export function ThrillerWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [openFile, setOpenFile] = useState<string | null>("Mara Quill");
  const shown = useBoot(boot);
  const allOpen = revealed.size === dossier.length;

  const toggle = (i: number) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Techno-thrillers"
        links={[
          ["dossier", "Dossier"],
          ["console", "Console"],
          ["files", "Case files"],
          ["clearance", "Clearance"],
        ]}
        cta="Get the book"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-[var(--s-accent)]/50 bg-[var(--s-card)] text-[var(--s-accent)]">
            <Fingerprint size={20} aria-hidden="true" />
          </span>
        }
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-14 @3xl:px-10 @3xl:pb-28 @3xl:pt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,222,128,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(70% 70% at 50% 40%, #000, transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 [animation:s-scan_6s_linear_infinite]"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(74,222,128,0.10), transparent)",
          }}
        />
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p
              className={`inline-flex items-center gap-2 rounded-full border border-[var(--s-border)] bg-[var(--s-card)] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[var(--s-accent)] ${mono}`}
            >
              <ShieldAlert size={13} aria-hidden="true" /> Classified reader file
            </p>
            <Display
              as="h1"
              className="mt-6 text-[clamp(2.4rem,7.6cqi,5.2rem)] font-bold leading-[1.02] tracking-[-0.03em]"
            >
              Eleven seconds. <span className="text-[var(--s-accent)]">One signature.</span> Hers.
            </Display>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--s-muted)] @3xl:text-lg">
              A forensic analyst discovers that the biggest breach in a decade was signed with her
              own credentials. Terminal Protocol is a techno-thriller about trust, evidence, and the
              people who write the logs.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read the first pages
              </Btn>
              <Btn variant="outline" onClick={() => jump(ID, "dossier")}>
                <Eye size={16} aria-hidden="true" /> Open the dossier
              </Btn>
            </div>
            <div
              className={`mt-9 max-w-md rounded-2xl border border-[var(--s-border)] bg-black/40 p-4 text-[12px] leading-6 text-[var(--s-accent)] ${mono}`}
              aria-label="Connection log"
            >
              {boot.slice(0, shown).map((l) => (
                <p key={l}>
                  <span className="text-[var(--s-accent2)]">&gt; </span>
                  {l}
                </p>
              ))}
              {shown < boot.length && (
                <span className="inline-block h-4 w-2 bg-[var(--s-accent)] [animation:s-blink_1s_steps(2)_infinite]" />
              )}
            </div>
          </div>
          <Book3D cover={COVER} title={TITLE} width={260} className="my-8" />
        </Wrap>
      </section>

      {/* Dossier */}
      <Section site={ID} id="dossier" className="bg-[var(--s-bg2)]">
        <Wrap>
          <div className="flex flex-col gap-5 @3xl:flex-row @3xl:items-end @3xl:justify-between">
            <div>
              <Eyebrow>Case file 01</Eyebrow>
              <Display className="mt-4 text-3xl font-bold @3xl:text-5xl">
                Declassify the opening
              </Display>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--s-muted)]">
                Tap a black bar to read what was hidden.
              </p>
            </div>
            <Btn
              variant="outline"
              onClick={() => setRevealed(allOpen ? new Set() : new Set(dossier.map((_, i) => i)))}
            >
              {allOpen ? (
                <Lock size={16} aria-hidden="true" />
              ) : (
                <Unlock size={16} aria-hidden="true" />
              )}
              {allOpen ? "Redact again" : "Declassify all"}
            </Btn>
          </div>
          <div className="relative mt-10 rounded-3xl border border-[var(--s-border)] bg-[var(--s-bg)] p-6 @3xl:p-10">
            <span
              className={`absolute right-5 top-5 -rotate-6 rounded border-2 border-[#ff5d5d]/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff5d5d]/80 ${mono}`}
            >
              {allOpen ? "Declassified" : "Top secret"}
            </span>
            <div className="max-w-3xl space-y-5 pt-6 text-lg leading-9 @3xl:text-xl">
              {dossier.map((d, i) => {
                const open = revealed.has(i);
                return (
                  <p key={d.secret}>
                    {d.before}
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-pressed={open}
                      aria-label={open ? "Hide redacted text" : "Reveal redacted text"}
                      className={`mx-0.5 inline rounded-[4px] px-1.5 py-0.5 align-baseline transition-all duration-300 ${open ? "bg-[var(--s-accent)]/15 text-[var(--s-accent)] ring-1 ring-[var(--s-accent)]/40" : "bg-[#02060a] text-transparent ring-1 ring-white/10 hover:ring-[var(--s-accent)] select-none"}`}
                    >
                      {open ? d.secret : d.secret.replace(/[^ ]/g, "x")}
                    </button>
                    {d.after}
                  </p>
                );
              })}
            </div>
            <p
              className={`mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--s-muted)] ${mono}`}
            >
              {allOpen ? (
                <Eye size={14} aria-hidden="true" />
              ) : (
                <EyeOff size={14} aria-hidden="true" />
              )}
              {revealed.size} of {dossier.length} redactions open
            </p>
          </div>
        </Wrap>
      </Section>

      {/* Console */}
      <Section site={ID} id="console">
        <Wrap className="grid items-center gap-10 @3xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Reader console</Eyebrow>
            <Display className="mt-4 text-3xl font-bold @3xl:text-5xl">
              Talk to the terminal
            </Display>
            <p className="mt-4 text-base leading-8 text-[var(--s-muted)]">
              A tiny, working command line for the author site. Readers can learn about the book,
              open the first pages, or find stores, all by typing.
            </p>
            <div className={`mt-6 flex flex-wrap gap-2 text-xs ${mono}`}>
              {["help", "about", "book", "excerpt", "buy"].map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-[var(--s-border)] bg-[var(--s-card)] px-2.5 py-1 text-[var(--s-accent)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Console onRead={() => setReading(true)} onBuy={() => setBuying(true)} />
        </Wrap>
      </Section>

      {/* Case files */}
      <Section site={ID} id="files" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>The people in the file</Eyebrow>
          <Display className="mt-4 text-3xl font-bold @3xl:text-5xl">Who can you trust?</Display>
          <div className="mt-10 grid gap-4 @3xl:grid-cols-2">
            {files.map((f) => {
              const open = openFile === f.name;
              return (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setOpenFile(open ? null : f.name)}
                  aria-expanded={open}
                  className={`group rounded-3xl border p-6 text-left transition duration-300 ${open ? "border-[var(--s-accent)] bg-[var(--s-accent)]/[0.07]" : "border-[var(--s-border)] bg-[var(--s-card)] hover:border-[var(--s-accent)]/60"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-bold">{f.name}</p>
                      <p
                        className={`mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--s-accent2)] ${mono}`}
                      >
                        {f.role}
                      </p>
                    </div>
                    <FileText
                      size={22}
                      className="shrink-0 text-[var(--s-accent)]"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--s-accent)] to-[var(--s-accent2)] transition-all duration-700"
                      style={{ width: open ? `${f.level}%` : "12%" }}
                    />
                  </div>
                  <p
                    className={`mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--s-muted)] ${mono}`}
                  >
                    {open ? `Clearance ${f.level}%` : "Open file to see clearance"}
                  </p>
                  <p
                    className={`overflow-hidden text-sm leading-7 text-[var(--s-muted)] transition-all duration-500 ${open ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {f.text}
                  </p>
                </button>
              );
            })}
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="clearance">
        <Wrap>
          <Signup
            title="Request clearance"
            text="One short email when there is something worth reading: new chapters, tour dates, and the occasional encrypted puzzle."
            cta="Request access"
            gift="your welcome file "
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
          <Display className="mt-3 text-3xl font-bold @3xl:text-5xl">{AUTHOR}</Display>
          <p className="mt-5 text-base leading-8 text-[var(--s-muted)]">
            Declan writes fast, careful thrillers about the quiet places inside loud systems: audit
            logs, night shifts, and the people nobody checks on. He is happiest when a plot clicks
            shut like a good lock.
          </p>
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Thriller author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="Eleven Seconds"
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
