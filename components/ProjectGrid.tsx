import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  featured?: boolean;
};

export function ProjectGrid({ projects, featured = false }: ProjectGridProps) {
  if (featured) {
    return (
      <div className="grid gap-4 pb-8 pt-4 md:-mx-8 md:flex md:overflow-x-auto md:px-8 lg:mx-0 lg:px-0">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} featured />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((project, index) => (
        <article key={project.slug} className="min-h-[28rem]">
          <ProjectCard project={project} index={index} />
        </article>
      ))}
    </div>
  );
}
