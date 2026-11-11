import { render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import DraggableItem from '../src/draggableItem'

describe('draggableItem', () => {
  it('renders correctly', () => {
    const { container } = render(<DraggableItem />)
    expect(container.querySelector('.ol-draggable-item')).toBeInTheDocument()
  })

  it('applies custom class', () => {
    const customClass = 'custom-class'
    const { container } = render(<DraggableItem class={customClass} />)
    expect(container.firstElementChild).toHaveClass(customClass)
  })

  it('is draggable by default', () => {
    const { container } = render(<DraggableItem />)
    expect(container.firstElementChild?.getAttribute('draggable')).toBe('true')
  })

  it('renders slot content correctly', () => {
    const { container } = render(<DraggableItem>Test Content</DraggableItem>)
    expect(container.textContent?.trim()).toBe('Test Content')
  })
})
