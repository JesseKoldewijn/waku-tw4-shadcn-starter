import { type UserConfig, defineConfig } from "vite";

const config: UserConfig = {
  plugins: [],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  esbuild: {
    treeShaking: true,
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      onLog: onLog as any,
      output: {
        manualChunks,
      },
    },
  },
};

export default defineConfig(config);

function onLog(
  level: string,
  log: { cause: { message: string } },
  handler: (arg0: any, arg1: any) => void,
) {
  // workaround for upstream rollup issue
  const logCause = log.cause as {
    message: string;
  };
  if (
    logCause &&
    logCause.message === `Can't resolve original location of error.`
  ) {
    return;
  }
  handler(level, log);
}

function manualChunks(id: string) {
  if (id.includes("radix")) {
    return "radix";
  }

  if (id.includes("react") && !id.includes("react-dom")) {
    return "react-core";
  }

  if (id.includes("react-dom")) {
    return "react-dom";
  }
}
