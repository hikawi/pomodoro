import { $bgColor, $pomodoro } from "@s/pomodoro";
import { cleanStores } from "nanostores";
import { afterEach, describe, expect, it } from "vitest";

describe("coverage for stores", () => {
  afterEach(() => {
    $pomodoro.set({ pomodoro: 25, short: 5, long: 15, font: 0, color: 0 });
    cleanStores($pomodoro, $bgColor);
  });

  it("should return $bgColor correctly", async () => {
    $pomodoro.setKey("color", 0);
    expect($bgColor.get()).toBe("bg-red");

    $pomodoro.setKey("color", 1);
    expect($bgColor.get()).toBe("bg-aqua");

    $pomodoro.setKey("color", 2);
    expect($bgColor.get()).toBe("bg-purple");

    $pomodoro.setKey("color", 3);
    expect($bgColor.get()).toBe("bg-white");
  });
});
