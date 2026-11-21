"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "./theme";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // localStorage can throw in private browsing / blocked storage — theme just won't persist.
      }
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }

  return { isDark, mounted, toggleTheme };
}
