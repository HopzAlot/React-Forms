import { z } from 'zod'

export const applicationSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.email('Enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  position: z.string().min(1, 'Choose a position'),
  experience: z.string().min(1, 'Choose your experience level'),
  portfolio: z.url('Enter a valid portfolio URL').or(z.literal('')),
  salary: z.string().min(1, 'Enter your expected salary'),
  startDate: z.string().min(1, 'Choose an available start date'),
  coverLetter: z
    .string()
    .min(40, 'Cover letter must be at least 40 characters'),
  remote: z.boolean(),
  terms: z
    .boolean()
    .refine((value) => value, 'You must confirm the information is accurate'),
})
