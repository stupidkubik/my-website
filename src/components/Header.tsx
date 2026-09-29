import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

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
      <div className="container flex flex-col gap-3 py-5 xs:gap-4 xs:py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:flex-nowrap">
        <div>
          <Link
            className="text-[1.25rem] font-semibold tracking-[0.03em] xs:text-[1.375rem] sm:text-[1.5rem] lg:text-[1.75rem]"
            href="/"
          >
            Evgenii Rubin
          </Link>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-fg xxs:text-[10px] xxs:tracking-[0.09em] xs:mt-2 xs:text-xs xs:tracking-[0.12em]">
            Open to Work
          </p>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 xs:gap-3 sm:gap-5">
          <nav
            aria-label="Primary"
            className="flex min-w-0 flex-1 items-center justify-between gap-1 text-xs uppercase tracking-[0.04em] text-muted-fg xs:flex-none xs:justify-start xs:gap-3 xs:tracking-[0.1em] sm:gap-6 sm:text-[0.95rem] sm:tracking-[0.02em]"
          >
            {navItems.map((item) => {
              const isActive =
                router.pathname === item.href ||
                (item.href !== "/" && router.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-10 items-center border-b transition ${
                    isActive
                      ? "border-fg font-medium text-fg"
                      : "border-transparent text-muted-fg hover:text-fg"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
