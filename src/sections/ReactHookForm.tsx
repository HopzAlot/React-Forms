import { useState } from 'react'
import { Alert, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormActions } from '../components/FormActions'
import { FormSection } from '../components/FormSection'
import { HookApplicationFields } from '../components/fields/HookApplicationFields'
import { emptyApplication } from '../constants/jobApplication'
import { checkEmailAvailability } from '../utils/emailValidation'
import type { JobApplication } from '../types/jobApplication'

export function ReactHookForm() {
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
    mode: 'onTouched',
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
      title="React Hook Form"
      description="This version registers fields with React Hook Form and uses built-in rules."
    >
      {submittedName && (
        <Alert severity="success">Application saved for {submittedName}.</Alert>
      )}
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit, (valErrors)=>{
        console.log('Validation errors:', valErrors)
      })}>
        <HookApplicationFields
          control={control}
          errors={mergedErrors}
          register={register}
          useSimpleRules
        />
        <FormActions onReset={resetForm} isSubmitting={isSubmitting} />
      </Box>
    </FormSection>
  )
}