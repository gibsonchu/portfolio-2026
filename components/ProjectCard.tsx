"use client";

import { type MouseEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/projects";
import { ProjectThumbnail } from "@/components/ProjectThumbnail";

type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [flyout, setFlyout] = useState<DOMRect | null>(null);

  function openProject(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(`/work/${project.slug}`);
      return;
    }

    setFlyout(rect);
    window.setTimeout(() => router.push(`/work/${project.slug}`), 520);
  }

  return (
    <>
    <a
      ref={cardRef}
      href={`/work/${project.slug}`}
      onClick={openProject}
      aria-label={`Open ${project.title}`}
      className={[
        "group relative block overflow-hidden bg-white shadow-[0_12px_34px_rgba(67,64,58,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(67,64,58,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800",
        featured ? "h-[15.5rem] w-full md:h-[18rem] md:min-w-[11rem] md:flex-[0_0_11rem] lg:h-[19rem] lg:min-w-[10.25rem] lg:flex-1" : "h-full"
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-50 saturate-[0.35] transition duration-500 group-hover:scale-[1.025] group-hover:opacity-95 group-hover:blur-[2px] group-hover:saturate-[0.85]">
        <ProjectThumbnail project={project} index={index} />
      </div>
      <div className="absolute inset-0 bg-white/20 opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 grid place-items-center bg-stone-950/18 px-4 text-center opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="translate-y-2 transition duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/76">{project.category}</p>
          <h3 className="mt-3 text-xl font-semibold leading-tight text-white">{project.title}</h3>
        </div>
      </div>
      <span className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700/55 transition group-hover:text-white/75">
        {String(index + 1).padStart(2, "0")}
      </span>
    </a>
    {flyout ? (
      <div
        className="project-card-flyout fixed z-50 overflow-hidden bg-white shadow-[0_28px_90px_rgba(31,33,31,0.24)]"
        style={{
          left: flyout.left,
          top: flyout.top,
          width: flyout.width,
          height: flyout.height
        }}
      >
        <ProjectThumbnail project={project} index={index} />
      </div>
    ) : null}
    </>
  );
}
