<script setup lang="ts">
import { Format } from '../..'
</script>

<template>
  <p>
    <Format.Byte :value="120904" unit="byte" />
  </p>
  <p>
    <Format.Number :value="1204" :style="'currency'" currency="EUR" />
  </p>
</template>
