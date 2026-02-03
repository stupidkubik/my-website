import type { AnchorHTMLAttributes } from "react";

const toneStyles = {
  default: "text-fg",
  muted: "text-muted-fg"
} as const;

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: keyof typeof toneStyles;
};

export default function TextLink({ className = "", tone = "muted", ...props }: TextLinkProps) {
  return (
    <a
      className={`underline transition hover:text-fg ${toneStyles[tone]} ${className}`}
      {...props}
    />
  );
}
