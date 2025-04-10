import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        favourite: resolve(__dirname, "src/favourite_page/index.html"),
        details: resolve(__dirname, "src/movie_details/index.html"),
        search: resolve(__dirname, "src/search_page/index.html")
      },
    },
  },
});
