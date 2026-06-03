import Link from "next/link";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 lg:px-12">
      <section className="portfolio-shell relative flex min-h-[calc(100vh-8rem)] flex-col overflow-hidden border border-stone-200/80 bg-[var(--paper-soft)] px-5 py-8 sm:px-10 lg:px-14">
        <div className="absolute bottom-0 left-8 top-0 w-px bg-stone-200" />
        <div className="absolute bottom-0 left-11 top-0 w-px bg-white" />

        <div className="relative flex justify-between gap-6 text-xs uppercase tracking-[0.18em] text-stone-500">
          <p>Selected works</p>
          <p>2026</p>
        </div>

        <div className="relative order-2 mt-8 md:order-none md:mt-12 lg:mt-16">
          <ProjectGrid projects={projects} featured />
          <div className="mt-1 flex justify-end text-sm text-stone-500">
            <p>Urban systems, products, policy, and stories</p>
          </div>
        </div>

        <div className="relative order-1 mt-14 grid items-end gap-8 pb-2 md:order-none md:mt-8 md:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-6xl font-semibold leading-none text-stone-950 sm:text-7xl md:text-8xl">
              Portfolio
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-stone-600">
              Urban Planner · Product Strategist · Civic Technologist
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xl font-semibold text-stone-950">Gibson Chu</p>
            <Link href="/work" className="mt-4 inline-block text-sm uppercase tracking-[0.16em] text-stone-500 hover:text-stone-950">
              Enter work index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
