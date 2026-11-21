export const THEME_STORAGE_KEY = "tumenuahora-theme";

/**
 * Runs before hydration (see app/layout.tsx, next/script strategy="beforeInteractive")
 * so the `.dark` class is already correct on first paint — no toggle component anywhere
 * in the app needs to re-derive this from localStorage, they just read the DOM class.
 */
export function getInitialThemeScript(): string {
  return `(function(){try{var s=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY
  )});var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;
}
