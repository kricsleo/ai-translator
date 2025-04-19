import { computed } from 'vue'
import { useLocalStorage, createGlobalState } from '@vueuse/core'

type Provider = 'deepseek' | 'gemini'

interface ProviderSettings {
  model: string
  apiKey: string
}

type Settings = Partial<Record<Provider, ProviderSettings>>

export const useSettings = createGlobalState(() => {
  const settings = useLocalStorage<Settings>('v1/settings', {})
  const provider = useLocalStorage<Provider>('v1/provider', 'gemini')

  const providerSettings = computed({
    get() {
      return settings.value[provider.value]
    },
    set(options: Partial<ProviderSettings>) {
      if (!settings.value[provider.value]) return
      Object.assign(settings.value[provider.value], options)
    }
  })

  function setProvider(_provider: Provider) {
    provider.value = _provider
  }

  function updateProviderSettings(options: Partial<ProviderSettings>) {
    providerSettings.value = options
  }

  return { 
    provider, 
    providerSettings,
    setProvider,
    updateProviderSettings,
  }
})