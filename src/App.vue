<script setup lang="ts">
import { Toaster } from '~/components/ui/sonner'
import SettingsDialog from '~/features/settings/SettingsDialog.vue'
import Repl from '~/features/repl/Repl.vue'
</script>

<template>
  <div>
    <Toaster />
    <SettingsDialog />
    <Repl />
  </div>
</template>

