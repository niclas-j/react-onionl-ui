import { createElement, type ReactNode } from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import Image from '../src/image'

const VALID_IMAGE_URL = 'https://i.postimg.cc/sx8CQcYj/pexels-photo-1108099.jpg'
const EMPTY_IMAGE_URL = ''

function factory(
  props: Record<string, string>,
  slots?: Record<string, ReactNode>,
) {
  const result = render(
    createElement(Image, props, slots ? Object.values(slots) : undefined),
  )

  return {
    ...result,
    find: (selector: string) => result.container.querySelector(selector),
  }
}

describe('image Component', () => {
  it('image render', async () => {
    const wrapper = factory({
      src: 'test.jpg',
      alt: 'test image',
    })

    expect(wrapper.find('.ol-image')).not.toBeNull()
  })

  it('should render basic image correctly', async () => {
    const wrapper = factory({
      src: VALID_IMAGE_URL,
      alt: 'test image',
    })

    const img = wrapper.find('img')
    expect(img).not.toBeNull()

    expect(img).toHaveAttribute('src', VALID_IMAGE_URL)
    expect(img).toHaveAttribute('alt', 'test image')
  })

  it('should show error state when src is empty', async () => {
    const wrapper = factory({
      src: EMPTY_IMAGE_URL,
    })

    expect(wrapper.find('.ol-image__error')).not.toBeNull()
    expect(wrapper.find('img')).toBeNull()
  })

  it('should apply fit class correctly', async () => {
    const wrapper = factory({
      src: VALID_IMAGE_URL,
      fit: 'cover',
    })

    expect(wrapper.find('img')).toHaveClass('ol-image__fit-cover')
  })

  it('should support lazy loading', async () => {
    const mockObserve = vi.fn()

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn().mockImplementation(() => ({
        observe: mockObserve,
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      })),
    )

    factory({
      src: VALID_IMAGE_URL,
      loading: 'lazy',
    })

    await waitFor(() => expect(mockObserve).toHaveBeenCalled())
  })

  // TODO 懒加载测试 (Lazy load test)

  it('should support custom loading slot', async () => {
    const wrapper = factory(
      {
        src: VALID_IMAGE_URL,
      },
      {
        load: <div className="custom-loading">Custom Loading</div>,
      },
    )

    expect(wrapper.find('.custom-loading')).not.toBeNull()
  })

  it('should support custom error slot', async () => {
    const wrapper = factory(
      {
        src: EMPTY_IMAGE_URL,
      },
      {
        error: <div className="custom-error">Custom Error</div>,
      },
    )

    expect(wrapper.find('.custom-error')).not.toBeNull()
  })
})

// TODO: 测试图片加载错误无法测试非空 src (Image Error can not be triggered with invalid src eg: 'invalid.jpg')
// TODO 优化懒加载测试 (Optimize lazy load test)
