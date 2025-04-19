<script setup lang="ts">
import { ref } from 'vue'
import { useAi } from '~/features/ai/ai'
import { Textarea } from '~/components/ui/textarea'

const input = ref('')
const { output, generate } = useAi(input)
</script>

<template>
  <div>
    <Textarea 
      class="resize-none h-40"
      v-model="input"
      @keydown.enter="generate" />

    <div class="flex items-center my-6">
      <span class="h-[1px] bg-accent flex-1" />
      <span class="w-40 text-center">translate</span>
      <span class="h-[1px] bg-accent flex-1" />
    </div>

    <pre class="whitespace-pre-wrap">{{ output }}</pre>
  </div>
</template>
