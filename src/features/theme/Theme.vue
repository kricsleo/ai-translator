<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from './theme';
import Button from '~/components/ui/button/Button.vue';
import { motion } from 'motion-v';

const { theme, toggleTheme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <Button
    class="relative overflow-hidden text-muted-foreground"
    variant="ghost"
    size="icon"
    @click="() => toggleTheme()"
  >
    <motion.i 
      class="absolute icon-[hugeicons--sun-01] size-5"
      :initial="{ y: isDark ? 0 : '-200%' }"
      :animate="{ y: isDark ? '200%' : 0 }"
      :transition="{ ease: 'easeOut', duration: 0.3 }" />
    <motion.i 
      class="absolute icon-[hugeicons--moon-01] size-4"
      :initial="{ y: isDark ? '200%': 0 }"
      :animate="{ y: isDark ? 0 : '-200%' }"
      :transition="{ ease: 'easeOut', duration: 0.3 }" />
  </Button>
</template>
