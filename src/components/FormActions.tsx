import { Button, CircularProgress, Stack } from '@mui/material'

type FormActionsProps = {
  onReset: () => void
  isSubmitting?: boolean
}

export function FormActions({ onReset, isSubmitting = false }: FormActionsProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
      <Button type="button" variant="outlined" onClick={onReset} disabled={isSubmitting}>
        Reset
      </Button>
    </Stack>
  )
}