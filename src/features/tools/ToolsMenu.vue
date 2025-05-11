<script setup lang="ts">
import { tools, useTool } from './tools';

const { tool } = useTool()

let prevIndicatorRect: DOMRect

function beforeLeave(el: HTMLElement) {
  prevIndicatorRect = el.getBoundingClientRect()
}

function beforeEnter(el: HTMLElement) {
  el.style.visibility = 'hidden';
  requestAnimationFrame(() => {
    const curRect = el.getBoundingClientRect();

    el.style.visibility = '';
    el.style.transform = `translateX(${prevIndicatorRect.left - curRect.left}px)`;
    el.style.width = `${prevIndicatorRect.width}px`;

    requestAnimationFrame(() => {
      el.classList.add('transition-all');
      el.style.transform = '';
      el.style.width = `${curRect.width}px`;

      el.addEventListener('transitionend', () => {
        el.classList.remove('transition-all');
      }, { once: true });
    });
  })
}
</script>

<template>
  <ul class="inline-flex border rounded p-1">
    <li
      v-for="item in tools"
      :key="item.label"
      :class="[
        'relative px-4 py-1 cursor-default transition-colors text-sm',
        { 'text-muted-foreground': item.value !== tool },
      ]"
      @click="tool = item.value"
    >
      <Transition 
        @beforeLeave="el => beforeLeave(el as HTMLElement)"
        @beforeEnter="el => beforeEnter(el as HTMLElement)">
        <div
          v-if="item.value === tool"
          ref="indicator"
          class="absolute inset-0 bg-accent rounded -z-1"
        />
      </Transition>
      
      <div class="flex items-center gap-1">
        <i :class="item.icon" />
        {{ item.label }}
      </div>
    </li>
  </ul>
</template>
