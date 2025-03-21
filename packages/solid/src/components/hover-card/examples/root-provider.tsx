import { HoverCard, useHoverCard } from '@ark-ui/solid/hover-card'
import { Portal } from 'solid-js/web'

export const RootProvider = () => {
  const hoverCard = useHoverCard()

  return (
    <>
      <button onClick={() => hoverCard().setOpen(true)}>Open</button>

      <HoverCard.RootProvider value={hoverCard}>
        <HoverCard.Trigger>Hover me</HoverCard.Trigger>
        <Portal>
          <HoverCard.Positioner>
            <HoverCard.Content>
              <HoverCard.Arrow>
                <HoverCard.ArrowTip />
              </HoverCard.Arrow>
              Content
            </HoverCard.Content>
          </HoverCard.Positioner>
        </Portal>
      </HoverCard.RootProvider>
    </>
  )
}
