import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/",
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

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
