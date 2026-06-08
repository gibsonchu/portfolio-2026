"use client";

import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { usePortfolioContent } from "@/lib/portfolioContent";

type ProjectGridProps = {
  projects: Project[];
  featured?: boolean;
};

export function ProjectGrid({ projects, featured = false }: ProjectGridProps) {
  const { content, isHydrated } = usePortfolioContent();
  const activeProjects = isHydrated ? content.projects : projects;

  if (featured) {
    const projectMap = new Map(activeProjects.map((project) => [project.slug, project]));
    const featuredProjects = isHydrated
      ? content.coverSlugs.map((slug) => projectMap.get(slug)).filter((project): project is Project => Boolean(project))
      : activeProjects.slice(0, 5);

    return (
      <div className="grid gap-x-4 gap-y-8 pb-8 pt-4 sm:grid-cols-2 md:grid-cols-5 md:gap-x-4 lg:gap-x-5">
        {featuredProjects.slice(0, 5).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} featured />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-x-9 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
      {activeProjects.map((project, index) => (
        <article key={project.slug} className="min-h-[28rem]">
          <ProjectCard project={project} index={index} />
        </article>
      ))}
    </div>
  );
}
