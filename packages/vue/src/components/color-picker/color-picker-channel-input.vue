<script lang="ts">
import type { ChannelInputProps } from '@zag-js/color-picker'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerChannelInputBaseProps extends ChannelInputProps, PolymorphicProps {}
export interface ColorPickerChannelInputProps
  extends ColorPickerChannelInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<ColorPickerChannelInputProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="colorPicker.getChannelInputProps(props)" :as-child="asChild">
    <slot />
  </ark.input>
</template>
