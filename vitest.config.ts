/// <reference types="vitest" />
import svelte from "@astrojs/svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import { getViteConfig } from "astro/config";

export default getViteConfig({
  plugins: [svelte(), svelteTesting()],
  test: {
    // Vitest configuration options
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
  },
});
