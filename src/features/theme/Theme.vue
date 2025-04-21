<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from './theme';
import Button from '~/components/ui/button/Button.vue';

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
    <i 
      :class="[
        'absolute iconify hugeicons--sun-01 size-5.5 transition duration-300',
        { 'translate-y-[200%]': isDark }
      ]" />
    <i 
      :class="[
        'absolute iconify hugeicons--moon-slow-wind size-5 transition duration-300',
        { '-translate-y-[200%]': !isDark }
      ]" />
  </Button>
</template>
