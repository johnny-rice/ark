<script setup lang="ts">
import { Toggle } from '@ark-ui/vue/toggle'
import { Volume, VolumeOff } from 'lucide-vue-next'
import { ref } from 'vue'

const pressed = ref(false)
</script>

<template>
  <div>
    <Toggle.Root v-model:pressed="pressed">
      <component :is="pressed ? Volume : VolumeOff" />
    </Toggle.Root>
    <p>Volume is {{ pressed ? 'unmuted' : 'muted' }}</p>
  </div>
</template>
