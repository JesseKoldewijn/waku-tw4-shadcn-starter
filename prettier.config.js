/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
export default {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  // Import sorting
  importOrder: [
    "^waku/(.*)$",
    "^@waku/(.*)$",
    "^react/(.*)$",
    "^@react/(.*)$",
    "^vite/(.*)$",
    "^tailwindcss/(.*)$",
    "^@tailwindcss/(.*)$",
    "^@radix-ui/(.*)$",
    "^@(.*)$",
    "^@/(.*)$",
    "^@/(.css)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  // Tailwind
  tailwindAttributes: ["className"],
  tailwindFunctions: ["clsx", "cn", "twMerge"],
  tailwindConfig: "./tailwind.config.ts",
};
