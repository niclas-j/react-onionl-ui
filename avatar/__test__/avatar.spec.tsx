import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Avatar from '../src/avatar.tsx'

describe('avatar Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Avatar />)
    const avatar = container.firstElementChild!

    expect(avatar.classList.contains('ol-avatar')).toBe(true)
    expect(avatar.classList.contains('ol-avatar--md')).toBe(true)
    expect(avatar.classList.contains('ol-avatar--circle')).toBe(true)
  })

  it('renders with custom size', () => {
    const { container } = render(<Avatar size="lg" />)

    expect(container.firstElementChild!.classList.contains('ol-avatar--lg')).toBe(true)
  })

  it('renders with custom shape', () => {
    const { container } = render(<Avatar shape="square" />)

    expect(container.firstElementChild!.classList.contains('ol-avatar--square')).toBe(true)
  })

  it('shows fallback icon when image fails to load', () => {
    const onError = vi.fn()
    const { container } = render(<Avatar src="invalid.jpg" onError={onError} />)
    const img = container.querySelector('img')!

    fireEvent.error(img)
    expect(onError).toHaveBeenCalled()
  })

  it('displays initials when provided', () => {
    const { container } = render(<Avatar initials="JD" />)

    expect(container.querySelector('.ol-avatar__fallback')!.textContent?.trim()).toBe('JD')
  })

  it('displays custom icon when provided', () => {
    const { container } = render(<Avatar icon="custom-icon" />)

    expect(container.querySelector('.custom-icon')).not.toBeNull()
  })

  it('applies custom background color', () => {
    const { container } = render(<Avatar backgroundColor="#ff0000" />)

    expect(container.firstElementChild!.getAttribute('style')).toContain('background-color: #ff0000')
  })

  it('emits click event when clickable', () => {
    const onClick = vi.fn()
    const { container } = render(<Avatar clickable={true} onClick={onClick} />)

    fireEvent.click(container.firstElementChild!)
    expect(onClick).toHaveBeenCalled()
  })

  it('does not emit click event when not clickable', () => {
    const onClick = vi.fn()
    const { container } = render(<Avatar clickable={false} onClick={onClick} />)

    fireEvent.click(container.firstElementChild!)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies custom border radius when shape is custom', () => {
    const { container } = render(<Avatar borderRadius={12} />)

    expect(container.firstElementChild!.getAttribute('style')).toContain('border-radius: 12px')
  })

  it('sets proper aria attributes', () => {
    const { container } = render(<Avatar ariaLabel="User Avatar" />)
    const avatar = container.firstElementChild!

    expect(avatar.getAttribute('aria-label')).toBe('User Avatar')
    expect(avatar.getAttribute('role')).toBe('img')
  })
})
