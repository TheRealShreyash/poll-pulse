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
    // proxy: {
    //   "/api": {
    //     target: "https://pulse-omega-lovat.vercel.app/",
    //     changeOrigin: true,
    //   },
    // },
  },
});
