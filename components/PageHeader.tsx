type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-10 pt-12 sm:px-8 lg:px-12">
      {eyebrow ? (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{eyebrow}</p>
      ) : null}
      <div className="grid gap-6 border-t border-stone-300/80 pt-8 md:grid-cols-[0.8fr_1.2fr]">
        <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] text-stone-950 sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description ? <p className="max-w-2xl text-lg leading-8 text-stone-600">{description}</p> : null}
      </div>
    </section>
  );
}
