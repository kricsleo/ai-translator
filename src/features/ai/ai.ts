import { computed, ref, Ref } from "vue"
import { useSettings } from "../settings/settings.js"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createDeepSeek } from '@ai-sdk/deepseek'
import { streamText } from "ai"
import { usePromptMessages } from "./prompts.js"
import { toast } from "vue-sonner"

function useModelClient() {
  const { provider, apiKey, model, proxy } = useSettings()

  const modelClient = computed(() => {
    if(!provider.value || !apiKey.value || !model.value) {
      return
    }

    switch (provider.value) {
      case "gemini": return createGoogleGenerativeAI({
        apiKey: apiKey.value,
        baseURL: proxy.value,
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
  const messages = usePromptMessages(input)

  const output = ref("")
  const loading = ref(false)
  const controller = ref(new AbortController())

  return { output, generate, loading }

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
    loading.value = true
    const { textStream } = streamText({
      model: modelClient.value,
      abortSignal: _controller.signal,
      messages: messages.value,
      onError: (error) => {
        console.log('[Stream Error]', error)
        loading.value = false
        const errorMessage = (error.error as any).message || 'Unknown error'
        if(errorMessage.includes('aborted')) {
          return
        }
        toast.error(errorMessage)
      },
      onFinish: () => {
        loading.value = false
      },
    })
    for await (const textPart of textStream) {
      if(_controller !== controller.value || _controller.signal.aborted) {
        return
      }

      output.value += textPart
    }
  }
}