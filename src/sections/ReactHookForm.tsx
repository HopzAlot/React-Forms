import { useState } from 'react'
import { Alert, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormActions } from '../components/FormActions'
import { FormSection } from '../components/FormSection'
import { HookApplicationFields } from '../components/fields/HookApplicationFields'
import { emptyApplication } from '../constants/jobApplication'
import type { JobApplication } from '../types/jobApplication'

export function ReactHookForm() {
  const [submittedName, setSubmittedName] = useState('')
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<JobApplication, unknown, JobApplication>({
    defaultValues: emptyApplication,
  })

  const resetForm = () => {
    reset(emptyApplication)
    setSubmittedName('')
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
        onSubmit={handleSubmit((data) => setSubmittedName(data.fullName))}
      >
        <HookApplicationFields
          control={control}
          errors={errors}
          register={register}
          useSimpleRules
        />
        <FormActions onReset={resetForm} />
      </Box>
    </FormSection>
  )
}
