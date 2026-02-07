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
  withExternalIndicator?: boolean;
};

export default function TextLink({
  className = "",
  tone = "muted",
  href,
  target,
  rel,
  "aria-label": ariaLabel,
  openInNewTab = false,
  withExternalIndicator = false,
  children,
  ...props
}: TextLinkProps) {
  const isInternal = typeof href === "string" && href.startsWith("/");
  const classes =
    `underline transition hover:text-fg focus-visible:ring-2 focus-visible:ring-fg ` +
    `focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${toneStyles[tone]} ${className}`;
  const resolvedTarget = target ?? (openInNewTab ? "_blank" : undefined);
  const resolvedRel = resolvedTarget === "_blank" ? (rel ?? "noopener noreferrer") : rel;
  const resolvedAriaLabel =
    ariaLabel ??
    (resolvedTarget === "_blank" && typeof children === "string"
      ? `${children} (opens in a new tab)`
      : undefined);
  const showExternalIndicator = withExternalIndicator && resolvedTarget === "_blank";

  if (isInternal && href) {
    return (
      <Link
        aria-label={resolvedAriaLabel}
        className={classes}
        href={href}
        rel={resolvedRel}
        target={resolvedTarget}
      >
        {children}
        {showExternalIndicator ? <span aria-hidden="true">{" \u2197"}</span> : null}
      </Link>
    );
  }

  return (
    <a
      aria-label={resolvedAriaLabel}
      className={classes}
      href={href}
      rel={resolvedRel}
      target={resolvedTarget}
      {...props}
    >
      {children}
      {showExternalIndicator ? <span aria-hidden="true">{" \u2197"}</span> : null}
    </a>
  );
}
