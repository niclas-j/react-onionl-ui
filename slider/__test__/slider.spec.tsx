import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import OlSlider from '../src/slider.tsx'

describe('olSlider', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<OlSlider />)
    expect(container.firstChild).toBeTruthy()
  })

  it('should render thumb element', () => {
    const { container } = render(<OlSlider />)
    expect(container.querySelector('.ol-slider__thumb')).toBeTruthy()
  })

  it('should set min and max value correctly', () => {
    const slider = <OlSlider min={10} max={90} />
    expect(slider.props.min).toBe(10)
    expect(slider.props.max).toBe(90)
  })

  it('should set disabled status correctly', () => {
    const { container } = render(<OlSlider disabled={true} />)
    const thumb = container.querySelector('.ol-slider__thumb')

    expect(thumb).toHaveClass('ol-slider__thumb--disabled')
  })

  it('should add correct classes when interacting with the slider', async () => {
    const { container } = render(
      <OlSlider
        modelValue={50}
        min={0}
        max={100}
        step={1}
        vertical={false}
      />,
    )
    const thumb = container.querySelector('.ol-slider__thumb')!

    expect(thumb).not.toHaveClass('ol-slider__thumb--drag')

    await fireEvent.mouseDown(thumb)
    expect(thumb).toHaveClass('ol-slider__thumb--drag')
  })

  it('should set percentage style based on modelValue', () => {
    const { container } = render(
      <OlSlider modelValue={75} min={0} max={100} />,
    )

    const progressStyle = container
      .querySelector('.ol-slider__progress')
      ?.getAttribute('style')
    expect(progressStyle).toContain('width: 75%')
  })

  it('should add vertical class when vertical prop is true', () => {
    const { container } = render(<OlSlider vertical={true} />)

    expect(container.firstElementChild).toHaveClass('ol-slider--vertical')
  })

  it('should emit update:modelValue event when dragging', async () => {
    const onUpdateModelValue = vi.fn()
    const { container } = render(
      <OlSlider
        modelValue={50}
        {...{ 'onUpdate:modelValue': onUpdateModelValue }}
      />,
    )
    const thumb = container.querySelector('.ol-slider__thumb')!

    await fireEvent.mouseDown(thumb)

    const moveEvent = new MouseEvent('mousemove', {
      clientX: 200,
      bubbles: true,
    })
    document.dispatchEvent(moveEvent)

    expect(onUpdateModelValue).toHaveBeenCalled()
  })
})
