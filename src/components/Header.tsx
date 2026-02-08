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
      <div className="container flex flex-col gap-3 py-5 xs:gap-4 xs:py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            className="text-[1.25rem] font-semibold tracking-[0.03em] xs:text-[1.375rem] sm:text-[1.5rem] lg:text-[1.75rem]"
            href="/"
          >
            Evgenii Rubin
          </Link>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-fg xxs:text-[10px] xxs:tracking-[0.09em] xs:mt-2 xs:text-xs xs:tracking-[0.12em]">
            Frontend Developer
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-5">
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-muted-fg xxs:gap-2 xxs:text-[10px] xxs:tracking-[0.06em] xs:gap-4 xs:text-xs xs:tracking-[0.12em] sm:gap-6 sm:text-[0.95rem] sm:tracking-[0.02em]"
          >
            {navItems.map((item) => {
              const isActive =
                router.pathname === item.href ||
                (item.href !== "/" && router.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition ${
                    isActive
                      ? "text-fg"
                      : "text-muted-fg hover:text-fg"
                  } inline-flex min-h-[2rem] items-center py-1`}
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
