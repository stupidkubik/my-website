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
    <div className="relative rounded-lg border border-border p-5 transition hover:border-fg">
      <Link className="stretched-link block" href={href}>
        <h3 className="text-h3 font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-fg">{summary}</p>
      </Link>
      {children ? (
        <div className="relative z-10 mt-4 space-y-3 text-sm pointer-events-none">{children}</div>
      ) : null}
    </div>
  );
}
