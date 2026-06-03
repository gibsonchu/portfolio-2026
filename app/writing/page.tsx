import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Writing"
};

const articles = [
  {
    title: "How Cities Teach Us to Notice",
    deck: "A placeholder essay on attention, signs, streets, and the texture of public life.",
    href: "#"
  },
  {
    title: "The Product Surface of Public Space",
    deck: "A placeholder essay connecting civic interfaces, urban design, and everyday usability.",
    href: "#"
  },
  {
    title: "Transit as a Neighborhood Interface",
    deck: "A placeholder essay on mobility investments, housing questions, and corridor imagination.",
    href: "#"
  }
];

export default function WritingPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Writing"
        title="In Spaces writing."
        description="Essays and notes on cities, attention, public life, technology, housing, mobility, and the stories that make urban change legible."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div className="border-t border-stone-300/80 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">External home</h2>
          <a href="#" className="mt-5 inline-block text-2xl font-semibold text-stone-950 hover:text-stone-600">
            Substack / In Spaces
          </a>
          <p className="mt-4 max-w-md text-stone-600">
            Replace this placeholder with the live Substack URL when ready.
          </p>
        </div>
        <div className="grid gap-5">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.href}
              className="group border-t border-stone-300/80 py-7 transition hover:border-stone-950"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Placeholder article</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-stone-950 group-hover:text-stone-700">
                {article.title}
              </h3>
              <p className="mt-3 max-w-2xl text-lg leading-7 text-stone-600">{article.deck}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
