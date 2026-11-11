import { useInstall } from '@onionl-ui/utils'
import ContextMenu from './src/contextMenu'
import ContextMenuItem from './src/contextMenuItem'

export const OlContextMenu = useInstall(ContextMenu)
export const OlContextMenuItem = useInstall(ContextMenuItem)

export default { OlContextMenu, OlContextMenuItem }
