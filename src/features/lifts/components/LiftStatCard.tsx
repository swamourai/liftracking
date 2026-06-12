interface Props {
  label: string

  value: string | number

  valueClassName?: string
}

export function LiftStatCard({
  label,
  value,
  valueClassName,
}: Props) {
  return (
    <div
      className="rounded-3xl bg-(--color-surface-muted) p-4"
    >
      <p className="text-xs text-(--color-text-muted)">
        {label}
      </p>

      <p
        className={`
          mt-2
          text-xl font-bold
          text-(--color-text)

          ${valueClassName ?? ''}
        `}
      >
        {value}
      </p>
    </div>
  )
}