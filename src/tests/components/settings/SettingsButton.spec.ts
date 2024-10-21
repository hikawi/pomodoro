import SettingsButton from "@c/settings/SettingsButton.vue";
import { $settingsOpen } from "@s/settings-open";
import { cleanup, fireEvent, render } from "@testing-library/vue";
import { cleanStores } from "nanostores";
import { afterEach, describe, expect, it } from "vitest";

describe("test SettingsButton.vue", async () => {
  afterEach(() => {
    cleanup();
    cleanStores($settingsOpen);
  });

  it("should switch $settingsOpen true", async () => {
    const comp = render(SettingsButton);
    const button = comp.getByRole("button");

    expect($settingsOpen.get()).toBeFalsy();
    await fireEvent.click(button);
    expect($settingsOpen.get()).toBeTruthy();
  });
});
