"use client";

import { useTheme } from "next-themes";

type ThemeToggleProps = {
  isActive: boolean;
  onClick: () => void;

  children: React.ReactNode;
};

function ThemeToggle({ isActive, onClick, children }: ThemeToggleProps) {
  return (
    <span className={isActive ? "underline" : ""} onClick={onClick}>
      {children}
    </span>
  );
}

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <div>
      <ThemeToggle
        isActive={theme === "light"}
        onClick={() => toggleTheme("light")}
      >
        Light
      </ThemeToggle>

      <ThemeToggle
        isActive={theme === "dark"}
        onClick={() => toggleTheme("dark")}
      >
        Dark
      </ThemeToggle>
    </div>
  );
}
