import { takenEmails } from '../constants/jobApplication'


export async function checkEmailAvailability(email: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return !takenEmails.includes(email.toLowerCase())
}