import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from '../src/button.tsx'

describe('button Component', () => {
  it('renders default button correctly', () => {
    const { container } = render(<Button>Button Text</Button>)
    const button = container.firstElementChild

    expect(button).toHaveClass('ol-button')
    expect(button?.textContent?.trim()).toBe('Button Text')
    expect(button).toHaveClass('ol-button__size--sm')
    expect(button).toHaveClass('ol-button__type--primary')
  })

  it('renders different button types', () => {
    const types = ['primary', 'secondary', 'outline'] as const

    types.forEach((type) => {
      const { container } = render(<Button type={type}>Button</Button>)
      expect(container.firstElementChild).toHaveClass(`ol-button__type--${type}`)
    })
  })

  it('renders different button sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const { container } = render(<Button size={size}>Button</Button>)
      expect(container.firstElementChild).toHaveClass(`ol-button__size--${size}`)
    })
  })

  it('renders as link when "to" prop is provided', () => {
    const { container } = render(<Button to="https://example.com">Link Button</Button>)
    const button = container.firstElementChild

    expect(button?.tagName).toBe('A')
    expect(button).toHaveAttribute('href', 'https://example.com')
    expect(button).toHaveClass('ol-button__type--link')
  })

  it('renders button with icon', () => {
    const { container } = render(<Button icon="i-mi-add">Icon Button</Button>)
    const iconComponent = container.querySelector('OlIcon, .i-mi-add')

    expect(iconComponent).not.toBeNull()
    expect(iconComponent).toHaveClass('i-mi-add')
  })

  it('renders with link type', () => {
    const { container } = render(<Button link={true}>Link Type Button</Button>)

    expect(container.firstElementChild).toHaveClass('ol-button__type--link')
  })

  it('renders slot content correctly', () => {
    const { container } = render(
      <Button>
        <span className="custom-content">Custom Content</span>
      </Button>,
    )

    expect(container.querySelector('.custom-content')).not.toBeNull()
    expect(container.firstElementChild?.textContent?.trim()).toBe('Custom Content')
  })

  it('disables click event when disabled', () => {
    const onClick = vi.fn()
    const { container } = render(<Button disabled={true} onClick={onClick} />)

    fireEvent.click(container.firstElementChild as HTMLElement)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('triggers click event in normal state', () => {
    const onClick = vi.fn()
    const { container } = render(<Button onClick={onClick} />)

    fireEvent.click(container.firstElementChild as HTMLElement)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
