<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxControlBaseProps extends PolymorphicProps {}
export interface ComboboxControlProps
  extends ComboboxControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useForwardExpose } from '../../utils'

defineProps<ComboboxControlProps>()
const combobox = useComboboxContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
