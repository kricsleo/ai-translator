/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': '/src',
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'utils': ['@vueuse/core', 'ofetch', 'diff'],
          'ai-sdk': ['@xsai-ext/providers-cloud', '@xsai/stream-text'],
          'ui': ['reka-ui', 'lucide-vue-next', 'vue-sonner', 'vee-validate', 'tailwind-merge', 'clsx', 'class-variance-authority'],
        }
      }
    }
  }
})
