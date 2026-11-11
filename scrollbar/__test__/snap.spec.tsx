import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ScrollSnap from '../src/snap'

describe('scrollSnap', () => {
  it('should render default slot', () => {
    const { container } = render(
      <ScrollSnap>
        <div>test</div>
      </ScrollSnap>,
    )

    expect(container.textContent).toContain('test')
  })

  it('should use default align value', () => {
    const { container } = render(<ScrollSnap />)
    expect(container.firstElementChild).toHaveClass('ol-scroll-snap__align-none')
  })

  it('should set align class', () => {
    const { container, rerender } = render(<ScrollSnap align="center" />)

    expect(container.firstElementChild).toHaveClass('ol-scroll-snap__align-center')

    // 测试动态更新
    rerender(<ScrollSnap align="start" />)
    expect(container.firstElementChild).toHaveClass('ol-scroll-snap__align-start')
  })

  it('should validate align value', () => {
    const validAligns = ['start', 'end', 'center', 'none'] as const

    validAligns.forEach((align) => {
      const { container } = render(<ScrollSnap align={align} />)
      expect(container.firstElementChild).toHaveClass(`ol-scroll-snap__align-${align}`)
    })
  })
})
