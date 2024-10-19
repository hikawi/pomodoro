import { persistentMap } from "@nanostores/persistent";

const pomodoro = persistentMap<{
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

export { pomodoro };
