import type { NavOperations, ShortcutOptions } from "@slidev/types";
import { defineShortcutsSetup } from "@slidev/types";

export default defineShortcutsSetup(
  (nav: NavOperations, base: ShortcutOptions[]) => {
    return [
      ...base, // keep the existing shortcuts
      {
        key: "enter",
        fn: () => nav.next(),
        autoRepeat: true,
      },
      {
        key: "backspace",
        fn: () => nav.prev(),
        autoRepeat: true,
      },
      {
        key: "p",
        fn: () => {
          window.open(window.location.origin + "/presenter"); // open a new tab
          window.location.assign(window.location.origin + "/presenter"); // change current tab
        },
        autoRepeat: false,
      },
    ];
  }
);
