import type { CSSProperties } from "react";
import {
  ArrowRight,
  Feather,
  Heart,
  Landmark,
  Orbit,
  Smile,
  Sparkles,
  Swords,
  Target,
  Terminal,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { AuthorWebsiteProject } from "@/data/authorWebsites";

interface AuthorWebsiteCardProps {
  project: AuthorWebsiteProject;
  onOpen: () => void;
}

interface Look {
  bg: string;
  accent: string;
  glow: string;
  light?: boolean;
  icon: LucideIcon;
  label: string;
  title: string;
  blurb: string;
  cover: string;
  feature: string;
}

/** What each card shows. It follows the colours of the concept it opens. */
const looks: Record<string, Look> = {
  "camille-laurent-website": {
    bg: "#170811",
    accent: "#e3b97a",
    glow: "#d4677f",
    icon: Heart,
    label: "Parisian romance",
    title: "The Parisian Atelier",
    blurb: "A floating 3D book, a chapter reader and a free prequel sign-up.",
    cover: "the-autumn-atelier",
    feature: "Chapter reader",
  },
  "kofi-mensah-website": {
    bg: "#120b1c",
    accent: "#e8ac3d",
    glow: "#e0835f",
    icon: Swords,
    label: "Epic fantasy",
    title: "Realm Atlas & Lore Vault",
    blurb: "A clickable realm map, a lore codex and a launch countdown.",
    cover: "chronicles-of-the-solar-king",
    feature: "Realm map",
  },
  "declan-cross-website": {
    bg: "#070b10",
    accent: "#4ade80",
    glow: "#38bdf8",
    icon: Terminal,
    label: "Techno-thriller",
    title: "The Command Ops Terminal",
    blurb: "Declassify the excerpt and talk to a working console.",
    cover: "terminal-protocol",
    feature: "Console",
  },
  "soraya-al-mansoor-website": {
    bg: "#f5f0e8",
    accent: "#9a5b3a",
    glow: "#4d5b4a",
    light: true,
    icon: Feather,
    label: "Literary salon",
    title: "Dust and Jasmine",
    blurb: "Essays, a poem that lights up line by line, and a reading room.",
    cover: "dust-and-jasmine",
    feature: "Reading room",
  },
  "helena-vane-website": {
    bg: "#1b110b",
    accent: "#dcb370",
    glow: "#b4673f",
    icon: Landmark,
    label: "Historical fiction",
    title: "The Manor Archives",
    blurb: "An interactive 1890s timeline and a signed-copy inscription preview.",
    cover: "whispers-of-the-gilded-coast",
    feature: "1890s timeline",
  },
  "beatrix-sterling-website": {
    bg: "#120f2b",
    accent: "#f472b6",
    glow: "#c084fc",
    icon: Zap,
    label: "Young adult",
    title: "Clockwork Academy",
    blurb: "A guild-sorting quiz that readers can share with friends.",
    cover: "the-clockwork-kingdom",
    feature: "Guild quiz",
  },
  "tariq-vance-website": {
    bg: "#050714",
    accent: "#818cf8",
    glow: "#c084fc",
    icon: Orbit,
    label: "Popular science",
    title: "The Deep Space Observatory",
    blurb: "A moving solar system and a light-travel explorer.",
    cover: "echoes-of-nova-prime",
    feature: "Live orbits",
  },
  "dr-julian-oreilly-website": {
    bg: "#f2faf6",
    accent: "#0b8a5d",
    glow: "#2f6fdd",
    light: true,
    icon: Target,
    label: "Focus & habits",
    title: "Mastering Focus Hub",
    blurb: "A focus check, a working focus timer and a habit chain.",
    cover: "mastering-focus",
    feature: "Focus timer",
  },
  "amara-leo-fox-website": {
    bg: "#fff6e4",
    accent: "#f59e0b",
    glow: "#ef4f7b",
    light: true,
    icon: Smile,
    label: "Picture book",
    title: "The Dragon's Spark",
    blurb: "A read-along story, a hide-and-seek game and a colouring page.",
    cover: "the-dragon-who-lost-his-spark",
    feature: "Storybook",
  },
  "marcos-valdes-website": {
    bg: "#080c15",
    accent: "#38bdf8",
    glow: "#f59e0b",
    icon: TrendingUp,
    label: "Business book",
    title: "Zero to Market Platform",
    blurb: "A readiness scorecard, a free canvas and a bulk-order request.",
    cover: "zero-to-market",
    feature: "Scorecard",
  },
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export function AuthorWebsiteCard({ project, onOpen }: AuthorWebsiteCardProps) {
  const look = looks[project.id];
  const ink = look?.light ? "#241d17" : "#ffffff";

  const preview = look ? (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-between overflow-hidden border-b border-white/10 p-5"
      style={
        {
          background: `radial-gradient(70% 90% at 90% 20%, ${look.glow}55, transparent 70%), radial-gradient(60% 70% at 0% 100%, ${look.accent}33, transparent 70%), ${look.bg}`,
          color: ink,
        } as CSSProperties
      }
    >
      <div className="z-10 max-w-[56%] space-y-2 text-left">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: `${look.accent}26`,
            color: look.light ? look.accent : look.accent,
            border: `1px solid ${look.accent}66`,
          }}
        >
          <look.icon size={11} aria-hidden="true" /> {look.label}
        </span>
        <h4 className="font-display text-xl leading-tight sm:text-2xl">{look.title}</h4>
        <p
          className="line-clamp-3 text-[11px] leading-relaxed"
          style={{ color: look.light ? "#5b5148" : "rgba(255,255,255,0.72)" }}
        >
          {look.blurb}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <span
            className="grid size-8 place-items-center rounded-full text-[11px] font-bold"
            style={{ background: look.accent, color: look.light ? "#fff" : look.bg }}
            aria-hidden="true"
          >
            {initials(project.authorName)}
          </span>
          <span className="text-[11px] font-semibold">{project.authorName}</span>
        </div>
      </div>
      <div className="relative z-10 shrink-0 rotate-3 shadow-2xl transition-all duration-500 group-hover:rotate-0 group-hover:scale-105">
        <img
          src={`/images/covers/${look.cover}.svg`}
          alt={`Cover of ${project.bookTitle}`}
          width={112}
          height={168}
          loading="lazy"
          className="w-24 rounded-lg shadow-2xl sm:w-28"
          style={{ border: `1px solid ${look.accent}55` }}
        />
        <span
          className="absolute -bottom-2 -left-2 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow"
          style={{ background: look.accent, color: look.light ? "#fff" : look.bg }}
        >
          {look.feature}
        </span>
      </div>
    </div>
  ) : (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/60">
      <img
        src={project.previewImage}
        alt={project.conceptTitle}
        className="h-full w-full object-cover"
      />
    </div>
  );

  return (
    <article
      onClick={onOpen}
      className="glass-card group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60"
    >
      <div>
        <div className="relative overflow-hidden">
          {preview}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink/75 p-4 text-center opacity-0 backdrop-blur-[3px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="mb-2 grid size-12 place-items-center rounded-full bg-gold font-bold text-[#140b19] shadow-2xl transition-transform group-hover:scale-110">
              <Sparkles size={20} aria-hidden="true" />
            </span>
            <p className="font-serif text-lg font-bold text-white">Open the website concept</p>
            <p className="mt-0.5 text-[11px] text-gold">Click, scroll and try everything on it</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              {project.projectType}
            </p>
            <span className="shrink-0 rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
              Concept design
            </span>
          </div>

          <h3 className="mt-1 font-display text-2xl transition-colors group-hover:text-gold">
            {project.conceptTitle}
          </h3>
          <p className="mt-1 text-xs font-medium text-primary">
            Sample author: {project.authorName} &bull; Book: {project.bookTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.keyFeatures.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="rounded-md border border-glass-border bg-glass px-2.5 py-1 text-[11px] font-medium text-foreground/90"
              >
                &check; {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="flex w-full items-center justify-between rounded-xl border border-gold/40 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold shadow-md transition-all duration-300 hover:from-gold hover:to-gold-light hover:text-[#140b19] group-hover:shadow-gold/20"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} aria-hidden="true" />
            <span>Open the concept</span>
          </span>
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}
