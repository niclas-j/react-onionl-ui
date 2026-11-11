import { useEffect, useRef, useState } from 'react'
import type { SliderProps } from './slider'
import { useNamespace } from '@onionl-ui/utils'
import { MODEL_VALUE_UPDATE } from '../../constant'

type OlSliderProps = SliderProps & {
  'onUpdate:modelValue'?: (value: number) => void
}

export default function OlSlider({
  modelValue = 0,
  min = 0,
  max = 100,
  step = 1,
  vertical = false,
  disabled = false,
  'onUpdate:modelValue': onModelValueUpdate,
}: OlSliderProps) {
  const ns = useNamespace('slider')
  const [percentage, setPercentage] = useState(modelValue)
  const [isDragging, setIsDragging] = useState(false)
  const newPosition = useRef(0)
  const slider = useRef<HTMLDivElement | null>(null)

  const sliderCls = vertical ? ns.m('vertical') : ns.namespace
  const sliderStyle = vertical
    ? { height: `${percentage}%` }
    : { width: `${percentage}%` }

  useEffect(() => {
    if (!isDragging)
      return

    function handleMouseMove(event: MouseEvent) {
      if (!slider.current || disabled)
        return

      newPosition.current = vertical ? event.clientY : event.clientX
      const sliderRect = slider.current.getBoundingClientRect()
      const { width, height, left, bottom } = sliderRect
      const sliderWidth = newPosition.current - left
      const sliderHeight = newPosition.current - bottom

      const value = Math.max(
        min,
        Math.min(
          max,
          vertical
            ? -Math.round((sliderHeight / height) * 100 / step) * step
            : Math.round((sliderWidth / width) * 100 / step) * step,
        ),
      )
      setPercentage(value)
      onModelValueUpdate?.(value)
    }

    function handleMouseUp() {
      if (disabled)
        return
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, disabled, vertical, min, max, step, onModelValueUpdate])

  function handleMouseDown() {
    if (disabled)
      return
    setIsDragging(true)
  }

  // Keep the event name available to consumers using the Vue-compatible API.
  void MODEL_VALUE_UPDATE

  return (
    <div ref={slider} className={sliderCls}>
      <div
        style={sliderStyle}
        className={[
          vertical ? ns.em('progress', 'vertical') : ns.e('progress'),
          disabled ? ns.em('progress', 'disabled') : '',
        ].filter(Boolean).join(' ')}
      >
        <div
          className={[
            vertical ? ns.em('thumb', 'vertical') : ns.e('thumb'),
            isDragging ? ns.em('thumb', 'drag') : '',
            disabled ? ns.em('thumb', 'disabled') : '',
          ].filter(Boolean).join(' ')}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  )
}
