import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import {
  experienceOptions,
  positionOptions,
} from '../../constants/jobApplication'
import type {
  JobApplication,
  JobApplicationErrors,
} from '../../types/jobApplication'

type PlainApplicationFieldsProps = {
  values: JobApplication
  errors: JobApplicationErrors
  onChange: (field: keyof JobApplication, value: string | boolean) => void
}

export function PlainApplicationFields({
  values,
  errors,
  onChange,
}: PlainApplicationFieldsProps) {
  return (
    <Box className="fields-grid">
      <TextField
        label="Full name"
        value={values.fullName}
        onChange={(event) => onChange('fullName', event.target.value)}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName}
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={values.email}
        onChange={(event) => onChange('email', event.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
        fullWidth
      />
      <TextField
        label="Phone"
        value={values.phone}
        onChange={(event) => onChange('phone', event.target.value)}
        error={Boolean(errors.phone)}
        helperText={errors.phone}
        fullWidth
      />
      <FormControl fullWidth error={Boolean(errors.position)}>
        <InputLabel>Position</InputLabel>
        <Select
          label="Position"
          value={values.position}
          onChange={(event) => onChange('position', event.target.value)}
        >
          {positionOptions.map((position) => (
            <MenuItem key={position} value={position}>
              {position}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.position}</FormHelperText>
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.experience)}>
        <InputLabel>Experience</InputLabel>
        <Select
          label="Experience"
          value={values.experience}
          onChange={(event) => onChange('experience', event.target.value)}
        >
          {experienceOptions.map((experience) => (
            <MenuItem key={experience} value={experience}>
              {experience}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.experience}</FormHelperText>
      </FormControl>
      <TextField
        label="Portfolio URL"
        value={values.portfolio}
        onChange={(event) => onChange('portfolio', event.target.value)}
        error={Boolean(errors.portfolio)}
        helperText={errors.portfolio || 'Optional'}
        fullWidth
      />
      <TextField
        label="Expected salary"
        value={values.salary}
        onChange={(event) => onChange('salary', event.target.value)}
        error={Boolean(errors.salary)}
        helperText={errors.salary}
        fullWidth
      />
      <TextField
        label="Available start date"
        type="date"
        value={values.startDate}
        onChange={(event) => onChange('startDate', event.target.value)}
        error={Boolean(errors.startDate)}
        helperText={errors.startDate}
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
      />
      <TextField
        className="wide-field"
        label="Cover letter"
        value={values.coverLetter}
        onChange={(event) => onChange('coverLetter', event.target.value)}
        error={Boolean(errors.coverLetter)}
        helperText={errors.coverLetter}
        minRows={4}
        multiline
        fullWidth
      />
      <Box className="wide-field">
        <FormControlLabel
          control={
            <Checkbox
              checked={values.remote}
              onChange={(event) => onChange('remote', event.target.checked)}
            />
          }
          label="Open to remote work"
        />
        <FormControl error={Boolean(errors.terms)}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.terms}
                onChange={(event) => onChange('terms', event.target.checked)}
              />
            }
            label="I confirm this information is accurate"
          />
          <FormHelperText>{errors.terms}</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  )
}
