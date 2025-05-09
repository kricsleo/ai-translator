import { createGlobalState, useLocalStorage } from "@vueuse/core";

export const usePolishDiff = createGlobalState(() => {
  const diffing = useLocalStorage("v1/polish-diff", true);

  return { diffing }
})