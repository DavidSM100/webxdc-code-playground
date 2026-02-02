import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
//@ts-ignore
import { buildXDC, mockWebxdc, eruda } from "@webxdc/vite-plugins";

// https://vite.dev/config/
export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist-xdc",
    emptyOutDir: true,
  },
  plugins: [svelte(), mockWebxdc(), eruda(), buildXDC({ inDir: "dist-xdc" })],
});
