<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronDownIcon } from 'lucide-vue-next'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react', type: 'JS' },
    { label: 'Solid', value: 'solid', type: 'JS' },
    { label: 'Vue', value: 'vue', type: 'JS' },
    { label: 'Panda', value: 'panda', type: 'CSS' },
    { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
  ],
  groupBy: (item) => item.type,
})
</script>

<template>
  <Select.Root :collection="collection">
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
          <Select.ItemGroup v-for="[type, group] in collection.group()" :key="type">
            <Select.ItemGroupLabel>{{ type }}</Select.ItemGroupLabel>
            <Select.Item v-for="item in group" :key="item.value" :item="item">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
