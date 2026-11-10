/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#141a17" : "#f3efe7");
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore storage failure
    }
  }, [theme]);

  const toggleTheme = useCallback(
    (event) => {
      const nextTheme = theme === "light" ? "dark" : "light";
      const root = document.documentElement;
      const button = event?.currentTarget;
      const rect = button?.getBoundingClientRect();
      const x = Number.isFinite(event?.clientX) && event.clientX !== 0
        ? event.clientX
        : rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = Number.isFinite(event?.clientY) && event.clientY !== 0
        ? event.clientY
        : rect ? rect.top + rect.height / 2 : 48;
      const radius = Math.ceil(Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ));
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const canWave = typeof document.startViewTransition === "function" && !prefersReducedMotion;

      const applyTheme = () => {
        root.setAttribute("data-theme", nextTheme);
        root.classList.toggle("dark", nextTheme === "dark");
        flushSync(() => setThemeState(nextTheme));
      };

      if (!canWave) {
        applyTheme();
        return;
      }

      root.style.setProperty("--theme-wave-x", `${x}px`);
      root.style.setProperty("--theme-wave-y", `${y}px`);
      root.style.setProperty("--theme-wave-radius", `${radius}px`);

      try {
        const transition = document.startViewTransition(applyTheme);
        const clearWaveOrigin = () => {
          root.style.removeProperty("--theme-wave-x");
          root.style.removeProperty("--theme-wave-y");
          root.style.removeProperty("--theme-wave-radius");
        };
        transition.finished.then(clearWaveOrigin, clearWaveOrigin);
      } catch {
        applyTheme();
        root.style.removeProperty("--theme-wave-x");
        root.style.removeProperty("--theme-wave-y");
        root.style.removeProperty("--theme-wave-radius");
      }
    },
    [theme]
  );

  const setTheme = (next) => {
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
