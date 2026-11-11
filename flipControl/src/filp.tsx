import { Children, type ReactNode } from 'react'
import clsx, { type ClassValue } from 'clsx'

export interface OlFlipControlProps {
  flipped?: boolean
  class?: ClassValue
  front?: ReactNode
  back?: ReactNode
  children?: ReactNode
}

function OlFlipControl({
  flipped = false,
  class: className,
  front,
  back,
  children,
}: OlFlipControlProps) {
  const childSlots = Children.toArray(children)

  return (
    <div className={clsx('ol-flip-control', className)}>
      <div className={clsx('ol-flip-control__inner', { 'is-flipped': flipped })}>
        <div className="ol-flip-control-front">
          {front ?? childSlots[0]}
        </div>
        <div className="ol-flip-control-back">
          {back ?? childSlots[1]}
        </div>
      </div>
    </div>
  )
}

OlFlipControl.displayName = 'OlFlipControl'

export default OlFlipControl
