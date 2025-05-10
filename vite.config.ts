/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite"
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    analyzer({ analyzerPort: 9000}),
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
          'ai-sdk': ['@xsai-ext/providers-cloud', '@xsai/stream-text'],
        }
      }
    }
  }
})
