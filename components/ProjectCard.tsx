import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectThumbnail } from "@/components/ProjectThumbnail";

type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={[
        "group relative block overflow-hidden border border-stone-200/90 bg-white/78 shadow-[0_16px_42px_rgba(67,64,58,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(67,64,58,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800",
        featured ? "h-[18rem] w-full md:h-[20rem] md:min-w-[14rem] md:flex-[0_0_14rem] lg:min-w-[12rem] lg:flex-1" : "h-full"
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-55 saturate-[0.42] transition duration-300 group-hover:opacity-100 group-hover:saturate-100">
        <ProjectThumbnail project={project} index={index} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/66 via-stone-900/8 to-white/8 opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-0 p-4 text-white opacity-100 transition duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <p className="text-xs uppercase tracking-[0.16em] text-white/74">{project.category}</p>
        <h3 className="mt-2 text-xl font-semibold leading-tight">{project.title}</h3>
        <p className="mt-3 text-sm leading-5 text-white/82">{project.description}</p>
      </div>
      <span className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700/70 transition group-hover:text-white/80">
        {String(index + 1).padStart(2, "0")}
      </span>
    </Link>
  );
}
