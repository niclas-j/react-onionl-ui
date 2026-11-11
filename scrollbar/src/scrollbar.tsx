import type { CSSProperties, ReactNode } from 'react'

export interface ScrollbarProps {
  height?: string
  snap?: 'both' | 'x' | 'y'
  children?: ReactNode
}

export default function Scrollbar({ height, snap, children }: ScrollbarProps) {
  return (
    <div
      className={`ol-scrollbar ol-scrollbar__snap-${snap}`}
      style={{ height } as CSSProperties}
    >
      {children}
    </div>
  )
}
