<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
</script>

<template>
  <Tooltip.Root
    :positioning="{
      placement: 'left-start',
      gutter: 16,
      offset: { mainAxis: 12, crossAxis: 12 },
    }"
  >
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
