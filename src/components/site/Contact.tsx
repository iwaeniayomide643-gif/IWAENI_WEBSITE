import { useRef, useState, type FormEvent } from "react";
import { Check, Mail, MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";
import { allServiceNames } from "@/data/services";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  bookTitle: z.string().trim().max(150),
  service: z.string().min(1, "Please choose a service."),
  message: z.string().trim().min(10, "Please share a little more about your book.").max(1500),
});

type Values = z.infer<typeof schema>;

const hasEmail = brand.contact.email.trim() !== "";
const hasWhatsApp = brand.contact.whatsapp.trim() !== "";

function composeMessage(v: Values) {
  return [
    `Hi ${brand.name}, I'm ${v.name}.`,
    v.bookTitle ? `Book: ${v.bookTitle}` : null,
    `Service: ${v.service}`,
    "",
    v.message,
    "",
    `Reply to: ${v.email}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

const openEmail = (v: Values) => {
  const subject = encodeURIComponent(`${v.service}${v.bookTitle ? `: ${v.bookTitle}` : ""}`);
  window.location.href = `mailto:${brand.contact.email}?subject=${subject}&body=${encodeURIComponent(composeMessage(v))}`;
};
const openWhatsApp = (v: Values) => {
  const digits = brand.contact.whatsapp.replace(/\D/g, "");
  window.open(
    `https://wa.me/${digits}?text=${encodeURIComponent(composeMessage(v))}`,
    "_blank",
    "noopener,noreferrer",
  );
};

interface ContactProps {
  service: string;
  onServiceChange: (service: string) => void;
}

const control =
  "min-h-12 w-full rounded-xl border border-glass-border bg-input px-4 text-base text-foreground outline-hidden transition-colors placeholder:text-muted-foreground/80 focus:border-gold aria-[invalid=true]:border-destructive";

function Field({
  id,
  label,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && (
          <span className="text-gold" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact({ service, onServiceChange }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState<Values | null>(null);

  const delivers = hasEmail || hasWhatsApp;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = schema.safeParse({ ...data, service });
    if (!result.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setErrors({});
    setSent(result.data);
    // One channel opens by itself; with two, the visitor picks on the next screen.
    if (hasEmail && !hasWhatsApp) openEmail(result.data);
    if (hasWhatsApp && !hasEmail) openWhatsApp(result.data);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel grid grid-cols-1 gap-10 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 lg:p-14">
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-gold">
              Start a conversation
            </p>
            <h2 id="contact-title" className="font-display text-4xl leading-[1.02] sm:text-6xl">
              Let&rsquo;s talk about your <span className="text-gold-gradient italic">book.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tell me where your book is now, and where you want it to go. If you want a trailer,
              choose &ldquo;Book Trailers&rdquo; in the list.
            </p>
          </div>

          {sent ? (
            <div
              className="flex min-h-80 flex-col items-center justify-center p-4 text-center"
              role="status"
            >
              <span className="mb-5 grid size-14 place-items-center rounded-full bg-gold text-ink">
                <Check size={26} aria-hidden="true" />
              </span>
              <h3 className="font-display text-4xl">Thank you, {sent.name.split(" ")[0]}.</h3>
              {delivers ? (
                <>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    {hasEmail && hasWhatsApp
                      ? "Choose how you want to send your message. It is ready to go."
                      : "Your message is ready. If nothing opened, press the button below."}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {hasEmail && (
                      <Button onClick={() => openEmail(sent)}>
                        <Mail size={17} aria-hidden="true" /> Send by email
                      </Button>
                    )}
                    {hasWhatsApp && (
                      <Button
                        variant={hasEmail ? "glass" : "primary"}
                        onClick={() => openWhatsApp(sent)}
                      >
                        <MessageCircle size={17} aria-hidden="true" /> Send on WhatsApp
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <p className="mt-3 max-w-md text-muted-foreground">
                  This form can&rsquo;t send messages yet, so nothing has been delivered. Please
                  check back soon.
                </p>
              )}
              <Button variant="ghost" className="mt-4" onClick={() => setSent(null)}>
                Write another message
              </Button>
            </div>
          ) : (
            <form
              ref={formRef}
              noValidate
              onSubmit={submit}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <Field id="c-name" label="Name" required error={errors.name}>
                <input
                  id="c-name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "c-name-error" : undefined}
                  className={control}
                />
              </Field>
              <Field id="c-email" label="Email" required error={errors.email}>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "c-email-error" : undefined}
                  className={control}
                />
              </Field>
              <Field id="c-book" label="Book title" error={errors.bookTitle}>
                <input
                  id="c-book"
                  name="bookTitle"
                  aria-invalid={!!errors.bookTitle}
                  className={control}
                />
              </Field>
              <Field id="c-service" label="Service needed" required error={errors.service}>
                <select
                  id="c-service"
                  name="service"
                  value={service}
                  onChange={(e) => onServiceChange(e.target.value)}
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? "c-service-error" : undefined}
                  className={control}
                >
                  <option value="" disabled className="bg-ink text-muted-foreground">
                    Choose a service
                  </option>
                  {allServiceNames.map((name) => (
                    <option key={name} value={name} className="bg-ink text-foreground">
                      {name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                id="c-message"
                label="Message"
                required
                error={errors.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your book, your goals and your timeline."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "c-message-error" : undefined}
                  className={cn(control, "py-3")}
                />
              </Field>
              <Button
                type="submit"
                size="lg"
                className="mt-1 w-full sm:col-span-2 sm:w-auto sm:justify-self-start"
              >
                Let&rsquo;s Talk About Your Book <Send size={17} aria-hidden="true" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
