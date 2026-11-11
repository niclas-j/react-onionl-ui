import type { ReactNode, CSSProperties } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'
import type { MarqueeProps } from './marquee'
import './marquee.css'

export interface MarqueeComponentProps extends MarqueeProps {
  children?: ReactNode
}

export default function Marquee({
  class: className,
  duration = 20,
  reverse = false,
  gap = '8px',
  vertical = false,
  children,
}: MarqueeComponentProps) {
  const ns = useNamespace('marquee')
  const innerAnimationClass = vertical
    ? reverse ? ns.em('animate', 'vertical-reverse') : ns.em('animate', 'vertical')
    : reverse ? ns.em('animate', 'reverse') : ns.e('animate')
  const innerClass = clsx(innerAnimationClass, ns.e('inner'), {
    [ns.em('inner', 'vertical')]: vertical,
  })
  const style = {
    '--onl-marquee-duration': `${duration}s`,
    '--onl-marquee-gap': gap,
  } as CSSProperties

  return (
    <div className={clsx('group', ns.namespace, className, { [ns.e('vertical')]: vertical })} style={style}>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index + 1} className={innerClass}>{children}</div>
      ))}
    </div>
  )
}
