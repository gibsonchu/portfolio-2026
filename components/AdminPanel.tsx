"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { Project, PortfolioContent } from "@/data/projects";
import { getDefaultPortfolioContent, normalizePortfolioContent, savePortfolioContent } from "@/lib/portfolioContent";
import { ProjectThumbnail } from "@/components/ProjectThumbnail";

type PendingUpload = {
  dataUrl: string;
  filename: string;
  path: string;
};

const shortFields: Array<{ key: keyof Pick<Project, "title" | "category" | "date" | "year" | "role" | "description">; label: string }> = [
  { key: "title", label: "Project title" },
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

function safeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uploadPath(slug: string, filename: string, index?: number) {
  const suffix = typeof index === "number" ? `-${index + 1}` : "";
  return `/uploads/${slug}${suffix}-${Date.now()}-${safeFilename(filename)}`;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function fieldId(project: Project, field: string) {
  return `${project.slug}-${field}`;
}

export function AdminPanel() {
  const [content, setContent] = useState<PortfolioContent>(() => getDefaultPortfolioContent());
  const [selectedSlug, setSelectedSlug] = useState("");
  const [password, setPassword] = useState("");
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [status, setStatus] = useState("Loading content...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/admin/content", { cache: "no-store" });
        const nextContent = normalizePortfolioContent((await response.json()) as Partial<PortfolioContent>);
        setContent(nextContent);
        setSelectedSlug(nextContent.projects[0]?.slug ?? "");
        setStatus("Ready.");
      } catch {
        const fallback = getDefaultPortfolioContent();
        setContent(fallback);
        setSelectedSlug(fallback.projects[0]?.slug ?? "");
        setStatus("Loaded bundled content. Remote content could not be fetched.");
      }
    }

    loadContent();
  }, []);

  const selectedProject = useMemo(
    () => content.projects.find((project) => project.slug === selectedSlug) ?? content.projects[0],
    [content.projects, selectedSlug]
  );

  function updateContent(nextContent: PortfolioContent, message = "Unsaved changes.") {
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

  function updateLink(slug: string, index: number, key: "label" | "href", value: string) {
    const project = content.projects.find((item) => item.slug === slug);

    if (!project) {
      return;
    }

    updateProject(slug, {
      links: project.links.map((link, linkIndex) => (linkIndex === index ? { ...link, [key]: value } : link))
    });
  }

  function addLink(slug: string) {
    const project = content.projects.find((item) => item.slug === slug);

    if (project) {
      updateProject(slug, { links: [...project.links, { label: "New link", href: "#" }] });
    }
  }

  function removeLink(slug: string, index: number) {
    const project = content.projects.find((item) => item.slug === slug);

    if (project) {
      updateProject(slug, { links: project.links.filter((_, linkIndex) => linkIndex !== index) });
    }
  }

  function toggleCover(slug: string) {
    const nextCoverSlugs = content.coverSlugs.includes(slug)
      ? content.coverSlugs.filter((item) => item !== slug)
      : [...content.coverSlugs, slug].slice(0, 5);

    updateContent({ ...content, coverSlugs: nextCoverSlugs }, "Cover selection changed.");
  }

  function moveCover(slug: string, direction: -1 | 1) {
    const index = content.coverSlugs.indexOf(slug);
    const nextIndex = index + direction;

    if (index < 0 || nextIndex < 0 || nextIndex >= content.coverSlugs.length) {
      return;
    }

    const nextCoverSlugs = [...content.coverSlugs];
    [nextCoverSlugs[index], nextCoverSlugs[nextIndex]] = [nextCoverSlugs[nextIndex], nextCoverSlugs[index]];
    updateContent({ ...content, coverSlugs: nextCoverSlugs }, "Cover order changed.");
  }

  async function uploadCoverImage(slug: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const dataUrl = await fileToDataUrl(file);
    const path = uploadPath(slug, file.name);
    setPendingUploads((uploads) => [...uploads, { dataUrl, filename: file.name, path: `public${path}` }]);
    updateProject(slug, { image: dataUrl });
    event.target.value = "";
  }

  async function uploadDetailImage(slug: string, event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const project = content.projects.find((item) => item.slug === slug);

    if (!project || files.length === 0) {
      return;
    }

    const nextImages = [...(project.images ?? (project.image ? [project.image] : []))];
    const uploads: PendingUpload[] = [];

    for (const file of files) {
      const dataUrl = await fileToDataUrl(file);
      const path = uploadPath(slug, file.name, nextImages.length);
      nextImages.push(dataUrl);
      uploads.push({ dataUrl, filename: file.name, path: `public${path}` });
    }

    setPendingUploads((current) => [...current, ...uploads]);
    updateProject(slug, { images: nextImages });
    event.target.value = "";
  }

  function removeDetailImage(slug: string, index: number) {
    const project = content.projects.find((item) => item.slug === slug);

    if (project) {
      updateProject(slug, { images: (project.images ?? []).filter((_, imageIndex) => imageIndex !== index) });
    }
  }

  function prepareContentForSave() {
    const uploadMap = new Map(pendingUploads.map((upload) => [upload.dataUrl, upload.path.replace(/^public/, "")]));

    return normalizePortfolioContent({
      ...content,
      projects: content.projects.map((project) => ({
        ...project,
        image: project.image && uploadMap.has(project.image) ? uploadMap.get(project.image) : project.image,
        images: project.images?.map((image) => uploadMap.get(image) ?? image)
      }))
    });
  }

  async function saveChanges() {
    setIsSaving(true);
    setStatus("Saving to GitHub. Vercel will redeploy after the commit.");

    const contentToSave = prepareContentForSave();

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: contentToSave,
          password,
          uploads: pendingUploads
        })
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? "Save failed");
      }

      setContent(contentToSave);
      savePortfolioContent(contentToSave);
      setPendingUploads([]);
      setStatus("Saved. Vercel is redeploying the public site from GitHub.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!selectedProject) {
    return null;
  }

  const detailImages = selectedProject.images ?? (selectedProject.image ? [selectedProject.image] : []);

  return (
    <main className="mx-auto w-full max-w-[92rem] px-5 py-8 sm:px-8 lg:px-12">
      <section className="sticky top-0 z-20 border-b border-stone-300/80 bg-[#e9e8e5]/95 py-5 backdrop-blur">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Hidden admin</p>
            <h1 className="mt-2 text-5xl font-semibold leading-none text-stone-950">Portfolio editor</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
              This saves content to GitHub and triggers a Vercel redeploy. Set `ADMIN_PASSWORD` and `GITHUB_CONTENT_TOKEN` in Vercel.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="admin-field min-w-72" htmlFor="admin-password">
              <span>Admin password</span>
              <input
                id="admin-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Required if ADMIN_PASSWORD is set"
                type="password"
                value={password}
              />
            </label>
            <button className="admin-save-button" disabled={isSaving} onClick={saveChanges} type="button">
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm text-stone-500">{status}</p>
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
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Front page projects</h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">Select up to five projects and order them.</p>
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

        <section className="grid gap-8 xl:grid-cols-[1fr_24rem]">
          <div className="space-y-8">
            <div className="grid gap-5">
              {shortFields.map((field) => (
                <label className="admin-field" htmlFor={fieldId(selectedProject, field.key)} key={field.key}>
                  <span>{field.label}</span>
                  <textarea
                    id={fieldId(selectedProject, field.key)}
                    onChange={(event) => updateProject(selectedProject.slug, { [field.key]: event.target.value } as Partial<Project>)}
                    rows={field.key === "description" ? 3 : 1}
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
                    rows={6}
                    value={selectedProject[field.key]}
                  />
                </label>
              ))}
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Related links</h2>
              <div className="mt-4 space-y-3">
                {selectedProject.links.map((link, index) => (
                  <div className="grid gap-3 border border-stone-300 bg-white/60 p-3 sm:grid-cols-[1fr_1fr_auto]" key={`${link.label}-${index}`}>
                    <label className="admin-field">
                      <span>Label</span>
                      <textarea
                        onChange={(event) => updateLink(selectedProject.slug, index, "label", event.target.value)}
                        rows={1}
                        value={link.label}
                      />
                    </label>
                    <label className="admin-field">
                      <span>URL</span>
                      <textarea
                        onChange={(event) => updateLink(selectedProject.slug, index, "href", event.target.value)}
                        rows={1}
                        value={link.href}
                      />
                    </label>
                    <button className="admin-button self-end" onClick={() => removeLink(selectedProject.slug, index)} type="button">
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

          <aside className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Cover image</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">This is the main image on the homepage and the top image on the project page.</p>
              <div className="mt-4 aspect-[4/5.7] overflow-hidden bg-white">
                <ProjectThumbnail project={selectedProject} index={0} />
              </div>
              <label className="admin-button mt-4 block cursor-pointer text-center">
                Upload cover image
                <input accept="image/*" className="hidden" onChange={(event) => uploadCoverImage(selectedProject.slug, event)} type="file" />
              </label>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Project page images</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">Upload multiple images for the selected project page.</p>
              <label className="admin-button mt-4 block cursor-pointer text-center">
                Upload project images
                <input accept="image/*" className="hidden" multiple onChange={(event) => uploadDetailImage(selectedProject.slug, event)} type="file" />
              </label>
              <div className="mt-4 grid gap-4">
                {detailImages.map((image, index) => (
                  <div className="border border-stone-300 bg-white/60 p-3" key={`${image}-${index}`}>
                    <div className="h-44 overflow-hidden bg-white">
                      <img alt="" className="h-full w-full object-cover" src={image} />
                    </div>
                    <button className="admin-button mt-3 w-full" onClick={() => removeDetailImage(selectedProject.slug, index)} type="button">
                      Remove image
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
