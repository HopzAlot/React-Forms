import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormActions } from '../components/FormActions'
import { FormSection } from '../components/FormSection'
import { HookApplicationFields } from '../components/fields/HookApplicationFields'
import { emptyApplication } from '../constants/jobApplication'
import { checkEmailAvailability } from '../utils/emailValidation'
import type { JobApplication } from '../types/jobApplication'
import { applicationSchema } from '../validation/applicationSchema'

export function ZodValidationForm() {
  const [submittedName, setSubmittedName] = useState('')
  const [emailTakenError, setEmailTakenError] = useState('')

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState,
  } = useForm<JobApplication>({
    defaultValues: { ...emptyApplication },
    resolver: zodResolver(applicationSchema),
  })

  const { errors, isSubmitting } = formState

  const resetForm = () => {
    reset({ ...emptyApplication })
    setSubmittedName('')
    setEmailTakenError('')
  }

  const onSubmit = async (data: JobApplication) => {
    setEmailTakenError('')
    const isAvailable = await checkEmailAvailability(data.email)

    if (!isAvailable) {
      setEmailTakenError('This email is already registered')
      return
    }

    console.log('Form submitted:', data)
    setSubmittedName(data.fullName)
  }

  const mergedErrors = {
    ...errors,
    ...(emailTakenError ? { email: { message: emailTakenError, type: 'manual' as const } } : {}),
  }

  return (
    <FormSection
      title="Zod Validation Form"
      description="This version uses a Zod schema as the validation source."
    >
      {submittedName && (
        <Alert severity="success">Application saved for {submittedName}.</Alert>
      )}
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <HookApplicationFields
          control={control}
          errors={mergedErrors}
          register={register}
        />
        <FormActions onReset={resetForm} isSubmitting={isSubmitting} />
      </Box>
    </FormSection>
  )
}