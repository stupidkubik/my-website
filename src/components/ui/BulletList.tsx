import type { HTMLAttributes } from "react";

type BulletListProps = HTMLAttributes<HTMLUListElement> & {
  tone?: "muted" | "default";
};

export default function BulletList({ className = "", tone = "muted", ...props }: BulletListProps) {
  return (
    <ul
      className={`list-disc space-y-2 pl-5 ${tone === "muted" ? "text-muted-fg" : "text-fg"} ${className}`}
      {...props}
    />
  );
}
