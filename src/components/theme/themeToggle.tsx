"use client";

import cookies from "cookie";
import { useRef, useState } from "react";

import { themeCookieKey } from "@/middleware/cookie";
import { Theme } from "@/types/theme";

import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface ThemeToggleProps {
  initialTheme?: Theme;
}

const ThemeToggle = ({ initialTheme = "dark" }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const ref = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    const isChecked = ref.current?.dataset.state === "checked";

    const newTheme = isChecked ? "light" : "dark";
    const isStuck =
      (newTheme == initialTheme ? true : false) &&
      isChecked &&
      initialTheme == "dark";

    setTheme(newTheme);

    const appRoot = document.querySelector("html");

    if (appRoot) {
      if (newTheme === "dark") {
        appRoot.classList.add("dark");
      } else {
        appRoot.classList.remove("dark");
      }

      const cookieJar = cookies.parse(document.cookie);
      cookieJar[themeCookieKey] = newTheme;
      document.cookie = cookies.serialize(themeCookieKey, newTheme, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: "lax",
        path: "/",
      });
    }
  };

  return (
    <div className="flex items-center space-x-2 [view-transition-name:theme_toggle]">
      <Switch
        id="theme-toggle"
        ref={ref}
        onClick={toggleTheme}
        defaultChecked={initialTheme == "dark"}
        aria-labelledby="theme-toggle-label"
        role="switch"
      />
      <Label
        htmlFor="theme-toggle"
        className="hidden lg:flex lg:items-center lg:justify-center"
      >
        {theme}-mode
      </Label>
      <span id="theme-toggle-label" className="sr-only">
        Toggle theme
      </span>
    </div>
  );
};

export default ThemeToggle;
