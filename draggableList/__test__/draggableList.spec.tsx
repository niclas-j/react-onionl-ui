import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import DraggableItem from '../src/draggableItem'
import DraggableList from '../src/draggableList'

describe('draggableList', () => {
  let container: HTMLElement

  beforeEach(() => {
    const result = render(
      <DraggableList>
        <DraggableItem>Item 1</DraggableItem>
        <DraggableItem>Item 2</DraggableItem>
        <DraggableItem>Item 3</DraggableItem>
      </DraggableList>,
    )
    container = result.container
  })

  it('renders correctly', () => {
    expect(container.querySelector('.ol-draggable-list')).not.toBeNull()
    expect(container.querySelectorAll('.ol-draggable-item')).toHaveLength(3)
  })

  it('custom class', () => {
    const customClass = 'custom-class'
    const { container: customContainer } = render(
      <DraggableList class={customClass} />,
    )
    expect(customContainer.firstElementChild?.classList).toContain(customClass)
  })

  it('adds dragging class on drag start', async () => {
    const firstItem = container.querySelector('.ol-draggable-item')!

    fireEvent.dragStart(firstItem)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(firstItem.classList).toContain('dragging')
  })

  it('removes dragging class on drag end', async () => {
    const firstItem = container.querySelector('.ol-draggable-item')!

    fireEvent.dragStart(firstItem)
    await new Promise(resolve => setTimeout(resolve, 0))
    fireEvent.dragEnd(firstItem)

    expect(firstItem.classList).not.toContain('dragging')
  })

  it('swaps positions on drag', () => {
    const items = container.querySelectorAll('.ol-draggable-item')
    const firstItem = items[0]
    const secondItem = items[1]

    fireEvent.dragStart(firstItem)
    fireEvent.dragEnter(secondItem)

    const newItems = container.querySelectorAll('.ol-draggable-item')
    expect(newItems[1].textContent).toBe('Item 1')
    expect(newItems[0].textContent).toBe('Item 2')
  })
})
