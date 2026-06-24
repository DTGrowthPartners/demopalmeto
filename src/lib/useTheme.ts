import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "palmetto-theme";

function readInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return "dark";
}

/**
 * Tema oscuro/claro con persistencia en localStorage y atajo Ctrl+Shift+L.
 * - dark: paleta Caribbean Night (default)
 * - light: blanco con primary #015480
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Ctrl+Shift+L global toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "L" || e.key === "l")) {
        e.preventDefault();
        setTheme((t) => (t === "dark" ? "light" : "dark"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return {
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

/**
 * Returns the resolved color value of a CSS variable (e.g. `--primary`)
 * and re-evaluates whenever the theme class on <html> changes. Use this
 * for libraries like Recharts that don't pick up CSS vars in SVG.
 */
export function useCssVar(varName: string, fallback = ""): string {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      setValue(raw ? `hsl(${raw})` : fallback);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => obs.disconnect();
  }, [varName, fallback]);

  return value;
}
