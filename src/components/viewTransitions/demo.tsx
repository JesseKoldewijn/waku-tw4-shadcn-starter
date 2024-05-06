"use client";

import { useRouter_UNSTABLE as useRouter } from "waku";

import { Link } from "../core/Link";
import { Button } from "../ui/button";

const routes = [
  {
    path: "/view-transitions",
    title: "Click me!!!",
  },
  {
    path: "/view-transitions/next",
    title: "Go back",
  },
];

const ViewTransitionsDemo = () => {
  const router = useRouter();
  const pathname = router.path;

  return (
    <div className="flex items-center justify-center gap-2">
      {routes.map((route) => {
        if (route.path === pathname) return null;
        return (
          <Button key={route.title} asChild className="w-max">
            <Link
              to={route.path}
              className="[view-transition-name:demo_button]"
            >
              {route.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};
export default ViewTransitionsDemo;
