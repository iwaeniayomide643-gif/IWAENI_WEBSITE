import "@fontsource/playfair-display/latin-500.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-400-italic.css";
import { useState } from "react";
import { BookOpen, Mail, Map as MapIcon, PenLine, Scroll, Ticket } from "lucide-react";
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

const ID = "historical";
const COVER = "/images/covers/whispers-of-the-gilded-coast.svg";
const AUTHOR = "Helena Vane";
const TITLE = "Whispers of the Gilded Coast";

const theme: Theme = {
  bg: "#1b110b",
  bg2: "#27170f",
  fg: "#f3e6d0",
  muted: "#bfa88a",
  accent: "#dcb370",
  accent2: "#b4673f",
  card: "rgba(220,179,112,0.06)",
  border: "rgba(220,179,112,0.26)",
  on: "#2a180d",
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans Variable', system-ui, sans-serif",
};

const excerpt = [
  "The summer the telegraph wires came to Ashcombe, nobody on the coast could say who had ordered them.",
  "Isobel Fenn learned of it from the cook, who learned of it from the milk, and by the time the news reached the drawing room the whole house had already decided to pretend it had always known.",
  "“Wires,” said Lady Ashcombe, as one might say weather. “How modern.”",
  "But Isobel, who kept the household ledger and therefore the household’s secrets, noticed that her ladyship’s hand shook as she set down the cup.",
];

const timeline = [
  {
    year: "1890",
    history:
      "Electric light begins to appear in the grandest houses, though gas still lights most rooms.",
    novel:
      "Lady Ashcombe's ballroom burns both, and the guests argue over which is kinder to a face.",
  },
  {
    year: "1893",
    history: "The World's Columbian Exposition opens in Chicago.",
    novel:
      "A letter arrives from across the Atlantic, and the household's careful calm begins to crack.",
  },
  {
    year: "1895",
    history: "The Lumière brothers hold their first paid public film screening in Paris.",
    novel:
      "Isobel sees moving pictures for the first time and understands the world is about to outrun the manor.",
  },
  {
    year: "1897",
    history: "Queen Victoria celebrates her Diamond Jubilee.",
    novel: "The whole coast is bunting and bonfires, and the best night in years to disappear.",
  },
  {
    year: "1899",
    history: "The Boer War begins in October.",
    novel:
      "The youngest footman leaves with the regiment, and the back staircase is quieter for it.",
  },
] as const;

const artifacts = [
  {
    icon: Mail,
    name: "A letter, unsent",
    note: "Dated the third of June. The ink is blotted where the writer stopped, and the last line is a name, crossed out twice.",
  },
  {
    icon: Ticket,
    name: "A ticket stub",
    note: "Third class, one way. Somebody has scratched the date away with the point of a pin.",
  },
  {
    icon: Scroll,
    name: "The household ledger",
    note: "Every Tuesday the same entry appears: 'to the lighthouse, 2s.' No lighthouse is named anywhere else.",
  },
  {
    icon: MapIcon,
    name: "A torn map",
    note: "The coast as the family knew it, with one small cove left carefully blank.",
  },
] as const;

const occasions = {
  "On your birthday": "on your birthday,",
  "With thanks": "with thanks,",
  "For a long summer": "for a long summer,",
  Congratulations: "with congratulations,",
} as const;

function Flip({ icon: Icon, name, note }: (typeof artifacts)[number]) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${name}. ${flipped ? "Showing the note" : "Tap to read the note"}`}
      className="group h-64 w-full [perspective:1000px]"
    >
      <span
        className={`relative block h-full w-full text-left transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(-8deg)]"}`}
      >
        <span className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-[var(--s-border)] bg-[var(--s-card)] p-6 [backface-visibility:hidden]">
          <Icon size={30} className="text-[var(--s-accent)]" aria-hidden="true" />
          <span>
            <span className="block text-xl font-medium [font-family:var(--s-display)]">{name}</span>
            <span className="mt-2 block text-[10px] uppercase tracking-[0.22em] text-[var(--s-muted)]">
              Tap to turn over
            </span>
          </span>
        </span>
        <span className="absolute inset-0 flex flex-col justify-center rounded-3xl bg-[#efe0c3] p-6 text-[#2a180d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a5a2b]">
            From the archive
          </span>
          <span className="mt-3 text-lg italic leading-relaxed [font-family:var(--s-display)]">
            {note}
          </span>
        </span>
      </span>
    </button>
  );
}

