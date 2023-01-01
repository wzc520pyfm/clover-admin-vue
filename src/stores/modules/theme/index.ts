import { createGlobalState } from "@vueuse/core";
import { useDark, useToggle } from "@vueuse/core";

export const useThemeStore = createGlobalState(() => {
  // state
  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  // getters
  // ...

  // actions
  // ...

  return { isDark, toggleDark };
});
