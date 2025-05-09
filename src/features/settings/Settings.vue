<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { useSettings } from './settings';
import { useModels } from '../ai/models'
import { providers } from '../ai/providers'
import { ref } from 'vue';
import Langs from './langs/Langs.vue';
import ToggleDiff from '../diff/ToggleDiff.vue';

const { provider, apiKey, model, proxy } = useSettings()
const { models, loading } = useModels()

const apiKeyMasked = ref(true)
const proxyMasked = ref(true)
</script>

<template>
  <div class="space-y-6">

    <fieldset class="flex items-center gap-4">
      <label class="w-18 text-right shrink-0 text-muted-foreground">Provider</label>
      <Select v-model="provider">
        <SelectTrigger class="grow-1">
          <SelectValue placeholder="Select Provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="provider in providers" :key="provider.value" :value="provider.value">
            {{ provider.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </fieldset>

    <fieldset class="flex items-center gap-4">
      <label class="w-18 text-right shrink-0 text-muted-foreground">Proxy</label>
      <div class="grow-1 relative flex items-center">
        <Input 
          class="grow-1 pr-10" 
          :type="proxyMasked ? 'password' : 'text'" 
          placeholder="Enter Proxy URL" 
          autocomplete="off"
          v-model="proxy" />
        <span 
          class="absolute right-0 h-full w-10 flex items-center justify-center"
          @click="proxyMasked = !proxyMasked">
          <i :class="proxyMasked ? 'size-3.5 opacity-50 iconify hugeicons--view-off' : 'size-3.5 opacity-50 iconify hugeicons--view'" />
        </span>
      </div>
    </fieldset>

    <fieldset class="flex items-center gap-4">
      <label class="w-18 text-right shrink-0 text-muted-foreground">API Key</label>
      <div class="grow-1 relative flex items-center">
        <Input 
          class="grow-1 pr-10" 
          :type="apiKeyMasked ? 'password' : 'text'" 
          placeholder="Enter API key" 
          autocomplete="off"
          v-model="apiKey" />
        <span 
          class="absolute right-0 h-full w-10 flex items-center justify-center"
          @click="apiKeyMasked = !apiKeyMasked">
          <i :class="apiKeyMasked ? 'size-3.5 opacity-50 iconify hugeicons--view-off' : 'size-3.5 opacity-50 iconify hugeicons--view'" />
        </span>
      </div>
    </fieldset>

    <fieldset class="flex items-center gap-4">
      <label class="w-18 text-right shrink-0 text-muted-foreground">Model</label>
      <Select v-model="model">
        <SelectTrigger class="grow-1">
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent>
          <template v-if="models.length">
            <SelectItem v-for="model in models" :key="model.name" :value="model.name">
              {{ model.displayName }}
            </SelectItem>
          </template>
          <SelectItem 
            v-else-if="loading" 
            disabled 
            value="loading"> 
            Loading models...
          </SelectItem>
          <SelectItem 
            v-else 
            disabled 
            value="not-avaliable"> 
            No models available 
          </SelectItem>
        </SelectContent>
      </Select>
    </fieldset>

    <Langs />

    <hr />

    <section>
      <!-- <h3 class="text-lg text-muted-foreground">Polish</h3> -->
      <fieldset class="flex justify-between items-center gap-4">
        <label class="text-muted-foreground">Show Polish Diff</label>
        <ToggleDiff />
      </fieldset>
    </section>

  </div>
</template>
