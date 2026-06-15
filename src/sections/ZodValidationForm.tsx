import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormActions } from '../components/FormActions'
import { FormSection } from '../components/FormSection'
import { HookApplicationFields } from '../components/fields/HookApplicationFields'
import { emptyApplication } from '../constants/jobApplication'
import type { JobApplication } from '../types/jobApplication'
import { applicationSchema } from '../validation/applicationSchema'

export function ZodValidationForm() {
  const [submittedName, setSubmittedName] = useState('')
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<JobApplication, unknown, JobApplication>({
    defaultValues: emptyApplication,
    resolver: zodResolver(applicationSchema),
  })

  const resetForm = () => {
    reset(emptyApplication)
    setSubmittedName('')
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
        component="form"
        noValidate
        onSubmit={handleSubmit((data) => setSubmittedName(data.fullName))}
      >
        <HookApplicationFields
          control={control}
          errors={errors}
          register={register}
        />
        <FormActions onReset={resetForm} />
      </Box>
    </FormSection>
  )
}
