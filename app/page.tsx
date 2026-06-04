import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[92rem] px-4 pb-10 sm:px-8 lg:px-12">
      <section className="portfolio-shell relative min-h-[calc(100vh-8rem)] overflow-hidden border border-stone-200/80 bg-[var(--paper-soft)] px-5 py-8 sm:px-10 lg:px-14">
        <div className="absolute bottom-0 left-7 top-0 w-px bg-stone-200" />
        <div className="absolute bottom-0 left-10 top-0 w-px bg-white" />
        <div className="absolute bottom-0 left-0 top-0 w-7 bg-gradient-to-r from-stone-200/70 to-transparent" />

        <div className="relative flex justify-end text-xs uppercase tracking-[0.18em] text-stone-500">
          <p>Selected works</p>
        </div>

        <div className="relative mt-16 md:mt-[9vh] lg:mt-[8vh]">
          <ProjectGrid projects={projects} featured />
        </div>

        <div className="absolute bottom-8 left-10 right-5 sm:bottom-10 sm:left-16">
          <div>
            <h1 className="text-5xl font-semibold leading-none text-stone-950 sm:text-6xl md:text-6xl lg:text-7xl">
              Gibson Chu
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}
