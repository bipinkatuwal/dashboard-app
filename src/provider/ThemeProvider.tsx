import React, { createContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark" | "system";

export const ThemeContext = createContext({
  theme: "system" as ThemeType,
  setThemeMode: (mode: ThemeType) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("system");

  const applyTheme = (mode: ThemeType) => {
    const html = document.documentElement;

    if (mode === "light") {
      html.classList.remove("dark");
    } else if (mode === "dark") {
      html.classList.add("dark");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      html.classList.toggle("dark", systemDark);
    }
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as ThemeType) || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    if (savedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme("system");
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }
  }, []);

  const setThemeMode = (mode: ThemeType) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
