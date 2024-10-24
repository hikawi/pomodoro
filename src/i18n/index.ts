import { i18n } from "@s/i18n";

const $clockSwitcher = i18n("clockSwitcher", {
  radioGroup: "Pick a clock type",
  pomodoro: "pomodoro",
  shortBreak: "short break",
  longBreak: "long break",
});

const $button = i18n("button", {
  start: "start",
  pause: "pause",
  resume: "resume",
});

const $settings = i18n("settings", {
  dialog: "Settings dialog",
  heading: "Settings",
  close: "Close",
  time: "Time (minutes)",
  pomodoro: "pomodoro",
  shortBreak: "short break",
  longBreak: "long break",
  font: "Font",
  sans: "Sans-serif",
  serif: "Serif",
  mono: "Monospaced",
  color: "Color",
  red: "Red",
  cyan: "Cyan",
  purple: "Purple",
  language: "Language",
  english: "English",
  japanese: "Japanese",
  vietnamese: "Vietnamese",
  apply: "Apply",
});

export { $button, $clockSwitcher, $settings };
