import { clone, isNumberString } from '@onionl-ui/utils'
import { useEffect, useRef } from 'react'
import type { HaloProps } from './halo'

export interface OlHaloProps extends Partial<HaloProps> {
  children?: React.ReactNode
}

export default function Halo({
  is = 'div',
  haloRadius = 6,
  duration = 5000,
  offsetX = 0,
  offsetY = 0,
  haloColor,
  children,
}: OlHaloProps) {
  const glowRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!glowRef.current || !haloColor)
      return

    const clonedHaloColor = clone(haloColor)
    const reversedHaloColor = Array.isArray(clonedHaloColor)
      ? clonedHaloColor.reverse()
      : clonedHaloColor

    const duplicatedColors = [haloColor, reversedHaloColor].flat()
    const formattedOffsetX = isNumberString(offsetX) ? `${offsetX}px` : offsetX
    const formattedOffsetY = isNumberString(offsetY) ? `${offsetY}px` : offsetY

    const keyframes: Keyframe[] = duplicatedColors.map((color, index) => {
      if (index === duplicatedColors.length - 1) {
        return {
          filter: `drop-shadow(${formattedOffsetX} ${formattedOffsetY} ${haloRadius}em ${color})`,
        }
      }

      return {
        filter: `drop-shadow(${formattedOffsetX} ${formattedOffsetY} ${index % 2 === 0 ? haloRadius : Number(haloRadius) + 1}em ${color})`,
      }
    })

    if (!keyframes.length)
      return

    glowRef.current.animate(keyframes, {
      duration,
      iterations: Infinity,
    })
  }, [])

  const Tag = is as React.ElementType

  return (
    <Tag ref={glowRef}>
      {children}
    </Tag>
  )
}
