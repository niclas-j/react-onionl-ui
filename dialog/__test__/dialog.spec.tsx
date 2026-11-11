import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi } from 'vitest'
import Dialog from '../src/dialog.tsx'

describe('dialog.vue', () => {
  it('renders dialog correctly when show is true', () => {
    const { container } = render(
      <Dialog show={true}>
        <div className="test-content">测试内容</div>
      </Dialog>,
    )

    expect(container.querySelector('.ol-dialog')).toBeVisible()
    expect(container.querySelector('.ol-dialog__mask')).toBeInTheDocument()
    expect(container.querySelector('.test-content')).toBeInTheDocument()
  })

  it('emits update:show and close events when mask is clicked', () => {
    const onUpdateShow = vi.fn()
    const onClose = vi.fn()
    const { container } = render(
      <Dialog show={true} maskClickClose={true} onUpdateShow={onUpdateShow} onClose={onClose} />,
    )

    fireEvent.click(container.querySelector('.ol-dialog__mask')!)

    expect(onUpdateShow.mock.calls[0]).toEqual([false])
    expect(onClose.mock.calls[0]).toEqual(['maskClick'])
  })

  it('should not close when maskClickClose is false', () => {
    const onUpdateShow = vi.fn()
    const onClose = vi.fn()
    const { container } = render(
      <Dialog show={true} maskClickClose={false} onUpdateShow={onUpdateShow} onClose={onClose} />,
    )

    fireEvent.click(container.querySelector('.ol-dialog__mask')!)

    expect(onUpdateShow.mock.calls.length).toBeFalsy()
    expect(onClose.mock.calls.length).toBeFalsy()
  })

  it('updates visibility and emits events when show changes', async () => {
    const onUpdateShow = vi.fn()
    const onClose = vi.fn()
    const { rerender } = render(
      <Dialog show={true} onUpdateShow={onUpdateShow} onClose={onClose} />,
    )

    rerender(<Dialog show={false} onUpdateShow={onUpdateShow} onClose={onClose} />)
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(onUpdateShow.mock.calls[0]).toEqual([false])
    expect(onClose.mock.calls[0]).toEqual(['closeByCustom'])
  })

  it('emits open event when dialog opens', async () => {
    const onOpen = vi.fn()
    const { rerender } = render(<Dialog show={false} onOpen={onOpen} />)

    rerender(<Dialog show={true} onOpen={onOpen} />)
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(onOpen.mock.calls.length > 0).toBeTruthy()
  })

  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<Dialog show={false} />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })

  it('handles animation transitions', async () => {
    const onUpdateShow = vi.fn()
    const onClose = vi.fn()
    const { container } = render(
      <Dialog
        show={true}
        mask={true}
        maskClickClose={true}
        onUpdateShow={onUpdateShow}
        onClose={onClose}
      />,
    )

    fireEvent.click(container.querySelector('.ol-dialog__mask')!)
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(onUpdateShow.mock.calls[0]).toEqual([false])
    expect(onClose.mock.calls[0]).toEqual(['maskClick'])
    expect(container.querySelector('.ol-dialog')).toBeVisible()
  })

  it('handles multiple show/hide transitions', async () => {
    const onOpen = vi.fn()
    const { container, rerender } = render(<Dialog show={false} onOpen={onOpen} />)

    rerender(<Dialog show={true} onOpen={onOpen} />)
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(container.querySelector('.ol-dialog')).toBeVisible()
    expect(onOpen.mock.calls.length > 0).toBeTruthy()
  })
})
