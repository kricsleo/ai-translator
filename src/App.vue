<script setup lang="ts">
import { ref } from 'vue'
import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createDeepSeek } from '@ai-sdk/deepseek'

const input = ref('')
const result = ref('')

async function translate() {
  const google = createGoogleGenerativeAI({
    apiKey: 'xxx'
  })
  const start = Date.now()
  const { textStream } = streamText({
    model: google('gemini-2.0-flash-exp'),
    prompt: `Translate the following text to English: ${input.value}`,
  })
  for await (const textPart of textStream) {
    result.value += textPart
    console.log('result google', textPart)
    console.log('time google', Date.now() - start)
  }

}
</script>

<template>
  <div>
    <textarea 
      class="border" 
      rows="4" 
      cols="50"
      v-model="input"
      @keyup.enter="translate" />

    <button @click="translate">translate</button>

    <pre>{{ result }}</pre>
  </div>
</template>

