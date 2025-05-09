/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite"
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    visualizer(),
  ],
  resolve: {
    alias: {
      '~': '/src',
    }
  }
})
