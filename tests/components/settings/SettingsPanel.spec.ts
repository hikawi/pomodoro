import SettingsPanel from "@c/settings/SettingsPanel.vue";
import { $locale } from "@s/i18n";
import { $pomodoro } from "@s/pomodoro";
import { $settingsOpen } from "@s/settings-open";
import { cleanup, fireEvent, render } from "@testing-library/vue";
import { cleanStores } from "nanostores";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test SettingsPanel.vue", async () => {
  beforeEach(() => {
    $settingsOpen.set(true);
    $pomodoro.set({ pomodoro: 25, short: 5, long: 15, font: 0, color: 0 });
  });

  afterEach(() => {
    cleanup();
    cleanStores($settingsOpen, $pomodoro, $locale);
  });

  it("should not show if settingsOpen is false", async () => {
    $settingsOpen.set(false);

    const comp = render(SettingsPanel);
    const dialog = comp.queryByRole("dialog");
    expect(dialog).toBeNull();
  });

  it("should save time input", async () => {
    const comp = render(SettingsPanel);

    const pomodoro = comp.getByLabelText("pomodoro");
    const short = comp.getByLabelText("short break");
    const long = comp.getByLabelText("long break");

    expect(pomodoro).toBeVisible();
    expect(short).toBeVisible();
    expect(long).toBeVisible();

    await fireEvent.update(pomodoro, "123");
    await fireEvent.update(short, "456");
    await fireEvent.update(long, "789");

    expect($pomodoro.get().pomodoro).toBe(123);
    expect($pomodoro.get().short).toBe(456);
    expect($pomodoro.get().long).toBe(789);
  });

  it("should load time input", async () => {
    $pomodoro.setKey("pomodoro", 987);
    $pomodoro.setKey("short", 654);
    $pomodoro.setKey("long", 321);

    const comp = render(SettingsPanel);

    const pomodoro = comp.getByLabelText("pomodoro");
    const short = comp.getByLabelText("short break");
    const long = comp.getByLabelText("long break");

    expect(pomodoro).toHaveValue(987);
    expect(short).toHaveValue(654);
    expect(long).toHaveValue(321);
  });

  it("should load saved font", async () => {
    $pomodoro.setKey("font", 1);

    const comp = render(SettingsPanel);
    const serif = comp.getByLabelText("Serif");

    expect(serif).toBeChecked();
  });

  it("should save selected font", async () => {
    const comp = render(SettingsPanel);
    const sans = comp.getByLabelText("Sans-serif");
    const serif = comp.getByLabelText("Serif");
    const mono = comp.getByLabelText("Monospaced");

    expect($pomodoro.get().font).toBe(0);
    expect(sans).toBeChecked();

    await fireEvent.click(serif);
    expect(sans).not.toBeChecked();
    expect(serif).toBeChecked();
    expect(mono).not.toBeChecked();
    expect($pomodoro.get().font).toBe(1);

    await fireEvent.click(mono);
    expect(sans).not.toBeChecked();
    expect(serif).not.toBeChecked();
    expect(mono).toBeChecked();
    expect($pomodoro.get().font).toBe(2);
  });

  it("should change selected color", async () => {
    const comp = render(SettingsPanel);

    const red = comp.getByLabelText("Red");
    const cyan = comp.getByLabelText("Cyan");
    const purple = comp.getByLabelText("Purple");

    expect(red).toBeChecked();
    expect($pomodoro.get().color).toBe(0);

    await fireEvent.click(cyan);
    expect(red).not.toBeChecked();
    expect(cyan).toBeChecked();
    expect($pomodoro.get().color).toBe(1);

    await fireEvent.click(purple);
    expect(cyan).not.toBeChecked();
    expect(purple).toBeChecked();
    expect($pomodoro.get().color).toBe(2);
  });

  it("should change language", async () => {
    const comp = render(SettingsPanel);

    const english = comp.getByLabelText("English");
    const japanese = comp.getByLabelText("Japanese");
    const vietnamese = comp.getByLabelText("Vietnamese");

    expect(english).toBeChecked();
    expect($locale.get()).toBe("en");

    await fireEvent.click(japanese);
    expect($locale.get()).toBe("ja");
    expect(japanese).toBeChecked();

    await fireEvent.click(vietnamese);
    expect($locale.get()).toBe("vi");
    expect(vietnamese).toBeChecked();
  });

  it("should close tab if click apply", async () => {
    const comp = render(SettingsPanel);
    const dialog = comp.getByRole("dialog");
    const apply = comp.getByRole("button", { name: "Apply" });

    expect(dialog).toBeVisible();

    await fireEvent.click(apply);
    expect(dialog).not.toBeVisible();
    expect($settingsOpen.get()).toBeFalsy();
  });
});
