import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="Policy, design, technology, and narrative for more usable cities."
        description="Gibson Chu is an urban planner, product strategist, and civic technologist working across mobility, public space, housing, climate resilience, and urban storytelling. His work connects policy, design, technology, and narrative to help cities become more usable, equitable, and imaginative."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-16 sm:px-8 md:grid-cols-3 lg:px-12">
        {["Urban planning", "Product strategy", "Civic technology"].map((item) => (
          <div key={item} className="border-t border-stone-300/80 pt-6">
            <h2 className="text-xl font-semibold text-stone-950">{item}</h2>
            <p className="mt-4 leading-7 text-stone-600">
              Placeholder copy for background, selected experience, collaborators, and the kinds of questions this work is designed to answer.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
