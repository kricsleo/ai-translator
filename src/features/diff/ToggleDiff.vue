<script setup lang="ts">
import { Switch } from '~/components/ui/switch'
import { usePolishDiff } from './diff'

const { diffing } = usePolishDiff()
</script>

<template>
  <Switch v-model="diffing" />
</template>
