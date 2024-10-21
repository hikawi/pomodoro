import SettingsPanel from "@c/settings/SettingsPanel.vue";
import { $pomodoro } from "@s/pomodoro";
import { $settingsOpen } from "@s/settings-open";
import { cleanup, fireEvent, render } from "@testing-library/vue";
import { cleanStores } from "nanostores";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test SettingsPanel.vue", async () => {
  beforeEach(() => {
    $settingsOpen.set(true);
  });

  afterEach(() => {
    cleanup();
    cleanStores($settingsOpen, $pomodoro);
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
});
