import {
  setTypeLabels,
  setTypes,
} from '@/features/lifts/constants/setTypes'

import type { SetType } from '@/features/lifts/constants/setTypes'

interface Props {
  value?: SetType

  onChange: (
    value?: SetType,
  ) => void
}

export function SetTypePicker({
  value,
  onChange,
}: Props) {
  return (
    <div
      className="grid grid-cols-2 gap-3"
    >
      {setTypes.map((type) => {
        const isSelected =
          value === type

        return (
          <button
            key={type}
            type="button"
            onClick={() =>
              onChange(
                isSelected
                  ? undefined
                  : type,
              )
            }
            className={`
              w-full

              h-12

              rounded-3xl

              border

              px-4

              text-sm
              font-semibold

              transition-all

              ${isSelected
                ? `
                    border-(--color-primary)
                    bg-(--color-primary)
                    text-white
                  `
                : `
                    border-(--color-border-soft)
                    bg-(--color-surface)
                    text-(--color-text-muted)
                  `
              }
            `}
          >
            {setTypeLabels[type]}
          </button>
        )
      })}
    </div>
  )
}
