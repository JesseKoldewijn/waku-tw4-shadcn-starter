import { getContext } from "waku/server";

import { Theme } from "@/types/theme";

import { Link } from "./core/Link";
import ThemeToggle from "./theme/themeToggle";

export const Header = () => {
  const ctx = getContext<{ theme: Theme }>();

  return (
    <header className="flex w-full items-center gap-4 p-6 lg:fixed lg:top-0 lg:left-0">
      <h2 className="text-lg font-bold tracking-tight">
        <Link to="/">Waku Jereko</Link>
      </h2>
      <nav className="pointer-events-none hidden gap-4 lg:pointer-events-auto lg:flex">
        <Link to="/about">About</Link>
        <Link to="/nested">Nesting</Link>
        <Link to="/actions">Actions</Link>
        <Link to="/view-transitions">View Transitions</Link>
      </nav>
      <div className="ml-auto">
        <ThemeToggle initialTheme={ctx?.theme} />
      </div>
    </header>
  );
};
