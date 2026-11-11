import type { HTMLAttributes, ReactNode } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const CardContent = ({ class: className, children }: CardContentProps) => {
  const ns = useNamespace('card')

  return <div className={clsx(ns.b('content'), className)}>{children}</div>
}

export default CardContent
