import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "themechange";

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage failures (private mode / disabled storage).
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
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
