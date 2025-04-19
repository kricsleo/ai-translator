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
      <Button variant="secondary">
        <i class="icon-[hugeicons--settings-03]" />
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
