"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectThumbnail } from "@/components/ProjectThumbnail";
import { usePortfolioContent } from "@/lib/portfolioContent";

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
  const { content, isHydrated } = usePortfolioContent();
  const activeProject = isHydrated ? content.projects.find((item) => item.slug === project.slug) ?? project : project;
  const activeIndex = isHydrated ? content.projects.findIndex((item) => item.slug === activeProject.slug) : index;
  const visualIndex = activeIndex >= 0 ? activeIndex : index;
  const selectedVisuals = activeProject.images?.length
    ? activeProject.images
    : activeProject.image
      ? [activeProject.image]
      : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-12">
      <article>
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm uppercase tracking-[0.16em] text-stone-500 hover:text-stone-950">
            Back to portfolio
          </Link>
          <p className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{activeProject.category}</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] text-stone-950 sm:text-6xl md:text-7xl">
            {activeProject.title}
          </h1>
          <p className="mt-7 text-xl leading-9 text-stone-600 sm:text-2xl">{activeProject.description}</p>
          <dl className="mt-10 grid gap-5 border-y border-stone-300/80 py-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="uppercase tracking-[0.16em] text-stone-500">Year</dt>
              <dd className="mt-2 font-medium text-stone-950">{activeProject.year}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-stone-500">Category</dt>
              <dd className="mt-2 font-medium text-stone-950">{activeProject.category}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-stone-500">Role</dt>
              <dd className="mt-2 font-medium text-stone-950">{activeProject.role}</dd>
            </div>
          </dl>
        </div>

        <div className="portfolio-shell mt-12 h-[42vh] min-h-80 overflow-hidden bg-white sm:mt-16 md:h-[58vh]">
          <ProjectThumbnail project={activeProject} index={visualIndex} />
        </div>

        <section className="mx-auto mt-16 max-w-3xl">
          {sections.map((section) => (
            <section key={section.key} className="border-t border-stone-300/80 py-9">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{section.label}</h2>
              <p className="mt-5 text-xl leading-9 text-stone-700">{activeProject[section.key]}</p>
            </section>
          ))}
        </section>

        <section className="mx-auto mt-8 max-w-5xl">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Selected visuals</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {selectedVisuals.length > 0
              ? selectedVisuals.map((image, imageIndex) => (
                  <div className="h-80 overflow-hidden bg-white shadow-[0_18px_46px_rgba(67,64,58,0.12)]" key={`${image}-${imageIndex}`}>
                    <img alt="" className="h-full w-full object-cover" src={image} />
                  </div>
                ))
              : [1, 2].map((offset) => (
                  <div className="h-80 overflow-hidden bg-white shadow-[0_18px_46px_rgba(67,64,58,0.12)]" key={offset}>
                    <ProjectThumbnail project={activeProject} index={visualIndex + offset} />
                  </div>
                ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl border-t border-stone-300/80 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Related links</h2>
          <div className="mt-4 flex flex-col">
            {activeProject.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="border-b border-stone-300/80 py-4 text-xl font-medium text-stone-950 hover:text-stone-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
