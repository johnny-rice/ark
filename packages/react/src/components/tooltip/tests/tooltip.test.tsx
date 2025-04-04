import { act, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'

describe('Tooltip', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(() => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should show the tooltip on pointerover and close on pointer leave', async () => {
    render(<ComponentUnderTest />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())

    await user.unhover(tooltipTrigger)

    waitFor(() => {
      expect(screen.queryByText('content')).not.toBeVisible()
    })
  })

  it('should show on pointerover if isDisabled has a falsy value', async () => {
    render(<ComponentUnderTest />)

    const tooltipTrigger = await screen.findByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('hover me')).toBeVisible()
  })

  it('should hide the tooltip when escape is pressed', async () => {
    render(<ComponentUnderTest closeOnEscape />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    await waitFor(() => {
      expect(screen.queryByText('content')).not.toBeVisible()
    })
  })

  it('should not hide the tooltip when escape is pressed if closeOnEsc is set to false', async () => {
    render(<ComponentUnderTest closeOnEscape={false} />)

    const tooltipTrigger = await screen.findByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
  })

  it('should have pointer-events none style if interactive is set to false', async () => {
    render(<ComponentUnderTest interactive={false} />)

    const tooltipTrigger = await screen.findByText('hover me')
    await user.hover(tooltipTrigger)

    const tooltipContent = screen.getByText('content')
    expect(tooltipContent).toHaveStyle({ 'pointer-events': 'none' })
  })

  it('should lazy render the tooltip', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())

    await user.keyboard('[Escape]')
    await waitFor(() => {
      expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeVisible()
    })
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)
    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })
})
