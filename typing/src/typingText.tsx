import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { useNamespace } from '@onionl-ui/utils'
import type { TypingTextProps } from './typingText'
import './typingText.css'

export default function TypingText({
  text,
  duration = 8,
  class: className,
}: TypingTextProps) {
  const ns = useNamespace('typing')
  const style = {
    '--typing-duration': `${duration}s`,
    '--typing-steps': text.length,
  } as CSSProperties

  return (
    <span
      className={clsx(ns.e('text'), className)}
      style={style}
      role="text"
      aria-label="Typewriter effect text"
    >
      {text}
    </span>
  )
}
