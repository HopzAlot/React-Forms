import type { ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'

type FormSectionProps = {
  title: string
  description: string
  children: ReactNode
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Box>
      {children}
    </Stack>
  )
}
