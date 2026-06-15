export type FormView = 'react' | 'hook' | 'zod'

export type JobApplication = {
  fullName: string
  email: string
  phone: string
  position: string
  experience: string
  portfolio: string
  salary: string
  startDate: string
  coverLetter: string
  remote: boolean
  terms: boolean
}

export type JobApplicationErrors = Partial<
  Record<keyof JobApplication, string>
>
