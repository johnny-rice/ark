<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableAreaBaseProps extends PolymorphicProps {}
export interface EditableAreaProps
  extends EditableAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'
import { useForwardExpose } from '../../utils'

defineProps<EditableAreaProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="editable.getAreaProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
