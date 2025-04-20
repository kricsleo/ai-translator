<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import Settings from './Settings.vue';
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button variant="ghost" size="icon">
        <i class="iconify hugeicons--settings-01 size-4 text-muted-foreground" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>

      <Settings class="mt-4" />
    </DialogContent>
  </Dialog>
</template>
