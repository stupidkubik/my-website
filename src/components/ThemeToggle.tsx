import { useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage failures (private mode / disabled storage).
    }
  };

  const isDark = theme === "dark";
  const label = isDark ? "Dark" : "Light";

  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="inline-flex min-h-[2rem] items-center rounded-md border border-border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-muted-fg transition hover:border-fg hover:text-fg xxs:text-[10px] xxs:tracking-[0.06em] xs:text-xs xs:tracking-[0.1em]"
      onClick={handleToggle}
      type="button"
    >
      {label}
    </button>
  );
}
