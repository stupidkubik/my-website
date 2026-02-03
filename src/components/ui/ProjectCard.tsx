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
    <div className="rounded-lg border border-border p-5 transition hover:border-fg">
      <Link className="block" href={href}>
        <h3 className="text-h3 font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-fg">{summary}</p>
      </Link>
      {children ? <div className="mt-4 flex flex-wrap gap-4 text-sm">{children}</div> : null}
    </div>
  );
}
