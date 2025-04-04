import { act, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Popover', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should open and close the popover', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())

    await user.click(screen.getByText('close'))
    await waitFor(() => {
      expect(screen.queryByText('title')).not.toBeVisible()
    })
  })

  it('should focus the first focusable element', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
  })

  it('should allow controlled usage', async () => {
    render(<ControlledComponentUnderTest />)
    expect(screen.queryByText('title')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    await waitFor(() => {
      expect(screen.queryByText('title')).not.toBeVisible()
    })
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeVisible())

    await user.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.getByRole('button', { name: 'click me' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'close' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should open by default', async () => {
    render(<ComponentUnderTest defaultOpen />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})
