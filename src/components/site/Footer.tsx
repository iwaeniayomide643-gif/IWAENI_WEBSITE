import { ArrowUp } from "lucide-react";
import { brand, nav, prettyPhone } from "@/data/brand";
import { scrollToId } from "@/lib/motion";

export function Footer() {
  return (
    <footer className="cv-auto relative z-10 border-t border-border px-4 pb-28 pt-14 sm:px-6 lg:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-display text-5xl leading-none sm:text-6xl">{brand.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {brand.tagline}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 text-sm">
            {brand.contact.whatsapp && (
              <a
                href={`https://wa.me/${brand.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="link-draw">WhatsApp {prettyPhone(brand.contact.whatsapp)}</span>
              </a>
            )}
            {brand.contact.email && (
              <a
                href={`mailto:${brand.contact.email}`}
                className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="link-draw">{brand.contact.email}</span>
              </a>
            )}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-2 gap-y-1">
            {[...nav, { id: "contact", label: "Contact" }].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.id);
                  }}
                  className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="link-draw">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("home");
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 transition-colors hover:text-foreground"
        >
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
