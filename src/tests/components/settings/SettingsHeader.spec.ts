import SettingsHeader from "@c/settings/SettingsHeader.vue";
import { $settingsOpen } from "@s/settings-open";
import { cleanup, fireEvent, render } from "@testing-library/vue";
import { cleanStores } from "nanostores";
import { afterEach, describe, expect, it } from "vitest";

describe("testing SettingsHeader.vue", () => {
  afterEach(() => {
    cleanup();
    cleanStores($settingsOpen);
  });

  it("should switch settings-open to false", async () => {
    const comp = render(SettingsHeader);
    expect(comp.getByText("Settings")).toBeVisible();

    $settingsOpen.set(true);
    const close = comp.getByLabelText("Close");
    await fireEvent.click(close);
    expect($settingsOpen.get()).toBeFalsy();
  });
});