export function HistoricalWebsite() {
  const [reading, setReading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [year, setYear] = useState(0);
  const [who, setWho] = useState("");
  const [occasion, setOccasion] = useState<keyof typeof occasions>("For a long summer");
  const [requested, setRequested] = useState(false);
  const active = timeline[year] ?? timeline[0];

  return (
    <Site theme={theme} id={ID}>
      <span id={`${ID}-top`} />
      <Nav
        site={ID}
        name={AUTHOR}
        sub="Historical fiction"
        links={[
          ["timeline", "Timeline"],
          ["archive", "Archive"],
          ["signed", "Signed copy"],
          ["society", "Society"],
        ]}
        cta="Get the novel"
        onCta={() => setBuying(true)}
        mark={
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--s-accent)]/60 text-lg italic [font-family:var(--s-display)] text-[var(--s-accent)]">
            V
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
              "radial-gradient(60% 55% at 78% 40%, rgba(220,179,112,0.22), transparent 70%), radial-gradient(40% 50% at 0% 100%, rgba(180,103,63,0.22), transparent 70%)",
          }}
        />
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute size-1 rounded-full bg-[var(--s-accent)]/70 [animation:s-drift_12s_ease-in-out_infinite]"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23 + 8) % 90}%`,
              animationDelay: `${(i % 7) * -1.7}s`,
            }}
          />
        ))}
        <Wrap className="relative grid items-center gap-14 @3xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--s-accent)]">
              <span className="h-px w-8 bg-[var(--s-accent)]" /> A novel of 1890s England
            </p>
            <Display
              as="h1"
              className="mt-6 text-[clamp(2.4rem,7.6cqi,5.4rem)] font-medium leading-[1.04]"
            >
              Whispers of the <span className="italic text-[var(--s-accent)]">Gilded</span> Coast
            </Display>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--s-muted)] @3xl:text-lg">
              A manor, a ledger, and a summer that was never written down. Isobel Fenn keeps
              everyone&rsquo;s accounts, and one entry will not balance.
            </p>
            <div className="mt-8 flex flex-col gap-3 @sm:flex-row">
              <Btn onClick={() => setReading(true)}>
                <BookOpen size={16} aria-hidden="true" /> Read the opening
              </Btn>
              <Btn variant="outline" onClick={() => jump(ID, "timeline")}>
                Walk the 1890s
              </Btn>
            </div>
          </div>
          <div className="relative mx-auto">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] border border-[var(--s-accent)]/30"
            />
            <Book3D cover={COVER} title={TITLE} width={250} className="my-6" />
          </div>
        </Wrap>
      </section>

      {/* Timeline */}
      <Section site={ID} id="timeline" className="bg-[var(--s-bg2)]">
        <Wrap>
          <Eyebrow>A decade of change</Eyebrow>
          <Display className="mt-4 text-3xl font-medium @3xl:text-5xl">Walk the 1890s</Display>
          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="absolute left-4 right-4 top-[1.15rem] h-px bg-[var(--s-border)]"
            />
            <div role="tablist" aria-label="Years" className="relative flex justify-between">
              {timeline.map((t, i) => (
                <button
                  key={t.year}
                  role="tab"
                  type="button"
                  aria-selected={year === i}
                  onClick={() => setYear(i)}
                  className="group flex flex-col items-center gap-3"
                >
                  <span
                    className={`grid size-9 place-items-center rounded-full border transition duration-300 ${year === i ? "scale-125 border-[var(--s-accent)] bg-[var(--s-accent)] text-[var(--s-on)]" : "border-[var(--s-border)] bg-[var(--s-bg2)] group-hover:border-[var(--s-accent)]"}`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                  </span>
                  <span
                    className={`text-sm font-medium [font-family:var(--s-display)] transition ${year === i ? "text-[var(--s-accent)]" : "text-[var(--s-muted)]"}`}
                  >
                    {t.year}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div
            role="tabpanel"
            key={active.year}
            className="mt-10 grid gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 @3xl:grid-cols-2"
          >
            <div className="rounded-3xl border border-[var(--s-border)] bg-[var(--s-card)] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--s-accent2)]">
                In history
              </p>
              <p className="mt-3 text-lg leading-8">{active.history}</p>
            </div>
            <div className="rounded-3xl border border-[var(--s-accent)]/50 bg-[var(--s-accent)]/10 p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--s-accent)]">
                In the novel
              </p>
              <p className="mt-3 text-lg italic leading-8 [font-family:var(--s-display)]">
                {active.novel}
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* Archive */}
      <Section site={ID} id="archive">
        <Wrap>
          <Eyebrow>The research vault</Eyebrow>
          <Display className="mt-4 text-3xl font-medium @3xl:text-5xl">
            Four things found in the drawer
          </Display>
          <div className="mt-10 grid gap-4 @sm:grid-cols-2 @3xl:grid-cols-4">
            {artifacts.map((a) => (
              <Flip key={a.name} {...a} />
            ))}
          </div>
          <p className="mt-5 text-xs text-[var(--s-muted)]">
            Sample objects written for this website concept.
          </p>
        </Wrap>
      </Section>

      {/* Signed copy */}
      <Section site={ID} id="signed" className="bg-[var(--s-bg2)]">
        <Wrap className="grid items-center gap-10 @3xl:grid-cols-2">
          <div>
            <Eyebrow>Signed hardcover</Eyebrow>
            <Display className="mt-4 text-3xl font-medium @3xl:text-5xl">
              Choose the inscription
            </Display>
            <p className="mt-4 text-base leading-8 text-[var(--s-muted)]">
              Type a name and watch the flyleaf change. A small, personal touch that makes a signed
              copy feel like a gift.
            </p>
            <label className="mt-7 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--s-muted)]">
              Who is it for?
              <input
                value={who}
                onChange={(e) => {
                  setWho(e.target.value.slice(0, 28));
                  setRequested(false);
                }}
                placeholder="A name"
                className="mt-2 min-h-12 w-full rounded-full border border-[var(--s-border)] bg-[var(--s-bg)] px-5 text-sm normal-case tracking-normal text-[var(--s-fg)] outline-none transition focus:border-[var(--s-accent)]"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Occasion">
              {(Object.keys(occasions) as (keyof typeof occasions)[]).map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    setOccasion(o);
                    setRequested(false);
                  }}
                  aria-pressed={occasion === o}
                  className={`min-h-10 rounded-full border px-4 text-xs transition ${occasion === o ? "border-[var(--s-accent)] bg-[var(--s-accent)] text-[var(--s-on)]" : "border-[var(--s-border)] hover:border-[var(--s-accent)]"}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="relative mx-auto aspect-[4/3] max-w-md rounded-md bg-[#efe0c3] p-8 text-[#2a180d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] before:absolute before:inset-3 before:rounded-sm before:border before:border-[#8a5a2b]/40">
              <div className="relative flex h-full flex-col items-center justify-center text-center">
                <PenLine size={18} className="mb-3 text-[#8a5a2b]" aria-hidden="true" />
                <p className="text-2xl italic leading-snug [font-family:var(--s-display)] @3xl:text-3xl">
                  For {who.trim() || "you"},<br />
                  {occasions[occasion]}
                </p>
                <p className="mt-5 text-3xl italic text-[#6b3f1d] [font-family:var(--s-display)]">
                  Helena Vane
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3">
              <Btn onClick={() => setRequested(true)}>Request this inscription</Btn>
              <p role="status" className="min-h-5 text-center text-xs text-[var(--s-muted)]">
                {requested
                  ? "Website concept: on a real site this would open the author's own shop with your inscription attached."
                  : ""}
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section site={ID} id="society">
        <Wrap>
          <Signup
            title="Join the Reader Society"
            text="Discussion guides for book clubs, research notes from the writing of the novel, and first word of the next book."
            cta="Join the Society"
            gift="the first guide "
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
          <Display className="mt-3 text-3xl font-medium @3xl:text-5xl">{AUTHOR}</Display>
          <p className="mt-5 text-base leading-8 text-[var(--s-muted)]">
            Helena writes historical fiction from the household&rsquo;s point of view: the people
            who kept the ledgers, lit the lamps, and knew everything. She likes a story best when
            the servants&rsquo; staircase is as important as the front door.
          </p>
        </Wrap>
      </Section>

      <ConceptFooter author={AUTHOR} line="Historical fiction author website concept" />
      <Reader
        open={reading}
        onClose={() => setReading(false)}
        title="The Summer of the Wires"
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
