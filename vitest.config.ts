/// <reference types="vitest" />
import vue from "@astrojs/vue";
import { getViteConfig } from "astro/config";

export default getViteConfig({
  plugins: [vue()],
  test: {
    include: ["./src/tests/components/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    setupFiles: ["./src/vitest-setup.ts"],
    coverage: {
      provider: "istanbul",
      enabled: true,
      reporter: ["text", "html", "clover", "json"],
    },
    environment: "jsdom",
  },
});
