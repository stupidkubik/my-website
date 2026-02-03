import type { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-h2 font-semibold">{children}</h1>;
}
