<script setup lang="ts">
import { Accordion, useAccordion } from '@ark-ui/vue/accordion'
import { ChevronRightIcon } from 'lucide-vue-next'

const items = ['React', 'Solid', 'Vue', 'Svelte']

const accordion = useAccordion({
  multiple: true,
  defaultValue: ['React'],
})
</script>

<template>
  <button @click="accordion.setValue(['Vue'])">Set to Vue</button>

  <Accordion.RootProvider :value="accordion">
    <Accordion.Item v-for="item in items" :key="item" :value="item">
      <Accordion.ItemTrigger>
        What is {{ item }}?
        <Accordion.ItemIndicator>
          <ChevronRightIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{{ item }} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.RootProvider>
</template>
