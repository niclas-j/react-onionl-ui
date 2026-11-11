import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PixelImage } from '../src/pixelImage'
import OlPixelImage from '../src/pixelImage.tsx'

describe('olPixelImage', () => {
  let unmount: (() => void) | undefined

  afterEach(() => {
    unmount?.()
    unmount = undefined
    cleanup()
    vi.clearAllMocks()
  })

  it('should render component correctly', () => {
    const result = render(
      <OlPixelImage
        pixelGap={4}
        pixelSize={4}
        width={100}
        height={100}
        viewportWidth={100}
        viewportHeight={100}
        src="test.jpg"
        alt="test image"
      />,
    )
    unmount = result.unmount

    expect(document.querySelector('.ol-pixel-image')).toBeTruthy()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should use correct props and attrs', () => {
    const result = render(
      <OlPixelImage
        pixelGap={8}
        pixelSize={8}
        width={200}
        height={200}
        viewportWidth={200}
        viewportHeight={200}
        src="test.jpg"
        alt="test image"
      />,
    )
    unmount = result.unmount

    const img = screen.getByRole('img')
    expect(img.getAttribute('src')).toBe('test.jpg')
    expect(img.getAttribute('alt')).toBe('test image')
    expect(img.getAttribute('width')).toBe('200')
    expect(img.getAttribute('height')).toBe('200')
  })

  it('should create PixelImage class instance', () => {
    const createMock = vi.fn()
    vi.spyOn(PixelImage.prototype, 'create').mockImplementation(createMock)

    const result = render(
      <OlPixelImage
        pixelGap={4}
        pixelSize={4}
        width={100}
        height={100}
        viewportWidth={100}
        viewportHeight={100}
      />,
    )
    unmount = result.unmount

    expect(createMock).toHaveBeenCalled()
  })

  it('should call destroy method when unmounted', () => {
    const destroyMock = vi.fn()
    vi.spyOn(PixelImage.prototype, 'destroy').mockImplementation(destroyMock)

    const result = render(
      <OlPixelImage
        pixelGap={4}
        pixelSize={4}
        width={100}
        height={100}
        viewportWidth={100}
        viewportHeight={100}
      />,
    )
    unmount = result.unmount
    result.unmount()
    unmount = undefined

    expect(destroyMock).toHaveBeenCalled()
  })

  it('should use default props', () => {
    const component = (
      <OlPixelImage
        width={100}
        height={100}
        viewportWidth={100}
        viewportHeight={100}
        pixelGap={4}
        pixelSize={4}
      />
    )
    const result = render(component)
    unmount = result.unmount

    const img = screen.getByRole('img')

    expect(img).toBeInTheDocument()
    expect(img.getAttribute('width')).toBe('100')
    expect(img.getAttribute('height')).toBe('100')
    expect(component.props['pixelGap']).toBe(4)
    expect(component.props['pixelSize']).toBe(4)
    expect(component.props['viewportWidth']).toBe(100)
    expect(component.props['viewportHeight']).toBe(100)
  })
})
