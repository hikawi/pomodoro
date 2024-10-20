import { persistentAtom } from "@nanostores/persistent";

const locale = persistentAtom<string>("locale", "en");

export { locale };
