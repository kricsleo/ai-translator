<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="flex justify-center py-4 text-muted-foreground/45 text-sm">
    <a
      class="hover:text-foreground transition-colors mr-1"
      href="https://github.com/kricsleo" 
      target="_blank" 
      rel="noopener noreferrer">
      @Kricsleo
    </a>
    <span>{{ year }} MIT License</span>
    <a
      class="ml-8 text-lg hover:text-foreground transition-colors iconify hugeicons--github-01"
      href="https://github.com/kricsleo/ai-translator" 
      target="_blank" 
      rel="noopener noreferrer">
    </a>
  </footer>
</template>
