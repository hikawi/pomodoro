import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/pages/",
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:4321/",
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:4321/",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
