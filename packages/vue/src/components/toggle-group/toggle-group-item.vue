<script lang="ts">
import type { ItemProps } from '@zag-js/toggle-group'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ToggleGroupItemProps
  extends ToggleGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToggleGroupContext } from './use-toggle-group-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<ToggleGroupItemProps>()
const toggleGroup = useToggleGroupContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="toggleGroup.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
