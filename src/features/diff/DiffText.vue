<script setup lang="ts">
import { diffWords } from 'diff';
import { computed } from 'vue';

const props = defineProps<{
  source: string,
  target: string
}>()

const diffArr = computed(() => diffWords(props.source, props.target))
</script>

<template>
  <p>
    <span 
      v-for="(diff, idx) in diffArr" 
      :key="idx"
      :class="{
        'text-red-400 line-through select-none': diff.removed,
        'text-green-400': diff.added,
      }"
      >{{ diff.value }}</span>
  </p>
</template>
