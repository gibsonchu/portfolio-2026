import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectThumbnail } from "@/components/ProjectThumbnail";

type ProjectDetailTemplateProps = {
  project: Project;
  index: number;
};

const sections = [
  { key: "context", label: "Context" },
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "outcome", label: "Outcome" }
] as const;

export function ProjectDetailTemplate({ project, index }: ProjectDetailTemplateProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
      <Link href="/work" className="text-sm uppercase tracking-[0.16em] text-stone-500 hover:text-stone-950">
        Back to work
      </Link>
      <section className="mt-8 grid gap-10 border-t border-stone-300/80 pt-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{project.category}</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.96] text-stone-950 sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-stone-600">{project.description}</p>
          <dl className="mt-10 grid gap-5 border-t border-stone-300/80 pt-7 text-sm sm:grid-cols-2">
            <div>
              <dt className="uppercase tracking-[0.16em] text-stone-500">Year</dt>
              <dd className="mt-2 font-medium text-stone-950">{project.year}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-stone-500">Role</dt>
              <dd className="mt-2 font-medium text-stone-950">{project.role}</dd>
            </div>
          </dl>
        </div>
        <div className="portfolio-shell h-[32rem] overflow-hidden bg-white">
          <ProjectThumbnail project={project} index={index} />
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.key} className="border-t border-stone-300/80 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{section.label}</h2>
            <p className="mt-4 text-lg leading-8 text-stone-700">{project[section.key]}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Selected visuals</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="h-72 overflow-hidden bg-white shadow-[0_18px_46px_rgba(67,64,58,0.12)]">
              <ProjectThumbnail project={project} index={index + 1} />
            </div>
            <div className="h-72 overflow-hidden bg-white shadow-[0_18px_46px_rgba(67,64,58,0.12)]">
              <ProjectThumbnail project={project} index={index + 2} />
            </div>
          </div>
        </div>
        <div className="border-t border-stone-300/80 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Related links</h2>
          <div className="mt-5 flex flex-col">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="border-b border-stone-300/80 py-4 text-lg font-medium text-stone-950 hover:text-stone-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
