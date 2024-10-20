import { locale } from "@/stores/i18n";
import { browser, createI18n, localeFrom } from "@nanostores/i18n";

const localeStore = localeFrom(
  locale,
  browser({
    available: ["en", "ja", "vi"],
    fallback: "en",
  }),
);

const i18n = createI18n(localeStore, {
  get(code) {
    return import(`./${code}.json`);
  },
});

const clockSwitcher = i18n("clockSwitcher", {
  radioGroup: "Pick a clock type",
  pomodoro: "pomodoro",
  shortBreak: "short break",
  longBreak: "long break",
});

const settings = i18n("settings", {
  heading: "Settings",
  close: "Close",
  time: "Time (minutes)",
  pomodoro: "pomodoro",
  shortBreak: "short break",
  longBreak: "long break",
});

export { clockSwitcher, settings };
