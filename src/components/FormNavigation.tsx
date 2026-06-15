import { Button, Stack } from '@mui/material'
import type { FormView } from '../types/jobApplication'

const views: Array<{ label: string; value: FormView }> = [
  { label: 'React Form', value: 'react' },
  { label: 'React Hook Form', value: 'hook' },
  { label: 'Zod Validation', value: 'zod' },
]

type FormNavigationProps = {
  activeView: FormView
  onViewChange: (view: FormView) => void
}

export function FormNavigation({
  activeView,
  onViewChange,
}: FormNavigationProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
      {views.map((view) => (
        <Button
          key={view.value}
          variant={activeView === view.value ? 'contained' : 'outlined'}
          onClick={() => onViewChange(view.value)}
        >
          {view.label}
        </Button>
      ))}
    </Stack>
  )
}
