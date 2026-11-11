import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import TypingText from '../src/typingText'

describe('typingText', () => {
  it('render text', () => {
    const text = 'Hello World'
    const props = { text }
    const { container } = render(<TypingText {...props} />)
    const element = container.firstElementChild

    expect(element?.textContent?.trim()).toBe(text)
    expect(element?.getAttribute('role')).toBe('text')
    expect(element?.getAttribute('aria-label')).toBe('Typewriter effect text')
  })

  it('calculate animation style variables', () => {
    const text = 'Test'
    const duration = 5
    const { container } = render(<TypingText text={text} duration={duration} />)
    const style = container.firstElementChild?.getAttribute('style')

    expect(style).toContain('--typing-duration: 5s')
    expect(style).toContain('--typing-steps: 4') // text.length = 4
  })

  it('merge custom class', () => {
    const props = {
      text: 'test',
      class: 'custom-class',
    }
    const { container } = render(<TypingText {...props} />)
    const element = container.firstElementChild

    expect(element).toHaveClass('ol-typing__text')
    expect(element).toHaveClass('custom-class')
  })

  it('use default duration', () => {
    const props = { text: 'test' }
    const { container } = render(<TypingText {...props} />)

    expect(container.firstElementChild?.getAttribute('style')).toContain(
      '--typing-duration: 8s',
    )
  })
})
