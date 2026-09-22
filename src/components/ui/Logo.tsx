import wordmark from '../../assets/zentry.png'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ size = 'md' }: LogoProps) {
  return (
    <span className={`logo logo-${size}`}>
      <img src={wordmark} alt="Zentry" />
    </span>
  )
}
