import type { SetType } from '@/features/lifts/constants/setTypes'

export function getSetTypeColor(
  type?: SetType,
) {
  switch (type) {
    case 'Top Single':
      return 'purple'

    case 'Back Off':
      return 'blue'

    case 'Volume':
      return 'orange'

    case 'Technique':
      return 'green'

    default:
      return 'gray'
  }
}