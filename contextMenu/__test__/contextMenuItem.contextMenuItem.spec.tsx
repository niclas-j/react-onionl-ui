import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import OlContextMenu from '../src/contextMenu'
import OlContextMenuItem from '../src/contextMenuItem'

describe('olContextMenuItem', () => {
  let targetElement: HTMLElement

  beforeEach(() => {
    targetElement = document.createElement('div')
    document.body.appendChild(targetElement)
  })

  afterEach(() => {
    cleanup()
    if (targetElement && targetElement.parentNode) {
      targetElement.parentNode.removeChild(targetElement)
    }
  })

  it('renders correctly when used within a context menu', async () => {
    render(
      <OlContextMenu target={targetElement}>
        <OlContextMenuItem>
          <li>Test Item</li>
        </OlContextMenuItem>
      </OlContextMenu>,
    )

    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    })

    await act(async () => {
      targetElement.dispatchEvent(contextMenuEvent)
    })

    expect(document.body.querySelector('.ol-context-menu-item') !== null).toBe(true)
  })

  it('does not render and warns when used outside of a context menu', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { container } = render(
      <OlContextMenuItem click={vi.fn()}>
        <span>Test Item</span>
      </OlContextMenuItem>,
    )

    expect(container.querySelector('.ol-context-menu-item') !== null).toBe(false)
    expect(console.warn).toHaveBeenCalledWith(
      'ol-content-menu-item must be used as a sub component of ol-content-menu',
    )

    vi.restoreAllMocks()
  })
})
