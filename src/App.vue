<script setup lang="ts">
import { Toaster } from '~/components/ui/sonner'
import SettingsDialog from '~/features/settings/SettingsDialog.vue'
import Repl from '~/features/repl/Repl.vue'
import ToolsMenu from '~/features/tools/ToolsMenu.vue';
import Footer from './features/footer/footer.vue';
import Theme from './features/theme/Theme.vue';
</script>

<template>
  <main class="max-w-170 mx-auto py-4 px-4 sm:px-6 min-h-[78vh]">
    <div class="flex items-center justify-between mb-6">
      <ToolsMenu />
      <div class="flex items-center">
        <Theme />
        <SettingsDialog />
      </div>
    </div>

    <Repl />
  </main>

  <Footer class="mt-[15vh]" />

  <Toaster />
</template>

