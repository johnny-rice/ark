<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableCancelTriggerBaseProps extends PolymorphicProps {}
export interface EditableCancelTriggerProps
  extends EditableCancelTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'
import { useForwardExpose } from '../../utils'

defineProps<EditableCancelTriggerProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="editable.getCancelTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
