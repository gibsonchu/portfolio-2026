import { PageHeader } from "@/components/PageHeader";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Work"
};

export default function WorkPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Work"
        title="Selected civic, product, and urban systems work."
        description="A flexible index for planning research, product strategy, civic technology, mobility, public space, housing policy, cultural criticism, and storytelling."
      />
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 lg:px-12">
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}
