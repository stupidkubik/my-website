import type { ElementType, HTMLAttributes, ReactNode } from "react";

const sizeClasses = {
  default: "py-12 xs:py-14 sm:py-section",
  lg: "py-16 xs:py-20 sm:py-24 lg:py-section-lg"
} as const;

type SectionProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizeClasses;
  borderTop?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "color">;

export default function Section<T extends ElementType = "section">({
  as,
  size = "default",
  borderTop = false,
  className = "",
  containerClassName = "",
  children,
  ...rest
}: SectionProps<T>) {
  const Component = (as ?? "section") as ElementType;
  return (
    <Component
      className={`${borderTop ? "border-t border-border" : ""} ${className}`.trim()}
      {...rest}
    >
      <div className={`container ${sizeClasses[size]} ${containerClassName}`.trim()}>
        {children}
      </div>
    </Component>
  );
}
