interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}

export function SectionHeading({ id, eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-gold">
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}
