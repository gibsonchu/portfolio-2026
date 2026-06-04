import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Navigation() {
  return (
    <header className="mx-auto flex w-full max-w-[92rem] items-center justify-between px-5 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-stone-600 sm:px-8 lg:px-12">
      <Link href="/" className="flex items-center" aria-label="Gibson Chu home">
        <Image src="/gibson-chu.gif" alt="Gibson Chu" width={48} height={48} unoptimized className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
      </Link>
      <nav aria-label="Primary navigation" className="flex flex-wrap justify-end gap-x-5 gap-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="book-nav-link transition hover:text-stone-950">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
