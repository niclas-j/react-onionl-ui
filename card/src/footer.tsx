import type { HTMLAttributes, ReactNode } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const CardFooter = ({ class: className, children }: CardFooterProps) => {
  const ns = useNamespace('card')

  return <div className={clsx(ns.b('footer'), className)}>{children}</div>
}

export default CardFooter
