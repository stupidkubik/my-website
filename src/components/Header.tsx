import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-6">
        <Link className="text-sm font-semibold uppercase tracking-[0.2em]" href="/">
          Evgenii Rubin
        </Link>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-fg">
          {navItems.map((item) => (
            <Link key={item.href} className="transition hover:text-fg" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
