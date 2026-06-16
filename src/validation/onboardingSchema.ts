import { z } from 'zod'

export const accountSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const profileSchema = z.object({
  role: z.string().min(1, 'Choose your role'),
  team: z.string().min(1, 'Choose your team'),
  bio: z.string().max(300, 'Bio must be 300 characters or fewer').optional().or(z.literal('')),
})

export const preferencesSchema = z.object({
  notifications: z.boolean(),
  weeklyDigest: z.boolean(),
  timezone: z.string().min(1, 'Choose your timezone'),
})

export const onboardingSchema = accountSchema.merge(profileSchema).merge(preferencesSchema)