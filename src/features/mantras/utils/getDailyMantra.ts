import { mantras } from '../data/mantras'

export function getDailyMantra() {
  const now = new Date()

  const start = new Date(
    now.getFullYear(),
    0,
    0,
  )

  const diff =
    now.getTime() - start.getTime()

  const oneDay =
    1000 * 60 * 60 * 24

  const day = Math.floor(
    diff / oneDay,
  )

  return mantras[
    day % mantras.length
  ]
}