import { useEffect, useRef, useState } from 'react'
import type { InputProps } from './input'
import { MODEL_VALUE_UPDATE } from '@onionl-ui/components/constant'
import { OlIcon } from '@onionl-ui/components/icon'
import { useNamespace } from '@onionl-ui/utils'
import clsx from 'clsx'
import IMask from 'imask'

type InputComponentProps = InputProps & {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onUpdateModelValue?: (value: string) => void
  [key: string]: any
}

function Input({
  modelValue,
  error: _error,
  prefix,
  suffix,
  className,
  placeholder,
  mask,
  disabled,
  onFocus,
  onBlur,
  onUpdateModelValue,
  ...attrs
}: InputComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(modelValue ?? '')
  const ns = useNamespace('input')

  useEffect(() => {}, [mask])

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (disabled) {
      event.currentTarget.blur()
      return
    }
    onFocus?.(event)
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value
    if (mask) {
      const digits = event.currentTarget.value.replace(/\D/g, '')
      let digitIndex = 0
      value = mask.replace(/0+/g, (placeholder) => {
        const count = placeholder.length
        const part = digits.slice(digitIndex, digitIndex + count)
        digitIndex += count
        return part
      })
      event.currentTarget.value = value
      setInputValue(value)
    }
    onUpdateModelValue?.(value)
  }

  return (
    <div className={ns.e('wrap')}>
      {prefix ? (
        <span
          icon={prefix}
          className={clsx(prefix, ns.e('icon'), ns.e('icon-prefix'))}
        />
      ) : suffix ? (
        <span
          icon={suffix}
          className={clsx(suffix, ns.e('icon'), ns.e('icon-suffix'))}
        />
      ) : null}
      <input
        ref={inputRef}
        value={mask ? inputValue : (modelValue ?? '')}
        placeholder={placeholder}
        {...Object.fromEntries(
          Object.entries(attrs).filter(([key]) => key !== 'style' && key !== 'mask'),
        )}
        className={clsx(
          prefix && 'pl-10',
          suffix && 'pr-10',
          disabled && 'is-disabled',
          ns.namespace,
          className,
        )}
        onFocus={handleFocus}
        onBlur={onBlur}
        onChange={handleInput}
      />
    </div>
  )
}

export default Input
