export interface ProfileData {
  lastName: string

  firstName: string

  age: number | null

  weight: number | null
}

export const EMPTY_PROFILE: ProfileData = {
  lastName: '',
  firstName: '',
  age: null,
  weight: null,
}
