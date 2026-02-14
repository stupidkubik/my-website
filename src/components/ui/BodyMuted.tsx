import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type BodyMutedProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function BodyMuted<T extends ElementType = "p">({
  as,
  className = "",
  children,
  ...props
}: BodyMutedProps<T>) {
  const Component = (as ?? "p") as ElementType;
  return (
    <Component className={`text-body text-muted-fg ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
