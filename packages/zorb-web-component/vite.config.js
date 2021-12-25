import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ["es2018"],
    lib: {
      entry: "./src/main.ts",
      name: "ViewLibrary",
    },
  },
  optimizeDeps: {
    include: ["tinycolor2", "@ethersproject/bytes"],
  },
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
      preprocess: preprocess()
    }),
  ],
});
