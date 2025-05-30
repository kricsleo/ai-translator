<script setup lang="ts">
import { watch, ref, useTemplateRef } from 'vue'
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
import { useTimeout } from '@vueuse/core'
import DiffText from '../diff/DiffText.vue'
import { usePolishDiff } from '../diff/diff'

const input = ref('')
const { output, generate, loading } = useAi(input)

const textarea = useTemplateRef<InstanceType<typeof Textarea>>('textarea')

const { tool } = useTool()
watch(tool, () => {
  textarea.value?.focus()
  generate()
})

const { isPending, start } = useTimeout(1000, { controls: true, immediate: false })
async function copy() {
  await navigator.clipboard.writeText(output.value)
  start()
}

const { diffing } = usePolishDiff()

function confirm(e: KeyboardEvent) {
  if(e.shiftKey) {
    return
  }

  e.preventDefault()
  generate()
}

async function paste() {
  const text = await navigator.clipboard.readText()
  input.value = text
  generate()
}
</script>

<template>
  <div>
    <Textarea 
      class="resize-none min-h-45 !text-base text-secondary-foreground"
      autofocus
      ref="textarea"
      v-model="input"
      @keydown.enter="confirm" />

    <div class="flex items-center my-6 gap-6">
      <span class="h-[1px] bg-accent flex-1" />
      <div class="flex items-center gap-6">
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger class="flex">
                <Button class="text-muted-foreground" variant="ghost" size="icon" @click="paste">
                  <i class="iconify hugeicons--file-paste size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Paste text from clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger class="flex">
              <Button 
                class="relative text-muted-foreground" 
                variant="ghost" 
                size="icon" 
                @click="generate">
                <i
                  :class="[
                    'iconify hugeicons--loading-03 absolute animate-spin size-5',
                    loading ? 'transition scale-100 opacity-65' : 'scale-0 opacity-0'
                  ]" />
                <i
                  :class="[
                    'iconify hugeicons--quill-write-02 absolute size-5',
                    loading ? 'scale-20 opacity-0' : 'transition scale-100 opacity-100'
                  ]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger class="flex">
              <Button 
                class="relative text-muted-foreground" 
                variant="ghost" 
                size="icon" 
                @click="copy">
                <i
                  :class="[
                    'iconify hugeicons--tick-02 size-5.5 absolute',
                    isPending ? 'transition scale-100 opacity-65' : 'scale-0 opacity-0'
                  ]" />
                <i
                  :class="[
                    'iconify hugeicons--copy-01 size-5 absolute',
                    isPending ? 'scale-20 opacity-0' : 'transition scale-100 opacity-100'
                  ]" />
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

    <p 
      v-if="tool === 'polish' && diffing && !loading && output"
      class="whitespace-pre-wrap text-secondary-foreground">
      <DiffText :source="input" :target="output" />
    </p>
    <p v-else class="whitespace-pre-wrap text-secondary-foreground">
      {{ output }}
    </p>
  </div>
</template>
