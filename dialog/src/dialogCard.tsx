import type { ReactNode } from 'react'
import { OlButton, OlCard, OlCardContent, OlCardFooter, OlCardHeader } from '@onionl-ui/components'

export interface DialogCardProps {
  header?: ReactNode
  content?: ReactNode
  footer?: ReactNode
  onClose?: () => void
}

function DialogCard({ header, content, footer, onClose }: DialogCardProps) {
  return (
    <div className="relative">
      <OlButton
        icon="i-mi-close"
        link
        className="color-gray-500 hover:color-primary text-xl absolute top-2 right-2"
        onClick={onClose}
      />
      <OlCard className="bg-white dark:bg-[#1f1f1f]">
        <OlCardHeader>{header}</OlCardHeader>
        <OlCardContent>{content}</OlCardContent>
        <OlCardFooter>{footer}</OlCardFooter>
      </OlCard>
    </div>
  )
}

DialogCard.displayName = 'OlDialogCard'

export default DialogCard
