import { computed, ref } from "vue"
import type { Ref } from "vue"
import { useSettings } from "../settings/settings.js"
import { streamText } from "@xsai/stream-text"
import { createDeepSeek, createGoogleGenerativeAI } from '@xsai-ext/providers-cloud'
import { usePromptMessages } from "./prompts.js"
import { toast } from "vue-sonner"

function useModelClient() {
  const { provider, apiKey, model, proxy } = useSettings()

  const modelClient = computed(() => {
    if(!provider.value || !apiKey.value || !model.value) {
      return
    }

    switch (provider.value) {
      case "gemini": return createGoogleGenerativeAI(
        apiKey.value,
        proxy.value || undefined,
      );

      case "deepseek": return createDeepSeek(
        apiKey.value,
        proxy.value || undefined,
      );

      default: return
    }
  })

  return modelClient
}

export function useAi(input: Ref<string>) {
  const modelClient = useModelClient()
  const { model } = useSettings()
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
    if(!modelClient.value || !model.value || !input.value) {
      return
    }

    const _controller = controller.value
    loading.value = true
    try {
      const { textStream } = await streamText({
        ...modelClient.value.chat(model.value),
        abortSignal: _controller.signal,
        messages: messages.value,
      })
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#browser_compatibility
      for await (const textPart of textStream) {
        // race condition
        if(_controller !== controller.value || _controller.signal.aborted) {
          return
        }

        output.value += textPart
      }
      output.value = output.value.trimEnd()
      loading.value = false
    } catch (error: any) {
      console.log('[Stream Error]', error)
      loading.value = false
      const errorMessage = (error as any).message || 'Unknown error'
      if(errorMessage.includes('aborted')) {
        return
      }
      toast.error(errorMessage)
    }
  }
}