import { computed } from 'vue'
import { useLocalStorage, createGlobalState } from '@vueuse/core'
import type { Provider } from '../ai/providers'

export interface ProviderSettings {
  model?: string
  apiKey?: string
  proxy?: string
}

type Settings = Partial<Record<Provider, ProviderSettings>>

export const useSettings = createGlobalState(() => {
  const settings = useLocalStorage<Settings>('v1/settings', {})
  const provider = useLocalStorage<Provider>('v1/provider', 'gemini')

  const providerSettings = computed({
    get() {
      return settings.value[provider.value]
    },
    set(options: ProviderSettings) {
      if(!provider.value) return
      if(!settings.value) {
        settings.value = {}
      }
      if(!settings.value[provider.value]) {
        settings.value[provider.value] = {}
      }
      Object.assign(settings.value[provider.value]!, options)
    }
  })

  const apiKey = computed({
    get() {
      return providerSettings.value?.apiKey
    },
    set(apiKey: string) {
      providerSettings.value = { apiKey }
    }
  })

  const model = computed({
    get() {
      return providerSettings.value?.model
    },
    set(model: string) {
      providerSettings.value = { model }
    }
  })

  const proxy = computed({
    get() {
      return providerSettings.value?.proxy
    },
    set(proxy: string) {
      providerSettings.value = { proxy }
    }
  })

  return { provider, apiKey, model, proxy }
})
