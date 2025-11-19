import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ThemeToggler = () => {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [themeToggle, setThemeToggle] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setThemeToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={dropDownRef} className="realtive flex justify-end px-8 pt-2">
      <button
        onClick={() => setThemeToggle((value) => !value)}
        className="cursor-pointer p-2.5 hover:bg-primary-hover w-fit rounded-lg"
      >
        {theme === "light" ? (
          <Sun className="w-4.5 h-4.5 text-foreground" />
        ) : (
          <Moon className="w-4.5 h-4.5 text-foreground" />
        )}
      </button>

      {themeToggle && (
        <div
          className="absolute right-0 mt-10 w-30 rounded-lg border border-border bg-primary 
            origin-top-right flex flex-col p-1 items-start "
        >
          <button
            className="hover:bg-primary-hover w-full flex items-center justify-start rounded p-1.5 cursor-pointer text-foreground"
            onClick={() => {
              setThemeMode("light");
              setThemeToggle(false);
            }}
          >
            Light
          </button>
          <button
            className="hover:bg-primary-hover w-full flex items-center justify-start rounded p-1.5 cursor-pointer text-foreground"
            onClick={() => {
              setThemeMode("dark");
              setThemeToggle(false);
            }}
          >
            Dark
          </button>

          <button
            className="hover:bg-primary-hover w-full flex items-center justify-start rounded p-1.5 cursor-pointer text-foreground"
            onClick={() => {
              setThemeMode("system");
              setThemeToggle(false);
            }}
          >
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggler;
