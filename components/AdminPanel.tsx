"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import {
  clearPortfolioContent,
  getDefaultPortfolioContent,
  normalizePortfolioContent,
  readPortfolioContent,
  savePortfolioContent,
  type PortfolioContent
} from "@/lib/portfolioContent";
import { ProjectThumbnail } from "@/components/ProjectThumbnail";

const textFields: Array<{ key: keyof Pick<Project, "title" | "category" | "date" | "year" | "role" | "description">; label: string }> = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "date", label: "Date" },
  { key: "year", label: "Year" },
  { key: "role", label: "Role" },
  { key: "description", label: "Short description" }
];

const longFields: Array<{ key: keyof Pick<Project, "context" | "problem" | "approach" | "outcome">; label: string }> = [
  { key: "context", label: "Context" },
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "outcome", label: "Outcome" }
];

function fieldId(project: Project, field: string) {
  return `${project.slug}-${field}`;
}

export function AdminPanel() {
  const [content, setContent] = useState<PortfolioContent>(() => {
    if (typeof window === "undefined") {
      return getDefaultPortfolioContent();
    }

    return readPortfolioContent();
  });
  const [selectedSlug, setSelectedSlug] = useState(content.projects[0]?.slug ?? "");
  const [status, setStatus] = useState("Unsaved changes stay here until you click Save.");
  const importInputRef = useRef<HTMLInputElement>(null);

  const selectedProject = useMemo(
    () => content.projects.find((project) => project.slug === selectedSlug) ?? content.projects[0],
    [content.projects, selectedSlug]
  );

  function updateContent(nextContent: PortfolioContent, message = "Unsaved changes") {
    const normalized = normalizePortfolioContent(nextContent);
    setContent(normalized);
    setStatus(message);

    if (!normalized.projects.some((project) => project.slug === selectedSlug)) {
      setSelectedSlug(normalized.projects[0]?.slug ?? "");
    }
  }

  function updateProject(slug: string, patch: Partial<Project>) {
    updateContent({
      ...content,
      projects: content.projects.map((project) => (project.slug === slug ? { ...project, ...patch } : project))
    });
  }

  function updatePalette(slug: string, key: keyof Project["palette"], value: string) {
    const project = content.projects.find((item) => item.slug === slug);

    if (!project) {
      return;
    }

    updateProject(slug, {
      palette: {
        ...project.palette,
        [key]: value
      }
    });
  }

  function updateLink(slug: string, index: number, key: "label" | "href", value: string) {
    const project = content.projects.find((item) => item.slug === slug);

    if (!project) {
      return;
    }

    const links = project.links.map((link, linkIndex) => (linkIndex === index ? { ...link, [key]: value } : link));
    updateProject(slug, { links });
  }

  function addLink(slug: string) {
    const project = content.projects.find((item) => item.slug === slug);

    if (!project) {
      return;
    }

    updateProject(slug, {
      links: [...project.links, { label: "New link", href: "#" }]
    });
  }

  function removeLink(slug: string, index: number) {
    const project = content.projects.find((item) => item.slug === slug);

    if (!project) {
      return;
    }

    updateProject(slug, {
      links: project.links.filter((_, linkIndex) => linkIndex !== index)
    });
  }

  function toggleCover(slug: string) {
    const isSelected = content.coverSlugs.includes(slug);
    const nextCoverSlugs = isSelected
      ? content.coverSlugs.filter((item) => item !== slug)
      : [...content.coverSlugs, slug].slice(0, 5);

    updateContent({ ...content, coverSlugs: nextCoverSlugs }, "Cover selection changed");
  }

  function moveCover(slug: string, direction: -1 | 1) {
    const index = content.coverSlugs.indexOf(slug);

    if (index < 0) {
      return;
    }

    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= content.coverSlugs.length) {
      return;
    }

    const nextCoverSlugs = [...content.coverSlugs];
    [nextCoverSlugs[index], nextCoverSlugs[nextIndex]] = [nextCoverSlugs[nextIndex], nextCoverSlugs[index]];
    updateContent({ ...content, coverSlugs: nextCoverSlugs }, "Cover order changed");
  }

  function saveChanges() {
    savePortfolioContent(content);
    setStatus("Saved in this browser. Refresh the public pages here to see the updates.");
  }

  function resetChanges() {
    clearPortfolioContent();
    const defaults = getDefaultPortfolioContent();
    setContent(defaults);
    setSelectedSlug(defaults.projects[0]?.slug ?? "");
    setStatus("Reset to bundled site content.");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gibson-portfolio-content.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Exported JSON.");
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const imported = normalizePortfolioContent(JSON.parse(text) as Partial<PortfolioContent>);
      setContent(imported);
      setSelectedSlug(imported.projects[0]?.slug ?? "");
      setStatus("Imported JSON. Click Save to use it in this browser.");
      event.target.value = "";
    } catch {
      setStatus("That JSON file could not be imported.");
    }
  }

  function uploadImage(slug: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateProject(slug, { image: String(reader.result) });
      setStatus("Image loaded. Click Save to use it in this browser.");
    };
    reader.readAsDataURL(file);
  }

  if (!selectedProject) {
    return null;
  }

  return (
    <main className="mx-auto w-full max-w-[92rem] px-5 py-8 sm:px-8 lg:px-12">
      <section className="border-b border-stone-300/80 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Hidden admin</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-5xl font-semibold leading-none text-stone-950">Portfolio editor</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
              Edit project copy, upload browser-stored images, and choose the five work plates on the cover.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="admin-button-primary" onClick={saveChanges} type="button">
              Save
            </button>
            <button className="admin-button" onClick={exportJson} type="button">
              Export JSON
            </button>
            <button className="admin-button" onClick={() => importInputRef.current?.click()} type="button">
              Import JSON
            </button>
            <button className="admin-button" onClick={resetChanges} type="button">
              Reset
            </button>
            <input ref={importInputRef} accept="application/json" className="hidden" onChange={importJson} type="file" />
          </div>
        </div>
        <p className="mt-4 text-sm text-stone-500">{status}</p>
      </section>

      <section className="grid gap-8 py-8 lg:grid-cols-[20rem_1fr]">
        <aside className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Projects</h2>
            <div className="mt-4 space-y-2">
              {content.projects.map((project) => (
                <button
                  className={[
                    "w-full border px-4 py-3 text-left text-sm transition",
                    project.slug === selectedProject.slug
                      ? "border-stone-950 bg-stone-950 text-white"
                      : "border-stone-300 bg-white/60 text-stone-700 hover:border-stone-600"
                  ].join(" ")}
                  key={project.slug}
                  onClick={() => setSelectedSlug(project.slug)}
                  type="button"
                >
                  <span className="block font-semibold">{project.title}</span>
                  <span className="mt-1 block text-xs opacity-70">{project.date}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Cover work</h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">Select up to five projects for the front page.</p>
            <div className="mt-4 space-y-2">
              {content.projects.map((project) => {
                const isSelected = content.coverSlugs.includes(project.slug);

                return (
                  <div className="flex items-center gap-2 border border-stone-300 bg-white/60 px-3 py-2" key={project.slug}>
                    <label className="flex min-w-0 flex-1 items-center gap-2 text-sm">
                      <input checked={isSelected} onChange={() => toggleCover(project.slug)} type="checkbox" />
                      <span className="truncate">{project.title}</span>
                    </label>
                    {isSelected ? (
                      <div className="flex gap-1">
                        <button className="admin-mini-button" onClick={() => moveCover(project.slug, -1)} type="button">
                          Up
                        </button>
                        <button className="admin-mini-button" onClick={() => moveCover(project.slug, 1)} type="button">
                          Down
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="grid gap-8 xl:grid-cols-[1fr_22rem]">
          <div className="space-y-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {textFields.map((field) => (
                <label className="admin-field" htmlFor={fieldId(selectedProject, field.key)} key={field.key}>
                  <span>{field.label}</span>
                  <input
                    id={fieldId(selectedProject, field.key)}
                    onChange={(event) => updateProject(selectedProject.slug, { [field.key]: event.target.value } as Partial<Project>)}
                    value={String(selectedProject[field.key])}
                  />
                </label>
              ))}
            </div>

            <div className="grid gap-5">
              {longFields.map((field) => (
                <label className="admin-field" htmlFor={fieldId(selectedProject, field.key)} key={field.key}>
                  <span>{field.label}</span>
                  <textarea
                    id={fieldId(selectedProject, field.key)}
                    onChange={(event) => updateProject(selectedProject.slug, { [field.key]: event.target.value } as Partial<Project>)}
                    rows={4}
                    value={selectedProject[field.key]}
                  />
                </label>
              ))}
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Links</h2>
              <div className="mt-4 space-y-3">
                {selectedProject.links.map((link, index) => (
                  <div className="grid gap-3 border border-stone-300 bg-white/60 p-3 sm:grid-cols-[1fr_1fr_auto]" key={`${link.label}-${index}`}>
                    <input
                      aria-label="Link label"
                      className="admin-input"
                      onChange={(event) => updateLink(selectedProject.slug, index, "label", event.target.value)}
                      value={link.label}
                    />
                    <input
                      aria-label="Link URL"
                      className="admin-input"
                      onChange={(event) => updateLink(selectedProject.slug, index, "href", event.target.value)}
                      value={link.href}
                    />
                    <button className="admin-button" onClick={() => removeLink(selectedProject.slug, index)} type="button">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button className="admin-button mt-4" onClick={() => addLink(selectedProject.slug)} type="button">
                Add link
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Image</h2>
              <div className="mt-4 aspect-[4/5.7] overflow-hidden bg-white">
                <ProjectThumbnail project={selectedProject} index={0} />
              </div>
              <label className="admin-button mt-4 block cursor-pointer text-center">
                Upload image
                <input accept="image/*" className="hidden" onChange={(event) => uploadImage(selectedProject.slug, event)} type="file" />
              </label>
              <button className="admin-button mt-2 w-full" onClick={() => updateProject(selectedProject.slug, { image: undefined })} type="button">
                Use generated placeholder
              </button>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Placeholder colors</h2>
              <div className="mt-4 grid gap-3">
                {(["wash", "line", "accent"] as Array<keyof Project["palette"]>).map((key) => (
                  <label className="admin-field" htmlFor={fieldId(selectedProject, key)} key={key}>
                    <span>{key}</span>
                    <input
                      id={fieldId(selectedProject, key)}
                      onChange={(event) => updatePalette(selectedProject.slug, key, event.target.value)}
                      type="color"
                      value={selectedProject.palette[key]}
                    />
                  </label>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
