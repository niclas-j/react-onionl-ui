import React from 'react'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'

interface DraggableItemProps {
  class?: string
  children?: React.ReactNode
}

export default function DraggableItem(props: DraggableItemProps) {
  const ns = useNamespace('draggable')

  return (
    <div draggable="true" className={clsx(ns.b('item'), props.class)}>
      {props.children}
    </div>
  )
}