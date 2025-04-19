<script setup lang="ts">
import { Toaster } from '~/components/ui/sonner'
import SettingsDialog from '~/features/settings/SettingsDialog.vue'
import Repl from '~/features/repl/Repl.vue'
import ToolsMenu from './features/tools/ToolsMenu.vue';
</script>

<template>
  <main class="w-167 mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <ToolsMenu />
      <SettingsDialog />
    </div>

    <Repl />
  </main>

  <Toaster />
</template>

