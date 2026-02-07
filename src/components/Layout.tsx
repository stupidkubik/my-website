import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const GRID_OVERLAY_ENABLED = false;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`flex min-h-screen flex-col bg-bg text-fg ${
        GRID_OVERLAY_ENABLED ? "grid-overlay" : "grid-overlay grid-overlay--off"
      }`}
    >
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
