<script lang="ts">
import type { ItemProps } from '@zag-js/radio-group'
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface RadioGroupItemProps
  extends RadioGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed } from 'vue'
import { useRadioGroupContext } from './use-radio-group-context'
import { RadioGroupItemProvider } from './use-radio-group-item-context'
import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<RadioGroupItemProps>()
const radioGroup = useRadioGroupContext()

RadioGroupItemPropsProvider(props)
RadioGroupItemProvider(computed(() => radioGroup.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.label v-bind="radioGroup.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.label>
</template>
