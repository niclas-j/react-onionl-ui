import { useEffect, useRef } from 'react'
import { useNamespace } from '@onionl-ui/utils'
import { AvatarGroupOverlapContext } from './avatar.tsx'

export interface AvatarGroupProps {
  overlap?: string
  children?: React.ReactNode
}

function AvatarGroup({ overlap = '10', children }: AvatarGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null)
  const ns = useNamespace('avatar')

  useEffect(() => {
    const firstChild = groupRef.current?.children[0] as HTMLElement | undefined
    if (firstChild)
      firstChild.style.marginLeft = '0'
  }, [])

  return (
    <AvatarGroupOverlapContext.Provider value={overlap}>
      <div ref={groupRef} className={ns.b('group')}>
        {children}
      </div>
    </AvatarGroupOverlapContext.Provider>
  )
}

AvatarGroup.displayName = 'OlAvatarGroup'

export default AvatarGroup
