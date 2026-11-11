import { useInstall } from '@onionl-ui/utils'
import Scrollbar from './src/scrollbar'
import ScrollSnap from './src/snap'

export const OlScrollbar = useInstall(Scrollbar)
export const OlScrollSnap = useInstall(ScrollSnap)

export default { OlScrollbar, OlScrollSnap }
