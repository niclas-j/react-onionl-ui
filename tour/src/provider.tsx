import type { DriveStep } from 'driver.js'
import type { DriverObj, TourSteps } from './tour'
import { TOUR_STEP_EVENT } from '@onionl-ui/components/constant'
import { driver } from 'driver.js'
import { createContext, useCallback, useEffect, useState } from 'react'
import 'driver.js/dist/driver.css'


type RegisterTourStep = (
  index: number | string,
  element: string,
  title: string,
  description: string,
) => void

export const TourStepContext = createContext<RegisterTourStep | null>(null)

void TOUR_STEP_EVENT

export interface TourProviderProps {
  active?: boolean
  onUpdateActive?: (active: boolean) => void
  children?: React.ReactNode
}

export default function TourProvider({
  active = false,
  onUpdateActive,
  children,
}: TourProviderProps) {
  const [tourSteps, setTourSteps] = useState<TourSteps[]>([])
  const [driverObj, setDriverObj] = useState<DriverObj>(null)

  const registerTourStep = useCallback<RegisterTourStep>(
    (index, element, title, description) => {
      ;(onUpdateActive as unknown as (...args: unknown[]) => void)?.(
        index,
        element,
        title,
        description,
      )
      setTourSteps((steps) => {
        const nextSteps = [...steps, { index, element, title, description }]
        nextSteps.sort((a, b) => Number(a.index) - Number(b.index))
        return nextSteps
      })
    },
    [onUpdateActive],
  )

  useEffect(() => {
    setDriverObj(null)
    if (tourSteps.length === 0)
      return

    const steps: DriveStep[] = tourSteps.map(step => ({
      element: `.${step.element}`,
      popover: {
        title: step.title,
        description: step.description,
      },
    }))

    const onTourFinish = () => onUpdateActive?.(false)
    const nextDriver = driver({
      showProgress: true,
      steps,
      onDestroyed: onTourFinish,
      onDestroyStarted: onTourFinish,
    })
    setDriverObj(nextDriver)
  }, [tourSteps, onUpdateActive])

  useEffect(() => {
    if (active)
      driverObj?.drive()
  }, [active, driverObj])

  return (
    <TourStepContext.Provider value={registerTourStep}>
      <div>{children}</div>
    </TourStepContext.Provider>
  )
}
