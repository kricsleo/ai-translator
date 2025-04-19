import { computed, ref, Ref } from "vue"
import { useSettings } from "../settings/settings.js"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createDeepSeek } from '@ai-sdk/deepseek'
import { streamText } from "ai"
import { toPolishMessages, toTranslateMessages } from "./prompts.js"

function useModelClient() {
  const { provider, apiKey, model } = useSettings()

  const modelClient = computed(() => {
    if(!provider.value || !apiKey.value || !model.value) {
      return
    }

    switch (provider.value) {
      case "gemini": return createGoogleGenerativeAI({
        apiKey: apiKey.value
      })(model.value);

      case "deepseek": return createDeepSeek({
        apiKey: apiKey.value
      })(model.value);

      default: return
    }
  })

  return modelClient
}

export function useAi(input: Ref<string>) {
  const modelClient = useModelClient()
  const output = ref("")
  const controller = ref(new AbortController())

  return { output, generate }

  function reset() {
    output.value = ""
    controller.value.abort()
    controller.value = new AbortController() 
  }

  async function generate() {
    reset()
    if(!modelClient.value || !input.value) {
      return
    }

    const _controller = controller.value
    const { textStream } = streamText({
      model: modelClient.value,
      presencePenalty: 1,
      abortSignal: _controller.signal,
      // messages: toTranslateMessages(input.value, ['Engligh', 'Chinese']),
      messages: toPolishMessages(input.value)
    })
    for await (const textPart of textStream) {
      if(_controller !== controller.value || _controller.signal.aborted) {
        return
      }

      output.value += textPart
    }
  }
}