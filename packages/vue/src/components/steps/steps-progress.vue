<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsProgressBaseProps extends PolymorphicProps {}
export interface StepsProgressProps
  extends StepsProgressBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useForwardExpose } from '../../utils'

defineProps<StepsProgressProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getProgressProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
