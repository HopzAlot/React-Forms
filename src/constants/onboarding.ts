import type { OnboardingData, Step } from '../types/onboarding'

export const emptyOnboarding: OnboardingData = {
  fullName: '',
  email: '',
  password: '',
  role: '',
  team: '',
  bio: '',
  notifications: true,
  weeklyDigest: false,
  timezone: '',
}

export const roleOptions = ['Engineer', 'Designer', 'Product Manager', 'Marketing', 'Sales', 'Other']
export const teamOptions = ['Growth', 'Platform', 'Product', 'Design', 'Operations']
export const timezoneOptions = [
  'UTC-8 – Pacific Time',
  'UTC-5 – Eastern Time',
  'UTC+0 – London',
  'UTC+1 – Paris / Berlin',
  'UTC+3 – Riyadh / Moscow',
  'UTC+5:30 – Karachi / Mumbai',
  'UTC+8 – Singapore / Beijing',
  'UTC+9 – Tokyo / Seoul',
]

export const STEPS: Step[] = [
  { id: 'account', label: 'Account', description: 'Set up your login details' },
  { id: 'profile', label: 'Profile', description: 'Tell us about yourself' },
  { id: 'preferences', label: 'Preferences', description: 'Customise your experience' },
]