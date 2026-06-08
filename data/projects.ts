import portfolioContentData from "@/data/portfolio-content.json";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  date: string;
  role: string;
  description: string;
  image?: string;
  images?: string[];
  context: string;
  problem: string;
  approach: string;
  outcome: string;
  palette: {
    wash: string;
    line: string;
    accent: string;
  };
  links: {
    label: string;
    href: string;
  }[];
};

export type PortfolioContent = {
  projects: Project[];
  coverSlugs: string[];
};

export const portfolioContent = portfolioContentData as PortfolioContent;
export const projects = portfolioContent.projects;
export const coverSlugs = portfolioContent.coverSlugs;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
