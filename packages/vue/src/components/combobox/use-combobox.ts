import * as combobox from '@zag-js/combobox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { CollectionItem } from '../collection'
import { useFieldContext } from '../field'
import type { RootEmits } from './combobox'

export interface UseComboboxProps<T extends CollectionItem>
  extends Optional<Omit<combobox.Props<T>, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the combobox
   */
  modelValue?: combobox.Props<T>['value']
}

export interface UseComboboxReturn<T extends CollectionItem> extends ComputedRef<combobox.Api<PropTypes, T>> {}

export const useCombobox = <T extends CollectionItem>(
  props: UseComboboxProps<T>,
  emit?: EmitFn<RootEmits<T>>,
): UseComboboxReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<combobox.Props<T>>(() => {
    return {
      id,
      ids: {
        label: field?.value.ids.label,
        input: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      required: field?.value.required,
      invalid: field?.value.invalid,
      dir: locale.value.dir,
      value: props.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(props),
      onFocusOutside: (details) => {
        emit?.('focusOutside', details)
        props.onFocusOutside?.(details)
      },
      onHighlightChange: (details) => {
        emit?.('highlightChange', details)
        emit?.('update:highlightedValue', details.highlightedValue)
        props.onHighlightChange?.(details)
      },
      onInputValueChange: (details) => {
        emit?.('inputValueChange', details)
        emit?.('update:inputValue', details.inputValue)
        props.onInputValueChange?.(details)
      },
      onInteractOutside: (details) => {
        emit?.('interactOutside', details)
        props.onInteractOutside?.(details)
      },
      onPointerDownOutside: (details) => {
        emit?.('pointerDownOutside', details)
        props.onPointerDownOutside?.(details)
      },
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        props.onOpenChange?.(details)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        props.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(combobox.machine, context)
  return computed(() => combobox.connect(service, normalizeProps))
}
