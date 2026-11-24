import { SectionHeading } from "./SectionHeading";

const steps = [
  ["01", "Discover", "You tell me about your book, your readers and your goals."],
  [
    "02",
    "Plan",
    "We choose the style, length and mood of your trailer, and the services around it.",
  ],
  ["03", "Create", "I build your trailer and any promotional, editorial or web materials."],
  ["04", "Present", "You get polished materials, ready to show readers and promote your book."],
] as const;

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="cv-auto relative z-10 scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="process-title"
          eyebrow="My process"
          title="From first idea to final cut."
        />

        <ol className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, copy]) => (
            <li key={number} className="glass-card flex flex-col rounded-3xl p-6 sm:p-7">
              <span className="font-display text-6xl leading-none text-gold-gradient">
                {number}
              </span>
              <span className="my-6 block h-px bg-border" aria-hidden="true" />
              <h3 className="font-display text-3xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
