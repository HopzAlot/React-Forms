export type OnboardingData = {
  fullName: string
  email: string
  password: string
  role: string
  team: string
  bio: string
  notifications: boolean
  weeklyDigest: boolean
  timezone: string
}

export type StepId = 'account' | 'profile' | 'preferences'

export type Step = {
  id: StepId
  label: string
  description: string
}