import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import OlContextMenu from '../src/contextMenu'

describe('olContextMenu', () => {
  let targetElement: HTMLElement

  beforeEach(() => {
    targetElement = document.createElement('div')
    document.body.appendChild(targetElement)
  })

  afterEach(() => {
    if (targetElement && targetElement.parentNode) {
      targetElement.parentNode.removeChild(targetElement)
    }
  })

  it('should not show menu by default', async () => {
    const { container } = render(
      <OlContextMenu target={targetElement}>
        <li>Test Item</li>
      </OlContextMenu>,
    )

    expect(container.querySelector('.ol-context-menu') !== null).toBe(false)
  })

  it('should show menu on contextmenu event', async () => {
    const element = (
      <OlContextMenu target={targetElement}>
        <li>Test Item</li>
      </OlContextMenu>
    )
    const { container } = render(element)

    expect(element.props.target).toBe(targetElement)

    await act(async () => {
      await Promise.resolve()
    })

    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 200,
    })
    await act(async () => {
      targetElement.dispatchEvent(contextMenuEvent)
    })

    expect(container.querySelector('.ol-context-menu') !== null).toBe(true)
  })

  it('should close menu when clicking outside', async () => {
    const { container } = render(
      <OlContextMenu target={targetElement}>
        <li>Test Item</li>
      </OlContextMenu>,
    )

    await act(async () => {
      targetElement.dispatchEvent(new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 200,
      }))
      await Promise.resolve()
    })

    await act(async () => {
      document.body.click()
    })

    expect(container.querySelector('.ol-context-menu') !== null).toBe(false)
  })

  it('should close menu when right clicking outside', async () => {
    const { container } = render(
      <OlContextMenu target={targetElement}>
        <li>Test Item</li>
      </OlContextMenu>,
    )

    await act(async () => {
      targetElement.dispatchEvent(new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 200,
      }))
      await Promise.resolve()
    })

    await act(async () => {
      document.body.dispatchEvent(new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 300,
        clientY: 400,
      }))
    })

    expect(container.querySelector('.ol-context-menu') !== null).toBe(false)
  })
})
