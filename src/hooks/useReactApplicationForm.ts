import { useState, type SyntheticEvent } from 'react'
import { emptyApplication, requiredFields } from '../constants/jobApplication'
import type {
  JobApplication,
  JobApplicationErrors,
} from '../types/jobApplication'

export function useReactApplicationForm() {
  const [formData, setFormData] = useState<JobApplication>(emptyApplication)
  const [errors, setErrors] = useState<JobApplicationErrors>({})
  const [submittedName, setSubmittedName] = useState('')

  const updateField = (
    field: keyof JobApplication,
    value: string | boolean,
  ) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const resetForm = () => {
    setFormData(emptyApplication)
    setErrors({})
    setSubmittedName('')
  }

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: JobApplicationErrors = {}

    requiredFields.forEach((field) => {
      if (!String(formData[field]).trim()) {
        nextErrors[field] = 'This field is required'
      }
    })

    if (!formData.email.includes('@')) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!formData.terms) {
      nextErrors.terms = 'Please confirm before submitting'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmittedName(formData.fullName)
    }
  }

  return {
    errors,
    formData,
    handleSubmit,
    resetForm,
    submittedName,
    updateField,
  }
}
