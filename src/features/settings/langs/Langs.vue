<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { langs, useLangs } from './langs';

const { sourceLang, sourceLangName, targetLang, targetLangName } = useLangs()
</script>

<template>
  <fieldset class="flex items-center gap-4">
    <label class="w-18 text-right shrink-0 text-muted-foreground">Language</label>
    <div class="flex items-center gap-4">
      <Select v-model="sourceLang">
        <SelectTrigger>
          <SelectValue placeholder="Source Language">{{ sourceLangName }}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="lang in langs" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </SelectItem>
        </SelectContent>
      </Select>
      <i class="iconify hugeicons--arrow-data-transfer-horizontal" />
      <Select v-model="targetLang">
        <SelectTrigger>
          <SelectValue placeholder="Target Language">{{ targetLangName }}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="lang in langs" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </fieldset>
</template>
