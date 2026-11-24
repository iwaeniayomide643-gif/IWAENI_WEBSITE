import { lazy, Suspense, useEffect, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Laptop,
  Smartphone,
  Sparkles,
  Tablet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authorWebsites, type AuthorWebsiteProject } from "@/data/authorWebsites";

/** Each concept loads on its own, with its own fonts, only when it is opened. */
const sites: Record<string, ComponentType> = {
  "camille-laurent-website": lazy(() =>
    import("./RomanceWebsite").then((m) => ({ default: m.RomanceWebsite })),
  ),
  "kofi-mensah-website": lazy(() =>
    import("./FantasyWebsite").then((m) => ({ default: m.FantasyWebsite })),
  ),
  "declan-cross-website": lazy(() =>
    import("./ThrillerWebsite").then((m) => ({ default: m.ThrillerWebsite })),
  ),
  "soraya-al-mansoor-website": lazy(() =>
    import("./LiteraryWebsite").then((m) => ({ default: m.LiteraryWebsite })),
  ),
  "helena-vane-website": lazy(() =>
    import("./HistoricalWebsite").then((m) => ({ default: m.HistoricalWebsite })),
  ),
  "beatrix-sterling-website": lazy(() =>
    import("./YoungAdultWebsite").then((m) => ({ default: m.YoungAdultWebsite })),
  ),
  "tariq-vance-website": lazy(() =>
    import("./NonFictionWebsite").then((m) => ({ default: m.NonFictionWebsite })),
  ),
  "dr-julian-oreilly-website": lazy(() =>
    import("./SelfHelpWebsite").then((m) => ({ default: m.SelfHelpWebsite })),
  ),
  "amara-leo-fox-website": lazy(() =>
    import("./ChildrensWebsite").then((m) => ({ default: m.ChildrensWebsite })),
  ),
  "marcos-valdes-website": lazy(() =>
    import("./BusinessWebsite").then((m) => ({ default: m.BusinessWebsite })),
  ),
};

type Viewport = "desktop" | "tablet" | "mobile";

const viewports: { id: Viewport; label: string; icon: typeof Laptop; frame: string }[] = [
  { id: "desktop", label: "Desktop", icon: Laptop, frame: "max-w-[1280px]" },
  { id: "tablet", label: "Tablet, 768 pixels wide", icon: Tablet, frame: "max-w-[768px]" },
  {
    id: "mobile",
    label: "Phone, 390 pixels wide",
    icon: Smartphone,
    frame: "max-w-[390px] rounded-[2.2rem] ring-[7px] ring-[#1d1a26]",
  },
];

/** ".example" is reserved and can never belong to a real person, so the demo address is safe. */
const addressFor = (project: AuthorWebsiteProject) =>
  `${project.authorName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/^-|-$/g, "")}.example`;

function Loading() {
  return (
    <div className="grid h-full min-h-[60vh] place-items-center bg-[#0b0710]" role="status">
      <div className="text-center">
        <span className="mx-auto block size-10 animate-spin rounded-full border-2 border-white/15 border-t-gold" />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          Loading the concept
        </p>
      </div>
    </div>
  );
}

interface MiniWebsiteViewerProps {
  project: AuthorWebsiteProject;
  onClose: () => void;
  onSelectProject: (p: AuthorWebsiteProject) => void;
  onBookService: () => void;
}

