<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './rating-group.types'

export interface RatingGroupRootBaseProps extends RootProps, PolymorphicProps {}
export interface RatingGroupRootProps
  extends RatingGroupRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface RatingGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRatingGroup } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'
import { useForwardExpose } from '../../utils'

const props = withDefaults(defineProps<RatingGroupRootProps>(), {
  allowHalf: undefined,
  autoFocus: undefined,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<RatingGroupRootEmits>()

const ratingGroup = useRatingGroup(props, emits)
RatingGroupProvider(ratingGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="ratingGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
