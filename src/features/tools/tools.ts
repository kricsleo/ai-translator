import { createGlobalState, useLocalStorage } from "@vueuse/core";

export type Tool = 'translate' | 'polish'

export interface ToolOption {
  icon: string
  label: string
  value: Tool
}

export const tools: ToolOption[] = [
  { 
    icon: "iconify hugeicons--translate", 
    label: "Translate",
    value: 'translate',
  },
  { 
    icon: "iconify hugeicons--paint-board", 
    label: "Polish",
    value: 'polish'
  },
]

export const useTool = createGlobalState(() => {
  const tool = useLocalStorage<Tool>("v1/tool", "translate");

  return { tool }
})