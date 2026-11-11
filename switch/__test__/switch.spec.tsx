import { CHANGE_EVENT, CLICK_EVENT, MODEL_VALUE_UPDATE } from '../../constant'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Switch from '../src/switch.tsx'

describe('switch Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('.ol-switch')).toBeInTheDocument()
    expect(container.querySelector('.ol-switch__core')).toBeInTheDocument()
  })

  it('should set initial state based on checked prop', () => {
    const { container } = render(<Switch checked />)
    expect(container.querySelector('.ol-switch')).toHaveClass('ol-switch__checked')
  })

  it('should not toggle when disabled', () => {
    const handlers = {
      [MODEL_VALUE_UPDATE]: vi.fn(),
      [CHANGE_EVENT]: vi.fn(),
      [CLICK_EVENT]: vi.fn(),
    }
    const { container } = render(<Switch disabled {...handlers} />)

    fireEvent.click(container.querySelector('.ol-switch')!)

    expect(handlers[MODEL_VALUE_UPDATE]).not.toHaveBeenCalled()
    expect(handlers[CHANGE_EVENT]).not.toHaveBeenCalled()
    expect(handlers[CLICK_EVENT]).not.toHaveBeenCalled()
  })

  it('should toggle state and emit events on click', async () => {
    const handlers = {
      [MODEL_VALUE_UPDATE]: vi.fn(),
      [CHANGE_EVENT]: vi.fn(),
      [CLICK_EVENT]: vi.fn(),
    }
    const { container } = render(<Switch {...handlers} />)

    fireEvent.click(container.querySelector('.ol-switch')!)

    await waitFor(() => {
      expect(handlers[MODEL_VALUE_UPDATE]).toHaveBeenNthCalledWith(1, true)
    })
    expect(handlers[CHANGE_EVENT]).toHaveBeenNthCalledWith(1, true)
    expect(handlers[CLICK_EVENT]).toHaveBeenNthCalledWith(1, true)

    expect(container.querySelector('.ol-switch')).toHaveClass('ol-switch__checked')
  })

  it('should respond to keyboard events', async () => {
    const handlers = {
      [MODEL_VALUE_UPDATE]: vi.fn(),
    }
    const { container } = render(<Switch {...handlers} />)

    fireEvent.keyDown(container.querySelector('.ol-switch')!, { key: 'Enter' })
    await waitFor(() => {
      expect(handlers[MODEL_VALUE_UPDATE]).toHaveBeenNthCalledWith(1, true)
    })

    fireEvent.keyDown(container.querySelector('.ol-switch')!, { key: ' ' })
    await waitFor(() => {
      expect(handlers[MODEL_VALUE_UPDATE]).toHaveBeenNthCalledWith(2, false)
    })
  })

  it('beforeSwitch hook should execute before toggling', async () => {
    const beforeSwitch = vi.fn(() => Promise.resolve(true))
    const handlers = {
      [MODEL_VALUE_UPDATE]: vi.fn(),
    }
    const { container } = render(<Switch beforeSwitch={beforeSwitch} {...handlers} />)

    fireEvent.click(container.querySelector('.ol-switch')!)

    await waitFor(() => {
      expect(handlers[MODEL_VALUE_UPDATE]).toHaveBeenNthCalledWith(1, true)
    })
    expect(beforeSwitch).toHaveBeenCalled()
  })

  it('should render different sizes', () => {
    const sizes = ['small', 'default', 'large'] as const

    sizes.forEach((size) => {
      const { container } = render(<Switch size={size} />)
      const core = container.querySelector('.ol-switch__core')

      expect(container.querySelector('.ol-switch')).toHaveClass(`ol-switch--${size}`)
      expect(core).toHaveClass(`ol-switch__core--${size}`)
    })
  })
})
