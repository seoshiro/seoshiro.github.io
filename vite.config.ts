import { defineConfig } from "vite";
import { resolve } from "node:path";
export default defineConfig({
  base: "./",
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        home: resolve("index.html"),
        forme: resolve("projects/forme.html"),
        selvedge: resolve("projects/selvedge.html"),
        guidecheck: resolve("projects/guidecheck.html"),
        archiveguard: resolve("projects/archiveguard.html"),
      },
    },
  },
});
