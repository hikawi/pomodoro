import ClockSwitcher from "@c/ClockSwitcher.vue";
import { $clockType } from "@s/clock-type";
import { $settingsOpen } from "@s/settings-open";
import { cleanup, fireEvent, render } from "@testing-library/vue";
import { cleanStores } from "nanostores";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test ClockSwitcher.vue", () => {
  beforeEach(() => {
    $clockType.set(0);
  });

  afterEach(() => {
    cleanup();
    cleanStores($clockType);
  });

  it("should default to 'pomodoro'", async () => {
    const comp = render(ClockSwitcher);

    const pomodoro = comp.getByLabelText("pomodoro");
    expect(pomodoro).toBeChecked();
  });

  it("should switch $clockType accordingly", async () => {
    const comp = render(ClockSwitcher);

    const pomodoro = comp.getByLabelText("pomodoro");
    const short = comp.getByLabelText("short break");
    const long = comp.getByLabelText("long break");

    expect($clockType.get()).toBe(0);
    expect(pomodoro).toBeChecked();

    await fireEvent.click(short);
    expect(pomodoro).not.toBeChecked();
    expect(short).toBeChecked();
    expect($clockType.get()).toBe(1);

    await fireEvent.click(long);
    expect(short).not.toBeChecked();
    expect(long).toBeChecked();
    expect($clockType.get()).toBe(2);
  });

  it("hotkeys for clock type", async () => {
    const comp = render(ClockSwitcher);

    const pomodoro = comp.getByLabelText("pomodoro");
    const short = comp.getByLabelText("short break");
    const long = comp.getByLabelText("long break");

    await fireEvent.keyDown(document, { key: "1" });
    expect(pomodoro).toBeChecked();

    await fireEvent.keyDown(document, { key: "2" });
    expect(short).toBeChecked();

    await fireEvent.keyDown(document, { key: "3" });
    expect(long).toBeChecked();
  });

  it("hotkeys don't work if settings is open", async () => {
    $settingsOpen.set(true);

    const comp = render(ClockSwitcher);
    const pomodoro = comp.getByLabelText("pomodoro");

    expect(pomodoro).toBeChecked();

    await fireEvent.keyDown(document, { key: "2" });
    expect(pomodoro).toBeChecked();

    await fireEvent.keyDown(document, { key: "3" });
    expect(pomodoro).toBeChecked();

    $settingsOpen.set(false);
  });
});
