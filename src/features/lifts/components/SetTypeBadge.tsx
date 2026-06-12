import { LiftBadge } from './LiftBadge'

import { getSetTypeColor } from '@/features/lifts/utils/getSetTypeColor'

import {
  setTypeLabels,
  type SetType,
} from '@/features/lifts/constants/setTypes'

interface Props {
  type?: SetType
}

export function SetTypeBadge({
  type,
}: Props) {
  if (!type) {
    return null
  }

  return (
    <LiftBadge
      color={getSetTypeColor(type)}
    >
      {setTypeLabels[type]}
    </LiftBadge>
  )
}
