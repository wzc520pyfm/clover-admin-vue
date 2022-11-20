import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { setupVitePlugins } from "./build";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [setupVitePlugins()],
  server: {
    port: 5574,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
