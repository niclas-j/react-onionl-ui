export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface ImageProps {
  src?: string
  alt?: string
  fit?: ImageFit
  preview?: boolean
  class?: string
  loading?: 'eager' | 'lazy'
  width?: string
  height?: string
}

export { default } from './image.tsx'
