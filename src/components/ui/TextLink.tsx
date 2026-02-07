import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

const toneStyles = {
  default: "text-fg",
  muted: "text-muted-fg"
} as const;

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: keyof typeof toneStyles;
  children: ReactNode;
  openInNewTab?: boolean;
};

export default function TextLink({
  className = "",
  tone = "muted",
  href,
  target,
  rel,
  openInNewTab = true,
  children,
  ...props
}: TextLinkProps) {
  const isInternal = typeof href === "string" && href.startsWith("/");
  const classes = `underline transition hover:text-fg ${toneStyles[tone]} ${className}`;
  const resolvedTarget = target ?? (openInNewTab ? "_blank" : undefined);
  const resolvedRel = resolvedTarget === "_blank" ? (rel ?? "noopener noreferrer") : rel;

  if (isInternal && href) {
    return (
      <Link className={classes} href={href} rel={resolvedRel} target={resolvedTarget}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} rel={resolvedRel} target={resolvedTarget} {...props}>
      {children}
    </a>
  );
}
