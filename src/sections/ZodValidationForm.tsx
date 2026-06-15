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
  const [formKey, setFormKey] = useState(0)
  const {
    control,
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<JobApplication, unknown, JobApplication>({
    defaultValues: { ...emptyApplication },
    resolver: zodResolver(applicationSchema),
  })

  const resetForm = () => {
    reset({ ...emptyApplication })
    setSubmittedName('')
    setFormKey((k) => k + 1)
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
      title="Zod Validation Form"
      description="This version uses a Zod schema as the validation source."
    >
      {submittedName && (
        <Alert severity="success">Application saved for {submittedName}.</Alert>
      )}
      <Box
        key={formKey}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <HookApplicationFields
          control={control}
          errors={errors}
          register={register}
        />
        <FormActions onReset={resetForm} isSubmitting={isSubmitting} />
      </Box>
    </FormSection>
  )
}