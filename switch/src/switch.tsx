import { useEffect, useRef, useState } from 'react'
import { CHANGE_EVENT, CLICK_EVENT, MODEL_VALUE_UPDATE } from '@onionl-ui/components/constant'
import { useNamespace } from '@onionl-ui/utils'

export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
  size?: string
  checked?: boolean
  beforeSwitch?: () => Promise<boolean> | boolean
  [event: string]: unknown
}

export default function Switch(props: SwitchProps) {
  const {
    modelValue = false,
    disabled = false,
    size = 'default',
    checked = false,
    beforeSwitch = () => Promise.resolve(true),
  } = props

  const ns = useNamespace('switch')
  const [isChecked, setIsChecked] = useState(checked)
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    setIsChecked(modelValue)
  }, [modelValue])

  const switchCls = [
    isChecked ? ns.e('checked') : '',
    disabled ? ns.disabled() : '',
    ns.namespace,
    ns.m(size),
  ].filter(Boolean).join(' ')

  function handleSwitch() {
    if (disabled)
      return

    const nextValue = !isChecked
    setIsChecked(nextValue)
    ;(props[MODEL_VALUE_UPDATE] as ((value: boolean) => void) | undefined)?.(nextValue)
    ;(props[CHANGE_EVENT] as ((value: boolean) => void) | undefined)?.(nextValue)
    ;(props[CLICK_EVENT] as ((value: boolean) => void) | undefined)?.(nextValue)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()
    if (event.key === 'Enter' || event.key === ' ')
      handleSwitch()
  }

  async function handleClick() {
    if (!beforeSwitch) {
      handleSwitch()
    }
    else {
      await beforeSwitch()
      handleSwitch()
    }
  }

  return (
    <div
      className={switchCls}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={[
          ns.e('core'),
          ns.em('core', size),
          isChecked ? ns.em('core', `${size}-checked`) : '',
        ].filter(Boolean).join(' ')}
      />
    </div>
  )
}
