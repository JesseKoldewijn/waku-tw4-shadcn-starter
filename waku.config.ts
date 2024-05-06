const DO_NOT_BUNDLE = "";

/** @type {import('waku/config').Config} */
export default {
  middleware: (cmd: "dev" | "start") => [
    import("./src/middleware/common"),
    import("./src/middleware/cookie.js"),
    import("./src/middleware/themePreload.js"),
    ...(cmd === "dev"
      ? [
          import(
            /* @vite-ignore */ DO_NOT_BUNDLE + "waku/middleware/dev-server"
          ),
        ]
      : []),
    import("waku/middleware/ssr"),
    import("waku/middleware/rsc"),
  ],
};
