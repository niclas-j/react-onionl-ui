import { AVATAR_GROUP_OVERLAP } from '@onionl-ui/components/constant'
import { OlIcon } from '@onionl-ui/components/icon'
import { useNamespace } from '@onionl-ui/utils'
import initials from 'initials'
import { createContext, useContext, useState, type CSSProperties, type MouseEvent } from 'react'
import type { AvatarProps } from './avatar'

export const AvatarGroupOverlapContext = createContext<string | undefined>(undefined)

export interface AvatarComponentProps extends AvatarProps {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
  onError?: () => void
}

function Avatar({
  src,
  alt,
  outlined = false,
  outlineColor = '#ccc',
  outlineWidth = 3,
  outlineStyle = 'solid',
  outlineGradient = 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
  initials: initialsText,
  icon,
  fallbackText,
  size = 'md',
  shape = 'circle',
  backgroundColor,
  borderRadius,
  clickable = false,
  ariaLabel,
  onClick,
  onError,
}: AvatarComponentProps) {
  const ns = useNamespace('avatar')
  const [hasError, setHasError] = useState(false)
  const overlap = useContext(AvatarGroupOverlapContext)
  const isUsingNumericSize = typeof Number(size) === 'number'
  const DEFAULT_ICON = 'i-mi-user'

  const outlineStyles: CSSProperties = outlined
    ? {
        border: outlineStyle === 'solid'
          ? `${outlineWidth}px solid ${outlineColor}`
          : `${outlineWidth}px solid transparent`,
        backgroundImage: outlineStyle === 'gradient'
          ? `linear-gradient(#fff, #fff), ${outlineGradient || 'linear-gradient(45deg, #3b82f6, #8b5cf6)'}`
          : undefined,
        backgroundOrigin: outlineStyle === 'gradient' ? 'border-box' : undefined,
        backgroundClip: outlineStyle === 'gradient' ? 'padding-box, border-box' : undefined,
      }
    : {}

  const styles: CSSProperties = {
    backgroundColor: backgroundColor ?? 'var(--onl-primary)',
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    cursor: clickable ? 'pointer' : 'default',
    marginLeft: overlap ? `-${overlap}px` : 0,
    ...outlineStyles,
  }

  const imgStyles: CSSProperties = {
    width: isUsingNumericSize ? `${size}px` : '100%',
    height: isUsingNumericSize ? `${size}px` : '100%',
  }

  const classes = [
    ns.namespace,
    ns.m(shape),
    isUsingNumericSize ? ns.m(size) : '',
    clickable ? ns.m('clickable') : '',
    outlined ? ns.m('outlined') : '',
    overlap ? ns.m('overlap') : '',
  ].filter(Boolean).join(' ')

  const fallbackContent = initialsText
    ? initials(initialsText)
    : fallbackText || null

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (clickable)
      onClick?.(event)
  }

  function handleError() {
    setHasError(true)
    onError?.()
  }

  return (
    <div
      className={classes}
      style={styles}
      aria-label={ariaLabel}
      role="img"
      onClick={handleClick}
    >
      {src && !hasError
        ? (
            <img
              className={`${ns.e('img')} w-full h-full object-cover`}
              src={src}
              alt={alt || ariaLabel}
              style={imgStyles}
              onError={handleError}
            />
          )
        : icon
          ? <OlIcon icon={icon} />
          : initialsText || fallbackText
            ? (
                <span className={`${ns.e('fallback')} text-light-50 font-500 leading-none`}>
                  {fallbackContent}
                </span>
              )
            : <OlIcon icon={DEFAULT_ICON} />}
    </div>
  )
}

export default Avatar
