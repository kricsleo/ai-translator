<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="flex items-center justify-center py-4 text-muted-foreground text-sm opacity-45">
    <a
      class="flex items-center hover:underline underline-offset-4 mr-1"
      href="https://github.com/kricsleo" 
      target="_blank" 
      rel="noopener noreferrer">
      @Kricsleo
    </a>
    <span>{{ year }} MIT License</span>
    <a
      class="flex items-center ml-6"
      href="https://github.com/kricsleo/ai-translator" 
      target="_blank" 
      rel="noopener noreferrer">
      <i class="iconify hugeicons--github" />
    </a>
  </footer>
</template>
