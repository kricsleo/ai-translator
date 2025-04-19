import { CoreMessage } from "ai"
import { useTool } from "../tools/tools.js"
import { computed, Ref } from "vue"

export function usePromptMessages(input: Ref<string>) {
  const { tool } = useTool()
  const messages = computed(() => {
    switch (tool.value) {
      case "translate": return toTranslateMessages(input.value, ['English', 'Chinese'])
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
You are a professional translation engine specified in translating between ${languages[0]} and ${languages[1]}.
You can determine the language of the input text and translate it into the other language, which means:
- If the input is in ${languages[0]}, please translate the text into ${languages[1]} without explanation. 
- If the input is in ${languages[1]}, please translate the text into ${languages[0]} without explanation. 

- If the text has only one word, please act as a professional ${languages[0]}-${languages[1]} dictionary, and list the original form of the word (if any), the language of the word, the corresponding phonetic notation or transcription, all senses with parts of speech, bilingual  sentence examples (at least 3) and etymology. If you think there is a spelling mistake, please reply the most possible correct word, otherwise reply in the following format:
<word> (<original form>)
[<language>]· / <IPA>
[<part of speech>] <translated meaning> /  <meaning in source language>
Examples:
<index>. <sentence>(<sentence translation>)
Etymology:
<etymology>

- If the input is a sentence, only reply the translated result and nothing else.
`
    },
    {
      role: "assistant",
      content: 'I understand. I will translate whatever follows. Please provide the input.'
    },
    {
      role: "user",
      content: input
    }
  ]

  return messages
}

export function toPolishMessages(input: string) {
  const messages: CoreMessage[] = [
    {
      role: "system",
      content: `
You are a professional writing engine which can polish the input text directly without explanation.
You can determine the language of the input text and polish it with same language.

- Improve the clarity, conciseness, and coherence, making them match the expression of native speakers.
- Only reply the result and nothing else. 
      `
    },
    {
      role: "assistant",
      content: 'I understand. I will polish whatever follows. Please provide the input.'
    },
    {
      role: "user",
      content: input
    }
  ]

  return messages
}