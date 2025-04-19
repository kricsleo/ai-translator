<script setup lang="ts">
import { motion } from 'motion-v'
import { tools, useTool } from './tools';

const { tool } = useTool()
</script>

<template>
  <ul class="inline-flex border rounded p-1">
    <li
      v-for="item in tools"
      :key="item.label"
      :class="[
        'relative px-4 py-1 cursor-default transition-colors',
        { 'text-muted-foreground': item.value !== tool },
      ]"
      @click="tool = item.value"
    >
      <motion.div
        v-if="item.value === tool"
        class="absolute inset-0 bg-accent rounded"
        layout-id="tools-menu-active"
      />
      <div class="relative flex items-center gap-2">
        <i :class="item.icon" />
        {{ item.label }}
      </div>
    </li>
  </ul>
</template>
