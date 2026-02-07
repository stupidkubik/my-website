import Link from "next/link";
import type { ReactNode } from "react";

type ProjectCardProps = {
  title: string;
  summary: string;
  href: string;
  children?: ReactNode;
};

export default function ProjectCard({ title, summary, href, children }: ProjectCardProps) {
  return (
    <div className="relative rounded-lg border border-border p-5 transition hover:border-fg focus-within:border-fg focus-within:ring-2 focus-within:ring-fg/20 focus-within:ring-offset-2 focus-within:ring-offset-bg">
      <Link aria-label={`Open project: ${title}`} className="stretched-link block" href={href}>
        <h3 className="text-h3 font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-fg">{summary}</p>
      </Link>
      {children ? (
        <div className="relative z-10 mt-4 space-y-3 text-sm pointer-events-none">{children}</div>
      ) : null}
    </div>
  );
}
