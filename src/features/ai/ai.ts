import { computed, ref, Ref, watch } from "vue"
import { useSettings } from "../settings/settings.js"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createDeepSeek } from '@ai-sdk/deepseek'
import { streamText } from "ai"

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

  generate()

  watch([input, modelClient], () => {
    reset()    
    generate()
  })

  return { output, generate }

  function reset() {
    output.value = ""
    controller.value.abort()
    controller.value = new AbortController() 
  }

  async function generate() {
    if(!modelClient.value || !input.value) {
      return
    }

    const _controller = controller.value
    const { textStream } = streamText({
      model: modelClient.value,
      prompt: `Translate the following text to English: ${input.value}`,
      presencePenalty: 1,
      abortSignal: _controller.signal,
    })
    for await (const textPart of textStream) {
      if(_controller !== controller.value || _controller.signal.aborted) {
        return
      }

      output.value += textPart
    }
  }
}