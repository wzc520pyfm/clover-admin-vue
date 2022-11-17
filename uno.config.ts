import { defineConfig } from "unocss/vite";
import presetUno from "@unocss/preset-uno";

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
  presets: [presetUno()],
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
    "flex-1-hidden": "flex-1 overflow-hidden",
    "flex-col": "flex flex-col",
  },
  theme: {},
});
