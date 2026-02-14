import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type SectionTitleProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function SectionTitle<T extends ElementType = "h2">({
  as,
  className = "",
  children,
  ...props
}: SectionTitleProps<T>) {
  const Component = (as ?? "h2") as ElementType;
  return (
    <Component
      className={`text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.01em] xs:text-[2rem] sm:text-h2 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
