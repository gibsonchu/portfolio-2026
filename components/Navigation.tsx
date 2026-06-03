import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Navigation() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 text-[0.76rem] uppercase tracking-[0.16em] text-stone-700 sm:px-8 lg:px-12">
      <Link href="/" className="font-semibold text-stone-950">
        Gibson Chu
      </Link>
      <nav aria-label="Primary navigation" className="flex flex-wrap justify-end gap-x-5 gap-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-stone-950">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
