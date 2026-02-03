import type { HTMLAttributes } from "react";

export default function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`rounded-full border border-border px-3 py-1 text-xs text-muted-fg ${className}`}
      {...props}
    />
  );
}
