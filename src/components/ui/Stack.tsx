import type { ElementType, HTMLAttributes, ReactNode } from "react";

const sizeClasses = {
  sm: "space-y-3",
  md: "space-y-4",
  lg: "space-y-6",
  xl: "space-y-10"
} as const;

type StackProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizeClasses;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "color">;

export default function Stack<T extends ElementType = "div">({
  as,
  size = "md",
  className = "",
  children,
  ...rest
}: StackProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component className={`flex flex-col ${sizeClasses[size]} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
