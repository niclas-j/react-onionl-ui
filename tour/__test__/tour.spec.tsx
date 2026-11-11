import { TOUR_STEP_EVENT } from '@onionl-ui/components/constant'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { driver } from 'driver.js'
import TourProvider from '../src/provider'
import TourStep from '../src/step'

const driveMock = vi.fn()
vi.mock('driver.js', () => ({
  driver: vi.fn(() => ({
    drive: driveMock,
  })),
}))

afterEach(() => {
  cleanup()
})

describe('tour Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('provider should correctly render child elements', () => {
    const { container } = render(
      <TourProvider>
        <div className="test-content">Test Content</div>
      </TourProvider>,
    )

    const content = container.querySelector('.test-content')
    expect(content).not.toBeNull()
    expect(content?.textContent).toBe('Test Content')
  })

  it('step component should be registered to Provider', () => {
    const { container } = render(
      <TourProvider>
        <TourStep
          className="bg-red"
          index={1}
          title="First Step"
          description="This is the first step description"
        >
          <div>First Step Content</div>
        </TourStep>
      </TourProvider>,
    )

    const stepElement = container.querySelector('.ol-tour-step--1')
    expect(stepElement).not.toBeNull()
    expect(stepElement).toHaveClass('bg-red')
  })

  it('should start the tour when active becomes true', () => {
    const { rerender } = render(
      <TourProvider active={false}>
        <TourStep
          className="bg-red"
          index={1}
          title="First Step"
          description="This is the first step description"
        />
      </TourProvider>,
    )

    rerender(
      <TourProvider active>
        <TourStep
          className="bg-red"
          index={1}
          title="First Step"
          description="This is the first step description"
        />
      </TourProvider>,
    )

    expect(driveMock).toHaveBeenCalled()
  })

  it('multiple Steps should be sorted by index', () => {
    render(
      <TourProvider active>
        <TourStep
          className="bg-blue"
          index={2}
          title="Second Step"
          description="This is the second step description"
        />
        <TourStep
          className="bg-red"
          index={1}
          title="First Step"
          description="This is the first step description"
        />
        <TourStep
          className="bg-green"
          index={3}
          title="Third Step"
          description="This is the third step description"
        />
      </TourProvider>,
    )

    const driverOptions = vi.mocked(driver).mock.calls[0]?.[0]
    const stepTitles = driverOptions?.steps?.map((step) => step.popover?.title)

    expect(stepTitles?.length).toBe(3)
    expect(stepTitles?.[0]).toBe('First Step')
    expect(stepTitles?.[1]).toBe('Second Step')
    expect(stepTitles?.[2]).toBe('Third Step')
  })

  it('should emit an event when active becomes false', () => {
    const onUpdateActive = vi.fn()

    render(
      <TourProvider active onUpdateActive={onUpdateActive}>
        <TourStep
          className="bg-red"
          index={1}
          title="First Step"
          description="This is the first step description"
        />
      </TourProvider>,
    )

    const driverOptions = vi.mocked(driver).mock.calls[0]?.[0]
    driverOptions?.onDestroyStarted?.()

    expect(onUpdateActive).toHaveBeenCalledWith(false)
  })

  it('should render slot content', () => {
    const { container } = render(
      <TourStep index={1}>
        <div>test</div>
      </TourStep>,
    )

    expect(container.innerHTML).toContain('<div>test</div>')
  })

  it('should apply class attribute', () => {
    const { container } = render(
      <TourStep index={1} className="custom-class" />,
    )

    expect(container.firstElementChild).toHaveClass('custom-class')
  })

  it('should display warning', () => {
    const warn = vi.spyOn(console, 'warn')
    render(<TourStep index={1} />)

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('OlTourProvider'))
  })

  it('should correctly register step', () => {
    const registerMock = vi.fn()

    render(
      <TourProvider onUpdateActive={registerMock}>
        <TourStep index={1} title="test" description="desc" />
      </TourProvider>,
    )

    expect(registerMock).toHaveBeenCalledWith(1, expect.any(String), 'test', 'desc')
  })
})
