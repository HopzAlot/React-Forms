import { useState, type SyntheticEvent } from 'react'
import { emptyApplication, requiredFields } from '../constants/jobApplication'
import { checkEmailAvailability } from '../utils/emailValidation'
import type {
  JobApplication,
  JobApplicationErrors,
} from '../types/jobApplication'

export function useReactApplicationForm() {
  const [formData, setFormData] = useState<JobApplication>({ ...emptyApplication })
  const [errors, setErrors] = useState<JobApplicationErrors>({})
  const [submittedName, setSubmittedName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (
    field: keyof JobApplication,
    value: string | boolean,
  ) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const resetForm = () => {
    setFormData({ ...emptyApplication })
    setErrors({})
    setSubmittedName('')
  }

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: JobApplicationErrors = {}

    // Validate string fields
    requiredFields.forEach((field) => {
      const value = formData[field]
      if (typeof value === 'string' && !value.trim()) {
        nextErrors[field] = 'This field is required'
      }
    })

    // Validate email format
    if (formData.email && !formData.email.includes('@')) {
      nextErrors.email = 'Enter a valid email address'
    }

    // Validate terms checkbox explicitly (boolean, not a string field)
    if (!formData.terms) {
      nextErrors.terms = 'Please confirm before submitting'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const isAvailable = await checkEmailAvailability(formData.email)

      if (!isAvailable) {
        setErrors({ email: 'This email is already registered' })
        return
      }

      console.log('Form submitted:', formData)
      setSubmittedName(formData.fullName)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    errors,
    formData,
    handleSubmit,
    isSubmitting,
    resetForm,
    submittedName,
    updateField,
  }
}