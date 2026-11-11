import type { ReactNode } from 'react'
import type { TriggerType } from '@onionl-ui/components/type'

export type Placement =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'

export interface PopoverProps {
  show?: boolean
  placement?: Placement
  offset?: number
  arrow?: boolean
  duration?: number
  contentClass?: string
  trigger?: TriggerType
  children?: ReactNode
  triggerContent?: ReactNode
}
