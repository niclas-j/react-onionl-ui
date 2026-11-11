import type { RegisterStep } from './tour'
import { useNamespace } from '@onionl-ui/utils'
import { useContext, useEffect, useRef } from 'react'
import { TourStepContext } from './provider'

export interface TourStepProps {
  index: string | number
  title?: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export default function TourStep({
  index,
  title = '',
  description = '',
  className,
  children,
}: TourStepProps) {
  const ns = useNamespace('tour')
  const stepRef = useRef<HTMLDivElement>(null)
  const uniqueClass = ns.bm('step', `${index}`)
  const registerTourStep = useContext(TourStepContext) as RegisterStep

  useEffect(() => {
    if (registerTourStep && stepRef.current) {
      stepRef.current.classList.add(uniqueClass)
      registerTourStep(
        Number(index),
        uniqueClass,
        title,
        description,
      )
    }
    else {
      console.warn('`OlTourStep` must be used nested within the `OlTourProvider` component')
    }
  }, [registerTourStep, uniqueClass, index, title, description])

  return (
    <div ref={stepRef} className={['inline-block', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
