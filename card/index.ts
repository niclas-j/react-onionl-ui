import { useInstall } from '@onionl-ui/utils'
import Card from './src/card'
import CardContent from './src/content'
import CardFooter from './src/footer'
import CardHeader from './src/header'

export const OlCard = useInstall(Card)
export const OlCardHeader = useInstall(CardHeader)
export const OlCardContent = useInstall(CardContent)
export const OlCardFooter = useInstall(CardFooter)

export default { OlCard, OlCardHeader, OlCardContent, OlCardFooter }
