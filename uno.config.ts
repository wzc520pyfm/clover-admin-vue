import { defineConfig } from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import { presetAttributify } from "unocss";

export default defineConfig({
  exclude: [
    "node_modules",
    "dist",
    ".git",
    ".husky",
    ".vscode",
    "public",
    "build",
    "mock",
    "./stats.html",
  ],
  presets: [presetUno(), presetAttributify()], // presetAttributify()开启无值的写法
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
    "flex-1-hidden": "flex-1 overflow-hidden",
    "flex-col": "flex flex-col",
    "flex-col-center": "flex-center flex-col",
    "base-transition": "transition-all duration-300 ease-in-out",
  },
  rules: [
    [
      /^wh-(\d+)px$/,
      ([, d]) => ({
        width: `${d}px`,
        height: `${d}px`,
      }),
    ],
  ],
  // see: https://tailwindcss.com/docs/theme
  theme: {
    colors: {},
  },
});
