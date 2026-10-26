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

  // A toggle button keeps one name that contains its visible label (WCAG 2.5.3);
  // aria-pressed carries the state. The pressed look comes from `dark:`, which the
  // theme initializer sets before the first paint, so it never flips on hydration.
  return (
    <button
      aria-label="Dark theme"
      aria-pressed={theme === "dark"}
      className="inline-flex min-h-10 items-center rounded-md border border-interactive-border px-2 py-1 text-xs uppercase tracking-[0.06em] text-muted-fg transition hover:border-fg hover:text-fg xs:tracking-widest dark:border-fg dark:bg-fg dark:text-bg dark:hover:text-bg"
      onClick={handleToggle}
      type="button"
    >
      Dark
    </button>
  );
}
