import type { HTMLAttributes } from 'react'

export interface MarqueeProps {
  class?: HTMLAttributes<HTMLDivElement>['className']
  duration?: number
  reverse?: boolean
  gap?: string
  height?: string
  vertical?: boolean
}
