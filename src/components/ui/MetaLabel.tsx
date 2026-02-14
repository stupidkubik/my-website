import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type MetaLabelProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function MetaLabel<T extends ElementType = "p">({
  as,
  className = "",
  children,
  ...props
}: MetaLabelProps<T>) {
  const Component = (as ?? "p") as ElementType;
  return (
    <Component
      className={`text-label uppercase tracking-[0.06em] text-muted-fg ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
