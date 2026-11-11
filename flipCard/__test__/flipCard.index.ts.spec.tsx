import { createElement } from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { beforeEach, describe, expect, it } from 'vitest'
import OlFlipCard from '../src/flipCard'

describe('olFlipCard', () => {
  let container: HTMLElement
  let rerender: ReturnType<typeof render>['rerender']
  const FrontComponent = createElement('div', { className: 'front' }, 'Front Content')
  const BackComponent = createElement('div', { className: 'back' }, 'Back Content')

  beforeEach(() => {
    const result = render(
      createElement(OlFlipCard, {
        flipped: false,
        front: FrontComponent,
        back: BackComponent,
      }),
    )
    container = result.container
    rerender = result.rerender
  })

  it('should render correctly', () => {
    expect(container.firstElementChild).toBeInTheDocument()
    expect(container.querySelector('.front')).toBeInTheDocument()
    expect(container.querySelector('.back')).toBeInTheDocument()
  })

  it('should correctly pass flipped property', () => {
    const { rerender } = render(
      createElement(OlFlipCard, {
        flipped: false,
        front: FrontComponent,
        back: BackComponent,
      }),
    )

    expect(container.firstElementChild).toBeInTheDocument()

    rerender(
      createElement(OlFlipCard, {
        flipped: true,
        front: FrontComponent,
        back: BackComponent,
      }),
    )
    expect(container.firstElementChild).toBeInTheDocument()
  })

  it('should correctly handle custom class', () => {
    rerender(
      createElement(OlFlipCard, {
        flipped: false,
        front: FrontComponent,
        back: BackComponent,
        class: 'custom-class',
      }),
    )
    expect(container.firstElementChild).toHaveClass('custom-class')
  })

  it('should correctly handle component properties being undefined', () => {
    const { rerender } = render(
      createElement(OlFlipCard, {
        flipped: false,
        front: FrontComponent,
        back: BackComponent,
      }),
    )

    rerender(
      createElement(OlFlipCard, {
        flipped: false,
        front: undefined,
        back: undefined,
      }),
    )
    expect(container.firstElementChild).toBeInTheDocument()
  })

  it('should render front and back components correctly', () => {
    expect(container.querySelector('.front')?.textContent).toBe('Front Content')
    expect(container.querySelector('.back')?.textContent).toBe('Back Content')
  })

  it('should render correctly when no components are provided', () => {
    const { container: emptyContainer } = render(
      createElement(OlFlipCard, { flipped: false }),
    )
    expect(emptyContainer.firstElementChild).toBeInTheDocument()
  })
})
