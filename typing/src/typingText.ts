import type { HTMLAttributes } from 'react'

export interface TypingTextProps {
  text: string
  duration?: number
  class?: HTMLAttributes<HTMLSpanElement>['class']
}

export { default } from './typingText.tsx'
