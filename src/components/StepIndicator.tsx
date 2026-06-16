import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { STEPS } from '../constants/onboarding'

type StepIndicatorProps = {
  currentStepIndex: number
  onStepClick: (index: number) => void
}

export function StepIndicator({ currentStepIndex, onStepClick }: StepIndicatorProps) {
  return (
    <Box>
      <Stepper activeStep={currentStepIndex} alternativeLabel>
        {STEPS.map((step, index) => (
          <Step
            key={step.id}
            completed={index < currentStepIndex}
            sx={{ cursor: index < currentStepIndex ? 'pointer' : 'default' }}
            onClick={() => onStepClick(index)}
          >
            <StepLabel>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}