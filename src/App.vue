<script setup lang="ts">
import { ref } from 'vue'
import { useAi } from './features/ai/ai'

const _input = ref('')
const input = ref('')
const { output, generate } = useAi(input)
</script>

<template>
  <div>
    <textarea 
      class="border" 
      rows="4" 
      cols="50"
      v-model="_input"
      @keyup.enter="generate" />

    <pre>{{ output }}</pre>
  </div>
</template>

