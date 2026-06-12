import { Check, Clock } from 'lucide-react'

import { cn } from '@/lib/cn'

interface Props {
  done: boolean

  onToggle: () => void

  className?: string

  doneLabel?: string

  pendingLabel?: string

  size?: 'md' | 'lg'
}

export function WorkoutStatusToggle({
  done,
  onToggle,
  className,
  doneLabel = 'Séance terminée',
  pendingLabel = 'En attente',
  size = 'lg',
}: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        `
          flex w-full
          items-center
          justify-between

          rounded-3xl

          px-5

          transition-colors
        `,
        size === 'lg'
          ? 'control-icon-lg'
          : 'h-12',
        done
          ? 'bg-(--color-success-soft)'
          : 'bg-(--color-warning-soft)',
        className,
      )}
    >
      <span
        className={cn(
          'font-semibold',
          done
            ? 'text-(--color-success)'
            : 'text-(--color-warning)',
        )}
      >
        {done
          ? doneLabel
          : pendingLabel}
      </span>

      <div
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full',
          done
            ? 'bg-(--color-success)'
            : 'bg-(--color-warning)',
        )}
      >
        {!done
          ? <Clock size={16}
            className="text-white"
          />
          : <Check
            size={16}
            className="text-white"
          />}
      </div>
    </button>
  )
}
