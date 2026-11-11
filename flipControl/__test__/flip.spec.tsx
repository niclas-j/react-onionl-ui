import { createElement } from 'react'
import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import OlFlipControl from '../src/filp'

describe('olFlipControl', () => {
  let view: ReturnType<typeof render>

  beforeEach(() => {
    view = render(createElement(OlFlipControl, { flipped: false }))
  })

  it('should render the component correctly', () => {
    expect(view.container.querySelector('.ol-flip-control')).toBeTruthy()
    expect(view.container.querySelector('.ol-flip-control__inner')).toBeTruthy()
    expect(view.container.querySelector('.ol-flip-control-front')).toBeTruthy()
    expect(view.container.querySelector('.ol-flip-control-back')).toBeTruthy()
  })

  it('default flipped is false', () => {
    expect(view.container.querySelector('.ol-flip-control__inner')?.classList).not.toContain('is-flipped')
  })

  it('should add the corresponding class when flipped is set to true', () => {
    view.rerender(createElement(OlFlipControl, { flipped: true }))
    expect(view.container.querySelector('.ol-flip-control__inner')?.classList).toContain('is-flipped')
  })

  it('should handle custom class correctly', () => {
    const customClass = 'custom-class'
    view.rerender(createElement(OlFlipControl, { flipped: false, class: customClass }))
    expect(view.container.firstElementChild?.classList).toContain(customClass)

    view.rerender(createElement(OlFlipControl, { flipped: false, class: ['class1', 'class2'] }))
    expect(view.container.firstElementChild?.classList).toContain('class1')
    expect(view.container.firstElementChild?.classList).toContain('class2')
  })

  it('should render front and back slots', () => {
    view = render(
      createElement(
        OlFlipControl,
        { flipped: false },
        createElement('div', { className: 'front-content' }, 'Front'),
        createElement('div', { className: 'back-content' }, 'Back'),
      ),
    )

    expect(view.container.querySelector('.front-content')?.textContent?.trim()).toBe('Front')
    expect(view.container.querySelector('.back-content')?.textContent?.trim()).toBe('Back')
  })

  it('slots are empty should render correctly', () => {
    expect(view.container.querySelector('.ol-flip-control-front')).toBeTruthy()
    expect(view.container.querySelector('.ol-flip-control-back')).toBeTruthy()
  })

  it('should support complex slot content', () => {
    view = render(
      createElement(
        OlFlipControl,
        { flipped: false },
        createElement(
          'div',
          { className: 'complex-front' },
          createElement('h1', null, 'Title'),
          createElement('p', null, 'Content'),
        ),
        createElement(
          'div',
          { className: 'complex-back' },
          createElement('button', null, 'Click me'),
        ),
      ),
    )

    expect(view.container.querySelector('.complex-front h1')).toBeTruthy()
    expect(view.container.querySelector('.complex-back button')).toBeTruthy()
  })

  it('flipped property should be reactive', () => {
    view.rerender(createElement(OlFlipControl, { flipped: true }))
    expect(view.container.querySelector('.ol-flip-control__inner')?.classList).toContain('is-flipped')

    view.rerender(createElement(OlFlipControl, { flipped: false }))
    expect(view.container.querySelector('.ol-flip-control__inner')?.classList).not.toContain('is-flipped')
  })
})
