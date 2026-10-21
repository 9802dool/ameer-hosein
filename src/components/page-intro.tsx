export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-8 pt-28 md:px-8 md:pt-32">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
    </header>
  );
}
