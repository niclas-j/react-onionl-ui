import { useEffect, useRef, useState } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'
import type { Placement, PopoverProps } from './popover'

export default function Popover({
  show,
  placement: initialPlacement = 'bottom',
  trigger = 'hover',
  offset = 5,
  arrow = true,
  duration = 300,
  contentClass = '',
  children,
  triggerContent,
}: PopoverProps) {
  const ns = useNamespace('popover')
  const popover = useRef<HTMLDivElement>(null)
  const reference = useRef<HTMLDivElement>(null)
  const floating = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(show)
  const [position, setPosition] = useState<React.CSSProperties>({})
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({})
  const [placement, setPlacement] = useState<Placement>(initialPlacement)

  useEffect(() => {
    if (show !== undefined)
      setShowContent(show)
  }, [show])

  useEffect(() => {
    const outside = (event: MouseEvent) => {
      if (trigger === 'click' && !popover.current?.contains(event.target as Node))
        setShowContent(false)
    }
    document.addEventListener('click', outside)
    return () => document.removeEventListener('click', outside)
  }, [trigger])

  useEffect(() => {
    if (!(show || showContent) || !reference.current || !floating.current)
      return
    const refRect = reference.current.getBoundingClientRect()
    const floatRect = floating.current.getBoundingClientRect()
    const parts = initialPlacement.split('-')
    let side = parts[0]
    const aligns = parts[1]
    if (side === 'bottom' && refRect.bottom + floatRect.height + offset > innerHeight)
      side = 'top'
    else if (side === 'top' && refRect.top - floatRect.height - offset < 0)
      side = 'bottom'
    else if (side === 'right' && refRect.right + floatRect.width + offset > innerWidth)
      side = 'left'
    else if (side === 'left' && refRect.left - floatRect.width - offset < 0)
      side = 'right'

    const resolved = `${side}${aligns ? `-${aligns}` : ''}` as Placement
    setPlacement(resolved)
    let left = refRect.left + (refRect.width - floatRect.width) / 2
    let top = refRect.bottom + offset
    if (side === 'top') top = refRect.top - floatRect.height - offset
    if (side === 'left') { left = refRect.left - floatRect.width - offset; top = refRect.top + (refRect.height - floatRect.height) / 2 }
    if (side === 'right') { left = refRect.right + offset; top = refRect.top + (refRect.height - floatRect.height) / 2 }
    if (side === 'bottom' || side === 'top') {
      if (aligns === 'start') left = refRect.left
      if (aligns === 'end') left = refRect.right - floatRect.width
    }
    left = Math.max(0, Math.min(left, innerWidth - floatRect.width))
    top = Math.max(0, Math.min(top, innerHeight - floatRect.height))
    setPosition({ position: 'fixed', left, top })
    const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side]!
    setArrowStyle({ left: floatRect.width / 2, top: floatRect.height / 2, [staticSide]: '-0.25em' })
  }, [show, showContent, initialPlacement, offset, arrow])

  const click = () => trigger === 'click' && setShowContent(value => !value)
  const enter = () => trigger === 'hover' && setShowContent(true)
  const leave = () => trigger === 'hover' && setShowContent(false)
  const arrowPlacement = placement.split('-')[0]

  return (
    <div ref={popover} className={ns.namespace}>
      <div ref={reference} onClick={click} onMouseEnter={enter} onMouseLeave={leave}>
        {triggerContent}
      </div>
      {(show || showContent) && (
        <div
          ref={floating}
          style={{ ...position, transition: `opacity ${duration}ms ease` }}
          className={clsx(ns.e('content'), contentClass)}
          onClick={event => event.stopPropagation()}
        >
          {children}
          {arrow && (
            <div
              ref={arrowRef}
              style={arrowStyle}
              className={clsx(ns.em('content', 'arrow'), ns.em('arrow', arrowPlacement))}
            />
          )}
        </div>
      )}
    </div>
  )
}
