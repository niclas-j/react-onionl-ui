import type { ReactNode } from 'react'

export interface ScrollSnapProps {
  align?: 'start' | 'end' | 'center' | 'none'
  children?: ReactNode
}

export default function ScrollSnap({ align = 'none', children }: ScrollSnapProps) {
  return <div className={`ol-scroll-snap__align-${align}`}>{children}</div>
}
