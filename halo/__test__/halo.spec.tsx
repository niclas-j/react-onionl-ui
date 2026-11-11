import { createElement } from 'react'
import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Halo from '../src/halo.tsx'

describe('ol-halo', () => {
  beforeEach(() => {
    // Mock Element.animate
    Element.prototype.animate = vi.fn()
  })

  // 测试默认渲染
  it('should render default slot content', () => {
    const { container } = render(
      createElement(Halo, {}, createElement('div', {}, 'test')),
    )

    expect(container.innerHTML).toContain('test')
  })

  it('should use specified HTML tag to render', () => {
    const { container } = render(createElement(Halo, { is: 'span' }))

    expect(container.firstElementChild?.tagName).toBe('SPAN')
  })

  it('should generate keyframes correctly', async () => {
    render(
      createElement(Halo, {
        haloColor: ['#ff0000', '#00ff00'],
        haloRadius: 10,
        offsetX: 5,
        offsetY: 5,
      }),
    )

    await vi.waitFor(() => {
      if (vi.mocked(Element.prototype.animate).mock.calls.length === 0) {
        throw new Error()
      }
    })

    const animateMock = vi.mocked(Element.prototype.animate)
    const keyframes = animateMock.mock.calls[0][0] as { filter: string }[]

    expect(keyframes).toHaveLength(4) // 因为颜色会被复制和反转
    expect(keyframes[0].filter).toContain('drop-shadow(5px 5px 10em #ff0000)')
  })

  it('should handle number and string type offset values correctly', async () => {
    render(
      createElement(Halo, {
        haloColor: '#ff0000',
        offsetX: '2rem',
        offsetY: 10,
      }),
    )

    await vi.waitFor(() => {
      if (vi.mocked(Element.prototype.animate).mock.calls.length === 0) {
        throw new Error()
      }
    })

    const animateMock = vi.mocked(Element.prototype.animate)
    const keyframes = animateMock.mock.calls[0][0] as { filter: string }[]

    expect(keyframes[0].filter).toContain('drop-shadow(2rem 10px')
  })

  it('should handle single color and multiple colors correctly', async () => {
    render(createElement(Halo, { haloColor: '#ff0000' }))

    await vi.waitFor(() => {
      if (vi.mocked(Element.prototype.animate).mock.calls.length === 0) {
        throw new Error()
      }
    })

    const singleColorAnimateMock = vi.mocked(Element.prototype.animate)
    const singleColorKeyframes = singleColorAnimateMock.mock.calls[0][0] as {
      filter: string
    }[]
    expect(singleColorKeyframes).toHaveLength(2)

    Element.prototype.animate = vi.fn()

    render(
      createElement(Halo, {
        haloColor: ['#ff0000', '#00ff00', '#0000ff'],
      }),
    )

    await vi.waitFor(() => {
      if (vi.mocked(Element.prototype.animate).mock.calls.length === 0) {
        throw new Error()
      }
    })

    const multiColorAnimateMock = vi.mocked(Element.prototype.animate)
    const multiColorKeyframes = multiColorAnimateMock.mock.calls[0][0] as {
      filter: string
    }[]
    expect(multiColorKeyframes).toHaveLength(6)
  })

  it('should initialize animation correctly when mounted', async () => {
    render(
      createElement(Halo, {
        haloColor: '#ff0000',
        duration: 3000,
        haloRadius: 6,
      }),
    )

    await vi.waitFor(() => {
      if (vi.mocked(Element.prototype.animate).mock.calls.length === 0) {
        throw new Error()
      }
    })

    const animateMock = vi.mocked(Element.prototype.animate)
    expect(animateMock).toHaveBeenCalled()

    const [keyframes, options] = animateMock.mock.calls[0]
    expect(options).toEqual({
      duration: 3000,
      iterations: Infinity,
    })
    expect(keyframes).toHaveLength(2)
  })

  it('should generate correct animation parameters based on the input configuration', async () => {
    render(
      createElement(Halo, {
        haloColor: ['red', 'blue'],
        duration: 5000,
        haloRadius: 8,
        offsetX: 10,
        offsetY: 20,
      }),
    )

    await vi.waitFor(() => {
      if (vi.mocked(Element.prototype.animate).mock.calls.length === 0) {
        throw new Error()
      }
    })

    const animateMock = vi.mocked(Element.prototype.animate)
    const keyframes = animateMock.mock.calls[0][0] as { filter: string }[]

    expect(keyframes[0].filter).toContain('drop-shadow(10px 20px 8em red)')
    expect(keyframes[keyframes.length - 1].filter).toContain(
      'drop-shadow(10px 20px 8em red)',
    )
  })

  it('should cleanup animation when component is unmounted', () => {
    const { unmount } = render(
      createElement(Halo, { haloColor: '#ff0000' }),
    )

    const animateMock = vi.mocked(Element.prototype.animate)
    const initialCallCount = animateMock.mock.calls.length

    unmount()

    expect(animateMock.mock.calls.length).toBe(initialCallCount)
  })

  it('should handle invalid haloColor correctly', async () => {
    render(createElement(Halo, { haloColor: undefined }))

    await Promise.resolve()

    const animateMock = vi.mocked(Element.prototype.animate)
    expect(animateMock).not.toHaveBeenCalled()
  })
})
