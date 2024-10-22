import { $locale } from "@/stores/i18n";
import { browser, createI18n, localeFrom } from "@nanostores/i18n";

const localeStore = localeFrom(
  $locale,
  browser({
    available: ["en", "ja", "vi"],
    fallback: "en",
  }),
);

const i18n = createI18n(localeStore, {
  get(code) {
    /* @vite-ignore */
    return import(`./${code}.json`);
  },
});

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
