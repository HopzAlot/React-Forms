import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { roleOptions, teamOptions } from '../../constants/onboarding'
import type { OnboardingData } from '../../types/onboarding'

type Props = {
  register: UseFormRegister<OnboardingData>
  errors: FieldErrors<OnboardingData>
  control: Control<OnboardingData>
}

export function ProfileStep({ register, errors, control }: Props) {
  return (
    <Box className="fields-grid">
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.role)}>
            <InputLabel>Your role</InputLabel>
            <Select {...field} label="Your role">
              {roleOptions.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </Select>
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        name="team"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.team)}>
            <InputLabel>Your team</InputLabel>
            <Select {...field} label="Your team">
              {teamOptions.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
            <FormHelperText>{errors.team?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <TextField
        label="Short bio"
        className="wide-field"
        {...register('bio')}
        error={Boolean(errors.bio)}
        helperText={errors.bio?.message ?? 'Optional – up to 300 characters'}
        multiline
        minRows={3}
        fullWidth
      />
    </Box>
  )
}