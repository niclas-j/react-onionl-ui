import React, { useContext } from 'react'
import { ContextMenuContext } from './contextMenu'

export interface ContextMenuItemProps {
  click?: () => void
  children?: React.ReactNode
}

export default function OlContextMenuItem({ click, children }: ContextMenuItemProps) {
  const contextMenu = useContext(ContextMenuContext)

  if (!contextMenu) {
    console.warn('ol-content-menu-item must be used as a sub component of ol-content-menu')
    return null
  }

  return (
    <li className="ol-context-menu-item" onClick={click}>
      {children}
    </li>
  )
}
