import type { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[1.875rem] font-semibold leading-[1.2] tracking-[-0.01em] xs:text-[2rem] sm:text-h2">
      {children}
    </h1>
  );
}
