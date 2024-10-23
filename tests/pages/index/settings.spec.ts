import { expect, test, type Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("settings interactivity", async () => {
  test("hover", async ({ page }) => {
    const button = page.getByLabel("Settings");

    await expect(button).toHaveAccessibleName(/settings/i);
    await expect(button).toHaveCSS("opacity", "0.5");
    await button.hover();
    await expect(button).toHaveCSS("opacity", "1");
  });

  test("open and close", async ({ page }) => {
    const button = page.getByLabel("Settings");

    await expect(button).toHaveAccessibleName(/settings/i);
    await button.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveCSS("background-color", "rgb(255, 255, 255)");

    const heading = dialog.getByRole("heading", { name: "Settings" });
    await expect(heading).toBeVisible();

    const close = dialog.getByLabel(/close/i);
    await close.click();
    await dialog.waitFor({ state: "hidden" });
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("settings tab", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const settings = page.getByRole("button", { name: "Settings" });
    await settings.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
  });

  test("close button", async ({ page }) => {
    const dialog = page.getByRole("dialog");
    const close = page.getByRole("button", { name: "Close" });

    await expect(close).toBeVisible();
    await expect(close).toHaveCSS("opacity", "0.5");
    await close.hover();
    await expect(close).toHaveCSS("opacity", "1");
    await close.click();
    await expect(dialog).not.toBeVisible();
  });

  function hasFont(el: Locator, font: string) {
    return expect(el).toHaveCSS("font-family", RegExp(`${font}`, "i"));
  }

  test("font change buttons are in correct font", async ({ page }) => {
    const sansSerif = page.getByLabel("Sans-serif");
    const serif = page.getByLabel("Serif", { exact: true });
    const mono = page.getByLabel("Monospaced");

    await hasFont(sansSerif, "Kumbh Sans");
    await hasFont(serif, "Roboto Slab");
    await hasFont(mono, "Space Mono");
  });

  test("font change buttons change the body's font", async ({ page }) => {
    const body = page.locator("body");

    const sansSerif = page.getByLabel("Sans-serif");
    const serif = page.getByLabel("Serif", { exact: true });
    const mono = page.getByLabel("Monospaced");

    await expect(sansSerif).toBeChecked();
    await hasFont(body, "Kumbh Sans");

    await serif.click();
    await expect(sansSerif).not.toBeChecked();
    await hasFont(body, "Roboto Slab");

    await mono.click();
    await expect(serif).not.toBeChecked();
    await expect(mono).toBeChecked();
    await hasFont(body, "Space Mono");
  });

  test("color change button changes the apply button's background", async ({
    page,
  }) => {
    const red = page.getByLabel(/red/i);
    const cyan = page.getByLabel(/cyan/i); // actually aqua in tailwind config
    const purple = page.getByLabel(/purple/i);

    const apply = page.getByRole("button", { name: /apply/i });

    await expect(red).toBeChecked();
    await expect(apply).toHaveCSS("background-color", "rgb(248, 112, 112)");

    await cyan.click();
    await expect(red).not.toBeChecked();
    await expect(cyan).toBeChecked();
    await expect(apply).toHaveCSS("background-color", "rgb(112, 243, 248)");

    await purple.click();
    await expect(cyan).not.toBeChecked();
    await expect(purple).toBeChecked();
    await expect(apply).toHaveCSS("background-color", "rgb(216, 129, 248)");
  });

  test("langage button changes language", async ({ page }) => {
    const en = page.getByLabel(/english/i);
    const ja = page.getByLabel(/japanese/i);

    const enSettings = page.getByRole("heading", { name: "Settings" });
    await expect(en).toBeChecked();
    await expect(enSettings).toBeVisible();

    await ja.click();
    const jaSettings = page.getByRole("heading", { name: "設定" });
    await expect(enSettings).not.toBeVisible();
    await expect(jaSettings).toBeVisible();
  });
});
