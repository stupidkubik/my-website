import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const baseClassName =
  "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60";

const variantStyles = {
  primary: "border-transparent bg-primary text-primary-contrast",
  outline: "border-border text-fg",
  ghost: "border-transparent text-fg hover:bg-muted"
} as const;

type ButtonVariant = keyof typeof variantStyles;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  openInNewTab?: boolean;
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClassName} ${variantStyles[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}

export function ButtonLink({
  className = "",
  variant = "primary",
  href,
  target,
  rel,
  "aria-label": ariaLabel,
  openInNewTab = false,
  children,
  ...props
}: ButtonLinkProps) {
  const isInternal = typeof href === "string" && href.startsWith("/");
  const classes = `${baseClassName} ${variantStyles[variant]} ${className}`;
  const resolvedTarget = target ?? (openInNewTab ? "_blank" : undefined);
  const resolvedRel = resolvedTarget === "_blank" ? (rel ?? "noopener noreferrer") : rel;
  const resolvedAriaLabel =
    ariaLabel ??
    (resolvedTarget === "_blank" && typeof children === "string"
      ? `${children} (opens in a new tab)`
      : undefined);

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
    </a>
  );
}
