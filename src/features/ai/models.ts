import { ref, watch } from "vue"
import { http } from "../http/http.js"
import { useSettings } from "../settings/settings.js"
import { useLocalStorage } from "@vueuse/core"

export interface Model {
  name: string
  displayName: string
  description: string
}

export function useModels() {
  const { provider, apiKey } = useSettings()
  const models = useLocalStorage<Model[]>('v1/models', [])
  const loading = ref(false)
  const reqId = ref(0)

  watch([provider, apiKey], async () => {
    reqId.value += 1

    if(!provider.value || !apiKey.value) {
      return
    }

    loading.value = true
    const _reqId = reqId.value
    const _models = await (() => {
      switch (provider.value) {
        case "gemini": return fetchGeminiModels(apiKey.value).catch(() => [])
        case "deepseek": return fetchDeepSeekModels(apiKey.value).catch(() => [])
        default: return []
      }
    })()

    if(_reqId !== reqId.value) {
      return
    }

    models.value = _models
    loading.value = false

  }, { immediate: true })

  return { models, loading }
}

export async function fetchGeminiModels(apiKey: string) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models"

  const resp = await http<{models: Model[]}>(url, {
    headers: { 'X-Goog-Api-Key': apiKey }
  })

  return resp.models
}

export async function fetchDeepSeekModels(apiKey: string) {
  const url = "https://api.deepseek.com/v1/models"

  const resp = await http<{data: Array<{ id: string }>}>(url, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  })

  const models = resp.data.map(item => ({ 
    name: item.id, 
    displayName: item.id, 
    description: item.id 
  }))

  return models
}