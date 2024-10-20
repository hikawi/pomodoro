import SettingsButton from "@/components/SettingsButton.svelte";
import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

describe("Test SettingsButton.svelte", async () => {
  test("should have aria label", async () => {
    const comp = render(SettingsButton);
    const button = comp.getByRole("button");

    expect(button).toHaveAccessibleName("Settings");
  });
});
