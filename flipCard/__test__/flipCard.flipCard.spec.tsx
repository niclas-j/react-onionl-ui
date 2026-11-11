import * as OnionComponents from '@onionl-ui/components'
import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import OlFlipCard from '../src/flipCard'

describe('olFlipCard', () => {
  let container: HTMLElement
  const FrontComponent = <div className="front">Front Content</div>
  const BackComponent = <div className="back">Back Content</div>
  const flipControlSpy = vi.spyOn(OnionComponents, 'OlFlipControl')

  beforeEach(() => {
    flipControlSpy.mockClear()
    ;({ container } = render(
      <OlFlipCard
        flipped={false}
        front={FrontComponent}
        back={BackComponent}
      />,
    ))
  })

  it('should render correctly', () => {
    expect(container.firstElementChild).toBeInTheDocument()
    expect(container.querySelector('.front')).toBeInTheDocument()
    expect(container.querySelector('.back')).toBeInTheDocument()
  })

  it('should correctly pass flipped property', () => {
    expect(flipControlSpy.mock.calls.at(-1)?.[0].flipped).toBe(false)

    render(
      <OlFlipCard
        flipped={true}
        front={FrontComponent}
        back={BackComponent}
      />,
      { container },
    )
    expect(flipControlSpy.mock.calls.at(-1)?.[0].flipped).toBe(true)
  })

  it('should correctly handle custom class', () => {
    const { container: customClassContainer } = render(
      <OlFlipCard
        flipped={false}
        front={FrontComponent}
        back={BackComponent}
        class="custom-class"
      />,
    )
    expect(customClassContainer.firstElementChild).toHaveClass('custom-class')
  })

  it('should correctly handle component properties being undefined', () => {
    const { container: undefinedContainer } = render(
      <OlFlipCard flipped={false} front={undefined} back={undefined} />,
    )
    expect(undefinedContainer.firstElementChild).toBeInTheDocument()
  })

  it('should render front and back components correctly', () => {
    expect(container.querySelector('.front')?.textContent?.trim()).toBe('Front Content')
    expect(container.querySelector('.back')?.textContent?.trim()).toBe('Back Content')
  })

  it('should render correctly when no components are provided', () => {
    const { container: emptyContainer } = render(<OlFlipCard flipped={false} />)
    expect(emptyContainer.firstElementChild).toBeInTheDocument()
  })
})
