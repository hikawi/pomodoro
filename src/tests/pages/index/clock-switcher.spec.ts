import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("clock switcher interactivity", async () => {
  test("hover", async ({ page }) => {
    const switcher = page.getByRole("radiogroup");
    await expect(switcher).toBeVisible();

    const radio1 = page.getByLabel("pomodoro");
    const radio2 = page.getByLabel("short break");

    const label2 = page.getByText("short break");
    const label3 = page.getByText("long break");

    await expect(radio1).toBeChecked();

    await label2.hover();
    await expect(radio2).not.toBeChecked();
    await expect(label2).toHaveCSS("opacity", "1");
    await expect(label3).toHaveCSS("opacity", "0.4");
  });

  test("click", async ({ page }) => {
    const radio1 = page.getByLabel("pomodoro");
    const radio2 = page.getByLabel("short break");

    const label1 = page.getByText("pomodoro");
    const label2 = page.getByText("short break");

    await expect(radio1).toBeChecked();

    await label2.click();
    await expect(radio2).toBeChecked();
    await expect(radio1).not.toBeChecked();

    await expect(label1).toHaveCSS("color", "rgb(215, 224, 255)"); // light blue rgb
    await expect(label2).toHaveCSS("color", "rgb(30, 33, 63)"); // dark blue rgb
  });

  test("keyboard navigation", async ({ page }) => {
    const radiogroup = page.getByRole("radiogroup");
    const radio1 = radiogroup.getByLabel("pomodoro");
    const radio2 = page.getByLabel("short break");
    const radio3 = page.getByLabel("long break");

    await radio1.focus();
    await expect(radio1).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(radio1).not.toBeFocused();
    await expect(radio2).toBeChecked();

    await page.keyboard.press("ArrowRight");
    await expect(radio3).toBeChecked();
    await expect(radio3).toBeFocused();
    await expect(radio2).not.toBeFocused();
  });
});
