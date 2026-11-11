import React, { useRef } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'

interface DraggableListProps {
  class?: string
  children?: React.ReactNode
}

export default function DraggableList(props: DraggableListProps) {
  const ns = useNamespace('draggable')
  const dragListEl = useRef<HTMLDivElement | null>(null)
  const draggingEl = useRef<HTMLElement | null>(null)

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    draggingEl.current = e.target as HTMLElement
    setTimeout(() => {
      if (!draggingEl.current)
        return
      draggingEl.current.classList.add('dragging')
    }, 0)
  }

  function cleanUpTransition(element: HTMLElement) {
    element.addEventListener('transitionend', () => {
      element.style.transition = ''
      element.style.transform = ''
    }, { once: true })
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    ;(e.target as HTMLElement).classList.remove('dragging')
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const targetEl = e.target as HTMLElement

    if (!dragListEl.current || !draggingEl.current || targetEl === dragListEl.current || draggingEl.current === targetEl)
      return

    const children = Array.from(dragListEl.current.children)
    const sourceIndex = children.indexOf(draggingEl.current)
    const targetIndex = children.indexOf(targetEl)
    if (targetIndex === -1)
      return

    const firstTargetEl = targetEl.getBoundingClientRect()

    if (sourceIndex > targetIndex)
      dragListEl.current.insertBefore(draggingEl.current, targetEl)
    else
      dragListEl.current.insertBefore(draggingEl.current, targetEl.nextSibling)

    const lastTargetEl = targetEl.getBoundingClientRect()
    targetEl.style.transform = `translateY(${firstTargetEl.top - lastTargetEl.top}px)`
    requestAnimationFrame(() => {
      targetEl.style.transition = 'transform 300ms'
      cleanUpTransition(targetEl)
      targetEl.style.transform = ''
    })
  }

  return (
    <div
      ref={dragListEl}
      className={clsx(ns.b('list'), props.class)}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={e => e.preventDefault()}
    >
      {props.children}
    </div>
  )
}
