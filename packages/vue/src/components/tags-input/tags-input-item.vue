<script lang="ts">
import type { ItemProps } from '@zag-js/tags-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TagsInputItemProps
  extends TagsInputItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { TagsInputItemProvider } from './use-tags-input-item-context'
import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TagsInputItemProps>()
const tagsInput = useTagsInputContext()

TagsInputItemPropsProvider(props)
TagsInputItemProvider(computed(() => tagsInput.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tagsInput.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
