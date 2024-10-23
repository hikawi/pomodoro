import Clock from "@c/Clock.vue";
import { $clockType } from "@s/clock-type";
import { $pomodoro } from "@s/pomodoro";
import { $settingsOpen } from "@s/settings-open";
import {
  $paused,
  $started,
  $timer,
  $timerText,
  getMaxTime,
  start,
  stop,
} from "@s/timer";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/vue";
import { allTasks, cleanStores, keepMount } from "nanostores";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { nextTick } from "vue";

describe("test Clock.vue", () => {
  beforeAll(() => {
    [$clockType, $pomodoro, $paused, $started, $timer, $settingsOpen].forEach(
      keepMount,
    );
  });

  beforeEach(() => {
    vi.useFakeTimers();

    $pomodoro.set({ pomodoro: 25, short: 5, long: 15, font: 0, color: 0 });
    $clockType.set(0);

    expect($started.get()).toBeFalsy();
    expect($paused.get()).toBeFalsy();
    expect($timer.get()).toBeLessThanOrEqual(0);
  });

  afterEach(() => {
    stop();

    expect($started.get()).toBeFalsy();
    expect($paused.get()).toBeFalsy();
    expect($timer.get()).toBe(0);

    cleanup();
    vi.useRealTimers();
  });

  afterAll(() => {
    cleanStores(
      $pomodoro,
      $clockType,
      $started,
      $timer,
      $paused,
      $settingsOpen,
    );
  });

  it("should trigger keyboard handler", async () => {
    const comp = render(Clock);
    const timer = comp.getByTestId("timer");

    await fireEvent.keyDown(document, { key: "p" });
    await waitFor(() => expect(timer).toHaveTextContent("25:00"));

    await fireEvent.keyDown(document, { key: "p" });
    const textContent = timer.textContent;
    vi.advanceTimersByTime(5000);
    const newTextContent = timer.textContent;
    expect(textContent).toBe(newTextContent); // should pause
  });

  it("should show 00:00 when nothing is happening", async () => {
    const comp = render(Clock);
    const timer = comp.getByTestId("timer");
    expect(timer).toHaveTextContent("00:00");
  });

  it("should start at 25:00", async () => {
    const comp = render(Clock);
    const timer = comp.getByTestId("timer");
    const button = comp.getByRole("button");

    expect(button).toHaveTextContent(/start/i);

    await fireEvent.click(button);
    expect(button).toHaveTextContent(/pause/i);
    expect($timer.get()).toBe(1500);
    expect($timerText.get()).toBe("25:00");

    vi.advanceTimersByTime(2000);
    expect($timer.get()).toBe(1498);
    expect($timerText.get()).toBe("24:58");

    await allTasks();
    expect(timer).toHaveTextContent("24:58");
  });

  it("should stop if clockType changed", async () => {
    expect($clockType.get()).toBe(0);
    start();
    expect($started.get()).toBeTruthy();

    $clockType.set(1);
    expect($started.get()).toBeFalsy();
    expect($paused.get()).toBeFalsy();
  });

  it("should stop if related setting changed", async () => {
    expect($clockType.get()).toBe(0);
    start();
    $pomodoro.setKey("pomodoro", 20);
    await allTasks();
    expect($started.get()).toBeFalsy();
    expect($paused.get()).toBeFalsy();

    $clockType.set(1);
    expect($clockType.get()).toBe(1);
    start();
    $pomodoro.setKey("short", 20);
    await allTasks();
    expect($started.get()).toBeFalsy();
    expect($paused.get()).toBeFalsy();

    $clockType.set(2);
    expect($clockType.get()).toBe(2);
    start();
    $pomodoro.setKey("long", 20);
    await allTasks();
    expect($started.get()).toBeFalsy();
    expect($paused.get()).toBeFalsy();
  });

  it("should not stop if unrelated settings changed", async () => {
    start();

    $pomodoro.setKey("short", 1);
    await allTasks();
    expect($started.get()).toBeTruthy();
    expect($paused.get()).toBeFalsy();

    $pomodoro.setKey("long", 2);
    await allTasks();
    expect($started.get()).toBeTruthy();
    expect($paused.get()).toBeFalsy();

    $pomodoro.setKey("font", 2);
    await allTasks();
    expect($started.get()).toBeTruthy();
    expect($paused.get()).toBeFalsy();

    $pomodoro.setKey("color", 1);
    await allTasks();
    expect($started.get()).toBeTruthy();
    expect($paused.get()).toBeFalsy();
  });

  it("should not register key if settings is open", async () => {
    $settingsOpen.set(true);

    const comp = render(Clock);
    const button = comp.getByRole("button");

    expect(button).toHaveTextContent(/start/i);
    await fireEvent.keyDown(document, { key: "p" });
    expect(button).toHaveTextContent(/start/i);

    $settingsOpen.set(false);
  });

  it("should return correct max time", async () => {
    const pomodoro = 25 * 60;
    const short = 5 * 60;
    const long = 15 * 60;

    expect($clockType.get()).toBe(0);
    expect(getMaxTime()).toBe(pomodoro);

    $clockType.set(1);
    expect(getMaxTime()).toBe(short);

    $clockType.set(2);
    expect(getMaxTime()).toBe(long);

    $clockType.set(3);
    expect(getMaxTime()).toBe(-1);
  });

  it("progress should show half at half time", async () => {
    const comp = render(Clock);
    const progressBar = comp.getByRole("progressbar");

    // Halve the time
    start();
    $paused.set(true);
    $timer.set(Math.round($timer.get() / 2));
    await nextTick();

    expect(progressBar).toHaveValue(50);
  });

  it("should auto stop when timer runs out", async () => {
    start();
    await allTasks();
    expect($started.get()).toBeTruthy();
    expect($timer.get()).toBe(1500);

    vi.advanceTimersByTime(1501 * 1000);
    await allTasks();
    expect($timer.get()).toBe(0);
    expect($started.get()).toBeFalsy();
  });
});
