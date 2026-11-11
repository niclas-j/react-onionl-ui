import type { HTMLAttributes, ReactNode } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const CardHeader = ({ class: className, children }: CardHeaderProps) => {
  const ns = useNamespace('card')

  return <div className={clsx(ns.b('header'), className)}>{children}</div>
}

export default CardHeader
