import { Box, Button, Stack, Typography } from '@mui/material'

type SuccessScreenProps = {
  name: string
  onReset: () => void
}

export function SuccessScreen({ name, onReset }: SuccessScreenProps) {
  return (
    <Stack spacing={3} sx={{ py: 6, textAlign: 'center', alignItems: 'center' }}>
      <Box sx={{ fontSize: 56, lineHeight: 1 }}>✅</Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          You're all set, {name.split(' ')[0]}!
        </Typography>
        <Typography color="text.secondary">
          Your account is ready. You can update these preferences any time from your profile settings.
        </Typography>
      </Box>
      <Button variant="outlined" onClick={onReset}>
        Start over
      </Button>
    </Stack>
  )
}