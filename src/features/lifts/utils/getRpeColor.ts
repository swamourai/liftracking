export function getRpeColor(
  rpe?: number,
) {
  if (rpe === undefined) {
    return 'gray'
  }

  if (rpe >= 10) {
    return 'black'
  }

  if (rpe >= 8) {
    return 'red'
  }

  if (rpe >= 5) {
    return 'orange'
  }

  if (rpe < 5) {
    return 'green'
  }

  return 'green'
}