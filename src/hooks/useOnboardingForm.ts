import { useState} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emptyOnboarding, STEPS } from '../constants/onboarding'
import { accountSchema, profileSchema, preferencesSchema, onboardingSchema } from '../validation/onboardingSchema'
import type { OnboardingData } from '../types/onboarding'

const stepSchemas = [accountSchema, profileSchema, preferencesSchema]

export function useOnboardingForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const currentStep = STEPS[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === STEPS.length - 1

  const form = useForm<OnboardingData>({
    defaultValues: { ...emptyOnboarding },
    resolver: zodResolver(stepSchemas[currentStepIndex] as any),
    mode: 'onTouched',
  })

  const goBack = () => {
    if (!isFirstStep) setCurrentStepIndex((i) => i - 1)
  }

  const goNext = form.handleSubmit(async () => {
    if (isLastStep) {
      const result = onboardingSchema.safeParse(form.getValues())
      if (result.success) {
        console.log('Onboarding complete:', result.data)
        setSubmitted(true)
      }
    } else {
      setCurrentStepIndex((i) => i + 1)
      form.clearErrors()
    }
  })

  const switchStep = (index: number) => {
    if (index <= currentStepIndex) {
      form.clearErrors()
      setCurrentStepIndex(index)
    }
  }

  const reset = () => {
    form.reset({ ...emptyOnboarding })
    setCurrentStepIndex(0)
    setSubmitted(false)
  }

  return {
    form,
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    submitted,
    goBack,
    goNext,
    switchStep,
    reset,
    totalSteps: STEPS.length,
  }
}