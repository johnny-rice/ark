import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseProgressProps
  extends Optional<Omit<progress.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseProgressReturn extends progress.Api<PropTypes> {}

export const useProgress = (props: UseProgressProps = {}): UseProgressReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: progress.Context = {
    id: useId(),
    dir,
    getRootNode,
    ...props,
  }

  const context: progress.Context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(progress.machine(initialContext), { context })
  return progress.connect(state, send, normalizeProps)
}
