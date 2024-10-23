import { atom, computed } from "nanostores";
import { $clockType } from "./clock-type";
import { $pomodoro } from "./pomodoro";

const $timer = atom(0);
const $started = atom(false);
const $paused = atom(false);
const $intervalId = atom(0);

const $timerText = computed($timer, (val) => {
  if (val <= 0) return "00:00";

  const sec = val % 60;
  const min = (val - sec) / 60;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
});

// Stop if clockType changes.
$clockType.subscribe(stop);

// Stop if settings is changed, the time input, not the font etc.
$pomodoro.subscribe((val, old) => {
  let changed = false;

  switch ($clockType.get()) {
    case 0:
      changed = val.pomodoro !== old?.pomodoro;
      break;
    case 1:
      changed = val.short !== old?.short;
      break;
    case 2:
      changed = val.long !== old?.long;
      break;
  }

  if (!changed) return;
  stop();
});

function getMaxTime() {
  switch ($clockType.get()) {
    case 0:
      return $pomodoro.get().pomodoro * 60;
    case 1:
      return $pomodoro.get().short * 60;
    case 2:
      return $pomodoro.get().long * 60;
  }
  return -1;
}

function start() {
  safeClear();

  $started.set(true);
  $timer.set(getMaxTime());

  const id = setInterval(() => {
    if ($timer.get() <= 0) {
      stop();
      return;
    }
    if ($paused.get()) return;

    $timer.set($timer.get() - 1);
  }, 1000);
  $intervalId.set(id);
}

function stop() {
  $started.set(false);
  $paused.set(false);
  $timer.set(0);
  safeClear();
}

function safeClear() {
  clearInterval($intervalId.get());
  $intervalId.set(0);
}

export { $paused, $started, $timer, $timerText, getMaxTime, start, stop };
