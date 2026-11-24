import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildServices,
  promoteServices,
  trailerExtras,
  trailerService,
  type Service,
} from "@/data/services";
import { trailers } from "@/data/trailers";
import { Poster } from "./Poster";
import { SectionHeading } from "./SectionHeading";

interface ServicesProps {
  onChoose: (service: string) => void;
}

function ServiceRow({ service, onChoose }: { service: Service; onChoose: (name: string) => void }) {
  const Icon = service.icon;
  return (
    <li>
      <button
        type="button"
        onClick={() => onChoose(service.name)}
        className="group flex min-h-16 w-full items-start gap-4 rounded-2xl px-3 py-3.5 text-left transition-colors duration-300 hover:bg-glass-strong"
      >
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-glass-border bg-glass text-primary transition-colors duration-300 group-hover:border-glass-highlight group-hover:text-gold">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.95rem] font-semibold leading-snug">{service.name}</span>
          <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
            {service.line}
          </span>
        </span>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="mt-1.5 shrink-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span className="sr-only">Ask about this service</span>
      </button>
    </li>
  );
}

export function Services({ onChoose }: ServicesProps) {
  const still = trailers[5];
  const TrailerIcon = trailerService.icon;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="cv-auto relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="services-title"
          eyebrow="What I do"
          title="One main service, and everything around it."
          intro="Trailers come first. The rest of my work helps readers find your book, trust it and buy it."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
          {/* Headline service */}
          <article className="glass-card group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl p-6 sm:p-9 lg:col-span-4">
            {still && (
              <div className="absolute inset-0" aria-hidden="true">
                <Poster trailer={still} width={1100} className="zoom-photo opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
              </div>
            )}
            <div className="relative max-w-lg">
              <span className="mb-5 grid size-12 place-items-center rounded-full bg-gold text-ink">
                <TrailerIcon size={22} aria-hidden="true" />
              </span>
              <h3 className="font-display text-4xl leading-none sm:text-6xl">
                {trailerService.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
                {trailerService.line}
              </p>
              <Button
                data-cta
                className="mt-7 w-full sm:w-auto"
                onClick={() => onChoose(trailerService.name)}
              >
                Order a book trailer <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </article>

          <div className="glass-card rounded-3xl p-3 sm:p-4 lg:col-span-2">
            <h3 className="px-3 pb-1 pt-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              Around the trailer
            </h3>
            <ul>
              {trailerExtras.map((s) => (
                <ServiceRow key={s.name} service={s} onChoose={onChoose} />
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-3 sm:p-4 lg:col-span-3">
            <h3 className="px-3 pb-1 pt-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              Promote &amp; launch
            </h3>
            <ul>
              {promoteServices.map((s) => (
                <ServiceRow key={s.name} service={s} onChoose={onChoose} />
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-3 sm:p-4 lg:col-span-3">
            <h3 className="px-3 pb-1 pt-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              Build &amp; polish
            </h3>
            <ul>
              {buildServices.map((s) => (
                <ServiceRow key={s.name} service={s} onChoose={onChoose} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
