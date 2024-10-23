/// <reference types="vitest" />
import vue from "@astrojs/vue";
import { getViteConfig } from "astro/config";

export default getViteConfig({
  plugins: [vue()],
  test: {
    include: ["./tests/components/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    setupFiles: ["./tests/vitest-setup.ts"],
    coverage: {
      provider: "istanbul",
      enabled: true,
      reporter: ["text"],
    },
    environment: "jsdom",
  },
});
