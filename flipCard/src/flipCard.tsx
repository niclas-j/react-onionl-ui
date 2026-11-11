import type { ReactNode } from 'react'
import { OlFlipControl } from '@onionl-ui/components'

export interface OlFlipCardProps {
  flipped: boolean
  class?: string
  front?: ReactNode
  back?: ReactNode
}

function OlFlipCard({ flipped, class: className, front, back }: OlFlipCardProps) {
  return (
    <OlFlipControl
      flipped={flipped}
      class={className}
      front={front}
      back={back}
    />
  )
}

OlFlipCard.displayName = 'OlFlipCard'

export default OlFlipCard
