import type { JobApplication } from '../types/jobApplication'

export const emptyApplication: JobApplication = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  portfolio: '',
  salary: '',
  startDate: '',
  coverLetter: '',
  remote: false,
  terms: false,
}

export const positionOptions = [
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Designer',
  'Project Coordinator',
]

export const experienceOptions = ['0-1 years', '2-3 years', '4-5 years', '6+ years']

export const requiredFields: Array<keyof JobApplication> = [
  'fullName',
  'email',
  'phone',
  'position',
  'experience',
  'salary',
  'startDate',
  'coverLetter',
]

// Simulated "taken" emails for demo purposes
export const takenEmails = ['test@gmail.com', 'admin@example.com', 'user@test.com']