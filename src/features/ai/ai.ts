import { computed, ref, Ref, watch } from "vue"
import { useSettings } from "../settings/settings.js"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createDeepSeek } from '@ai-sdk/deepseek'
import { streamText } from "ai"

function useModel() {
  const { provider, providerSettings } = useSettings()

  const model = computed(() => {
    if(!providerSettings.value) {
      return
    }

    switch (provider.value) {
      case "gemini": return createGoogleGenerativeAI({
        apiKey: providerSettings.value.apiKey
      })(providerSettings.value?.model);

      case "deepseek": return createDeepSeek({
        apiKey: providerSettings.value.apiKey
      })(providerSettings.value?.model);

      default: return
    }
  })

  return model
}

export function useAi(input: Ref<string>) {
  const model = useModel()
  const output = ref("")
  const controller = ref(new AbortController())

  generate()

  watch([input, model], () => {
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
    if(!model.value || !input.value) {
      return
    }

    const _controller = controller.value
    const { textStream } = streamText({
      model: model.value,
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