<script setup lang="ts">
import { ref } from 'vue'
import { useAi } from './features/ai/ai'
import Settings from './features/settings/settings.vue'
import { Toaster } from '~/components/ui/sonner'

const _input = ref('')
const input = ref('')
const { output, generate } = useAi(input)
</script>

<template>
  <div>
    <Toaster />
    <textarea 
      class="border" 
      rows="4" 
      cols="50"
      v-model="_input"
      @keyup.enter="generate" />

      <Settings />

    <pre>{{ output }}</pre>
  </div>
</template>

