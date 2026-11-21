"use client";

import { useDarkMode } from "@/lib/useDarkMode";

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, mounted, toggleTheme } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={
        className ??
        "flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-700 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 dark:border-white/15 dark:bg-white/10 dark:text-amber-300 dark:hover:bg-white/20"
      }
    >
      {mounted ? (isDark ? <SunIcon /> : <MoonIcon />) : <span className="h-4 w-4" />}
    </button>
  );
}
