import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, Check, ShoppingBag, X } from "lucide-react";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

/**
 * Building blocks shared by the author website concepts. Every concept sets its own theme, so the
 * ten sites look different, but they share one level of polish. Layout uses container queries
 * (@3xl: and friends), so a site reacts to the width of its own preview frame: the tablet and
 * phone previews show the real tablet and phone layouts.
 */

export interface Theme {
  bg: string;
  bg2: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  card: string;
  border: string;
  /** Text colour on top of the accent colour. */
  on: string;
  display: string;
  body: string;
}

const themeStyle = (t: Theme) =>
  ({
    "--s-bg": t.bg,
    "--s-bg2": t.bg2,
    "--s-fg": t.fg,
    "--s-muted": t.muted,
    "--s-accent": t.accent,
    "--s-accent2": t.accent2,
    "--s-card": t.card,
    "--s-border": t.border,
    "--s-on": t.on,
    "--s-display": t.display,
    "--s-body": t.body,
  }) as CSSProperties;

export function Site({
  theme,
  id,
  className,
  children,
}: {
  theme: Theme;
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={`${id}-root`}
      style={themeStyle(theme)}
      className={cn(
        "@container relative min-h-full overflow-x-clip bg-[var(--s-bg)] text-[var(--s-fg)] antialiased [font-family:var(--s-body)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Smooth-scroll to a section of this site (sections are made with <Section id=…>). */
export const jump = (siteId: string, section: string) =>
  document
    .getElementById(`${siteId}-${section}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export function Section({
  site,
  id,
  className,
  children,
}: {
  site: string;
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={`${site}-${id}`}
      className={cn("relative scroll-mt-16 px-5 py-16 @3xl:px-10 @3xl:py-24", className)}
    >
      {children}
    </section>
  );
}

export const Wrap = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn("mx-auto w-full max-w-6xl", className)}>{children}</div>
);

export const Eyebrow = ({ className, children }: { className?: string; children: ReactNode }) => (
  <p
    className={cn(
      "text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--s-accent)]",
      className,
    )}
  >
    {children}
  </p>
);

export function Display({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn("[font-family:var(--s-display)] leading-[1.03] tracking-[-0.01em]", className)}
    >
      {children}
    </Tag>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
};

export function Btn({ variant = "solid", className, children, ...rest }: BtnProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 active:scale-[0.98]",
        variant === "solid" &&
          "bg-[var(--s-accent)] text-[var(--s-on)] shadow-[0_14px_34px_-14px_var(--s-accent)] hover:-translate-y-0.5 hover:brightness-110",
        variant === "outline" &&
          "border border-[var(--s-border)] bg-[var(--s-card)] text-[var(--s-fg)] hover:-translate-y-0.5 hover:border-[var(--s-accent)]",
        variant === "ghost" && "text-[var(--s-fg)]/80 hover:text-[var(--s-accent)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Nav({
  site,
  name,
  sub,
  links,
  cta,
  onCta,
  mark,
}: {
  site: string;
  name: string;
  sub: string;
  links: [section: string, label: string][];
  cta: string;
  onCta: () => void;
  mark?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[var(--s-border)] bg-[color-mix(in_oklab,var(--s-bg)_84%,transparent)] px-5 py-3.5 backdrop-blur-md @3xl:px-10">
      <button
        type="button"
        onClick={() => jump(site, "top")}
        className="flex min-w-0 items-center gap-3 text-left"
      >
        {mark}
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold leading-tight [font-family:var(--s-display)] @3xl:text-lg">
            {name}
          </span>
          <span className="block truncate text-[10px] uppercase tracking-[0.22em] text-[var(--s-muted)]">
            {sub}
          </span>
        </span>
      </button>
      <nav className="hidden items-center gap-1 @3xl:flex" aria-label={`${name} sections`}>
        {links.map(([section, label]) => (
          <button
            key={section}
            type="button"
            onClick={() => jump(site, section)}
            className="rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--s-muted)] transition-colors hover:text-[var(--s-accent)]"
          >
            {label}
          </button>
        ))}
      </nav>
      <Btn onClick={onCta} className="shrink-0 px-4 text-xs @3xl:text-sm">
        {cta}
      </Btn>
    </header>
  );
}

/**
 * A book with real thickness: cover, spine, page edges and a soft glow. It turns a little
 * further on hover. Pass the width in pixels; the height follows the usual 2:3 cover shape.
 */
export function Book3D({
  cover,
  title,
  width = 260,
  float = true,
  className,
}: {
  cover: string;
  title: string;
  width?: number;
  float?: boolean;
  className?: string;
}) {
  const height = Math.round(width * 1.5);
  const depth = Math.round(width * 0.11);
  return (
    <div
      className={cn("group relative mx-auto [perspective:1500px]", className)}
      style={{ width, height }}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--s-accent), transparent)" }}
      />
      <div className={cn(float && "[animation:s-float_7s_ease-in-out_infinite]")}>
        <div
          className="relative [transform-style:preserve-3d] [transform:rotateY(-26deg)_rotateX(3deg)] transition-transform duration-700 ease-out group-hover:[transform:rotateY(-12deg)_rotateX(1deg)]"
          style={{ width, height }}
        >
          {/* back */}
          <div
            className="absolute inset-0 rounded-md bg-[#1a1416]"
            style={{ transform: `translateZ(${-depth / 2}px)` }}
          />
          {/* page edge (right side) */}
          <div
            className="absolute top-[1.5%] h-[97%] rounded-sm"
            style={{
              width: depth - 2,
              left: width - (depth - 2) / 2,
              transform: "rotateY(90deg)",
              background: "repeating-linear-gradient(90deg, #f4ecdc 0 2px, #d9cdb4 2px 3px)",
            }}
          />
          {/* spine */}
          <div
            className="absolute left-0 top-0 h-full rounded-sm"
            style={{
              width: depth,
              transform: `translateX(${-depth / 2}px) rotateY(-90deg)`,
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--s-accent) 70%, #000), #120b0e)",
            }}
          />
          {/* front cover */}
          <div
            className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-[3px] shadow-[0_40px_60px_-20px_rgba(0,0,0,0.7)]"
            style={{ transform: `translateZ(${depth / 2}px)` }}
          >
            <img
              src={cover}
              alt={`Cover of ${title}`}
              width={600}
              height={900}
              loading="eager"
              className="h-full w-full object-cover"
            />
            {/* hinge shadow + light sheen */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.38) 0, rgba(255,255,255,0.12) 3.5%, rgba(0,0,0,0) 9%), linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 38%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, onClose]);
}

function Overlay({
  open,
  onClose,
  label,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        style={{ colorScheme: "dark" }}
        className={cn(
          "relative max-h-[92vh] w-full overflow-y-auto rounded-3xl border border-[var(--s-border)] bg-[var(--s-bg2)] text-[var(--s-fg)] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] animate-in fade-in-0 zoom-in-95 duration-300",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="sticky top-3 z-10 float-right mr-3 mt-3 grid size-11 place-items-center rounded-full border border-[var(--s-border)] bg-[var(--s-bg)]/90 text-[var(--s-fg)] backdrop-blur transition hover:border-[var(--s-accent)] hover:text-[var(--s-accent)]"
        >
          <X size={18} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}

/** Reading mode for a sample chapter. */
export function Reader({
  open,
  onClose,
  title,
  author,
  chapter,
  paragraphs,
  onBuy,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  author: string;
  chapter: string;
  paragraphs: string[];
  onBuy: () => void;
  className?: string;
}) {
  return (
    <Overlay
      open={open}
      onClose={onClose}
      label={`${title}, sample chapter`}
      className={cn("max-w-2xl", className)}
    >
      <article className="px-6 pb-10 pt-6 @container sm:px-12">
        <Eyebrow>{chapter}</Eyebrow>
        <h3 className="mt-2 text-3xl leading-tight [font-family:var(--s-display)] sm:text-4xl">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[var(--s-muted)]">by {author}</p>
        <div className="my-6 h-px bg-gradient-to-r from-[var(--s-accent)] via-[var(--s-border)] to-transparent" />
        <div className="space-y-5 text-[1.06rem] leading-[1.85] [font-family:var(--s-display)]">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--s-accent)]"
                  : undefined
              }
            >
              {p}
            </p>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Btn
            onClick={() => {
              onClose();
              onBuy();
            }}
          >
            <ShoppingBag size={16} aria-hidden="true" /> Continue reading
          </Btn>
          <span className="text-xs text-[var(--s-muted)]">
            Sample text written for this website concept.
          </span>
        </div>
      </article>
    </Overlay>
  );
}

const retailers = ["Amazon", "Apple Books", "Kobo", "Barnes & Noble", "Bookshop.org"];

/** "Get the book" panel. In a real site each button goes to the store. */
export function Retailers({
  open,
  onClose,
  title,
  author,
  cover,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  author: string;
  cover: string;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  useEffect(() => {
    if (!open) setPicked(null);
  }, [open]);
  return (
    <Overlay open={open} onClose={onClose} label={`Get ${title}`} className="max-w-md">
      <div className="px-6 pb-8 pt-6 sm:px-8">
        <div className="flex items-center gap-4">
          <img
            src={cover}
            alt=""
            width={64}
            height={96}
            className="h-24 w-16 rounded-md object-cover shadow-xl"
          />
          <div className="min-w-0">
            <Eyebrow>Get the book</Eyebrow>
            <h3 className="mt-1 text-2xl leading-tight [font-family:var(--s-display)]">{title}</h3>
            <p className="text-sm text-[var(--s-muted)]">{author}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-2.5">
          {retailers.map((store) => (
            <button
              key={store}
              type="button"
              onClick={() => setPicked(store)}
              className={cn(
                "flex min-h-12 items-center justify-between rounded-2xl border px-4 text-left text-sm font-semibold transition hover:-translate-y-0.5",
                picked === store
                  ? "border-[var(--s-accent)] bg-[var(--s-accent)]/10 text-[var(--s-accent)]"
                  : "border-[var(--s-border)] bg-[var(--s-card)] hover:border-[var(--s-accent)]",
              )}
            >
              {store}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p
          className="mt-5 min-h-10 rounded-xl bg-[var(--s-card)] px-4 py-3 text-xs leading-relaxed text-[var(--s-muted)]"
          role="status"
        >
          {picked
            ? `Website concept: on a real site this button opens ${title} on ${picked}.`
            : "Website concept: on a real site these buttons open the book in each store."}
        </p>
      </div>
    </Overlay>
  );
}

/** Email sign-up with a believable success state (nothing is sent in a concept). */
export function Signup({
  title,
  text,
  cta,
  gift,
  className,
}: {
  title: string;
  text: string;
  cta: string;
  gift?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = input.current?.value.trim() ?? "";
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError("Please enter a valid email address.");
      input.current?.focus();
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[var(--s-border)] bg-[var(--s-card)] p-6 @3xl:p-10",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--s-accent)" }}
      />
      {done ? (
        <div
          className="relative flex min-h-40 flex-col items-center justify-center text-center"
          role="status"
        >
          <span className="mb-4 grid size-14 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-on)]">
            <Check size={26} aria-hidden="true" />
          </span>
          <p className="text-2xl [font-family:var(--s-display)]">You&rsquo;re on the list.</p>
          <p className="mt-2 max-w-sm text-sm text-[var(--s-muted)]">
            Website concept: on a real site this is where the welcome email{" "}
            {gift ? `and ${gift} ` : ""}would arrive.
          </p>
        </div>
      ) : (
        <form
          onSubmit={submit}
          noValidate
          className="relative grid gap-5 @3xl:grid-cols-[1.1fr_1fr] @3xl:items-center"
        >
          <div>
            <h3 className="text-3xl leading-tight [font-family:var(--s-display)] @3xl:text-4xl">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--s-muted)] @3xl:text-base">
              {text}
            </p>
          </div>
          <div>
            <label htmlFor="signup-email" className="sr-only">
              Email address
            </label>
            <input
              id="signup-email"
              ref={input}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(error)}
              className="min-h-12 w-full rounded-full border border-[var(--s-border)] bg-[var(--s-bg)]/70 px-5 text-sm text-[var(--s-fg)] outline-none transition placeholder:text-[var(--s-muted)] focus:border-[var(--s-accent)]"
            />
            {error && (
              <p
                role="alert"
                className="mt-2 px-2 text-xs text-[color-mix(in_oklab,#ff5d5d_70%,var(--s-fg))]"
              >
                {error}
              </p>
            )}
            <Btn type="submit" className="mt-3 w-full">
              {cta} <ArrowRight size={16} aria-hidden="true" />
            </Btn>
          </div>
        </form>
      )}
    </div>
  );
}

export function ConceptFooter({ author, line }: { author: string; line?: string }) {
  return (
    <footer className="border-t border-[var(--s-border)] px-5 py-10 text-center text-xs leading-relaxed text-[var(--s-muted)] @3xl:px-10">
      <p className="text-sm text-[var(--s-fg)]/80 [font-family:var(--s-display)]">{author}</p>
      {line && <p className="mx-auto mt-1 max-w-md">{line}</p>}
      <p className="mt-4">
        Author website concept designed by {brand.name}. A design sample, not a live author site.
      </p>
    </footer>
  );
}
