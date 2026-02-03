import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-border bg-bg">
      <div className="container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link className="text-sm font-semibold uppercase tracking-[0.2em]" href="/">
            Evgenii Rubin
          </Link>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-fg">
            Frontend Developer
          </p>
        </div>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.12em] text-muted-fg sm:gap-5 sm:text-sm sm:tracking-normal"
        >
          {navItems.map((item) => {
            const isActive =
              router.pathname === item.href ||
              (item.href !== "/" && router.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                className={`transition ${
                  isActive ? "text-fg" : "text-muted-fg hover:text-fg"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
