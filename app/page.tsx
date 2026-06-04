import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[92rem] px-4 pb-10 sm:px-8 lg:px-12">
      <section className="portfolio-shell relative min-h-[calc(100vh-8rem)] overflow-hidden border border-stone-200/80 bg-[var(--paper-soft)] px-5 py-8 sm:px-10 lg:px-14">
        <div className="absolute bottom-0 left-7 top-0 w-px bg-stone-200" />
        <div className="absolute bottom-0 left-10 top-0 w-px bg-white" />

        <div className="relative flex justify-end text-xs uppercase tracking-[0.18em] text-stone-500">
          <p>Selected works</p>
        </div>

        <div className="relative mt-20 md:mt-[12vh] lg:mt-[12vh]">
          <ProjectGrid projects={projects} featured />
        </div>

        <div className="absolute bottom-6 left-10 right-5 grid items-end gap-6 sm:bottom-8 sm:left-16 md:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-5xl font-semibold leading-none text-stone-950 sm:text-6xl md:text-7xl">
              Portfolio
            </h1>
            <p className="mt-12 text-base text-stone-500 sm:mt-16">2026</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-base font-semibold text-stone-950">Gibson Chu</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-stone-500 md:max-w-sm">
              Urban Planner · Product Strategist · Civic Technologist
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
