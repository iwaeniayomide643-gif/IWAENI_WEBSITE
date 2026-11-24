import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Globe, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formattedSamples, formattedWorks } from "@/data/formattedWorks";
import { authorWebsites, type AuthorWebsiteProject } from "@/data/authorWebsites";
import { MiniWebsiteViewer } from "@/components/author-websites/MiniWebsiteViewer";
import { AuthorWebsiteCard } from "@/components/author-websites/AuthorWebsiteCard";

export type WorkspaceKind = "formatted" | "websites";

interface PortfolioWorkspaceProps {
  kind: WorkspaceKind | null;
  onClose: () => void;
  onOrder: () => void;
}

const websiteGenres = [
  "All",
  "Romance",
  "Fantasy",
  "Thriller",
  "Literary",
  "Business",
  "Self-Help",
  "Children's",
];

/** Some covers are hosted on Contra as well; use them if a local file ever goes missing. */
function getFallbackImage(src: string): string {
  const match = src.match(/([a-z0-9]{20})/);
  return match ? `https://media.contra.com/image/upload/q_auto:good,w_1100/${match[1]}.jpg` : src;
}

const swapToFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const fallback = getFallbackImage(e.currentTarget.src);
  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
};

export function PortfolioWorkspace({ kind, onClose, onOrder }: PortfolioWorkspaceProps) {
  const [preview, setPreview] = useState<{ workIndex: number; imageIndex: number } | null>(null);
  const [selectedWebsite, setSelectedWebsite] = useState<AuthorWebsiteProject | null>(null);
  const [websiteFilter, setWebsiteFilter] = useState("All");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!kind) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (preview) setPreview(null);
      else if (selectedWebsite) setSelectedWebsite(null);
      else onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [kind, preview, selectedWebsite, onClose]);

  if (!kind) return null;

  const navigatePreview = (direction: "prev" | "next") => {
    if (!preview) return;
    const current = formattedSamples.findIndex(
      (s) => s.workIndex === preview.workIndex && s.imageIndex === preview.imageIndex,
    );
    if (current === -1) return;
    const total = formattedSamples.length;
    const next = formattedSamples[(current + (direction === "next" ? 1 : -1) + total) % total];
    if (next) setPreview({ workIndex: next.workIndex, imageIndex: next.imageIndex });
  };

  const Icon = kind === "formatted" ? BookOpen : Globe;
  const title = kind === "formatted" ? "Formatted books" : "Author website concepts";
  const previewWork = preview ? formattedWorks[preview.workIndex] : undefined;
  const previewSrc = previewWork && preview ? (previewWork.images[preview.imageIndex] ?? "") : "";

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="workspace-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-3 backdrop-blur-md sm:p-6"
        onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      >
        <div className="glass-panel relative max-h-[92svh] w-full max-w-6xl animate-in overflow-y-auto rounded-3xl p-5 duration-300 fade-in zoom-in-95 sm:p-8 lg:p-10">
          <Button
            ref={closeRef}
            variant="icon"
            size="icon"
            className="absolute right-3 top-3 z-20 size-11 rounded-full border border-glass-border bg-glass-strong hover:bg-glass sm:right-6 sm:top-6"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} aria-hidden="true" />
          </Button>

          <div className="mb-6 flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-glass-border bg-glass">
              <Icon className="size-7 text-primary" aria-hidden="true" />
            </span>
            <h2 id="workspace-title" className="pr-14 font-display text-4xl sm:text-5xl">
              {title}
            </h2>
          </div>

          {kind === "formatted" && (
            <div className="mt-6">
              <div className="mb-6 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Select any card for a closer, full-screen look.
                </p>
                <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                  {formattedSamples.length} samples · {formattedWorks.length} projects
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {formattedSamples.map(({ work, workIndex, image, imageIndex }) => (
                  <article
                    key={`${work.title}-${imageIndex}`}
                    className="glass-card group flex flex-col overflow-hidden rounded-2xl"
                  >
                    <button
                      className="relative block aspect-[16/10] w-full overflow-hidden bg-glass text-left"
                      onClick={() => setPreview({ workIndex, imageIndex })}
                      aria-label={`View ${work.title}, sample ${imageIndex + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${work.title}, sample ${imageIndex + 1}`}
                        loading="lazy"
                        onError={swapToFallback}
                        className="zoom-photo h-full w-full object-contain p-3"
                      />
                      <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full border border-glass-border bg-glass-strong backdrop-blur-xl">
                        <Search size={16} aria-hidden="true" />
                      </span>
                    </button>
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                          {work.category}
                        </p>
                        <h3 className="mt-1.5 font-display text-2xl leading-snug">{work.title}</h3>
                        {work.images.length > 1 && (
                          <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-primary">
                            Sample {imageIndex + 1} of {work.images.length}
                          </p>
                        )}
                        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                          {work.description}
                        </p>
                      </div>
                      <Button
                        variant="glass"
                        size="sm"
                        className="mt-5 w-full justify-between"
                        onClick={() => setPreview({ workIndex, imageIndex })}
                      >
                        <span>View full size</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {kind === "websites" && (
            <div className="mt-6">
              <div className="mb-6 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Concept designs that show how an author website can look and work. They are design
                  concepts, not live client websites.
                </p>
                <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                  {authorWebsites.length} concepts
                </p>
              </div>
              <div className="scrollbar-none mb-6 flex gap-2 overflow-x-auto pb-2">
                {websiteGenres.map((genre) => (
                  <Button
                    key={genre}
                    variant={websiteFilter === genre ? "primary" : "glass"}
                    size="sm"
                    className="shrink-0 text-xs"
                    onClick={() => setWebsiteFilter(genre)}
                    aria-pressed={websiteFilter === genre}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {authorWebsites
                  .filter(
                    (w) =>
                      websiteFilter === "All" ||
                      w.genre.toLowerCase().includes(websiteFilter.toLowerCase()),
                  )
                  .map((project) => (
                    <AuthorWebsiteCard
                      key={project.id}
                      project={project}
                      onOpen={() => setSelectedWebsite(project)}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full-size viewer for formatted books */}
      {preview && previewWork && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${previewWork.title} image preview`}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ink/95 p-3 backdrop-blur-2xl sm:p-6"
          onMouseDown={(event) => event.target === event.currentTarget && setPreview(null)}
        >
          <div className="relative flex max-h-[96svh] w-full max-w-6xl flex-col items-center">
            <Button
              variant="icon"
              size="icon"
              className="absolute right-2 top-2 z-20 rounded-full border border-glass-border bg-glass-strong hover:bg-glass"
              onClick={() => setPreview(null)}
              aria-label="Close image preview"
            >
              <X size={20} aria-hidden="true" />
            </Button>
            <button
              onClick={() => navigatePreview("prev")}
              className="absolute left-2 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-glass-border bg-glass-strong transition-colors hover:bg-primary hover:text-primary-foreground sm:grid"
              aria-label="Previous sample"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              onClick={() => navigatePreview("next")}
              className="absolute right-2 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-glass-border bg-glass-strong transition-colors hover:bg-primary hover:text-primary-foreground sm:grid"
              aria-label="Next sample"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>

            <div className="flex max-h-[74svh] w-full items-center justify-center p-2 sm:max-h-[78svh]">
              <img
                src={previewSrc}
                alt={`${previewWork.title}, view ${(preview?.imageIndex ?? 0) + 1}`}
                onError={swapToFallback}
                className="max-h-[72svh] w-auto max-w-full rounded-2xl object-contain shadow-2xl sm:max-h-[76svh]"
              />
            </div>

            <div className="glass-panel mt-3 flex w-full max-w-3xl flex-col items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:px-6">
              <div className="min-w-0 text-center sm:text-left">
                <p className="truncate font-display text-xl">{previewWork.title}</p>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
                  {previewWork.category} · Sample {(preview?.imageIndex ?? 0) + 1} of{" "}
                  {previewWork.images.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-2 sm:hidden">
                  <Button variant="glass" size="sm" onClick={() => navigatePreview("prev")}>
                    <ChevronLeft size={16} aria-hidden="true" /> Prev
                  </Button>
                  <Button variant="glass" size="sm" onClick={() => navigatePreview("next")}>
                    Next <ChevronRight size={16} aria-hidden="true" />
                  </Button>
                </div>
                {previewWork.images.length > 1 && (
                  <div className="flex shrink-0 gap-2">
                    {previewWork.images.map((img, i) => (
                      <button
                        key={img}
                        onClick={() => setPreview({ workIndex: preview.workIndex, imageIndex: i })}
                        className={cn(
                          "size-11 overflow-hidden rounded-lg border transition-all sm:size-12",
                          i === preview.imageIndex
                            ? "border-primary ring-2 ring-primary/40"
                            : "border-glass-border opacity-70 hover:opacity-100",
                        )}
                        aria-label={`Show view ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt=""
                          onError={swapToFallback}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedWebsite && (
        <MiniWebsiteViewer
          project={selectedWebsite}
          onClose={() => setSelectedWebsite(null)}
          onSelectProject={(p) => setSelectedWebsite(p)}
          onBookService={() => {
            setSelectedWebsite(null);
            onOrder();
          }}
        />
      )}
    </>
  );
}
