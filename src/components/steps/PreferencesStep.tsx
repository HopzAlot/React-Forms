import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import type { Control, FieldErrors } from 'react-hook-form'
import { timezoneOptions } from '../../constants/onboarding'
import type { OnboardingData } from '../../types/onboarding'

type Props = {
  errors: FieldErrors<OnboardingData>
  control: Control<OnboardingData>
}

export function PreferencesStep({ errors, control }: Props) {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Notifications</Typography>
        <Stack>
          <Controller
            name="notifications"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                label="Send me product updates and announcements"
              />
            )}
          />
          <Controller
            name="weeklyDigest"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                label="Send me a weekly activity digest"
              />
            )}
          />
        </Stack>
      </Box>
      <Divider />
      <Controller
        name="timezone"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.timezone)}>
            <InputLabel>Timezone</InputLabel>
            <Select {...field} label="Timezone">
              {timezoneOptions.map((tz) => <MenuItem key={tz} value={tz}>{tz}</MenuItem>)}
            </Select>
            <FormHelperText>{errors.timezone?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </Stack>
  )
}