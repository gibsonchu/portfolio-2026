"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

export type PortfolioContent = {
  projects: Project[];
  coverSlugs: string[];
};

export const PORTFOLIO_CONTENT_KEY = "gibson-portfolio-content-v1";
export const PORTFOLIO_CONTENT_EVENT = "portfolio-content-updated";

export function getDefaultPortfolioContent(): PortfolioContent {
  return {
    projects,
    coverSlugs: projects.slice(0, 5).map((project) => project.slug)
  };
}

export function normalizePortfolioContent(content: Partial<PortfolioContent> | null): PortfolioContent {
  const fallback = getDefaultPortfolioContent();
  const nextProjects = Array.isArray(content?.projects) && content.projects.length > 0 ? content.projects : fallback.projects;
  const validSlugs = new Set(nextProjects.map((project) => project.slug));
  const nextCoverSlugs = (Array.isArray(content?.coverSlugs) ? content.coverSlugs : fallback.coverSlugs).filter((slug) =>
    validSlugs.has(slug)
  );

  return {
    projects: nextProjects,
    coverSlugs: nextCoverSlugs.length > 0 ? nextCoverSlugs.slice(0, 5) : nextProjects.slice(0, 5).map((project) => project.slug)
  };
}

export function readPortfolioContent(): PortfolioContent {
  if (typeof window === "undefined") {
    return getDefaultPortfolioContent();
  }

  const raw = window.localStorage.getItem(PORTFOLIO_CONTENT_KEY);

  if (!raw) {
    return getDefaultPortfolioContent();
  }

  try {
    return normalizePortfolioContent(JSON.parse(raw) as Partial<PortfolioContent>);
  } catch {
    return getDefaultPortfolioContent();
  }
}

export function savePortfolioContent(content: PortfolioContent) {
  const normalized = normalizePortfolioContent(content);
  window.localStorage.setItem(PORTFOLIO_CONTENT_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event(PORTFOLIO_CONTENT_EVENT));
}

export function clearPortfolioContent() {
  window.localStorage.removeItem(PORTFOLIO_CONTENT_KEY);
  window.dispatchEvent(new Event(PORTFOLIO_CONTENT_EVENT));
}

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(() => getDefaultPortfolioContent());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    function refresh() {
      setContent(readPortfolioContent());
      setIsHydrated(true);
    }

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(PORTFOLIO_CONTENT_EVENT, refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PORTFOLIO_CONTENT_EVENT, refresh);
    };
  }, []);

  return useMemo(() => ({ content, isHydrated }), [content, isHydrated]);
}
