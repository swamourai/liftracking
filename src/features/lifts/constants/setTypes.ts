export const setTypes = [
  'Top Single',
  'Back Off',
  'Volume',
  'Technique',
] as const

export type SetType =
  (typeof setTypes)[number]

export const setTypeLabels: Record<SetType, string> = {
  'Top Single': 'Single lourd',
  'Back Off': 'Back-off',
  Volume: 'Volume',
  Technique: 'Technique',
}
