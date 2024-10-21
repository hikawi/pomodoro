import { persistentMap } from "@nanostores/persistent";
import { computed } from "nanostores";

const $pomodoro = persistentMap<{
  pomodoro: number;
  short: number;
  long: number;
  font: number;
  color: number;
}>(
  "app",
  {
    pomodoro: 25,
    short: 5,
    long: 15,
    font: 0,
    color: 0,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
  },
);

const $bgColor = computed($pomodoro, (val) => {
  switch (val.color) {
    case 0:
      return "bg-red";
    case 1:
      return "bg-aqua";
    case 2:
      return "bg-purple";
  }
  return "bg-white";
});

export { $bgColor, $pomodoro };
