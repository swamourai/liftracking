import { LiftStatCard } from './LiftStatCard'

interface Props {
  weight: number

  series: number

  reps: number
}

export function LiftStatsGrid({
  weight,
  series,
  reps,
}: Props) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <LiftStatCard
        label="Poids"
        value={`${weight}kg`}
      />

      <LiftStatCard
        label="Séries"
        value={series}
      />

      <LiftStatCard
        label="Répétitions"
        value={reps}
      />
    </div>
  )
}
