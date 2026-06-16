import { Box, Stack, Typography } from '@mui/material'
import { StepIndicator } from '../components/StepIndicator'
import { StepActions } from '../components/StepActions'
import { AccountStep } from '../components/steps/AccountStep'
import { ProfileStep } from '../components/steps/ProfileStep'
import { PreferencesStep } from '../components/steps/PreferencesStep'
import { SuccessScreen } from '../components/SuccessScreen'
import { useOnboardingForm } from '../hooks/useOnboardingForm'

export function OnboardingForm() {
  const { form, currentStep, currentStepIndex, isFirstStep, isLastStep, submitted, goBack, goNext, switchStep, reset, totalSteps } = useOnboardingForm()
  const { register, control, formState: { errors, isSubmitting }, watch } = form

  if (submitted) {
    return <SuccessScreen name={watch('fullName')} onReset={reset} />
  }

  return (
    <Stack spacing={4}>
      <StepIndicator currentStepIndex={currentStepIndex} onStepClick={switchStep} />

      <Box>
        <Typography variant="overline" color="text.secondary">
          Step {currentStepIndex + 1} of {totalSteps}
        </Typography>
        <Typography variant={"h5"} sx={{ fontWeight: 700 }}>
          {currentStep.label}
        </Typography>
        <Typography color="text.secondary">{currentStep.description}</Typography>
      </Box>

      <Box component="form" noValidate onSubmit={goNext}>
        {currentStep.id === 'account' && <AccountStep register={register} errors={errors} control={control} />}
        {currentStep.id === 'profile' && <ProfileStep register={register} errors={errors} control={control} />}
        {currentStep.id === 'preferences' && <PreferencesStep errors={errors} control={control} />}

        <StepActions isFirstStep={isFirstStep} isLastStep={isLastStep} isSubmitting={isSubmitting} onBack={goBack} />
      </Box>
    </Stack>
  )
}