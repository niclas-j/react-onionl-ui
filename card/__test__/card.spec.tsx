import { render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import Card from '../src/card'
import CardContent from '../src/content'
import CardFooter from '../src/footer'
import CardHeader from '../src/header'

describe('ol-card', () => {
  describe('cardContainer', () => {
    it('should render', () => {
      const { container } = render(createElement(Card))
      expect(container.firstElementChild).toHaveClass('ol-card')
    })

    it('should support custom class', () => {
      const { container } = render(createElement(Card, { class: 'custom-class' }))
      expect(container.firstElementChild).toHaveClass('custom-class')
    })

    it('should render default slot content', () => {
      const { container } = render(createElement(Card, null, 'Card Content'))
      expect(container.textContent).toBe('Card Content')
    })

    it('should support header/content/footer', () => {
      const { container } = render(
        createElement(
          Card,
          null,
          createElement(CardHeader, null, 'Header'),
          createElement(CardContent, null, 'Content'),
          createElement(CardFooter, null, 'Footer'),
        ),
      )

      const header = container.querySelector('.ol-card-header')
      const content = container.querySelector('.ol-card-content')
      const footer = container.querySelector('.ol-card-footer')

      expect(header).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(footer).toBeInTheDocument()

      expect(header?.textContent).toBe('Header')
      expect(content?.textContent).toBe('Content')
      expect(footer?.textContent).toBe('Footer')
    })
  })

  describe('card sub-components', () => {
    // 测试 Header
    describe('cardHeader', () => {
      it('should render', () => {
        const { container } = render(createElement(CardHeader))
        expect(container.firstElementChild).toHaveClass('ol-card-header')
      })

      it('should support custom class', () => {
        const { container } = render(createElement(CardHeader, { class: 'custom-header' }))
        expect(container.firstElementChild).toHaveClass('custom-header')
      })

      it('should render slot content', () => {
        const { container } = render(createElement(CardHeader, null, 'Header Content'))
        expect(container.textContent).toBe('Header Content')
      })
    })

    // 测试 Content
    describe('cardContent', () => {
      it('should render', () => {
        const { container } = render(createElement(CardContent))
        expect(container.firstElementChild).toHaveClass('ol-card-content')
      })

      it('should support custom class', () => {
        const { container } = render(createElement(CardContent, { class: 'custom-content' }))
        expect(container.firstElementChild).toHaveClass('custom-content')
      })

      it('should render slot content', () => {
        const { container } = render(createElement(CardContent, null, 'Content Text'))
        expect(container.textContent).toBe('Content Text')
      })
    })

    // 测试 Footer
    describe('cardFooter', () => {
      it('should render', () => {
        const { container } = render(createElement(CardFooter))
        expect(container.firstElementChild).toHaveClass('ol-card-footer')
      })

      it('should support custom class', () => {
        const { container } = render(createElement(CardFooter, { class: 'custom-footer' }))
        expect(container.firstElementChild).toHaveClass('custom-footer')
      })

      it('should render slot content', () => {
        const { container } = render(createElement(CardFooter, null, 'Footer Content'))
        expect(container.textContent).toBe('Footer Content')
      })
    })
  })
})
