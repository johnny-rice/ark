<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { type UsePresenceProps, usePresence } from './use-presence.svelte'

  export interface PresenceBaseProps extends UsePresenceProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface PresenceProps extends HTMLProps<'div'>, PresenceBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { splitPresenceProps } from './split-presence-props.svelte'

  let { ref = $bindable(null), ...props }: PresenceProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const presence = usePresence(() => presenceProps)

  const mergedProps = $derived(mergeProps(presence().getPresenceProps(), localProps))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref data-scope="presence" data-part="root" {@attach setNode} {...mergedProps} />
{/if}
