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
  const {
    control,
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<JobApplication, unknown, JobApplication>({
    defaultValues: emptyApplication,
  })

  const resetForm = () => {
    reset({ ...emptyApplication })
    setSubmittedName('')
  }

  const onSubmit = async (data: JobApplication) => {
    const isAvailable = await checkEmailAvailability(data.email)

    if (!isAvailable) {
      setError('email', { message: 'This email is already registered' })
      return
    }

    setSubmittedName(data.fullName)
  }

  return (
    <FormSection
      title="React Hook Form"
      description="This version registers fields with React Hook Form and uses built-in rules."
    >
      {submittedName && (
        <Alert severity="success">Application saved for {submittedName}.</Alert>
      )}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <HookApplicationFields
          control={control}
          errors={errors}
          register={register}
          useSimpleRules
        />
        <FormActions onReset={resetForm} isSubmitting={isSubmitting} />
      </Box>
    </FormSection>
  )
}