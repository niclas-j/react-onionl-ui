import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface ProgressProps {
  value?: number
  reverse?: boolean
  class?: string
  label?: boolean
  children?: ReactNode
}

export default function Progress({
  value = 0,
  reverse = false,
  class: className,
  label = false,
  children,
}: ProgressProps) {
  const translateX = reverse ? 100 - value : -(100 - value)

  return (
    <div className="ol-progress">
      <div className={clsx('ol-progress__inner', className)}>
        <div
          style={{ transform: `translateX(${translateX}%)` }}
          className="ol-progress-bar"
        />
      </div>
      <span
        style={label ? undefined : { display: 'none' }}
        className="ol-progress-label"
      >
        {children ?? `${value}%`}
      </span>
    </div>
  )
}
