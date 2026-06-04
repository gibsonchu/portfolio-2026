import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[92rem] justify-end px-5 pb-8 pt-10 text-xs uppercase tracking-[0.18em] text-stone-500 sm:px-8 lg:px-12">
      <div className="flex flex-wrap justify-end gap-4">
        <Link href="/work" className="hover:text-stone-950">
          Work
        </Link>
        <Link href="/writing" className="hover:text-stone-950">
          Writing
        </Link>
        <Link href="/about" className="hover:text-stone-950">
          About
        </Link>
        <Link href="/contact" className="hover:text-stone-950">
          Contact
        </Link>
      </div>
    </footer>
  );
}
