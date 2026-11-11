import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import Input from '../src/input.tsx'

describe('input Component', () => {
  it('renders input correctly', () => {
    const { container } = render(
      <Input
        modelValue=""
        placeholder="请输入"
      />,
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '请输入')
    expect(container.firstElementChild).toHaveClass('ol-input__wrap')
  })

  it('handles model value correctly', () => {
    render(<Input modelValue="test value" />)

    expect(screen.getByRole('textbox')).toHaveValue('test value')
  })

  it('renders prefix icon correctly', () => {
    const { container } = render(<Input prefix="search" />)

    const prefixIcon = container.querySelector('OlIcon, .ol-input__icon-prefix')
    expect(prefixIcon).toBeInTheDocument()
    expect(prefixIcon).toHaveAttribute('icon', 'search')
    expect(prefixIcon).toHaveClass('ol-input__icon-prefix')
    expect(screen.getByRole('textbox')).toHaveClass('pl-10')
  })

  it('renders suffix icon correctly', () => {
    const { container } = render(<Input suffix="close" />)

    const suffixIcon = container.querySelector('OlIcon, .ol-input__icon-suffix')
    expect(suffixIcon).toBeInTheDocument()
    expect(suffixIcon).toHaveAttribute('icon', 'close')
    expect(suffixIcon).toHaveClass('ol-input__icon-suffix')
  })

  it('handles disabled state correctly', () => {
    render(<Input disabled />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('is-disabled')

    fireEvent.focus(input)
    expect(document.activeElement).not.toBe(input)
  })

  it('passes through HTML attributes', () => {
    render(<Input id="test-input" data-test="test" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'test-input')
    expect(input).toHaveAttribute('data-test', 'test')
  })

  it('applies mask when provided', () => {
    render(<Input mask="000-000" modelValue="" />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '123456' } })
    expect(input).toHaveValue(/^\d{3}-\d{3}$/)
  })

  it('emits events correctly', () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const onUpdateModelValue = vi.fn()

    render(
      <Input
        onFocus={onFocus}
        onBlur={onBlur}
        onUpdateModelValue={onUpdateModelValue}
      />,
    )
    const input = screen.getByRole('textbox')

    fireEvent.focus(input)
    expect(onFocus).toHaveBeenCalled()

    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalled()

    fireEvent.change(input, { target: { value: 'new value' } })
    expect(onUpdateModelValue).toHaveBeenCalled()
    expect(onUpdateModelValue).toHaveBeenCalledWith('new value')
  })
})
