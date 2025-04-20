<script setup lang="ts">
import { watch, ref } from 'vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'
import { useAi } from '~/features/ai/ai'
import { Textarea } from '~/components/ui/textarea'
import { useTool } from '../tools/tools'
import Button from '~/components/ui/button/Button.vue'
import { motion } from 'motion-v'
import { useTimeout } from '@vueuse/core'

const input = ref('')
const { output, generate, loading } = useAi(input)

const { tool } = useTool()
watch(tool, () => {
  generate()
})

const { isPending, start } = useTimeout(1000, { controls: true, immediate: false })
async function copy() {
  await navigator.clipboard.writeText(output.value)
  start()
}
</script>

<template>
  <div>
    <Textarea 
      class="resize-none min-h-40 !text-base text-muted-foreground"
      v-model="input"
      @keydown.enter="generate" />

    <div class="flex items-center my-6 gap-6">
      <span class="h-[1px] bg-accent flex-1" />
      <div class="flex items-center gap-1">
        <TooltipProvider :delayDuration="1000">
          <Tooltip>
            <TooltipTrigger class="flex">
              <Button variant="ghost" size="icon" @click="generate">
                <i :class="[
                  'w-20 text-center text-lg text-muted-foreground', 
                  loading ? 'iconify hugeicons--loading-03 animate-spin' : 'iconify hugeicons--refresh']" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider :delayDuration="1000">
          <Tooltip>
            <TooltipTrigger class="flex">
              <Button 
                class="relative text-muted-foreground" 
                variant="ghost" 
                size="icon" 
                @click="copy">
                <motion.i 
                  v-if="isPending"
                  class="iconify hugeicons--checkmark-circle-02 size-4.5 absolute text-muted-foreground"
                  :initial="{ scale: 0.2, opacity: 0 }" 
                  :animate="{ scale: 1, opacity: 0.65 }" />
                <motion.i
                  v-else
                  class="iconify hugeicons--copy-01 size-4.5 absolute"
                  :initial="false"
                  :animate="{ scale: 1, opacity: 1 }" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy generated text</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
      </div>
      <span class="h-[1px] bg-accent flex-1" />
    </div>

    <pre class="whitespace-pre-wrap text-muted-foreground">{{ output }}</pre>
  </div>
</template>
