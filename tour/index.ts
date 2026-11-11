import { useInstall } from '@onionl-ui/utils'
import TourProvider from './src/provider'
import TourStep from './src/step'

export const OlTourProvider = useInstall(TourProvider)
export const OlTourStep = useInstall(TourStep)

export * from './src/tour'
export default OlTourProvider
