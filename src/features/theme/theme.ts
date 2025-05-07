import { createGlobalState, useLocalStorage } from "@vueuse/core"
import { computed } from "vue"

type Theme = 'light' | 'dark'

export const useTheme = createGlobalState(() => {
  const theme = useLocalStorage('v1/theme', (typeof window === 'undefined' ? 'light' : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const isDark = computed(() => theme.value === 'dark')

  function toggleTheme(_theme?: Theme) {
    _theme = _theme || (isDark.value ? 'light' : 'dark')
    const nextIsDark = _theme === 'dark'

    if ('startViewTransition' in document) {
      const transition = document.startViewTransition(updateTheme)
      transition.ready.then(() => {
        const clipPath = [
          `polygon(100% 0%, 100% 0%, 100% 0%)`,
          `polygon(100% 0%, -100% 0%, 100% 200%)`,
        ];
        document.documentElement.animate(
          { clipPath },
          {
            duration: 300,
            easing: 'ease-out',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
    } else {
      updateTheme()
    }

    function updateTheme() {
      theme.value = _theme
      document.documentElement.classList.toggle('dark', nextIsDark)
    }
  }

  return { theme, isDark, toggleTheme }
})
if(typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const theme = e.matches ? 'dark' : 'light'
    useTheme().toggleTheme(theme)
  })
}
