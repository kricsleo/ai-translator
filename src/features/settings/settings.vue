<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useSettings } from './settings';
import { useModels } from '../ai/models'
import { providers } from '../ai/providers'

const { provider, apiKey, model } = useSettings()
const { models, loading } = useModels()
</script>

<template>
  <div class="w-2/3 space-y-6 border p-6 rounded">

    <fieldset class="flex gap-2">
      <Label class="w-40 text-right shrink-0" for="provider">Provider:</Label>
      <Select id="provider" v-model="provider">
        <SelectTrigger class="w-120">
          <SelectValue placeholder="Select Provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="provider in providers" :key="provider.value" :value="provider.value">
            {{ provider.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </fieldset>

    <fieldset class="flex gap-2">
      <Label class="w-40 text-right shrink-0" for="apiKey">API Key:</Label>
      <Input id="apiKey" class="w-120" type="text" placeholder="Enter API key" v-model="apiKey" />
    </fieldset>

    <fieldset class="flex gap-2">
      <Label class="w-40 text-right shrink-0" for="model">Model:</Label>
      <Select id="model" v-model="model">
        <SelectTrigger class="w-120">
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

  </div>
</template>
