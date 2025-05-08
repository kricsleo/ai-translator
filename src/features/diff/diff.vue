<script setup lang="ts">
// @ts-expect-error no types
import { diffChars } from 'diff';
import { computed } from 'vue';

const props = defineProps<{
  source: string,
  target: string
}>()

const diffArr = computed(() => diffChars(props.source, props.target))
</script>

<template>
  <p>
    <span 
      v-for="(diff, idx) in diffArr" 
      :key="idx"
      :class="{
        'text-red-500': diff.added,
        'line-through': diff.added,
        'text-green-500': diff.removed,
      }"
      >{{ diff.value }}</span>
  </p>
</template>
