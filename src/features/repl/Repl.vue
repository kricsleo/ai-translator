<script setup lang="ts">
import { watch, computed, ref } from 'vue'
import { useAi } from '~/features/ai/ai'
import { Textarea } from '~/components/ui/textarea'
import { tools, useTool } from '../tools/tools'

const input = ref('')
const { output, generate, loading } = useAi(input)

const { tool } = useTool()
watch(tool, () => {
  generate()
})

const icon = computed(() => tools.find(t => t.value === tool.value)?.icon)
</script>

<template>
  <div>
    <Textarea 
      class="resize-none h-60 !text-base"
      v-model="input"
      @keydown.enter="generate" />

    <div class="flex items-center my-6">
      <span class="h-[1px] bg-accent flex-1" />
      <i :class="[
        'w-20 text-center text-lg', 
        loading ? 'icon-[hugeicons--loading-03] animate-spin' : icon]" />
      <span class="h-[1px] bg-accent flex-1" />
    </div>

    <pre class="whitespace-pre-wrap">{{ output }}</pre>
  </div>
</template>
