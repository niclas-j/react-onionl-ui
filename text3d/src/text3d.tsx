import type { CSSProperties } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import type { Text3DProps } from './text3d'

export default function Text3D({
  text,
  color,
  shadowColor,
  layer = 5,
  letterSpacing,
  direction,
  blur,
}: Text3DProps) {
  const ns = useNamespace('text')
  const shadows: string[] = []

  for (let i = 1; i <= Math.abs(layer); i++) {
    const blurValue = blur ? `${i}px` : ''
    const offsetX = direction?.includes('left') ? `${-i}px` : `${i}px`
    const offsetY = direction?.includes('top') ? `${-i}px` : `${i}px`
    shadows.push(`${offsetX} ${offsetY} ${blurValue} var(--onl-text-shadow-color)`)
  }

  const style = {
    textShadow: shadows.join(','),
    '--onl-text-shadow-color': shadowColor || 'var(--onl-purple-900)',
    '--onl-text-color': color || 'var(--onl-primary)',
    color: 'var(--onl-text-color)',
    fontWeight: 'bold',
    letterSpacing: letterSpacing || 0,
  } as CSSProperties

  return <div className={ns.b('3d')} style={style}>{text}</div>
}
