<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface HoverCardPositionerBaseProps extends PolymorphicProps {}
export interface HoverCardPositionerProps
  extends HoverCardPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardPositionerProps>()
const hoverCard = useHoverCardContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="hoverCard.getPositionerProps()"
    :present="hoverCard.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
