import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseNumberInputReturn } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

interface RootProviderProps {
  value: UseNumberInputReturn
}

export interface NumberInputRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface NumberInputRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    NumberInputRootProviderBaseProps {}

export const NumberInputRootProvider = (props: NumberInputRootProviderProps) => {
  const [{ value: numberInput }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => numberInput().getRootProps(), localProps)

  return (
    <NumberInputProvider value={numberInput}>
      <ark.div {...mergedProps} />
    </NumberInputProvider>
  )
}
