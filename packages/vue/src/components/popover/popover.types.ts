import type * as popover from '@zag-js/popover'

export interface RootProps {
  /**
   * Whether to automatically set focus on the first focusable
   * content within the popover when opened.
   *
   * @default true
   */
  autoFocus?: boolean
  /**
   * Whether to close the popover when the escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Whether to close the popover when the user clicks outside of the popover.
   * @default true
   */
  closeOnInteractOutside?: boolean
  /**
   * The initial open state of the popover when rendered.
   * Use when you don't need to control the open state of the popover.
   */
  defaultOpen?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the popover. Useful for composition.
   */
  ids?: Partial<{
    anchor: string
    trigger: string
    content: string
    title: string
    description: string
    closeTrigger: string
    positioner: string
    arrow: string
  }>
  /**
   * The element to focus on when the popover is opened.
   */
  initialFocusEl?: () => HTMLElement | null
  /**
   * Whether the popover should be modal. When set to `true`:
   * - interaction with outside elements will be disabled
   * - only popover content will be visible to screen readers
   * - scrolling is blocked
   * - focus is trapped within the popover
   *
   * @default false
   */
  modal?: boolean
  /**
   * The controlled open state of the popover
   */
  open?: boolean
  /**
   * Returns the persistent elements that:
   * - should not have pointer-events disabled
   * - should not trigger the dismiss event
   */
  persistentElements?: (() => Element | null)[]
  /**
   * Whether the popover is portalled. This will proxy the tabbing behavior regardless of the DOM position
   * of the popover content.
   *
   * @default true
   */
  portalled?: boolean
  /**
   * The user provided options used to position the popover content
   */
  positioning?: popover.PositioningOptions
}

export type RootEmits = {
  /**
   * Function called when the escape key is pressed
   */
  escapeKeyDown: [event: KeyboardEvent]
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: popover.FocusOutsideEvent]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: popover.InteractOutsideEvent]
  /**
   * Function invoked when the popover opens or closes
   */
  openChange: [details: popover.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: popover.PointerDownOutsideEvent]
  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]
}
