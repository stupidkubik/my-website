import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { ProjectCover } from "@/data/projects";

const previewSizes =
  "(min-width: 1280px) 373px, (min-width: 640px) calc((100vw - 4.5rem) / 2), calc(100vw - 2rem)";

type ProjectCardProps = {
  title: string;
  summary: string;
  href: string;
  cover?: ProjectCover;
  headingAs?: "h2" | "h3";
  children?: ReactNode;
};

export default function ProjectCard({
  title,
  summary,
  href,
  cover,
  headingAs = "h3",
  children
}: ProjectCardProps) {
  const Heading = headingAs;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-interactive-border transition hover:border-fg focus-within:border-fg focus-within:ring-2 focus-within:ring-fg/30 focus-within:ring-offset-2 focus-within:ring-offset-bg">
      <Link aria-label={`Open project: ${title}`} className="stretched-link block" href={href}>
        {cover ? (
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <Image
              alt={cover.alt}
              className="h-full w-full object-cover"
              height={cover.height}
              sizes={previewSizes}
              src={cover.src}
              width={cover.width}
            />
          </div>
        ) : null}
        <div className="p-5">
          <Heading className="text-h3 font-semibold">{title}</Heading>
          <p className="mt-2 text-sm text-muted-fg">{summary}</p>
        </div>
      </Link>
      {children ? (
        <div className="relative z-10 mt-4 space-y-3 px-5 pb-5 text-sm pointer-events-none">
          {children}
        </div>
      ) : null}
    </div>
  );
}
