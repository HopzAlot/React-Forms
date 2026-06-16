import { Box, TextField } from '@mui/material'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { OnboardingData } from '../../types/onboarding'

type Props = {
  register: UseFormRegister<OnboardingData>
  errors: FieldErrors<OnboardingData>
  control: Control<OnboardingData>
}

export function AccountStep({ register, errors }: Props) {
  return (
    <Box className="fields-grid">
      <TextField
        label="Full name"
        className="wide-field"
        {...register('fullName')}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName?.message}
        fullWidth
        autoFocus
      />
      <TextField
        label="Email"
        type="email"
        className="wide-field"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        className="wide-field"
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={errors.password?.message ?? 'At least 8 characters'}
        fullWidth
      />
    </Box>
  )
}