import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import Progress from '../src/progress'

describe('ol-progress', () => {
  it('should render correctly', () => {
    const { container } = render(<Progress value={50} />)

    expect(container.querySelector('.ol-progress')).toBeTruthy()
    expect(container.querySelector('.ol-progress__inner')).toBeTruthy()
    expect(container.querySelector('.ol-progress-bar')).toBeTruthy()
  })

  it('should respond to value changes', () => {
    const { container, rerender } = render(<Progress value={30} />)

    const bar = container.querySelector('.ol-progress-bar')
    expect(bar?.getAttribute('style')).toContain('translateX(-70%)')

    rerender(<Progress value={60} />)
    expect(bar?.getAttribute('style')).toContain('translateX(-40%)')
  })

  it('should reverse the progress bar direction', () => {
    const { container } = render(<Progress value={40} reverse={true} />)

    expect(container.querySelector('.ol-progress-bar')?.getAttribute('style'))
      .toContain('translateX(60%)')
  })

  it('should control label display with label prop', () => {
    const { container, rerender } = render(<Progress value={50} label={true} />)

    const label = container.querySelector('.ol-progress-label')
    expect(label).toBeTruthy()
    expect(label?.textContent?.trim()).toBe('50%')

    rerender(<Progress value={50} label={false} />)
    expect(container.querySelector('.ol-progress-label')?.getAttribute('style'))
      .toContain('display: none')
  })

  it('should support custom label slot', () => {
    const { container } = render(
      <Progress value={50} label={true}>Custom Label</Progress>,
    )

    expect(container.querySelector('.ol-progress-label')?.textContent?.trim())
      .toBe('Custom Label')
  })
})
