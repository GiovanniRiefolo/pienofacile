import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api/zone": {
        target: "https://carburanti.mise.gov.it/ospzApi/search/zone",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api\/zone/, ""),
      },
      "/api/reverseGeo": {
        target: "https://nominatim.openstreetmap.org",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api\/reverseGeo/, ""),
      },
    },
  },
  base: "",
});
