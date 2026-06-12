interface Props {
  children: React.ReactNode

  color?:
  | 'purple'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'black'
  | 'gray'

  size?: 'sm' | 'md'
}

const colorClasses = {
  purple:
    'bg-(--color-surface-tint) text-(--color-primary)',

  blue:
    'bg-(--color-info-soft) text-(--color-info)',

  green:
    'bg-(--color-success-soft) text-(--color-success)',

  orange:
    'bg-(--color-warning-soft) text-(--color-warning)',

  red:
    'bg-(--color-danger-soft) text-(--color-danger)',

  black:
    'bg-(--color-text) text-white',

  gray:
    'bg-(--color-surface-muted) text-(--color-text-muted)',
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',

  md: 'px-3 py-1 text-sm',
}

export function LiftBadge({
  children,
  color = 'purple',
  size = 'md',
}: Props) {
  return (
    <span
      className={`
        rounded-full

        font-semibold

        ${colorClasses[color]}

        ${sizeClasses[size]}
      `}
    >
      {children}
    </span>
  )
}