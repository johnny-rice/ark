<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerViewControlBaseProps extends PolymorphicProps {}
export interface DatePickerViewControlProps
  extends DatePickerViewControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<DatePickerViewControlProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getViewControlProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
