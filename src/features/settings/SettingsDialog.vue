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
      <Button class="text-muted-foreground" variant="ghost" size="icon">
        <i class="iconify hugeicons--settings-02 size-5" />
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
