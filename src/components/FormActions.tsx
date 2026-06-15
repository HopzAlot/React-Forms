import { Button, Stack } from '@mui/material'

type FormActionsProps = {
  onReset: () => void
}

export function FormActions({ onReset }: FormActionsProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
      <Button type="submit" variant="contained">
        Submit Application
      </Button>
      <Button type="button" variant="outlined" onClick={onReset}>
        Reset
      </Button>
    </Stack>
  )
}
