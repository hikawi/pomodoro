import ClockSwitcher from "@c/ClockSwitcher.vue";
import { $clockType } from "@s/clock-type";
import { cleanup, fireEvent, render } from "@testing-library/vue";
import { cleanStores } from "nanostores";
import { afterEach, describe, expect, it } from "vitest";

describe("test ClockSwitcher.vue", () => {
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
});