export function MiniWebsiteViewer({
  project,
  onClose,
  onSelectProject,
  onBookService,
}: MiniWebsiteViewerProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [selectorOpen, setSelectorOpen] = useState(false);

  const index = authorWebsites.findIndex((w) => w.id === project.id);
  const go = (step: number) => {
    const next = authorWebsites[(index + step + authorWebsites.length) % authorWebsites.length];
    if (next) onSelectProject(next);
  };
  const Site = sites[project.id] ?? sites["camille-laurent-website"];
  const frame = viewports.find((v) => v.id === viewport) ?? viewports[0];

  // Escape closes the open list first; only then does it close the whole preview.
  useEffect(() => {
    if (!selectorOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setSelectorOpen(false);
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [selectorOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mini-website-title"
      className="fixed inset-0 z-[80] flex animate-fade-in flex-col bg-[#06030a] text-foreground"
    >
      <header className="z-50 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#0d0611] px-3 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Button
            variant="glass"
            size="sm"
            onClick={onClose}
            className="flex shrink-0 items-center gap-1.5 border-white/15 bg-white/5 text-xs text-white hover:bg-white/10"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sr-only sm:hidden">Back to portfolio</span>
          </Button>

          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous concept"
              className="hidden size-9 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:grid"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() => setSelectorOpen((open) => !open)}
                aria-expanded={selectorOpen}
                aria-haspopup="true"
                className="flex min-h-9 max-w-full items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-gold/50"
              >
                <span id="mini-website-title" className="sr-only">
                  {project.authorName} author website concept
                </span>
                <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-gold md:inline">
                  {project.genre}
                </span>
                <span className="truncate font-serif sm:max-w-[200px]">{project.authorName}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "shrink-0 text-muted-foreground transition-transform",
                    selectorOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>

              {selectorOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close the list"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setSelectorOpen(false)}
                  />
                  <div className="absolute left-0 top-full z-50 mt-2 max-h-[70vh] w-[min(20rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-glass-border bg-[#140b19] p-2 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
                    <p className="mb-1 border-b border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                      {authorWebsites.length} author website concepts
                    </p>
                    {authorWebsites.map((item, i) => {
                      const active = item.id === project.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectProject(item);
                            setSelectorOpen(false);
                          }}
                          aria-current={active}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl p-2.5 text-left text-xs transition-colors",
                            active
                              ? "bg-primary/20 text-primary"
                              : "text-white/80 hover:bg-white/5",
                          )}
                        >
                          <span className="flex shrink-0 -space-x-1.5" aria-hidden="true">
                            <span
                              className="size-4 rounded-full ring-2 ring-[#140b19]"
                              style={{ background: item.colorPalette.primary }}
                            />
                            <span
                              className="size-4 rounded-full ring-2 ring-[#140b19]"
                              style={{ background: item.colorPalette.secondary }}
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-serif text-sm">
                              {item.authorName}
                            </span>
                            <span className="block truncate text-[10px] uppercase text-muted-foreground">
                              {item.genre} &middot; {item.bookTitle}
                            </span>
                          </span>
                          {active ? (
                            <Check size={15} aria-hidden="true" />
                          ) : (
                            <span className="text-[10px] text-gold">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next concept"
              className="hidden size-9 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:grid"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hidden w-full max-w-sm items-center justify-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-xs shadow-inner xl:flex">
          <Globe size={13} className="shrink-0 text-emerald-400" aria-hidden="true" />
          <span className="truncate font-mono text-[11px] text-white/90">
            {addressFor(project)}
          </span>
          <span className="shrink-0 rounded-full bg-gold/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">
            Concept
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="hidden items-center rounded-lg border border-white/10 bg-white/5 p-1 sm:flex"
            role="group"
            aria-label="Preview size"
          >
            {viewports.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setViewport(id)}
                aria-label={label}
                aria-pressed={viewport === id}
                title={label}
                className={cn(
                  "rounded-md p-1.5 transition-colors",
                  viewport === id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-white/60 hover:text-white",
                )}
              >
                <Icon size={15} aria-hidden="true" />
              </button>
            ))}
          </div>

          <Button
            size="sm"
            onClick={onBookService}
            className="bg-gold text-xs font-bold text-[#140b19] shadow-lg shadow-gold/20 hover:bg-gold-light"
          >
            <Sparkles size={13} className="mr-1.5" aria-hidden="true" />
            <span className="hidden sm:inline">Book a Website Like This</span>
            <span className="sm:hidden">Book</span>
          </Button>

          <Button
            variant="icon"
            size="icon"
            onClick={onClose}
            className="size-9 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close website preview"
          >
            <X size={18} aria-hidden="true" />
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 justify-center bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.05),transparent)] p-0 sm:p-5">
        <div
          className={cn(
            "flex h-full w-full flex-col overflow-hidden bg-black shadow-2xl transition-[max-width] duration-300 ease-out sm:rounded-2xl sm:ring-1 sm:ring-white/15",
            frame?.frame,
          )}
        >
          <div className="flex h-8 shrink-0 select-none items-center justify-between border-b border-white/10 bg-[#171020] px-4 text-[11px] text-white/50">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-red-500/80" />
              <span className="size-2.5 rounded-full bg-amber-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
            </span>
            <span className="max-w-[60%] truncate font-mono text-[10px] text-white/70">
              {addressFor(project)}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold">Concept</span>
          </div>

          <div key={project.id} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <Suspense fallback={<Loading />}>{Site ? <Site /> : null}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
