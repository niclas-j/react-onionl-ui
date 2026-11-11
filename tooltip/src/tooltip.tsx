import { OlPopover } from '@onionl-ui/components'
import { useNamespace } from '@onionl-ui/utils'
import type { TooltipProps } from './tooltip'

export default function Tooltip({
  content = '',
  contentClass = '',
  placement = 'top',
  trigger = 'hover',
  arrow = true,
  offset = 5,
  show = false,
  children,
}: TooltipProps) {
  const ns = useNamespace('tooltip')

  return (
    <div className={ns.namespace}>
      <OlPopover
        trigger={trigger}
        offset={offset}
        arrow={arrow}
        contentClass={contentClass}
        placement={placement}
        show={show}
        triggerContent={children}
      >
        <div className={ns.e('content')} onClick={event => event.stopPropagation()}>
          <span>{content}</span>
        </div>
      </OlPopover>
    </div>
  )
}
