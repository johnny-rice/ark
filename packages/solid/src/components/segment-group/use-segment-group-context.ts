import { createContext } from '../../utils/create-context'
import type { UseSegmentGroupReturn } from './use-segment-group'

export interface UseSegmentGroupContext extends UseSegmentGroupReturn {}

export const [SegmentGroupProvider, useSegmentGroupContext] = createContext<UseSegmentGroupContext>({
  hookName: 'useSegmentGroupContext',
  providerName: '<SegmentGroupProvider />',
})
