import type { ComponentProps } from 'react'
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
  Controller,
  type Control,
  type FieldErrors,
  type RegisterOptions,
  type UseFormRegister,
} from 'react-hook-form'
import {
  experienceOptions,
  positionOptions,
} from '../../constants/jobApplication'
import type { JobApplication } from '../../types/jobApplication'

type HookApplicationFieldsProps = {
  control: Control<JobApplication, unknown, JobApplication>
  errors: FieldErrors<JobApplication>
  register: UseFormRegister<JobApplication>
  useSimpleRules?: boolean
}

export function HookApplicationFields({
  control,
  errors,
  register,
  useSimpleRules = false,
}: HookApplicationFieldsProps) {
  const requiredRule = useSimpleRules ? { required: 'This field is required' } : {}
  const emailRules = useSimpleRules
    ? {
        required: 'This field is required',
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Enter a valid email address',
        },
      }
    : undefined
  const coverLetterRules = useSimpleRules
    ? {
        required: 'This field is required',
        minLength: {
          value: 25,
          message: 'Write at least 25 characters',
        },
      }
    : undefined

  return (
    <Box className="fields-grid">
      <TextInput
        name="fullName"
        label="Full name"
        error={errors.fullName?.message}
        register={register}
        rules={requiredRule}
      />
      <TextInput
        name="email"
        label="Email"
        type="email"
        error={errors.email?.message}
        register={register}
        rules={emailRules}
      />
      <TextInput
        name="phone"
        label="Phone"
        error={errors.phone?.message}
        register={register}
        rules={requiredRule}
      />
      <Controller
        name="position"
        control={control}
        rules={requiredRule}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.position)}>
            <InputLabel>Position</InputLabel>
            <Select {...field} label="Position">
              {positionOptions.map((position) => (
                <MenuItem key={position} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.position?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        name="experience"
        control={control}
        rules={requiredRule}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.experience)}>
            <InputLabel>Experience</InputLabel>
            <Select {...field} label="Experience">
              {experienceOptions.map((experience) => (
                <MenuItem key={experience} value={experience}>
                  {experience}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.experience?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <TextInput
        name="portfolio"
        label="Portfolio URL"
        error={errors.portfolio?.message}
        helperText="Optional"
        register={register}
      />
      <TextInput
        name="salary"
        label="Expected salary"
        error={errors.salary?.message}
        register={register}
        rules={requiredRule}
      />
      <TextInput
        name="startDate"
        label="Available start date"
        type="date"
        error={errors.startDate?.message}
        register={register}
        rules={requiredRule}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextInput
        name="coverLetter"
        label="Cover letter"
        className="wide-field"
        error={errors.coverLetter?.message}
        register={register}
        rules={coverLetterRules}
        minRows={4}
        multiline
      />
      <Box className="wide-field">
        <Controller
          name="remote"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              }
              label="Open to remote work"
            />
          )}
        />
        <Controller
          name="terms"
          control={control}
          rules={
            useSimpleRules
              ? {
                  validate: (value) =>
                    value || 'Please confirm before submitting',
                }
              : undefined
          }
          render={({ field }) => (
            <FormControl error={Boolean(errors.terms)}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                }
                label="I confirm this information is accurate"
              />
              <FormHelperText>{errors.terms?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>
    </Box>
  )
}

type TextFieldName = keyof Pick<
  JobApplication,
  | 'fullName'
  | 'email'
  | 'phone'
  | 'portfolio'
  | 'salary'
  | 'startDate'
  | 'coverLetter'
>

type TextInputProps<TName extends TextFieldName> = {
  name: TName
  label: string
  register: UseFormRegister<JobApplication>
  className?: string
  error?: string
  helperText?: string
  minRows?: number
  multiline?: boolean
  rules?: RegisterOptions<JobApplication, TName>
  slotProps?: ComponentProps<typeof TextField>['slotProps']
  type?: string
}

function TextInput<TName extends TextFieldName>({
  name,
  label,
  register,
  className,
  error,
  helperText,
  minRows,
  multiline,
  rules,
  slotProps,
  type,
}: TextInputProps<TName>) {
  return (
    <TextField
      {...register(name, rules)}
      className={className}
      label={label}
      type={type}
      error={Boolean(error)}
      helperText={error || helperText}
      minRows={minRows}
      multiline={multiline}
      slotProps={slotProps}
      fullWidth
    />
  )
}
