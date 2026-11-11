import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import Scrollbar from '../src/scrollbar'

describe('scrollbar', () => {
  it('should render default slot', () => {
    const { container } = render(
      <Scrollbar>
        <div>test</div>
      </Scrollbar>,
    )

    expect(container.firstElementChild).toHaveTextContent('test')
  })

  it('should set height', () => {
    const { container } = render(<Scrollbar height="200px" />)

    expect(container.firstElementChild?.getAttribute('style')).toContain('height: 200px')
  })

  it('should set snap class', () => {
    const { container } = render(<Scrollbar snap="both" />)

    expect(container.firstElementChild).toHaveClass('ol-scrollbar__snap-both')
  })

  it('should contain base class', () => {
    const { container } = render(<Scrollbar />)
    expect(container.firstElementChild).toHaveClass('ol-scrollbar')
  })
})
