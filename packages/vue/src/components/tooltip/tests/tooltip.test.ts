import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './tooltip.test.vue'

describe('Tooltip', () => {
  it('should show the tooltip on pointerover and close on pointer leave', async () => {
    render(ComponentUnderTest)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(tooltipTrigger)
    await waitFor(() => expect(screen.queryByText('content')).not.toBeVisible())
  })

  it('should show on pointerover if isDisabled has a falsy value', async () => {
    render(ComponentUnderTest, {
      props: {
        disabled: false,
      },
    })

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('hover me')).toBeVisible()
  })

  it('should hide the tooltip when escape is pressed', async () => {
    render(ComponentUnderTest, {
      props: {
        closeOnEscape: true,
      },
    })

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.queryByText('content')).not.toBeVisible())
  })

  it('should not hide the tooltip when escape is pressed if closeOnEsc is set to false', async () => {
    render(ComponentUnderTest, {
      props: {
        closeOnEscape: false,
      },
    })

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('should have pointer-events none style if interactive is set to false', async () => {
    render(ComponentUnderTest, {
      props: {
        interactive: false,
      },
    })

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    const tooltipContent = screen.getByText('content')
    expect(tooltipContent).toHaveStyle({ 'pointer-events': 'none' })
  })

  it('should lazy render the tooltip', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(tooltipTrigger)
    await waitFor(() => expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeVisible())
  })

  it('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
        unmountOnExit: true,
      },
    })

    const trigger = screen.getByText('hover me')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await user.hover(trigger)
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeVisible())

    await user.unhover(trigger)
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })
})
