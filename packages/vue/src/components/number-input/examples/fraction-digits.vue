<script setup lang="ts">
import { NumberInput } from '@ark-ui/vue/number-input'
</script>

<template>
  <NumberInput.Root :formatOptions="{ minimumFractionDigits: 2, maximumFractionDigits: 3 }" model-value="1.00">
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
