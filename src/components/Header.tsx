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
      <div className="container flex flex-col gap-3 py-5 xs:gap-4 xs:py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            className="text-[0.95rem] font-semibold tracking-[0.04em] xs:text-base xs:tracking-[0.06em]"
            href="/"
          >
            Evgenii Rubin
          </Link>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-fg xs:mt-2 xs:text-xs xs:tracking-[0.12em]">
            Frontend Developer
          </p>
        </div>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-muted-fg xs:gap-4 xs:text-xs xs:tracking-[0.12em] sm:gap-6 sm:text-[0.95rem] sm:tracking-[0.02em]"
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
