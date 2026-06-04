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
      <div className={featured ? "group" : "group h-full"}>
        <a
          ref={cardRef}
          href={`/work/${project.slug}`}
          onClick={openProject}
          aria-label={`Open ${project.title}`}
          className={[
            "relative block overflow-hidden bg-white transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800",
            featured ? "aspect-[4/5.7] w-full" : "h-full"
          ].join(" ")}
        >
          <div className="absolute inset-0 grayscale saturate-0 transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:saturate-100">
            <ProjectThumbnail project={project} index={index} />
          </div>
          <div className="absolute inset-0 bg-stone-950/0 opacity-0 transition duration-300 group-hover:bg-stone-950/16 group-hover:opacity-100 group-focus-within:bg-stone-950/16 group-focus-within:opacity-100" />
          <div className="absolute inset-0 grid place-items-center px-4 text-center opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            <h3 className="text-xl font-semibold leading-tight text-white drop-shadow-sm">{project.title}</h3>
          </div>
          <span className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700/55 transition group-hover:text-white/75">
            {String(index + 1).padStart(2, "0")}
          </span>
        </a>
        <div className="mt-3 text-left">
          <p className="text-base font-bold leading-none text-stone-950">{project.title}</p>
          <p className="mt-1 text-base leading-tight text-stone-600">{project.date}</p>
        </div>
      </div>
      {flyout ? (
        <div
          className="project-card-flyout fixed z-50 overflow-hidden bg-white"
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
