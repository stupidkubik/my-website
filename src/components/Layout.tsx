import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
