"use client";

import { useTheme } from "next-themes";

type ThemeToggleProps = {
  isActive: boolean;
  onClick: () => void;

  children: React.ReactNode;
};

function ThemeToggle({ isActive, onClick, children }: ThemeToggleProps) {
  return (
    <span
      className={`cursor-pointer${isActive ? " underline" : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <div className="flex gap-4">
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

export default ThemeSwitcher;
