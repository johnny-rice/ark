<script lang="ts">
import type { AreaProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerAreaBaseProps extends AreaProps, PolymorphicProps {}
export interface ColorPickerAreaProps
  extends ColorPickerAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<ColorPickerAreaProps>()
const colorPicker = useColorPickerContext()

ColorPickerAreaPropsProvider(props)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getAreaProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
