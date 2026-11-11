import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { DialogProps } from './dialog'
import { useNamespace } from '@onionl-ui/utils'
import './dialog.css'

export interface DialogComponentProps extends DialogProps {
  children?: ReactNode
  onUpdateShow?: (show: boolean) => void
  onClose?: (reason: string) => void
  onOpen?: () => void
}

function Dialog({
  show = false,
  mask = true,
  maskClickClose = true,
  children,
  onUpdateShow,
  onClose,
  onOpen,
}: DialogComponentProps) {
  const ns = useNamespace('dialog')
  const [modalStyle, setModalStyle] = useState<CSSProperties>()
  const [isShow, setIsShow] = useState(show)
  const [willClose, setWillClose] = useState(false)
  const targetRect = useRef<DOMRect>()

  function close(reason: string) {
    onClose?.(reason)
    onUpdateShow?.(false)
    setWillClose(false)
    setIsShow(false)
  }

  function maskClick() {
    if (!maskClickClose)
      return
    setWillClose(true)
    onClose?.('maskClick')
    onUpdateShow?.(false)
  }

  function closeByCustom() {
    setWillClose(true)
    close('closeByCustom')
  }

  function open() {
    setIsShow(true)
    onOpen?.()
  }

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (isShow || !show)
        return
      const clickTarget = event.target as Element
      targetRect.current = clickTarget.getBoundingClientRect()
      if (show) {
        const rect = targetRect.current
        setModalStyle({
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          transform: 'translate(0, 0) scale(0.2)',
          opacity: 0,
        })
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setModalStyle({
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 1,
            })
          })
        })
      }
    }

    window.removeEventListener('click', handleGlobalClick)
    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [isShow, show])

  const previousShow = useRef(show)
  useEffect(() => {
    if (previousShow.current === show)
      return
    previousShow.current = show
    requestAnimationFrame(() => {
      if (!show)
        closeByCustom()
      else
        open()
    })
  }, [show])

  return (
    <div className={ns.namespace} style={{ display: isShow ? undefined : 'none' }}>
      {mask && (
        <div
          className={`${willClose ? `${ns.m('fade-out')} ` : ''}${ns.e('mask')}`}
          onClick={maskClick}
        />
      )}
      <div className={`${ns.e('container')} ${ns.em('container', 'transition')}`} style={modalStyle}>
        {children}
      </div>
    </div>
  )
}

export default Dialog
