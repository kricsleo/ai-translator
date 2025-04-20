import { createGlobalState, useLocalStorage } from "@vueuse/core"

type Theme = 'light' | 'dark'

export const useTheme = createGlobalState(() => {
  const theme = useLocalStorage('v1/theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))

  function toggleTheme(_theme?: Theme) {
    _theme = _theme || (theme.value === 'dark' ? 'light' : 'dark')
    const isDark = _theme === 'dark'

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
      document.documentElement.classList.toggle('dark', isDark)
    }
  }

  return { theme, toggleTheme }
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const theme = e.matches ? 'dark' : 'light'
  useTheme().toggleTheme(theme)
})
