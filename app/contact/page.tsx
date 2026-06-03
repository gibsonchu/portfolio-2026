import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Contact"
};

const links = [
  { label: "Email", value: "hello@gibsonchu.com", href: "mailto:hello@gibsonchu.com" },
  { label: "LinkedIn", value: "LinkedIn placeholder", href: "#" },
  { label: "GitHub", value: "GitHub placeholder", href: "#" },
  { label: "Substack", value: "Substack placeholder", href: "#" }
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about cities, products, and public life."
        description="For collaborations, research conversations, product strategy, writing, or civic technology projects."
      />
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="border-t border-stone-300/80 py-6 transition hover:border-stone-950"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{link.label}</p>
              <p className="mt-3 text-2xl font-semibold text-stone-950">{link.value}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
