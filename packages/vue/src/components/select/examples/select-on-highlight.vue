<script setup lang="ts">
import { Select, createListCollection, useSelect } from '@ark-ui/vue/select'
import { ChevronDownIcon } from 'lucide-vue-next'

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte'],
})

const select = useSelect({
  collection,
  onHighlightChange({ highlightedValue }) {
    if (highlightedValue) {
      select.value.selectValue(highlightedValue)
    }
  },
})
</script>

<template>
  <Select.RootProvider :value="select">
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
        <Select.Indicator>
          <ChevronDownIcon />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :key="item" :item="item">
              <Select.ItemText>{{ item }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.RootProvider>
</template>
