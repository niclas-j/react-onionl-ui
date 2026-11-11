import { useInstall } from '@onionl-ui/utils'
import DraggableItem from './src/draggableItem'
import DraggableList from './src/draggableList'

export const OlDraggableList = useInstall(DraggableList)
export const OlDraggableItem = useInstall(DraggableItem)

export default { OlDraggableList, OlDraggableItem }
