import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 pb-8 pt-12 text-sm text-stone-600 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
      <p>Gibson Chu · Urban Planner · Product Strategist · Civic Technologist</p>
      <div className="flex gap-4">
        <Link href="/work" className="hover:text-stone-950">
          Work
        </Link>
        <Link href="/writing" className="hover:text-stone-950">
          Writing
        </Link>
        <Link href="/contact" className="hover:text-stone-950">
          Contact
        </Link>
      </div>
    </footer>
  );
}
