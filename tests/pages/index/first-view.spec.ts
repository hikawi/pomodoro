import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("first view", async () => {
  test("meta is correct", async ({ page }) => {
    await expect(page).toHaveTitle("Pomodoro");
  });

  test("logo is visible", async ({ page }) => {
    const logo = page.getByRole("img");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAccessibleName(/logo/i);
  });

  test("clock switcher is visible", async ({ page }) => {
    const switcher = page.getByRole("radiogroup");
    await expect(switcher).toBeVisible();
    await expect(switcher).toHaveAccessibleName(/clock type/i);
  });

  test("settings is visible", async ({ page }) => {
    const settings = page.getByRole("button", { name: "Settings" });
    await expect(settings).toBeVisible();
    await expect(settings).toHaveAccessibleName("Settings");
  });
});
