import ClockSwitcher from "@/components/ClockSwitcher.svelte";
import { fireEvent, render } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, expect, test } from "vitest";

describe("component test ClockSwitcher.svelte", () => {
  test("initial state should be 'pomodoro'", () => {
    const component = render(ClockSwitcher);

    const radio1 = component.getByLabelText("pomodoro");
    const radio2 = component.getByLabelText("short break");
    const radio3 = component.getByLabelText("long break");

    const label1 = component.getByText("pomodoro");
    const label2 = component.getByText("short break");
    const label3 = component.getByText("long break");

    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();

    expect(label1).toHaveClass("text-dark-blue");
    expect(label2).toHaveClass("text-light-blue", "opacity-40");
    expect(label3).toHaveClass("text-light-blue", "opacity-40");
  });

  test("clicking 'short break' should switch state", () => {
    const component = render(ClockSwitcher);

    const radio1 = component.getByLabelText("pomodoro");
    const radio2 = component.getByLabelText("short break");
    const radio3 = component.getByLabelText("long break");

    fireEvent.click(radio2);
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
    expect(radio3).not.toBeChecked();
  });

  test("clicking 'long break' should switch state", () => {
    const component = render(ClockSwitcher);

    const radio1 = component.getByLabelText("pomodoro");
    const radio2 = component.getByLabelText("short break");
    const radio3 = component.getByLabelText("long break");

    fireEvent.click(radio3);
    expect(radio3).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio1).not.toBeChecked();
  });

  test("slider should move when switching", async () => {
    const component = render(ClockSwitcher);

    const radio1 = component.getByLabelText("pomodoro");
    const radio2 = component.getByLabelText("short break");
    const radio3 = component.getByLabelText("long break");

    const slider = component.getByTestId("slider");

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    await tick();
    expect(slider).toHaveClass("translate-x-0");

    fireEvent.click(radio2);
    expect(radio2).toBeChecked();
    await tick();
    expect(slider).toHaveClass("translate-x-full");

    fireEvent.click(radio3);
    expect(radio3).toBeChecked();
    await tick();
    expect(slider).toHaveClass("translate-x-[200%]");
  });
});
