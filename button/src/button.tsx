import type { ButtonProps } from './button'
import { OlIcon } from '@onionl-ui/components/icon'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

export interface OlButtonProps extends ButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'size'> {
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

function Button({
  type = 'primary',
  size = 'sm',
  to,
  link,
  icon,
  disabled,
  children,
  onClick,
  className,
  ...attrs
}: OlButtonProps) {
  const ns = useNamespace('button')
  const defaultBtn = clsx(ns.namespace)

  const sizeCls = size ? ns.em('size', `${size}`) : ''
  const customStyles = to || link
    ? clsx(sizeCls, ns.em('type', 'link'))
    : clsx(defaultBtn, sizeCls, type ? ns.em('type', `${type}`) : '')

  function handleClick(event: MouseEvent<HTMLElement>) {
    if (disabled)
      return
    onClick?.(event)
  }

  const Component = to ? 'a' : 'button'

  return (
    <Component
      {...attrs}
      href={to}
      className={clsx(customStyles, className, { [ns.e('disabled')]: disabled })}
      onClick={handleClick}
    >
      {icon && <OlIcon icon={icon} />}
      <span>{children}</span>
    </Component>
  )
}

export default Button
