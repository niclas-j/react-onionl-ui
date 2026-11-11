import type { HTMLAttributes, ReactNode } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const Card = ({ class: className, children }: CardProps) => {
  const { namespace } = useNamespace('card')

  return <div className={clsx(namespace, className)}>{children}</div>
}

export default Card
