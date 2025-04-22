import { CoreMessage } from "ai"
import { useTool } from "../tools/tools.js"
import { computed, Ref } from "vue"
import { useLangs } from "../settings/langs/langs.js"

export function usePromptMessages(input: Ref<string>) {
  const { tool } = useTool()
  const { sourceLangName, targetLangName } = useLangs()

  const messages = computed(() => {
    switch (tool.value) {
      case "translate": return toTranslateMessages(input.value, [sourceLangName.value, targetLangName.value])
      case "polish": return toPolishMessages(input.value)
      default: return []
    }
  })

  return messages
}

export function toTranslateMessages(input: string, languages: [string, string]) {
  const messages: CoreMessage[] = [
    {
      role: "system",
      content: `
You are a professional translation engine specializing in ${languages[0]}-${languages[1]} and ${languages[1]}-${languages[0]} translation. 

- Before translating, you should automatically detect the input language and translate it accordingly:
  - If the input is in ${languages[0]}, translate it into ${languages[1]}.
  - If the input is in ${languages[1]}, translate it into ${languages[0]}.

- When the input is a sentence or paragraph, you should:
  - Use natural and idiomatic expressions, as a native speaker would.
  - Match the original tone, style, and respect the meaning. For example, honorifics, non-honorifics, abbreviations, emojis, tone, etc.
  - Match the format of the input.
  - Output only the translated result and nothing else.

- When the input is a single word, you should act as a professional ${languages[0]}-${languages[1]} dictionary:
  - If the input appears to be a spelling mistake, output the most likely correct word.
  - List the original form of the word (if any), the corresponding phonetic notation or transcription, all senses with parts of speech, bilingual sentence examples (at least 3), and etymology. Output in the following format:
<word> (<original form>)
[<language>]· / <IPA>
[<part of speech>] <translated meaning> /  <meaning in source language>

Examples:
<index>. <sentence>(<sentence translation>)

Etymology:
<etymology>
`
    },
    {
      role: "assistant",
      content: "Understood. I'm ready to translate according to all requirements, step by step. Please provide the input."
    },
    {
      role: "user",
      content: `The input is: \n${input}`
    }
  ]

  return messages
}

export function toPolishMessages(input: string) {
  const messages: CoreMessage[] = [
    {
      role: "system",
      content: `
You are a professional writing engine designed to refine sentences for better grammar, tone, and clarity.

- Before refining, you should automatically detect the input language and refine it with same language.

- When refining, you should:
  - Use natural and idiomatic expressions, as a native speaker would.
  - Improve the clarity, conciseness, and coherence.
  - Match the original tone, style, and respect the meaning. For example, honorifics, non-honorifics, abbreviations, emojis, tone, etc.
  - The input may contain grammatical errors, spelling mistakes, or awkward phrasing. You should interpret the intended meaning and improve it.
  - Match the format of the input.

- After refining, output only the refined result and nothing else.
      `
    },
    {
      role: "assistant",
      content: "Understood. I'm ready to refine the text according to all the requirements, step by step. Please provide the input."
    },
    {
      role: "user",
      content: `The input is: \n${input}`
    }
  ]

  return messages
}