import { useInstall } from '@onionl-ui/utils'
import Avatar from './src/avatar.tsx'
import AvatarGroup from './src/group'

export const OlAvatar = useInstall(Avatar)
export const OlAvatarGroup = useInstall(AvatarGroup)

export default { OlAvatar, OlAvatarGroup }
export * from './src/avatar.tsx'
