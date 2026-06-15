import { Alert, Box } from '@mui/material'
import { FormActions } from '../components/FormActions'
import { FormSection } from '../components/FormSection'
import { PlainApplicationFields } from '../components/fields/PlainApplicationFields'
import { useReactApplicationForm } from '../hooks/useReactApplicationForm'

export function ReactStateForm() {
  const {
    errors,
    formData,
    handleSubmit,
    isSubmitting,
    resetForm,
    submittedName,
    updateField,
  } = useReactApplicationForm()

  return (
    <FormSection
      title="Plain React Form"
      description="This version uses useState and a simple submit handler for validation."
    >
      {submittedName && (
        <Alert severity="success">Application saved for {submittedName}.</Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <PlainApplicationFields
          values={formData}
          errors={errors}
          onChange={updateField}
        />
        <FormActions onReset={resetForm} isSubmitting={isSubmitting} />
      </Box>
    </FormSection>
  )
}