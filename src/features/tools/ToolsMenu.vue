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
        'relative px-4 py-1 cursor-default transition-colors text-sm',
        { 'text-muted-foreground': item.value !== tool },
      ]"
      @click="tool = item.value"
    >
      <motion.div
        v-if="item.value === tool"
        class="absolute inset-0 bg-accent rounded -z-1"
        layout-id="tools-menu-active"
        :transition="{ duration: 0.15 }"
      />
      <div class="flex items-center gap-1">
        <i :class="item.icon" />
        {{ item.label }}
      </div>
    </li>
  </ul>
</template>
