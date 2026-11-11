export interface IconProps {
  icon?: string
}

function Icon({ icon }: IconProps) {
  return <span className={icon} />
}

export default Icon
