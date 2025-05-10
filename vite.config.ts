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
          'ai-sdk': ['@xsai-ext/providers-cloud', '@xsai/stream-text'],
          'motion': ['motion-v']
        }
      }
    }
  }
})
