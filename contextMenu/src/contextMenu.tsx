import { CONTEXTMENU_EVENT } from '@onionl-ui/components/constant'
import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'

export const ContextMenuContext = createContext<string | undefined>(undefined)

export interface ContextMenuProps {
  target?: HTMLElement | Document
  beforeClose?: () => void
  children?: React.ReactNode
}

export default function OlContextMenu({
  target,
  beforeClose,
  children,
}: ContextMenuProps) {
  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const menuEl = useRef<HTMLDivElement | null>(null)
  const targetElement = useRef<HTMLElement | Document | null>(null)
  const providedContext = useContext(ContextMenuContext)

  // Keep the shared symbol as the provider key used by this component.
  void CONTEXTMENU_EVENT
  void providedContext

  const handleClose = useCallback(() => {
    beforeClose?.()
    setShowMenu(false)
    menuEl.current = null
  }, [beforeClose])

  useEffect(() => {
    const element = target || document
    targetElement.current = element

    const handleShowMenu = (event: Event) => {
      handleClose()
      event.preventDefault()
      const mouseEvent = event as MouseEvent
      setShowMenu(true)
      setClientX(mouseEvent.clientX)
      setClientY(mouseEvent.clientY)
    }

    const handleClickOutsideContextMenu = (event: MouseEvent) => {
      if (!element.contains(event.target as Node))
        handleClose()
    }

    element.addEventListener('click', handleClose)
    element.addEventListener('contextmenu', handleShowMenu)
    document.addEventListener('contextmenu', handleClickOutsideContextMenu)
    document.addEventListener('scroll', handleClose)

    const handleOutsideClick = (event: MouseEvent) => {
      if (!element.contains(event.target as Node))
        handleClose()
    }
    document.addEventListener('click', handleOutsideClick)

    return () => {
      element.removeEventListener('click', handleClose)
      element.removeEventListener('contextmenu', handleShowMenu)
      document.removeEventListener('contextmenu', handleClickOutsideContextMenu)
      document.removeEventListener('scroll', handleClose)
      document.removeEventListener('click', handleOutsideClick)
      targetElement.current = null
    }
  }, [target, handleClose])

  useLayoutEffect(() => {
    if (!showMenu || !menuEl.current)
      return

    const { width, height } = menuEl.current.getBoundingClientRect()
    if (clientX + width > window.innerWidth)
      setClientX(value => value - width)
    if (clientY + height > window.innerHeight)
      setClientY(value => value - height)
  }, [showMenu, clientX, clientY])

  return showMenu
    ? (
        <ContextMenuContext.Provider value="this">
          <div
            ref={menuEl}
            onClick={event => event.stopPropagation()}
            style={{ left: `${clientX}px`, top: `${clientY}px` }}
            className="ol-context-menu"
          >
            <ul className="ol-context-menu__wrapper">{children}</ul>
          </div>
        </ContextMenuContext.Provider>
      )
    : null
}
