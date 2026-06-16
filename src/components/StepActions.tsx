import { Button, CircularProgress, Stack } from '@mui/material'

type StepActionsProps = {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
  onBack: () => void
}

export function StepActions({ isFirstStep, isLastStep, isSubmitting, onBack }: StepActionsProps) {
  return (
    <Stack direction="row" sx={{ mt: 4, justifyContent: 'space-between' }}>
      <Button
        type="button"
        variant="outlined"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
      >
        Back
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
      >
        {isLastStep ? (isSubmitting ? 'Finishing…' : 'Finish setup') : 'Continue'}
      </Button>
    </Stack>
  )
}