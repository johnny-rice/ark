import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export interface CollapsibleRootBaseProps extends UseCollapsibleProps, PolymorphicProps<'div'> {}
export interface CollapsibleRootProps extends HTMLProps<'div'>, CollapsibleRootBaseProps {}

export const CollapsibleRoot = (props: CollapsibleRootProps) => {
  const [useCollapsibleProps, localProps] = createSplitProps<UseCollapsibleProps>()(props, [
    'defaultOpen',
    'disabled',
    'id',
    'ids',
    'lazyMount',
    'onExitComplete',
    'onOpenChange',
    'open',
    'unmountOnExit',
  ])

  const api = useCollapsible(useCollapsibleProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <CollapsibleProvider value={api}>
      <ark.div {...mergedProps} />
    </CollapsibleProvider>
  )
}
