import { ArrowRight, Play } from "lucide-react";
import { authorWebsites } from "@/data/authorWebsites";
import { formattedWorks } from "@/data/formattedWorks";
import { trailers } from "@/data/trailers";
import { Poster } from "./Poster";
import { PreviewVideo } from "./PreviewVideo";
import { SectionHeading } from "./SectionHeading";

interface PortfolioProps {
  onOpenTrailers: () => void;
  onOpenFormatted: () => void;
  onOpenWebsites: () => void;
}

function CardShell({
  onClick,
  media,
  label,
  title,
  line,
  meta,
  action,
}: {
  onClick: () => void;
  media: React.ReactNode;
  label: string;
  title: string;
  line: string;
  meta: string;
  action: string;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-label={`${action}: ${title}`}
        className="group lift glass-card flex h-full w-full flex-col rounded-3xl text-left"
      >
        <span className="relative block aspect-[4/3] overflow-hidden border-b border-glass-border bg-black/30">
          {media}
        </span>
        <span className="flex flex-1 flex-col p-6 sm:p-7">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            {label}
          </span>
          <span className="mt-2 block font-display text-3xl leading-tight sm:text-4xl">
            {title}
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{line}</span>
          <span className="mt-6 flex items-center justify-between gap-3 pt-1">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-foreground/80">
              {meta}
            </span>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-glass-border bg-glass transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight size={18} aria-hidden="true" />
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}

export function Portfolio({ onOpenTrailers, onOpenFormatted, onOpenWebsites }: PortfolioProps) {
  const still = trailers[2];
  const coverBack = formattedWorks.find((w) => w.title.includes("21-Day"))?.images[0];
  const coverFront = formattedWorks.find((w) => w.title.includes("Detach"))?.images[0];

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="cv-auto relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="portfolio-title"
          eyebrow="Portfolio"
          title="Beyond the trailer."
          intro="Book formatting projects and author website concepts, next to the trailer reel."
        />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CardShell
            onClick={onOpenTrailers}
            action="Open"
            label="Book trailers"
            title="Sample trailers"
            line="Watch every sample trailer in the full player."
            meta={`${trailers.length} trailers`}
            media={
              <>
                {still && <Poster trailer={still} width={900} className="zoom-photo" />}
                {still && <PreviewVideo trailer={still} className="zoom-photo" hint />}
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-16 place-items-center rounded-full bg-foreground/95 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-110">
                    <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
                  </span>
                </span>
              </>
            }
          />

          <CardShell
            onClick={onOpenFormatted}
            action="Open"
            label="Formatted books"
            title="Covers & interiors"
            line="Print and ebook layouts, workbooks and full cover designs."
            meta={`${formattedWorks.length} projects`}
            media={
              <span className="absolute inset-0 grid place-items-center p-5">
                {coverBack && (
                  <img
                    src={coverBack}
                    alt=""
                    loading="lazy"
                    width={1100}
                    height={733}
                    className="zoom-photo absolute left-[6%] top-[9%] w-[68%] rounded-lg border border-glass-border object-cover shadow-2xl"
                  />
                )}
                {coverFront && (
                  <img
                    src={coverFront}
                    alt=""
                    loading="lazy"
                    width={1100}
                    height={661}
                    className="zoom-photo absolute bottom-[8%] right-[6%] w-[68%] rounded-lg border border-glass-highlight object-cover shadow-2xl"
                  />
                )}
              </span>
            }
          />

          <CardShell
            onClick={onOpenWebsites}
            action="Open"
            label="Author websites"
            title="Website concepts"
            line="Concept designs for romance, fantasy, thriller and more."
            meta={`${authorWebsites.length} concepts`}
            media={
              <span className="absolute inset-0 grid place-items-center p-5">
                <img
                  src="/images/websites/romance-author-atelier.svg"
                  alt=""
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="zoom-photo absolute left-[6%] top-[9%] w-[68%] rounded-lg border border-glass-border object-cover shadow-2xl"
                />
                <img
                  src="/images/websites/thriller-author-terminal.svg"
                  alt=""
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="zoom-photo absolute bottom-[8%] right-[6%] w-[68%] rounded-lg border border-glass-highlight object-cover shadow-2xl"
                />
              </span>
            }
          />
        </ul>
      </div>
    </section>
  );
}
