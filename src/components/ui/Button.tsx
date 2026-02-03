import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const baseClassName =
  "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition";

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
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`${baseClassName} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return <a className={`${baseClassName} ${variantStyles[variant]} ${className}`} {...props} />;
}
