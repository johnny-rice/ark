<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipTriggerBaseProps extends PolymorphicProps {}
export interface TooltipTriggerProps
  extends TooltipTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'
import { useForwardExpose } from '../../utils'

defineProps<TooltipTriggerProps>()
const tooltip = useTooltipContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tooltip.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
