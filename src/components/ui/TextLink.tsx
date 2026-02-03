import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

const toneStyles = {
  default: "text-fg",
  muted: "text-muted-fg"
} as const;

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: keyof typeof toneStyles;
  children: ReactNode;
};

export default function TextLink({
  className = "",
  tone = "muted",
  href,
  children,
  ...props
}: TextLinkProps) {
  const isInternal = typeof href === "string" && href.startsWith("/");
  const classes = `underline transition hover:text-fg ${toneStyles[tone]} ${className}`;

  if (isInternal && href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
}
