import { useEffect, useState } from "react";
import { ArrowUpRight, Clapperboard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand, nav } from "@/data/brand";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/motion";

interface HeaderProps {
  onOrder: () => void;
}

export function Header({ onOrder }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section that is crossing the middle of the screen.
  useEffect(() => {
    const targets = [...nav.map((item) => item.id), "home", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // "home" and "contact" are not in the nav, so they simply clear the highlight.
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // wait one frame so the scroll lock is released before scrolling
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "glass-panel mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pl-3 pr-2 transition-[background-color,box-shadow] duration-500 sm:pl-4",
          scrolled && "shadow-[0_18px_50px_rgba(8,3,8,0.7)]",
        )}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
          className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-full pr-2"
          aria-label={`${brand.name}, back to top`}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-ink">
            <Clapperboard size={18} strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="truncate font-display text-[1.35rem] leading-none tracking-tight sm:text-2xl">
            {brand.name}
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors hover:text-foreground",
                  active === item.id ? "bg-glass-strong text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button onClick={onOrder} size="sm" className="hidden min-h-11 sm:inline-flex">
            Order a trailer <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="size-11 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      {/* Full-screen menu for phones and tablets */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 -z-10 overflow-y-auto bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-md flex-col">
          {[...nav, { id: "contact", label: "Contact" }].map((item, i) => (
            <li key={item.id} className="border-b border-border">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                className="flex min-h-16 items-baseline gap-4 py-3 font-display text-4xl"
              >
                <span className="font-mono text-xs tracking-widest text-gold">0{i + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-8 max-w-md">
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              setOpen(false);
              onOrder();
            }}
          >
            Order a book trailer <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}

/** A thumb-reach shortcut on phones. Hidden while the contact form or footer is on screen. */
export function MobileCta({ onOrder }: HeaderProps) {
  const [past, setPast] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Step aside whenever a real Order button, the form or the footer is on screen.
    const ends = Array.from(document.querySelectorAll<HTMLElement>("[data-cta], #contact, footer"));
    const seen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) seen.add(entry.target);
        else seen.delete(entry.target);
      }
      setAtEnd(seen.size > 0);
    });
    ends.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const show = past && !atEnd;
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-500 lg:hidden",
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
    >
      <Button
        onClick={onOrder}
        size="lg"
        tabIndex={show ? 0 : -1}
        aria-hidden={!show}
        className="pointer-events-auto w-full max-w-[19rem] shadow-[0_14px_40px_rgba(8,3,8,0.7)]"
      >
        Order a book trailer <ArrowUpRight size={18} aria-hidden="true" />
      </Button>
    </div>
  );
}
