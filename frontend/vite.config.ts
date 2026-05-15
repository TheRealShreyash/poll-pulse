import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "double",
    }),
    tailwindcss(),
    react(),
  ],
  server: {
    allowedHosts: ['8fa9-2a09-bac5-3e09-11c3-00-1c5-126.ngrok-free.app'],
    proxy: {
      "/api": {
        target: "https://pulse-omega-lovat.vercel.app/",
        changeOrigin: true,
      },
    },
  },
});
